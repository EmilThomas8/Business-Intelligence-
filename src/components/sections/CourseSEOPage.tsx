import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { 
  Calendar, 
  Award, 
  Briefcase, 
  CheckCircle2, 
  ArrowLeft, 
  Phone, 
  MessageSquare, 
  MapPin, 
  ChevronDown, 
  ChevronUp, 
  Clock, 
  FileText,
  UserCheck
} from "lucide-react";
import { SEOCourseData } from "../../data/seoCoursesData";

interface CourseSEOPageProps {
  courseData: SEOCourseData;
  onBackToHome: () => void;
  onOpenContactWithPreFill: (courseTitle: string, prefilledComment: string) => void;
}

export default function CourseSEOPage({ 
  courseData, 
  onBackToHome, 
  onOpenContactWithPreFill 
}: CourseSEOPageProps) {
  const [activeModule, setActiveModule] = useState<number | null>(0);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Dynamic Metadata and Schema.org injection
  useEffect(() => {
    // 1. Update document Title
    const originalTitle = document.title;
    document.title = courseData.title;

    // 2. Update Meta Description
    let metaDescriptionEl = document.querySelector('meta[name="description"]');
    let originalDescription = "";
    if (metaDescriptionEl) {
      originalDescription = metaDescriptionEl.getAttribute("content") || "";
      metaDescriptionEl.setAttribute("content", courseData.metaDescription);
    } else {
      metaDescriptionEl = document.createElement("meta");
      metaDescriptionEl.setAttribute("name", "description");
      metaDescriptionEl.setAttribute("content", courseData.metaDescription);
      document.head.appendChild(metaDescriptionEl);
    }

    // 3. Inject Structured Schema (JSON-LD)
    const schemaScript = document.createElement("script");
    schemaScript.type = "application/ld+json";
    schemaScript.id = `schema-${courseData.slug}`;

    const courseSchema = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Course",
          "@id": `https://bilab.in.co/courses/${courseData.slug}#course`,
          "name": courseData.h1,
          "description": courseData.metaDescription,
          "provider": {
            "@type": "LocalBusiness",
            "name": "Business Intelligence Lab (BIL)",
            "image": "https://bilab.in.co/assets/logo.png",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Karangalpady",
              "addressLocality": "Mangalore",
              "addressRegion": "Karnataka",
              "postalCode": "575003",
              "addressCountry": "IN"
            },
            "telephone": "+91-9480020875",
            "url": "https://bilab.in.co"
          },
          "hasCourseInstance": {
            "@type": "CourseInstance",
            "courseMode": "Blended",
            "duration": "PT90H",
            "courseWorkload": "PT10H"
          }
        },
        {
          "@type": "EducationalOrganization",
          "name": "Business Intelligence Lab",
          "url": "https://bilab.in.co",
          "logo": "https://bilab.in.co/assets/logo.png",
          "sameAs": [
            "https://www.facebook.com/BusinessIntelligenceLab",
            "https://www.linkedin.com/company/businessintelligencelab"
          ]
        }
      ]
    };

    schemaScript.text = JSON.stringify(courseSchema);
    document.head.appendChild(schemaScript);

    // Scroll to top
    window.scrollTo({ top: 0, behavior: "instant" as any });

    // Cleanup: Restore original state
    return () => {
      document.title = originalTitle;
      if (metaDescriptionEl) {
        if (originalDescription) {
          metaDescriptionEl.setAttribute("content", originalDescription);
        } else {
          metaDescriptionEl.remove();
        }
      }
      const existingSchema = document.getElementById(`schema-${courseData.slug}`);
      if (existingSchema) {
        existingSchema.remove();
      }
    };
  }, [courseData]);

  const toggleModule = (index: number) => {
    setActiveModule(activeModule === index ? null : index);
  };

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const handleApplyNow = () => {
    const comment = `I am highly interested in securing admission for the "${courseData.h1}" at your Karangalpady, Mangalore campus. Please share current schedules and admission availability.`;
    onOpenContactWithPreFill(courseData.h1, comment);
  };

  const handleWhatsAppInquiry = () => {
    const text = `Hello Business Intelligence Lab admissions team, I would like details about the course: "${courseData.h1}" at your Mangaluru institute.`;
    const url = `https://wa.me/919480020875?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div id={`course-seo-page-${courseData.slug}`} className="w-full relative py-8 md:py-16">
      
      {/* Decorative Blur Orbs */}
      <div className="absolute top-10 right-10 w-96 h-96 bg-cyan-500/5 rounded-full filter blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/3 left-10 w-96 h-96 bg-blue-500/5 rounded-full filter blur-[100px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Breadcrumb back button */}
        <button
          onClick={onBackToHome}
          className="group inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-cyan-400 transition-colors mb-8 cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to All Courses & Programs</span>
        </button>

        {/* Hero Section of Course */}
        <div className="border-b border-white/5 pb-10 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono font-bold tracking-wider uppercase mb-5">
            <Award className="h-3.5 w-3.5" />
            <span>Mangalore Certified Program</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.1] mb-6">
            {courseData.h1}
          </h1>

          <p className="text-lg text-slate-300 font-light leading-relaxed max-w-4xl">
            {courseData.introduction}
          </p>

          {/* Quick Stats Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 pt-6 border-t border-white/5">
            <div className="bg-slate-900/40 p-4 rounded-xl border border-white/5 flex items-center gap-3">
              <Clock className="h-5 w-5 text-cyan-400 shrink-0" />
              <div>
                <p className="text-[10px] font-mono uppercase tracking-wider text-slate-400">Duration</p>
                <p className="text-sm font-semibold text-white">{courseData.duration}</p>
              </div>
            </div>

            <div className="bg-slate-900/40 p-4 rounded-xl border border-white/5 flex items-center gap-3">
              <UserCheck className="h-5 w-5 text-blue-400 shrink-0" />
              <div>
                <p className="text-[10px] font-mono uppercase tracking-wider text-slate-400">Delivery</p>
                <p className="text-sm font-semibold text-white">Live Classroom</p>
              </div>
            </div>

            <div className="bg-slate-900/40 p-4 rounded-xl border border-white/5 flex items-center gap-3">
              <MapPin className="h-5 w-5 text-yellow-400 shrink-0" />
              <div>
                <p className="text-[10px] font-mono uppercase tracking-wider text-slate-400">Location</p>
                <p className="text-sm font-semibold text-white">Karangalpady, MLR</p>
              </div>
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Main Body (Left 2 columns) */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* Detailed Overview */}
            <section className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight border-l-4 border-cyan-500 pl-3">
                Course Insights & Technical Scope
              </h2>
              {courseData.overviewDetailed.map((paragraph, idx) => (
                <p key={idx} className="text-slate-300 leading-relaxed font-light text-base">
                  {paragraph}
                </p>
              ))}
            </section>

            {/* Special Gulf Section if applicable */}
            {courseData.gulfFocus && (
              <section className="bg-cyan-950/20 border border-cyan-500/20 p-6 rounded-2xl space-y-3">
                <h3 className="text-lg font-bold text-cyan-300 flex items-center gap-2">
                  <Briefcase className="h-5 w-5" />
                  Gulf Region Career Optimization
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed font-light">
                  {courseData.gulfFocus}
                </p>
              </section>
            )}

            {/* Syllabus Section (Interactive accordion) */}
            <section className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight border-l-4 border-cyan-500 pl-3">
                Syllabus & Modules Breakdown
              </h2>
              <p className="text-slate-400 text-sm font-light">
                Our curriculum has been carefully structured by industry experts to build logical sequences, moving from raw foundational rules up to advanced configuration.
              </p>

              <div className="space-y-3 mt-4">
                {courseData.syllabus.map((mod, idx) => (
                  <div 
                    key={idx}
                    className="border border-white/5 rounded-xl overflow-hidden bg-slate-900/30"
                  >
                    <button
                      onClick={() => toggleModule(idx)}
                      className="w-full flex justify-between items-center px-5 py-4 text-left font-medium text-slate-200 hover:text-white hover:bg-slate-900/60 transition-colors cursor-pointer"
                    >
                      <span className="text-sm md:text-base font-semibold">{mod.moduleTitle}</span>
                      {activeModule === idx ? (
                        <ChevronUp className="h-4 w-4 text-cyan-400" />
                      ) : (
                        <ChevronDown className="h-4 w-4 text-slate-400" />
                      )}
                    </button>
                    
                    {activeModule === idx && (
                      <div className="px-5 pb-5 pt-1 border-t border-white/5 bg-slate-950/40">
                        <ul className="space-y-2.5">
                          {mod.topics.map((topic, tIdx) => (
                            <li key={tIdx} className="text-xs sm:text-sm text-slate-300 flex items-start gap-2.5">
                              <CheckCircle2 className="h-4.5 w-4.5 text-cyan-500 shrink-0 mt-0.5" />
                              <span className="font-light">{topic}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* Local Relevance / Geography context */}
            <section className="bg-slate-900/50 border border-white/5 p-6 rounded-2xl space-y-3">
              <h3 className="text-base font-mono font-bold uppercase tracking-wider text-slate-400">
                Mangaluru Classroom Infrastructure Advantage
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed font-light">
                {courseData.localRelevance} Our physical hub at Karangalpady boasts advanced computing sandboxes, live server feeds for ERP practicals, and customized study capsules.
              </p>
            </section>

            {/* FAQ Section */}
            <section className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight border-l-4 border-cyan-500 pl-3">
                Frequently Asked Questions
              </h2>
              <div className="space-y-3 mt-4">
                {courseData.faqs.map((faq, idx) => (
                  <div 
                    key={idx}
                    className="border-b border-white/5 pb-4"
                  >
                    <button
                      onClick={() => toggleFaq(idx)}
                      className="w-full flex justify-between items-center py-3 text-left font-medium text-slate-200 hover:text-white transition-colors cursor-pointer"
                    >
                      <span className="text-sm md:text-base font-semibold pr-4">{faq.question}</span>
                      {activeFaq === idx ? (
                        <ChevronUp className="h-4 w-4 text-cyan-400 shrink-0" />
                      ) : (
                        <ChevronDown className="h-4 w-4 text-slate-400 shrink-0" />
                      )}
                    </button>
                    
                    {activeFaq === idx && (
                      <p className="text-slate-300 text-sm leading-relaxed font-light mt-2 pl-1">
                        {faq.answer}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>

          </div>

          {/* Sidebar (Right 1 column) */}
          <div className="space-y-8">
            
            {/* Quick Summary Card */}
            <div className="bg-gradient-to-b from-slate-900 to-slate-950 p-6 rounded-2xl border border-white/10 shadow-xl space-y-6 sticky top-24">
              <div>
                <h3 className="text-sm font-mono text-cyan-400 uppercase tracking-widest mb-1">ADMISSIONS OPEN</h3>
                <p className="text-xs text-slate-400">Classroom sessions starting weekly at Karangalpady, Mangalore.</p>
              </div>

              {/* Target profiles */}
              <div className="space-y-3">
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400">Target Audience</h4>
                <ul className="space-y-2">
                  {courseData.whoIsItFor.map((item, idx) => (
                    <li key={idx} className="text-xs text-slate-300 flex items-start gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shrink-0 mt-1.5" />
                      <span className="font-light">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Career Outcomes */}
              <div className="space-y-3 border-t border-white/5 pt-4">
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400">Career Trajectories</h4>
                <div className="flex flex-wrap gap-1.5">
                  {courseData.careerOutcomes.map((item, idx) => (
                    <span 
                      key={idx}
                      className="bg-slate-950 text-slate-300 text-[10px] sm:text-xs px-2.5 py-1 rounded-md border border-white/5 font-light"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Prerequisites */}
              <div className="space-y-3 border-t border-white/5 pt-4">
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400">Entry Prerequisites</h4>
                <ul className="space-y-2">
                  {courseData.prerequisites.map((item, idx) => (
                    <li key={idx} className="text-xs text-slate-400 flex items-start gap-2">
                      <span className="h-1 w-1 rounded-full bg-slate-500 shrink-0 mt-1.5" />
                      <span className="font-light">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-4 border-t border-white/5">
                <button
                  onClick={handleApplyNow}
                  className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-slate-950 font-bold py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/10 transition-all duration-300 text-sm cursor-pointer"
                >
                  <FileText className="h-4.5 w-4.5" />
                  <span>Enquire Admission</span>
                </button>

                <button
                  onClick={handleWhatsAppInquiry}
                  className="w-full bg-[#25D366]/10 hover:bg-[#25D366]/25 border border-[#25D366]/30 text-[#25D366] font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 text-sm cursor-pointer"
                >
                  <MessageSquare className="h-4.5 w-4.5" />
                  <span>Ask on WhatsApp</span>
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
