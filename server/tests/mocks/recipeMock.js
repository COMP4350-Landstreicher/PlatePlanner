class RecipeMock{
	constructor(){
		this.recipe_name = "roasted_eggplant";
        this.description = "tasty_dish";
        this.instructions = "mix all the good food";
        this.selected = true;
        this.userId = 10;
        this.id = 1;
        this.lastUpdated = "16/02/2023";
	}

	sync(){

	}

    findAll(){
        return [{
            recipe_name:this.recipe_name, 
            description:this.description, 
            instructions:this.instructions, 
            selected: this.selected, 
            userId:this.userId, 
            id:this.id, 
            lastUpdated:this.lastUpdated
        }]
    }

	findOne(arg){
		if(this.recipe_name == arg.where.recipe_name){
			return {
                recipe_name:this.recipe_name, 
                description:this.description, 
                instructions:this.instructions, 
                selected: this.selected, 
                userId:this.userId, 
                id:this.id, 
                lastUpdated:this.lastUpdated
            }
		}
        else if(this.id == arg.where.id){
            return {
                recipe_name:this.recipe_name, 
                description:this.description, 
                instructions:this.instructions, 
                selected: this.selected, 
                userId:this.userId, 
                id:this.id, 
                lastUpdated:this.lastUpdated
            }
        }
		return null
	}
}

module.exports = { RecipeMock }