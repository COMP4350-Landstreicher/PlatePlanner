const {getAllRecipe, getByName, getByID, createNewRecipe, removeRecipe, updateRecipeByID, getShoppingList, getShoppingListRecipes, setPortion, resetPortions} = require("../utils/recipeUtils")
const {addIngredients} = require("../utils/ingredientUtils")
const {RecipeMock} = require("./mocks/recipeMock")
const {IngredientMock} = require("./mocks/ingredientsMock")
const expect  = require('chai').expect;

describe("Backend recipe tests", () => {

it("Create a new recipe", async () => {
	const Recipe = new RecipeMock();
	const recipe = await createNewRecipe("roasted_eggplant", "tasty_dish", "mix all the good food", "abc", 10, Recipe)

	expect(recipe).to.be.an("object");
	expect(recipe.id).to.equal(1);
	expect(recipe.recipeName).to.equal("roasted_eggplant");
	expect(recipe.description).to.equal("tasty_dish");
	expect(recipe.instructions).to.equal("mix all the good food");
	expect(recipe.imageURL).to.equal("abc");
	expect(recipe.lastUpdated).to.equal("16/02/2023");
	expect(recipe.userID).to.equal(10);
});

it("Create a duplicated recipe", async () => {
	const Recipe = new RecipeMock();
	await createNewRecipe("roasted_eggplant", "tasty_dish", "mix all the good food", "abc", 10, Recipe)
	const recipe = await createNewRecipe("roasted_eggplant", "tasty_dish", "mix all the good food", "abc", 10, Recipe)
	
	expect(recipe).to.equal(null);
});

it("Get all recipes belong to a valid user", async () => {
	const Recipe = new RecipeMock();
	const mockUserID = 10;
	await createNewRecipe("roasted_eggplant", "tasty_dish", "mix all the good food", "abc", 10, Recipe)
	const recipes = await getAllRecipe(mockUserID, Recipe);

	expect(recipes).to.be.an("array");
	expect(recipes[0]).to.be.an("object");
	expect(recipes[0].recipeName).to.equal("roasted_eggplant");
	expect(recipes[0].description).to.equal("tasty_dish");
	expect(recipes[0].instructions).to.equal("mix all the good food");
	expect(recipes[0].userID).to.equal(10);
	expect(recipes[0].imageURL).to.equal("abc");
	expect(recipes[0].lastUpdated).to.equal("16/02/2023");
	expect(recipes[0].id).to.equal(1);
});

it("Get all recipes belong to an invalid user", async () => {
	const Recipe = new RecipeMock();
	await createNewRecipe("roasted_eggplant", "tasty_dish", "mix all the good food", "abc", 10, Recipe)
	const recipes = await getAllRecipe(2, Recipe);

	expect(recipes.length).to.equal(0);
});

it("Get a recipe by Name", async () => {
	const Recipe = new RecipeMock();
	await createNewRecipe("roasted_eggplant", "tasty_dish", "mix all the good food", "abc", 10, Recipe)
	const recipe = await getByName("roasted_eggplant", 10, Recipe);

	expect(recipe).to.be.an("object");
	expect(recipe.recipeName).to.equal("roasted_eggplant");
	expect(recipe.description).to.equal("tasty_dish");
	expect(recipe.instructions).to.equal("mix all the good food");
	expect(recipe.userID).to.equal(10);
	expect(recipe.imageURL).to.equal("abc");
	expect(recipe.lastUpdated).to.equal("16/02/2023");
	expect(recipe.id).to.equal(1);
});

it("Get a recipe by Name that does not exist", async () => {
	const Recipe = new RecipeMock();
	await createNewRecipe("roasted_eggplant", "tasty_dish", "mix all the good food", "abc", 10, Recipe)
	const recipe = await getByName("roasted_tomato", 10, Recipe);

	expect(recipe).to.equal(null);
});

it("Get a recipe with a valid recipeID", async () => {
	const Recipe = new RecipeMock();
	await createNewRecipe("roasted_eggplant", "tasty_dish", "mix all the good food", "abc", 10, Recipe)
	const recipe = await getByID(1, Recipe);

	expect(recipe).to.be.an("object");
	expect(recipe.id).to.equal(1);
	expect(recipe.recipeName).to.equal("roasted_eggplant");
	expect(recipe.description).to.equal("tasty_dish");
	expect(recipe.instructions).to.equal("mix all the good food");
	expect(recipe.imageURL).to.equal("abc");
	expect(recipe.lastUpdated).to.equal("16/02/2023");
});

it("Get a recipe with an invalid recipeID", async () => {
	const Recipe = new RecipeMock();
	await createNewRecipe("roasted_eggplant", "tasty_dish", "mix all the good food", "abc", 10, Recipe)
	const recipe = await getByID(2, Recipe);

	expect(recipe).to.equal(null);
});

it("Remove a recipe with a valid recipeID", async () => {
	const Recipe = new RecipeMock();
	await createNewRecipe("roasted_eggplant", "tasty_dish", "mix all the good food", "abc", 10, Recipe)
	const recipe = await getByID(1, Recipe);

	expect(recipe).to.be.an("object");
	expect(recipe.id).to.equal(1);
	expect(recipe.recipeName).to.equal("roasted_eggplant");
	expect(recipe.description).to.equal("tasty_dish");
	expect(recipe.instructions).to.equal("mix all the good food");
	expect(recipe.imageURL).to.equal("abc");
	expect(recipe.lastUpdated).to.equal("16/02/2023");

	const result = await removeRecipe(1, Recipe)
	expect(result).to.equal(true);

	const removed_recipe = await getByID(1, Recipe);
	expect(removed_recipe).to.equal(null);
});

it("Remove a recipe that does not exist", async () => {
	const Recipe = new RecipeMock();
	const result = await removeRecipe(1, Recipe)
	expect(result).to.equal(false);
});

it("Update a recipe", async () => {
	const Recipe = new RecipeMock();
	const recipe = await createNewRecipe("roasted_eggplant", "tasty_dish", "mix all the good food", "abc", 10, Recipe)

	expect(recipe).to.be.an("object");
	expect(recipe.id).to.equal(1);
	expect(recipe.recipeName).to.equal("roasted_eggplant");
	expect(recipe.description).to.equal("tasty_dish");
	expect(recipe.instructions).to.equal("mix all the good food");
	expect(recipe.imageURL).to.equal("abc");
	expect(recipe.lastUpdated).to.equal("16/02/2023");
	expect(recipe.userID).to.equal(10);

	const updated_recipe = await updateRecipeByID(1, "vietnamese_pho", "more_tasty_dish", "mix all the good food", "def", Recipe)

	expect(updated_recipe).to.be.an("object");
	expect(updated_recipe.id).to.equal(1);
	expect(updated_recipe.recipeName).to.equal("vietnamese_pho");
	expect(updated_recipe.description).to.equal("more_tasty_dish");
	expect(updated_recipe.instructions).to.equal("mix all the good food");
	expect(updated_recipe.imageURL).to.equal("def");
	expect(updated_recipe.lastUpdated).to.equal("17/02/2023");
	expect(updated_recipe.userID).to.equal(10);
});

it("Update a non-existing recipe", async () => {
	const Recipe = new RecipeMock();
	await createNewRecipe("roasted_eggplant", "tasty_dish", "mix all the good food", "abc", 10, Recipe)
	const updated_recipe = await updateRecipeByID(2, "vietnamese_pho", "more_tasty_dish", "mix all the good food", "def", Recipe)
	
	expect(updated_recipe).to.equal(null);
});


})

describe("Backend shopping list unit tests", () => {
it("Get a shopping list with no recipes in it", async () => {
	const Recipe = new RecipeMock();
	const Ingredient = new IngredientMock();
	const recipes = await getShoppingList(2, Recipe, Ingredient);

	expect(recipes).to.eql([]);
});

it("Get a shopping list with recipes in it", async () => {
	const Recipe = new RecipeMock();
	const Ingredient = new IngredientMock();

	addIngredients([{ingredientName:"Tomato", ingredientAmount:2, ingredientUnit:"whole", userID:3, portion:2}, {ingredientName:"Basil", ingredientAmount:30, ingredientUnit:"g", userID:3, portion:2}, {ingredientName:"Mozarella", ingredientAmount:30, ingredientUnit:"g", userID:3, portion:2}], 1, Ingredient);

	const recipes = await getShoppingList(3, Recipe, Ingredient);
	expect(recipes).to.eql([
	    {
	        "ingredientName": "Tomato",
	        "ingredientUnit": "whole",
	        "totalAmount": 4
	    },
	    {
	        "ingredientName": "Basil",
	        "ingredientUnit": "g",
	        "totalAmount": 60
	    },
	    {
	        "ingredientName": "Mozarella",
	        "ingredientUnit": "g",
	        "totalAmount": 60
	    }
	]);
});

it("Get selected recipes with no recipes selected", async () => {
	const Recipe = new RecipeMock();
	const Ingredient = new IngredientMock();

	await createNewRecipe("roasted_eggplant", "tasty_dish", "mix all the good food", "abc", 10, Recipe)
	const recipes = await getShoppingListRecipes(2, Recipe);

	expect(recipes).to.eql([]);
});

it("Get selected recipes with 1 recipe selected", async () => {
	const Recipe = new RecipeMock();
	const Ingredient = new IngredientMock();

	await createNewRecipe("roasted_eggplant", "tasty_dish", "mix all the good food", "abc", 10, Recipe)
	await setPortion(1, 1, 10, Recipe);
	const recipes = await getShoppingListRecipes(10, Recipe);
	recipes[0].save = null;
	expect(recipes).to.eql([
	  {
	    "description": "tasty_dish",
	    "id": 1,
	    "imageURL": "abc",
	    "instructions": "mix all the good food",
	    "lastUpdated": "16/02/2023",
	    "portion": 1,
	    "recipeName": "roasted_eggplant",
	    "save": null,
	    "userID": 10,
	  }
	]);
});

it("Update portion size to 1", async () => {
	const Recipe = new RecipeMock();
	const Ingredient = new IngredientMock();

	recipe = await createNewRecipe("roasted_eggplant", "tasty_dish", "mix all the good food", "abc", 10, Recipe)
	await setPortion(1, 2, 10, Recipe);
	
	

	expect(recipe.portion).to.equal(2);
});


it("Update portion size to 1 and then resest it to 0", async () => {
	const Recipe = new RecipeMock();
	const Ingredient = new IngredientMock();

	recipe = await createNewRecipe("roasted_eggplant", "tasty_dish", "mix all the good food", "abc", 10, Recipe)
	await setPortion(1, 2, 10, Recipe);
	
	expect(recipe.portion).to.equal(2);

	await resetPortions(10, Recipe);

	expect(recipe.portion).to.equal(0);
});

})
