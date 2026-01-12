import {
    ShoppingCart, User
} from "lucide-react";
import {
    Link
} from "react-router-dom";

export default function Header() {
    return (
        <header className="bg-[#36594E] text-white shadow-md">
            <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

                { /* Left - Logo */}
                <Link to="/home" className="text-2xl font-semibold flex items-center gap-2">
                    <ShoppingCart className="w-6 h-6" />
                    <span>Outfitly</span>
                </Link>

                { /* Center - Navigation Links */}
                <nav>
                    <ul className="hidden md:flex space-x-8 text-sm font-medium">
                        <li><Link to="/home" className="hover:text-gray-200 transition">Home</Link></li>
                        <li><Link to="/shop" className="hover:text-gray-200 transition">Shop</Link></li>
                        <li><Link to="/about" className="hover:text-gray-200 transition">About Us</Link></li>
                        <li><Link to="/contact" className="hover:text-gray-200 transition">Contact Us</Link></li>
                        <li><Link to="/ordersummary" className="hover:text-gray-200 transition">Order Summary</Link></li>
                    </ul>
                </nav>

                { /* Right - Icons */}
                <div className="flex items-center space-x-4">
                    <Link to="/profile" className="hover:text-gray-200 transition">
                        <User className="w-5 h-5 cursor-pointer hover:scale-110 transition"
                        />
                    </Link>
                    <Link to="/cart" className="hover:text-gray-200 transition">
                        <ShoppingCart className="w-5 h-5 cursor-pointer hover:scale-110 transition" />
                    </Link>

                </div>
            </div>
        </header>
    );
}