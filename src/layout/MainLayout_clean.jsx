import React from "react";
import { Outlet, Routes, Route } from 'react-router-dom';
import Success from '../pages/Success';
import Failed from '../pages/Failed';
import NotFound from '../pages/NotFound';

const MainLayout = () => {
    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <header className="bg-white shadow-sm py-4 px-6 flex items-center justify-between">
                <h1 className="text-2xl font-bold text-green-700">ScholarStream</h1>
            </header>
            <main className="flex-1 px-2 sm:px-0 pt-4 pb-8">
                <Routes>
                    <Route path="/dashboard/payment/success" element={<Success />} />
                    <Route path="/dashboard/payment/failed" element={<Failed />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
                <div className="max-w-7xl mx-auto">
                    <Outlet />
                </div>
            </main>
            <footer className="bg-white border-t py-4 text-center text-gray-500 text-sm">
                &copy; {new Date().getFullYear()} ScholarStream. All rights reserved.
            </footer>
        </div>
    );
};

export default MainLayout;
