/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Clock, Briefcase, Award, Star, ChevronRight, Check, Sparkles, X, ArrowRight, ArrowLeft, BookOpen } from "lucide-react";
import { courses, Course } from "../../data/instituteData";

interface FeaturedProgramsProps {
  onEnrollClick: (courseName: string) => void;
  popularOnly?: boolean;
  onExploreAllClick?: () => void;
  onBackToHome?: () => void;
}

export default function FeaturedPrograms({
  onEnrollClick,
  popularOnly = false,
  onExploreAllClick,
  onBackToHome
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
    "sap-fico": "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=600&h=400&fit=crop",
    "sap-mm": "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=600&h=400&fit=crop",
    "sap-sd": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=600&h=400&fit=crop",
    "sap-s4-hana": "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=600&h=400&fit=crop",
    "sap-b1": "https://images.unsplash.com/photo-1542744094-3a31f103e35f?q=80&w=600&h=400&fit=crop",
    "sap-b1-adv": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&h=400&fit=crop",
    
    "business-excel": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&h=400&fit=crop",
    "business-excel-analytics": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=600&h=400&fit=crop",
    "adv-excel-power-bi": "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=600&h=400&fit=crop",
    "excel-power-bi-prof": "https://images.unsplash.com/photo-1542744094-3a31f103e35f?q=80&w=600&h=400&fit=crop",
    
    "gst-filing": "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=600&h=400&fit=crop",
    "itr-filing": "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=600&h=400&fit=crop",
    "essentials-gst-itr": "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=600&h=400&fit=crop",
    "uae-vat": "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=600&h=400&fit=crop",
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
          {filteredCourses.map((course) => (
            <div
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
                      onClick={() => setActiveDetailCourse(course)}
                      className="py-3 bg-white/5 hover:bg-white/10 text-slate-200 font-semibold text-xs sm:text-sm rounded-xl transition-all duration-300 border border-white/5 flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>Details</span>
                    </button>
                    <button
                      onClick={() => onEnrollClick(course.title)}
                      className="py-3 bg-primary hover:bg-primary-dark text-white font-bold text-xs sm:text-sm rounded-xl transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-primary/10 flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <span>Enroll</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Explore All Courses CTA - only visible on home page when popularOnly is true */}
        {popularOnly && onExploreAllClick && (
          <div className="flex justify-center mt-16">
            <button
              onClick={onExploreAllClick}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-bold rounded-2xl shadow-xl shadow-blue-500/20 hover:shadow-blue-500/35 hover:-translate-y-1 transition-all duration-300 flex items-center gap-2.5 cursor-pointer group"
            >
              <span>Explore All 14+ Course Offers</span>
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
                  className="px-6 py-3.5 bg-primary hover:bg-primary-dark text-white font-bold text-xs sm:text-sm rounded-xl transition-all duration-300 shadow-lg shadow-primary/10 flex items-center gap-2 cursor-pointer"
                >
                  <span>Secure Admission Seat</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
