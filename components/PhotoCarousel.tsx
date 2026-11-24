"use client";

import { useRef, useState, useEffect, useMemo, useCallback } from "react";
interface PhotoItem {
    id?: number | string;
    full_image_url?: string;
    thumbnail_image_url?: string;
    url?: string;
    source_url?: string;
    title?: string;
    alt_text?: string;
}

interface Props {
    photos: PhotoItem[] | PhotoItem[][] | undefined | null;
    title?: string;
    heading?: string;
}


export default function PhotoCarousel({
    photos,
    title = "Temple Tour",
    heading = "Photo Gallery",}: Props) {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);
    const [activeIndex, setActiveIndex] = useState(0);

    // Nested array handling (Free ACF plugin fix)
    /* const normalizedPhotos: any[] = Array.isArray(photos)
      ? Array.isArray(photos[0])
        ? photos[0]
        : photos
      : []; */
    // 1. useMemo ke andar wrap karein taaki reference render par change na ho
    const normalizedPhotos: PhotoItem[] = useMemo(() => {
        if (!photos) return [];
        if (Array.isArray(photos)) {
            return (Array.isArray(photos[0]) ? photos[0] : photos) as PhotoItem[];
        }
        return [];
    }, [photos]);

    // Safe Image URL helper
    const getImageUrl = (item: PhotoItem | string): string => {
        if (!item) return "";
        let src = "";

        if (typeof item === "string") {
            src = item.trim();
        } else {
            if (typeof item.full_image_url === "string" && item.full_image_url.trim() !== "") {
                src = item.full_image_url;
            } else if (typeof item.thumbnail_image_url === "string" && item.thumbnail_image_url.trim() !== "") {
                src = item.thumbnail_image_url;
            } else if (typeof item.url === "string" && item.url.trim() !== "") {
                src = item.url;
            } else if (typeof item.source_url === "string" && item.source_url.trim() !== "") {
                src = item.source_url;
            }
        }

        if (src.includes("localhost")) {
            src = src.replace("localhost", "127.0.0.1");
        }

        return src;
    };

    // Scroll Position track karna dots aur arrows update karne ke liye
    /* const handleScroll = () => {
      if (!scrollContainerRef.current) return;
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
  
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  
      const cardWidth = clientWidth / 3;
      const currentCard = Math.round(scrollLeft / (cardWidth || 1));
      setActiveIndex(currentCard);
    }; */
    // 2. handleScroll ko useCallback me wrap karein
    const handleScroll = useCallback(() => {
        if (!scrollContainerRef.current) return;
        const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;

        setCanScrollLeft(scrollLeft > 10);
        setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);

        const cardWidth = clientWidth / 3;
        const currentCard = Math.round(scrollLeft / (cardWidth || 1));
        setActiveIndex(currentCard);
    }, []);

    /* useEffect(() => {
      handleScroll();
    }, [normalizedPhotos]); */
    // 3. useEffect ab clean trigger hoga
    useEffect(() => {
        handleScroll();
    }, [normalizedPhotos, handleScroll]);

    // Smooth scroll Left
    const scrollPrev = () => {
        if (!scrollContainerRef.current) return;
        const cardWidth = scrollContainerRef.current.clientWidth / (window.innerWidth < 768 ? 1.2 : 3);
        scrollContainerRef.current.scrollBy({
            left: -cardWidth * 1.5,
            behavior: "smooth",
        });
    };

    // Smooth scroll Right
    const scrollNext = () => {
        if (!scrollContainerRef.current) return;
        const cardWidth = scrollContainerRef.current.clientWidth / (window.innerWidth < 768 ? 1.2 : 3);
        scrollContainerRef.current.scrollBy({
            left: cardWidth * 1.5,
            behavior: "smooth",
        });
    };

    // Specific dot click par scroll karna
    const scrollToCard = (index: number) => {
        if (!scrollContainerRef.current) return;
        const card = scrollContainerRef.current.children[index] as HTMLElement;
        if (card) {
            scrollContainerRef.current.scrollTo({
                left: card.offsetLeft,
                behavior: "smooth",
            });
        }
    };

    if (!normalizedPhotos || normalizedPhotos.length === 0) {
        return null;
    }

    return (
        <section className="my-14 max-w-6xl mx-auto px-4">
            {heading && (
                <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-8 flex items-center gap-2">
                    <span>📷</span> {heading}
                </h2>
            )}

            <div className="relative group">
                {/* Floating Left Arrow Button */}
                <button
                    type="button"
                    onClick={scrollPrev}
                    disabled={!canScrollLeft}
                    className={`absolute -left-3 md:-left-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 md:w-12 md:h-12 rounded-full bg-white text-slate-700 shadow-xl border border-slate-100 flex items-center justify-center transition-all duration-200 active:scale-95 ${canScrollLeft
                        ? "opacity-100 cursor-pointer hover:bg-slate-50 hover:text-emerald-600"
                        : "opacity-0 pointer-events-none"
                        }`}
                    aria-label="Previous photos"
                >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>

                {/* Scrollable Container */}
                <div
                    ref={scrollContainerRef}
                    onScroll={handleScroll}
                    className="flex gap-4 md:gap-6 overflow-x-auto scroll-smooth no-scrollbar py-4 px-1 snap-x snap-mandatory"
                    style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                >
                    {normalizedPhotos.map((item, idx) => {
                        const imgUrl = getImageUrl(item);
                        if (!imgUrl) return null;

                        return (
                            <div
                                key={item?.id ? `slide-${item.id}` : `slide-${idx}`}
                                className="shrink-0 w-[82%] sm:w-[46%] md:w-[calc(33.333%-16px)] snap-start group/card"
                            >
                                {/* Vertical Card with Soft Rounded Borders */}
                                <div className="relative h-90 sm:h-100 md:h-107.5 w-full rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 bg-slate-100">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={imgUrl}
                                        alt={item?.title || `${title} photo ${idx + 1}`}
                                        className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-500 ease-out"
                                        loading="lazy"
                                    />
                                    <div className="absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300" />
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Floating Right Arrow Button */}
                <button
                    type="button"
                    onClick={scrollNext}
                    disabled={!canScrollRight}
                    className={`absolute -right-3 md:-right-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 md:w-12 md:h-12 rounded-full bg-white text-slate-700 shadow-xl border border-slate-100 flex items-center justify-center transition-all duration-200 active:scale-95 ${canScrollRight
                        ? "opacity-100 cursor-pointer hover:bg-slate-50 hover:text-emerald-600"
                        : "opacity-0 pointer-events-none"
                        }`}
                    aria-label="Next photos"
                >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>

            {/* Bottom Indicators (Pill Dots matching your screenshot) */}
            {normalizedPhotos.length > 3 && (
                <div className="flex justify-center items-center gap-2 mt-6">
                    {normalizedPhotos.map((_, i) => {
                        const isSelected = activeIndex === i;
                        return (
                            <button
                                key={`dot-${i}`}
                                type="button"
                                onClick={() => scrollToCard(i)}
                                aria-label={`Scroll to photo ${i + 1}`}
                                className={`transition-all duration-300 rounded-full ${isSelected
                                    ? "w-6 h-2 bg-emerald-700"
                                    : "w-2 h-2 bg-slate-300 hover:bg-slate-400"
                                    }`}
                            />
                        );
                    })}
                </div>
            )}
        </section>
    );
}