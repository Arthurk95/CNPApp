var express = require('express');
var router = express.Router();
var request = require('request-promise');
const auth = require('../public/javascripts/loginScripts');

/* GET home page. */
router.get('/', auth.checkAuthenticated, function(req, res, next) {
  var activity_query = "CALL PullUnhiddenActivities";
  /* Students of current day */
  var student_query = "CALL PullUnhiddenStudents();";

  /* All students [for testing purposes right now] */
  /* var student_query = "CALL ShowAllStudents();"; */

  con.query(student_query, function (err, sQuery) {
    if (err) throw err;
    con.query(activity_query, function (err, aQuery) {
      if (err) throw err;
      res.render('tracker.ejs', {title: 'Student Page', students: sQuery[0],  activities: aQuery[0]});
    })
  })
  
});

router.post('/addstudentActivity', auth.checkAuthenticated, function(req, res){
  stus = req.body.stu.split(",");

  var sql = "SELECT dateTimes FROM Weather WHERE weatherID = (SELECT MAX(weatherID) FROM Weather);";
  con.query(sql, function(err,result){
    var recent = '';
    if(result.length == 0){
      recent = new Date(1970,02,01);
    }
    else{
      recent = new Date(result[0].dateTimes);
    }
    var now = new Date();
    now.setMinutes(now.getMinutes()-30);
    if(recent < now){
      request(weatherdata).then(body=> {parseWeather(body,con)});
    }
  })
  

  recursepost(0,stus,req.body.act,req.body.numStu,res, con);
  
});

function recursepost(i,stus,act,num,res, con){
  var sql = "CALL AddDailyActivity('" + stus[i] + "','" + act + "');";
  con.query(sql, function (err, result) {
    if(i < num){
      recursepost(i+1,stus,act,num,res, con);
    }
    if(i == num){
      res.end();
    }
  });
}

function parseWeather(data,con){
  oData = JSON.parse(data);
  var gust = 0;
  if(oData.wind.gust){
    gust =oData.wind.gust;
  }
  var sql = "CALL AddWeatherData('" + oData.weather[0].main + "', '" + oData.weather[0].description +
  "', " + oData.main.temp + ", " + oData.main.feels_like + ", " + oData.main.temp_min + ", " + oData.main.temp_max + 
  ", " + oData.main.pressure + ", " + oData.main.humidity + ", " + oData.wind.speed + ", " + oData.wind.deg + ", " + gust + ");";
  con.query(sql, function (err, result) {
  });
}

router.post('/add-potty-break', auth.checkAuthenticated, function (req, res) {
  var students = req.body.students.split(",");
  for (var i = 0; i < students.length; i++) {
    var push_potty_query = `CALL InsertBathroomBreak(${students[i]});`;
    (function (query) {
      console.log(push_potty_query);
      con.query(query, function (err) {
        if (err) {
          console.log(err);
        }
      });
    })(push_potty_query); //closure necesssary for async
  }

  if (req.body.accidentFlag == 'true') {
    for (var i = 0; i < students.length; i++) {
      var increase_accident_query = `CALL InsertAccidentNumber(${students[i]});`;
      (function (query) {
        console.log(increase_accident_query);
        con.query(query, function (err) {
          if (err) {
            console.log(err);
          }
        });
      })(increase_accident_query); //closure necesssary for async
    }
  }
  res.end();
});

module.exports = router;