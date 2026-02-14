import React, { useState, useEffect } from "react";
import studentCartoon from "../assets/student-cartoon.jpg";
import { motion } from "framer-motion";
import { FaSearch, FaUserGraduate, FaRegQuestionCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import apiUrl from "../utils/api";

const Home = () => {
    const [topScholarships, setTopScholarships] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTopScholarships = async () => {
            try {
                setLoading(true);
                const response = await apiUrl.get('/api/scholarships?limit=6&sort=applicationFees');
                setTopScholarships(response.data.scholarships || response.data || []);
            } catch (error) {
                console.error("Error fetching scholarships:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchTopScholarships();
    }, []);
 
    return (
        <>
            <section className="relative hero min-h-[500px] md:min-h-[650px] w-full flex items-center justify-center border-b border-slate-200 overflow-hidden">
                <img
                    src={studentCartoon}
                    alt="Student Cartoon Banner"
                    className="absolute inset-0 w-full h-full min-h-[500px] md:min-h-[650px] object-cover object-center opacity-90 z-0"
                    draggable="false"
                />
                <motion.div
                    className="relative w-full flex flex-col items-center justify-center py-16 z-10"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1 }}
                >
                    <div className="w-full max-w-2xl mx-auto mt-80 flex flex-col items-center text-center">
                        <h1 className="text-4xl md:text-5xl font-extrabold mb-3 drop-shadow-lg" style={{ color: '#47687e' }}>Find Your Dream Scholarship</h1>
                        <p className="text-lg md:text-xl text-slate-700 font-medium bg-white/80 rounded-xl px-4 py-2 shadow mb-2">Browse, search, and apply for global scholarships with ease. Start your academic journey today!</p>
                    </div>
                    <motion.form
                        action="/allscholarships"
                        method="get"
                        className="w-full max-w-xl mx-auto flex items-center gap-0 mt-12 shadow-lg rounded-2xl bg-white"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.7 }}
                        onSubmit={e => { e.preventDefault(); window.location.href = `/allscholarships?search=${encodeURIComponent(e.target.search.value)}`; }}
                    >
                        <span className="pl-5 pr-2 text-2xl text-purple-400"><FaSearch /></span>
                        <input
                            type="text"
                            name="search"
                            placeholder="Search scholarships by name, university, or country..."
                            className="flex-1 h-14 px-4 text-lg rounded-l-2xl border-0 focus:ring-2 focus:ring-purple-200 outline-none bg-transparent"
                            autoComplete="off"
                        />
                        <button
                            type="submit"
                            className="h-14 px-8 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold text-lg rounded-r-2xl hover:from-purple-600 hover:to-pink-600 transition-all"
                        >
                            Search
                        </button>
                    </motion.form>
                </motion.div>
            </section>
            <section className="max-w-7xl mx-auto py-16 px-4">
                <h2 className="text-3xl font-extrabold text-slate-800 mb-10 text-center tracking-tight">Featured Scholarships</h2>
                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div key={i} className="bg-white rounded-2xl shadow-lg border border-slate-200 animate-pulse">
                                <div className="h-44 bg-slate-200 rounded-t-2xl"></div>
                                <div className="p-6 space-y-3">
                                    <div className="h-6 bg-slate-200 rounded w-3/4"></div>
                                    <div className="h-4 bg-slate-200 rounded w-1/2"></div>
                                    <div className="h-4 bg-slate-200 rounded w-1/3"></div>
                                    <div className="h-10 bg-slate-200 rounded"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : topScholarships.length === 0 ? (
                    <div className="text-center text-slate-500 py-12">
                        <p className="text-xl">No scholarships found. Please add scholarships from the dashboard.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
                        {topScholarships.map((scholarship, i) => (
                            <motion.div key={scholarship._id} className="bg-white rounded-2xl shadow-lg border border-slate-200 hover:shadow-2xl transition-all duration-300 flex flex-col" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.15 }}>
                                <figure>
                                    <img
                                        src={scholarship.universityImage || '/logo.jpg'}
                                        alt={scholarship.scholarshipName}
                                        className="h-44 w-full object-cover rounded-t-2xl"
                                        onError={e => { e.target.onerror = null; e.target.src = '/logo.jpg'; }}
                                    />
                                </figure>
                                <div className="p-6 flex-1 flex flex-col justify-between">
                                    <h3 className="text-xl font-bold text-primary mb-1">{scholarship.scholarshipName}</h3>
                                    <p className="text-slate-700 mb-2">{scholarship.universityName} <span className="text-xs text-slate-400">({scholarship.universityCountry})</span></p>
                                    <p className="text-sm text-slate-500 mb-4">Application Fees: <span className="font-semibold">${scholarship.applicationFees}</span></p>
                                    <Link to={`/scholarship/${scholarship._id}`} className="btn btn-secondary btn-sm w-full mt-auto">View Details</Link>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </section>


            <section className="bg-linear-to-r from-green-50 to-blue-50 py-16 px-4 border-t border-b border-slate-200">
                <h2 className="text-3xl font-extrabold text-slate-800 mb-10 text-center tracking-tight">Success Stories</h2>
                <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                    <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="bg-white rounded-2xl shadow p-6 flex flex-col items-center">
                        <FaUserGraduate className="w-20 h-20 mb-4 text-primary/80" />
                        <p className="text-slate-700 mb-2">“I easily got a scholarship abroad through ScholarStream. The whole process was very simple and fast!”</p>
                        <span className="font-bold text-primary">Rakib Hasan</span>
                        <span className="text-xs text-slate-400">Harvard University</span>
                    </motion.div>
                    <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="bg-white rounded-2xl shadow p-6 flex flex-col items-center">
                        <FaUserGraduate className="w-20 h-20 mb-4 text-primary/80" />
                        <p className="text-slate-700 mb-2">“The information and guidelines here helped me make the right decision. Thank you ScholarStream!”</p>
                        <span className="font-bold text-primary">Sabiha Rahman</span>
                        <span className="text-xs text-slate-400">Oxford University</span>
                    </motion.div>
                    <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="bg-white rounded-2xl shadow p-6 flex flex-col items-center">
                        <FaUserGraduate className="w-20 h-20 mb-4 text-primary/80" />
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
                        <h4 className="font-bold text-primary mb-2 flex items-center gap-2"><FaRegQuestionCircle /> What is ScholarStream?</h4>
                        <p className="text-slate-700">ScholarStream is an online platform where you can easily find and apply for scholarships from home and abroad.</p>
                    </motion.div>
                    <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }} className="bg-blue-50 rounded-xl p-6 shadow">
                        <h4 className="font-bold text-primary mb-2 flex items-center gap-2"><FaRegQuestionCircle /> How do I apply?</h4>
                        <p className="text-slate-700">You can view details and apply directly from each scholarship card by clicking the “View Details” button.</p>
                    </motion.div>
                    <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.9 }} className="bg-blue-50 rounded-xl p-6 shadow">
                        <h4 className="font-bold text-primary mb-2 flex items-center gap-2"><FaRegQuestionCircle /> Is there any fee?</h4>
                        <p className="text-slate-700">Each scholarship has a specific application fee, which is mentioned on the details page.</p>
                    </motion.div>
                </div>
            </section>
        </>
    );
};

export default Home;


