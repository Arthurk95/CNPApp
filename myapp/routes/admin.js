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
  var student_query = "SELECT * FROM Students";
  con.query(student_query, function (err, result) {
    if (err) throw err;
    res.render('admin.ejs', { title: 'Admin', students: result });
  })
});
module.exports = router;