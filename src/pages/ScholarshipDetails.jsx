import React from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";

// Dummy data for demonstration
const scholarships = [
    {
        id: 1,
        scholarshipName: "Global Excellence Scholarship",
        universityName: "Harvard University",
        universityImage: "https://i.ibb.co/JRQ25w0H/Pizza-Best-Deals-Made-with-Poster-My-Wall.jpg",
        universityWorldRank: 1,
        applicationDeadline: "2025-12-31",
        location: "Cambridge, MA, USA",
        applicationFees: "$50",
        description: "A prestigious scholarship for outstanding students worldwide.",
        coverage: "Full tuition, stipend, and living expenses."
    },
    // ... more dummy scholarships
];

const reviews = [
    {
        id: 1,
        userName: "Ayesha",
        userImage: "https://randomuser.me/api/portraits/women/1.jpg",
        ratingPoint: 5,
        reviewComment: "Amazing opportunity!",
        reviewDate: "2025-06-01"
    },
    {
        id: 2,
        userName: "Rahim",
        userImage: "https://randomuser.me/api/portraits/men/2.jpg",
        ratingPoint: 4,
        reviewComment: "Helped me a lot.",
        reviewDate: "2025-06-02"
    }
];

const ScholarshipDetails = () => {
    const { id } = useParams();
    const scholarship = scholarships.find(s => s.id === Number(id));

    if (!scholarship) {
        return <div className="text-center py-20 text-2xl text-gray-500">Scholarship not found.</div>;
    }

    return (
        <div className="max-w-4xl mx-auto p-6 min-h-screen">
            <motion.div className="card bg-white shadow-lg border border-green-100 mb-8" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <figure><img src={scholarship.universityImage} alt={scholarship.scholarshipName} className="h-56 w-full object-cover" /></figure>
                <div className="card-body">
                    <h2 className="card-title text-green-700">{scholarship.scholarshipName}</h2>
                    <p className="text-gray-700 font-semibold">{scholarship.universityName} (World Rank: {scholarship.universityWorldRank})</p>
                    <p className="text-sm text-gray-500">Location: {scholarship.location}</p>
                    <p className="text-sm text-gray-500">Deadline: {scholarship.applicationDeadline}</p>
                    <p className="text-sm text-gray-500">Application Fees: {scholarship.applicationFees}</p>
                    <p className="mt-2 text-gray-700">{scholarship.description}</p>
                    <p className="mt-2 text-green-700 font-semibold">Coverage: {scholarship.coverage}</p>
                    <a href={`/checkout/${scholarship.id}`} className="btn btn-success mt-4">Apply for Scholarship</a>
                </div>
            </motion.div>
            {/* Reviews Section */}
            <section className="bg-green-50 rounded-lg p-6 mb-8">
                <h3 className="text-xl font-bold text-green-700 mb-4">Reviews</h3>
                {reviews.length === 0 ? (
                    <p className="text-gray-500">No reviews yet.</p>
                ) : (
                    <div className="space-y-4">
                        {reviews.map(r => (
                            <div key={r.id} className="flex items-center gap-4 bg-white rounded shadow p-4">
                                <img src={r.userImage} alt={r.userName} className="w-12 h-12 rounded-full object-cover" />
                                <div>
                                    <div className="font-semibold text-green-700">{r.userName}</div>
                                    <div className="text-yellow-500">{"★".repeat(r.ratingPoint)}{"☆".repeat(5 - r.ratingPoint)}</div>
                                    <div className="text-gray-700">{r.reviewComment}</div>
                                    <div className="text-xs text-gray-500">{r.reviewDate}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
};

export default ScholarshipDetails;
