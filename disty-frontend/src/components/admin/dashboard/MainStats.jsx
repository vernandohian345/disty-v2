import {
    BookOpen,
    BadgeCheck,
    Users,
    Clock3,
    Award,
    FileBadge,
    Newspaper,
} from "lucide-react";

import StatsCard from "./StatsCard";

export default function MainStats({
    stats,
}) {

    const statsData = [

        {
            title: "Total Pelatihan",
            value: stats.total_pelatihan,
            link: "/admin/pelatihan",
            bgColor:
                "bg-gradient-to-br from-blue-100 to-blue-200",
            icon: (
                <BookOpen
                    size={28}
                    className="text-blue-600"
                />
            ),
        },

        {
            title: "Total Sertifikasi",
            value: stats.total_sertifikasi,
            link: "/admin/sertifikasi",
            bgColor:
                "bg-gradient-to-br from-emerald-100 to-emerald-200",
            icon: (
                <BadgeCheck
                    size={28}
                    className="text-emerald-600"
                />
            ),
        },

        {
            title: "Total Users",
            value: stats.total_users,
            link: "/admin/users",
            bgColor:
                "bg-gradient-to-br from-purple-100 to-purple-200",
            icon: (
                <Users
                    size={28}
                    className="text-purple-600"
                />
            ),
        },

        {
            title: "Pending Pembayaran",
            value: stats.pembayaran_pending,
            link: "/admin/pembayaran",
            bgColor:
                "bg-gradient-to-br from-red-100 to-red-200",
            icon: (
                <Clock3
                    size={28}
                    className="text-red-600"
                />
            ),
        },

        {
            title: "Total Blog",
            value: stats.total_blog,
            link: "/admin/blog",
            bgColor:
                "bg-gradient-to-br from-orange-100 to-orange-200",
            icon: (
                <Newspaper
                    size={28}
                    className="text-orange-600"
                />
            ),
        },

        {
            title: "Peserta Pelatihan",
            value:
                stats.total_peserta_pelatihan,
            link: "/admin/Pembayaran",
            bgColor:
                "bg-gradient-to-br from-sky-100 to-sky-200",
            icon: (
                <Users
                    size={28}
                    className="text-sky-600"
                />
            ),
        },

        {
            title: "Peserta Sertifikasi",
            value:
                stats.total_peserta_sertifikasi,
            link: "/admin/transaksi-sertifikasi",
            bgColor:
                "bg-gradient-to-br from-cyan-100 to-cyan-200",
            icon: (
                <Award
                    size={28}
                    className="text-cyan-600"
                />
            ),
        },

        {
            title: "Belum Generate",
            value:
                stats.sertifikat_belum_generate,
            link: "/admin/sertifikat",
            bgColor:
                "bg-gradient-to-br from-yellow-100 to-yellow-200",
            icon: (
                <FileBadge
                    size={28}
                    className="text-yellow-600"
                />
            ),
        },
    ];

    return (

        <div className="mt-8">

            {/* HEADER */}
            

            {/* GRID */}
            <div className="
                grid
                grid-cols-1
                gap-6
                sm:grid-cols-2
                xl:grid-cols-4
            ">

                {
                    statsData.map(
                        (item, index) => (

                            <StatsCard
                                key={index}
                                title={item.title}
                                value={item.value}
                                bgColor={item.bgColor}
                                icon={item.icon}
                                link={item.link}
                            />

                        )
                    )
                }

            </div>

        </div>

    );
}