var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var student_query = "SELECT * FROM cnp_data.Students st, cnp_data.Schedual sc, cnp_data.Relatives r where st.StudentId = sc.StudentId and st.StudentId = r.StudentId;"; 
  con.query(student_query, function (err, student) {
    if (err) throw err;
    res.render('profile.ejs', {title: 'Profile Page', students: student});
    })
});

module.exports = router;