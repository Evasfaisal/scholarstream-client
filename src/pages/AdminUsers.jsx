import React, { useState, useEffect } from 'react';
import { doc, getDoc, updateDoc, deleteDoc, collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebase.config';
import { toast } from 'react-hot-toast';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { FaUsers, FaCrown, FaBolt, FaGraduationCap, FaLock, FaCog, FaBook, FaSave } from 'react-icons/fa';

const AdminUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState(null);
    const [role, setRole] = useState('Student');
    const [filterRole, setFilterRole] = useState('all');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setLoading(true);
                const usersSnapshot = await getDocs(collection(db, 'users'));
                const usersData = usersSnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setUsers(usersData);
            } catch (err) {
                console.error('Failed to fetch users:', err);
                toast.error('Failed to load users');
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);
    const filteredUsers = filterRole === 'all' ? users : users.filter(u => u.role === filterRole);

    const handleEdit = (user) => {
        setEditingId(user._id || user.id);
        setRole(user.role);
    };


    const handleSave = async (id) => {
        try {
            await updateDoc(doc(db, 'users', id), { role });
            setUsers((prev) => prev.map((user) => (user.id === id ? { ...user, role } : user)));
            setEditingId(null);
            toast.success('User role updated successfully');
        } catch (err) {
            console.error('Failed to update user role:', err);
            toast.error('Failed to update user role');
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this user?')) return;
        try {
            await deleteDoc(doc(db, 'users', id));
            setUsers((prev) => prev.filter((user) => user.id !== id));
            toast.success('User deleted successfully');
        } catch (err) {
            console.error('Failed to delete user:', err);
            toast.error('Failed to delete user');
        }
    };

    return (
        <div className="p-4 md:p-8 max-w-7xl mx-auto">
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 mb-8 shadow-sm">
                <h2 className="text-3xl font-bold text-slate-800 mb-2">Manage Users</h2>
                <p className="text-slate-600">
                    <span className="bg-purple-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        {users.length} Total Users
                    </span>
                </p>
            </div>

            {loading ? (
                <div className="flex items-center justify-center py-12">
                    <span className="loading loading-spinner loading-lg text-primary"></span>
                </div>
            ) : users.length === 0 ? (
                <div className="bg-white rounded-lg shadow p-12 text-center">
                    <div className="text-6xl mb-4"><FaUsers /></div>
                    <h3 className="text-xl font-semibold text-slate-700 mb-2">No Users Found</h3>
                    <p className="text-slate-500">Users will appear here when they register</p>
                </div>
            ) : (
                <>
                    <div className="mb-4 flex items-center gap-2">
                        <label htmlFor="roleFilter" className="font-semibold text-slate-700">Filter by Role:</label>
                        <select
                            id="roleFilter"
                            className="select select-bordered"
                            value={filterRole}
                            onChange={e => setFilterRole(e.target.value)}
                        >
                            <option value="all">All Roles</option>
                            <option value="Student">Student</option>
                            <option value="Moderator">Moderator</option>
                            <option value="Admin">Admin</option>
                        </select>
                        <span className="text-sm text-slate-500">
                            ({filteredUsers.length} users)
                        </span>
                    </div>

                
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredUsers.map((user) => (
                            <div key={user.id} className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 border-t-4 border-purple-500">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                                        {user.name?.charAt(0).toUpperCase() || 'U'}
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-xl font-bold text-slate-800 truncate">{user.name}</h3>
                                        <p className="text-sm text-slate-500 truncate">{user.email}</p>
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <span className={`badge badge-lg ${user.role === 'Admin' ? 'badge-error' :
                                        user.role === 'Moderator' ? 'badge-warning' :
                                            'badge-info'
                                        }`}>
                                        {user.role}
                                    </span>
                                </div>

                                <div className="flex gap-3">
                                    <button
                                        className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 px-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 hover:scale-105"
                                        onClick={() => setEditingId(user.id)}
                                    >
                                        <FaEdit className="text-lg" />
                                        <span>Change Role</span>
                                    </button>
                                    <button
                                        className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold py-3 px-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 hover:scale-105"
                                        onClick={() => handleDelete(user.id)}
                                    >
                                        <FaTrash />
                                        <span>Delete</span>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                
                    {editingId && (
                        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                            <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full relative overflow-hidden animate-fadeIn">
                                <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-6 text-white">
                                    <button
                                        className="absolute top-4 right-4 text-white hover:bg-white/20 rounded-full w-8 h-8 flex items-center justify-center transition-all"
                                        onClick={() => setEditingId(null)}
                                    >
                                        ×
                                    </button>
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                                            <FaEdit className="text-2xl" />
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-bold">Change User Role</h3>
                                            <p className="text-purple-100 text-sm mt-1">Select a new role for this user</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <label className="block text-sm font-bold text-slate-700 mb-4">
                                        Select Role
                                    </label>
                                    <div className="space-y-3">
                                        {['Student', 'Moderator', 'Admin'].map((roleOption) => (
                                            <label
                                                key={roleOption}
                                                className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${role === roleOption
                                                    ? 'border-purple-500 bg-gradient-to-r from-purple-50 to-pink-50 shadow-md scale-105'
                                                    : 'border-slate-200 hover:border-purple-300 hover:bg-slate-50 hover:shadow-sm'
                                                    }`}
                                            >
                                                <input
                                                    type="radio"
                                                    name="role"
                                                    value={roleOption}
                                                    checked={role === roleOption}
                                                    onChange={(e) => setRole(e.target.value)}
                                                    className="radio radio-primary w-5 h-5"
                                                />
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <span className="font-bold text-slate-800 text-lg">{roleOption}</span>
                                                        <span className={`badge ${roleOption === 'Admin' ? 'badge-error' :
                                                            roleOption === 'Moderator' ? 'badge-warning' :
                                                                'badge-info'
                                                            } badge-sm`}>
                                                            {roleOption === 'Admin' ? <FaCrown /> : roleOption === 'Moderator' ? <FaBolt /> : <FaGraduationCap />}
                                                        </span>
                                                    </div>
                                                    <p className="text-xs text-slate-600">
                                                        {roleOption === 'Admin' && (<><FaLock className="inline-block mr-1" /> Full access to manage scholarships, users & analytics</>)}
                                                        {roleOption === 'Moderator' && (<><FaCog className="inline-block mr-1" /> Can review applications and manage student reviews</>)}
                                                        {roleOption === 'Student' && (<><FaBook className="inline-block mr-1" /> Can apply for scholarships and write reviews</>)}
                                                    </p>
                                                </div>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                                <div className="bg-slate-50 p-6 flex gap-3 border-t border-slate-200">
                                    <button
                                        className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 hover:scale-105"
                                        onClick={() => handleSave(editingId)}
                                    >
                                        <span>💾</span>
                                                                                <FaSave className="inline-block mr-1" />
                                        <span>Save Changes</span>
                                    </button>
                                    <button
                                        className="bg-white hover:bg-slate-100 text-slate-700 font-semibold py-3 px-6 rounded-lg border-2 border-slate-300 transition-all duration-300 hover:scale-105"
                                        onClick={() => setEditingId(null)}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default AdminUsers;
