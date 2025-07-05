//Setups a router
const express = require('express');
const router = express.Router()

//Returns to encoding when GET is /tools
router.get("/auth", (req, res) => {
  res.redirect('/auth/login')
});

router.get("/auth/register", (req, res) => {
  res.render('auth/register')
});

router.get("/auth/login", (req, res) => {
  res.render('auth/login')
});

router.get("/auth/forgot-password", (req, res) => {
  res.render('auth/forgot-password')
});

//Exports the router
module.exports = router;