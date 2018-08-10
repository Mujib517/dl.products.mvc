const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const hbs = require('express-hbs');
const mongoose = require('mongoose');
const config = require('./config');
const bodyParser = require('body-parser');

const auth = require('./utilities/auth');
const defaultRouter = require('./routes/default.router');
const bookRouter = require('./routes/book.router');
const userRouter = require('./routes/user.router');
const middlewares = require('./utilities/middlewares');

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

auth(app);
app.use('/', defaultRouter);
app.use('/user', userRouter);

app.use(middlewares.isAuthenticated);
app.use(middlewares.attachAuthInfo);
app.use(middlewares.noCache);

app.use('/books', bookRouter);




