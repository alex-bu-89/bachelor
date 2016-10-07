'use strict';

/*
 * nodejs-express-mongoose
 * Copyright(c) 2015 Madhusudhan Srinivasa <madhums8@gmail.com>
 * MIT Licensed
 */

/**
 * Module dependencies
 */

require('dotenv').config();

const fs = require('fs');
const join = require('path').join;
const express = require('express');
const http = require('http')
const mongoose = require('mongoose');
const passport = require('passport');
const config = require('./config');

const models = join(__dirname, 'app/models');
const port = process.env.PORT || 8000;

const app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
const connection = connect();

/**
 * Expose
 */

module.exports = {
  app,
  connection
};

// Bootstrap models
fs.readdirSync(models)
  .filter(file => ~file.indexOf('.js'))
  .forEach(file => require(join(models, file)));

// Bootstrap routes
require('./config/passport')(passport);
require('./config/express')(app, passport);
require('./config/routes')(app, passport);

connection
  .on('error', console.log)
  .on('disconnected', connect)
  .once('open', listen);

function listen () {
  if (app.get('env') === 'test') return;
  server.listen(port);
  console.log('Express app started on port ' + port);
}

function connect () {
  var options = { server: { socketOptions: { keepAlive: 1 } } };
  var connection = mongoose.connect(config.db, options).connection;
  return connection;
}

// Communication service
var clients = [];

var slides = io.sockets.on('connection', function (client) {
  console.log('connecting client with id: ' + client.id);
  clients[client.id] = {socket: client};

  client.on('client:connected', function(data) {
    console.log('client connected: ', client.id);
    clients[client.id].user = {name: data.name};
    client.emit('client:update', clients);
  });

  client.on('disconnect', function() {
    console.log('client disconnected: ', client.id + '\n');
    delete clients[client.id];
  });

  client.on('slide:changed', function (data) {
    console.log('slide changed: ', data);
    client.broadcast.emit('slide:navigate', data);
  });

  client.on('task:updateAllAnswers', function(data) {
    console.log('task:allAnswers: ', data);
    slides.emit('task:updateAllAnswers:broadcast', data);
  });
  
  client.on('task:poll:updateData', function(data) {
    console.log('task:poll:updateData: ', data);
    slides.emit('task:poll:updateData:broadcast', data);
  });

});
