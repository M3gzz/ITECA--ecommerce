import axios from "axios";
import { useEffect, useState } from "react";

export default function AddProduct(props: { setShowAddProduct: (show: boolean) => void }) {
    const buttonStyle = {
        color: "white",
        padding: "10px 20px",
        textDecoration: "none",
        borderRadius: "5px",
        backgroundColor: "#30C5FF",
        margin: "20px 0",
        cursor: "pointer",
        display: "inline-block",
    }

    const [product, setProduct] = useState({
        name: "",
        price: 0,
        imgurl: "",
        quantity: 0,
        isFeatured: 0,
        categoryId: 0
    });
    const [categories, setCategories] = useState<any[]>([]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setProduct((prev: any) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleCategoryChanged = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedCategoryId = e.target.value;
        setProduct((prev: any) => ({
            ...prev,
            categoryId: selectedCategoryId,
        }));
    };

    const handleAddProduct = () => {
        product.quantity = parseInt(product.quantity.toString(), 10);
        product.price = parseFloat(product.price.toString());
        product.categoryId = parseInt(product.categoryId.toString(), 10);
        
        product.isFeatured = product.isFeatured ? 1 : 0; // Convert boolean to integer for database

        console.log("Adding product:", product);
        axios.post(`https://meta-aura-463810-f3.uc.r.appspot.com/addProduct`, product)
            .then(res => {
                if (res.data.success) {
                    console.log("Product added successfully:", res.data);
                    props.setShowAddProduct(false);
                } else {
                    console.error("Failed to add product:", res.data.message);
                }
            }).catch(err => {
                console.error("Error adding product:", err);
            });

    };

    async function fetchCategories() {
        // Fetch categories from the servera
        await axios.get(`https://meta-aura-463810-f3.uc.r.appspot.com/categories`)
            .then(res => {
                if (res.data) {
                    setCategories(res.data);
                    console.log("Categories fetched successfully:", res.data);
                } else {
                    console.error("No categories found.");
                }
            }).catch(err => {
                console.error("Error fetching categories:", err);
            });
    }

    useEffect(() => {
        fetchCategories();
    }, [])

    return (
        <div style={{ padding: "0px 20px" }}>
            <span style={buttonStyle} onClick={() => {
                props.setShowAddProduct(false);
            }}>Back to Admin Portal</span>
            <div>
                <form
                    style={{ display: "flex", flexDirection: "column", gap: "12px", maxWidth: 400 }}
                    onSubmit={e => {
                        e.preventDefault();
                        handleAddProduct();
                    }}
                >
                    <label>
                        Name:
                        <input
                            type="text"
                            name="name"
                            value={product.name}
                            style={{ marginLeft: "10px" }}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>
                        Price:
                        <input
                            type="number"
                            name="price"
                            value={product.price}
                            style={{ marginLeft: "10px" }}
                            onChange={handleChange}
                            required
                            min="0"
                            step="0.01"
                        />
                    </label>
                    <label>
                        Image URL:
                        <input
                            type="text"
                            name="imgurl"
                            value={product.imgurl}
                            style={{ marginLeft: "10px" }}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Quantity:
                        <input
                            type="number"
                            name="quantity"
                            value={product.quantity}
                            onChange={handleChange}
                            style={{ marginLeft: "10px" }}
                            required
                            min="0"
                        />
                    </label>
                    <label>
                        Featured on Home Page:
                        <input
                            type="checkbox"
                            name="isFeatured"
                            checked={product.isFeatured === 1 ? true : false}
                            style={{ marginLeft: "10px" }}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Category:
                        <select
                            name="categoryId"
                            onChange={handleCategoryChanged}
                            style={{ marginLeft: "10px" }}
                            required
                        >
                            <option value="">Select a category</option>
                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </label>
                    <button type="submit" style={buttonStyle}>
                        Add Product
                    </button>
                </form>
            </div>
        </div>
    )
}