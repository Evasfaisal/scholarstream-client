import React, { useEffect, useState } from "react";
import axios from "axios";
import { apiUrl } from "../utils/api";
import { useParams, Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


const ReviewDetails = () => {
    const { id } = useParams();
    const location = useLocation();
    const { user } = useAuth();
    const [review, setReview] = useState(null);
    const [loading, setLoading] = useState(true);


    const bdTime = new Date().toLocaleString("en-US", {
        timeZone: "Asia/Dhaka",
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        timeZoneName: "short"
    });

    useEffect(() => {
        const fromState = location.state && location.state.review;
        if (fromState) {
            setReview(fromState);
            setLoading(false);
            return;
        }

        const fetchReview = async () => {
            try {
                setLoading(true);
                const res = await axios.get(apiUrl(`/api/reviews/${id}`));
                setReview(res.data);
            } catch {
                setReview(null);
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchReview();
    }, [id, location.state]);

    if (loading) {
        return (
            <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-green-600"></div>
            </div>
        );
    }

    if (!review) {
        return (
            <div className="max-w-4xl mx-auto mt-10">
                <div className="relative w-full h-[380px] sm:h-[460px] md:h-[520px] lg:h-[560px] rounded-xl overflow-hidden shadow-lg">
                    <img
                        src="https://i.ibb.co/0j3PQZb/banner1.jpg"
                        alt="Not Found"
                        className="w-full h-full object-cover"
                        loading="lazy"
                        decoding="async"
                    />
                    <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center px-6">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Review Not Found</h2>
                        <p className="text-gray-200 mb-6 max-w-xl"></p>
                        <Link
                            to="/allreviews"
                            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition font-medium"
                        >
                            ← Back to All Reviews
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    const rating = Number(review?.rating || 0);
    const userName =
        review?.userName ||
        review?.user_name ||
        review?.authorName ||
        review?.user?.displayName ||
        review?.user?.name ||
        review?.name ||
        (review?.userEmail ? String(review.userEmail).split('@')[0] : null) ||
        "Anonymous";

    const userPhoto =
        review?.userPhoto ||
        review?.userPhotoUrl ||
        review?.user_photo ||
        review?.user?.photoURL ||
        review?.user?.photo ||
        review?.userImage ||
        review?.avatar ||
        review?.profileImage ||
        review?.user?.avatar ||
        "https://i.ibb.co/0j3PQZb/banner1.jpg";

    const postedDate = review?.postedDate || review?.createdAt || review?.date;

    return (
        <div className="max-w-4xl mx-auto p-6 mt-10">


            <div className="bg-linear-to-r from-green-50 to-white p-5 rounded-xl shadow-sm mb-8 border border-green-200">
                <div className="flex flex-col sm:flex-row justify-between items-center text-gray-700">
                    <div className="flex items-center gap-2">
                        <span className="font-semibold">Current time:</span>
                        <span className="font-mono text-green-700">{bdTime}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-2 sm:mt-0">
                        <span className="text-lg font-bold text-green-700">BD</span>
                    </div>
                </div>
            </div>


            <div className="bg-white rounded-xl shadow-lg overflow-hidden ">
                <img
                    src={
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
                        "https://i.ibb.co/0j3PQZb/banner1.jpg"
                    }
                    alt={review.foodName}
                    className="w-full h-100 object-contain bg-gray-100"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    decoding="async"
                    onError={(e) => { e.currentTarget.src = "https://i.ibb.co/0j3PQZb/banner1.jpg"; }}
                />
                <div className="p-6">
                    <h1 className="text-3xl font-bold text-green-700">{review.foodName}</h1>
                    <p className="text-lg text-gray-600 mt-1">
                        {review.restaurantName} • {review.location}
                    </p>

                    <div className="flex items-center gap-2 mt-3">
                        <span className="text-yellow-500 font-bold text-xl">
                            {rating}/5
                        </span>
                        <div className="flex">
                            {[...Array(5)].map((_, i) => (
                                <span
                                    key={i}
                                    className={i < rating ? "text-yellow-500" : "text-gray-300"}
                                >
                                    ★
                                </span>
                            ))}
                        </div>
                    </div>

                    <p className="mt-5 text-gray-700 leading-relaxed">{review.reviewText}</p>

                    <div className="mt-6 pt-4 border-t border-gray-200 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <img
                                src={userPhoto || "https://i.ibb.co/0j3PQZb/banner1.jpg"}
                                alt={userName}
                                className="w-10 h-10 rounded-full object-cover"
                                referrerPolicy="no-referrer"
                                loading="lazy"
                                decoding="async"
                                onError={(e) => { e.currentTarget.src = "https://i.ibb.co/0j3PQZb/banner1.jpg"; }}
                            />
                            <div>
                                <p className="font-medium text-gray-800">{userName}</p>
                                <p className="text-xs text-gray-500">
                                    {new Date(postedDate).toLocaleDateString("en-US", {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric"
                                    })}
                                </p>
                            </div>
                        </div>

                        {user && user.email === review.userEmail && (
                            <div className="flex gap-2">
                                <Link
                                    to={`/edit-review/${review._id}`}
                                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-sm font-medium"
                                >
                                    Edit
                                </Link>
                                <button
                                    onClick={async () => {
                                        if (window.confirm("Delete this review?")) {
                                            try {
                                                await axios.delete(apiUrl(`/api/reviews/${review._id}`));
                                                window.location.href = "/my-reviews";
                                            } catch {
                                                alert("Delete failed");
                                            }
                                        }
                                    }}
                                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-sm font-medium"
                                >
                                    Delete
                                </button>
                            </div>
                        )}
                    </div>

                    <div className="mt-6">
                        <Link
                            to="/allreviews"
                            className="text-green-600 hover:underline font-medium"
                        >
                            ← Back to All Reviews
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReviewDetails;