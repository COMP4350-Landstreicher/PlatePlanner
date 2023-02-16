const asyncHandler = require("express-async-handler")

const getAllRecipe = asyncHandler(async (Recipe) => {
    await Recipe.sync()
    const allRecipes = await Recipe.findAll()

    return allRecipes
})

const getByName = asyncHandler(async (recipeName, userId, Recipe) => {
    await Recipe.sync()
    const recipe = await Recipe.findOne({ where: { recipe_name:recipeName, userId:userId } })
    
    return recipe
})

const getByID = asyncHandler(async (recipeID, userId, Recipe) => {
    await Recipe.sync()
    const recipe = await Recipe.findOne({ where: { id:recipeID, userId:userId } })

    return recipe
})

module.exports = {
	getAllRecipe,
	getByName,
	getByID
}
