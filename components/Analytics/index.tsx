'use client';
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart, ChartOptions, registerables } from "chart.js";
import { useGetUserAnalyticsQuery } from "@/services/adminAnalysis";
import {Loader2} from "lucide-react";

Chart.register(...registerables);

interface AnalyticsEntry {
    day: string;
    serviceProvidersCount: number;
    customersCount: number;
}

interface ChartData {
    labels: string[];
    datasets: {
        label: string;
        data: number[];
        backgroundColor: string;
    }[];
}

const UserAnalytics: React.FC = () => {
    const { data, error, isLoading } = useGetUserAnalyticsQuery();

    const [chartData, setChartData] = useState<ChartData>({
        labels: [],
        datasets: [
            { label: "Service Providers", data: [], backgroundColor: "#381F8C" },
            { label: "Customers", data: [], backgroundColor: "#FE9B07" },
        ],
    });

    useEffect(() => {
        if (data && Array.isArray(data)) {
            setChartData({
                labels: data.map((entry: AnalyticsEntry) => entry.day.slice(0,3)),
                datasets: [
                    { label: "Service Providers", data: data.map((entry: AnalyticsEntry) => entry.serviceProvidersCount), backgroundColor: "#381F8C" },
                    { label: "Customers", data: data.map((entry: AnalyticsEntry) => entry.customersCount), backgroundColor: "#FE9B07" },
                ],
            });
        }
    }, [data]);

    const chartOptions: ChartOptions<'bar'> = {
        plugins: {
            legend: {
                display: true,
                position: 'bottom',
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

            <div className="bg-white p-4 rounded-2xl shadow-md w-full h-[300px] flex justify-center items-center">
                {isLoading ? (
                    <Loader2 className="animate-spin size-20 text-primary" />
                ) : error ? (
                    <p>Error loading data</p>
                ) : (
                    <div className="h-[250px] w-full">
                        <Bar data={chartData} options={chartOptions} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserAnalytics;