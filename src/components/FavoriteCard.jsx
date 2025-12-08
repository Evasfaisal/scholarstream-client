import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { FiTrash2 } from "react-icons/fi";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";
import { apiUrl } from "../utils/api";

const FavoriteCard = ({ review, favoriteId, onDelete }) => {
    const [loading, setLoading] = useState(false);
    const { user } = useAuth();

    const reviewId = (review?._id ?? review?.id)?.toString?.();

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

    const handleDelete = async () => {
        if (!favoriteId) return;
        if (!user?.email) {
            toast.error("User not logged in");
            return;
        }
        setLoading(true);
        try {
            const userEmail = user.email;
            const token = await user.getIdToken();
            console.log('[FavoriteCard] Removing favorite, userEmail:', userEmail);
            await axios.delete(apiUrl(`/api/favorites/${favoriteId}`), {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'x-user-email': userEmail
                }
            });
            toast.success("Removed from favorites");
            onDelete?.(favoriteId);
        } catch (e) {
            const msg = e?.response?.data?.message || e?.message || 'Server sync failed';
            toast.error(msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all transform hover:-translate-y-2 h-full flex flex-col relative">
            <div className="relative">
                <img
                    src={imageUrl || "https://i.ibb.co/0j3PQZb/banner1.jpg"}
                    alt={review?.foodName}
                    className="w-full h-00 object-contain bg-gray-100"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    decoding="async"
                    onError={(e) => { e.currentTarget.src = "https://i.ibb.co/0j3PQZb/banner1.jpg"; }}
                />
                <button
                    onClick={handleDelete}
                    disabled={loading}
                    className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg z-10 hover:scale-110 transition-all"
                    title="Remove from favorites"
                >
                    {loading ? (
                        <div className="w-6 h-6 border-4 border-gray-300 border-t-red-500 rounded-full animate-spin"></div>
                    ) : (
                        <FiTrash2 className="text-red-600 text-2xl drop-shadow" />
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
                <div className="flex justify-between items-center mt-auto pt-3">
                    <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full font-bold">{Number(review?.rating || 0).toFixed(1)}/5</span>
                    <Link to={`/reviewdetails/${reviewId}`} state={{ review }} className="text-green-600 hover:underline font-medium">View Details →</Link>
                </div>
            </div>
        </div>
    );
};

export default FavoriteCard;