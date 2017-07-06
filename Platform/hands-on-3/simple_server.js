var bodyParser = require('body-parser');
var express = require('express');

var app = express();

app.get('/', function(request, response) {
  response.send("Hello World!");
});

app.listen(8080, function(request, response) {
  console.log('Listening on port 8080!');
});
