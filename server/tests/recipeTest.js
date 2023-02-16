const {getAllRecipe, getByName, getByID} = require("../utils/recipeUtils")
const {RecipeMock} = require("./mocks/recipeMock")
const expect  = require('chai').expect;

describe("Backend recipe tests", () => {
it("Testing get all recipes", async () => {
	const Recipe = new RecipeMock();
	const recipes = await getAllRecipe(Recipe);

	expect(recipes).to.be.an("array");
	expect(recipes[0]).to.be.an("object");
});

it("Testing get a recipe by name", async () => {
	const Recipe = new RecipeMock();
	const recipe = await getByName("roasted_eggplant", Recipe);

	expect(recipe).to.be.an("object");
	expect(recipe.recipe_name).to.equal("roasted_eggplant");
	expect(recipe.description).to.equal("tasty_dish");
	expect(recipe.instructions).to.equal("mix all the good food");
	expect(recipe.selected).to.equal(true);
	expect(recipe.userId).to.equal(10);
	expect(recipe.id).to.equal(1);
	expect(recipe.lastUpdated).to.equal("16/02/2023");
});

it("Testing get a recipe with an invaid name", async () => {
	const Recipe = new RecipeMock();
	const recipe = await getByName("roasted_tomato", Recipe);

	expect(recipe).to.equal(null);
});

it("Testing get a recipe by id", async () => {
	const Recipe = new RecipeMock();
	const recipe = await getByID(1, Recipe);

	expect(recipe).to.be.an("object");
	expect(recipe.id).to.equal(1);
	expect(recipe.recipe_name).to.equal("roasted_eggplant");
	expect(recipe.description).to.equal("tasty_dish");
	expect(recipe.instructions).to.equal("mix all the good food");
	expect(recipe.selected).to.equal(true);
	expect(recipe.userId).to.equal(10);
	expect(recipe.lastUpdated).to.equal("16/02/2023");
});

it("Testing get a recipe using an invalid id", async () => {
	const Recipe = new RecipeMock();
	const recipe = await getByID(2, Recipe);

	expect(recipe).to.equal(null);
});
})