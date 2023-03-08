const {getRecipeIngredients} = require("../utils/ingredientUtils")
const {IngredientMock} = require("./mocks/ingredientsMock")
const expect  = require('chai').expect;

describe("Backend ingredients tests", () => {
it("Get all ingredients belong to a valid recipe id", async () => {
	const Ingredient = new IngredientMock();
	const ingredients = await getRecipeIngredients(1, Ingredient);

	expect(ingredients).to.be.an("array");
    expect(ingredients[0]).to.be.an("object");
    expect(ingredients[0].ingredientName).to.equal("Tomato");
    expect(ingredients[0].ingredientAmount).to.equal(2);
    expect(ingredients[0].ingredientUnit).to.equal("whole");
});

it("Get all ingredients belong to an invalid recipe id", async () => {
	const Ingredient = new IngredientMock();
	const ingredients = await getRecipeIngredients(2, Ingredient);

	expect(ingredients).to.equal(null);
});

})