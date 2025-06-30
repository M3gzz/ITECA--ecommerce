import { faCartShopping, faCog } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

export function Navbar(props: { setShowCart?: (show: boolean) => void }) {


    const navBarStyle = {
        padding: "10px",
        width: "100%",
        height: "3rem",
        backgroundColor: "#153B50",
        display: "flex",
        borderBottom: "1px solid #30C5FF",
        boxShadow: "0px 2px 5px 0px rgba(104, 217, 255, 0.75)",
    };
    const navBarTitle = {
        display: "flex",
        width: "fit-content",
        margin: "auto 0 auto 20px",
        color: "#30C5FF",
        cursor:"pointer"
    }
    const navBarContent = {
        display: "flex",
        width: "fit-content",
        margin: "auto 20px auto auto",

    }
    const navLinkStyle = {
        color: "white",
        padding: "5px 10px",
        textDecoration: "none",
        borderRadius: "5px",
        backgroundColor: "#30C5FF",
        margin: "auto 10px",
        cursor: "pointer"
    }

    const navIconStyle = {
        color: "white",
        padding: "5px 10px",
        textDecoration: "none",
        margin: "auto 10px",
        cursor: "pointer",
    }

    let [user, setUser] = useState<any>(null);

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem("user") || "null")); // Retrieve user from local storage
    }, [])

    function logout() {
        localStorage.removeItem("user");
        setUser(null);
        window.location.href = "/login"; // Redirect to login page after logout
    }


    return (
        <div style={navBarStyle}>
            <h1 style={navBarTitle} onClick={() => {
                window.location.href = "/"; // Redirect to home page
            }}>Local E-commerce</h1>
            {!user && user !== "null" ? <div style={navBarContent}>
                <a href="/login" style={navLinkStyle}>Login</a>
                <a href="/signup" style={navLinkStyle}>Register</a>
                <FontAwesomeIcon style={navIconStyle} icon={faCartShopping} onClick={() => props.setShowCart && props.setShowCart(true)} />
            </div> :
                <div style={navBarContent}>
                    {user.role === "admin" && <a href="/admin" style={navLinkStyle}>Admin Portal</a>}
                    <span style={navLinkStyle}>Hello {user.name}</span>
                    <span style={navLinkStyle} onClick={() => logout()}>Logout</span>
                    <FontAwesomeIcon style={navIconStyle} icon={faCartShopping} onClick={() => props.setShowCart && props.setShowCart(true)}/>
                </div>}
        </div>
    );
}
