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

            <div className="max-w-7xl mx-auto py-10 px-4">
                <h1 className="text-3xl font-bold mb-6 text-center">Order Summary</h1>

                {orders.length === 0 ? (
                    <p className="text-center text-gray-500">No orders found.</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full border-collapse border border-gray-200 shadow-md rounded-lg overflow-hidden mb-40">
                            <thead className="bg-[#36594E]/90">
                                <tr>
                                    <th className="px-6 py-3 text-left font-medium text-white-700">Order ID</th>
                                    <th className="px-6 py-3 text-left font-medium text-white-700">User</th>
                                    <th className="px-6 py-3 text-left font-medium text-white-700">Items</th>
                                    <th className="px-6 py-3 text-left font-medium text-white-700">Total (Rs)</th>
                                    <th className="px-6 py-3 text-left font-medium text-white-700">Status</th>
                                    <th className="px-6 py-3 text-left font-medium text-white-700">Created At</th>
                                </tr>
                            </thead>
                            <tbody className="bg- divide-y divide-gray-200">
                                {orders.map((order) => (
                                    <tr key={order.id} className="hover:bg-[#2C4A40] hover:text-white transition-colors duration-200">
                                        <td className="px-6 py-4">{order.id}</td>
                                        <td className="px-6 py-4">{order.user_name}</td>
                                        <td className="px-6 py-4">
                                            {order.items.map((item) => (
                                                <div key={item.product_id} className="mb-1">
                                                    {item.product_name} x {item.quantity} ({item.price}Rs)
                                                </div>
                                            ))}
                                        </td>
                                        <td className="px-6 py-4 font-semibold">{order.total_amount}</td>
                                        <td className="px-6 py-4">
                                            {role === "admin" ? (
                                                <select
                                                    value={order.status}
                                                    onChange={(e) => updateStatus(order.id, e.target.value)}
                                                    className="p-2 border rounded-md bg-white cursor-pointer text-gray-700"
                                                >
                                                    {statuses.map((s) => (
                                                        <option key={s} value={s}>
                                                            {s.charAt(0).toUpperCase() + s.slice(1)}
                                                        </option>
                                                    ))}
                                                </select>
                                            ) : (
                                                <span
                                                    className={`px-3 py-1 rounded-full font-semibold ${statusColors[order.status]} select-none`}
                                                >
                                                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">{new Date(order.created_at).toLocaleString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </>
    );
}
