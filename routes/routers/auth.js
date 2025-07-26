//Setups a router
const express = require('express');
const router = express.Router()

//Returns to encoding when GET is /tools
router.get("/", (req, res) => {
  res.redirect('/auth/login')
});

router.get("/register", (req, res) => {
  res.render('auth/register')
});

router.get("/login", (req, res) => {
  res.render('auth/login')
});

router.get("/forgot-password", (req, res) => {
  res.render('auth/forgot-password')
});

//Exports the router
module.exports = router;