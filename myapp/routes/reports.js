var express = require('express');
var router = express.Router();
/* GET home page. */
router.get('/', function(req, res, next) {
  var Students = [];
  var daily_query = "CALL PullUnhiddenStudents();";
  con.query(daily_query, function (err, dailyStudents) {
    if (err) throw err;
    recurseDailies(Students,dailyStudents,0,res);
  })

  function recurseDailies(Students,dailyStudents,i,res){
    var Student = { id: 0, name: "", listOfActivities: []};
    if(i < (dailyStudents[0].length)){
      Student.id = dailyStudents[0][i].StudentId;
      Student.name = dailyStudents[0][i].StudentName;
    
      Students.push({
        id: Student.id,
        name: Student.name,
        listOfActivities: []
      });
      activities_query = "CALL ShowStudentDailyActivitiesToday(" + Students[i].id + ");";
      con.query(activities_query, function(err, act){
        if(err) throw err;
        var looper = act[0];
        looper.forEach(element => {
          if(element){
            Students[i].listOfActivities.push(element);
          }
        });
<<<<<<< HEAD
        recurseDailies(Students,dailyStudents,i+1,res);
        if(i == (dailyStudents[0].length) - 1){
          bottomLayer(res, Students);
        }
      });
    }
    if(0==(dailyStudents[0].length)){
      bottomLayer(res, Students);
    }
    
  }
});
function bottomLayer(res,Students){
  res.render('reports.ejs', { title: 'CNP Daily Report', reports: Students });
}
=======
        numStudents++;
      }
      var today = '"2020-02-16"';

      for(var i = 0; i < Students.length; i++){
        activities_query = "CALL ShowStudentDailyActivities(" + Students[i].id + 
            ", " + today + ");";

        con.query(activities_query, function(err, act){
          if(err) throw err;
          activities = act[0];
        })
        console.log(activities);
        Students[i].listOfActivities.push(activities[0]);
        
        activities = [];

      }
      TempStudents = []
      var Student1 = {
        id: 1,
        name: "Bob",
        listOfActivities: ['slide', 'chickens']
      };
      TempStudents.push(Student1)
      var Student2 = {
        id: 2,
        name: "Sue",
        listOfActivities: ['paint', 'bike']
      };
      TempStudents.push(Student2)
      var Student3 = {
        id: 3,
        name: "Lilly",
        listOfActivities: ['bike', 'chickens']
      };
      TempStudents.push(Student3)
      

      res.render('reports.ejs', { title: 'CNP Daily Report', reports: TempStudents });
     
      
    })
  });

>>>>>>> 194f24e4a09e634aa0b73329602b06827b51ee8b
  module.exports = router;
