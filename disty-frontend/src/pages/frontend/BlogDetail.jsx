import Navbar from "../../components/frontend/Navbar";
import Footer from "../../components/frontend/Footer";
import { getPublicBlog, getPublicBlogs } from "../../services/blogService";
import BlogShare from "../../components/frontend/blog/BlogShare";
import RelatedArticles from "../../components/frontend/blog/RelatedArticles";
import BlogContent from "../../components/frontend/blog/BlogContent";

import { CalendarDays, Eye, Clock3, Share2, ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useParams, Link } from "react-router-dom";

export default function BlogDetail() {
  const { slug } = useParams();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [copied, setCopied] = useState(false);
  const [blog, setBlog] = useState(null);

  const [relatedArticles, setRelatedArticles] = useState([]);

  const [loading, setLoading] = useState(true);
  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(window.location.href);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await getPublicBlog(slug);

        setBlog(response.data.data);

        const relatedResponse = await getPublicBlogs();

        const related = relatedResponse.data.data.data
          .filter(
            (item) =>
              item.category === response.data.data.category &&
              item.slug !== slug,
          )
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 3);

        setRelatedArticles(related);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [slug]);

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

  if (loading) {
    return (
      <>
        <Navbar />

        <section className="bg-[#fdfaf7] pt-36 pb-24 animate-pulse">
          <div className="max-w-[1400px] mx-auto px-4 lg:px-6">
            {/* Top */}
            <div className="max-w-4xl mx-auto text-center">
              <div className="w-32 h-10 bg-slate-200 rounded-full mx-auto mb-6"></div>

              <div className="h-14 bg-slate-200 rounded-2xl mb-4"></div>

              <div className="h-14 bg-slate-200 rounded-2xl w-3/4 mx-auto"></div>

              <div className="flex justify-center gap-4 mt-8">
                <div className="w-24 h-5 bg-slate-200 rounded-full"></div>

                <div className="w-24 h-5 bg-slate-200 rounded-full"></div>

                <div className="w-24 h-5 bg-slate-200 rounded-full"></div>
              </div>
            </div>

            {/* Hero */}
            <div className="mt-14 max-w-6xl mx-auto h-[550px] bg-slate-200 rounded-[40px]"></div>

            {/* Content */}
            <div className="grid xl:grid-cols-[minmax(0,1fr)_320px] gap-10 mt-16">
              {/* LEFT */}
              <div className="bg-white rounded-[40px] p-10 space-y-6">
                <div className="h-6 bg-slate-200 rounded w-full"></div>

                <div className="h-6 bg-slate-200 rounded w-5/6"></div>

                <div className="h-6 bg-slate-200 rounded w-4/6"></div>

                <div className="h-6 bg-slate-200 rounded w-full"></div>

                <div className="h-6 bg-slate-200 rounded w-3/4"></div>
              </div>

              {/* RIGHT */}
              <div className="space-y-6">
                <div className="bg-white rounded-3xl h-40"></div>

                <div className="bg-white rounded-3xl h-72"></div>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-3xl font-bold">Artikel tidak ditemukan</h1>
      </div>
    );
  }

  <Helmet>
    <title>{blog.title} | Disty Akademi</title>

    <meta name="description" content={blog.excerpt} />

    <meta property="og:title" content={blog.title} />

    <meta property="og:description" content={blog.excerpt} />

    <meta property="og:image" content={blog.image} />

    <meta property="og:type" content="article" />
  </Helmet>;

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

                  <span>
                    {new Date(blog.createdAt).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Eye size={18} />

                  <span>{blog.views} Views</span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-sm font-bold text-orange-500 uppercase">
                    {blog.author?.charAt(0) || "D"}
                  </div>
                  <span>{blog.author || "Disty Akademi"}</span>
                </div>
              </div>

              {/* Excerpt */}
              {blog.excerpt && (
                <div className="max-w-3xl mx-auto mt-10">
                  <p className="text-xl md:text-2xl leading-relaxed text-slate-500 text-center font-medium">
                    {blog.excerpt}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Hero Image */}
          <div className="mt-14 max-w-6xl mx-auto overflow-hidden rounded-[40px] shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
            <img
              src={blog.image}
              alt={blog.title}
              loading="lazy"
              className="w-full h-[550px] object-cover"
              onError={(e) => {
                e.target.src =
                  "https://placehold.co/1200x700/f8fafc/94a3b8?text=Disty+Blog";
              }}
            />
          </div>

          {/* Content Layout */}
          <div className="grid xl:grid-cols-[minmax(0,1fr)_320px] gap-10 mt-16 items-start">
            {/* LEFT */}
            <main className="min-w-0">
              <BlogContent blog={blog} />
            </main>

            {/* RIGHT */}
            <aside className="sticky top-28 self-start space-y-8">
              <BlogShare copied={copied} handleCopyLink={handleCopyLink} />

              <RelatedArticles relatedArticles={relatedArticles} />
            </aside>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
