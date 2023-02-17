// initialize the express app
const express = require('express');
const router = express.Router();
const {authenticate} = require('../middleware/authMiddleware');

const {
	viewAllRecipe,
	searchByName,
	selectRecipe,
} = require('../controllers/recipeController')

// get all recipes
router.get('/getAll', authenticate, viewAllRecipe);

// search recipe by name
router.get('/search/:name', authenticate, searchByName);

// get a recipe by id
router.get('/getOne/:id', selectRecipe);

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

