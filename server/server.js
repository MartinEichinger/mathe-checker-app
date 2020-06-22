// server.js

// set up ======================================================================
// get all the tools we need
var express = require('express');
var app     = express();
var path    = require('path');
var PORT    = process.env.PORT || 4000;
var sqlite3 = require('sqlite3');

var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');

var apiRouter    = require('./api/api');

// configuration ===============================================================

// require('./config/passport')(passport); // pass passport for configuration

// set up our express application
app.use(express.static(path.join(__dirname, '../client/build')));
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json()); // get information from html forms

app.get('/', (req, res) => {
  res.sendFile('index.html', {root: path.join(__dirname, '../client/build') });
});
app.get('/calc', (req, res) => {
  res.sendFile('index.html', {root: path.join(__dirname, '../client/build') });
});
app.get('/about', (req, res) => {
  res.sendFile('index.html', {root: path.join(__dirname, '../client/build') });
});
app.use('/api', apiRouter);

// required for passport
//app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
//app.use(passport.initialize());
//app.use(passport.session()); // persistent login sessions
//app.use(flash()); // use connect-flash for flash messages stored in session

// routes ======================================================================
//require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport

// launch ======================================================================
app.listen(PORT, () => console.log(`Holy shit. It's running at Http://localhost:${PORT}!`));

module.exports = app;
