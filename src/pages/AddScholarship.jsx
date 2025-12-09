import React, { useState } from 'react';
import axios from 'axios';
import { apiUrl } from '../utils/api';

const initialForm = {
    scholarshipName: '',
    universityName: '',
    image: '',
    country: '',
    city: '',
    worldRank: '',
    subjectCategory: '',
    scholarshipCategory: '',
    degree: '',
    tuitionFees: '',
    applicationFees: '',
    serviceCharge: '',
    deadline: '',
    postDate: '',
    userEmail: '',
};

const AddScholarship = () => {
    const [form, setForm] = useState(initialForm);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(apiUrl('/api/scholarships'), form);
            alert('Scholarship added successfully!');
            setForm(initialForm);
        } catch (err) {
            alert('Failed to add scholarship!');
            console.error(err);
        }
    };

    return (
        <div className="p-6 max-w-2xl mx-auto bg-base-100 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-4">Add Scholarship</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input name="scholarshipName" value={form.scholarshipName} onChange={handleChange} placeholder="Scholarship Name" className="input input-bordered" required />
                <input name="universityName" value={form.universityName} onChange={handleChange} placeholder="University Name" className="input input-bordered" required />
                <input name="image" value={form.image} onChange={handleChange} placeholder="Image URL" className="input input-bordered" required />
                <input name="country" value={form.country} onChange={handleChange} placeholder="Country" className="input input-bordered" required />
                <input name="city" value={form.city} onChange={handleChange} placeholder="City" className="input input-bordered" required />
                <input name="worldRank" value={form.worldRank} onChange={handleChange} placeholder="World Rank" className="input input-bordered" required />
                <input name="subjectCategory" value={form.subjectCategory} onChange={handleChange} placeholder="Subject Category" className="input input-bordered" required />
                <input name="scholarshipCategory" value={form.scholarshipCategory} onChange={handleChange} placeholder="Scholarship Category" className="input input-bordered" required />
                <input name="degree" value={form.degree} onChange={handleChange} placeholder="Degree" className="input input-bordered" required />
                <input name="tuitionFees" value={form.tuitionFees} onChange={handleChange} placeholder="Tuition Fees (optional)" className="input input-bordered" />
                <input name="applicationFees" value={form.applicationFees} onChange={handleChange} placeholder="Application Fees" className="input input-bordered" required />
                <input name="serviceCharge" value={form.serviceCharge} onChange={handleChange} placeholder="Service Charge" className="input input-bordered" required />
                <input name="deadline" value={form.deadline} onChange={handleChange} placeholder="Deadline" className="input input-bordered" required />
                <input name="postDate" value={form.postDate} onChange={handleChange} placeholder="Post Date" className="input input-bordered" required />
                <input name="userEmail" value={form.userEmail} onChange={handleChange} placeholder="User Email" className="input input-bordered" required />
                <button type="submit" className="btn btn-primary col-span-1 md:col-span-2 mt-4">Add Scholarship</button>
            </form>
        </div>
    );
};

export default AddScholarship;
