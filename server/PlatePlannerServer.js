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
app.use('/recipes', require('./routes/recipeRoutes'));

app.listen(PORT, HOST, () => {console.log(`Running on http://${HOST}:${PORT}`);});

const recipes = [];

app.post("/addRecipe", (req, res) => {
    recipes.push(req.body);
    res.send(recipes);
});

app.get('/recipe/:id', (req, res) => {
    const { id } = req.params;
    const result = recipes.find(recipe => recipe.id.toString() === id);
    res.send(result);
});
app.use(errorHandler);
