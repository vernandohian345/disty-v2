import Navbar from "../../components/frontend/Navbar";
import Footer from "../../components/frontend/Footer";

import BootcampDetailHero from "../../components/frontend/bootcamp/BootcampDetailHero";
import BootcampDetailContent from "../../components/frontend/bootcamp/BootcampDetailContent";

export default function BootcampDetail() {
  return (
    <>
      <Navbar />

      <BootcampDetailHero />

      <BootcampDetailContent />

      <Footer />
    </>
  );
}
