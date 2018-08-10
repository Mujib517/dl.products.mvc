const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const hbs = require('express-hbs');
const mongoose = require('mongoose');
const config = require('./config');
const bodyParser = require('body-parser');

app.listen(PORT, function () {
  console.log("Server is running on ", PORT);
});

app.set('view engine', 'hbs');

app.engine('hbs', hbs.express4({
  defaultLayout: __dirname + "/views/index.hbs",
  partialsDir: __dirname + "/views/partials"
}));

mongoose.connect(config.conStr, { useNewUrlParser: true }, function () {
  console.log("Connected");
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('lib'));

const passport = require('passport');
const auth = require('./utilities/auth');

auth(app);

const defaultRouter = require('./routes/default.router');
const bookRouter = require('./routes/book.router');
const userRouter = require('./routes/user.router');

app.use('/', defaultRouter);
app.use('/user', userRouter);

function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) next();
  else {
    res.redirect("/user/login");
  }
}

app.use(isAuthenticated);
app.use('/books', bookRouter);




