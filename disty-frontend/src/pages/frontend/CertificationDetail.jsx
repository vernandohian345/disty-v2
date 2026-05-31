import Navbar from "../../components/frontend/Navbar";
import Footer from "../../components/frontend/Footer";

import CertificationDetailHero from "../../components/frontend/certification/CertificationDetailHero";
import CertificationDetailContent from "../../components/frontend/certification/CertificationDetailContent";

export default function CertificationDetail() {
  return (
    <>
      <Navbar />

      <CertificationDetailHero />

      <CertificationDetailContent />

      <Footer />
    </>
  );
}
