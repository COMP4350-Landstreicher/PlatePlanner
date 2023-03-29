import React from 'react';
import { List, Container, ListItem, ListItemText } from '@mui/material';


export default function IngredientList(props) {
  //Component to create table to list ingredients
  return (
    <Container>
      <List sx={{ borderBottom: '3px solid #A0B8A5', color: "#FFFFFE" }} >
        <ListItem key="ROOT" sx={{ borderBottom: '3px solid #A0B8A5' }} >
          <ListItemText primary="Item" primaryTypographyProps={{ color: "#FFFFFE" }} sx={{ width: "80%" }} />
          <ListItemText primary="Quantity" primaryTypographyProps={{ color: "#FFFFFE" }} sx={{ width: "10%" }} />
          <ListItemText primary="Unit" primaryTypographyProps={{ color: "#FFFFFE" }} sx={{ width: "10%" }} />
        </ListItem>
        {typeof props.value !== 'undefined' && props.value?.map((ing) => (
          <ListItem key={ing.ingredientName + ing.ingredientUnit} sx={{ borderBottom: '1px solid #A0B8A5' }} >
            <ListItemText primary={ing.ingredientName} primaryTypographyProps={{ color: "#FFFFFE" }} sx={{ width: "80%" }} />
            <ListItemText primary={ing.totalAmount} primaryTypographyProps={{ color: "#FFFFFE" }} sx={{ width: "10%" }} />
            <ListItemText primary={ing.ingredientUnit} primaryTypographyProps={{ color: "#FFFFFE" }} sx={{ width: "10%" }} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
}