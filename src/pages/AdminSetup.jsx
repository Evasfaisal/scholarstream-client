import React, { useState } from 'react';
import { createAdminAccount, getAdminCredentials } from '../utils/adminSeeder';
import { toast } from 'react-hot-toast';
import { FaTools, FaClipboardList, FaEnvelope, FaLock, FaExclamationTriangle, FaRocket, FaCheckCircle, FaKey, FaSyncAlt, FaBook } from 'react-icons/fa';

const AdminSetup = () => {
    const [loading, setLoading] = useState(false);
    const [adminCreated, setAdminCreated] = useState(false);
    const [credentials, setCredentials] = useState(null);

    const handleCreateAdmin = async () => {
        if (!window.confirm('Are you sure you want to create an admin account?')) return;

        try {
            setLoading(true);
            const result = await createAdminAccount();

            if (result.success) {
                setAdminCreated(true);
                setCredentials(result);
                toast.success('Admin account created successfully!');
            } else {
                setCredentials(getAdminCredentials());
                toast.info('Admin account already exists!');
            }
        } catch (error) {
            console.error('Error creating admin:', error);
            toast.error('Failed to create admin account');
        } finally {
            setLoading(false);
        }
    };

    const adminCreds = getAdminCredentials();

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
            <div className="max-w-2xl w-full bg-white rounded-2xl shadow-2xl p-8">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-800 mb-2 flex items-center justify-center gap-2"><FaTools className="inline-block text-blue-600" /> Admin Setup</h1>
                    <p className="text-gray-600 flex items-center justify-center gap-2"><FaClipboardList className="inline-block text-blue-500" /> Initialize ScholarStream Admin Account</p>
                </div>

                {!adminCreated ? (
                    <div className="space-y-6">
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                            <h2 className="text-xl font-semibold text-blue-800 mb-4 flex items-center gap-2">
                                <FaClipboardList className="inline-block text-blue-600" /> Admin Credentials (Default)
                            </h2>
                            <div className="space-y-2 text-blue-700">
                                <div className="flex justify-between items-center">
                                    <span className="font-medium flex items-center gap-2"><FaEnvelope className="inline-block text-blue-500" /> Email:</span>
                                    <span className="bg-blue-100 px-3 py-1 rounded font-mono">
                                        {adminCreds.email}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="font-medium flex items-center gap-2"><FaLock className="inline-block text-blue-500" /> Password:</span>
                                    <span className="bg-blue-100 px-3 py-1 rounded font-mono">
                                        {adminCreds.password}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                            <div className="flex items-start space-x-3">
                                <FaExclamationTriangle className="text-yellow-500 text-xl" />
                                <div className="text-yellow-700">
                                    <p className="font-medium mb-1">Important Notes:</p>
                                    <ul className="text-sm space-y-1 list-disc list-inside">
                                        <li>This will create a permanent admin account</li>
                                        <li>You can change credentials in /src/utils/adminSeeder.js</li>
                                        <li>Only run this once for initial setup</li>
                                        <li>Save the credentials safely</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={handleCreateAdmin}
                            disabled={loading}
                            className="w-full btn btn-primary btn-lg text-white font-semibold flex items-center gap-2"
                        >
                            {loading ? (
                                <span className="flex items-center gap-2">
                                    <span className="loading loading-spinner loading-sm"></span>
                                    Creating Admin Account...
                                </span>
                            ) : (
                                <><FaRocket className="inline-block text-white text-xl" /> Create Admin Account</>
                            )}
                        </button>
                    </div>
                ) : (
                    <div className="text-center space-y-6">
                        <FaCheckCircle className="text-green-600 text-6xl mb-4" />
                        <h2 className="text-2xl font-bold text-green-800">Admin Account Created!</h2>

                        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                            <h3 className="text-lg font-semibold text-green-800 mb-4 flex items-center gap-2">
                                <FaBook className="inline-block text-green-600" /> Your Admin Credentials
                            </h3>
                            <div className="space-y-3 text-green-700">
                                <div className="bg-green-100 p-3 rounded flex items-center gap-2">
                                    <FaEnvelope className="inline-block text-green-700 text-lg" />
                                    <strong>Admin Email:</strong><br />
                                    <code className="text-green-800">{credentials?.email}</code>
                                </div>
                                <div className="bg-green-100 p-3 rounded flex items-center gap-2">
                                    <FaLock className="inline-block text-green-700 text-lg" />
                                    <strong>Admin Password:</strong><br />
                                    <code className="text-green-800">{credentials?.password}</code>
                                </div>
                            </div>
                        </div>

                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <h4 className="font-semibold text-blue-800 mb-2 flex items-center gap-2"><FaClipboardList className="inline-block text-blue-600" /> Next Steps:</h4>
                            <ol className="text-blue-700 text-left space-y-1 list-decimal list-inside">
                                <li>Go to Login page</li>
                                <li>Login with the admin credentials above</li>
                                <li>Access Dashboard → Admin features will be available</li>
                                <li>Manage users, scholarships, and analytics</li>
                            </ol>
                        </div>

                        <div className="flex gap-3">
                            <a href="/login" className="btn btn-primary flex-1 flex items-center gap-2">
                                <FaKey className="inline-block text-white text-lg" /> Go to Login
                            </a>
                            <button
                                onClick={() => window.location.reload()}
                                className="btn btn-outline flex-1 flex items-center gap-2"
                            >
                                <FaSyncAlt className="inline-block text-blue-600 text-lg" /> Setup Another
                            </button>
                        </div>
                    </div>
                )}

                <div className="mt-8 pt-6 border-t border-gray-200">
                    <div className="text-center text-gray-500 text-sm flex items-center justify-center gap-2">
                        <FaBook className="inline-block text-purple-500 text-lg" /> ScholarStream Admin Setup Tool
                        <span>For development and initial configuration</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminSetup;