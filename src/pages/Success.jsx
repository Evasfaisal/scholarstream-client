import React from "react";
import { Link } from "react-router-dom";

const Success = () => {
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
            <Link
                to="/dashboard/my-applications"
                className="bg-green-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-green-700 transition shadow"
            >
                Go to Dashboard
            </Link>
        </div>
    );
};

export default Success;
