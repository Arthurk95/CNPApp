var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    var activity_query = "CALL ShowAllActivities();";
    con.query(activity_query, function (err, result) {
      if (err) res.end();
      res.render('activities.ejs', { title: 'CNP Activities', activities: result[0] });
    })
  });
  
  router.get('/add', function(req, res, next) {
    res.render('students', { title: 'Add Activity'});
  });
  
  router.post('/delete', function(req, res, next) {
    var sql = "delete from cnp_data.Activities where ActivityId = " + req.body.actNum + ";";
    con.query(sql, function (err, result) {
      if (err) res.send("failure to add");
      res.send("added succesfully");
    });
  });

  module.exports = router;