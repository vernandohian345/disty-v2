export default function BlogContent({ blog }) {
  return (
    <div className="bg-white border border-slate-200 rounded-[40px] p-8 lg:p-12 xl:p-16 shadow-[0_10px_40px_rgba(0,0,0,0.04)]">
      <div className="prose prose-lg lg:prose-xl max-w-none prose-headings:text-slate-900 prose-p:text-slate-600 prose-p:leading-8 prose-p:mb-6 prose-headings:font-black prose-headings:mt-12 prose-headings:mb-6 prose-strong:text-slate-900 prose-li:text-slate-600 prose-li:marker:text-orange-500">
        <p className="text-xl leading-9 text-slate-700">{blog.description}</p>

        <div className="w-20 h-1 bg-orange-500 rounded-full my-10"></div>

        <h2 id="mengapa-topik-ini-penting">Mengapa Topik Ini Penting?</h2>

        <p>
          Di era digital modern, perkembangan teknologi dan informasi bergerak
          sangat cepat. Memahami tren terbaru membantu individu maupun
          perusahaan untuk tetap relevan dan kompetitif.
        </p>

        <p>
          Artikel ini membahas bagaimana strategi digital dapat membantu
          meningkatkan kualitas karir, bisnis, dan kemampuan profesional di masa
          depan.
        </p>

        <blockquote className="border-l-4 border-orange-500 pl-6 italic text-slate-700 font-medium">
          Teknologi bukan hanya alat, tetapi peluang besar untuk berkembang.
        </blockquote>

        <h2 id="strategi-yang-bisa-dilakukan">Strategi yang Bisa Dilakukan</h2>

        <p>
          Mulailah dengan membangun kemampuan dasar, memperluas networking, dan
          mengikuti perkembangan industri secara konsisten.
        </p>

        <ul>
          <li>Belajar skill digital secara bertahap</li>

          <li>Membangun personal branding</li>

          <li>Mengikuti tren industri terbaru</li>

          <li>Membuat portfolio profesional</li>
        </ul>

        <p>
          Dengan konsistensi dan strategi yang tepat, peluang berkembang di
          dunia digital akan semakin terbuka luas.
        </p>
      </div>
    </div>
  );
}
