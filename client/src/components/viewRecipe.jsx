import { Check } from '@mui/icons-material';
import { Box, Button, Dialog, DialogActions, DialogContent, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
import React from 'react';


export default function RecipePopup(props) {

    const getIngredientText = (ingredient) => {
        return (ingredient.unit === 'count') 
            ? ingredient.amount + " " + ingredient.name
            : ingredient.amount + ingredient.unit + " " + ingredient.name;
    }

    return (
        <Dialog
            open={props.open}
            onClose={props.handleClose}
            scroll='paper'
            aria-labelledby="dialog"
            fullWidth={true}
            maxWidth='md'
        >
            {(typeof props.value !== 'undefined') && (
                <DialogContent>
                    <Box width='100%' display='flex' flexDirection='row' minHeight='50%' maxHeight='600px'>
                        <Box width='50%' marginLeft='20px'>
                            <Box
                                component="img"
                                sx={{
                                    width: '90%',
                                    mt: '30px',
                                    mb: '15px',
                                    objectFit: 'cover',
                                    aspectRatio: '1/1'
                                }}
                                alt="Your logo."
                                src={props.value.image}
                            />
                            <Typography variant="h4" width="90%" color="#283d25">
                                <Box component="span" fontWeight='fontWeightBold'>{props.value.name}</Box>
                            </Typography>
                            <Typography variant="body1" width="90%" marginTop='15px'>
                                <Box component="span" fontWeight='fontWeightMedium'>{props.value.description}</Box>
                            </Typography>
                        </Box>
                        <Box width='50%' marginTop='23px'>
                           <Typography variant="h6" width="90%" color="#283d25">
                                <Box component="span" fontWeight='fontWeightBold'>Directions</Box>
                            </Typography>
                            <Box sx={{ maxHeight: '40%', overflow: "auto" }}>
                                <List >
                                    {props.value.directions.split("\n").map((step) => (
                                        <ListItem
                                            key={step}
                                            sx={{ paddingLeft: '0', borderBottom: '1px solid #283d25' }}
                                        >
                                            <ListItemText primary={step} />
                                        </ListItem>
                                    ))}
                                </List>
                            </Box>
                            <Typography variant="h6" width="90%" marginTop='40px' color="#283d25">
                                <Box component="span" fontWeight='fontWeightBold'>Ingredients</Box>
                            </Typography>
                            <Box sx={{ maxHeight: '40%', overflow: "auto" }}>
                                <List >
                                    {props.value.ingredients.map((ingredient) => (
                                        <ListItem key={ingredient.name} sx={{ paddingLeft: '0' }}>
                                            <ListItemIcon>
                                                <Check color='secondary' fontSize="small"/>
                                            </ListItemIcon>
                                            <ListItemText primary={getIngredientText(ingredient)} />
                                        </ListItem>
                                    ))}
                                </List>
                            </Box>
                        </Box>
                    </Box>
                </DialogContent>
            )}
            <DialogActions>
                <Button
                    onClick={props.handleClose}
                    variant="outlined"
                    color="secondary"
                    sx={{ marginRight: "30px", marginBottom: "10px" }}
                >Close</Button>
            </DialogActions>
        </Dialog>
    );
}