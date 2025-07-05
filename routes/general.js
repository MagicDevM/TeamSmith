//Setup's the router
const express = require('express');
const router = express.Router();

// Returns / to /home
router.get("/", (req, res) => {
  res.redirect('/home');
});
router.get("/home", (req, res) => {
  res.render('home');
});

//Exports the router
module.exports = router;