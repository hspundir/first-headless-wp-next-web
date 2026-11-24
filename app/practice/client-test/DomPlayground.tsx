"use client";

import { useRef, useState } from "react";

export default function DomPlayground() {
  const boxRef = useRef<HTMLDivElement>(null);

  // Values screen par live dekhne ke liye states
  const [metrics, setMetrics] = useState({
    clientWidth: 0,
    scrollWidth: 0,
    scrollLeft: 0,
  });

  const checkMetrics = () => {
    if (!boxRef.current) return;

    setMetrics({
      clientWidth: boxRef.current.clientWidth,
      scrollWidth: boxRef.current.scrollWidth,
      scrollLeft: Math.round(boxRef.current.scrollLeft),
    });
  };

  const handleScrollRight = () => {
    if (!boxRef.current) return;
    // 150px aage thelo
    boxRef.current.scrollBy({ left: 150, behavior: "smooth" });
  };

  const handleScrollLeft = () => {
    if (!boxRef.current) return;
    // 150px peeche thelo
    boxRef.current.scrollBy({ left: -150, behavior: "smooth" });
  };

  return (
    <div className="p-8 max-w-xl mx-auto font-sans">
      <h2 className="text-xl font-bold mb-4">DOM Geometry Visual Lab</h2>

      {/* Live Numbers Panel */}
      <div className="bg-slate-900 text-emerald-400 p-4 rounded-lg mb-6 font-mono text-sm space-y-1">
        <p>1. clientWidth (Visible Box) : {metrics.clientWidth} px</p>
        <p>2. scrollWidth (Total Train)  : {metrics.scrollWidth} px</p>
        <p>3. scrollLeft  (Pushed Left)  : {metrics.scrollLeft} px</p>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 mb-4">
        <button
          onClick={handleScrollLeft}
          className="px-4 py-2 bg-slate-200 hover:bg-slate-300 rounded font-semibold text-slate-800"
        >
          ⬅️ Scroll Left (-150px)
        </button>
        <button
          onClick={handleScrollRight}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded font-semibold text-white"
        >
          Scroll Right (+150px) ➡️
        </button>
      </div>

      {/* The Scrolling Box */}
      <div
        ref={boxRef}
        onScroll={checkMetrics}
        className="w-80 h-28 border-4 border-amber-500 overflow-x-auto flex gap-4 p-4 rounded-xl bg-amber-50"
      >
        <div className="min-w-28 h-full bg-red-400 text-white flex items-center justify-center font-bold rounded-lg shrink-0">Card 1</div>
        <div className="min-w-28 h-full bg-blue-400 text-white flex items-center justify-center font-bold rounded-lg shrink-0">Card 2</div>
        <div className="min-w-28 h-full bg-green-400 text-white flex items-center justify-center font-bold rounded-lg shrink-0">Card 3</div>
        <div className="min-w-28 h-full bg-purple-400 text-white flex items-center justify-center font-bold rounded-lg shrink-0">Card 4</div>
        <div className="min-w-28 h-full bg-pink-400 text-white flex items-center justify-center font-bold rounded-lg shrink-0">Card 5</div>
      </div>

      <p className="text-xs text-slate-500 mt-2">
        * Is border wale dabbe ko mouse se scroll kijiye ya buttons dabaiye aur upar ke numbers badalte dekhiye.
      </p>
    </div>
  );
}