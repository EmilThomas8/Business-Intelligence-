/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, ArrowRight } from "lucide-react";
import Logo from "../common/Logo";

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
  activeSection?: string;
  onEnrollClick?: () => void;
}

export default function Navbar({ onNavigate, activeSection = "hero", onEnrollClick }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Home", id: "hero" },
    { label: "Courses", id: "courses" },
    {/* { label: "Team", id: "team" },
    { label: "Insights", id: "blog" }, */}
  
    { label: "Contact", id: "contact" },
  ];

  return (
    <header
      id="navbar-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "glass-nav py-3 shadow-lg shadow-slate-900/5 border-b border-white/5"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between w-full">
          {/* Logo / Brand */}
          <button
            id="nav-logo-btn"
            onClick={() => {
              onNavigate("hero");
              setMobileMenuOpen(false);
            }}
            className="flex items-center focus:outline-none cursor-pointer text-left animate-fade-in"
          >
            <Logo className="h-10 w-10 sm:h-12 sm:w-12 transition-transform duration-300 hover:scale-105" light={!isScrolled} />
          </button>

          {/* Desktop Navigation and Enroll button */}
          <div className="hidden lg:flex items-center gap-8">
            <nav id="desktop-nav" className="flex items-center gap-1">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    id={`nav-item-${item.id}`}
                    onClick={() => onNavigate(item.id)}
                    className={`relative px-4 py-2 font-sans text-sm font-semibold tracking-wide transition-all duration-300 rounded-lg cursor-pointer group ${
                      isActive
                        ? "text-primary font-bold"
                        : "text-slate-300 hover:text-white"
                    }`}
                  >
                    {item.label}
                    
                    {/* Animated Underline on Hover */}
                    {!isActive && (
                      <span className="absolute bottom-1 left-4 right-4 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-center duration-300 ease-out rounded-full shadow-[0_0_8px_rgba(37,99,235,0.6)]" />
                    )}

                    {isActive && (
                      <motion.span
                        layoutId="activeNavIndicator"
                        className="absolute bottom-1 left-4 right-4 h-0.5 bg-primary rounded-full shadow-[0_0_8px_rgba(37,99,235,0.6)]"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </button>
                );
              })}
            </nav>

            <button
              id="nav-enroll-btn"
              onClick={() => {
                if (onEnrollClick) {
                  onEnrollClick();
                } else {
                  onNavigate("contact");
                }
              }}
              className="font-button bg-primary hover:bg-primary-dark text-white text-sm font-bold px-5 py-2.5 rounded-xl shadow-md hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 flex items-center gap-1.5 group cursor-pointer hover:-translate-y-0.5"
            >
              Enroll Now
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center">
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-1 rounded-lg focus:outline-none transition-colors cursor-pointer ${
                isScrolled ? "text-slate-300 hover:text-white" : "text-slate-300 hover:text-white"
              }`}
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-nav-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="lg:hidden bg-slate-950/95 backdrop-blur-md border-b border-white/5 overflow-hidden"
          >
            <div className="px-4 pt-3 pb-6 space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  id={`mobile-nav-item-${item.id}`}
                  onClick={() => {
                    onNavigate(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`block w-full text-left px-4 py-3 rounded-xl text-base font-semibold transition-all cursor-pointer ${
                    activeSection === item.id
                      ? "bg-primary/10 text-cyan-400 border-l-4 border-cyan-500 pl-3"
                      : "text-slate-300 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <div className="pt-4 border-t border-white/5 px-4">
                <button
                  id="mobile-nav-enroll"
                  onClick={() => {
                    if (onEnrollClick) {
                      onEnrollClick();
                    } else {
                      onNavigate("contact");
                    }
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-center font-button bg-primary hover:bg-primary-dark text-white font-bold py-3 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  Enroll Now
                  <ArrowRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
