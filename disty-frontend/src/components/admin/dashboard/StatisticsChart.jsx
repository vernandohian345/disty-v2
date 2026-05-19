import {
    ResponsiveContainer,
    AreaChart,
    Area,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
} from "recharts";

import {
    TrendingUp,
    Activity,
} from "lucide-react";

export default function StatisticsChart({
    chartData,
}) {
    return (
        <div className="
            mt-8
            overflow-hidden
            rounded-[32px]
            bg-white
            shadow-xl
            border
            border-slate-200
        ">

            {/* HEADER */}
            <div className="
                relative
                overflow-hidden
                bg-gradient-to-r
                from-slate-900
                via-slate-800
                to-slate-900
                p-8
                text-white
            ">

                {/* BACKGROUND EFFECT */}
                <div className="
                    absolute
                    top-0
                    right-0
                    w-72
                    h-72
                    bg-blue-500/20
                    rounded-full
                    blur-3xl
                " />

                <div className="
                    absolute
                    bottom-0
                    left-0
                    w-72
                    h-72
                    bg-orange-500/20
                    rounded-full
                    blur-3xl
                " />

                <div className="
                    relative
                    z-10
                    flex
                    flex-col
                    lg:flex-row
                    lg:items-center
                    lg:justify-between
                    gap-6
                ">

                    {/* TITLE */}
                    <div>
                        <div className="
                            flex
                            items-center
                            gap-4
                        ">

                            <div className="
                                w-16
                                h-16
                                rounded-3xl
                                bg-white/10
                                backdrop-blur-xl
                                border
                                border-white/20
                                flex
                                items-center
                                justify-center
                            ">

                                <TrendingUp
                                    size={30}
                                    className="
                                        text-orange-400
                                    "
                                />
                            </div>

                            <div>

                                <h2 className="
                                    text-3xl
                                    font-black
                                ">
                                    Statistik Peserta
                                </h2>

                                <p className="
                                    text-slate-300
                                    mt-1
                                    text-sm
                                ">
                                    Grafik perkembangan peserta
                                    pelatihan & sertifikasi
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* STATUS */}
                    <div className="
                        flex
                        flex-wrap
                        items-center
                        gap-3
                    ">
                        {/* PELATIHAN */}
                        <div className="
                            flex
                            items-center
                            gap-2
                            px-4
                            py-2
                            rounded-2xl
                            bg-white/10
                            border
                            border-white/10
                            backdrop-blur-md
                        ">
                            <div className="
                                w-3
                                h-3
                                rounded-full
                                bg-blue-400
                                shadow-lg
                                shadow-blue-400/50
                            " />

                            <span className="
                                text-sm
                                font-medium
                            ">
                                Pelatihan
                            </span>
                        </div>

                        {/* SERTIFIKASI */}
                        <div className="
                            flex
                            items-center
                            gap-2
                            px-4
                            py-2
                            rounded-2xl
                            bg-white/10
                            border
                            border-white/10
                            backdrop-blur-md
                        ">

                            <div className="
                                w-3
                                h-3
                                rounded-full
                                bg-emerald-400
                                shadow-lg
                                shadow-emerald-400/50
                            " />
                            <span className="
                                text-sm
                                font-medium
                            ">
                                Sertifikasi
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* CHART */}
            <div className="p-6 bg-slate-50">

                <div className="
                    rounded-3xl
                    bg-white
                    border
                    border-slate-200
                    p-6
                    shadow-sm
                ">
                    <div className="
                        flex
                        items-center
                        justify-between
                        mb-6
                    ">
                        <div>
                            <h3 className="
                                text-xl
                                font-bold
                                text-slate-800
                            ">
                                Overview Data
                            </h3>
                            <p className="
                                text-sm
                                text-slate-500
                                mt-1
                            ">
                                Data peserta dalam beberapa bulan terakhir
                            </p>
                        </div>

                        <div className="
                            w-12
                            h-12
                            rounded-2xl
                            bg-orange-100
                            flex
                            items-center
                            justify-center
                        ">
                            <Activity
                                className="
                                    text-orange-500
                                "
                            />
                        </div>
                    </div>

                    <div className="w-fullh-[420px]">
                        <ResponsiveContainer
                            width="100%"
                            height="100%"
                        >
                            <AreaChart
                                data={chartData}
                                margin={{
                                    top: 10,
                                    right: 10,
                                    left: -20,
                                    bottom: 0,
                                }}
                            >
                                <defs>
                                    <linearGradient
                                        id="pelatihan"
                                        x1="0"
                                        y1="0"
                                        x2="0"
                                        y2="1"
                                    >
                                        <stop
                                            offset="5%"
                                            stopColor="#3B82F6"
                                            stopOpacity={0.4}
                                        />
                                        <stop
                                            offset="95%"
                                            stopColor="#3B82F6"
                                            stopOpacity={0}
                                        />
                                    </linearGradient>

                                    <linearGradient
                                        id="sertifikasi"
                                        x1="0"
                                        y1="0"
                                        x2="0"
                                        y2="1"
                                    >
                                        <stop
                                            offset="5%"
                                            stopColor="#10B981"
                                            stopOpacity={0.4}
                                        />
                                        <stop
                                            offset="95%"
                                            stopColor="#10B981"
                                            stopOpacity={0}
                                        />
                                    </linearGradient>

                                </defs>
                                <CartesianGrid
                                    strokeDasharray="3 3"
                                    stroke="#E2E8F0"
                                    vertical={false}
                                />
                                <XAxis
                                    dataKey="name"
                                    tick={{
                                        fill: "#64748B",
                                        fontSize: 12,
                                    }}
                                    axisLine={false}
                                    tickLine={false}
                                />
                                <YAxis
                                    tick={{
                                        fill: "#64748B",
                                        fontSize: 12,
                                    }}
                                    axisLine={false}
                                    tickLine={false}
                                />

                                <Tooltip
                                    contentStyle={{
                                        borderRadius: "20px",
                                        border: "none",
                                        boxShadow:
                                            "0 10px 40px rgba(0,0,0,0.1)",
                                    }}
                                />
                                <Legend />

                                {/* PELATIHAN */}
                                <Area
                                    type="monotone"
                                    dataKey="pelatihan"
                                    stroke="#3B82F6"
                                    fillOpacity={1}
                                    fill="url(#pelatihan)"
                                    strokeWidth={4}
                                />

                                {/* SERTIFIKASI */}
                                <Area
                                    type="monotone"
                                    dataKey="sertifikasi"
                                    stroke="#10B981"
                                    fillOpacity={1}
                                    fill="url(#sertifikasi)"
                                    strokeWidth={4}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
}