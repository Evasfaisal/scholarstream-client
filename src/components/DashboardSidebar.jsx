import React from "react";
import { Link } from "react-router-dom";

const DashboardSidebar = ({ role }) => {
    return (
        <nav className="flex flex-col gap-4">
            <Link to="/dashboard/profile" className="btn btn-ghost justify-start">My Profile</Link>
            {role === "Admin" && (
                <>
                    <Link to="/dashboard/add-scholarship" className="btn btn-ghost justify-start">Add Scholarship</Link>
                    <Link to="/dashboard/manage-scholarships" className="btn btn-ghost justify-start">Manage Scholarships</Link>
                    <Link to="/dashboard/manage-users" className="btn btn-ghost justify-start">Manage Users</Link>
                    <Link to="/dashboard/analytics" className="btn btn-ghost justify-start">Analytics</Link>
                </>
            )}
            {role === "Moderator" && (
                <>
                    <Link to="/dashboard/applications" className="btn btn-ghost justify-start">Manage Applications</Link>
                    <Link to="/dashboard/all-reviews" className="btn btn-ghost justify-start">All Reviews</Link>
                </>
            )}
            {role === "Student" && (
                <>
                    <Link to="/dashboard/my-applications" className="btn btn-ghost justify-start">My Applications</Link>
                    <Link to="/dashboard/my-reviews" className="btn btn-ghost justify-start">My Reviews</Link>
                </>
            )}
        </nav>
    );
};

export default DashboardSidebar;
