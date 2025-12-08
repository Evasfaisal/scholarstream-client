import React, { useEffect, useState } from "react";
import axios from "axios";
import { apiUrl } from "../utils/api";

const TopRestaurants = () => {
    const [restaurants, setRestaurants] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios
            .get(apiUrl("/api/reviews?limit=6&sort=rating_desc"))
            .then((res) => {
                if (Array.isArray(res.data)) {
                    setRestaurants(res.data);
                } else if (res.data.reviews && Array.isArray(res.data.reviews)) {
                    setRestaurants(res.data.reviews);
                } else {
                    setRestaurants([]);
                }
            })
            .catch((err) => console.error("Error fetching restaurants:", err))
            .finally(() => setLoading(false));
    }, []);

    if (loading)
        return <div className="text-center py-10 text-gray-500">Loading...</div>;

    if (!restaurants.length)
        return <div className="text-center py-10 text-gray-500">No restaurants found.</div>;

    return (
        <section className="max-w-6xl mx-auto py-16 px-4 bg-green-50 rounded-lg">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold text-green-700">🍴 Top Restaurants</h2>
                <a href="/restaurants" className="text-green-600 underline">
                    Show All
                </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {restaurants.map((r) => {
                    const imgSrc = (
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
                        ""
                    );
                    const placeholder = "https://i.ibb.co/0j3PQZb/banner1.jpg";
                    return (
                        <div key={r._id} className="bg-white p-4 rounded-2xl shadow">
                            <img
                                src={imgSrc || placeholder}
                                alt={r.restaurantName}
                                className="w-full h-40 object-cover rounded-lg mb-4"
                                referrerPolicy="no-referrer"
                                loading="lazy"
                                decoding="async"
                                onError={(e) => { e.currentTarget.src = placeholder; }}
                            />
                            <h3 className="text-xl font-semibold text-green-600">
                                {r.restaurantName}
                            </h3>
                            <p className="text-gray-500 text-sm">{r.restaurantLocation}</p>
                            <div className="mt-2 text-sm font-medium bg-green-100 text-green-700 px-2 py-1 rounded">
                                ⭐ {r.rating}
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default TopRestaurants;
