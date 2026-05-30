import Navbar from "../../components/frontend/Navbar";
import Footer from "../../components/frontend/Footer";

import CertificationHero from "../../components/frontend/certification/CertificationHero";
import CertificationSection from "../../components/frontend/certification/CertificationSection";

export default function Certification() {
  return (
    <>
      <Navbar />

      <CertificationHero />

      <CertificationSection />

      <Footer />
    </>
  );
}
