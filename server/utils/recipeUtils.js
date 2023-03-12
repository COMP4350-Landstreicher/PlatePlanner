const asyncHandler = require("express-async-handler")
const {Op, Sequelize} = require("sequelize")
//const sequelize = new Sequelize(process.env.DB_URI);
const getAllRecipe = asyncHandler(async (userID, Recipe) => {
    await Recipe.sync()

    // For testing only - stub data - will remove once have add function
    const instructions = "Rinse the rice.\n"
        + "Use the right ratio of water. Add 2 parts water and 1 part rice to a large pot. For slightly firmer rice, use 1 part liquid to 2/3 parts rice.\n"
        + "Bring the water to a boil. Once it's boiling, add a big pinch of salt.\n"
        + "Maintain a simmer. Reduce heat to low, cover the pot with a tight fitting lid, and maintain a gentle simmer.\n"
        + "Cook without peeking or stirring. Cook until the water is absorbed, about 18 minutes. Try not to peek until the end of the cooking time so the steam doesn't escape. Whatever you do, don't mix the rice while it's cooking — this will lead to gummy rice.\n"
        + "Let the rice rest covered. Turn off the heat and let the rice sit, covered, for 10 minutes. During this time, the rice will steam for extra fluffy results.\n"
        + "Fluff the rice with a fork.";

    const recipes = [];
    for (let i = 0; i < 5; i++) {
        recipes.push({
            recipe_name: ("" + new Date(Date.now() + i * (3600 * 1000 * 24))).split('(').at(0),
            description: "This is a short description about the recipe and it should have word limit later so it wont go out of the box",
            instructions: instructions,
            selected: false,
            user_id: userID,
            imageUrl: "https://source.unsplash.com/random",
            createdAt: new Date(Date.now() + i * (3600 * 1000 * 24)),
            updatedAt: new Date(Date.now() + i * (3600 * 1000 * 24))
        });
    }
    Recipe.bulkCreate(recipes);

    const allRecipes = await Recipe.findAll({ where: { user_id: userID } })

    return allRecipes
})

const getByName = asyncHandler(async (recipeName, userId, Recipe) => {
    await Recipe.sync()
    const recipe = await Recipe.findOne({ where: { recipe_name: recipeName, user_id: 1 } })

    return recipe
})

const getByID = asyncHandler(async (recipeID, Recipe) => {
    await Recipe.sync()
    const recipe = await Recipe.findOne({ where: { id: recipeID } })

    return recipe
})

const getShoppingList = asyncHandler(async (userId, Recipe, Ingredient) => {
	await Ingredient.sync()
	Recipe.hasMany(Ingredient, {foreignKey: 'recipe_id'})
	Ingredient.belongsTo(Recipe, {foreignKey: 'recipe_id'})
	console.log(Ingredient);
	const recipes = await Ingredient.findAll({
		attributes: [
			'ingredient_name', 
			'ingredient_unit', 
			[
				Sequelize.literal('SUM(Recipe.portion*ingredient_amount)'), 
				'total_amount'
			]
		], 
		include: [
			{
				model: Recipe, 
				required: true, 
				attributes: [], 
				where: {
					user_id: userId, 
					portion: {[Op.gt]: "0"}
				}
			}
		], 
		group: [
			'ingredient_name', 
			'ingredient_unit'
		], 
		raw: true
	});
	return recipes
})

const getShoppingListRecipes = asyncHandler(async (userId, Recipe) => {
	await Recipe.sync()
	const recipes = await Recipe.findAll({attributes: {exclude: ['id', 'user_id']}, where: {user_id: userId, portion: {[Op.gt]: "0"}}})

	return recipes
})

const setPortion = asyncHandler(async (recipeID, portions, userId, Recipe) => {
	await Recipe.sync()
	const recipe = await Recipe.findOne({ where: {id: recipeID, user_id: userId}});
	
	if(recipe){

		recipe.portion = portions

		recipe.save()
		return true;
	}
	else{
		return false;
	}
})

const resetPortions = asyncHandler(async (userId, Recipe) => {
	await Recipe.sync()
	const recipes = await Recipe.findAll({ where: {user_id: userId}})

	for(i=0; i<recipes.length; i++){
		recipes[i].portion = 0;
		recipes[i].save();
	}
})

module.exports = {
    getAllRecipe,
    getByName,
    getByID,
    getShoppingList,
    getShoppingListRecipes,
    setPortion,
    resetPortions
}
