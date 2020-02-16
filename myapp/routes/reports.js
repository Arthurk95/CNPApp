var express = require('express');
var router = express.Router();

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

      for(var i = 0; i < (dailyStudents[0].length); i++){
        Students.push(Student);
        Students[i].id = dailyStudents[0][i].StudentId;
        Students[i].name = dailyStudents[0][i].StudentName;
        console.log(Students);
        var today = '"2020-02-16"';
        activities_query = "CALL ShowStudentDailyActivities(" + Students[i].id + 
          ", " + today + ");";
        numStudents++;
      }

      console.log(Students);

      con.query(activities_query, function(err, activities){
        if(err) throw err;
        for(var i = 0; i < numStudents; i++){
          for(var j = 0; j < activities[0].length; j++){
            Students[i].listOfActivities.push(activities[0][j].ActivityName);
          }
        }
      }) 
      res.render('reports.ejs', { title: 'CNP Daily Report', report: Students });
    })
  });

  module.exports = router;
