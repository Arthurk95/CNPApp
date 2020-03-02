var express = require('express');
var router = express.Router();
var uploads = require('../public/javascripts/uploads');
var session = require('express-session');

  router.post('/addstudent', function(req, res){
    var sql = "CALL CreateNewStudentFinal('" + req.body.name + "','" + req.body.birthday + "','" + req.body.contact +
     "','" + req.body.email + "','" + req.body.contactNum + "','" + req.body.contact2 + "','" + req.body.email2 + 
     "','" + req.body.contactNum2 + "','" + req.body.mon + "','" + req.body.tue +
     "','" + req.body.wed + "','" + req.body.thu + "','" + req.body.fri + "','" + req.body.sat + 
     "','" + req.body.sun + "','" + req.body.halfDay + "','" + req.body.enroll + "');";
    con.query(sql, function (err, result) {
        if (err) throw(err);
        res.end();
    });
  });

  router.post('/addactivity', function(req, res){
    var sql = "CALL CreateNewActivity('" + req.body.name + ", " + req.body.helper + "');";
    con.query(sql, function (err, result) {
        if (err) res.end("failure to add");
        res.end("added succesfully");
    });
  });

  router.post('/deleteactivity', function(req, res){
    var sql = "CALL DeleteActivity('" + req.body.id + "');";
    con.query(sql, function (err, result) {
        if (err) res.end();
        res.end();
    });
  });

  router.put('/hideactivity', function(req, res){
    var sql = "CALL HideActivity('" + req.body.id + "');";
    con.query(sql, function (err, result) {
        if (err) res.end();
        res.end();
    });
  });

  router.put('/editactivity', function(req, res){
    var sql = "UPDATE Activities set ActivityName = '" + req.body.name + "' WHERE ActivityId = " + req.body.id + ";";
    console.log(sql);
    con.query(sql, function (err, result) {
        if (err) res.end();
        res.end();
    });
  });

  router.post('/addtask', function(req, res){
    var sql = "CALL CreateNewTask('" + req.body.name + "," + req.body.priority + "');";
    con.query(sql, function (err, result) {
        if (err) res.send("failure to add");
        res.send("added succesfully");
    });
  });

  /* GET home page. */
  router.get('/', function(req, res, next) {
    var student_query = "CALL PullStudentsAndDayType();"; 
    var activity_query = "CALL ShowAllActivities();";
    var task_list = []
    var task1 = {name:'Mow lawn', priority: 1, complete: 0, stamp: ""}
    var task2 = {name:'Fix slide', priority: 2, complete: 0, stamp: ""}
    var task3 = {name:'Replace chains on swing', priority: 0, complete: 0, stamp: ""}
    var task4 = {name:'Clean coupe', priority: 1, complete: 0, stamp: ""}
    task_list.push(task1, task2, task3, task4);
    var tasks_complete = []
    var task5 = {name:'Wash patio', priority: 1, complete: 1, stamp: "02/29/2020"}
    var task6 = {name:'Feed Chickens', priority: 2, complete: 1, stamp: "02/29/2020"}
    tasks_complete.push(task5, task6);

    console.log(task_list);
    console.log(tasks_complete);
    /* var student_query = "CALL ShowAllStudents();"; */ 
    con.query(student_query, function (err, sQuery) {
      if (err) throw err;
      con.query(activity_query, function (err, aQuery) {
        if (err) throw err;
        res.render('admin.ejs', {title: 'Admin Page', students: sQuery[0],  activities: aQuery[0], tasks: task_list, compTasks: tasks_complete});
      });
    });
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
      res.render('profile.ejs', { title: 'Profile Page', student: selected_student, upload_error_message: req.session.upload_error });
      req.session.destroy();
    });
  });

  router.post('/student-profile/:id/upload', (req, res) => {
    uploads.upload(req, res, (err) => {
      if (err) {
        if (err.message) {
          req.session.upload_error = 'Error: ' + err.message;
        } else {
          req.session.upload_error = err;
        }
        res.redirect(`/admin/student-profile/${req.params.id}`);
      } else {
        
        if (req.file == undefined) {
          req.session.upload_error = "Error: File is Undefined";
          res.redirect(`/admin/student-profile/${req.params.id}`);
        } else {
          update_img_query = `UPDATE Students SET Img = '${req.file.filename}' WHERE StudentId = ${req.params.id};`;
          con.query(update_img_query, function (err, result) {
            if (err) throw err;
            res.redirect(`/admin/student-profile/${req.params.id}`);
          });
        }
      }
    });
  });

module.exports = router;

