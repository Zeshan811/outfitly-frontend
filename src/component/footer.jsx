import {
    FaTwitter, FaFacebookF, FaInstagram
} from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="bg-[#7B8C84] text-black py-8 rounded-t-2xl ">
            <div className="container mx-auto px-6 md:px-12">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-6 text-sm">

                    { /* Logo Section */}
                    <div>
                        <div className="flex items-center space-x-2 mb-3">
                            <span className="text-3xl">🛍️</span>
                            <h1 className="font-bold text-xl">Outfitly</h1>
                        </div>
                    </div>

                    { /* Footer Columns */}
                    <div>
                        <ul className="space-y-1">
                            <li className="font-bold">WEEBLY THEMES</li>
                            <li>PRE SALE FAQS</li>
                            <li>SUBMIT A TICKET</li>
                        </ul>
                    </div>

                    <div>
                        <ul className="space-y-1">
                            <li className="font-bold">SERVICES</li>
                            <li>THEME TWEAK</li>
                        </ul>
                    </div>

                    <div>
                        <ul className="space-y-1">
                            <li className="font-bold">WEEBLY THEMES</li>
                            <li>PRE SALE FAQS</li>
                            <li>SUBMIT A TICKET</li>
                        </ul>
                    </div>

                    <div>
                        <ul className="space-y-1">
                            <li className="font-bold">WEEBLY THEMES</li>
                            <li>PRE SALE FAQS</li>
                            <li>SUBMIT A TICKET</li>
                        </ul>
                    </div>
                </div>

                { /* Divider */}
                <hr className="border-black my-6" />

                { /* Social Icons */}
                <div className="flex justify-center space-x-5 mb-3">
                    <FaTwitter className="text-xl hover:text-white transition" />
                    <FaFacebookF className="text-xl hover:text-white transition" />
                    <FaInstagram className="text-xl hover:text-white transition" />
                </div>

                { /* Copyright */}
                <p className="text-center font-bold text-sm">
                    Copywrites: All right reserved
                </p>
            </div>
        </footer>
    );
}