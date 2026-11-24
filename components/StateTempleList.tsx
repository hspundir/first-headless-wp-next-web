"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { TempleDetail } from "@/types/temple";

interface StateTempleListProps {
  initialTemples: TempleDetail[];
  stateId: number;
}

export default function StateTempleList({
  initialTemples,
  stateId,
}: StateTempleListProps) {
  const [temples, setTemples] = useState<TempleDetail[]>(initialTemples);
  const [page, setPage] = useState<number>(2);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(initialTemples.length >= 6);

  const loadMore = async () => {
    if (loading || !hasMore) return;
    setLoading(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/temples?state_region=${stateId}&per_page=6&page=${page}&_embed`
      );

      if (!res.ok) {
        setHasMore(false);
        return;
      }

      const newTemples: TempleDetail[] = await res.json();

      if (newTemples.length === 0) {
        setHasMore(false);
      } else {
        setTemples((prev) => [...prev, ...newTemples]);
        setPage((prev) => prev + 1);
        if (newTemples.length < 6) {
          setHasMore(false);
        }
      }
    } catch (error) {
      console.error("Load more temples error:", error);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  };

  if (temples.length === 0) {
    return (
      <div className="text-center py-12 text-slate-500 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
        Is rajya ke liye abhi koi mandir darj nahi hai.
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {temples.map((temple) => {
          const featuredImg =
            temple._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
            "/placeholder-temple.jpg";

          return (
            <Link
              key={temple.id}
              href={`/temples/${temple.slug}`}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-slate-100 flex flex-col"
            >
              <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
                <Image
                  src={featuredImg}
                  alt={temple.title.rendered}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between">
                <h3
                  className="font-bold text-lg text-slate-900 group-hover:text-amber-600 transition-colors"
                  dangerouslySetInnerHTML={{ __html: temple.title.rendered }}
                />
                <span className="text-xs text-amber-600 font-semibold mt-3 inline-block">
                  Darshan Karein →
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      {hasMore && (
        <div className="mt-10 text-center">
          <button
            onClick={loadMore}
            disabled={loading}
            className="px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white font-semibold text-sm rounded-xl shadow-sm transition-all duration-200 disabled:opacity-50 cursor-pointer"
          >
            {loading ? "Mandir khoj rahe hain..." : "Aur Mandir Dekhein (Load More)"}
          </button>
        </div>
      )}
    </div>
  );
}