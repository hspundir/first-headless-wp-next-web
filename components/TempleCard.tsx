import Image from "next/image";
import Link from "next/link";
import { getSafeExcerpt } from "@/utils/textHelper";
import { TempleDetail } from "@/types/temple";
interface TempleCardProps {
  temple: TempleDetail;
}
export default function TempleCard({ temple }: TempleCardProps) {
    const featuredImg = temple._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
    const galleryFirstImg = temple.acf?.photo_gallery?.gallery?.[0]?.full_image_url;
    const cardImage = featuredImg || galleryFirstImg;
    const shortText = getSafeExcerpt(
        temple.excerpt?.rendered,
        temple.content?.rendered,
        20
    );
    return (
        <div
              key={temple.id}
              className="group border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="relative h-52 w-full overflow-hidden bg-slate-100">
                  {cardImage ? (
                    <Image
                    src={cardImage}
                    alt={temple.title.rendered}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-400 bg-slate-100">
                      <span>No Image Available</span>
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <h2 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-emerald-600 transition-colors">
                    {temple.title.rendered}
                  </h2>
                  <p className="text-slate-600 text-sm leading-relaxed mb-4">
                    {shortText}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0">
                <Link
                  href={`/temples/${temple.slug}`}
                  prefetch={false}
                  className="inline-block w-full text-center bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2.5 px-4 rounded-xl transition-colors shadow-sm"
                >
                  View Details & Itinerary →
                </Link>
              </div>
            </div>
    )
}