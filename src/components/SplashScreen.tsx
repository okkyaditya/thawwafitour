"use client";

import { useEffect, useState } from "react";
import Logo from "./Logo";

export default function SplashScreen() {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Only show on first session visit
    const hasSeen = typeof window !== "undefined" && window.sessionStorage.getItem("thawwafi_splash_seen");
    if (!hasSeen) {
      setVisible(true);
      setMounted(true);
      window.sessionStorage.setItem("thawwafi_splash_seen", "true");

      const timer = setTimeout(() => {
        setVisible(false);
        setTimeout(() => setMounted(false), 400);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, []);

  if (!mounted) return null;

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-pine-950 transition-opacity duration-400 ease-out pointer-events-none ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Logo */}
      <Logo className="h-16 w-auto" />

      {/* Tagline */}
      <p className="mt-4 text-xs sm:text-sm text-gold-400 tracking-wide">
        The journey of your <em>dream</em> in Sunnah.
      </p>

      {/* Loading indicator */}
      <div className="mt-6 flex gap-1.5">
        <span className="h-1.5 w-1.5 rounded-full bg-gold-400 animate-bounce" style={{ animationDelay: "0ms" }} />
        <span className="h-1.5 w-1.5 rounded-full bg-gold-400 animate-bounce" style={{ animationDelay: "150ms" }} />
        <span className="h-1.5 w-1.5 rounded-full bg-gold-400 animate-bounce" style={{ animationDelay: "300ms" }} />
      </div>
    </div>
  );
}
