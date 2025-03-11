import express from 'express';
import { MongoClient, ObjectId } from 'mongodb';

const url = 'mongodb://localhost:27017';
const dbName = 'swapi';
const charactersCollection = 'characters';
const filmsCollection = 'films';
const PlanetsCollection = 'planets';
const filmsCharactersCollection = 'films_characters';
const filmsPlanetsCollection = 'films_planets';


const app = express();
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
        res.status(500).send("Error getting characters in film");
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
        res.status(500).send("Error getting planets for film");
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

app.get('/api/planets/:id/films', async (req, res) => {
    try {
        const { id } = req.params;
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const fpcollection = db.collection(filmsPlanetsCollection);
        const pCollection = db.collection(PlanetsCollection);
        const planet = await pCollection.findOne({id: +id});
        const filmsWithPlanet = await fpcollection.find({planet_id: +id}).toArray();
        let films = [];
        for(let film of filmsWithPlanet) {
            const fCollection = db.collection(filmsCollection);
            const getOneFilm = await fCollection.findOne({id: +film.film_id});
            films.push(getOneFilm);
        }
        res.json({planet, films});
    } catch (err) {
        console.error('Error: ', err);
        res.status(500).send("Error getting planet");
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
        res.status(500).send("Error getting characters");
    }
});


app.get('/api/characters/:id/films', async (req, res) => {
    try {
        const {id} = req.params;
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const charactersCollection = db.collection('characters');
        const filmsCharactersCollection = db.collection('films_characters');
        const filmsCollection = db.collection('films');
        const character = await charactersCollection.findOne({ id: +id });
        const filmRelations = await filmsCharactersCollection.find({ character_id: +id }).toArray();
        const filmIds = filmRelations.map(relation => relation.film_id);                                                                                 

        res.json({character, filmRelations});
    } catch (err) {
        console.error('Error: ', err);
        res.status(500).send("Error getting characters");
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});