var express = require('express');
var router = express.Router();
const auth = require('../public/javascripts/loginScripts');
/* GET home page. */
router.get('/', auth.checkAuthenticated, function(req, res, next) {
  var Students = [];
  var daily_query = "CALL PullUnhiddenStudents();";
  con.query(daily_query, function (err, dailyStudents) {
    if (err) throw err;
    recurseDailies(Students,dailyStudents,0,res);
  })

  function recurseDailies(Students,dailyStudents,i,res){
    var Student = { id: 0, name: "", listOfActivities: [], pottyBreaks: 0, pottyAccidents: 0};
    if(i < (dailyStudents[0].length)){
      Student.id = dailyStudents[0][i].StudentId;
      Student.name = dailyStudents[0][i].StudentName;
    
      Students.push({
        id: Student.id,
        name: Student.name,
        listOfActivities: [],
        pottyBreaks: 0,
        pottyAccidents: 0
      });
      activities_query = "CALL ShowStudentDailyActivitiesToday(" + Students[i].id + ");";
      con.query(activities_query, function (err, act) {
        if (err) throw err;

        // con.query(`CALL PullRestroomNumber(${Students[i].id});`, function (err, pottyCount) {
        //   if (err) {
        //     console.log(err);
        //   }
        //   con.query(`CALL PullAccidentNumber(${Students[i].id});`, function (err, accidentCount) {
        //     if (err) {
        //       console.log(err);
        //     }

        //     var looper = accidentCount[0];
        //     looper.forEach(element => {
        //       if (element) {
        //         Students[i].pottyAccidents.push(element);
        //       }
        //     })
        //   });

        //   var looper = pottyCount[0];
        //   looper.forEach(element => {
        //     if (element) {
        //       Students[i].pottyBreaks.push(element);
        //     }
        //   })
        // });

        var looper = act[0];
        looper.forEach(element => {
          if (element) {
            Students[i].listOfActivities.push(element);
          }
        });
        recurseDailies(Students,dailyStudents,i+1,res);
        if(i == (dailyStudents[0].length) - 1){
          bottomLayer(res, Students,con);
        }
      });
    }
    if(0==(dailyStudents[0].length)){
      bottomLayer(res, Students);
    }
    
  }
  
});
function bottomLayer(res, Students, con) {
  console.log(Students);
  res.render('reports.ejs', { title: 'CNP Daily Report', reports: Students });
}
  module.exports = router;
