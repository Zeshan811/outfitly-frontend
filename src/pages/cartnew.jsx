import {
    useEffect, useState
} from "react";
import Header from "../component/header";
export default function Cart() {
    const [cart, setCart
    ] = useState([]);
    const [showOverlay, setShowOverlay
    ] = useState(false);
    const token = localStorage.getItem("token");

    const fetchCart = async () => {
        const res = await fetch("http://127.0.0.1:5000/cart",
            {
                headers: {
                    Authorization: `Bearer ${token
                        }`
                }
            });
        const data = await res.json();
        setCart(data);
    };

    useEffect(() => {
        fetchCart();
    },
        []);

    const updateQty = async (cart_id, qty) => {
        if (qty < 1) return;

        await fetch("http://127.0.0.1:5000/cart/update",
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token
                        }`
                },
                body: JSON.stringify({
                    cart_id, quantity: qty
                })
            });

        fetchCart();
    };

    const removeItem = async (cart_id) => {
        await fetch(`http: //127.0.0.1:5000/cart/remove/${cart_id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token
                    }`
            }
        });

        fetchCart();
    };

    const subtotal = cart.reduce((sum, p) => sum + p.total_price,
        0);
    const delivery = 300;
    const total = subtotal + delivery;

    return (
        <>
            <Header />
            <div className=" max-h[600px] flex flex-col items-center mt-10">

                { /* CART TABLE */}
                <table className="w-[800px] text-black border-collapse">
                    <thead className="bg-[#2C4A40] sticky top-0">
                        <tr>
                            <th className="p-3">Image</th>
                            <th className="p-3">Name</th>
                            <th className="p-3">Price</th>
                            <th className="p-3">Qty</th>
                            <th className="p-3">Total</th>
                            <th className="p-3">❌</th>
                        </tr>
                    </thead>

                    <tbody>
                        {cart.map(p => (
                            <tr
                                key={p.cart_id
                                }
                                className="border-b border-gray-600 bg-[#36594E]/90  hover:bg-[#2C4A40] "
                            >
                                <td className="p-3">
                                    <img
                                        src={p.image
                                        }
                                        className="w-16 h-16 object-cover rounded"
                                    />
                                </td>

                                <td className="p-3">{p.name
                                }</td>
                                <td className="p-3">Rs {p.price
                                }</td>

                                { /* QUANTITY */}
                                <td className="p-3">
                                    <div className="flex items-center gap-2">
                                        <button
                                            className="px-2 bg-black text-white"
                                            onClick={() => updateQty(p.cart_id, p.quantity - 1)
                                            }
                                        >−</button>

                                        <span>{p.quantity
                                        }</span>

                                        <button
                                            className="px-2 bg-black text-white "
                                            onClick={() => updateQty(p.cart_id, p.quantity + 1)
                                            }
                                        >+</button>
                                    </div>
                                </td>

                                <td className="p-3">Rs {p.total_price
                                }</td>

                                <td className="p-3">
                                    <button
                                        className="text-red-500"
                                        onClick={() => removeItem(p.cart_id)
                                        }
                                    >
                                        ❌
                                    </button>
                                </td>
                            </tr>
                        ))
                        }
                    </tbody>
                </table>

                { /* PLACE ORDER BUTTON */}
                <button
                    className="mt-8 mb-40 bg-black text-white px-8 py-3 rounded-full "
                    onClick={() => setShowOverlay(true)
                    }
                >
                    Place Order
                </button>

                { /* ORDER OVERLAY */}
                {showOverlay && (
                    <div className="fixed inset-0 bg-black/60 flex items-center justify-center ">
                        <div className="bg-white text-black rounded-2xl p-6 w-[400px]">
                            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

                            <p>Subtotal: Rs {subtotal
                            }</p>
                            <p>Delivery Charges: Rs {delivery
                            }</p>
                            <p className="font-bold mt-2">Total: Rs {total
                            }</p>

                            <p className="mt-2 text-sm">
                                Payment Method: <b>Cash on Delivery</b>
                            </p>

                            <div className="flex justify-between mt-6">
                                <button
                                    className="px-4 py-2 bg-gray-400 rounded"
                                    onClick={() => setShowOverlay(false)
                                    }
                                >
                                    Cancel
                                </button>

                                <button
                                    className="px-4 py-2 bg-green-600 text-white rounded"
                                    onClick={async () => {
                                        const re = await fetch("http://127.0.0.1:5000/order/place",
                                            {
                                                method: "POST",
                                                headers: {
                                                    Authorization: `Bearer ${token
                                                        }`
                                                }
                                            });
                                        const da = await re.json()
                                        alert(
                                            `✅ Order Placed Successfully!
                                            Order ID: ${da.order_id
                                            }
                                             Subtotal: Rs ${da.subtotal
                                            }
                                            Delivery Charges: Rs ${da.delivery_charges
                                            }
                                            Total: Rs ${da.total_amount
                                            }
                                            Payment: ${da.payment_method
                                            }`
                                        );

                                        setShowOverlay(false);
                                        fetchCart();
                                    }
                                    }
                                >
                                    Confirm Order
                                </button>
                            </div>
                        </div>
                    </div>
                )
                }

            </div>

        </>
    );
}