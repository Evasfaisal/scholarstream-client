import React, { useEffect, useState } from "react";
import axios from "axios";
import { apiUrl } from "../utils/api";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";


const MyReviews = () => {
    const { user } = useAuth();
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [confirmId, setConfirmId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user?.email) {
            setLoading(false);
            return;
        }

        const fetchReviews = async () => {
            try {
                const res = await axios.get(apiUrl(`/api/reviews?email=${user.email}&sort=date_desc`));
                const serverList = Array.isArray(res.data) ? res.data : [];
                setReviews(serverList);
            } catch (err) {
                console.error(err);
                toast.error("Failed to load reviews");
                setReviews([]);
            } finally {
                setLoading(false);
            }
        };

        fetchReviews();
    }, [user?.email]);

    const requestDelete = (id) => setConfirmId(id);
    const cancelDelete = () => setConfirmId(null);

    const confirmDelete = async () => {
        if (!confirmId) return;
        try {
            const userEmail = user?.email;
            await axios.delete(apiUrl(`/api/reviews/${confirmId}`), { data: { userEmail } });
            setReviews(prev => prev.filter(r => r._id !== confirmId));
            toast.success("Review deleted!");
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to delete");
        } finally {
            setConfirmId(null);
        }
    };

    const handleEdit = (review) => navigate(`/edit-review/${review._id}`, { state: { review } });

    if (loading) return <p className="text-center py-10">Loading...</p>;
    if (!reviews.length) return <p className="text-center py-10 text-gray-500">No reviews yet.</p>;

    return (
        <div className="max-w-6xl mx-auto p-4">
            <h2 className="text-2xl font-bold text-green-700 mb-4">My Reviews</h2>
            <table className="min-w-full border border-gray-200 rounded-lg">
                <thead className="bg-green-50">
                    <tr>
                        <th className="px-4 py-2">Image</th>
                        <th className="px-4 py-2">Name</th>
                        <th className="px-4 py-2">Restaurant</th>
                        <th className="px-4 py-2">Date</th>
                        <th className="px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {reviews.map(r => (
                        <tr key={r._id} className="border-t">
                            <td className="px-4 py-2">
                                <img
                                    src={
                                        r?.foodImage ||
                                        r?.foodImageUrl ||
                                        r?.foodImg ||
                                        r?.food_image ||
                                        r?.food_photo ||
                                        r?.photo ||
                                        r?.photoUrl ||
                                        r?.photoURL ||
                                        r?.image ||
                                        r?.imageUrl ||
                                        r?.img ||
                                        r?.imgUrl ||
                                        r?.url ||
                                        r?.thumbnail ||
                                        r?.cover ||
                                        r?.restaurantImage ||
                                        r?.media ||
                                        r?.picture ||
                                        "https://i.ibb.co/0j3PQZb/banner1.jpg"
                                    }
                                    alt={r.foodName}
                                    className="w-16 h-16 object-cover rounded"
                                    referrerPolicy="no-referrer"
                                    loading="lazy"
                                    decoding="async"
                                    onError={(e) => { e.currentTarget.src = "https://i.ibb.co/0j3PQZb/banner1.jpg"; }}
                                />
                            </td>
                            <td className="px-4 py-2">{r.foodName}</td>
                            <td className="px-4 py-2">{r.restaurantName}</td>
                            <td className="px-4 py-2">{new Date(r.postedDate || r.createdAt || r.date).toLocaleDateString()}</td>
                            <td className="px-4 py-2 flex gap-2">
                                <button onClick={() => requestDelete(r._id)} className="px-3 py-1 bg-green-600 text-white rounded">Delete</button>
                                <button onClick={() => handleEdit(r)} className="px-3 py-1 bg-blue-600 text-white rounded">Edit</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {confirmId && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    <div className="bg-white w-80 p-6 rounded-xl shadow-lg space-y-4">
                        <h3 className="text-lg font-semibold text-green-700">Confirm Deletion</h3>
                        <p className="text-sm text-gray-600">Delete this review?</p>
                        <div className="flex justify-end gap-3">
                            <button onClick={cancelDelete} className="px-4 py-2 border rounded">Cancel</button>
                            <button onClick={confirmDelete} className="px-4 py-2 bg-green-600 text-white rounded">Delete</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyReviews;
