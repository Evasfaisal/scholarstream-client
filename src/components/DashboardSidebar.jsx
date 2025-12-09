
import React from "react";
import { Link } from "react-router-dom";

const DashboardSidebar = ({ role }) => {
    return (
        <nav className="flex flex-col gap-3">
            <Link to="/dashboard/profile" className="px-5 py-3 rounded-xl font-semibold text-slate-700 hover:bg-primary/10 hover:text-primary transition">My Profile</Link>
            {role === "Admin" && (
                <>
                    <Link to="/dashboard/add-scholarship" className="px-5 py-3 rounded-xl font-semibold text-slate-700 hover:bg-primary/10 hover:text-primary transition">Add Scholarship</Link>
                    <Link to="/dashboard/manage-scholarships" className="px-5 py-3 rounded-xl font-semibold text-slate-700 hover:bg-primary/10 hover:text-primary transition">Manage Scholarships</Link>
                    <Link to="/dashboard/manage-users" className="px-5 py-3 rounded-xl font-semibold text-slate-700 hover:bg-primary/10 hover:text-primary transition">Manage Users</Link>
                    <Link to="/dashboard/analytics" className="px-5 py-3 rounded-xl font-semibold text-slate-700 hover:bg-primary/10 hover:text-primary transition">Analytics</Link>
                </>
            )}
            {role === "Moderator" && (
                <>
                    <Link to="/dashboard/applications" className="px-5 py-3 rounded-xl font-semibold text-slate-700 hover:bg-primary/10 hover:text-primary transition">Manage Applications</Link>
                    <Link to="/dashboard/all-reviews" className="px-5 py-3 rounded-xl font-semibold text-slate-700 hover:bg-primary/10 hover:text-primary transition">All Reviews</Link>
                </>
            )}
            {role === "Student" && (
                <>
                    <Link to="/dashboard/my-applications" className="px-5 py-3 rounded-xl font-semibold text-slate-700 hover:bg-primary/10 hover:text-primary transition">My Applications</Link>
                </>
            )}
        </nav>
    );
};

export default DashboardSidebar;
