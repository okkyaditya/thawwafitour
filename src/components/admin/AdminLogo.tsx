import React from "react";
import Image from "next/image";

export function AdminLogo() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "4px 0" }}>
      <Image
        src="/img/thawwafi-logofull.png"
        alt="Thawwafi Tour Admin"
        width={140}
        height={42}
        style={{ height: "32px", width: "auto", objectFit: "contain" }}
        priority
      />
    </div>
  );
}

export default AdminLogo;

