import React from "react";
import { X, Facebook, Instagram } from "lucide-react";

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-linear-to-b from-gray-50 to-white border-t border-gray-200 py-12 mt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center md:text-left">
                    <div className="md:col-span-1">
                        <h3 className="text-2xl font-bold text-black">ScholarStream</h3>
                        <p className="mt-2 text-gray-600 text-sm">
                            Centralized platform for scholarships and student opportunities.
                        </p>
                        <p className="mt-3 text-xs text-gray-500">
                            © {currentYear} <span className="text-black">Scholar Stream</span>. All rights reserved.
                        </p>
                    </div>
                    <div>
                        <h4 className="text-lg font-semibold text-gray-800 mb-3">Explore</h4>
                        <ul className="space-y-2 text-sm text-gray-600">
                            <li><a href="/" className="hover:text-green-600 transition">Home</a></li>
                            <li><a href="/allscholarships" className="hover:text-green-600 transition">All Scholarships</a></li>
                            <li><a href="/dashboard" className="hover:text-green-600 transition">Dashboard</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-lg font-semibold text-gray-800 mb-3">For You</h4>
                        <ul className="space-y-2 text-sm text-gray-600">
                            <li><a href="/login" className="hover:text-green-600 transition">Login</a></li>
                            <li><a href="/register" className="hover:text-green-600 transition">Register</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-lg font-semibold text-gray-800 mb-3">Connect With Us</h4>
                        <div className="flex justify-center md:justify-start gap-4 text-2xl mb-4">
                            <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-green-600 transition transform hover:scale-110" aria-label="X (Twitter)"><X size={26} /></a>
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-green-600 transition transform hover:scale-110" aria-label="Facebook"><Facebook size={26} /></a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-green-600 transition transform hover:scale-110" aria-label="Instagram"><Instagram size={26} /></a>
                        </div>
                        <p className="text-xs text-gray-500">Made with love for students</p>
                    </div>
                </div>
                <div className="mt-8 pt-6 border-t border-gray-300 text-center text-xs text-gray-500">
                    <p>Current time: {new Date().toLocaleString("en-US", { timeZone: "Asia/Dhaka", weekday: "long", year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit", second: "2-digit", timeZoneName: "short" })}</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;