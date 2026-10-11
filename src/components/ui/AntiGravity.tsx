"use client";

import React from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

export interface AntiGravityProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  /** Floating movement speed / behavior */
  floatSpeed?: "slow" | "medium" | "fast" | "drift" | "bob" | "gentle" | "none";
  /** Add dynamic zero-gravity lifting shadow */
  withShadow?: boolean;
  /** Add gold breathing ambient glow */
  withGlow?: boolean;
  /** Direction from which the element floats in upon scroll */
  revealDirection?: "up" | "down" | "left" | "right" | "none";
  /** Distance in pixels for the reveal entrance (default: 24) */
  revealDistance?: number;
  /** Delay before reveal animation begins (seconds) */
  revealDelay?: number;
  /** Pause floating animation when user hovers */
  pauseOnHover?: boolean;
  /** Stagger index (0, 1, 2, ...) to automatically offset float timing */
  staggerIndex?: number;
  /** Manual float animation delay in seconds */
  floatDelay?: number;
  className?: string;
  wrapperClassName?: string;
}

const SPEED_CLASSES: Record<string, string> = {
  slow: "antigravity-slow",
  medium: "antigravity-medium",
  fast: "antigravity-fast",
  drift: "antigravity-drift",
  bob: "antigravity-bob",
  gentle: "antigravity-gentle",
  none: "",
};

/**
 * AntiGravity Component
 *
 * Combines smooth scroll entrance (Scroll Reveal) with continuous, organic
 * anti-gravity levitation (Floating / Zero-G physics).
 */
export function AntiGravity({
  children,
  floatSpeed = "gentle",
  withShadow = false,
  withGlow = false,
  revealDirection = "up",
  revealDistance = 24,
  revealDelay = 0,
  pauseOnHover = true,
  staggerIndex,
  floatDelay,
  className,
  wrapperClassName,
  ...motionProps
}: AntiGravityProps) {
  // Compute initial reveal coordinates
  const getInitialCoords = () => {
    switch (revealDirection) {
      case "up":
        return { opacity: 0, y: revealDistance, x: 0 };
      case "down":
        return { opacity: 0, y: -revealDistance, x: 0 };
      case "left":
        return { opacity: 0, x: revealDistance, y: 0 };
      case "right":
        return { opacity: 0, x: -revealDistance, y: 0 };
      case "none":
        return { opacity: 1, x: 0, y: 0 };
    }
  };

  // Determine floating animation delay to ensure staggered natural movement
  const calculatedDelay =
    floatDelay !== undefined
      ? `${floatDelay}s`
      : staggerIndex !== undefined
      ? `${((staggerIndex * 0.45) % 3.0).toFixed(2)}s`
      : undefined;

  const floatClass = SPEED_CLASSES[floatSpeed] || "antigravity";
  const shadowClass = withShadow ? "antigravity-shadow" : "";
  const glowClass = withGlow ? "antigravity-glow" : "";
  const hoverClass = pauseOnHover ? "antigravity-pause-hover" : "";

  return (
    <motion.div
      initial={revealDirection !== "none" ? getInitialCoords() : undefined}
      whileInView={revealDirection !== "none" ? { opacity: 1, x: 0, y: 0 } : undefined}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
        delay: revealDelay,
      }}
      className={cn("relative will-change-transform", wrapperClassName)}
      {...motionProps}
    >
      <div
        className={cn(
          floatClass,
          shadowClass,
          glowClass,
          hoverClass,
          className
        )}
        style={calculatedDelay ? { animationDelay: calculatedDelay } : undefined}
      >
        {children}
      </div>
    </motion.div>
  );
}
