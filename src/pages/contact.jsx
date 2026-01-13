import React, { useState } from 'react';
import { useEffect } from 'react';
import AdminHeader from '../component/adminheader';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import Header from '../component/header';
export default function Contact() {
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
    const [formData, setFormData] = useState({ name: '', subject: '', message: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        // Add form submission logic here
    };

    return (
        <>
            {
                user === "user" && <Header />

            }

            {
                user === "admin" && <AdminHeader />

            }
            <div className="flex flex-col items-center justify-start min-h-screen bg-gray-50 mt-10">
                <img
                    src="/burgess-milner-OYYE4g-I5ZQ-unsplash (1).jpg"
                    alt="Error Loading.."
                    className="w-full h-64 md:h-[600px] object-cover mb-6"
                />
                <h1 className="text-3xl font-bold text-[#36594E] mb-4 text-center">Contact Us</h1>
                <p className="text-gray-600 text-center max-w-md mb-6">
                    Have questions or feedback? Reach out to us anytime at{" "}
                    <span className="text-[#36594E] font-semibold">support@outfitly.com</span>.
                </p>

                {/* Main Flex */}
                <div className="flex flex-col md:flex-row w-full max-w-4xl px-4 md:px-0">
                    {/* Address Section */}
                    <div className="flex-1 md:pr-10 mb-6 md:mb-0 text-center md:text-left">
                        <p className="mb-6">
                            <span className="inline-block mr-2">📍</span>
                            Shop P234, First Floor,<br />
                            <span>Main Emporium Mall, Lahore</span>
                        </p>
                        <p className="mb-6">
                            <span className="inline-block mr-2">📞</span>
                            +923121706344<br />
                            <span className="ml-10">0476331333</span>
                        </p>
                        <p className="mb-6">
                            <span className="inline-block mr-2">📧</span>
                            Outfitly.fashion.store@gmail.com
                        </p>
                    </div>

                    {/* Form Section */}
                    <div className="flex-1 bg-gray-200 p-4 md:p-6 rounded-lg">
                        <h2 className="text-xl font-semibold mb-4 text-center md:text-left">Send Message</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Name:</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="mt-1 block w-full p-2 border rounded-md"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Subject:</label>
                                <input
                                    type="text"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    className="mt-1 block w-full p-2 border rounded-md"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Message:</label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    className="mt-1 block w-full p-2 border rounded-md h-32"
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full py-2 px-4 bg-[#36594E] text-white rounded-md hover:bg-[#2e4d43]"
                                onClick={() => alert("Message sent! We will respond soon")}
                            >
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </div>


        </>
    );
}