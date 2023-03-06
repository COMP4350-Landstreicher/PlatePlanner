class RecipeMock{
	constructor(){
        this.recipe = null
	}

	sync(){}

    findAll(arg){
        if (this.recipe.user_id == arg.where.user_id) {
            return [this.recipe]
        }
        return [];
    }

	findOne(arg){
		if(this.recipe.recipe_name == arg.where.recipe_name){
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
            if (this.recipe.recipe_name == recipe.recipe_name){
                return null
            }
        }

        recipe["id"] = 1
        recipe["lastUpdated"] = "16/02/2023"
		this.recipe = recipe
		return recipe
	}
}

module.exports = { RecipeMock }