interface PackagePoliciesProps {
  inclusions?: string;
  exclusions?: string;
}

export default function PackagePolicies({
  inclusions,
  exclusions,
}: PackagePoliciesProps) {
  if (!inclusions && !exclusions) return null;

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-6 my-10">
      {inclusions && (
        <div className="p-6 bg-emerald-50/60 border border-emerald-200 rounded-xl">
          <h3 className="text-lg font-bold text-emerald-900 mb-3 flex items-center gap-2">
            <span>✅</span> Package Inclusions
          </h3>
          <div
            className="text-emerald-950 text-sm leading-relaxed [&>ul]:list-disc [&>ul]:pl-5"
            dangerouslySetInnerHTML={{ __html: inclusions }}
          />
        </div>
      )}

      {exclusions && (
        <div className="p-6 bg-rose-50/60 border border-rose-200 rounded-xl">
          <h3 className="text-lg font-bold text-rose-900 mb-3 flex items-center gap-2">
            <span>❌</span> Package Exclusions
          </h3>
          <div
            className="text-rose-950 text-sm leading-relaxed [&>ul]:list-disc [&>ul]:pl-5"
            dangerouslySetInnerHTML={{ __html: exclusions }}
          />
        </div>
      )}
    </section>
  );
}