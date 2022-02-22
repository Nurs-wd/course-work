const express = require('express');
const router = express.Router();
const path = require('path');
const session = require('express-session');
require('dotenv').config();
const login = require('../auth/login')
const register = require('../auth/reg')
const cookieParser = require("cookie-parser");
const getters = require('./getters')

router.use(cookieParser());
router.use(
  session({
    secret: process.env.KEY_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24
    }
  })
)

// Home page route.
router.get('/home', (req, res) => {
  res.sendFile(path.join(__dirname, '../views','homePage.html'))
})


// About page route.
router.get('/client', function (req, res) {
    if (!req.session.username) {
    res.redirect('/home')
  } else {
    console.log(req.session.username, req.session.email, req.session.password);
    res.sendFile(path.join(__dirname, '../views', 'client.html'));
  }
})

router.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../views', 'login.html'));
})

router.post('/login', login);

router.post('/reg', register)

router.get('/', function (req, res) {
  console.log(req.session.username, req.session.email, req.session.password)
  if (!req.session.username) {
    res.redirect('/home')
  } else {
    console.log(req.session.username, req.session.email, req.session.password);
    res.redirect('/client')
  }
})

router.get('/logout',(req,res) => {
    req.session.destroy();
    res.redirect('/');
});

router.get('/products', getters.products);

module.exports = router;
