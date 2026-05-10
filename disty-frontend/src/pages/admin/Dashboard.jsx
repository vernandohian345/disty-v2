import { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import { getDashboard } from "../../services/dashboardService";

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

    return (
        <AdminLayout title="Dashboard">
            <h2>Dashboard Admin</h2>

            {!data ? (
                <p>Loading...</p>
            ) : (
                <>
                    <div className="row">
                        <div className="col-md-3">
                            <div className="card p-3">
                                <h5>Total Pelatihan</h5>

                                <h2>
                                    {data.stats.total_pelatihan}
                                </h2>
                            </div>
                        </div>

                        <div className="col-md-3">
                            <div className="card p-3">
                                <h5>Total Sertifikasi</h5>

                                <h2>
                                    {data.stats.total_sertifikasi}
                                </h2>
                            </div>
                        </div>

                        <div className="col-md-3">
                            <div className="card p-3">
                                <h5>Total User</h5>

                                <h2>
                                    {data.stats.total_users}
                                </h2>
                            </div>
                        </div>

                        <div className="col-md-3">
                            <div className="card p-3">
                                <h5>Pembayaran Pending</h5>

                                <h2>
                                    {data.stats.pembayaran_pending}
                                </h2>
                            </div>
                        </div>
                    </div>

                    <div className="card mt-4 p-3">
                        <h4>Top Pelatihan</h4>

                        <ul>
                            {data.topPelatihan.map((item) => (
                                <li key={item.id}>
                                    {item.nama_pelatihan}
                                </li>
                            ))}
                        </ul>
                    </div>
                </>
            )}
        </AdminLayout>
    );
}