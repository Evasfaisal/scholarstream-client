import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebase.config";

const AdminProfile = () => {
    const { user } = useContext(AuthContext);
    const [role, setRole] = useState(localStorage.getItem('userRole') || 'Student');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRole = async () => {
            if (user?.uid) {
                try {
                    const storedRole = localStorage.getItem('userRole');
                    if (storedRole) {
                        setRole(storedRole);
                        setLoading(false);
                    } else {
                        const userDoc = await getDoc(doc(db, "users", user.uid));
                        if (userDoc.exists()) {
                            const userRole = userDoc.data().role || "Student";
                            setRole(userRole);
                            localStorage.setItem('userRole', userRole);
                        }
                        setLoading(false);
                    }
                } catch (error) {
                    console.error("Error fetching role:", error);
                    setLoading(false);
                }
            }
        };
        fetchRole();
    }, [user]);

    const getRoleColor = () => {
        switch (role) {
            case 'Admin': return 'badge-error';
            case 'Moderator': return 'badge-warning';
            case 'Student': return 'badge-info';
            default: return 'badge-primary';
        }
    };

    const getRoleIcon = () => {
        switch (role) {
            case 'Admin': return '👑';
            case 'Moderator': return '⚡';
            case 'Student': return '🎓';
            default: return '👤';
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );
    }

    return (
        <div className="w-full max-w-5xl mx-auto">
            {/* Header */}
            <div className="bg-gradient-to-r from-primary/10 to-blue-50 rounded-xl p-4 sm:p-6 mb-6 shadow-sm">
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-2">My Profile</h2>
                <p className="text-slate-600 text-sm sm:text-base">Manage your account information</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Profile Card */}
                <div className="lg:col-span-1 bg-white rounded-2xl shadow-lg p-6">
                    <div className="flex flex-col items-center text-center">
                        <div className="relative mb-4">
                            <img
                                src={user?.photoURL || 'https://via.placeholder.com/150/4F46E5/FFFFFF?text=User'}
                                alt="Profile"
                                className="w-32 h-32 rounded-full border-4 border-primary/20 shadow-md"
                            />
                            <div className="absolute bottom-0 right-0 w-8 h-8 bg-green-500 rounded-full border-4 border-white"></div>
                        </div>
                        <h3 className="text-xl font-bold text-slate-800 mb-1">{user?.displayName || 'Anonymous User'}</h3>
                        <p className="text-slate-600 text-sm mb-3">{user?.email}</p>

                        {/* Role Badge - Prominent */}
                        <div className={`badge ${getRoleColor()} badge-lg gap-2 mb-2 px-4 py-3 text-white font-bold`}>
                            <span className="text-lg">{getRoleIcon()}</span>
                            <span>{role}</span>
                        </div>

                        <div className="badge badge-success badge-sm">Active Account</div>
                    </div>
                </div>

                {/* Details Cards */}
                <div className="lg:col-span-2 space-y-4">
                    {/* Role Card - First and Prominent */}
                    <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl shadow-lg p-6 border-2 border-indigo-200">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${role === 'Admin' ? 'bg-red-100' :
                                    role === 'Moderator' ? 'bg-yellow-100' :
                                        'bg-blue-100'
                                    }`}>
                                    <span className="text-2xl">{getRoleIcon()}</span>
                                </div>
                                <h4 className="font-bold text-slate-800 text-lg">Account Role</h4>
                            </div>
                            <div className={`badge ${getRoleColor()} gap-2 text-white font-bold badge-lg px-4 py-3`}>
                                <span className="text-black">{role}</span>
                            </div>
                        </div>
                        <div className="bg-white rounded-lg p-4 text-sm font-semibold text-slate-800 shadow-sm border border-slate-200">
                            {role === 'Admin' && '👑 Full access to manage scholarships, users, and view analytics'}
                            {role === 'Moderator' && '⚡ Can review applications and manage student reviews'}
                            {role === 'Student' && '🎓 Can apply for scholarships and write reviews'}
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-lg p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                <span className="text-2xl">👤</span>
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-800">User ID</h4>
                                <p className="text-xs sm:text-sm text-slate-600 break-all">{user?.uid}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-lg p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                                <span className="text-2xl">📅</span>
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-800">Account Created</h4>
                                <p className="text-xs sm:text-sm text-slate-600">{new Date(user?.metadata?.creationTime).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-lg p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                                <span className="text-2xl">🕒</span>
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-800">Last Sign In</h4>
                                <p className="text-xs sm:text-sm text-slate-600">{new Date(user?.metadata?.lastSignInTime).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-lg p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                                <span className="text-2xl">📧</span>
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-800">Email Status</h4>
                                <p className="text-xs sm:text-sm text-slate-600">
                                    {user?.emailVerified ? (
                                        <span className="badge badge-success">✓ Verified</span>
                                    ) : (
                                        <span className="badge badge-warning">⚠ Not Verified</span>
                                    )}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminProfile;
