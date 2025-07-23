"use client";
import { motion, Variants } from "framer-motion";

// Re-exporting motion components for easy import
export const MotionDiv = motion.div;
export const MotionH2 = motion.h2;
export const MotionP = motion.p;
export const MotionButton = motion.button;
export const MotionSection = motion.section;
export const MotionA = motion.a;

/**
 * A container variant that staggers the animation of its children.
 * Adds a slight delay before the children start animating for a smoother entry.
 * By adding `: Variants`, we ensure this object conforms to Framer Motion's expected type.
 */
export const container: Variants = {
  hidden: { opacity: 1 }, // Start with opacity 1 to avoid flash of content
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

/**
 * A general item variant for a subtle fade-in-up effect.
 * Uses a gentle ease-in-out transition for a professional feel.
 */
export const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeInOut",
    },
  },
};

/**
 * A variant for feature cards, providing a slightly more pronounced
 * fade-in-up effect. Uses a custom cubic bezier for a refined easing curve.
 */
export const featureItem: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.4, 0.0, 0.2, 1], // Custom cubic-bezier for a smooth, decelerating effect
    },
  },
};

/**
 * A variant for tutorial steps, creating a slide-in-from-left effect.
 * Ideal for sequential content.
 */
export const tutorialStep: Variants = {
  hidden: { opacity: 0, x: -40 },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.7,
      ease: "easeInOut",
    },
  },
};
