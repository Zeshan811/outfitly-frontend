import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import AdminHeader from "../component/adminheader";
import { API_BASE_URL } from "./apiurl";
export default function GetProducts() {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/");
            return;
        }

        try {
            const decoded = jwtDecode(token);
            if (decoded.role !== "admin") {
                alert("Access denied");
                navigate("/");
            }
        } catch {
            navigate("/");
        }
    }, [navigate]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch(`${API_BASE_URL}/products`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                });

                if (!res.ok) {
                    throw new Error("Failed to fetch products");
                }

                const data = await res.json();
                setProducts(data);
            } catch (err) {
                console.error(err);
                setError("Unable to load products");
            }
        };

        fetchProducts();
    }, []);
    return (
        <>
            <AdminHeader />


            < div className="max-w-6xl mx-auto mt-10 bg-[#36594E]/90 p-6 rounded-lg mb-auto" >
                <h2 className="text-2xl font-semibold mb-4 text-white" >
                    Admin Products
                </h2>

                {error && <p className="text-red-400" > {error} </p>}

                <div className="max-h-[500px] overflow-y-auto" >
                    <table className="w-[800px] text-white border-collapse" >
                        <thead className="bg-[#2C4A40] sticky top-0" >

                            <tr>
                                <th className="p-3" > Image </th>
                                <th th className="p-3 " > Name </th>
                                <th th className="p-3" > Category </th>
                                <th th className="p-3" > Price </th>
                                <th th className="p-3" > Qty </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                products.map(p => (
                                    <tr
                                        key={p.id}
                                        className="border-b border-gray-600 cursor-pointer hover:bg-[#2C4A40]"
                                        onClick={() => navigate(`/updelproduct/${p.id}`)}
                                    >

                                        <td className="p-3" >
                                            <img
                                                src={p.image}
                                                className="w-16 h-16 object-cover rounded"
                                            />
                                        </td>
                                        < td className="p-3" > {p.name} </td>
                                        < td className="p-3" > {p.category} </td>
                                        < td className="p-3" > Rs {p.price} </td>
                                        < td className="p-3" > {p.quantity} </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}
