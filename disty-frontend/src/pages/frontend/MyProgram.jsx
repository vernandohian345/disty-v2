import { useEffect, useState } from "react";

import Navbar from "../../components/frontend/Navbar";
import Footer from "../../components/frontend/Footer";

import MyProgramHero from "../../components/frontend/my-program/MyProgramHero";

import PelatihanGrid from "../../components/frontend/my-program/PelatihanGrid";

import SertifikasiGrid from "../../components/frontend/my-program/SertifikasiGrid";

export default function MyProgram() {
  // ========================================
  // STATE
  // ========================================

  const [data, setData] = useState([]);

  const [sertifikasi, setSertifikasi] = useState([]);

  const [loading, setLoading] = useState(true);

  const [activeTab, setActiveTab] = useState("pelatihan");

  // ========================================
  // FETCH DATA
  // ========================================

  useEffect(() => {
    fetchData();
    fetchSertifikasi();
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

  const fetchSertifikasi = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch("http://127.0.0.1:8000/api/my-sertifikasi", {
        headers: {
          Authorization: `Bearer ${token}`,

          Accept: "application/json",
        },
      });

      const result = await response.json();

      setSertifikasi(result.data || []);
    } catch (error) {
      console.log(error);
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

          <MyProgramHero />

          <div className="mt-10 flex gap-4">
            <button
              onClick={() => setActiveTab("pelatihan")}
              className={`
      px-6 py-3 rounded-2xl font-semibold
      ${
        activeTab === "pelatihan"
          ? "bg-orange-500 text-white"
          : "bg-white border"
      }
    `}
            >
              Pelatihan
            </button>

            <button
              onClick={() => setActiveTab("sertifikasi")}
              className={`
                px-6 py-3 rounded-2xl font-semibold
                ${
                  activeTab === "sertifikasi"
                    ? "bg-orange-500 text-white"
                    : "bg-white border"
                }
              `}
            >
              Sertifikasi
            </button>
          </div>

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
              {activeTab === "pelatihan" && (
                <>
                  <PelatihanGrid data={data} />
                </>
              )}

              {activeTab === "sertifikasi" && (
                <>
                  <div className="mt-14">
                    <h2 className="text-3xl font-black text-[#2B1D16]">
                      Sertifikasi Saya
                    </h2>

                    <p className="mt-2 text-[#6b625d]">
                      Daftar sertifikasi yang telah Anda ikuti di Disty Academy.
                    </p>
                  </div>

                  <SertifikasiGrid data={sertifikasi} />
                </>
              )}
            </>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}
