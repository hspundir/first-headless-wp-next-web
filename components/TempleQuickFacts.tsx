interface TempleQuickFactsProps {
  district?: string;
  state?: string;
  bestTime?: string;
}

export default function TempleQuickFacts({
  district,
  state,
  bestTime,
}: TempleQuickFactsProps) {
  if (!district && !state && !bestTime) return null;

  return (
    <div className="flex flex-wrap gap-4 mb-10 p-5 bg-slate-50 border border-slate-200 rounded-xl">
      {district && (
        <div>
          <span className="text-xs uppercase font-semibold text-slate-500 tracking-wider block">
            District
          </span>
          <span className="text-sm md:text-base font-bold text-slate-800">
            {district}
          </span>
        </div>
      )}
      {state && (
        <div className="border-l border-slate-300 pl-4">
          <span className="text-xs uppercase font-semibold text-slate-500 tracking-wider block">
            State
          </span>
          <span className="text-sm md:text-base font-bold text-slate-800">
            {state}
          </span>
        </div>
      )}
      {bestTime && (
        <div className="border-l border-slate-300 pl-4">
          <span className="text-xs uppercase font-semibold text-slate-500 tracking-wider block">
            Best Time To Visit
          </span>
          <span className="text-sm md:text-base font-bold text-emerald-700">
            {bestTime}
          </span>
        </div>
      )}
    </div>
  );
}