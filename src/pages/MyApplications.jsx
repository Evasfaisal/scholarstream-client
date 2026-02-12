import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import apiUrl from "../utils/api";
import { toast } from "react-hot-toast";

const MyApplications = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedApp, setSelectedApp] = useState(null);
    const [showDetails, setShowDetails] = useState(false);
    const [showReview, setShowReview] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [deleteAppId, setDeleteAppId] = useState(null);
    const [reviewRating, setReviewRating] = useState(5);
    const [reviewComment, setReviewComment] = useState("");

    useEffect(() => {
        const fetchMyApplications = async () => {
            if (!user?.email) return;
            try {
                setLoading(true);
                const response = await apiUrl.get(`/api/applications/user/${user.email}`);
                setApplications(response.data || []);
            } catch (error) {
                console.error("Error fetching applications:", error);
                toast.error("Failed to load applications");
            } finally {
                setLoading(false);
            }
        };

        fetchMyApplications();

        // Listen for navigation back to this page to refetch data
        const handleVisibilityChange = () => {
            if (!document.hidden) {
                fetchMyApplications();
            }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, [user]);

    // Handlers
    const handleDetails = (app) => {
        setSelectedApp(app);
        setShowDetails(true);
    };
    const handleCloseDetails = () => {
        setShowDetails(false);
        setSelectedApp(null);
    };
    const handleEdit = (app) => {
        navigate(`/scholarship/${app.scholarshipId}`);
    };
    const handlePay = async (app) => {
        try {
            // Delete unpaid application before going to payment
            await apiUrl.delete(`/api/applications/${app._id}`);
            console.log("Deleted unpaid application:", app._id);

            // Remove from local state immediately
            setApplications(apps => apps.filter(a => a._id !== app._id));

            // Create scholarship object from application data
            const scholarship = {
                _id: app.scholarshipId,
                scholarshipName: app.scholarshipCategory,
                universityName: app.universityName,
                universityImage: app.universityImage || 'https://via.placeholder.com/400',
                degree: app.degree,
                applicationFees: app.applicationFees,
                serviceCharge: app.serviceCharge || 0
            };
            navigate('/checkout', { state: { scholarship } });
        } catch (error) {
            console.error("Error deleting unpaid application:", error);
            toast.error("Failed to proceed to payment");
        }
    };
    const handleDelete = (id) => {
        setDeleteAppId(id);
        setShowDeleteConfirm(true);
    };

    const confirmDelete = async () => {
        try {
            await apiUrl.delete(`/api/applications/${deleteAppId}`);
            setApplications(apps => apps.filter(app => app._id !== deleteAppId));
            toast.success("Application deleted successfully");
            setShowDeleteConfirm(false);
            setDeleteAppId(null);
        } catch (error) {
            console.error("Error deleting application:", error);
            toast.error("Failed to delete application");
        }
    };
    const handleAddReview = (app) => {
        setSelectedApp(app);
        setShowReview(true);
    };
    const handleSubmitReview = async () => {
        if (!reviewComment.trim()) {
            toast.error("Please write a comment");
            return;
        }
        try {
            await apiUrl.post('/api/reviews', {
                scholarshipId: selectedApp.scholarshipId,
                universityName: selectedApp.universityName,
                userName: user.displayName,
                userEmail: user.email,
                userImage: user.photoURL,
                ratingPoint: reviewRating,
                reviewComment: reviewComment,
                reviewDate: new Date().toISOString()
            });
            toast.success("Review submitted successfully");
            setShowReview(false);
            setReviewRating(5);
            setReviewComment("");
        } catch (error) {
            console.error("Error submitting review:", error);
            toast.error("Failed to submit review");
        }
    };
    const handleCloseReview = () => {
        setShowReview(false);
        setReviewRating(5);
        setReviewComment("");
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto p-6 min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
            <div className="mb-8">
                <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary mb-2">
                    My Applications
                </h2>
                <p className="text-slate-600">Track and manage your scholarship applications</p>
            </div>

            {applications.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-3xl shadow-xl">
                    <div className="text-6xl mb-4">📚</div>
                    <p className="text-slate-500 text-xl mb-6">No applications found</p>
                    <button onClick={() => navigate('/allscholarships')} className="btn btn-primary btn-lg">
                        Browse Scholarships
                    </button>
                </div>
            ) : (
                <div className="grid gap-6">
                    {applications.map((app, index) => {
                        // Different border colors for each card
                        const borderColors = [
                            'border-l-8 border-l-blue-500 border-t border-r border-b border-blue-100',
                            'border-l-8 border-l-purple-500 border-t border-r border-b border-purple-100',
                            'border-l-8 border-l-pink-500 border-t border-r border-b border-pink-100',
                            'border-l-8 border-l-green-500 border-t border-r border-b border-green-100',
                            'border-l-8 border-l-orange-500 border-t border-r border-b border-orange-100',
                            'border-l-8 border-l-red-500 border-t border-r border-b border-red-100',
                            'border-l-8 border-l-teal-500 border-t border-r border-b border-teal-100',
                            'border-l-8 border-l-indigo-500 border-t border-r border-b border-indigo-100',
                        ];
                        const borderClass = borderColors[index % borderColors.length];

                        return (
                            <div key={app._id} className={`bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 ${borderClass}`}>
                                {/* Main Info Section */}
                                <div className="space-y-4">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <h3 className="text-2xl font-bold text-slate-800 mb-1">
                                                {app.universityName}
                                            </h3>
                                            <p className="text-lg text-primary font-semibold">
                                                {app.scholarshipCategory}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-3xl font-extrabold text-primary">
                                                ${app.applicationFees}
                                            </div>
                                            <div className="text-xs text-slate-500">Application Fee</div>
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap gap-3">
                                        <div className="badge badge-lg badge-outline">
                                            🎓 {app.degree}
                                        </div>
                                        <div className={`badge badge-lg ${app.applicationStatus === "completed" ? "badge-success" :
                                            app.applicationStatus === "processing" ? "badge-warning" :
                                                app.applicationStatus === "pending" ? "badge-info" :
                                                    "badge-error"
                                            }`}>
                                            📋 {app.applicationStatus?.toUpperCase()}
                                        </div>
                                        <div className={`badge badge-lg ${app.paymentStatus === "paid" ? "badge-success" : "badge-error"
                                            }`}>
                                            💳 {app.paymentStatus?.toUpperCase()}
                                        </div>
                                        <div className="badge badge-lg badge-ghost">
                                            📅 {new Date(app.applicationDate).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'short',
                                                day: 'numeric'
                                            })}
                                        </div>
                                    </div>

                                    {/* Feedback Section */}
                                    {app.feedback && (
                                        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-lg">
                                            <div className="flex items-center gap-2 mb-2">
                                                <span className="text-lg">💬</span>
                                                <span className="font-semibold text-blue-900">Feedback:</span>
                                            </div>
                                            <p className="text-slate-700 text-sm leading-relaxed">{app.feedback}</p>
                                        </div>
                                    )}
                                    {!app.feedback && (
                                        <div className="bg-slate-50 p-4 rounded-lg">
                                            <p className="text-slate-400 text-sm italic">⏳ No feedback received yet</p>
                                        </div>
                                    )}

                                    {/* Action Buttons - Bottom Left */}
                                    <div className="flex flex-wrap gap-4 pt-6 mt-4 border-t-2 border-slate-200">
                                        <button
                                            className="btn btn-info btn-lg gap-3 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 group border-l-4 border-l-blue-500 border-r-2 border-r-blue-200 px-6 py-4"
                                            onClick={() => handleDetails(app)}
                                        >
                                            <span className="text-3xl group-hover:scale-110 transition-transform">👁️</span>
                                            <span className="font-extrabold text-lg">View Details</span>
                                        </button>

                                        {app.applicationStatus === "pending" && (
                                            <>
                                                <button
                                                    className="btn btn-warning btn-lg gap-3 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 group border-l-4 border-l-orange-500 border-r-2 border-r-orange-200 px-6 py-4"
                                                    onClick={() => handleEdit(app)}
                                                >
                                                    <span className="text-3xl group-hover:scale-110 transition-transform">✏️</span>
                                                    <span className="font-extrabold text-lg">Edit</span>
                                                </button>
                                                <button
                                                    className="btn btn-error btn-lg gap-3 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 group border-l-4 border-l-red-600 border-r-2 border-r-red-200 px-6 py-4"
                                                    onClick={() => handleDelete(app._id)}
                                                >
                                                    <span className="text-3xl group-hover:rotate-12 transition-transform">🗑️</span>
                                                    <span className="font-extrabold text-lg">Delete</span>
                                                </button>
                                                {app.paymentStatus === "unpaid" && (
                                                    <button
                                                        className="btn btn-success btn-lg gap-3 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 animate-pulse group border-l-4 border-l-green-600 border-r-2 border-r-green-200 border-t-2 border-t-green-300 border-b-2 border-b-green-300 px-8 py-4"
                                                        onClick={() => handlePay(app)}
                                                    >
                                                        <span className="text-3xl group-hover:scale-125 transition-transform">💳</span>
                                                        <span className="font-extrabold text-xl">Pay Now</span>
                                                    </button>
                                                )}
                                            </>
                                        )}

                                        {app.applicationStatus === "completed" && (
                                            <button
                                                className="btn btn-warning btn-lg gap-3 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 group border-l-4 border-l-yellow-600 border-r-2 border-r-yellow-200 px-6 py-4"
                                                onClick={() => handleAddReview(app)}
                                            >
                                                <span className="text-3xl group-hover:rotate-12 transition-transform">⭐</span>
                                                <span className="font-extrabold text-lg">Add Review</span>
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Details Modal */}
            {showDetails && selectedApp && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
                    <div className="bg-gradient-to-br from-white to-blue-50 rounded-3xl p-8 w-full max-w-2xl relative shadow-2xl transform animate-scaleIn border-2 border-primary/20">
                        <button className="absolute top-4 right-4 btn btn-sm btn-circle btn-ghost hover:btn-error transition-all" onClick={handleCloseDetails}>
                            <span className="text-xl">✕</span>
                        </button>

                        <div className="flex items-center gap-3 mb-8">
                            <div className="text-5xl">📄</div>
                            <div>
                                <h3 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                                    Application Details
                                </h3>
                                <p className="text-slate-500 text-sm">Complete information about your application</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="bg-white/80 backdrop-blur rounded-2xl p-5 shadow-lg border border-slate-200 hover:shadow-xl transition-all">
                                <div className="flex items-center gap-3 mb-3">
                                    <span className="text-3xl">🏛️</span>
                                    <div className="flex-1">
                                        <div className="text-xs text-slate-500 uppercase tracking-wide">University</div>
                                        <div className="text-xl font-bold text-slate-800">{selectedApp.universityName}</div>
                                    </div>
                                </div>
                                <div className="divider my-2"></div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <div className="text-xs text-slate-500 mb-1">Scholarship</div>
                                        <div className="font-semibold text-slate-700">{selectedApp.scholarshipCategory}</div>
                                    </div>
                                    <div>
                                        <div className="text-xs text-slate-500 mb-1">Degree</div>
                                        <div className="font-semibold text-slate-700">🎓 {selectedApp.degree}</div>
                                    </div>
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-5 border-2 border-blue-200">
                                    <div className="text-xs text-blue-600 uppercase tracking-wide mb-2">Application Status</div>
                                    <div className={`badge badge-lg text-lg px-4 py-3 ${selectedApp.applicationStatus === "completed" ? "badge-success" :
                                        selectedApp.applicationStatus === "processing" ? "badge-warning" :
                                            selectedApp.applicationStatus === "pending" ? "badge-info" :
                                                "badge-error"
                                        }`}>
                                        {selectedApp.applicationStatus?.toUpperCase()}
                                    </div>
                                </div>

                                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-5 border-2 border-green-200">
                                    <div className="text-xs text-green-600 uppercase tracking-wide mb-2">Payment Status</div>
                                    <div className={`badge badge-lg text-lg px-4 py-3 ${selectedApp.paymentStatus === "paid" ? "badge-success" : "badge-error"
                                        }`}>
                                        {selectedApp.paymentStatus?.toUpperCase()}
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-5 border-2 border-purple-200">
                                <div className="flex items-center justify-between mb-3">
                                    <span className="text-lg font-bold text-purple-900">💰 Payment Breakdown</span>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex justify-between items-center">
                                        <span className="text-slate-600">Application Fees</span>
                                        <span className="text-2xl font-bold text-purple-700">${selectedApp.applicationFees}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-slate-600">Service Charge</span>
                                        <span className="text-2xl font-bold text-purple-700">${selectedApp.serviceCharge}</span>
                                    </div>
                                    <div className="divider my-1"></div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-lg font-bold text-slate-800">Total Amount</span>
                                        <span className="text-3xl font-extrabold text-primary">
                                            ${(parseFloat(selectedApp.applicationFees) + parseFloat(selectedApp.serviceCharge)).toFixed(2)}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white/80 backdrop-blur rounded-2xl p-5 shadow-lg border border-slate-200">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="text-2xl">📅</span>
                                    <span className="font-semibold text-slate-700">Application Date</span>
                                </div>
                                <div className="text-lg text-slate-600">
                                    {new Date(selectedApp.applicationDate).toLocaleDateString('en-US', {
                                        weekday: 'long',
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </div>
                            </div>

                            {selectedApp.feedback && (
                                <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-6 border-l-4 border-orange-400 shadow-lg">
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className="text-3xl">💬</span>
                                        <span className="text-lg font-bold text-orange-900">Moderator Feedback</span>
                                    </div>
                                    <p className="text-slate-700 leading-relaxed text-base">{selectedApp.feedback}</p>
                                </div>
                            )}

                            {!selectedApp.feedback && (
                                <div className="bg-slate-100 rounded-2xl p-6 text-center">
                                    <span className="text-4xl mb-2 block">⏳</span>
                                    <p className="text-slate-500 italic">Waiting for moderator feedback...</p>
                                </div>
                            )}
                        </div>

                        <button
                            className="btn btn-primary btn-block btn-lg mt-8 shadow-lg hover:shadow-xl transition-all"
                            onClick={handleCloseDetails}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {showDeleteConfirm && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
                    <div className="bg-white rounded-3xl p-8 w-full max-w-md relative shadow-2xl transform animate-scaleIn border-2 border-red-200">
                        <div className="text-center mb-6">
                            <div className="text-7xl mb-4 animate-bounce">⚠️</div>
                            <h3 className="text-3xl font-extrabold text-red-600 mb-2">Delete Application?</h3>
                            <p className="text-slate-600 text-lg">This action cannot be undone!</p>
                        </div>

                        <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-5 mb-6">
                            <p className="text-slate-700 text-center leading-relaxed">
                                Are you sure you want to permanently delete this scholarship application?
                                All associated data will be removed.
                            </p>
                        </div>

                        <div className="flex gap-3">
                            <button
                                className="btn btn-outline flex-1 hover:bg-slate-100"
                                onClick={() => {
                                    setShowDeleteConfirm(false);
                                    setDeleteAppId(null);
                                }}
                            >
                                <span className="text-lg">❌</span> Cancel
                            </button>
                            <button
                                className="btn btn-error flex-1 shadow-lg hover:shadow-xl"
                                onClick={confirmDelete}
                            >
                                <span className="text-lg">🗑️</span> Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Add Review Modal */}
            {showReview && selectedApp && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
                    <div className="bg-gradient-to-br from-white to-yellow-50 rounded-3xl p-8 w-full max-w-md relative shadow-2xl transform animate-scaleIn border-2 border-yellow-200">
                        <button className="absolute top-4 right-4 btn btn-sm btn-circle btn-ghost hover:btn-error transition-all" onClick={handleCloseReview}>
                            <span className="text-xl">✕</span>
                        </button>

                        <div className="flex items-center gap-3 mb-6">
                            <span className="text-5xl">⭐</span>
                            <div>
                                <h3 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-orange-600">
                                    Add Review
                                </h3>
                                <p className="text-slate-600 text-sm">{selectedApp.universityName}</p>
                            </div>
                        </div>

                        <div className="mb-6">
                            <label className="block font-bold mb-3 text-slate-700 flex items-center gap-2">
                                <span className="text-2xl">⭐</span> Rating
                            </label>
                            <select
                                className="select select-bordered w-full text-lg font-semibold shadow-md"
                                value={reviewRating}
                                onChange={e => setReviewRating(Number(e.target.value))}
                            >
                                {[1, 2, 3, 4, 5].map(star => (
                                    <option key={star} value={star}>{"⭐".repeat(star)} ({star} out of 5)</option>
                                ))}
                            </select>
                        </div>

                        <div className="mb-6">
                            <label className="block font-bold mb-3 text-slate-700 flex items-center gap-2">
                                <span className="text-2xl">💬</span> Your Review
                            </label>
                            <textarea
                                className="textarea textarea-bordered w-full text-base shadow-md focus:shadow-lg transition-all"
                                rows={6}
                                placeholder="Share your experience with this scholarship..."
                                value={reviewComment}
                                onChange={e => setReviewComment(e.target.value)}
                            />
                        </div>

                        <div className="flex gap-3">
                            <button className="btn btn-outline flex-1 hover:bg-slate-100" onClick={handleCloseReview}>
                                Cancel
                            </button>
                            <button className="btn btn-warning flex-1 shadow-lg hover:shadow-xl" onClick={handleSubmitReview}>
                                <span className="text-lg">✨</span> Submit Review
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyApplications;
