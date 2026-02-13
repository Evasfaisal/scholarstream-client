import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import apiUrl from "../utils/api";

const ScholarshipDetails = () => {
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [scholarship, setScholarship] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchScholarshipDetails = async () => {
            setLoading(true);
            try {
                // Fetch scholarship details
                const scholarshipRes = await apiUrl.get(`/api/scholarships/${id}`);
                setScholarship(scholarshipRes.data);

                // Fetch reviews for this scholarship
                const reviewsRes = await apiUrl.get(`/api/reviews?scholarshipId=${id}`);
                setReviews(reviewsRes.data || []);
            } catch (error) {
                console.error("Error fetching scholarship details:", error);
                setScholarship(null);
            } finally {
                setLoading(false);
            }
        };

        fetchScholarshipDetails();
    }, [id]);

    const handleApply = () => {
        if (!user) {
            navigate('/login', { state: { from: `/scholarship/${id}` } });
            return;
        }
        navigate('/checkout', { state: { scholarship } });
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-base-100 flex items-center justify-center">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );
    }

    if (!scholarship) {
        return (
            <div className="min-h-screen bg-base-100 flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-slate-800 mb-4">Scholarship not found</h2>
                    <button onClick={() => navigate('/allscholarships')} className="btn btn-primary">
                        Back to Scholarships
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto py-14 px-6">
            <div className="bg-white/90 rounded-3xl shadow-2xl p-12 flex flex-col md:flex-row gap-12 border border-slate-200">
                <img
                    src={scholarship.universityImage}
                    alt={scholarship.scholarshipName}
                    className="w-full max-w-lg rounded-xl shadow mb-6"
                    onError={e => { e.target.onerror = null; e.target.src = '/logo.jpg'; }}
                />
                <div className="flex-1 flex flex-col gap-4">
                    <h2 className="text-4xl font-extrabold text-primary mb-2 tracking-tight">{scholarship.scholarshipName}</h2>
                    <div className="flex flex-wrap gap-2 text-sm text-slate-500">
                        <span>{scholarship.universityName}</span>
                        <span>• {scholarship.universityCountry}, {scholarship.universityCity}</span>
                        <span>• World Rank: {scholarship.universityWorldRank}</span>
                    </div>
                    <div className="flex flex-wrap gap-2 text-xs">
                        <span className="bg-primary/10 text-primary px-3 py-1 rounded-full font-semibold">{scholarship.subjectCategory}</span>
                        <span className="bg-secondary/10 text-secondary px-3 py-1 rounded-full font-semibold">{scholarship.scholarshipCategory}</span>
                        <span className="bg-accent/10 text-accent px-3 py-1 rounded-full font-semibold">{scholarship.degree}</span>
                    </div>

                    {/* Scholarship Description */}
                    <div className="mt-4">
                        <h3 className="text-lg font-bold text-slate-800 mb-2">📝 Scholarship Description</h3>
                        <p className="text-slate-700 leading-relaxed">
                            {scholarship.scholarshipDescription || scholarship.description || `This prestigious scholarship at ${scholarship.universityName} offers exceptional opportunities for ${scholarship.degree} students in ${scholarship.subjectCategory}. The ${scholarship.scholarshipCategory} scholarship provides comprehensive support for international students.`}
                        </p>
                    </div>

                    {/* Stipend/Coverage Details */}
                    {(scholarship.stipend || scholarship.coverage) && (
                        <div className="mt-4 bg-green-50 border-l-4 border-green-500 rounded-lg p-4">
                            <h3 className="text-lg font-bold text-green-800 mb-2">💰 Stipend & Coverage</h3>
                            <p className="text-slate-700">
                                {scholarship.stipend || scholarship.coverage}
                            </p>
                        </div>
                    )}

                    <div className="flex flex-wrap gap-6 mt-6">
                        <div className="bg-primary/5 rounded-xl p-6 min-w-[180px] shadow-md">
                            <div className="text-sm font-semibold text-slate-600 mb-1">Application Fees</div>
                            <div className="text-3xl font-extrabold text-primary">${scholarship.applicationFees}</div>
                        </div>
                        <div className="bg-primary/5 rounded-xl p-6 min-w-[180px] shadow-md">
                            <div className="text-sm font-semibold text-slate-600 mb-1">Service Charge</div>
                            <div className="text-3xl font-extrabold text-primary">${scholarship.serviceCharge}</div>
                        </div>
                        {scholarship.tuitionFees && (
                            <div className="bg-primary/5 rounded-xl p-6 min-w-[180px] shadow-md">
                                <div className="text-sm font-semibold text-slate-600 mb-1">Tuition Fees</div>
                                <div className="text-3xl font-extrabold text-primary">${scholarship.tuitionFees}</div>
                            </div>
                        )}
                    </div>
                    <div className="flex flex-wrap gap-6 mt-4 text-base font-semibold text-slate-600">
                        <span>📅 Deadline: {new Date(scholarship.applicationDeadline).toLocaleDateString()}</span>
                        <span>📌 Posted: {new Date(scholarship.scholarshipPostDate).toLocaleDateString()}</span>
                    </div>
                    <button onClick={handleApply} className="btn btn-primary btn-lg mt-8 w-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all px-12 py-4 rounded-2xl border-4 border-primary/30">
                        <span className="text-2xl font-extrabold flex items-center justify-center gap-3">
                            💳 Apply & Pay
                        </span>
                    </button>
                </div>
            </div>


            <div className="mt-14">
                <h3 className="text-2xl font-bold text-primary mb-6">Student Reviews</h3>
                {loading ? (
                    <p className="text-slate-500">Loading reviews...</p>
                ) : reviews.length === 0 ? (
                    <p className="text-slate-500">No reviews yet.</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {reviews.map(r => (
                            <div key={r._id} className="bg-white rounded-2xl shadow p-6 flex gap-4 border border-slate-100">
                                <img src={r.userImage || "https://via.placeholder.com/50"} alt={r.userName} className="w-14 h-14 rounded-full object-cover border-2 border-primary/20" />
                                <div>
                                    <div className="font-semibold text-primary">{r.userName}</div>
                                    <div className="text-yellow-500">{"★".repeat(r.ratingPoint)}{"☆".repeat(5 - r.ratingPoint)}</div>
                                    <div className="text-slate-700">{r.reviewComment}</div>
                                    <div className="text-xs text-slate-500">{new Date(r.reviewDate).toLocaleDateString()}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ScholarshipDetails;
