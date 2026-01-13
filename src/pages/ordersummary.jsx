import React, { useState, useEffect } from "react";
import Header from "../component/header";
import AdminHeader from "../component/adminheader";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "./apiurl";

export default function OrderSummary() {
    const [orders, setOrders] = useState([]);
    const [role, setRole] = useState("user");
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    // Decode token and check login
    useEffect(() => {
        if (!token) {
            navigate("/");
            return;
        }

        try {
            const decoded = jwtDecode(token);
            setRole(decoded.role || "user");
        } catch (err) {
            console.error(err);
            localStorage.removeItem("token");
            navigate("/");
        }
    }, [token, navigate]);

    // Fetch orders from backend
    const fetchOrders = async () => {
        try {
            const res = await fetch(`${API_BASE_URL}/orders`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await res.json();
            if (res.ok) {
                setOrders(data.orders);
            } else {
                alert(data.error || "Failed to fetch orders");
            }
        } catch (err) {
            console.error(err);
            alert("Failed to fetch orders");
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    // Update order status (admin only)
    const updateStatus = async (orderId, newStatus) => {
        try {
            const res = await fetch(`${API_BASE_URL}/orders/update-status`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ order_id: orderId, status: newStatus }),
            });

            const data = await res.json();
            if (res.ok) {
                alert(data.message);
                fetchOrders();
            } else {
                alert(data.error || "Failed to update status");
            }
        } catch (err) {
            console.error(err);
            alert("Failed to update status");
        }
    };

    const statuses = ["pending", "packed", "shipped", "delivered", "cancelled"];

    // Status badge colors
    const statusColors = {
        pending: "bg-yellow-100 text-yellow-800",
        packed: "bg-blue-100 text-blue-800",
        shipped: "bg-purple-100 text-purple-800",
        delivered: "bg-green-100 text-green-800",
        cancelled: "bg-red-100 text-red-800",
    };

    return (
        <>
            {role === "admin" ? <AdminHeader /> : <Header />}

            <h1 className="text-3xl font-bold mb-6 text-center">Order Summary</h1>

            {orders.length === 0 ? (
                <p className="text-center text-gray-500">No orders found.</p>
            ) : (
                <div className="relative -mx-4 sm:-mx-6 lg:mx-0">
                    <div className="w-full overflow-x-auto">
                        <table className="min-w-[640px] lg:min-w-full mx-auto border-collapse border border-gray-200 shadow-md rounded-lg overflow-hidden mb-40">
                            <thead className="bg-[#36594E]/90">
                                <tr>
                                    <th className="px-4 py-3 text-left text-white font-medium">User</th>
                                    <th className="px-4 py-3 text-left text-white font-medium">Items</th>
                                    <th className="px-4 py-3 text-left text-white font-medium">Total (Rs)</th>
                                    <th className="px-4 py-3 text-left text-white font-medium">Status</th>
                                    <th className="px-4 py-3 text-left text-white font-medium">Created At</th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-gray-200 bg-white">
                                {orders.map((order) => (
                                    <tr
                                        key={order.id}
                                        className="hover:bg-[#2C4A40] hover:text-white transition"
                                    >
                                        <td className="px-4 py-3">{order.user_name}</td>
                                        <td className="px-4 py-3">
                                            {order.items.map((item) => (
                                                <div key={item.product_id}>
                                                    {item.product_name} × {item.quantity}
                                                </div>
                                            ))}
                                        </td>
                                        <td className="px-4 py-3 font-semibold">
                                            {order.total_amount}
                                        </td>
                                        <td className="px-4 py-3">
                                            <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-800">
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3">
                                            {new Date(order.created_at).toLocaleString()}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

            )}

        </>
    );
}


