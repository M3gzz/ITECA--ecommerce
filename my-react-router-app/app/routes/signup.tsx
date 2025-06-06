import { width } from "@fortawesome/free-solid-svg-icons/fa0";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Signup Local Marketplace" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Signup(){

    const signupPageContainer ={
        width: "100%",
        height: "100%",
        display: "flex",
    }
    const signupContainer={
        width: "40%",
        height: "fit-content",
        margin: "auto",
        backgroundColor: "#153B50",
        borderRadius: "10px",
    }

    const signupHeading : React.CSSProperties ={
        color: "#30C5FF",
        margin: "0",
        padding: "20px",
        textAlign: "center"
    }

    const signupForm = {
        display: 'grid',
        padding: '20px',
    }

    return (
        <div style={signupPageContainer}>
            <div style={signupContainer}>
                <h1 style={signupHeading}>Signup</h1>
                <form style={signupForm}>
                    <label style={{marginBottom: '10px', color: 'white'}} htmlFor="username">Username</label>
                    <input style={{marginBottom: '20px', height: '2rem'}} type="text" id="username" name="username" />
                    <label style={{marginBottom: '10px', color: 'white'}} htmlFor="email">Email</label>
                    <input style={{marginBottom: '20px', height: '2rem'}} type="email" id="email" name="email" />
                    <label style={{marginBottom: '10px', color: 'white'}} htmlFor="password">Password</label>
                    <input style={{marginBottom: '20px', height: '2rem'}} type="password" id="password" name="password" />
                    <button style={{marginTop: '10px', marginBottom: '20px', height: '3rem', backgroundColor: '#30C5FF', color: 'white'}}type="submit">Signup</button>
                </form>
            </div>
        </div>


    );
}