const passport = require("passport");

function ensureAuthenticated(req, res, next) {
  passport.authenticate("jwt", { session: false }, function(err, user) {
    if (user) {
      return next();
    } else {
      res.send({ success: false, message: "Please Login Again" });
    }
  })(req, res, next);
}

//module.exports = ensureAuthenticated;
exports.ensureAuthenticated = ensureAuthenticated;
