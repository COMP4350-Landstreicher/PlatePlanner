/* eslint-disable require-jsdoc */
class IngredientMock {
  constructor() {
    this.ingredients = [];
  }

  sync() {

  }

  findAll(arg) {
    if (arg.where && this.ingredients.length != 0) {
      return this.ingredients.filter(function(ingredient) {
        if (ingredient.recipeID == arg.where.recipeID) {
          return ingredient;
        }
      });
    } else if (arg.include && arg.include[0].where.userID == 3) {
      const out = [];
      for (let i=0; i<this.ingredients.length; i++) {
        const ingredient = this.ingredients[i];
        out.push({
          'ingredientName': ingredient.ingredientName,
          'ingredientUnit': ingredient.ingredientUnit,
          'totalAmount': ingredient.portion * ingredient.ingredientAmount,
        });
      }
      return out;
    } else if (arg.include) {
      return [];
    }
    return [];
  }

  bulkCreate(ingredients) {
    this.ingredients = ingredients;
    return this.ingredients;
  }

  belongsTo() { }

  destroy(arg) {
    return new Promise((resolved, rejected) => {
      if (
        this.ingredients != null &&
        this.ingredients[0].recipeID == arg.where.recipeID
      ) {
        this.ingredients = [];
        resolved();
      }
      rejected(new Error('Unable to delete ingredient!'));
    });
  }
}

module.exports = {IngredientMock};
