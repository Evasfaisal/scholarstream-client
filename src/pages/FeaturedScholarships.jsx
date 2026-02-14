import React, { useEffect, useState } from "react";
import apiUrl from "../utils/api";
import { FaStar, FaGraduationCap } from "react-icons/fa";

const FeaturedScholarships = () => {
    const [featured, setFeatured] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFeatured = async () => {
            try {
                const res = await apiUrl.get("/api/scholarships/featured");
                console.log(res.data); 
                setFeatured(res.data || []);
            } catch (err) {
                setFeatured([]);
            }
            setLoading(false);
        };
        fetchFeatured();
    }, []);

    if (loading) {
        return <div className="text-center py-32">Loading...</div>;
    }

    return (
        <div className="max-w-7xl mx-auto p-6">
            <h2 className="text-4xl font-bold mb-6 text-purple-600"><FaStar className="inline-block mr-2 text-yellow-400" /> Featured Scholarships</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {featured.map((s) => (
                    <div key={s._id || s.id} className="bg-white rounded-2xl shadow-lg p-6">
                        <div className="flex flex-col items-center">
                            <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center mb-4">
                                {(s.image || s.photo || s.universityImage) ? (
                                    <img
                                        src={s.image || s.photo || s.universityImage}
                                        alt={s.name}
                                        className="w-32 h-32 rounded-2xl object-cover border-4 border-slate-100 shadow-md"
                                        onError={e => { e.currentTarget.style.display = 'none'; e.currentTarget.parentNode.querySelector('span').style.display = 'block'; }}
                                    />
                                ) : null}
                                <span className="text-5xl" style={{display: (s.image || s.photo || s.universityImage) ? 'none' : 'block'}}><FaGraduationCap className="text-purple-400" /></span>
                            </div>
                            <h3 className="text-xl font-bold text-purple-600 mb-2">{s.name}</h3>
                            <p className="text-slate-600 mb-2">{s.universityName || s.university}</p>
                            <div className="badge badge-lg bg-blue-100 text-blue-700 border-blue-300 mb-2">{s.country}</div>
                            <button className="btn btn-primary btn-sm rounded-xl px-6 mt-2">View Details</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FeaturedScholarships;
