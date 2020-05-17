var express = require('express');
var router = express.Router();
var uploads = require('../public/javascripts/uploads');
var session = require('express-session');
const auth = require('../public/javascripts/loginScripts');


  router.post('/addtask', auth.checkAuthenticated, function(req, res){
    var sql = "INSERT INTO cnp_data.Tasks (Priority,NoteContent) VALUES (" + req.body.priority + ",'" + req.body.name + "');";
    console.log(sql);
    con.query(sql, function (err, result) {
        if (err) res.end();
        res.end();
    });
  });

  router.put('/changetask', auth.checkAuthenticated, function(req, res){
    var sql = "UPDATE cnp_data.Tasks SET Priority = " + req.body.priority + " WHERE TaskId = " + req.body.id + ";";
    con.query(sql, function (err, result) {
        if (err) res.end();
        res.end();
    });
  });

  router.put('/cleartask', auth.checkAuthenticated, function(req, res){
    var sql = "DELETE FROM cnp_data.Tasks WHERE Completed = 1 AND TaskId > 0;";
    con.query(sql, function (err, result) {
        if (err) res.end();
        res.end();
    });
  });

  router.put('/completetask', auth.checkAuthenticated, function(req, res){
    var sql = "CALL CompleteTask(" + req.body.id + ");";
    console.log(sql);
    //var sql = "UPDATE cnp_data.Tasks SET Completed = " + req.body.completed + " WHERE TaskId = " + req.body.id + ";";
    con.query(sql, function (err, result) {
        if (err) res.end();
        res.end();
    });
  });

  router.post('/deletetask', auth.checkAuthenticated, function(req, res){
    var sql = "DELETE FROM cnp_data.Tasks WHERE TaskId = " + req.body.id + ";";
    con.query(sql, function (err, result) {
        if (err) res.end();
        res.end();
    });
  });

  /* GET home page. */
  router.get('/', auth.checkAuthenticated, function(req, res, next) {
    var student_query = "CALL PullStudentsAndDayType();"; 
    var activity_query = "CALL ShowAllActivities();";
    var task_query = "SELECT * FROM cnp_data.Tasks;";
    var compl_task_query = "CALL ShowFinished6MonthsTask();";
    con.query(student_query, function (err, sQuery) {
      if (err) res.end();
      con.query(activity_query, function (err, aQuery) {
        if (err) res.end();
        con.query(task_query,function (err, tQuery){
          if(err) res.end();
          var tasks = [];
          for(var i = 0;i < tQuery.length;++i){
            if(tQuery[i].Completed == 0){
              tasks.push(tQuery[i]);
            }
          }
          var completed = []
          con.query(compl_task_query,function (err, completedQuery){
            if(err) res.end();
            for(var i = 0;i < completedQuery.length;++i){
              completed.push(completedQuery[i]);
            }
            res.render('tasks.ejs', {title: 'Admin Page', students: sQuery[0],  activities: aQuery[0], tasks: tasks, compTasks: completed[0]});
            
          });
        }
        );
        
      });
    });
    
  });

  
module.exports = router;