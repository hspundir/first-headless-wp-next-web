import { getAllPosts } from "@/lib/wordpress";
import PostCard from "@/components/PostCard";

export const instant = false;

export default async function BlogListingPage() {
  const posts = await getAllPosts();

  return (
    <main
      style={{
        padding: "40px",
        maxWidth: "800px",
        margin: "auto",
        fontFamily: "sans-serif",
      }}
    >
      <h1 style={{ fontSize: "28px", color: "#fff", marginBottom: "24px" }}>
        WordPress Blog Posts
      </h1>

      <div style={{ display: "grid", gap: "24px" }}>
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </main>
  );
}





















// import Link from "next/link";
// import Image from "next/image";
// import { getAllPosts } from "@/lib/wordpress";
// export const instant = false;
// // वर्डप्रेस की पोस्ट का टाइप
// /* interface WPPost {
//     id: number;
//     slug: string;
//     title: {
//         rendered: string;
//     };
//     excerpt: {
//         rendered: string;
//     };
//      _embedded?: {
//     "wp:featuredmedia"?: Array<{
//       source_url: string;
//       alt_text?: string;
//     }>;
//   };
//     } */

// /* const articles = [
//   {
//     slug: "react-basics",
//     title: "React Fundamentals in 2026",
//     category: "Frontend",
//     excerpt: "React components are independent, reusable bits of code that return HTML-like UI.",
//   },
//   {
//     slug: "nextjs-routing",
//     title: "Understanding Dynamic Slugs in Next.js",
//     category: "Next.js",
//     excerpt: "Dynamic routes use square brackets [slug] to match arbitrary URL segments cleanly.",
//   },
//   {
//     slug: "shivaji-maharaj",
//     title: "Chhatrapati Shivaji Maharaj - Hindavi Swarajya",
//     category: "History",
//     excerpt: "Visionary military leader and pioneer of guerrilla tactics across the Western Ghats.",
//   },
// ]; */
// // get post from server
// /* async function getWordPressPosts(): Promise<WPPost[]> {
    
//     const res = await fetch("http://localhost/wordpress/wp-json/wp/v2/posts?_embed", { cache: "no-store", });
//     if (!res.ok) {
//     throw new Error("Failed to fetch posts from WordPress");
//   }
//   const posts = await res.json();
//   return posts;
// } */
// export default async function BlogListingPage() {
//   const posts = await getAllPosts();
//   return (
//     <main style={{ padding: "40px", maxWidth: "800px", margin: "auto", fontFamily: "sans-serif" }}>
//       <h1 style={{ fontSize: "28px", color: "#ffffff", marginBottom: "24px" }}>
//         Live from WordPress
//       </h1>
//       <div style={{ display: "grid", gap: "20px" }}>
//         {posts.map((post) => {
//           // Logic aur variable yahan banaye
//           const imageUrl = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
//           const imageAlt = post._embedded?.["wp:featuredmedia"]?.[0]?.alt_text || post.title.rendered;

//           // Jaise hi { } lagaya, ab manual "return" likhna compulsory ho gaya!      

//           return (
//             <div
//               key={post.id}
//               style={{
//                 border: "1px solid #e5e7eb",
//                 borderRadius: "8px",
//                 background: "#ffffff",
//                 overflow: "hidden",
//                 boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
//               }}
//             >
//               {/* Featured Image (agar WordPress me set hai) */}
//               {imageUrl && (
//                 <div style={{ position: "relative", width: "100%", height: "220px" }}>
//                   <Image src={imageUrl} alt={imageAlt} fill style={{ objectFit: "cover" }} />
//                 </div>
//               )}
//               <div
//                 style={{
//                   padding: "20px",
//                   border: "1px solid #e5e7eb",
//                   borderRadius: "8px",
//                   background: "#ffffff",
//                   boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
//                 }}
//               >
//                 {/* वर्डप्रेस का टाइटल */}
//                 <h2
//                   style={{ fontSize: "22px", margin: "0 0 10px 0", color: "#1f2937" }}
//                   dangerouslySetInnerHTML={{ __html: post.title.rendered }}
//                 />

//                 {/* वर्डप्रेस का एक्सेप्ट (HTML टैग्स के साथ आता है) */}
//                 <div style={{ color: "#4b5563", fontSize: "14px", lineHeight: "1.6", marginBottom: "16px" }} dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} />
//                 {/* डायनामिक लिंक वर्डप्रेस के असली slug के साथ */}
//                 <Link
//                   href={`/blog/${post.slug}`}
//                   style={{
//                     display: "inline-block",
//                     padding: "8px 16px",
//                     background: "#2563eb",
//                     color: "#ffffff",
//                     borderRadius: "6px",
//                     textDecoration: "none",
//                     fontSize: "14px",
//                     fontWeight: "bold",
//                   }}
//                 >
//                   पूरा पढ़ें →
//                 </Link>
//               </div>
//             </div>
//           )
//         })}
//       </div>
//     </main>);

//   {/* <main style={{ padding: "40px", maxWidth: "700px", margin: "auto", fontFamily: "sans-serif" }}>
//       <h1 style={{ fontSize: "28px", color: "#fff", marginBottom: "24px" }}>
//         Articles List
//       </h1>

//       <div style={{ display: "grid", gap: "16px" }}>
//         {articles.map((item) => (
//           <div
//             key={item.slug}
//             style={{
//               padding: "20px",
//               border: "1px solid #e5e7eb",
//               borderRadius: "8px",
//               background: "#ffffff",
//             }}
//           >
//             <span style={{ fontSize: "12px", color: "#2563eb", fontWeight: "bold", textTransform: "uppercase" }}>
//               {item.category}
//             </span>

//             <h2 style={{ fontSize: "20px", margin: "8px 0", color: "#1f2937" }}>
//               {item.title}
//             </h2>

//             <p style={{ color: "#4b5563", fontSize: "14px", marginBottom: "16px" }}>
//               {item.excerpt}
//             </p>

//             <Link
//               href={`/blog/${item.slug}`}
//               style={{
//                 display: "inline-block",
//                 padding: "8px 16px",
//                 background: "#2563eb",
//                 color: "#ffffff",
//                 borderRadius: "6px",
//                 textDecoration: "none",
//                 fontSize: "14px",
//                 fontWeight: "bold",
//               }}
//             >
//               पूरा पढ़ें →
//             </Link>
//           </div>
//         ))}
//       </div>
//     </main> */}

// };