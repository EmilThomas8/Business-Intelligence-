import React from "react";
import { ArrowLeft, Sparkles, Calendar } from "lucide-react";

const WhatsAppIcon = ({ className = "h-5 w-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.517 2.266 2.27 3.51 5.276 3.508 8.48-.005 6.66-5.342 11.997-11.953 11.997-2.005-.001-3.973-.503-5.714-1.458L0 24zm6.59-4.846c1.6.95 3.16 1.449 4.795 1.451 5.429.002 9.841-4.408 9.845-9.842.002-2.632-1.02-5.105-2.881-6.967-1.861-1.862-4.333-2.883-6.969-2.884-5.432 0-9.843 4.408-9.847 9.843-.001 1.73.457 3.417 1.325 4.904l-.994 3.63 3.727-.977zm11.452-4.664c-.31-.156-1.838-.907-2.122-1.01-.284-.103-.49-.156-.696.156-.206.31-.8.1-.986 1.185-.186.206-.372.232-.682.077-.31-.156-1.31-.483-2.495-1.54-1.222-1.09-2.046-2.436-2.285-2.848-.239-.412-.025-.634.18-.84.184-.184.412-.482.62-.722.206-.24.275-.412.412-.687.137-.275.069-.515-.034-.721-.103-.206-.8-1.928-1.097-2.65-.289-.696-.582-.601-.8-.612-.206-.01-.44-.011-.673-.011-.232 0-.61.087-.93.435-.32.348-1.22 1.192-1.22 2.91 0 1.718 1.248 3.377 1.42 3.606.173.23 2.457 3.75 5.952 5.263.832.36 1.482.576 1.99.737.836.265 1.597.227 2.197.138.67-.1 1.838-.75 2.095-1.44.258-.69.258-1.28.18-1.4-.078-.12-.284-.206-.593-.362z" />
  </svg>
);

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
              <WhatsAppIcon className="w-5 h-5 text-emerald-400 fill-emerald-400/10" />
              <span>Inquire on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
