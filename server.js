//Imports required modules
const express = require('express');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const session = require('express-session');
require('dotenv').config({ quiet: true });

//Internal modules
const { db, dbraw } = require('./utils/db/credentials');
const connect = require('./utils/db/connector');
const createTable = require('./utils/db/tables/createTable');
const isAuth = require('./middleware/isAuth');

//Router imports
const auth = require('./routes/routers/auth');

//Imports that depend on other modules
const MySQLStore = require('express-mysql-session')(session);

//Initializes the express module
const app = express();

//Initializes the logger module
const log = new(require('cat-loggr'))();

//Starting process starts here
log.info('Starting Website');

//Set up view engine for express
app.set("view engine", "ejs");

//sessionStore setup
const sessionStore = new MySQLStore(dbraw);

//The Session setup details
const sessDetails = {
  key: process.env.SESSION_KEY || 'user_session_key',
  secret: process.env.SESSION_SECRET || 'eluminuscoisOP',
  resave: false,
  saveUninitialized: false,
  store: sessionStore,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24
  }
}

//Enables required middleware
//Setup static directorys
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'assets')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session(sessDetails))

//Route setup
//initializes the routes directory
const routesDir = path.join(__dirname, 'routes');

//Loads the Routes
app.use('/home', isAuth)
app.use('/auth', auth)

//route handling
app.get('/', (req, res) => {
  req.session.destroy();
  res.redirect('/home')
})
app.get('/home', (req, res) => {
  res.render('home')
})

//connects to the required databases
connect(log);

//Creates the users table if does not exists
createTable(log);

//Registration system setup
app.post('/register', async (req, res) => {
  const {
    username,
    email,
    password
  } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    db.query('SELECT * FROM users WHERE username = ? OR email = ?', [username, email], (err, results) => {
      if (err) {
        log.error('Error checking user:', err);
        return res.status(500).send('Server error. Please try again later.');
      }
      
      if (results.length > 0) {
        // Check if the email or username already exists
        const existingUser = results[0];
        
        if (existingUser.email === email) {
          return res.status(400).send('Email is already in use.');
        }
        if (existingUser.username === username) {
          return res.status(400).send('Username is already taken.');
        }
      }
      const query = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
      db.query(query,
        [username,
          email,
          hashedPassword
        ],
        (err, results) => {
          if (err) {
            log.error('An error occured while registering user', err);
            return res.status(500).send("error registering user");
          };
        },
        res.send('Successfully Registered')
      )
    })
  } catch (err) {
    log.error('An error occured while hashing password.',
      err);
    return res.status(500).send("Something went horribly wrong!");
  };
});

app.post('/login', async (req, res) => {
  const {
    email,
    password
  } = req.body
  
  const query = 'SELECT * FROM users WHERE username = ? OR email = ?';
  db.query(query, [email, email], async (err, results) => {
    if (err) {
      log.error('Error finding user:', err);
      return res.status(500).send('Server error. Please try again later.');
    }
    if (results.length === 0) return res.status(401).send('Credentials do not match with our records.');
    const user = results[0];
    
    try {
      const passwordMatch = await bcrypt.compare(password, user.password)
      
      if (!passwordMatch) {
        return res.status(400).send('Credentials do not match with our records.');
      }
      req.session.user = {
        username: user.username,
        email: user.email
      }
      return res.send('Successfully logged in!')
    } catch (err) {
      log.error('An error occured while hashing password.',
        err);
      return res.status(500).send("Something went horribly wrong!")
    };
  })
})

//Error handling System
app.use((req, res, next) => {
  //separate middleware for 404
  res.status(404).render('error_handling/errorbody', { error: 'Could not find page', errorurl: req.url, errorcode: '404' })
})

//This middleware handles all other status codes
app.use((err, req, res, next) => {
  //Logs the error stack for debugging purposes
  log.error(err.stack);
  
  //Gets the status code
  const status = err.status || 500;
  
  //Sets error codes for certain status codes
  const messages = {
    400: 'Bad Request',
    401: 'Unauthorized Access',
    402: 'Forbidden',
    404: 'Could not find page',
    500: 'Internal server error'
  };
  //Gets the correct message for the status code
  const message = messages[status];
  
  //Sends data to the frontend
  res.status(status).render('error_handling/errorbody', { error: message, errorcode: status, errorurl: req.url });
});

//Starts the server
const PORT = "7777";
app.listen(PORT, () => {
  log.info(`Website online on Port:${PORT}`);
})