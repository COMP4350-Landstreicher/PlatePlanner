'use strict';

var express = require('express');
var cors = require('cors');
var app = express();

app.use(cors());

const PORT = 3000;
const HOST = '0.0.0.0';


app.get('/', (req, res) => {res.send('<h1>Welcome to PlatePlanner!</h1>');});

app.listen(PORT, HOST, () => {console.log(`Running on http://${HOST}:${PORT}`);});

app.get("/recipes", (req, res) => {
    const recipes = [
        {id: 1, name: "This is recipe nameeeee", image: "https://source.unsplash.com/random"},
        {id: 2, name: "This is recipe nameeeee", image: "https://source.unsplash.com/random"},
        {id: 3, name: "This is recipe nameeeee", image: "https://source.unsplash.com/random"},
        {id: 4, name: "This is recipe nameeeee", image: "https://source.unsplash.com/random"},
        {id: 5, name: "This is recipe nameeeee", image: "https://source.unsplash.com/random"},
        {id: 6, name: "This is recipe nameeeee", image: "https://source.unsplash.com/random"},
        {id: 7, name: "This is recipe nameeeee", image: "https://source.unsplash.com/random"},
        {id: 8, name: "This is recipe nameeeee", image: "https://source.unsplash.com/random"},
        {id: 9, name: "This is recipe nameeeee", image: "https://source.unsplash.com/random"}
    ]
    res.send(recipes);
});