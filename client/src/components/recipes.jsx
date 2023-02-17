import { Add } from "@mui/icons-material";
import { AppBar, Container, createTheme, CssBaseline, Fab, ThemeProvider, Toolbar } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import NavBar from "./navbar";
import RecipeList from "./recipeList";
import SearchBar from "./searchBar";
import SortButton from "./sortButton";

export function sortByName(asc, recipeList) {
    return asc
        ? recipeList.sort((a, b) => (a.recipe_name.toLowerCase() < b.recipe_name.toLowerCase()) ? -1 : 1)
        : recipeList.sort((a, b) => (a.recipe_name.toLowerCase() > b.recipe_name.toLowerCase()) ? -1 : 1);
}

export function sortByDate(asc, recipeList) {
    return asc
        ? recipeList.sort((a, b) => (new Date(a.updatedAt) < new Date(b.updatedAt)) ? -1 : 1)
        : recipeList.sort((a, b) => (new Date(a.updatedAt) > new Date(b.updatedAt)) ? -1 : 1);
}

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

    // TODO: add recipe function
    const addRecipe = () => {
        console.log("add data");
        // axios.post("http://" + window.location.hostname + ":3000/addRecipe", newRecipe, { withCredentials: true })
        //     .then(response => {
        //         setRecipes(response.data);
        //         setDisplayRecipes(response.data);
        //     })
        //     .catch(error => {
        //         console.error('There was an error!', error.message);
        //     });
    };

    const sortRecipe = (result) => {
        setFilter(result);
        switch (result) {
            case "nameAsc":
                setRecipes(sortByName(true, recipes));
                setDisplayRecipes(sortByName(true, [...displayRecipes]));
                break;
            case "nameDes":
                setRecipes(sortByName(false, recipes));
                setDisplayRecipes(sortByName(false, [...displayRecipes]));
                break;
            case "dateAsc":
                setRecipes(sortByDate(true, recipes));
                setDisplayRecipes(sortByDate(true, [...displayRecipes]));
                break;
            case "dateDes":
                setRecipes(sortByDate(false, recipes));
                setDisplayRecipes(sortByDate(false, [...displayRecipes]));
                break;
            default:
                setRecipes(sortByDate(true, recipes));
                setDisplayRecipes(sortByDate(true, [...displayRecipes]));
        }
    }

    useEffect(() => {
        axios.get("http://" + window.location.hostname + ":3000/recipes/getAll", { withCredentials: true })
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
