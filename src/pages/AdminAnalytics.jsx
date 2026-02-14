import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebase.config';
import apiUrl from '../utils/api';
import ApplicationsBarChart from '../components/ApplicationsBarChart';
import { FaUsers, FaGraduationCap, FaMoneyBillWave, FaRegStickyNote, FaChartBar, FaChartLine } from "react-icons/fa";

const AdminAnalytics = () => {
    const [stats, setStats] = useState({
        users: 0,
        scholarships: 0,
        totalFeesCollected: 0,
        applications: 0
    });
    const [chartData, setChartData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                setLoading(true);

                const usersSnapshot = await getDocs(collection(db, 'users'));
                const totalUsers = usersSnapshot.size;

       
                const scholarshipsRes = await apiUrl.get('/api/scholarships');
                const applicationsRes = await apiUrl.get('/api/applications');

                const scholarships = Array.isArray(scholarshipsRes.data)
                    ? scholarshipsRes.data
                    : scholarshipsRes.data?.scholarships || [];

                const applications = Array.isArray(applicationsRes.data)
                    ? applicationsRes.data
                    : applicationsRes.data?.applications || [];

              
                const totalFeesCollected = applications
                    .filter(app => app.paymentStatus === 'paid')
                    .reduce((sum, app) => {
                        const appFees = parseFloat(app.applicationFees) || 0;
                        const serviceFees = parseFloat(app.serviceCharge) || 0;
                        return sum + appFees + serviceFees;
                    }, 0);

               
                const universityApps = applications.reduce((acc, app) => {
                    const uni = app.universityName || 'Unknown';
                    acc[uni] = (acc[uni] || 0) + 1;
                    return acc;
                }, {});

                const chartData = Object.entries(universityApps)
                    .map(([university, count]) => ({
                        university,
                        applications: count
                    }))
                    .sort((a, b) => b.applications - a.applications)
                    .slice(0, 10); 

                setStats({
                    users: totalUsers,
                    scholarships: scholarships.length,
                    totalFeesCollected: totalFeesCollected,
                    applications: applications.length
                });
                setChartData(chartData);

            } catch (err) {
                console.error('Failed to fetch analytics:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    return (
        <div className="w-full max-w-7xl mx-auto">
         
            <div className="bg-gradient-to-r from-primary/10 to-blue-50 rounded-xl p-4 sm:p-6 mb-6 shadow-sm">
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-2">Analytics & Overview</h2>
                <p className="text-slate-600 text-sm sm:text-base">Monitor key metrics and performance</p>
            </div>

            {loading ? (
                <div className="flex justify-center items-center py-20">
                    <span className="loading loading-spinner loading-lg text-primary"></span>
                </div>
            ) : (
                <>
                
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
                        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-all hover:scale-105">
                            <div className="text-2xl mb-2"><FaUsers /></div>
                            <div className="text-3xl sm:text-4xl font-bold mb-2">{stats.users}</div>
                            <div className="text-blue-100 text-sm">Total Users</div>
                        </div>
                        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-all hover:scale-105">
                            <div className="text-2xl mb-2"><FaGraduationCap /></div>
                            <div className="text-3xl sm:text-4xl font-bold mb-2">{stats.scholarships}</div>
                            <div className="text-green-100 text-sm">Total Scholarships</div>
                        </div>
                        <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-all hover:scale-105">
                            <div className="text-2xl mb-2"><FaMoneyBillWave /></div>
                            <div className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">
                                ${stats.totalFeesCollected.toLocaleString()}
                            </div>
                            <div className="text-purple-100 text-sm">Fees Collected</div>
                        </div>
                        <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-all hover:scale-105">
                            <div className="text-2xl mb-2"><FaRegStickyNote /></div>
                            <div className="text-3xl sm:text-4xl font-bold mb-2">{stats.applications}</div>
                            <div className="text-orange-100 text-sm">Total Applications</div>
                        </div>
                    </div>

                 
                    <div className="bg-white rounded-xl p-4 sm:p-6 shadow-lg">
                        <h3 className="text-xl sm:text-2xl font-semibold mb-4 text-slate-800 flex items-center gap-2">
                            <span><FaChartBar /></span>
                            <span>Applications by University</span>
                        </h3>
                        <div className="w-full h-64 sm:h-80 lg:h-96">
                            {chartData && chartData.length > 0 ? (
                                <ApplicationsBarChart data={chartData} />
                            ) : (
                                <div className="flex flex-col items-center justify-center h-full text-slate-400">
                                    <span className="text-5xl mb-4"><FaChartLine /></span>
                                    <p className="text-sm sm:text-base">No chart data available</p>
                                </div>
                            )}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default AdminAnalytics;
