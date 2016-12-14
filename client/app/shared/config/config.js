export default {
  API_ENDPOINT: 'http://78.47.217.227:8000',
  NOT_AUTHENTICATED: 'auth-not-authenticated',
  TEST_STRUCTURE: {
    _id: 'aX4j9Z',
    subject: {},
    feedback: [],
    slides: [
      {
        content: '<h2>Unterrichtssystem v0.1</h2>',
        assets: {},
        vertical: true
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
      {
        task: {
          type: "code",
          questions: "Programmieraufgabe: Schreiben sie eine Funktion die Fibonacci-Zahlen berechnet",
          codeTask: {
            code: 'function fibonacci(num){\nvar result = 0;\n // dein code hier\nreturn result;\n}\nfibonacci(5);',
            unitTest: 'var expect = require("chai").expect;\n\n' +
            'describe("Fibonacci",function (){' +
            '\nit("shoud return fibonacci number", \nfunction (){\n' +
            'expect(fibonacci(0)).to.equal(1);\n' +
            'expect(fibonacci(1)).to.equal(1);\n' +
            'expect(fibonacci(2)).to.equal(2);\n' +
            'expect(fibonacci(3)).to.equal(3);\n' +
            'expect(fibonacci(4)).to.equal(5);\n' +
            'expect(fibonacci(5)).to.equal(8);\n' +
            'expect(fibonacci(6)).to.equal(13);\n' +
            'expect(fibonacci(7)).to.equal(21);\n' +
            'expect(fibonacci(8)).to.equal(34);\n' +
            '});\n});',
          },
          allAnswers: [],
          poll: {
            possibleAnswers: []
          }
        }
      },
      {
        task: {
          type: "code",
          questions: "Programmieraufgabe: Schreiben sie eine Funktion die Fibonacci-Zahlen berechnet",
          codeTask: {
            code: 'function fibonacci(num){\nvar result = 0; \nvar a = 1, temp;\nwhile (num >= 0){\ntemp = a; a = a + result; result = temp; num--;\n}\nreturn result;\n}\nfibonacci(5);',
            unitTest: 'var expect = require("chai").expect;\n\n' +
            'describe("Fibonacci",function (){' +
            '\nit("shoud return fibonacci number", \nfunction (){\n' +
            'expect(fibonacci(0)).to.equal(1);\n' +
            'expect(fibonacci(1)).to.equal(1);\n' +
            'expect(fibonacci(2)).to.equal(2);\n' +
            'expect(fibonacci(3)).to.equal(3);\n' +
            'expect(fibonacci(4)).to.equal(5);\n' +
            'expect(fibonacci(5)).to.equal(8);\n' +
            'expect(fibonacci(6)).to.equal(13);\n' +
            'expect(fibonacci(7)).to.equal(21);\n' +
            'expect(fibonacci(8)).to.equal(34);\n' +
            '});\n});',
          },
          allAnswers: [],
          poll: {
            possibleAnswers: []
          }
        }
      },
    ]
  }
}
