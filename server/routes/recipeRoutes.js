// initialize the express app
const express = require('express');
const router = express.Router();
const {authenticate} = require('../middleware/authMiddleware');

const {
	viewAllRecipe,
	searchByName,
	selectRecipe,
	viewShoppingList,
	setNumPortions,
	emptyShoppingList,
	addRecipe,
	deleteRecipe,
} = require('../controllers/recipeController')

// get all recipes
router.get('/getAll', authenticate, viewAllRecipe);

// search recipe by name
router.get('/search/:name', authenticate, searchByName);

// get a recipe by id
router.get('/getOne/:id', selectRecipe);

// add recipe
router.post('/addRecipe', authenticate, addRecipe);

// delete recipe
router.delete('/deleteRecipe/:id', authenticate, deleteRecipe);

router.get('/viewShoppingList', authenticate, viewShoppingList);

router.post('/setPortion/:recipeId', authenticate, setNumPortions);

router.post('/emptyShoppingList', authenticate, emptyShoppingList);

module.exports = router;
