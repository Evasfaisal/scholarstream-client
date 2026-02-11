
import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebase.config';
import apiUrl from '../utils/api';
import ApplicationsBarChart from '../components/ApplicationsBarChart';

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

                // Fetch users count
                const usersSnapshot = await getDocs(collection(db, 'users'));
                const totalUsers = usersSnapshot.size;

                // Fetch scholarships and applications from API
                const scholarshipsRes = await apiUrl.get('/api/scholarships');
                const applicationsRes = await apiUrl.get('/api/applications');

                const scholarships = Array.isArray(scholarshipsRes.data)
                    ? scholarshipsRes.data
                    : scholarshipsRes.data?.scholarships || [];

                const applications = Array.isArray(applicationsRes.data)
                    ? applicationsRes.data
                    : applicationsRes.data?.applications || [];

                // Calculate total fees collected from successful applications
                const totalFeesCollected = applications
                    .filter(app => app.paymentStatus === 'paid')
                    .reduce((sum, app) => {
                        const appFees = parseFloat(app.applicationFees) || 0;
                        const serviceFees = parseFloat(app.serviceCharge) || 0;
                        return sum + appFees + serviceFees;
                    }, 0);

                // Create chart data (applications per university)
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
                    .slice(0, 10); // Top 10 universities

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
        <div className="p-6">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Analytics & Overview</h2>

            {loading ? (
                <div className="flex justify-center items-center py-20">
                    <span className="loading loading-spinner loading-lg text-primary"></span>
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg p-6 text-center shadow-lg">
                            <div className="text-4xl font-bold mb-2">{stats.users}</div>
                            <div className="text-blue-100">Total Users</div>
                        </div>
                        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg p-6 text-center shadow-lg">
                            <div className="text-4xl font-bold mb-2">{stats.scholarships}</div>
                            <div className="text-green-100">Total Scholarships</div>
                        </div>
                        <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg p-6 text-center shadow-lg">
                            <div className="text-4xl font-bold mb-2">
                                ${stats.totalFeesCollected.toLocaleString()}
                            </div>
                            <div className="text-purple-100">Total Fees Collected</div>
                        </div>
                        <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg p-6 text-center shadow-lg">
                            <div className="text-4xl font-bold mb-2">{stats.applications}</div>
                            <div className="text-orange-100">Total Applications</div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg p-6 shadow-lg">
                        <h3 className="text-2xl font-semibold mb-4 text-gray-800">
                            Applications by University
                        </h3>
                        <div className="w-full h-80">
                            {chartData && chartData.length > 0 ? (
                                <ApplicationsBarChart data={chartData} />
                            ) : (
                                <div className="flex items-center justify-center h-full text-gray-400">
                                    No chart data available
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
