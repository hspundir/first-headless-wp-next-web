import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import { getAllWarriors } from "@/lib/wordpress";

const breadcrumbItems = [
  { label: "Home", href: "/" },
  { label: "Veer Yodha & Nayak" },
];

async function WarriorsArchiveContent() {
  const warriors = await getAllWarriors(12, 1);

  return (
    <>
      {/* Hero Header */}
      <div className="relative py-16 md:py-24 bg-stone-950 overflow-hidden text-white border-b border-stone-800">
        <div className="absolute inset-0 bg-linear-to-r from-amber-950/40 via-stone-900 to-stone-950" />
        
        <div className="relative max-w-6xl mx-auto px-4">
          <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold">
            Guardians of the Motherland
          </span>
          <h1 className="text-3xl md:text-5xl font-serif font-extrabold tracking-tight mt-2 text-white">
            Veer Yodha & Aitihaasik Nayak
          </h1>
          <p className="mt-4 text-sm md:text-base text-stone-300 max-w-2xl leading-relaxed">
            Bharat ki seemaon, dharohar aur astitva ki raksha karne wale shurveeron ki aitihaasik gathaon ka sangrah.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 mt-6">
        <Breadcrumbs items={breadcrumbItems} />

        {/* Warriors Grid */}
        <section className="mt-8">
          {warriors.length === 0 ? (
            <div className="text-center py-20 text-slate-500">
              Koi yodha record nahi mila.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {warriors.map((warrior) => {
                const imageUrl = warrior._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
                const acf = warrior.acf;

                return (
                  <Link
                    key={warrior.id}
                    href={`/warriors/${warrior.slug}`}
                    className="group relative h-80 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-slate-200 block"
                  >
                    {/* Featured Image ya Fallback */}
                    {imageUrl ? (
                      <Image
                        src={imageUrl}
                        alt={warrior.title.rendered}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-linear-to-br from-stone-800 via-amber-950 to-stone-900" />
                    )}

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/30 to-black/10 group-hover:from-black/95 transition-colors" />

                    {/* Top Left: Honorific / Title Badge */}
                    {acf?.warrior_title && (
                      <div className="absolute top-4 left-4 z-4">
                        <span className="inline-block text-[11px] font-semibold text-amber-300 bg-black/60 backdrop-blur-md border border-amber-500/40 px-2.5 py-1 rounded-full uppercase tracking-wider">
                          {acf.warrior_title}
                        </span>
                      </div>
                    )}

                    {/* Bottom Content: Name, Dynasty & Timeline */}
                    <div className="absolute bottom-0 left-0 right-0 p-5 z-10 text-white">
                      <h2
                        className="text-xl font-bold font-serif leading-tight group-hover:text-amber-300 transition-colors"
                        dangerouslySetInnerHTML={{ __html: warrior.title.rendered }}
                      />

                      {acf?.dynasty_kingdom && (
                        <p className="text-xs text-amber-400 font-medium mt-1">
                          {acf.dynasty_kingdom}
                        </p>
                      )}

                      {acf?.reign_timeline && (
                        <p className="text-[11px] text-stone-300 font-medium mt-0.5">
                          {acf.reign_timeline}
                        </p>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </>
  );
}

export default function WarriorsPage() {
  return (
    <main className="min-h-screen bg-slate-50 pb-20">
      <Suspense
        fallback={
          <div className="min-h-[50vh] flex items-center justify-center text-slate-400">
            Veer Yodhaon ki soochi load ho rahi hai...
          </div>
        }
      >
        <WarriorsArchiveContent />
      </Suspense>
    </main>
  );
}