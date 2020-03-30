var express = require('express');
var router = express.Router();
const auth = require('../public/javascripts/loginScripts');
const bcrypt = require('bcrypt');

router.get('/', auth.checkNotAuthenticated, (req, res) => {
    res.render('register.ejs');
})

//need async for try/catch ?
router.post('/', auth.checkNotAuthenticated, async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10); //10 is good hash default value
        push_user = `INSERT INTO Admins (Username, Email, Passwords, Names) VALUES ("${req.body.name}", "${req.body.email}", "${hashedPassword}", "temp");`
        con.query(push_user, function (err, result) {
            console.log(err);
          if (err) throw err;
        });
        //if successful then:
        res.redirect('/login');
    } catch {
        //if unsuccessful
        res.redirect('/register');
    }
})

module.exports = router;