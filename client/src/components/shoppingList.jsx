import { Container, createTheme, CssBaseline, ThemeProvider, Typography } from "@mui/material";
import React from "react";
import { Component } from "react";
import NavBar from "./navbar";

class ShoppingList extends Component {
    state = {}
    render() {
        let theme = createTheme({
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

        return (
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <NavBar value={2} />
                <Container maxWidth={false} sx={{ maxWidth: `calc(100% - 250px)`, ml: '250px' }}>
                    <Typography color="black">Shopping List Page</Typography>
                </Container>
            </ThemeProvider>
        );
    }
}

export default ShoppingList;