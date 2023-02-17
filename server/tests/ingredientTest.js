const {getRecipeIngredients} = require("../utils/ingredientUtils")
const {IngredientMock} = require("./mocks/ingredientsMock")
const expect  = require('chai').expect;

describe("Backend ingredients tests", () => {
it("Testing get all ingredients belong to a valid id", async () => {
	const Ingredient = new IngredientMock();
	const ingredients = await getRecipeIngredients(1, Ingredient);

	expect(ingredients).to.be.an("array");
    expect(ingredients[0]).to.be.an("object");
    expect(ingredients[0].ingredient_name).to.equal("Tomato");
    expect(ingredients[0].ingredient_amount).to.equal(2);
    expect(ingredients[0].ingredient_unit).to.equal("whole");
});

it("Testing get all ingredients belong to an invalid id", async () => {
	const Ingredient = new IngredientMock();
	const ingredients = await getRecipeIngredients(2, Ingredient);

	expect(ingredients).to.equal(null);
});

})