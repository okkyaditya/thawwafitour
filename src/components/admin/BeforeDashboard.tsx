import React from "react";

export function BeforeDashboard() {
  return (
    <div
      style={{
        marginBottom: "28px",
        borderRadius: "16px",
        background: "linear-gradient(135deg, #16211A 0%, #1F2E23 60%, #2A3F30 100%)",
        border: "1px solid rgba(197, 168, 105, 0.3)",
        color: "#FDFCF7",
        padding: "24px 28px",
        boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.15)",
      }}
    >
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "16px",
        }}
      >
        <div>
          <span
            style={{
              display: "inline-block",
              background: "rgba(197, 168, 105, 0.18)",
              border: "1px solid rgba(197, 168, 105, 0.4)",
              color: "#E2C98C",
              padding: "4px 10px",
              borderRadius: "999px",
              fontSize: "11px",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "1px",
              marginBottom: "8px",
            }}
          >
            Portal Manajemen Resmi
          </span>
          <h1
            style={{
              margin: 0,
              fontFamily: "Georgia, serif",
              fontSize: "24px",
              fontWeight: 700,
              color: "#FFFFFF",
              letterSpacing: "-0.2px",
            }}
          >
            Selamat Datang di Admin <em style={{ color: "#E2C98C", fontStyle: "italic" }}>Thawwafi Tour</em>
          </h1>
          <p
            style={{
              margin: "6px 0 0 0",
              fontSize: "13px",
              color: "rgba(253, 252, 247, 0.75)",
              maxWidth: "600px",
              lineHeight: 1.5,
            }}
          >
            Kelola katalog paket umroh, artikel blog, testimoni jamaah, pembimbing asatidzah, dan konfigurasi resmi travel dengan mudah dan terstruktur.
          </p>
        </div>

        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              background: "#C5A869",
              color: "#16211A",
              fontWeight: 700,
              fontSize: "13px",
              padding: "10px 18px",
              borderRadius: "999px",
              textDecoration: "none",
              transition: "all 0.2s ease",
              boxShadow: "0 4px 12px rgba(197, 168, 105, 0.3)",
            }}
          >
            🌐 Lihat Website Utama
          </a>
        </div>
      </div>
    </div>
  );
}

export default BeforeDashboard;
