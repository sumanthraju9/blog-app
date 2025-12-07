var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var mongoose = require('mongoose');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

mongoose
  .connect('mongodb://127.0.0.1:27017/blogApp')
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log('DB Error', err));

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(cors());

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use(function (req, res, next) {
  res.status(404).json({ success: false, message: 'Not Found' });
});

app.use(function (err, req, res, next) {
  res.status(err.status || 500).json({
    success: false,
    message: err.message,
  });
});

module.exports = app;
