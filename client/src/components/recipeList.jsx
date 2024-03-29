import React, {useEffect, useState} from 'react';
import {Alert, Box, Card, CardContent, CardMedia, Checkbox, Container, Grid, Snackbar, Tooltip, Typography} from '@mui/material';
import RecipePopup from './viewRecipe';
import axios from 'axios';
import EditRecipePopup from './addRecipePopup';
import {NoMeals, Restaurant} from '@mui/icons-material';

export default function RecipeList(props) {
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [recipe, setRecipe] = useState(undefined);
  const [error, setError] = useState('');
  const [snackBar, setSnackbar] = useState(false);

  const noImageDefault = 'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg?20200913095930';

  // get recipe data and populate to the popup
  const openPopup = (value) => () => {
    axios.get('http://' + window.location.hostname + ':3000/recipes/getOne/' + value.id, {withCredentials: true})
      .then((response) => {
        setRecipe(response.data);
      });
  };

  // open popup when recipe is set
  useEffect(() => {
    if (typeof recipe !== 'undefined') {
      setOpen(true);
    }
  }, [recipe]);

  // close popup and reset recipe value
  const closePopup = () => {
    setOpen(false);
    setRecipe(undefined);
  };

  // open edit popup and close view recipe popup
  const switchEditPopup = () => {
    setOpen(false);
    setOpenEdit(true);
  };

  // API to update recipe data
  // if failed to update will have a snack bar error
  const updateRecipe = (result) => {
    axios.put('http://' + window.location.hostname + ':3000/recipes/updateRecipe/' + recipe.id, result, {withCredentials: true})
      .then((response) => {
        if (response.status === 200) {
          setOpenEdit(false);
          props.updateRecipe();
        }
      })
      .catch((err) => {
        setError(err.response.data.message);
        setSnackbar(true);
        console.error('There was an error!', err.message);
      });
  };

  // API to change the portion size
  const setPortion = (result) => {
    axios.post('http://' + window.location.hostname + ':3000/recipes/setPortion/' + result.id, result, {withCredentials: true})
      .then((response) => {
        if (response.status === 200) {
          props.updateRecipe();
        }
      })
      .catch((err) => {
        setError(err.response.data.message);
        setSnackbar(true);
        console.error('There was an error!', err.message);
      });
  };

  // select or deselect recipe from week plan
  const updatePortion = (recipeToUpdate, event) => {
    recipeToUpdate.portion = event.target.checked ? 1 : 0;
    setPortion(recipeToUpdate);
  };

  return (
    <Container sx={{py: 8}}>
      <Grid container spacing={4}>
        {typeof props.value !== 'undefined' && props.value?.map((card) => (
          <Grid item key={card.id} xs={12} sm={6} md={4}>
            <Card
              sx={{
                width: 330,
                height: 400,
                display: 'flex',
                flexDirection: 'column',
                borderRadius: '16px',
                boxShadow: 10,
                background: '#FFFFFE',
              }}
            >
              <Box
                display="flex"
                flexDirection='column'
                alignItems='center'
              >
                <Box
                  onClick={openPopup(card)}
                  sx={{
                    'marginTop': '10%',
                    'width': 250,
                    'height': 250,
                    'boxSizing': 'none',
                    '&:hover': {
                      '.MuiTypography-root': {
                        display: 'block',
                      },
                      '.MuiCardMedia-root': {
                        WebkitFilter: 'opacity(0.20)', /* Chrome, Safari, Opera */
                        filter: 'opacity(0.20)',
                      },
                      'cursor': 'pointer',
                    },
                  }}
                >
                  <Typography
                    position='absolute'
                    display='none'
                    zIndex='1'
                    marginTop='115px'
                    marginLeft='80px'
                    color='black'
                  >
                    <Box component="span" fontWeight='fontWeightMedium'>View recipe</Box>
                  </Typography>
                  <CardMedia
                    component="img"
                    sx={{
                      width: 250,
                      height: 250,
                      boxSizing: 'none',
                    }}
                    image={card.imageURL === '' ? noImageDefault : card.imageURL}
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = noImageDefault;
                    }}
                    alt="Recipe Image"
                  />
                </Box>
                <Box sx={{width: 250}}>
                  <CardContent sx={{pl: 0, pr: 1, display: 'flex', justifyContent: 'space-between'}}>
                    <Typography
                      variant="h6"
                      component="h2"
                      sx={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: '2',
                        WebkitBoxOrient: 'vertical',
                      }}
                    >
                      <Box component="span" fontWeight='fontWeightBold'>{card.recipeName}</Box>
                    </Typography>
                    <Tooltip title={card.portion === 0 ? 'Not in week plan' : 'In week plan'}>
                      <Checkbox
                        color="secondary"
                        icon={<NoMeals />}
                        checkedIcon={<Restaurant />}
                        checked={card.portion > 0}
                        onChange={(event) => updatePortion(card, event)}
                      />
                    </Tooltip>
                  </CardContent>
                </Box>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
      {
        (typeof recipe !== 'undefined') && (<RecipePopup
          value={recipe}
          open={open}
          handleClose={closePopup}
          switchToEdit={switchEditPopup}
          deleteRecipe={props.deleteRecipe}
        />)
      }
      {
        (typeof recipe !== 'undefined') && (<EditRecipePopup
          open={openEdit}
          editRecipe={recipe}
          handleClose={() => setOpenEdit(false)}
          saveRecipe={(result) => updateRecipe(result)}
        />)
      }
      <Snackbar open={snackBar} autoHideDuration={6000} onClose={() => setSnackbar(false)}>
        <Alert onClose={() => setSnackbar(false)} severity="error" sx={{width: '100%'}}>
          {error}
        </Alert>
      </Snackbar>
    </Container>
  );
}
