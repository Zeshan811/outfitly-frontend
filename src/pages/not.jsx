import React from "react";
import {
    useNavigate
} from "react-router-dom";

export default function NotFound() {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
            <h1 className="text-5xl font-bold mb-6">404 - Page Not Found</h1>
            <p className="mb-6">Oops! The page you are looking for does not exist.</p>
            <button
                onClick={() => navigate("/home")
                }
                className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded text-white font-semibold"
            >
                Go Back Home
            </button>
        </div>
    );
}