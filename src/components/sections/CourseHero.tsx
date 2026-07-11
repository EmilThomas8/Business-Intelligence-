import React, { useRef, useEffect, useState } from "react";
import { motion } from "motion/react";
import { ArrowLeft, Sparkles, Calendar, ArrowUpRight } from "lucide-react";

const WhatsAppIcon = ({ className = "h-5 w-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.517 2.266 2.27 3.51 5.276 3.508 8.48-.005 6.66-5.342 11.997-11.953 11.997-2.005-.001-3.973-.503-5.714-1.458L0 24zm6.59-4.846c1.6.95 3.16 1.449 4.795 1.451 5.429.002 9.841-4.408 9.845-9.842.002-2.632-1.02-5.105-2.881-6.967-1.861-1.862-4.333-2.883-6.969-2.884-5.432 0-9.843 4.408-9.847 9.843-.001 1.73.457 3.417 1.325 4.904l-.994 3.63 3.727-.977zm11.452-4.664c-.31-.156-1.838-.907-2.122-1.01-.284-.103-.49-.156-.696.156-.206.31-.8.1-.986 1.185-.186.206-.372.232-.682.077-.31-.156-1.31-.483-2.495-1.54-1.222-1.09-2.046-2.436-2.285-2.848-.239-.412-.025-.634.18-.84.184-.184.412-.482.62-.722.206-.24.275-.412.412-.687.137-.275.069-.515-.034-.721-.103-.206-.8-1.928-1.097-2.65-.289-.696-.582-.601-.8-.612-.206-.01-.44-.011-.673-.011-.232 0-.61.087-.93.435-.32.348-1.22 1.192-1.22 2.91 0 1.718 1.248 3.377 1.42 3.606.173.23 2.457 3.75 5.952 5.263.832.36 1.482.576 1.99.737.836.265 1.597.227 2.197.138.67-.1 1.838-.75 2.095-1.44.258-.69.258-1.28.18-1.4-.078-.12-.284-.206-.593-.362z" />
  </svg>
);

const SAPB1Logo = () => (
  <svg className="h-5 w-11 text-[#008FD3]" viewBox="0 0 110 50" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 10C5 10 28 5 55 5C82 5 105 10 105 10V40C105 40 82 45 55 45C28 45 5 40 5 40V10Z" fill="#005A9C" fillOpacity="0.15" />
    <text x="12" y="32" fontFamily="system-ui, sans-serif" fontWeight="900" fontSize="18" fill="#008FD3" letterSpacing="0.5">SAP</text>
    <rect x="58" y="14" width="22" height="18" rx="3" fill="#008FD3" />
    <text x="63" y="28" fontFamily="system-ui, sans-serif" fontWeight="bold" fontSize="12" fill="#FFFFFF">B1</text>
  </svg>
);

const SAPFICOLogo = () => (
  <svg className="h-5 w-14 text-[#008FD3]" viewBox="0 0 140 50" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 10C5 10 35 5 70 5C105 5 135 10 135 10V40C135 40 105 45 70 45C35 45 5 40 5 40V10Z" fill="#005A9C" fillOpacity="0.12" />
    <text x="10" y="32" fontFamily="system-ui, sans-serif" fontWeight="900" fontSize="18" fill="#008FD3">SAP</text>
    <text x="52" y="32" fontFamily="system-ui, sans-serif" fontWeight="800" fontSize="13" fill="#F59E0B" letterSpacing="0.2">FICO</text>
    <circle cx="102" cy="25" r="8" stroke="#F59E0B" strokeWidth="1.5" />
    <path d="M102 21V29M100 23H104M100 27H104" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const SAPMMLogo = () => (
  <svg className="h-5 w-14 text-[#008FD3]" viewBox="0 0 140 50" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 10C5 10 35 5 70 5C105 5 135 10 135 10V40C135 40 105 45 70 45C35 45 5 40 5 40V10Z" fill="#005A9C" fillOpacity="0.12" />
    <text x="10" y="32" fontFamily="system-ui, sans-serif" fontWeight="900" fontSize="18" fill="#008FD3">SAP</text>
    <text x="52" y="32" fontFamily="system-ui, sans-serif" fontWeight="800" fontSize="14" fill="#10B981" letterSpacing="0.5">MM</text>
    <path d="M96 18L104 22L112 18M96 18V28L104 32V22M112 18V28L104 32" stroke="#10B981" strokeWidth="1.5" strokeLinejoin="round" />
  </svg>
);

const SAPSDLogo = () => (
  <svg className="h-5 w-14 text-[#008FD3]" viewBox="0 0 140 50" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 10C5 10 35 5 70 5C105 5 135 10 135 10V40C135 40 105 45 70 45C35 45 5 40 5 40V10Z" fill="#005A9C" fillOpacity="0.12" />
    <text x="10" y="32" fontFamily="system-ui, sans-serif" fontWeight="900" fontSize="18" fill="#008FD3">SAP</text>
    <text x="52" y="32" fontFamily="system-ui, sans-serif" fontWeight="800" fontSize="14" fill="#3B82F6" letterSpacing="0.5">SD</text>
    <path d="M96 28H106L111 23V19H103V23M101 28C101 29.1 100.1 30 99 30C97.9 30 97 29.1 97 28M109 28C109 29.1 108.1 30 107 30C105.9 30 105 29.1 105 28" stroke="#3B82F6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const EFilingLogo = () => (
  <svg className="h-5 w-5 text-orange-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="3" width="16" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
    <path d="M8 7H16M8 11H16M8 15H12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="16" cy="16" r="3.5" fill="#10B981" />
    <path d="M14.5 16L15.5 17L17.5 15" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const UAEVATLogo = () => (
  <svg className="h-5 w-6" viewBox="0 0 30 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="2" width="26" height="20" rx="3" fill="#1E293B" stroke="#059669" strokeWidth="1.5" />
    <rect x="4" y="4" width="4" height="12" fill="#E11D48" />
    <rect x="8" y="4" width="8" height="4" fill="#16A34A" />
    <rect x="8" y="8" width="8" height="4" fill="#FFFFFF" />
    <rect x="8" y="12" width="8" height="4" fill="#000000" />
    <text x="17" y="14" fontFamily="system-ui, sans-serif" fontWeight="bold" fontSize="8" fill="#F59E0B">VAT</text>
  </svg>
);

const ExcelPowerBILogo = () => (
  <svg className="h-5 w-11" viewBox="0 0 54 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="3" width="18" height="18" rx="3" fill="#107C41" />
    <path d="M7 8 L15 16 M15 8 L7 16" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
    <path d="M24 12H28M26 10V14" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" />
    <rect x="34" y="13" width="3.5" height="8" rx="0.5" fill="#F2C811" />
    <rect x="39" y="9" width="3.5" height="12" rx="0.5" fill="#F2A511" />
    <rect x="44" y="5" width="3.5" height="16" rx="0.5" fill="#E27211" />
  </svg>
);

interface CourseHeroProps {
  onBackToHome: () => void;
  onBookConsultation: () => void;
}

export default function CourseHero({ onBackToHome, onBookConsultation }: CourseHeroProps) {
  
  // Custom click function to scroll to a specific course card and highlight it
  // Refs and state for smooth touch-swipeable and mouse-draggable auto-scrolling
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeftState = useRef(0);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    let animationFrameId: number;
    const speed = 0.55; // Smooth slow scroll speed

    const handleScroll = () => {
      if (isPaused || isDragging.current) return;
      
      container.scrollLeft += speed;
      
      const halfWidth = container.scrollWidth / 2;
      if (container.scrollLeft >= halfWidth) {
        // Seamless loop reset
        container.scrollLeft -= halfWidth;
      }
      
      animationFrameId = requestAnimationFrame(handleScroll);
    };

    animationFrameId = requestAnimationFrame(handleScroll);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isPaused]);

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    setIsPaused(true);
    if (scrollRef.current) {
      startX.current = e.pageX - scrollRef.current.offsetLeft;
      scrollLeftState.current = scrollRef.current.scrollLeft;
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5; // Scroll speed multiplier for dragging
    scrollRef.current.scrollLeft = scrollLeftState.current - walk;
  };

  const handleMouseUpOrLeave = () => {
    isDragging.current = false;
    setIsPaused(false);
  };

  const handleAllProgramsClick = () => {
    const coursesSection = document.getElementById("courses");
    if (coursesSection) {
      coursesSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleCourseClick = (courseId: string) => {
    const cardElement = document.getElementById(`course-card-${courseId}`);
    if (cardElement) {
      cardElement.scrollIntoView({ behavior: "smooth", block: "center" });
      
      // Temporary high-contrast pulsing glow styling
      cardElement.classList.add(
        "!border-cyan-400",
        "!ring-4",
        "!ring-cyan-400/30",
        "!shadow-[0_0_50px_rgba(34,211,238,0.55)]",
        "scale-[1.03]",
        "bg-slate-900/90"
      );
      
      // Clear highlight after 2.5 seconds
      setTimeout(() => {
        cardElement.classList.remove(
          "!border-cyan-400",
          "!ring-4",
          "!ring-cyan-400/30",
          "!shadow-[0_0_50px_rgba(34,211,238,0.55)]",
          "scale-[1.03]",
          "bg-slate-900/90"
        );
      }, 2500);
    }
  };

  const courseList = [
    {
      id: "sap-b1",
      label: "SAP Business One (B1)",
      logo: <SAPB1Logo />,
      hoverBorder: "hover:border-blue-500/40 hover:bg-blue-950/20"
    },
    {
      id: "sap-fico",
      label: "SAP FICO",
      logo: <SAPFICOLogo />,
      hoverBorder: "hover:border-amber-500/40 hover:bg-amber-950/20"
    },
    {
      id: "sap-mm",
      label: "SAP MM",
      logo: <SAPMMLogo />,
      hoverBorder: "hover:border-emerald-500/40 hover:bg-emerald-950/20"
    },
    {
      id: "sap-sd",
      label: "SAP SD",
      logo: <SAPSDLogo />,
      hoverBorder: "hover:border-blue-500/40 hover:bg-blue-950/20"
    },
    {
      id: "e-filing",
      label: "E-Filing",
      logo: <EFilingLogo />,
      hoverBorder: "hover:border-orange-500/40 hover:bg-orange-950/20"
    },
    {
      id: "uae-vat",
      label: "UAE VAT",
      logo: <UAEVATLogo />,
      hoverBorder: "hover:border-emerald-500/40 hover:bg-emerald-950/20"
    },
    {
      id: "advanced-excel",
      label: "Advanced Excel with Power BI",
      logo: <ExcelPowerBILogo />,
      hoverBorder: "hover:border-green-500/40 hover:bg-green-950/20"
    }
  ];

  // Double the list for infinite continuous scrolling
  const duplicatedCourseList = [...courseList, ...courseList];

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
            className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900/50 hover:bg-slate-900/80 border border-white/5 hover:border-white/10 text-slate-400 hover:text-white rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer group text-cyan-400"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform text-cyan-400" />
            <span className="text-cyan-400">Back to Home</span>
          </button>
        </div>

        {/* Content Box */}
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Offering Course Logos - Custom Interactive Ticker Marquee with drag, swipe and automatic continuous scroll */}
          <div className="flex flex-col items-center space-y-4 w-full pb-4">
            <span className="text-xs font-semibold uppercase tracking-[0.15em] text-cyan-400/85">
              ✨ SELECT A PROGRAM TO EXPLORE COURSE DETAILS
            </span>
            
            {/* Carousel Window */}
            <div className="relative w-full overflow-hidden py-2 px-1">
              {/* Scroll viewport */}
              <div
                ref={scrollRef}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUpOrLeave}
                onMouseLeave={handleMouseUpOrLeave}
                onTouchStart={() => setIsPaused(true)}
                onTouchEnd={() => setIsPaused(false)}
                className="w-full overflow-x-auto flex flex-row flex-nowrap gap-3 sm:gap-4 py-3 px-4 scrollbar-none select-none touch-pan-x cursor-grab active:cursor-grabbing scroll-smooth"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                {duplicatedCourseList.map((item, index) => (
                  <button
                    key={`${item.id}-${index}`}
                    onClick={() => handleCourseClick(item.id)}
                    title={`Click to go to ${item.label}`}
                    className="flex-shrink-0 flex items-center gap-2.5 bg-gradient-to-r from-blue-950/60 to-cyan-950/60 border border-cyan-500/30 px-4 py-2.5 rounded-xl transition-all duration-300 group cursor-pointer hover:shadow-xl hover:shadow-cyan-500/20 active:scale-95 hover:from-blue-600 hover:to-cyan-500 hover:border-transparent whitespace-nowrap"
                  >
                    {item.logo}
                    <div className="flex items-center gap-1">
                      <span className="text-xs font-bold text-slate-200 group-hover:text-white transition-colors">
                        {item.label}
                      </span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button
            onClick={handleAllProgramsClick}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 hover:bg-cyan-500/20 active:scale-95 border border-cyan-500/20 hover:border-cyan-500/40 text-cyan-400 hover:text-cyan-300 text-xs font-mono uppercase tracking-[0.2em] transition-all duration-300 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            <span>All Programs</span>
          </button>

          <div className="space-y-4 overflow-hidden py-2">
            <motion.h1 
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.05, delayChildren: 0.1 }
                }
              }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-4xl sm:text-6xl font-heading font-extrabold text-white tracking-tight leading-none bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent flex flex-wrap justify-center"
            >
              {Array.from("Professional Courses").map((char, index) => (
                <motion.span
                  key={index}
                  variants={{
                    hidden: { opacity: 0, y: 35, rotateX: 45 },
                    visible: { 
                      opacity: 1, 
                      y: 0, 
                      rotateX: 0,
                      transition: { type: "spring", damping: 15, stiffness: 120 } 
                    }
                  }}
                  className={char === " " ? "w-3 sm:w-4 inline-block" : "inline-block origin-bottom transform-gpu"}
                >
                  {char}
                </motion.span>
              ))}
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 1.1, duration: 0.7, ease: "easeOut" }}
              className="text-2xl sm:text-3xl font-sans font-bold text-cyan-400 tracking-tight"
            >
              Built for Real Careers
            </motion.p>
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
              <span>Enquire on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
