import { notFound } from "next/navigation";
import Image from "next/image";
import type { Metadata } from "next";
import ItineraryAccordion from "@/components/ItineraryAccordion";
import { getTempleBySlug } from "@/lib/wordpress";
import { getSafeExcerpt } from "@/utils/textHelper";
import PhotoCarousel from "@/components/PhotoCarousel";
import TempleQuickFacts from "@/components/TempleQuickFacts";
import PackagePolicies from "@/components/PackagePolicies";
import TempleContent from "@/components/TempleContent";
// app/temples/[slug]/page.tsx ke andar:
import Breadcrumbs from "@/components/Breadcrumbs";
export const instant = false;

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const temple = await getTempleBySlug(slug);

  if (!temple) {
    return { title: "Temple Not Found" };
  }
  const metaDesc = getSafeExcerpt(
    temple.excerpt?.rendered,
    temple.content?.rendered,
    30
  );

  return {
    title: `${temple.title.rendered} | Sacred Tour Package`,
    description: metaDesc,
  };
}

export default async function TempleDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const temple = await getTempleBySlug(slug);

  if (!temple) {
    notFound();
  }

  const featuredImg = temple._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
  const galleryImages = temple.acf?.photo_gallery?.gallery || [];
  const heroImage = featuredImg || galleryImages[0]?.full_image_url;
// Breadcrumb items list
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Temples", href: "/temples" },
    { label: temple.title.rendered }, // Current active item (bina href ke)
  ];
  return (
    <main className="max-w-5xl mx-auto px-4 py-10">
      {/* 1. Breadcrumbs Top Par */}
      <Breadcrumbs items={breadcrumbItems} />
      {heroImage && (
        <div className="relative h-72 md:h-96 w-full rounded-2xl overflow-hidden mb-8 shadow-md">
          <Image
            src={heroImage}
            alt={temple.title.rendered}
            fill
            priority // Hero image sabse pehle load honi chahiye (LCP ke liye)
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 1024px"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent flex items-end p-6 md:p-10">
            <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
              {temple.title.rendered}
            </h1>
          </div>
        </div>
      )}

      {!heroImage && (
        <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-8 tracking-tight">
          {temple.title.rendered}
        </h1>
      )}

      {/* Modular Quick Facts */}
      <TempleQuickFacts
        district={temple.acf?.location_district}
        state={temple.acf?.state_name}
        bestTime={temple.acf?.best_time_to_visit}
      />

      {/* Main Content & History */}
      <TempleContent contentHtml={temple.content.rendered} />

      {/* Modular Inclusions & Exclusions */}
      <PackagePolicies
        inclusions={temple.acf?.package_inclusions}
        exclusions={temple.acf?.package_exclusions}
      />

      {temple.itinerary && temple.itinerary.length > 0 && (
        <ItineraryAccordion itinerary={temple.itinerary} />
      )}

      {/* Interactive Photo Carousel */}
        {galleryImages.length > 0 && (
                <PhotoCarousel
                photos={galleryImages}
                title={temple.title.rendered}
                />
            )}
    </main>
  );
}