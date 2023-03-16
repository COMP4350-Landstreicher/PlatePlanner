const {getAllRecipe, getByName, getByID, createNewRecipe, removeRecipe, updateRecipeByID} = require("../utils/recipeUtils")
const {RecipeMock} = require("./mocks/recipeMock")
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