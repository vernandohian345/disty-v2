import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/auth/Login";

import Blog from "./pages/frontend/Blog";
import BlogDetail from "./pages/frontend/BlogDetail";
import Home from "./pages/frontend/Home";
import Notifications from "./pages/frontend/Notifications";
import About from "./pages/frontend/About";

import Dashboard from "./pages/admin/Dashboard";
import Pelatihan from "./pages/admin/Pelatihan";

import HeroSection from "./components/frontend/home/HeroSection";
import Navbar from "./components/frontend/Navbar";
import AboutSection from "./components/frontend/home/AboutSection";
import ProgramSection from "./components/frontend/home/ProgramSection";
import PartnerSection from "./components/frontend/home/PartnerSection";
import BlogSection from "./components/frontend/home/BlogSection";
import FAQSection from "./components/frontend/home/FaqSection";
import Footer from "./components/frontend/Footer";

import ScrollToTop from "./components/shared/ScrollToTop";

import RouteAdmin from "./routes/AdminRoute";

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
      <ScrollToTop />
      <Routes>
        {/* HOME */}
        <Route path="/" element={<HomePage />} />

        {/* LOGIN */}
        <Route path="/login" element={<Login />} />

        {/* BLOG */}
        <Route path="/blog" element={<Blog />} />

        {/* ABOUT */}
        <Route path="/about" element={<About />} />

        {/* BLOG DETAIL */}
        <Route path="/blog/:slug" element={<BlogDetail />} />

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
        <Route path="/notifications" element={<Notifications />} />

        {/* PELATIHAN */}
        <Route
          path="/admin/pelatihan"
          element={
            <RouteAdmin>
              <Pelatihan />
            </RouteAdmin>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
