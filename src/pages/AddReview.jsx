import React, { useState } from "react";
import axios from "axios";
import { apiUrl } from "../utils/api";
import { useAuth } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const AddReview = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        foodName: "",
        foodImage: "",
        restaurantName: "",
        location: "",
        rating: 1,
        reviewText: "",
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
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

        if (!user) {
            toast.error("You must be logged in to add a review");
            return;
        }


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

        const postedDate = new Date().toISOString();
        const rating = ratingNum;
        const payload = {
            foodName: form.foodName,
            restaurantName: form.restaurantName,
            location: form.location,
            restaurantLocation: form.location,
            rating,
            reviewText: form.reviewText,
            review: form.reviewText,
            foodImage: form.foodImage,
            photo: form.foodImage,

            userEmail: user.email,
            userName: user.displayName || "Anonymous",
            userPhoto: user.photoURL || "",
            postedDate,
            date: postedDate,
        };

        try {
            setLoading(true);
            const token = await user.getIdToken();
            await axios.post(apiUrl("/api/reviews"), payload, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            toast.success("Review added successfully!");
            navigate("/");
        } catch (err) {
            console.error("Error adding review:", err);
            toast.error(err.response?.data?.message || "Failed to add review");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-xl">
            <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">Add New Review</h2>

            <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Food Name</label>
                    <input
                        name="foodName"
                        type="text"
                        placeholder="e.g. Biryani"
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
                        placeholder="https://example.com/food.jpg"
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
                        placeholder="e.g. Star Kabab"
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
                        placeholder="e.g. Dhanmondi, Dhaka"
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
                        placeholder="Share your experience..."
                        value={form.reviewText}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-600"
                        required
                    />
                </div>

                <div className="flex gap-3">
                    <button
                        type="submit"
                        disabled={loading}
                        className="flex-1 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition disabled:opacity-50"
                    >
                        {loading ? "Submitting..." : "Submit Review"}
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-400 transition"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddReview;