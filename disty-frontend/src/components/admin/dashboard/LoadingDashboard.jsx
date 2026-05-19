import AdminLayout from "../../../layouts/AdminLayout";

export default function LoadingDashboard() {
    return (
        <AdminLayout>

            <div className="p-10">

                <div className="
                    animate-pulse
                    space-y-6
                ">

                    <div className="
                        h-10
                        w-64
                        bg-slate-200
                        rounded-xl
                    "></div>

                    <div className="
                        grid
                        grid-cols-1
                        md:grid-cols-2
                        xl:grid-cols-4
                        gap-6
                    ">

                        {[1,2,3,4].map((item) => (
                            <div
                                key={item}
                                className="
                                    h-36
                                    bg-slate-200
                                    rounded-3xl
                                "
                            />
                        ))}

                    </div>

                </div>

            </div>

        </AdminLayout>
    );
}