import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function AboutCTA() {
  const navigate = useNavigate();

  return (
    <section className="relative pt-10 pb-28 bg-[#fffaf5]">
      {/* Glow */}
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-orange-100 blur-3xl opacity-60 rounded-full"></div>

      <div className="max-w-6xl mx-auto px-6 lg:px-10 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="
            relative
            overflow-hidden
            rounded-[40px]
            bg-gradient-to-br
            from-[#1f140f]
            via-[#2B1D16]
            to-[#3b2518]
            px-8
            py-20
            lg:px-20
            text-center
          "
        >
          {/* Orange Glow */}
          <div className="absolute top-0 left-0 w-[350px] h-[350px] bg-orange-500/20 blur-3xl rounded-full"></div>

          <div className="relative z-10 grid lg:grid-cols-2 gap-14 items-center">
            <div>
              {/* Description */}
              <p className="text-sm lg:text-base text-white/75 leading-relaxed max-w-xl">
                Hubungi Disty Academy untuk informasi pelatihan, sertifikasi,
                dan pengembangan skill digital yang dirancang sesuai kebutuhan
                kompetensi modern.
              </p>

              {/* Office */}
              <div className="mt-8 inline-flex items-center gap-3 bg-white/5 border border-white/10 backdrop-blur-xl px-5 py-3 rounded-2xl">
                {/* Icon */}
                <svg
                  className="w-5 h-5 text-orange-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z"
                  />

                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>

                <p className="text-sm text-white/80">
                  Jombang, Jawa Timur, Indonesia
                </p>
              </div>

              {/* Button */}
              <div className="mt-7">
                <button
                  onClick={() =>
                    window.open("https://wa.me/628123456789", "_blank")
                  }
                  className="
                    bg-orange-500
                    hover:bg-orange-600
                    text-white
                    font-semibold
                    px-8
                    py-3.5
                    rounded-2xl
                    transition-all duration-300
                "
                >
                  Hubungi Kami
                </button>
              </div>
            </div>
            {/* Right Map */}
            <div className="relative">
              <div
                className="
                    overflow-hidden
                    rounded-[32px]
                    border
                    border-white/10
                    shadow-2xl
                "
              >
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3954.67035706234!2d112.24066197500325!3d-7.610803192404371!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e786bf0e0ff7dd9%3A0xd73ac159deb8e1f6!2sGraha%20Disty!5e0!3m2!1sen!2sid!4v1779083329031!5m2!1sen!2sid"
                  width="100%"
                  height="420"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="grayscale hover:grayscale-0 transition-all duration-500"
                ></iframe>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
