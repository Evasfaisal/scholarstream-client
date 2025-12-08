import React, { useEffect, useState } from "react";
import axios from "axios";
import { apiUrl } from "../utils/api";
import { useAuth } from "../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";

const EditReview = () => {
    const { user } = useAuth();
    const { id } = useParams();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        foodName: "",
        foodImage: "",
        restaurantName: "",
        location: "",
        rating: 1,
        reviewText: "",
    });

    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        const fetchReview = async () => {
            if (!id) return;
            try {
                setLoading(true);
                const res = await axios.get(apiUrl(`/api/reviews/${id}`));
                const data = res.data;

                setForm({
                    foodName: data.foodName || "",
                    foodImage: data.foodImage || "",
                    restaurantName: data.restaurantName || "",
                    location: data.location || data.restaurantLocation || "",
                    rating: data.rating || 1,
                    reviewText: data.reviewText || "",
                });
            } catch (err) {
                console.error("Failed to fetch review:", err);
                toast.error("Failed to load review");
                navigate("/my-reviews");
            } finally {
                setLoading(false);
            }
        };

        fetchReview();
    }, [id, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "rating") {
            const num = Math.max(1, Math.min(5, Number(value)));
            setForm((prev) => ({ ...prev, rating: num }));
        } else {
            setForm((prev) => ({ ...prev, [name]: value }));
        }
    };

    const isValidUrl = (url) => {
        try {
            const u = new URL(url);
            return u.protocol === 'http:' || u.protocol === 'https:';
        } catch {
            return false;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) return toast.error("You must be logged in");

        if (!form.foodName?.trim() || !form.foodImage?.trim() || !form.restaurantName?.trim() || !form.location?.trim() || !form.reviewText?.trim()) {
            return toast.error("Please fill all fields");
        }
        if (!isValidUrl(form.foodImage)) {
            return toast.error("Please provide a valid image URL (http/https)");
        }
        const ratingNum = Number(form.rating);
        if (Number.isNaN(ratingNum) || ratingNum < 1 || ratingNum > 5) {
            return toast.error("Rating must be a number between 1 and 5");
        }
        if (form.reviewText.trim().length < 10) {
            return toast.error("Review must be at least 10 characters");
        }

        const payload = {
            ...form,
            rating: ratingNum,
            userEmail: user.email,
            userName: user.displayName || "Anonymous",
            userPhoto: user.photoURL || "",
        };

        try {
            setSubmitting(true);
            await axios.put(apiUrl(`/api/reviews/${id}`), payload);
            toast.success("Review updated successfully!");
            navigate("/my-reviews");
        } catch (err) {
            console.error("Update error:", err);
            toast.error(err.response?.data?.message || "Failed to update review");
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-green-600"></div>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-xl">
            <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">Edit Review</h2>

            <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Food Name</label>
                    <input
                        name="foodName"
                        type="text"
                        value={form.foodName}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-600"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Food Image URL</label>
                    <input
                        name="foodImage"
                        type="url"
                        value={form.foodImage}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-600"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Restaurant Name</label>
                    <input
                        name="restaurantName"
                        type="text"
                        value={form.restaurantName}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-600"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                    <input
                        name="location"
                        type="text"
                        value={form.location}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-600"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Rating (1-5)</label>
                    <input
                        name="rating"
                        type="number"
                        min="1"
                        max="5"
                        value={form.rating}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-600"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Your Review</label>
                    <textarea
                        name="reviewText"
                        rows="5"
                        value={form.reviewText}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-600"
                        required
                    />
                </div>

                <div className="flex gap-3">
                    <button
                        type="submit"
                        disabled={submitting}
                        className="flex-1 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition disabled:opacity-50"
                    >
                        {submitting ? "Updating..." : "Update Review"}
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate("/my-reviews")}
                        className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-400 transition"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditReview;


