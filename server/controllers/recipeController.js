const asyncHandler = require("express-async-handler");
const { getRecipeIngredients } = require("../utils/ingredientUtils");
const {getAllRecipe, getByName, getByID} = require("../utils/recipeUtils")
const {Recipe} = require("../models//recipeModel");

const viewAllRecipe = asyncHandler( async (req, res) => {
    const recipes = await getAllRecipe(Recipe);

    res.send(recipes);
})

const searchByName = asyncHandler( async (req, res) => {
    const { name, userID } = req.params;
    const recipe = await getByName(name, userID, Recipe);
    
    recipe
    .then(data => res.json({data : data}))
    .catch(err => console.log(err));
})

const selectRecipe = asyncHandler( async (req, res) => {
    const { id, userID } = req.params;
    const recipe = await getByID(id, userID, Recipe);
    const ingredients = await getRecipeIngredients(id);
    recipe.ingredients = JSON.stringify(ingredients)
    
    recipe
    .then(data => res.json({data : data}))
    .catch(err => console.log(err));
})

module.exports = {
    viewAllRecipe,
    searchByName,
    selectRecipe,
}
