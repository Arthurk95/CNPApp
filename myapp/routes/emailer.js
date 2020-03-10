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
          bottomLayer(res, Students);
        }
      });
    }
    if(0==(dailyStudents[0].length)){
      bottomLayer(res, Students);
    }
    
  }
  
});
function bottomLayer(res,Students,){
  var get_template = "CALL ShowUnhiddenTemplateObject();";
  con.query(get_template, function(err, behave){
    behave = behave[0];
    var Behaviors = [];
    if(behave.length == 0){
      Behaviors.push({name: 'No behaviors in database:'});
    }
    else{
      behave.forEach((element) => {
        bObj = {name: element.NameOf};
        if(element.CategoryOne != "" && element.CategoryOne != null){
          bObj.op1 = element.CategoryOne;
        }
        if(element.CategoryTwo != "" && element.CategoryTwo != null){
          bObj.op2 = element.CategoryTwo;
        }
        if(element.CategoryThree != "" && element.CategoryThree != null){
          bObj.op3 = element.CategoryThree;
        }
        if(element.CategoryFour != "" && element.CategoryFour != null){
          console.log(element.CategoryFour);
          bObj.op4 = element.CategoryFour;
        }
        if(element.CategoryFive != "" && element.CategoryFive != null){
          bObj.op5 = element.CategoryFive;
        }
        Behaviors.push(bObj);
      })
    }
    var get_reminders = "CALL ShowUnhiddenRemindersObject();";
    con.query(get_reminders, function(err, remind){
      remind = remind[0];
      var Reminders = [];
      if(remind.length == 0){
        Reminders.push({title: "No reminders in database"});
      }
      else{
        remind.foreach((element) => {
          console.log(element);
          Reminders.push({title: element.NameOf, contents: element.MainParagraphs});
        });
      }
      
     
      res.render('emailer.ejs', { title: 'CNP Daily Report', reports: Students, behaviors: Behaviors, reminders: Reminders });
    });
  });
}
  module.exports = router;