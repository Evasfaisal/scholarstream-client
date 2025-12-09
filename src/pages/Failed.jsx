import React from "react";
import { Link } from "react-router-dom";

const Failed = () => {
    const location = useLocation();
    const { scholarshipName, error } = location.state || {};
    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
            <img
                src="https://cdn-icons-png.flaticon.com/512/463/463612.png"
                alt="Failed"
                className="w-32 h-32 mb-6 animate-bounce"
                loading="lazy"
            />
            <h1 className="text-3xl md:text-4xl font-bold text-red-600 mb-4">Payment Failed!</h1>
            <p className="text-gray-700 mb-6 max-w-md">Sorry, your payment was not completed. Please try again or return to the homepage.
            </p>
            <div className="mb-4 text-center">
                <div className="font-semibold">Scholarship:</div>
                <div>{scholarshipName || "-"}</div>
                <div className="font-semibold mt-2">Error:</div>
                <div className="text-red-500">{error || "There was a problem processing your payment. Please try again or contact support."}</div>
            </div>
            <button className="btn btn-error" onClick={() => navigate("/dashboard")}>Return to Dashboard</button>
        </div>
    );
};

export default Failed;
