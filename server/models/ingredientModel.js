const { Sequelize, DataTypes } = require('sequelize');


const sequelize = new Sequelize(process.env.DB_URI);

const Ingredient = sequelize.define("Ingredient", {
	recipeID: {
		type: Sequelize.INTEGER
	},
	ingredientName: {
		type: Sequelize.STRING
	},
	ingredientAmount: {
		type: Sequelize.DOUBLE
	},
	ingredientUnit: {
		type: Sequelize.STRING
	}
}, {});

Ingredient.sync()

module.exports = {Ingredient};