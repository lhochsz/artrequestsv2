
var passport = require('passport');
var _ = require('lodash');
// These are different types of authentication strategies that can be used with Passport. 
var LocalStrategy = require('passport-local').Strategy;
// var TwitterStrategy = require('passport-twitter').Strategy;
// var FacebookStrategy = require('passport-facebook').Strategy;
// var GitHubStrategy = require('passport-github').Strategy;
// var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var config = require('./config');
var db = require('./sequelize');
var User = db.User;

//Serialize sessions
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.find({where: {id : id}}, function(err, user){
    done(err, user);
  });
});

//Use local strategy
passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
  function(email, password, done) {
    User.find(
        { where: { email: email }
    }, function(err, user) {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, {
          message: 'Unknown user'
        });
      }
      if (!user.authenticate(password)) {
        return done(null, false, {
          message: 'Invalid password'
        });
      }
      return done(null, user);
    });
  }
));

module.exports = passport;

    //Use twitter strategy
    // passport.use(new TwitterStrategy({
    //         consumerKey: config.twitter.clientID,
    //         consumerSecret: config.twitter.clientSecret,
    //         callbackURL: config.twitter.callbackURL
    //     },
    //     function(token, tokenSecret, profile, done) {
    //         User.findOne({
    //             'twitter.id_str': profile.id
    //         }, function(err, user) {
    //             if (err) {
    //                 return done(err);
    //             }
    //             if (!user) {
    //                 user = new User({
    //                     name: profile.displayName,
    //                     username: profile.username,
    //                     provider: 'twitter',
    //                     twitter: profile._json
    //                 });
    //                 user.save(function(err) {
    //                     if (err) console.log(err);
    //                     return done(err, user);
    //                 });
    //             } else {
    //                 return done(err, user);
    //             }
    //         });
    //     }
    // ));

    //Use facebook strategy
    // passport.use(new FacebookStrategy({
    //         clientID: config.facebook.clientID,
    //         clientSecret: config.facebook.clientSecret,
    //         callbackURL: config.facebook.callbackURL
    //     },
    //     function(accessToken, refreshToken, profile, done) {
    //         User.findOne({
    //             'facebook.id': profile.id
    //         }, function(err, user) {
    //             if (err) {
    //                 return done(err);
    //             }
    //             if (!user) {
    //                 user = new User({
    //                     name: profile.displayName,
    //                     email: profile.emails[0].value,
    //                     username: profile.username,
    //                     provider: 'facebook',
    //                     facebook: profile._json
    //                 });
    //                 user.save(function(err) {
    //                     if (err) console.log(err);
    //                     return done(err, user);
    //                 });
    //             } else {
    //                 return done(err, user);
    //             }
    //         });
    //     }
    // ));

    //Use github strategy
    // passport.use(new GitHubStrategy({
    //         clientID: config.github.clientID,
    //         clientSecret: config.github.clientSecret,
    //         callbackURL: config.github.callbackURL
    //     },
    //     function(accessToken, refreshToken, profile, done) {
    //         User.findOne({
    //             'github.id': profile.id
    //         }, function(err, user) {
    //             if (!user) {
    //                 user = new User({
    //                     name: profile.displayName,
    //                     email: profile.emails[0].value,
    //                     username: profile.username,
    //                     provider: 'github',
    //                     github: profile._json
    //                 });
    //                 user.save(function(err) {
    //                     if (err) console.log(err);
    //                     return done(err, user);
    //                 });
    //             } else {
    //                 return done(err, user);
    //             }
    //         });
    //     }
    // ));

    //Use google strategy
    // passport.use(new GoogleStrategy({
    //         clientID: config.google.clientID,
    //         clientSecret: config.google.clientSecret,
    //         callbackURL: config.google.callbackURL
    //     },
    //     function(accessToken, refreshToken, profile, done) {
    //         User.findOne({
    //             'google.id': profile.id
    //         }, function(err, user) {
    //             if (!user) {
    //                 user = new User({
    //                     name: profile.displayName,
    //                     email: profile.emails[0].value,
    //                     username: profile.username,
    //                     provider: 'google',
    //                     google: profile._json
    //                 });
    //                 user.save(function(err) {
    //                     if (err) console.log(err);
    //                     return done(err, user);
    //                 });
    //             } else {
    //                 return done(err, user);
    //             }
    //         });
    //     }
    // ));