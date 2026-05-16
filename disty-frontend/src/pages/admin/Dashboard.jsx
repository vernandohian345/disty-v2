import { useEffect, useState } from "react";

import AdminLayout from "../../layouts/AdminLayout";

import { getDashboard } from "../../services/dashboardService";

import {
    BookOpen,
    BadgeCheck,
    Users,
    Clock3,
    Award,
    TrendingUp,
} from "lucide-react";

export default function Dashboard() {

    const [data, setData] = useState(null);

    useEffect(() => {
        fetchDashboard();
    }, []);

    const fetchDashboard = async () => {

        try {

            const response =
                await getDashboard();

            setData(response.data);

        } catch (error) {

            console.log(error);

        }
    };

    if (!data) {
        return (
            <AdminLayout>

                <div className="p-10">

                    <div className="animate-pulse space-y-6">

                        <div className="h-10 w-64 bg-slate-200 rounded-xl"></div>

                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

                            {[1, 2, 3, 4].map((item) => (
                                <div
                                    key={item}
                                    className="h-36 bg-slate-200 rounded-3xl"
                                ></div>
                            ))}

                        </div>

                    </div>

                </div>

            </AdminLayout>
        );
    }

    return (
        <AdminLayout>

            <div className="p-6 bg-slate-100">

                {/* HEADER */}
                <div className="mb-8">

                    <h1 className="text-4xl font-black text-slate-800">
                        Dashboard Admin
                    </h1>

                    <p className="text-slate-500 mt-2">
                        Selamat datang kembali 👋
                    </p>

                </div>

                {/* STATS */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

                    {/* CARD */}
                    <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">

                        <div className="flex items-center justify-between">

                            <div>

                                <p className="text-slate-500 text-sm">
                                    Total Pelatihan
                                </p>

                                <h2 className="text-4xl font-black mt-3 text-slate-800">
                                    {data.stats.total_pelatihan}
                                </h2>

                            </div>

                            <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center">

                                <BookOpen
                                    size={30}
                                    className="text-blue-600"
                                />

                            </div>

                        </div>

                    </div>

                    {/* CARD */}
                    <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">

                        <div className="flex items-center justify-between">

                            <div>

                                <p className="text-slate-500 text-sm">
                                    Total Sertifikasi
                                </p>

                                <h2 className="text-4xl font-black mt-3 text-slate-800">
                                    {data.stats.total_sertifikasi}
                                </h2>

                            </div>

                            <div className="w-16 h-16 rounded-2xl bg-green-100 flex items-center justify-center">

                                <BadgeCheck
                                    size={30}
                                    className="text-green-600"
                                />

                            </div>

                        </div>

                    </div>

                    {/* CARD */}
                    <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">

                        <div className="flex items-center justify-between">

                            <div>

                                <p className="text-slate-500 text-sm">
                                    Total Users
                                </p>

                                <h2 className="text-4xl font-black mt-3 text-slate-800">
                                    {data.stats.total_users}
                                </h2>

                            </div>

                            <div className="w-16 h-16 rounded-2xl bg-purple-100 flex items-center justify-center">

                                <Users
                                    size={30}
                                    className="text-purple-600"
                                />

                            </div>

                        </div>

                    </div>

                    {/* CARD */}
                    <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">

                        <div className="flex items-center justify-between">

                            <div>

                                <p className="text-slate-500 text-sm">
                                    Pending Pembayaran
                                </p>

                                <h2 className="text-4xl font-black mt-3 text-slate-800">
                                    {data.stats.pembayaran_pending}
                                </h2>

                            </div>

                            <div className="w-16 h-16 rounded-2xl bg-red-100 flex items-center justify-center">

                                <Clock3
                                    size={30}
                                    className="text-red-600"
                                />

                            </div>

                        </div>

                    </div>

                </div>

                {/* CONTENT */}
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-8">

                    {/* TOP PELATIHAN */}
                    <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">

                        <div className="flex items-center justify-between mb-6">

                            <div>

                                <h2 className="text-2xl font-bold text-slate-800">
                                    Top Pelatihan
                                </h2>

                                <p className="text-slate-500 text-sm mt-1">
                                    Pelatihan paling populer
                                </p>

                            </div>

                            <TrendingUp className="text-blue-500" />

                        </div>

                        <div className="space-y-4">

                            {data.topPelatihan.map((item, index) => (

                                <div
                                    key={item.id}
                                    className="
                                        flex
                                        items-center
                                        justify-between
                                        p-4
                                        rounded-2xl
                                        bg-slate-50
                                        hover:bg-slate-100
                                        transition
                                    "
                                >

                                    <div className="flex items-center gap-4">

                                        <div
                                            className="
                                                w-12
                                                h-12
                                                rounded-xl
                                                bg-blue-100
                                                text-blue-600
                                                font-bold
                                                flex
                                                items-center
                                                justify-center
                                            "
                                        >
                                            #{index + 1}
                                        </div>

                                        <div>

                                            <h3 className="font-semibold text-slate-800">
                                                {item.nama_pelatihan}
                                            </h3>

                                            <p className="text-sm text-slate-500">
                                                {
                                                    item.transaksi_pelatihan_count
                                                } peserta
                                            </p>

                                        </div>

                                    </div>

                                </div>
                            ))}

                        </div>

                    </div>

                    {/* TOP SERTIFIKASI */}
                    <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">

                        <div className="flex items-center justify-between mb-6">

                            <div>

                                <h2 className="text-2xl font-bold text-slate-800">
                                    Top Sertifikasi
                                </h2>

                                <p className="text-slate-500 text-sm mt-1">
                                    Sertifikasi paling diminati
                                </p>

                            </div>

                            <Award className="text-green-500" />

                        </div>

                        <div className="space-y-4">

                            {data.topSertifikasi.map((item, index) => (

                                <div
                                    key={item.id}
                                    className="
                                        flex
                                        items-center
                                        justify-between
                                        p-4
                                        rounded-2xl
                                        bg-slate-50
                                        hover:bg-slate-100
                                        transition
                                    "
                                >

                                    <div className="flex items-center gap-4">

                                        <div
                                            className="
                                                w-12
                                                h-12
                                                rounded-xl
                                                bg-green-100
                                                text-green-600
                                                font-bold
                                                flex
                                                items-center
                                                justify-center
                                            "
                                        >
                                            #{index + 1}
                                        </div>

                                        <div>

                                            <h3 className="font-semibold text-slate-800">
                                                {item.nama_sertifikasi}
                                            </h3>

                                            <p className="text-sm text-slate-500">
                                                {
                                                    item.transaksi_sertifikasi_count
                                                } peserta
                                            </p>

                                        </div>

                                    </div>

                                </div>
                            ))}

                        </div>

                    </div>

                </div>

            </div>

        </AdminLayout>
    );
}