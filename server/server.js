import express from 'express';

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







app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});