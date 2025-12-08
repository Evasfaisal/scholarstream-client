import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-hot-toast";
import { FiMenu, FiX } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";


const Navbar = () => {
    const { user, logout } = useAuth();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout();
            toast.success("Logged out successfully");
            navigate("/");
        } catch (err) {
            toast.error("Logout failed");
        }
        setDropdownOpen(false);
    };

    return (
        <nav className="bg-white shadow-md sticky top-0 z-50">
            <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl lg:max-w-full">
                <div className="flex justify-between items-center h-16">
                    <Link to="/" className="flex items-center gap-2">
                        <div className="text-2xl font-bold text-green-700">ScholarStream</div>
                    </Link>
                    <div className="hidden md:flex items-center gap-6">
                        <Link to="/" className="text-gray-700 hover:text-green-700 transition">Home</Link>
                        <Link to="/allscholarships" className="text-gray-700 hover:text-green-700 transition">All Scholarships</Link>
                        {user ? (
                            <div className="relative">
                                <button
                                    onClick={() => setDropdownOpen(!dropdownOpen)}
                                    className="flex items-center gap-2 text-gray-700 hover:text-green-700 transition"
                                >
                                    {user.photoURL ? (
                                        <img src={user.photoURL} alt="User" className="w-8 h-8 rounded-full" />
                                    ) : (
                                        <FaUserCircle size={28} />
                                    )}
                                    <span className="hidden lg:block">{user.displayName || "User"}</span>
                                </button>


                                {dropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200">
                                        <Link
                                            to="/dashboard"
                                            onClick={() => setDropdownOpen(false)}
                                            className="block px-4 py-3 text-green-700 font-semibold hover:bg-green-50 transition"
                                        >
                                            Dashboard
                                        </Link>
                                        <Link
                                            to="/add-review"
                                            onClick={() => setDropdownOpen(false)}
                                            className="block px-4 py-3 text-gray-700 hover:bg-green-50 transition"
                                        >
                                            Add Review
                                        </Link>
                                        <Link
                                            to="/my-reviews"
                                            onClick={() => setDropdownOpen(false)}
                                            className="block px-4 py-3 text-gray-700 hover:bg-green-50 transition"
                                        >
                                            My Reviews
                                        </Link>
                                        <Link
                                            to="/my-favorites"
                                            onClick={() => setDropdownOpen(false)}
                                            className="block px-4 py-3 text-gray-700 hover:bg-green-50 transition"
                                        >
                                            My Favorites
                                        </Link>
                                        <hr className="my-1" />
                                        <button
                                            onClick={handleLogout}
                                            className="w-full text-left px-4 py-3 text-green-600 hover:bg-green-50 transition"
                                        >
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="flex gap-3">
                                <Link
                                    to="/login"
                                    className="px-4 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition"
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/register"
                                    className="px-4 py-2 border border-green-600 text-green-600 rounded-full hover:bg-green-50 transition"
                                >
                                    Register
                                </Link>
                            </div>
                        )}
                    </div>


                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden text-gray-700"
                    >
                        {mobileMenuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
                    </button>
                </div>


                {mobileMenuOpen && (
                    <div className="md:hidden bg-white border-t">
                        <Link to="/" className="block px-4 py-3 text-gray-700 hover:bg-green-50">Home</Link>
                        <Link to="/allscholarships" className="block px-4 py-3 text-gray-700 hover:bg-green-50">All Scholarships</Link>
                        {user ? (
                            <>
                                <Link to="/dashboard" className="block px-4 py-3 text-green-700 font-semibold hover:bg-green-50">Dashboard</Link>
                                <Link to="/add-review" className="block px-4 py-3 text-gray-700 hover:bg-green-50">Add Review</Link>
                                <Link to="/my-reviews" className="block px-4 py-3 text-gray-700 hover:bg-green-50">My Reviews</Link>
                                <Link to="/my-favorites" className="block px-4 py-3 text-gray-700 hover:bg-green-50">My Favorites</Link>
                                <button
                                    onClick={handleLogout}
                                    className="w-full text-left px-4 py-3 text-green-600 hover:bg-green-50"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="block px-4 py-3 text-gray-700 hover:bg-green-50">Login</Link>
                                <Link to="/register" className="block px-4 py-3 text-gray-700 hover:bg-green-50">Register</Link>
                            </>
                        )}
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;