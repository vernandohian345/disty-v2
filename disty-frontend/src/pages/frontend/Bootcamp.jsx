import Navbar from "../../components/frontend/Navbar";
import Footer from "../../components/frontend/Footer";

import BootcampHero from "../../components/frontend/bootcamp/BootcampHero";
import BootcampSection from "../../components/frontend/bootcamp/BootcampSection";

export default function Bootcamp() {
  return (
    <>
      <Navbar />

      <BootcampHero />

      <BootcampSection />

      <Footer />
    </>
  );
}
