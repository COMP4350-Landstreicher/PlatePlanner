import { Container, createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import NavBar from "./navbar";
import RecipeList from "./recipeList";

export default function Recipes() {
    const [recipes, setRecipes] = useState(null);

    const theme = createTheme({
        palette: {
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

    useEffect(() => {
        axios.get("http://localhost:80/recipes")
            .then((response)=>{
            setRecipes(response.data);
        });
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <NavBar value={0}/>
            <Container maxWidth={false} sx={{maxWidth: `calc(100% - 250px)`, ml: '250px'}}>
                <RecipeList value={recipes}/>
            </Container>
        </ThemeProvider>
    );
}