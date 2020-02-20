var express = require('express');
var router = express.Router();

  router.post('/addstudent', function(req, res){
    var sql = "CALL CreateNewStudentFinal('" + req.body.name + "','" + req.body.birthday + "','" + req.body.contact +
     "','" + req.body.email + "','" + req.body.contactNum + "','" + req.body.contact2 + "','" + req.body.email2 + 
     "','" + req.body.contactNum2 + "','" + req.body.mon + "','" + req.body.tue +
     "','" + req.body.wed + "','" + req.body.thu + "','" + req.body.fri + "','" + req.body.sat + 
     "','" + req.body.sun + "','" + req.body.fullDay + "','" + req.body.enroll + "');";
    console.log(sql);
    con.query(sql, function (err, result) {
        if (err) throw(err);
        res.end();
    });
  });

  router.post('/addactivity', function(req, res){
    console.log(req.body.name);
    var sql = "CALL CreateNewActivity('" + req.body.name + "');";
    con.query(sql, function (err, result) {
        if (err) res.send("failure to add");
        res.send("added succesfully");
    });
  });

  /* GET home page. */
router.get('/', function(req, res, next) {
  var student_query = "SELECT * FROM Students ORDER BY StudentName ASC"; 
  var activity_query = "SELECT * FROM Activities ORDER BY ActivityName;";
  /* var student_query = "CALL ShowAllStudents();"; */ 
  con.query(student_query, function (err, sQuery) {
    if (err) throw err;
    con.query(activity_query, function (err, aQuery) {
      if (err) throw err;
      res.render('admin.ejs', {title: 'Admin Page', students: sQuery,  activities: aQuery});
    })
  })
});

// Access student profile page
router.get('/student-profile/:id', function (req, res, next) {
  student_id = req.params.id
  var student_query = `CALL PullStudentData(${student_id})`;
  
  con.query(student_query, function (err, result) {
    if (err) throw err;
    //'result' contains requested student [index 0] as well as 'OkPacket' [index 1]
    //strip away OkPacket, create selected_student as new array
    [selected_student] = result[0];
    console.log(selected_student);
    res.render('profile.ejs', {title: 'Profile Page', student: selected_student});
    })
});

module.exports = router;

