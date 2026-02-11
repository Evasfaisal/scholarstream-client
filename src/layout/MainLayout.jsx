import React from 'react';
import NavBar from '../components/NavBar';
import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer';

const MainLayout = () => {
    return (
        <div className="flex flex-col min-h-screen bg-linear-to-br from-slate-50 via-white to-indigo-50 font-sans">
            <NavBar />
            <main className="flex-1 px-2 sm:px-0 pt-4 pb-8">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default MainLayout;
