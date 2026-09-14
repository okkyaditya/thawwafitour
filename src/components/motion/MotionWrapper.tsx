"use client";

import { motion, AnimatePresence, type HTMLMotionProps, type Variants } from "motion/react";
import React from "react";

export { motion, AnimatePresence };

const EASE_LUXURY = [0.22, 1, 0.36, 1] as const;

// ─── 1. Page Transition Component ───
export function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 16 }}
      transition={{ duration: 0.45, ease: EASE_LUXURY }}
    >
      {children}
    </motion.div>
  );
}

// ─── 2. Fade In Scroll Reveal ───
interface FadeInProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  direction?: "up" | "down" | "left" | "right" | "none";
  delay?: number;
  duration?: number;
  distance?: number;
  className?: string;
  once?: boolean;
}

export function FadeIn({
  children,
  direction = "up",
  delay = 0,
  duration = 0.5,
  distance = 24,
  className = "",
  once = true,
  ...props
}: FadeInProps) {
  const getInitialOffset = () => {
    switch (direction) {
      case "up":
        return { y: distance, x: 0 };
      case "down":
        return { y: -distance, x: 0 };
      case "left":
        return { x: distance, y: 0 };
      case "right":
        return { x: -distance, y: 0 };
      default:
        return { x: 0, y: 0 };
    }
  };

  const offset = getInitialOffset();

  return (
    <motion.div
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, margin: "-40px" }}
      transition={{ duration, delay, ease: EASE_LUXURY }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// ─── 3. Stagger Container & Items ───
interface StaggerContainerProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  staggerDelay?: number;
  delayChildren?: number;
  className?: string;
  once?: boolean;
}

export function StaggerContainer({
  children,
  staggerDelay = 0.08,
  delayChildren = 0.05,
  className = "",
  once = true,
  ...props
}: StaggerContainerProps) {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-40px" }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className = "",
  distance = 20,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  distance?: number;
} & HTMLMotionProps<"div">) {
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: distance },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: EASE_LUXURY,
      },
    },
  };

  return (
    <motion.div variants={itemVariants} className={className} {...props}>
      {children}
    </motion.div>
  );
}

// ─── 4. Scale In (Subtle) ───
export function ScaleIn({
  children,
  delay = 0,
  duration = 0.45,
  className = "",
  once = true,
  ...props
}: {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
} & HTMLMotionProps<"div">) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once, margin: "-40px" }}
      transition={{ duration, delay, ease: EASE_LUXURY }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}
