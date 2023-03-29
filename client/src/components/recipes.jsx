import { Add } from "@mui/icons-material";
import { Alert, AppBar, Collapse, Container, createTheme, CssBaseline, Fab, Snackbar, ThemeProvider, Toolbar } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import EditRecipePopup from "./addRecipePopup";
import NavBar from "./navbar";
import RecipeList from "./recipeList";
import SearchBar from "./searchBar";
import SortButton from "./sortButton";

// function to sort recipes by name
export function sortByName(asc, recipeList) {
  return asc
    ? recipeList.sort((a, b) => (a.recipeName.toLowerCase() < b.recipeName.toLowerCase()) ? -1 : 1)
    : recipeList.sort((a, b) => (a.recipeName.toLowerCase() > b.recipeName.toLowerCase()) ? -1 : 1);
}

// function to sort recipes by date
export function sortByDate(asc, recipeList) {
  return asc
    ? recipeList.sort((a, b) => (new Date(a.updatedAt) < new Date(b.updatedAt)) ? -1 : 1)
    : recipeList.sort((a, b) => (new Date(a.updatedAt) > new Date(b.updatedAt)) ? -1 : 1);
}

export default function Recipes() {
  const [recipes, setRecipes] = useState([]);
  const [displayRecipes, setDisplayRecipes] = useState([]);
  const [filter, setFilter] = useState("");
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const [snackBar, setSnackbar] = useState(false);
  const [collapse, setCollapse] = React.useState(false);

  const blankRecipe = {
    recipeName: "",
    description: "",
    imageURL: "",
    ingredients: [{
      ingredientName: "",
      ingredientAmount: "1",
      ingredientUnit: "count"
    }],
    instructions: ""
  };

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

  // API to add recipe
  // if failed, have a snack bar error
  const addRecipe = (result) => {
    axios.post("http://" + window.location.hostname + ":3000/recipes/addRecipe", result, { withCredentials: true })
      .then(response => {
        if (response.status === 200) {
          fetchRecipes();
          setOpen(false);
        }
      })
      .catch(err => {
        setError(err.response.data.message);
        setSnackbar(true);
        console.error('There was an error!', err.message);
      });
  };

  // API to delete recipe
  // if failed, have a snack bar error
  const delRecipe = (id) => {
    axios.delete("http://" + window.location.hostname + ":3000/recipes/deleteRecipe/" + id, { withCredentials: true })
      .then(response => {
        if (response.status === 200) {
          fetchRecipes();
          setOpen(false);
        }
      })
      .catch(err => {
        setError(err.response.data.message);
        setSnackbar(true);
        console.error('There was an error!', err.message);
      });
  };

  // when recipe updated, fetch all recipes again
  const updateRecipe = () => {
    fetchRecipes();
  }

  // sort recipe based on selected option
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

  // get all existing recipes
  const fetchRecipes = () => {
    axios.get("http://" + window.location.hostname + ":3000/recipes/getAll", { withCredentials: true })
      .then((response) => {
        setRecipes(response.data);
        setDisplayRecipes(response.data);
      });
  }

  // get recipes when initialize
  useEffect(() => {
    fetchRecipes();
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
        <RecipeList value={displayRecipes} updateRecipe={updateRecipe} deleteRecipe={delRecipe} />
        <Fab
          color="primary"
          aria-label="add"
          onMouseEnter={() => setCollapse(true)}
          onMouseLeave={() => setCollapse(false)}
          onClick={() => setOpen(true)}
          sx={{ position: 'fixed', bottom: 40, right: 40, height: 56, width: collapse ? 156 : 56, borderRadius: 50 }}>
          <Collapse orientation="horizontal" collapsedSize={30}>
            <Add sx={{ stroke: '#547958', strokeWidth: 3, mt: "6px", ml: collapse ? 0 : 0.4 }} />
          </Collapse>
          {collapse ? "Add Recipe" : null}
        </Fab>
      </Container>
      <EditRecipePopup open={open} editRecipe={blankRecipe} handleClose={() => setOpen(false)} saveRecipe={(result) => addRecipe(result)} />
      <Snackbar open={snackBar} autoHideDuration={6000} onClose={() => setSnackbar(false)}>
        <Alert onClose={() => setSnackbar(false)} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
}
