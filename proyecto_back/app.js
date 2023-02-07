var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var database = require("./config/database"); //llamar la conexion
var auth = require("./auth/main_auth");

var empleadosRouter = require('./routes/empleados.router');
var verdurasRouter = require('./routes/verduras.router');
var usuariosRouter = require('./routes/usuarios.router');

var app = express();


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//mongo conexion
database.mongoConnect(); 

app.use('/usuarios', usuariosRouter);
//usar autenticador
app.use(auth);
//routes cada ruta va acá
app.use('/empleados', empleadosRouter);
app.use('/verduras', verdurasRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
// res.json({
//     message: err.message,
//     error: err
//   });
});

module.exports = app;
