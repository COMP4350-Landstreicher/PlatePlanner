const asyncHandler = require("express-async-handler")

const getRecipeIngredients = asyncHandler(async (recipeID, Ingredient) => {
    await Ingredient.sync()

    const ingredients = await Ingredient.findAll({
        where: { recipe_id: recipeID },
        attributes: ['ingredient_name', 'ingredient_amount', 'ingredient_unit']
    })

    return ingredients
})

const addRecipeIngredients = asyncHandler(async (ingredients, recipeID, Ingredient) => {
    await Ingredient.sync()

    ingredients = ingredients.map((ingredient) => ({
        ...ingredient,
        recipe_id: `${recipeID}`,
    }));

    return await Ingredient.bulkCreate(ingredients);
})

const removeRecipeIngredients = asyncHandler(async (recipeID, Ingredient) => {
    await Ingredient.sync()

    return Ingredient.destroy({
		where: {
		  id: recipeID
		},
		force: true
	}).then(() => {
		return true
	}, () => {
		return false
	})
})

module.exports = {
    getRecipeIngredients,
    addRecipeIngredients,
    removeRecipeIngredients,
}
