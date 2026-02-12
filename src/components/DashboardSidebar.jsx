import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaUser, FaPlusCircle, FaBookmark, FaUsers, FaChartBar, FaClipboardList, FaStar, FaFileAlt } from "react-icons/fa";

const DashboardSidebar = ({ role }) => {
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    const linkClass = (path) =>
        `flex items-center gap-3 px-5 py-3 rounded-xl font-semibold transition-all duration-200 ${isActive(path)
            ? 'bg-blue-600 text-white shadow-lg'
            : 'text-slate-700 hover:bg-blue-50 hover:text-blue-600 hover:shadow-md'
        }`;

    return (
        <nav className="flex flex-col gap-2">
            <div className="mb-4">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider px-3 mb-2">Dashboard</h3>
            </div>

            <Link to="/dashboard/profile" className={linkClass("/dashboard/profile")}>
                <FaUser className="text-lg" />
                <span>My Profile</span>
            </Link>

            {role === "Admin" && (
                <>
                    <div className="mt-4 mb-2">
                        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider px-3">Admin Tools</h3>
                    </div>
                    <Link to="/dashboard/add-scholarship" className={linkClass("/dashboard/add-scholarship")}>
                        <FaPlusCircle className="text-lg" />
                        <span>Add Scholarship</span>
                    </Link>
                    <Link to="/dashboard/manage-scholarships" className={linkClass("/dashboard/manage-scholarships")}>
                        <FaBookmark className="text-lg" />
                        <span>Manage Scholarships</span>
                    </Link>
                    <Link to="/dashboard/manage-users" className={linkClass("/dashboard/manage-users")}>
                        <FaUsers className="text-lg" />
                        <span>Manage Users</span>
                    </Link>
                    <Link to="/dashboard/analytics" className={linkClass("/dashboard/analytics")}>
                        <FaChartBar className="text-lg" />
                        <span>Analytics</span>
                    </Link>
                </>
            )}

            {role === "Moderator" && (
                <>
                    <div className="mt-4 mb-2">
                        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider px-3">Moderator Tools</h3>
                    </div>
                    <Link to="/dashboard/applications" className={linkClass("/dashboard/applications")}>
                        <FaClipboardList className="text-lg" />
                        <span>Manage Applications</span>
                    </Link>
                    <Link to="/dashboard/all-reviews" className={linkClass("/dashboard/all-reviews")}>
                        <FaStar className="text-lg" />
                        <span>All Reviews</span>
                    </Link>
                </>
            )}

            {role === "Student" && (
                <>
                    <div className="mt-4 mb-2">
                        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider px-3">My Activity</h3>
                    </div>
                    <Link to="/dashboard/my-applications" className={linkClass("/dashboard/my-applications")}>
                        <FaFileAlt className="text-lg" />
                        <span>My Applications</span>
                    </Link>
                    <Link to="/dashboard/my-reviews" className={linkClass("/dashboard/my-reviews")}>
                        <FaStar className="text-lg" />
                        <span>My Reviews</span>
                    </Link>
                </>
            )}
        </nav>
    );
};

export default DashboardSidebar;
