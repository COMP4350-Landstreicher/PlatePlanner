import { Add } from "@mui/icons-material";
import { AppBar, Container, createTheme, CssBaseline, Fab, ThemeProvider, Toolbar } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import NavBar from "./navbar";
import RecipeList from "./recipeList";
import SearchBar from "./searchBar";
import SortButton from "./sortButton";

export default function Recipes() {
    const [recipes, setRecipes] = useState([]);
    const [displayRecipes, setDisplayRecipes] = useState([]);
    const [filter, setFilter] = useState("");

    const theme = createTheme({
        palette: {
            primary: {
                main: '#ECF3A3'
            },
            secondary: {
                main: '#547958'
            },
            background: {
                default: '#547958'
            }
        },
        typography: {
            allVariants: {
                color: '#547958'
            }
        }
    });

    const addRecipe = () => {
        const ingredients = [
            { name: "Beef", unit: "g", amount: "500" },
            { name: "Wine", unit: "ml", amount: "500" },
            { name: "Sugar", unit: "g", amount: "10" },
            { name: "Salt", unit: "g", amount: "20" },
            { name: "Pork", unit: "g", amount: "500" },
            { name: "Egg", unit: "count", amount: "2" },
            { name: "Some other ingredients", unit: "count", amount: "5" },
            { name: "The last ingredient", unit: "count", amount: "10" }
        ];
        const directions = "Rinse the rice.\n"
            + "Use the right ratio of water. Add 2 parts water and 1 part rice to a large pot. For slightly firmer rice, use 1 part liquid to 2/3 parts rice.\n"
            + "Bring the water to a boil. Once it's boiling, add a big pinch of salt.\n"
            + "Maintain a simmer. Reduce heat to low, cover the pot with a tight fitting lid, and maintain a gentle simmer.\n"
            + "Cook without peeking or stirring. Cook until the water is absorbed, about 18 minutes. Try not to peek until the end of the cooking time so the steam doesn't escape. Whatever you do, don't mix the rice while it's cooking — this will lead to gummy rice.\n"
            + "Let the rice rest covered. Turn off the heat and let the rice sit, covered, for 10 minutes. During this time, the rice will steam for extra fluffy results.\n"
            + "Fluff the rice with a fork.";
        const newRecipe = {
            id: recipes.length + 1,
            name: "This is recipe nameeeee " + recipes.length,
            description: "This is a short description about the recipe and it should be have word limit so it wont go out of the box",
            directions: directions,
            ingredients: ingredients,
            image: "https://source.unsplash.com/random",
            updated: new Date()
        };
        axios.post("http://" + window.location.hostname + ":3000/addRecipe", newRecipe)
            .then(response => {
                setRecipes(response.data);
                setDisplayRecipes(response.data);
            })
            .catch(error => {
                console.error('There was an error!', error.message);
            });
    };

    const sortRecipe = (result) => {
        setFilter(result);
        switch (result) {
            case "nameAsc":
                setRecipes(recipes.sort((a, b) => (a.name.toLowerCase() < b.name.toLowerCase()) ? -1 : 1));
                setDisplayRecipes([...displayRecipes].sort((a, b) => (a.name.toLowerCase() < b.name.toLowerCase()) ? -1 : 1));
                break;
            case "nameDes":
                setRecipes(recipes.sort((a, b) => (a.name.toLowerCase() > b.name.toLowerCase()) ? -1 : 1));
                setDisplayRecipes([...displayRecipes].sort((a, b) => (a.name.toLowerCase() > b.name.toLowerCase()) ? -1 : 1));
                break;
            case "dateAsc":
                setRecipes(recipes.sort((a, b) => (new Date(a.updated) > new Date(b.updated)) ? -1 : 1));
                setDisplayRecipes([...displayRecipes].sort((a, b) => (new Date(a.updated) > new Date(b.updated)) ? -1 : 1));
                break;
            case "dateDes":
                setRecipes(recipes.sort((a, b) => (new Date(a.updated) < new Date(b.updated)) ? -1 : 1));
                setDisplayRecipes([...displayRecipes].sort((a, b) => (new Date(a.updated) < new Date(b.updated)) ? -1 : 1));
                break;
            default:
                setRecipes(recipes.sort((a, b) => (new Date(a.updated) < new Date(b.updated)) ? -1 : 1));
                setDisplayRecipes([...displayRecipes].sort((a, b) => (new Date(a.updated) < new Date(b.updated)) ? -1 : 1));
        }
    }

    useEffect(() => {
        axios.get("http://" + window.location.hostname + ":3000/recipes")
            .then((response) => {
                setRecipes(response.data);
                setDisplayRecipes(response.data);
            });
    }, []);

    useEffect(() => {
        sortRecipe(filter);
    }, [displayRecipes?.length]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <NavBar value={0} />
            <AppBar elevation={0} sx={{ display: 'flex', justifyContent: 'center', background: "#547958", maxWidth: `calc(100% - 250px)`, ml: '250px', height: '100px' }}>
                <Toolbar sx={{ justifyContent: "center", alignItems: "center" }}>
                    <SearchBar value={recipes} filterRecipe={(result) => setDisplayRecipes(result)} />
                    <SortButton value={recipes} sortRecipe={sortRecipe} />
                </Toolbar>
            </AppBar>
            <Container maxWidth={false} sx={{ maxWidth: `calc(100% - 250px)`, ml: '250px', mt: 10 }}>
                <RecipeList value={displayRecipes} />
                <Fab color="primary" aria-label="add" sx={{ position: 'fixed', bottom: 40, right: 40 }} onClick={addRecipe}>
                    <Add sx={{ stroke: '#547958', strokeWidth: 3 }} />
                </Fab>
            </Container>
        </ThemeProvider>
    );
}
