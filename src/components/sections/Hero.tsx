/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { motion } from "motion/react";
import { ArrowRight, Sparkles, Shield, CheckCircle, Database, BarChart3, Receipt, Landmark } from "lucide-react";
import Logo from "../common/Logo";

const WhatsAppIcon = ({ className = "h-5 w-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.517 2.266 2.27 3.51 5.276 3.508 8.48-.005 6.66-5.342 11.997-11.953 11.997-2.005-.001-3.973-.503-5.714-1.458L0 24zm6.59-4.846c1.6.95 3.16 1.449 4.795 1.451 5.429.002 9.841-4.408 9.845-9.842.002-2.632-1.02-5.105-2.881-6.967-1.861-1.862-4.333-2.883-6.969-2.884-5.432 0-9.843 4.408-9.847 9.843-.001 1.73.457 3.417 1.325 4.904l-.994 3.63 3.727-.977zm11.452-4.664c-.31-.156-1.838-.907-2.122-1.01-.284-.103-.49-.156-.696.156-.206.31-.8.1-.986 1.185-.186.206-.372.232-.682.077-.31-.156-1.31-.483-2.495-1.54-1.222-1.09-2.046-2.436-2.285-2.848-.239-.412-.025-.634.18-.84.184-.184.412-.482.62-.722.206-.24.275-.412.412-.687.137-.275.069-.515-.034-.721-.103-.206-.8-1.928-1.097-2.65-.289-.696-.582-.601-.8-.612-.206-.01-.44-.011-.673-.011-.232 0-.61.087-.93.435-.32.348-1.22 1.192-1.22 2.91 0 1.718 1.248 3.377 1.42 3.606.173.23 2.457 3.75 5.952 5.263.832.36 1.482.576 1.99.737.836.265 1.597.227 2.197.138.67-.1 1.838-.75 2.095-1.44.258-.69.258-1.28.18-1.4-.078-.12-.284-.206-.593-.362z" />
  </svg>
);

interface HeroProps {
  onNavigate: (sectionId: string) => void;
}

export default function Hero({ onNavigate }: HeroProps) {
  // Path to our newly generated top-tier background image
  const backgroundHero = "/src/assets/images/classroom_hero_1782808064997.jpg";

  return (
    <section
      id="hero"
      className="relative min-h-[95vh] lg:min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden bg-slate-950 text-white"
    >
      {/* Background Image with advanced overlays */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src={backgroundHero}
          alt="Premium Corporate Classroom Lab"
          className="w-full h-full object-cover object-center scale-105 opacity-35 filter blur-[1px]"
          referrerPolicy="no-referrer"
        />
        {/* Animated Gradient Grids */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/90 to-slate-950/80" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/40" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.12)_0%,transparent_70%)]" />

        {/* Large Brand Watermark Logo Background */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.05] sm:opacity-[0.07] pointer-events-none select-none z-0">
          <Logo className="w-[280px] h-[280px] sm:w-[500px] sm:h-[500px] md:w-[700px] md:h-[700px] lg:w-[850px] lg:h-[850px] animate-pulse [animation-duration:12s]" showText={false} />
        </div>

        {/* Ambient floating blur particles */}
        <div className="absolute top-1/4 left-1/5 w-72 h-72 rounded-full bg-blue-600/10 blur-[100px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-cyan-600/10 blur-[120px] animate-pulse [animation-delay:3s]" />
      </div>

      {/* Hero content container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column - Elite Marketing Copy */}
        <div className="lg:col-span-7 flex flex-col items-start space-y-6 text-left">
          {/* Badge */}
          <motion.div
            id="hero-badge"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/30 px-4 py-2 rounded-full text-blue-400 text-xs sm:text-sm font-semibold tracking-wide backdrop-blur-md"
          >
            <Sparkles className="h-4 w-4 animate-spin [animation-duration:4s]" />
            <span>Mangalore's Premier ERP Training Institute</span>
          </motion.div>

          {/* Core Headline */}
          <motion.h1
            id="hero-headline"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-georgia-condensed font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-white leading-[1.1]"
            style={{ fontFamily: '"Georgia Pro Condensed", "Georgia Pro", "Georgia", "Bookman Old Style", serif' }}
          >
            Build skills{" "}
            <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-cyan-400 bg-clip-text text-transparent drop-shadow-sm font-extrabold">
              build your future
            </span>
          </motion.h1>

          {/* Subtitle description */}
          <motion.p
            id="hero-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-sans text-lg sm:text-xl text-slate-300 max-w-2xl font-normal leading-relaxed"
          >
            SAP, Analytics & Finance training for professionals who want real skills and real results. Industry-oriented. Hands-on. Certification included.
          </motion.p>

          {/* Primary & Secondary Call to Actions */}
          <motion.div
            id="hero-ctas"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto pt-2"
          >
            {/* Primary Action Button */}
            <button
              id="hero-btn-primary"
              onClick={() => onNavigate("courses")}
              className="font-button bg-gradient-to-r from-primary to-blue-500 hover:from-primary-dark hover:to-primary text-white text-base font-bold px-8 py-4 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 hover:scale-[1.02] cursor-pointer transition-all duration-300 group"
            >
              Explore Programs
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1.5 transition-transform" />
            </button>

            {/* Secondary WhatsApp Action */}
            <a
              id="hero-btn-secondary"
              href="https://wa.me/919480020875"
              target="_blank"
              rel="noopener noreferrer"
              className="font-button bg-emerald-500/10 border border-emerald-500/30 hover:border-emerald-500/60 text-emerald-400 hover:bg-emerald-500/20 text-base font-bold px-8 py-4 rounded-xl flex items-center justify-center gap-2 backdrop-blur-md hover:scale-[1.02] cursor-pointer transition-all duration-300 glow-whatsapp"
            >
              <WhatsAppIcon className="h-5 w-5 fill-emerald-400/15" />
              Speak to Advisor
            </a>
          </motion.div>

          {/* Featured Technologies Row below buttons */}
          <motion.div
            id="hero-tech-row"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="flex flex-wrap items-center gap-x-4 gap-y-2 pt-6 border-t border-slate-800/60 w-full"
          >
            <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold flex items-center gap-1.5">
              <Shield className="h-3.5 w-3.5 text-blue-400" /> Authorized Tech Stacks:
            </span>
            <div className="flex flex-wrap items-center gap-2.5 text-sm text-slate-300 font-mono font-medium">
              <span className="bg-slate-900 px-2.5 py-1 rounded border border-slate-800 flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-400 animate-pulse" /> SAP S/4 HANA ERP
              </span>
              <span className="bg-slate-900 px-2.5 py-1 rounded border border-slate-800 flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-yellow-400 animate-pulse" /> Microsoft Power BI
              </span>
              <span className="bg-slate-900 px-2.5 py-1 rounded border border-slate-800 flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" /> GST Strategy
              </span>
              <span className="bg-slate-900 px-2.5 py-1 rounded border border-slate-800 flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" /> Financial Analytics
              </span>
            </div>
          </motion.div>
        </div>

        {/* Right Column - Beautiful Slow Floating Dashboard Cards */}
        <div className="lg:col-span-5 relative h-[450px] w-full hidden sm:block">
          {/* Card 1: SAP S/4 HANA */}
          <motion.div
            id="float-card-sap"
            animate={{ y: [0, -15, 0], x: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
            className="absolute top-4 left-6 w-[260px] dark-glass-card rounded-2xl p-4 shadow-xl z-20 border-l-4 border-l-blue-500"
          >
            <div className="flex items-center gap-2.5 mb-2">
              <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400">
                <Database className="h-5 w-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest leading-none">
                  Core Modules
                </span>
                <h4 className="font-heading font-bold text-sm text-white">
                  SAP S/4HANA Finance
                </h4>
              </div>
            </div>
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-300 border-b border-slate-800/40 pb-1">
                <span>Ledger Postings</span>
                <span className="text-emerald-400 font-mono font-bold">✓ Active</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Custom CoAs</span>
                <span className="text-blue-400 font-mono">100% Synced</span>
              </div>
            </div>
          </motion.div>

          {/* Card 2: Power BI */}
          <motion.div
            id="float-card-powerbi"
            animate={{ y: [0, 18, 0], x: [0, -8, 0] }}
            transition={{ repeat: Infinity, duration: 7, ease: "easeInOut", delay: 1 }}
            className="absolute top-28 right-4 w-[250px] dark-glass-card rounded-2xl p-4 shadow-xl z-10 border-l-4 border-l-yellow-400"
          >
            <div className="flex items-center gap-2.5 mb-2">
              <div className="p-2 bg-yellow-400/10 rounded-lg text-yellow-400">
                <BarChart3 className="h-5 w-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest leading-none">
                  Live BI Canvas
                </span>
                <h4 className="font-heading font-bold text-sm text-white">
                  Power BI Dashboard
                </h4>
              </div>
            </div>
            <div className="space-y-1 mt-2">
              <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full w-4/5 bg-yellow-400 rounded-full" />
              </div>
              <div className="flex justify-between text-[11px] text-slate-300">
                <span>Query Optimization</span>
                <span className="text-yellow-400 font-mono">DAX OK</span>
              </div>
            </div>
          </motion.div>

          {/* Card 3: GST Filing */}
          <motion.div
            id="float-card-gst"
            animate={{ y: [-10, 10, -10], x: [0, -5, 0] }}
            transition={{ repeat: Infinity, duration: 8, ease: "easeInOut", delay: 2 }}
            className="absolute bottom-16 left-2 w-[250px] dark-glass-card rounded-2xl p-4 shadow-xl z-30 border-l-4 border-l-emerald-400"
          >
            <div className="flex items-center gap-2.5 mb-2.5">
              <div className="p-2 bg-emerald-400/10 rounded-lg text-emerald-400">
                <Receipt className="h-5 w-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest leading-none">
                  Legal Audit
                </span>
                <h4 className="font-heading font-bold text-sm text-white">
                  Corporate GST Filing
                </h4>
              </div>
            </div>
            <div className="space-y-1 text-xs">
              <div className="flex items-center gap-1.5 text-slate-300">
                <CheckCircle className="h-3.5 w-3.5 text-emerald-400" />
                <span>Input Tax Audit Reconciliation</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-300">
                <CheckCircle className="h-3.5 w-3.5 text-emerald-400" />
                <span>GSTR-1, 2B, 3B Filing Ready</span>
              </div>
            </div>
          </motion.div>

          {/* Card 4: Financial Accounting */}
          <motion.div
            id="float-card-accounting"
            animate={{ y: [15, -5, 15], x: [5, 5, 5] }}
            transition={{ repeat: Infinity, duration: 6.5, ease: "easeInOut", delay: 1.5 }}
            className="absolute bottom-4 right-8 w-[240px] dark-glass-card rounded-2xl p-4 shadow-xl z-20 border-l-4 border-l-cyan-400"
          >
            <div className="flex items-center gap-2.5 mb-2">
              <div className="p-2 bg-cyan-400/10 rounded-lg text-cyan-400">
                <Landmark className="h-5 w-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest leading-none">
                  Core Ledgers
                </span>
                <h4 className="font-heading font-bold text-sm text-white">
                  Financial Accounting
                </h4>
              </div>
            </div>
            <div className="flex items-end justify-between">
              <span className="text-[10px] text-slate-400">Balance Sheets</span>
              <span className="text-cyan-400 font-mono font-bold text-sm">
                100% Balanced
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Infinite Horizontal Scrolling Ticker */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden bg-slate-950/80 border-t border-slate-800/60 py-4.5 backdrop-blur-md z-20 select-none">
        <div className="flex w-max">
          <motion.div
            className="flex gap-16 pr-16 text-sm md:text-base font-semibold tracking-[0.25em] text-slate-400 uppercase items-center"
            animate={{ x: [0, "-50%"] }}
            transition={{
              ease: "linear",
              duration: 25,
              repeat: Infinity,
            }}
          >
            {/* Group 1 */}
            <div className="flex gap-16 items-center shrink-0">
              <span className="flex items-center gap-16">
                <span className="text-white/90 hover:text-blue-400 transition-colors duration-300 font-bold">Learn</span>
                <span className="text-blue-500 font-black">•</span>
                <span className="text-white/90 hover:text-cyan-400 transition-colors duration-300 font-bold">Grow</span>
                <span className="text-cyan-500 font-black">•</span>
                <span className="text-white/90 hover:text-emerald-400 transition-colors duration-300 font-bold">Success</span>
                <span className="text-emerald-500 font-black">•</span>
              </span>
              <span className="flex items-center gap-16">
                <span className="text-white/90 hover:text-blue-400 transition-colors duration-300 font-bold">Learn</span>
                <span className="text-blue-500 font-black">•</span>
                <span className="text-white/90 hover:text-cyan-400 transition-colors duration-300 font-bold">Grow</span>
                <span className="text-cyan-500 font-black">•</span>
                <span className="text-white/90 hover:text-emerald-400 transition-colors duration-300 font-bold">Success</span>
                <span className="text-emerald-500 font-black">•</span>
              </span>
            </div>
            {/* Group 2 (Duplicate for seamless scroll) */}
            <div className="flex gap-16 items-center shrink-0">
              <span className="flex items-center gap-16">
                <span className="text-white/90 hover:text-blue-400 transition-colors duration-300 font-bold">Learn</span>
                <span className="text-blue-500 font-black">•</span>
                <span className="text-white/90 hover:text-cyan-400 transition-colors duration-300 font-bold">Grow</span>
                <span className="text-cyan-500 font-black">•</span>
                <span className="text-white/90 hover:text-emerald-400 transition-colors duration-300 font-bold">Success</span>
                <span className="text-emerald-500 font-black">•</span>
              </span>
              <span className="flex items-center gap-16">
                <span className="text-white/90 hover:text-blue-400 transition-colors duration-300 font-bold">Learn</span>
                <span className="text-blue-500 font-black">•</span>
                <span className="text-white/90 hover:text-cyan-400 transition-colors duration-300 font-bold">Grow</span>
                <span className="text-cyan-500 font-black">•</span>
                <span className="text-white/90 hover:text-emerald-400 transition-colors duration-300 font-bold">Success</span>
                <span className="text-emerald-500 font-black">•</span>
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
