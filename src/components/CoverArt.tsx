import type { ReactElement } from "react";

export function CoverArt({ category }: { category: string }) {
  const art: Record<string, ReactElement> = {
    ruby: (
      <svg viewBox="0 0 400 260" fill="none" className="w-full h-full">
        <rect width="400" height="260" fill="#1F2E23" />
        <path d="M200 40 L280 120 L200 200 L120 120Z" fill="#C5A869" opacity="0.3" />
        <path d="M200 80 L250 120 L200 160 L150 120Z" fill="#C5A869" opacity="0.6" />
        <text x="200" y="230" textAnchor="middle" fill="#C5A869" fontSize="14" fontFamily="serif" opacity="0.7">RUBY</text>
      </svg>
    ),
    sapphire: (
      <svg viewBox="0 0 400 260" fill="none" className="w-full h-full">
        <rect width="400" height="260" fill="#1a2744" />
        <circle cx="200" cy="110" r="60" fill="none" stroke="#C5A869" strokeWidth="2" opacity="0.5" />
        <circle cx="200" cy="110" r="40" fill="none" stroke="#C5A869" strokeWidth="1.5" opacity="0.4" />
        <path d="M180 90 L200 70 L220 90 L220 130 L200 150 L180 130Z" fill="#C5A869" opacity="0.5" />
        <text x="200" y="230" textAnchor="middle" fill="#C5A869" fontSize="14" fontFamily="serif" opacity="0.7">SAPPHIRE</text>
      </svg>
    ),
    diamond: (
      <svg viewBox="0 0 400 260" fill="none" className="w-full h-full">
        <rect width="400" height="260" fill="#16211A" />
        <path d="M200 30 L260 100 L200 170 L140 100Z" fill="none" stroke="#D4AF37" strokeWidth="2" opacity="0.6" />
        <path d="M200 60 L240 110 L200 160 L160 110Z" fill="#D4AF37" opacity="0.4" />
        <path d="M200 80 L225 110 L200 140 L175 110Z" fill="#D4AF37" opacity="0.7" />
        <text x="200" y="230" textAnchor="middle" fill="#D4AF37" fontSize="14" fontFamily="serif" opacity="0.7">DIAMOND</text>
      </svg>
    ),
  };
  return art[category] || art.ruby;
}
