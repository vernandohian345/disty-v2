import { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import { getDashboard } from "../../services/dashboardService";

import DashboardHeader from "../../components/admin/dashboard/DashboardHeader";
import LoadingDashboard from "../../components/admin/dashboard/LoadingDashboard";
import MainStats from "../../components/admin/dashboard/MainStats";
import StatisticsChart from "../../components/admin/dashboard/StatisticsChart";
import ScheduleCalendar from "../../components/admin/dashboard/ScheduleCalendar";
import TopPelatihan from "../../components/admin/dashboard/TopPelatihan";
import TopSertifikasi from "../../components/admin/dashboard/TopSertifikasi";

export default function Dashboard() {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetchDashboard();
    }, []);

    const fetchDashboard = async () => {
        try {
            const response = await getDashboard();
            setData(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    if (!data) {
        return <LoadingDashboard />;
    }

    const chartData = data.chartData.labels.map((label, index) => ({
        name: label,
        pelatihan: data.chartData.pelatihan[index],
        sertifikasi: data.chartData.sertifikasi[index],
    }));

    return (
        <AdminLayout>
            <div className="p-6 bg-slate-100 min-h-screen">
                
                <DashboardHeader />

                <MainStats stats={data.stats} />

                <StatisticsChart chartData={chartData} />

                <ScheduleCalendar
                    events={data.scheduleEvents}
                />

                <div className="
                    grid
                    grid-cols-1
                    xl:grid-cols-2
                    gap-6
                    mt-8
                ">
                    <TopPelatihan
                        data={data.topPelatihan}
                    />

                    <TopSertifikasi
                        data={data.topSertifikasi}
                    />
                </div>

            </div>
        </AdminLayout>
    );
}