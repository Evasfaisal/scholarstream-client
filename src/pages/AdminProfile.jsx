import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const AdminProfile = () => {
    const { user, userRole } = useContext(AuthContext);
    return (
        <div className="p-6 max-w-lg mx-auto bg-base-100 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-4">My Profile</h2>
            <div className="space-y-2">
                <div><span className="font-semibold">Name:</span> {user?.displayName || 'N/A'}</div>
                <div><span className="font-semibold">Email:</span> {user?.email}</div>
                <div><span className="font-semibold">Role:</span> {userRole || 'Student'}</div>
            </div>
        </div>
    );
};

export default AdminProfile;
import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const AdminProfile = () => {
    const { user, userRole } = useContext(AuthContext);

    return (
        <div className="p-6 max-w-lg mx-auto bg-base-100 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-4">My Profile</h2>
            <div className="space-y-2">
                <div><span className="font-semibold">Name:</span> {user?.displayName || 'N/A'}</div>
                <div><span className="font-semibold">Email:</span> {user?.email}</div>
                <div><span className="font-semibold">Role:</span> {userRole || 'Admin'}</div>
            </div>
        </div>
        // Additional profile information can be added here
        // Example: <div><span className="font-semibold">Joined:</span> {user?.joinedDate || 'N/A'}</div>
    );
};

export default AdminProfile;
