import React, { useState, useEffect } from 'react';
import apiUrl from '../utils/api';
import { toast } from 'react-hot-toast';

function AdminScholarships() {
    const [scholarships, setScholarships] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState(null);
    const [editForm, setEditForm] = useState({});

    useEffect(() => {
        const fetchScholarships = async () => {
            try {
                setLoading(true);
                const res = await apiUrl.get('/api/scholarships');
                if (Array.isArray(res.data)) {
                    setScholarships(res.data);
                } else if (res.data && Array.isArray(res.data.scholarships)) {
                    setScholarships(res.data.scholarships);
                } else {
                    setScholarships([]);
                }
            } catch (err) {
                console.error('Failed to fetch scholarships:', err);
                toast.error('Failed to load scholarships');
                setScholarships([]);
            } finally {
                setLoading(false);
            }
        };
        fetchScholarships();
    }, []);

    const handleEdit = (sch) => {
        setEditingId(sch._id);
        setEditForm({ ...sch });
    };

    const handleSave = async (id) => {
        try {
            await apiUrl.put(`/api/scholarships/${id}`, editForm);
            setScholarships((prev) =>
                prev.map((sch) =>
                    sch._id === id ? { ...editForm, _id: id } : sch
                )
            );
            setEditingId(null);
            toast.success('Scholarship updated successfully');
        } catch (err) {
            console.error('Failed to update scholarship:', err);
            toast.error('Failed to update scholarship');
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this scholarship?')) return;
        try {
            await apiUrl.delete(`/api/scholarships/${id}`);
            setScholarships((prev) => prev.filter((sch) => sch._id !== id));
            toast.success('Scholarship deleted successfully');
        } catch (err) {
            console.error('Failed to delete scholarship:', err);
            toast.error('Failed to delete scholarship');
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );
    }

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Manage Scholarships</h2>
            <div className="mb-6">
                <h3 className="font-semibold mb-2">Add New Scholarship</h3>
                <div className="flex flex-wrap gap-2">
                    <input
                        className="input input-bordered input-sm"
                        placeholder="Name"
                        value={form.name}
                        onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    />
                    <input
                        className="input input-bordered input-sm"
                        placeholder="Amount"
                        type="number"
                        value={form.amount}
                        onChange={e => setForm(f => ({ ...f, amount: e.target.value }))}
                    />
                    <input
                        className="input input-bordered input-sm"
                        placeholder="Deadline"
                        type="date"
                        value={form.deadline}
                        onChange={e => setForm(f => ({ ...f, deadline: e.target.value }))}
                    />
                    <select
                        className="select select-bordered select-sm"
                        value={form.status}
                        onChange={e => setForm(f => ({ ...f, status: e.target.value }))}
                    >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                    </select>
                    <button className="btn btn-sm btn-primary" onClick={handleAdd}>Add</button>
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Amount</th>
                            <th>Deadline</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isScholarshipsArray ? scholarships.map((sch) => (
                            <tr key={sch.id}>
                                <td>
                                    {editingId === sch.id ? (
                                        <input
                                            className="input input-bordered input-xs"
                                            value={form.name}
                                            onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                                        />
                                    ) : (
                                        sch.name
                                    )}
                                </td>
                                <td>
                                    {editingId === sch.id ? (
                                        <input
                                            className="input input-bordered input-xs"
                                            type="number"
                                            value={form.amount}
                                            onChange={e => setForm(f => ({ ...f, amount: e.target.value }))}
                                        />
                                    ) : (
                                        sch.amount
                                    )}
                                </td>
                                <td>
                                    {editingId === sch.id ? (
                                        <input
                                            className="input input-bordered input-xs"
                                            type="date"
                                            value={form.deadline}
                                            onChange={e => setForm(f => ({ ...f, deadline: e.target.value }))}
                                        />
                                    ) : (
                                        sch.deadline
                                    )}
                                </td>
                                <td>
                                    {editingId === sch.id ? (
                                        <select
                                            className="select select-bordered select-xs"
                                            value={form.status}
                                            onChange={e => setForm(f => ({ ...f, status: e.target.value }))}
                                        >
                                            <option value="Active">Active</option>
                                            <option value="Inactive">Inactive</option>
                                        </select>
                                    ) : (
                                        <span className={`badge badge-${sch.status === 'Active' ? 'success' : 'error'}`}>{sch.status}</span>
                                    )}
                                </td>
                                <td>
                                    {editingId === sch.id ? (
                                        <>
                                            <button
                                                className="btn btn-xs btn-success mr-2"
                                                onClick={() => handleSave(sch.id)}
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
                                                onClick={() => handleEdit(sch)}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className="btn btn-xs btn-error"
                                                onClick={() => handleDelete(sch.id)}
                                            >
                                                Delete
                                            </button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        )) : (
                            <tr><td colSpan="100%" className="text-red-500 text-center font-bold">Scholarship data is invalid.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default AdminScholarships;
