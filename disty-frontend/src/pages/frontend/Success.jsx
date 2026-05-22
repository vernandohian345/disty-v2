import Navbar from "../../components/frontend/Navbar";
import Footer from "../../components/frontend/Footer";

import { Link } from "react-router-dom";

export default function Success() {
  return (
    <>
      <Navbar />

      <section className="relative overflow-hidden bg-[#fffaf5] py-32">
        {/* Glow */}
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-orange-300/20 blur-3xl rounded-full"></div>

        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <div className="bg-white border border-orange-100 rounded-[40px] p-10 lg:p-16 text-center shadow-sm">
            {/* Icon */}
            <div className="flex items-center justify-center w-24 h-24 rounded-full bg-orange-500 text-white text-5xl mx-auto shadow-lg shadow-orange-500/20">
              ✓
            </div>

            {/* Heading */}
            <h1 className="mt-10 text-4xl lg:text-6xl font-black text-[#2B1D16] leading-tight">
              Pendaftaran
              <span className="block text-orange-500">Berhasil</span>
            </h1>

            {/* Description */}
            <p className="mt-6 text-lg text-[#6b625d] leading-relaxed max-w-2xl mx-auto">
              Terima kasih telah mendaftar pelatihan di Disty Academy. Informasi
              akses pembelajaran dan detail selanjutnya akan dikirim melalui
              email atau WhatsApp yang telah didaftarkan.
            </p>

            {/* Info */}
            <div className="mt-10 rounded-[32px] bg-orange-50 border border-orange-100 p-6">
              <p className="text-[#2B1D16] font-semibold">
                Mohon cek email dan WhatsApp secara berkala untuk informasi
                akses pembelajaran dan update pelatihan.
              </p>
            </div>

            {/* Button */}
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/pelatihan"
                className="
                  h-14
                  px-8
                  rounded-2xl
                  bg-orange-500
                  hover:bg-orange-400
                  text-white
                  font-semibold
                  transition-all
                  duration-300
                  flex
                  items-center
                  justify-center
                "
              >
                Kembali ke Pelatihan
              </Link>

              <Link
                to="/"
                className="
                  h-14
                  px-8
                  rounded-2xl
                  border border-orange-100
                  bg-white
                  hover:border-orange-300
                  text-[#2B1D16]
                  font-semibold
                  transition-all
                  duration-300
                  flex
                  items-center
                  justify-center
                "
              >
                Kembali ke Beranda
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
