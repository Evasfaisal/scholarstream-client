import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ApplicationsBarChart = ({ data }) => {
    const chartData = {
        labels: data.map(item => item.label),
        datasets: [
            {
                label: 'Applications',
                data: data.map(item => item.count),
                backgroundColor: 'rgba(34,197,94,0.7)',
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: { position: 'top' },
            title: { display: true, text: 'Applications per University/Category' },
        },
    };

    return <Bar data={chartData} options={options} />;
};

export default ApplicationsBarChart;
