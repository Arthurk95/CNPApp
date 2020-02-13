var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var student_query = "SELECT * FROM Students ORDER BY StudentName"; 
  /* Students of current day */
  /* var student_query = "CALL PullUnhiddenStudents();"; */

  /* All students [for testing purposes right now] */
  /* var student_query = "CALL ShowAllStudents();"; */

  con.query(student_query, function (err, result) {
    if (err) throw err;
    res.render('students.ejs', { title: 'Student Page', students: result });
  })
});

module.exports = router;