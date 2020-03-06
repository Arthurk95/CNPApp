var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express'});
});

router.get('/users', function(req, res, next) {
  res.render('users', { title: 'Users' });
});

router.get('/stats', function(req, res, next) {
  res.render('stats', { title: 'Stats' });
});

module.exports = router;
