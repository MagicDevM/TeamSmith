const bcrypt = require('bcryptjs');
var GoogleStrategy = require('passport-google-oauth20').Strategy;

const log = require('../utils/logger');
const {db} = require('../utils/db/credentials');

async function login(req, res) {
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
} 

async function register(req, res) {
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
}

const google = new GoogleStrategy({
    clientID: process.env.GOOGLE_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: `${process.env.URL}:${process.env.PORT}/auth/google/callback`
  },
  function(accessToken, refreshToken, profile, done, ) {
    const username = profile.displayName;
    const email = profile.emails[0].value;
    db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
      if (err) {
        log.error(err);
        return done(err);
      }
      if (results.length > 0) {
        return done(null, results[0]);
      } else {
        db.query('INSERT INTO users (username, email) VALUES(?,?)', [username, email], (err, results) => {
          if (err) {
            log.error(err);
            return done(err);
          }
          const newUser = {
            id: results.insertId,
            username: username,
            email: email
          }
            done(null, newUser)
        })
      }
    })
  }
); 

module.exports = {login, register, google}