import { Suspense } from "react";
import { getAllTemples } from "@/lib/wordpress"; // Apne path ke hisab se (jaise "@/utils/wordpress" ya "@/lib/wordpress")
import TempleCard from "@/components/TempleCard";
// export const instant = false;
// export const dynamic = 'force-dynamic';


// 1. Data Fetching aur Grid ko alag component banaya
async function TemplesGrid() {
  const temples = await getAllTemples();

  if (!temples || temples.length === 0) {
    return (
      <div className="text-center py-12 text-slate-500">
        No temples found right now.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {temples.map((temple) => (
        <TempleCard key={temple.id} temple={temple} />
      ))}
    </div>
  );
}
export default async function TemplesListPage() {
  
  // const temples = await getAllTemples();

  return (
    <main className="max-w-6xl mx-auto px-4 py-12">
      <div className="mb-10 text-center md:text-left">
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
          Sacred Temples & Tour Packages
        </h1>
        <p className="text-slate-600 mt-2 text-base md:text-lg">
          Uttarakhand aur Bharat ke prasiddh mandir aur yatra tour packages.
        </p>
      </div>
      <Suspense
        fallback={
          <div className="text-center py-12 text-slate-400">
            Mandir ki soochi load ho rahi hai...
          </div>
        }
      >
        <TemplesGrid />
      </Suspense>
      
    </main>
  );
}