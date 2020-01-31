var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  var sql = "SELECT * from customers;";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log(result);
  });
  
  res.render('index', { title: 'Express' });
});

module.exports = router;
