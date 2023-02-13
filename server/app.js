const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const DBService = require('./DBService');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended : false }));


// add recipe
app.post('/insert', (request, response) => {
    const { name, description, ingredients, instructions } = request.body;
    const db = DBService.getDBServiceInstance();
    
    const result = db.insertNewRecipe(name, description, ingredients, instructions);

    result
    .then(data => response.json({ data: data}))
    .catch(err => console.log(err));
});

// get all recipes
app.get('/getAll', (request, response) => {
    const db = DBService.getDBServiceInstance();

    const result = db.getAllData();
    
    // cannot return nything here, still need to wait
    // on the promises from DBService.getAllData()
    result
    .then(data => response.json({data : data}))
    .catch(err => console.log(err));
})

// update recipe
app.patch('/update', (request, response) => {
    const { id, name } = request.body;
    const db = DBService.getDBServiceInstance();

    const result = db.updateNameById(id, name);
    
    result
    .then(data => response.json({success : data}))
    .catch(err => console.log(err));
});

// delete recipe
app.delete('/delete/:id', (request, response) => {
    const { id } = request.params;
    const db = DBService.getDBServiceInstance();

    const result = db.deleteRowById(id);
    
    result
    .then(data => response.json({success : data}))
    .catch(err => console.log(err));
});

// search recipe
app.get('/search/:name', (request, response) => {
    const { name } = request.params;
    const db = DBService.getDBServiceInstance();

    const result = db.searchByName(name);
    
    result
    .then(data => response.json({data : data}))
    .catch(err => console.log(err));
})

// get recipe by id
app.get('/get/:id', (request, response) => {
    const { id } = request.params;
    //console.log(`Receive ID is: ${id}`);
    const db = DBService.getDBServiceInstance();

    const result = db.getByID(id);
    
    result
    .then(data => response.json({data : data}))
    .catch(err => console.log(err));
})

app.listen(process.env.PORT, () => console.log(`app is running on port ${process.env.PORT}`));