import Header from "../component/header";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import AdminHeader from "../component/adminheader";
export default function About() {
    const navigate = useNavigate();
    const [user, setUser] = useState("user");

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            navigate("/");
            return;
        }

        try {
            const decoded = jwtDecode(token);

            if (decoded.role === "admin") {
                setUser("admin");
            } else {
                setUser("user");
            }
        } catch (error) {
            // Invalid token
            localStorage.removeItem("token");
            alert(error);
            navigate("/");
        }
    }, [navigate]);
    return (
        <>
            {
                user === "user" && <Header />

            }
            {
                user === "admin" && <AdminHeader />

            }



            <div className="w-full flex flex-col pb-20"> {/* Added pb-20 for footer space */}
                {/* About Us Section */}
                <div className="relative bg-[#36594E] text-white p-6 flex items-start justify-between  shadow-lg">
                    <div className="max-w-md">
                        <h2 className="text-xl font-semibold mb-2 text-yellow-500">ABOUT US</h2>
                        <p className="text-sm ">
                            At Outfitly, We believe fashion should be stylish, comfortable, and accessible. our journey began with a passion for bringing premium-quality clothing to everyday wardrobes. from jackets that define elegance to hoodies that blend comfort with trend, and coats that complete your look — every piece is handpicked to match your lifestyle. we’re committed to offering collections that reflect individuality, quality, and timeless styles, so you can always step out with confidence.
                        </p>
                    </div>
                    <div className="flex-1 flex justify-end">
                        <img
                            src="/marcus-loke-xXJ6utyoSw0-unsplash.jpg" // Replace with actual image path
                            alt="Clothing Collection"
                            className="w-2/3 h-auto object-cover rounded-lg max-h-[400px]" // Added max-height to manage image height
                        />
                    </div>
                    <div className="absolute bottom-4 left-6 flex space-x-4">
                        <div className="flex space-x-4">
                            <Link
                                to="/shop"
                                className="bg-yellow-500 text-black px-6 py-3 rounded-full font-semibold hover:bg-yellow-600 transition"
                            >
                                Shop Now
                            </Link>

                            <Link
                                to="/shop"
                                className="border border-white px-6 py-3 rounded-full hover:bg-white hover:text-black transition"
                            >
                                Explore
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Why Choose Us Section */}
                <div className="py-12 px-4">
                    <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        <div className="text-center">
                            <span role="img" aria-label="shopping bag" className="text-4xl mb-2">🛍️</span>
                            <h3 className="text-lg font-semibold mb-2">Easy to Shop</h3>
                            <p className="text-gray-600">Smooth and simple shopping experience.</p>
                        </div>
                        <div className="text-center">
                            <span role="img" aria-label="lightning" className="text-4xl mb-2">⚡</span>
                            <h3 className="text-lg font-semibold mb-2">Fast & Reliable</h3>
                            <p className="text-gray-600">High-voltage speed with quick order processing.</p>
                        </div>
                        <div className="text-center">
                            <span role="img" aria-label="delivery truck" className="text-4xl mb-2">🚚</span>
                            <h3 className="text-lg font-semibold mb-2">Free Delivery</h3>
                            <p className="text-gray-600">Hassle-free shipping straight to your doorstep.</p>
                        </div>
                        <div className="text-center">
                            <span role="img" aria-label="customer support" className="text-4xl mb-2">👤</span>
                            <h3 className="text-lg font-semibold mb-2">Customer Support</h3>
                            <p className="text-gray-600">Friendly help whenever you need it.</p>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
}