const { STRING } = require("sequelize");

class RecipeMock{
	constructor(){
        this.recipe = null
	}

	sync(){}

    findAll(arg){
        if (this.recipe != null && this.recipe.userID == arg.where.userID) {
            return [this.recipe]
        }
        return [];
    }

	findOne(arg){
        if (this.recipe != null){
            if(this.recipe.recipeName == arg.where.recipeName){
                return this.recipe
            }
            else if(this.recipe.id == arg.where.id){
                return this.recipe
            }
        }
		return null
	}

    bulkCreate(){
        return [];
    }

    create(recipe){
        if (this.recipe != null) {
            if (this.recipe.recipeName == recipe.recipeName){
                return null
            }
        }
        recipe["id"] = 1
        recipe["lastUpdated"] = "16/02/2023"
        this.recipe = recipe
	    	this.recipe.save = () => {}
		return this.recipe
	}

    destroy(arg) {
        return new Promise((resolved, rejected) => {
            if (this.recipe != null && this.recipe.id == arg.where.id){
                this.recipe = null
                resolved()
            }
            rejected()
        })
    }

    update(recipe, arg) {
        if (this.recipe != null && this.recipe.id == arg.where.id) {
            this.recipe.recipeName = recipe.recipeName
            this.recipe.description = recipe.description
            this.recipe.instructions = recipe.instructions
            this.recipe.imageURL = recipe.imageURL
            this.recipe["lastUpdated"] = "17/02/2023"
            return this.recipe
        }
        return null
    }
	hasMany(){}
}

module.exports = { RecipeMock }
