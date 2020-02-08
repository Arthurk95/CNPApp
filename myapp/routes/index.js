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

router.get('activities/delete', function(req, res, next) {
  res.render('students', { title: 'Delete Activity'});
});

module.exports = router;
