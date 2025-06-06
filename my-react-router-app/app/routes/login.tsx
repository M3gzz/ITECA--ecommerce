import { width } from "@fortawesome/free-solid-svg-icons/fa0";
import type { Route } from "./+types/home";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";


export function meta({}: Route.MetaArgs) {
    return [
        { title: "Login Local Marketplace" },
        { name: "description", content: "Welcome to React Router!" },
    ];
}

export default function Login(){

        const loginpPageContainer ={
                width: "100%",
                height: "100%",
                display: "flex",
        }
        const loginContainer={
                width: "40%",
                height: "fit-content",
                margin: "auto",
                backgroundColor: "#153B50",
                borderRadius: "10px",
        }

        const loginHeading : React.CSSProperties ={
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

        return (
                <div style={loginpPageContainer}>
                    
                        <div style={loginHeading}>
                                
                        </div>
                        <div style={loginContainer}>
                        <h1 style={loginHeading}>Login</h1>
                                 <div style = {loginHomeContainer}>
                                 <a href="/" ><FontAwesomeIcon style={loginIconStyle} icon={faHome} /></a>
                                
                                </div>
                                
                                <form style={loginForm}>
                                        <label style={{marginBottom: '10px', color: 'white'}} htmlFor="username">Username</label>
                                        <input style={{marginBottom: '20px', height: '2rem'}} type="username" id="username" name="username" />
                                        <label style={{marginBottom: '10px', color: 'white'}} htmlFor="password">Password</label>
                                        <input style={{marginBottom: '20px', height: '2rem'}} type="password" id="password" name="password" />
                                        <button style={{marginTop: '10px', marginBottom: '20px', height: '3rem', backgroundColor: '#30C5FF', color: 'white'}}type="submit">Login</button>
                                </form>
                                
                        </div>
                </div>


        );
}