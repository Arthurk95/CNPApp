var express = require('express');
var router = express.Router();
var activities = [];

var Students = [];
var numStudents = 0;

/* GET home page. */
router.get('/', function(req, res, next) {
  
  var Student = {
    id: 0,
    name: "",
    listOfActivities: []
  };

  var daily_query = "CALL PullUnhiddenStudents();";
  con.query(daily_query, function (err, dailyStudents) {
    if (err) throw err;
    console.log(dailyStudents);
    for(var i = 0; i < (dailyStudents[0].length); i++){
      Student.id = dailyStudents[0][i].StudentId;
      Student.name = dailyStudents[0][i].StudentName;
      Students.push({
        id: Student.id,
        name: Student.name,
        listOfActivities: Student.listOfActivities
      });
      var today = '"2020-02-16"';
      numStudents++;
    }

    for(var i = 0; i < Students.length; i++){
      activities_query = "CALL ShowStudentDailyActivities(" + Students[i].id + 
        ", " + today + ");";

      con.query(activities_query, function(err, activities){
        if(err) throw err;
        for(var j = 0; j < numStudents; j++){
          for(var k = 0; k < activities[0].length; k++){
            Students[j].listOfActivities.push(activities[0][k].ActivityName);
          }
        }
        //console.log(Students);
        res.render('reports', { title: 'CNP Daily Report', report: Students });

      }) 
    }
    
    
  })
});

  module.exports = router;
