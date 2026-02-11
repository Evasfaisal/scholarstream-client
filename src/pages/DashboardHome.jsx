import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const DashboardHome = () => {
    const { user } = useContext(AuthContext);

    return (
        <div className="max-w-4xl mx-auto p-4 sm:p-8">
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                <div className="flex items-center gap-4 mb-6">
                    <img
                        src={user?.photoURL || 'https://via.placeholder.com/80/4F46E5/FFFFFF?text=User'}
                        alt="Profile"
                        className="w-20 h-20 rounded-full border-4 border-primary/20"
                    />
                    <div>
                        <h2 className="text-3xl font-bold text-slate-800">Welcome back!</h2>
                        <p className="text-lg text-slate-600">{user?.displayName || user?.email}</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                    <Link to="/dashboard/my-applications" className="bg-blue-50 hover:bg-blue-100 p-6 rounded-xl transition">
                        <h3 className="text-xl font-bold text-primary mb-2">My Applications</h3>
                        <p className="text-slate-600">View and manage your scholarship applications</p>
                    </Link>

                    <Link to="/dashboard/my-reviews" className="bg-green-50 hover:bg-green-100 p-6 rounded-xl transition">
                        <h3 className="text-xl font-bold text-green-600 mb-2">My Reviews</h3>
                        <p className="text-slate-600">See all your submitted reviews</p>
                    </Link>

                    <Link to="/allscholarships" className="bg-purple-50 hover:bg-purple-100 p-6 rounded-xl transition">
                        <h3 className="text-xl font-bold text-purple-600 mb-2">Browse Scholarships</h3>
                        <p className="text-slate-600">Discover new opportunities</p>
                    </Link>
                </div>
            </div>

            <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl shadow-lg p-8">
                <h3 className="text-2xl font-bold mb-4">Quick Tips</h3>
                <ul className="space-y-2">
                    <li>✅ Complete your profile for better scholarship matches</li>
                    <li>✅ Apply early - scholarships fill up fast!</li>
                    <li>✅ Write detailed reviews to help other students</li>
                    <li>✅ Check application deadlines regularly</li>
                </ul>
            </div>
        </div>
    );
};

export default DashboardHome;
