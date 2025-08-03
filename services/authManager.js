const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const {db} = require('../utils/db/credentials');

passport.serializeUser((user, done) => {
  done(null, user.id); // this could be Google profile ID or your DB ID
});

passport.deserializeUser((id, done) => {
  // find the user from DB using the id
  db.query('SELECT * FROM users WHERE id = ?', [id], (err, results) => {
    if (err) return done(err);
    done(null, results[0]);
  });
});