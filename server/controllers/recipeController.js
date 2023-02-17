const asyncHandler = require("express-async-handler");
const { getRecipeIngredients } = require("../utils/ingredientUtils");
const {getAllRecipe, getByName, getByID} = require("../utils/recipeUtils")
const {Recipe} = require("../models/recipeModel");
const {Ingredient} = require("../models/ingredientModel");

const viewAllRecipe = asyncHandler( async (req, res) => {
    const { user } = req.params;
    const recipes = await getAllRecipe(user.id, Recipe);

    res.send(recipes);
})

const searchByName = asyncHandler( async (req, res) => {
    const { name, user } = req.params;
    const recipe = await getByName(name, user.id, Recipe);
    
    res.send(recipe);
})

const selectRecipe = asyncHandler( async (req, res) => {
    const { id } = req.params;
    const recipe = await getByID(id, Recipe);
    const ingredients = await getRecipeIngredients(id, Ingredient);
    recipe.setDataValue('ingredient', ingredients);
    
    res.send(recipe);
})

module.exports = {
    viewAllRecipe,
    searchByName,
    selectRecipe,
}
