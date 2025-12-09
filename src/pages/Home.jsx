import React from "react";
import { motion } from "framer-motion";


const topScholarships = [
    {
        id: 1,
        name: "Global Excellence Scholarship",
        university: "Harvard University",
        country: "USA",
        fees: "$50",
        image: "https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 2,
        name: "Future Leaders Award",
        university: "Oxford University",
        country: "UK",
        fees: "$30",
        image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 3,
        name: "STEM Innovators Scholarship",
        university: "MIT",
        country: "USA",
        fees: "$40",
        image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 4,
        name: "Women in Tech Grant",
        university: "Stanford University",
        country: "USA",
        fees: "$25",
        image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 5,
        name: "Asia Pacific Scholarship",
        university: "National University of Singapore",
        country: "Singapore",
        fees: "$35",
        image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 6,
        name: "Emerging Nations Fund",
        university: "University of Cape Town",
        country: "South Africa",
        fees: "$20",
        image: "https://images.unsplash.com/photo-1468413253725-0d5181091126?auto=format&fit=crop&w=600&q=80"
    }
];

const Home = () => {
    return (
        <div className="bg-base-100">

            <section className="hero min-h-[350px] bg-gradient-to-r from-blue-50 to-indigo-100 flex items-center justify-center border-b border-slate-200">
                <div className="hero-content flex-col lg:flex-row-reverse gap-12">
                    <motion.img src="https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=600&q=80" alt="ScholarStream Banner" className="max-w-sm rounded-2xl shadow-xl border-4 border-white" initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1 }} />
                    <motion.div initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
                        <h1 className="text-5xl font-extrabold text-slate-800 mb-4 tracking-tight leading-tight">Unlock Your Future<br /><span className="text-primary">with ScholarStream</span></h1>
                        <p className="py-2 text-xl text-slate-600 max-w-xl">Discover global scholarships, apply with ease, and take the next step in your academic journey. Designed for ambitious students and trusted by top universities.</p>
                        <a href="/allscholarships" className="btn btn-primary btn-lg mt-6 shadow-md">Browse Scholarships</a>
                    </motion.div>
                </div>
            </section>


            <section className="max-w-7xl mx-auto py-16 px-4">
                <h2 className="text-3xl font-extrabold text-slate-800 mb-10 text-center tracking-tight">Featured Scholarships</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
                    {topScholarships.map((scholarship, i) => (
                        <motion.div key={scholarship.id} className="bg-white rounded-2xl shadow-lg border border-slate-200 hover:shadow-2xl transition-all duration-300 flex flex-col" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.15 }}>
                            <figure><img src={scholarship.image} alt={scholarship.name} className="h-44 w-full object-cover rounded-t-2xl" /></figure>
                            <div className="p-6 flex-1 flex flex-col justify-between">
                                <h3 className="text-xl font-bold text-primary mb-1">{scholarship.name}</h3>
                                <p className="text-slate-700 mb-2">{scholarship.university} <span className="text-xs text-slate-400">({scholarship.country})</span></p>
                                <p className="text-sm text-slate-500 mb-4">Application Fees: <span className="font-semibold">{scholarship.fees}</span></p>
                                <a href={`/scholarship/${scholarship.id}`} className="btn btn-secondary btn-sm w-full mt-auto">View Details</a>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>


            <section className="bg-gradient-to-r from-green-50 to-blue-50 py-16 px-4 border-t border-b border-slate-200">
                <h2 className="text-3xl font-extrabold text-slate-800 mb-10 text-center tracking-tight">Success Stories</h2>
                <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                    <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="bg-white rounded-2xl shadow p-6 flex flex-col items-center">
                        <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Student 1" className="w-20 h-20 rounded-full mb-4 border-4 border-primary/20" />
                        <p className="text-slate-700 mb-2">“I easily got a scholarship abroad through ScholarStream. The whole process was very simple and fast!”</p>
                        <span className="font-bold text-primary">Rakib Hasan</span>
                        <span className="text-xs text-slate-400">Harvard University</span>
                    </motion.div>
                    <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="bg-white rounded-2xl shadow p-6 flex flex-col items-center">
                        <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Student 2" className="w-20 h-20 rounded-full mb-4 border-4 border-primary/20" />
                        <p className="text-slate-700 mb-2">“The information and guidelines here helped me make the right decision. Thank you ScholarStream!”</p>
                        <span className="font-bold text-primary">Sabiha Rahman</span>
                        <span className="text-xs text-slate-400">Oxford University</span>
                    </motion.div>
                    <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="bg-white rounded-2xl shadow p-6 flex flex-col items-center">
                        <img src="https://randomuser.me/api/portraits/men/65.jpg" alt="Student 3" className="w-20 h-20 rounded-full mb-4 border-4 border-primary/20" />
                        <p className="text-slate-700 mb-2">“It was hassle-free to find and apply for scholarships through ScholarStream.”</p>
                        <span className="font-bold text-primary">Tanvir Islam</span>
                        <span className="text-xs text-slate-400">MIT</span>
                    </motion.div>
                </div>
            </section>


            <section className="bg-white py-16 px-4 border-b border-slate-200">
                <h2 className="text-3xl font-extrabold text-slate-800 mb-10 text-center tracking-tight">Frequently Asked Questions</h2>
                <div className="max-w-3xl mx-auto space-y-6">
                    <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="bg-blue-50 rounded-xl p-6 shadow">
                        <h4 className="font-bold text-primary mb-2">What is ScholarStream?</h4>
                        <p className="text-slate-700">ScholarStream is an online platform where you can easily find and apply for scholarships from home and abroad.</p>
                    </motion.div>
                    <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }} className="bg-blue-50 rounded-xl p-6 shadow">
                        <h4 className="font-bold text-primary mb-2">How do I apply?</h4>
                        <p className="text-slate-700">You can view details and apply directly from each scholarship card by clicking the “View Details” button.</p>
                    </motion.div>
                    <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.9 }} className="bg-blue-50 rounded-xl p-6 shadow">
                        <h4 className="font-bold text-primary mb-2">Is there any fee?</h4>
                        <p className="text-slate-700">Each scholarship has a specific application fee, which is mentioned on the details page.</p>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default Home;


