import Button from "../../ui/Button";
import Reveal from "../../ui/Reveal";

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPublicBlogs } from "../../../services/blogService";

export default function BlogSection() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const latestBlogs = blogs.slice(0, 3);

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

  if (loading) {
    return (
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-[420px] rounded-[32px] bg-slate-100 animate-pulse"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-80 h-80 bg-purpleAccent/10 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Heading */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-[#f9c115] px-4 py-2 rounded-full text-sm font-semibold mb-6">
              Blog & Artikel
            </div>

            <h2 className="text-4xl lg:text-5xl font-black text-darkText leading-tight">
              Update Insight &
              <span className="text-[#f9c115] block">
                Informasi Digital Terbaru
              </span>
            </h2>
          </div>

          <Link
            to="/blog"
            className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-2xl font-semibold transition-all duration-300"
          >
            Lihat Semua Artikel
          </Link>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
          {latestBlogs.map((blog, index) => (
            <Reveal key={index} delay={index * 0.15}>
              <Link key={index} to={`/blog/${blog.slug}`}>
                <div className="group bg-white rounded-[32px] overflow-hidden shadow-soft hover:-translate-y-3 hover:shadow-2xl transition-all duration-500">
                  {/* Image */}
                  <div className="overflow-hidden">
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="w-full h-64 object-cover group-hover:scale-110 transition duration-700"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-8">
                    {/* Top Info */}
                    <div className="flex items-center justify-between mb-5">
                      <span className="bg-primary/10 text-orange-300 px-4 py-2 rounded-full text-sm font-semibold">
                        {blog.category}
                      </span>

                      <span className="text-sm text-slate-500">
                        {new Date(blog.createdAt).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl font-bold text-darkText leading-snug group-hover:text-primary transition">
                      {blog.title}
                    </h3>

                    {/* Description */}
                    <p className="mt-4 text-slate-600 leading-relaxed">
                      {blog.description?.slice(0, 100)}...
                    </p>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
