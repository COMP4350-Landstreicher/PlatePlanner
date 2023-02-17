'use strict';

const express = require('express');
const dotenv = require('dotenv').config()
const cors = require('cors');
const { errorHandler } = require('./middleware/errorMiddleware');
const cookieParser = require('cookie-parser')
const { authenticate } = require('./middleware/authMiddleware');


const PORT = 3000;
const HOST = '0.0.0.0';


const app = express();
app.use(express.json())
app.use(cors({
    origin: ['http://landstreicher.ddyck.ca', 'http://localhost'],
    credentials: true
}));
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.get('/', (req, res) => { res.send('<h1>Welcome to PlatePlanner!</h1>'); });

app.get('/test', authenticate, (req, res) => { res.send(req.user.userName); });

app.use('/auth', require('./routes/authRoutes'));
app.use('/recipes', require('./routes/recipeRoutes'));

app.listen(PORT, HOST, () => { console.log(`Running on http://${HOST}:${PORT}`); });

app.use(errorHandler);
