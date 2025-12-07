var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var mongoose = require('mongoose');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

// MongoDB Atlas connection
mongoose
  .connect('mongodb+srv://sumanthraju8888_db_user:sumanth123@cluster0.iyc22p1.mongodb.net/blogApp?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log('DB Error', err));

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Static files
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// CORS setup
app.use(cors({
  origin: '*',
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type,Authorization',
}));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// 404 handler
app.use(function (req, res, next) {
  res.status(404).json({ success: false, message: 'Not Found' });
});

// Global error handler
app.use(function (err, req, res, next) {
  res.status(err.status || 500).json({
    success: false,
    message: err.message,
  });
});

module.exports = app;
