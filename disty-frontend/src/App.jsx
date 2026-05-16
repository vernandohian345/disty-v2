import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Blog from "./pages/Blog";

import HeroSection from "./components/frontend/home/HeroSection";
import Navbar from "./components/frontend/Navbar";
import AboutSection from "./components/frontend/home/AboutSection";
import ProgramSection from "./components/frontend/home/ProgramSection";
import PartnerSection from "./components/frontend/home/PartnerSection";
import BlogSection from "./components/frontend/home/BlogSection";
import FAQSection from "./components/frontend/home/FaqSection";
import Footer from "./components/frontend/Footer";

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
        <Route path="/" element={<HomePage />} />

        {/* LOGIN */}
        <Route path="/login" element={<Login />} />

        {/* BLOG */}
        <Route path="/blog" element={<Blog />} />
      </Routes>
    </BrowserRouter>
  );
}
