var express = require('express');
var app = express();

app.get('/', function(req, res){
  res.send('CAN HAZ INTELLIGENCE???');
});

app.listen(80);