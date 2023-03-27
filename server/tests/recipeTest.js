require('dotenv').config();

const {
  getAllRecipe,
  getByName,
  getByID,
  createNewRecipe,
  removeRecipe,
  updateRecipeByID,
  getShoppingList,
  getShoppingListRecipes,
  setPortion,
  resetPortions,
  emptyRecipe,
} = require('../utils/recipeUtils');
const {addIngredients} = require('../utils/ingredientUtils');
const {RecipeMock} = require('./mocks/recipeMock');
const {IngredientMock} = require('./mocks/ingredientsMock');
const expect = require('chai').expect;

let request = require('supertest');
request = request(process.env.WEB_SERVER_URI);
const {email} = require('./authTest');
const jwt = require('jsonwebtoken');
const {Recipe} = require('../models/recipeModel');
const token = jwt.sign({email: email}, process.env.JWT_SECRET);

describe('Backend recipe unit tests', () => {
  it('Create a new recipe', async () => {
    const Recipe = new RecipeMock();
    const recipe = await createNewRecipe(
        'roasted_eggplant', 'tasty_dish', 'mix all the good food',
        'abc', 10, Recipe,
    );

    expect(recipe).to.be.an('object');
    expect(recipe.id).to.equal(1);
    expect(recipe.recipeName).to.equal('roasted_eggplant');
    expect(recipe.description).to.equal('tasty_dish');
    expect(recipe.instructions).to.equal('mix all the good food');
    expect(recipe.imageURL).to.equal('abc');
    expect(recipe.lastUpdated).to.equal('16/02/2023');
    expect(recipe.userID).to.equal(10);
  });

  it('Create a duplicated recipe', async () => {
    const Recipe = new RecipeMock();
    await createNewRecipe(
        'roasted_eggplant', 'tasty_dish', 'mix all the good food',
        'abc', 10, Recipe,
    );
    const recipe = await createNewRecipe(
        'roasted_eggplant', 'tasty_dish', 'mix all the good food',
        'abc', 10, Recipe,
    );

    expect(recipe).to.equal(null);
  });

  it('Get all recipes belong to a valid user', async () => {
    const Recipe = new RecipeMock();
    const mockUserID = 10;
    await createNewRecipe(
        'roasted_eggplant', 'tasty_dish', 'mix all the good food',
        'abc', 10, Recipe,
    );
    const recipes = await getAllRecipe(mockUserID, Recipe);

    expect(recipes).to.be.an('array');
    expect(recipes[0]).to.be.an('object');
    expect(recipes[0].recipeName).to.equal('roasted_eggplant');
    expect(recipes[0].description).to.equal('tasty_dish');
    expect(recipes[0].instructions).to.equal('mix all the good food');
    expect(recipes[0].userID).to.equal(10);
    expect(recipes[0].imageURL).to.equal('abc');
    expect(recipes[0].lastUpdated).to.equal('16/02/2023');
    expect(recipes[0].id).to.equal(1);
  });

  it('Get all recipes belong to an invalid user', async () => {
    const Recipe = new RecipeMock();
    await createNewRecipe(
        'roasted_eggplant', 'tasty_dish', 'mix all the good food',
        'abc', 10, Recipe,
    );
    const recipes = await getAllRecipe(2, Recipe);

    expect(recipes.length).to.equal(0);
  });

  it('Get a recipe by Name', async () => {
    const Recipe = new RecipeMock();
    await createNewRecipe(
        'roasted_eggplant', 'tasty_dish', 'mix all the good food',
        'abc', 10, Recipe,
    );
    const recipe = await getByName('roasted_eggplant', 10, Recipe);

    expect(recipe).to.be.an('object');
    expect(recipe.recipeName).to.equal('roasted_eggplant');
    expect(recipe.description).to.equal('tasty_dish');
    expect(recipe.instructions).to.equal('mix all the good food');
    expect(recipe.userID).to.equal(10);
    expect(recipe.imageURL).to.equal('abc');
    expect(recipe.lastUpdated).to.equal('16/02/2023');
    expect(recipe.id).to.equal(1);
  });

  it('Get a recipe by Name that does not exist', async () => {
    const Recipe = new RecipeMock();
    await createNewRecipe(
        'roasted_eggplant', 'tasty_dish', 'mix all the good food',
        'abc', 10, Recipe,
    );
    const recipe = await getByName('roasted_tomato', 10, Recipe);

    expect(recipe).to.equal(null);
  });

  it('Get a recipe with a valid recipeID', async () => {
    const Recipe = new RecipeMock();
    await createNewRecipe(
        'roasted_eggplant', 'tasty_dish', 'mix all the good food',
        'abc', 10, Recipe,
    );
    const recipe = await getByID(1, Recipe);

    expect(recipe).to.be.an('object');
    expect(recipe.id).to.equal(1);
    expect(recipe.recipeName).to.equal('roasted_eggplant');
    expect(recipe.description).to.equal('tasty_dish');
    expect(recipe.instructions).to.equal('mix all the good food');
    expect(recipe.imageURL).to.equal('abc');
    expect(recipe.lastUpdated).to.equal('16/02/2023');
  });

  it('Get a recipe with an invalid recipeID', async () => {
    const Recipe = new RecipeMock();
    await createNewRecipe(
        'roasted_eggplant', 'tasty_dish', 'mix all the good food',
        'abc', 10, Recipe,
    );
    const recipe = await getByID(2, Recipe);

    expect(recipe).to.equal(null);
  });

  it('Remove a recipe with a valid recipeID', async () => {
    const Recipe = new RecipeMock();
    await createNewRecipe(
        'roasted_eggplant', 'tasty_dish', 'mix all the good food',
        'abc', 10, Recipe,
    );
    const recipe = await getByID(1, Recipe);

    expect(recipe).to.be.an('object');
    expect(recipe.id).to.equal(1);
    expect(recipe.recipeName).to.equal('roasted_eggplant');
    expect(recipe.description).to.equal('tasty_dish');
    expect(recipe.instructions).to.equal('mix all the good food');
    expect(recipe.imageURL).to.equal('abc');
    expect(recipe.lastUpdated).to.equal('16/02/2023');

    const result = await removeRecipe(1, Recipe);
    expect(result).to.equal(true);

    const removedRecipe = await getByID(1, Recipe);
    expect(removedRecipe).to.equal(null);
  });

  it('Remove a recipe that does not exist', async () => {
    const Recipe = new RecipeMock();
    const result = await removeRecipe(1, Recipe);
    expect(result).to.equal(false);
  });

  it('Update a recipe', async () => {
    const Recipe = new RecipeMock();
    const recipe = await createNewRecipe(
        'roasted_eggplant', 'tasty_dish', 'mix all the good food',
        'abc', 10, Recipe,
    );

    expect(recipe).to.be.an('object');
    expect(recipe.id).to.equal(1);
    expect(recipe.recipeName).to.equal('roasted_eggplant');
    expect(recipe.description).to.equal('tasty_dish');
    expect(recipe.instructions).to.equal('mix all the good food');
    expect(recipe.imageURL).to.equal('abc');
    expect(recipe.lastUpdated).to.equal('16/02/2023');
    expect(recipe.userID).to.equal(10);

    const updatedRecipe = await updateRecipeByID(
        1, 'vietnamese_pho', 'more_tasty_dish', 'mix all the good food',
        'def', Recipe,
    );

    expect(updatedRecipe).to.be.an('object');
    expect(updatedRecipe.id).to.equal(1);
    expect(updatedRecipe.recipeName).to.equal('vietnamese_pho');
    expect(updatedRecipe.description).to.equal('more_tasty_dish');
    expect(updatedRecipe.instructions).to.equal('mix all the good food');
    expect(updatedRecipe.imageURL).to.equal('def');
    expect(updatedRecipe.lastUpdated).to.equal('17/02/2023');
    expect(updatedRecipe.userID).to.equal(10);
  });

  it('Update a non-existing recipe', async () => {
    const Recipe = new RecipeMock();
    await createNewRecipe(
        'roasted_eggplant', 'tasty_dish', 'mix all the good food',
        'abc', 10, Recipe,
    );
    const updatedRecipe = await updateRecipeByID(
        2, 'vietnamese_pho', 'more_tasty_dish', 'mix all the good food',
        'def', Recipe,
    );

    expect(updatedRecipe).to.equal(null);
  });
});

describe('Backend shopping list unit tests', () => {
  it('Should return a shopping list with no recipes in it', async () => {
    const Recipe = new RecipeMock();
    const Ingredient = new IngredientMock();
    const recipes = await getShoppingList(2, Recipe, Ingredient);

    expect(recipes).to.eql([]);
  });

  it('Should return a shopping list with recipes in it', async () => {
    const Recipe = new RecipeMock();
    const Ingredient = new IngredientMock();

    addIngredients([{
      ingredientName: 'Tomato',
      ingredientAmount: 2,
      ingredientUnit: 'whole',
      userID: 3, portion: 2,
    }, {
      ingredientName: 'Basil',
      ingredientAmount: 30,
      ingredientUnit: 'g',
      userID: 3, portion: 2,
    }, {
      ingredientName: 'Mozarella',
      ingredientAmount: 30,
      ingredientUnit: 'g',
      userID: 3,
      portion: 2,
    }], 1, Ingredient);

    const recipes = await getShoppingList(3, Recipe, Ingredient);
    expect(recipes).to.eql([
      {
        'ingredientName': 'Tomato',
        'ingredientUnit': 'whole',
        'totalAmount': 4,
      },
      {
        'ingredientName': 'Basil',
        'ingredientUnit': 'g',
        'totalAmount': 60,
      },
      {
        'ingredientName': 'Mozarella',
        'ingredientUnit': 'g',
        'totalAmount': 60,
      },
    ]);
  });

  it('Should return selected recipes with no recipes selected', async () => {
    const Recipe = new RecipeMock();

    await createNewRecipe(
        'roasted_eggplant', 'tasty_dish', 'mix all the good food',
        'abc', 10, Recipe,
    );
    const recipes = await getShoppingListRecipes(2, Recipe);

    expect(recipes).to.eql([]);
  });

  it('Should return selected recipes with 1 recipe selected', async () => {
    const Recipe = new RecipeMock();

    await createNewRecipe(
        'roasted_eggplant', 'tasty_dish', 'mix all the good food',
        'abc', 10, Recipe,
    );
    await setPortion(1, 1, 10, Recipe);
    const recipes = await getShoppingListRecipes(10, Recipe);
    recipes[0].save = null;
    expect(recipes).to.eql([
      {
        'description': 'tasty_dish',
        'id': 1,
        'imageURL': 'abc',
        'instructions': 'mix all the good food',
        'lastUpdated': '16/02/2023',
        'portion': 1,
        'recipeName': 'roasted_eggplant',
        'save': null,
        'userID': 10,
      },
    ]);
  });

  it('Should update portion size to 1', async () => {
    const Recipe = new RecipeMock();

    recipe = await createNewRecipe(
        'roasted_eggplant', 'tasty_dish', 'mix all the good food',
        'abc', 10, Recipe,
    );
    await setPortion(1, 2, 10, Recipe);

    expect(recipe.portion).to.equal(2);
  });


  it('Should update portion size to 1 and then reset it to 0', async () => {
    const Recipe = new RecipeMock();

    recipe = await createNewRecipe(
        'roasted_eggplant', 'tasty_dish', 'mix all the good food',
        'abc', 10, Recipe,
    );
    await setPortion(1, 2, 10, Recipe);

    expect(recipe.portion).to.equal(2);
    await resetPortions(10, Recipe);

    expect(recipe.portion).to.equal(0);
  });
});

describe('Backend recipe management integration tests', () => {
  it('should fail to authorize', async () => {
    await request
        .get('/recipes/getAll')
        .then((response) => {
          expect(response.status).to.equal(401);
        })
        .catch((err) => {
          expect(err.response.status).to.equal(401);
        });
  });

  it('should succeed to get all recipes', async () => {
    await request
        .get('/recipes/getAll')
        .set('Cookie', `token=${token}`)
        .then((response) => {
          expect(response.status).to.equal(200);
        });
  });

  it('should succeed to create recipe', async () => {
    await emptyRecipe(Recipe).then(
        (response) => expect(response).to.equal(true),
    );

    const data = {
      'recipeName': 'beef stew',
      'description': 'This is a short description about the recipe.',
      'instructions': 'Rinse the rice.\nUse the right ratio of water.',
      'ingredients': [
        {
          'ingredientName': 'Beef',
          'ingredientAmount': 500,
          'ingredientUnit': 'g',
        },
        {
          'ingredientName': 'Wine',
          'ingredientAmount': 500,
          'ingredientUnit': 'ml',
        },
      ],
    };

    await request
        .post('/recipes/addRecipe').send(data)
        .set('Cookie', `token=${token}`)
        .then((response) => {
          expect(response.status).to.equal(200);
        });
  });

  it('should fail to create recipe', async () => {
    const data = {
      'recipeName': 'beef stew',
      'description': 'This is a short description about the recipe.',
      'instructions': 'Rinse the rice.\nUse the right ratio of water.',
      'ingredients': [
        {
          'ingredientName': 'Beef',
          'ingredientAmount': 500,
          'ingredientUnit': 'g',
        },
        {
          'ingredientName': 'Wine',
          'ingredientAmount': 500,
          'ingredientUnit': 'ml',
        },
      ],
    };

    await request
        .post('/recipes/addRecipe').send(data)
        .set('Cookie', `token=${token}`)
        .then((response) => {
          expect(response.status).to.equal(400);
        });
  });

  it('should succeed to get recipe by ID', async () => {
    await request
        .get('/recipes/getOne/1')
        .set('Cookie', `token=${token}`)
        .then((response) => {
          expect(response.status).to.equal(200);
        });
  });

  it('should succeed to update recipe', async () => {
    const data = {
      'recipeName': 'beef stew',
      'description': 'This is a short description about the recipe.',
      'instructions': 'Rinse the rice.\nUse the right ratio of water.',
      'ingredients': [
        {
          'ingredientName': 'Beef',
          'ingredientAmount': 500,
          'ingredientUnit': 'g',
        },
        {
          'ingredientName': 'Wine',
          'ingredientAmount': 500,
          'ingredientUnit': 'ml',
        },
      ],
    };

    await request
        .put('/recipes/updateRecipe/1').send(data)
        .set('Cookie', `token=${token}`)
        .then((response) => {
          expect(response.status).to.equal(200);
        });
  });

  it('should succeed to delete recipe by ID', async () => {
    await request
        .delete('/recipes/deleteRecipe/1')
        .set('Cookie', `token=${token}`)
        .then((response) => {
          expect(response.status).to.equal(200);
        });
  });

  it('should fail to get recipe by ID', async () => {
    await request
        .get('/recipes/getOne/1')
        .set('Cookie', `token=${token}`)
        .then((response) => {
          expect(response.status).to.equal(400);
        });
  });

  it('should fail to update recipe', async () => {
    const data = {
      'recipeName': 'beef stew',
      'description': 'This is a short description about the recipe.',
      'instructions': 'Rinse the rice.\nUse the right ratio of water.',
      'ingredients': [
        {
          'ingredientName': 'Beef',
          'ingredientAmount': 500,
          'ingredientUnit': 'g',
        },
        {
          'ingredientName': 'Wine',
          'ingredientAmount': 500,
          'ingredientUnit': 'ml',
        },
      ],
    };

    await request
        .put('/recipes/updateRecipe/1').send(data)
        .set('Cookie', `token=${token}`)
        .then((response) => {
          expect(response.status).to.equal(400);
        });
  });

  it('should fail to delete recipe by ID', async () => {
    await request
        .delete('/recipes/deleteRecipe/1')
        .set('Cookie', `token=${token}`)
        .then((response) => {
          expect(response.status).to.equal(400);
        });
  });
});

describe('Backend grocery list integration tests', ()=>{
  it('should return an empty shopping list', async () => {
    await emptyRecipe(Recipe);
    await request.get('/recipes/viewShoppingList')
        .set('Cookie', ['token='+token]).send({}).then((response) => {
          expect(response.body).to.eql([]);
        });
  });

  it('should return an empty list of recipes', async () => {
    await emptyRecipe(Recipe);
    await request.get('/recipes/viewShoppingListRecipes')
        .set('Cookie', ['token='+token]).send({}).then((response) => {
          expect(response.body).to.eql([]);
        });
  });
});
