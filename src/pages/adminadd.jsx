import React, { useEffect, useState } from "react";
import AdminHeader from "../component/adminheader";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { supabase } from "../supabase";
import { API_BASE_URL } from "./apiurl";
export default function AddProduct() {
    const navigate = useNavigate();
    const [product, setProduct] = useState({
        name: "",
        price: "",
        quantity: "",
        category: "hoodie",
        image: null
    });

    // 🔐 Check admin on load
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/");
            return;
        }

        const decoded = jwtDecode(token);
        if (decoded.role !== "admin") {
            alert("Access denied");
            navigate("/home");
        }
    }, [navigate]);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setProduct({
            ...product,
            [name]: files ? files[0] : value
        });
    };
    const uploadImage = async (file) => {
        const fileName = `${Date.now()}-${file.name}`;

        const { error } = await supabase.storage
            .from("products")
            .upload(fileName, file);

        if (error) throw error;

        return `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/products/${fileName}`;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // 1️⃣ Upload image
            const imageUrl = await uploadImage(product.image);

            // 2️⃣ Send product data to backend
            const res = await fetch(`${API_BASE_URL}/products`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify({
                    name: product.name,
                    price: product.price,
                    quantity: product.quantity,
                    category: product.category,
                    image: imageUrl
                })
            });

            if (res.ok) {
                alert("Product added successfully");
                setProduct({
                    name: "",
                    price: "",
                    quantity: "",
                    category: "hoodie",
                    image: null
                });
            } else {
                alert("Failed to add product");
            }

        } catch (err) {
            console.error(err);
            alert("Error uploading product");
        }
    };
    return (
        <>

            <AdminHeader />


            <div className="max-w-xl mx-auto mt-10 bg-[#36594E]/90 p-6 rounded-lg shadow mb-5">
                <h2 className="text-2xl font-semibold mb-4">Add Product</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        name="name"
                        placeholder="Product Name"
                        value={product.name}
                        onChange={handleChange}
                        required
                        className="w-full border p-2 rounded"
                    />

                    <input
                        type="number"
                        name="price"
                        placeholder="Price"
                        value={product.price}
                        onChange={handleChange}
                        required
                        className="w-full border p-2 rounded"
                    />

                    <input
                        type="number"
                        name="quantity"
                        placeholder="Quantity"
                        value={product.quantity}
                        onChange={handleChange}
                        required
                        className="w-full border p-2 rounded"
                    />

                    <select
                        name="category"
                        value={product.category}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                    >
                        <option value="hoodie">Hoodie</option>
                        <option value="coat">Coat</option>
                        <option value="jacket">Jacket</option>
                    </select>

                    <input
                        type="file"
                        name="image"
                        accept="image/*"
                        onChange={handleChange}
                        required
                        className="w-full"
                    />

                    <button className="w-full bg-black text-white py-2 rounded">
                        Add Product
                    </button>
                </form>
            </div>
        </>
    );
}
