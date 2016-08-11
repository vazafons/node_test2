var express = require('express');
var router = express.Router();
var dateDujour = require('../models/dateDujour');

/* GET home page.*/
router.get('/', function (req, res, next) {
  res.render('index', dateDujour());
});

router.get('/test', function (req, res, next) {
  res.render('test',{title: 'youpidouo'});
});

module.exports = router; 
