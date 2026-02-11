import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const AdminProfile = () => {
    const { user } = useContext(AuthContext);
    return (
        <div className="p-6 max-w-2xl mx-auto bg-white rounded-2xl shadow-lg">
            <h2 className="text-3xl font-bold mb-6 text-slate-800">My Profile</h2>
            <div className="flex items-center gap-6 mb-6">
                <img
                    src={user?.photoURL || 'https://via.placeholder.com/100/4F46E5/FFFFFF?text=User'}
                    alt="Profile"
                    className="w-24 h-24 rounded-full border-4 border-primary/20"
                />
                <div>
                    <h3 className="text-xl font-semibold text-slate-800">{user?.displayName || 'Anonymous User'}</h3>
                    <p className="text-slate-600">{user?.email}</p>
                </div>
            </div>
            <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-xl">
                    <span className="font-semibold text-slate-700">User ID:</span>
                    <p className="text-slate-600 text-sm mt-1">{user?.uid}</p>
                </div>
                <div className="p-4 bg-green-50 rounded-xl">
                    <span className="font-semibold text-slate-700">Account Created:</span>
                    <p className="text-slate-600 text-sm mt-1">{user?.metadata?.creationTime}</p>
                </div>
                <div className="p-4 bg-purple-50 rounded-xl">
                    <span className="font-semibold text-slate-700">Last Sign In:</span>
                    <p className="text-slate-600 text-sm mt-1">{user?.metadata?.lastSignInTime}</p>
                </div>
            </div>
        </div>
    );
};

export default AdminProfile;
