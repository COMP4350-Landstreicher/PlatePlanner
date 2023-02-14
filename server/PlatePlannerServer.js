'use strict';

var express = require('express');
var cors = require('cors');
var app = express();

app.use(cors());

const PORT = 3000;
const HOST = '0.0.0.0';

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.get('/', (req, res) => {res.send('<h1>Welcome to PlatePlanner!</h1>');});

app.listen(PORT, HOST, () => {console.log(`Running on http://${HOST}:${PORT}`);});

const recipes = [];

app.get("/recipes", (req, res) => {
    res.send(recipes);
});

app.post("/addRecipe", (req, res) => {
    const { id, name, image, updated } = req.body;
    recipes.push({id: id, name: name, image: image, updated: updated});
    res.send(recipes);
});