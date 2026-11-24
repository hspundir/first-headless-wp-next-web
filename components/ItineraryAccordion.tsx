"use client";

import { useState } from "react";
import { ItineraryItem } from "@/types/temple";

interface Props {
  itinerary: ItineraryItem[];
}

export default function ItineraryAccordion({ itinerary }: Props) {
  // Pehla day by default open rahega
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  if (!itinerary || itinerary.length === 0) {
    return null;
  }

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full my-10">
      <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
        <span className="text-emerald-600">📍</span> Tour Itinerary (Day-by-Day)
      </h2>

      <div className="space-y-4">
        {itinerary.map((item, index) => {
          const isOpen = openIndex === index;

          return (
            <div
              key={`itinerary-day-${item.day ?? index}-${index}`}
              className="border border-slate-200 rounded-xl bg-white overflow-hidden shadow-sm transition-all"
            >
              <button
                type="button"
                onClick={() => toggleAccordion(index)}
                className="w-full flex items-center justify-between p-5 text-left bg-slate-50 hover:bg-slate-100 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="bg-emerald-600 text-white text-xs font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider">
                    Day {item.day || index + 1}
                  </span>
                  <span className="font-semibold text-slate-900 text-base md:text-lg">
                    {item.title}
                  </span>
                </div>

                <svg
                  className={`w-5 h-5 text-slate-500 transform transition-transform duration-200 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {isOpen && (
                <div className="p-5 border-t border-slate-200 bg-white">
                  <div
                    className="prose prose-slate max-w-none text-slate-600 leading-relaxed 
                               [&>ul]:list-disc [&>ul]:pl-5 [&>ul]:my-2 
                               [&>ol]:list-decimal [&>ol]:pl-5 [&>ol]:my-2 
                               [&>li]:my-1"
                    dangerouslySetInnerHTML={{ __html: item.desc }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}