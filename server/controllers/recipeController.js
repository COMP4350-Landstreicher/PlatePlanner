const asyncHandler = require("express-async-handler");
const { getIngredients, addIngredients, removeIngredients } = require("../utils/ingredientUtils");
const {getAllRecipe, getByName, getByID, getShoppingList, getShoppingListRecipes, setPortion, resetPortions, createNewRecipe, removeRecipe, updateRecipeByID} = require("../utils/recipeUtils")
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

    if (recipe){
        const ingredients = await getIngredients(id, Ingredient);
        recipe.setDataValue('ingredients', ingredients);
        res.send(recipe);
    }
    else{
        res.status(400)
        throw new Error("Recipe ID does not exist.")
    }
})

const addRecipe = asyncHandler( async (req, res) => {
    const { recipeName, description, instructions, imageURL, ingredients } = req.body;

    if((await getByName(recipeName, req.user.dataValues.id, Recipe)) == null){
        const newRecipe = await createNewRecipe(recipeName, description, instructions, imageURL, req.user.dataValues.id, Recipe)
        if(newRecipe){
            if(await addIngredients(ingredients, newRecipe.id, Ingredient)){
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
        if (await removeRecipe(id, Recipe) && await removeIngredients(id, Ingredient)) {
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

const updateRecipe = asyncHandler( async (req, res) => {
    const { id } = req.params; 
    const { recipeName, description, instructions, imageURL, ingredients } = req.body;

    if(await getByID(id, Recipe)){
        if(await updateRecipeByID(id, recipeName, description, instructions, imageURL, Recipe)){
            if(await removeIngredients(id, Ingredient)){
                if(await addIngredients(ingredients, id, Ingredient)){
                    res.status(200).json({ message: "Recipe has been successfully updated."})
                }
            }
            res.status(400)
            throw new Error("Unable to update ingredients.")
        }
        else{
            res.status(400)
            throw new Error("Unable to update recipe.")
        }
    }
    else{
        res.status(400)
        throw new Error("Recipe id does not exist.")
    }

})

const viewShoppingList = asyncHandler( async (req, res) => {
	const shoppingList = await getShoppingList(req.user.id, Recipe, Ingredient);

	res.send(shoppingList);
})

const viewShoppingListRecipes = asyncHandler( async (req, res) => {
	const recipeList = await getShoppingListRecipes(req.user.id, Recipe);

	res.send(recipeList)
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

module.exports = {
    viewAllRecipe,
    searchByName,
    selectRecipe,
    viewShoppingList,
    viewShoppingListRecipes,
    setNumPortions,
    emptyShoppingList,
    addRecipe,
    deleteRecipe,
    updateRecipe,
}
