const asyncHandler = require("express-async-handler")

const getRecipeIngredients = asyncHandler(async (recipeID, Ingredient) => {
    await Ingredient.sync()

    const ingredients = await Ingredient.findAll({
        where: { recipeID: recipeID },
        attributes: ['ingredientName', 'ingredientAmount', 'ingredientUnit']
    })

    return ingredients
})

const addRecipeIngredients = asyncHandler(async (ingredients, recipeID, Ingredient) => {
    await Ingredient.sync()

    ingredients = ingredients.map((ingredient) => ({
        ...ingredient,
        recipeID: `${recipeID}`,
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
