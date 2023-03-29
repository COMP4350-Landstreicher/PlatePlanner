import { Button, createTheme, CssBaseline, ThemeProvider, Grid } from "@mui/material";
import React from "react";
import NavBar from "./navbar";
import axios from "axios";
import { useState } from 'react';
import IngredientList from './ingredientList'


//Function to take ingredients and generate an email based off of them
export function genMailList(ingredients) {

  var stringBuilder = 'mailto:?subject=Shopping%20List&body=' + encodeURIComponent('Shopping List: \r\n');

  for (var i in ingredients) { // Check that the items are valid
    if (!Array.isArray(ingredients) || !("ingredientName" in ingredients[i] && "totalAmount" in ingredients[i] && "ingredientUnit" in ingredients[i])) {
      throw new Error('ingredients malformed!');
    }
    stringBuilder += encodeURIComponent(ingredients[i]["ingredientName"] + " - " + ingredients[i]["totalAmount"] + " " + ingredients[i]["ingredientUnit"] + "\r\n");
  }

  return (stringBuilder);

}
//Display shopping list and buttons
export default function ShoppingList() {
  const [genButtonText, setGenButtonText] = useState("Generate Shopping List");
  const [ingredientsVar, setIngredientsVar] = useState([]);


  //Handle mail button pressed
  const mailList = () => {

    window.open(genMailList(ingredientsVar), "_blank");
  }

  const updateList = (newList) => {

    setIngredientsVar(newList);
  }

  //Handle generate button pressed
  const genList = () => {
    setGenButtonText("Loading...") //Give the user some feedback
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
              '&:hover': { bgcolor: "#A0B8A5" },
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
              '&:hover': { bgcolor: "#A0B8A5" },
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

