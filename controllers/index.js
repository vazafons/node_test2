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
  res.render('test', { title: 'youpidouo' });
});


router.get('/fruits', function (req, res, next) {
  connection.query("SELECT * FROM testsequelize.sensorvalues order by Sensors_SID;")
    .then(function (projects) {
      var structuredValues= [];
      
      projects[0].map(function(currentSensorItem){
        var existingSensorObjs = structuredValues.filter(function(sensor){ return sensor.title === currentSensorItem.Sensors_SID });
        var existingSensor;

        if(existingSensorObjs.length > 0){
          existingSensor =  existingSensorObjs[0];
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

        if(existingSensorObjs.length <= 0){
         structuredValues.push(existingSensor);
        }
      });

      res.render('fruits', {
        title: projects[0][0].Sensors_SID,
        sensId: projects[0][0].Sensors_SID,
        sensVal: projects[0][0].Value,
        sensors: projects[0],
        values : structuredValues
      });
    });
});

module.exports = router; 
