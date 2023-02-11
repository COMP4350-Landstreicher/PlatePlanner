'use strict';

const express = require('express');
const path = require('path')
const PORT = 80;
const HOST = '0.0.0.0';


const app = express();
app.get('/', (req, res) => {res.send('<h1>Welcome to PlatePlanner!</h1><br><a href="/login">Log In</a>');});
app.get('/login', (req, res) => {res.sendFile(path.join(__dirname, 'static-content/html/login.html'));});
app.get('/create-account', (req, res) => {res.sendFile(path.join(__dirname, 'static-content/html/create-account.html'));});

app.use(express.static('static-content'))
app.listen(PORT, HOST, () => {console.log(`Running on http://${HOST}:${PORT}`);});