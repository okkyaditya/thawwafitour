"use client";

import { useState } from "react";
import {
  Building2,
  ChevronLeft,
  ChevronRight,
  Compass,
  CreditCard,
  Landmark,
  Plane,
  TrainFront,
  type LucideIcon,
} from "lucide-react";
import { motion, AnimatePresence } from "./motion/MotionWrapper";

export interface Partner {
  name: string;
  category: string;
  icon: LucideIcon;
}

const PARTNERS_DATA: Partner[] = [
  { name: "Garuda Indonesia", category: "Maskapai Nasional", icon: Plane },
  { name: "Saudi Airlines", category: "Maskapai Saudia", icon: Plane },
  { name: "Qatar Airways", category: "Maskapai Bintang 5", icon: Plane },
  { name: "Emirates", category: "Maskapai Global", icon: Plane },
  { name: "Haramain Train", category: "Kereta Cepat HSR", icon: TrainFront },
  { name: "Kemenag RI", category: "Regulator PPIU", icon: Landmark },
  { name: "Nusuk", category: "Platform Saudi", icon: Compass },
  { name: "Visa", category: "Layanan Visa", icon: CreditCard },
  { name: "BSI", category: "Bank Syariah Indonesia", icon: Building2 },
];

export default function PartnerGrid() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;
  const totalPages = Math.ceil(PARTNERS_DATA.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentPartners = PARTNERS_DATA.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="space-y-8">
      {/* 3x3 Grid with AnimatePresence */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto min-h-[360px]"
        >
          {currentPartners.map((partner) => (
            <div
              key={partner.name}
              className="group flex flex-col items-center justify-center gap-3 rounded-2xl border border-cream-200 bg-cream-50/60 p-5 sm:p-6 text-center transition-all duration-300 hover:bg-white hover:border-gold-300 hover:shadow-md"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gold-100/80 text-gold-600 transition-colors group-hover:bg-pine-950 group-hover:text-gold-400">
                <partner.icon className="h-6 w-6" />
              </span>
              <div>
                <p className="font-head text-base font-bold text-pine-950 leading-tight">{partner.name}</p>
                <p className="mt-1 text-xs text-ink-400">{partner.category}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-3 pt-2">
          <button
            type="button"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            aria-label="Halaman sebelumnya"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-cream-200 bg-white text-ink-600 shadow-xs hover:border-pine-950 hover:text-pine-950 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          <div className="flex items-center gap-1.5 px-2">
            {Array.from({ length: totalPages }).map((_, idx) => {
              const pageNum = idx + 1;
              const isActive = currentPage === pageNum;
              return (
                <button
                  key={pageNum}
                  type="button"
                  onClick={() => setCurrentPage(pageNum)}
                  className={`h-8 min-w-[32px] rounded-full px-3 text-xs font-bold transition-all cursor-pointer ${
                    isActive
                      ? "bg-pine-950 text-gold-400 shadow-xs"
                      : "bg-cream-100 text-ink-500 hover:bg-cream-200 hover:text-pine-950"
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            aria-label="Halaman selanjutnya"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-cream-200 bg-white text-ink-600 shadow-xs hover:border-pine-950 hover:text-pine-950 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
}
