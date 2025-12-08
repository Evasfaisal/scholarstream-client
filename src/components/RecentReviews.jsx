import React, { useEffect, useState } from "react";
import axios from "axios";
import { apiUrl } from "../utils/api";
import ReviewCard from "./ReviewCard";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-hot-toast";

const RecentReviews = () => {
    const { user } = useAuth();
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [favoriteIds, setFavoriteIds] = useState([]);

    useEffect(() => {
        const fetchRecentReviews = async () => {
            try {
                setLoading(true);
                let data = [];
                try {
                    const res = await axios.get(apiUrl("/api/reviews/recent"), { params: { t: Date.now() } });
                    data = Array.isArray(res.data) ? res.data : [];
                    if (import.meta.env.DEV) console.debug('[RecentReviews] used /recent', { count: data.length });
                } catch (er) {
                    try {
                        const res2 = await axios.get(apiUrl('/api/reviews'), { params: { sort: 'date_desc', limit: 6, t: Date.now() } });
                        data = Array.isArray(res2.data) ? res2.data : (Array.isArray(res2.data?.items) ? res2.data.items : []);
                        if (import.meta.env.DEV) console.debug('[RecentReviews] used /reviews?sort=date_desc', { count: data.length });
                    } catch (err) {
                        try {
                            const res3 = await axios.get(apiUrl('/api/reviews'), { params: { t: Date.now() } });
                            const raw = Array.isArray(res3.data) ? res3.data : (Array.isArray(res3.data?.items) ? res3.data.items : []);
                            data = raw
                                .slice()
                                .sort((a, b) => new Date(
                                    b.postedDate || b.createdAt || b.updatedAt || b.date || b.created_at || b.created_on || 0
                                ) - new Date(
                                    a.postedDate || a.createdAt || a.updatedAt || a.date || a.created_at || a.created_on || 0
                                ))
                                .slice(0, 6);
                            if (import.meta.env.DEV) console.debug('[RecentReviews] used client-side sort of /reviews', { count: data.length });
                        } catch (errr) {
                            const msg = errr?.response?.data?.message || errr?.message || 'Network error';
                            toast.error(`Failed to load recent reviews: ${msg}`);
                            data = [];
                        }
                    }
                }
                setReviews(data);
            } finally {
                setLoading(false);
            }
        };

        fetchRecentReviews();
    }, []);

    useEffect(() => {
        let cancelled = false;
        const loadFavs = async () => {
            const email = user?.email;
            if (!email) {
                if (!cancelled) setFavoriteIds([]);
                return;
            }
            try {
                const res = await axios.get(apiUrl('/api/favorites'), { params: { email, idsOnly: true } });
                const serverIds = Array.isArray(res.data) ? res.data.map(String) : [];
                if (!cancelled) setFavoriteIds(serverIds);
            } catch {
                if (!cancelled) setFavoriteIds([]);
            }
        };
        loadFavs();
        return () => { cancelled = true; };
    }, [user?.email]);


    if (loading) {
        return (
            <section className="max-w-6xl mx-auto py-16 px-4 bg-gray-50">
                <h2 className="text-3xl font-bold text-green-700 text-center mb-10">
                    Recent Reviews
                </h2>
                <div className="flex justify-center py-10">
                    <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
            </section>
        );
    }


    if (!reviews.length) {
        return (
            <section className="max-w-6xl mx-auto py-16 px-4 bg-gray-50">
                <h2 className="text-3xl font-bold text-green-700 text-center mb-10">
                    Recent Reviews
                </h2>
                <p className="text-center text-gray-500 py-8 text-lg">
                    No recent reviews yet. Be the first to share!
                </p>
                <div className="text-center">
                    <Link
                        to="/add-review"
                        className="inline-block bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-700 transition font-medium"
                    >
                        Add Your Review
                    </Link>
                </div>
            </section>
        );
    }


    return (
        <section className="max-w-6xl mx-auto py-16 px-4 bg-gray-50">
            <div className="mb-8">
                <h2 className="text-3xl font-bold text-green-700 text-center">Recent Reviews</h2>
                <div className="flex justify-center mt-2">
                    <Link
                        to="/allreviews"
                        className="text-green-600 hover:underline font-medium text-lg"
                    >
                        View All
                    </Link>
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {reviews.map((review) => (
                    <ReviewCard
                        key={review._id}
                        review={review}
                        initialFavorite={favoriteIds.includes((review?._id ?? review?.id)?.toString?.())}
                    />
                ))}
            </div>
        </section>
    );
}

export default RecentReviews;