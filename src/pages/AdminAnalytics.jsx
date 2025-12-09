
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { apiUrl } from '../utils/api';

const AdminAnalytics = () => {
    const [stats, setStats] = useState({ users: 0, scholarships: 0, fees: 0, applications: 0 });
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await axios.get(apiUrl('/api/analytics'));
                setStats(res.data.stats);
                setChartData(res.data.chartData);
            } catch (err) {
                console.error('Failed to fetch analytics:', err);
            }
        };
        fetchStats();
    }, []);

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Analytics & Overview</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-base-200 rounded-lg p-4 text-center">
                    <div className="text-3xl font-bold">{stats.users}</div>
                    <div className="text-sm opacity-70">Total Users</div>
                </div>
                <div className="bg-base-200 rounded-lg p-4 text-center">
                    <div className="text-3xl font-bold">{stats.scholarships}</div>
                    <div className="text-sm opacity-70">Total Scholarships</div>
                </div>
                <div className="bg-base-200 rounded-lg p-4 text-center">
                    <div className="text-3xl font-bold">{stats.fees}</div>
                    <div className="text-sm opacity-70">Total Fees Collected</div>
                </div>
                <div className="bg-base-200 rounded-lg p-4 text-center">
                    <div className="text-3xl font-bold">{stats.applications}</div>
                    <div className="text-sm opacity-70">Applications</div>
                </div>
            </div>
            <div className="bg-base-100 rounded-lg p-6 shadow">
                <h3 className="font-semibold mb-2">Applications Chart</h3>
                <div className="w-full h-40 flex items-center justify-center text-gray-400">
                 
                    <span>Chart Placeholder</span>
                </div>
            </div>
        </div>
    );
};

export default AdminAnalytics;
