class IngredientMock{
	constructor(){
		this.ingredientName = "Tomato";
	        this.ingredientAmount = 2;
        	this.ingredientUnit = "whole";
	        this.recipeID = 1;
		this.ingredients = [{}, {}, {}]
		this.ingredients[0].ingredientName = "Tomato";
		this.ingredients[0].ingredientAmount = 2;
		this.ingredients[0].ingredientUnit = "whole";
		this.ingredients[0].recipeID = 1;
		this.ingredients[0].userID = 3;
		this.ingredients[0].portion = 2;
		this.ingredients[1].ingredientName = "Basil";
		this.ingredients[1].ingredientAmount = 30;
		this.ingredients[1].ingredientUnit = "g";
		this.ingredients[1].recipeID = 1;
		this.ingredients[1].userID = 3;
		this.ingredients[1].portion = 2;
		this.ingredients[2].ingredientName = "Mozarella";
		this.ingredients[2].ingredientAmount = 30;
		this.ingredients[2].ingredientUnit = "g";
		this.ingredients[2].recipeID = 1;
		this.ingredients[2].userID = 3;
		this.ingredients[2].portion = 2;


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
		return [
			{
				"ingredientName": this.ingredients[0].ingredientName,
				"ingredientUnit": this.ingredients[0].ingredientUnit,
				"totalAmount": this.ingredients[0].portion * this.ingredients[0].ingredientAmount
			},
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
		]
	}
        else if(arg.include){
            return []
	}
        return null
    }

    bulkCreate(){
        return [];
    }
    belongsTo(){ }
}

module.exports = { IngredientMock }
