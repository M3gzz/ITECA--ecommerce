import React, { useState } from "react";

export default function Cart(props: { setShowCart: (show: boolean) => void, showCart: boolean }) {

    const [cartItems, setCartItems] = useState<any[]>(localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems") || "[]") : []);

    const handlePurchase = () => {
        alert("Purchase successful!");
        props.setShowCart(false);
        setCartItems([]);
    };

    const total = cartItems.reduce((sum, item) => sum + parseInt(item.price) * 1, 0);

    return (
        <>
            {/* <button onClick={() => props.setShowCart(true)}>View Cart</button> */}
            {props.showCart && (
                <div
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "100vw",
                        height: "100vh",
                        background: "rgba(0,0,0,0.5)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        zIndex: 1000,
                    }}
                >
                    <div
                        style={{
                            background: "#fff",
                            padding: 24,
                            borderRadius: 8,
                            minWidth: 400,
                            boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                        }}
                    >
                        <h2>Cart Items</h2>
                        {cartItems.length === 0 ? (
                            <p>Your cart is empty.</p>
                        ) : (
                            <table style={{ width: "100%", marginBottom: 16 }}>
                                <thead>
                                    <tr>
                                        <th style={{textAlign: "left"}}>Name</th>
                                        <th style={{textAlign: "left"}}>Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cartItems.map((item) => (
                                        <tr key={item.id}>
                                            <td>{item.name}</td>
                                            <td>R{item.price}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                        <div style={{ marginBottom: 16 }}>
                            <strong>Total: R{total.toFixed(2)}</strong>
                        </div>
                        <button onClick={handlePurchase} disabled={cartItems.length === 0}>
                            Purchase
                        </button>
                        <button onClick={() => props.setShowCart(false)} style={{ marginLeft: 8 }}>
                            Close
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}