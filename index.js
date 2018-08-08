const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const hbs = require('express-hbs');
const mongoose = require('mongoose');
const config = require('./config');

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


app.use(express.static('lib'));

const defaultRouter = require('./routes/default.router');
const bookRouter = require('./routes/book.router');

app.use('/', defaultRouter);
app.use('/books', bookRouter);
