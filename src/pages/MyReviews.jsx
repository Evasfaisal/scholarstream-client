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
            <h2 className="text-3xl font-bold text-primary mb-6">My Reviews</h2>
            {reviews.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-slate-500 text-lg">No reviews yet</p>
                </div>
            ) : (
                <div className="overflow-x-auto bg-white rounded-2xl shadow-lg">
                    <table className="table w-full">
                        <thead className="bg-primary/5">
                            <tr>
                                <th>University</th>
                                <th>Comment</th>
                                <th>Date</th>
                                <th>Rating</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reviews.map(review => (
                                <tr key={review._id}>
                                    <td className="font-semibold">{review.universityName}</td>
                                    <td className="max-w-md truncate">{review.reviewComment}</td>
                                    <td className="text-sm">{new Date(review.reviewDate).toLocaleDateString()}</td>
                                    <td>
                                        <div className="flex items-center gap-1">
                                            <span className="text-yellow-500">{"★".repeat(review.ratingPoint)}{"☆".repeat(5 - review.ratingPoint)}</span>
                                            <span className="text-sm text-slate-500">({review.ratingPoint}/5)</span>
                                        </div>
                                    </td>
                                    <td className="flex gap-2">
                                        <button className="btn btn-xs btn-primary" onClick={() => handleEdit(review)}>Edit</button>
                                        <button className="btn btn-xs btn-error" onClick={() => handleDelete(review._id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Edit Review Modal */}
            {editingReview && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-8 w-full max-w-md relative">
                        <button className="absolute top-2 right-2 text-xl" onClick={handleCancel}>&times;</button>
                        <h3 className="text-xl font-bold mb-4">Edit Review</h3>
                        <div className="mb-4">
                            <label className="block font-semibold mb-1">Rating:</label>
                            <select className="select select-bordered w-full" value={editRating} onChange={e => setEditRating(Number(e.target.value))}>
                                {[1, 2, 3, 4, 5].map(star => (
                                    <option key={star} value={star}>{star} Star{star > 1 && 's'}</option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-4">
                            <label className="block font-semibold mb-1">Comment:</label>
                            <textarea className="textarea textarea-bordered w-full" rows={4} value={editComment} onChange={e => setEditComment(e.target.value)} />
                        </div>
                        <button className="btn btn-success mr-2" onClick={handleSave}>Save</button>
                        <button className="btn btn-ghost" onClick={handleCancel}>Cancel</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyReviews;
