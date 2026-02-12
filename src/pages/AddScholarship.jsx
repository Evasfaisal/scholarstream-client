import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import apiUrl from '../utils/api';
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
        <div className="p-6 max-w-5xl mx-auto">
            <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl shadow-xl p-8 mb-6">
                <h2 className="text-4xl font-bold text-primary mb-2">🎓 Add New Scholarship</h2>
                <p className="text-slate-600">Fill in all the details to create a new scholarship opportunity</p>
            </div>

            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-8 space-y-6">

                {/* Basic Information */}
                <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-slate-800 border-b-2 border-primary/20 pb-2">📋 Basic Information</h3>

                    <div>
                        <label className="label">
                            <span className="label-text font-semibold text-slate-700">Scholarship Name *</span>
                        </label>
                        <input
                            name="scholarshipName"
                            value={form.scholarshipName}
                            onChange={handleChange}
                            placeholder="e.g., Global Excellence Scholarship 2026"
                            className="input input-bordered w-full focus:border-primary"
                            required
                        />
                    </div>

                    <div>
                        <label className="label">
                            <span className="label-text font-semibold text-slate-700">Scholarship Category *</span>
                        </label>
                        <select
                            name="scholarshipCategory"
                            value={form.scholarshipCategory}
                            onChange={handleChange}
                            className="select select-bordered w-full focus:border-primary"
                            required
                        >
                            <option value="">Choose scholarship type</option>
                            <option value="Full fund">💰 Full fund (100% coverage)</option>
                            <option value="Partial">📊 Partial (50-99% coverage)</option>
                            <option value="Self-fund">💳 Self-fund (No financial aid)</option>
                        </select>
                    </div>
                </div>

                {/* University Information */}
                <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-slate-800 border-b-2 border-primary/20 pb-2">🏫 University Information</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="label">
                                <span className="label-text font-semibold text-slate-700">University Name *</span>
                            </label>
                            <input
                                name="universityName"
                                value={form.universityName}
                                onChange={handleChange}
                                placeholder="e.g., Harvard University"
                                className="input input-bordered w-full focus:border-primary"
                                required
                            />
                        </div>

                        <div>
                            <label className="label">
                                <span className="label-text font-semibold text-slate-700">World Rank *</span>
                            </label>
                            <input
                                name="universityWorldRank"
                                value={form.universityWorldRank}
                                onChange={handleChange}
                                placeholder="e.g., 1"
                                type="number"
                                className="input input-bordered w-full focus:border-primary"
                                required
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="label">
                                <span className="label-text font-semibold text-slate-700">Country *</span>
                            </label>
                            <input
                                name="universityCountry"
                                value={form.universityCountry}
                                onChange={handleChange}
                                placeholder="e.g., USA"
                                className="input input-bordered w-full focus:border-primary"
                                required
                            />
                        </div>

                        <div>
                            <label className="label">
                                <span className="label-text font-semibold text-slate-700">City *</span>
                            </label>
                            <input
                                name="universityCity"
                                value={form.universityCity}
                                onChange={handleChange}
                                placeholder="e.g., Cambridge"
                                className="input input-bordered w-full focus:border-primary"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="label">
                            <span className="label-text font-semibold text-slate-700">University Image URL *</span>
                            <span className="label-text-alt text-slate-500">Use image hosting service like ImgBB</span>
                        </label>
                        <input
                            name="universityImage"
                            value={form.universityImage}
                            onChange={handleChange}
                            placeholder="https://example.com/university-image.jpg"
                            className="input input-bordered w-full focus:border-primary"
                            required
                        />
                        <p className="text-xs text-slate-500 mt-1">💡 Tip: Upload to <a href="https://imgbb.com" target="_blank" className="text-primary underline">ImgBB</a> and paste the direct link here</p>
                    </div>
                </div>

                {/* Academic Information */}
                <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-slate-800 border-b-2 border-primary/20 pb-2">📚 Academic Information</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="label">
                                <span className="label-text font-semibold text-slate-700">Subject Category *</span>
                            </label>
                            <select
                                name="subjectCategory"
                                value={form.subjectCategory}
                                onChange={handleChange}
                                className="select select-bordered w-full focus:border-primary"
                                required
                            >
                                <option value="">Choose subject area</option>
                                <option value="Engineering">⚙️ Engineering</option>
                                <option value="Business">💼 Business</option>
                                <option value="Computer Science">💻 Computer Science</option>
                                <option value="Medicine">⚕️ Medicine</option>
                                <option value="Arts">🎨 Arts</option>
                                <option value="Science">🔬 Science</option>
                            </select>
                        </div>

                        <div>
                            <label className="label">
                                <span className="label-text font-semibold text-slate-700">Degree Level *</span>
                            </label>
                            <select
                                name="degree"
                                value={form.degree}
                                onChange={handleChange}
                                className="select select-bordered w-full focus:border-primary"
                                required
                            >
                                <option value="">Choose degree level</option>
                                <option value="Diploma">📜 Diploma</option>
                                <option value="Bachelor">🎓 Bachelor's</option>
                                <option value="Masters">🎓🎓 Master's</option>
                                <option value="PhD">🎓🎓🎓 PhD / Doctorate</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Financial Information */}
                <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-slate-800 border-b-2 border-primary/20 pb-2">💰 Financial Information</h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="label">
                                <span className="label-text font-semibold text-slate-700">Application Fees * 💵</span>
                            </label>
                            <div className="relative">
                                <span className="absolute left-3 top-3 text-slate-500">$</span>
                                <input
                                    name="applicationFees"
                                    value={form.applicationFees}
                                    onChange={handleChange}
                                    placeholder="50"
                                    type="number"
                                    className="input input-bordered w-full pl-8 focus:border-primary"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="label">
                                <span className="label-text font-semibold text-slate-700">Service Charge * 💳</span>
                            </label>
                            <div className="relative">
                                <span className="absolute left-3 top-3 text-slate-500">$</span>
                                <input
                                    name="serviceCharge"
                                    value={form.serviceCharge}
                                    onChange={handleChange}
                                    placeholder="10"
                                    type="number"
                                    className="input input-bordered w-full pl-8 focus:border-primary"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="label">
                                <span className="label-text font-semibold text-slate-700">Tuition Fees (Optional)</span>
                            </label>
                            <div className="relative">
                                <span className="absolute left-3 top-3 text-slate-500">$</span>
                                <input
                                    name="tuitionFees"
                                    value={form.tuitionFees}
                                    onChange={handleChange}
                                    placeholder="15000"
                                    type="number"
                                    className="input input-bordered w-full pl-8 focus:border-primary"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Deadline & Posting Information */}
                <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-slate-800 border-b-2 border-primary/20 pb-2">📅 Dates & Information</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="label">
                                <span className="label-text font-semibold text-slate-700">Application Deadline * 🗓️</span>
                            </label>
                            <input
                                name="applicationDeadline"
                                value={form.applicationDeadline}
                                onChange={handleChange}
                                type="date"
                                className="input input-bordered w-full focus:border-primary"
                                required
                            />
                        </div>

                        <div>
                            <label className="label">
                                <span className="label-text font-semibold text-slate-700">Post Date (Auto-filled)</span>
                            </label>
                            <input
                                name="scholarshipPostDate"
                                value={form.scholarshipPostDate}
                                type="date"
                                className="input input-bordered w-full bg-slate-100"
                                readOnly
                            />
                        </div>
                    </div>

                    <div>
                        <label className="label">
                            <span className="label-text font-semibold text-slate-700">Posted By (Your Email)</span>
                        </label>
                        <input
                            name="postedUserEmail"
                            value={form.postedUserEmail}
                            className="input input-bordered w-full bg-slate-100"
                            readOnly
                        />
                    </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-end gap-4 pt-6 border-t">
                    <button
                        type="button"
                        onClick={() => window.history.back()}
                        className="btn btn-outline"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="btn btn-primary btn-lg px-8"
                    >
                        ✨ Add Scholarship
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddScholarship;
