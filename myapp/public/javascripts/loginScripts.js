function checkAuthenticated(req, res, next) {
    //next variable is what we call when we are done
    if (req.isAuthenticated()) {
        return next();
    }
  
    res.redirect('/login');
};

function checkNotAuthenticated(req, res, next) {
    //next variable is what we call when we are done
    if (req.isAuthenticated()) {
        return res.redirect('/')
    }
  
    next();
}
  
module.exports = {
    checkAuthenticated,
    checkNotAuthenticated
}