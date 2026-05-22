import {
    TrendingUp,
    Trophy,
    Users,
    ArrowUpRight,
    Flame,
} from "lucide-react";

export default function TopPelatihan({
    data,
}) {
    return (

        <div className="
            relative
            overflow-hidden
            rounded-[32px]
            border
            border-slate-200
            bg-white
            shadow-xl
        ">

            {/* BACKGROUND EFFECT */}
            <div className="
                absolute
                -top-20
                -right-20
                h-56
                w-56
                rounded-full
                bg-orange-100
                opacity-40
                blur-3xl
            " />

            <div className="
                absolute
                -bottom-20
                -left-20
                h-56
                w-56
                rounded-full
                bg-amber-100
                opacity-30
                blur-3xl
            " />

            {/* HEADER */}
            <div className="
                relative
                z-10
                flex
                items-center
                justify-between
                border-b
                border-slate-100
                p-6
            ">

                <div className="
                    flex
                    items-center
                    gap-4
                ">

                    {/* ICON */}
                    <div className="
                        flex
                        h-14
                        w-14
                        items-center
                        justify-center
                        rounded-2xl
                        bg-gradient-to-br
                        from-orange-400
                        to-orange-500
                        shadow-lg
                        shadow-orange-200
                    ">

                        <TrendingUp
                            className="
                                text-white
                            "
                            size={28}
                        />

                    </div>

                    {/* TITLE */}
                    <div>

                        <h2 className="
                            text-2xl
                            font-black
                            text-slate-800
                        ">
                            Top Pelatihan
                        </h2>

                        <p className="
                            mt-1
                            text-sm
                            text-slate-500
                        ">
                            Pelatihan paling populer
                        </p>

                    </div>

                </div>

                {/* BADGE */}
                <div className="
                    hidden
                    md:flex
                    items-center
                    gap-2
                    rounded-2xl
                    bg-orange-50
                    px-4
                    py-2
                    text-sm
                    font-semibold
                    text-orange-600
                ">

                    <Flame size={18} />

                    Hot Training

                </div>

            </div>

            {/* LIST */}
            <div className="
                relative
                z-10
                p-6
                space-y-4
            ">

                {
                    data.map(
                        (item, index) => (

                            <div
                                key={item.id}

                                className="
                                    group
                                    flex
                                    items-center
                                    justify-between
                                    rounded-3xl
                                    border
                                    border-slate-100
                                    bg-slate-50
                                    p-5
                                    transition-all
                                    duration-300
                                    hover:-translate-y-1
                                    hover:border-orange-200
                                    hover:bg-white
                                    hover:shadow-lg
                                "
                            >

                                {/* LEFT */}
                                <div className="
                                    flex
                                    items-center
                                    gap-4
                                ">

                                    {/* RANK */}
                                    <div className={`
                                        flex
                                        h-14
                                        w-14
                                        items-center
                                        justify-center
                                        rounded-2xl
                                        font-black
                                        text-lg
                                        shadow-sm

                                        ${
                                            index === 0
                                                ? "bg-gradient-to-br from-yellow-300 to-yellow-400 text-white"
                                                : index === 1
                                                ? "bg-gradient-to-br from-slate-300 to-slate-400 text-white"
                                                : index === 2
                                                ? "bg-gradient-to-br from-orange-300 to-orange-400 text-white"
                                                : "bg-white text-slate-700"
                                        }
                                    `}>

                                        {
                                            index === 0
                                                ? <Trophy size={22} />
                                                : `#${index + 1}`
                                        }

                                    </div>

                                    {/* INFO */}
                                    <div>

                                        <h3 className="
                                            text-lg
                                            font-bold
                                            text-slate-800
                                            transition-all
                                            duration-300
                                            group-hover:text-orange-500
                                        ">

                                            {item.title}

                                        </h3>

                                        <div className="
                                            mt-2
                                            flex
                                            items-center
                                            gap-2
                                            text-sm
                                            text-slate-500
                                        ">

                                            <Users
                                                size={16}
                                            />

                                            <span>

                                                {
                                                    item.transaksi_pelatihan_count
                                                } peserta

                                            </span>

                                        </div>

                                    </div>

                                </div>

                                {/* RIGHT */}
                                <div className="
                                    flex
                                    h-12
                                    w-12
                                    items-center
                                    justify-center
                                    rounded-2xl
                                    bg-white
                                    shadow-sm
                                    transition-all
                                    duration-300
                                    group-hover:bg-orange-500
                                    group-hover:text-white
                                ">

                                    <ArrowUpRight
                                        size={20}
                                    />

                                </div>

                            </div>

                        )
                    )
                }

            </div>

        </div>
    );
}