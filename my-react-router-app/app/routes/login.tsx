import { width } from "@fortawesome/free-solid-svg-icons/fa0";
import type { Route } from "./+types/home";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";


export function meta({ }: Route.MetaArgs) {
	return [
		{ title: "Login Local Marketplace" },
		{ name: "description", content: "Welcome to React Router!" },
	];
}

export default function Login() {

	const loginpPageContainer = {
		width: "100%",
		height: "100%",
		display: "flex",
	}
	const loginContainer = {
		width: "40%",
		height: "fit-content",
		margin: "auto",
		backgroundColor: "#153B50",
		borderRadius: "10px",
	}

	const loginHeading: React.CSSProperties = {
		color: "#30C5FF",
		margin: "0",
		padding: "20px",
		textAlign: "center"
	}

	const loginForm = {
		display: 'grid',
		padding: '20px',
	}
	const loginHomeContainer = {
		width: '100%',
		display: 'flex',
		justifyContent: 'center',
		paddingRight: '20px',
	}
	const loginIconStyle = {
		fontSize: '30px',
		color: '#30C5FF',
		padding: '20px',
		margin: 'auto',

	}

	function handleLogin(username: string, password: string) {
        if (!username || !password) {
            alert("Please enter both username and password.");
            return;
        }

		axios.post('https://meta-aura-463810-f3.uc.r.appspot.com/login', {
			username: username,
			password: password,
		}).then((response) => {
			if (response.data && response.status !== 401) {
				console.log("Login successful");
				// Redirect to home or dashboard
				window.location.href = "/";
                localStorage.setItem('user', JSON.stringify(response.data)); // Store user in local storage
			} else {
				console.error("Login failed: ", response.data.message);
				alert("Login failed: " + response.data.message);
			}
		}).catch((error) => {
			console.error("Error during login: ", error);
			alert("An error occurred during login. Please try again.");
		});

	}

	return (
		<div style={loginpPageContainer}>

			<div style={loginHeading}>

			</div>
			<div style={loginContainer}>
				<h1 style={loginHeading}>Login</h1>
				<div style={loginHomeContainer}>
					<a href="/" ><FontAwesomeIcon style={loginIconStyle} icon={faHome} /></a>

				</div>

				<form style={loginForm} onSubmit={(e) => {
					e.preventDefault();
					const formData = new FormData(e.currentTarget);
					const username = formData.get('username') as string;
					const password = formData.get('password') as string;
                    handleLogin(username, password);
                    e.currentTarget.reset(); // Reset the form after submission
				}}>
					<label style={{ marginBottom: '10px', color: 'white' }} htmlFor="username">Username</label>
					<input style={{ marginBottom: '20px', height: '2rem' }} type="username" id="username" name="username" />
					<label style={{ marginBottom: '10px', color: 'white' }} htmlFor="password">Password</label>
					<input style={{ marginBottom: '20px', height: '2rem' }} type="password" id="password" name="password" />
					<button style={{ marginTop: '10px', marginBottom: '20px', height: '3rem', backgroundColor: '#30C5FF', color: 'white' }} type="submit">Login</button>
				</form>

			</div>
		</div>


	);
}