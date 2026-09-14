import React from "react";
import Image from "next/image";

export function AdminIcon() {
  return (
    <Image
      src="/img/thawwafi-logogram.png"
      alt="Thawwafi Tour"
      width={24}
      height={24}
      style={{ height: "24px", width: "auto", objectFit: "contain" }}
      priority
    />
  );
}

export default AdminIcon;

