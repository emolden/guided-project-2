import { MongoClient } from 'mongodb';
const agg = [
  {
    '$match': {
      'id': 1
    }
  }, {
    '$lookup': {
      'from': 'films_characters', 
      'localField': 'id', 
      'foreignField': 'character_id', 
      'as': 'films_characters'
    }
  }, {
    '$project': {
      'id': 1, 
      'name': 1, 
      'film_id': '$films_characters.film_id'
    }
  }, {
    '$unwind': {
      'path': '$film_id'
    }
  }, {
    '$lookup': {
      'from': 'films', 
      'localField': 'film_id', 
      'foreignField': 'id', 
      'as': 'films'
    }
  }, {
    '$unwind': {
      'path': '$films'
    }
  }, {
    '$project': {
      'id': 1, 
      'name': 1, 
      'film_id': '$films.id', 
      'film_title': '$films.title'
    }
  }
];
const client = await MongoClient.connect(
  'mongodb://localhost:27017/'
);
const coll = client.db('swapi').collection('characters');
const cursor = coll.aggregate(agg);
const result = await cursor.toArray();
console.log(result);
await client.close();