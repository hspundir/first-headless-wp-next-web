import Link from "next/link";
import Image from "next/image";

export const instant = false;

interface WPPost {
  id: number;
  slug: string;
  title: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  _embedded?: {
    "wp:featuredmedia"?: Array<{
      source_url: string;
      alt_text?: string;
    }>;
  };
}

interface FetchResult {
  posts: WPPost[];
  totalPages: number;
}

// 5 posts per page mangwane wala function
async function getWordPressPosts(pageNumber: number): Promise<FetchResult> {
  const perPage = 5;
  const res = await fetch(
    `http://localhost/wordpress/wp-json/wp/v2/posts?_embed&per_page=${perPage}&page=${pageNumber}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    return { posts: [], totalPages: 1 };
  }

  // WordPress header se total pages ki sankhya nikalna
  const totalPages = parseInt(res.headers.get("X-WP-TotalPages") || "1", 10);
  const posts: WPPost[] = await res.json();

  return { posts, totalPages };
}

export default async function BlogListingPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  // URL se query param nikalna (e.g. /blog?page=2)
  const resolvedParams = await searchParams;
  const currentPage = parseInt(resolvedParams.page || "1", 10);

  const { posts, totalPages } = await getWordPressPosts(currentPage);

  return (
    <main style={{ padding: "40px", maxWidth: "800px", margin: "auto", fontFamily: "sans-serif" }}>
      <h1 style={{ fontSize: "28px", color: "#111827", marginBottom: "8px" }}>
        WordPress Blog Posts
      </h1>
      <p style={{ color: "#6b7280", marginBottom: "24px", fontSize: "14px" }}>
        Showing Page {currentPage} of {totalPages}
      </p>

      {/* Post List */}
      <div style={{ display: "grid", gap: "24px" }}>
        {posts.map((post) => {
          const imageUrl = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
          const imageAlt = post._embedded?.["wp:featuredmedia"]?.[0]?.alt_text || post.title.rendered;

          return (
            <div
              key={post.id}
              style={{
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                background: "#ffffff",
                overflow: "hidden",
                boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
              }}
            >
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

              <div style={{ padding: "20px" }}>
                <h2
                  style={{ fontSize: "20px", margin: "0 0 10px 0", color: "#1f2937" }}
                  dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                />

                <div
                  style={{ color: "#4b5563", fontSize: "14px", lineHeight: "1.6", marginBottom: "16px" }}
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
        })}
      </div>

      {/* Pagination Controls (Next / Prev Buttons) */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "40px",
          paddingTop: "20px",
          borderTop: "1px solid #e5e7eb",
        }}
      >
        {/* Previous Button */}
        {currentPage > 1 ? (
          <Link
            href={`/blog?page=${currentPage - 1}`}
            style={{
              padding: "10px 20px",
              background: "#1f2937",
              color: "#ffffff",
              borderRadius: "6px",
              textDecoration: "none",
              fontSize: "14px",
            }}
          >
            ← Previous Page
          </Link>
        ) : (
          <span
            style={{
              padding: "10px 20px",
              background: "#f3f4f6",
              color: "#9ca3af",
              borderRadius: "6px",
              fontSize: "14px",
              cursor: "not-allowed",
            }}
          >
            ← Previous Page
          </span>
        )}

        <span style={{ fontSize: "14px", color: "#4b5563" }}>
          Page {currentPage} of {totalPages}
        </span>

        {/* Next Button */}
        {currentPage < totalPages ? (
          <Link
            href={`/blog?page=${currentPage + 1}`}
            style={{
              padding: "10px 20px",
              background: "#1f2937",
              color: "#ffffff",
              borderRadius: "6px",
              textDecoration: "none",
              fontSize: "14px",
            }}
          >
            Next Page →
          </Link>
        ) : (
          <span
            style={{
              padding: "10px 20px",
              background: "#f3f4f6",
              color: "#9ca3af",
              borderRadius: "6px",
              fontSize: "14px",
              cursor: "not-allowed",
            }}
          >
            Next Page →
          </span>
        )}
      </div>
    </main>
  );
}