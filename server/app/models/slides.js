/*
 * Module dependencies
 */
const shortid = require('shortid');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var SlidesSchema = new Schema({
  _id: {type: String, default: shortid.generate},
  title: {type: String, default: ''},
  subject: {type: String, default: ''},
  slides: [{
    content: {type: String, default: ''},
    task: {
      type: {type: String},
      questions: {type: String},
      code: {type: String},
      poll: {
        possibleAnswers: [{
          title: {type: String},
          votes: {type: Number}
        }]
      },
      allAnswers: [{
        answer: {type: Schema.Types.Mixed}
      }]
    },
    assets: {type: String, default: ''}
  }]
});

mongoose.model('Slides', SlidesSchema);


