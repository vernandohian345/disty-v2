import { useNavigate } from "react-router-dom";

export default function StatsCard({
    title,
    value,
    icon,
    bgColor,
    link,
}) {

    const navigate = useNavigate();

    return (
        <div
            onClick={() => navigate(link)}
            className="
                group
                relative
                overflow-hidden
                rounded-[28px]
                border
                border-slate-200
                bg-white
                p-6
                shadow-sm
                transition-all
                duration-300
                hover:-translate-y-2
                hover:shadow-2xl
                cursor-pointer
            "
        >

            {/* BACKGROUND EFFECT */}
            <div className="
                absolute
                -top-10
                -right-10
                h-40
                w-40
                rounded-full
                bg-slate-100
                opacity-50
                blur-3xl
                transition-all
                duration-500
                group-hover:scale-150
            " />

            {/* CONTENT */}
            <div className="
                relative
                z-10
                flex
                items-start
                justify-between
                gap-4
            ">

                {/* LEFT */}
                <div>

                    <p className="
                        text-sm
                        font-semibold
                        uppercase
                        tracking-wide
                        text-slate-500
                    ">
                        {title}
                    </p>

                    <h2 className="
                        mt-4
                        text-4xl
                        font-black
                        tracking-tight
                        text-slate-800
                    ">
                        {value}
                    </h2>

                    {/* BUTTON */}
                    <div className="
                        mt-5
                        inline-flex
                        items-center
                        gap-2
                        rounded-full
                        bg-slate-100
                        px-4
                        py-2
                        text-xs
                        font-semibold
                        text-slate-700
                        transition-all
                        duration-300
                        group-hover:bg-orange-500
                        group-hover:text-white
                    ">

                        <div className="
                            h-2
                            w-2
                            rounded-full
                            bg-emerald-400
                            group-hover:bg-white
                        " />

                        Lihat Detail

                    </div>

                </div>

                {/* ICON */}
                <div className={`
                    relative
                    flex
                    h-16
                    w-16
                    items-center
                    justify-center
                    rounded-2xl
                    shadow-lg
                    transition-all
                    duration-300
                    group-hover:scale-110
                    group-hover:rotate-6
                    ${bgColor}
                `}>

                    <div className="
                        absolute
                        inset-0
                        rounded-2xl
                        bg-white/20
                    " />

                    <div className="
                        relative
                        z-10
                    ">
                        {icon}
                    </div>

                </div>

            </div>

            {/* BOTTOM LINE */}
            <div className="
                absolute
                bottom-0
                left-0
                h-1
                w-0
                bg-gradient-to-r
                from-orange-400
                to-orange-500
                transition-all
                duration-500
                group-hover:w-full
            " />

        </div>
    );
}