var express = require('express');
var router = express.Router();
const auth = require('../public/javascripts/loginScripts');
const bcrypt = require('bcrypt');

router.get('/', auth.checkAuthenticated, (req, res) => {
    res.render('register.ejs');
})

//need async for try/catch ?
router.post('/', auth.checkAuthenticated, async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10); //10 is good hash default value
        push_user = `INSERT INTO Admins (Username, Email, Passwords, Names) VALUES ("${req.body.name}", "${req.body.email}", "${hashedPassword}", "temp");`
        con.query(push_user, function (err, result) {
            if (err) {
                console.log(err);
                res.send(err.sqlMessage)
            } else {
                res.redirect('/login');
            }
        });
        //if successful then:
        // res.redirect('/login');
    } catch (e) {
        //if unsuccessful
        console.log(e);
        res.redirect('/register');
    };
});


module.exports = router;