import FrontendLayout from "../../layouts/FrontendLayout";
import HeroSection from "../../components/frontend/home/HeroSection";
import AboutSection from "../../components/frontend/home/AboutSection";
import ProgramSection from "../../components/frontend/home/ProgramSection";
import PartnerSection from "../../components/frontend/home/PartnerSection";
import BlogSection from "../../components/frontend/home/BlogSection";
import FaqSection from "../../components/frontend/home/FaqSection";
import "../../styles/home.css";
import "../../styles/app.css";

export default function Home() {
  return (
    <FrontendLayout>
      <HeroSection />

      <AboutSection />

      <ProgramSection />

      <PartnerSection />

      <BlogSection />

      <FaqSection />
    </FrontendLayout>
  );
}
