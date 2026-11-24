import {notFound} from "next/navigation";
import Image from "next/image";
import type { Metadata } from "next";
import { getPostBySlug } from "@/lib/wordpress";
// Next.js ko batata hai ki yeh route dynamic hai (warning turant gayab ho jayegi)
export const instant = false;/* 
interface WPPostDetail{
  id: number;
  slug: string;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  date: string;
  _embedded?: {
    "wp:featuredmedia"?: Array<{
      source_url: string;
      alt_text?: string;
    }>;
  }; 
}*/
//1. data typeScript interface for the article
/* interface Article {
    slug: string;
    title: string;
    category: string;
    content: string;
} */
// 2. dummy data for the articles
/* const articles: Article[] = [
   {
    slug: "react-basics",
    title: "React Fundamentals in 2026",
    category: "Frontend",
    content: "React components are independent, reusable bits of code that return HTML-like UI.",
  },
  {
    slug: "nextjs-routing",
    title: "Understanding Dynamic Slugs in Next.js",
    category: "Next.js",
    content: "Dynamic routes use square brackets [slug] to match arbitrary URL segments cleanly.",
  },
  {
    slug: "shivaji-maharaj",
    title: "Chhatrapati Shivaji Maharaj - Hindavi Swarajya",
    category: "History",
    content: "Visionary military leader and pioneer of guerrilla tactics across the Western Ghats.",
  },
] */
/* export async function generateStaticParams() {
  return articles.map((item) => ({
    slug: item.slug,
  }));
} */
//3 Next.js  15+ props interface
/* interface PageProps {
    params: Promise<{ 
        slug: string 
    }>;
} */
// genrate single post according to slug from wordpress
/* async function getPostBySlug (slug: string): Promise<WPPostDetail | null> {
    const res = await fetch(`http://localhost/wordpress/wp-json/wp/v2/posts?slug=${slug}&_embed`, { cache: "no-store" });
    if (!res.ok) {
        return null; // Agar post nahi mila to null return karo
    }
    const posts = await res.json();
    if (!posts || posts.length === 0) {
        return null; // Agar post nahi mila to null return karo
    }
    return posts[0];
} */
// 1. Next.js ka built-in SEO / Tab Title generator
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  // WordPress HTML entities (jaise &#8211;) ko clean plain text title banana
  return {
    title: `${post.title.rendered} | My WP Blog`,
    description: post.excerpt?.rendered.replace(/<[^>]+>/g, "").slice(0, 160),
  };
}
export default async function DynamicBlogPage({ params} :{params: Promise<{ 
        slug: string 
    }>}) {
    const { slug } = await params;
    const post = await getPostBySlug(slug);
    if (!post) {
        notFound();
    }
    const featuredImage = post._embedded?.["wp:featuredmedia"]?.[0].source_url;
    const imageAlt = post._embedded?.["wp:featuredmedia"]?.[0].alt_text || post.title.rendered;
    return (
      <main style={{ padding: "40px", maxWidth: "800px", margin: "auto", fontFamily: "sans-serif" }}>
      <p style={{ color: "#fff", fontWeight: "bold", textTransform: "uppercase", fontSize: "12px" }}>
        SLUG: /{slug}
      </p>

      {/* Title of the post */}
      <h1
        style={{ fontSize: "32px", color: "#ffffff", marginTop: "8px", marginBottom: "8px" }}
        dangerouslySetInnerHTML={{ __html: post.title.rendered }}
      />

      <time style={{ color: "#6b7280", fontSize: "14px", display: "block", marginBottom: "24px" }}>
        Published on: {new Date(post.date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
      </time>
      {/* Featured Image अगर WordPress पोस्ट में सेट है */}
            {featuredImage && (
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  height: "400px",
                  marginBottom: "24px",
                  borderRadius: "8px",
                  overflow: "hidden",
                }}
              >
                <Image
                  src={featuredImage}
                  alt={imageAlt}
                  fill
                  style={{ objectFit: "cover" }}
                  priority
                />
              </div>
            )}
      {/* वर्डप्रेस का पूरा आर्टिकल कंटेंट */}
      {post.content?.rendered ? (<div
        style={{
          padding: "24px",
          background: "#ffffff",
          border: "1px solid #e5e7eb",
          borderRadius: "8px",
          lineHeight: "1.8",
          color: "#374151",
          boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
        }}
        dangerouslySetInnerHTML={{ __html: post.content.rendered }}
      />) : (<div
    style={{
      padding: "24px",
      background: "#f9fafb",
      border: "1px dashed #d1d5db",
      borderRadius: "8px",
      color: "#6b7280",
      fontStyle: "italic",
    }}
  >
    No content available for this post yet.
  </div>)}
    </main>);
    {/* <main style={{ padding: "40px", maxWidth: "700px", margin: "auto", fontFamily: "sans-serif" }}>
      <p style={{ color: "#2563eb", fontWeight: "bold", textTransform: "uppercase", fontSize: "12px" }}>
        {article.category} • slug: /{slug}
      </p>

      <h1 style={{ fontSize: "32px", color: "#ffffff", marginTop: "8px", marginBottom: "16px" }}>
        {article.title}
      </h1>

      <div style={{ padding: "20px", background: "#f9fafb", border: "1px solid #e5e7eb", borderRadius: "8px", lineHeight: "1.6", color: "#374151" }}>
        {article.content}
      </div>
    </main> */}


}