import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Star, 
  ChevronLeft, 
  ChevronRight, 
  Quote, 
  GraduationCap, 
  CheckCircle2, 
  Users, 
  Award, 
  Calendar, 
  Sparkles, 
  ArrowUpRight 
} from "lucide-react";

interface Review {
  id: number;
  name: string;
  role: string;
  company: string;
  course: string;
  rating: number;
  testimonial: string;
  date: string;
  featured?: boolean;
}

export default function StudentReviews() {
  const reviews: Review[] = [
    {
      id: 1,
      name: "Ramesh Hegde",
      role: "Senior SAP FICO Consultant",
      company: "Capgemini India",
      course: "SAP Financial Accounting (FICO)",
      rating: 5,
      testimonial: "The hands-on training at Business Intelligence Lab was outstanding. The SAP sandbox system access and real-world project modules gave me the confidence to crack my Capgemini interview easily. The placement assistance cell was extremely active and supportive in scheduling interviews for me.",
      date: "May 2026",
      featured: true,
    },
    {
      id: 2,
      name: "Priya Sharma",
      role: "SAP ABAP Developer",
      company: "Accenture",
      course: "SAP ABAP & Cloud Extension",
      rating: 5,
      testimonial: "Transitioning from general web development to SAP was highly intimidating for me initially. But the structured step-by-step guidance on ABAP object-oriented development and S/4HANA cloud extensibility made it feel natural. I went from zero SAP knowledge to a certified associate role in under 4 months!",
      date: "April 2026",
    },
    {
      id: 3,
      name: "Alok Deshmukh",
      role: "Logistics & MM Analyst",
      company: "Tata Motors",
      course: "SAP Materials Management (MM)",
      rating: 5,
      testimonial: "The physical lab facilities are spectacular. Sitting alongside enterprise experts, configuring procurement workflows, and managing complex inventory control systems directly in a live SAP client gave me massive practical leverage that no online pre-recorded course could ever offer.",
      date: "June 2026",
    },
    {
      id: 4,
      name: "Deepa K.",
      role: "SuccessFactors Analyst",
      company: "Deloitte India",
      course: "SAP SuccessFactors (HR)",
      rating: 5,
      testimonial: "The trainers are industry veterans who explain abstract business concepts with practical, field-tested scenarios. BIL's focus on actual configuration rather than just theory is why they have such high placement rates. The mock evaluation panels prepared me perfectly for client calls.",
      date: "March 2026",
    },
    {
      id: 5,
      name: "Kevin D'Souza",
      role: "Sales & Distribution Executive",
      company: "Tech Mahindra",
      course: "SAP Sales & Distribution (SD)",
      rating: 5,
      testimonial: "The comprehensive curriculum covers everything from basic pricing procedures to advanced integration with finance and logistics. The mock test series and global certification prep material helped me clear my official SAP certification with an 88% score on my first attempt.",
      date: "January 2026",
    },
    {
      id: 6,
      name: "Neha Rao",
      role: "SAP Basis Administrator",
      company: "Wipro",
      course: "SAP S/4HANA Basis Admin",
      rating: 5,
      testimonial: "A fully immersive learning experience. The technical depth of the mentors here is unmatched. They provided custom sandbox servers with full administrative access so we could execute system upgrades, transport requests, and database backups without any software limitations.",
      date: "February 2026",
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const autoplayTimer = useRef<NodeJS.Timeout | null>(null);

  // Auto-play effect
  useEffect(() => {
    if (isPlaying) {
      autoplayTimer.current = setInterval(() => {
        handleNext();
      }, 5500);
    } else {
      if (autoplayTimer.current) clearInterval(autoplayTimer.current);
    }

    return () => {
      if (autoplayTimer.current) clearInterval(autoplayTimer.current);
    };
  }, [isPlaying, currentIndex]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  };

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
  };

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  // Drag handlers for mobile swiping support using Framer Motion
  const handleDragEnd = (event: any, info: any) => {
    const swipeThreshold = 50;
    if (info.offset.x > swipeThreshold) {
      handlePrev();
    } else if (info.offset.x < -swipeThreshold) {
      handleNext();
    }
  };

  return (
    <section 
      id="student-reviews" 
      className="relative py-24 sm:py-32 bg-[#0B0F19] overflow-hidden border-t border-white/5"
      onMouseEnter={() => setIsPlaying(false)}
      onMouseLeave={() => setIsPlaying(true)}
    >
      {/* Background Neon Orbs */}
      <div className="absolute top-1/4 right-1/4 w-[40%] h-[50%] bg-cyan-500/5 rounded-full blur-[150px] pointer-events-none z-0" />
      <div className="absolute bottom-1/4 left-1/4 w-[35%] h-[40%] bg-blue-600/5 rounded-full blur-[130px] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Top Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20 space-y-6">
          
          {/* Average Rating Rating Indicator */}
          <div className="inline-flex items-center gap-2.5 px-4.5 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-cyan-300 text-xs sm:text-sm font-semibold tracking-wide shadow-md shadow-cyan-500/5">
            <div className="flex items-center gap-0.5 text-amber-400">
              <Star className="w-4 h-4 fill-amber-400" />
              <Star className="w-4 h-4 fill-amber-400" />
              <Star className="w-4 h-4 fill-amber-400" />
              <Star className="w-4 h-4 fill-amber-400" />
              <Star className="w-4 h-4 fill-amber-400" />
            </div>
            <span className="font-mono text-white">4.9/5 Average Rating</span>
            <span className="text-slate-500">•</span>
            <span className="text-slate-300">from 500+ Graduates</span>
          </div>

          <div className="space-y-4">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight font-sans">
              What Our Students Say
            </h2>
            <p className="text-sm sm:text-base text-slate-300 font-light max-w-2xl mx-auto leading-relaxed">
              Hear directly from students who successfully completed our certified SAP training modules and unlocked high-growth enterprise careers worldwide.
            </p>
          </div>
        </div>

        {/* Dynamic Multi-column Responsive Slide Showcase */}
        <div className="relative mb-20">
          
          {/* Main Drag Slider Track with Swipe/Dot controllers */}
          <div className="overflow-hidden px-1 sm:px-4 py-8">
            <motion.div 
              className="flex gap-6 md:gap-8 cursor-grab active:cursor-grabbing"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={handleDragEnd}
              animate={{ x: `-${currentIndex * 100}%` }}
              transition={{ type: "spring", stiffness: 220, damping: 26 }}
              style={{ width: `${reviews.length * 100}%` }}
            >
              {reviews.map((rev) => {
                const isExpanded = expandedId === rev.id;
                const displayTestimonial = isExpanded 
                  ? rev.testimonial 
                  : rev.testimonial.length > 180 
                    ? `${rev.testimonial.slice(0, 180)}...` 
                    : rev.testimonial;

                return (
                  <div 
                    key={rev.id} 
                    className="w-full flex-shrink-0 select-none px-2 sm:px-4"
                    style={{ width: `${100 / reviews.length}%` }}
                  >
                    <div 
                      className={`max-w-3xl mx-auto p-8 sm:p-10 rounded-3xl border transition-all duration-500 relative flex flex-col justify-between min-h-[350px] sm:min-h-[300px] ${
                        rev.featured 
                          ? "bg-gradient-to-br from-slate-900/90 via-cyan-950/20 to-slate-900/90 border-cyan-500/35 shadow-xl shadow-cyan-950/10" 
                          : "bg-slate-900/40 border-white/5 shadow-lg shadow-black/15 hover:border-cyan-500/20"
                      }`}
                    >
                      {/* Decorative Background Quote Mark */}
                      <Quote className="absolute right-8 top-8 w-16 h-16 text-white/[0.03] pointer-events-none" />

                      {/* Top Row: Rating, Category, Featured Badge */}
                      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`w-4 h-4 ${i < rev.rating ? "text-amber-400 fill-amber-400" : "text-slate-600"}`} 
                            />
                          ))}
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 bg-cyan-500/10 px-2.5 py-0.5 rounded-full border border-cyan-500/20">
                            {rev.course}
                          </span>
                          {rev.featured && (
                            <span className="inline-flex items-center gap-1 text-[10px] font-mono uppercase tracking-wider text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/25">
                              <Sparkles className="w-3 h-3 text-amber-400 fill-amber-400" />
                              Featured
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Middle: Testimonial Quote */}
                      <div className="space-y-4 mb-6 flex-grow select-text">
                        <p className="text-slate-200 text-base sm:text-lg font-light leading-relaxed italic">
                          "{displayTestimonial}"
                        </p>
                        {rev.testimonial.length > 180 && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleExpand(rev.id);
                            }}
                            className="text-cyan-400 hover:text-cyan-300 text-xs sm:text-sm font-semibold transition-colors cursor-pointer flex items-center gap-1.5 focus:outline-none"
                          >
                            <span>{isExpanded ? "Read Less" : "Read Full Story"}</span>
                            <ArrowUpRight className={`w-3.5 h-3.5 transition-transform duration-300 ${isExpanded ? "rotate-45" : ""}`} />
                          </button>
                        )}
                      </div>

                      {/* Bottom Row: Student Profile Details */}
                      <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-white/5">
                        <div className="flex items-center gap-3.5">
                          <div className="w-12 h-12 rounded-2xl bg-cyan-500/15 border border-cyan-500/20 flex items-center justify-center text-cyan-300 text-lg font-extrabold uppercase font-mono shadow-md">
                            {rev.name.charAt(0)}
                          </div>
                          <div>
                            <h4 className="text-white text-base sm:text-lg font-bold tracking-tight">
                              {rev.name}
                            </h4>
                            <p className="text-xs sm:text-sm text-slate-300 font-light">
                              {rev.role} at <span className="text-cyan-400 font-semibold">{rev.company}</span>
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 text-slate-500 text-xs sm:text-sm font-mono">
                          <Calendar className="w-4 h-4 text-slate-600" />
                          <span>{rev.date}</span>
                        </div>
                      </div>

                    </div>
                  </div>
                );
              })}
            </motion.div>
          </div>

          {/* Previous & Next Control Navigation Arrows */}
          <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 flex justify-between px-2 sm:px-6 pointer-events-none">
            <button
              onClick={handlePrev}
              className="p-3.5 sm:p-4 rounded-2xl bg-slate-900/80 hover:bg-slate-900 border border-white/5 text-white shadow-xl pointer-events-auto transition-all cursor-pointer hover:border-cyan-500/35 active:scale-95"
              aria-label="Previous Review"
              title="Previous Slide"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
            <button
              onClick={handleNext}
              className="p-3.5 sm:p-4 rounded-2xl bg-slate-900/80 hover:bg-slate-900 border border-white/5 text-white shadow-xl pointer-events-auto transition-all cursor-pointer hover:border-cyan-500/35 active:scale-95"
              aria-label="Next Review"
              title="Next Slide"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>

          {/* Navigation Dot Indicators */}
          <div className="flex justify-center items-center gap-2.5 mt-8">
            {reviews.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  currentIndex === index ? "w-8 bg-cyan-400" : "w-2 bg-slate-700 hover:bg-slate-600"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

        </div>

        {/* Trust Indicators / Stats Mini Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-12 border-t border-white/5 mb-24">
          <div className="p-6 rounded-2xl bg-slate-900/35 border border-white/5 flex items-center gap-4 hover:border-cyan-500/15 transition-all">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-lg sm:text-xl font-extrabold text-white">10,000+</h4>
              <p className="text-xs sm:text-sm text-slate-400">Students Trained Globally</p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/35 border border-white/5 flex items-center gap-4 hover:border-cyan-500/15 transition-all">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-lg sm:text-xl font-extrabold text-white">95%</h4>
              <p className="text-xs sm:text-sm text-slate-400">Student Satisfaction</p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/35 border border-white/5 flex items-center gap-4 hover:border-cyan-500/15 transition-all">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-lg sm:text-xl font-extrabold text-white">Industry Experts</h4>
              <p className="text-xs sm:text-sm text-slate-400">Trainers from Top MNCs</p>
            </div>
          </div>
        </div>

        {/* Interactive Call To Action Block */}
        <div className="relative rounded-3xl overflow-hidden border border-cyan-500/30 shadow-2xl bg-gradient-to-br from-slate-950 via-[#0C1220] to-slate-950 p-8 sm:p-12 md:p-16 text-center max-w-5xl mx-auto">
          {/* Inner ambient glow blobs */}
          <div className="absolute top-0 left-1/4 w-[50%] h-[100%] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-0 right-1/4 w-[40%] h-[80%] bg-cyan-500/10 rounded-full blur-[90px] pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono uppercase tracking-wider">
              <GraduationCap className="w-4 h-4 text-cyan-400" />
              <span>Shape Your Future</span>
            </div>

            <div className="space-y-4">
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
                Ready to Start Your SAP Career?
              </h3>
              <p className="text-slate-300 text-sm sm:text-base md:text-lg font-light leading-relaxed max-w-2xl mx-auto">
                Join our upcoming enterprise training batches. Equip yourself with corporate configuration skills, complete high-demand global certifications, and gain premium career placements.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap justify-center items-center gap-4 pt-4">
              <button
                onClick={() => {
                  const courseSection = document.getElementById("featured-programs") || document.getElementById("courses");
                  if (courseSection) {
                    courseSection.scrollIntoView({ behavior: "smooth" });
                  } else {
                    // fallback reload / view change if on team page
                    window.location.href = "#courses";
                  }
                }}
                className="inline-flex items-center justify-center px-8 py-4 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm tracking-wide uppercase rounded-xl transition-all duration-300 shadow-xl shadow-cyan-500/10 hover:shadow-cyan-500/25 hover:-translate-y-0.5 active:scale-95 cursor-pointer"
              >
                <span>Explore Courses</span>
              </button>

              <button
                onClick={() => {
                  const contactSection = document.getElementById("contact");
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: "smooth" });
                  } else {
                    window.location.href = "#contact";
                  }
                }}
                className="inline-flex items-center justify-center px-8 py-4 bg-slate-900/80 hover:bg-slate-900 border border-white/10 hover:border-cyan-500/30 text-white font-bold text-sm tracking-wide uppercase rounded-xl transition-all duration-300 hover:-translate-y-0.5 active:scale-95 cursor-pointer"
              >
                <span>Contact Us</span>
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
