import Navbar from "../../components/frontend/Navbar";
import Footer from "../../components/frontend/Footer";
import blogs from "../../data/blogs";
import BlogShare from "../../components/frontend/blog/BlogShare";
import RelatedArticles from "../../components/frontend/blog/RelatedArticles";
import BlogContent from "../../components/frontend/blog/BlogContent";
import TableOfContents from "../../components/frontend/blog/TableOfContents";

import { CalendarDays, Eye, Clock3, Share2, ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export default function BlogDetail() {
  const { slug } = useParams();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [copied, setCopied] = useState(false);
  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(window.location.href);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };
  const blog = blogs.find((item) => item.slug === slug);
  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-3xl font-bold">Artikel tidak ditemukan</h1>
      </div>
    );
  }
  const relatedArticles = blogs
    .filter((item) => item.category === blog.category && item.slug !== slug)
    .slice(0, 3);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

      const scrollTop = document.documentElement.scrollTop;

      const progress = (scrollTop / totalHeight) * 100;

      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div className="fixed top-0 left-0 w-full h-1 bg-transparent z-[9999]">
        <div
          className="h-full bg-orange-500 transition-all duration-150"
          style={{
            width: `${scrollProgress}%`,
          }}
        />
      </div>
      <Navbar />

      <section className="bg-[#fdfaf7] pt-28 pb-24">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-6">
          {/* Top */}
          <div className="max-w-6xl mx-auto mb-6">
            <Link
              to="/blog"
              className="group inline-flex items-center gap-3 bg-white/90 backdrop-blur-xl border border-slate-200 px-5 py-3 rounded-2xl text-slate-600 hover:text-orange-500 hover:border-orange-200 transition-all duration-300 shadow-sm"
            >
              <ArrowLeft
                size={18}
                className="group-hover:-translate-x-1 transition-all duration-300"
              />

              <span className="font-medium">Kembali ke Artikel</span>
            </Link>
            <div className="text-center">
              {/* Badge */}
              <div className="inline-flex items-center bg-orange-100 text-orange-500 px-5 py-2 rounded-full font-semibold mb-6">
                {blog.category}
              </div>

              {/* Title */}
              <h1 className="text-4xl md:text-6xl font-black text-slate-900 leading-tight">
                {blog.title}
              </h1>

              {/* Meta */}
              <div className="flex flex-wrap items-center justify-center gap-6 mt-8 text-sm text-slate-500">
                <div className="flex items-center gap-2">
                  <CalendarDays size={18} />

                  <span>{blog.date}</span>
                </div>

                <div className="flex items-center gap-2">
                  <Eye size={18} />

                  <span>{blog.views} Views</span>
                </div>

                <div className="flex items-center gap-2">
                  <Clock3 size={18} />

                  <span>{blog.readTime}</span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-sm font-bold text-orange-500">
                    D
                  </div>

                  <span>Disty Akademi</span>
                </div>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="mt-14 max-w-6xl mx-auto overflow-hidden rounded-[40px] shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
            <img
              src={blog.image}
              alt=""
              className="w-full h-[550px] object-cover"
            />
          </div>

          {/* Content Layout */}
          <div className="grid xl:grid-cols-[minmax(0,1fr)_320px] gap-10 mt-16 items-start">
            {/* LEFT */}
            <main className="min-w-0">
              <BlogContent blog={blog} />

              <RelatedArticles relatedArticles={relatedArticles} />
            </main>

            {/* RIGHT */}
            <aside className=" xl:top-28 h-fit space-y-8">
              <BlogShare copied={copied} handleCopyLink={handleCopyLink} />

              <TableOfContents />
            </aside>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
