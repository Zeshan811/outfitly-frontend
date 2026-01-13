import Header from "../component/header";
import AdminHeader from "../component/adminheader";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

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
            localStorage.removeItem("token");
            alert(error);
            navigate("/");
        }
    }, [navigate]);

    return (
        <>
            {user === "user" && <Header />}
            {user === "admin" && <AdminHeader />}

            <div className="w-full flex flex-col pb-20">
                {/* Hero / About Us Section */}
                <div className="bg-[#36594E] text-white p-6 md:p-12 flex flex-col md:flex-row items-center md:items-start gap-8">
                    {/* Text + Buttons */}
                    <div className="md:w-1/2 flex flex-col justify-center items-start space-y-6">
                        <h2 className="text-2xl md:text-3xl font-semibold text-yellow-500">ABOUT US</h2>
                        <p className="text-sm md:text-base leading-relaxed">
                            At Outfitly, we believe fashion should be stylish, comfortable, and accessible.
                            Our journey began with a passion for bringing premium-quality clothing to everyday wardrobes.
                            From jackets that define elegance to hoodies that blend comfort with trend,
                            and coats that complete your look — every piece is handpicked to match your lifestyle.
                            We’re committed to offering collections that reflect individuality, quality, and timeless styles,
                            so you can always step out with confidence.
                        </p>

                        {/* Buttons */}
                        <div className="flex flex-wrap gap-4 ">
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

                    {/* Image */}
                    <div className="md:w-1/2 flex justify-center">
                        <img
                            src="/marcus-loke-xXJ6utyoSw0-unsplash.jpg"
                            alt="Clothing Collection"
                            className="w-full md:w-4/5 h-auto object-cover rounded-lg max-h-[400px]"
                        />
                    </div>
                </div>

                {/* Why Choose Us Section */}
                <div className="py-12 px-4 md:px-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Why Choose Us</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
                        <div className="text-center">
                            <span role="img" aria-label="shopping bag" className="text-5xl mb-2">🛍️</span>
                            <h3 className="text-lg md:text-xl font-semibold mb-2">Easy to Shop</h3>
                            <p className="text-gray-600 text-sm md:text-base">Smooth and simple shopping experience.</p>
                        </div>
                        <div className="text-center">
                            <span role="img" aria-label="lightning" className="text-5xl mb-2">⚡</span>
                            <h3 className="text-lg md:text-xl font-semibold mb-2">Fast & Reliable</h3>
                            <p className="text-gray-600 text-sm md:text-base">High-voltage speed with quick order processing.</p>
                        </div>
                        <div className="text-center">
                            <span role="img" aria-label="delivery truck" className="text-5xl mb-2">🚚</span>
                            <h3 className="text-lg md:text-xl font-semibold mb-2">Free Delivery</h3>
                            <p className="text-gray-600 text-sm md:text-base">Hassle-free shipping straight to your doorstep.</p>
                        </div>
                        <div className="text-center">
                            <span role="img" aria-label="customer support" className="text-5xl mb-2">👤</span>
                            <h3 className="text-lg md:text-xl font-semibold mb-2">Customer Support</h3>
                            <p className="text-gray-600 text-sm md:text-base">Friendly help whenever you need it.</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
