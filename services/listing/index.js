const { Observable } = require('rxjs/Rx');
const { tap } = require('rxjs/operators');
const express = require('express');
const router = express.Router();
const readModel = require('./readModel');

router.get('/posts', (req, res, next) => {
  const searchString = req.query.search;
  readModel.search(searchString).pipe(
    tap(rec => console.log(rec)),
  ).subscribe(() => {
    return res.sendStatus(200);
  });
});

const config = (dbClient) => {
  readModel.config(dbClient);
}

module.exports = {
  config,
  router,
}