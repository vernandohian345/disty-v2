import {
    FaFacebook,
    FaInstagram,
    FaLinkedin,
    FaMapMarkerAlt,
    FaPhoneAlt,
    FaEnvelope,
    FaGlobe,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-darkText text-white pt-24 pb-10">

      <div className="max-w-7xl mx-auto px-6 lg:px-10">

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
              Platform pembelajaran digital modern untuk meningkatkan skill dan kompetensi profesional generasi digital Indonesia.
            </p>

            {/* Social */}
            <div className="flex items-center gap-4 mt-8">

              <a
                href="#"
                className="w-12 h-12 rounded-2xl bg-slate-800 hover:bg-primary flex items-center justify-center transition"
              >
                <FaFacebook className="w-5 h-5" />
              </a>

              <a
                href="#"
                className="w-12 h-12 rounded-2xl bg-slate-800 hover:bg-primary flex items-center justify-center transition"
              >
                <FaInstagram className="w-5 h-5" />
              </a>

              <a
                href="#"
                className="w-12 h-12 rounded-2xl bg-slate-800 hover:bg-primary flex items-center justify-center transition"
              >
                <FaLinkedin className="w-5 h-5" />
              </a>

            </div>

          </div>

          {/* Navigation */}
          <div>

            <h3 className="text-xl font-bold mb-6">
              Navigasi
            </h3>

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

            <h3 className="text-xl font-bold mb-6">
              Program
            </h3>

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

            <h3 className="text-xl font-bold mb-6">
              Kontak
            </h3>

            <div className="space-y-5">

              <div className="flex gap-4">

                <FaMapMarkerAlt className="text-primary w-6 h-6 flex-shrink-0" />

                <p className="text-slate-400">
                  Surabaya, Jawa Timur, Indonesia
                </p>

              </div>

              <div className="flex gap-4">

                <FaPhoneAlt className="text-primary w-6 h-6 flex-shrink-0" />

                <p className="text-slate-400">
                  +62 812 3456 7890
                </p>

              </div>

              <div className="flex gap-4">

                <FaEnvelope className="text-primary w-6 h-6 flex-shrink-0" />

                <p className="text-slate-400">
                  info@distyakademi.com
                </p>

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