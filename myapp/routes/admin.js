var express = require('express');
var router = express.Router();

  router.post('/addstudent', function(req, res){
    var sql = "CALL CreateNewStudent('" + req.body.name + "','" + req.body.contact + "','" + req.body.email + "');";
    con.query(sql, function (err, result) {
        if (err) res.send("failure to add");
        res.send("added succesfully");
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

router.get('/admin/:', function(req, res, next) {
  
  res.render('admin.ejs');
});
module.exports = router;

