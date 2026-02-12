import React, { useContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import DashboardSidebar from "../components/DashboardSidebar";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebase.config";

const DashboardLayout = () => {
    const { user } = useContext(AuthContext);
    const [role, setRole] = useState(localStorage.getItem('userRole') || "Student");
    const [sidebarOpen, setSidebarOpen] = useState(false);

    useEffect(() => {
        const fetchUserRole = async () => {
            if (user?.uid && !localStorage.getItem('userRole')) {
                try {
                    const userDoc = await getDoc(doc(db, "users", user.uid));
                    if (userDoc.exists()) {
                        const userRole = userDoc.data().role || "Student";
                        setRole(userRole);
                        localStorage.setItem('userRole', userRole);
                    }
                } catch (error) {
                    console.error("Error fetching user role:", error);
                }
            }
        };

        fetchUserRole();
    }, [user]);

    return (
        <div className="flex min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
            {/* Mobile Menu Button */}
            <button
                className="md:hidden fixed top-4 left-4 z-50 bg-primary text-white p-3 rounded-lg shadow-lg hover:bg-primary-focus"
                onClick={() => setSidebarOpen(!sidebarOpen)}
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </button>

            {/* Sidebar - Desktop */}
            <aside className="w-64 min-h-screen bg-white border-r border-slate-200 p-6 hidden md:block shadow-xl">
                <DashboardSidebar role={role} user={user} />
            </aside>

            {/* Sidebar - Mobile */}
            {sidebarOpen && (
                <>
                    <div
                        className="md:hidden fixed inset-0 bg-black/50 z-40"
                        onClick={() => setSidebarOpen(false)}
                    />
                    <aside className="md:hidden fixed left-0 top-0 w-64 h-full bg-white z-50 p-6 shadow-2xl overflow-y-auto">
                        <button
                            className="absolute top-4 right-4 text-2xl text-slate-600"
                            onClick={() => setSidebarOpen(false)}
                        >
                            ✕
                        </button>
                        <DashboardSidebar role={role} user={user} />
                    </aside>
                </>
            )}

            {/* Main Content - Full Width */}
            <main className="flex-1 w-full p-4 sm:p-6 lg:p-8 overflow-x-hidden">
                <Outlet />
            </main>
        </div>
    );
};

export default DashboardLayout;
