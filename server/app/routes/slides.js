const mongoose = require('mongoose');
/*
 const Tasks = mongoose.model('Tasks');
 const AllAnswers = mongoose.model('AllAnswers');
 const Theme = mongoose.model('Theme');
 */

const Slides = mongoose.model('Slides');

module.exports = function (app) {

  app.get('/slides', function (req, res) {
    Slides.find({}, function (err, slides) {
      res.json(slides);
    });
  });

  app.get('/slides/:id', function (req, res) {
    Slides.findOne({_id: req.params.id}, function (err, slides) {
      res.json(slides);
    });
  });

  app.post('/slides', function (req, res) {

    // TODO remove
    var slides = new Slides({
      title: 'test',
      subject: 'subject'
    });
    slides.slides = [
      {
        content: '<h1>Test structure from db</h1>',
        task: {
          type: 'code',
          questions: 'What is',
          code: "console.log('hello world')",
          answer: ''
        }
      },
      {
        content: '<h1>Test structure from db</h1>',
        task: {
          type: 'poll',
          questions: 'What\'s Your Favorite Programming Language?',
          poll: {
            possibleAnswers: [
              {
                title: 'Java',
                votes: 0
              },
              {
                title: 'C++',
                votes: 0
              },
              {
                title: 'JavaScript',
                votes: 0
              },
              {
                title: 'Rails',
                votes: 0
              }
            ]
          },
          answer: ''
        }
      },
      {
        content: '<h1>Test structure</h1><p>Hello world</p>'
      }
    ];

    slides.save(function (err) {
      if (err) {
        return res.json({success: false, err: err});
      }
      Slides.findOne({_id: slides._id}, function (err, slides) {
        res.json(slides);
      });
    });

  });

  app.put('/slides/:id', function (req, res) {
    console.log(req.params.id);
    Slides.findOneAndUpdate({_id: req.params.id}, {$set: req.update}, {new: true}, function (err, doc) {
      if (err) {
        res.json({msg: "Something wrong when updating data!", e: err});
      }
      res.json(doc);
    });
  });

  app.delete('/slides/:id', function (req, res) {
    console.log(req.params.id);
    Slides.remove({_id: req.params.id}, function (err, removed) {
      if (err) {
        res.json({msg: "Something wrong when updating data!", e: err});
      }
      res.json({msg: "Successful", removed: removed});
    });
  });

  app.delete('/slides', function (req, res) {
    /*Slides.remove({}, function (err, removed) {
      if (err) {
        res.json({msg: "Something wrong when updating data!", e: err});
      }
      res.json({msg: "Successful", removed: removed});
    });*/
  });

};