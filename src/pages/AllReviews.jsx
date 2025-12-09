import React, { useState, useEffect } from "react";
import axios from "axios";
import { apiUrl } from "../utils/api";
import { useAuth } from "../context/AuthContext";

const AllReviews = () => {
    const { user } = useAuth();
    const [reviews, setReviews] = useState([]);
    const [favoriteIds, setFavoriteIds] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    const bdTime = new Date().toLocaleString("en-US", {
        timeZone: "Asia/Dhaka",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
        timeZoneName: "short",
    });

    const updateFavoriteOptimistically = (reviewId, isAdding) => {
        setFavoriteIds(prev =>
            isAdding
                ? [...prev, reviewId]
                : prev.filter(id => id !== reviewId)
        );
    };

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, [search, user?.email]);

    const deleteReview = async (reviewId) => {
        try {
            await axios.delete(`${apiUrl}/reviews/${reviewId}`);
            setReviews(prevReviews => prevReviews.filter(review => review._id !== reviewId));
        } catch (error) {
            console.error("Failed to delete review:", error);
        }
    };

    return (
        <div className="max-w-7xl mx-auto p-6 mt-10 min-h-screen">
            <div className="bg-linear-to-r from-green-50 to-white p-5 rounded-xl shadow-sm mb-8 border border-green-200">
                <div className="flex flex-col sm:flex-row justify-between items-center text-gray-700">
                    <div className="flex items-center gap-2">
                        <span className="font-semibold">Current time:</span>
                        <span className="font-mono text-green-700">{bdTime}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-2 sm:mt-0">
                        <span className="text-2xl font-bold text-green-700">BD</span>
                    </div>
                </div>
            </div>

            <h2 className="text-3xl font-bold text-green-700 mb-8 text-center">All Reviews</h2>

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
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {reviews.map((review) => (
                        <ReviewCard
                            key={review._id}
                            review={review}
                            initialFavorite={favoriteIds.includes(review._id)}
                            updateFavoriteOptimistically={updateFavoriteOptimistically}
                            userEmail={user?.email}
                            deleteReview={deleteReview}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default AllReviews;

