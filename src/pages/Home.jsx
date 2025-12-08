

import React from "react";
import { motion } from "framer-motion";
import HeroSlider from "../components/HeroSlider";

const topScholarships = [
    {
        id: 1,
        name: "Global Excellence Scholarship",
        university: "Harvard University",
        country: "USA",
        fees: "$50",
        image: "https://i.ibb.co/JRQ25w0H/Pizza-Best-Deals-Made-with-Poster-My-Wall.jpg"
    },
    {
        id: 2,
        name: "Future Leaders Award",
        university: "Oxford University",
        country: "UK",
        fees: "$30",
        image: "https://i.ibb.co/j9SX6TDM/Burger-Discount-Voucher-Design-Template-Made-with-Poster-My-Wall-1.jpg"
    },
    {
        id: 3,
        name: "STEM Innovators Scholarship",
        university: "MIT",
        country: "USA",
        fees: "$40",
        image: "https://i.ibb.co/tpLm3fvC/Restaurant-Postcard-Template-Made-with-Poster-My-Wall.jpg"
    },
    {
        id: 4,
        name: "Women in Tech Grant",
        university: "Stanford University",
        country: "USA",
        fees: "$25",
        image: "https://i.ibb.co/8LQTT5XG/Restaurant-Facebook-Shared-Post-Design-Made-with-Poster-My-Wall.jpg"
    },
    {
        id: 5,
        name: "Asia Pacific Scholarship",
        university: "National University of Singapore",
        country: "Singapore",
        fees: "$35",
        image: "https://i.ibb.co/0j3PQZb/banner1.jpg"
    },
    {
        id: 6,
        name: "Emerging Nations Fund",
        university: "University of Cape Town",
        country: "South Africa",
        fees: "$20",
        image: "https://i.ibb.co/0j3PQZb/banner1.jpg"
    }
];

const Home = () => {
    return (
        <div className="bg-base-100">
            {/* Banner Section */}
            <section className="hero min-h-[350px] bg-gradient-to-r from-green-100 to-green-300 flex items-center justify-center">
                <div className="hero-content flex-col lg:flex-row-reverse gap-8">
                    <motion.img src="https://i.ibb.co/JRQ25w0H/Pizza-Best-Deals-Made-with-Poster-My-Wall.jpg" alt="ScholarStream Banner" className="max-w-sm rounded-lg shadow-2xl" initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1 }} />
                    <motion.div initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
                        <h1 className="text-4xl font-bold text-green-700 mb-4">Welcome to ScholarStream</h1>
                        <p className="py-2 text-lg text-gray-700">Find and apply for the best scholarships worldwide. Empower your future with financial aid and opportunities!</p>
                        <a href="/allscholarships" className="btn btn-success mt-4">Search Scholarship</a>
                    </motion.div>
                </div>
            </section>

            {/* Top Scholarships Section */}
            <section className="max-w-6xl mx-auto py-12 px-4">
                <h2 className="text-2xl font-bold text-green-700 mb-8 text-center">Top Scholarships</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                    {topScholarships.map((scholarship, i) => (
                        <motion.div key={scholarship.id} className="card bg-white shadow-lg border border-green-100" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.2 }}>
                            <figure><img src={scholarship.image} alt={scholarship.name} className="h-40 w-full object-cover" /></figure>
                            <div className="card-body">
                                <h3 className="card-title text-green-700">{scholarship.name}</h3>
                                <p className="text-gray-700">{scholarship.university} ({scholarship.country})</p>
                                <p className="text-sm text-gray-500">Application Fees: {scholarship.fees}</p>
                                <a href={`/scholarship/${scholarship.id}`} className="btn btn-outline btn-success mt-2">View Details</a>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Success Stories Section */}
            <section className="bg-green-50 py-12">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h3 className="text-xl font-bold text-green-700 mb-6">Success Stories</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-white rounded-lg shadow p-6">
                            <p className="text-gray-700 mb-2">“ScholarStream helped me find the perfect scholarship for my Masters. The process was easy and transparent!”</p>
                            <span className="font-semibold text-green-700">— Ayesha, Bangladesh</span>
                        </div>
                        <div className="bg-white rounded-lg shadow p-6">
                            <p className="text-gray-700 mb-2">“Thanks to ScholarStream, I got financial aid for my studies in the UK. Highly recommended!”</p>
                            <span className="font-semibold text-green-700">— Rahim, UK</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-12">
                <div className="max-w-3xl mx-auto px-4">
                    <h3 className="text-xl font-bold text-green-700 mb-6 text-center">Frequently Asked Questions</h3>
                    <div className="collapse collapse-arrow bg-white border border-green-100 mb-4">
                        <input type="checkbox" />
                        <div className="collapse-title text-lg font-medium">How do I apply for a scholarship?</div>
                        <div className="collapse-content text-gray-700">Browse scholarships, view details, and click the "Apply" button. Complete payment and submit your application.</div>
                    </div>
                    <div className="collapse collapse-arrow bg-white border border-green-100 mb-4">
                        <input type="checkbox" />
                        <div className="collapse-title text-lg font-medium">Is there an application fee?</div>
                        <div className="collapse-content text-gray-700">Yes, each scholarship may have its own application fee. Details are shown on the scholarship card and details page.</div>
                    </div>
                    <div className="collapse collapse-arrow bg-white border border-green-100 mb-4">
                        <input type="checkbox" />
                        <div className="collapse-title text-lg font-medium">Can I track my application status?</div>
                        <div className="collapse-content text-gray-700">Yes, after applying, you can track your application status from your dashboard.</div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;


