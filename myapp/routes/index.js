var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express'});
});


/* GET home page. */
router.get('/activities', function(req, res, next) {
  var activity_query = "SELECT * FROM Activities";
  con.query(activity_query, function (err, result) {
    if (err) throw err;
    res.render('activities.ejs', { title: 'CNP Activities', activities: result });
  })
});

router.get('/activities/add', function(req, res, next) {
  res.render('students', { title: 'Add Activity'});
});

router.post('/activities/delete', function(req, res, next) {
  var sql = "delete from cnp_data.Activities where ActivityId = " + req.body.actNum + ";";
  con.query(sql, function (err, result) {
    
  });
});

router.get('/admin', function(req, res, next) {
  res.render('admin', { title: 'admin Page'});
});
router.post('/admin/addstudent', function(req, res){
  var sql = "CALL CreateNewStudent('" + req.body.name + "','" + req.body.contact + "','" + req.body.email + "');";
  con.query(sql, function (err, result) {
      if (err) res.send("failure to add");
      res.send("added succesfully");
  });
  
});
router.post('/admin/addactivity', function(req, res){
  console.log(req.body.name);
  var sql = "CALL CreateNewActivity('" + req.body.name + "');";
  con.query(sql, function (err, result) {
      if (err) res.send("failure to add");
      res.send("added succesfully");
  });
  
});

router.get('/users', function(req, res, next) {
  res.render('users', { title: 'Users' });
});

router.get('/students', function(req, res, next) {
  var student_query = "SELECT * FROM Students";
  con.query(student_query, function (err, result) {
    if (err) throw err;
    res.render('students.ejs', { title: 'Student Page', students: result });
  })
});

router.get('/edit', function(req, res, next) {
  res.render('students', { title: 'Edit Student'});
});

router.get('/delete', function(req, res, next) {
  res.render('students', { title: 'Delete Student'});
});
module.exports = router;
