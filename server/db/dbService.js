const mysql = require('mysql');
const dotenv = require('dotenv');
let instance = null;
dotenv.config();

// get credentials from .env
const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DB_PORT
});

connection.connect((err) => {
    if (err) {
        console.log(err.message);
    }
    // console.log('db ' + connection.state);
});


class DBService {
    // If not already exist, create a new instance of DBService
    static getDBServiceInstance() {
        return instance ? instance : new DBService();
    }

    async getAllRecipe() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM recipe_dev;";

                connection.query(query, (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                })
            });
            //console.log(response);
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async searchByName(name) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM recipe_dev WHERE name LIKE ?;";
                // add the character % to match any substring.
                connection.query(query, [name + '%'], (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                })
            });

            return response;
        } catch (error) {
            console.log(error);
        }
    }

    // WIP functions ahead

    async insertNewRecipe(name, description, instructions) {
        try {
            const last_updated = new Date();
            const insertId = await new Promise((resolve, reject) => {
                const query = "INSERT INTO recipe_dev (name, description, instructions, last_updated) VALUES (?,?,?,?);";
                
                // prevent SQL injection bt passing in values separatedly via [name, last_updated]
                connection.query(query, [name, description, instructions, last_updated] , (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result.insertId);
                })
            });
            return {
                id : insertId,
                name : name,
                description: description,
                instructions: instructions,
                last_updated : last_updated,
            };
        } catch (error) {
            console.log(error);
        }
    }

    async deleteRowById(id) {
        try {
            id = parseInt(id, 10); 
            const response = await new Promise((resolve, reject) => {
                const query = "DELETE FROM recipe_dev WHERE id = ?";
    
                connection.query(query, [id] , (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result.affectedRows);
                })
            });
    
            return response === 1 ? true : false;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async updateNameById(id, name) {
        try {
            // Parse using base 10
            id = parseInt(id, 10); 
            // if there is any error when querying, a 'reject will be returned'
            // and the catch block will be executed
            const response = await new Promise((resolve, reject) => {
                const query = "UPDATE recipe_dev SET name = ? WHERE id = ?";
    
                connection.query(query, [name, id] , (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result.affectedRows);
                })
            });
    
            return response === 1 ? true : false;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async getByID(id) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM recipe_dev WHERE id = ?;";

                connection.query(query, [id], (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                })
            });

            const ingredients = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM ingredient_dev WHERE recipe_id = ?;";

                connection.query(query, [id], (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                })
            });
            const ingredients_per_recipe = []
            ingredients.forEach(function({ingredient_name, ingredient_amount, ingredient_unit}) {
                ingredients_per_recipe.push({ingredient_name: ingredient_name, ingredient_amount: ingredient_amount, ingredient_unit: ingredient_unit});
            })
            //console.log(ingredients_per_recipe);
            response[0].ingredients = JSON.stringify(ingredients_per_recipe);
            //console.log(response);
            return response;
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = DBService;