export interface ItineraryItem {
  day: number;
  title: string;
  desc: string;
}

export interface PhotoGalleryItem {
  id: number;
  full_image_url: string;
  thumbnail_image_url: string;
  title?: string;
  caption?: string;
  alt_text?: string;
}

export interface TempleDetail {
  id: number;
  slug: string;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  excerpt?: {
    rendered: string;
  };
  itinerary?: ItineraryItem[];
  acf?: {
    package_inclusions?: string;
    package_exclusions?: string;
    state_name?: string;
    location_district?: string;
    best_time_to_visit?: string;
    photo_gallery?: {
      gallery?: PhotoGalleryItem[];
    };
  };
  _embedded?: {
    "wp:featuredmedia"?: Array<{
      source_url: string;
      alt_text?: string;
    }>;
  };
}