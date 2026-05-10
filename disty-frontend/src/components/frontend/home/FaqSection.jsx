export default function FaqSection() {

    const faqs = [
        {
            question: "Apa itu Disty Akademi?",
            answer:
                "Disty Akademi adalah platform pelatihan dan sertifikasi online yang menyediakan program pembelajaran fleksibel dengan mentor berpengalaman dan sertifikat resmi.",
        },

        {
            question: "Apa saja fitur Disty Akademi?",
            answer:
                "Kami menyediakan kelas interaktif, kurikulum terstruktur, studi kasus nyata, grup mentoring, materi yang bisa diakses ulang, dan sertifikat resmi.",
        },

        {
            question: "Bagaimana cara mendaftar program?",
            answer:
                "Anda dapat mendaftar melalui website kami dengan memilih program yang diinginkan, mengisi formulir pendaftaran, dan melakukan pembayaran sesuai instruksi.",
        },

        {
            question: "Apakah sertifikat yang diberikan diakui?",
            answer:
                "Ya, sertifikat yang kami berikan diakui secara nasional oleh BNSP (Badan Nasional Sertifikasi Profesi) dan dihargai oleh industri.",
        },
    ];

    return (
        <section className="faq-section py-5" id="faq">

            <div className="container">

                <div className="text-center mb-5">
                    <h2 className="section-title">
                        Pertanyaan yang Sering Diajukan
                    </h2>
                </div>

                <div className="row justify-content-center">

                    <div className="col-lg-8">

                        <div
                            className="accordion"
                            id="faqAccordion"
                        >

                            {faqs.map((faq, index) => (

                                <div
                                    className="accordion-item border-0 mb-3 faq-item"
                                    key={index}
                                >

                                    <h2 className="accordion-header">

                                        <button
                                            className={`accordion-button ${index !== 0 ? "collapsed" : ""}`}
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target={`#faq${index}`}
                                        >
                                            {faq.question}
                                        </button>

                                    </h2>

                                    <div
                                        id={`faq${index}`}
                                        className={`accordion-collapse collapse ${index === 0 ? "show" : ""}`}
                                        data-bs-parent="#faqAccordion"
                                    >

                                        <div className="accordion-body">
                                            {faq.answer}
                                        </div>

                                    </div>

                                </div>

                            ))}

                        </div>

                    </div>

                </div>

            </div>

        </section>
    );
}