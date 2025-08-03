//Imports required modules
const express = require('express');
require('dotenv').config({ quiet: true });
const fs = require('fs');
const path = require('path');
const session = require('express-session');
const passport = require('passport');

//Internal modules
const { db, dbraw } = require('./utils/db/credentials');
const connect = require('./utils/db/connector');
const createTable = require('./utils/db/tables/createTable');
const isAuth = require('./middlewares/isAuth');
const { statusCodeHandler, notFoundHandler } = require('./middlewares/statusCodeHandler');
const { login, register, google, discord } = require('./controllers/auth');
const logout = require('./controllers/logout');

//runtime imports
require('./services/authManager')

//Router imports
const auth = require('./routes/routers/auth');

//Imports that depend on other modules
const MySQLStore = require('express-mysql-session')(session);

//Initializes the express module
const app = express();

//Initializes the logger module
const log = require('./utils/logger');

//Starting process starts here
log.info('Starting Website');

//Set up view engine for express
app.set("view engine", "ejs");

//sessionStore setup
const sessionStore = new MySQLStore(dbraw);

//The Session setup details
const sessDetails = {
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

//json middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//session enabling
app.use(session(sessDetails));

//authentication enabling
passport.use(google);
passport.use(discord);
app.use(passport.initialize());
app.use(passport.session());

//connects to the required databases
connect();

//Creates the users table if does not exists
createTable();

//Route setup
//Loads the Routes
app.use('/home', isAuth)
app.use('/logout', isAuth)
app.use('/auth', auth)

//route handling
app.get('/', (req, res) => {
  res.redirect('/home')
})
app.get('/home', (req, res) => {
  res.render('home')
})

app.get('/logout', (req, res) => {
  res.render('logout')
})
//setup google auth requests
app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/auth/login'
}),
  function(req, res) {
    res.render('components/callback');
  });
app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })) 

//setup discord auth requests
app.get('/auth/discord', passport.authenticate('discord'));
app.get('/auth/discord/callback', passport.authenticate('discord', {
  failureRedirect: '/auth/login'
}), function(req, res) {
  res.render('components/callback') // Successful auth
});

//Registration system setup
app.post('/register', register);

app.post('/login', login)

app.post('/logout', logout)

//404 status code handling System
app.use(notFoundHandler);

//handles rest of the status codes
app.use(statusCodeHandler);

//Starts the server
const PORT = process.env.PORT || "4591";
app.listen(PORT, () => {
  log.info(`Website online on Port:${PORT}`);
})