export default function BlogContent({ blog }) {
  return (
    <div className="bg-white border-slate-200 rounded-[40px] p-8 lg:p-12 xl:p-16 shadow-[0_10px_40px_rgba(0,0,0,0.04)]">
      <div
        className="
          prose prose-lg lg:prose-xl max-w-none
          prose-headings:text-slate-900
          prose-p:text-slate-600
          prose-p:leading-8
          prose-p:text-[1.05rem]
          prose-headings:font-black
          prose-headings:mt-12
          prose-headings:mb-6
          prose-headings:scroll-mt-32
          prose-img:rounded-3xl
          prose-strong:text-slate-900
          prose-li:text-slate-600
          prose-li:marker:text-orange-500
          prose-blockquote:border-orange-500
          prose-blockquote:text-slate-700
          prose-a:text-orange-500
          prose-a:no-underline
          hover:prose-a:underline
          [&_p]:mb-8
        "
        dangerouslySetInnerHTML={{
          __html: blog.content,
        }}
      />
    </div>
  );
}
