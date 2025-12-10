import DashboardLayout from '../layout/DashboardLayout';
import DashboardHome from '../pages/DashboardHome';
import MyApplications from '../pages/MyApplications';
import MyReviews from '../pages/MyReviews';
import AdminProfile from '../pages/AdminProfile';
import AdminUsers from '../pages/AdminUsers';
import AdminScholarships from '../pages/AdminScholarships';
import AdminAnalytics from '../pages/AdminAnalytics';
import ModeratorApplications from '../pages/ModeratorApplications';
import AllScholarships from '../pages/AllScholarships';
import AllReviews from '../pages/AllReviews';
import Login from '../pages/Login';
import Register from '../pages/Register';
import React from 'react';
import DynamicTitle from '../components/DynamicTitle';
import NavBar from '../components/NavBar';
import { Outlet, Routes, Route } from 'react-router-dom';
import Success from '../pages/Success';
import Failed from '../pages/Failed';
import NotFound from '../pages/NotFound';
import Home from '../pages/Home';
import Footer from '../components/Footer';


const MainLayout = () => {
    return (
        <div className="flex flex-col min-h-screen bg-linear-to-br from-slate-50 via-white to-indigo-50 font-sans">
            <NavBar />
            <main className="flex-1 px-2 sm:px-0 pt-4 pb-8">
                <Routes>
                    <Route index element={<Home />} />
                    <Route path="dashboard/*" element={<DashboardLayout />}>
                        <Route index element={<DashboardHome />} />
                        <Route path="my-applications" element={<MyApplications />} />
                        <Route path="my-reviews" element={<MyReviews />} />
                        <Route path="admin/profile" element={<AdminProfile />} />
                        <Route path="admin/users" element={<AdminUsers />} />
                        <Route path="admin/scholarships" element={<AdminScholarships />} />
                        <Route path="admin/analytics" element={<AdminAnalytics />} />
                        <Route path="moderator/applications" element={<ModeratorApplications />} />
                    </Route>
                    <Route path="allscholarships" element={<AllScholarships />} />
                    <Route path="allreviews" element={<AllReviews />} />
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />
                    <Route path="dashboard/payment/success" element={<Success />} />
                    <Route path="dashboard/payment/failed" element={<Failed />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </main>
            <Footer />
        </div>
    );
}

export default MainLayout;