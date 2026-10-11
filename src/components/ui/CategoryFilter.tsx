"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface CategoryOption<T extends string = string> {
  id: T;
  label: string;
  count?: number;
  icon?: React.ReactNode;
}

export interface CategoryFilterProps<T extends string = string> {
  categories: CategoryOption<T>[];
  activeCategory: T;
  onSelectCategory: (categoryId: T) => void;
  className?: string;
  scrollOffset?: number;
  ariaLabel?: string;
  variant?: "pill" | "rounded";
}

/**
 * CategoryFilter Component
 * Single-row horizontal slider with touch scrolling, iOS momentum,
 * smooth scrolling, and dynamic Left/Right navigation buttons with boundary checks.
 */
export function CategoryFilter<T extends string = string>({
  categories,
  activeCategory,
  onSelectCategory,
  className = "",
  scrollOffset = 200,
  ariaLabel = "Filter Kategori",
  variant = "pill",
}: CategoryFilterProps<T>) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const activeTabRef = useRef<HTMLButtonElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  // Check scroll boundary to toggle Left/Right buttons
  const checkScrollability = useCallback(() => {
    const el = scrollContainerRef.current;
    if (!el) return;

    const { scrollLeft, scrollWidth, clientWidth } = el;
    // Allow a 5px tolerance threshold for fractional pixel measurements
    setCanScrollLeft(scrollLeft > 5);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 5);
  }, []);

  // Smooth scroll handler
  const handleScroll = (direction: "left" | "right") => {
    const el = scrollContainerRef.current;
    if (!el) return;

    const amount = direction === "left" ? -scrollOffset : scrollOffset;
    el.scrollBy({
      left: amount,
      behavior: "smooth",
    });
  };

  // Keyboard navigation for accessible tablist
  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      const nextIndex = (index + 1) % categories.length;
      onSelectCategory(categories[nextIndex].id);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      const prevIndex = (index - 1 + categories.length) % categories.length;
      onSelectCategory(categories[prevIndex].id);
    }
  };

  // Set up event listeners on mount, resize, and category changes
  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;

    // Initial check
    checkScrollability();

    // Check after microtask for DOM layout stability
    const timer = setTimeout(checkScrollability, 100);

    const handleResize = () => {
      checkScrollability();
    };

    window.addEventListener("resize", handleResize);

    // Optional ResizeObserver for element-specific dimension changes
    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver(() => {
        checkScrollability();
      });
      resizeObserver.observe(el);
    }

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", handleResize);
      if (resizeObserver) resizeObserver.disconnect();
    };
  }, [checkScrollability, categories]);

  // Keep active tab visible when changed
  useEffect(() => {
    if (activeTabRef.current) {
      activeTabRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "nearest",
      });
    }
  }, [activeCategory]);

  return (
    <div
      className={`relative flex items-center w-full max-w-full group/filter ${className}`}
    >
      {/* Left Gradient Overlay & Navigation Button */}
      <div
        className={`absolute left-0 inset-y-0 flex items-center z-10 transition-opacity duration-200 ${
          canScrollLeft
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Soft fading mask */}
        <div className="absolute left-0 inset-y-0 w-12 bg-gradient-to-r from-[#faf9f6] via-[#faf9f6]/80 to-transparent pointer-events-none" />

        {/* Circular Scroll Button */}
        <button
          type="button"
          onClick={() => handleScroll("left")}
          aria-label="Scroll left"
          className="relative ml-0.5 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-700 shadow-md flex items-center justify-center text-slate-700 dark:text-slate-200 hover:text-slate-900 hover:bg-slate-50 transition-all duration-150 active:scale-95 focus:outline-none focus:ring-2 focus:ring-slate-900/20"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
      </div>

      {/* ── Strict Single-Row Horizontal Scroll Container ── */}
      <div
        ref={scrollContainerRef}
        onScroll={checkScrollability}
        role="tablist"
        aria-label={ariaLabel}
        style={{ WebkitOverflowScrolling: "touch" }}
        className="flex flex-nowrap items-center gap-1.5 sm:gap-2 overflow-x-auto scroll-smooth overscroll-x-contain py-1.5 px-1 w-full [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
      >
        {categories.map((cat, idx) => {
          const isActive = activeCategory === cat.id;

          return (
            <button
              key={cat.id}
              ref={isActive ? activeTabRef : null}
              role="tab"
              type="button"
              id={`tab-${cat.id}`}
              aria-selected={isActive}
              aria-controls={`tabpanel-${cat.id}`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => onSelectCategory(cat.id)}
              onKeyDown={(e) => handleKeyDown(e, idx)}
              className={`shrink-0 flex-shrink-0 whitespace-nowrap text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/30 flex items-center gap-1.5 ${
                variant === "pill"
                  ? "rounded-full px-4 py-2"
                  : "rounded-xl px-3.5 py-1.5"
              } ${
                isActive
                  ? "bg-slate-900 text-white shadow-xs font-semibold"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 bg-white/70 border border-slate-200/60"
              }`}
            >
              {cat.icon && <span className="shrink-0">{cat.icon}</span>}
              <span>{cat.label}</span>
              {typeof cat.count === "number" && (
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                    isActive
                      ? "bg-white/20 text-white"
                      : "bg-slate-200/70 text-slate-700"
                  }`}
                >
                  {cat.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Right Gradient Overlay & Navigation Button */}
      <div
        className={`absolute right-0 inset-y-0 flex items-center z-10 transition-opacity duration-200 ${
          canScrollRight
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Soft fading mask */}
        <div className="absolute right-0 inset-y-0 w-12 bg-gradient-to-l from-[#faf9f6] via-[#faf9f6]/80 to-transparent pointer-events-none" />

        {/* Circular Scroll Button */}
        <button
          type="button"
          onClick={() => handleScroll("right")}
          aria-label="Scroll right"
          className="relative mr-0.5 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-700 shadow-md flex items-center justify-center text-slate-700 dark:text-slate-200 hover:text-slate-900 hover:bg-slate-50 transition-all duration-150 active:scale-95 focus:outline-none focus:ring-2 focus:ring-slate-900/20"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
