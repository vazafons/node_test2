var express = require('express');
var router = express.Router();
var dateDujour = require('../models/dateDujour');
var NbDeFruits = require('../models/NbDeFruits');
var Sequelize = require('sequelize');

var connection = new Sequelize('testsequelize', 'root', 'password');

var Post = connection.define('sensorvalues', {});
//var connection = new Sequelize('testsequelize', 'insertValues', 'pass');

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

router.get('/graph', function (req, res, next) {
  res.render('graph');
});

router.get('/sensor', function (req, res, next) {
  var sensId = req.query.selectSensor;
  var calendar = req.query.calendar;
  var timeBegin = req.query.timeDebut;
  var timeEnd = req.query.timeFin;
  var timeFinal1 = calendar + " " + timeBegin;
  var timeFinal2 = calendar + " " + timeEnd;
  var moment = require('moment');
  //connection.query("SELECT * FROM testsequelize.sensorvalues Where Sensors_SID = \'" + sensId + "\'")
  //connection.query("SELECT * FROM testsequelize.sensorvalues Where Sensors_SID = \'" + sensId + "\' AND CreatedAt BETWEEN \'" + timeFinal1 + "\' AND \'" + timeFinal2 + "\'")
  /*
  Post.findAll({
    where: { Sensors_SID: "DW1" },
    attributes: ['*']
  })
  */
  connection.query("SELECT * FROM testsequelize.sensorvalues Where Sensors_SID = 'DW1'")
  .then(function (project) {

      console.log(project[0][0].Sensors_SID);
      console.log(project[0][0].Value);
      console.log(project[0][0].CreatedAt);
      console.log(project[0]);
        

    res.render('sensor', {
      title:  project[0][0].Sensors_SID,
      sensId: project[0][0].Sensors_SID,
      sensVal: project[0][0].Value,
      sensDate: project[0][0].CreatedAt,
      sensors: project[0],
    });
});
});

//connection.query("SELECT * FROM testsequelize.sensorvalues order by Sensors_SID;")
router.get('/sensors', function (req, res, next) {
  connection.query("Select acquisitionsys.Computername, sensors.SID, boards.BID FROM acquisitionsys INNER JOIN boards ON acquisitionsys.IdAcquisitionSys = boards.AcquisitionSys_IdAcquisitionSys INNER JOIN sensors ON boards.AcquisitionSys_IdAcquisitionSys = sensors.Boards_AcquisitionSys_IdAcquisitionSys")
    .then(function (projects) {
      console.log(projects[0])

      res.render('sensors', {
        title: projects[0]
      });
/*
      
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
      */
    });
});

module.exports = router; 
