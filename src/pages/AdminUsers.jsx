
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { apiUrl } from '../utils/api';

const AdminUsers = () => {
    const [users, setUsers] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [role, setRole] = useState('student');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await axios.get(apiUrl('/api/users'));
                setUsers(res.data);
            } catch (err) {
                console.error('Failed to fetch users:', err);
            }
        };
        fetchUsers();
    }, []);

    const handleEdit = (user) => {
        setEditingId(user._id || user.id);
        setRole(user.role);
    };

    const handleSave = async (id) => {
        try {
            await axios.put(apiUrl(`/api/users/${id}`), { role });
            setUsers((prev) => prev.map((user) => (user._id === id || user.id === id ? { ...user, role } : user)));
            setEditingId(null);
        } catch (err) {
            alert('Failed to update user role!');
            console.error(err);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(apiUrl(`/api/users/${id}`));
            setUsers((prev) => prev.filter((user) => user._id !== id && user.id !== id));
        } catch (err) {
            alert('Failed to delete user!');
            console.error(err);
        }
    };

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Manage Users</h2>
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
                        {users.map((user) => (
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
