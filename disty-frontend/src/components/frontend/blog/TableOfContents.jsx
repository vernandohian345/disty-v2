import { useEffect, useState } from "react";
export default function TableOfContents() {
  const [activeId, setActiveId] = useState("");
  const items = [
    {
      id: "mengapa-topik-ini-penting",
      title: "Mengapa Topik Ini Penting",
    },

    {
      id: "strategi-yang-bisa-dilakukan",
      title: "Strategi yang Bisa Dilakukan",
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = items.map((item) => document.getElementById(item.id));

      sections.forEach((section) => {
        if (!section) return;

        const rect = section.getBoundingClientRect();

        if (rect.top <= 140 && rect.bottom >= 140) {
          setActiveId(section.id);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="bg-white border border-slate-200 rounded-[32px] p-8 shadow-[0_10px_40px_rgba(0,0,0,0.04)]">
      <h3 className="text-xl font-black text-slate-900 mb-6">Daftar Isi</h3>

      <div className="space-y-4">
        {items.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={`block transition-all duration-300 ${
              activeId === item.id
                ? "text-orange-500 font-bold"
                : "text-slate-600 hover:text-orange-500"
            }`}
          >
            {item.title}
          </a>
        ))}
      </div>
    </div>
  );
}
