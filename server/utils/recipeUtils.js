const asyncHandler = require("express-async-handler")

const getAllRecipe = asyncHandler(async (Recipe) => {
    await Recipe.sync()

    // For testing only
    // Recipe.create({
    //     recipe_name: "roasted_eggplant",
    //     description: "",
    //     instructions: "",
    //     selected: true,
    //     userId: 1
    // })

    const allRecipes = await Recipe.findAll()

    return allRecipes
})

const getByName = asyncHandler(async (recipeName, userId, Recipe) => {
    await Recipe.sync()
    const recipe = await Recipe.findOne({ where: { recipe_name:recipeName, user_id:userId } })
    
    return recipe
})

const getByID = asyncHandler(async (recipeID, userId, Recipe) => {
    await Recipe.sync()
    const recipe = await Recipe.findOne({ where: { id:recipeID, user_id:userId } })

    return recipe
})

module.exports = {
	getAllRecipe,
	getByName,
	getByID
}
