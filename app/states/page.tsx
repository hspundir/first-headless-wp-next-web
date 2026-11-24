import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { getAllStates, StateRegion } from "@/lib/wordpress";
import Breadcrumbs from "@/components/Breadcrumbs";
import FilterBar from "@/components/FilterBar";

interface StatesPageProps {
  searchParams: Promise<{ state?: string }>;
}

async function FilteredStatesSection({searchParams}: StatesPageProps) {
  const { state: selectedState } = await searchParams;
  return <StatesGrid selectedState={selectedState} />;
}
async function StatesFilterWrapper() {
  const allStates = await getAllStates();
  const stateOptions = (allStates ?? []).map((s) => ({
    slug: s.slug,
    name: s.name,
  }));

  return <FilterBar states={stateOptions} />;
}
// 1. Async Component jo WordPress se states fetch karega
async function StatesGrid({selectedState}: {selectedState?: string}) {
  const states = await getAllStates();
    
  if (!states || states.length === 0) {
    return (
      <div className="text-center py-16 text-slate-500">
        Koi rajya uplabdh nahi hai.
      </div>
    );
  }
  const filteredStates = 
    selectedState && selectedState !== "all"
    ? states.filter((item) => item.slug.toLowerCase() === selectedState.toLowerCase() || item.name.toLowerCase() === selectedState.toLowerCase())
    : states;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

      {filteredStates.map((state: StateRegion) => {
        // Safe extraction bina type error ke:
        const acfData = state.acf && !Array.isArray(state.acf) ? state.acf : null;
        // WordPress taxonomy se aayi image check
        const imageUrl = acfData?.state_banner?.url;
        const imageAlt = acfData?.state_banner?.alt || state.name;

        return (
          <Link
            key={state.id}
            href={`/states/${state.slug}`}
            className="group relative block rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-slate-100 bg-white"
          >
            {/* Banner Container */}
            <div className="relative h-60 w-full overflow-hidden bg-slate-900">
              {imageUrl ? (
                // 1. Agar WordPress me image dali hai (jaise Uttarakhand me)
                <Image
                  src={imageUrl}
                  alt={imageAlt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              ) : (
                // 2. Fallback: Agar image nahi hai, toh gradient background dikhega
                <div className="absolute inset-0 bg-linear-to-br from-amber-700 via-stone-800 to-slate-900 flex items-center justify-center">
                  <span className="text-6xl font-black text-white/10 select-none uppercase tracking-widest">
                    {state.name.slice(0, 2)}
                  </span>
                </div>
              )}

              {/* Dark Gradient Overlay text readability ke liye */}
              <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/25 to-transparent" />

              <span className="absolute top-4 right-4 bg-amber-500/90 text-stone-900 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider backdrop-blur-sm shadow">
                Explore Hub
                </span>

              {/* State Name */}
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-xs uppercase tracking-widest text-amber-300 font-semibold">
                  Rajya / Kshetra
                </span>
                <h2 className="text-2xl font-extrabold tracking-tight group-hover:text-amber-200 transition-colors">
                  {state.name}
                </h2>
              </div>
            </div>

            {/* Description */}
            {state.description ? (
              <div className="p-4 text-slate-600 text-sm line-clamp-2 leading-relaxed">
                {state.description}
              </div>
            ) : (
              <div className="p-4 text-slate-400 text-sm italic">
                Dharohar aur pavitra kshetra explore karein...
              </div>
            )}
          </Link>
        );
      })}
    </div>
  );
}

// 2. Main Page Component
export default function StatesPage({ searchParams }: StatesPageProps) {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "States" },
  ];

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      
      {/* Reusable Breadcrumbs Component */}
      <Breadcrumbs items={breadcrumbItems} />

      {/* Page Header */}
      <div className="mb-8 flex flex-col md:flex-row sm:items-center md:justify-between gap-4">
        <div className="mb-10 text-center md:text-left">
                <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
                  Bharat ke Rajya & Kshetra
                </h1>
                <p className="text-slate-600 mt-2 text-base md:text-lg">
                  Pratyek rajya ki adhyatmik dharohar, mandir aur yatra kshetra explore karein.
                </p>
              </div>
              <Suspense fallback={<div className="text-sm text-gray-500 ">Loading filters...</div>}>
                <StatesFilterWrapper />
              </Suspense>
      </div>
      

      {/* Streaming Grid with Next.js 16 Suspense */}
      <Suspense
        fallback={
          <div className="text-center py-16 text-slate-400">
            Rajya load ho rahe hain...
          </div>
        }
      >
        <FilteredStatesSection searchParams={searchParams} />
      </Suspense>
    </main>
  );
}