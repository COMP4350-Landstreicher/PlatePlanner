import React, { useEffect } from 'react';
import { Box, Card, CardContent, CardMedia, Container, Grid, Typography } from '@mui/material';
import RecipePopup from './viewRecipe';
import axios from 'axios';

export default function RecipeList(props) {
    const [open, setOpen] = React.useState(false);
    const [recipe, setRecipe] = React.useState(undefined);

    const openPopup = (value) => () => {
        axios.get("http://" + window.location.hostname + ":3000/recipes/getOne/" + value.id, { withCredentials: true })
            .then((response) => {
                setRecipe(response.data);
            });
    };

    useEffect(() => {
        if (typeof recipe !== 'undefined') {
            setOpen(true);
        }
    }, [recipe]);

    const closePopup = () => {
        setOpen(false);
        setRecipe(undefined);
    };

    return (
        <Container sx={{ py: 8 }}>
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
                                background: '#FFFFFE'
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
                                        marginTop: '10%',
                                        width: 250,
                                        height: 250,
                                        boxSizing: 'none',
                                        "&:hover": {
                                            ".MuiTypography-root": {
                                                display: 'block'
                                            },
                                            ".MuiCardMedia-root": {
                                                WebkitFilter: "opacity(0.20)", /* Chrome, Safari, Opera */
                                                filter: "opacity(0.20)",
                                            },
                                            cursor: 'pointer'
                                        }
                                    }}
                                >
                                    <Typography position='absolute' display='none' zIndex='1' marginTop='115px' marginLeft='80px' color='black'>
                                        <Box component="span" fontWeight='fontWeightMedium'>View recipe</Box>
                                    </Typography>
                                    <CardMedia
                                        component="img"
                                        sx={{
                                            width: 250,
                                            height: 250,
                                            boxSizing: 'none',
                                        }}
                                        image={card.imageUrl}
                                        alt="random"
                                    />
                                </Box>
                                <Box sx={{ width: 250 }}>
                                    <CardContent sx={{ flexGrow: 1, pl: 0 }}>
                                        <Typography variant="h6" component="h2">
                                            <Box component="span" fontWeight='fontWeightBold'>{card.recipeName}</Box>
                                        </Typography>
                                    </CardContent>
                                </Box>
                            </Box>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            {(typeof recipe !== 'undefined') && (<RecipePopup value={recipe} open={open} handleClose={closePopup} />)}
        </Container>
    );
}