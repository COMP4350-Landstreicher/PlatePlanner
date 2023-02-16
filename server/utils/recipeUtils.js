const asyncHandler = require("express-async-handler")

const getAllRecipe = asyncHandler(async (Recipe) => {
    await Recipe.sync()
    const allRecipes = await Recipe.findAll()

    return allRecipes
})

const getByName = asyncHandler(async (recipeName, Recipe) => {
    await Recipe.sync()
    const recipe = await Recipe.findOne({ where: { recipe_name:recipeName } })
    
    return recipe
})

const getByID = asyncHandler(async (recipeID, Recipe) => {
    await Recipe.sync()
    const recipe = await Recipe.findOne({ where: { id:recipeID } })

    return recipe
})

module.exports = {
	getAllRecipe,
	getByName,
	getByID
}
