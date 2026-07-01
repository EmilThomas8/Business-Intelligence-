/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";

interface NavSection {
  id: string;
  label: string;
}

interface FloatingNavProps {
  onNavigate: (sectionId: string) => void;
}

export default function FloatingNav({ onNavigate }: FloatingNavProps) {
  const sections: NavSection[] = [
    { id: "hero", label: "Home" },
    { id: "courses", label: "Courses" },
    { id: "why-bil", label: "Why Us" },
    { id: "journey", label: "Career Paths" },
    { id: "faq", label: "FAQ" },
    { id: "contact", label: "Contact" },
  ];

  const [activeSection, setActiveSection] = useState("hero");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // 1. Calculate overall scroll progress for vertical connection line fill
  useEffect(() => {
    const handleScrollProgress = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = window.scrollY / totalHeight;
        setScrollProgress(currentProgress);
      }
    };

    window.addEventListener("scroll", handleScrollProgress);
    handleScrollProgress(); // Initial run

    return () => window.removeEventListener("scroll", handleScrollProgress);
  }, []);

  // 2. Track which section is active using IntersectionObserver
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-25% 0px -25% 0px", // Trigger when section occupies the main screen area
      threshold: 0.1,
    };

    const sectionElements = sections.map((s) => document.getElementById(s.id)).filter(Boolean);

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    sectionElements.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => {
      sectionElements.forEach((el) => {
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  // 3. Auto-hide when idle, reappearing on mouse movement (desktop only)
  useEffect(() => {
    const resetIdleTimer = () => {
      setIsVisible(true);

      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      // If mouse is hovered over the menu, don't auto-hide
      if (!isHovered) {
        timerRef.current = setTimeout(() => {
          setIsVisible(false);
        }, 3000); // 3 seconds idle time
      }
    };

    window.addEventListener("mousemove", resetIdleTimer);
    window.addEventListener("scroll", resetIdleTimer);
    resetIdleTimer(); // Initial call

    return () => {
      window.removeEventListener("mousemove", resetIdleTimer);
      window.removeEventListener("scroll", resetIdleTimer);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isHovered]);

  return (
    <AnimatePresence>
      {(isVisible || isHovered) && (
        <motion.div
          id="floating-section-nav"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.3 }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col items-center justify-center p-4 bg-slate-950/60 border border-white/10 backdrop-blur-md rounded-full shadow-2xl"
        >
          {/* Progress Connection Line */}
          <div className="absolute top-8 bottom-8 w-[2px] bg-white/5 rounded-full pointer-events-none">
            <motion.div
              className="w-full bg-cyan-400 rounded-full"
              style={{
                height: `${Math.min(Math.max(scrollProgress * 100, 0), 100)}%`,
                boxShadow: "0 0 10px rgba(6,182,212,0.4)",
              }}
            />
          </div>

          {/* Dots Navigation List */}
          <div className="relative flex flex-col gap-6 items-center z-10 py-4">
            {sections.map((section) => {
              const isActive = activeSection === section.id;
              return (
                <button
                  key={section.id}
                  onClick={() => onNavigate(section.id)}
                  className="group relative flex items-center justify-center w-6 h-6 focus:outline-none cursor-pointer"
                  title={section.label}
                >
                  {/* Outer circle for active section */}
                  {isActive && (
                    <motion.div
                      layoutId="activeFloatingIndicator"
                      className="absolute inset-0 rounded-full border border-cyan-400/50 bg-cyan-500/5"
                      transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    />
                  )}

                  {/* Inner dot */}
                  <div
                    className={`rounded-full transition-all duration-300 ${
                      isActive
                        ? "w-3 h-3 bg-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.8)]"
                        : "w-2 h-2 bg-slate-500 hover:bg-slate-300 hover:scale-125"
                    }`}
                  />

                  {/* Tooltip on hover */}
                  <div className="absolute right-8 top-1/2 -translate-y-1/2 pointer-events-none opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 bg-slate-950/90 border border-white/10 px-3 py-1.5 rounded-lg text-xs font-mono font-bold tracking-wide text-cyan-400 whitespace-nowrap shadow-xl transition-all duration-300">
                    {section.label}
                  </div>
                </button>
              );
            })}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
