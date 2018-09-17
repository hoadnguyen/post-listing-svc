const { Observable } = require('rxjs/Rx');
let mongo;
const config = (dbClient) => {
  if (mongo) throw new Error('Mongo has already been configured');
  mongo = dbClient;
}

const search = (searchString) => Observable.create(subscriber => {
  let query;
  if (!searchString) query = {};
  else query = { $text: { $search: searchString } };
  
  const postCol = mongo.collection('posts');
  postCol.find(query).toArray().then(
    rec => {
      subscriber.next(rec);
      subscriber.complete();
    }
  ).catch(err => subscriber.error(err));
});

module.exports = {
  config,
  search,
}