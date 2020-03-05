var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var Students = [];
  var daily_query = "CALL ShowAllStudentsInfo();";
  con.query(daily_query, function (err, dailyStudents) {
    if (err) throw err;
    recurseDailies(Students,dailyStudents,0,res);
  })
});

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

updateData();

module.exports = router;