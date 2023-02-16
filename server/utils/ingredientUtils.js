const asyncHandler = require("express-async-handler")

const getRecipeIngredients = asyncHandler(async (recipeID, Ingredient) => {
    await Ingredient.sync()
    const ingredients = await Ingredient.findAll(
        { where: { recipe_id:recipeID } }, 
        { attributes: ['ingredient_name', 'ingredient_amount', 'ingredient_unit'] }
        )

    return ingredients
})

module.exports = {
	getRecipeIngredients
}
