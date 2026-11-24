"use client";

import { useState } from "react";

// Interface define kiya
interface SelectedArticle {
  id: number;
  title: string;
}

export function Counter() {
//   const [count, setCount] = useState(0);

  // Shuruat mein koi article select nahi hai, isliye null
  const [article, setArticle] = useState<SelectedArticle | null>(null);

  return (
    <div className="mt-6 p-4 border border-gray-300 rounded-lg bg-gray-50">
      <h3 className="font-semibold text-gray-800 mb-2">Practice: null State</h3>

      {/* Button click par object set hoga */}
      <button
        onClick={() => setArticle({ id: 101, title: "Shivaji Maharaj ka Itihas" })}
        className="px-3 py-1 bg-blue-600 text-white rounded text-sm mr-2"
      >
        Article Select Karein
      </button>

      {/* Reset karne par wapas null ho jayega */}
      <button
        onClick={() => setArticle(null)}
        className="px-3 py-1 bg-gray-600 text-white rounded text-sm"
      >
        Clear Karein (null)
      </button>

      {/* Conditional rendering: agar null hai toh kuch aur, agar data hai toh card */}
      <div className="mt-4 p-3 bg-white rounded border">
        {article === null ? (
          <p className="text-gray-500 text-sm">Abhi koi article select nahi hai (state = null).</p>
        ) : (
          <div>
            <p className="text-green-700 font-bold">Selected ID: {article.id}</p>
            <p className="text-gray-800 font-semibold">{article.title}</p>
          </div>
        )}
      </div>
    </div>
  );
}