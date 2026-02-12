import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import apiUrl from '../utils/api';
import { toast } from 'react-hot-toast';
import { FaEdit, FaTrash, FaSave, FaTimes, FaPlus, FaUniversity, FaGlobeAmericas, FaDollarSign, FaCalendar } from 'react-icons/fa';

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
        <div className="p-4 md:p-8 max-w-7xl mx-auto">
            {/* Header with Add Button */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 mb-8 shadow-sm">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-800 mb-2">Manage Scholarships</h1>
                        <p className="text-slate-600 flex items-center gap-2">
                            <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                                {scholarships.length} Total
                            </span>
                            <span className="text-slate-500">scholarships available</span>
                        </p>
                    </div>
                    <Link
                        to="/dashboard/add-scholarship"
                        className="flex flex-col items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all"
                    >
                        <FaPlus className="text-2xl" />
                        <span className="font-semibold text-sm">Add New Scholarship</span>
                    </Link>
                </div>
            </div>

            {/* Scholarships List */}
            {scholarships.length === 0 ? (
                <div className="bg-white rounded-lg shadow p-12 text-center">
                    <div className="text-6xl mb-4">📚</div>
                    <h3 className="text-xl font-semibold text-slate-700 mb-2">No scholarships yet</h3>
                    <p className="text-slate-500 mb-6">Get started by adding your first scholarship</p>
                    <Link to="/dashboard/add-scholarship" className="btn btn-primary gap-2">
                        <FaPlus />
                        Add Scholarship
                    </Link>
                </div>
            ) : (
                <div className="space-y-4">
                    {scholarships.map((scholarship) => (
                        <div key={scholarship._id} className="bg-white rounded-lg shadow hover:shadow-md transition-shadow">
                            {editingId === scholarship._id ? (
                                /* Edit Mode - Simple Form */
                                <div className="p-6 border-l-4 border-blue-500">
                                    <h3 className="font-semibold text-lg mb-4 text-blue-600">Editing Scholarship</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-sm text-slate-600">Scholarship Name</label>
                                            <input
                                                className="input input-bordered w-full mt-1"
                                                value={editForm.scholarshipName || ''}
                                                onChange={e => updateEditForm('scholarshipName', e.target.value)}
                                            />
                                        </div>
                                        <div>
                                            <label className="text-sm text-slate-600">University</label>
                                            <input
                                                className="input input-bordered w-full mt-1"
                                                value={editForm.universityName || ''}
                                                onChange={e => updateEditForm('universityName', e.target.value)}
                                            />
                                        </div>
                                        <div>
                                            <label className="text-sm text-slate-600">Country</label>
                                            <input
                                                className="input input-bordered w-full mt-1"
                                                value={editForm.universityCountry || ''}
                                                onChange={e => updateEditForm('universityCountry', e.target.value)}
                                            />
                                        </div>
                                        <div>
                                            <label className="text-sm text-slate-600">Category</label>
                                            <select
                                                className="select select-bordered w-full mt-1 border-2 border-slate-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                                                value={editForm.scholarshipCategory || ''}
                                                onChange={e => updateEditForm('scholarshipCategory', e.target.value)}
                                            >
                                                <option value="Full fund">Full fund</option>
                                                <option value="Partial">Partial</option>
                                                <option value="Self-fund">Self-fund</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="text-sm text-slate-600">Application Fees ($)</label>
                                            <input
                                                className="input input-bordered w-full mt-1"
                                                type="number"
                                                value={editForm.applicationFees || ''}
                                                onChange={e => updateEditForm('applicationFees', e.target.value)}
                                            />
                                        </div>
                                        <div>
                                            <label className="text-sm text-slate-600">Deadline</label>
                                            <input
                                                className="input input-bordered w-full mt-1"
                                                type="date"
                                                value={editForm.applicationDeadline?.split('T')[0] || ''}
                                                onChange={e => updateEditForm('applicationDeadline', e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="flex gap-2 mt-6">
                                        <button
                                            className="btn btn-success gap-2"
                                            onClick={() => handleSave(scholarship._id)}
                                        >
                                            <FaSave /> Save
                                        </button>
                                        <button
                                            className="btn btn-ghost gap-2"
                                            onClick={handleCancel}
                                        >
                                            <FaTimes /> Cancel
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                /* View Mode - Clean List Item */
                                <div className="p-6">
                                    <div className="flex justify-between items-start">
                                        <div className="flex-1">
                                            <div className="flex items-start gap-3 mb-3">
                                                <div className="bg-blue-100 p-2 rounded-lg mt-1">
                                                    <FaUniversity className="text-blue-600 text-xl" />
                                                </div>
                                                <div>
                                                    <h3 className="text-xl font-bold text-slate-800 mb-1">
                                                        {scholarship.scholarshipName}
                                                    </h3>
                                                    <p className="text-slate-600">{scholarship.universityName}</p>
                                                    <p className="text-sm text-slate-500">{scholarship.universityCountry || 'Country not specified'}</p>
                                                </div>
                                            </div>

                                            <div className="flex flex-wrap gap-3 mt-4">
                                                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${scholarship.scholarshipCategory === 'Full fund' ? 'bg-green-100 text-green-700' :
                                                    scholarship.scholarshipCategory === 'Partial' ? 'bg-yellow-100 text-yellow-700' :
                                                        'bg-blue-100 text-blue-700'
                                                    }`}>
                                                    {scholarship.scholarshipCategory}
                                                </span>
                                                <span className="px-3 py-1 rounded-full text-sm font-semibold bg-slate-100 text-slate-700">
                                                    Fee: ${scholarship.applicationFees}
                                                </span>
                                                <span className="px-3 py-1 rounded-full text-sm font-semibold bg-slate-100 text-slate-700">
                                                    Deadline: {new Date(scholarship.applicationDeadline).toLocaleDateString()}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="flex flex-col gap-2">
                                            <button
                                                className="btn btn-sm btn-outline flex flex-col items-center gap-1 h-auto py-2"
                                                onClick={() => handleEdit(scholarship)}
                                            >
                                                <FaEdit className="text-lg" />
                                                <span className="text-xs">Edit</span>
                                            </button>
                                            <button
                                                className="btn btn-sm btn-error btn-outline flex flex-col items-center gap-1 h-auto py-2"
                                                onClick={() => handleDelete(scholarship._id)}
                                            >
                                                <FaTrash className="text-lg" />
                                                <span className="text-xs">Delete</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default AdminScholarships;
