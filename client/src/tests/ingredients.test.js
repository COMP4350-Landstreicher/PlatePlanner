import {render} from '@testing-library/react';
import React from 'react';
import {MemoryRouter} from 'react-router-dom';
import ShoppingList, {genMailList} from '../components/shoppingList';
import IngredientList from '../components/ingredientList';


it('Should render ShoppingList component', () => {
  render(<ShoppingList />, {wrapper: MemoryRouter});
});

it('should render IngredientList component', () => {
  render(<IngredientList value={[{ingredientName: 'Name', ingredientUnit: 'Unit', totalAmount: 22}]} />, {wrapper: MemoryRouter});
});


it('Generating mail without any ingredients should produce an empty email', () => {
  const ingredients = [];
  expect(genMailList(ingredients)).toEqual('mailto:?subject=Shopping%20List&body=Shopping%20List%3A%20%0D%0A');
});

it('Generating mail with valid ingredients should produce a valid email', () => {
  const ingredients = [{ingredientName: 'Name', ingredientUnit: 'Unit', totalAmount: 22}];
  expect(genMailList(ingredients)).toEqual('mailto:?subject=Shopping%20List&body=Shopping%20List%3A%20%0D%0AName%20-%2022%20Unit%0D%0A');
});

it('Generating mail with garbage data should produce an error', () => {
  const ingredients = 'COWS';
  expect(() => {
    genMailList(ingredients);
  }).toThrow();
});
