const mongoose = require('mongoose');
const User = mongoose.model('User');
const jwt = require('jwt-simple');
var config = require('../../config/env/development');

module.exports = function (app) {

  /**
   *  AUTHENTICATE
   */
  app.post('/authenticate', function (req, res) {
    console.log(req.body);
    User.findOne({
      email: req.body.email
    }, function (err, user) {
      if (err) throw err;

      if (!user) {
        res.json({success: false, msg: 'Authentication failed. User not found.'});
      } else {
        // check if password matches
        user.comparePassword(req.body.password, function (err, isMatch) {
          if (isMatch && !err) {
            // if user is found and password is right create a token
            var token = jwt.encode(user, config.secret);
            // return the information including token as JSON
            res.json({success: true, token: 'JWT ' + token});
          } else {
            res.json({success: false, msg: 'Authentication failed. Wrong password.'});
          }
        });
      }
    });
  });
};