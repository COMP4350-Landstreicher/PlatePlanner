const asyncHandler = require('express-async-handler');

const getIngredients = asyncHandler(async (recipeID, Ingredient) => {
  await Ingredient.sync();

  return await Ingredient.findAll({
    where: {recipeID: recipeID},
    attributes: ['ingredientName', 'ingredientAmount', 'ingredientUnit'],
  });
});

const addIngredients = asyncHandler(
  async (ingredients, recipeID, Ingredient) => {
    await Ingredient.sync();

    ingredients = ingredients.map((ingredient) => ({
      ...ingredient,
      recipeID: `${recipeID}`,
    }));

    return await Ingredient.bulkCreate(ingredients);
  });

const removeIngredients = asyncHandler(async (recipeID, Ingredient) => {
  await Ingredient.sync();

  return await Ingredient.destroy({
    where: {recipeID: recipeID},
    force: true,
  }).then(() => {
    return true;
  }, () => {
    return false;
  });
});

module.exports = {
  getIngredients,
  addIngredients,
  removeIngredients,
};
