import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import apiUrl from "../utils/api";
import { toast } from "react-hot-toast";

const MyReviews = () => {
    const { user } = useContext(AuthContext);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingReview, setEditingReview] = useState(null);
    const [editComment, setEditComment] = useState("");
    const [editRating, setEditRating] = useState(5);

    useEffect(() => {
        const fetchMyReviews = async () => {
            if (!user?.email) return;
            try {
                setLoading(true);
                const response = await apiUrl.get(`/api/reviews/user/${user.email}`);
                setReviews(response.data || []);
            } catch (error) {
                console.error("Error fetching reviews:", error);
                toast.error("Failed to load reviews");
            } finally {
                setLoading(false);
            }
        };

        fetchMyReviews();
    }, [user]);

    const handleEdit = (review) => {
        setEditingReview(review);
        setEditComment(review.reviewComment);
        setEditRating(review.ratingPoint);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this review?")) {
            try {
                await apiUrl.delete(`/api/reviews/${id}`);
                setReviews(reviews.filter(r => r._id !== id));
                toast.success("Review deleted successfully");
            } catch (error) {
                console.error("Error deleting review:", error);
                toast.error("Failed to delete review");
            }
        }
    };

    const handleSave = async () => {
        try {
            await apiUrl.put(`/api/reviews/${editingReview._id}`, {
                reviewComment: editComment,
                ratingPoint: editRating
            });
            setReviews(reviews.map(r =>
                r._id === editingReview._id ? { ...r, reviewComment: editComment, ratingPoint: editRating } : r
            ));
            setEditingReview(null);
            setEditComment("");
            setEditRating(5);
            toast.success("Review updated successfully");
        } catch (error) {
            console.error("Error updating review:", error);
            toast.error("Failed to update review");
        }
    };

    const handleCancel = () => {
        setEditingReview(null);
        setEditComment("");
        setEditRating(5);
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto p-6 min-h-screen">
            <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl p-6 mb-8 shadow-sm">
                <h2 className="text-3xl font-bold text-slate-800 mb-2">My Reviews</h2>
                <p className="text-slate-600">
                    <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        {reviews.length} Reviews
                    </span>
                </p>
            </div>

            {reviews.length === 0 ? (
                <div className="bg-white rounded-lg shadow p-12 text-center">
                    <div className="text-6xl mb-4">⭐</div>
                    <h3 className="text-xl font-semibold text-slate-700 mb-2">No Reviews Yet</h3>
                    <p className="text-slate-500 mb-6">
                        You haven't written any reviews yet.<br />
                        Apply for scholarships and add reviews after payment!
                    </p>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-md mx-auto">
                        <p className="text-sm text-slate-600">
                            <strong>How to add reviews:</strong><br />
                            1. Go to My Applications<br />
                            2. Pay for an application<br />
                            3. Click "Add Review" button
                        </p>
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {reviews.map(review => (
                        <div key={review._id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-orange-500 overflow-hidden">
                            {/* Card Header */}
                            <div className="bg-gradient-to-r from-orange-50 to-yellow-50 p-4 border-b border-orange-100">
                                <h3 className="text-lg font-bold text-slate-800 mb-1 truncate" title={review.scholarshipName}>
                                    {review.scholarshipName || 'Scholarship'}
                                </h3>
                                <p className="text-sm font-semibold text-orange-600 flex items-center gap-1">
                                    🎓 {review.universityName}
                                </p>
                            </div>

                            {/* Card Body */}
                            <div className="p-4 space-y-3">
                                {/* Rating */}
                                <div className="flex items-center gap-2">
                                    <span className="text-2xl text-yellow-500">
                                        {"★".repeat(review.ratingPoint)}{"☆".repeat(5 - review.ratingPoint)}
                                    </span>
                                    <span className="text-lg font-bold text-slate-700">({review.ratingPoint}/5)</span>
                                </div>

                                {/* Comment */}
                                <div className="bg-slate-50 rounded-lg p-3 min-h-[80px]">
                                    <p className="text-sm text-slate-700 line-clamp-3">{review.reviewComment}</p>
                                </div>

                                {/* Date */}
                                <div className="flex items-center gap-2 text-xs text-slate-500">
                                    <span>📅</span>
                                    <span>{new Date(review.reviewDate).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'short',
                                        day: 'numeric'
                                    })}</span>
                                </div>
                            </div>

                            {/* Card Footer - Action Buttons */}
                            <div className="bg-slate-50 p-4 flex gap-2 border-t border-slate-100">
                                <button
                                    className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 hover:scale-105"
                                    onClick={() => handleEdit(review)}
                                >
                                    <span>✏️</span>
                                    <span>Edit</span>
                                </button>
                                <button
                                    className="flex-1 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 hover:scale-105"
                                    onClick={() => handleDelete(review._id)}
                                >
                                    <span>🗑️</span>
                                    <span>Delete</span>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Edit Review Modal */}
            {editingReview && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg relative overflow-hidden animate-fadeIn">
                        {/* Modal Header */}
                        <div className="bg-gradient-to-r from-orange-500 to-yellow-500 p-6 text-white">
                            <button
                                className="absolute top-4 right-4 text-white hover:bg-white/20 rounded-full w-8 h-8 flex items-center justify-center transition-all"
                                onClick={handleCancel}
                            >
                                ✕
                            </button>
                            <h3 className="text-2xl font-bold flex items-center gap-2">
                                <span>✏️</span>
                                <span>Edit Review</span>
                            </h3>
                            <p className="text-orange-100 mt-1 text-sm">Update your review for {editingReview.scholarshipName || 'this scholarship'}</p>
                        </div>

                        {/* Modal Body */}
                        <div className="p-6 space-y-5">
                            {/* University Info */}
                            <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg p-3 border border-orange-200">
                                <p className="text-sm text-slate-600 flex items-center gap-2">
                                    <span>🎓</span>
                                    <span className="font-semibold">{editingReview.universityName}</span>
                                </p>
                            </div>

                            {/* Rating Section */}
                            <div>
                                <label className="block font-semibold text-slate-700 mb-2 flex items-center gap-2">
                                    <span>⭐</span>
                                    <span>Rating</span>
                                </label>
                                <div className="flex gap-2">
                                    {[1, 2, 3, 4, 5].map(star => (
                                        <button
                                            key={star}
                                            type="button"
                                            onClick={() => setEditRating(star)}
                                            className={`text-4xl transition-all hover:scale-110 ${star <= editRating ? 'text-yellow-500' : 'text-slate-300'
                                                }`}
                                        >
                                            {star <= editRating ? '★' : '☆'}
                                        </button>
                                    ))}
                                    <span className="text-lg font-bold text-slate-700 ml-2 self-center">({editRating}/5)</span>
                                </div>
                            </div>

                            {/* Comment Section */}
                            <div>
                                <label className="block font-semibold text-slate-700 mb-2 flex items-center gap-2">
                                    <span>💬</span>
                                    <span>Comment</span>
                                </label>
                                <textarea
                                    className="textarea textarea-bordered w-full h-32 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
                                    placeholder="Share your experience with this scholarship..."
                                    value={editComment}
                                    onChange={e => setEditComment(e.target.value)}
                                />
                                <div className="text-xs text-slate-500 mt-1 text-right">{editComment.length} characters</div>
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="bg-slate-50 p-6 flex gap-3 border-t border-slate-200">
                            <button
                                className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 hover:scale-105"
                                onClick={handleSave}
                            >
                                <span>💾</span>
                                <span>Save Changes</span>
                            </button>
                            <button
                                className="flex-1 bg-white hover:bg-slate-100 text-slate-700 font-semibold py-3 px-6 rounded-lg border-2 border-slate-300 transition-all duration-300 hover:scale-105"
                                onClick={handleCancel}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyReviews;
