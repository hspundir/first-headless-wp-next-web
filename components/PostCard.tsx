import Link from "next/link";
import Image from "next/image";
import { WPPost } from "@/lib/wordpress";

interface PostCardProps {
  post: WPPost;
}

export default function PostCard({ post }: PostCardProps) {
  const imageUrl = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
  const imageAlt = post._embedded?.["wp:featuredmedia"]?.[0]?.alt_text || post.title.rendered;

  return (
    <div
      style={{
        border: "1px solid #e5e7eb",
        borderRadius: "8px",
        background: "#ffffff",
        overflow: "hidden",
        boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
      }}
    >
      {/* Featured Image */}
      {imageUrl && (
        <div style={{ position: "relative", width: "100%", height: "220px" }}>
          <Image
            src={imageUrl}
            alt={imageAlt}
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
      )}

      {/* Post Content */}
      <div style={{ padding: "20px" }}>
        <h2
          style={{ fontSize: "20px", margin: "0 0 10px 0", color: "#1f2937" }}
          dangerouslySetInnerHTML={{ __html: post.title.rendered }}
        />

        <div
          style={{
            color: "#4b5563",
            fontSize: "14px",
            lineHeight: "1.6",
            marginBottom: "16px",
          }}
          dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
        />

        <Link
          href={`/blog/${post.slug}`}
          style={{
            display: "inline-block",
            padding: "8px 16px",
            background: "#2563eb",
            color: "#ffffff",
            borderRadius: "6px",
            textDecoration: "none",
            fontSize: "14px",
            fontWeight: "bold",
          }}
        >
          Read More →
        </Link>
      </div>
    </div>
  );
}