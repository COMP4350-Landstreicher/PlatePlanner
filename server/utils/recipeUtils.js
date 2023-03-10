const asyncHandler = require("express-async-handler")
const {Op, Sequelize} = require("sequelize")
//const sequelize = new Sequelize(process.env.DB_URI);
const getAllRecipe = asyncHandler(async (userID, Recipe) => {
    await Recipe.sync()
    const allRecipes = await Recipe.findAll({ where: { userID: userID } })

    return allRecipes
})

const getByName = asyncHandler(async (recipeName, userID, Recipe) => {
    await Recipe.sync()
    const recipe = await Recipe.findOne({ where: { recipeName: recipeName, userID: userID } })

    return recipe
})

const getByID = asyncHandler(async (recipeID, userID, Recipe) => {
    await Recipe.sync()
    const recipe = await Recipe.findOne({ where: { id: recipeID, userID: userID } })

    return recipe
})

const createNewRecipe = asyncHandler(async (recipeName, description, instructions, imageURL, userID, Recipe) => {
    await Recipe.sync()

    return await Recipe.create({
        recipeName: recipeName,
        description: description,
        instructions: instructions,
        userID: userID,
        imageURL: imageURL,
        portion: 0
    })
})

const removeRecipe = asyncHandler(async (recipeID, Recipe) => {
	await Recipe.sync()

	return await Recipe.destroy({
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

const updateRecipeByID = asyncHandler(async (recipeID, recipeName, description, instructions, imageURL, userID, Recipe) => {
    await Recipe.sync()

    return await Recipe.update({
        recipeName: recipeName,
        description: description,
        instructions: instructions,
        imageURL: imageURL,
    }, {
		where: {
			id: recipeID,
			userID: userID,
		}
	})
})

const getShoppingList = asyncHandler(async (userID, Recipe, Ingredient) => {
	await Ingredient.sync()
	Recipe.hasMany(Ingredient, {foreignKey: 'recipeID'})
	Ingredient.belongsTo(Recipe, {foreignKey: 'recipeID'})
	console.log(Ingredient);
	const recipes = await Ingredient.findAll({
		attributes: [
			'ingredientName', 
			'ingredientUnit', 
			[
				Sequelize.literal('SUM(Recipe.portion*ingredientAmount)'), 
				'totalAmount'
			]
		], 
		include: [
			{
				model: Recipe, 
				required: true, 
				attributes: [], 
				where: {
					userID: userID, 
					portion: {[Op.gt]: "0"}
				}
			}
		], 
		group: [
			'ingredientName', 
			'ingredientUnit'
		], 
		raw: true
	});
	return recipes
})

const setPortion = asyncHandler(async (recipeID, portions, userID, Recipe) => {
	await Recipe.sync()
	const recipe = await Recipe.findOne({ where: {id: recipeID, userID: userID}});
	
	if(recipe){

		recipe.portion = portions

		recipe.save()
		return true;
	}
	else{
		return false;
	}
})

const resetPortions = asyncHandler(async (userID, Recipe) => {
	await Recipe.sync()
	const recipes = await Recipe.findAll({ where: {userID: userID}})

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
    setPortion,
    resetPortions,
	createNewRecipe,
	removeRecipe,
	updateRecipeByID,
}
