const express = require('express');
const sqlite3 = require('sqlite3');
const path = require('path');

const dbpath = path.join(__dirname, '../database.sqlite');

const db = new sqlite3.Database(process.env.TEST_DATABASE || dbpath);
const apiRouter = express.Router();

console.log('api.js: ', db, __dirname);
// Define Routes
// SHOW
apiRouter.put('/', (req, res, next) => {
  console.log('PUT / api: ', db, __dirname);
  const options = '("'+req.body.opt.tasks.join('","')+'")';
  const string = `SELECT * FROM Small1x1 WHERE type IN ${options} AND schoolClass = ${req.body.opt.class};`
  console.log('options', options);
  console.log('API: ', req.body, string);

  db.all(string, (err, calc) => {
    if (err !== null) {
      next(err);
    } else {
      let idx = Math.floor(Math.random() * calc.length);
      console.log('API: ', idx, calc[idx]);
      res.status(200).json({calc: calc[idx]});
    };
  });
});

module.exports = apiRouter;
