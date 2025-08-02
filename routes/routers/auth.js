//Setups a router
const express = require('express');
const router = express.Router()

//Returns to encoding when GET is /tools
router.get("/", (req, res) => {
  res.redirect('/auth/login')
});

router.get("/register", (req, res) => {
  if (req.session.user || req.isAuthenticated()) return res.redirect('/home')
  res.render('auth/register')
});

router.get("/login", (req, res) => {
  if (req.session.user || req.isAuthenticated()) return res.redirect('/home')
  res.render('auth/login')
});

//Exports the router
module.exports = router;