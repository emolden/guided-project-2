import express from 'express';
import { MongoClient, ObjectId } from 'mongodb';

const url = 'mongodb://localhost:27017';
const dbName = 'swapi';
const CharactersCollection = 'characters';

const app = express();
const PORT = 3000;
app.use(express.json());

const planets = [
    {"id": 1, "name": "Pluton"},
    {"id": 2, "name": "Earth"},
]
app.get('/api/planets', (req, res) => {
res.json(planets);
})

app.get('/api/characters', async (req, res) => {
    try {
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(CharactersCollection);
        const characters = await collection.find({}).toArray();
        res.json(characters);
    } catch (err) {
        console.error('Error: ', err);
        res.status(500).send("Error getting characters");
    }
});







app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});