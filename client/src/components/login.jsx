import { Button, createTheme, CssBaseline, ThemeProvider, Box, Typography, Link } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from '../img/logo-white.png'
import axios from 'axios';
import CreateAccountPopup from './createAccountPopup';


function Login() {
	const navigate = useNavigate();
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [open, setOpen] = useState(false);
	const [error, setError] = useState("");

	const theme = createTheme({
		palette: {
			background: {
				default: '#547958'
			}
		}
	});


	const createAccount = () => {
		console.log("Creating account");
		setOpen(true);
	};

	const closePopup = () => {
		setOpen(false);
	};


	const logIn = () => {

		axios.post("http://" + window.location.hostname + ":3000/auth/login", { email: username, password: password }, { withCredentials: true })
			.then((response) => {
				if (response.status === 200) {
					setTimeout(() => { navigate("/recipes"); }, 2000);
					window.location.reload();

				}
				else {
					console.log("Login failed");
				}

			})
			.catch(error => {
				if (error.response) {
					console.log(error.response);
					setError("Login failed!");
					setTimeout(() => { setError(""); }, 5000);
				}
				else {
					console.error('Error Logging In:', error.message);
				}
			});
	}

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<Box sx={{
				m: 'auto',
				mt: '10vh',
				width: '50%',
				padding: '1pc',
				align: 'center',
				textAlign: 'center'
			}}>
				<Box
					component="img"
					sx={{
						align: 'center',
						height: '20vh'
					}}
					alt="PlatePlanner Logo"
					src={logo}
				/><br />
				<Box
					component="input"
					type="text" 
					placeholder="Username" 
					value={username}
					onChange={e => setUsername(e.target.value)}
					sx={{
						m: '.5pc',
						padding: '5px',
						border: 'none',
						borderRadius: '5px',
						width: '30%'
					}} />
				<br />
				<Box
					component="input"
					type="password"
					placeholder="Password"
					value={password}
					onChange={e => setPassword(e.target.value)}
					sx={{
						m: '.5pc',
						padding: '5px',
						border: 'none',
						borderRadius: '5px',
						width: '30%'
					}} />
				<br />
				<Button
					variant="text"
					sx={{
						bgcolor: '#ECF3A3',
						color: '#547958',
						padding: '5px',
						margin: '.5pc',
						border: 'none',
						borderRadius: '5px',
						width: '30%'
					}}
					onClick={logIn}>Log in</Button><br />
				<Typography variant="body1"
					sx={{ color: "#FFFFFE" }}
				>Don't have an account yet?
				</Typography>
				<Link
					component="button"
					onClick={createAccount}
					sx={{
						fontSize: "1rem",
						color: '#ECF3A3'
					}}>
					Create new account
				</Link><br />
				{error ? <Typography variant="body1"
					sx={{ color: "#FFFFFE" }}
				>{error}</Typography> : null}
			</Box>
			<CreateAccountPopup open={open} handleClose={closePopup} />
		</ThemeProvider>
	);
}

export default Login;