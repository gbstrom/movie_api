/**
 * @fileoverview This file implements two passport strategies ("LocalStrategy" and "JWTStrategy") for authenticating
 * requests to API endpoints. LocalStrategy is used when a user logs in. It validates the username and 
 * password against the users collection in MongoDB. JWTStrategy is used for subsequent requests. This 
 * validates the request by decoding the JWT (which the user should have received on a successful login), 
 * then checks the user ID from the payload against the users collection in MongoDB.
 * @requires passport The passport module creates strategies for authenticating and authorizing requests to the API endpoints.
 * @requires passport-local The passport-local module creates a local strategy.
 * @requires passport-jwt The passport-jwt module creates a jwt strategy and extracts tokens from requests.
 * @requires './models.js' This is the file where data schemas and models are defined.
 */

const passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy,
  Models = require('./models.js'),
  passportJWT = require('passport-jwt');
  //config = require('./config.js');

let Users = Models.User,
  JWTStrategy = passportJWT.Strategy,
  ExtractJWT = passportJWT.ExtractJwt;

/** This is where we configure and register a local authentication strategy */
passport.use(new LocalStrategy({
  usernameField: 'Username',
  passwordField: 'Password'
}, (username, password, callback) =>{
  Users.findOne({ Username: username}, (error, user) => {
    if (error) {
      console.log(error);
      return callback(error);
    }

    if (!user) {
      console.log('incorrect username');
      return callback(null, false, {message: 'Incorrect username or password.'});
    }

    if (!user.validatePassword(password)) {
      console.log('incorrect password');
      return callback(null, false, {message: 'Incorrect password.'});
    }

    console.log('finished');
    return callback(null, user);
  });
}));

/** This is where we configure and register a local authentication strategy */
passport.use(new JWTStrategy({
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'your_jwt_secret'
}, (jwtPayload, callback) => {
  return Users.findById(jwtPayload._id)
    .then((user) => {
      return callback(null, user);
    })
    .catch((error) => {
      return callback(error)
    });
}));
