// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import AdminHeader from "../component/adminheader";
// import Header from "../component/header";
// import { jwtDecode } from "jwt-decode";
// export default function Profile() {
//     const navigate = useNavigate();
//     const [user, setUser] = useState("user");

//     useEffect(() => {
//         const token = localStorage.getItem("token");

//         if (!token) {
//             navigate("/");
//             return;
//         }

//         try {
//             const decoded = jwtDecode(token);

//             if (decoded.role === "admin") {
//                 setUser("admin");
//             } else {
//                 setUser("user");
//             }
//         } catch (error) {
//             // Invalid token
//             localStorage.removeItem("token");
//             alert(error);
//             navigate("/");
//         }
//     }, [navigate]);

//     return (
//         <>
//             {
//                 user === "user" && <Header />
//             }
//             {
//                 user === "admin" && <AdminHeader />

//             }
//             <section className="mt-auto">
//                 <div className=" mt-5 mb-5 flex items-center justify-center z-50 px-4">
//                     <div className="bg-[#36594E]/90 backdrop-blur-lg rounded-3xl p-8 max-w-md w-full  h-5xl text-white shadow-lg relative">
//                         <h2 className="text-2xl font-semibold mb-6 text-center">Profile</h2>
//                         <input
//                             type="text"
//                             placeholder="Name"
//                             className="w-full mb-4 px-5 py-3 rounded-full bg-[#2C4A40] placeholder-gray-300 focus:outline-none"
//                         />
//                         <input
//                             type="email"
//                             placeholder="Email"
//                             className="w-full mb-4 px-5 py-3 rounded-full bg-[#2C4A40] placeholder-gray-300 focus:outline-none"
//                         />
//                         <input
//                             type="password"
//                             placeholder="Password"
//                             className="w-full mb-6 px-5 py-3 rounded-full bg-[#2C4A40] placeholder-gray-300 focus:outline-none"
//                         />
//                         <button className="w-full bg-black py-3 rounded-full font-semibold hover:bg-white hover:text-black transition mb-2">
//                             Logout
//                         </button>
//                     </div>
//                 </div>

//             </section>
//         </>
//     );
// }

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminHeader from "../component/adminheader";
import Header from "../component/header";
import { jwtDecode } from "jwt-decode";
import { API_BASE_URL } from "./apiurl";
export default function Profile() {
    const navigate = useNavigate();
    const [role, setRole] = useState("user");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            navigate("/");
            return;
        }

        try {
            const decoded = jwtDecode(token);
            setRole(decoded.role);

            fetch(`${API_BASE_URL}/profile`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(res => res.json())
                .then(data => {
                    setName(data.name);
                    setEmail(data.email);
                });

        } catch (err) {
            localStorage.removeItem("token");
            alert(err);
            navigate("/");
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    return (
        <>
            {role === "admin" ? <AdminHeader /> : <Header />}

            <section className="mt-auto">
                <div className="mt-5 mb-5 flex items-center justify-center px-4">
                    <div className="bg-[#36594E]/90 rounded-3xl p-8 max-w-md w-full text-white shadow-lg">
                        <h2 className="text-2xl font-semibold mb-6 text-center">
                            Profile
                        </h2>

                        <input
                            type="text"
                            value={name}
                            readOnly
                            className="w-full mb-4 px-5 py-3 rounded-full bg-[#2C4A40]"
                        />

                        <input
                            type="email"
                            value={email}
                            readOnly
                            className="w-full mb-4 px-5 py-3 rounded-full bg-[#2C4A40]"
                        />

                        <input
                            type="password"
                            value="********"
                            readOnly
                            className="w-full mb-6 px-5 py-3 rounded-full bg-[#2C4A40]"
                        />

                        <button
                            onClick={handleLogout}
                            className="w-full bg-black py-3 rounded-full font-semibold hover:bg-white hover:text-black transition"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </section>
        </>
    );
}
