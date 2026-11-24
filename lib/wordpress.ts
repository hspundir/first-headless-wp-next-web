import { TempleDetail } from "@/types/temple";
import { WarriorDetail } from "@/types/warrior";

// Fallback hata diya - Sirf aur sirf .env se uthayega
const API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;

if (!API_URL) {
  console.warn("⚠️ Warning: NEXT_PUBLIC_WORDPRESS_API_URL is missing in .env!");
}

// Types for Standard Blog Posts
export interface WPPost {
  id: number;
  slug: string;
  title: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  content?: {
    rendered: string;
  };
  date: string;
  _embedded?: {
    "wp:featuredmedia"?: Array<{
      source_url: string;
      alt_text?: string;
    }>;
  };
}
// 1. Card Image ka structure
export interface StateBannerImage {
  id: number;
  url: string;
  alt?: string;
  width?: number;
  height?: number;
}

// 2. ACF Fields ka structure
export interface StateACF {
  state_banner?: StateBannerImage;
}

// 3. Main StateRegion Interface
export interface StateRegion {
  id: number;
  name: string;
  slug: string;
  description?: string;
  count: number;
  taxonomy?: string;
  parent?: number;
  // WordPress kabhi empty hone par acf ko [] bhejta hai, isliye safe type:
  acf?: StateACF | unknown[];
}

// ==========================================
// 1. STANDARD POSTS HELPERS
// ==========================================

export async function getAllPosts(): Promise<WPPost[]> {
  try {
    const res = await fetch(`${API_URL}/posts?_embed`, {
      cache: "no-store",
    });
    if (!res.ok) return [];
    return res.json();
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<WPPost | null> {
  try {
    const res = await fetch(`${API_URL}/posts?slug=${slug}&_embed`, {
      cache: "no-store",
    });
    if (!res.ok) return null;
    const posts = await res.json();
    return posts.length > 0 ? posts[0] : null;
  } catch (error) {
    console.error("Error fetching single post:", error);
    return null;
  }
}

// ==========================================
// 2. TEMPLES (CUSTOM POST TYPE) HELPERS
// ==========================================

export async function getAllTemples(): Promise<TempleDetail[]> {
  try {
    const res = await fetch(`${API_URL}/temples?_embed`, {
      cache: "no-store",
    });
    if (!res.ok) return [];
    return res.json();
  } catch (error) {
    console.error("Error fetching temples:", error);
    return [];
  }
}

export async function getTempleBySlug(slug: string): Promise<TempleDetail | null> {
  try {
    const res = await fetch(`${API_URL}/temples?slug=${slug}&_embed`, {
      cache: "no-store",
    });
    if (!res.ok) return null;
    const data: TempleDetail[] = await res.json();
    return data.length > 0 ? data[0] : null;
  } catch (error) {
    console.error("Error fetching single temple:", error);
    return null;
  }
}
// ==========================================
// 3. Fetch all states in single page
// ==========================================





// Saare states lane ke liye
export async function getAllStates(): Promise<StateRegion[]> {
  try {
    // Agar aapke lib me BASE_URL ya WP_API_URL jo bhi variable use hua hai, wahi use karein
    const res = await fetch(`${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/state_region?per_page=100`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      console.error("Failed to fetch states:", res.statusText);
      return [];
    }

    return await res.json();
  } catch (error) {
    console.error("Error fetching states:", error);
    return [];
  }
}

// 1. Slug ke zariye specific state fetch karna
export async function getStateBySlug(slug: string): Promise<StateRegion | null> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/state_region?slug=${slug}`,
      { next: { revalidate: 60 } }
    );
    if (!res.ok) return null;
    const states: StateRegion[] = await res.json();
    return states.length > 0 ? states[0] : null;
  } catch (error) {
    console.error("Error fetching state by slug:", error);
    return null;
  }
}

// 2. State ki ID ke aadhar par uske temples fetch karna
export async function getTemplesByStateId(stateId: number, perPage: number = 6, page: number = 1): Promise<TempleDetail[]> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/temples?state_region=${stateId}&per_page=${perPage}&page=${page}&_embed`,
      { next: { revalidate: 60 } }
    );
    if (!res.ok) return [];
    return await res.json();
  } catch (error) {
    console.error("Error fetching temples by state:", error);
    return [];
  }
}
export async function getWarriorsByState(stateId: number): Promise<WarriorDetail[]> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/warriors?state_region=${stateId}&_embed&per_page=10`,
      { next: { revalidate: 3600 } }
    );

    if (!res.ok) {
      return [];
    }

    return await res.json();
  } catch (error) {
    console.error("Error fetching warriors:", error);
    return [];
  }
}

// warrios page list na single page
export async function getAllWarriors(perPage = 12, page = 1): Promise<WarriorDetail[]> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/warriors?_embed&per_page=${perPage}&page=${page}`,
      { next: { revalidate: 3600 } }
    );

    if (!res.ok) return [];
    return await res.json();
  } catch (error) {
    console.error("Error fetching all warriors:", error);
    return [];
  }
}
export async function getWarriorBySlug(slug: string): Promise<WarriorDetail | null> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/warriors?slug=${slug}&_embed`,
      { next: { revalidate: 3600 } }
    );

    if (!res.ok) return null;

    const warriors: WarriorDetail[] = await res.json();
    return warriors.length > 0 ? warriors[0] : null;
  } catch (error) {
    console.error("Error fetching warrior by slug:", error);
    return null;
  }
}