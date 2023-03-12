const asyncHandler = require("express-async-handler");
const { getRecipeIngredients } = require("../utils/ingredientUtils");
const {getAllRecipe, getByName, getByID, getShoppingList, getShoppingListRecipes, setPortion, resetPortions} = require("../utils/recipeUtils")
const {Recipe} = require("../models/recipeModel");
const {Ingredient} = require("../models/ingredientModel");

const viewAllRecipe = asyncHandler( async (req, res) => {
    const recipes = await getAllRecipe(req.user.dataValues.id, Recipe);

    res.send(recipes);
})

const searchByName = asyncHandler( async (req, res) => {
    const { name } = req.params;
    const recipe = await getByName(name, req.user.dataValues.id, Recipe);
    
    res.send(recipe);
})

const selectRecipe = asyncHandler( async (req, res) => {
    const { id } = req.params;
    const recipe = await getByID(id, Recipe);
    const ingredients = await getRecipeIngredients(id, Ingredient);
    recipe.setDataValue('ingredient', ingredients);
    
    res.send(recipe);
})

const viewShoppingList = asyncHandler( async (req, res) => {
	const shoppingList = await getShoppingList(req.user.id, Recipe, Ingredient);

	res.send(shoppingList);
})

const viewShoppingListRecipes = asyncHandler( async (req, res) => {
	const recipeList = await getShoppingListRecipes(req.user.id, Recipe);

	res.send(recipeList)
})

const setNumPortions = asyncHandler( async (req, res) => {
	const {recipeId} = req.params
	const { portionSize } = req.body
        if( !recipeId || !portionSize){
                res.status(400)
                throw new Error("Please include all fields");
        }
	if(portionSize < 0){
		res.status(400)
		throw new Error("Portion size must be greater than or equal to 0");
	}
	if(!await setPortion(recipeId, portionSize, req.user.id, Recipe)){
		res.status(400)
		res.json({"message": "Recipe not found"})
	}
	else{
		res.json({"message": "Portion successfully updated"})
	}
})

const emptyShoppingList = asyncHandler(async (req, res) => {
	await resetPortions(req.user.id, Recipe)
	res.json({"message": "Shopping list successfully emptied"})
})

module.exports = {
    viewAllRecipe,
    searchByName,
    selectRecipe,
    viewShoppingList,
    viewShoppingListRecipes,
    setNumPortions,
    emptyShoppingList
}
