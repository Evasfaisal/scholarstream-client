import React, { useState } from "react";

const initialReviews = [
    {
        id: 1,
        scholarshipName: "Global Excellence Scholarship",
        universityName: "Harvard University",
        comment: "Great experience!",
        reviewDate: "2025-12-01",
        rating: 5
    },
    {
        id: 2,
        scholarshipName: "Future Leaders Award",
        universityName: "Oxford University",
        comment: "Very helpful scholarship.",
        reviewDate: "2025-12-02",
        rating: 4
    }
];

const MyReviews = () => {
    const [reviews, setReviews] = useState(initialReviews);
    const [editingReview, setEditingReview] = useState(null);
    const [editComment, setEditComment] = useState("");
    const [editRating, setEditRating] = useState(5);

    const handleEdit = (review) => {
        setEditingReview(review);
        setEditComment(review.comment);
        setEditRating(review.rating);
    };

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this review?")) {
            setReviews(reviews.filter(r => r.id !== id));
        }
    };

    const handleSave = () => {
        setReviews(reviews.map(r =>
            r.id === editingReview.id ? { ...r, comment: editComment, rating: editRating } : r
        ));
        setEditingReview(null);
        setEditComment("");
        setEditRating(5);
    };

    const handleCancel = () => {
        setEditingReview(null);
        setEditComment("");
        setEditRating(5);
    };

    return (
        <div className="max-w-4xl mx-auto p-6 min-h-screen">
            <h2 className="text-2xl font-bold text-green-700 mb-6">My Reviews</h2>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>Scholarship</th>
                            <th>University</th>
                            <th>Comment</th>
                            <th>Date</th>
                            <th>Rating</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reviews.map(review => (
                            <tr key={review.id}>
                                <td>{review.scholarshipName}</td>
                                <td>{review.universityName}</td>
                                <td>{review.comment}</td>
                                <td>{review.reviewDate}</td>
                                <td>{"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}</td>
                                <td>
                                    <button className="btn btn-xs btn-primary mr-2" onClick={() => handleEdit(review)}>Edit</button>
                                    <button className="btn btn-xs btn-error" onClick={() => handleDelete(review.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

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
