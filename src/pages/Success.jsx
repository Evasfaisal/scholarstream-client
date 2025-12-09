import React from "react";
import { Link } from "react-router-dom";

const Success = () => {
    const location = useLocation();
    const { scholarshipName, universityName, amount } = location.state || {};
    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
            <img
                src="https://cdn-icons-png.flaticon.com/512/845/845646.png"
                alt="Success"
                className="w-32 h-32 mb-6 animate-bounce"
                loading="lazy"
            />
            <h1 className="text-3xl md:text-4xl font-bold text-green-600 mb-4">Payment Successful!</h1>
            <p className="text-gray-700 mb-6 max-w-md">Your payment was completed successfully. Your application process has started.
            </p>
            <div className="mb-4 text-center">
                <div className="font-semibold">Scholarship:</div>
                <div>{scholarshipName || "-"}</div>
                <div className="font-semibold mt-2">University:</div>
                <div>{universityName || "-"}</div>
                <div className="font-semibold mt-2">Amount Paid:</div>
                <div>{amount ? `৳${amount}` : "-"}</div>
            </div>
            <button className="btn btn-success" onClick={() => navigate("/dashboard/my-applications")}>Go to My Applications</button>
        </div>
    );
};

export default Success;
