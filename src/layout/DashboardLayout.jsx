import React from "react";
import { Outlet } from "react-router-dom";

const DashboardLayout = ({ sidebar }) => {
    return (
        <div className="flex min-h-screen bg-base-100">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-green-100 p-6 hidden md:block">
                {sidebar}
            </aside>
            {/* Main Content */}
            <main className="flex-1 p-6">
                <Outlet />
            </main>
        </div>
    );
};

export default DashboardLayout;
