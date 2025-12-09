import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-hot-toast";
import { FiMenu, FiX } from "react-icons/fi";
import { FaUserCircle, FaGraduationCap } from "react-icons/fa";


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
        <nav className="bg-white/90 backdrop-blur shadow-lg sticky top-0 z-50 border-b border-slate-200">
            <div className="mx-auto px-4 sm:px-8 max-w-7xl">
                <div className="flex justify-between items-center h-20">
                    <Link to="/" className="flex items-center gap-2">
                        <span className="inline-flex items-center justify-center w-8 h-8 font-extrabold text-xl shadow mr-2">
                            <FaGraduationCap size={22} />
                        </span>
                        <span className="text-2xl font-extrabold text-slate-800 tracking-tight">ScholarStream</span>
                    </Link>
                    <div className="hidden md:flex items-center gap-8">
                        <Link to="/" className="text-slate-700 hover:text-primary font-medium transition">Home</Link>
                        <Link to="/allscholarships" className="text-slate-700 hover:text-primary font-medium transition">All Scholarships</Link>
                        {user ? (
                            <div className="relative">
                                <button
                                    onClick={() => setDropdownOpen(!dropdownOpen)}
                                    className="flex items-center gap-2 text-slate-700 hover:text-primary font-semibold transition px-3 py-2 rounded-full border border-slate-200 bg-white shadow-sm"
                                >
                                    {user.photoURL ? (
                                        <img src={user.photoURL} alt="User" className="w-9 h-9 rounded-full border-2 border-primary/30 shadow" />
                                    ) : (
                                        <FaUserCircle size={30} className="text-primary/80" />
                                    )}
                                    <span className="hidden lg:block">{user.displayName || "User"}</span>
                                </button>
                                {dropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-60 bg-white rounded-xl shadow-2xl border border-slate-200 py-2">
                                        <Link
                                            to="/dashboard"
                                            onClick={() => setDropdownOpen(false)}
                                            className="block px-5 py-3 text-primary font-bold hover:bg-slate-50 rounded-xl transition"
                                        >
                                            Dashboard
                                        </Link>
                                        {/* Removed Add Review, My Reviews, My Favorites from dropdown */}
                                        <hr className="my-2" />
                                        <button
                                            onClick={handleLogout}
                                            className="w-full text-left px-5 py-3 text-red-500 font-semibold hover:bg-slate-50 rounded-xl transition"
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
                                    className="px-5 py-2 bg-primary text-black rounded-full font-semibold shadow hover:bg-primary/90 transition"
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/register"
                                    className="px-5 py-2 border-2 border-primary text-primary rounded-full font-semibold shadow hover:bg-primary/10 transition"
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
                    <div className="md:hidden bg-white border-t border-slate-200 shadow-xl rounded-b-xl">
                        <Link to="/" className="block px-5 py-4 text-slate-700 hover:bg-primary/10 font-medium">Home</Link>
                        <Link to="/allscholarships" className="block px-5 py-4 text-slate-700 hover:bg-primary/10 font-medium">All Scholarships</Link>
                        {user ? (
                            <>
                                <Link to="/dashboard" className="block px-5 py-4 text-primary font-bold hover:bg-primary/10">Dashboard</Link>
                                {/* Removed Add Review, My Reviews, My Favorites from mobile menu */}
                                <button
                                    onClick={handleLogout}
                                    className="w-full text-left px-5 py-4 text-red-500 font-semibold hover:bg-primary/10"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="block px-5 py-4 text-black hover:bg-primary/10 font-medium">Login</Link>
                                <Link to="/register" className="block px-5 py-4 text-slate-700 hover:bg-primary/10 font-medium">Register</Link>
                            </>
                        )}
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;