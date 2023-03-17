const {getIngredients, addIngredients, removeIngredients} = require("../utils/ingredientUtils")
const {IngredientMock} = require("./mocks/ingredientsMock")
const expect  = require('chai').expect;

describe("Backend ingredients tests", () => {

	it("Create new ingredients", async () => {
		const Ingredient = new IngredientMock();
		const ingredients = await addIngredients([
			{
				ingredientName: "Beef",
				ingredientAmount: 500,
				ingredientUnit: "g"
			},
			{
				ingredientName: "Wine",
				ingredientAmount: 500,
				ingredientUnit: "ml"
			}
		], 1, Ingredient)

		expect(ingredients).to.be.an("array");
		expect(ingredients[0]).to.be.an("object");
		expect(ingredients[0].ingredientName).to.equal("Beef");
		expect(ingredients[0].ingredientAmount).to.equal(500);
		expect(ingredients[0].ingredientUnit).to.equal("g");
		expect(ingredients[0].recipeID).to.equal('1');
		expect(ingredients[1]).to.be.an("object");
		expect(ingredients[1].ingredientName).to.equal("Wine");
		expect(ingredients[1].ingredientAmount).to.equal(500);
		expect(ingredients[1].ingredientUnit).to.equal("ml");
		expect(ingredients[1].recipeID).to.equal('1');
	});

	it("Get all ingredients belong to a valid recipe id", async () => {
		const Ingredient = new IngredientMock();
		await addIngredients([
			{
				ingredientName: "Beef",
				ingredientAmount: 500,
				ingredientUnit: "g"
			},
			{
				ingredientName: "Wine",
				ingredientAmount: 500,
				ingredientUnit: "ml"
			}
		], 1, Ingredient)

		const ingredients = await getIngredients(1, Ingredient)

		expect(ingredients).to.be.an("array");
		expect(ingredients[0]).to.be.an("object");
		expect(ingredients[0].ingredientName).to.equal("Beef");
		expect(ingredients[0].ingredientAmount).to.equal(500);
		expect(ingredients[0].ingredientUnit).to.equal("g");
		expect(ingredients[0].recipeID).to.equal('1');
		expect(ingredients[1]).to.be.an("object");
		expect(ingredients[1].ingredientName).to.equal("Wine");
		expect(ingredients[1].ingredientAmount).to.equal(500);
		expect(ingredients[1].ingredientUnit).to.equal("ml");
		expect(ingredients[1].recipeID).to.equal('1');
	});

	it("Get all ingredients belong to an invalid recipe id", async () => {
		const Ingredient = new IngredientMock();
		const ingredients = await getIngredients(2, Ingredient);

		expect(ingredients.length).to.equal(0);
	});

	it("Delete all ingredients belong to a valid recipe id", async () => {
		const Ingredient = new IngredientMock();
		await addIngredients([
			{
				ingredientName: "Beef",
				ingredientAmount: 500,
				ingredientUnit: "g"
			},
			{
				ingredientName: "Wine",
				ingredientAmount: 500,
				ingredientUnit: "ml"
			}
		], 1, Ingredient)

		const result = await removeIngredients(1, Ingredient)
		expect(result).to.equal(true);
	});

	it("Delete all ingredients belong to an invalid recipe id", async () => {
		const Ingredient = new IngredientMock();
		const result = await removeIngredients(2, Ingredient)

		expect(result).to.equal(false);
	});
	
})
