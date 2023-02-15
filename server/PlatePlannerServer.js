'use strict';

const express = require('express');
const dotenv = require('dotenv').config()
const cors = require('cors');
const { errorHandler } = require('./middleware/errorMiddleware');
const cookieParser = require('cookie-parser')
const {authenticate} = require('./middleware/authMiddleware');


const PORT = 3000;
const HOST = '0.0.0.0';


const app = express();
app.use(express.json())
app.use(cors());
app.use(express.urlencoded({extended: false}))
app.use(cookieParser())

app.get('/', (req, res) => {res.send('<h1>Welcome to PlatePlanner!</h1>');});

app.get('/test', authenticate, (req, res) => {res.send(req.user.userName);});

app.use('/auth', require('./routes/authRoutes'));

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

app.use(errorHandler);
