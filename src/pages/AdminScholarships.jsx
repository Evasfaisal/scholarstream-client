import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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

    const handleEdit = (scholarship) => {
        setEditingId(scholarship._id);
        setEditForm({ ...scholarship });
    };

    const handleSave = async (id) => {
        try {
            await apiUrl.put(`/api/scholarships/${id}`, editForm);
            setScholarships((prev) =>
                prev.map((scholarship) =>
                    scholarship._id === id ? { ...editForm, _id: id } : scholarship
                )
            );
            setEditingId(null);
            toast.success('Scholarship updated successfully');
        } catch (err) {
            console.error('Failed to update scholarship:', err);
            toast.error('Failed to update scholarship');
        }
    };

    const handleCancel = () => {
        setEditingId(null);
        setEditForm({});
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this scholarship?')) return;
        try {
            await apiUrl.delete(`/api/scholarships/${id}`);
            setScholarships((prev) => prev.filter((scholarship) => scholarship._id !== id));
            toast.success('Scholarship deleted successfully');
        } catch (err) {
            console.error('Failed to delete scholarship:', err);
            toast.error('Failed to delete scholarship');
        }
    };

    const updateEditForm = (field, value) => {
        setEditForm(prev => ({ ...prev, [field]: value }));
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );
    }

    return (
        <div className="p-6">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Manage Scholarships</h2>

            {/* Add New Scholarship Link */}
            <div className="mb-6">
                <Link to="/dashboard/add-scholarship" className="btn btn-primary">
                    Add New Scholarship
                </Link>
            </div>

            <div className="overflow-x-auto bg-white rounded-lg shadow">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th className="text-gray-700">Scholarship Name</th>
                            <th className="text-gray-700">University</th>
                            <th className="text-gray-700">Country</th>
                            <th className="text-gray-700">Category</th>
                            <th className="text-gray-700">Application Fees</th>
                            <th className="text-gray-700">Deadline</th>
                            <th className="text-gray-700">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {scholarships.length === 0 ? (
                            <tr>
                                <td colSpan="7" className="text-center py-8 text-gray-500">
                                    No scholarships found
                                </td>
                            </tr>
                        ) : (
                            scholarships.map((scholarship) => (
                                <tr key={scholarship._id}>
                                    <td className="font-medium">
                                        {editingId === scholarship._id ? (
                                            <input
                                                className="input input-bordered input-sm w-full"
                                                value={editForm.scholarshipName || ''}
                                                onChange={e => updateEditForm('scholarshipName', e.target.value)}
                                            />
                                        ) : (
                                            scholarship.scholarshipName
                                        )}
                                    </td>
                                    <td>
                                        {editingId === scholarship._id ? (
                                            <input
                                                className="input input-bordered input-sm w-full"
                                                value={editForm.universityName || ''}
                                                onChange={e => updateEditForm('universityName', e.target.value)}
                                            />
                                        ) : (
                                            scholarship.universityName
                                        )}
                                    </td>
                                    <td>
                                        {editingId === scholarship._id ? (
                                            <input
                                                className="input input-bordered input-sm w-full"
                                                value={editForm.subjectCategory?.country || ''}
                                                onChange={e => updateEditForm('subjectCategory', { ...editForm.subjectCategory, country: e.target.value })}
                                            />
                                        ) : (
                                            scholarship.subjectCategory?.country || 'N/A'
                                        )}
                                    </td>
                                    <td>
                                        {editingId === scholarship._id ? (
                                            <select
                                                className="select select-bordered select-sm w-full"
                                                value={editForm.scholarshipCategory || ''}
                                                onChange={e => updateEditForm('scholarshipCategory', e.target.value)}
                                            >
                                                <option value="">Select Category</option>
                                                <option value="Full Scholarship">Full Scholarship</option>
                                                <option value="Partial Scholarship">Partial Scholarship</option>
                                                <option value="Merit-based">Merit-based</option>
                                                <option value="Need-based">Need-based</option>
                                            </select>
                                        ) : (
                                            <span className="badge badge-outline">
                                                {scholarship.scholarshipCategory}
                                            </span>
                                        )}
                                    </td>
                                    <td>
                                        {editingId === scholarship._id ? (
                                            <input
                                                className="input input-bordered input-sm w-full"
                                                type="number"
                                                value={editForm.applicationFees || ''}
                                                onChange={e => updateEditForm('applicationFees', e.target.value)}
                                            />
                                        ) : (
                                            `$${scholarship.applicationFees}`
                                        )}
                                    </td>
                                    <td>
                                        {editingId === scholarship._id ? (
                                            <input
                                                className="input input-bordered input-sm w-full"
                                                type="date"
                                                value={editForm.applicationDeadline?.split('T')[0] || ''}
                                                onChange={e => updateEditForm('applicationDeadline', e.target.value)}
                                            />
                                        ) : (
                                            new Date(scholarship.applicationDeadline).toLocaleDateString()
                                        )}
                                    </td>
                                    <td>
                                        {editingId === scholarship._id ? (
                                            <div className="flex gap-1">
                                                <button
                                                    className="btn btn-xs btn-success"
                                                    onClick={() => handleSave(scholarship._id)}
                                                >
                                                    Save
                                                </button>
                                                <button
                                                    className="btn btn-xs btn-ghost"
                                                    onClick={handleCancel}
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="flex gap-1">
                                                <button
                                                    className="btn btn-xs btn-primary"
                                                    onClick={() => handleEdit(scholarship)}
                                                >
                                                    Update
                                                </button>
                                                <button
                                                    className="btn btn-xs btn-error"
                                                    onClick={() => handleDelete(scholarship._id)}
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default AdminScholarships;
