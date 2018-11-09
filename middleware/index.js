// creating new middleware for loggedOut, middleware functions have to req, res, next
// if the visitor is not logged in it will just go to the next function
function loggedOut(req,res,next) {
    if (req.session && req.session.userId) {
        return res.redirect('/profile');
    }
    return next();
}

// middleware to make sure someone is logged in
function requiresLogIn(req,res,next) {
    if (req.session && req.session.userId) {
        return next();
    } else {
        var err = new Error('This page requires you to log in to view');
        err.status = 401;
        next(err);
    };
 };

module.exports.loggedOut = loggedOut;
module.exports.requiresLogIn = requiresLogIn;