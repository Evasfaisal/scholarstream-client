import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { apiUrl } from "../utils/api";

const AllScholarships = () => {
    const [scholarships, setScholarships] = useState([]);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All");
    const [degree, setDegree] = useState("All");
    const [subject, setSubject] = useState("All");
    const [location, setLocation] = useState("All");

    useEffect(() => {
        const fetchScholarships = async () => {
            try {
                const res = await axios.get(apiUrl('/api/scholarships'));
                setScholarships(res.data);
            } catch (err) {
                console.error('Failed to fetch scholarships:', err);
            }
        };
        fetchScholarships();
    }, []);

  
    const categories = ["All", ...Array.from(new Set(scholarships.map(s => s.scholarshipCategory)))]
    const degrees = ["All", ...Array.from(new Set(scholarships.map(s => s.degree)))]
    const subjects = ["All", ...Array.from(new Set(scholarships.map(s => s.subjectCategory)))]
    const locations = ["All", ...Array.from(new Set(scholarships.map(s => s.location)))]

    const AllScholarships = () => {
        const [search, setSearch] = useState("");
        const [category, setCategory] = useState("All");
        const [degree, setDegree] = useState("All");
        const [subject, setSubject] = useState("All");
        const [location, setLocation] = useState("All");

      
        const filtered = scholarships.filter(s => {
            const matchSearch =
                s.scholarshipName.toLowerCase().includes(search.toLowerCase()) ||
                s.universityName.toLowerCase().includes(search.toLowerCase()) ||
                s.degree.toLowerCase().includes(search.toLowerCase());
            const matchCategory = category === "All" || s.scholarshipCategory === category;
            const matchDegree = degree === "All" || s.degree === degree;
            const matchSubject = subject === "All" || s.subjectCategory === subject;
            const matchLocation = location === "All" || s.location === location;
            return matchSearch && matchCategory && matchDegree && matchSubject && matchLocation;
        });

        return (
            <div className="max-w-7xl mx-auto p-6 min-h-screen">
                <h2 className="text-3xl font-bold text-green-700 mb-8 text-center">All Scholarships</h2>
                <form className="mb-8 flex flex-col md:flex-row gap-4 justify-center items-center flex-wrap">
                    <input
                        type="text"
                        placeholder="Search by Scholarship, University, or Degree..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        className="input input-bordered w-full max-w-xs"
                    />
                    <select className="select select-bordered" value={category} onChange={e => setCategory(e.target.value)}>
                        {categories.map(c => <option key={c}>{c}</option>)}
                    </select>
                    <select className="select select-bordered" value={degree} onChange={e => setDegree(e.target.value)}>
                        {degrees.map(d => <option key={d}>{d}</option>)}
                    </select>
                    <select className="select select-bordered" value={subject} onChange={e => setSubject(e.target.value)}>
                        {subjects.map(s => <option key={s}>{s}</option>)}
                    </select>
                    <select className="select select-bordered" value={location} onChange={e => setLocation(e.target.value)}>
                        {locations.map(l => <option key={l}>{l}</option>)}
                    </select>
                </form>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {filtered.length === 0 ? (
                        <p className="text-center text-gray-500 col-span-full">No scholarships found.</p>
                    ) : (
                        filtered.map((s, i) => (
                            <motion.div key={s.id} className="card bg-white shadow-lg border border-green-100" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                                <figure><img src={s.universityImage} alt={s.scholarshipName} className="h-32 w-full object-cover" /></figure>
                                <div className="card-body">
                                    <h3 className="card-title text-green-700">{s.scholarshipName}</h3>
                                    <p className="text-gray-700">{s.universityName} ({s.universityCountry})</p>
                                    <p className="text-sm text-gray-500">Category: {s.scholarshipCategory}</p>
                                    <p className="text-sm text-gray-500">Subject: {s.subjectCategory}</p>
                                    <p className="text-sm text-gray-500">Degree: {s.degree}</p>
                                    <p className="text-sm text-gray-500">Location: {s.location}</p>
                                    <p className="text-sm text-gray-500">Application Fees: {s.applicationFees}</p>
                                    <a href={`/scholarship/${s.id}`} className="btn btn-outline btn-success mt-2">View Details</a>
                                </div>
                            </motion.div>
                        ))
                    )}
                </div>
            </div>
        );
    };

    export default AllScholarships;
