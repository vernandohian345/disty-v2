import Navbar from "../../components/frontend/Navbar";
import Footer from "../../components/frontend/Footer";

import { Link } from "react-router-dom";

export default function Success() {
  return (
    <>
      <section className="relative overflow-hidden bg-[#fffaf5] py-32">
        {/* Glow */}
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-orange-300/20 blur-3xl rounded-full"></div>

        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <div className="bg-white border border-orange-100 rounded-[40px] p-10 lg:p-16 text-center shadow-sm">
            {/* Success Icon */}
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
              Terima kasih telah mendaftar program di Disty Academy. Data
              pendaftaran Anda telah berhasil diterima dan sedang diproses oleh
              sistem.
            </p>

            {/* Status Card */}
            <div className="mt-10 rounded-[32px] bg-orange-50 border border-orange-100 p-8">
              <h3 className="text-xl font-bold text-[#2B1D16] mb-3">
                Langkah Selanjutnya
              </h3>

              <ul className="space-y-3 text-[#6b625d] text-left max-w-xl mx-auto">
                <li>
                  ✓ Cek email dan WhatsApp secara berkala untuk mendapatkan
                  informasi terbaru.
                </li>

                <li>
                  ✓ Jika Anda melakukan pembayaran, tim admin akan melakukan
                  verifikasi bukti pembayaran terlebih dahulu.
                </li>

                <li>
                  ✓ Status pendaftaran dapat dipantau melalui halaman Profil.
                </li>
              </ul>
            </div>

            {/* Status Badge */}
            <div className="mt-8 inline-flex items-center gap-2 px-5 py-3 rounded-full bg-yellow-100 text-yellow-700 font-semibold">
              ⏳ Menunggu Verifikasi Admin
            </div>

            {/* Buttons */}
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/profile"
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
                Lihat Profil Saya
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
