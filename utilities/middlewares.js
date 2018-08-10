module.exports = {
  isAuthenticated: function (req, res, next) {
    if (req.isAuthenticated()) next();
    else {
      res.redirect("/user/login");
    }
  },

  attachAuthInfo: function (req, res, next) {
    res.locals.isLoggedin = true;
    next();
  },

  noCache: function (req, res, next) {
    res.header("Cache-Control", "private, no-cache, no-store, must-revalidate");
    next();
  }
};