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
		type: Sequelize.TEXT('long')
	},
	selected: {
		type: Sequelize.BOOLEAN
	},
	user_id: {
		type: Sequelize.INTEGER
	},
	imageUrl: {
		type: Sequelize.STRING
	},
}, {});

Recipe.sync()

module.exports = { Recipe };