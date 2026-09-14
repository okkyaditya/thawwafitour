import React from "react";

export function BeforeNavLinks() {
  return (
    <div style={{ padding: "8px 12px 14px 12px" }}>
      <a
        href="/"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "8px",
          width: "100%",
          padding: "8px 12px",
          borderRadius: "8px",
          background: "rgba(197, 168, 105, 0.12)",
          border: "1px solid rgba(197, 168, 105, 0.3)",
          color: "var(--theme-elevation-800, #1F2E23)",
          fontSize: "12px",
          fontWeight: 600,
          textDecoration: "none",
          transition: "all 0.15s ease",
        }}
      >
        <span>🌐</span>
        <span>Buka Website</span>
      </a>
    </div>
  );
}

export default BeforeNavLinks;
