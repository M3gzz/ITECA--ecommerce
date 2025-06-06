import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function Navbar() {


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
    }

    const navIconStyle = {
        color: "white",
        padding: "5px 10px",
        textDecoration: "none",
        margin: "auto 10px",
    }


    return (
        <div style={navBarStyle}>
            <h1 style={navBarTitle}>Local E-commerce</h1>
            <div style={navBarContent}>
                <a href="/login" style={navLinkStyle}>Login</a>
                <a href="/signup" style={navLinkStyle}>Register</a>
                <FontAwesomeIcon style={navIconStyle} icon={faCartShopping} />
            </div>
        </div>
    );
}
