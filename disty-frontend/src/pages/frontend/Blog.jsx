import { getPublicBlogs } from "../../services/blogService";
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
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await getPublicBlogs();

        setBlogs(response.data.data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <>
      <Navbar />

      <BlogHero />

      <section id="blog-content" className="bg-[#fdfaf7] py-10 lg:py-20">
        <div className="max-w-[1800px] mx-auto px-3 sm:px-4 lg:px-6">
          <div className="grid lg:grid-cols-[320px_1fr] gap-5 lg:gap-10">
            {/* LEFT */}
            <BlogFilter
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />

            {/* RIGHT */}
            <BlogList
              blogs={blogs}
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
