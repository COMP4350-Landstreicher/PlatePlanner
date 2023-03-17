import axios from 'axios';
import { useNavigate } from "react-router-dom";
const AuthCheck = () => { //Code to check if logged in. Unused
	const navigate = useNavigate();
	axios.get("http://" + window.location.hostname + ":3000/test", { withCredentials: true }).then((response) => {
		if (response.status === 200) {
			console.log("Login detected");
			navigate("/recipes");
		}
		else {
			console.log("Error checking login");
			console.log(response);
		}

	})
		.catch(error => {
			if (error.response) {
				if (error.response.status === 401) {
					console.log("No Login detected");
					if (!('' + window.location).includes("login")) navigate("/login");
				}
				else {
					console.log("Error checking login");
					console.log(error.response);
				}
			}
			else {
				console.log("Error checking login");
				console.log(error.response);
			}
		});


}

export default AuthCheck;
