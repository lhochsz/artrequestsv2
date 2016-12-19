'use strict';

/**
 * Module dependencies.
 */
var passport = require('passport');

module.exports = function (app) {
// User Routes
    var users = require('../../app/controllers/users');

// User Routes
    app.get('/signout', users.signout);
    app.get('/users/me', users.me);

// Setting up the users api
    app.post('/users', users.create);

// Setting the local strategy route
    app.post('/users/session', passport.authenticate('local', {
        failureRedirect: '/signin',
        failureFlash: true,
    }), users.session);

    // Finish with setting up the userId param
    app.param('userId', users.user);


};

