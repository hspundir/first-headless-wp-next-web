import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import StateTempleList from "@/components/StateTempleList";
import SubNav from "@/components/SubNav";
import {
  getStateBySlug,
  getTemplesByStateId,
  getWarriorsByState,
  StateACF,
} from "@/lib/wordpress";

/* export const metadata: Metadata = {
  title: "State Detail",
  description: "Explore the temples and warriors of each state",
}; */
function stripHtml(html?: string): string {
  if (!html) return "";
  return html.replace(/<[^>]*>?/gm, "").trim();
}

export const generateMetadata = async ({ params } : { params: Promise<{
    slug: string;
  }> }): Promise<Metadata> => {
    const { slug } = await params;
  const state = await getStateBySlug(slug);
  // console.log("State fetched for metadata:", state?.name);
  if (!state) {
    return {
      title: "State Not Found", 
      description: "The requested state could not be found.",
    };
  }
    const cleanTitle = stripHtml(state.name);

  const cleanDescription = stripHtml(state.description);
const acfData =
    state.acf && !Array.isArray(state.acf) ? (state.acf as StateACF) : null;
  const bannerUrl = acfData?.state_banner?.url;
  return {
    title: `${cleanTitle} | Mandir, Veer Yodha & Dharohar | Bharat Gyan Samhita`,
    description: `${cleanDescription} ke pramukh mandir, veer yodha aur sanskritik dharohar ki jankari — Bharat Gyan Samhita.`,
    openGraph: {
      title: `${cleanTitle} | Mandir, Veer Yodha & Dharohar | Bharat Gyan Samhita`,
      description: `${cleanDescription} ke pramukh mandir, veer yodha aur sanskritik dharohar ki jankari — Bharat Gyan Samhita.`,
      type: "website",
      images: bannerUrl || "/default-og-image.jpg",
    },
  };
}

const STATE_SECTIONS = [
  { id: "temples-section", label: "Pramukh Mandir" },
  { id: "warriors-section", label: "Veer Yoddha" },
  { id: "culture-section", label: "Sanskriti & Dharohar" },
];

// 1. Asli Content Component (Jo dynamic data load karega)
async function StateDetailContent({ slugPromise }: { slugPromise: Promise<{ slug: string }> }) {
  const { slug } = await slugPromise;
  const state = await getStateBySlug(slug);

  if (!state) {
    notFound();
  }

  // Pehle 6 mandir server side fetch honge
  const [initialTemples, warriors] = await Promise.all([
    getTemplesByStateId(state.id, 6, 1),
    getWarriorsByState(state.id),
  ]);

  const acfData =
    state.acf && !Array.isArray(state.acf) ? (state.acf as StateACF) : null;
  const bannerUrl = acfData?.state_banner?.url;

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "States", href: "/states" },
    { label: state.name },
  ];

  return (
    <>
      {/* Hero Section */}
      <div className="relative h-72 md:h-96 w-full bg-slate-900 overflow-hidden">
        {bannerUrl ? (
          <Image
            src={bannerUrl}
            alt={state.name}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        ) : (
          <div className="absolute inset-0 bg-linear-to-br from-amber-700 via-stone-800 to-slate-900" />
        )}

        <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 max-w-6xl mx-auto px-4 pb-8 text-white">
          <span className="text-xs uppercase tracking-widest text-amber-300 font-semibold">
            Pavitra Kshetra Hub
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mt-1">
            {state.name}
          </h1>
          {state.description && (
            <p className="mt-3 text-sm md:text-base text-slate-300 max-w-2xl line-clamp-2 leading-relaxed">
              {state.description}
            </p>
          )}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 mt-6">
        <Breadcrumbs items={breadcrumbItems} />
        <SubNav sections={STATE_SECTIONS} />
        {/* Temples Section with Load More */}
        <section id="temples-section" className="mt-10">
          <div className="flex items-center justify-between mb-6 border-b border-slate-200 pb-4">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                Pramukh Mandir & Teerth
              </h2>
              <p className="text-sm text-slate-500">
                {state.name} ke adhyatmik sthal
              </p>
            </div>
          </div>

          <StateTempleList initialTemples={initialTemples} stateId={state.id} />
        </section>
        {/* Warriors Section - Clean Image Overlay Cards */}
        {warriors && warriors.length > 0 && (
          <section id="warriors-section" className="mt-16 pt-10 border-t border-slate-200">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs uppercase tracking-widest text-amber-700 font-semibold">
                  Guardians of Heritage
                </span>
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mt-1">
                  Veer Yodha & Nayak
                </h2>
                <p className="text-sm text-slate-500">
                  {state.name} ki dharohar aur seemaon ki raksha karne wale shurveer
                </p>
              </div>
              <span className="text-xs font-semibold text-slate-600 bg-slate-100 border border-slate-300 px-3 py-1 rounded-full">
                {warriors.length} Legends
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {warriors.map((warrior) => {
                const imageUrl = warrior._embedded?.['wp:featuredmedia']?.[0]?.source_url;
                const acf = warrior.acf;

                return (
                  <Link
                    key={warrior.id}
                    href={`/warriors/${warrior.slug}`}
                    className="group relative h-80 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-slate-200 block"
                  >
                    {/* Featured Image ya Fallback Gradient */}
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

                    {/* Gradient Overlay for Text Readability */}
                    <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/30 to-black/10 group-hover:from-black/95 transition-colors" />

                    {/* Top Left: Honorific / Title Badge */}
                    {acf?.warrior_title && (
                      <div className="absolute top-4 left-4 z-10">
                        <span className="inline-block text-[11px] font-semibold text-amber-300 bg-black/60 backdrop-blur-md border border-amber-500/40 px-2.5 py-1 rounded-full uppercase tracking-wider">
                          {acf.warrior_title}
                        </span>
                      </div>
                    )}

                    {/* Bottom Content: Name & Timeline */}
                    <div className="absolute bottom-0 left-0 right-0 p-5 z-10 text-white">
                      <h3 className="text-xl font-bold font-serif leading-tight group-hover:text-amber-300 transition-colors">
                        {warrior.title.rendered}
                      </h3>

                      {acf?.reign_timeline && (
                        <p className="text-xs text-stone-300 font-medium mt-1">
                          {acf.reign_timeline}
                        </p>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        )}
      </div>
    </>
  );
}

// 2. Main Page Shell (Suspense ke sath Instant Loading provide karega)
export default function StateDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return (
    <main className="min-h-screen pb-16">
      <Suspense
        fallback={
          <div className="min-h-[50vh] flex items-center justify-center text-slate-400">
            Rajya ki jankari load ho rahi hai...
          </div>
        }
      >
        <StateDetailContent slugPromise={params} />
      </Suspense>
    </main>
  );
}