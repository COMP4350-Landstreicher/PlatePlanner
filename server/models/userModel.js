const { Sequelize, DataTypes } = require('sequelize');


const sequelize = new Sequelize(process.env.DB_URI);

const User = sequelize.define("User", {
	email: {
		type: Sequelize.STRING
	},
	userName: {
		type: Sequelize.STRING
	},
	password: {
		type: Sequelize.STRING
	},
	firstName: {
		type: Sequelize.STRING
	},
	lastName: {
		type: Sequelize.STRING
	}
}, {});

User.sync()

module.exports = {User};
