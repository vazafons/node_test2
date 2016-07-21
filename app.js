'use strict'
var express = require('express');
var app = express();
var http = require('http');
var moment = require('moment');
var hour = moment().format('LLLL');

//app.use(express.static('public')); 

function getDateTime() {

    var date = new Date();

    var hour = date.getHours();
    

    var min  = date.getMinutes();
    

    var sec  = date.getSeconds();
    

    var year = date.getFullYear();

    var month = date.getMonth() + 1;
   

    var day  = date.getDate();
    

    return year + ":" + month + ":" + day + ":" + hour + ":" + min + ":" + sec;

}

var server = http.createServer(function(req, res) {
  res.writeHead(200);
  res.end(getDateTime());
});

server.listen(8000); 
