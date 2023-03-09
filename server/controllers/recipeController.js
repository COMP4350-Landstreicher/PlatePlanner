const asyncHandler = require("express-async-handler");
const { getRecipeIngredients, addRecipeIngredients, removeRecipeIngredients } = require("../utils/ingredientUtils");
const {getAllRecipe, getByName, getByID, getShoppingList, setPortion, resetPortions, createNewRecipe, removeRecipe} = require("../utils/recipeUtils")
const {Recipe} = require("../models/recipeModel");
const {Ingredient} = require("../models/ingredientModel");

const viewAllRecipe = asyncHandler( async (req, res) => {
    const recipes = await getAllRecipe(req.user.dataValues.id, Recipe);

    res.send(recipes);
})

const searchByName = asyncHandler( async (req, res) => {
    const { name } = req.params;
    const recipe = await getByName(name, req.user.dataValues.id, Recipe);
    
    res.send(recipe);
})

const selectRecipe = asyncHandler( async (req, res) => {
    const { id } = req.params;
    const recipe = await getByID(id, Recipe);
    const ingredients = await getRecipeIngredients(id, Ingredient);
    recipe.setDataValue('ingredients', ingredients);
    
    res.send(recipe);
})

const viewShoppingList = asyncHandler( async (req, res) => {
	const recipeList = await getShoppingList(req.user.id, Recipe, Ingredient);
	const shoppingList = recipeList

	res.send(shoppingList);
})

const setNumPortions = asyncHandler( async (req, res) => {
	const {recipeId} = req.params
	const { portionSize } = req.body
        if( !recipeId || !portionSize){
                res.status(400)
                throw new Error("Please include all fields");
        }
	if(portionSize < 0){
		res.status(400)
		throw new Error("Portion size must be greater than or equal to 0");
	}
	if(!await setPortion(recipeId, portionSize, req.user.id, Recipe)){
		res.status(400)
		res.json({"message": "Recipe not found"})
	}
	else{
		res.json({"message": "Portion successfully updated"})
	}
})

const emptyShoppingList = asyncHandler(async (req, res) => {
	await resetPortions(req.user.id, Recipe)
	res.json({"message": "Shopping list successfully emptied"})
})

const addRecipe = asyncHandler( async (req, res) => {
    const { recipeName, description, instructions, imageURL, ingredients } = req.body

    if((await getByName(recipeName, req.user.dataValues.id, Recipe)) == null){
        const newRecipe = await createNewRecipe(recipeName, description, instructions, imageURL, req.user.dataValues.id, Recipe)
        if(newRecipe){
            if(await addRecipeIngredients(ingredients, newRecipe.id, Ingredient)){
                res.status(200).json({ message: "A new recipe has been successfully added."})
            }
            else{
                res.status(400)
                throw new Error("Unable to add ingredients.")
            }
        }
        else{
            res.status(400)
            throw new Error("Unable to create new recipe.")
        }
    }
    else{
        res.status(400)
        throw new Error("Recipe name already exists.")
    }

})

const deleteRecipe = asyncHandler( async (req, res) => {
    const { id } = req.params; 

    if (await getByID(id, Recipe)) {
        if (await removeRecipe(id, Recipe) && await removeRecipeIngredients(id, Recipe)) {
            res.status(200).json({ message: "Recipe is deleted successfully."})
        }
        else{
            res.status(400)
            throw new Error("Unable to delete recipe.")
        }   
    }
    else{
        res.status(400)
        throw new Error("Recipe id does not exist.")
    }
})

module.exports = {
    viewAllRecipe,
    searchByName,
    selectRecipe,
    viewShoppingList,
    setNumPortions,
    emptyShoppingList,
    addRecipe,
    deleteRecipe,
}
