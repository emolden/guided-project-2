import express from 'express';
import { MongoClient, ObjectId } from 'mongodb';

const url = 'mongodb://localhost:27017';
const dbName = 'swapi';
const charactersCollection = 'characters';
const filmsCollection = 'films';
const PlanetsCollection = 'planets';


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





app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});