import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

export default function BootcampDetailHero() {
  const { slug } = useParams();

  const [bootcamp, setBootcamp] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBootcamp();
  }, [slug]);

  const fetchBootcamp = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        `http://127.0.0.1:8000/api/frontend/pelatihan/${slug}`
      );

      setBootcamp(response.data.pelatihan);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // LOADING
  // =========================
  if (loading) {
    return (
      <section
        className="
          bg-[#fffaf5]
          py-10
        "
      >
        <div
          className="
            max-w-[1800px]
            mx-auto
            px-4
          "
        >
          <div
            className="
              h-[700px]
              rounded-[32px]
              bg-slate-200
              animate-pulse
            "
          ></div>
        </div>
      </section>
    );
  }

  // =========================
  // NOT FOUND
  // =========================
  if (!bootcamp) {
    return (
      <section
        className="
          py-20
          text-center
        "
      >
        <h1
          className="
            text-4xl
            font-black
          "
        >
          Pelatihan Tidak Ditemukan
        </h1>
      </section>
    );
  }

  return (
    <section
      className="
        relative
        overflow-hidden
        bg-[#fffaf5]
      "
    >
      <div
        className="
          max-w-[1800px]
          mx-auto
          px-4
          lg:px-6
          py-6
        "
      >
        {/* CONTAINER */}
        <div
          className="
            relative
            overflow-hidden
            rounded-[32px]
            min-h-[700px]
            bg-[#1f140f]
          "
        >
          {/* BACKGROUND */}
          <div
            className="
              absolute
              inset-0
            "
          >
            <img
              src={bootcamp.thumbnail_url}
              alt={bootcamp.title}
              className="
                w-full
                h-full
                object-cover
                object-center
              "
            />

            {/* OVERLAY */}
            <div
              className="
                absolute
                inset-0
                bg-gradient-to-r
                from-[#140d09]/95
                via-[#140d09]/85
                to-black/40
              "
            ></div>
          </div>

          {/* GLOW */}
          <div
            className="
              absolute
              top-0
              left-0
              w-[500px]
              h-[500px]
              bg-orange-500/20
              blur-3xl
              rounded-full
            "
          ></div>

          {/* CONTENT */}
          <div
            className="
              relative
              z-10
              flex
              items-end
              min-h-[700px]
              px-6
              py-14
              sm:px-10
              lg:px-16
            "
          >
            <div className="max-w-3xl">
              {/* CATEGORY */}
              <div
                className="
                  inline-flex
                  items-center
                  gap-2
                  bg-white/10
                  backdrop-blur-xl
                  border
                  border-white/10
                  text-white
                  px-5
                  py-2
                  rounded-full
                  text-sm
                  font-semibold
                  capitalize
                "
              >
                {bootcamp.kategori}
              </div>

              {/* TITLE */}
              <h1
                className="
                  mt-6
                  text-4xl
                  sm:text-5xl
                  lg:text-7xl
                  font-black
                  leading-[1.05]
                  text-white
                "
              >
                {bootcamp.title}
              </h1>

              {/* DESCRIPTION */}
              <p
                className="
                  mt-6
                  text-base
                  sm:text-lg
                  text-white/70
                  leading-relaxed
                  max-w-2xl
                "
              >
                {bootcamp.short_description}
              </p>

              {/* INFO */}
              <div
                className="
                  mt-10
                  flex
                  flex-col
                  sm:flex-row
                  flex-wrap
                  items-start
                  sm:items-center
                  gap-8
                "
              >
                {/* DURASI */}
                <div>
                  <p
                    className="
                      text-white/50
                      text-sm
                      uppercase
                      tracking-widest
                    "
                  >
                    Durasi
                  </p>

                  <h3
                    className="
                      mt-2
                      text-xl
                      font-bold
                      text-white
                    "
                  >
                    {bootcamp.durasi}
                  </h3>
                </div>

                {/* DIVIDER */}
                <div
                  className="
                    w-px
                    h-12
                    hidden
                    sm:block
                    bg-white/10
                  "
                ></div>

                {/* LEVEL */}
                <div>
                  <p
                    className="
                      text-white/50
                      text-sm
                      uppercase
                      tracking-widest
                    "
                  >
                    Level
                  </p>

                  <h3
                    className="
                      mt-2
                      text-xl
                      font-bold
                      text-white
                    "
                  >
                    {bootcamp.level}
                  </h3>
                </div>

                {/* DIVIDER */}
                <div
                  className="
                    w-px
                    h-12
                    hidden
                    sm:block
                    bg-white/10
                  "
                ></div>

                {/* HARGA */}
                <div>
                  <p
                    className="
                      text-white/50
                      text-sm
                      uppercase
                      tracking-widest
                    "
                  >
                    Harga
                  </p>

                  <h3
                    className="
                      mt-2
                      text-xl
                      font-bold
                      text-orange-400
                    "
                  >
                    {bootcamp.kategori === "gratis"
                      ? "Gratis"
                      : `Rp ${Number(
                          bootcamp.harga
                        ).toLocaleString("id-ID")}`}
                  </h3>
                </div>
              </div>

              {/* CTA */}
              <div
                className="
                  mt-12
                  flex
                  flex-col
                  sm:flex-row
                  gap-4
                "
              >
                {/* BUTTON */}
                <Link
                  to={`/checkout/${bootcamp.slug}`}
                  className="
                    w-full
                    bg-orange-500
                    hover:bg-orange-400
                    text-white
                    py-4
                    rounded-2xl
                    font-semibold
                    transition-all
                    duration-300
                    shadow-lg
                    shadow-orange-500/20
                    flex
                    items-center
                    justify-center
                  "
                >
                  Daftar Sekarang
                </Link>

                {/* WHATSAPP */}
                <a
                  href={`https://wa.me/6281234567890?text=Halo Disty Academy, saya ingin bertanya tentang pelatihan ${bootcamp.title}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    w-full
                    bg-[#2B1D16]
                    hover:bg-black
                    text-white
                    py-4
                    rounded-2xl
                    font-semibold
                    transition-all
                    duration-300
                    flex
                    items-center
                    justify-center
                  "
                >
                  Hubungi Kami
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}