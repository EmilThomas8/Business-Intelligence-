import React from "react";
import { ArrowLeft, Sparkles, Calendar, MessageCircle } from "lucide-react";

interface CourseHeroProps {
  onBackToHome: () => void;
  onBookConsultation: () => void;
}

export default function CourseHero({ onBackToHome, onBookConsultation }: CourseHeroProps) {
  return (
    <div className="relative py-20 sm:py-28 bg-[#0B0F19] overflow-hidden border-b border-white/5">
      {/* Visual background glow lights */}
      <div className="absolute top-0 left-1/4 w-[50%] h-[100%] bg-blue-600/10 rounded-full blur-[160px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-[40%] h-[80%] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 text-center">
        {/* Back to Home navigation button */}
        <div className="flex justify-start mb-8">
          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900/50 hover:bg-slate-900/80 border border-white/5 hover:border-white/10 text-slate-400 hover:text-white rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            <span>Back to Home</span>
          </button>
        </div>

        {/* Content Box */}
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono uppercase tracking-[0.2em]">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            <span>All Programs</span>
          </div>

          <div className="space-y-4">
            <h1 className="text-4xl sm:text-6xl font-heading font-extrabold text-white tracking-tight leading-none bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
              14+ Professional Courses
            </h1>
            <p className="text-2xl sm:text-3xl font-sans font-bold text-cyan-400 tracking-tight">
              Built for Real Careers
            </p>
          </div>

          <p className="text-base sm:text-lg text-slate-300 font-light leading-relaxed max-w-2xl mx-auto">
            SAP ERP, Business Analytics, Excel, Power BI, and Taxation — all taught with hands-on practice by industry professionals.
          </p>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onBookConsultation}
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-sm rounded-2xl transition-all duration-300 shadow-xl shadow-cyan-500/15 hover:shadow-cyan-500/30 hover:-translate-y-0.5 cursor-pointer flex items-center justify-center gap-2.5"
            >
              <Calendar className="w-5 h-5" />
              <span>Book Free Consultation</span>
            </button>
            
            <a
              href="https://wa.me/919480020875"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 bg-white/5 hover:bg-white/10 text-slate-200 hover:text-white font-semibold text-sm rounded-2xl border border-white/5 hover:border-white/10 transition-all duration-300 hover:-translate-y-0.5 cursor-pointer flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-5 h-5 text-emerald-400" />
              <span>Inquire on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
