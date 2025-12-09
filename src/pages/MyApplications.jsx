import React, { useState } from "react";


const initialApplications = [
    {
        id: 1,
        scholarshipName: "Global Excellence Scholarship",
        universityName: "Harvard University",
        status: "Pending",
        paymentStatus: "Unpaid",
        feedback: "",
        subjectCategory: "Science",
        applicationFees: 100,
        applicationDate: "2025-12-01"
    },
    {
        id: 2,
        scholarshipName: "Future Leaders Award",
        universityName: "Oxford University",
        status: "Completed",
        paymentStatus: "Paid",
        feedback: "Congratulations!",
        subjectCategory: "Arts",
        applicationFees: 120,
        applicationDate: "2025-12-02"
    }
];

const MyApplications = () => {
    const [applications, setApplications] = useState(initialApplications);
    const [selectedApp, setSelectedApp] = useState(null);
    const [showDetails, setShowDetails] = useState(false);
    const [showReview, setShowReview] = useState(false);
    const [reviewRating, setReviewRating] = useState(5);
    const [reviewComment, setReviewComment] = useState("");

    // Handlers
    const handleDetails = (app) => {
        setSelectedApp(app);
        setShowDetails(true);
    };
    const handleCloseDetails = () => {
        setShowDetails(false);
        setSelectedApp(null);
    };
    const handleEdit = (app) => {
        alert("Edit application: " + app.scholarshipName);
    };
    const handlePay = (app) => {
        alert("Pay for application: " + app.scholarshipName);
    };
    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this application?")) {
            setApplications(apps => apps.filter(app => app.id !== id));
        }
    };
    const handleAddReview = (app) => {
        setSelectedApp(app);
        setShowReview(true);
    };
    const handleSubmitReview = () => {
        alert(`Review submitted! Rating: ${reviewRating}, Comment: ${reviewComment}`);
        setShowReview(false);
        setReviewRating(5);
        setReviewComment("");
    };
    const handleCloseReview = () => {
        setShowReview(false);
        setReviewRating(5);
        setReviewComment("");
    };

    return (
        <div className="max-w-4xl mx-auto p-6 min-h-screen">
            <h2 className="text-2xl font-bold text-green-700 mb-6">My Applications</h2>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>Scholarship</th>
                            <th>University</th>
                            <th>Status</th>
                            <th>Payment</th>
                            <th>Feedback</th>
                            <th>Subject</th>
                            <th>Fees</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {applications.map(app => (
                            <tr key={app.id}>
                                <td>{app.scholarshipName}</td>
                                <td>{app.universityName}</td>
                                <td>
                                    <span className={`badge ${app.status === "Completed" ? "badge-success" : app.status === "Processing" ? "badge-warning" : app.status === "Pending" ? "badge-info" : "badge-error"}`}>{app.status}</span>
                                </td>
                                <td>
                                    <span className={`badge ${app.paymentStatus === "Paid" ? "badge-success" : "badge-error"}`}>{app.paymentStatus}</span>
                                </td>
                                <td>{app.feedback || <span className="text-gray-400">-</span>}</td>
                                <td>{app.subjectCategory}</td>
                                <td>{app.applicationFees}</td>
                                <td>{app.applicationDate}</td>
                                <td className="flex flex-wrap gap-1">
                                    <button className="btn btn-xs btn-info" onClick={() => handleDetails(app)}>Details</button>
                                    {app.status === "Pending" && (
                                        <>
                                            <button className="btn btn-xs btn-primary" onClick={() => handleEdit(app)}>Edit</button>
                                            <button className="btn btn-xs btn-error" onClick={() => handleDelete(app.id)}>Delete</button>
                                            {app.paymentStatus === "Unpaid" && (
                                                <button className="btn btn-xs btn-success" onClick={() => handlePay(app)}>Pay</button>
                                            )}
                                        </>
                                    )}
                                    {app.status === "Completed" && (
                                        <button className="btn btn-xs btn-warning" onClick={() => handleAddReview(app)}>Add Review</button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Details Modal */}
            {showDetails && selectedApp && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-8 w-full max-w-md relative">
                        <button className="absolute top-2 right-2 text-xl" onClick={handleCloseDetails}>&times;</button>
                        <h3 className="text-xl font-bold mb-4">Application Details</h3>
                        <div className="space-y-2">
                            <div><b>Scholarship:</b> {selectedApp.scholarshipName}</div>
                            <div><b>University:</b> {selectedApp.universityName}</div>
                            <div><b>Status:</b> {selectedApp.status}</div>
                            <div><b>Payment:</b> {selectedApp.paymentStatus}</div>
                            <div><b>Feedback:</b> {selectedApp.feedback || '-'}</div>
                            <div><b>Subject:</b> {selectedApp.subjectCategory}</div>
                            <div><b>Fees:</b> {selectedApp.applicationFees}</div>
                            <div><b>Date:</b> {selectedApp.applicationDate}</div>
                        </div>
                    </div>
                </div>
            )}

            {/* Add Review Modal */}
            {showReview && selectedApp && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-8 w-full max-w-md relative">
                        <button className="absolute top-2 right-2 text-xl" onClick={handleCloseReview}>&times;</button>
                        <h3 className="text-xl font-bold mb-4">Add Review for {selectedApp.scholarshipName}</h3>
                        <div className="mb-4">
                            <label className="block font-semibold mb-1">Rating:</label>
                            <select className="select select-bordered w-full" value={reviewRating} onChange={e => setReviewRating(Number(e.target.value))}>
                                {[1, 2, 3, 4, 5].map(star => (
                                    <option key={star} value={star}>{star} Star{star > 1 && 's'}</option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-4">
                            <label className="block font-semibold mb-1">Comment:</label>
                            <textarea className="textarea textarea-bordered w-full" rows={4} value={reviewComment} onChange={e => setReviewComment(e.target.value)} />
                        </div>
                        <button className="btn btn-success mr-2" onClick={handleSubmitReview}>Submit</button>
                        <button className="btn btn-ghost" onClick={handleCloseReview}>Cancel</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyApplications;
