import Navbar from "../../components/frontend/Navbar";
import Footer from "../../components/frontend/Footer";

import AboutHero from "../../components/frontend/about/AboutHero";
import CompanySection from "../../components/frontend/about/CompanySection";
import VisionMission from "../../components/frontend/about/VisionMission";
import LegalSection from "../../components/frontend/about/LegalSection";
import AboutCTA from "../../components/frontend/about/AboutCTA";

export default function About() {
  return (
    <>
      <Navbar />

      <AboutHero />

      <CompanySection />

      <VisionMission />

      <LegalSection />

      <AboutCTA />

      <Footer />
    </>
  );
}
