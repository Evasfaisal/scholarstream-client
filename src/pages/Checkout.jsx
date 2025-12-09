import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";


const scholarships = [
    {
        id: 1,
        scholarshipName: "Global Excellence Scholarship",
        universityName: "Harvard University",
        applicationFees: "$50"
    },

];

const Checkout = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const scholarship = scholarships.find(s => s.id === Number(id));
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handlePay = (e) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setSuccess(true);
            setTimeout(() => navigate("/dashboard/my-applications"), 2000);
        }, 2000);
    };

    if (!scholarship) return <div className="text-center py-20 text-2xl text-gray-500">Scholarship not found.</div>;

    return (
        <div className="max-w-xl mx-auto p-8 min-h-screen">
            <h2 className="text-2xl font-bold text-green-700 mb-6">Checkout</h2>
            <div className="bg-white rounded-lg shadow p-6 mb-6">
                <p className="font-semibold">Scholarship: <span className="text-green-700">{scholarship.scholarshipName}</span></p>
                <p>University: {scholarship.universityName}</p>
                <p>Application Fees: {scholarship.applicationFees}</p>
            </div>
            {success ? (
                <div className="alert alert-success">Payment Successful! Redirecting...</div>
            ) : (
                <form onSubmit={handlePay} className="space-y-4">
                    <div>
                        <label className="block mb-1 font-medium">Card Number</label>
                        <input type="text" className="input input-bordered w-full" required placeholder="1234 5678 9012 3456" />
                    </div>
                    <div className="flex gap-4">
                        <div className="flex-1">
                            <label className="block mb-1 font-medium">Expiry</label>
                            <input type="text" className="input input-bordered w-full" required placeholder="MM/YY" />
                        </div>
                        <div className="flex-1">
                            <label className="block mb-1 font-medium">CVC</label>
                            <input type="text" className="input input-bordered w-full" required placeholder="CVC" />
                        </div>
                    </div>
                    <button type="submit" className="btn btn-success w-full" disabled={loading}>
                        {loading ? "Processing..." : "Pay & Apply"}
                    </button>
                </form>
            )}
        </div>
    );
};

export default Checkout;
