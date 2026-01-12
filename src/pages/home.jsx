import Header from "../component/header";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import AdminHeader from "../component/adminheader";
const products = [
    { title: "Belted Jacket", price: "3000", img: "/public/ali-ahmadi-rihy34eSbvw-unsplash.jpg" },
    { title: "Brown Leather Jacket", price: "4000", img: "/public/ali-karimiboroujeni-zzKT12IXGfA-unsplash.jpg" },
    { title: "Classic Coat", price: "3500", img: "/public/senya-zhukavin-_pxu5HDcoj4-unsplash.jpg" },
    { title: "Winter Jacket", price: "4000", img: "/public/mahdi-chaghari-EiVMVbT31xU-unsplash.jpg" },
    { title: "Plain Blue", price: "1800", img: "/public/rydale-clothing-frrvujD6QwA-unsplash.jpg" },
    { title: "Plain Pink", price: "1600", img: "/public/venti-views-_gfxywoO_js-unsplash.jpg" },
];

export default function Home() {
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
                // alert("Welcome Admin");
            } else {
                setUser("user");
                // alert("Welcome User");

            }
        } catch (e) {
            // Invalid token
            localStorage.removeItem("token");
            alert(e);
            navigate("/");
        }
    }, [navigate]);
    return (
        <>
            {user === "user" &&
                <Header />
            }

            {user === "admin" &&
                <AdminHeader />
            }
            {/* Hero Section */}
            <div className="w-full flex flex-col pb-20"> {/* Added pb-20 for footer space */}

                <div className="relative bg-[#36594E]  text-white p-6 flex items-start justify-between shadow-lg">

                    {/* Left Content */}
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

                    {/* Right Image */}
                    <div className="flex-1 flex justify-end pr-20">
                        <img
                            src="/dom-hill-nimElTcTNyY-unsplash.jpg"
                            alt="Fashion Collection"
                            className="w-3/3 h-auto object-cover rounded-lg max-h-[330px]"
                        />
                    </div>

                    {/* Buttons */}
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
            <section className="w-full bg-white py-20">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center px-6">

                    {/* LEFT SIDE - TEXT */}
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

                        <button className="border border-black px-8 py-3 font-semibold rounded-full text-white bg-black
        hover:bg-gray-100 hover:text-black   transition-all duration-300" onClick={() => navigate("/shop")}>
                            Explore
                        </button>
                    </div>

                    {/* RIGHT SIDE - IMAGES */}
                    <div className="relative flex justify-betweem items-center">
                        {/* Image 1 */}
                        <img
                            src="/public/main2.jpeg"
                            alt="Model 1"
                            className="w-[420px] h-auto object-cover "
                        />

                        {/* Image 2 */}
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
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-6">
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
                                <button className="bg-black text-white px-5 py-2 rounded-full hover:bg-white hover:text-black border border-black transition" onClick={() => { navigate("/shop"); }}>
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

        </>
    );
}

