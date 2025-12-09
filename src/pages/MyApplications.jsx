import React from "react";


const applications = [
    {
        id: 1,
        scholarshipName: "Global Excellence Scholarship",
        universityName: "Harvard University",
        status: "Pending",
        paymentStatus: "Paid",
        feedback: "",
        applicationDate: "2025-12-01"
    },
    {
        id: 2,
        scholarshipName: "Future Leaders Award",
        universityName: "Oxford University",
        status: "Processing",
        paymentStatus: "Paid",
        feedback: "Please upload your transcript.",
        applicationDate: "2025-12-02"
    }
];

const MyApplications = () => {
    return (
        <div className="max-w-4xl mx-auto p-6 min-h-screen">
            <h2 className="text-2xl font-bold text-green-700 mb-6">My Applications</h2>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>Scholarship</th>
                            <th>University</th>
                            <th>Status</th>
                            <th>Payment</th>
                            <th>Feedback</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {applications.map(app => (
                            <tr key={app.id}>
                                <td>{app.scholarshipName}</td>
                                <td>{app.universityName}</td>
                                <td>
                                    <span className={`badge ${app.status === "Completed" ? "badge-success" : app.status === "Processing" ? "badge-warning" : "badge-info"}`}>{app.status}</span>
                                </td>
                                <td>
                                    <span className={`badge ${app.paymentStatus === "Paid" ? "badge-success" : "badge-error"}`}>{app.paymentStatus}</span>
                                </td>
                                <td>{app.feedback || <span className="text-gray-400">-</span>}</td>
                                <td>{app.applicationDate}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyApplications;
