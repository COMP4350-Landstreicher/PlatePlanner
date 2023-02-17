const asyncHandler = require("express-async-handler")

const getAllRecipe = asyncHandler(async (userID, Recipe) => {
    await Recipe.sync()

    // For testing only
    // Recipe.create({
    //     recipe_name: "roasted_eggplant",
    //     description: "",
    //     instructions: "",
    //     selected: true,
    //     user_id: 1
    // })

    const allRecipes = await Recipe.findAll({ where: { user_id:userID } })

    return allRecipes
})

const getByName = asyncHandler(async (recipeName, userId, Recipe) => {
    await Recipe.sync()
    const recipe = await Recipe.findOne({ where: { recipe_name:recipeName, user_id:1 } })
    
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
