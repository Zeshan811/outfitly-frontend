<div className="flex flex-col items-center mt-10 w-full px-4 md:px-0">
    {/* Center table on large screens and scroll on small screens */}
    <div className="w-full flex justify-center overflow-x-auto">
        <table className="min-w-[600px] md:min-w-[800px] text-black border-collapse">
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
                {cart.map((p) => (
                    <tr
                        key={p.cart_id}
                        className="border-b border-gray-600 bg-[#36594E]/90 hover:bg-[#2C4A40]"
                    >
                        <td className="p-3">
                            <img
                                src={p.image}
                                className="w-12 h-12 md:w-16 md:h-16 object-cover rounded"
                                alt={p.name}
                            />
                        </td>
                        <td className="p-3 text-sm md:text-base">{p.name}</td>
                        <td className="p-3 text-sm md:text-base">Rs {p.price}</td>

                        <td className="p-3">
                            <div className="flex items-center gap-2">
                                <button
                                    className="px-2 py-1 bg-black text-white rounded"
                                    onClick={() => updateQty(p.cart_id, p.quantity - 1)}
                                >
                                    −
                                </button>
                                <span>{p.quantity}</span>
                                <button
                                    className="px-2 py-1 bg-black text-white rounded"
                                    onClick={() => updateQty(p.cart_id, p.quantity + 1)}
                                >
                                    +
                                </button>
                            </div>
                        </td>

                        <td className="p-3 text-sm md:text-base">Rs {p.total_price}</td>
                        <td className="p-3">
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

    {/* Place Order Button */}
    <button
        className="mt-6 mb-20 bg-black text-white px-6 py-3 rounded-full w-full max-w-[400px] md:w-auto"
        onClick={() => setShowOverlay(true)}
    >
        Place Order
    </button>
</div>
