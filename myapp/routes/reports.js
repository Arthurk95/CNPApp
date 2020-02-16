var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    var entry_query = "SELECT * FROM DailyActivities ORDER BY StudentId;";
    con.query(_query, function (err, result) {
      if (err) throw err;
      res.render('reports.ejs', { title: 'CNP Daily Report', reports: result });
    })
  });