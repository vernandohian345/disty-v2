import { Navigate } from "react-router-dom";

export default function AdminRoute({ children }) {

    const token = localStorage.getItem("token");

    const user = JSON.parse(
        localStorage.getItem("user")
    );

    // belum login
    if (!token) {
        return <Navigate to="/login" />;
    }

    // bukan admin
    if (user?.role !== "admin") {
        return <Navigate to="/" />;
    }

    return children;
}