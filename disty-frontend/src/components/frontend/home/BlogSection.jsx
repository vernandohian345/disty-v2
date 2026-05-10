import blogImg from "../../../assets/images/magangdisty.png";

export default function BlogSection() {

    const blogs = [
        {
            title: "Pengumuman Seleksi Magang Mandiri Debugging 2",
            date: "2 Sept 2025",
        },
        {
            title: "Tips Sukses Menjadi Full-Stack Developer",
            date: "28 Ags 2025",
        },
        {
            title: "Kisah Sukses Alumni Bootcamp UI/UX Design",
            date: "15 Ags 2025",
        },
        {
            title: "Peluncuran Program Baru Data Science",
            date: "1 Ags 2025",
        },
    ];

    return (
        <section className="py-5" id="blog">

            <div className="container">

                <div className="text-center mb-5">
                    <h2 className="section-title">
                        Berita & Blog Terakhir Kami
                    </h2>
                </div>

                <div className="row g-4">

                    {blogs.map((blog, index) => (

                        <div
                            className="col-lg-3 col-md-6"
                            key={index}
                        >

                            <div className="card blog-card h-100">

                                <img
                                    src={blogImg}
                                    className="card-img-top"
                                    alt={blog.title}
                                />

                                <div className="card-body">

                                    <p className="text-muted small mb-1">
                                        <i className="far fa-calendar-alt"></i>
                                        {" "}
                                        {blog.date}
                                    </p>

                                    <h5 className="card-title">

                                        <a
                                            href="/detail-blog"
                                            className="stretched-link text-dark text-decoration-none"
                                        >
                                            {blog.title}
                                        </a>

                                    </h5>

                                    <p className="card-text text-muted small">
                                        Admin Disty Akademi
                                    </p>

                                </div>

                            </div>

                        </div>

                    ))}

                </div>

                <div className="text-center mt-5">

                    <a
                        href="/blog"
                        className="btn btn-orange"
                    >
                        Lihat Berita Lainnya
                    </a>

                </div>

            </div>

        </section>
    );
}