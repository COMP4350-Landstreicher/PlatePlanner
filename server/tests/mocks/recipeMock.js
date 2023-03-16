class RecipeMock{
	constructor(){
        this.recipe = null
	}

	sync(){}

    findAll(arg){
        if (this.recipe.userID == arg.where.userID) {
            return [this.recipe]
        }
        return [];
    }

	findOne(arg){
		if(this.recipe.recipeName == arg.where.recipeName){
			return this.recipe
		}
        else if(this.recipe.id == arg.where.id){
            return this.recipe
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
		return recipe
	}
	hasMany(){}
}

module.exports = { RecipeMock }
