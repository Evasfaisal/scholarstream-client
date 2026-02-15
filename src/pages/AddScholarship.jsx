import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import apiUrl from '../utils/api';
import { FaGraduationCap, FaClipboardList, FaUniversity, FaBook, FaMoneyBillWave, FaCalendarAlt, FaLightbulb, FaRegStar } from 'react-icons/fa';
import { toast } from 'react-hot-toast';

const AddScholarship = () => {
    const { user } = useContext(AuthContext);
    const [form, setForm] = useState({
        scholarshipName: '',
        universityName: '',
        universityImage: '',
        universityCountry: '',
        universityCity: '',
        universityWorldRank: '',
        subjectCategory: '',
        scholarshipCategory: '',
        degree: '',
        tuitionFees: '',
        applicationFees: '',
        serviceCharge: '',
        applicationDeadline: '',
        scholarshipPostDate: new Date().toISOString().split('T')[0],
        postedUserEmail: user?.email || '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const scholarshipData = {
                ...form,
                postedUserEmail: user?.email || form.postedUserEmail
            };
            await apiUrl.post('/api/scholarships', scholarshipData);
            toast.success('Scholarship added successfully!');
            setForm({
                scholarshipName: '',
                universityName: '',
                universityImage: '',
                universityCountry: '',
                universityCity: '',
                universityWorldRank: '',
                subjectCategory: '',
                scholarshipCategory: '',
                degree: '',
                tuitionFees: '',
                applicationFees: '',
                serviceCharge: '',
                applicationDeadline: '',
                scholarshipPostDate: new Date().toISOString().split('T')[0],
                postedUserEmail: user?.email || '',
            });
        } catch (err) {
            toast.error('Failed to add scholarship!');
            console.error(err);
        }
    };

    return (
        <div className="w-full max-w-6xl mx-auto">
            <div className="bg-gradient-to-r from-primary/10 to-blue-50 rounded-xl p-4 sm:p-6 mb-6 shadow-sm">
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-2 flex items-center gap-2">
                    <span><FaGraduationCap /></span>
                    <span>Add New Scholarship</span>
                </h2>
                <p className="text-slate-600 text-sm sm:text-base">Create a scholarship opportunity for students worldwide</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">


                <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 space-y-4">
                    <h3 className="text-lg sm:text-xl font-bold text-slate-800 flex items-center gap-2 pb-3 border-b border-slate-200">
                      
                        <span><FaClipboardList /></span>
                    </h3>

                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                            Scholarship Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            name="scholarshipName"
                            value={form.scholarshipName}
                            onChange={handleChange}
                            placeholder="e.g., Global Excellence Scholarship 2026"
                            className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-primary"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                            Scholarship Category <span className="text-red-500">*</span>
                        </label>
                        <select
                            name="scholarshipCategory"
                            value={form.scholarshipCategory}
                            onChange={handleChange}
                            className="select select-bordered w-full border-2 border-slate-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                            required
                        >
                            <option value="">Choose scholarship type</option>
                            <option value="Full fund">Full fund (100% coverage)</option>
                            <option value="Partial">Partial (50-99% coverage)</option>
                            <option value="Self-fund">Self-fund (No financial aid)</option>
                        </select>
                    </div>
                </div>


                <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 space-y-4">
                    <h3 className="text-lg sm:text-xl font-bold text-slate-800 flex items-center gap-2 pb-3 border-b border-slate-200">
                        <span><FaUniversity /></span>
                        <span>University Information</span>
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                                University Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                name="universityName"
                                value={form.universityName}
                                onChange={handleChange}
                                placeholder="e.g., Harvard University"
                                className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-primary"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                                World Rank <span className="text-red-500">*</span>
                            </label>
                            <input
                                name="universityWorldRank"
                                value={form.universityWorldRank}
                                onChange={handleChange}
                                placeholder="e.g., 1"
                                type="number"
                                className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-primary"
                                required
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                                Country <span className="text-red-500">*</span>
                            </label>
                            <input
                                name="universityCountry"
                                value={form.universityCountry}
                                onChange={handleChange}
                                placeholder="e.g., USA"
                                className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-primary"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                                City <span className="text-red-500">*</span>
                            </label>
                            <input
                                name="universityCity"
                                value={form.universityCity}
                                onChange={handleChange}
                                placeholder="e.g., Cambridge"
                                className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-primary"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                            University Image URL <span className="text-red-500">*</span>
                        </label>
                        <input
                            name="universityImage"
                            value={form.universityImage}
                            onChange={handleChange}
                            placeholder="University Image URL (e.g. /logo.jpg)"
                            className="input input-bordered col-span-2"
                            required
                        />
                        <p className="text-xs text-slate-500 mt-2"> Upload to <a href="https://imgbb.com" target="_blank" rel="noreferrer" className="text-primary underline hover:text-primary-focus">ImgBB</a> and paste the link here</p>
                    </div>
                </div>
                <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 space-y-4">
                    <h3 className="text-lg sm:text-xl font-bold text-slate-800 flex items-center gap-2 pb-3 border-b border-slate-200">
                        <span><FaBook /></span>
                        <span>Academic Information</span>
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                                Subject Category <span className="text-red-500">*</span>
                            </label>
                            <select
                                name="subjectCategory"
                                value={form.subjectCategory}
                                onChange={handleChange}
                                className="select select-bordered w-full border-2 border-slate-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                                required
                            >
                                <option value="Engineering">Engineering</option>
                                <option value="Business">Business</option>
                                <option value="Computer Science">Computer Science</option>
                                <option value="Medicine">Medicine</option>
                                <option value="Arts">Arts</option>
                                <option value="Science">Science</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                                Degree Level <span className="text-red-500">*</span>
                            </label>
                            <select
                                name="degree"
                                value={form.degree}
                                onChange={handleChange}
                                className="select select-bordered w-full border-2 border-slate-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                                required
                            >
                                <option value="Diploma">Diploma</option>
                                <option value="Bachelor">Bachelor's</option>
                                <option value="Masters">Master's</option>
                                <option value="PhD">PhD / Doctorate</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 space-y-4">
                    <h3 className="text-lg sm:text-xl font-bold text-slate-800 flex items-center gap-2 pb-3 border-b border-slate-200">
                        <span><FaMoneyBillWave /></span>
                        <span>Financial Information</span>
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                                Application Fees <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <span className="absolute left-3 top-3 text-slate-500 font-semibold">$</span>
                                <input
                                    name="applicationFees"
                                    value={form.applicationFees}
                                    onChange={handleChange}
                                    placeholder="50"
                                    type="number"
                                    className="input input-bordered w-full pl-8 focus:outline-none focus:ring-2 focus:ring-primary"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                                Service Charge <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <span className="absolute left-3 top-3 text-slate-500 font-semibold">$</span>
                                <input
                                    name="serviceCharge"
                                    value={form.serviceCharge}
                                    onChange={handleChange}
                                    placeholder="10"
                                    type="number"
                                    className="input input-bordered w-full pl-8 focus:outline-none focus:ring-2 focus:ring-primary"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                                Tuition Fees (Optional)
                            </label>
                            <div className="relative">
                                <span className="absolute left-3 top-3 text-slate-500 font-semibold">$</span>
                                <input
                                    name="tuitionFees"
                                    value={form.tuitionFees}
                                    onChange={handleChange}
                                    placeholder="15000"
                                    type="number"
                                    className="input input-bordered w-full pl-8 focus:outline-none focus:ring-2 focus:ring-primary"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 space-y-4">
                    <h3 className="text-lg sm:text-xl font-bold text-slate-800 flex items-center gap-2 pb-3 border-b border-slate-200">
                        <span><FaCalendarAlt /></span>
                        <span>Dates & Information</span>
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                                Application Deadline <span className="text-red-500">*</span>
                            </label>
                            <input
                                name="applicationDeadline"
                                value={form.applicationDeadline}
                                onChange={handleChange}
                                type="date"
                                className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-primary"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                                Post Date (Auto-filled)
                            </label>
                            <input
                                name="scholarshipPostDate"
                                value={form.scholarshipPostDate}
                                type="date"
                                className="input input-bordered w-full bg-slate-50"
                                readOnly
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                            Posted By (Your Email)
                        </label>
                        <input
                            name="postedUserEmail"
                            value={form.postedUserEmail}
                            className="input input-bordered w-full bg-slate-50"
                            readOnly
                        />
                    </div>
                </div>


                <div className="bg-white rounded-xl shadow-md p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row justify-end gap-3">
                        <button
                            type="button"
                            onClick={() => window.history.back()}
                            className="btn btn-outline btn-lg order-2 sm:order-1"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="btn btn-primary btn-lg px-8 order-1 sm:order-2 shadow-lg hover:shadow-xl transition-all"
                        >
                            <span><FaRegStar /></span>
                            <span>Add Scholarship</span>
                        </button>
                    </div>
                </div>
            </form >
        </div >
    );
};

export default AddScholarship;
