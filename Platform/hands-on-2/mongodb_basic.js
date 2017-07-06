var mongoose = require('mongoose');

var Packet = require('./model/Packet');
mongoose.connect('mongodb://localhost/iotplatform');

// Find
Packet.find({
  src: 4,
  dest: 2
}, function(err, result) {
  console.log(result);
  mongoose.disconnect();
})

// Remove
Packet.findOne({
  src: 4,
  dest: 2
}, function(err, result) {
  if (result) {
    result.remove(function() {
      mongoose.disconnect();
    });
  } else {
    mongoose.disconnect();
  }
})

// Update
Packet.findOne({
  src: 4
}, function(err, result) {
  result.dest = 7;
  result.save(function() {
    mongoose.disconnect();
  });
})
