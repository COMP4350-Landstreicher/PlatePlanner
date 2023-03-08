const { Sequelize, DataTypes } = require('sequelize');


const sequelize = new Sequelize(process.env.DB_URI);

const Recipe = sequelize.define("Recipe", {
	recipeName: {
		type: Sequelize.STRING
	},
	description: {
		type: Sequelize.STRING
	},
	instructions: {
		type: Sequelize.TEXT('long')
	},
	userID: {
		type: Sequelize.INTEGER
	},
	imageURL: {
		type: Sequelize.STRING
	},
	portion: {
		type: Sequelize.INTEGER
	}
}, {});

Recipe.sync()

module.exports = { Recipe };
