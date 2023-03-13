import React, { useEffect } from 'react';
import { Box, List, Container, ListItem, ListItemText, Typography } from '@mui/material';
import axios from 'axios';

export default function IngredientList(props) {

    return (
        <Container>
            <List sx={{borderBottom:'3px solid #A0B8A5', color: "#FFFFFE"}} >
                <ListItem key="ROOT" sx={{borderBottom:'3px solid #A0B8A5'}} alignItems="left">
                        <ListItemText primary="Item" primaryTypographyProps={{color: "#FFFFFE"}} sx={{ width:"80%" }} />
                        <ListItemText primary="Quantity" primaryTypographyProps={{color: "#FFFFFE"}} sx={{ width:"10%" }} />
                        <ListItemText primary="Unit" primaryTypographyProps={{color: "#FFFFFE"}} sx={{ width:"10%" }} />
                </ListItem>
                {typeof props.value !== 'undefined' && props.value?.map((ing) => (
                    <ListItem key={ing.name} sx={{borderBottom:'1px solid #A0B8A5'}} alignItems="left">
                        <ListItemText primary={ing.name} primaryTypographyProps={{color: "#FFFFFE"}} sx={{ width:"80%" }} />
                        <ListItemText primary={ing.amount} primaryTypographyProps={{color: "#FFFFFE"}} sx={{ width:"10%" }} />
                        <ListItemText primary={ing.unit} primaryTypographyProps={{color: "#FFFFFE"}} sx={{ width:"10%" }} />
                    </ListItem>
                ))}
            </List>
        </Container>
    );
}