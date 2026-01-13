import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AdminHeader from "../component/adminheader";
import { jwtDecode } from "jwt-decode";
export default function Updelproduct() {

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

    const { id } = useParams();
    const navigate = useNavigate();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`http://127.0.0.1:5000/products/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then(res => res.json())
            .then(data => {
                setProduct(data);
                setLoading(false);
            })
            .catch(() => setLoading(false)
            );
    }, [id]);

    const handleChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    };

    const handleUpdate = async () => {
        const res = await fetch(`http://127.0.0.1:5000/products/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify(product)
        });

        if (res.ok) alert("Product updated");
        else alert("Update failed");
    };

    const handleDelete = async () => {
        if (!window.confirm("Delete this product?")) return;

        const res = await fetch(`http://127.0.0.1:5000/products/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });

        if (res.ok) {
            alert("Product deleted");
            navigate("/getproduct");
        }
    };

    if (loading) return <p className="text-white">Loading...</p>;

    return (
        <>
            <AdminHeader />
            <div className="max-w-xl mx-auto mt-10 bg-[#36594E]/90 p-6 rounded-lg text-white mb-5">
                <h2 className="text-xl mb-4">Edit Product</h2>

                <img src={product.image} className="w-32 mb-4 rounded" />

                <input name="name" value={product.name} onChange={handleChange} className="w-full p-2 mb-2 text-black" />
                <input name="price" value={product.price} onChange={handleChange} className="w-full p-2 mb-2 text-black" />
                <input name="quantity" value={product.quantity} onChange={handleChange} className="w-full p-2 mb-2 text-black" />

                <select name="category" value={product.category} onChange={handleChange} className="w-full p-2 mb-4 text-black">
                    <option value="hoodie">Hoodie</option>
                    <option value="jacket">Jacket</option>
                    <option value="coat">Coat</option>
                </select>

                <div className="flex gap-3">
                    <button onClick={handleUpdate} className="bg-green-600 px-4 py-2 rounded">Update</button>
                    <button onClick={handleDelete} className="bg-red-600 px-4 py-2 rounded">Delete</button>
                </div>
            </div>
        </>
    );
}
