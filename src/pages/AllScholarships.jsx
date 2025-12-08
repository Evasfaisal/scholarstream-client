import React, { useState } from "react";
import { motion } from "framer-motion";

// Dummy scholarship data
const scholarships = [
    {
        id: 1,
        scholarshipName: "Global Excellence Scholarship",
        universityName: "Harvard University",
        universityImage: "https://i.ibb.co/JRQ25w0H/Pizza-Best-Deals-Made-with-Poster-My-Wall.jpg",
        universityCountry: "USA",
        scholarshipCategory: "Full fund",
        degree: "Masters",
        applicationFees: "$50",
        location: "Cambridge, MA"
    },
    {
        id: 2,
        scholarshipName: "Future Leaders Award",
        universityName: "Oxford University",
        universityImage: "https://i.ibb.co/j9SX6TDM/Burger-Discount-Voucher-Design-Template-Made-with-Poster-My-Wall-1.jpg",
        universityCountry: "UK",
        scholarshipCategory: "Partial",
        degree: "Bachelor",
        applicationFees: "$30",
        location: "Oxford, UK"
    },
    {
        id: 3,
        scholarshipName: "Asia Pacific Scholarship",
        universityName: "National University of Singapore",
        universityImage: "https://i.ibb.co/0j3PQZb/banner1.jpg",
        universityCountry: "Singapore",
        scholarshipCategory: "Full fund",
        degree: "Masters",
        applicationFees: "$35",
        location: "Singapore"
    },
    {
        id: 4,
        scholarshipName: "Women in Tech Grant",
        universityName: "Stanford University",
        universityImage: "https://i.ibb.co/8LQTT5XG/Restaurant-Facebook-Shared-Post-Design-Made-with-Poster-My-Wall.jpg",
        universityCountry: "USA",
        scholarshipCategory: "Self-fund",
        degree: "Diploma",
        applicationFees: "$25",
        location: "Stanford, CA"
    }
];

const categories = ["All", "Full fund", "Partial", "Self-fund"];
const degrees = ["All", "Diploma", "Bachelor", "Masters"];

const AllScholarships = () => {
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All");
    const [degree, setDegree] = useState("All");

    // Filter logic
    const filtered = scholarships.filter(s => {
        const matchSearch =
            s.scholarshipName.toLowerCase().includes(search.toLowerCase()) ||
            s.universityName.toLowerCase().includes(search.toLowerCase()) ||
            s.degree.toLowerCase().includes(search.toLowerCase());
        const matchCategory = category === "All" || s.scholarshipCategory === category;
        const matchDegree = degree === "All" || s.degree === degree;
        return matchSearch && matchCategory && matchDegree;
    });

    return (
        <div className="max-w-7xl mx-auto p-6 min-h-screen">
            <h2 className="text-3xl font-bold text-green-700 mb-8 text-center">All Scholarships</h2>
            <form className="mb-8 flex flex-col md:flex-row gap-4 justify-center items-center">
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
