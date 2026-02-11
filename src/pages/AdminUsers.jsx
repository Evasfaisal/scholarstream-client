import React, { useState, useEffect } from 'react';
import { doc, getDoc, updateDoc, deleteDoc, collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebase.config';
import { toast } from 'react-hot-toast';

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
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Manage Users</h2>
            <div className="mb-4 flex items-center gap-2">
                <label htmlFor="roleFilter" className="font-semibold">Filter by Role:</label>
                <select
                    id="roleFilter"
                    className="select select-bordered select-sm"
                    value={filterRole}
                    onChange={e => setFilterRole(e.target.value)}
                >
                    <option value="all">All</option>
                    <option value="student">Student</option>
                    <option value="moderator">Moderator</option>
                    <option value="admin">Admin</option>
                </select>
            </div>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.map((user) => (
                            <tr key={user.id}>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>
                                    {editingId === user.id ? (
                                        <select
                                            className="select select-bordered select-sm"
                                            value={role}
                                            onChange={(e) => setRole(e.target.value)}
                                        >
                                            <option value="student">student</option>
                                            <option value="moderator">moderator</option>
                                            <option value="admin">admin</option>
                                        </select>
                                    ) : (
                                        <span className="badge badge-outline">{user.role}</span>
                                    )}
                                </td>
                                <td>
                                    {editingId === user.id ? (
                                        <>
                                            <button
                                                className="btn btn-xs btn-success mr-2"
                                                onClick={() => handleSave(user.id)}
                                            >
                                                Save
                                            </button>
                                            <button
                                                className="btn btn-xs btn-ghost"
                                                onClick={() => setEditingId(null)}
                                            >
                                                Cancel
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <button
                                                className="btn btn-xs btn-primary mr-2"
                                                onClick={() => handleEdit(user)}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className="btn btn-xs btn-error"
                                                onClick={() => handleDelete(user.id)}
                                            >
                                                Delete
                                            </button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminUsers;
