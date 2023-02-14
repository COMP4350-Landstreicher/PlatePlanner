import { Add } from "@mui/icons-material";
import { AppBar, Container, createTheme, CssBaseline, Fab, ThemeProvider, Toolbar} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import NavBar from "./navbar";
import RecipeList from "./recipeList";
import SearchBar from "./searchBar";
import SortButton from "./sortButton";

export default function Recipes() {
    const [recipes, setRecipes] = useState(null);
    const [displayRecipes, setDisplayRecipes] = useState(null);

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
        const newRecipe = {id: recipes.length+1, name: "This is recipe nameeeee " + recipes.length, image: "https://source.unsplash.com/random", updated: new Date()};
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
        switch(result) {
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
            .then((response)=>{
            setRecipes(response.data);
            setDisplayRecipes(response.data);
        });
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <NavBar value={0}/>
            <AppBar elevation={0} sx={{display: 'flex', justifyContent: 'center', background: "#547958", maxWidth: `calc(100% - 250px)`, ml: '250px', height: '100px'}}>
                <Toolbar sx={{justifyContent: "center", alignItems:"center"}}>
                    <SearchBar value={recipes} filterRecipe={(result) => setDisplayRecipes(result)}/>
                    <SortButton value={recipes} sortRecipe={sortRecipe} />
                </Toolbar>
            </AppBar>
            <Container maxWidth={false} sx={{maxWidth: `calc(100% - 250px)`, ml: '250px', mt: 10}}>
                <RecipeList value={displayRecipes}/>
                <Fab color="primary" aria-label="add" sx={{position: 'fixed', bottom: 40, right: 40}} onClick={addRecipe}>
                    <Add sx={{ stroke: '#547958', strokeWidth: 3 }}/>
                </Fab>
            </Container>
        </ThemeProvider>
    );
}
