var express = require('express');
var router = express.Router();
const auth = require('../public/javascripts/loginScripts');
const passport = require('passport');

router.get('/', auth.checkNotAuthenticated, (req, res) => {
    res.render('login.ejs');
})

router.post('/', auth.checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}))

module.exports = router;