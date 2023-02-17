const {getAllRecipe, getByName, getByID} = require("../utils/recipeUtils")
const {RecipeMock} = require("./mocks/recipeMock")
const expect  = require('chai').expect;

describe("Backend recipe tests", () => {
it("Get all recipes belong to a valid user", async () => {
	const Recipe = new RecipeMock();
	const mockUserID = 10;
	const recipes = await getAllRecipe(10, Recipe);

	expect(recipes).to.be.an("array");
	expect(recipes[0]).to.be.an("object");
	expect(recipes[0].recipe_name).to.equal("roasted_eggplant");
	expect(recipes[0].description).to.equal("tasty_dish");
	expect(recipes[0].instructions).to.equal("mix all the good food");
	expect(recipes[0].selected).to.equal(true);
	expect(recipes[0].user_id).to.equal(10);
	expect(recipes[0].id).to.equal(1);
	expect(recipes[0].lastUpdated).to.equal("16/02/2023");
	expect(recipes[0].imageUrl).to.equal("abc");
});

it("Get all recipes belong to an invalid user", async () => {
	const Recipe = new RecipeMock();
	const mockUserID = 2;
	const recipes = await getAllRecipe(mockUserID, Recipe);

	expect(recipes.length).to.equal(0);
});

it("Get a recipe by Name", async () => {
	const Recipe = new RecipeMock();
	const recipe = await getByName("roasted_eggplant", 10, Recipe);

	expect(recipe).to.be.an("object");
	expect(recipe.recipe_name).to.equal("roasted_eggplant");
	expect(recipe.description).to.equal("tasty_dish");
	expect(recipe.instructions).to.equal("mix all the good food");
	expect(recipe.selected).to.equal(true);
	expect(recipe.user_id).to.equal(10);
	expect(recipe.id).to.equal(1);
	expect(recipe.lastUpdated).to.equal("16/02/2023");
	expect(recipe.imageUrl).to.equal("abc");
});

it("Get a recipe by Name that does not exist", async () => {
	const Recipe = new RecipeMock();
	const recipe = await getByName("roasted_tomato", 10, Recipe);

	expect(recipe).to.equal(null);
});

it("Get a recipe with a valid recipeID", async () => {
	const Recipe = new RecipeMock();
	const recipe = await getByID(1, Recipe);

	expect(recipe).to.be.an("object");
	expect(recipe.id).to.equal(1);
	expect(recipe.recipe_name).to.equal("roasted_eggplant");
	expect(recipe.description).to.equal("tasty_dish");
	expect(recipe.instructions).to.equal("mix all the good food");
	expect(recipe.selected).to.equal(true);
	expect(recipe.lastUpdated).to.equal("16/02/2023");
	expect(recipe.imageUrl).to.equal("abc");
});

it("Get a recipe with an invalid recipeID", async () => {
	const Recipe = new RecipeMock();
	const recipe = await getByID(2, Recipe);

	expect(recipe).to.equal(null);
});
})