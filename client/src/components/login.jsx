import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import React from "react";
import { Component } from "react";
import LoginButton from "./loginButton";

class Login extends Component {
    state = {  } 
    render() { 
        let theme = createTheme({
            palette: {
                background: {
                    default: '#547958'
                }
            }
        });
        
        return (
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <div>
                <h1>Login Page</h1>
                </div>
                <LoginButton />
            </ThemeProvider>
        );
    }
}
 
export default Login;