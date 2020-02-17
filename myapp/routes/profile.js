var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var student_query = "SELECT * FROM Students ORDER BY StudentName"; 
  con.query(student_query, function (err, student) {
    if (err) throw err;
    res.render('profile.ejs', {title: 'Profile Page', students: student});
    })
});

module.exports = router;