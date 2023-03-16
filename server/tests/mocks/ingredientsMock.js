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
        if (arg.where && this.recipeID == arg.where.recipeID) {
            return [{
                ingredientName:this.ingredientName, 
                ingredientAmount:this.ingredientAmount, 
                ingredientUnit:this.ingredientUnit, 
            }]}
	else if(arg.include && arg.include[0].where.userID == 3){
		var out = [];
		for (var i=0; i<this.ingredients.length; i++){
			out.push({
				"ingredientName": this.ingredients[i].ingredientName,
				"ingredientUnit": this.ingredients[i].ingredientUnit,
				"totalAmount": this.ingredients[i].portion * this.ingredients[i].ingredientAmount
			})
		}
		return out/*
		return [
		,
			{
				"ingredientName": this.ingredients[1].ingredientName,
				"ingredientUnit": this.ingredients[1].ingredientUnit,
				"totalAmount": this.ingredients[1].portion * this.ingredients[1].ingredientAmount
			},
			{
				"ingredientName": this.ingredients[2].ingredientName,
				"ingredientUnit": this.ingredients[2].ingredientUnit,
				"totalAmount": this.ingredients[2].portion * this.ingredients[2].ingredientAmount
			}
		]*/
	}
        else if(arg.include){
            return []
	}
        return null
    }

    bulkCreate(ingredients){
	this.ingredients = ingredients;
        return [];
    }
    belongsTo(){ }
}

module.exports = { IngredientMock }
