import React, { useState, useEffect } from "react";
import axios from "axios";
import { apiUrl } from "../utils/api";
import ReviewCard from "../components/ReviewCard";
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
        let cancelled = false;
        const fetchData = async () => {
            setLoading(true);
            try {
                const reviewsRes = await axios.get(apiUrl("/api/reviews"), { params: { search } });
                const list = Array.isArray(reviewsRes.data) ? reviewsRes.data : [];
                list.sort((a, b) => new Date(b.postedDate || b.createdAt || b.date || 0) - new Date(a.postedDate || a.createdAt || a.date || 0));
                if (!cancelled) setReviews(list);

                const email = user?.email;
                if (email) {
                    try {
                        const favRes = await axios.get(apiUrl('/api/favorites'), { params: { email, idsOnly: true } });
                        const ids = Array.isArray(favRes.data) ? favRes.data.map(String) : [];
                        if (!cancelled) setFavoriteIds(ids);
                    } catch {
                        if (!cancelled) setFavoriteIds([]);
                    }
                } else {
                    if (!cancelled) setFavoriteIds([]);
                }
            } catch (err) {
                console.error(err);
                if (!cancelled) {
                    setReviews([]);
                    setFavoriteIds([]);
                }
            } finally {
                if (!cancelled) setLoading(false);
            }
        };

        fetchData();
        return () => { cancelled = true; };
    }, [search, user?.email]);

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

            <form className="mb-10 max-w-2xl mx-auto">
                <div className="flex gap-3">
                    <input
                        type="text"
                        placeholder="Search by food name..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="flex-1 px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-green-600 shadow-sm"
                    />
                    <button type="button" className="bg-green-600 text-white px-7 py-3 rounded-xl hover:bg-green-700 transition font-medium">
                        Search
                    </button>
                </div>
            </form>

            {loading ? (
                <div className="flex justify-center py-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-green-600"></div>
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
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default AllReviews;

