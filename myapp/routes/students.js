var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var student_query = "SELECT * FROM Students";
  con.query(student_query, function (err, result) {
    if (err) throw err;
    res.render('students.ejs', { title: 'Student Page', students: result });
  })
});

module.exports = router;