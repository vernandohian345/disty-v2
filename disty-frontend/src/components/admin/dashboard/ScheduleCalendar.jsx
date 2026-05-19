import FullCalendar from "@fullcalendar/react";

import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

import {
    CalendarDays,
    BookOpen,
    BadgeCheck,
} from "lucide-react";

export default function ScheduleCalendar({
    events,
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
                from-orange-500
                via-orange-400
                to-amber-400
                p-8
                text-white
            ">

                {/* BACKGROUND BLUR */}
                <div className="
                    absolute
                    -top-10
                    -right-10
                    w-40
                    h-40
                    bg-white/10
                    rounded-full
                    blur-3xl
                " />

                <div className="
                    absolute
                    -bottom-10
                    -left-10
                    w-40
                    h-40
                    bg-white/10
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
                    gap-5
                ">

                    {/* TITLE */}
                    <div>

                        <div className="
                            flex
                            items-center
                            gap-3
                        ">

                            <div className="
                                w-14
                                h-14
                                rounded-2xl
                                bg-white/20
                                backdrop-blur-md
                                flex
                                items-center
                                justify-center
                            ">

                                <CalendarDays
                                    size={28}
                                />

                            </div>

                            <div>

                                <h2 className="
                                    text-3xl
                                    font-black
                                ">
                                    Jadwal Kegiatan
                                </h2>

                                <p className="
                                    text-orange-100
                                    text-sm
                                    mt-1
                                ">
                                    Pantau seluruh jadwal
                                    pelatihan & sertifikasi
                                </p>

                            </div>

                        </div>

                    </div>

                    {/* LEGEND */}
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
                            bg-white/20
                            backdrop-blur-md
                        ">

                            <div className="
                                w-3
                                h-3
                                rounded-full
                                bg-orange-400
                                shadow-md
                                shadow-orange-300
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
                            bg-white/20
                            backdrop-blur-md
                        ">

                            <div className="
                                w-3
                                h-3
                                rounded-full
                                bg-blue-400
                                shadow-md
                                shadow-blue-300
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

            {/* CALENDAR */}
            <div className="p-6">

                <div className="
                    rounded-3xl
                    overflow-hidden
                    border
                    border-slate-200
                    bg-slate-50
                    p-4
                ">

                    <FullCalendar
                        plugins={[
                            dayGridPlugin,
                            timeGridPlugin,
                            interactionPlugin,
                        ]}

                        initialView="dayGridMonth"

                        events={events}

                        height="auto"

                        headerToolbar={{
                            left:
                                "prev,next today",

                            center:
                                "title",

                            right:
                                "dayGridMonth,timeGridWeek",
                        }}

                        buttonText={{
                            today: "Hari Ini",
                            month: "Bulan",
                            week: "Minggu",
                        }}

                        eventDisplay="block"

                        dayMaxEvents={2}

                        selectable={true}

                        editable={false}

                        eventClassNames={() =>
                            `
                            rounded-xl
                            border-0
                            px-2
                            py-1
                            text-xs
                            font-semibold
                            shadow-sm
                            hover:scale-[1.02]
                            transition-all
                            duration-200
                            `
                        }

                        dayCellClassNames={() =>
                            `
                            hover:bg-orange-50
                            transition-all
                            duration-200
                            `
                        }

                    />

                </div>

            </div>

        </div>
    );
}