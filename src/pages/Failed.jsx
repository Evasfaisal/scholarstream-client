import React from "react";
import { Link } from "react-router-dom";

const Failed = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
            <img
                src="https://cdn-icons-png.flaticon.com/512/463/463612.png"
                alt="Failed"
                className="w-32 h-32 mb-6 animate-bounce"
                loading="lazy"
            />
            <h1 className="text-3xl md:text-4xl font-bold text-red-600 mb-4">পেমেন্ট ব্যর্থ হয়েছে!</h1>
            <p className="text-gray-700 mb-6 max-w-md">দুঃখিত, আপনার পেমেন্ট সম্পন্ন হয়নি। আবার চেষ্টা করুন অথবা হোমপেজে ফিরে যান।
            </p>
            <Link
                to="/checkout"
                className="bg-red-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-red-700 transition shadow"
            >
                আবার চেষ্টা করুন
            </Link>
        </div>
    );
};

export default Failed;
