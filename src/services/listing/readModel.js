const { Observable } = require('rxjs/Rx');
const ObjectID = require('mongodb').ObjectID;
let mongo;


/**
 * Configure readModel with a DB that can be used globally within this readModel
 * @param {*MongoClient} dbClient 
 */
const config = (dbClient) => {
  if (mongo) throw new Error('Mongo has already been configured');
  mongo = dbClient;
}


/**
 * Search for posts that match a specific string
 * If no string is specified, return all posts
 * @param {*string} searchString 
 */
const search = (searchString) => Observable.create(subscriber => {
  let query;
  if (!searchString) query = {};
  else query = { $text: { $search: searchString } };
  
  const postCol = mongo.collection('posts');
  postCol.find(query).toArray().then(rec => {
    subscriber.next(rec);
    subscriber.complete();
  }).catch(err => subscriber.error(err));
});


/**
 * Get post that match a specific id
 * @param {*ObjectId} id 
 */
const getPost = (id) => Observable.create(subscriber => {
  const postCol = mongo.collection('posts');
  postCol.findOne({_id: ObjectID(id)}).then(rec => {
    subscriber.next(rec);
    subscriber.complete();
  }).catch(err => subscriber.error(err));
})

module.exports = {
  config,
  search,
  getPost,
}