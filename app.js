'use strict'
var express = require('express');
var app = express();
var http = require('http');
var moment = require('moment');
var hour = moment().format('LLLL');

//app.use(express.static('public'));

var server = http.createServer(function(req, res) {
  res.writeHead(200);
  res.end(hour);
});

server.listen(8000); 
