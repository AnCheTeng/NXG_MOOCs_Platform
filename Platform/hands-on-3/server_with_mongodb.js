var mongoose = require('mongoose');
var express = require('express');

var app = express();
var Packet = require('./model/Packet');
mongoose.connect('mongodb://localhost/iotplatform');

app.get('/', function(request, response) {
  response.send("Hello World!");
});

app.get('/packets', function(request, response) {
  Packet.find(function(err, result) {
    response.send(result);
  })
});

app.get('/packets/:src', function(request, response) {
  Packet.find({
    src: request.params.src
  }, function(err, result) {
    response.send(result);
  })
});

app.get('/rssis', function(request, response) {
  var myQuery = {};
  if (request.query.src) {
    myQuery.src = request.query.src;
  }
  if (request.query.dest) {
    myQuery.dest = request.query.dest;
  }

  Packet.find(myQuery, function(err, result) {
    var rssiList = result.map(function(packet) {
      // return packet.rssi;
      return [packet.rssi, new Date(packet.timestamp)];
    });
    response.send(rssiList);
  })
});

app.listen(8080, function(request, response) {
  console.log('Listening on port 8080!');
});
