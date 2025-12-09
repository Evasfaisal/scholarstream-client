import React from 'react';
import DynamicTitle from '../components/DynamicTitle';
import NavBar from '../components/NavBar';
import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer';


const MainLayout = () => {
    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50 font-sans">
            <NavBar />
            <main className="flex-1 px-2 sm:px-0 pt-4 pb-8">
                <div className="max-w-7xl mx-auto">
                    <Outlet />
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default MainLayout;