import React, { useEffect, useState } from "react";
import axios from "axios";
import { apiUrl } from "../utils/api";
import ReviewCard from "./ReviewCard";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-hot-toast";

const FeaturedReviews = () => {
    const { user } = useAuth();
    const [reviews, setReviews] = useState([]);
    const [favoriteIds, setFavoriteIds] = useState([]);
    const [loading, setLoading] = useState(true);

    const updateFavoriteOptimistically = (reviewId, isAdding) => {
        if (isAdding) {
            setFavoriteIds(prevIds => [...prevIds, reviewId]);
        } else {
            setFavoriteIds(prevIds => prevIds.filter(id => id !== reviewId));
        }
    };

    useEffect(() => {
        let cancelled = false;
        const fetchData = async () => {
            setLoading(true);
            try {
                let list = [];
                try {
                    const reviewsRes = await axios.get(apiUrl("/api/reviews/top"));
                    list = Array.isArray(reviewsRes.data) ? reviewsRes.data : [];
                } catch (e) {
                    try {
                        const res2 = await axios.get(apiUrl('/api/reviews'), { params: { sort: 'rating_desc', limit: 6 } });
                        list = Array.isArray(res2.data) ? res2.data : (Array.isArray(res2.data?.items) ? res2.data.items : []);
                    } catch (e) {
                        try {
                            const res3 = await axios.get(apiUrl('/api/reviews'));
                            const raw = Array.isArray(res3.data) ? res3.data : (Array.isArray(res3.data?.items) ? res3.data.items : []);
                            list = raw
                                .slice()
                                .sort((a, b) => Number(b.rating || 0) - Number(a.rating || 0))
                                .slice(0, 6);
                        } catch (e) {
                            const msg = e?.response?.data?.message || e?.message || 'Network error';
                            toast.error(`Failed to load data: ${msg}`);
                            list = [];
                        }
                    }
                }
                if (!cancelled) setReviews(list.slice(0, 6));

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
            } finally {
                if (!cancelled) setLoading(false);
            }
        };
        fetchData();
        return () => { cancelled = true; };
    }, [user?.email]);

    if (loading) {
        return (
            <section className="max-w-6xl mx-auto py-16 px-4">
                <h2 className="text-3xl font-bold text-green-700 text-center mb-10">
                    Featured Reviews
                </h2>
                <div className="flex justify-center py-10">
                    <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
            </section>
        );
    }

    if (!reviews.length) {
        return (
            <section className="max-w-6xl mx-auto py-16 px-4">
                <h2 className="text-3xl font-bold text-green-700 text-center mb-10">
                    Featured Reviews
                </h2>
                <p className="text-center text-gray-500 py-10">No reviews yet.</p>
            </section>
        );
    }

    return (
        <section className="max-w-6xl mx-auto py-16 px-4">
            <div className="mb-8">
                <h2 className="text-3xl font-bold text-green-700 text-center">Featured Reviews</h2>
                <div className="flex justify-center mt-10">
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
                        updateFavoriteOptimistically={updateFavoriteOptimistically}
                    />
                ))}
            </div>
        </section>
    );
}

export default FeaturedReviews;