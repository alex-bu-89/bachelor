/*
 * Module dependencies
 */
const shortid = require('shortid');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var AllAnswersSchema = new Schema({
  answer: { type: String, default: '' },
});

var TasksSchema = new Schema({
  type: { type: String, default: '' },
  code: { type: String, default: '' },
  answer: { type: String, default: '' },
  allAnswers: { type: Schema.Types.ObjectId, ref: 'AllAnswers' },
});

var SlidesSchema = new Schema({
  content: { type: String, default: '' },
  task: { type: Schema.Types.ObjectId, ref: 'Tasks' },
  assets: { type: String, default: '' },
});

/**
 * Slides schema
 */
var ThemeSchema = new Schema({
  _id: { type: String, default: shortid.generate },
  title: { type: String, default: '' },
  subject: { type: String, default: '' },
  slides: { type: Schema.Types.ObjectId, ref: 'Slide' },
});

/**
 * Register modul
 */
mongoose.model('Tasks', TasksSchema);
mongoose.model('AllAnswers', AllAnswersSchema);
mongoose.model('Slides', SlidesSchema);
mongoose.model('Theme', ThemeSchema);


