// initialize the express app
const express = require('express');
var cors = require('cors');
const router = express.Router();

// initialize an instance of the DBService
const DBService = require('../dbService');

router.get('/getAll', function (request, response) {
    const db = DBService.getDBServiceInstance();
    const result = db.getAllData();
    
    result
    .then(data => response.json({data : data}))
    .catch(err => console.log(err));
});

// search recipe by name
router.get('/search/:name', (request, response) => {
    const { name } = request.params;
    const db = DBService.getDBServiceInstance();
    const result = db.searchByName(name);
    
    result
    .then(data => response.json({data : data}))
    .catch(err => console.log(err));
})

// get recipe by id
router.get('/get/:id', (request, response) => {
    const { id } = request.params;
    const db = DBService.getDBServiceInstance();
    const result = db.getByID(id);
    
    result
    .then(data => response.json({data : data}))
    .catch(err => console.log(err));
})

module.exports = router;

// // WIP sections below

// // add recipe
// router.post('/insert', (request, response) => {
//     const { name, description, instructions } = request.body;
//     const db = DBService.getDBServiceInstance();
    
//     const result = db.insertNewRecipe(name, description, instructions);

//     result
//     .then(data => response.json({ data: data}))
//     .catch(err => console.log(err));
// });

// // update recipe
// router.patch('/update', (request, response) => {
//     const { id, name } = request.body;
//     const db = DBService.getDBServiceInstance();

//     const result = db.updateNameById(id, name);
    
//     result
//     .then(data => response.json({success : data}))
//     .catch(err => console.log(err));
// });

// // delete recipe
// router.delete('/delete/:id', (request, response) => {
//     const { id } = request.params;
//     const db = DBService.getDBServiceInstance();

//     const result = db.deleteRowById(id);
    
//     result
//     .then(data => response.json({success : data}))
//     .catch(err => console.log(err));
// });

