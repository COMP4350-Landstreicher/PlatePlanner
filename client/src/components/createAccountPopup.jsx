import { Box, Button, Dialog, DialogActions, CssBaseline, DialogContent, Typography } from '@mui/material';
import React, { useState } from 'react';
import logo from '../img/logo-white.png'
import axios from 'axios';

//Check that entered passwords are identical
export function checkPasswords(p1, p2) {
	if (p1 === p2) {
		return true;
	} else return false;
}

//Render create account popup
export default function CreateAccountPopup(props) {
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [firstname, setFirstName] = useState("");
	const [lastname, setLastName] = useState("");
	const [password, setPassword] = useState("");
	const [password2, setPassword2] = useState("");
	const [error, setError] = useState("");


	const createAccount = () => {
		//Check that passwords are identical and tell the user if they are not
		if (!checkPasswords(password, password2)) {

			setError("Passwords are not the same!");
			setTimeout(() => { setError(""); }, 5000);

		}
		else {
			//Register them and check for success
			axios.post("http://" + window.location.hostname + ":3000/auth/register", { email: email, password: password, userName: username, firstName: firstname, lastName: lastname })
				.then((response) => {
					if (response.status === 200) {
						setError("Successful Signup!");
						setTimeout(() => { props.handleClose(); }, 5000);
						setTimeout(() => { setError(""); }, 3000);
					}
					else {
						console.log("Signup failed"); //They screwed up
					}

				})
				.catch(error => { //They screwed up
					if (error.response) {
						console.log(error.response);
						setError("Signup failed!");
						setTimeout(() => { setError(""); }, 5000);
					}
					else { //We screwed up
						console.error('Error Signing Up:', error.message);
						setError("Signup failed!");
						setTimeout(() => { setError(""); }, 5000);
					}
				});
		}
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

			<CssBaseline />
			<DialogContent sx={{ background: '#A0B8A5' }}>
				<Box width='100%' minHeight='50%' maxHeight='800px' sx={{
					m: 'auto',
					width: '100%',
					padding: '1pc',
					align: 'center',
					textAlign: 'center'
				}}>
					<Box
						component="img"
						sx={{
							height: '20vh'
						}}
						alt="PlatePlanner Logo"
						src={logo}
					/>
					<Typography variant="h1"
						sx={{
							color: "#547958",
							fontSize: "2rem",
							m: "0"
						}}
					>
						<b>Create Account</b>
					</Typography>
					<Typography variant="h1"
						sx={{
							color: "#547958",
							fontSize: "2rem",
							mb: "0"
						}}
					>
						to get started now!
					</Typography>
					<Box
						component="input"
						type="text"
						placeholder="Email"
						value={email}
						onChange={e => setEmail(e.target.value)}
						sx={{
							m: '.5pc',
							padding: '5px',
							border: '2px solid #547958',
							borderRadius: '5px',
							width: '30%'
						}} />
					<br />
					<Box
						component="input"
						type="text"
						placeholder="Username"
						value={username}
						onChange={e => setUsername(e.target.value)}
						sx={{
							m: '.5pc',
							padding: '5px',
							border: '2px solid #547958',
							borderRadius: '5px',
							width: '30%'
						}} />
					<br />
					<Box
						component="input"
						type="text"
						placeholder="First Name"
						value={firstname}
						onChange={e => setFirstName(e.target.value)}
						sx={{
							m: '.5pc',
							padding: '5px',
							border: '2px solid #547958',
							borderRadius: '5px',
							width: '30%'
						}} />
					<br />
					<Box
						component="input"
						type="text"
						placeholder="Last Name"
						value={lastname}
						onChange={e => setLastName(e.target.value)}
						sx={{
							m: '.5pc',
							padding: '5px',
							border: '2px solid #547958',
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
							border: '2px solid #547958',
							borderRadius: '5px',
							width: '30%'
						}} />
					<br />
					<Box
						component="input"
						type="password"
						placeholder="Confirm Password"
						value={password2}
						onChange={e => setPassword2(e.target.value)}
						sx={{
							m: '.5pc',
							padding: '5px',
							border: '2px solid #547958',
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
							border: '2px solid #547958',
							borderRadius: '5px',
							width: '30%'
						}}
						onClick={createAccount}>Create Account</Button><br />
					{error ? <Typography variant="body1"
						sx={{ color: "#FFFFFE" }}
					>{error}</Typography> : null}
				</Box>
			</DialogContent>

			<DialogActions sx={{ background: '#A0B8A5' }}>
				<Button
					onClick={props.handleClose}

					sx={{
						marginRight: "30px",
						marginBottom: "10px",
						bgcolor: '#ECF3A3',
						color: '#547958',
						padding: '5px',
						margin: '.5pc',
						border: '2px solid #547958',
						borderRadius: '5px'
					}}
				>Close</Button>
			</DialogActions>
		</Dialog>

	);
}