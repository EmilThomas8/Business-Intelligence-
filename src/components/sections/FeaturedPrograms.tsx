/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Clock, Briefcase, Award, Star, ChevronRight, Check, Sparkles, X, ArrowRight, ArrowLeft, BookOpen } from "lucide-react";
import { courses, Course } from "../../data/instituteData";

const WhatsAppIcon = ({ className = "h-5 w-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.517 2.266 2.27 3.51 5.276 3.508 8.48-.005 6.66-5.342 11.997-11.953 11.997-2.005-.001-3.973-.503-5.714-1.458L0 24zm6.59-4.846c1.6.95 3.16 1.449 4.795 1.451 5.429.002 9.841-4.408 9.845-9.842.002-2.632-1.02-5.105-2.881-6.967-1.861-1.862-4.333-2.883-6.969-2.884-5.432 0-9.843 4.408-9.847 9.843-.001 1.73.457 3.417 1.325 4.904l-.994 3.63 3.727-.977zm11.452-4.664c-.31-.156-1.838-.907-2.122-1.01-.284-.103-.49-.156-.696.156-.206.31-.8.1-.986 1.185-.186.206-.372.232-.682.077-.31-.156-1.31-.483-2.495-1.54-1.222-1.09-2.046-2.436-2.285-2.848-.239-.412-.025-.634.18-.84.184-.184.412-.482.62-.722.206-.24.275-.412.412-.687.137-.275.069-.515-.034-.721-.103-.206-.8-1.928-1.097-2.65-.289-.696-.582-.601-.8-.612-.206-.01-.44-.011-.673-.011-.232 0-.61.087-.93.435-.32.348-1.22 1.192-1.22 2.91 0 1.718 1.248 3.377 1.42 3.606.173.23 2.457 3.75 5.952 5.263.832.36 1.482.576 1.99.737.836.265 1.597.227 2.197.138.67-.1 1.838-.75 2.095-1.44.258-.69.258-1.28.18-1.4-.078-.12-.284-.206-.593-.362z" />
  </svg>
);

interface FeaturedProgramsProps {
  onEnrollClick: (courseName: string) => void;
  popularOnly?: boolean;
  onExploreAllClick?: () => void;
  onBackToHome?: () => void;
  onNavigateToCourseSlug?: (slug: string) => void;
}

const courseIdToSlug: Record<string, string> = {
  "sap-b1": "sap-business-one-b1-training-mangalore",
  "sap-fico": "sap-fico-training-mangalore",
  "sap-mm": "sap-mm-training-mangalore",
  "sap-sd": "sap-sd-training-mangalore",
  "e-filing": "e-filing-course-mangalore",
  "uae-vat": "uae-vat-course-mangalore",
  "advanced-excel": "advanced-excel-training-mangalore"
};

export default function FeaturedPrograms({
  onEnrollClick,
  popularOnly = false,
  onExploreAllClick,
  onBackToHome,
  onNavigateToCourseSlug
}: FeaturedProgramsProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activeDetailCourse, setActiveDetailCourse] = useState<Course | null>(null);

  const categories = ["All", "SAP & ERP", "Analytics & Excel", "Taxation & Finance"];

  const filteredCourses = (
    selectedCategory === "All"
      ? courses
      : courses.filter((c) => c.category === selectedCategory)
  ).filter((c) => !popularOnly || c.isPopular);

  const courseImages: Record<string, string> = {
    "sap-b1": "https://cdn.shopaccino.com/igmguru/products/sap-business-one-training-online-2390474615788753m-81886647867518_l.webp?v=548",
    "sap-fico": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqvY_GrcrVpvr4NxsOYiPCjLCLY1fjWps3my8gLELI0ubTKySsa1k70Kk&s=10",
    "sap-mm": "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=600&h=400&fit=crop",
    "sap-sd": "https://media.licdn.com/dms/image/v2/D4D12AQEFjpvXxn2Z4A/article-cover_image-shrink_720_1280/B4DZhWCwMnGkAI-/0/1753790219751?e=2147483647&v=beta&t=Y5n5rKPOwfQh2G_zpjFN491HgZAZk6Qvw1Y60694JXI",
    "e-filing": "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=600&h=400&fit=crop",
    "uae-vat": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCy7rr9_RQts-uGDFbgULMRHstHFoH3gy4Kb-7hHjcZwGM0_g2uDl3X-Ix&s=10",
    "advanced-excel": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTC8Vlg7nGi7L01LkUFuPOPyoN1Ryf4Ab-63xLbB2_4ONGKVFvCzBZ7r9f&s=10"
  };

  return (
    <section id="courses" className="py-24 bg-[#0B0F19] relative overflow-hidden text-slate-100">
      {/* Ambient background glow rings */}
      <div className="absolute top-[10%] right-[-10%] w-[45%] h-[45%] bg-blue-600/5 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-[10%] left-[-10%] w-[45%] h-[45%] bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Back Button for Full Course Page View */}
        {!popularOnly && onBackToHome && (
          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900/50 hover:bg-slate-900/80 border border-white/5 hover:border-white/10 text-slate-400 hover:text-white rounded-xl text-xs sm:text-sm font-semibold mb-8 transition-all cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            <span>Back to Home</span>
          </button>
        )}

        {/* Section Heading */}
        <div className="flex flex-col xl:flex-row xl:items-end justify-between mb-16 gap-6">
          <div className="text-left max-w-2xl">
            <span className="text-xs font-mono tracking-[0.25em] text-cyan-400 uppercase font-extrabold bg-cyan-500/10 px-3.5 py-1.5 rounded-md border border-cyan-500/20">
              {popularOnly ? "Featured Programs" : "Professional Training Curricula"}
            </span>
            <h2 className="text-3xl md:text-5xl font-heading font-extrabold text-white mt-4 leading-tight">
              {popularOnly ? "Most Popular Courses" : "Our Course Offerings"}
            </h2>
            <p className="text-slate-400 text-base md:text-lg mt-3 font-light leading-relaxed">
              {popularOnly
                ? "Our highly demanded training tracks designed to launch your enterprise career with real-world competencies."
                : "Explore job-aligned tracks built and maintained alongside senior enterprise consultants to guarantee corporate relevancy."}
            </p>
          </div>

          {/* Elegant Tabs switcher - only visible in Full Page Mode */}
          {!popularOnly && (
            <div className="flex flex-wrap gap-2 max-w-full overflow-x-auto pb-2 scrollbar-none">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer ${
                    selectedCategory === cat
                      ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-500/20 border border-white/10"
                      : "bg-slate-900/60 text-slate-400 border border-white/5 hover:bg-slate-800 hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Dynamic Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredCourses.map((course) => (
              <motion.div
                layout="position"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                key={course.id}
                className="group flex flex-col justify-between rounded-3xl bg-slate-900/30 backdrop-blur-md border border-white/5 hover:border-cyan-500/30 overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(6,182,212,0.12)] shadow-2xl relative"
              >
              {/* Popular stamp */}
              {course.isPopular && (
                <div className="absolute top-4 right-4 z-20 px-3 py-1 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-[10px] font-mono uppercase tracking-wider font-bold rounded-md shadow-lg shadow-amber-500/20 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-white" />
                  <span>Popular</span>
                </div>
              )}

              {/* Course visual banner */}
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={courseImages[course.id] || "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=600"}
                  alt={course.title}
                  className="w-full h-full object-cover transition-transform duration-750 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                {/* Visual shade overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/25 to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-cyan-400/5 mix-blend-overlay"></div>

                {/* Left labels: Difficulty & Certified Stamp */}
                <div className="absolute bottom-4 left-4 flex flex-wrap gap-2 z-10">
                  <span className="px-2.5 py-1 bg-slate-900/80 backdrop-blur-md border border-white/10 rounded-md text-[10px] font-mono text-slate-300 font-bold uppercase tracking-wider">
                    {course.difficulty}
                  </span>
                  {course.certified && (
                    <span className="px-2.5 py-1 bg-emerald-500/20 backdrop-blur-md border border-emerald-400/30 rounded-md text-[10px] font-mono text-emerald-300 font-bold uppercase tracking-wider flex items-center gap-1">
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Certified</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Core Details Content */}
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                <div>
                  {/* Category breadcrumb */}
                  <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-cyan-400 bg-cyan-500/5 px-2.5 py-1 rounded border border-cyan-500/10 inline-block">
                    {course.category}
                  </span>

                  {/* Title */}
                  <h3 className="text-2xl font-heading font-extrabold text-white mt-4 group-hover:text-cyan-300 transition-colors leading-tight">
                    {course.title}
                  </h3>

                  {/* Subtitle */}
                  {course.subtitle && (
                    <h4 className="text-sm font-semibold text-slate-300 mt-1 font-sans tracking-wide leading-relaxed italic">
                      {course.subtitle}
                    </h4>
                  )}

                  {/* Short description */}
                  <p className="text-sm text-slate-400 mt-3 font-light leading-relaxed">
                    {course.description}
                  </p>

                  {/* Dynamic Career Paths section */}
                  <div className="mt-6 pt-5 border-t border-white/5">
                    <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider block mb-3">
                      Career Paths
                    </span>
                    <ul className="space-y-2">
                      {course.careerPaths.map((path, idx) => (
                        <li key={idx} className="flex items-center gap-2.5 text-xs text-slate-300">
                          <span className="h-1.5 w-1.5 rounded-full bg-cyan-400"></span>
                          <span>{path}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Bottom Stats and Actions */}
                <div className="mt-8 pt-5 border-t border-white/5 flex flex-col gap-4">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-cyan-400" />
                      <span className="font-mono font-bold text-slate-200">{course.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span className="font-bold text-slate-200">{course.rating}</span>
                      <span className="text-slate-500">({course.reviewsCount})</span>
                    </div>
                  </div>

                  {/* Double Actions Layout */}
                  <div className="grid grid-cols-2 gap-3 mt-1">
                    <button
                      onClick={() => {
                        const slug = courseIdToSlug[course.id];
                        if (slug && onNavigateToCourseSlug) {
                          onNavigateToCourseSlug(slug);
                        } else {
                          setActiveDetailCourse(course);
                        }
                      }}
                      className="py-3 bg-white/5 hover:bg-white/10 text-slate-200 font-semibold text-xs sm:text-sm rounded-xl transition-all duration-300 border border-white/5 flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>Details</span>
                    </button>
                    <button
                      onClick={() => onEnrollClick(course.title)}
                      className="py-3 bg-primary hover:bg-primary-dark text-white font-bold text-xs sm:text-sm rounded-xl transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-primary/10 flex items-center justify-center gap-1.5 cursor-pointer font-button"
                    >
                      <WhatsAppIcon className="w-3.5 h-3.5" />
                      <span>Enroll</span>
                    </button>
                  </div>
                </div>
              </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Explore All Courses CTA - only visible on home page when popularOnly is true */}
        {popularOnly && onExploreAllClick && (
          <div className="flex justify-center mt-16">
            <button
              onClick={onExploreAllClick}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-bold rounded-2xl shadow-xl shadow-blue-500/20 hover:shadow-blue-500/35 hover:-translate-y-1 transition-all duration-300 flex items-center gap-2.5 cursor-pointer group"
            >
              <span>Explore All 7 Core Programs</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        )}
      </div>

      {/* Curriculum / Details Pop-up Modal */}
      <AnimatePresence>
        {activeDetailCourse && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
            {/* Modal glass backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveDetailCourse(null)}
              className="absolute inset-0 bg-slate-950/85 backdrop-blur-md"
            />

            {/* Modal Dialog Content */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              transition={{ type: "spring", duration: 0.4 }}
              className="relative w-full max-w-2xl bg-slate-900 border border-white/10 rounded-3xl overflow-hidden shadow-2xl z-10 flex flex-col"
            >
              {/* Header Visual Image */}
              <div className="relative h-44 sm:h-52 overflow-hidden">
                <img
                  src={courseImages[activeDetailCourse.id] || "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=600"}
                  alt={activeDetailCourse.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
                
                {/* Close Button */}
                <button
                  onClick={() => setActiveDetailCourse(null)}
                  className="absolute top-4 right-4 p-2 bg-slate-950/80 hover:bg-slate-950 text-slate-300 hover:text-white rounded-full transition-colors cursor-pointer border border-white/10"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Banner Text Overlay */}
                <div className="absolute bottom-4 left-6 sm:left-8 right-6">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded border border-cyan-500/20 inline-block mb-2">
                    {activeDetailCourse.category}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-heading font-extrabold text-white leading-tight">
                    {activeDetailCourse.title}
                  </h3>
                </div>
              </div>

              {/* Scrollable Modal Body */}
              <div className="p-6 sm:p-8 overflow-y-auto max-h-[60vh] space-y-6">
                {activeDetailCourse.subtitle && (
                  <div>
                    <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest block mb-1">
                      Full Track Name
                    </span>
                    <p className="text-base text-slate-200 font-bold">
                      {activeDetailCourse.subtitle}
                    </p>
                  </div>
                )}

                <div>
                  <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest block mb-2">
                    Course Description
                  </span>
                  <p className="text-sm text-slate-300 leading-relaxed font-light">
                    {activeDetailCourse.description}
                  </p>
                </div>

                {/* Time & Certifications Metadata Grid */}
                <div className="grid grid-cols-2 gap-4 bg-slate-950/40 p-4 rounded-2xl border border-white/5">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono font-semibold text-slate-400 uppercase block">
                      Duration Structure
                    </span>
                    <div className="flex items-center gap-1.5 text-xs text-slate-200 font-bold">
                      <Clock className="w-4 h-4 text-cyan-400" />
                      <span>{activeDetailCourse.duration}</span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono font-semibold text-slate-400 uppercase block">
                      Credential Status
                    </span>
                    <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-bold">
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span>✓ Official Certification</span>
                    </div>
                  </div>
                </div>

                {/* Core Curriculum Skills Pills */}
                <div>
                  <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest block mb-3">
                    Core Curriculum Modules
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {activeDetailCourse.skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1.5 bg-white/5 text-xs text-slate-300 rounded-lg border border-white/5 font-mono"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Target Occupations / Career Paths */}
                <div>
                  <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest block mb-3">
                    Career Paths
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {activeDetailCourse.careerPaths.map((path, idx) => (
                      <div
                        key={idx}
                        className="p-3 bg-slate-950/30 rounded-xl border border-white/5 flex items-center gap-2.5"
                      >
                        <Briefcase className="w-4 h-4 text-cyan-400 shrink-0" />
                        <span className="text-xs text-slate-200 font-medium">{path}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Program Features */}
                <div>
                  <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest block mb-3">
                    Exclusive Laboratory Benefits
                  </span>
                  <ul className="space-y-2.5">
                    {activeDetailCourse.features.map((feat, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-xs text-slate-300">
                        <div className="bg-emerald-500/10 p-1 rounded">
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                        </div>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Sticky Footer CTA */}
              <div className="p-6 bg-slate-950/80 border-t border-white/10 flex items-center justify-between gap-4">
                <button
                  onClick={() => setActiveDetailCourse(null)}
                  className="px-5 py-3 text-slate-400 hover:text-white text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
                >
                  Close Window
                </button>
                <button
                  onClick={() => {
                    onEnrollClick(activeDetailCourse.title);
                    setActiveDetailCourse(null);
                  }}
                  className="px-6 py-3.5 bg-primary hover:bg-primary-dark text-white font-bold text-xs sm:text-sm rounded-xl transition-all duration-300 shadow-lg shadow-primary/10 flex items-center gap-2 cursor-pointer font-button"
                >
                  <WhatsAppIcon className="w-4 h-4" />
                  <span>Secure Admission Seat</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
