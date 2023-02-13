'use strict';

const express = require('express');
const dotenv = require('dotenv').config()
const { errorHandler } = require('./server/middleware/errorMiddleware');
const cookieParser = require('cookie-parser')
const {authenticate} = require('./server/middleware/authMiddleware');


const PORT = 80;
const HOST = '0.0.0.0';


const app = express();
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cookieParser())

app.get('/', (req, res) => {res.send('<h1>Welcome to PlatePlanner!</h1>');});

app.get('/test', authenticate, (req, res) => {res.send('test');});

app.use('/auth', require('./server/routes/authRoutes'));

app.use(errorHandler);

app.listen(PORT, HOST, () => {console.log(`Running on http://${HOST}:${PORT}`);});
