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
      var array = []
      var init = projects[0][0].Sensors_SID
      var k = 0;
      var obj = {
        title: init,
        values: [{
        sensVal: projects[0][0].Value
        }]
      }
      //array.push(obj);
      for (var i = 1; i < projects[0].length - 1; i++) {
        if (init == projects[0][i].Sensors_SID) {
          //array.init.push({title: projects[0][0].Sensors_SID, sensVal: projects[0][0].Value});
          obj.values.push({ sensVal: projects[0][i].Value });
          array[k] = obj;
        }
        else {
          k++
          init = projects[0][i].Sensors_SID;
          var obj = {
            title: init,
            values: [{
              sensVal: projects[0][i].Value
            }]
          }
          //array.push(obj);
        }
      }
      res.render('fruits', {
        title: projects[0][0].Sensors_SID,
        sensId: projects[0][0].Sensors_SID,
        sensVal: projects[0][0].Value,
        sensors: projects[0],
        values : array
      })
      // console.log("start-toto")
      console.log(projects)
      // console.log("end-toto")
    });
});

module.exports = router; 
