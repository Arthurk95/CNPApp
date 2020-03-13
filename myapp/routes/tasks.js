var express = require('express');
var router = express.Router();
var uploads = require('../public/javascripts/uploads');
var session = require('express-session');


  router.post('/addtask', function(req, res){
    var sql = "INSERT INTO cnp_data.Tasks (Priority,NoteContent) VALUES (" + req.body.priority + ",'" + req.body.name + "');";
    console.log(sql);
    con.query(sql, function (err, result) {
        if (err) res.end();
        res.end();
    });
  });

  router.put('/changetask', function(req, res){
    var sql = "UPDATE cnp_data.Tasks SET Priority = " + req.body.priority + " WHERE TaskId = " + req.body.id + ";";
    con.query(sql, function (err, result) {
        if (err) res.end();
        res.end();
    });
  });

  router.put('/completetask', function(req, res){
    var sql = "UPDATE cnp_data.Tasks SET Completed = " + req.body.completed + " WHERE TaskId = " + req.body.id + ";";
    con.query(sql, function (err, result) {
        if (err) res.end();
        res.end();
    });
  });

  router.post('/deletetask', function(req, res){
    var sql = "DELETE FROM cnp_data.Tasks WHERE TaskId = " + req.body.id + ";";
    con.query(sql, function (err, result) {
        if (err) res.end();
        res.end();
    });
  });

  /* GET home page. */
  router.get('/', function(req, res, next) {
    var student_query = "CALL PullStudentsAndDayType();"; 
    var activity_query = "CALL ShowAllActivities();";
    var task_query = "SELECT * FROM cnp_data.Tasks;";
    con.query(student_query, function (err, sQuery) {
      if (err) throw err;
      con.query(activity_query, function (err, aQuery) {
        if (err) throw err;
        con.query(task_query,function (err, tQuery){
          if(err) throw err;
          var tasks = [], completed = [];
          for(var i = 0;i < tQuery.length;++i){
            if(tQuery[i].Completed == 0){
              tasks.push(tQuery[i]);
            }
            else{
              completed.push(tQuery[i]);
            }
          }
          res.render('tasks.ejs', {title: 'Admin Page', students: sQuery[0],  activities: aQuery[0], tasks: tasks, compTasks: completed});
        }
        );
        
      });
    });
    
  });

  
module.exports = router;