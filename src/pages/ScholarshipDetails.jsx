import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase.config";

const ScholarshipDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [scholarship, setScholarship] = useState({});
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReviews = async () => {
            setLoading(true);
            try {
                const q = query(collection(db, "reviews"), where("scholarshipId", "==", id));
                const querySnapshot = await getDocs(q);
                const reviewsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setReviews(reviewsData);
            } catch (err) {
                setReviews([]);
            }
            setLoading(false);
        };
        fetchReviews();
    }, [id]);

    return (
        <div className="max-w-4xl mx-auto py-14 px-4">
            <div className="bg-white/90 rounded-3xl shadow-2xl p-10 flex flex-col md:flex-row gap-10 border border-slate-200">
                <img src={scholarship.universityImage} alt={scholarship.universityName} className="w-64 h-64 object-cover rounded-2xl border-4 border-primary/20 shadow" />
                <div className="flex-1 flex flex-col gap-4">
                    <h2 className="text-3xl font-extrabold text-primary mb-2 tracking-tight">{scholarship.scholarshipName}</h2>
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
                    <p className="text-slate-700 mt-2 leading-relaxed">{scholarship.description}</p>
                    <div className="flex flex-wrap gap-4 mt-4">
                        <div className="bg-primary/5 rounded-xl p-4 min-w-[120px]">
                            <div className="text-xs text-slate-500">Application Fees</div>
                            <div className="text-lg font-bold text-primary">{scholarship.applicationFees}</div>
                        </div>
                        <div className="bg-primary/5 rounded-xl p-4 min-w-[120px]">
                            <div className="text-xs text-slate-500">Service Charge</div>
                            <div className="text-lg font-bold text-primary">{scholarship.serviceCharge}</div>
                        </div>
                        {scholarship.tuitionFees && (
                            <div className="bg-primary/5 rounded-xl p-4 min-w-[120px]">
                                <div className="text-xs text-slate-500">Tuition Fees</div>
                                <div className="text-lg font-bold text-primary">{scholarship.tuitionFees}</div>
                            </div>
                        )}
                    </div>
                    <div className="flex flex-wrap gap-4 mt-2 text-xs text-slate-500">
                        <span>Deadline: {scholarship.applicationDeadline}</span>
                        <span>Posted: {scholarship.scholarshipPostDate}</span>
                    </div>
                    <a href={`/checkout?scholarshipId=${scholarship.id}`} className="btn btn-primary btn-lg mt-6 w-full md:w-auto shadow">Apply & Pay</a>
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
                            <div key={r.id} className="bg-white rounded-2xl shadow p-6 flex gap-4 border border-slate-100">
                                <img src={r.userImage} alt={r.userName} className="w-14 h-14 rounded-full object-cover border-2 border-primary/20" />
                                <div>
                                    <div className="font-semibold text-primary">{r.userName}</div>
                                    <div className="text-yellow-500">{"★".repeat(r.ratingPoint)}{"☆".repeat(5 - r.ratingPoint)}</div>
                                    <div className="text-slate-700">{r.reviewComment}</div>
                                    <div className="text-xs text-slate-500">{r.reviewDate}</div>
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
