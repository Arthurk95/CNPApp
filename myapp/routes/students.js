var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var activity_query = "CALL PullUnhiddenActivities";
  /* Students of current day */
  var student_query = "CALL PullUnhiddenStudents();";

  /* All students [for testing purposes right now] */
  /* var student_query = "CALL ShowAllStudents();"; */

  con.query(student_query, function (err, sQuery) {
    if (err) throw err;
    console.log(sQuery);
    con.query(activity_query, function (err, aQuery) {
      if (err) throw err;
      res.render('students.ejs', {title: 'Student Page', students: sQuery[0],  activities: aQuery[0]});
    })
  })
});

router.post('/addstudentActivity', function(req, res){
  stus = req.body.stu.split(",");
  console.log("adding daily activities");
  console.log(req.body.numStu + " " + req.body.act);
  console.log(stus);
  recursepost(0,stus,req.body.act,req.body.numStu,res);
  
});

function recursepost(i,stus,act,num,res){
  var sql = "CALL AddDailyActivity('" + stus[i] + "','" + act + "');";
  con.query(sql, function (err, result) {
    if(i < num){
      recursepost(i+1,stus,act,num,res);
    }
    if(i == num){
      res.end();
    }
  });
}
module.exports = router;