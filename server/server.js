import express from 'express';
import { MongoClient, ObjectId } from 'mongodb';
import cors from 'cors';

const url = 'mongodb://localhost:27017';
const dbName = 'swapi';
const charactersCollection = 'characters';
const filmsCollection = 'films';
const PlanetsCollection = 'planets';
const filmsCharactersCollection = 'films_characters';
const filmsPlanetsCollection = 'films_planets';


const app = express();
app.use(cors());
const PORT = 3000;
app.use(express.json());

// const planets = [
//     {"id": 1, "name": "Pluton"},
//     {"id": 2, "name": "Earth"},
// ]
// app.get('/api/planets', (req, res) => {
// res.json(planets);
// })

app.get('/api/characters', async (req, res) => {
    try {
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(charactersCollection);
        const characters = await collection.find({}).toArray();
        res.json(characters);
    } catch (err) {
        console.error('Error: ', err);
        res.status(500).send("Error getting characters");
    }
});


app.get('/api/films', async (req, res) => {
    try {
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(filmsCollection);
        const films = await collection.find({}).toArray();
        res.json(films);
    } catch (err) {
        console.error('Error: ', err);
        res.status(500).send("Error getting films");
    }
});

app.get('/api/planets', async (req, res) => {
    try {
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(PlanetsCollection);
        const planets = await collection.find({}).toArray();
        res.json(planets);
    } catch (err) {
        console.error('Error: ', err);
        res.status(500).send("Error getting planets");
    }
});

app.get('/api/characters/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(charactersCollection);
        const character = await collection.findOne({id: +id });
        res.json(character);
    } catch (err) {
        console.error('Error: ', err);
        res.status(500).send("Error getting character");
    }
});

app.get('/api/films/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(filmsCollection);
        const film = await collection.findOne({id: +id});
        res.json(film);
    } catch (err) {
        console.error('Error: ', err);
        res.status(500).send("Error getting film");
    }
});

app.get('/api/planets/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(PlanetsCollection);
        const planet = await collection.findOne({id: +id});
        res.json(planet);
    } catch (err) {
        console.error('Error: ', err);
        res.status(500).send("Error getting planet");
    }
});

app.get('/api/films/:id/characters', async (req, res) => {
    try {
        const { id } = req.params;
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const fcCollection = db.collection(filmsCharactersCollection);
        const fCollection = db.collection(filmsCollection);
        const film = await fCollection.findOne({id: +id});
        const charactersInFilm = await fcCollection.find({film_id: +id}).toArray();
        let characters = [];
        for(let char of charactersInFilm) {
            const cCollection = db.collection(charactersCollection);
            const getOneCharacter = await cCollection.findOne({id: +char.character_id});
            characters.push(getOneCharacter);
        }
        res.json({film, characters});
    } catch (err) {
        console.error('Error: ', err);
        res.status(500).send("Error getting characters based on film");
    }
});

app.get('/api/films/:id/planets', async (req, res) => {
    try {
        const { id } = req.params;
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const fpcollection = db.collection(filmsPlanetsCollection);
        const fCollection = db.collection(filmsCollection);
        const film = await fCollection.findOne({id: +id});
        const planetsInFilm = await fpcollection.find({film_id: +id}).toArray();
        let planets = [];
        for(let planet of planetsInFilm) {
            const pCollection = db.collection(PlanetsCollection);
            const getOnePlanet = await pCollection.findOne({id: +planet.planet_id});
            planets.push(getOnePlanet);
        }
        res.json({film, planets});
    } catch (err) {
        console.error('Error: ', err);
        res.status(500).send("Error getting planets based on film");
    }
});



app.get('/api/characters/:id/films', async (req, res) => {

        const {id} = req.params;
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);                                                                                
        const agg = [
            {
              '$match': {
                'id': +id
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
        
          const coll = client.db('swapi').collection('characters');
          const cursor = coll.aggregate(agg);
          const result = await cursor.toArray();
          await client.close();
          res.json(result);
    });


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});