import React, { useState } from 'react';



const dummyApplications = [
    {
        id: 1,
        student: 'Rahim Uddin',
        scholarship: 'Merit Excellence',
        status: 'Pending',
        feedback: '',
        submittedAt: '2025-12-01',
    },
    {
        id: 2,
        student: 'Karim Mia',
        scholarship: 'Women in STEM',
        status: 'Processing',
        feedback: 'Please upload your transcript.',
        submittedAt: '2025-12-02',
    },
    {
        id: 3,
        student: 'Sumaiya Akter',
        scholarship: 'Need Based',
        status: 'Completed',
        feedback: 'Congratulations! You have been selected.',
        submittedAt: '2025-12-03',
    },
];

const statusOptions = ['Pending', 'Processing', 'Completed'];

const ModeratorApplications = () => {
    const [applications, setApplications] = useState(dummyApplications);
    const [editingId, setEditingId] = useState(null);
    const [feedback, setFeedback] = useState('');
    const [status, setStatus] = useState('Pending');

    const handleEdit = (app) => {
        setEditingId(app.id);
        setFeedback(app.feedback || '');
        setStatus(app.status);
    };

    const handleSave = (id) => {
        setApplications((prev) =>
            prev.map((app) =>
                app.id === id ? { ...app, feedback, status } : app
            )
        );
        setEditingId(null);
    };

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Review Applications</h2>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>Student</th>
                            <th>Scholarship</th>
                            <th>Status</th>
                            <th>Feedback</th>
                            <th>Submitted</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {applications.map((app) => (
                            <tr key={app.id}>
                                <td>{app.student}</td>
                                <td>{app.scholarship}</td>
                                <td>
                                    {editingId === app.id ? (
                                        <select
                                            className="select select-bordered select-sm"
                                            value={status}
                                            onChange={(e) => setStatus(e.target.value)}
                                        >
                                            {statusOptions.map((opt) => (
                                                <option key={opt} value={opt}>{opt}</option>
                                            ))}
                                        </select>
                                    ) : (
                                        <span className={`badge badge-${app.status === 'Completed' ? 'success' : app.status === 'Processing' ? 'warning' : 'info'
                                            }`}>{app.status}</span>
                                    )}
                                </td>
                                <td>
                                    {editingId === app.id ? (
                                        <textarea
                                            className="textarea textarea-bordered textarea-xs w-full"
                                            value={feedback}
                                            onChange={(e) => setFeedback(e.target.value)}
                                        />
                                    ) : (
                                        <span>{app.feedback || '-'}</span>
                                    )}
                                </td>
                                <td>{app.submittedAt}</td>
                                <td>
                                    {editingId === app.id ? (
                                        <>
                                            <button
                                                className="btn btn-xs btn-success mr-2"
                                                onClick={() => handleSave(app.id)}
                                            >
                                                Save
                                            </button>
                                            <button
                                                className="btn btn-xs btn-ghost"
                                                onClick={() => setEditingId(null)}
                                            >
                                                Cancel
                                            </button>
                                        </>
                                    ) : (
                                        <button
                                            className="btn btn-xs btn-primary"
                                            onClick={() => handleEdit(app)}
                                        >
                                            Edit
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ModeratorApplications;
