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

app.get('/test', authenticate, (req, res) => {res.send('test');});

app.use('/auth', require('./routes/authRoutes'));

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

app.use(errorHandler);
