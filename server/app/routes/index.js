module.exports = function (app, passport) {
  /**
   *  SIGNUP
   */
  app.get('/', passport.authenticate('jwt', { session: false}), function(req, res) {
    console.log(req.headers);
    res.send('App started');
  });
  
}