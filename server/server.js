// initialize the express app
const express = require('express');
const app = express();
const cors = require('cors');

// get env variables from .env file
const dotenv = require('dotenv');
let instance = null;
dotenv.config();

// Routers
const recipeRouter = require("./routes/recipe");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended : false }));

app.use('/recipe', recipeRouter);
app.listen(process.env.PORT, () => console.log(`app is running on port ${process.env.PORT}`));
