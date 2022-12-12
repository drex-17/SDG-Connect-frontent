var createError = require('http-errors');
var express = require('express');
var path = require('path');
var session = require('express-session');
// const MemoryStore = require('memorystore')(session);
// var csrf = require('csurf');
const passport = require('passport');
const logger = require('./utils/logger');
// const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const morganMiddleware = require("./middlewares/morgan.middleware");
const morgan = require('morgan');
const multer = require('multer');
const { authenticateUser } = require('./middlewares/passport-strategies');

require('dotenv').config();

const upload = multer();
let indexRouter = require('./routes/index');
let authRouter = require('./routes/auth');
let jobRouter = require('./routes/job');
let donationRouter = require('./routes/donation');
let collaboRouter = require('./routes/collabo');
let eventRouter = require('./routes/event');


const app = express();
authenticateUser(passport);

app.use(express.json());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
// app.use(upload.array())
app.use(morgan('dev'));
app.use(morganMiddleware);
app.use(express.static(path.join(__dirname, 'public')));

app.get('/ping', (req, res) => {
  res.status(200).json({"test": "Everything is ok"});
});

// app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 }}));
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  // store: new MemoryStore({
  // checkPeriod: 1000 * 60 * 60 * 24  // prune expired entries every 24h
  // }),
  saveUninitialized: true,
  // cookie: { maxAge: 1000 * 60 * 60 * 24 }
}));

// app.use(csrf());
app.use(passport.session());
app.use(passport.initialize());
app.use(flash());
// console.log(v);

app.use(function (req, res, next) {
  var msgs = req.session.messages || [];
  res.locals.messages = msgs;
  // res.locals.hasMessages = !!msgs.length;
  // req.session.messages = [];
  res.locals.user = {auth: req.isAuthenticated()};
  res.locals.message = req.flash(),
  next();
  // next();
});

/*
app.use(function (req, res, next) {
  res.locals.csrfToken = req.csrfToken();
  next();
});
*/

// app.post('/login', async (req, res) => {
// console.log(req.body.email);
// });

app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/job', jobRouter);
app.use('/donation', donationRouter);
app.use('/collaboration', collaboRouter);
app.use('/event', eventRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
