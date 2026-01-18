import { ShoppingCart, User, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className="bg-[#36594E] text-white shadow-md">
            <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

                {/* Left - Logo */}
                <Link to="/home" className="text-2xl font-semibold flex items-center gap-2">
                    <ShoppingCart className="w-6 h-6" />
                    <span>Outfitly</span>
                </Link>

                {/* Center - Navigation (Desktop) */}
                <nav className="hidden md:block">
                    <ul className="flex space-x-8 text-sm font-medium">
                        <li><Link to="/home" className="hover:text-gray-200 transition">Home</Link></li>
                        <li><Link to="/shop" className="hover:text-gray-200 transition">Shop</Link></li>
                        <li><Link to="/about" className="hover:text-gray-200 transition">About Us</Link></li>
                        <li><Link to="/contact" className="hover:text-gray-200 transition">Contact Us</Link></li>
                        <li><Link to="/ordersummary" className="hover:text-gray-200 transition">Order Summary</Link></li>
                    </ul>
                </nav>

                {/* Right - Icons */}
                <div className="flex items-center space-x-4">
                    <Link to="/profile">
                        <User className="w-5 h-5 hover:scale-110 transition" />
                    </Link>
                    <Link to="/cart">
                        <ShoppingCart className="w-5 h-5 hover:scale-110 transition" />
                    </Link>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden"
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        {menuOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <div className="md:hidden bg-[#36594E] px-6 pb-4">
                    <ul className="flex flex-col space-y-4 text-sm font-medium">
                        <li><Link onClick={() => setMenuOpen(false)} to="/home">Home</Link></li>
                        <li><Link onClick={() => setMenuOpen(false)} to="/shop">Shop</Link></li>
                        <li><Link onClick={() => setMenuOpen(false)} to="/about">About Us</Link></li>
                        <li><Link onClick={() => setMenuOpen(false)} to="/contact">Contact Us</Link></li>
                        <li><Link onClick={() => setMenuOpen(false)} to="/ordersummary">Order Summary</Link></li>
                    </ul>
                </div>
            )}
        </header>
    );
}
