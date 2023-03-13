import { alpha, InputBase, styled } from "@mui/material";
import React from "react";
import SearchIcon from '@mui/icons-material/Search';

const Search = styled('div')(({ theme }) => ({
    borderRadius: '15px',
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    width: '40%',
    paddingTop: '5px',
    paddingBottom: '5px'
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(1, 2),
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 10, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        width: '390px',
    },
}));

export function search(recipeList, value) {
    return recipeList.filter((recipe) => recipe.recipeName.toLowerCase().includes(value.toLowerCase()));
}

export default function SearchBar(props) {

    const searchRecipe = (event) => {
        return search(props.value, event.target.value);
    }

    return (
        <Search>
            <SearchIconWrapper>
                <SearchIcon color="secondary" />
            </SearchIconWrapper>
            <StyledInputBase
                placeholder="Finding any recipe?"
                type="search"
                inputProps={{ 'aria-label': 'search' }}
                onChange={(event) => props.filterRecipe(searchRecipe(event))}
            />
        </Search>
    );
}
