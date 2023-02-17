const { Sequelize, DataTypes } = require('sequelize');


const sequelize = new Sequelize(process.env.DB_URI);

const Ingredient = sequelize.define("Ingredient", {
	recipe_id: {
		type: Sequelize.INTEGER
	},
	ingredient_name: {
		type: Sequelize.STRING
	},
	ingredient_amount: {
		type: Sequelize.INTEGER
	},
	ingredient_unit: {
		type: Sequelize.STRING
	}
}, {});

Ingredient.sync()

module.exports = {Ingredient};