import { useEffect, useState } from "react";

import Navbar from "../../components/frontend/Navbar";
import Footer from "../../components/frontend/Footer";

import MyPelatihanHero from "../../components/frontend/my-pelatihan/MyPelatihanHero";

import ContinueLearning from "../../components/frontend/my-pelatihan/ContinueLearning";

import LearningStats from "../../components/frontend/my-pelatihan/LearningStats";

import PelatihanGrid from "../../components/frontend/my-pelatihan/PelatihanGrid";

import ActivityTimeline from "../../components/frontend/my-pelatihan/ActivityTimeline";

export default function MyPelatihan() {
  // ========================================
  // STATE
  // ========================================

  const [data, setData] = useState([]);

  const [loading, setLoading] = useState(true);

  // ========================================
  // FETCH DATA
  // ========================================

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch("http://127.0.0.1:8000/api/my-pelatihan", {
        headers: {
          Authorization: `Bearer ${token}`,

          Accept: "application/json",
        },
      });

      const result = await response.json();

      setData(result.data || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <section
        className="
          min-h-screen
          bg-[#fffaf5]
          py-24
        "
      >
        <div
          className="
            max-w-7xl
            mx-auto
            px-4
          "
        >
          {/* ========================================
              HERO SECTION
          ======================================== */}

          <MyPelatihanHero />

          {/* ========================================
              LOADING
          ======================================== */}

          {loading ? (
            <div
              className="
                mt-20
                text-center
                text-xl
                font-semibold
                text-black/50
              "
            >
              Memuat kelas...
            </div>
          ) : (
            <>
              {/* ========================================
                  CONTINUE LEARNING
              ======================================== */}

              <ContinueLearning data={data} />

              {/* ========================================
                  LEARNING STATS
              ======================================== */}

              <LearningStats data={data} />

              {/* ========================================
                  PELATIHAN GRID
              ======================================== */}

              <PelatihanGrid data={data} />

              {/* ========================================
                  ACTIVITY TIMELINE
              ======================================== */}

              <ActivityTimeline />
            </>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}
