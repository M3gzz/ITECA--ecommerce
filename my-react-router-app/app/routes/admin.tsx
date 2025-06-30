import { useState } from "react";
import Sales from "~/admin/sales";
import Users from "~/admin/users";
import { Navbar } from "~/navBar/navbar"
import AddProduct from "./addProduct";

export default function Admin() {

    const buttonStyle = {
        color: "white",
        padding: "10px 20px",
        textDecoration: "none",
        borderRadius: "5px",
        backgroundColor: "#30C5FF",
        margin: "auto 10px",
        cursor: "pointer",
    }

    const buttonContainer = {
        height: "fit-content",
        display: 'grid',
        gridTemplateColumns: 'auto auto auto auto',
        gap: '20px',
        padding: "10px",
        paddingTop: "50px",
        overflow: 'auto'
    }

    let [showUsers, setShowUsers] = useState<boolean>(false);
    let [showSales, setShowSales] = useState<boolean>(false);
    let [showAddProduct, setShowAddProduct] = useState<boolean>(false);

    return (
        <>
            <Navbar />
            {!showUsers && !showSales && !showAddProduct && <div style={buttonContainer}>
                <span style={buttonStyle} onClick={() => {
                    setShowUsers(!showUsers);
                }}>Manage Users</span>
                <span style={buttonStyle} onClick={() => {
                    setShowSales(!showSales);
                }}>View Sales</span>
                <span style={buttonStyle} onClick={() => {
                    setShowAddProduct(!showAddProduct);
                }}>Add a Product</span>
            </div>}
            {showUsers && <Users setShowUsers={setShowUsers} />}
            {showSales && <Sales setShowSales={setShowSales} />}
            {showAddProduct && <AddProduct setShowAddProduct={setShowAddProduct} />}
        </>
    )
}