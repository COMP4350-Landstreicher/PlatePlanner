class IngredientMock{
	constructor(){
		this.ingredient_name = "Tomato";
        this.ingredient_amount = 2;
        this.ingredient_unit = "whole";
        this.recipe_id = 1;
	}

	sync(){

	}

    findAll(arg){
        if (this.recipe_id == arg.where.recipe_id) {
            return [{
                ingredient_name:this.ingredient_name, 
                ingredient_amount:this.ingredient_amount, 
                ingredient_unit:this.ingredient_unit, 
            }]}
        return null
    }
}

module.exports = { IngredientMock }