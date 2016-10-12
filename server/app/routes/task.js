module.exports = function (app, passport) {

  var Mocha = require('mocha'),
    fs = require('fs'),
    path = require('path');

  const Sandbox = require('sandbox');

  app.get('/checkcode', function (req, res) {

    var before_test = 'var expect = require("chai").expect;\n'

    var code = 'var fibonacci = function(num){ var a = 1, b = 0, temp; while (num >= 0){ temp = a; a = a + b; b = temp; num--; } return b;};'

    var unitTest = 'describe("Fibonacci", function () { it("shoud return fibonacci number", function () { ' +
      'expect(fibonacci(0)).to.equal(1);' +
      'expect(fibonacci(1)).to.equal(1);' +
      'expect(fibonacci(2)).to.equal(2);' +
      'expect(fibonacci(6)).to.equal(13);' +
      'expect(fibonacci(8)).to.equal(34);' +
      '});});';

    var filename = 'unit-test.js';
    var result = {};

    // Instantiate a Mocha instance.
    var mocha = new Mocha();

    var testDir = path.dirname(require.main.filename)+ '/test/';

    fs.unlink(testDir + filename);

    // writing the unit test
    fs.writeFile(testDir + filename, before_test + '\n' + code + '\n' + unitTest, { flag: 'wx' }, (err) => {
      if (err) console.log(err);

      console.log("It's saved!");

      mocha.addFile(testDir + filename);

      // Run the tests.
      var runner = mocha.run( (failures) => {
        console.log(failures)
        if (failures) console.log('fail');
      });

      runner.on('pass', (pass) => {
        result = {
          "title": pass.title,
          "body": pass.body,
          "timedOut": pass.timedOut,
          "pending": pass.pending,
          "type": pass.test,
          "file": pass.file,
          "duration": pass.duration,
          "state": pass.state,
          "speed": pass.fast
        };
      });

      runner.on('fail', (fail) => {
        result = {
          "title": fail.title,
          "body": fail.body,
          "timedOut": fail.timedOut,
          "pending": fail.pending,
          "type": fail.test,
          "file": fail.file,
          "duration": fail.duration,
          "state": fail.state,
          "speed": fail.fast,
          "err": fail.err
        };
      });

      runner.on('end', () => {
        console.log(result);
        res.json(result);
      });

    });
  });

  app.post('/execute-code', function (req, res) {
    var code = req.body.codeToExecute;
    // ... checking code
    var s = new Sandbox();
    s.run(code, function (output) {
      res.json(output);
    });
  });

};