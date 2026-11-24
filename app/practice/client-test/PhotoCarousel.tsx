"use client";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";

interface PhotoItem {
  id?: number | string;
  full_image_url?: string;
  url?: string;
}

interface PhotoCarouselProps {
  photos: PhotoItem[] | string[];
}

export default function PhotoCarousel( props : PhotoCarouselProps) {
  // 1. DOM Element pakadne ke liye Ref
  const carouselRef = useRef<HTMLDivElement>(null);

  // Touch coordinates
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);

  // Button disabled/enabled states
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Scroll limit check
  const updateScrollButtons = () => {
    if (!carouselRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
    
    setCanScrollLeft(scrollLeft > 5);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5);
  };

 useEffect(() => {
    updateScrollButtons();
  }, [props.photos]);

  // Scroll button function
  const scroll = (direction: "left" | "right") => {
    if (!carouselRef.current) return;
    const scrollAmount = 300;
    carouselRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  // Mobile Touch handlers
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;

    const diff = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 40; // 40px threshold

    if (diff > minSwipeDistance) {
      // Ungli right se left gayi -> Agli slide (Scroll Right)
      scroll("right");
    } else if (diff < -minSwipeDistance) {
      // Ungli left se right aayi -> Pichhli slide (Scroll Left)
      scroll("left");
    }

    // Coordinates reset
    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  // Safe Image URL nikalne ka helper
  const getImageUrl = (item: PhotoItem | string): string => {
    if (typeof item === "string") return item;
    return item.full_image_url || item.url || "/placeholder.jpg";
  };

  if (!props.photos || props.photos.length === 0) return null;

  return (
    <div className="relative w-full max-w-4xl mx-auto py-6 select-none">
      {/* Header & Controls */}
      <div className="flex items-center justify-between px-2 mb-4">
        <h3 className="text-lg font-bold text-slate-800">Photo Gallery</h3>
        <div className="hidden sm:flex gap-2">
          <button
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            className="p-2 rounded-full border border-slate-300 bg-white hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed shadow-sm transition"
            aria-label="Scroll Left"
          >
            ←
          </button>
          <button
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            className="p-2 rounded-full border border-slate-300 bg-white hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed shadow-sm transition"
            aria-label="Scroll Right"
          >
            →
          </button>
        </div>
      </div>

      {/* Main Scrolling Track */}
      <div
        ref={carouselRef}
        onScroll={updateScrollButtons}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className="flex gap-4 overflow-x-auto no-scrollbar scroll-smooth py-2 px-2"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {props.photos.map((item, index) => (
          <div
            key={index}
            className="min-w-[280px] sm:min-w-[320px] h-48 bg-slate-100 rounded-2xl overflow-hidden border border-slate-200 shadow-sm shrink-0 flex items-center justify-center relative"
          >
            <div className="relative w-full h-full">
            <Image src={getImageUrl(item)}
                alt="Temple gallery preview"
                fill
                sizes="(max-width: 768px) 280px, 320px"
                className="object-cover pointer-events-none"
            />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}