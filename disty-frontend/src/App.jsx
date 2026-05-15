import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Admin/Dashboard";
import Pelatihan from "./pages/admin/Pelatihan";

import HeroSection from "./components/frontend/home/HeroSection";
import Navbar from "./components/frontend/Navbar";
import AboutSection from "./components/frontend/home/AboutSection";
import ProgramSection from "./components/frontend/home/ProgramSection";
import PartnerSection from "./components/frontend/home/PartnerSection";
import BlogSection from "./components/frontend/home/BlogSection";
import FAQSection from "./components/frontend/home/FaqSection";
import Footer from "./components/frontend/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

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
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />

                {/* PELATIHAN */}
                <Route
                    path="/admin/pelatihan"
                    element={
                        <ProtectedRoute>
                            <Pelatihan />
                        </ProtectedRoute>
                    }
                />

            </Routes>

        </BrowserRouter>
    );
}