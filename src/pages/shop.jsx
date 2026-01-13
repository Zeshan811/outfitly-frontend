import { useEffect, useState } from "react";
import Header from "../component/header";
import { jwtDecode } from "jwt-decode";
import { API_BASE_URL } from "./apiurl";
import { useNavigate } from "react-router-dom";
export default function Shop() {
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const addToCart = async (productId) => {
        const token = localStorage.getItem("token");
        if (!token) {
            alert("Please login to add items to cart");
            return;
        }
        const decoded = jwtDecode(token);
        if (decoded.role === "admin") {
            navigate("/home");
            return;
        }
        try {
            const res = await fetch(`${API_BASE_URL}/cart/add`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    product_id: productId,
                    quantity: 1
                })
            });

            const data = await res.json();

            if (!res.ok) {
                alert(data.error || "Failed to add to cart");
            } else {
                alert("Added to cart ✅");
            }
        } catch (err) {
            console.error(err);
            alert("Something went wrong");
        }
    };

    useEffect(() => {

        const fetchData = async () => {
            try {
                const catRes = await fetch(`${API_BASE_URL}/categories`);
                const cats = await catRes.json();

                const categoriesWithProducts = await Promise.all(
                    cats.map(async (cat) => {
                        const prodRes = await fetch(
                            `${API_BASE_URL}/productspage?category_id=${cat.id}`
                        );
                        const products = await prodRes.json();

                        return {
                            ...cat,
                            products
                        };
                    })
                );

                setCategories(categoriesWithProducts);
            } catch (err) {
                console.error("Failed to load shop data", err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <p className="text-center mt-20">Loading products...</p>;
    }

    return (
        <>
            {/* HEADER */}
            <Header />
            <div className="mt-5 text-center">
                <h1 className="text-3xl font-bold text-[#36594E] mb-4">Shop Our Collection</h1>
                <p className="text-gray-600 text-lg ">Browse the latest arrivals of women’s outerwear — cozy hoodies, elegant coats, and trendy jackets.</p>
            </div >

            {
                categories.map((category) => (
                    <section
                        key={category.id}
                        className="bg-[#36594E] rounded-2xl mt-14 py-20 mb-24"
                    >
                        <h2 className="text-white text-2xl font-semibold ml-6 mb-10 capitalize">
                            {category.name}
                        </h2>

                        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-6">
                            {category.products.length === 0 ? (
                                <p className="text-white col-span-4 text-center">
                                    No products available
                                </p>
                            ) : (
                                category.products.map((item) => (
                                    <div
                                        key={item.id}
                                        className="bg-[#F3F2EF] rounded-3xl p-4"
                                    >
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-full aspect-[4/5] object-cover rounded-2xl"
                                        />

                                        <h3 className="text-lg font-serif text-center mt-5">
                                            {item.name}
                                        </h3>

                                        <div className="flex items-center justify-between mt-5">
                                            <button
                                                onClick={() => addToCart(item.id)}
                                                className="bg-black text-white px-5 py-2 rounded-full hover:bg-white hover:text-black border"
                                            >
                                                Add To Cart
                                            </button>

                                            <span className="font-semibold">
                                                Rs {item.price}
                                            </span>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </section>
                ))
            }
        </>
    );
}


