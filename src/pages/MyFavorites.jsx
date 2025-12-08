import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import FavoriteCard from "../components/FavoriteCard";
import { toast } from "react-hot-toast";
import axios from "axios";
import { apiUrl } from "../utils/api";
import { FiTrash2 } from "react-icons/fi";

const MyFavorites = () => {
    const { user } = useAuth();
    // Debug: log user context
    console.log('[MyFavorites] user:', user);
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let cancelled = false;
        const load = async () => {
            // Debug: check user and token before API call
            if (user) {
                console.log('[MyFavorites] user:', user);
                try {
                    const token = await user.getIdToken();
                    console.log('[MyFavorites] token:', token);
                } catch (e) {
                    console.warn('[MyFavorites] No token:', e);
                }
            }
            // Debug: log before API call
            if (user) {
                console.log('[MyFavorites] user.email:', user.email);
            } else {
                console.log('[MyFavorites] user is null');
            }
            if (!user?.email) {
                if (!cancelled) {
                    setFavorites([]);
                    setLoading(false);
                }
                return;
            }
            try {
                let res;
                try {
                    res = await axios.get(apiUrl('/api/favorites/reviews'), {
                        headers: {
                            'X-User-Email': user.email
                        }
                    });
                } catch {
                    res = await axios.get(apiUrl('/api/favorites'), {
                        params: { mode: 'reviews' },
                        headers: {
                            'X-User-Email': user.email
                        }
                    });
                }
                const raw = res?.data;
                const arr = Array.isArray(raw) ? raw : [];
                console.log('[MyFavorites] All favorites from API:', arr);
                const validFavs = arr.filter(favItem => {
                    const reviewField = favItem.review;
                    const reviewId = typeof reviewField === 'string' ? reviewField : (reviewField && reviewField._id);
                    if (!reviewField) {
                        console.warn('[MyFavorites] Favorite missing review field:', favItem);
                    } else if (!reviewId) {
                        console.warn('[MyFavorites] Favorite review missing id:', reviewField);
                    }
                    return !!reviewId;
                });
                const favsWithReview = await Promise.all(validFavs.map(async favItem => {
                    try {
                        const reviewField = favItem.review;
                        const reviewId = typeof reviewField === 'string' ? reviewField : (reviewField && reviewField._id);
                        const reviewRes = await axios.get(apiUrl(`/api/reviews/${reviewId}`));
                        console.log(`[MyFavorites] Review API success for id ${reviewId}:`, reviewRes.data);
                        return {
                            _id: favItem._id,
                            review: reviewRes.data
                        };
                    } catch (err) {
                        const reviewField = favItem.review;
                        const reviewId = typeof reviewField === 'string' ? reviewField : (reviewField && reviewField._id);
                        if (err?.response?.status === 404) {
                            console.warn(`[MyFavorites] Review not found (404) for id ${reviewId}`);
                            return null;
                        } else {
                            console.error(`[MyFavorites] Error loading review details for id ${reviewId}:`, err);
                            toast.error('Error loading review details');
                            return null;
                        }
                    }
                }));
                const filtered = favsWithReview.filter(Boolean);
                if (import.meta.env.DEV) {
                    try {
                        console.log('[MyFavorites] raw favorites response:', raw);
                        console.log('[MyFavorites] filtered valid favorites:', filtered);
                    } catch { void 0; }
                }
                if (!cancelled) setFavorites(filtered);
            } catch (e) {
                console.error('Failed to load favorites', e);
                const msg = e?.response?.data?.message || e?.message || 'Failed to load favorites';
                if (!cancelled) {
                    setError(msg);
                    toast.error(msg);
                }
            } finally {
                if (!cancelled) setLoading(false);
            }
        };
        load();
        return () => { cancelled = true; };
    }, [user?.email]);



    if (!user) return <div className="text-center py-20">Please login to see your favorites.</div>;
    if (loading) return (
        <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-green-600"></div>
        </div>
    );
    if (error) return <div className="text-center py-20 text-red-500">{error}</div>;
    if (!favorites.length) return (
        <div className="text-center py-20">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">No favorites yet</h2>
            <p className="text-gray-500">Start adding your favorite food reviews!</p>
        </div>
    );

    return (
        <div className="max-w-7xl mx-auto p-6 mt-10">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold text-green-700">My Favorites</h1>
                <button
                    onClick={async () => {
                        if (!user) return;

                        const ids = favorites.map(f => f._id).filter(Boolean);
                        if (ids.length) {
                            const userEmail = user?.email;
                            console.log('[MyFavorites] Bulk remove, userEmail:', userEmail);
                            const results = await Promise.allSettled(ids.map(id => axios.delete(apiUrl(`/api/favorites/${id}`), { data: { userEmail } })));
                            const rejected = results.find(r => r.status === 'rejected');
                            if (rejected) {
                                const err = rejected.reason;
                                const msg = err?.response?.data?.message || err?.message || 'Server sync failed';
                                toast.error(msg);
                            }
                        }
                        setFavorites([]);
                        toast.success("All favorites cleared");
                    }}
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
                >
                    Clear All
                </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {favorites.map(fav => (
                    fav.review ? (
                        <FavoriteCard
                            key={fav._id}
                            review={fav.review}
                            favoriteId={fav._id}
                            onDelete={(id) => setFavorites(prev => prev.filter(f => f._id !== id))}
                        />
                    ) : (
                        <div key={fav._id} className="border rounded-lg shadow-lg p-4 h-full flex flex-col justify-between bg-gray-100 relative">
                            <button
                                onClick={async () => {
                                    const id = fav._id;
                                    if (!id || !user) return;
                                    try {
                                        const userEmail = user?.email;
                                        console.log('[MyFavorites] Single remove, userEmail:', userEmail);
                                        await axios.delete(apiUrl(`/api/favorites/${id}`), { data: { userEmail } });
                                        setFavorites(prev => prev.filter(f => f._id !== id));
                                        toast.success("Removed");
                                    } catch (e) {
                                        const msg = e?.response?.data?.message || e?.message || 'Server sync failed';
                                        toast.error(msg);
                                    }
                                }}
                                title="Remove from favorites"
                                className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg z-10 hover:scale-110 transition-all"
                            >
                                <FiTrash2 className="text-red-600 text-2xl drop-shadow" />
                            </button>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-500 mb-2">Review No Longer Available</h3>
                                <p className="text-sm text-gray-400">The original review for this item was deleted.</p>
                            </div>
                            <div className="mt-4 text-right">
                                <span className="text-xs text-gray-400">Favorite ID: {fav._id}</span>
                            </div>
                        </div>
                    )
                ))}
            </div>
        </div>
    );
};

export default MyFavorites;