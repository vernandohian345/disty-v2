import { useEffect, useState } from "react";
import Navbar from "../../components/frontend/Navbar";
import Footer from "../../components/frontend/Footer";

import BlogHero from "../../components/frontend/blog/BlogHero";
import BlogFilter from "../../components/frontend/blog/BlogFilter";
import BlogList from "../../components/frontend/blog/BlogList";

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [sortType, setSortType] = useState("Terbaru");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Navbar />

      <BlogHero />

      <section id="blog-content" className="bg-[#fdfaf7] py-20">
        <div className="max-w-[1800px] mx-auto px-4 lg:px-6">
          <div className="grid lg:grid-cols-[280px_1fr] gap-10">
            {/* LEFT */}
            <BlogFilter
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />

            {/* RIGHT */}
            <BlogList
              activeCategory={activeCategory}
              sortType={sortType}
              setSortType={setSortType}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              searchQuery={searchQuery}
              loading={loading}
            />
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
