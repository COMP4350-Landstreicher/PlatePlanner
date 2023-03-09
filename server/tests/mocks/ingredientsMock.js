class IngredientMock{
	constructor(){
		this.ingredientName = "Tomato";
        this.ingredientAmount = 2;
        this.ingredientUnit = "whole";
        this.recipeID = 1;
	}

	sync(){

	}

    findAll(arg){
        if (this.recipeID == arg.where.recipeID) {
            return [{
                ingredientName:this.ingredientName, 
                ingredientAmount:this.ingredientAmount, 
                ingredientUnit:this.ingredientUnit, 
            }]}
        return null
    }

    bulkCreate(){
        return [];
    }
}

module.exports = { IngredientMock }