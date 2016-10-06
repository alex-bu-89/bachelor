var structure = {
  id: 'aX4j9Z',
  subject: {},
  feedback: [],
  slides: [
    {
      content: '<h1>Test structure</h1>',
      task: {
        type: 'code',
        questions: 'Fibonacci numbers',
        code: 'function fibonacci(a){\nfor(var d,b=1,c=0;a>=0;)\nd=b,b+=c,c=d,a--;\nreturn c\n}\nfibonacci(10)',
        answer: '',
        allAnswers: [],
      },
      assets: {},
    },
    {
      task: {
        type: 'poll',
        questions: 'What\'s Your Favorite Programming Language?',
        poll: {
          id: '3fd9f',
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
        answer: '',
        allAnswers: [],
      }
    },
    {
      content: '<h1>Test structure</h1><p>Test text super <a href="">test</a></p><ul><li>item 1</li><li>item 2</li></ul>',
    },
    {
      content: '<h1>Test structure</h1>',
      task: {
        type: 'code', // multiple, quiz, code,
        questions: 'Fibonacci numbers',
        code: 'function fibonacci(a){\nfor(var d,b=1,c=0;a>=0;)\nd=b,b+=c,c=d,a--;\nreturn c\n}\nfibonacci(10)',
        answer: '',
        allAnswers: [],
      }
    },
  ]
};

const mongoose = require('mongoose');
const Tasks = mongoose.model('Tasks');
const AllAnswers = mongoose.model('AllAnswers');
const Slides = mongoose.model('Slides');
const Theme = mongoose.model('Theme');

module.exports = function (app) {
  /**
   *  SIGNUP
   */
  app.get('/slides:id', function (req, res) {
    res.json(structure);
    /*User.findOne({}, function (err, users) {
      res.json(users);
    });*/
  });

  app.post('/slides', function (req, res) {
    var slides = new Slides({
      
    });

    var theme = new Subject({
      title: 'First presentation',
      subject: 'Programming 1',
      slides: slides,
    })
  });

  app.delete('/slides:id', function (req, res) {

  });
};