const asyncHandler = require("express-async-handler");
const { getRecipeIngredients } = require("../utils/ingredientUtils");
const {getAllRecipe, getByName, getByID} = require("../utils/recipeUtils")

const viewAllRecipe = asyncHandler( async (req, res) => {
    const recipes = await getAllRecipe();

    recipes
    .then(data => res.json({data : data}))
    .catch(err => console.log(err));
})

const searchByName = asyncHandler( async (req, res) => {
    const { name } = req.params;
    const recipe = await getByName(name);
    
    recipe
    .then(data => res.json({data : data}))
    .catch(err => console.log(err));
})

const selectRecipe = asyncHandler( async (req, res) => {
    const { id } = req.params;
    const recipe = await getByID(id);
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
