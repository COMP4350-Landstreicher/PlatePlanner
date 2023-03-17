import { Check } from '@mui/icons-material';
import { Box, Button, Dialog, DialogActions, DialogContent, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import DelPopup from './delPopup'

export default function RecipePopup(props) {

    const noImageDefault = "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg?20200913095930";

    // get ingredient display text
    const getIngredientText = (ingredient) => {
        return (ingredient.ingredientUnit === 'count')
            ? ingredient.ingredientAmount + " " + ingredient.ingredientName
            : ingredient.ingredientAmount + ingredient.ingredientUnit + " " + ingredient.ingredientName;
    }

    const handleDelClose = () => {
        console.log(delResponse)
        if (delResponse) {
            props.deleteRecipe(props.value.id);
            props.handleClose();
        }
        setDelOpen(false);
    }

    const handleDeleteButton = () => {
        setDelOpen(true)
    }
    const [delOpen, setDelOpen] = useState(false);
    const [delResponse, setDelResponse] = useState(false);

    useEffect(() => {
        handleDelClose();
    }, [delResponse]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <Dialog
            open={props.open}
            onClose={props.handleClose}
            scroll='paper'
            aria-labelledby="dialog"
            fullWidth={true}
            maxWidth='md'
        >
            {(delOpen === true) && (<DelPopup setResponse={setDelResponse} open={delOpen} handleClose={handleDelClose} />)}
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
                                alt="Recipe Image"
                                src={props.value.imageURL === "" ? noImageDefault : props.value.imageURL}
                                onError={e => {
                                    e.currentTarget.onerror = null;
                                    e.currentTarget.src = noImageDefault;
                                }}
                            />
                            <Typography variant="h4" width="90%" color="#283d25">
                                <Box component="span" fontWeight='fontWeightBold'>{props.value.recipeName}</Box>
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
                                    {props.value.instructions?.split("\n").map((step) => (
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
                                    {props.value.ingredients?.map((ing) => (
                                        <ListItem key={ing.ingredientName} sx={{ paddingLeft: '0' }}>
                                            <ListItemIcon>
                                                <Check color='secondary' fontSize="small" />
                                            </ListItemIcon>
                                            <ListItemText primary={getIngredientText(ing)} />
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
                    onClick={handleDeleteButton}
                    variant="outlined"
                    color="secondary"
                    sx={{ marginRight: "30px", marginBottom: "10px", borderColor: "#FF0000", color: "#FF0000" }}
                >Delete</Button>
                <Button
                    onClick={props.switchToEdit}
                    variant="outlined"
                    color="secondary"
                    sx={{ marginRight: "30px", marginBottom: "10px" }}
                >Edit</Button>
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
