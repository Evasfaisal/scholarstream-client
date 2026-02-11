import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import apiUrl from "../utils/api";

const AllScholarships = () => {
    const navigate = useNavigate();
    const [scholarships, setScholarships] = useState([]);
    const [search, setSearch] = useState("");
    const [country, setCountry] = useState("");
    const [category, setCategory] = useState("");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const PAGE_SIZE = 10;

    const fetchScholarships = async () => {
        setLoading(true);
        try {
            console.log('Fetching scholarships with params:', { search, country, category, page, limit: PAGE_SIZE });
            const res = await apiUrl.get("/api/scholarships", {
                params: {
                    search,
                    country,
                    category,
                    page,
                    limit: PAGE_SIZE
                }
            });
            console.log('API Response:', res.data);

            if (res.data && Array.isArray(res.data.scholarships)) {
                setScholarships(res.data.scholarships);
                setTotalPages(res.data.totalPages || 1);
            } else if (Array.isArray(res.data)) {
                setScholarships(res.data);
                setTotalPages(1);
            } else {
                console.warn('Unexpected data format:', res.data);
                setScholarships([]);
                setTotalPages(1);
            }
        } catch (err) {
            console.error("Error fetching scholarships:", err);
            console.error("Error details:", err.response?.data || err.message);
            setScholarships([]);
            setTotalPages(1);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchScholarships();

    }, [search, country, category, page]);

    const isScholarshipsArray = Array.isArray(scholarships);

    return (
        <div className="max-w-7xl mx-auto p-6 min-h-screen bg-gradient-to-br from-slate-50 to-purple-50">
            {/* Header Section */}
            <div className="mb-10 text-center">
                <h2 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-3">
                    🎓 All Scholarships
                </h2>
                <p className="text-slate-600 text-lg">Discover your perfect scholarship opportunity</p>
            </div>

            {/* Filter Section */}
            <div className="bg-white rounded-3xl shadow-xl p-6 mb-8 border-2 border-purple-100">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="relative flex-1">
                        <span className="absolute left-4 top-4 text-2xl">🔍</span>
                        <input
                            className="input input-bordered w-full pl-14 pr-4 h-14 text-lg rounded-2xl border-2 border-slate-200 focus:border-purple-500 transition-all"
                            placeholder="Search scholarships..."
                            value={search}
                            onChange={e => { setSearch(e.target.value); setPage(1); }}
                        />
                    </div>
                    <select
                        className="select select-bordered h-14 text-lg rounded-2xl border-2 border-slate-200 focus:border-purple-500 transition-all"
                        value={country}
                        onChange={e => { setCountry(e.target.value); setPage(1); }}
                    >
                        <option value="">🌍 All Countries</option>
                        <option value="USA">🇺🇸 USA</option>
                        <option value="UK">🇬🇧 UK</option>
                        <option value="Canada">🇨🇦 Canada</option>
                        <option value="Australia">🇦🇺 Australia</option>
                        <option value="Bangladesh">🇧🇩 Bangladesh</option>
                        <option value="Germany">🇩🇪 Germany</option>
                        <option value="Spain">🇪🇸 Spain</option>
                        <option value="Japan">🇯🇵 Japan</option>
                        <option value="Sweden">🇸🇪 Sweden</option>
                    </select>
                    <select
                        className="select select-bordered h-14 text-lg rounded-2xl border-2 border-slate-200 focus:border-purple-500 transition-all"
                        value={category}
                        onChange={e => { setCategory(e.target.value); setPage(1); }}
                    >
                        <option value="">📚 All Categories</option>
                        <option value="Science">🔬 Science</option>
                        <option value="Engineering">⚙️ Engineering</option>
                        <option value="Business">💼 Business</option>
                        <option value="Arts">🎨 Arts</option>
                        <option value="Bachelor">🎓 Bachelor</option>
                        <option value="Master">🎖️ Master</option>
                        <option value="Diploma">📜 Diploma</option>
                    </select>
                </div>
            </div>

            {loading ? (
                <div className="flex flex-col items-center justify-center py-32">
                    <span className="loading loading-spinner loading-lg text-purple-600 mb-4"></span>
                    <p className="text-slate-600 text-lg">Loading scholarships...</p>
                </div>
            ) : !isScholarshipsArray || scholarships.length === 0 ? (
                <div className="text-center py-32 bg-white rounded-3xl shadow-xl">
                    <div className="text-8xl mb-6">🔍</div>
                    <p className="text-2xl text-slate-500 font-semibold mb-3">No scholarships found</p>
                    <p className="text-slate-400 mb-6">Try adjusting your filters</p>
                    <button
                        onClick={() => {
                            setSearch("");
                            setCountry("");
                            setCategory("");
                            setPage(1);
                        }}
                        className="btn btn-primary btn-lg rounded-2xl px-8"
                    >
                        Clear Filters
                    </button>
                </div>
            ) : (
                <div className="grid gap-6">
                    {scholarships.map((s, index) => {
                        const borderColors = [
                            'border-l-8 border-l-purple-500',
                            'border-l-8 border-l-pink-500',
                            'border-l-8 border-l-blue-500',
                            'border-l-8 border-l-green-500',
                            'border-l-8 border-l-orange-500',
                            'border-l-8 border-l-red-500',
                        ];
                        const borderClass = borderColors[index % borderColors.length];

                        return (
                            <div
                                key={s._id || s.id}
                                className={`bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 ${borderClass} border-t border-r border-b border-slate-100 hover:scale-[1.02] cursor-pointer`}
                                onClick={() => navigate(`/scholarship/${s._id || s.id}`)}
                            >
                                <div className="flex flex-col md:flex-row gap-6">
                                    {/* Image Section */}
                                    <div className="flex-shrink-0">
                                        {s.photo ? (
                                            <img
                                                src={s.photo}
                                                alt={s.name}
                                                className="w-32 h-32 rounded-2xl object-cover border-4 border-slate-100 shadow-md"
                                            />
                                        ) : (
                                            <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">
                                                <span className="text-5xl">🎓</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Content Section */}
                                    <div className="flex-1">
                                        <div className="flex items-start justify-between mb-3">
                                            <div>
                                                <p className="text-lg text-slate-600 font-semibold flex items-center gap-2 mb-1">
                                                    <span>🏛️</span>
                                                    {s.universityName || s.university}
                                                </p>
                                                <h3 className="text-xl font-bold text-purple-600">
                                                    📚 {s.scholarshipCategory || s.category}
                                                </h3>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-3xl font-extrabold text-purple-600">
                                                    ${s.applicationFees || s.fees || '0'}
                                                </div>
                                                <div className="text-xs text-slate-500">Application Fee</div>
                                            </div>
                                        </div>

                                        <div className="flex flex-wrap gap-3 mb-4">
                                            <div className="badge badge-lg bg-blue-100 text-blue-700 border-blue-300 gap-2">
                                                🎓 {s.degree}
                                            </div>
                                            <div className="badge badge-lg bg-green-100 text-green-700 border-green-300 gap-2">
                                                🌍 {s.country}
                                            </div>
                                            <div className="badge badge-lg bg-orange-100 text-orange-700 border-orange-300 gap-2">
                                                📅 {s.postDate ? new Date(s.postDate).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'short',
                                                    day: 'numeric'
                                                }) : 'N/A'}
                                            </div>
                                        </div>

                                        <div className="flex gap-3">
                                            <button
                                                className="btn btn-primary btn-sm rounded-xl px-6 hover:scale-105 transition-transform"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    navigate(`/scholarship/${s._id || s.id}`);
                                                }}
                                            >
                                                View Details →
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Pagination */}
            <div className="flex justify-center mt-10">
                <div className="join shadow-lg">
                    <button
                        className="join-item btn btn-lg rounded-l-2xl hover:scale-105 transition-transform"
                        disabled={page === 1}
                        onClick={() => setPage(page - 1)}
                    >
                        ← Prev
                    </button>
                    {[...Array(totalPages)].map((_, idx) => (
                        <button
                            key={idx}
                            className={`join-item btn btn-lg hover:scale-105 transition-transform ${page === idx + 1 ? 'btn-primary' : ''}`}
                            onClick={() => setPage(idx + 1)}
                        >
                            {idx + 1}
                        </button>
                    ))}
                    <button
                        className="join-item btn btn-lg rounded-r-2xl hover:scale-105 transition-transform"
                        disabled={page === totalPages}
                        onClick={() => setPage(page + 1)}
                    >
                        Next →
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AllScholarships;
