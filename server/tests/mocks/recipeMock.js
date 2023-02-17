class RecipeMock{
	constructor(){
		this.recipe_name = "roasted_eggplant";
        this.description = "tasty_dish";
        this.instructions = "mix all the good food";
        this.selected = true;
        this.user_id = 10;
        this.id = 1;
        this.lastUpdated = "16/02/2023";
        this.imageUrl = "abc";
	}

	sync(){

	}

    findAll(arg){
        if (this.user_id == arg.where.user_id) {
            return [{
                recipe_name:this.recipe_name, 
                description:this.description, 
                instructions:this.instructions, 
                selected: this.selected, 
                user_id:this.user_id, 
                id:this.id, 
                lastUpdated:this.lastUpdated,
                imageUrl: this.imageUrl
            }]
        }
        return [];
    }

	findOne(arg){
		if(this.recipe_name == arg.where.recipe_name){
			return {
                recipe_name:this.recipe_name, 
                description:this.description, 
                instructions:this.instructions, 
                selected: this.selected, 
                user_id:this.user_id, 
                id:this.id, 
                lastUpdated:this.lastUpdated,
                imageUrl: this.imageUrl
            }
		}
        else if(this.id == arg.where.id){
            return {
                recipe_name:this.recipe_name, 
                description:this.description, 
                instructions:this.instructions, 
                selected: this.selected, 
                user_id:this.user_id, 
                id:this.id, 
                lastUpdated:this.lastUpdated,
                imageUrl: this.imageUrl
            }
        }
		return null
	}

    bulkCreate(){
        return [];
    }
}

module.exports = { RecipeMock }