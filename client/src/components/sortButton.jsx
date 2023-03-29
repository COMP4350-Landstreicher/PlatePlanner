import {FormControl, InputLabel, MenuItem, Select} from '@mui/material';
import React, {useState} from 'react';

export default function SortButton(props) {
  const [selected, setSelected] = useState('');

  const sortRecipe = (event) => {
    setSelected(event.target.value);
    props.sortRecipe(event.target.value);
  };

  return (
    <FormControl variant="filled" sx={{m: 1, minWidth: 150}}>
      <InputLabel id="field" sx={{color: '#00000045', marginTop: '-1px'}} >Sort</InputLabel>
      <Select
        sx={{
          'borderRadius': '15px',
          'height': 50,
          'backgroundColor': '#FFFFFF25',
          '&:hover': {
            backgroundColor: '#FFFFFF45',
          },
          '&.Mui-focused': {
            backgroundColor: '#FFFFFF45',
          },

        }}
        id="selectField"
        value={selected}
        onChange={sortRecipe}
        disableUnderline
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        <MenuItem value={'nameAsc'}>Name: A to Z</MenuItem>
        <MenuItem value={'nameDes'}>Name: Z to A</MenuItem>
        <MenuItem value={'dateAsc'}>Oldest</MenuItem>
        <MenuItem value={'dateDes'}>Latest</MenuItem>
      </Select>
    </FormControl>
  );
}
