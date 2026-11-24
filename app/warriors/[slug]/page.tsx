import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import { getWarriorBySlug } from "@/lib/wordpress";
interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}
function stripHtml(html?: string): string {
  if (!html) return "";
  return html.replace(/<[^>]*>?/gm, "").trim();
}
// 1. Dynamic SEO Metadata (Next.js App Router isko automatically page head mein inject karta hai)
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const warrior = await getWarriorBySlug(slug);

  if (!warrior) {
    return {
      title: "Warrior Not Found | Bharat Gyan Samhita",
    };
  }

  const cleanTitle = stripHtml(warrior.title.rendered);
  const cleanDescription =
    stripHtml(warrior.excerpt?.rendered) ||
    `${cleanTitle} ki aitihaasik veer-gatha aur jeevan parichay - Bharat Gyan Samhita.`;
  const ogImage = warrior._embedded?.["wp:featuredmedia"]?.[0]?.source_url;

  return {
    title: `${cleanTitle} | Bharat Gyan Samhita`,
    description: cleanDescription.slice(0, 160),
    openGraph: {
      title: `${cleanTitle} - Veer Gatha`,
      description: cleanDescription.slice(0, 160),
      type: "article",
      images: ogImage ? [{ url: ogImage, alt: cleanTitle }] : [],
    },
  };
}

async function WarriorContent({ slugPromise }: { slugPromise: Promise<{ slug: string }> }) {
    const { slug } = await slugPromise;
    const warrior = await getWarriorBySlug(slug);

    if (!warrior) {
      notFound();
    }
    const acf = warrior.acf;
    const imageUrl = warrior._embedded?.['wp:featuredmedia']?.[0]?.source_url;
    

    const breadcrumbItems = [
      { label: "Home", href: "/" },
      { label: "Warriors", href: "/warriors" },
      { label: warrior.title.rendered }, // Current active item (bina href ke)
    ];
    return (
    <article className="min-h-screen bg-slate-50 pb-20">
        {/* Royal Split Hero Section (Aapke Stone-950 & Amber Palette Mein) */}
        <section className="bg-stone-950 text-white border-b border-amber-900/40">
          <div className="max-w-6xl mx-auto px-4 pt-6 pb-12 md:pb-16">
            {/* Top Breadcrumb (Dark theme friendly) */}
            <Breadcrumbs items={breadcrumbItems} />
            {/* <nav className="flex items-center gap-2 text-xs text-stone-400 mb-8">
              <Link href="/" className="hover:text-amber-300 transition-colors">
                Home
              </Link>
              <span>/</span>
              <Link href="/warriors" className="hover:text-amber-300 transition-colors">
                Warriors
              </Link>
              <span>/</span>
              <span
                className="text-amber-300 font-medium"
                dangerouslySetInnerHTML={{ __html: warrior.title.rendered }}
              />
            </nav> */}

            {/* 2-Column Split Grid: Left Portrait Card + Right Dossier */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* LEFT: Framed Portrait Card (Face kabhi crop nahi hoga) */}
              <div className="lg:col-span-5">
                <div className="relative rounded-2xl border border-amber-500/30 bg-stone-900/90 p-3 shadow-2xl">
                  {/* Top Archival Strip */}
                  <div className="flex items-center justify-between text-[11px] uppercase tracking-widest text-amber-300/90 pb-2.5 px-1 border-b border-stone-800">
                    <span>✦ {acf?.warrior_title || "Veer Yodha"}</span>
                    <span className="text-stone-400">{acf?.reign_timeline || "Bharat Gatha"}</span>
                  </div>

                  {/* Portrait Image Container */}
                  <div className="relative aspect-3/4 w-full overflow-hidden rounded-xl my-2.5 bg-stone-900">
                    {imageUrl ? (
                      <Image
                        src={imageUrl}
                        alt={warrior.title.rendered}
                        fill
                        priority
                        className="object-cover object-top"
                        sizes="(max-width: 1024px) 100vw, 40vw"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-linear-to-br from-stone-800 via-amber-950/70 to-stone-950 flex items-center justify-center">
                        <span className="text-5xl font-serif font-bold text-amber-500/30">
                          BGS
                        </span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-linear-to-t from-stone-950/60 via-transparent to-transparent" />
                  </div>

                  {/* Bottom Archival Footer */}
                  <div className="flex items-center justify-between text-[11px] text-stone-400 pt-1 px-1">
                    <span className="flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                      Bharat Gyan Samhita Archive
                    </span>
                    <span className="text-amber-300/80 font-medium">Veer-Gatha</span>
                  </div>
                </div>
              </div>

              {/* RIGHT: Title, Quote Box & Quick Historical Facts */}
              <div className="lg:col-span-7 space-y-6">
                {/* Pills / Badges */}
                <div className="flex flex-wrap items-center gap-2.5">
                  {acf?.warrior_title && (
                    <span className="text-xs font-semibold uppercase tracking-wider text-amber-300 bg-amber-950/90 border border-amber-600/50 px-3 py-1 rounded-full">
                      {acf.warrior_title}
                    </span>
                  )}
                  {acf?.reign_timeline && (
                    <span className="text-xs font-medium text-stone-300 bg-stone-900 border border-stone-700 px-3 py-1 rounded-full">
                      {acf.reign_timeline}
                    </span>
                  )}
                </div>

                {/* Main Warrior Name & Dynasty */}
                <div>
                  <h1
                    className="text-3xl sm:text-4xl lg:text-5xl font-serif font-extrabold tracking-tight text-white leading-tight"
                    dangerouslySetInnerHTML={{ __html: warrior.title.rendered }}
                  />
                  {acf?.dynasty_kingdom && (
                    <p className="mt-2.5 text-base md:text-lg text-amber-200/85 font-medium">
                      {acf.dynasty_kingdom}
                    </p>
                  )}
                </div>

                {/* Excerpt Quote Block (Stitch style golden left border) */}
                {warrior.excerpt?.rendered && (
                  <div className="border-l-4 border-amber-500 bg-stone-900/70 rounded-r-xl p-4 md:p-5">
                    <div
                      className="text-stone-200 font-serif italic text-base md:text-lg leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: warrior.excerpt.rendered }}
                    />
                  </div>
                )}

                {/* Mini Historical Fact Cards (Stitch ke 4-box strip jaisa) */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                  <div className="bg-stone-900/80 border border-stone-800 rounded-xl p-3.5">
                    <span className="block text-[10px] uppercase tracking-wider text-stone-400">
                      Dynasty / Kingdom
                    </span>
                    <span className="block text-sm font-semibold text-amber-300 mt-1">
                      {acf?.dynasty_kingdom || "Bharatiya Samrajya"}
                    </span>
                  </div>

                  <div className="bg-stone-900/80 border border-stone-800 rounded-xl p-3.5">
                    <span className="block text-[10px] uppercase tracking-wider text-stone-400">
                      Era / Timeline
                    </span>
                    <span className="block text-sm font-semibold text-white mt-1">
                      {acf?.reign_timeline || "Aitihaasik Kaal"}
                    </span>
                  </div>

                  <div className="bg-stone-900/80 border border-stone-800 rounded-xl p-3.5">
                    <span className="block text-[10px] uppercase tracking-wider text-stone-400">
                      Upadhi / Title
                    </span>
                    <span className="block text-sm font-semibold text-amber-200 mt-1">
                      {acf?.warrior_title || "Veer Yodha"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Neeche ka Main Content & Sidebar (Same Clean Light Cards) */}
        {/* Main Content & Sidebar */}
        <div className="max-w-6xl mx-auto px-4 mt-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Main Column (8 cols) */}
            <div className="lg:col-span-8 space-y-8">
              {/* Youth Inspiration Highlight Box */}
              {acf?.youth_inspiration_life_lessons && (
                <div className="bg-stone-900 border border-amber-500/30 rounded-2xl p-6 md:p-7 shadow-lg text-white">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-lg">🔥</span>
                    <h2 className="text-xs font-bold text-amber-300 uppercase tracking-widest">
                      Youth Inspiration & Sovereign Ideology
                    </h2>
                  </div>
                  <p className="text-stone-200 text-sm md:text-base leading-relaxed">
                    {acf.youth_inspiration_life_lessons}
                  </p>
                </div>
              )}

              {/* Main Veer Gatha / Story */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-xs">
                <h2 className="text-2xl font-bold font-serif text-slate-900 mb-6 border-b border-slate-100 pb-3">
                  Aitihaasik Veer-Gatha
                </h2>

                {warrior.content?.rendered ? (
                  <div
                    className="prose prose-slate max-w-none prose-headings:font-serif prose-headings:text-slate-900 prose-p:text-slate-700 prose-p:leading-relaxed prose-li:text-slate-700"
                    dangerouslySetInnerHTML={{ __html: warrior.content.rendered }}
                  />
                ) : (
                  <p className="text-slate-500 italic">
                    Is yodha ki vistaarit gatha jald hi jod di jayegi.
                  </p>
                )}
              </div>
            </div>

            {/* Right Sidebar: Historical Overview (4 cols) */}
            <aside className="lg:col-span-4 space-y-6">
              <div className="bg-stone-950 text-white border border-amber-500/25 rounded-2xl p-6 shadow-xl sticky top-6">
                <div className="flex items-center justify-between border-b border-stone-800 pb-3 mb-5">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-amber-300">
                    Historical Overview
                  </h3>
                  <span className="text-[10px] uppercase tracking-wider text-stone-400">
                    Archive Folio
                  </span>
                </div>

                <dl className="space-y-4 text-sm divide-y divide-stone-800/80">
                  <div className="pt-1 first:pt-0">
                    <dt className="text-[11px] text-stone-400 uppercase tracking-wider">
                      Title / Honorifics
                    </dt>
                    <dd className="font-semibold text-amber-300 mt-1">
                      {acf?.warrior_title || "Veer Yodha"}
                    </dd>
                  </div>

                  {acf?.dynasty_kingdom && (
                    <div className="pt-3">
                      <dt className="text-[11px] text-stone-400 uppercase tracking-wider">
                        Dynasty / Kingdom
                      </dt>
                      <dd className="font-semibold text-stone-100 mt-1">
                        {acf.dynasty_kingdom}
                      </dd>
                    </div>
                  )}

                  {acf?.reign_timeline && (
                    <div className="pt-3">
                      <dt className="text-[11px] text-stone-400 uppercase tracking-wider">
                        Era / Timeline
                      </dt>
                      <dd className="font-semibold text-stone-100 mt-1">
                        {acf.reign_timeline}
                      </dd>
                    </div>
                  )}

                  {acf?.key_battles && (
                    <div className="pt-3">
                      <dt className="text-[11px] text-amber-300 font-bold uppercase tracking-wider mb-2">
                        ⚔️ Key Battles & Campaigns
                      </dt>
                      <dd className="bg-stone-900/90 border border-stone-800 rounded-xl p-3 text-xs text-stone-200 leading-relaxed">
                        {acf.key_battles}
                      </dd>
                    </div>
                  )}
                </dl>

                <div className="mt-6 pt-4 border-t border-stone-800">
                  <Link
                    href="/warriors"
                    className="inline-flex items-center text-xs font-semibold text-amber-300 hover:text-amber-200 transition-colors"
                  >
                    ← Back to All Warriors
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </article>
  );
}
export default async function WarriorPage({ params }: PageProps) {
  const slugPromise = params;
  return (
    <Suspense fallback={<div className="min-h-[60vh] flex items-center justify-center text-slate-500">
            Veer Yodha ki jankari load ho rahi hai...
          </div>}>
      <WarriorContent slugPromise={slugPromise} />
    </Suspense>
  );
}