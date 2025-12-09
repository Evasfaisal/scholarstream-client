import React from "react";
import { Outlet } from "react-router-dom";

const DashboardLayout = ({ sidebar }) => {
    return (
        <div className="flex min-h-screen bg-base-100">
      
            <aside className="w-64 min-h-screen bg-white/90 border-r border-slate-200 p-8 hidden md:block shadow-xl rounded-r-3xl">
                {sidebar}
            </aside>
        
            <main className="flex-1 p-4 sm:p-8">
                <Outlet />
            </main>
        </div>
    );
};

export default DashboardLayout;
