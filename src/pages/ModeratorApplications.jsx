import React, { useState, useEffect } from 'react';
import apiUrl from '../utils/api';
import { toast } from 'react-hot-toast';

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
                setApplications(res.data || []);
            } catch (err) {
                console.error('Failed to fetch applications:', err);
                toast.error('Failed to load applications');
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
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Review Applications</h2>

            {/* Details Modal */}
            {detailsModal && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-8 w-full max-w-md relative">
                        <button className="absolute top-2 right-2 text-xl" onClick={closeDetailsModal}>&times;</button>
                        <h3 className="text-xl font-bold mb-4">Application Details</h3>
                        <div className="space-y-2">
                            <div><b>Name:</b> {detailsModal.applicantName || detailsModal.student || '-'}</div>
                            <div><b>Email:</b> {detailsModal.applicantEmail || detailsModal.email || '-'}</div>
                            <div><b>University:</b> {detailsModal.universityName || detailsModal.scholarship || '-'}</div>
                            <div><b>Status:</b> {detailsModal.status}</div>
                            <div><b>Payment Status:</b> {detailsModal.paymentStatus || '-'}</div>
                            <div><b>Feedback:</b> {detailsModal.feedback || '-'}</div>
                            <div><b>Submitted:</b> {detailsModal.submittedAt || '-'}</div>
                        </div>
                    </div>
                </div>
            )}

            {/* Feedback Modal */}
            {feedbackModal && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-8 w-full max-w-md relative">
                        <button className="absolute top-2 right-2 text-xl" onClick={closeFeedbackModal}>&times;</button>
                        <h3 className="text-xl font-bold mb-4">Write Feedback</h3>
                        <textarea
                            className="textarea textarea-bordered w-full mb-4"
                            rows={4}
                            value={feedbackText}
                            onChange={e => setFeedbackText(e.target.value)}
                        />
                        <button className="btn btn-success mr-2" onClick={() => saveFeedback(feedbackModal._id || feedbackModal.id)}>Save</button>
                        <button className="btn btn-ghost" onClick={closeFeedbackModal}>Cancel</button>
                    </div>
                </div>
            )}

            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>Applicant Name</th>
                            <th>Applicant Email</th>
                            <th>University Name</th>
                            <th>Application Feedback</th>
                            <th>Application Status</th>
                            <th>Payment Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {applications.map((app) => (
                            <tr key={app._id || app.id}>
                                <td>{app.applicantName || app.student || '-'}</td>
                                <td>{app.applicantEmail || app.email || '-'}</td>
                                <td>{app.universityName || app.scholarship || '-'}</td>
                                <td>{app.feedback || '-'}</td>
                                <td>
                                    <span className={`badge badge-${app.status === 'Completed' ? 'success' : app.status === 'Processing' ? 'warning' : app.status === 'Rejected' ? 'error' : 'info'}`}>{app.status}</span>
                                </td>
                                <td>{app.paymentStatus || '-'}</td>
                                <td className="flex flex-wrap gap-1">
                                    <button className="btn btn-xs btn-info" onClick={() => openDetailsModal(app)}>Details</button>
                                    <button className="btn btn-xs btn-warning" onClick={() => openFeedbackModal(app)}>Feedback</button>
                                    <select
                                        className="select select-bordered select-xs"
                                        value={app.status}
                                        onChange={e => handleStatusUpdate(app._id || app.id, e.target.value)}
                                    >
                                        {statusOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                                    </select>
                                    <button className="btn btn-xs btn-error" onClick={() => handleCancel(app._id || app.id)}>Cancel</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ModeratorApplications;
