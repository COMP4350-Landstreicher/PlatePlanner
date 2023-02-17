import { render } from '@testing-library/react';
import { search } from 'components/searchBar';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import Recipes, { sortByDate, sortByName } from "../components/recipes";

it("should render Homepage component", () => {
    render(<Recipes />, { wrapper: MemoryRouter });
})

it("should return search result", () => {
    const recipes = [
        { recipe_name: "A" },
        { recipe_name: "B" },
        { recipe_name: "C" }
    ];
    expect(search(recipes, "A")).toHaveLength(1);
    expect(search(recipes, "A")).toEqual([{ recipe_name: "A" }]);
})

it("should return no search result", () => {
    const recipes = [
        { recipe_name: "A" },
        { recipe_name: "B" },
        { recipe_name: "C" }
    ];
    expect(search(recipes, "D")).toHaveLength(0);
    expect(search(recipes, "D")).toEqual([]);
})

it("should return search result even without case sensitive", () => {
    const recipes = [
        { recipe_name: "A" },
        { recipe_name: "B" },
        { recipe_name: "C" }
    ];
    expect(search(recipes, "a")).toHaveLength(1);
    expect(search(recipes, "a")).toEqual([{ recipe_name: "A" }]);
})

it("should return sorted list by name ascending", () => {
    const recipes = [
        { recipe_name: "C" },
        { recipe_name: "A" },
        { recipe_name: "B" }
    ];
    const result = [
        { recipe_name: "A" },
        { recipe_name: "B" },
        { recipe_name: "C" }
    ];
    expect(sortByName(true, recipes)).toHaveLength(3);
    expect(sortByName(true, recipes)).toEqual(result);
})

it("should return sorted list by name descending", () => {
    const recipes = [
        { recipe_name: "C" },
        { recipe_name: "A" },
        { recipe_name: "B" }
    ];
    const result = [
        { recipe_name: "C" },
        { recipe_name: "B" },
        { recipe_name: "A" }
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
