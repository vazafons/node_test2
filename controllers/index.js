var express = require('express');
var router = express.Router();
var dateDujour = require('../models/dateDujour');
var NbDeFruits = require('../models/NbDeFruits');

var Sequelize = require('sequelize');

//var connection = new Sequelize('testsequelize', 'root', 'password');
var connection = new Sequelize('testsequelize', 'insertValues', 'pass');

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
  res.render('test', { title: 'youpidouo' });
});

router.get('/sensor', function (req, res, next) {
  var sensId = req.query.selectSensor;
  var calendar = req.query.calendar;
  var timeBegin = req.query.timeDebut;
  //var timeEnd = req.query.timeFin;
  //var timeFinal = null;
  connection.query("SELECT * FROM testsequelize.sensorvalues Where Sensors_SID = \'" + sensId + "\'")
    .then(function (projects) {
      var structuredValues = [];

      projects[0].map(function (currentSensorItem) {
        var existingSensorObjs = structuredValues.filter(function (sensor) { return sensor.title === currentSensorItem.Sensors_SID });
        var existingSensor;

        if (existingSensorObjs.length > 0) {
          existingSensor = existingSensorObjs[0];
        } else {
          existingSensor = {
            title: currentSensorItem.Sensors_SID,
            values: []
          };

          //existingSensor[currentSensorItem.Sensors_SID] = {};
        }

        existingSensor.values.push({
          sensVal: currentSensorItem.Value,
          date: currentSensorItem.CreatedAt
        });

        if (existingSensorObjs.length <= 0) {
          structuredValues.push(existingSensor);
        }
      });

      res.render('sensor', {
        title: projects[0][0].Sensors_SID,
        sensId: projects[0][0].Sensors_SID,
        sensVal: projects[0][0].Value,
        sensors: projects[0],
        values: structuredValues
      });
     });
});


router.get('/sensors', function (req, res, next) {
  connection.query("SELECT * FROM testsequelize.sensorvalues order by Sensors_SID;")
    .then(function (projects) {
      var structuredValues = [];

      projects[0].map(function (currentSensorItem) {
        var existingSensorObjs = structuredValues.filter(function (sensor) { return sensor.title === currentSensorItem.Sensors_SID });
        var existingSensor;

        if (existingSensorObjs.length > 0) {
          existingSensor = existingSensorObjs[0];
        } else {
          existingSensor = {
            title: currentSensorItem.Sensors_SID,
            values: []
          };

          //existingSensor[currentSensorItem.Sensors_SID] = {};
        }

        existingSensor.values.push({
          sensVal: currentSensorItem.Value,
          date: currentSensorItem.CreatedAt
        });

        if (existingSensorObjs.length <= 0) {
          structuredValues.push(existingSensor);
        }
      });

      res.render('sensors', {
        title: projects[0][0].Sensors_SID,
        sensId: projects[0][0].Sensors_SID,
        sensVal: projects[0][0].Value,
        sensors: projects[0],
        values: structuredValues
      });
    });
});

module.exports = router; 
