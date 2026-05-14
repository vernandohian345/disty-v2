import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "Apa itu Disty Akademi?",
    answer:
      "Disty Akademi adalah platform pembelajaran digital yang menyediakan bootcamp, pelatihan, dan sertifikasi profesional untuk meningkatkan skill digital.",
  },

  {
    question: "Apakah sertifikat resmi?",
    answer:
      "Ya, sertifikat yang diberikan dapat digunakan sebagai bukti kompetensi profesional dan mendukung pengembangan karir.",
  },

  {
    question: "Apakah program cocok untuk pemula?",
    answer:
      "Tentu. Program kami dirancang mulai dari level pemula hingga profesional dengan mentor berpengalaman.",
  },

  {
    question: "Bagaimana sistem pembelajarannya?",
    answer:
      "Pembelajaran dilakukan secara online dengan materi interaktif, live session, mentoring, dan project nyata.",
  },
];

export default function FAQSection() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-primary/10 rounded-full blur-3xl"></div>

      <div className="max-w-4xl mx-auto px-6 lg:px-10">
        {/* Heading */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-[#f9c115] px-4 py-2 rounded-full text-sm font-semibold mb-6">
            Frequently Asked Questions
          </div>

          <h2 className="text-4xl lg:text-5xl font-black text-darkText leading-tight">
            Pertanyaan yang
            <span className="text-[#f9c115] block">Sering Ditanyakan</span>
          </h2>

          <p className="mt-6 text-lg text-slate-600 leading-relaxed">
            Temukan jawaban dari berbagai pertanyaan umum seputar program dan
            layanan Disty Akademi.
          </p>
        </div>

        {/* FAQ Items */}
        <div className="mt-16 space-y-5">
          {faqs.map((faq, index) => {
            const isOpen = activeIndex === index;

            return (
              <div
                key={index}
                className="bg-background rounded-3xl p-6 shadow-soft"
              >
                {/* Question */}
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between text-left"
                >
                  <h3 className="text-xl font-bold text-darkText pr-5">
                    {faq.question}
                  </h3>

                  <ChevronDown
                    className={`w-6 h-6 text-primary transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Answer */}
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    isOpen ? "max-h-40 mt-5" : "max-h-0"
                  }`}
                >
                  <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
