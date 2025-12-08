
import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="fixed inset-0 z-40 w-full h-full">
            <img
                src="https://i.ibb.co.com/SpCP4nZ/2392490.jpg"
                alt="404 background"
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
                decoding="async"
                onError={(e) => { e.currentTarget.src = "https://i.ibb.co/0j3PQZb/banner1.jpg"; }}
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center bg-black/55 backdrop-blur-[2px]">
                <h1 className="text-4xl md:text-5xl font-bold text-green-600 mb-4 drop-shadow">Oops! Page Not Found</h1>
                <p className="text-gray-200 mb-8 max-w-xl">We couldn't find what you were looking for.</p>
                <Link
                    to="/"
                    className="bg-green-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-green-700 transition shadow"
                >
                    Back to Home
                </Link>
            </div>
        </div>
    );
};

export default NotFound;
