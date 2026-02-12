import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaUser, FaPlusCircle, FaBookmark, FaUsers, FaChartBar, FaClipboardList, FaStar, FaFileAlt } from "react-icons/fa";

const DashboardSidebar = ({ role, user }) => {
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    const linkClass = (path) =>
        `flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all duration-200 ${isActive(path)
            ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg scale-105'
            : 'text-slate-700 hover:bg-blue-50 hover:text-blue-600 hover:shadow-md hover:scale-102'
        }`;

    return (
        <nav className="flex flex-col gap-2">
            {/* User Profile Section */}
            {user && (
                <Link to="/dashboard/profile" className="mb-6 pb-6 border-b border-slate-200">
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 hover:shadow-md transition-all">
                        <img
                            src={user?.photoURL || 'https://via.placeholder.com/50/4F46E5/FFFFFF?text=User'}
                            alt="Profile"
                            className="w-12 h-12 rounded-full border-2 border-primary/30"
                        />
                        <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-bold text-slate-800 truncate">{user?.displayName || 'User'}</h4>
                            <p className="text-xs text-slate-600 truncate">{user?.email}</p>
                            <span className="badge badge-primary badge-xs mt-1">{role}</span>
                        </div>
                    </div>
                </Link>
            )}

            <div className="mb-2">
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
