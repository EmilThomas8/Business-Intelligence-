/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { motion } from "motion/react";
import { COURSES } from "../../data";
import { Course } from "../../types";
import { Star, Clock, Check, Award, ArrowRight, ShieldCheck, Compass, FileText } from "lucide-react";

const WhatsAppIcon = ({ className = "h-5 w-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.517 2.266 2.27 3.51 5.276 3.508 8.48-.005 6.66-5.342 11.997-11.953 11.997-2.005-.001-3.973-.503-5.714-1.458L0 24zm6.59-4.846c1.6.95 3.16 1.449 4.795 1.451 5.429.002 9.841-4.408 9.845-9.842.002-2.632-1.02-5.105-2.881-6.967-1.861-1.862-4.333-2.883-6.969-2.884-5.432 0-9.843 4.408-9.847 9.843-.001 1.73.457 3.417 1.325 4.904l-.994 3.63 3.727-.977zm11.452-4.664c-.31-.156-1.838-.907-2.122-1.01-.284-.103-.49-.156-.696.156-.206.31-.8.1-.986 1.185-.186.206-.372.232-.682.077-.31-.156-1.31-.483-2.495-1.54-1.222-1.09-2.046-2.436-2.285-2.848-.239-.412-.025-.634.18-.84.184-.184.412-.482.62-.722.206-.24.275-.412.412-.687.137-.275.069-.515-.034-.721-.103-.206-.8-1.928-1.097-2.65-.289-.696-.582-.601-.8-.612-.206-.01-.44-.011-.673-.011-.232 0-.61.087-.93.435-.32.348-1.22 1.192-1.22 2.91 0 1.718 1.248 3.377 1.42 3.606.173.23 2.457 3.75 5.952 5.263.832.36 1.482.576 1.99.737.836.265 1.597.227 2.197.138.67-.1 1.838-.75 2.095-1.44.258-.69.258-1.28.18-1.4-.078-.12-.284-.206-.593-.362z" />
  </svg>
);

interface CoursesProps {
  onEnrollClick: (courseTitle: string) => void;
}

export default function Courses({ onEnrollClick }: CoursesProps) {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const categories = ["All", "SAP ERP", "Data Analytics", "Taxation", "Finance"];

  const filteredCourses = activeCategory === "All"
    ? COURSES
    : COURSES.filter(c => c.category === activeCategory);

  return (
    <section
      id="courses"
      className="py-24 bg-white relative overflow-hidden"
    >
      {/* Visual background decorations */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-50/40 rounded-full blur-[100px] pointer-events-none z-0" />
      <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-cyan-50/30 rounded-full blur-[120px] pointer-events-none z-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="text-left space-y-3">
            <div className="inline-flex items-center gap-1.5 bg-blue-50 border border-blue-100 px-3 py-1 rounded-full text-xs font-semibold text-primary uppercase tracking-wider">
              <ShieldCheck className="h-3.5 w-3.5" /> Professional Certifications
            </div>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-slate-900 tracking-tight leading-tight">
              Elite Corporate Training Programs
            </h2>
            <p className="font-sans text-slate-500 text-base sm:text-lg max-w-2xl leading-relaxed">
              Acquire certified competence mapped directly to industry positions. Get live sandbox credentials and practical knowledge verified by top firms.
            </p>
          </div>

          {/* Filter Categories Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                id={`filter-${cat.toLowerCase().replace(/\s+/g, '-')}`}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold cursor-pointer transition-all duration-300 ${
                  activeCategory === cat
                    ? "bg-primary text-white shadow-md shadow-primary/20 scale-[1.02]"
                    : "bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course: Course, index: number) => (
            <motion.div
              key={course.id}
              id={`course-card-${course.id}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:border-blue-400/40 transition-all duration-300 flex flex-col group relative"
            >
              {/* Image Section */}
              <div className="relative h-48 sm:h-52 overflow-hidden z-10">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

                {/* Badges / Ribbons inside Image */}
                <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start">
                  <span className="bg-primary/90 text-white font-mono font-bold text-[10px] px-2.5 py-1 rounded-md uppercase tracking-widest backdrop-blur-sm border border-white/15">
                    {course.category}
                  </span>
                  {course.badge && (
                    <span className="bg-accent/95 text-slate-950 font-sans font-bold text-[10px] px-2.5 py-1 rounded-md uppercase tracking-wider shadow">
                      {course.badge}
                    </span>
                  )}
                </div>

                {/* Certified Ribbon in the top-right corner */}
                <div className="absolute top-3 right-3">
                  <span className="bg-emerald-500 text-white p-1.5 rounded-full shadow-lg flex items-center justify-center border border-white/20" title="Officially Certified">
                    <Award className="h-4 w-4" />
                  </span>
                </div>

                {/* Course Rating Overlay bottom-left */}
                <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-slate-950/70 backdrop-blur-md px-2 py-1 rounded-lg border border-white/10">
                  <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                  <span className="text-white font-mono font-bold text-xs">{course.rating}</span>
                  <span className="text-slate-400 text-[10px]">({course.reviewCount})</span>
                </div>

                {/* Difficulty Tag bottom-right */}
                <div className="absolute bottom-3 right-3">
                  <span className={`text-[10px] font-sans font-bold px-2 py-0.5 rounded ${
                    course.difficulty === "Advanced"
                      ? "bg-red-500/85 text-white"
                      : course.difficulty === "Intermediate"
                        ? "bg-amber-500/85 text-slate-950"
                        : "bg-blue-500/85 text-white"
                  }`}>
                    {course.difficulty}
                  </span>
                </div>
              </div>

              {/* Course Info Body */}
              <div className="p-6 flex-1 flex flex-col items-start text-left">
                {/* Duration Line */}
                <div className="flex items-center gap-1.5 text-slate-400 text-xs font-semibold mb-2.5">
                  <Clock className="h-3.5 w-3.5 text-primary" />
                  <span>{course.duration}</span>
                </div>

                {/* Course Title */}
                <h3 className="font-heading font-extrabold text-lg sm:text-xl text-slate-900 group-hover:text-primary transition-colors duration-300 mb-2 leading-snug">
                  {course.title}
                </h3>

                {/* Course Description */}
                <p className="font-sans text-slate-500 text-sm mb-5 leading-relaxed line-clamp-3">
                  {course.description}
                </p>

                {/* Skills Learned List */}
                <div className="w-full space-y-1.5 mb-5 pt-4 border-t border-slate-100">
                  <p className="text-[11px] font-mono uppercase tracking-wider font-bold text-slate-400 flex items-center gap-1">
                    <FileText className="h-3 w-3" /> Core Config Curricula:
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {course.skillsLearned.slice(0, 3).map((skill) => (
                      <span key={skill} className="bg-slate-50 border border-slate-100 text-slate-600 text-[11px] font-sans font-medium px-2 py-0.5 rounded-md">
                        {skill}
                      </span>
                    ))}
                    {course.skillsLearned.length > 3 && (
                      <span className="text-[11px] text-primary font-semibold py-0.5 pl-1">
                        +{course.skillsLearned.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Target Career Paths with Compass */}
                <div className="w-full space-y-1 mb-6">
                  <p className="text-[11px] font-mono uppercase tracking-wider font-bold text-slate-400 flex items-center gap-1">
                    <Compass className="h-3 w-3 text-cyan-500" /> Prepares You For:
                  </p>
                  <div className="text-xs text-slate-700 font-sans font-medium space-y-1">
                    {course.careerPaths.map((path) => (
                      <div key={path} className="flex items-center gap-1.5 text-slate-600">
                        <Check className="h-3.5 w-3.5 text-emerald-500 flex-shrink-0" />
                        <span>{path}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Glass Footer & Action */}
              <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between w-full group-hover:bg-slate-100/40 transition-colors duration-300">
                <div className="flex items-center gap-1 text-[11px] text-slate-400 font-mono font-bold uppercase tracking-wider">
                  <Award className="h-4 w-4 text-emerald-500" /> Certified
                </div>
                <button
                  id={`enroll-btn-${course.id}`}
                  onClick={() => onEnrollClick(course.title)}
                  className="font-button text-xs font-bold text-white bg-primary hover:bg-primary-dark px-4 py-2.5 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center gap-1.5 group/btn cursor-pointer"
                >
                  <WhatsAppIcon className="h-3.5 w-3.5" />
                  <span>Quick Inquiry</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
