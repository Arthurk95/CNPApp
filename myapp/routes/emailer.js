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

      var get_summary = `CALL PullDailySummaryToday()`;     
      con.query(get_summary, function (err, sum_result) {
        if (err) {
          console.log('Unable to pull daily summary: ' + err);
        } else {
          try {
            [stripped_result] = sum_result[0];
            if (stripped_result) {
              var summary = stripped_result.MainParagraphs;
            }
          } catch (e) {
            var summary = '';
            console.log(e);
          }
        }

        var get_snack = `CALL PullDailyAmFoodToday()`;     
        con.query(get_snack, function (err, snack_result) {
          if (err) {
            console.log('Unable to pull AM snack: ' + err);
          } else {
            try {
              [stripped_result] = snack_result[0];
              if (stripped_result) {
                var snack = stripped_result.MainParagraphs;
              }
            } catch (e) {
              var snack = '';
              console.log(e);
            }
          }

          var get_lunch = `CALL PullDailyLunchToday()`;     
          con.query(get_lunch, function (err, lunch_result) {
            if (err) {
              console.log('Unable to pull lunch: ' + err);
            } else {
              try {
                [stripped_result] = lunch_result[0];
                if (stripped_result) {
                  var lunch = stripped_result.MainParagraphs;
                }
              } catch (e) {
                var lunch = '';
                console.log(e);
              }
            }
      
            
      res.render('emailer.ejs', { title: 'CNP Daily Report', reports: Students, behaviors: Behaviors, reminders: Reminders, summary: summary, snack: snack, lunch: lunch });
        }); // end lunch query
        }); // end snack query
      }); // end summary query
    });
  });
}

router.post('/push-summary', auth.checkAuthenticated, function (req, res, next) {
  save_template_query = `CALL AddDailySummary("${req.body.text}")`;

  con.query(save_template_query, function (err, result) {
    if (err) {
      console.log(`Unable to add [${req.body.text}] to daily summary. ` + err);
      res.end();
    } else {
      console.log('Daily summary updated: ' + req.body.text);
      res.end();
    }
  });


});


router.post('/push-am-snack', auth.checkAuthenticated, function (req, res, next) {
  save_template_query = `CALL AddDailyAmFood("${req.body.text}")`;

  con.query(save_template_query, function (err, result) {
    if (err) {
      console.log(`Unable to add [${req.body.text}] to AM snack. ` + err);
      res.end();
    } else {
      console.log('AM snack updated: ' + req.body.text);
      res.end();
    }
  });


});

router.post('/push-lunch', auth.checkAuthenticated, function (req, res, next) {
  save_template_query = `CALL AddDailyLunch("${req.body.text}")`;

  con.query(save_template_query, function (err, result) {
    if (err) {
      console.log(`Unable to add [${req.body.text}] to lunch. ` + err);
      res.end();
    } else {
      console.log('Lunch updated: ' + req.body.text);
      res.end();
    }
  });


});

router.post('/push-behavior', auth.checkAuthenticated, function (req, res, next) {
  var behavior_names = req.body.behaviorNames.split(',');
  var behavior_selection = req.body.studentsBehaviors.split(',');
  var notes = ''; //4th param is note--null for now

  for (var i = 0; i < behavior_names.length; i++ ) {
    push_behaviors_query = `CALL AddBehavior(${req.body.id}, "${behavior_names[i]}", "${behavior_selection[i]}", "");`;
    (function (query) { 
      con.query(query, function (err, result) {
        if (err) {
          console.log(`Unable to add behaviors: ${err}`);
        }
        console.log(query);
      })
    })(push_behaviors_query); //closure necessary for async consistency
  }
  res.end();
});

  module.exports = router;