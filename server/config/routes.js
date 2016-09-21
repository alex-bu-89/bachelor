'use strict';

/**
 * Module dependencies.
 */

const home = require('../app/controllers/home');
const fs = require("fs");
const join = require('path').join;
const routePath = join(__dirname, '../app/routes/');

/**
 * Expose
 */
module.exports = function (app, passport) {

  /**
   * Load routes
   */
  fs.readdirSync(routePath).forEach(function (file) {
    var route = routePath + file;
    require(route)(app, passport);
  });

  /**
   * Error handling
   */
  app.use(function (err, req, res, next) {
    // treat as 404
    if (err.message
      && (~err.message.indexOf('not found')
      || (~err.message.indexOf('Cast to ObjectId failed')))) {
      return next();
    }
    console.error(err.stack);
    // error page
    res.status(500).send(err.stack);
  });

  // assume 404 since no middleware responded
  app.use(function (req, res, next) {
    res.status(404).send('Not found 404');
  });
};
