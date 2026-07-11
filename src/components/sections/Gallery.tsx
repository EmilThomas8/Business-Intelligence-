import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ChevronLeft, ChevronRight, Sparkles, Maximize2, Layers } from "lucide-react";

interface GalleryImage {
  id: number;
  url: string;
  category: "all" | "classrooms" | "workshops" | "events" | "certifications";
  title: string;
  description: string;
  aspectRatio: string; // for custom staggered heights
}

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories = [
    { id: "all", label: "All Moments" },
    { id: "classrooms", label: "Labs & Classrooms" },
    { id: "workshops", label: "Workshops & Seminars" },
    { id: "events", label: "Campus Events" },
    { id: "certifications", label: "Certifications" },
  ];

  const galleryImages: GalleryImage[] = [
    {
      id: 0,
      url: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=800&auto=format&fit=crop",
      category: "classrooms",
      title: "Interactive SAP Lab Session",
      description: "Students training on real-time SAP systems in our modern Karangalpady computer laboratory.",
      aspectRatio: "h-[280px] sm:h-[320px]",
    },
    {
      id: 1,
      url: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=800&auto=format&fit=crop",
      category: "workshops",
      title: "Logistics Workflow Seminar",
      description: "Enterprise software consultant guiding young professionals through supply chain configurations.",
      aspectRatio: "h-[360px] sm:h-[420px]",
    },
    {
      id: 2,
      url: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=800&auto=format&fit=crop",
      category: "workshops",
      title: "Collaborative BI Brainstorming",
      description: "Students designing high-performance interactive Power BI dashboards and data schemas.",
      aspectRatio: "h-[220px] sm:h-[260px]",
    },
    {
      id: 3,
      url: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800&auto=format&fit=crop",
      category: "certifications",
      title: "Corporate Course Graduation",
      description: "Our certified student batches celebrating successful global credentials and career placements.",
      aspectRatio: "h-[340px] sm:h-[400px]",
    },
    {
      id: 4,
      url: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop",
      category: "classrooms",
      title: "High-Tech Smart Lecture Hall",
      description: "An advanced learning ecosystem featuring immersive projection systems and active spaces.",
      aspectRatio: "h-[240px] sm:h-[290px]",
    },
    {
      id: 5,
      url: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800&auto=format&fit=crop",
      category: "events",
      title: "Peer-to-Peer Study Hub",
      description: "Academic teams collaborating on cross-functional business analysis projects.",
      aspectRatio: "h-[320px] sm:h-[370px]",
    },
    {
      id: 6,
      url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=800&auto=format&fit=crop",
      category: "events",
      title: "Annual Tech Innovation Summit",
      description: "Distinguished guest lecturers delivering industry keynotes on S/4HANA developments.",
      aspectRatio: "h-[260px] sm:h-[310px]",
    },
    {
      id: 7,
      url: "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=800&auto=format&fit=crop",
      category: "certifications",
      title: "FICO Professional Validation",
      description: "Practitioners completing structured evaluation boards under ERP training mentors.",
      aspectRatio: "h-[350px] sm:h-[410px]",
    },
  ];

  const filteredImages = activeCategory === "all"
    ? galleryImages
    : galleryImages.filter((img) => img.category === activeCategory);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex === null) return;
    const prevIndex = lightboxIndex === 0 ? filteredImages.length - 1 : lightboxIndex - 1;
    setLightboxIndex(prevIndex);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex === null) return;
    const nextIndex = lightboxIndex === filteredImages.length - 1 ? 0 : lightboxIndex + 1;
    setLightboxIndex(nextIndex);
  };

  return (
    <section id="gallery" className="relative py-24 sm:py-32 bg-[#080B11] overflow-hidden border-t border-white/5">
      {/* Background Decorative Blobs */}
      <div className="absolute top-1/3 left-0 w-[30%] h-[50%] bg-blue-600/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-[25%] h-[40%] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Layout Split: Left Heading Content / Right Staggered Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Sticky/Align Column - Based on given image mockup */}
          <div className="lg:col-span-4 lg:sticky lg:top-28 space-y-8">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono uppercase tracking-[0.2em]">
                <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                <span>Life At BIL</span>
              </div>

              <div className="space-y-4">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight font-sans">
                  Explore The Most Beautiful Places In Our Lab
                </h2>
                <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed">
                  Explore moments from our training sessions, workshops, certifications, and campus activities. See where certified enterprise experts train and professional careers are built.
                </p>
              </div>
            </div>

            {/* Orange "Explore" CTA Button matching the mockup style exactly */}
            <div>
              <a
                href="https://wa.me/919480020875?text=Hello%20Business%20Intelligence%20Lab%2C%20I%20would%20like%20to%20know%20more%20about%20your%20campus%20activities%20and%20workshops%21"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-3.5 bg-[#FF6E01] hover:bg-[#E56200] text-white font-sans font-bold text-sm tracking-wide uppercase rounded-xl transition-all duration-300 shadow-xl shadow-orange-600/15 hover:shadow-orange-600/30 hover:-translate-y-0.5 active:scale-95 group"
              >
                <span>Explore Campus</span>
                <ChevronRight className="w-4 h-4 ml-1.5 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>

            {/* Categories Filters Inside Left Column for Clean, Modern Spacing */}
            <div className="space-y-3 pt-6 border-t border-white/5">
              <span className="text-xs font-bold uppercase tracking-[0.15em] text-slate-400 block mb-2">
                Filter Gallery:
              </span>
              <div className="flex flex-wrap lg:flex-col gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl text-left transition-all duration-200 cursor-pointer ${
                      activeCategory === cat.id
                        ? "bg-cyan-500/15 border border-cyan-400/40 text-cyan-300 shadow-md shadow-cyan-500/5"
                        : "bg-slate-900/35 border border-white/5 text-slate-400 hover:text-white hover:bg-slate-900/60 hover:border-white/10"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <Layers className="w-3.5 h-3.5 opacity-60" />
                      {cat.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Staggered/Asymmetric Grid (Masonry columns matching image model) */}
          <div className="lg:col-span-8">
            <motion.div
              layout
              className="flex overflow-x-auto flex-row flex-nowrap gap-4 pb-5 snap-x snap-mandatory scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] sm:block sm:columns-2 sm:gap-4 sm:space-y-0 sm:pb-0"
            >
              <AnimatePresence mode="popLayout">
                {filteredImages.map((img, index) => (
                  <motion.div
                    key={img.id}
                    layout
                    initial={{ opacity: 0, scale: 0.93, y: 15 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.93, y: -15 }}
                    transition={{ duration: 0.45, ease: "easeInOut" }}
                    onClick={() => setLightboxIndex(index)}
                    className="flex-shrink-0 w-[82vw] max-w-[320px] sm:w-full snap-align-start break-inside-avoid relative overflow-hidden rounded-2xl group border border-white/5 bg-slate-900/40 cursor-zoom-in shadow-lg shadow-black/20 hover:border-cyan-500/35 transition-all duration-300 sm:mb-4"
                  >
                    {/* Lazy-loaded Image wrapper with custom staggered heights */}
                    <div className={`${img.aspectRatio} w-full overflow-hidden relative`}>
                      <img
                        src={img.url}
                        alt={img.title}
                        loading="lazy"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover transform transition-transform duration-700 ease-out group-hover:scale-110"
                      />

                      {/* Image Overlay with title and zoom trigger */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded-full border border-cyan-500/20 mb-2 inline-block">
                              {img.category}
                            </span>
                            <h3 className="text-white text-base font-bold tracking-tight mb-1">
                              {img.title}
                            </h3>
                            <p className="text-slate-300 text-xs font-light line-clamp-2 leading-relaxed">
                              {img.description}
                            </p>
                          </div>
                          <div className="p-2 bg-white/10 rounded-xl backdrop-blur-sm text-white hover:bg-cyan-500 hover:text-slate-950 transition-colors duration-200">
                            <Maximize2 className="w-4 h-4" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {/* View More Button below grid for dedicated gallery actions */}
            <div className="mt-12 text-center">
              <button
                onClick={() => {
                  // Direct navigation callback or WhatsApp catalog toggle
                  const whatsappUrl = "https://wa.me/919480020875?text=Hello%20Business%20Intelligence%20Lab%2C%20I%20would%20love%20to%20see%20more%20photos%20of%20your%20labs%20and%20workshops%21";
                  window.open(whatsappUrl, "_blank", "noopener,noreferrer");
                }}
                className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900/40 hover:bg-slate-900/80 active:scale-95 border border-white/5 hover:border-cyan-500/30 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 text-slate-300 hover:text-white cursor-pointer"
              >
                <span>View More Campus Photos</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>
            </div>
          </div>

        </div>

      </div>

      {/* Lightbox Modal with seamless previous & next navigation */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxIndex(null)}
            className="fixed inset-0 bg-slate-950/95 z-50 flex flex-col items-center justify-center p-4 sm:p-6 backdrop-blur-md"
          >
            {/* Close button */}
            <button
              onClick={() => setLightboxIndex(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
              title="Close Gallery Lightbox"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Image Slider Wrapper */}
            <div className="relative max-w-5xl w-full flex items-center justify-center">
              
              {/* Prev Button */}
              <button
                onClick={handlePrev}
                className="absolute left-2 sm:-left-12 p-3 sm:p-4 rounded-full bg-slate-900/60 hover:bg-slate-900/90 border border-white/5 text-white transition-all cursor-pointer hover:border-cyan-500/30 active:scale-95 z-10"
                title="Previous Image"
              >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>

              {/* Central Active image */}
              <motion.div
                key={lightboxIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-[#0B0F19] rounded-2xl overflow-hidden border border-white/10 shadow-2xl max-h-[70vh] sm:max-h-[75vh] flex flex-col"
              >
                <img
                  src={filteredImages[lightboxIndex].url}
                  alt={filteredImages[lightboxIndex].title}
                  referrerPolicy="no-referrer"
                  className="object-contain max-h-[50vh] sm:max-h-[55vh] w-full"
                />
                
                {/* Meta text block below image in lightbox */}
                <div className="p-5 sm:p-6 border-t border-white/5 bg-[#0B0F19] select-text">
                  <div className="flex flex-wrap items-center gap-2.5 mb-2">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded-full border border-cyan-500/20">
                      {filteredImages[lightboxIndex].category}
                    </span>
                    <span className="text-slate-500 text-xs font-mono">
                      {lightboxIndex + 1} / {filteredImages.length}
                    </span>
                  </div>
                  <h3 className="text-white text-lg sm:text-xl font-bold tracking-tight mb-1.5">
                    {filteredImages[lightboxIndex].title}
                  </h3>
                  <p className="text-slate-300 text-xs sm:text-sm font-light leading-relaxed">
                    {filteredImages[lightboxIndex].description}
                  </p>
                </div>
              </motion.div>

              {/* Next Button */}
              <button
                onClick={handleNext}
                className="absolute right-2 sm:-right-12 p-3 sm:p-4 rounded-full bg-slate-900/60 hover:bg-slate-900/90 border border-white/5 text-white transition-all cursor-pointer hover:border-cyan-500/30 active:scale-95 z-10"
                title="Next Image"
              >
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>

            </div>

            {/* Keyboard hint helper text */}
            <div className="absolute bottom-6 text-slate-500 text-xs font-mono tracking-wider hidden sm:block pointer-events-none">
              Click off image or press ESC to exit • Use arrows to navigate
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
