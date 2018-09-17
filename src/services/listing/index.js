const { Observable } = require('rxjs/Rx');
const { tap } = require('rxjs/operators');
const express = require('express');
const router = express.Router();
const readModel = require('./readModel');

router.get('/posts', (req, res, next) => {
  const searchString = req.query.search;
  readModel.search(searchString).pipe(
    tap(rec => console.log(`Listing posts matching search query "${searchString}"`, rec)),
  ).subscribe((rec) => {
    return res.status(200).json(rec);
  });
});

router.get('/posts/:id', (req, res, next) => {
  const id = req.params.id;
  readModel.getPost(id).pipe(
    tap(rec => console.log(`Show detail of post ${id}`, rec)),
  ).subscribe((rec) => {
    return res.status(200).json(rec);
  })
});

const config = (dbClient) => {
  readModel.config(dbClient);
}

module.exports = {
  config,
  router,
}