import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Search, 
  Calendar, 
  Clock, 
  ArrowRight, 
  Sparkles, 
  Grid, 
  Tag, 
  SlidersHorizontal,
  ChevronRight,
  BookOpen
} from "lucide-react";
import { blogService, categoryService } from "../../services/blog.service";
import { authService } from "../../services/auth.service";
import { BlogPost, Category } from "../../types/blog";

interface BlogListingProps {
  onNavigateToBlogSlug: (slug: string) => void;
  onNavigateToAdmin: () => void;
}

export default function BlogListing({ onNavigateToBlogSlug, onNavigateToAdmin }: BlogListingProps) {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"newest" | "oldest">("newest");

  // Initial Fetch & Seed
  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        // Ensure defaults are initialized first
        await authService.seedAdminUserIfNeeded();
        await categoryService.seedInitialDataIfNeeded();
        
        // Fetch fresh lists
        const [fetchedBlogs, fetchedCategories] = await Promise.all([
          blogService.getAllBlogs(true),
          categoryService.getAllCategories()
        ]);

        setBlogs(fetchedBlogs);
        setCategories(fetchedCategories);
      } catch (error) {
        console.error("Error loading public blog listing:", error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  // Filter & Search Logic
  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch = 
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = 
      selectedCategory === "all" || 
      blog.categoryId === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // Sort logic
  const sortedBlogs = [...filteredBlogs].sort((a, b) => {
    const dateA = new Date(a.publishDate).getTime();
    const dateB = new Date(b.publishDate).getTime();
    return sortBy === "newest" ? dateB - dateA : dateA - dateB;
  });

  // Find Featured Blog (first featured: true, or the latest published blog)
  const featuredBlog = sortedBlogs.find(b => b.featured) || sortedBlogs[0];
  const regularBlogs = sortedBlogs.filter(b => b.id !== (featuredBlog?.id || ""));

  // Helper for Category name & color styles
  const getCategoryDetails = (catId: string) => {
    const cat = categories.find((c) => c.id === catId);
    if (!cat) return { name: "SAP Cloud", color: "cyan" };
    return { name: cat.name, color: cat.color };
  };

  const getBadgeColors = (color: string) => {
    switch (color) {
      case "blue":
        return "bg-blue-500/10 text-blue-400 border-blue-500/20";
      case "amber":
        return "bg-amber-500/10 text-amber-400 border-amber-500/20";
      case "emerald":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
      case "rose":
        return "bg-rose-500/10 text-rose-400 border-rose-500/20";
      case "purple":
        return "bg-purple-500/10 text-purple-400 border-purple-500/20";
      default:
        return "bg-cyan-500/10 text-cyan-400 border-cyan-500/20";
    }
  };

  const calculateReadTime = (content: string) => {
    const words = content.replace(/<[^>]*>/g, "").split(/\s+/).length;
    const minutes = Math.ceil(words / 220); // Average reading speed
    return `${minutes} min read`;
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-white">
      {/* Decorative Glow elements */}
      <div className="absolute top-0 right-1/4 w-[40%] h-[40%] bg-cyan-500/5 rounded-full blur-[150px] pointer-events-none z-0" />
      <div className="absolute bottom-1/3 left-1/4 w-[40%] h-[40%] bg-blue-600/5 rounded-full blur-[140px] pointer-events-none z-0" />

      {/* Hero Section */}
      <div className="relative py-20 md:py-28 border-b border-white/5 bg-gradient-to-b from-slate-950 to-transparent">
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          
          {/* Admin gateway link in small badge */}
          <div className="flex justify-between items-center mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono">
              <BookOpen className="w-4 h-4" />
              <span>SAP Knowledge Hub</span>
            </div>
            
            <button
              onClick={onNavigateToAdmin}
              className="text-xs font-mono text-slate-400 hover:text-cyan-400 transition-colors border border-white/10 hover:border-cyan-500/30 px-3.5 py-1.5 rounded-lg bg-slate-900/40 cursor-pointer"
            >
              Admin Portal
            </button>
          </div>

          <div className="text-center max-w-3xl mx-auto space-y-6">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-tight font-sans">
              Business Intelligence <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Insights</span>
            </h1>
            <p className="text-base sm:text-lg text-slate-300 font-light leading-relaxed max-w-2xl mx-auto">
              Deep-dives, certification tutorials, code repositories, and structural guides authored by experienced SAP consultants.
            </p>

            {/* Core Search Bar Integration */}
            <div className="pt-6 max-w-2xl mx-auto">
              <div className="relative rounded-2xl border border-white/10 bg-slate-900/60 p-1.5 focus-within:border-cyan-500/50 focus-within:ring-2 focus-within:ring-cyan-500/10 transition-all flex items-center shadow-2xl">
                <div className="pl-4 text-slate-400">
                  <Search className="w-5 h-5" />
                </div>
                <input
                  type="text"
                  placeholder="Search articles by title, keyword, or SAP module..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent border-0 outline-none focus:outline-none focus:ring-0 text-white placeholder-slate-500 text-sm sm:text-base px-3.5 py-2.5"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="text-xs text-slate-400 hover:text-white px-2 cursor-pointer"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Main Content Space */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 relative z-10">
        
        {/* Filter Controls Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-10 border-b border-white/5 mb-12">
          
          {/* Categories Horizontal Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-4.5 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all border cursor-pointer ${
                selectedCategory === "all"
                  ? "bg-cyan-500 text-slate-950 border-cyan-400 font-bold"
                  : "bg-slate-900/40 border-white/5 text-slate-300 hover:border-cyan-500/20"
              }`}
            >
              All Categories
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4.5 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all border cursor-pointer ${
                  selectedCategory === cat.id
                    ? "bg-cyan-500 text-slate-950 border-cyan-400 font-bold"
                    : "bg-slate-900/40 border-white/5 text-slate-300 hover:border-cyan-500/20"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Sorters and Controls */}
          <div className="flex items-center gap-3.5 flex-wrap">
            <div className="inline-flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-slate-900/40 border border-white/5 text-slate-400 text-xs sm:text-sm">
              <SlidersHorizontal className="w-4 h-4 text-cyan-400" />
              <span>Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent border-0 outline-none focus:ring-0 text-white cursor-pointer font-semibold"
              >
                <option value="newest" className="bg-slate-950 text-white">Newest First</option>
                <option value="oldest" className="bg-slate-950 text-white">Oldest First</option>
              </select>
            </div>
            
            <div className="text-xs sm:text-sm text-slate-400 font-mono">
              Showing <span className="text-cyan-400 font-semibold">{sortedBlogs.length}</span> articles
            </div>
          </div>

        </div>

        {/* Loading Skeletons */}
        {loading ? (
          <div className="space-y-12 animate-pulse">
            {/* Featured blog skeleton */}
            <div className="h-[400px] bg-slate-900/40 border border-white/5 rounded-3xl" />
            {/* Grid items skeletons */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-[380px] bg-slate-900/40 border border-white/5 rounded-3xl" />
              ))}
            </div>
          </div>
        ) : sortedBlogs.length === 0 ? (
          /* Empty search / category state */
          <div className="text-center py-20 bg-slate-900/20 border border-white/5 rounded-3xl max-w-3xl mx-auto p-8">
            <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-white/10 flex items-center justify-center mx-auto mb-6 text-slate-400">
              <Search className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">No Articles Found</h3>
            <p className="text-slate-400 text-sm max-w-md mx-auto leading-relaxed">
              We couldn't find any articles matching "{searchQuery}" under the selected category. Try clarifying your terms or clearing the search queries.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
              }}
              className="mt-6 px-5 py-2.5 bg-cyan-500 text-slate-950 font-bold rounded-xl text-xs sm:text-sm tracking-wide uppercase transition-all cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          /* Real Data Layout rendering */
          <div className="space-y-16">
            
            {/* Featured Blog Segment */}
            {featuredBlog && selectedCategory === "all" && !searchQuery && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                onClick={() => onNavigateToBlogSlug(featuredBlog.slug)}
                className="group relative grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-8 rounded-3xl bg-slate-900/30 border border-white/5 overflow-hidden hover:border-cyan-500/25 transition-all duration-500 cursor-pointer shadow-xl"
              >
                {/* Glowing featured highlight card border accent */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-cyan-500/10 to-transparent blur-lg pointer-events-none" />

                {/* Left side Image */}
                <div className="lg:col-span-7 h-[250px] sm:h-[350px] rounded-2xl overflow-hidden relative border border-white/5">
                  <img
                    src={featuredBlog.featuredImage || "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1200&auto=format&fit=crop"}
                    alt={featuredBlog.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                  <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500 text-slate-950 text-[10px] font-mono uppercase tracking-wider font-bold shadow-md">
                    <Sparkles className="w-3 h-3 fill-slate-950" />
                    Featured Article
                  </div>
                </div>

                {/* Right side Details */}
                <div className="lg:col-span-5 flex flex-col justify-between py-2 space-y-6">
                  <div className="space-y-4">
                    
                    {/* Category Details & Reading Time */}
                    <div className="flex items-center gap-3">
                      {(() => {
                        const { name, color } = getCategoryDetails(featuredBlog.categoryId);
                        return (
                          <span className={`px-2.5 py-0.5 rounded-full border text-[10px] font-mono uppercase tracking-wider font-semibold ${getBadgeColors(color)}`}>
                            {name}
                          </span>
                        );
                      })()}
                      <span className="text-slate-500">•</span>
                      <span className="inline-flex items-center gap-1 text-slate-400 text-xs font-mono">
                        <Clock className="w-3.5 h-3.5 text-slate-500" />
                        {calculateReadTime(featuredBlog.content)}
                      </span>
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-extrabold text-white group-hover:text-cyan-400 transition-colors leading-tight font-sans">
                      {featuredBlog.title}
                    </h2>

                    <p className="text-slate-300 font-light text-sm sm:text-base leading-relaxed line-clamp-3">
                      {featuredBlog.excerpt}
                    </p>
                  </div>

                  {/* Profile info & button */}
                  <div className="flex items-center justify-between gap-4 pt-6 border-t border-white/5">
                    <div>
                      <h4 className="text-white text-sm font-bold">{featuredBlog.author}</h4>
                      <p className="text-xs text-slate-400 font-mono">
                        {new Date(featuredBlog.publishDate).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric"
                        })}
                      </p>
                    </div>

                    <span className="inline-flex items-center gap-2 text-cyan-400 font-bold text-xs uppercase tracking-wider group-hover:text-white transition-colors">
                      Read Article
                      <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" />
                    </span>
                  </div>

                </div>
              </motion.div>
            )}

            {/* Standard Blogs Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularBlogs.map((blog, idx) => (
                <motion.article
                  key={blog.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: idx * 0.08 }}
                  onClick={() => onNavigateToBlogSlug(blog.slug)}
                  className="group flex flex-col justify-between p-5 rounded-3xl bg-slate-900/30 border border-white/5 hover:border-cyan-500/20 hover:bg-slate-900/50 transition-all duration-300 cursor-pointer shadow-lg relative"
                >
                  <div className="space-y-5">
                    {/* Image space */}
                    <div className="h-[200px] w-full rounded-2xl overflow-hidden border border-white/5 relative">
                      <img
                        src={blog.featuredImage || "https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=600&auto=format&fit=crop"}
                        alt={blog.title}
                        className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                        loading="lazy"
                      />
                    </div>

                    {/* Meta */}
                    <div className="flex items-center justify-between gap-2.5">
                      {(() => {
                        const { name, color } = getCategoryDetails(blog.categoryId);
                        return (
                          <span className={`px-2.5 py-0.5 rounded-full border text-[10px] font-mono uppercase tracking-wider font-semibold ${getBadgeColors(color)}`}>
                            {name}
                          </span>
                        );
                      })()}
                      <span className="inline-flex items-center gap-1 text-slate-400 text-[11px] font-mono">
                        <Clock className="w-3.5 h-3.5 text-slate-500" />
                        {calculateReadTime(blog.content)}
                      </span>
                    </div>

                    {/* Title & short intro */}
                    <div className="space-y-2.5">
                      <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-cyan-400 transition-colors leading-snug line-clamp-2">
                        {blog.title}
                      </h3>
                      <p className="text-slate-300 font-light text-xs sm:text-sm leading-relaxed line-clamp-3">
                        {blog.excerpt}
                      </p>
                    </div>
                  </div>

                  {/* Profile section footer */}
                  <div className="flex items-center justify-between gap-4 pt-4 mt-6 border-t border-white/5">
                    <div>
                      <h4 className="text-white text-xs font-bold">{blog.author}</h4>
                      <p className="text-[10px] text-slate-500 font-mono">
                        {new Date(blog.publishDate).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric"
                        })}
                      </p>
                    </div>

                    <span className="w-8 h-8 rounded-xl bg-slate-950 border border-white/5 flex items-center justify-center text-slate-400 group-hover:text-cyan-400 group-hover:border-cyan-500/20 transition-all duration-300">
                      <ChevronRight className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </div>

                </motion.article>
              ))}
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
