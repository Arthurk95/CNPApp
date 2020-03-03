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
        res.render('emailer.ejs', {title: 'Student Page', students: sQuery[0],  activities: aQuery[0]});
        })
    });
  });


  module.exports = router;