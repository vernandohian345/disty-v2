import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Admin/Dashboard";
import Pelatihan from "./pages/admin/Pelatihan";
import Sertifikasi from "./pages/admin/Sertifikasi";

import HeroSection from "./components/frontend/home/HeroSection";
import Navbar from "./components/frontend/Navbar";
import AboutSection from "./components/frontend/home/AboutSection";
import ProgramSection from "./components/frontend/home/ProgramSection";
import PartnerSection from "./components/frontend/home/PartnerSection";
import BlogSection from "./components/frontend/home/BlogSection";
import FAQSection from "./components/frontend/home/FaqSection";
import Footer from "./components/frontend/Footer";

import Notifications from "./pages/Notifications";

import RouteAdmin from "./components/AdminRoute";

function HomePage() {
    return (
        <>
            <Navbar />

            <HeroSection />

            <AboutSection />

            <ProgramSection />

            <PartnerSection />

            <BlogSection />

            <FAQSection />

            <Footer />
        </>
    );
}

export default function App() {

    return (

        <BrowserRouter>

            <Routes>

                {/* HOME */}
                <Route
                    path="/"
                    element={<HomePage />}
                />

                {/* LOGIN */}
                <Route
                    path="/login"
                    element={<Login />}
                />
                {/* DASHBOARD */}
                <Route
                    path="/dashboard"
                    element={
                        <RouteAdmin>
                            <Dashboard />
                        </RouteAdmin>
                    }
                />
                {/* NOTIFICATIONS */}
                <Route
                    path="/notifications"
                    element={<Notifications />}
/>
                {/* PELATIHAN */}
                <Route
                    path="/admin/pelatihan"
                    element={
                        <RouteAdmin>
                            <Pelatihan />
                        </RouteAdmin>
                    }
                />

                {/* Sertifikasi */}
                <Route
                    path="/admin/sertifikasi"
                    element={
                        <RouteAdmin>
                            <Sertifikasi />
                        </RouteAdmin>
                    }
                />
            </Routes>

        </BrowserRouter>
    );
}