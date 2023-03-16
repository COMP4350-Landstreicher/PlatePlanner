import { Button, Container, createTheme, CssBaseline, ThemeProvider, Typography, Box, Grid } from "@mui/material";
import React from "react";
import NavBar from "./navbar";
import axios from "axios";
import { useState } from 'react';
import IngredientList from './ingredientList'

export default function ShoppingList() {
    const [genButtonText, setGenButtonText] = useState("Generate Shopping List");
    const [ingredientsVar, setIngredientsVar] = useState([]);
    
    const mailList = () => {

        var stringBuilder = 'mailto:?subject=Shopping%20List&body=' + encodeURIComponent('Shopping List: \r\n');

        for(var i in ingredientsVar)
        {
            stringBuilder+= encodeURIComponent(ingredientsVar[i]["ingredientName"] + " - " + ingredientsVar[i]["totalAmount"] + " " + ingredientsVar[i]["ingredientUnit"] + "\r\n");
        }

        
        window.open(stringBuilder, "_blank");
    }
    
    const updateList = (newList) => {

        setIngredientsVar(newList);
    }
    const genList = () => {
        setGenButtonText("Loading...")
        axios.get("http://" + window.location.hostname + ":3000/recipes/viewShoppingList", { withCredentials: true })
            .then((response) => {

                var recipes = response.data;
                updateList(recipes);
                setGenButtonText("Generate Shopping List")
            });
       

    };
    let theme = createTheme({
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
    })

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <NavBar value={2} />

            <Grid container spacing={2} sx={{ maxWidth: `calc(100%- 250px)`, ml: '260px' }}>
                <Grid item xs={8}>
                    <IngredientList value={ingredientsVar} />
                </Grid>
                <Grid item xs={4}>
                    <Button
                    variant="text"
                    sx={{
                        bgcolor: '#ECF3A3',
                        '&:hover': {bgcolor: "#A0B8A5"},
                        color: '#547958',
                        padding: '1pc',
                        margin: 'auto',
                        mt: '3pc',
                        border: 'none',
                        borderRadius: '5px',
                        width: '30%', alignItems: 'center', justifyContent: 'center'
                    }}
                    onClick={genList}>{genButtonText}</Button><br />
                    <Button
                    variant="text"
                    sx={{
                        bgcolor: '#ECF3A3',
                        '&:hover': {bgcolor: "#A0B8A5"},
                        color: '#547958',
                        padding: '1pc',
                        margin: 'auto',
                        mt: '3pc',
                        border: 'none',
                        borderRadius: '5px',
                        width: '30%', alignItems: 'center', justifyContent: 'center'
                    }}
                    onClick={mailList}>Send via Email</Button><br />
                </Grid>
            </Grid>
            
        </ThemeProvider>
    );
    
}

