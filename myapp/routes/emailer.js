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
function bottomLayer(res,Students,con){
  var Behaviors = [];
  behavior1 = {name: 'AM Snack:', op1: 'All/Most', op2: 'Half', op3: 'None'}
  behavior2 = {name: 'PM Snack:', op1: 'All/Most', op2: 'Half', op3: 'None'}
  behavior3 = {name: 'Nap:', op1: 'Slept All/Most of nap', op2: 'Slept half/some', op3: 'Quiet time'}
  behavior4 = {name: 'Academic play:', op1: 'Listened/Participated', op2: 'Somewhat listened/participated', op3: 'Trouble listening/participating'}
  behavior5 = {name: 'Restroom Use:', op1: 'Great/No Accidents', op2: 'Accidents/Needed help', op3: 'Diapers'}
  behavior6 = {name: 'Mood:', op1: 'Happy/Played Well', op2: 'Frustrations', op3: 'Tested Boundaries'}
  Behaviors.push(behavior1, behavior2, behavior3, behavior4, behavior5, behavior6);
  console.log(Behaviors);
  var Reminders = [];
  reminder1 = {title: "Book Order", contents: "Book orders for our schloastic book club are due on April 1"}
  reminder2 = {title: "March 9 Closure", contents: "Reminder that CNP will be closed on March 9 and 10"}
  Reminders.push(reminder1, reminder2);
  res.render('emailer.ejs', { title: 'CNP Daily Report', reports: Students, behaviors: Behaviors, reminders: Reminders });
}
  module.exports = router;