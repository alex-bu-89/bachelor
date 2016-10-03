module.exports = function (app, passport) {

  const Sandbox = require('sandbox');

  app.get('/checkcode', function(req, res) {
    res.send('checkcode');
  });

  app.post('/execute-code', function(req, res) {
    var code = req.body.codeToExecute;
    console.log(code);
    var s = new Sandbox();
    s.run(code, function(output) {
      res.json(output);
    });
  });
  
};