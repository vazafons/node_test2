var express = require('express');
var router = express.Router();
var dateDujour = require('../models/dateDujour');

/* GET home page.*/
router.get('/', function (req, res, next) {
  res.render('index', dateDujour());
});

module.exports = router;
