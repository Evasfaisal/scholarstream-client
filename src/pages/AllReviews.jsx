import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import apiUrl from "../utils/api";
import { toast } from 'react-hot-toast';

const AllReviews = () => {
    const { user } = useContext(AuthContext);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                setLoading(true);
                const res = await apiUrl.get('/api/reviews');
                setReviews(res.data || []);
            } catch (err) {
                console.error('Failed to fetch reviews:', err);
                toast.error('Failed to load reviews');
                setReviews([]);
            } finally {
                setLoading(false);
            }
        };
        fetchReviews();
    }, []);

    const deleteReview = async (reviewId) => {
        if (!window.confirm('Are you sure you want to delete this review?')) return;
        try {
            await apiUrl.delete(`/api/reviews/${reviewId}`);
            setReviews(prevReviews => prevReviews.filter(review => review._id !== reviewId));
            toast.success('Review deleted successfully');
        } catch (error) {
            console.error("Failed to delete review:", error);
            toast.error('Failed to delete review');
        }
    };

    return (
        <div className="max-w-7xl mx-auto p-6 min-h-screen">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">All Reviews</h2>

            {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {[...Array(4)].map((_, idx) => (
                        <div key={idx} className="bg-white rounded-lg shadow p-6 animate-pulse">
                            <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                            <div className="h-3 bg-gray-100 rounded w-1/2 mb-2"></div>
                            <div className="h-3 bg-gray-100 rounded w-2/3 mb-2"></div>
                            <div className="h-3 bg-gray-100 rounded w-1/3"></div>
                        </div>
                    ))}
                </div>
            ) : reviews.length === 0 ? (
                <p className="text-center text-2xl text-gray-500 py-20">No reviews found.</p>
            ) : (
                <div className="overflow-x-auto bg-white rounded-lg shadow">
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th className="text-gray-700">Review</th>
                                <th className="text-gray-700">University</th>
                                <th className="text-gray-700">Reviewer</th>
                                <th className="text-gray-700">Rating</th>
                                <th className="text-gray-700">Date</th>
                                <th className="text-gray-700">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reviews.map((review) => (
                                <tr key={review._id}>
                                    <td>
                                        <div className="font-medium text-gray-900 truncate max-w-xs">
                                            {review.reviewComments || review.review || 'No review text'}
                                        </div>
                                    </td>
                                    <td>
                                        <div className="font-medium">
                                            {review.universityName || 'Unknown University'}
                                        </div>
                                    </td>
                                    <td>
                                        <div className="flex items-center gap-2">
                                            <img
                                                src={review.userPhoto || '/default-avatar.png'}
                                                alt={review.userName || 'User'}
                                                className="w-8 h-8 rounded-full object-cover"
                                            />
                                            <span className="font-medium">
                                                {review.userName || 'Anonymous'}
                                            </span>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="flex items-center gap-1">
                                            <span className="text-yellow-500">⭐</span>
                                            <span>{review.rating || 0}/5</span>
                                        </div>
                                    </td>
                                    <td>
                                        {review.reviewDate
                                            ? new Date(review.reviewDate).toLocaleDateString()
                                            : 'Unknown'
                                        }
                                    </td>
                                    <td>
                                        <div className="flex gap-2">
                                            <Link
                                                to={`/review/${review._id}`}
                                                className="btn btn-xs btn-primary"
                                            >
                                                View
                                            </Link>
                                            <button
                                                className="btn btn-xs btn-error"
                                                onClick={() => deleteReview(review._id)}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
    export default AllReviews;

