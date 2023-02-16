const { Sequelize, DataTypes } = require('sequelize');


const sequelize = new Sequelize(process.env.DB_URI);

const Recipe = sequelize.define("Recipe", {
	recipe_name: {
		type: Sequelize.STRING
	},
	description: {
		type: Sequelize.STRING
	},
	instructions: {
		type: Sequelize.STRING
	},
	selected: {
		type: Sequelize.BOOLEAN
	},
	userId: {
		type: Sequelize.INTEGER
	}
}, {});

Recipe.sync()

module.exports = {Recipe};