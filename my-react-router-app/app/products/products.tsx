import axios from "axios"
import { useEffect, useState, type JSX } from "react"

interface productProps {
    category?: string;
}

export function Products(props: productProps) {
    const productContainer = {
        height: "fit-content",
        display: 'grid',
        gridTemplateColumns: 'auto auto auto auto',
        gap: '20px',
        padding: "10px",
        overflow: 'auto'
    }
    const productCard = {
        color: "white",
        padding: "10px 30px",
        height: "25rem",
        width: "20rem",
        backgroundColor: "#153B50",
        borderRadius: "10px"
    }
    const featuredProductContainer = {
        margin: "20px 10px",
    }
    const productCardImageContainer = {
        width: "100%",
        height: "60%",
        display: "flex"
    }
    const productCardImage = {
        width: "90%",
        height: "100%",
        margin: "auto"
    }

    const contentHeading = {
        marginBottom: "0",
    }

    const buttonStyle = {
        color: "white",
        padding: "5px 10px",
        textDecoration: "none",
        borderRadius: "5px",
        backgroundColor: "#30C5FF",
        margin: "10px 0px",
        cursor: "pointer",
        display: "inline-block",
    }

    const [products, setProducts] = useState<JSX.Element[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    function addCartItem(product: any) {
        const user = JSON.parse(localStorage.getItem("user") || "null");
        if (!user) {
            alert("Please log in to add items to your cart.");
            return;
        }


        if (product) {
            let cartItem = {
                name: product.name,
                price: product.price,
                id: product.id
            }
            localStorage.getItem("cartItems") ?
                localStorage.setItem("cartItems", JSON.stringify([...JSON.parse(localStorage.getItem("cartItems") || "[]"), cartItem])) :
                localStorage.setItem("cartItems", JSON.stringify([cartItem]));
        }
    }

    useEffect(() => {
        setLoading(true);
        async function fetchProducts() {
            await axios.get(`https://meta-aura-463810-f3.uc.r.appspot.com/products${props.category ? `?categoryId=${props.category}` : ''}`).then(res => {
                if (res.data) {
                    setProducts(res.data.map((product: any) => (
                        <div style={productCard} key={product.id}>
                            <h2>{product.name}</h2>
                            <div style={productCardImageContainer}>
                                <img alt="placeholder" style={productCardImage} src={product.imageUrl || "./stockPhoto.jpg"} />
                            </div>
                            <p style={{marginBottom:"0px"}}>Price: R{product.price}</p>
                            <span style={buttonStyle} onClick={() => {addCartItem(product)}}>Add to Cart</span>
                        </div>
                    )));
                }
                setLoading(false)
            });
        }
        fetchProducts();
    }, [props.category]);

    return (
        <div style={featuredProductContainer}>
            <h2 style={contentHeading}>{!props.category && 'Featured '}Products</h2>
            <div style={productContainer}>
                {products.length > 0 && !loading ? products : <p>Loading products...</p>}
            </div>
        </div>
    )
}