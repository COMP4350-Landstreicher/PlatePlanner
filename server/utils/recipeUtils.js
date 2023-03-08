const asyncHandler = require("express-async-handler")
const {Op, Sequelize} = require("sequelize")
//const sequelize = new Sequelize(process.env.DB_URI);
const getAllRecipe = asyncHandler(async (userID, Recipe) => {
    await Recipe.sync()
    const allRecipes = await Recipe.findAll({ where: { user_id: userID } })

    return allRecipes
})

const getByName = asyncHandler(async (recipeName, userID, Recipe) => {
    await Recipe.sync()
    const recipe = await Recipe.findOne({ where: { recipe_name: recipeName, user_id: userID } })

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

const createNewRecipe = asyncHandler(async (recipeName, description, instructions, imageUrl, userID, Recipe) => {
    await Recipe.sync()

    return await Recipe.create({
        recipe_name: recipeName,
        description: description,
        instructions: instructions,
		selected: false,
        user_id: userID,
        imageUrl: imageUrl,
        portion: 0
    })
})

const removeRecipe = asyncHandler(async (recipeID, Recipe) => {
	await Recipe.sync()

	return Recipe.destroy({
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
    getAllRecipe,
    getByName,
    getByID,
    getShoppingList,
    setPortion,
    resetPortions,
	createNewRecipe,
	removeRecipe
}
