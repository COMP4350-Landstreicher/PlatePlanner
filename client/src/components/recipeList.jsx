import React from 'react';
import { Box, Card, CardContent, CardMedia, Container, Grid, Typography } from '@mui/material';

export default function RecipeList(props) {
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
                            <Box display="flex" flexDirection='column' alignItems='center'>
                                <CardMedia
                                    component="img"
                                    sx={{
                                        marginTop: '10%',
                                        width: 250,
                                        height: 250,
                                        boxSizing: 'none'
                                    }}
                                    image={card.image}
                                    alt="random"
                                />
                                <Box sx={{ width: 250 }}>
                                    <CardContent sx={{ flexGrow: 1, pl: 0 }}>
                                        <Typography variant="h6" component="h2">
                                            <Box component="span" fontWeight='fontWeightBold'>{card.name}</Box>
                                        </Typography>
                                    </CardContent>
                                </Box>
                            </Box>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}