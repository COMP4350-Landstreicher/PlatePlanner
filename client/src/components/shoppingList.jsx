import { Button, Container, createTheme, CssBaseline, ThemeProvider, Typography, Box, Grid } from "@mui/material";
import React from "react";
import NavBar from "./navbar";
import axios from "axios";
import { useState } from 'react';
import IngredientList from './ingredientList'

export default function ShoppingList() {
    const [genButtonText, setGenButtonText] = useState("Generate Shopping List");
    const [ingredientsVar, setIngredientsVar] = useState([]);
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
            id: 1,
            name: "This is recipe nameeeee 1" ,
            description: "This is a short description about the recipe and it should be have word limit so it wont go out of the box",
            directions: directions,
            ingredients: ingredients,
            image: "https://source.unsplash.com/random",
            updated: new Date()
        };
    const newRecipe1 = {
            id: 2,
            name: "This is recipe nameeeee 2",
            description: "This is a short description about the recipe and it should be have word limit so it wont go out of the box",
            directions: directions,
            ingredients: ingredients,
            image: "https://source.unsplash.com/random",
            updated: new Date()
        };
    var recipes = [newRecipe, newRecipe1];
    const mailList = () => {

        var stringBuilder = 'mailto:?subject=Shopping%20List&body=' + encodeURIComponent('Shopping List: \r\n');

        for(var i in ingredientsVar)
        {
            stringBuilder+= encodeURIComponent(ingredientsVar[i]["ingredientName"] + " - " + ingredientsVar[i]["totalAmount"] + " " + ingredientsVar[i]["ingredientUnit"] + "\r\n");
        }

        stringBuilder +='"'
        window.open(stringBuilder, "_blank");
    }
    const getListFromRecipes = (new_recipes) => {
        var allIngredients = {}
        for (var r in new_recipes)
        {
            for (var i in new_recipes[r]["ingredients"])
            {
                if (new_recipes[r]["ingredients"][i]["name"] in allIngredients){
                    allIngredients[new_recipes[r]["ingredients"][i]["name"]]["amount"] += parseInt(new_recipes[r]["ingredients"][i]["amount"])
                }
                else 
                {
                    allIngredients[new_recipes[r]["ingredients"][i]["name"]] = {"amount" : parseInt(new_recipes[r]["ingredients"][i]["amount"]), "unit": new_recipes[r]["ingredients"][i]["unit"]}
                }
            }
        }
        var allIngredientsList = []
        for (var i in allIngredients)
        {
            allIngredientsList.push({"name" : i, "amount" : allIngredients[i]["amount"], "unit": allIngredients[i]["unit"]})
        }
        return(allIngredientsList)
    }
    const updateList = (newList) => {

        setIngredientsVar(newList);
    }
    const genList = () => {
        setGenButtonText("Loading...")
        axios.get("http://" + window.location.hostname + ":3000/recipes/viewShoppingList", { withCredentials: true })
            .then((response) => {

                recipes = response.data;
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

