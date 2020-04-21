var mongoose = require('mongoose');
var router = require('express').Router();
var passport = require('passport');
var User = mongoose.model('User');
var jwt = require('jsonwebtoken');
var secret = require('../../config').secret;
var refreshAuth = require('../auth');
var expressjwt = require('express-jwt');


// Auth with github
router.get('/auth/github', passport.authenticate('github', {
  scope: ['profile']
}));

// Callback route for github to redirect
// Fire passport.authenticate again to use github user code and exchange with github for profile information
router.get('/auth/redirect', passport.authenticate('github', {session: false}), (req, res, next) => {
  // res.send(req.user);
  if (!req.user) {
      return res.send(401, 'User Not Authenticated');
  }
  req.auth = {
      id: req.user.providerId,
      username: req.user.username
  };
  next();
}, generateRefreshToken, sendRefreshToken);


// JWT managment for refresh tokens (only for initial login)
function generateRefreshToken (req, res, next) {
  req.token = createRefreshToken(req.auth);
  return next();
}

function sendRefreshToken(req, res) {
  front_end = process.env.FRONTEND_SERVER
  // Send token in search params
  res.redirect(307, `${front_end}/?key=value#token=${req.token}`);
}

function createRefreshToken (auth) {
  return jwt.sign(
      {
          id: auth.id,
          username: auth.username
      },
      secret,
      {
          expiresIn: "30s"
      });
};

// JWT managment for access tokens
function generateAccessToken(req, res, next) {
  req.token = createAccessToken(req.payload);
  return next();
}

function sendAccessToken(req, res) {
  console.log("sendAccessToken");
  var accessToken = req.token;
  return res.json({ username: req.payload.username, accessToken: accessToken });
}

function createAccessToken(payload) {
  return jwt.sign(
      {
          id: payload.id,
          username: payload.username
      },
      secret,
      {
          expiresIn: "12h"
      });
};

function getTokenFromHeader(req) {
  console.log("getTokenFromHeader -- called");
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Token') {
      console.log("Token found:");
      console.log(req.headers.authorization.split(' ')[1]);
      return req.headers.authorization.split(' ')[1];
  }

  return null;
}

// Generates and sends a more permanent token to be used by client for API requests
router.post('/auth/exchangetoken', expressjwt({
  secret: secret,
  userProperty: 'payload',
  getToken: getTokenFromHeader
}), generateAccessToken, sendAccessToken);

module.exports = router;
