import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  User, 
  Share2, 
  Linkedin, 
  Twitter, 
  Copy, 
  Check, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles,
  BookOpen
} from "lucide-react";
import { blogService, categoryService } from "../../services/blog.service";
import { BlogPost, Category } from "../../types/blog";

interface BlogDetailsProps {
  slug: string;
  onBackToList: () => void;
  onNavigateToBlogSlug: (slug: string) => void;
}

export default function BlogDetails({ slug, onBackToList, onNavigateToBlogSlug }: BlogDetailsProps) {
  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [category, setCategory] = useState<Category | null>(null);
  const [relatedBlogs, setRelatedBlogs] = useState<BlogPost[]>([]);
  const [allBlogs, setAllBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  // Sharing states
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    async function fetchBlogDetails() {
      try {
        setLoading(true);
        // Get target blog
        const targetBlog = await blogService.getBlogBySlug(slug);
        if (targetBlog) {
          setBlog(targetBlog);
          
          // Increment view count
          blogService.incrementViews(targetBlog.id);

          // Get categories & related blogs list
          const [cats, blogsList] = await Promise.all([
            categoryService.getAllCategories(),
            blogService.getAllBlogs(true)
          ]);

          setAllBlogs(blogsList);

          // Find specific category
          const blogCat = cats.find(c => c.id === targetBlog.categoryId);
          if (blogCat) setCategory(blogCat);

          // Find related articles (same category, excluding current)
          const related = blogsList
            .filter(b => b.categoryId === targetBlog.categoryId && b.id !== targetBlog.id)
            .slice(0, 3);
          setRelatedBlogs(related);
        }
      } catch (error) {
        console.error("Error loading blog details:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchBlogDetails();
  }, [slug]);

  // Copy link to clipboard helper
  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Previous & Next navigation inside active pool
  const getPrevNextArticles = () => {
    if (!blog || allBlogs.length <= 1) return { prev: null, next: null };
    const currentIndex = allBlogs.findIndex(b => b.id === blog.id);
    if (currentIndex === -1) return { prev: null, next: null };

    const next = currentIndex > 0 ? allBlogs[currentIndex - 1] : null;
    const prev = currentIndex < allBlogs.length - 1 ? allBlogs[currentIndex + 1] : null;

    return { prev, next };
  };

  const calculateReadTime = (content: string) => {
    const words = content.replace(/<[^>]*>/g, "").split(/\s+/).length;
    const minutes = Math.ceil(words / 220);
    return `${minutes} min read`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0B0F19] text-white flex items-center justify-center py-20">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 rounded-full border-4 border-cyan-500/30 border-t-cyan-400 animate-spin mx-auto"></div>
          <p className="text-slate-400 font-mono text-sm">Loading article details...</p>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-[#0B0F19] text-white py-24 sm:py-32">
        <div className="max-w-xl mx-auto px-6 text-center space-y-6">
          <h2 className="text-3xl font-bold">Article Not Found</h2>
          <p className="text-slate-400 font-light leading-relaxed">
            The requested publication could not be found. It may have been unpublished or deleted by our team.
          </p>
          <button
            onClick={onBackToList}
            className="px-6 py-3 bg-cyan-500 text-slate-950 font-bold rounded-xl cursor-pointer hover:bg-cyan-400 transition-colors"
          >
            Back to Insights
          </button>
        </div>
      </div>
    );
  }

  const { prev, next } = getPrevNextArticles();

  return (
    <div className="min-h-screen bg-[#0B0F19] text-white pb-24">
      {/* Decorative Blur elements */}
      <div className="absolute top-0 right-1/4 w-[40%] h-[35%] bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="absolute top-1/2 left-1/4 w-[40%] h-[40%] bg-blue-600/5 rounded-full blur-[140px] pointer-events-none z-0" />

      {/* Top Breadcrumb Navigation */}
      <div className="max-w-4xl mx-auto px-6 pt-12 md:pt-16 relative z-10">
        <button
          onClick={onBackToList}
          className="inline-flex items-center gap-2.5 text-xs sm:text-sm font-mono text-slate-400 hover:text-cyan-400 transition-all group cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
          <span>Back to insights listing</span>
        </button>
      </div>

      {/* Main Core Blog Container */}
      <article className="max-w-4xl mx-auto px-6 pt-8 relative z-10 space-y-10">
        
        {/* Blog Header Metadata */}
        <div className="space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            {category && (
              <span className="px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                {category.name}
              </span>
            )}
            <span className="text-slate-500">•</span>
            <span className="inline-flex items-center gap-1.5 text-slate-400 text-xs font-mono">
              <Clock className="w-4 h-4 text-slate-500" />
              {calculateReadTime(blog.content)}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight font-sans">
            {blog.title}
          </h1>

          {/* Author Details card & date */}
          <div className="flex items-center justify-between gap-4 flex-wrap pb-6 border-b border-white/5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/15 border border-cyan-500/20 flex items-center justify-center text-cyan-300 font-extrabold uppercase text-sm font-mono shadow">
                {blog.author.charAt(0)}
              </div>
              <div>
                <h4 className="text-white text-sm font-bold">{blog.author}</h4>
                <p className="text-[10px] text-slate-400 font-mono">SAP Certified Training Author</p>
              </div>
            </div>

            <div className="flex items-center gap-4 text-slate-400 text-xs font-mono">
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-slate-500" />
                {new Date(blog.publishDate).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric"
                })}
              </span>
              
              {blog.views !== undefined && (
                <span className="text-slate-500">• {blog.views} read views</span>
              )}
            </div>
          </div>
        </div>

        {/* Full Width Hero Image */}
        <div className="aspect-[21/9] w-full rounded-3xl overflow-hidden border border-white/5 relative shadow-2xl">
          <img
            src={blog.featuredImage || "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1200&auto=format&fit=crop"}
            alt={blog.title}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Main Content Body */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-4">
          
          {/* Share Actions Side Utility Rail */}
          <div className="md:col-span-1 md:sticky md:top-24 h-fit flex md:flex-col justify-start gap-4 flex-row py-2">
            <button
              onClick={handleCopyLink}
              title="Copy link to clipboard"
              className="p-3.5 rounded-2xl bg-slate-900/60 border border-white/5 hover:border-cyan-500/25 text-slate-400 hover:text-cyan-400 transition-all cursor-pointer relative group"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span className="absolute left-1/2 -translate-x-1/2 -top-10 scale-0 group-hover:scale-100 bg-slate-950 border border-white/10 px-2 py-1 text-[10px] rounded font-mono text-white whitespace-nowrap transition-all duration-300">
                {copied ? "Copied!" : "Copy Link"}
              </span>
            </button>

            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(blog.title)}&url=${encodeURIComponent(window.location.href)}`}
              target="_blank"
              rel="noopener noreferrer"
              title="Share on X (Twitter)"
              className="p-3.5 rounded-2xl bg-slate-900/60 border border-white/5 hover:border-cyan-500/25 text-slate-400 hover:text-cyan-400 transition-all cursor-pointer"
            >
              <Twitter className="w-4 h-4" />
            </a>

            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`}
              target="_blank"
              rel="noopener noreferrer"
              title="Share on LinkedIn"
              className="p-3.5 rounded-2xl bg-slate-900/60 border border-white/5 hover:border-cyan-500/25 text-slate-400 hover:text-cyan-400 transition-all cursor-pointer"
            >
              <Linkedin className="w-4 h-4" />
            </a>
          </div>

          {/* Main publication text rendering with Tailwind-Typography like beautiful styling */}
          <div className="md:col-span-11 space-y-6">
            <div 
              className="prose prose-invert prose-cyan max-w-none text-slate-300 font-light text-base sm:text-lg leading-relaxed 
              [&>h2]:text-2xl [&>h2]:font-extrabold [&>h2]:text-white [&>h2]:pt-6 [&>h2]:pb-2 [&>h2]:font-sans [&>h2]:tracking-tight
              [&>h3]:text-xl [&>h3]:font-bold [&>h3]:text-cyan-300 [&>h3]:pt-4 [&>h3]:pb-1
              [&>p]:mb-5 [&>p]:leading-relaxed
              [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:mb-5 [&>ul>li]:mb-1.5
              [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:mb-5 [&>ol>li]:mb-1.5
              [&>blockquote]:border-l-4 [&>blockquote]:border-cyan-500 [&>blockquote]:pl-4 [&>blockquote]:italic [&>blockquote]:text-slate-400 [&>blockquote]:my-6 [&>blockquote]:bg-slate-900/40 [&>blockquote]:p-4 [&>blockquote]:rounded-r-2xl
              [&>pre]:bg-slate-950 [&>pre]:border [&>pre]:border-white/5 [&>pre]:p-5 [&>pre]:rounded-2xl [&>pre]:overflow-x-auto [&>pre]:my-6 [&>pre]:font-mono [&>pre]:text-xs [&>pre]:text-cyan-400
              [&>table]:w-full [&>table]:border-collapse [&>table]:my-6
              [&>table_th]:border-b [&>table_th]:border-white/10 [&>table_th]:p-3 [&>table_th]:text-left [&>table_th]:font-semibold [&>table_th]:text-white
              [&>table_td]:border-b [&>table_td]:border-white/5 [&>table_td]:p-3 [&>table_td]:text-slate-300
              "
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />

            {/* Keyword tags */}
            {blog.keywords && blog.keywords.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 pt-8">
                <span className="text-slate-500 text-xs font-mono font-bold uppercase tracking-wider">Keywords:</span>
                {blog.keywords.map((word, idx) => (
                  <span key={idx} className="bg-slate-900 border border-white/5 px-2.5 py-1 rounded-lg text-xs text-slate-400">
                    {word}
                  </span>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* Previous vs Next Articles navigation handle */}
        {(prev || next) && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-12 border-t border-white/5">
            {prev ? (
              <button
                onClick={() => onNavigateToBlogSlug(prev.slug)}
                className="group p-5 rounded-2xl bg-slate-900/35 border border-white/5 hover:border-cyan-500/20 text-left transition-all cursor-pointer space-y-2 flex flex-col justify-between"
              >
                <div className="flex items-center gap-2 text-slate-500 text-xs font-mono">
                  <ChevronLeft className="w-4 h-4 transform group-hover:-translate-x-0.5 transition-transform" />
                  <span>Previous Article</span>
                </div>
                <h4 className="text-white text-sm font-bold group-hover:text-cyan-400 transition-colors line-clamp-1">{prev.title}</h4>
              </button>
            ) : <div />}

            {next ? (
              <button
                onClick={() => onNavigateToBlogSlug(next.slug)}
                className="group p-5 rounded-2xl bg-slate-900/35 border border-white/5 hover:border-cyan-500/20 text-right transition-all cursor-pointer space-y-2 flex flex-col justify-between items-end"
              >
                <div className="flex items-center gap-2 text-slate-500 text-xs font-mono">
                  <span>Next Article</span>
                  <ChevronRight className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform" />
                </div>
                <h4 className="text-white text-sm font-bold group-hover:text-cyan-400 transition-colors line-clamp-1">{next.title}</h4>
              </button>
            ) : <div />}
          </div>
        )}

        {/* Related Articles Showcase list */}
        {relatedBlogs.length > 0 && (
          <div className="pt-16 space-y-6">
            <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white font-sans flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-cyan-400" />
              Related Publications
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {relatedBlogs.map((rel) => (
                <div
                  key={rel.id}
                  onClick={() => onNavigateToBlogSlug(rel.slug)}
                  className="group p-4 rounded-2xl bg-slate-900/20 border border-white/5 hover:border-cyan-500/15 cursor-pointer transition-all space-y-3.5"
                >
                  <div className="h-[120px] rounded-xl overflow-hidden relative">
                    <img
                      src={rel.featuredImage || "https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=400&auto=format&fit=crop"}
                      alt={rel.title}
                      className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <h4 className="text-white text-sm font-bold leading-snug line-clamp-2 group-hover:text-cyan-400 transition-colors">
                      {rel.title}
                    </h4>
                    <p className="text-[10px] text-slate-400 font-mono">
                      {new Date(rel.publishDate).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric"
                      })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </article>
    </div>
  );
}
