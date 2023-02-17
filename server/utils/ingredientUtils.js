const asyncHandler = require("express-async-handler")

const getRecipeIngredients = asyncHandler(async (recipeID, Ingredient) => {
    await Ingredient.sync()

    // For testing only
    // Ingredient.create({
    //     recipe_id: 1,
    //     ingredient_name: "eggplant",
    //     ingredient_amount: 1,
    //     ingredient_unit: "whole",
    // })

    const ingredients = await Ingredient.findAll({ 
        where: { recipe_id:recipeID },
        attributes: ['ingredient_name', 'ingredient_amount', 'ingredient_unit']
    })

    return ingredients
})

module.exports = {
	getRecipeIngredients
}
