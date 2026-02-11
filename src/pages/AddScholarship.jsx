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
        <div className="p-6 max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-8">
                <h2 className="text-3xl font-bold text-primary mb-6">Add New Scholarship</h2>
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input name="scholarshipName" value={form.scholarshipName} onChange={handleChange} placeholder="Scholarship Name" className="input input-bordered" required />
                    <input name="universityName" value={form.universityName} onChange={handleChange} placeholder="University Name" className="input input-bordered" required />
                    <input name="universityImage" value={form.universityImage} onChange={handleChange} placeholder="University Image URL" className="input input-bordered col-span-2" required />
                    <input name="universityCountry" value={form.universityCountry} onChange={handleChange} placeholder="Country" className="input input-bordered" required />
                    <input name="universityCity" value={form.universityCity} onChange={handleChange} placeholder="City" className="input input-bordered" required />
                    <input name="universityWorldRank" value={form.universityWorldRank} onChange={handleChange} placeholder="World Rank" type="number" className="input input-bordered" required />
                    <select name="subjectCategory" value={form.subjectCategory} onChange={handleChange} className="select select-bordered" required>
                        <option value="">Select Subject Category</option>
                        <option value="Engineering">Engineering</option>
                        <option value="Business">Business</option>
                        <option value="Computer Science">Computer Science</option>
                        <option value="Medicine">Medicine</option>
                        <option value="Arts">Arts</option>
                        <option value="Science">Science</option>
                    </select>
                    <select name="scholarshipCategory" value={form.scholarshipCategory} onChange={handleChange} className="select select-bordered" required>
                        <option value="">Select Scholarship Category</option>
                        <option value="Full fund">Full fund</option>
                        <option value="Partial">Partial</option>
                        <option value="Self-fund">Self-fund</option>
                    </select>
                    <select name="degree" value={form.degree} onChange={handleChange} className="select select-bordered" required>
                        <option value="">Select Degree</option>
                        <option value="Diploma">Diploma</option>
                        <option value="Bachelor">Bachelor</option>
                        <option value="Masters">Masters</option>
                        <option value="PhD">PhD</option>
                    </select>
                    <input name="tuitionFees" value={form.tuitionFees} onChange={handleChange} placeholder="Tuition Fees (optional)" type="number" className="input input-bordered" />
                    <input name="applicationFees" value={form.applicationFees} onChange={handleChange} placeholder="Application Fees" type="number" className="input input-bordered" required />
                    <input name="serviceCharge" value={form.serviceCharge} onChange={handleChange} placeholder="Service Charge" type="number" className="input input-bordered" required />
                    <input name="applicationDeadline" value={form.applicationDeadline} onChange={handleChange} type="date" className="input input-bordered" required />
                    <input name="scholarshipPostDate" value={form.scholarshipPostDate} onChange={handleChange} type="date" className="input input-bordered" required />
                    <input name="postedUserEmail" value={form.postedUserEmail} onChange={handleChange} placeholder="Posted By Email" className="input input-bordered" readOnly />
                    <button type="submit" className="btn btn-primary col-span-1 md:col-span-2 mt-4">Add Scholarship</button>
                </form>
            </div>
        </div>
    );
};

export default AddScholarship;
