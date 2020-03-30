var express = require('express');
var router = express.Router();
const auth = require('../public/javascripts/loginScripts');

/* GET home page. */
router.get('/', auth.checkAuthenticated, (req, res) => {
  console.log("Current logged in user:");
  console.log(req.user);
  res.render('index');
  // res.render('index', { email: req.user.email });
})

// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express'});
// });

router.get('/users', auth.checkAuthenticated, function(req, res, next) {
  res.render('users', { title: 'Users' });
});

module.exports = router;
