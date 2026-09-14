"use client";

import { motion } from "@/components/motion/MotionWrapper";

export default function BadgeClient({ type }: { type?: string }) {
  if (!type || type === "none") return null;
  return (
    <motion.span
      animate={{
        scale: [1, 1.06, 0.98, 1.05, 1],
        rotate: [0, -2, 2, -1.5, 0],
      }}
      transition={{
        duration: 1.8,
        repeat: Infinity,
        repeatDelay: 2,
        ease: "easeInOut",
      }}
      className="inline-block rounded-md bg-orange-500 px-3 py-1 text-[11px] font-bold text-white uppercase tracking-wider shadow-md select-none"
    >
      {type === "limited" ? "LIMITED SEAT" : "PROMO TERBATAS"}
    </motion.span>
  );
}
