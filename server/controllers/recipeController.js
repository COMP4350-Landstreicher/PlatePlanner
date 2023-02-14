// initialize an instance of the DBService
const DBService = require('../db/dbService');
const asyncHandler = require("express-async-handler");

const viewAllRecipe = asyncHandler( async (req, res) => {
    const db = DBService.getDBServiceInstance();
    const result = db.getAllRecipe();
    
    result
    .then(data => res.json({data : data}))
    .catch(err => console.log(err));
})

const searchByName = asyncHandler( async (req, res) => {
    const { name } = req.params;
    const db = DBService.getDBServiceInstance();
    const result = db.searchByName(name);
    
    result
    .then(data => res.json({data : data}))
    .catch(err => console.log(err));
})

const getByID = asyncHandler( async (req, res) => {
    const { id } = req.params;
    const db = DBService.getDBServiceInstance();
    const result = db.getByID(id);
    
    result
    .then(data => res.json({data : data}))
    .catch(err => console.log(err));
})

module.exports = {
    viewAllRecipe,
    searchByName,
    getByID,
}
