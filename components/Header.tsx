// components/Header.tsx
import Link from "next/link";

export default function Header() {
  return (
    <header
      style={{
        borderBottom: "1px solid #e5e7eb",
        background: "#ffffff",
        position: "sticky",
        top: 0,
        zIndex: 10,
      }}
    >
      <div
        style={{
          maxWidth: "1000px",
          margin: "0 auto",
          padding: "16px 24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontFamily: "sans-serif",
        }}
      >
        {/* Brand / Logo */}
        <Link
          href="/"
          style={{
            fontSize: "20px",
            fontWeight: "bold",
            color: "#111827",
            textDecoration: "none",
          }}
        >
          WP Headless<span style={{ color: "#2563eb" }}>.Next</span>
        </Link>

        {/* Navigation Links */}
        <nav style={{ display: "flex", gap: "20px" }}>
          <Link
            href="/"
            style={{
              color: "#4b5563",
              textDecoration: "none",
              fontSize: "15px",
              fontWeight: 500,
            }}
          >
            Home
          </Link>
          <Link
            href="/states"
            style={{
              color: "#4b5563",
              textDecoration: "none",
              fontSize: "15px",
              fontWeight: 500,
            }}
          >
            Bharat Yatra
          </Link>
          
          <Link
            href="/temples"
            style={{
              color: "#4b5563",
              textDecoration: "none",
              fontSize: "15px",
              fontWeight: 500,
            }}
          >
            Temples
          </Link>
          <Link
            href="/warriors"
            style={{
              color: "#4b5563",
              textDecoration: "none",
              fontSize: "15px",
              fontWeight: 500,
            }}
          >
            Warriors
          </Link>
          <Link
            href="/blog"
            style={{
              color: "#4b5563",
              textDecoration: "none",
              fontSize: "15px",
              fontWeight: 500,
            }}
          >
            Blog
          </Link>
        </nav>
      </div>
    </header>
  );
}