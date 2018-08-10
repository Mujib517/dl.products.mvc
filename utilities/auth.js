const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');

function configure(app) {

  app.use(session({ secret: 'secret', resave: true, saveUninitialized: false }));
  app.use(passport.initialize());
  app.use(passport.session());

  //user id in a cookie
  passport.serializeUser(function (user, done) {
    console.log("Serializing");
    done(null, user.username);
  });

  passport.deserializeUser(function (username, done) {
    console.log("Deserializing", username);
    done(null, username);
  });

  passport.use("local", new LocalStrategy(function (username, password, done) {
    console.log("Inside validation");
    //fetch data from db and validate
    if (username === 'admin' && password === 'password') done(null, { username: username });
    else done("Wrong username or password");
  }));

};

module.exports = configure;