const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports = function (app) {
  /**
   *  SIGNUP
   */
  app.get('/users', function (req, res) {
    User.findOne({}, function (err, users) {
      res.json(users);
    });
  });

  app.get('/user:id', function (req, res) {
    // TODO implement
  });

  app.post('/user', function (req, res) {
    if (!req.body.email || !req.body.password) {
      res.json({success: false, msg: 'Please pass name and password.'});
    } else {
      var newUser = new User({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email,
        isProf: req.body.isProf,
      });
      // save the user
      newUser.save(function (err) {
        if (err) {
          return res.json({success: false, err: err});
        }
        res.json({success: true, msg: 'Successful created new user.'});
      });
    }
  });
}