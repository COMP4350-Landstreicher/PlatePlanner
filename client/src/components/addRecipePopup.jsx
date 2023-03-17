import React, { useEffect, useRef, useState } from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, IconButton, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Add } from '@mui/icons-material';

// validate if the form has been filled with correct value
export function validateForm(name, directions, ingredients) {
  if (
    name === "" ||
    directions.filter((dir) => dir === "").length !== 0 ||
    ingredients.filter(
      (ing) =>
        ing.ingredientName === "" || ing.ingredientAmount === "" || parseFloat(ing.ingredientAmount) <= 0
    ).length !== 0 ||
    ingredients.filter(
      (ing) =>
        ing.ingredientName !== "" &&
        ingredients.filter(
          (ingCheck) => ingCheck.ingredientName?.trim() === ing.ingredientName?.trim()
        ).length > 1
    ).length !== 0
  ) {
    return true; //return true when form has invalid fields
  } else {
    return false;
  }
}

export default function EditRecipePopup(props) {
  const [directions, setDirections] = useState(props.editRecipe.instructions.split("\n"));
  const [ingredients, setIngredients] = useState(props.editRecipe.ingredients);
  const [name, setName] = useState(props.editRecipe.recipeName);
  const [imageURL, setImageURL] = useState(props.editRecipe.imageURL);
  const [description, setDescription] = useState(props.editRecipe.description);
  const [disabledSave, setDisabledSave] = React.useState(false);
  const inputRef = useRef(null);

  // get form input data to recipe object
  const saveRecipe = () => {
    const ingredientList = ingredients.filter(ing => ing.ingredientAmount !== "" && ing.ingredientUnit !== "" && ing.ingredientName !== "").map(ing => {
      return {
        ingredientName: ing.ingredientName,
        ingredientAmount: ing.ingredientAmount,
        ingredientUnit: ing.ingredientUnit
      };
    });
  
    const directionList = directions.filter(dir => dir !== "").join("\n");
    return {
      recipeName: name,
      description: description,
      imageURL: imageURL,
      ingredients: ingredientList,
      instructions: directionList
    };
  };

  // validate form on form value changes
  useEffect(() => {
    setDisabledSave(validateForm(name, directions, ingredients));
  }, [name, directions, ingredients]);// eslint-disable-line react-hooks/exhaustive-deps

  // reset all value when close/open popup
  const resetForm = () => {
    setDirections(props.editRecipe.instructions.split("\n"));
    setIngredients(props.editRecipe.ingredients);
    setName(props.editRecipe.recipeName);
    setImageURL(props.editRecipe.imageURL);
    setDescription(props.editRecipe.description);
  };

  useEffect(() => {
    resetForm();
  }, [props.open]);// eslint-disable-line react-hooks/exhaustive-deps

  //add direction row
  const addDirection = () => {
    setDirections([...directions, ""]);
    setTimeout(() => inputRef?.current?.focus());
  };

  //remove direction row
  const removeDirection = (index) => {
    const rows = [...directions];
    rows.splice(index, 1);
    setDirections(rows);
  };

  //add ingredient row
  const addIngredient = () => {
    setIngredients([...ingredients, {
      ingredientName: '',
      ingredientAmount: '1',
      ingredientUnit: 'count'
    }]);
    setTimeout(() => inputRef?.current?.focus());
  };

  //remove ingredient row
  const removeIngredient = (index) => {
    const rows = [...ingredients];
    rows.splice(index, 1);
    setIngredients(rows);
  };

  //update ingredients when input changes
  const handleChangeIngredient = (index, event) => {
    const { name, value } = event.target;
    const list = [...ingredients];
    list[index][name] = value;
    setIngredients(list);
  };

  //update directions when input changes
  const handleChangeDirection = (index, event) => {
    const list = [...directions];
    list[index] = event.target.value;
    setDirections(list);
  };

  //get label for direction step
  const stepLabel = (index) => {
    const number = index + 1;
    return "Step " + number;
  };

  return (
    <Dialog
      open={props.open}
      onClose={props.handleClose}
      scroll='paper'
      aria-labelledby="dialog"
      fullWidth={true}
      maxWidth='lg'
    >
      <DialogTitle marginLeft="20px">
        <Typography color="#283d25" component="span" variant="h5">
          <Box component="span" fontWeight="fontWeightBold">
            {props.editRecipe.recipeName === "" ? "Add Recipe" : "Edit Recipe"}
          </Box>
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Box width='100%' display='flex' flexDirection='column' minHeight='80%' maxHeight='800px'>
          <TextField
            sx={{
              display: 'flex',
              m: 1,
              ml: '20px',
              mr: '20px'
            }}
            error={name.trim() === ""}
            helperText={name.trim() === "" ? "Required" : null}
            value={name}
            onChange={(e) => setName(e.target.value)}
            label="Recipe Name"
            variant="outlined"
          />
          <Box width='100%' display='flex' flexDirection='row'>
            <Box width='50%' marginLeft='20px'>
              <TextField
                sx={{
                  display: 'flex',
                  m: 1,
                  ml: 0
                }}
                value={imageURL}
                onChange={(e) => setImageURL(e.target.value)}
                label="Image URL"
                variant="outlined"
              />
              <TextField
                sx={{
                  display: 'flex',
                  m: 1,
                  ml: 0
                }}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                label="Description"
                variant="outlined"
                multiline
                rows={3}
              />
              <Box
                width="100%"
                display="flex"
                flexDirection="row"
                marginBottom={1}
                marginTop={2}
              >
                <Typography variant="h6" width="90%" color="#283d25">
                  <Box component="span" fontWeight="fontWeightBold">
                    Ingredients
                  </Box>
                </Typography>
                <Button onClick={addIngredient} sx = {{ width: 80, mr: 1, borderRadius: 4 }} variant="contained">
                  <Add sx={{ stroke: "#547958", strokeWidth: 1 }} />
                  Add
                </Button>
              </Box>
              <Box sx={{ maxHeight: '350px', overflowY: "auto", overflowX: "hidden" }}>
                {
                  ingredients.map((data, index) => {
                    const { ingredientUnit, ingredientAmount, ingredientName } = data;
                    return (
                      <Box key={index} width='100%' display='flex' justifyContent="space-between" flexDirection='row' sx={{ m: 1, ml: 0 }}>
                        <TextField
                          value={ingredientAmount}
                          name="ingredientAmount"
                          inputRef={inputRef}
                          error={parseFloat(ingredientAmount) <= 0 || ingredientAmount === ""}
                          helperText={
                            parseFloat(ingredientAmount) <= 0
                              ? "Should be > 0"
                              : ingredientAmount === ""
                              ? "Required"
                              : null
                          }
                          sx={{
                            width: '20%',
                            my: 1,
                            mr: 1
                          }}
                          type="number"
                          label="Amount"
                          variant="filled"
                          onChange={(event) => handleChangeIngredient(index, event)}
                        />
                        <FormControl variant="filled" sx={{ minWidth: '75px', my: 1, mr: 6 }}>
                          <InputLabel>Unit</InputLabel>
                          <Select
                            value={ingredientUnit}
                            label="Unit"
                            name="ingredientUnit"
                            onChange={(event) => handleChangeIngredient(index, event)}
                          >
                            <MenuItem value={"count"}>x</MenuItem>
                            <MenuItem value={"ml"}>ml</MenuItem>
                            <MenuItem value={"g"}>g</MenuItem>
                          </Select>
                        </FormControl>
                        <TextField
                          value={ingredientName}
                          sx={{
                            width: ingredients.length !== 1 ? "50%" : "57%",
                            my: 1,
                            mr: 1
                          }}
                          error={
                            ingredientName.trim() === "" ||
                            ingredients.filter(
                              (ing) => ing.ingredientName.trim() === ingredientName.trim()
                            ).length > 1
                          }
                          helperText={
                            ingredientName.trim() === ""
                              ? "Required"
                              : ingredients.filter(
                                  (ing) => ing.ingredientName.trim() === ingredientName.trim()
                                ).length > 1
                              ? "Ingredient has already existed"
                              : null
                          }
                          label="Name"
                          name="ingredientName"
                          variant="filled"
                          onChange={(event) => handleChangeIngredient(index, event)}
                        />
                        {ingredients.length !== 1 && (
                              <IconButton onClick={() => removeIngredient(index)} aria-label="delete" sx={{ maxHeight: "70px" }}>
                                <DeleteIcon />
                              </IconButton>
                        )}
                      </Box>
                    )
                  })
                }
              </Box>
            </Box>
            <Box width='50%' marginLeft='20px' marginRight='20px'>
              <Box
                width="100%"
                display="flex"
                flexDirection="row"
                marginY={1}
              >
                <Typography variant="h6" width="90%" color="#283d25">
                  <Box component="span" fontWeight="fontWeightBold">
                    Directions
                  </Box>
                </Typography>
                <Button onClick={addDirection} sx = {{ width: 80, borderRadius: 4 }} variant="contained">
                  <Add sx={{ stroke: "#547958", strokeWidth: 1 }} />
                  Add
                </Button>
              </Box>
              <Box sx={{ maxHeight: '540px', overflow: "auto" }}>
                {
                  directions.map((data, index) => {
                    return (
                      <Box key={index} width='100%' display='flex' flexDirection='row' justifyContent='space-between'>
                        <TextField
                          inputRef={inputRef}
                          value={data}
                          name="direction"
                          onChange={(event) => handleChangeDirection(index, event)}
                          sx={{
                            display: 'flex',
                            flex: 1,
                            my: 1
                          }}
                          error={data.trim() === ""}
                          helperText={data.trim() === "" ? "Required" : null}
                          label={stepLabel(index)}
                          variant="filled"
                          multiline
                          rows={3}
                        />
                        {directions.length !== 1 && (
                          <IconButton onClick={() => removeDirection(index)} aria-label="delete" sx={{ maxHeight: "210px" }}>
                            <DeleteIcon />
                          </IconButton>
                        )}
                      </Box>
                    )
                  })
                }
              </Box>
            </Box>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          disabled={disabledSave}
          onClick={() => props.saveRecipe(saveRecipe())}
          variant="outlined"
          sx={{ marginRight: "5px", marginBottom: "10px" }}
        >Save</Button>
        <Button
          onClick={props.handleClose}
          variant="outlined"
          sx={{ marginRight: "30px", marginBottom: "10px" }}
        >Close</Button>
      </DialogActions>
    </Dialog>
  );
}
