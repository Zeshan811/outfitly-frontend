import { FaTwitter, FaFacebookF, FaInstagram } from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="bg-[#7B8C84] text-black py-8 md:py-12 rounded-t-2xl">
            <div className="container mx-auto px-6 md:px-12">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-6 text-sm">

                    {/* Logo Section */}
                    <div className="flex justify-center md:justify-start items-center mb-4 md:mb-0">
                        <span className="text-3xl mr-2">🛍️</span>
                        <h1 className="font-bold text-xl">Outfitly</h1>
                    </div>

                    {/* Footer Columns */}
                    <div className="text-center md:text-left">
                        <ul className="space-y-1">
                            <li className="font-bold">WEEBLY THEMES</li>
                            <li>PRE SALE FAQS</li>
                            <li>SUBMIT A TICKET</li>
                        </ul>
                    </div>

                    <div className="text-center md:text-left">
                        <ul className="space-y-1">
                            <li className="font-bold">SERVICES</li>
                            <li>THEME TWEAK</li>
                        </ul>
                    </div>

                    <div className="text-center md:text-left">
                        <ul className="space-y-1">
                            <li className="font-bold">RESOURCES</li>
                            <li>HELP CENTER</li>
                            <li>GUIDES</li>
                        </ul>
                    </div>

                    <div className="text-center md:text-left">
                        <ul className="space-y-1">
                            <li className="font-bold">COMPANY</li>
                            <li>ABOUT US</li>
                            <li>CONTACT</li>
                        </ul>
                    </div>
                </div>

                {/* Divider */}
                <hr className="border-black my-6" />

                {/* Social Icons */}
                <div className="flex justify-center space-x-5 mb-3 text-2xl md:text-xl">
                    <FaTwitter className="hover:text-white transition" />
                    <FaFacebookF className="hover:text-white transition" />
                    <FaInstagram className="hover:text-white transition" />
                </div>

                {/* Copyright */}
                <p className="text-center font-bold text-sm mt-4 md:mt-0">
                    Copywrites: All right reserved
                </p>
            </div>
        </footer>
    );
}
