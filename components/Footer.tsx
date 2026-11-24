"use client";
import Link from "next/link";

export default function Footer() {
  const currentYear = 2026; // Get the current year dynamically

  return (
    <footer
      style={{
        borderTop: "1px solid #e5e7eb",
        background: "#f9fafb",
        marginTop: "auto",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "1000px",
          margin: "0 auto",
          padding: "32px 24px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "12px",
          color: "#6b7280",
          fontSize: "14px",
        }}
      >
        <p style={{ margin: 0 }}>
          © {currentYear} WP Headless Next.js Blog. All rights reserved.
        </p>
        <div style={{ display: "flex", gap: "16px" }}>
          <Link
            href="/blog"
            style={{ color: "#2563eb", textDecoration: "none" }}
          >
            Latest Posts
          </Link>
          <span>•</span>
          <a
            href="https://wordpress.org"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#2563eb", textDecoration: "none" }}
          >
            Powered by WordPress
          </a>
        </div>
      </div>
    </footer>
  );
}