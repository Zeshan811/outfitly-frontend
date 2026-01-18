import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Header from "../component/header";
import { API_BASE_URL } from "./apiurl";

export default function Cart() {
    const navigate = useNavigate();
    const [user, setUser] = useState("");
    const [cart, setCart] = useState([]);
    const [showOverlay, setShowOverlay] = useState(false);
    const [address, setAddress] = useState(""); // cleaner naming
    const token = localStorage.getItem("token");

    // Check login and role
    useEffect(() => {
        if (!token) return navigate("/");

        try {
            const decoded = jwtDecode(token);
            if (decoded.role !== "admin") {
                setUser("user");
            } else {
                navigate("/home");
            }
        } catch (e) {
            localStorage.removeItem("token");
            alert("Invalid token, please login again");
            navigate("/");
        }
    }, [navigate, token]);

    // Fetch cart from backend
    const fetchCart = async () => {
        try {
            const res = await fetch(`${API_BASE_URL}/cart`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await res.json();
            setCart(data);
        } catch (err) {
            console.error(err);
            alert("Failed to fetch cart");
        }
    };

    useEffect(() => {
        fetchCart();
    }, []);

    // Update quantity
    const updateQty = async (cart_id, qty) => {
        if (qty < 1) return;
        try {
            await fetch(`${API_BASE_URL}/cart/update`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ cart_id, quantity: qty }),
            });
            fetchCart();
        } catch (err) {
            console.error(err);
            alert("Failed to update quantity");
        }
    };

    // Remove item
    const removeItem = async (cart_id) => {
        try {
            await fetch(`${API_BASE_URL}/cart/remove/${cart_id}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` },
            });
            fetchCart();
        } catch (err) {
            console.error(err);
            alert("Failed to remove item");
        }
    };

    const subtotal = cart.reduce((sum, p) => sum + p.total_price, 0);
    const delivery = cart.length > 0 ? 300 : 0;
    const total = subtotal + delivery;

    // Place order
    const placeOrder = async () => {
        if (!address.trim()) {
            alert("Please enter your address");
            return;
        }

        try {
            const res = await fetch(`${API_BASE_URL}/order/place`, {
                method: "POST",
                headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
                // body: JSON.stringify({ address }),
            });

            const data = await res.json();
            if (res.ok) {
                alert(
                    `✅ Order Placed Successfully!\nOrder ID: ${data.order_id}\nSubtotal: Rs ${data.subtotal}\nDelivery Charges: Rs ${data.delivery_charges}\nTotal: Rs ${data.total_amount}\nPayment: ${data.payment_method}`
                );
                setShowOverlay(false);
                setAddress("");
                fetchCart();
            } else {
                alert(data.error || "Failed to place order");
            }
        } catch (err) {
            console.error(err);
            alert("Failed to place order");
        }
    };

    return (
        <>
            {user === "user" && <Header />}

            <div className="w-full flex flex-col items-center mt-10 px-4 md:px-10">
                {/* Empty Cart */}
                {cart.length === 0 && (
                    <div className="text-center mt-20">
                        <p className="text-xl md:text-2xl font-semibold text-gray-700">
                            Your cart is empty 🛒
                        </p>
                        <p className="mt-2 text-gray-500">Add some products to place an order.</p>
                    </div>
                )}

                {/* Cart Table */}
                {cart.length > 0 && (
                    <div className="w-full flex justify-center overflow-x-auto">
                        <table className="min-w-[600px] md:min-w-[800px] text-black border-collapse">
                            <thead className="bg-[#2C4A40] sticky top-0">
                                <tr>
                                    <th className="px-2 md:px-3 py-2">Image</th>
                                    <th className="px-2 md:px-3 py-2">Name</th>
                                    <th className="px-2 md:px-3 py-2">Price</th>
                                    <th className="px-2 md:px-3 py-2">Qty</th>
                                    <th className="px-2 md:px-3 py-2">Total</th>
                                    <th className="px-2 md:px-3 py-2">❌</th>
                                </tr>
                            </thead>

                            <tbody>
                                {cart.map((p) => (
                                    <tr
                                        key={p.cart_id}
                                        className="border-b border-gray-600 bg-[#36594E]/90 hover:bg-[#2C4A40]"
                                    >
                                        <td className="p-2 md:p-3">
                                            <img
                                                src={p.image}
                                                className="w-12 md:w-16 h-12 md:h-16 object-cover rounded"
                                                alt={p.name}
                                            />
                                        </td>
                                        <td className="p-2 md:p-3">{p.name}</td>
                                        <td className="p-2 md:p-3">Rs {p.price}</td>
                                        <td className="p-2 md:p-3">
                                            <div className="flex items-center gap-2">
                                                <button
                                                    className="px-3 py-1 bg-black text-white rounded"
                                                    onClick={() => updateQty(p.cart_id, p.quantity - 1)}
                                                >
                                                    −
                                                </button>
                                                <span className="px-2">{p.quantity}</span>
                                                <button
                                                    className="px-3 py-1 bg-black text-white rounded"
                                                    onClick={() => updateQty(p.cart_id, p.quantity + 1)}
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </td>
                                        <td className="p-2 md:p-3">Rs {p.total_price}</td>
                                        <td className="p-2 md:p-3">
                                            <button
                                                className="text-red-500"
                                                onClick={() => removeItem(p.cart_id)}
                                            >
                                                ❌
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Place Order Button */}
                <button
                    disabled={cart.length === 0}
                    className={`mt-8 mb-20 md:mb-40 px-6 md:px-8 py-3 rounded-full ${cart.length === 0
                        ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                        : "bg-black text-white hover:bg-gray-800"
                        }`}
                    onClick={() => setShowOverlay(true)}
                >
                    Place Order
                </button>

                {/* Order Overlay */}
                {showOverlay && cart.length > 0 && (
                    <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
                        <div className="bg-white text-black rounded-2xl p-6 w-11/12 max-w-md">
                            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                            <p>Subtotal: Rs {subtotal}</p>
                            <p>Delivery Charges: Rs {delivery}</p>
                            <p className="font-bold mt-2">Total: Rs {total}</p>
                            <p className="mt-2 text-sm">
                                Payment Method: <b>Cash on Delivery</b>
                            </p>

                            <input
                                type="text"
                                name="address"
                                placeholder="Enter Your Address"
                                required
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                className="w-full mt-3 p-2 border rounded"
                            />

                            <div className="flex flex-col sm:flex-row justify-between mt-6 gap-4">
                                <button
                                    className="px-4 py-2 bg-gray-400 rounded"
                                    onClick={() => setShowOverlay(false)}
                                >
                                    Cancel
                                </button>

                                <button
                                    className="px-4 py-2 bg-green-600 text-white rounded"
                                    onClick={placeOrder}
                                >
                                    Confirm Order
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
