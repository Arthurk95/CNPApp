var express = require('express');
var router = express.Router();
const auth = require('../public/javascripts/loginScripts');

/* GET home page. */
router.get('/', auth.checkAuthenticated, function(req, res, next) {
  var student_query = "SELECT * FROM cnp_data.Students st, cnp_data.Schedual sc, cnp_data.Relatives r where st.StudentId = sc.StudentId and st.StudentId = r.StudentId;"; 
  con.query(student_query, function (err, student) {
    if (err) res.end();
    res.render('profile.ejs', {title: 'Profile Page', student: student});
    })
});

module.exports = router;