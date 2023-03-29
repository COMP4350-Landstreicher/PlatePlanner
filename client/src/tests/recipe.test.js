import { render } from '@testing-library/react';
import { search } from 'components/searchBar';
import { validateForm } from 'components/addRecipePopup';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import Recipes, { sortByDate, sortByName } from "../components/recipes";

it("should render Homepage component", () => {
  render(<Recipes />, { wrapper: MemoryRouter });
})

it("should return search result", () => {
  const recipes = [
    { recipeName: "A" },
    { recipeName: "B" },
    { recipeName: "C" }
  ];
  expect(search(recipes, "A")).toHaveLength(1);
  expect(search(recipes, "A")).toEqual([{ recipeName: "A" }]);
})

it("should return no search result", () => {
  const recipes = [
    { recipeName: "A" },
    { recipeName: "B" },
    { recipeName: "C" }
  ];
  expect(search(recipes, "D")).toHaveLength(0);
  expect(search(recipes, "D")).toEqual([]);
})

it("should return search result even without case sensitive", () => {
  const recipes = [
    { recipeName: "A" },
    { recipeName: "B" },
    { recipeName: "C" }
  ];
  expect(search(recipes, "a")).toHaveLength(1);
  expect(search(recipes, "a")).toEqual([{ recipeName: "A" }]);
})

it("should return sorted list by name ascending", () => {
  const recipes = [
    { recipeName: "C" },
    { recipeName: "A" },
    { recipeName: "B" }
  ];
  const result = [
    { recipeName: "A" },
    { recipeName: "B" },
    { recipeName: "C" }
  ];
  expect(sortByName(true, recipes)).toHaveLength(3);
  expect(sortByName(true, recipes)).toEqual(result);
})

it("should return sorted list by name descending", () => {
  const recipes = [
    { recipeName: "C" },
    { recipeName: "A" },
    { recipeName: "B" }
  ];
  const result = [
    { recipeName: "C" },
    { recipeName: "B" },
    { recipeName: "A" }
  ];
  expect(sortByName(false, recipes)).toHaveLength(3);
  expect(sortByName(false, recipes)).toEqual(result);
})

it("should return sorted list by date ascending", () => {
  const recipes = [
    { updatedAt: new Date('2023-01-03') },
    { updatedAt: new Date('2023-01-01') },
    { updatedAt: new Date('2023-01-02') }
  ];
  const result = [
    { updatedAt: new Date('2023-01-01') },
    { updatedAt: new Date('2023-01-02') },
    { updatedAt: new Date('2023-01-03') }
  ];
  expect(sortByDate(true, recipes)).toHaveLength(3);
  expect(sortByDate(true, recipes)).toEqual(result);
})

it("should return sorted list by date descending", () => {
  const recipes = [
    { updatedAt: new Date('2023-01-03') },
    { updatedAt: new Date('2023-01-01') },
    { updatedAt: new Date('2023-01-02') }
  ];
  const result = [
    { updatedAt: new Date('2023-01-03') },
    { updatedAt: new Date('2023-01-02') },
    { updatedAt: new Date('2023-01-01') }
  ];
  expect(sortByDate(false, recipes)).toHaveLength(3);
  expect(sortByDate(false, recipes)).toEqual(result);
})

it("the form should be invalid when required field is blank", () => {
  const recipe = {
    name: "a",
    ingredients: [{
      ingredientName: "",
      ingredientUnit: "count",
      ingredientAmount: "1"
    }],
    directions: ["first step"]
  }
  expect(validateForm(recipe.name, recipe.directions, recipe.ingredients)).toEqual(true);
})

it("the form should be invalid when ingredient name is duplicated", () => {
  const recipe = {
    name: "a",
    ingredients: [{
      ingredientName: "sugar",
      ingredientUnit: "g",
      ingredientAmount: "2"
    },
    {
      ingredientName: "sugar",
      ingredientUnit: "count",
      ingredientAmount: "1"
    }],
    directions: ["first step"]
  }
  expect(validateForm(recipe.name, recipe.directions, recipe.ingredients)).toEqual(true);
})

it("the form should be invalid when ingredient amount is equal 0", () => {
  const recipe = {
    name: "a",
    ingredients: [{
      ingredientName: "sugar",
      ingredientUnit: "g",
      ingredientAmount: "0"
    }],
    directions: ["first step"]
  }
  expect(validateForm(recipe.name, recipe.directions, recipe.ingredients)).toEqual(true);
})

it("the form should be invalid when ingredient amount is smaller than 0", () => {
  const recipe = {
    name: "a",
    ingredients: [{
      ingredientName: "sugar",
      ingredientUnit: "g",
      ingredientAmount: "-1"
    }],
    directions: ["first step"]
  }
  expect(validateForm(recipe.name, recipe.directions, recipe.ingredients)).toEqual(true);
})

it("the form should be valid when fields are correct", () => {
  const recipe = {
    name: "a",
    ingredients: [{
      ingredientName: "sugar",
      ingredientUnit: "g",
      ingredientAmount: "2"
    }],
    directions: ["first step"]
  }
  expect(validateForm(recipe.name, recipe.directions, recipe.ingredients)).toEqual(false);
})
