import React, { useState, useEffect } from 'react';
import apiUrl from '../utils/api';
import { toast } from 'react-hot-toast';
import { FaEye, FaComment, FaCheck, FaTimes, FaEdit, FaTrash } from 'react-icons/fa';

const statusOptions = ['pending', 'processing', 'completed', 'rejected'];

const ModeratorApplications = () => {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [detailsModal, setDetailsModal] = useState(null);
    const [feedbackModal, setFeedbackModal] = useState(null);
    const [feedbackText, setFeedbackText] = useState('');

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                setLoading(true);
                const res = await apiUrl.get('/api/applications');
                if (Array.isArray(res.data)) {
                    setApplications(res.data);
                } else if (res.data && Array.isArray(res.data.applications)) {
                    setApplications(res.data.applications);
                } else {
                    setApplications([]);
                }
            } catch (err) {
                console.error('Failed to fetch applications:', err);
                toast.error('Failed to load applications. Please check if backend is running.');
                setApplications([]);
            } finally {
                setLoading(false);
            }
        };
        fetchApplications();
    }, []);

    const handleStatusUpdate = async (id, newStatus) => {
        try {
            await apiUrl.put(`/api/applications/${id}`, { applicationStatus: newStatus });
            setApplications((prev) =>
                prev.map((app) =>
                    (app._id === id) ? { ...app, applicationStatus: newStatus } : app
                )
            );
            toast.success('Status updated successfully');
        } catch (err) {
            console.error('Failed to update status:', err);
            toast.error('Failed to update status');
        }
    };

    const handleCancel = (id) => {
        handleStatusUpdate(id, 'rejected');
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this application?')) {
            return;
        }
        try {
            await apiUrl.delete(`/api/applications/${id}`);
            setApplications((prev) => prev.filter((app) => app._id !== id));
            toast.success('Application deleted successfully');
        } catch (err) {
            console.error('Failed to delete application:', err);
            toast.error('Failed to delete application');
        }
    };

    const openDetailsModal = (app) => setDetailsModal(app);
    const closeDetailsModal = () => setDetailsModal(null);

    const openFeedbackModal = (app) => {
        setFeedbackModal(app);
        setFeedbackText(app.feedback || '');
    };
    const closeFeedbackModal = () => setFeedbackModal(null);
    const saveFeedback = async (id) => {
        try {
            await apiUrl.put(`/api/applications/${id}`, { feedback: feedbackText });
            setApplications((prev) =>
                prev.map((app) =>
                    (app._id === id) ? { ...app, feedback: feedbackText } : app
                )
            );
            closeFeedbackModal();
            toast.success('Feedback saved successfully');
        } catch (err) {
            console.error('Failed to save feedback:', err);
            toast.error('Failed to save feedback');
        }
    };

    return (
        <div className="p-4 md:p-8 max-w-7xl mx-auto">
          
            <div className="bg-gradient-to-r from-green-50 to-teal-50 rounded-xl p-6 mb-8 shadow-sm">
                <h2 className="text-3xl font-bold text-slate-800 mb-2">Review Applications</h2>
                <p className="text-slate-600">
                    <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        {applications.length} Applications
                    </span>
                </p>
            </div>

           
            {detailsModal && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-8 w-full max-w-md relative">
                        <button className="absolute top-2 right-2 text-xl" onClick={closeDetailsModal}>&times;</button>
                        <h3 className="text-xl font-bold mb-4">Application Details</h3>
                        <div className="space-y-2">
                            <div><b>Name:</b> {detailsModal.userName || '-'}</div>
                            <div><b>Email:</b> {detailsModal.userEmail || '-'}</div>
                            <div><b>University:</b> {detailsModal.universityName || '-'}</div>
                            <div><b>Status:</b> {detailsModal.applicationStatus}</div>
                            <div><b>Payment Status:</b> {detailsModal.paymentStatus || '-'}</div>
                            <div><b>Feedback:</b> {detailsModal.feedback || '-'}</div>
                            <div><b>Submitted:</b> {detailsModal.applicationDate ? new Date(detailsModal.applicationDate).toLocaleDateString() : '-'}</div>
                        </div>
                    </div>
                </div>
            )}

          
            {feedbackModal && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-8 w-full max-w-md relative">
                        <button className="absolute top-2 right-2 text-xl" onClick={closeFeedbackModal}>&times;</button>
                        <h3 className="text-xl font-bold mb-4">Write Feedback</h3>
                        <textarea
                            className="w-full p-3 border-2 border-slate-300 rounded-lg focus:border-blue-500 focus:outline-none mb-4 resize-none"
                            rows={5}
                            placeholder="Enter your feedback here..."
                            value={feedbackText}
                            onChange={e => setFeedbackText(e.target.value)}
                        />
                        <button className="btn btn-success mr-2" onClick={() => saveFeedback(feedbackModal._id || feedbackModal.id)}>Save</button>
                        <button className="btn btn-ghost" onClick={closeFeedbackModal}>Cancel</button>
                    </div>
                </div>
            )}

            <div className="overflow-x-auto">
                <div className="space-y-4">
                    {applications.map((app) => (
                        <div key={app._id || app.id} className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 border-l-4 border-green-500">
                            <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
                                <div className="flex-1">
                                    <h3 className="text-xl font-bold text-slate-800 mb-2">{app.universityName || app.scholarship || 'N/A'}</h3>
                                    <div className="space-y-1 text-sm">
                                        <p className="text-slate-600"><span className="font-semibold">Applicant:</span> {app.userName || app.applicantName || app.student || '-'}</p>
                                        <p className="text-slate-600"><span className="font-semibold">Email:</span> {app.userEmail || app.applicantEmail || app.email || '-'}</p>
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-2">
                                    <span className={`badge badge-lg ${app.applicationStatus === 'completed' ? 'badge-success' :
                                        app.applicationStatus === 'processing' ? 'badge-warning' :
                                            app.applicationStatus === 'rejected' ? 'badge-error' :
                                                'badge-info'
                                        }`}>
                                        {app.applicationStatus || app.status}
                                    </span>
                                    <span className={`badge badge-lg ${app.paymentStatus === 'paid' ? 'badge-success' : 'badge-error'
                                        }`}>
                                        💳 {app.paymentStatus || '-'}
                                    </span>
                                </div>
                            </div>

                            {app.feedback && (
                                <div className="bg-blue-50 border-l-4 border-blue-500 p-3 rounded mb-4">
                                    <p className="text-sm text-slate-700"><span className="font-semibold">Feedback:</span> {app.feedback}</p>
                                </div>
                            )}

                            <div className="flex flex-wrap gap-3 pt-4 border-t border-slate-200">
                                <button
                                    className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-2 hover:scale-105"
                                    onClick={() => openDetailsModal(app)}
                                >
                                    <FaEye className="text-lg" />
                                    <span>Details</span>
                                </button>

                               
                                {app.applicationStatus === 'rejected' && (
                                    <button
                                        className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-2 hover:scale-105"
                                        onClick={() => handleDelete(app._id || app.id)}
                                    >
                                        <FaTrash className="text-lg" />
                                        <span>Delete</span>
                                    </button>
                                )}

                              
                                {app.applicationStatus !== 'rejected' && (
                                    <>
                                        <button
                                            className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-2 hover:scale-105"
                                            onClick={() => openFeedbackModal(app)}
                                        >
                                            <FaComment className="text-lg" />
                                            <span>Feedback</span>
                                        </button>

                                       
                                        {app.applicationStatus === 'pending' && (
                                            <button
                                                className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-2 hover:scale-105"
                                                onClick={() => handleStatusUpdate(app._id || app.id, 'processing')}
                                            >
                                                <FaEdit className="text-lg" />
                                                <span>Mark as Processing</span>
                                            </button>
                                        )}

                                        {app.applicationStatus === 'processing' && (
                                            <button
                                                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-2 hover:scale-105"
                                                onClick={() => handleStatusUpdate(app._id || app.id, 'completed')}
                                            >
                                                <FaCheck className="text-lg" />
                                                <span>Mark as Completed</span>
                                            </button>
                                        )}

                                        <button
                                            className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-2 hover:scale-105"
                                            onClick={() => handleCancel(app._id || app.id)}
                                        >
                                            <FaTimes className="text-lg" />
                                            <span>Reject</span>
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ModeratorApplications;
