import React, { useState, useEffect } from "react";
import Header from "../component/header";
import { Link, useNavigate } from "react-router-dom";
import { API_BASE_URL } from "./apiurl";

const products = [
    { title: "Belted Jacket", price: "$499.9", img: "/public/ali-ahmadi-rihy34eSbvw-unsplash.jpg" },
    { title: "Brown Leather Jacket", price: "$199.9", img: "/public/ali-karimiboroujeni-zzKT12IXGfA-unsplash.jpg" },
    { title: "Classic Coat", price: "$299.9", img: "/public/senya-zhukavin-_pxu5HDcoj4-unsplash.jpg" },
    { title: "Winter Jacket", price: "$259.9", img: "/public/mahdi-chaghari-EiVMVbT31xU-unsplash.jpg" },
];

export default function Home() {
    const [modal, setModal] = useState("signup"); // "signup", "login", or null
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            alert("Token Base Login");
            navigate("/home");
            return;
        }
    }, [navigate]);

    const [signupData, setSignupData] = useState({
        name: "",
        email: "",
        password: ""
    });
    const [forgotData, setForgotData] = useState({
        email: "",
        newPassword: ""
    });
    const handleForgotChange = (e) => {
        setForgotData({
            ...forgotData,
            [e.target.name]: e.target.value
        });
    };
    const handleForgotPassword = async () => {
        const { email, newPassword } = forgotData;

        if (!email || !newPassword) {
            alert("All fields are required");
            return;
        }

        if (!isValidEmail(email)) {
            alert("Invalid email");
            return;
        }

        if (!isStrongPassword(newPassword)) {
            alert("Weak password");
            return;
        }

        try {
            const res = await fetch(`${API_BASE_URL}/forgot-password`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(forgotData)
            });

            const data = await res.json();

            if (res.ok) {
                alert("Password updated successfully");
                setModal("login"); // redirect to login
            } else {
                alert(data.error);
            }
        } catch (err) {
            alert(`Server error: ${err.message}`);
        }

    };

    const [loginData, setLoginData] = useState({
        email: "",
        password: ""
    });
    const handleSignupChange = (e) => {
        setSignupData({
            ...signupData,
            [e.target.name]: e.target.value
        });
    };

    const handleLoginChange = (e) => {
        setLoginData({
            ...loginData,
            [e.target.name]: e.target.value
        });
    };
    const isValidEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const isStrongPassword = (password) => {
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/.test(password);
    };

    const handleSignup = async () => {
        const { name, email, password } = signupData;

        // Empty check
        if (!name || !email || !password) {
            alert("All fields are required");
            return;
        }

        // Email validation
        if (!isValidEmail(email)) {
            alert("Please enter a valid email address");
            return;
        }

        // Password validation
        if (!isStrongPassword(password)) {
            alert(
                "Password must contain:\n• 1 uppercase\n• 1 lowercase\n• 1 number\n• 1 special character\n• Min 8 characters"
            );
            return;
        }

        // Only now hit backend
        try {
            const res = await fetch("https://127.0.0.1:5000/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(signupData)
            });

            const data = await res.json();

            if (res.ok) {
                alert("Account created! Please login.");
                setModal("login");
            } else {
                alert(data.error || "Signup failed");
            }
        } catch (err) {
            console.error(err);
            alert("Server error");
        }
    };
    const handleLogin = async () => {
        try {
            const res = await fetch("http://127.0.0.1:5000/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(loginData)
            });

            const data = await res.json();

            if (res.ok) {
                localStorage.setItem("token", data.access_token);
                setModal(null);
                navigate("/home");
            } else {
                alert(data.error || "Login failed");
            }
        }
        catch (err) {
            console.error(err);
            alert("Server error");
        }
    };

    // const handleLogin = () => {
    //     setModal(null); // close modal
    //     navigate("/");   // redirect to home page
    // };

    return (
        <div className="relative min-h-screen">
            <Header />

            <div className={`${modal ? "opacity-40 blur-sm pointer-events-none" : ""}`}>
                <div className="w-full flex flex-col pb-20">
                    <div className="relative bg-[#36594E] text-white p-6 flex items-start justify-between shadow-lg">
                        <div className="max-w-md ">
                            <p className="text-xl mb-2 pl-20">
                                New Arrival Collection
                            </p>
                            <h2 className="text-lg font-semibold mb-2 text-yellow-500">
                                THE LATEST TREND IN <br /> FASHION
                            </h2>
                            <p className="text-lg ">
                                Upgrade your wardrobe with our handpicked styles <br />— hoodies, coats,
                                and jackets designed <br /> for comfort and confidence.
                            </p>
                        </div>

                        <div className="flex-1 flex justify-end pr-20">
                            <img
                                src="/dom-hill-nimElTcTNyY-unsplash.jpg"
                                alt="Fashion Collection"
                                className="w-3/3 h-auto object-cover rounded-lg max-h-[330px]"
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
                </div>

                {/* Fabrics Section */}
                <section className="w-full bg-white py-20">
                    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center px-6">
                        {/* Left Side Text */}
                        <div>
                            <h2 className="text-4xl font-semibold leading-tight mb-6">
                                Our Fabrics Will Be <br /> Your Feather
                            </h2>
                            <p className="text-gray-600 max-w-md mb-8">
                                Experience the elegance of designed for <br />
                                comfort and grace.
                                Every piece is crafted<br /> with care, giving you the lightness of a feather
                                and the <br />confidence to shine in every moment.
                            </p>
                            <button className="border border-black px-8 py-3 font-semibold rounded-full text-white bg-black hover:bg-gray-100 hover:text-black transition-all duration-300">
                                Explore
                            </button>
                        </div>

                        {/* Right Side Images */}
                        <div className="relative flex justify-between items-center">
                            <img
                                src="/public/main2.jpeg"
                                alt="Model 1"
                                className="w-[420px] h-auto object-cover"
                            />
                            <img
                                src="/public/main.jpg"
                                alt="Model 2"
                                className="w-[230px] h-[230px] object-cover absolute top-[-40px] right-[-20px]"
                            />
                        </div>
                    </div>
                </section>

                <section className="bg-[#36594E] rounded-2xl py-20 mb-24">
                    <div className="flex items-center justify-center mb-10">
                        <h2 className="text-white text-2xl font-semibold tracking-wide">
                            Top Collection
                        </h2>
                    </div>
                    <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 px-6">
                        {products.map((item, index) => (
                            <div key={index} className="bg-[#F3F2EF] rounded-3xl p-4">
                                <img
                                    src={item.img}
                                    alt={item.title}
                                    className="w-full aspect-[4/5] object-cover rounded-2xl"
                                />
                                <h3 className="text-lg font-serif text-center mt-5">
                                    {item.title}
                                </h3>
                                <div className="flex items-center justify-between mt-5">
                                    <button className="bg-black text-white px-5 py-2 rounded-full hover:bg-white hover:text-black border border-black transition">
                                        Add To Cart
                                    </button>
                                    <span className="text-base font-semibold">
                                        {item.price}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>

            {modal && (
                <div
                    onClick={() => setModal(null)}
                    className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm z-40"
                />
            )}

            {modal === "signup" && (
                <div className="fixed inset-0 flex items-center justify-center z-50 px-4">
                    <div className="bg-[#36594E]/90 backdrop-blur-lg rounded-3xl p-8 max-w-md w-full text-white shadow-lg relative">
                        {/* <button
                            onClick={() => setModal(null)}
                            className="absolute top-4 right-4 text-white hover:text-gray-300 text-xl font-bold"
                        >
                            ×
                        </button> */}

                        <h2 className="text-2xl font-semibold mb-6 text-center">Sign Up</h2>

                        <input
                            type="text"
                            name="name"
                            placeholder="Name"
                            value={signupData.name}
                            onChange={handleSignupChange}
                            required
                            className="w-full mb-4 px-5 py-3 rounded-full bg-[#2C4A40]"
                        />

                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={signupData.email}
                            onChange={handleSignupChange}
                            required
                            className="w-full mb-4 px-5 py-3 rounded-full bg-[#2C4A40]"
                        />

                        <input
                            type="password"
                            name="password"
                            placeholder="Password (Aa1@xxxx)"
                            value={signupData.password}
                            onChange={handleSignupChange}
                            className="w-full mb-6 px-5 py-3 rounded-full bg-[#2C4A40]"
                        />

                        <button
                            onClick={handleSignup}
                            className="w-full bg-black py-3 rounded-full font-semibold"
                        >
                            Create Account
                        </button>

                        <p className="text-center text-sm text-gray-300 mt-3">
                            Already have an account?{" "}
                            <button
                                onClick={() => setModal("login")}
                                className="underline cursor-pointer hover:text-white"
                            >
                                Sign In
                            </button>
                        </p>

                    </div>
                </div>
            )}

            {/* Login Modal */}
            {modal === "login" && (
                <div className="fixed inset-0 flex items-center justify-center z-50 px-4">
                    <div className="bg-[#36594E]/90 backdrop-blur-lg rounded-3xl p-8 max-w-md w-full text-white shadow-lg relative">
                        {/* <button
                            onClick={() => setModal(null)}
                            className="absolute top-4 right-4 text-white hover:text-gray-300 text-xl font-bold"
                        >
                            ×
                        </button> */}

                        <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>

                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={loginData.email}
                            onChange={handleLoginChange}
                            required
                            className="w-full mb-4 px-5 py-3 rounded-full bg-[#2C4A40]"
                        />

                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={loginData.password}
                            onChange={handleLoginChange}
                            required
                            className="w-full mb-6 px-5 py-3 rounded-full bg-[#2C4A40]"
                        />

                        <button onClick={handleLogin} className="w-full bg-black py-3 rounded-full font-semibold hover:bg-white hover:text-black transition mb-2">
                            Sign In
                        </button>

                        <p className="text-center text-sm text-gray-300 mt-3">
                            Don't have an account?{" "}
                            <button
                                onClick={() => setModal("signup")}
                                className="underline cursor-pointer hover:text-white"
                            >
                                Sign Up
                            </button>
                        </p>
                        <p className="text-center">
                            <button
                                onClick={() => setModal("forgot")}
                                className="underline cursor-pointer hover:text-white"
                            >
                                Forget Password
                            </button>

                        </p>

                    </div>
                </div>
            )}
            {modal === "forgot" && (
                <div className="fixed inset-0 flex items-center justify-center z-50 px-4">
                    <div className="bg-[#36594E]/90 backdrop-blur-lg rounded-3xl p-8 max-w-md w-full text-white shadow-lg">
                        <h2 className="text-2xl font-semibold mb-6 text-center">
                            Reset Password
                        </h2>

                        <input
                            type="email"
                            name="email"
                            placeholder="Registered Email"
                            value={forgotData.email}
                            onChange={handleForgotChange}
                            className="w-full mb-4 px-5 py-3 rounded-full bg-[#2C4A40]"
                        />

                        <input
                            type="password"
                            name="newPassword"
                            placeholder="New Password"
                            value={forgotData.newPassword}
                            onChange={handleForgotChange}
                            className="w-full mb-6 px-5 py-3 rounded-full bg-[#2C4A40]"
                        />

                        <button
                            onClick={handleForgotPassword}
                            className="w-full bg-black py-3 rounded-full font-semibold hover:bg-white hover:text-black transition"
                        >
                            Update Password
                        </button>

                        <p className="text-center text-sm mt-4">
                            Remembered?{" "}
                            <button
                                onClick={() => setModal("login")}
                                className="underline"
                            >
                                Login
                            </button>
                        </p>
                    </div>
                </div>
            )}


        </div>
    );
}
