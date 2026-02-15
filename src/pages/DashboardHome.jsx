import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebase.config";
import { FaCheck } from "react-icons/fa";

const DashboardHome = () => {
    const { user } = useContext(AuthContext);
    const [role, setRole] = useState(localStorage.getItem('userRole') || "Student");

    useEffect(() => {
        const fetchUserRole = async () => {
            if (user?.uid) {
                try {
                    const userDoc = await getDoc(doc(db, "users", user.uid));
                    if (userDoc.exists()) {
                        const userRole = userDoc.data().role || "Student";
                        setRole(userRole);
                    }
                } catch (error) {
                    console.error("Error fetching user role:", error);
                }
            }
        };
        fetchUserRole();
    }, [user]);

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
                        <h2 className="text-3xl font-bold text-slate-800">Welcome back, {role}!</h2>
                        <p className="text-lg text-slate-600">{user?.displayName || user?.email}</p>
                        <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-semibold mt-2">
                            {role}
                        </span>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                    {role === "Admin" && (
                        <>
                            <Link to="/dashboard/add-scholarship" className="bg-blue-50 hover:bg-blue-100 p-6 rounded-xl transition">
                                <h3 className="text-xl font-bold text-primary mb-2">Add Scholarship</h3>
                                <p className="text-slate-600">Create new scholarship listings</p>
                            </Link>

                            <Link to="/dashboard/manage-scholarships" className="bg-green-50 hover:bg-green-100 p-6 rounded-xl transition">
                                <h3 className="text-xl font-bold text-green-600 mb-2">Manage Scholarships</h3>
                                <p className="text-slate-600">Edit and delete scholarships</p>
                            </Link>

                            <Link to="/dashboard/manage-users" className="bg-purple-50 hover:bg-purple-100 p-6 rounded-xl transition">
                                <h3 className="text-xl font-bold text-purple-600 mb-2">Manage Users</h3>
                                <p className="text-slate-600">Change user roles and permissions</p>
                            </Link>

                            <Link to="/dashboard/analytics" className="bg-orange-50 hover:bg-orange-100 p-6 rounded-xl transition">
                                <h3 className="text-xl font-bold text-orange-600 mb-2">Analytics</h3>
                                <p className="text-slate-600">View platform statistics</p>
                            </Link>
                        </>
                    )}

                    {role === "Moderator" && (
                        <>
                            <Link to="/dashboard/applications" className="bg-blue-50 hover:bg-blue-100 p-6 rounded-xl transition">
                                <h3 className="text-xl font-bold text-primary mb-2">Manage Applications</h3>
                                <p className="text-slate-600">Review and process applications</p>
                            </Link>

                            <Link to="/dashboard/all-reviews" className="bg-green-50 hover:bg-green-100 p-6 rounded-xl transition">
                                <h3 className="text-xl font-bold text-green-600 mb-2">All Reviews</h3>
                                <p className="text-slate-600">Moderate student reviews</p>
                            </Link>
                        </>
                    )}

                    {role === "Student" && (
                        <>
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
                        </>
                    )}
                </div>
            </div>

            <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl shadow-lg p-8">
                <h3 className="text-2xl font-bold mb-4">
                    {role === "Admin" ? "Admin Dashboard Tips" : role === "Moderator" ? "Moderator Guidelines" : "Quick Tips"}
                </h3>
                <ul className="space-y-2">
                    {role === "Admin" && (
                        <>
                            <li><FaCheck className="inline-block mr-2 text-green-300" /> Keep scholarship information up to date</li>
                            <li><FaCheck className="inline-block mr-2 text-green-300" /> Monitor user activities regularly</li>
                            <li><FaCheck className="inline-block mr-2 text-green-300" /> Review analytics to track platform growth</li>
                            <li><FaCheck className="inline-block mr-2 text-green-300" /> Respond to user queries promptly</li>
                        </>
                    )}
                    {role === "Moderator" && (
                        <>
                            <li><FaCheck className="inline-block mr-2 text-green-300" /> Review applications within 48 hours</li>
                            <li><FaCheck className="inline-block mr-2 text-green-300" /> Provide constructive feedback to students</li>
                            <li><FaCheck className="inline-block mr-2 text-green-300" /> Verify document authenticity carefully</li>
                            <li><FaCheck className="inline-block mr-2 text-green-300" /> Maintain fair and unbiased decisions</li>
                        </>
                    )}
                    {role === "Student" && (
                        <>
                            <li><FaCheck className="inline-block mr-2 text-green-300" /> Complete your profile for better scholarship matches</li>
                            <li><FaCheck className="inline-block mr-2 text-green-300" /> Apply early - scholarships fill up fast!</li>
                            <li><FaCheck className="inline-block mr-2 text-green-300" /> Write detailed reviews to help other students</li>
                            <li><FaCheck className="inline-block mr-2 text-green-300" /> Check application deadlines regularly</li>
                        </>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default DashboardHome;
