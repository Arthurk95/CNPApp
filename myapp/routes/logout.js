var express = require('express');
var router = express.Router();

router.delete('/', (req, res) => {
    req.logOut();
    res.redirect('/login');
})

module.exports = router;