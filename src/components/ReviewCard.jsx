import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import axios from "axios";
import { apiUrl } from "../utils/api";

const ReviewCard = ({ review, initialFavorite = false, updateFavoriteOptimistically }) => {
    const { user } = useAuth();
    const [isFavorite, setIsFavorite] = useState(initialFavorite);
    const [loading, setLoading] = useState(false);

    const reviewId = (review?._id ?? review?.id)?.toString?.();

    useEffect(() => {
        setIsFavorite(initialFavorite);
    }, [initialFavorite]);

    const handleToggleFavorite = async () => {
        if (!user?.email) {
            toast.error("Please login first!");
            return;
        }
        if (!reviewId) {
            toast.error("Review ID missing!");
            return;
        }

        setLoading(true);
        const previous = isFavorite;
        setIsFavorite(!previous);
        updateFavoriteOptimistically?.(reviewId, !previous);

        try {
            if (previous) {
                const token = await user.getIdToken();
                await axios.delete(apiUrl(`/api/favorites/${reviewId}`), {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'x-user-email': user.email
                    }
                });
                toast.success("Removed from favorites");
            } else {
                await axios.post(apiUrl('/api/favorites'), { reviewId, userEmail: user.email });
                toast.success("Added to favorites");
            }
        } catch (err) {
            console.error(err);
            const msg = err?.response?.data?.message || err?.message || "Server sync failed";
            setIsFavorite(previous);
            updateFavoriteOptimistically?.(reviewId, previous);
            toast.error(msg);
        } finally {
            setLoading(false);
        }
    };

    const imageUrl = (
        review?.foodImage ||
        review?.foodImageUrl ||
        review?.foodImg ||
        review?.food_image ||
        review?.food_photo ||
        review?.photo ||
        review?.photoUrl ||
        review?.photoURL ||
        review?.image ||
        review?.imageUrl ||
        review?.img ||
        review?.imgUrl ||
        review?.url ||
        review?.thumbnail ||
        review?.cover ||
        review?.restaurantImage ||
        review?.media ||
        review?.picture ||
        undefined
    );

    const userName = (
        review?.userName ||
        review?.user_name ||
        review?.authorName ||
        review?.user?.displayName ||
        review?.user?.name ||
        review?.name ||
        (review?.userEmail ? String(review.userEmail).split('@')[0] : null) ||
        "Anonymous"
    );
    const location = review?.location || review?.restaurantLocation || "";

    return (
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all transform hover:-translate-y-2 h-full flex flex-col">
            <div className="relative">
                <img
                    src={imageUrl || "https://i.ibb.co/0j3PQZb/banner1.jpg"}
                    alt={review?.foodName}
                    className="w-100 h-100 object-cover bg-gray-100"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    decoding="async"
                    onError={(e) => { e.currentTarget.src = "https://i.ibb.co/0j3PQZb/banner1.jpg"; }}
                />
                <button
                    onClick={handleToggleFavorite}
                    disabled={loading}
                    className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg z-10 hover:scale-110 transition-all"
                >
                    {loading ? (
                        <div className="w-6 h-6 border-4 border-gray-300 border-t-red-500 rounded-full animate-spin"></div>
                    ) : isFavorite ? (
                        <FaHeart className="text-red-500 text-2xl drop-shadow" />
                    ) : (
                        <FaRegHeart className="text-gray-600 text-2xl hover:text-red-500 transition drop-shadow" />
                    )}
                </button>
            </div>

            <div className="p-5 flex-1 flex flex-col">
                <h3 className="text-xl font-bold text-green-700 truncate">{review?.foodName}</h3>
                <p className="text-gray-700 text-sm truncate">{review?.restaurantName}</p>
                {location ? (
                    <p className="text-gray-500 text-xs truncate">{location}</p>
                ) : null}
                <p className="text-gray-500 text-xs mt-1">By {userName}</p>
                <div className="mt-auto pt-3 flex flex-col items-start">
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full font-bold mb-2">{Number(review?.rating || 0).toFixed(1)}/5</span>
                    <Link
                        to={`/reviewdetails/${reviewId}`}
                        state={{ review }}
                        className="text-green-600 hover:underline font-medium"
                    >
                        View Details →
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ReviewCard;