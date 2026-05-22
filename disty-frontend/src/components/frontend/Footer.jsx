import { useNavigate } from "react-router-dom";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaGlobe,
  FaYoutube,
  FaTwitter,
} from "react-icons/fa";

export default function Footer() {
  const navigate = useNavigate();
  return (
    <footer className="relative overflow-hidden bg-gradient-to-b from-[#111827] via-[#0F172A] to-black text-white pt-24 pb-10">
      {/* Orange Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-orange-500/10 blur-[140px] rounded-full"></div>

      <div className="relative z-10 max-w-[1700px] mx-auto px-6 lg:px-8">
        {/* CTA SECTION */}
        <div className="relative mb-16">
          <div className="relative z-10 text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight text-white">
              Bangun Skill Masa Depan
              <span className="block text-orange-400">
                Bersama Disty Academy
              </span>
            </h2>
          </div>
        </div>
        {/* Top */}
        <div className="grid lg:grid-cols-4 gap-14">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3">
              <img
                src="/src/assets/images/logo-putih.png"
                alt="Disty Akademi"
                className="w-40 h-20 object-contain"
              />
            </div>

            <p className="mt-6 text-slate-400 leading-relaxed">
              Platform pembelajaran digital modern untuk meningkatkan skill dan
              kompetensi profesional generasi digital Indonesia.
            </p>

            {/* Social */}
            <div className="flex items-center gap-4 mt-8">
              <a
                href="#"
                className="w-16 h-12 rounded-2xl bg-slate-800 hover:bg-blue-600 flex items-center justify-center transition-all duration-300 hover:-translate-y-1"
              >
                <FaFacebook className="w-6 h-6" />
              </a>

              <a
                href="#"
                className="w-16 h-12 rounded-2xl bg-slate-800 hover:bg-pink-500 flex items-center justify-center transition-all duration-300 hover:-translate-y-1"
              >
                <FaInstagram className="w-6 h-6" />
              </a>

              <a
                href="#"
                className="w-16 h-12 rounded-2xl bg-slate-800 hover:bg-blue-500 flex items-center justify-center transition-all duration-300 hover:-translate-y-1"
              >
                <FaLinkedin className="w-6 h-6" />
              </a>

              <a
                href="#"
                className="w-16 h-12 rounded-2xl bg-slate-800 hover:bg-red-500 flex items-center justify-center transition-all duration-300 hover:-translate-y-1"
              >
                <FaYoutube className="w-6 h-6" />
              </a>

              <a
                href="#"
                className="w-16 h-12 rounded-2xl bg-slate-800 hover:bg-sky-500 flex items-center justify-center transition-all duration-300 hover:-translate-y-1"
              >
                <FaTwitter className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-xl font-bold mb-6">Navigasi</h3>

            <ul className="space-y-4 text-slate-400">
              <li>
                <a href="#" className="hover:text-primary transition">
                  Beranda
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-primary transition">
                  Program
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-primary transition">
                  Artikel
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-primary transition">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Program */}
          <div>
            <h3 className="text-xl font-bold mb-6">Program</h3>

            <ul className="space-y-4 text-slate-400">
              <li>
                <a href="#" className="hover:text-primary transition">
                  UI/UX Design
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-primary transition">
                  Web Development
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-primary transition">
                  Digital Marketing
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-primary transition">
                  Data Science
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-bold mb-6">Kontak</h3>

            <div className="space-y-5">
              <div className="flex gap-4">
                <FaMapMarkerAlt className="text-primary w-6 h-6 flex-shrink-0" />

                <p className="text-slate-400">
                  Surabaya, Jawa Timur, Indonesia
                </p>
              </div>

              <div className="flex gap-4">
                <FaPhoneAlt className="text-primary w-6 h-6 flex-shrink-0" />

                <p className="text-slate-400">+62 021 1234-5678</p>
              </div>

              <div className="flex gap-4">
                <FaEnvelope className="text-primary w-6 h-6 flex-shrink-0" />

                <p className="text-slate-400">info@distyakademi.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-slate-800 mt-16 pt-8 flex flex-col lg:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm">
            © 2026 Disty Akademi. All rights reserved.
          </p>

          <div className="flex items-center gap-6 text-sm text-slate-500">
            <a href="#" className="hover:text-primary transition">
              Privacy Policy
            </a>

            <a href="#" className="hover:text-primary transition">
              Terms & Conditions
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
