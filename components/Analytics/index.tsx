'use client';
import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart, ChartOptions, registerables } from "chart.js";

Chart.register(...registerables);

const UserAnalytics: React.FC = () => {
    const data = {
        labels: ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"],
        datasets: [
            { label: "Service Providers", data: [75, 50, 40, 100, 0, 0, 0], backgroundColor: "#524ED9" },
            { label: "Customers", data: [50, 30, 35, 75, 0, 0, 0], backgroundColor: "#F59E0B" },
        ],
    };

    const chartOptions: ChartOptions<'bar'> = {
        plugins: {
            legend: {
                display: true,
                position: 'bottom' as const,
            },
        },
        responsive: true,
        maintainAspectRatio: false,
    };

    return (
        <div className='w-full px-5 py-5'>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-extrabold text-[#140B31]">User Analytics</h2>
                <button className="text-xs text-[#221354] border-[0.5px] border-[#221354] px-3 py-1 rounded-[5px]">
                    This week
                </button>
            </div>

            <div className="bg-white p-4 rounded-2xl shadow-md w-full h-[300px]">
                <div className="h-[250px]">
                    <Bar data={data} options={chartOptions} />
                </div>
            </div>
        </div>
    );
};

export default UserAnalytics;