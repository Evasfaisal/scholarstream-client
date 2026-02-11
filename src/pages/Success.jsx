import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Success = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { scholarshipName, universityName, amount } = location.state || {};

    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4 py-12">
            <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-2xl">
                <div className="bg-green-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-16 h-16 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                </div>

                <h1 className="text-4xl font-extrabold text-green-600 mb-4">Payment Successful!</h1>
                <p className="text-slate-700 mb-8 text-lg">
                    Your payment was completed successfully. Your scholarship application has been submitted and is now under review.
                </p>

                <div className="bg-slate-50 rounded-2xl p-6 mb-8 text-left">
                    <h2 className="text-xl font-bold text-slate-800 mb-4 text-center">Payment Details</h2>
                    <div className="space-y-3">
                        <div className="flex justify-between border-b pb-2">
                            <span className="font-semibold text-slate-600">Scholarship:</span>
                            <span className="text-slate-800">{scholarshipName || "N/A"}</span>
                        </div>
                        <div className="flex justify-between border-b pb-2">
                            <span className="font-semibold text-slate-600">University:</span>
                            <span className="text-slate-800">{universityName || "N/A"}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-semibold text-slate-600">Amount Paid:</span>
                            <span className="text-2xl font-bold text-green-600">${amount || "0"}</span>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                        onClick={() => navigate("/dashboard/my-applications")}
                        className="btn btn-primary btn-lg"
                    >
                        Go to My Applications
                    </button>
                    <Link to="/allscholarships" className="btn btn-outline btn-lg">
                        Browse More Scholarships
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Success;
