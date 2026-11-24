interface TempleContentProps {
  contentHtml?: string;
}
export default function TempleContent({ contentHtml }: TempleContentProps) {
    if (!contentHtml) {
        return null;
    }
    return (
        <section className="mb-12">
      <h2 className="text-2xl font-bold text-slate-900 mb-6 pb-2 border-b border-slate-200">
        About The Temple & History
      </h2>

      {/* Tailwind Typography with Modern Editorial Rules */}
      <div
        className="prose prose-slate prose-lg max-w-none
                   prose-headings:font-bold prose-headings:text-slate-900
                   prose-p:text-slate-700 prose-p:leading-relaxed
                   prose-a:text-emerald-700 prose-a:font-semibold hover:prose-a:text-emerald-800
                   prose-strong:text-slate-900 prose-strong:font-bold
                   prose-blockquote:border-l-amber-500 prose-blockquote:bg-amber-50/40 prose-blockquote:py-1 prose-blockquote:px-4 prose-blockquote:rounded-r-lg
                   prose-img:rounded-2xl prose-img:shadow-md prose-img:w-full prose-img:object-cover
                   prose-figcaption:text-center prose-figcaption:text-sm prose-figcaption:text-slate-500"
        dangerouslySetInnerHTML={{ __html: contentHtml }}
      />
    </section>
    );
}