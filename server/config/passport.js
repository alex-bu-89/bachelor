'use strict';

/*
 * Module dependencies.
 */

const mongoose = require('mongoose');
const local = require('./passport/local');
const jwt = require('./passport/jwt');

const User = mongoose.model('User');
/**
 * Expose
 */

module.exports = function (passport) {
  passport.use(jwt);
};
