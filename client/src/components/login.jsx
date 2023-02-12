import { Button, createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const theme = createTheme({
        palette: {
            background: {
                default: '#547958'
            }
        }
    });

    const navigate = useNavigate();
    const onClick = () => {
        navigate("/recipes");
    } 
    
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <div>
            <h1>Login Page</h1>
            </div>
            <Button
                color='secondary'
                onClick={onClick}
            >Login</Button>
        </ThemeProvider>
    );
}