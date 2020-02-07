var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express'});
});

router.get('/myvar', function(req, res){
  var sql = "SELECT * from customers;";
  con.query(sql, function (err, result) {
    if (err) throw err;
    res.send(result);
  });
});

/* GET home page. */
router.get('/activities', function(req, res, next) {
  res.render('activities', { title: 'CNP Activities'});
});



module.exports = router;
