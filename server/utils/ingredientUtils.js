const asyncHandler = require("express-async-handler")

const getRecipeIngredients = asyncHandler(async (recipeID, Ingredient) => {
    await Ingredient.sync()

    // For testing only - stub data - will remove once have add function
    const stubData = [
        { recipe_id: recipeID, ingredient_name: "Beef", ingredient_unit: "g", ingredient_amount: "500" },
        { recipe_id: recipeID, ingredient_name: "Wine", ingredient_unit: "ml", ingredient_amount: "500" },
        { recipe_id: recipeID, ingredient_name: "Sugar", ingredient_unit: "g", ingredient_amount: "10" },
        { recipe_id: recipeID, ingredient_name: "Salt", ingredient_unit: "g", ingredient_amount: "20" },
        { recipe_id: recipeID, ingredient_name: "Pork", ingredient_unit: "g", ingredient_amount: "500" },
        { recipe_id: recipeID, ingredient_name: "Egg", ingredient_unit: "count", ingredient_amount: "2" },
        { recipe_id: recipeID, ingredient_name: "Some other ingredients", ingredient_unit: "count", ingredient_amount: "5" },
        { recipe_id: recipeID, ingredient_name: "The last ingredient", ingredient_unit: "count", ingredient_amount: "10" }
    ];

    Ingredient.bulkCreate(stubData);

    const ingredients = await Ingredient.findAll({
        where: { recipe_id: recipeID },
        attributes: ['ingredient_name', 'ingredient_amount', 'ingredient_unit']
    })

    return ingredients
})

module.exports = {
    getRecipeIngredients
}
