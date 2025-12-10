import React, { useState, useEffect } from "react";
import axios from "axios";
import { apiUrl } from "../utils/api";

const AllScholarships = () => {
    const [scholarships, setScholarships] = useState([]);
    const [search, setSearch] = useState("");
    const [country, setCountry] = useState("");
    const [category, setCategory] = useState("");
    const [sort, setSort] = useState("");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const PAGE_SIZE = 10;

    const fetchScholarships = async () => {
        setLoading(true);
        try {
            const res = await axios.get(apiUrl("/api/scholarships"), {
                params: {
                    search,
                    country,
                    category,
                    sort,
                    page,
                    limit: PAGE_SIZE
                }
            });
            if (res.data && Array.isArray(res.data.scholarships)) {
                setScholarships(res.data.scholarships);
                setTotalPages(res.data.totalPages || 1);
            } else if (Array.isArray(res.data)) {
                setScholarships(res.data);
                setTotalPages(1);
            } else {
                setScholarships([]);
                setTotalPages(1);
            }
        } catch (err) {
            console.error("Error fetching scholarships:", err);
            setScholarships([]);
            setTotalPages(1);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchScholarships();

    }, [search, country, category, sort, page]);

    const isScholarshipsArray = Array.isArray(scholarships);

    return (
        <div className="max-w-7xl mx-auto p-4 min-h-screen">
            <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">All Scholarships</h2>

            <div className="flex flex-col md:flex-row gap-4 mb-6">
                <input
                    className="input input-bordered w-full md:w-1/3"
                    placeholder="Search by name, university, degree..."
                    value={search}
                    onChange={e => { setSearch(e.target.value); setPage(1); }}
                />
                <select
                    className="select select-bordered w-full md:w-1/4"
                    value={country}
                    onChange={e => { setCountry(e.target.value); setPage(1); }}
                >
                    <option value="">All Countries</option>
                    <option value="USA">USA</option>
                    <option value="UK">UK</option>
                    <option value="Canada">Canada</option>
                    <option value="Australia">Australia</option>
                    <option value="Bangladesh">Bangladesh</option>
                    <option value="Germany">Germany</option>
                    <option value="Spain">Spain</option>
                    <option value="Japan">Japan</option>
                    <option value="Sweden">Sweden</option>
                </select>
                <select
                    className="select select-bordered w-full md:w-1/4"
                    value={category}
                    onChange={e => { setCategory(e.target.value); setPage(1); }}
                >
                    <option value="">All Categories</option>
                    <option value="Science">Science</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Business">Business</option>
                    <option value="Arts">Arts</option>
                </select>
                <select
                    className="select select-bordered w-full md:w-1/4"
                    value={sort}
                    onChange={e => { setSort(e.target.value); setPage(1); }}
                >
                    <option value="">Sort By</option>
                    <option value="fees_asc">Fees: Low to High</option>
                    <option value="fees_desc">Fees: High to Low</option>
                    <option value="date_desc">Newest</option>
                    <option value="date_asc">Oldest</option>
                </select>
            </div>

            {loading ? (
                <div className="flex justify-center py-20">
                    <span className="loading loading-spinner loading-lg text-success"></span>
                </div>
            ) : !isScholarshipsArray || scholarships.length === 0 ? (
                <p className="text-center text-2xl text-gray-500 py-20">No scholarships found.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th>Photo</th>
                                <th>Name</th>
                                <th>University</th>
                                <th>Degree</th>
                                <th>Country</th>
                                <th>Category</th>
                                <th>Fees</th>
                                <th>Post Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {scholarships.map(s => (
                                <tr key={s._id || s.id}>
                                    <td>
                                        {s.photo ? (
                                            <img
                                                src={s.photo}
                                                alt={s.name}
                                                className="w-12 h-12 rounded-full object-cover border"
                                            />
                                        ) : (
                                            <span className="text-gray-400">No Image</span>
                                        )}
                                    </td>
                                    <td>{s.name}</td>
                                    <td>{s.university}</td>
                                    <td>{s.degree}</td>
                                    <td>{s.country}</td>
                                    <td>{s.category}</td>
                                    <td>৳{s.fees}</td>
                                    <td>{s.postDate ? new Date(s.postDate).toLocaleDateString() : ''}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            <div className="flex justify-center mt-8">
                <div className="join">
                    <button
                        className="join-item btn"
                        disabled={page === 1}
                        onClick={() => setPage(page - 1)}
                    >
                        Prev
                    </button>
                    {[...Array(totalPages)].map((_, idx) => (
                        <button
                            key={idx}
                            className={`join-item btn ${page === idx + 1 ? 'btn-active' : ''}`}
                            onClick={() => setPage(idx + 1)}
                        >
                            {idx + 1}
                        </button>
                    ))}
                    <button
                        className="join-item btn"
                        disabled={page === totalPages}
                        onClick={() => setPage(page + 1)}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AllScholarships;
