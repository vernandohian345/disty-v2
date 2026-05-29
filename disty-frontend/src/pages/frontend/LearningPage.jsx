import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import Navbar from "../../components/frontend/Navbar";

import Footer from "../../components/frontend/Footer";

import LearningLayout from "../../components/frontend/Learning/LearningLayout";

export default function LearningPage() {
  // ========================================
  // GET ID
  // ========================================

  const { id } = useParams();

  // ========================================
  // STATE
  // ========================================

  const [course, setCourse] = useState(null);

  const [loading, setLoading] = useState(true);

  // ========================================
  // FETCH COURSE
  // ========================================

  useEffect(() => {
    fetchCourse();
  }, [id]);

  const fetchCourse = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch("http://127.0.0.1:8000/api/my-pelatihan", {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      const result = await response.json();

      const foundCourse = result.data.find(
        (item) => String(item.pelatihan?.id) === String(id),
      );

      console.log(foundCourse);

      if (!foundCourse) {
        setLoading(false);
        return;
      }

      // ========================================
      // FORMAT MATERI
      // ========================================

      const rawMateri = foundCourse?.pelatihan?.materi;

      let materiList = [];

      // ARRAY
      if (Array.isArray(rawMateri)) {
        materiList = rawMateri;
      }

      // STRING
      else if (typeof rawMateri === "string") {
        materiList = rawMateri
          .replace(/<[^>]*>/g, "")
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean);
      }

      // NULL / EMPTY
      else {
        materiList = ["Pengenalan Materi"];
      }

      // ========================================
      // FORMAT MODULES
      // ========================================

      const modules = materiList.map((item, index) => ({
        id: index + 1,

        title: item,

        duration: "15 Menit",

        completed: true,

        video: "https://youtu.be/u9u_E6TG5Ko?si=fCDaQiClNXD47MAF",

        materials: [item],
      }));

      // ========================================
      // FORMAT COURSE
      // ========================================

      const formattedCourse = {
        id: foundCourse.pelatihan.id,

        title: foundCourse.pelatihan.title,

        slug: foundCourse.pelatihan.slug,

        thumbnail: foundCourse.pelatihan.thumbnail_url,

        description: foundCourse.pelatihan.deskripsi,

        category: foundCourse.pelatihan.kategori,

        benefits: foundCourse.pelatihan.benefits || [],

        groupLink: foundCourse.pelatihan.link_grup,

        modules,
      };

      console.log(formattedCourse);

      setCourse(formattedCourse);
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
          bg-[#f8f5f2]
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
          {loading ? (
            <div className="text-center">Loading...</div>
          ) : course ? (
            <LearningLayout course={course} />
          ) : (
            <div className="text-center">
              <h1
                className="
                  text-5xl
                  font-black
                "
              >
                Kelas Tidak Ditemukan
              </h1>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}
