import { render } from '@testing-library/react';
import { search } from 'components/searchBar';
import { MemoryRouter } from 'react-router-dom';
import Recipes, { sortByDate, sortByName } from "../components/Recipes";

it("should render Homepage component", () => {
    render(<Recipes />, {wrapper: MemoryRouter});
})

it("should return search result", () => {
    const recipes = [
        {name: "A"},
        {name: "B"},
        {name: "C"}
    ];
    expect(search(recipes, "A")).toHaveLength(1);
    expect(search(recipes, "A")).toEqual([{name: "A"}]);
})

it("should return no search result", () => {
    const recipes = [
        {name: "A"},
        {name: "B"},
        {name: "C"}
    ];
    expect(search(recipes, "D")).toHaveLength(0);
    expect(search(recipes, "D")).toEqual([]);
})

it("should return search result even without case sensitive", () => {
    const recipes = [
        {name: "A"},
        {name: "B"},
        {name: "C"}
    ];
    expect(search(recipes, "a")).toHaveLength(1);
    expect(search(recipes, "a")).toEqual([{name: "A"}]);
})

it("should return sorted list by name ascending", () => {
    const recipes = [
        {name: "C"},
        {name: "A"},
        {name: "B"}
    ];
    const result = [
        {name: "A"},
        {name: "B"},
        {name: "C"}
    ];
    expect(sortByName(true, recipes)).toHaveLength(3);
    expect(sortByName(true, recipes)).toEqual(result);
})

it("should return sorted list by name descending", () => {
    const recipes = [
        {name: "C"},
        {name: "A"},
        {name: "B"}
    ];
    const result = [
        {name: "C"},
        {name: "B"},
        {name: "A"}
    ];
    expect(sortByName(false, recipes)).toHaveLength(3);
    expect(sortByName(false, recipes)).toEqual(result);
})

it("should return sorted list by date ascending", () => {
    const recipes = [
        {updated: new Date('2023-01-03')},
        {updated: new Date('2023-01-01')},
        {updated: new Date('2023-01-02')}
    ];
    const result = [
        {updated: new Date('2023-01-01')},
        {updated: new Date('2023-01-02')},
        {updated: new Date('2023-01-03')}
    ];
    expect(sortByDate(true, recipes)).toHaveLength(3);
    expect(sortByDate(true, recipes)).toEqual(result);
})

it("should return sorted list by date descending", () => {
    const recipes = [
        {updated: new Date('2023-01-03')},
        {updated: new Date('2023-01-01')},
        {updated: new Date('2023-01-02')}
    ];
    const result = [
        {updated: new Date('2023-01-03')},
        {updated: new Date('2023-01-02')},
        {updated: new Date('2023-01-01')}
    ];
    expect(sortByDate(false, recipes)).toHaveLength(3);
    expect(sortByDate(false, recipes)).toEqual(result);
})