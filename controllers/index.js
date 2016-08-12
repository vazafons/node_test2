var express = require('express');
var router = express.Router();
var dateDujour = require('../models/dateDujour');
var NbDeFruits = require('../models/NbDeFruits');

var Sequelize = require('sequelize');

var connection = new Sequelize('testsequelize', 'root', 'password');

/*
var fs = require('fs');
var obj;
fs.readFile('fruits.json', 'utf8', function (err, data) {
  if (err) throw err;
  obj = JSON.parse(data);
  kiwis = obj.fruits[0].kiwis;
  //console.log(kiwis);
});
*/

/* GET home page.*/
router.get('/', function (req, res, next) {
  res.render('index', dateDujour());
});

router.get('/test', function (req, res, next) {
  res.render('test',{title: 'youpidouo'});
});


router.get('/fruits', function (req, res, next) {
  //res.render('fruits', NbDeFruits());
  res.render('fruits', {title: connection.sync().then(function () {

connection.query("SELECT * FROM testsequelize.sensorvalues LIMIT 2;").then(function(projects) {
 return (console.log(projects));
})

})
 });
});

module.exports = router; 
