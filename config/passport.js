'use strict';

var passport = require('passport'),
    _ = require('lodash');
// These are different types of authentication strategies that can be used with Passport. 
var LocalStrategy = require('passport-local').Strategy,
   config = require('./config'),
   db = require('./sequelize'),
   winston = require('./winston');

   // load up the user model
var Sequelize = require('sequelize');
var User            = require('../app/models/user');

require('sequelize-isunique-validator')(Sequelize);

//Serialize sessions
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    db.User.find({where: {id: id}}).then(function(user){
        if(!user){
            winston.warn('Logged in user not in database, user possibly deleted post-login');
            return done(null, false);
        }
        winston.info('Session: { id: ' + user.id + ', username: ' + user.username + ' }');
        done(null, user);
    }).catch(function(err){
        done(err, null);
    });
});

//Use local strategy
passport.use('local', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
  },
  function(username, password, done) {
    db.User.find({ where: { username: username }}).then(function(user) {
      if (!user) {
        return done(null, false, { message: 'Unknown user' });
      } else if (!user.authenticate(password)) {
        done(null, false, { message: 'Invalid password'});
      } else {
        winston.info('Login (local) : { id: ' + user.id + ', username: ' + user.username + ' }');
        done(null, user);
      }
    }).catch(function(err){
      done(err);
    });
  }
));

module.exports = passport;

