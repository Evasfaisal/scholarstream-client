import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Failed = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { scholarshipName, error, scholarship } = location.state || {};

    const handleRetryPayment = () => {
        if (scholarship) {
            console.log('Retrying payment with scholarship:', scholarship);
            navigate('/checkout', { state: { scholarship }, replace: true });
        } else {
            console.log('No scholarship data, redirecting to all scholarships');
            navigate('/allscholarships');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4 py-12">
            <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-2xl">
                <div className="bg-red-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 cursor-pointer hover:bg-red-200 transition-all hover:scale-110 duration-300" onClick={handleRetryPayment} title="Click to try payment again">
                    <svg className="w-16 h-16 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </div>

                <h1 className="text-4xl font-extrabold text-red-600 mb-4">Payment Failed!</h1>
                <p className="text-slate-700 mb-4 text-lg">
                    Sorry, your payment could not be processed. Please try again or contact support if the problem persists.
                </p>
                <p className="text-sm text-blue-600 mb-8 font-semibold cursor-pointer hover:text-blue-800 transition-all" onClick={handleRetryPayment}>
                    👆 Click the X icon above or the button below to retry payment
                </p>

                <div className="bg-slate-50 rounded-2xl p-6 mb-8 text-left">
                    <h2 className="text-xl font-bold text-slate-800 mb-4 text-center">Transaction Details</h2>
                    <div className="space-y-3">
                        <div className="flex justify-between border-b pb-2">
                            <span className="font-semibold text-slate-600">Scholarship:</span>
                            <span className="text-slate-800">{scholarshipName || "N/A"}</span>
                        </div>
                        <div className="bg-red-50 p-3 rounded-lg">
                            <span className="font-semibold text-red-600 block mb-1">Error Message:</span>
                            <span className="text-sm text-slate-700">
                                {error || "There was a problem processing your payment. Please try again or contact support."}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-5 justify-center pt-4">
                    <button
                        onClick={handleRetryPayment}
                        className="btn btn-success btn-lg px-8 py-4 rounded-xl shadow-2xl hover:shadow-3xl hover:scale-110 transition-all duration-300 border-l-4 border-l-green-600 border-r-2 border-r-green-200 border-t-2 border-t-green-300 border-b-2 border-b-green-300 animate-pulse"
                    >
                        <span className="text-base font-bold">Try Payment Again</span>
                    </button>
                    <button
                        onClick={() => navigate("/dashboard/my-applications")}
                        className="btn btn-primary btn-lg px-6 rounded-xl shadow-2xl hover:shadow-3xl hover:scale-110 transition-all duration-300 border-l-4 border-l-blue-600 border-r-2 border-r-blue-200"
                    >
                        <span className="text-base font-bold">My Applications</span>
                    </button>
                    <button
                        onClick={() => navigate("/allscholarships")}
                        className="btn btn-outline btn-lg px-2  rounded-xl shadow-2xl hover:shadow-3xl hover:scale-110 hover:bg-slate-100 transition-all duration-300 border-l-4 border-l-slate-600 border-r-2 border-r-slate-200"
                    >
                        <span className="text-base font-bold">Browse Scholarships</span>
                    </button>
                </div>

                <p className="text-sm text-slate-500 mt-6">
                    Need help? Contact us at support@scholarstream.com
                </p>
            </div>
        </div>
    );
};

export default Failed;
