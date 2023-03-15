import { AppBar, Box, Button, ButtonGroup, Container, createTheme, CssBaseline, IconButton, ImageList, ImageListItem, ImageListItemBar, ThemeProvider, Toolbar, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import NavBar from "./navbar";
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';

export default function WeekPlan() {
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

    const [selectedRecipe, setSelectedRecipe] = useState([]);

    useEffect(() => {
        fetchRecipes();
    }, []);

    const handleIncrement = (recipe) => {
        recipe.portion++;
        setPortion(recipe);
    }

    const noImageDefault = "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg?20200913095930";

    const handleDecrement = (recipe) => {
        recipe.portion--;
        setPortion(recipe);
    }

    const removeFromSelected = (recipe) => {
        recipe.portion = 0;
        setPortion(recipe);
    }

    const setPortion = (result) => {
        axios.post("http://" + window.location.hostname + ":3000/recipes/setPortion/" + result.id, result, { withCredentials: true })
            .then(response => {
                if (response.status === 200) {
                    fetchRecipes();
                }
            })
            .catch(err => {
                console.error('There was an error!', err.message);
            });
    };

    const fetchRecipes = () => {
        axios.get("http://" + window.location.hostname + ":3000/recipes/viewShoppingListRecipes", { withCredentials: true })
            .then((response) => {
                setSelectedRecipe(response.data);
            });
    }

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <NavBar value={1} />
            <AppBar elevation={0} sx={{ display: 'flex', justifyContent: 'center', background: "#547958", maxWidth: `calc(100% - 250px)`, ml: '250px', height: '100px' }}>
                <Toolbar sx={{ justifyContent: "center", alignItems: "center" }}>
                    <Typography position='absolute' color="#ECF3A3" component="span" variant="h4">
                        <Box component="span" fontWeight='fontWeightBold'>Planning your week ahead!</Box>
                    </Typography>
                </Toolbar>
            </AppBar>
            <Container maxWidth={false} sx={{ maxWidth: `calc(100% - 250px)`, ml: '250px', mt: 10, display: "flex", justifyContent: "space-evenly" }}>
                <ImageList sx={{ width: 960, overflowX: "hidden" }} cols={4} rowHeight={240}>
                    {typeof selectedRecipe !== 'undefined' && selectedRecipe?.map((item) => (
                        <ImageListItem
                            sx={{
                                "&:hover img": {
                                    filter: "brightness(50%)"
                                },
                                    "&:hover .hiddenField": {
                                    display: "flex"
                                },
                                    "& .hiddenField": {
                                    display: "none"
                                },
                                    "& .Mui-disabled": {
                                    color: "rgba(255, 255, 255, 1) !important"
                                }
                            }}
                            key={item.id}
                        >
                            <img
                                src={`${item.imageURL}?w=240&h=240&fit=crop&auto=format`}
                                srcSet={`${item.imageURL}?w=240&h=240&fit=crop&auto=format&dpr=2 2x`}
                                alt={item.recipeName}
                                onError={e => {
                                    e.currentTarget.onerror = null; 
                                    e.currentTarget.src = `${noImageDefault}?w=240&h=240&fit=crop&auto=format`;
                                    e.currentTarget.srcset = `${noImageDefault}?w=240&h=240&fit=crop&auto=format&dpr=2 2x`
                                }}
                                loading="lazy"
                            />
                            <ImageListItemBar
                                sx={{
                                background:
                                    'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
                                    'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
                                }}
                                title={item.recipeName}
                                position="top"
                                actionIcon={
                                <IconButton
                                    sx={{ color: 'white' }}
                                    aria-label={`selected ${item.recipeName}`}
                                    onClick={() => removeFromSelected(item)}
                                >
                                    <CheckCircleOutlinedIcon />
                                </IconButton>
                                }
                                actionPosition="right"
                            />
                            <Box className="hiddenField" sx={{position: "absolute", mt: "100px", justifyContent: "space-evenly", width: "100%", flexWrap: "wrap" }}>
                                <ButtonGroup variant="contained" size="small" aria-label="small outlined button group">
                                <Button onClick={() => handleDecrement(item)}>-</Button>
                                <Button disabled>{item.portion}</Button>
                                <Button onClick={() => handleIncrement(item)}>+</Button>
                                </ButtonGroup>
                                <Typography sx={{lineHeight: 2}} color="white">Servings</Typography>
                            </Box>
                        </ImageListItem>
                    ))}
                </ImageList>
            </Container>
        </ThemeProvider>
    );
}
