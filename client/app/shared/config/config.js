export default {
  API_ENDPOINT: 'http://127.0.0.1:8000',
  NOT_AUTHENTICATED: 'auth-not-authenticated',
  TEST_STRUCTURE: {
    _id: 'aX4j9Z',
    subject: {},
    feedback: [],
    slides: [
      /*{
        content: '<h2>Unterrichtssystem</h2>',
        assets: {},
        vertical: true
      },
      {
        content: '<h2>Verwendung der for Schleife</h2><br />' +
        '<pre><code>for (var i = 0; i < 9; i++) {\n' +
        '    console.log(i);\n' +
        '    // more statements\n' +
        '}</code></pre><br />' +
        '<p>Die folgende for Anweisung initialisiert die Variable <span>i</span> mit null. Die Bedingung prüft ob i kleiner neun ist, führt den Code in der block Anweisung aus und erhöht i um eins nach jedem Schleifendurchlauf.</p>',
        assets: {}
      },*/
      {
        task: {
          type: "code",
          questions: "Programmieraufgabe: Fibonacci-Folge",
          codeTask: {
            code: 'function fibonacci(num){\nvar a = 1, b = 0, temp;\nwhile (num >= 0){\ntemp = a; a = a + b; b = temp; num--;\n}\nreturn b;\n}\nfibonacci(5);',
            unitTest: 'var expect = require("chai").expect;\n\n' +
            'describe("Fibonacci",function (){' +
            '\nit("shoud return fibonacci number", \nfunction (){\n' +
            'expect(fibonacci(0)).to.equal(1);\n' +
            'expect(fibonacci(1)).to.equal(1);\n' +
            'expect(fibonacci(2)).to.equal(2);\n' +
            'expect(fibonacci(6)).to.equal(13);\n' +
            'expect(fibonacci(8)).to.equal(34);\n' +
            '});\n});',
          },
          allAnswers: [],
          poll: {
            possibleAnswers: []
          }
        }
      },{
        task: {
          "type": "code",
          "questions": "Verwendung der for Schleife",
          "codeTask": {
            unitTest: '',
            code: 'for (var i = 0; i < 9; i++) {\n console.log(i);\n // more statements \n}'
          },
          "allAnswers": [],
          "poll": {
            "possibleAnswers": []
          }
        }
      },
      {
        task: {
          "type": "poll",
          "questions": "Wie gut schätzen Sie ihr Vorwissen in JavaScript ein?",
          "allAnswers": [],
          codeTask: {} ,
          "poll": {
            "possibleAnswers": [
              {
                "title": "kein Vorwissen",
                "votes": 0,
                "_id": "57fa795d23546e995b83ce38"
              },
              {
                "title": "etwas",
                "votes": 0,
                "_id": "57fa795d23546e995b83ce37"
              },
              {
                "title": "geht so",
                "votes": 0,
                "_id": "57fa795d23546e995b83ce36"
              },
              {
                "title": "recht gut",
                "votes": 0,
                "_id": "57fa795d23546e995b83ce35"
              },
              {
                "title": "sehr gutes Vorwissen",
                "votes": 0,
                "_id": "57fa795d23546e995b83ce35"
              }
            ]
          }
        },
      },
    ]
  }
}
