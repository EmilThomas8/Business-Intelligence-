import logo from "../../assets/images/logo1.webp";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  LayoutDashboard, 
  BookOpen, 
  FolderHeart, 
  Plus, 
  Trash2, 
  Edit2, 
  LogOut, 
  Globe, 
  Eye, 
  FileText, 
  CheckCircle, 
  Undo2, 
  Image as ImageIcon,
  Heading1,
  Heading2,
  Code2,
  Quote,
  List,
  ListOrdered,
  Share2,
  Bold,
  Italic,
  Underline,
  Youtube,
  Settings,
  X,
  RefreshCw,
  Search,
  Upload,
  Bell,
  ChevronLeft,
  ChevronRight,
  Copy,
  ExternalLink,
  PlusCircle,
  Repeat,
  Sparkles,
  User,
  Clock,
  Calendar,
  Layers,
  Heart,
  Save,
  Tag,
  BookCheck,
  Check,
  GraduationCap,
  Menu,
  MessageSquare
} from "lucide-react";
import CourseManagement from "./CourseManagement";
import ReviewManagement from "./ReviewManagement";
import { blogService, categoryService } from "../../services/blog.service";
import { storageService } from "../../services/storage.service";
import { authService } from "../../services/auth.service";
import { auth, db } from "../../lib/firebase";
import { getDoc, doc } from "firebase/firestore";
import { BlogPost, Category } from "../../types/blog";

interface AdminDashboardProps {
  onLogout: () => void;
  onBackToWebsite: () => void;
}

type AdminTab = "dashboard" | "blogs" | "editor" | "categories" | "media" | "settings" | "courses" | "reviews";

interface MediaImage {
  url: string;
  name: string;
  folder: string;
  id: string;
}

export default function AdminDashboard({ onLogout, onBackToWebsite }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<AdminTab>("dashboard");
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [mediaImages, setMediaImages] = useState<MediaImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMedia, setLoadingMedia] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Admin Profile details from custom collection
  const [adminProfile, setAdminProfile] = useState<{ name: string; email: string; role: string } | null>(null);

  // Search & Filtering States
  const [globalSearch, setGlobalSearch] = useState("");
  const [tableSearch, setTableSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState<"newest" | "oldest" | "alphabetical">("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 8;

  // Media search
  const [mediaSearch, setMediaSearch] = useState("");
  const [mediaFolderFilter, setMediaFolderFilter] = useState("all");
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
  const [previewMediaUrl, setPreviewMediaUrl] = useState<string | null>(null);

  // Notifications placeholder
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, text: "System is running on Cloud Firestore.", type: "system", time: "Just now" },
    { id: 2, text: "Initial SAP datasets successfully compiled.", type: "data", time: "10 mins ago" },
  ]);

  // Editor states
  const [editingBlogId, setEditingBlogId] = useState<string | null>(null);
  const [editorTitle, setEditorTitle] = useState("");
  const [editorSlug, setEditorSlug] = useState("");
  const [editorExcerpt, setEditorExcerpt] = useState("");
  const [editorContent, setEditorContent] = useState("");
  const [editorCategory, setEditorCategory] = useState("");
  const [editorTags, setEditorTags] = useState("");
  const [editorFeaturedImage, setEditorFeaturedImage] = useState("");
  const [editorFeatured, setEditorFeatured] = useState(false);
  const [editorStatus, setEditorStatus] = useState<"published" | "draft">("draft");
  const [editorSeoTitle, setEditorSeoTitle] = useState("");
  const [editorSeoDescription, setEditorSeoDescription] = useState("");
  const [editorKeywords, setEditorKeywords] = useState("");
  const [editorAuthor, setEditorAuthor] = useState("Rajesh Kumar");
  const [editorReadingTime, setEditorReadingTime] = useState(1);

  // Restore draft state availability
  const [hasAutosave, setHasAutosave] = useState(false);

  // Media upload state inside Editor
  const [uploadingImage, setUploadingImage] = useState(false);
  const [imageError, setImageError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Category creator states
  const [catName, setCatName] = useState("");
  const [catSlug, setCatSlug] = useState("");
  const [catColor, setCatColor] = useState("cyan");
  const [catDescription, setCatDescription] = useState("");
  const [editingCatId, setEditingCatId] = useState<string | null>(null);

  // Live preview mode inside editor
  const [editorPreviewMode, setEditorPreviewMode] = useState<"write" | "preview">("write");

  // Profile dropdown menu toggle
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  // Load everything
  const loadDatabase = async () => {
    try {
      setLoading(true);
      // Automatically seed initial categories and blogs if needed (safe because user is authenticated)
      await categoryService.seedInitialDataIfNeeded();
      
      const [fetchedBlogs, fetchedCategories] = await Promise.all([
        blogService.getAllBlogs(false), // get ALL blogs including drafts
        categoryService.getAllCategories()
      ]);
      setBlogs(fetchedBlogs);
      setCategories(fetchedCategories);

      // Pre-select first category in editor if none set
      if (fetchedCategories.length > 0 && !editorCategory) {
        setEditorCategory(fetchedCategories[0].id);
      }

      // Load storage images asynchronously
      loadMedia();
    } catch (e) {
      console.error("Error loading database inside dashboard:", e);
    } finally {
      setLoading(false);
    }
  };

  const loadMedia = async () => {
    try {
      setLoadingMedia(true);
      const images = await storageService.listAllImages();
      setMediaImages(images);
    } catch (err) {
      console.error("Failed to load storage images:", err);
    } finally {
      setLoadingMedia(false);
    }
  };

  useEffect(() => {
    loadDatabase();

    // Check if there is an autosaved draft in local storage
    const saved = localStorage.getItem("sap_blog_autosave_draft");
    if (saved) {
      setHasAutosave(true);
    }

    // Fetch Admin Profile Document from Firestore
    const fetchProfile = async () => {
      const user = auth.currentUser;
      if (user) {
        try {
          const docSnap = await getDoc(doc(db, "admins", user.uid));
          if (docSnap.exists()) {
            const data = docSnap.data();
            setAdminProfile({
              uid: user.uid,
              name: data.name || "Head of SAP Training",
              email: data.email || user.email || "admin@sapinstitute.com",
              role: data.role || "Administrator"
            });
          } else {
            setAdminProfile({
              uid: user.uid,
              name: "Head of SAP Training",
              email: user.email || "admin@sapinstitute.com",
              role: "Administrator"
            });
          }
        } catch (e) {
          console.error("Failed fetching admin doc:", e);
          setAdminProfile({
            uid: user.uid,
            name: "Head of SAP Training",
            email: user.email || "admin@sapinstitute.com",
            role: "Administrator"
          });
        }
      }
    };
    fetchProfile();
  }, []);

  // Sync title with slug automatically
  useEffect(() => {
    if (!editingBlogId) {
      const generatedSlug = editorTitle
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .trim()
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");
      setEditorSlug(generatedSlug);
    }
  }, [editorTitle, editingBlogId]);

  // Calculate Reading Time Automatically on Editor Content changes
  useEffect(() => {
    const textOnly = editorContent.replace(/<[^>]*>/g, "");
    const wordCount = textOnly.trim().split(/\s+/).filter(w => w.length > 0).length;
    const time = Math.max(1, Math.ceil(wordCount / 200));
    setEditorReadingTime(time);
  }, [editorContent]);

  // Auto-save draft log inside editor to localStorage
  useEffect(() => {
    if (activeTab !== "editor") return;
    const interval = setInterval(() => {
      if (!editorTitle && !editorContent) return; // avoid saving empty drafts
      const draftData = {
        title: editorTitle,
        slug: editorSlug,
        excerpt: editorExcerpt,
        content: editorContent,
        category: editorCategory,
        tags: editorTags,
        featuredImage: editorFeaturedImage,
        featured: editorFeatured,
        status: editorStatus,
        seoTitle: editorSeoTitle,
        seoDescription: editorSeoDescription,
        keywords: editorKeywords,
        author: editorAuthor,
        readingTime: editorReadingTime,
        timestamp: Date.now()
      };
      localStorage.setItem("sap_blog_autosave_draft", JSON.stringify(draftData));
      setHasAutosave(true);
    }, 6000);

    return () => clearInterval(interval);
  }, [
    activeTab, editorTitle, editorSlug, editorExcerpt, editorContent, 
    editorCategory, editorTags, editorFeaturedImage, editorFeatured, 
    editorStatus, editorSeoTitle, editorSeoDescription, editorKeywords, 
    editorAuthor, editorReadingTime
  ]);

  // Restore autosaved draft
  const handleRestoreDraft = () => {
    const saved = localStorage.getItem("sap_blog_autosave_draft");
    if (!saved) return;
    try {
      const data = JSON.parse(saved);
      setEditorTitle(data.title || "");
      setEditorSlug(data.slug || "");
      setEditorExcerpt(data.excerpt || "");
      setEditorContent(data.content || "");
      setEditorCategory(data.category || "");
      setEditorTags(data.tags || "");
      setEditorFeaturedImage(data.featuredImage || "");
      setEditorFeatured(data.featured || false);
      setEditorStatus(data.status || "draft");
      setEditorSeoTitle(data.seoTitle || "");
      setEditorSeoDescription(data.seoDescription || "");
      setEditorKeywords(data.keywords || "");
      setEditorAuthor(data.author || "Rajesh Kumar");
      setEditorReadingTime(data.readingTime || 1);
      alert("Autosaved draft restored successfully!");
    } catch (e) {
      console.error("Failed to restore draft:", e);
    }
  };

  // Clear autosaved draft
  const handleDiscardAutosave = () => {
    localStorage.removeItem("sap_blog_autosave_draft");
    setHasAutosave(false);
  };

  // Edit blog trigger
  const handleEditBlogClick = (blog: BlogPost) => {
    setEditingBlogId(blog.id);
    setEditorTitle(blog.title);
    setEditorSlug(blog.slug);
    setEditorExcerpt(blog.excerpt);
    setEditorContent(blog.content);
    setEditorCategory(blog.categoryId);
    setEditorTags(blog.tags.join(", "));
    setEditorFeaturedImage(blog.featuredImage);
    setEditorFeatured(blog.featured || false);
    setEditorStatus(blog.status);
    setEditorSeoTitle(blog.seoTitle || "");
    setEditorSeoDescription(blog.seoDescription || "");
    setEditorKeywords((blog.keywords || []).join(", "));
    setEditorAuthor(blog.author || "Rajesh Kumar");
    setEditorReadingTime(blog.readingTime || 1);
    
    setEditorPreviewMode("write");
    setActiveTab("editor");
  };

  // Create new blog trigger
  const handleCreateNewBlogClick = () => {
    setEditingBlogId(null);
    setEditorTitle("");
    setEditorSlug("");
    setEditorExcerpt("");
    setEditorContent("");
    if (categories.length > 0) {
      setEditorCategory(categories[0].id);
    } else {
      setEditorCategory("");
    }
    setEditorTags("");
    setEditorFeaturedImage("");
    setEditorFeatured(false);
    setEditorStatus("draft");
    setEditorSeoTitle("");
    setEditorSeoDescription("");
    setEditorKeywords("");
    setEditorAuthor(adminProfile?.name || "Rajesh Kumar");
    setEditorReadingTime(1);
    
    setEditorPreviewMode("write");
    setActiveTab("editor");
  };

  // Delete blog trigger with confirmation dialog
  const handleDeleteBlog = async (id: string, imageUrl?: string) => {
    const isConfirmed = window.confirm("Security Protocol: Are you sure you want to permanently delete this publication? This action is irreversible.");
    if (!isConfirmed) return;
    try {
      setLoading(true);
      await blogService.deleteBlog(id);
      if (imageUrl) {
        await storageService.deleteImageByUrl(imageUrl);
      }
      await loadDatabase();
    } catch (e) {
      console.error("Failed to delete blog:", e);
    } finally {
      setLoading(false);
    }
  };

  // Publish / Unpublish directly from table
  const handleTogglePublishStatus = async (blog: BlogPost) => {
    try {
      setLoading(true);
      const nextStatus = blog.status === "published" ? "draft" : "published";
      await blogService.updateBlog(blog.id, { 
        status: nextStatus,
        publishDate: new Date().toISOString()
      });
      await loadDatabase();
    } catch (e) {
      console.error("Failed to toggle publish status:", e);
    } finally {
      setLoading(false);
    }
  };

  // Feature / Unfeature directly from table
  const handleToggleFeatured = async (blog: BlogPost) => {
    try {
      setLoading(true);
      await blogService.updateBlog(blog.id, { featured: !blog.featured });
      await loadDatabase();
    } catch (e) {
      console.error("Failed to toggle featured state:", e);
    } finally {
      setLoading(false);
    }
  };

  // Duplicate Blog Post
  const handleDuplicateBlog = async (blog: BlogPost) => {
    try {
      setLoading(true);
      const duplicatedData: Omit<BlogPost, "id"> = {
        title: `${blog.title} (Copy)`,
        slug: `${blog.slug}-copy-${Date.now()}`,
        excerpt: blog.excerpt,
        content: blog.content,
        featuredImage: blog.featuredImage,
        categoryId: blog.categoryId,
        tags: [...blog.tags],
        author: adminProfile?.name || blog.author || "Rajesh Kumar",
        status: "draft", // Always duplicate as draft first for safety
        featured: false,
        publishDate: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        seoTitle: blog.seoTitle ? `${blog.seoTitle} (Copy)` : "",
        seoDescription: blog.seoDescription || "",
        keywords: [...(blog.keywords || [])],
        views: 0
      };
      await blogService.createBlog(duplicatedData);
      await loadDatabase();
      alert("Publication duplicated successfully as draft.");
    } catch (e) {
      console.error("Failed to duplicate blog:", e);
      alert("Error duplicating blog.");
    } finally {
      setLoading(false);
    }
  };

  // Upload featured image helper inside editor
  const handleImageFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    if (!file.type.startsWith("image/")) {
      setImageError("Format Error: Please attach valid image files only (PNG, JPG, WEBP).");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setImageError("Size Limit: Image exceeds the 5MB platform threshold.");
      return;
    }

    try {
      setUploadingImage(true);
      setImageError(null);
      const url = await storageService.uploadImage(file, "featured-images");
      setEditorFeaturedImage(url);
    } catch (err: any) {
      console.error("Failed to upload file:", err);
      setImageError("Upload failed. Firestore storage configuration error.");
    } finally {
      setUploadingImage(false);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  // Image deletion handler
  const handleDeleteUploadedImage = async () => {
    if (!editorFeaturedImage) return;
    try {
      setUploadingImage(true);
      await storageService.deleteImageByUrl(editorFeaturedImage);
      setEditorFeaturedImage("");
    } catch (err) {
      console.error(err);
    } finally {
      setUploadingImage(false);
    }
  };

  // Insert Rich Formatting Tag Helper
  const insertFormatting = (tagStart: string, tagEnd = "") => {
    const textarea = document.getElementById("editor-textarea") as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const selectedText = text.substring(start, end);
    const replacement = tagStart + selectedText + (tagEnd || "");

    setEditorContent(text.substring(0, start) + replacement + text.substring(end));
    
    // Focus back on textarea
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + tagStart.length, start + tagStart.length + selectedText.length);
    }, 10);
  };

  // Handle Blog submission
  const handleSaveBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editorTitle || !editorContent || !editorCategory) {
      alert("Incomplete Fields: Please complete Title, Content body, and Category settings.");
      return;
    }

    // Prepare tags & keywords arrays
    const tagsArray = editorTags
      .split(",")
      .map(t => t.trim())
      .filter(t => t.length > 0);

    const keywordsArray = editorKeywords
      .split(",")
      .map(k => k.trim())
      .filter(k => k.length > 0);

    const blogPayload = {
      title: editorTitle,
      slug: editorSlug || editorTitle.toLowerCase().replace(/\s+/g, "-"),
      excerpt: editorExcerpt || editorContent.replace(/<[^>]*>/g, "").slice(0, 150),
      content: editorContent,
      featuredImage: editorFeaturedImage,
      categoryId: editorCategory,
      tags: tagsArray,
      author: editorAuthor || adminProfile?.name || "Rajesh Kumar",
      status: editorStatus,
      featured: editorFeatured,
      publishDate: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      seoTitle: editorSeoTitle || editorTitle,
      seoDescription: editorSeoDescription || editorExcerpt,
      keywords: keywordsArray,
      readingTime: editorReadingTime
    };

    try {
      setLoading(true);
      if (editingBlogId) {
        // Update
        await blogService.updateBlog(editingBlogId, {
          ...blogPayload,
          updatedAt: new Date().toISOString()
        });
      } else {
        // Create
        await blogService.createBlog(blogPayload);
      }
      
      // Reset & load
      localStorage.removeItem("sap_blog_autosave_draft");
      setHasAutosave(false);
      setActiveTab("blogs");
      await loadDatabase();
    } catch (err) {
      console.error("Failed saving blog:", err);
      alert("Error saving blog record.");
    } finally {
      setLoading(false);
    }
  };

  // Category CRUD
  const handleSaveCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!catName || !catSlug) return;

    try {
      setLoading(true);
      const catData = {
        name: catName,
        slug: catSlug,
        color: catColor,
        description: catDescription
      };

      if (editingCatId) {
        await categoryService.updateCategory(editingCatId, catData);
      } else {
        await categoryService.createCategory(catData);
      }

      setCatName("");
      setCatSlug("");
      setCatColor("cyan");
      setCatDescription("");
      setEditingCatId(null);
      await loadDatabase();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEditCategory = (cat: Category) => {
    setEditingCatId(cat.id);
    setCatName(cat.name);
    setCatSlug(cat.slug);
    setCatColor(cat.color);
    setCatDescription(cat.description || "");
  };

  const handleDeleteCategory = async (id: string) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this category? Associated blogs will remain but lose their category directory listing.");
    if (!isConfirmed) return;
    try {
      setLoading(true);
      await categoryService.deleteCategory(id);
      await loadDatabase();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Auto slug generation for categories
  const handleCategoryNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setCatName(val);
    if (!editingCatId) {
      setCatSlug(val.toLowerCase().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-"));
    }
  };

  // Media Library Upload Helper
  const handleMediaUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    try {
      setLoadingMedia(true);
      const url = await storageService.uploadImage(files[0], "blog-images");
      await loadMedia();
      alert("Image uploaded to Storage media folder successfully.");
    } catch (err) {
      console.error("Failed to upload media:", err);
      alert("Media upload failed.");
    } finally {
      setLoadingMedia(false);
    }
  };

  // Media deletion
  const handleDeleteMedia = async (imageUrl: string) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this image asset from Storage?");
    if (!isConfirmed) return;
    try {
      setLoadingMedia(true);
      await storageService.deleteImageByUrl(imageUrl);
      await loadMedia();
    } catch (err) {
      console.error("Failed to delete media:", err);
    } finally {
      setLoadingMedia(false);
    }
  };

  // Copy URL with visual feedback
  const handleCopyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  // Filter lists in dashboard view
  const filteredBlogsTable = blogs.filter(b => 
    b.title.toLowerCase().includes(tableSearch.toLowerCase()) ||
    b.author.toLowerCase().includes(tableSearch.toLowerCase())
  );

  // Filters for Blog Manager Tab
  const filteredAndSortedBlogs = blogs.filter(b => {
    const matchesSearch = b.title.toLowerCase().includes(globalSearch.toLowerCase()) || 
                          (b.excerpt || "").toLowerCase().includes(globalSearch.toLowerCase()) ||
                          b.author.toLowerCase().includes(globalSearch.toLowerCase());
    const matchesCategory = categoryFilter === "all" || b.categoryId === categoryFilter;
    const matchesStatus = statusFilter === "all" || b.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  }).sort((a, b) => {
    if (sortBy === "newest") {
      return new Date(b.publishDate || b.createdAt).getTime() - new Date(a.publishDate || a.createdAt).getTime();
    } else if (sortBy === "oldest") {
      return new Date(a.publishDate || a.createdAt).getTime() - new Date(b.publishDate || b.createdAt).getTime();
    } else if (sortBy === "alphabetical") {
      return a.title.localeCompare(b.title);
    }
    return 0;
  });

  // Paginated blogs
  const totalPages = Math.ceil(filteredAndSortedBlogs.length / ITEMS_PER_PAGE) || 1;
  const paginatedBlogs = filteredAndSortedBlogs.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Media folder filter
  const filteredMedia = mediaImages.filter(img => {
    const matchesSearch = img.name.toLowerCase().includes(mediaSearch.toLowerCase());
    const matchesFolder = mediaFolderFilter === "all" || img.folder === mediaFolderFilter;
    return matchesSearch && matchesFolder;
  });

  // Statistics calculation helpers
  const totalBlogs = blogs.length;
  const publishedBlogsCount = blogs.filter(b => b.status === "published").length;
  const draftBlogsCount = blogs.filter(b => b.status === "draft").length;
  const featuredBlogsCount = blogs.filter(b => b.featured).length;
  const totalViewsCount = blogs.reduce((sum, b) => sum + (b.views || 0), 0);
  const totalCategoriesCount = categories.length;
  const totalImagesCount = mediaImages.length;

  return (
    <div className="min-h-screen bg-[#070A13] text-white flex flex-col md:flex-row antialiased relative">
      
      {/* SIDEBAR NAVIGATION PANEL */}
      <aside className="w-full md:w-64 bg-[#0A0D18] border-r border-white/5 flex flex-col justify-between p-6 shrink-0 z-30">
        
        <div className="space-y-8">
          
          {/* Logo Brand area */}
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <img src={logo} alt="BIL Admin" className="w-10 h-10 rounded-xl object-contain border border-cyan-500/25" />
              <div>
                <h2 className="text-sm font-extrabold text-white leading-tight tracking-tight">BIL Admin</h2>
                <p className="text-[10px] text-slate-500 font-mono tracking-widest uppercase">SAP Control Tower</p>
              </div>
            </div>
            
            <button 
              className="md:hidden p-2 text-slate-400 hover:text-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>

          {/* Menu tab selection list */}
          <nav className={`${isMobileMenuOpen ? 'block' : 'hidden'} md:block space-y-1.5`}>
            
            <button
              onClick={() => { setActiveTab("dashboard"); setEditingBlogId(null); }}
              className={`w-full inline-flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === "dashboard"
                  ? "bg-cyan-500 text-slate-950 font-black shadow-lg shadow-cyan-500/10"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Overview</span>
            </button>

            <button
              onClick={() => { setActiveTab("blogs"); setEditingBlogId(null); }}
              className={`w-full inline-flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === "blogs"
                  ? "bg-cyan-500 text-slate-950 font-black shadow-lg shadow-cyan-500/10"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Blogs</span>
            </button>

            <button
              onClick={() => { setActiveTab("categories"); setEditingBlogId(null); }}
              className={`w-full inline-flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === "categories"
                  ? "bg-cyan-500 text-slate-950 font-black shadow-lg shadow-cyan-500/10"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <FolderHeart className="w-4 h-4" />
              <span>Categories</span>
            </button>

            <button
              onClick={() => { setActiveTab("courses"); setEditingBlogId(null); }}
              className={`w-full inline-flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === "courses"
                  ? "bg-cyan-500 text-slate-950 font-black shadow-lg shadow-cyan-500/10"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              <span>Courses</span>
            </button>

            <button
              onClick={() => { setActiveTab("reviews"); setEditingBlogId(null); }}
              className={`w-full inline-flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === "reviews"
                  ? "bg-cyan-500 text-slate-950 font-black shadow-lg shadow-cyan-500/10"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              <span>Reviews</span>
            </button>

            <button
              onClick={() => { setActiveTab("media"); setEditingBlogId(null); }}
              className={`w-full inline-flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === "media"
                  ? "bg-cyan-500 text-slate-950 font-black shadow-lg shadow-cyan-500/10"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <ImageIcon className="w-4 h-4" />
              <span>Media Library</span>
            </button>

            <button
              onClick={() => { setActiveTab("settings"); setEditingBlogId(null); }}
              className={`w-full inline-flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === "settings"
                  ? "bg-cyan-500 text-slate-950 font-black shadow-lg shadow-cyan-500/10"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <Settings className="w-4 h-4" />
              <span>Settings</span>
            </button>

          </nav>

        </div>

        {/* Bottom utility controls */}
        <div className="space-y-4 pt-6 border-t border-white/5">
          <button
            onClick={onBackToWebsite}
            className="w-full inline-flex items-center gap-2.5 text-xs text-slate-400 hover:text-cyan-400 transition-colors py-2 px-1 font-mono cursor-pointer"
          >
            <Globe className="w-4 h-4" />
            <span>Return to Site</span>
          </button>

          <button
            onClick={onLogout}
            className="w-full inline-flex items-center gap-2.5 text-xs text-rose-400 hover:text-rose-300 transition-colors py-2 px-1 font-mono cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>

      </aside>

      {/* CORE DISPLAY WINDOW */}
      <div className="flex-grow flex flex-col min-w-0">
        
        {/* TOP NAVIGATION BAR */}
        <header className="h-16 border-b border-white/5 bg-[#0A0D18]/80 backdrop-blur-md px-6 sm:px-8 flex items-center justify-between z-20 sticky top-0">
          
          {/* Quick Search */}
          <div className="relative max-w-md w-full hidden sm:block">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search across collections..."
              value={globalSearch}
              onChange={(e) => {
                setGlobalSearch(e.target.value);
                if (activeTab !== "blogs" && activeTab !== "media") {
                  setActiveTab("blogs");
                }
              }}
              className="w-full bg-slate-950/50 border border-white/10 rounded-full pl-10 pr-4 py-2 text-xs text-slate-200 placeholder-slate-500 focus:border-cyan-500/40 outline-none transition-all"
            />
          </div>
          <div className="sm:hidden text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">
            BIL SAP CMS
          </div>

          {/* Controls: Notifications, Admin Info dropdown */}
          <div className="flex items-center gap-4 relative">
            
            {/* Notification alert */}
            <div className="relative">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 rounded-xl bg-slate-900 border border-white/5 text-slate-400 hover:text-white transition-colors cursor-pointer relative"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              </button>

              {/* Notification dropdown */}
              <AnimatePresence>
                {showNotifications && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-2 w-72 rounded-2xl bg-[#0E1220] border border-white/10 shadow-2xl p-4 z-50 space-y-3"
                  >
                    <div className="flex justify-between items-center pb-2 border-b border-white/5">
                      <span className="text-xs font-bold uppercase tracking-wider font-mono">System Alerts</span>
                      <button onClick={() => setNotifications([])} className="text-[10px] text-slate-500 hover:text-slate-300">Clear</button>
                    </div>
                    {notifications.length === 0 ? (
                      <p className="text-[11px] text-slate-500 italic text-center py-4">No new notifications.</p>
                    ) : (
                      <div className="space-y-2.5 max-h-[200px] overflow-y-auto">
                        {notifications.map(n => (
                          <div key={n.id} className="text-[11px] leading-relaxed border-b border-white/[0.02] pb-2">
                            <p className="text-slate-300">{n.text}</p>
                            <span className="text-[9px] text-slate-500 font-mono">{n.time}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Admin profile detail block */}
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center gap-2.5 p-1.5 pr-3 rounded-xl bg-slate-900/40 border border-white/5 hover:border-white/10 transition-colors cursor-pointer"
              >
                <div className="w-7 h-7 rounded-lg bg-cyan-500/10 border border-cyan-500/25 flex items-center justify-center text-cyan-400 font-bold text-xs uppercase font-mono">
                  {adminProfile?.name ? adminProfile.name[0] : "A"}
                </div>
                <div className="text-left hidden md:block">
                  <h4 className="text-[11px] font-extrabold text-white truncate max-w-[120px]">{adminProfile?.name || "SAP Admin"}</h4>
                  <p className="text-[9px] text-slate-500 truncate max-w-[120px] font-mono">{adminProfile?.email}</p>
                </div>
              </button>

              <AnimatePresence>
                {showProfileMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-2 w-56 rounded-2xl bg-[#0E1220] border border-white/10 shadow-2xl p-3 z-50 space-y-2 font-mono text-xs"
                  >
                    <div className="p-2 border-b border-white/5">
                      <p className="text-[10px] text-slate-500">Authenticated as</p>
                      <p className="font-bold text-white truncate">{adminProfile?.name}</p>
                      <p className="text-[10px] text-cyan-400 mt-0.5">{adminProfile?.role}</p>
                    </div>
                    <button
                      onClick={() => { setActiveTab("settings"); setShowProfileMenu(false); }}
                      className="w-full text-left p-2 hover:bg-white/5 rounded-lg transition-colors text-slate-300 hover:text-white"
                    >
                      Configure Profile
                    </button>
                    <button
                      onClick={onLogout}
                      className="w-full text-left p-2 hover:bg-rose-500/10 rounded-lg transition-colors text-rose-400 font-bold"
                    >
                      Terminate Session
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>

        </header>

        {/* MAIN BODY LAYOUT VIEWPORTS */}
        <main className="flex-grow p-6 sm:p-8 lg:p-10 overflow-y-auto w-full relative z-10 max-w-7xl mx-auto">
          
          {loading && activeTab !== "editor" ? (
            <div className="h-full min-h-[400px] flex items-center justify-center">
              <div className="text-center space-y-4">
                <RefreshCw className="w-10 h-10 text-cyan-400 animate-spin mx-auto" />
                <p className="text-slate-500 font-mono text-xs uppercase tracking-widest">Accessing cloud database...</p>
              </div>
            </div>
          ) : (
            <AnimatePresence mode="wait">
              
              {/* TAB 1: DASHBOARD OVERVIEW */}
              {activeTab === "dashboard" && (
                <motion.div
                  key="dashboard"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="space-y-8"
                >
                  {/* Title & Action */}
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                      <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white uppercase font-sans">
                        Overview Console
                      </h1>
                      <p className="text-xs sm:text-sm text-slate-400 font-light">
                        Real-time intelligence dashboard for the SAP training blog directory.
                      </p>
                    </div>

                    <button
                      onClick={handleCreateNewBlogClick}
                      className="inline-flex items-center gap-2 px-5 py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-extrabold text-xs uppercase tracking-widest rounded-xl transition-all cursor-pointer shadow-lg shadow-cyan-500/10"
                    >
                      <Plus className="w-4 h-4 stroke-[3]" />
                      <span>Write Article</span>
                    </button>
                  </div>

                  {/* BENTO STATS CARDS */}
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    
                    <div className="p-5 rounded-2xl bg-[#0E1220] border border-white/5 space-y-1 shadow-md hover:border-white/10 transition-colors">
                      <div className="flex justify-between items-center text-slate-400">
                        <span className="text-[10px] font-mono uppercase tracking-wider font-semibold">Total Blogs</span>
                        <FileText className="w-4 h-4 text-cyan-400" />
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-black text-white">{totalBlogs}</h3>
                      <p className="text-[9px] text-slate-500">Drafts and published</p>
                    </div>

                    <div className="p-5 rounded-2xl bg-[#0E1220] border border-white/5 space-y-1 shadow-md hover:border-white/10 transition-colors">
                      <div className="flex justify-between items-center text-slate-400">
                        <span className="text-[10px] font-mono uppercase tracking-wider font-semibold">Published</span>
                        <CheckCircle className="w-4 h-4 text-emerald-400" />
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-black text-emerald-400">{publishedBlogsCount}</h3>
                      <p className="text-[9px] text-slate-500">Active public logs</p>
                    </div>

                    <div className="p-5 rounded-2xl bg-[#0E1220] border border-white/5 space-y-1 shadow-md hover:border-white/10 transition-colors">
                      <div className="flex justify-between items-center text-slate-400">
                        <span className="text-[10px] font-mono uppercase tracking-wider font-semibold">Draft Logs</span>
                        <Layers className="w-4 h-4 text-amber-400" />
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-black text-amber-400">{draftBlogsCount}</h3>
                      <p className="text-[9px] text-slate-500">Awaiting compilation</p>
                    </div>

                    <div className="p-5 rounded-2xl bg-[#0E1220] border border-white/5 space-y-1 shadow-md hover:border-white/10 transition-colors">
                      <div className="flex justify-between items-center text-slate-400">
                        <span className="text-[10px] font-mono uppercase tracking-wider font-semibold">Featured</span>
                        <Heart className="w-4 h-4 text-rose-400" />
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-black text-rose-400">{featuredBlogsCount}</h3>
                      <p className="text-[9px] text-slate-500">Pinned at spotlight</p>
                    </div>

                    <div className="p-5 rounded-2xl bg-[#0E1220] border border-white/5 space-y-1 shadow-md hover:border-white/10 transition-colors">
                      <div className="flex justify-between items-center text-slate-400">
                        <span className="text-[10px] font-mono uppercase tracking-wider font-semibold">Categories</span>
                        <FolderHeart className="w-4 h-4 text-purple-400" />
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-black text-white">{totalCategoriesCount}</h3>
                      <p className="text-[9px] text-slate-500">Thematic structures</p>
                    </div>

                    <div className="p-5 rounded-2xl bg-[#0E1220] border border-white/5 space-y-1 shadow-md hover:border-white/10 transition-colors col-span-2 md:col-span-1">
                      <div className="flex justify-between items-center text-slate-400">
                        <span className="text-[10px] font-mono uppercase tracking-wider font-semibold">Storage Files</span>
                        <ImageIcon className="w-4 h-4 text-cyan-400" />
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-black text-white">{totalImagesCount}</h3>
                      <p className="text-[9px] text-slate-500">Media folder total</p>
                    </div>

                  </div>

                  {/* QUICK STATS EXTRA ROW */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                    
                    {/* Recent Publications list */}
                    <div className="md:col-span-8 p-6 rounded-2xl bg-[#0E1220] border border-white/5 space-y-4 shadow-xl">
                      <div className="flex justify-between items-center">
                        <h3 className="text-sm font-bold uppercase tracking-wider font-mono">Recent Operations Log</h3>
                        <button 
                          onClick={() => setActiveTab("blogs")} 
                          className="text-[11px] text-cyan-400 hover:text-cyan-300 font-mono uppercase"
                        >
                          View All
                        </button>
                      </div>

                      {blogs.length === 0 ? (
                        <p className="text-xs text-slate-500 italic text-center py-8">No blogs drafted yet. Write your first article above!</p>
                      ) : (
                        <div className="overflow-x-auto">
                          <table className="w-full text-left text-xs font-mono border-collapse">
                            <thead>
                              <tr className="border-b border-white/5 text-slate-500 uppercase pb-2">
                                <th className="py-2.5 font-bold">Title</th>
                                <th className="py-2.5 font-bold">Status</th>
                                <th className="py-2.5 font-bold">Featured</th>
                                <th className="py-2.5 font-bold text-right">Actions</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-white/[0.03]">
                              {blogs.slice(0, 5).map(blog => (
                                <tr key={blog.id} className="hover:bg-white/[0.01]">
                                  <td className="py-3 pr-4 font-semibold text-slate-300 max-w-[240px] truncate" title={blog.title}>
                                    {blog.title}
                                  </td>
                                  <td className="py-3">
                                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase ${
                                      blog.status === "published"
                                        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                                        : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                                    }`}>
                                      {blog.status}
                                    </span>
                                  </td>
                                  <td className="py-3 text-slate-400">
                                    {blog.featured ? "★ Yes" : "No"}
                                  </td>
                                  <td className="py-3 text-right space-x-1.5">
                                    <button
                                      onClick={() => handleEditBlogClick(blog)}
                                      title="Edit Post"
                                      className="p-1.5 rounded-md bg-slate-950 border border-white/5 text-slate-400 hover:text-cyan-400 cursor-pointer"
                                    >
                                      <Edit2 className="w-3 h-3" />
                                    </button>
                                    <button
                                      onClick={() => handleDuplicateBlog(blog)}
                                      title="Duplicate Post"
                                      className="p-1.5 rounded-md bg-slate-950 border border-white/5 text-slate-400 hover:text-purple-400 cursor-pointer"
                                    >
                                      <Repeat className="w-3 h-3" />
                                    </button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>

                    {/* Quick System Diagnostics card */}
                    <div className="md:col-span-4 p-6 rounded-2xl bg-[#0E1220] border border-white/5 space-y-4 shadow-xl flex flex-col justify-between">
                      <div className="space-y-3">
                        <h3 className="text-sm font-bold uppercase tracking-wider font-mono text-cyan-400">System Parameters</h3>
                        <div className="space-y-2 text-xs font-mono text-slate-400">
                          <div className="flex justify-between py-1 border-b border-white/5">
                            <span>Engine:</span>
                            <span className="text-white">React 18 / Vite</span>
                          </div>
                          <div className="flex justify-between py-1 border-b border-white/5">
                            <span>Firestore:</span>
                            <span className="text-emerald-400">Connected</span>
                          </div>
                          <div className="flex justify-between py-1 border-b border-white/5">
                            <span>Storage:</span>
                            <span className="text-emerald-400">Enabled</span>
                          </div>
                          <div className="flex justify-between py-1 border-b border-white/5">
                            <span>Admin Profile:</span>
                            <span className="text-white truncate max-w-[120px]">{adminProfile?.role}</span>
                          </div>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-white/5">
                        <button
                          onClick={() => { setActiveTab("settings"); }}
                          className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-xl text-xs font-bold transition-all text-slate-300"
                        >
                          <Settings className="w-3.5 h-3.5" />
                          <span>Console Settings</span>
                        </button>
                      </div>

                    </div>

                  </div>

                </motion.div>
              )}

              {/* TAB 2: FULL BLOGS LIST PAGE */}
              {/* TAB 2: COURSES MANAGEMENT */}
              {activeTab === "courses" && (
                <motion.div
                  key="courses"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                >
                  <CourseManagement />
                </motion.div>
              )}

              {/* TAB 3: REVIEWS MANAGEMENT */}
              {activeTab === "reviews" && (
                <motion.div
                  key="reviews"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                >
                  <ReviewManagement />
                </motion.div>
              )}

              {activeTab === "blogs" && (
                <motion.div
                  key="blogs"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="space-y-6"
                >
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/5 pb-6">
                    <div>
                      <h1 className="text-2xl font-black text-white uppercase tracking-tight">Publications Catalog</h1>
                      <p className="text-xs text-slate-400 font-light">Comprehensive CRUD database engine for search, filter, and duplicating articles.</p>
                    </div>

                    <button
                      onClick={handleCreateNewBlogClick}
                      className="inline-flex items-center gap-2 px-5 py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-extrabold text-xs uppercase tracking-widest rounded-xl cursor-pointer"
                    >
                      <Plus className="w-4 h-4 stroke-[3]" />
                      <span>Write Article</span>
                    </button>
                  </div>

                  {/* Top Toolbar: Search, Filters, Sorters */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 bg-slate-900/40 p-4 rounded-2xl border border-white/5 text-xs font-mono">
                    
                    {/* Search box */}
                    <div className="relative lg:col-span-2">
                      <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        placeholder="Search blogs..."
                        value={globalSearch}
                        onChange={(e) => { setGlobalSearch(e.target.value); setCurrentPage(1); }}
                        className="w-full bg-slate-950/60 border border-white/10 rounded-xl pl-9 pr-3 py-2.5 outline-none focus:border-cyan-500/40 text-slate-200 text-xs"
                      />
                    </div>

                    {/* Category Filter */}
                    <select
                      value={categoryFilter}
                      onChange={(e) => { setCategoryFilter(e.target.value); setCurrentPage(1); }}
                      className="bg-slate-950/60 border border-white/10 rounded-xl px-3 py-2.5 outline-none focus:border-cyan-500/40 text-slate-300 cursor-pointer"
                    >
                      <option value="all">All Categories</option>
                      {categories.map(c => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                      ))}
                    </select>

                    {/* Status Filter */}
                    <select
                      value={statusFilter}
                      onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}
                      className="bg-slate-950/60 border border-white/10 rounded-xl px-3 py-2.5 outline-none focus:border-cyan-500/40 text-slate-300 cursor-pointer"
                    >
                      <option value="all">All Statuses</option>
                      <option value="published">Published</option>
                      <option value="draft">Drafts</option>
                    </select>

                    {/* Sort By */}
                    <select
                      value={sortBy}
                      onChange={(e) => { setSortBy(e.target.value as any); setCurrentPage(1); }}
                      className="bg-slate-950/60 border border-white/10 rounded-xl px-3 py-2.5 outline-none focus:border-cyan-500/40 text-slate-300 cursor-pointer"
                    >
                      <option value="newest">Publish: Newest</option>
                      <option value="oldest">Publish: Oldest</option>
                      <option value="alphabetical">Title: A-Z</option>
                    </select>

                  </div>

                  {/* Main Catalog Table */}
                  <div className="p-6 rounded-2xl bg-[#0E1220] border border-white/5 shadow-xl">
                    
                    {paginatedBlogs.length === 0 ? (
                      <div className="text-center py-16 text-slate-500 font-mono text-xs">
                        No articles match the specified filtering protocol.
                      </div>
                    ) : (
                      <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm border-collapse font-sans">
                          <thead>
                            <tr className="border-b border-white/5 text-slate-500 text-xs font-mono uppercase tracking-wider pb-2">
                              <th className="py-3 px-4 font-bold">Thumbnail</th>
                              <th className="py-3 px-4 font-bold">Title</th>
                              <th className="py-3 px-4 font-bold">Category</th>
                              <th className="py-3 px-4 font-bold">Status</th>
                              <th className="py-3 px-4 font-bold">Views</th>
                              <th className="py-3 px-4 font-bold">Featured</th>
                              <th className="py-3 px-4 font-bold">Publish Date</th>
                              <th className="py-3 px-4 font-bold text-right">Actions</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-white/[0.03]">
                            {paginatedBlogs.map(blog => {
                              const cat = categories.find(c => c.id === blog.categoryId);
                              return (
                                <tr key={blog.id} className="hover:bg-white/[0.01] transition-colors">
                                  {/* Thumbnail */}
                                  <td className="py-3.5 px-4">
                                    <div className="w-12 h-8 rounded bg-slate-950 border border-white/5 overflow-hidden">
                                      {blog.featuredImage ? (
                                        <img src={blog.featuredImage} alt="Cover" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                                      ) : (
                                        <div className="w-full h-full flex items-center justify-center text-[8px] text-slate-600 font-mono uppercase">None</div>
                                      )}
                                    </div>
                                  </td>
                                  {/* Title */}
                                  <td className="py-3.5 px-4 font-bold text-white max-w-xs truncate" title={blog.title}>
                                    {blog.title}
                                  </td>
                                  {/* Category */}
                                  <td className="py-3.5 px-4 text-xs font-mono text-slate-400">
                                    {cat ? (
                                      <span className={`px-2 py-0.5 rounded text-[10px] bg-slate-950 border border-white/10`}>
                                        {cat.name}
                                      </span>
                                    ) : "Uncategorized"}
                                  </td>
                                  {/* Status */}
                                  <td className="py-3.5 px-4 text-xs">
                                    <button
                                      onClick={() => handleTogglePublishStatus(blog)}
                                      title="Toggle publishing status"
                                      className={`px-2.5 py-0.5 rounded-full font-mono text-[9px] font-black uppercase border transition-all cursor-pointer ${
                                        blog.status === "published"
                                          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20"
                                          : "bg-amber-500/10 text-amber-400 border-amber-500/30 hover:bg-amber-500/20"
                                      }`}
                                    >
                                      {blog.status}
                                    </button>
                                  </td>
                                  {/* Views */}
                                  <td className="py-3.5 px-4 text-xs font-mono text-slate-400">
                                    {blog.views || 0}
                                  </td>
                                  {/* Featured */}
                                  <td className="py-3.5 px-4 text-xs">
                                    <button
                                      onClick={() => handleToggleFeatured(blog)}
                                      title="Toggle Pinned state"
                                      className={`px-2 py-0.5 rounded border text-[9px] font-mono uppercase transition-all cursor-pointer ${
                                        blog.featured
                                          ? "bg-rose-500/10 text-rose-400 border-rose-500/30 hover:bg-rose-500/20 font-black"
                                          : "bg-slate-950 text-slate-500 border-white/5 hover:border-white/15"
                                      }`}
                                    >
                                      {blog.featured ? "★ Featured" : "Pin"}
                                    </button>
                                  </td>
                                  {/* Publish Date */}
                                  <td className="py-3.5 px-4 text-xs font-mono text-slate-400">
                                    {blog.publishDate ? new Date(blog.publishDate).toLocaleDateString("en-US", {
                                      month: "short",
                                      day: "numeric",
                                      year: "numeric"
                                    }) : "None"}
                                  </td>
                                  {/* Actions */}
                                  <td className="py-3.5 px-4 text-right space-x-1 font-mono">
                                    <button
                                      onClick={() => handleEditBlogClick(blog)}
                                      title="Edit publication"
                                      className="p-1.5 rounded-lg bg-slate-900 border border-white/5 text-slate-300 hover:text-cyan-400 cursor-pointer"
                                    >
                                      <Edit2 className="w-3.5 h-3.5" />
                                    </button>
                                    <button
                                      onClick={() => handleDuplicateBlog(blog)}
                                      title="Duplicate publication"
                                      className="p-1.5 rounded-lg bg-slate-900 border border-white/5 text-slate-300 hover:text-purple-400 cursor-pointer"
                                    >
                                      <Repeat className="w-3.5 h-3.5" />
                                    </button>
                                    <button
                                      onClick={() => window.open(`/blog/${blog.slug}`, "_blank")}
                                      title="Preview Live Link"
                                      className="p-1.5 rounded-lg bg-slate-900 border border-white/5 text-slate-300 hover:text-emerald-400 cursor-pointer"
                                    >
                                      <Globe className="w-3.5 h-3.5" />
                                    </button>
                                    <button
                                      onClick={() => handleDeleteBlog(blog.id, blog.featuredImage)}
                                      title="Delete publication"
                                      className="p-1.5 rounded-lg bg-slate-900 border border-white/5 text-slate-400 hover:text-rose-400 cursor-pointer"
                                    >
                                      <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    )}

                    {/* Pagination Panel */}
                    <div className="flex justify-between items-center pt-6 border-t border-white/5 text-xs font-mono mt-4">
                      <span className="text-slate-500">Page {currentPage} of {totalPages}</span>
                      <div className="space-x-1 flex items-center">
                        <button
                          onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                          disabled={currentPage === 1}
                          className="px-3 py-1.5 rounded-lg bg-slate-900 border border-white/5 text-slate-300 disabled:opacity-30 disabled:cursor-not-allowed hover:text-cyan-400 transition-colors"
                        >
                          Prev
                        </button>
                        <button
                          onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                          disabled={currentPage === totalPages}
                          className="px-3 py-1.5 rounded-lg bg-slate-900 border border-white/5 text-slate-300 disabled:opacity-30 disabled:cursor-not-allowed hover:text-cyan-400 transition-colors"
                        >
                          Next
                        </button>
                      </div>
                    </div>

                  </div>

                </motion.div>
              )}

              {/* TAB 3: PUBLICATION EDITOR */}
              {activeTab === "editor" && (
                <motion.div
                  key="editor"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="space-y-6"
                >
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/5 pb-5">
                    <div>
                      <h1 className="text-2xl font-black text-white uppercase tracking-tight">
                        {editingBlogId ? "Modify Blog Post" : "Draft New SAP Article"}
                      </h1>
                      <p className="text-xs text-slate-400 font-light">
                        SEO-optimized technical article form with responsive markdown helper toolbar.
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {hasAutosave && (
                        <button
                          type="button"
                          onClick={handleRestoreDraft}
                          className="inline-flex items-center gap-1.5 text-xs text-cyan-400 hover:text-cyan-300 border border-cyan-500/20 hover:border-cyan-500/40 px-3.5 py-2.5 rounded-xl bg-cyan-500/5 cursor-pointer font-bold font-mono"
                        >
                          <RefreshCw className="w-3.5 h-3.5" />
                          <span>Restore Autosave</span>
                        </button>
                      )}

                      <button
                        onClick={() => setActiveTab("blogs")}
                        className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors border border-white/10 hover:border-white/20 px-3.5 py-2.5 rounded-xl bg-slate-900/40 cursor-pointer"
                      >
                        <Undo2 className="w-4 h-4" />
                        <span>Cancel</span>
                      </button>
                    </div>
                  </div>

                  <form onSubmit={handleSaveBlog} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    
                    {/* Writing Column (Left) */}
                    <div className="lg:col-span-8 space-y-6">
                      
                      {/* Title block */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider block">
                          Article Title
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Setting Up Document Splitting inside SAP FICO"
                          value={editorTitle}
                          onChange={(e) => setEditorTitle(e.target.value)}
                          className="w-full bg-slate-900/30 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-slate-600 focus:border-cyan-500/45 focus:ring-0 outline-none transition-all text-sm sm:text-base font-bold"
                        />
                      </div>

                      {/* Slug & Attribution */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        
                        <div className="space-y-1.5">
                          <label className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider block">
                            URL Slug (Auto-generated / Editable)
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="sap-document-splitting-fico"
                            value={editorSlug}
                            onChange={(e) => setEditorSlug(e.target.value.toLowerCase().replace(/\s+/g, "-"))}
                            className="w-full bg-slate-900/30 border border-white/10 rounded-xl px-4 py-2.5 text-cyan-400 placeholder-slate-600 focus:border-cyan-500/45 outline-none text-xs font-mono"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider block">
                            Author Attribution
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="Rajesh Kumar"
                            value={editorAuthor}
                            onChange={(e) => setEditorAuthor(e.target.value)}
                            className="w-full bg-slate-900/30 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-slate-600 focus:border-cyan-500/45 outline-none text-xs font-semibold font-mono"
                          />
                        </div>

                      </div>

                      {/* Short Description */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider block">
                          Short Excerpt / Description (Introduction)
                        </label>
                        <textarea
                          rows={2}
                          placeholder="Provide a condensed summary of the article to capture reader interest in listing grids..."
                          value={editorExcerpt}
                          onChange={(e) => setEditorExcerpt(e.target.value)}
                          className="w-full bg-slate-900/30 border border-white/10 rounded-xl px-4 py-3 text-sm text-slate-300 placeholder-slate-600 focus:border-cyan-500/45 outline-none leading-relaxed resize-none"
                        />
                      </div>

                      {/* Formatting body */}
                      <div className="space-y-2">
                        <div className="flex justify-between items-center flex-wrap gap-4">
                          <label className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider block">
                            Structured HTML Content body
                          </label>
                          
                          {/* Reading time indicator */}
                          <div className="flex items-center gap-1.5 text-slate-500 font-mono text-[10px]">
                            <Clock className="w-3.5 h-3.5 text-cyan-400" />
                            <span>Calculated: <strong>{editorReadingTime} min read</strong></span>
                          </div>

                          <div className="inline-flex rounded-xl bg-slate-950 p-0.5 border border-white/5 text-xs font-mono">
                            <button
                              type="button"
                              onClick={() => setEditorPreviewMode("write")}
                              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                                editorPreviewMode === "write"
                                  ? "bg-cyan-500 text-slate-950 font-black"
                                  : "text-slate-400 hover:text-white"
                              }`}
                            >
                              Editor Code
                            </button>
                            <button
                              type="button"
                              onClick={() => setEditorPreviewMode("preview")}
                              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                                editorPreviewMode === "preview"
                                  ? "bg-cyan-500 text-slate-950 font-black"
                                  : "text-slate-400 hover:text-white"
                              }`}
                            >
                              Live Preview
                            </button>
                          </div>
                        </div>

                        {editorPreviewMode === "write" ? (
                          <div className="rounded-2xl border border-white/10 overflow-hidden bg-slate-900/10 shadow-lg">
                            
                            {/* Rich Editor Quick Toolbar */}
                            <div className="flex flex-wrap items-center gap-1 px-2.5 py-1.5 bg-slate-950/80 border-b border-white/5 text-slate-400">
                              
                              <button
                                type="button"
                                onClick={() => insertFormatting("<h2>", "</h2>")}
                                title="Insert Heading 2"
                                className="p-1.5 rounded hover:bg-white/5 hover:text-cyan-400 transition-all"
                              >
                                <Heading1 className="w-4 h-4" />
                              </button>

                              <button
                                type="button"
                                onClick={() => insertFormatting("<h3>", "</h3>")}
                                title="Insert Heading 3"
                                className="p-1.5 rounded hover:bg-white/5 hover:text-cyan-400 transition-all"
                              >
                                <Heading2 className="w-4 h-4" />
                              </button>

                              <div className="w-px h-5 bg-white/5 mx-1" />

                              <button
                                type="button"
                                onClick={() => insertFormatting("<strong>", "</strong>")}
                                title="Bold"
                                className="p-1.5 rounded hover:bg-white/5 hover:text-cyan-400 transition-all"
                              >
                                <Bold className="w-4 h-4" />
                              </button>

                              <button
                                type="button"
                                onClick={() => insertFormatting("<em>", "</em>")}
                                title="Italic"
                                className="p-1.5 rounded hover:bg-white/5 hover:text-cyan-400 transition-all"
                              >
                                <Italic className="w-4 h-4" />
                              </button>

                              <button
                                type="button"
                                onClick={() => insertFormatting("<u>", "</u>")}
                                title="Underline"
                                className="p-1.5 rounded hover:bg-white/5 hover:text-cyan-400 transition-all"
                              >
                                <Underline className="w-4 h-4" />
                              </button>

                              <div className="w-px h-5 bg-white/5 mx-1" />

                              <button
                                type="button"
                                onClick={() => insertFormatting("<blockquote className=\"border-l-4 border-cyan-500 pl-4 italic my-4 bg-slate-900/50 p-3 rounded-r-xl\">\n  \"", "\"\n</blockquote>")}
                                title="Blockquote"
                                className="p-1.5 rounded hover:bg-white/5 hover:text-cyan-400 transition-all"
                              >
                                <Quote className="w-4 h-4" />
                              </button>

                              <button
                                type="button"
                                onClick={() => insertFormatting("<pre className=\"bg-slate-950 border border-white/5 p-4 rounded-xl font-mono text-xs text-cyan-400 my-4\">\n<code>", "</code>\n</pre>")}
                                title="Code Block"
                                className="p-1.5 rounded hover:bg-white/5 hover:text-cyan-400 transition-all"
                              >
                                <Code2 className="w-4 h-4" />
                              </button>

                              <button
                                type="button"
                                onClick={() => insertFormatting("<ul className=\"list-disc pl-5 my-4 space-y-1\">\n  <li>", "</li>\n</ul>")}
                                title="Bullet List"
                                className="p-1.5 rounded hover:bg-white/5 hover:text-cyan-400 transition-all"
                              >
                                <List className="w-4 h-4" />
                              </button>

                              <button
                                type="button"
                                onClick={() => insertFormatting("<ol className=\"list-decimal pl-5 my-4 space-y-1\">\n  <li>", "</li>\n</ol>")}
                                title="Numbered List"
                                className="p-1.5 rounded hover:bg-white/5 hover:text-cyan-400 transition-all"
                              >
                                <ListOrdered className="w-4 h-4" />
                              </button>

                              <div className="w-px h-5 bg-white/5 mx-1" />

                              <button
                                type="button"
                                onClick={() => {
                                  const url = prompt("Enter hyperlink URL (e.g., https://google.com):");
                                  if (url) insertFormatting(`<a href="${url}" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">`, "</a>");
                                }}
                                title="Hyperlink"
                                className="p-1.5 rounded hover:bg-white/5 hover:text-cyan-400 transition-all"
                              >
                                <Share2 className="w-4 h-4" />
                              </button>

                              <button
                                type="button"
                                onClick={() => {
                                  const ytUrl = prompt("Enter YouTube embed link (e.g. https://www.youtube.com/embed/dQw4w9WgXcQ):");
                                  if (ytUrl) insertFormatting(`<div className="aspect-video w-full my-6 rounded-2xl overflow-hidden border border-white/5 shadow-md"><iframe src="${ytUrl}" className="w-full h-full" allowFullScreen></iframe></div>`);
                                }}
                                title="Embed YouTube Video"
                                className="p-1.5 rounded hover:bg-white/5 hover:text-cyan-400 transition-all"
                              >
                                <Youtube className="w-4 h-4" />
                              </button>

                              <button
                                type="button"
                                onClick={() => insertFormatting("<hr className=\"border-white/5 my-8\" />\n")}
                                title="Horizontal Divider"
                                className="p-1.5 rounded hover:bg-white/5 hover:text-cyan-400 transition-all"
                              >
                                <Layers className="w-4 h-4" />
                              </button>

                            </div>

                            {/* Code Textarea */}
                            <textarea
                              id="editor-textarea"
                              required
                              rows={15}
                              placeholder="Type HTML formatted blog body here. Ex: <h2>Sub-heading</h2> <p>Detailed material...</p>"
                              value={editorContent}
                              onChange={(e) => setEditorContent(e.target.value)}
                              className="w-full bg-[#080B13]/80 p-5 text-slate-200 placeholder-slate-700 text-sm sm:text-base outline-none focus:ring-0 leading-relaxed font-mono"
                            />

                          </div>
                        ) : (
                          /* LIVE PREVIEW WINDOW */
                          <div className="rounded-2xl border border-white/5 bg-[#080B13]/90 p-6 min-h-[350px] max-h-[500px] overflow-y-auto">
                            {editorContent ? (
                              <div 
                                className="prose prose-invert prose-cyan max-w-none text-slate-300 font-light text-sm sm:text-base leading-relaxed 
                                [&>h2]:text-xl [&>h2]:font-black [&>h2]:text-white [&>h2]:pt-5 [&>h2]:pb-2 [&>h2]:uppercase [&>h2]:font-mono [&>h2]:tracking-tight
                                [&>h3]:text-base [&>h3]:font-bold [&>h3]:text-cyan-300 [&>h3]:pt-4
                                [&>p]:mb-4 [&>p]:text-slate-300 [&>p]:leading-relaxed
                                [&>ul]:list-disc [&>ul]:pl-5 [&>ul]:mb-4 [&>ul]:text-slate-300
                                [&>ol]:list-decimal [&>ol]:pl-5 [&>ol]:mb-4 [&>ol]:text-slate-300
                                [&>blockquote]:border-l-4 [&>blockquote]:border-cyan-500 [&>blockquote]:pl-4 [&>blockquote]:italic [&>blockquote]:text-slate-400 [&>blockquote]:my-4 [&>blockquote]:bg-slate-900/40 [&>blockquote]:p-3 [&>blockquote]:rounded-r-xl
                                [&>pre]:bg-slate-950 [&>pre]:border [&>pre]:border-white/5 [&>pre]:p-4 [&>pre]:rounded-xl [&>pre]:overflow-x-auto [&>pre]:font-mono [&>pre]:text-xs [&>pre]:text-cyan-400
                                "
                                dangerouslySetInnerHTML={{ __html: editorContent }}
                              />
                            ) : (
                              <div className="text-center py-20 text-slate-600 italic text-xs font-mono">No article contents to preview.</div>
                            )}
                          </div>
                        )}

                      </div>

                    </div>

                    {/* Editor Sidebar Settings (Right) */}
                    <div className="lg:col-span-4 space-y-6">
                      
                      {/* Publication configurations */}
                      <div className="p-6 rounded-2xl bg-[#0E1220] border border-white/5 space-y-4 shadow-xl">
                        <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5 border-b border-white/5 pb-2">
                          <Settings className="w-4 h-4 text-cyan-400" />
                          Settings
                        </h3>

                        {/* Status */}
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block">Access Status</label>
                          <select
                            value={editorStatus}
                            onChange={(e) => setEditorStatus(e.target.value as any)}
                            className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white focus:border-cyan-500/45 cursor-pointer outline-none"
                          >
                            <option value="draft">Save Draft Log</option>
                            <option value="published">Publish Publicly</option>
                          </select>
                        </div>

                        {/* Category */}
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block">Topic Directory</label>
                          {categories.length === 0 ? (
                            <p className="text-[11px] text-rose-400 font-mono">No categories configured. Setup categories first.</p>
                          ) : (
                            <select
                              value={editorCategory}
                              onChange={(e) => setEditorCategory(e.target.value)}
                              className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white focus:border-cyan-500/45 cursor-pointer outline-none"
                            >
                              {categories.map(c => (
                                <option key={c.id} value={c.id}>{c.name}</option>
                              ))}
                            </select>
                          )}
                        </div>

                        {/* Tags */}
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block">Tags (comma separated)</label>
                          <input
                            type="text"
                            placeholder="e.g. SAP FICO, S4HANA, Interview"
                            value={editorTags}
                            onChange={(e) => setEditorTags(e.target.value)}
                            className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-xs text-slate-300 outline-none"
                          />
                        </div>

                        {/* Featured */}
                        <div className="flex items-center gap-3.5 py-2 border-t border-b border-white/5">
                          <input
                            type="checkbox"
                            id="editor-featured-toggle"
                            checked={editorFeatured}
                            onChange={(e) => setEditorFeatured(e.target.checked)}
                            className="w-4 h-4 bg-slate-950 text-cyan-500 border-white/10 rounded focus:ring-0 cursor-pointer"
                          />
                          <label htmlFor="editor-featured-toggle" className="text-xs text-slate-300 cursor-pointer select-none">
                            Spotlight Pinned Featured Post
                          </label>
                        </div>

                        {/* Commit button */}
                        <button
                          type="submit"
                          disabled={loading}
                          className="w-full inline-flex items-center justify-center gap-2 py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs uppercase tracking-widest rounded-xl transition-all shadow-md shadow-cyan-500/10 cursor-pointer disabled:opacity-50"
                        >
                          <CheckCircle className="w-4 h-4 stroke-[2.5]" />
                          <span>{editingBlogId ? "Apply Changes" : "Commit Post"}</span>
                        </button>

                      </div>

                      {/* Thumbnail Image upload block */}
                      <div className="p-6 rounded-2xl bg-[#0E1220] border border-white/5 space-y-4 shadow-xl">
                        <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">Featured Thumbnail</h3>

                        {imageError && (
                          <p className="text-[10px] text-rose-400 font-medium font-mono leading-tight">{imageError}</p>
                        )}

                        {editorFeaturedImage ? (
                          <div className="space-y-2">
                            <div className="h-[140px] rounded-xl overflow-hidden border border-white/5 relative">
                              <img src={editorFeaturedImage} alt="Thumbnail Cover" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                              <button
                                type="button"
                                onClick={handleDeleteUploadedImage}
                                className="absolute top-2 right-2 p-1.5 rounded-lg bg-slate-950/80 hover:bg-slate-950 text-rose-400 transition-all cursor-pointer border border-white/10"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                            <p className="text-[10px] text-slate-500 font-mono truncate">{editorFeaturedImage}</p>
                          </div>
                        ) : (
                          <div 
                            onClick={triggerFileInput}
                            className="border-2 border-dashed border-white/10 hover:border-cyan-500/25 rounded-xl p-5 text-center cursor-pointer bg-slate-950/30 group transition-all"
                          >
                            <input
                              type="file"
                              ref={fileInputRef}
                              onChange={handleImageFileChange}
                              accept="image/*"
                              className="hidden"
                            />
                            {uploadingImage ? (
                              <div className="space-y-1">
                                <RefreshCw className="w-6 h-6 text-cyan-400 animate-spin mx-auto" />
                                <p className="text-[10px] text-slate-400 font-mono">Uploading...</p>
                              </div>
                            ) : (
                              <div className="space-y-1.5">
                                <Upload className="w-5 h-5 text-slate-500 group-hover:text-cyan-400 mx-auto transition-colors" />
                                <p className="text-xs font-bold text-slate-300 group-hover:text-cyan-400 transition-colors">Attach cover image</p>
                                <p className="text-[9px] text-slate-500">PNG, JPG or WEBP (Max 5MB)</p>
                              </div>
                            )}
                          </div>
                        )}
                      </div>

                      {/* SEO Settings */}
                      <div className="p-6 rounded-2xl bg-[#0E1220] border border-white/5 space-y-4 shadow-xl">
                        <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">SEO Meta Parameters</h3>
                        <div className="space-y-3 font-mono text-[11px]">
                          
                          <div className="space-y-1">
                            <label className="text-slate-500 block">Meta Title</label>
                            <input
                              type="text"
                              placeholder="Custom search display title"
                              value={editorSeoTitle}
                              onChange={(e) => setEditorSeoTitle(e.target.value)}
                              className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-white"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="text-slate-500 block">Meta Description</label>
                            <textarea
                              rows={2}
                              placeholder="Brief summary to rank higher on Google..."
                              value={editorSeoDescription}
                              onChange={(e) => setEditorSeoDescription(e.target.value)}
                              className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-white resize-none"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="text-slate-500 block">Keywords (comma-sep)</label>
                            <input
                              type="text"
                              placeholder="e.g. SAP FICO, S4HANA, ledger"
                              value={editorKeywords}
                              onChange={(e) => setEditorKeywords(e.target.value)}
                              className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-white"
                            />
                          </div>

                        </div>
                      </div>

                    </div>

                  </form>

                </motion.div>
              )}

              {/* TAB 4: CATEGORY MANAGEMENT */}
              {activeTab === "categories" && (
                <motion.div
                  key="categories"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="space-y-6"
                >
                  <div className="border-b border-white/5 pb-5">
                    <h1 className="text-2xl font-black text-white uppercase tracking-tight">Thematic Directories</h1>
                    <p className="text-xs text-slate-400 font-light">Structure the training website by grouping topics inside distinct routing folders with customizable UI colors.</p>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    
                    {/* Category Creation (Left) */}
                    <div className="lg:col-span-5">
                      <form onSubmit={handleSaveCategory} className="p-6 rounded-2xl bg-[#0E1220] border border-white/5 space-y-4 shadow-xl">
                        <h3 className="text-sm font-bold uppercase tracking-wider font-mono text-cyan-400">
                          {editingCatId ? "Modify Directory" : "Create Topic Directory"}
                        </h3>

                        <div className="space-y-3.5 text-xs font-mono">
                          
                          <div className="space-y-1">
                            <label className="text-slate-400 font-bold uppercase tracking-wide">Category Name</label>
                            <input
                              type="text"
                              required
                              placeholder="e.g. SAP Materials Management"
                              value={catName}
                              onChange={handleCategoryNameChange}
                              className="w-full bg-slate-950 border border-white/10 rounded-xl px-3.5 py-2.5 text-slate-200 outline-none"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="text-slate-400 font-bold uppercase tracking-wide">URL Route Slug</label>
                            <input
                              type="text"
                              required
                              placeholder="sap-mm"
                              value={catSlug}
                              onChange={(e) => setCatSlug(e.target.value.toLowerCase().replace(/\s+/g, "-"))}
                              className="w-full bg-slate-950 border border-white/10 rounded-xl px-3.5 py-2.5 text-cyan-400 font-mono outline-none"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="text-slate-400 font-bold uppercase tracking-wide">Description</label>
                            <textarea
                              rows={2}
                              placeholder="Detailed description of the course module or training path..."
                              value={catDescription}
                              onChange={(e) => setCatDescription(e.target.value)}
                              className="w-full bg-slate-950 border border-white/10 rounded-xl px-3.5 py-2.5 text-slate-200 outline-none resize-none font-sans text-xs"
                            />
                          </div>

                          <div className="space-y-1.5">
                            <label className="text-slate-400 font-bold uppercase tracking-wide block">Color Badge Accent</label>
                            <div className="grid grid-cols-6 gap-2">
                              {["cyan", "blue", "amber", "emerald", "purple", "rose"].map(col => {
                                const activeStyle = catColor === col ? "border-cyan-400 scale-105 shadow-md" : "border-white/5";
                                const colorStyle = 
                                  col === "cyan" ? "bg-cyan-500" :
                                  col === "blue" ? "bg-blue-500" :
                                  col === "amber" ? "bg-amber-500" :
                                  col === "emerald" ? "bg-emerald-500" :
                                  col === "purple" ? "bg-purple-500" : "bg-rose-500";
                                return (
                                  <button
                                    key={col}
                                    type="button"
                                    onClick={() => setCatColor(col)}
                                    className={`w-full aspect-square rounded-xl border-2 cursor-pointer transition-all ${activeStyle} ${colorStyle}`}
                                    title={col}
                                  />
                                );
                              })}
                            </div>
                          </div>

                          <div className="flex items-center gap-2 pt-4">
                            <button
                              type="submit"
                              className="flex-grow inline-flex items-center justify-center gap-1.5 px-4 py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-extrabold uppercase rounded-xl cursor-pointer shadow-md"
                            >
                              <PlusCircle className="w-4 h-4" />
                              <span>{editingCatId ? "Apply" : "Create"}</span>
                            </button>

                            {editingCatId && (
                              <button
                                type="button"
                                onClick={() => {
                                  setEditingCatId(null);
                                  setCatName("");
                                  setCatSlug("");
                                  setCatColor("cyan");
                                  setCatDescription("");
                                }}
                                className="px-3.5 py-3 bg-slate-900 border border-white/10 text-slate-400 rounded-xl uppercase hover:text-white"
                              >
                                Reset
                              </button>
                            )}
                          </div>

                        </div>
                      </form>
                    </div>

                    {/* Category List Display (Right) */}
                    <div className="lg:col-span-7">
                      <div className="p-6 rounded-2xl bg-[#0E1220] border border-white/5 space-y-4 shadow-xl">
                        <h3 className="text-sm font-bold uppercase tracking-wider font-mono">Registered Classifications</h3>

                        {categories.length === 0 ? (
                          <p className="text-xs text-slate-500 italic py-8 text-center font-mono">No categories registered.</p>
                        ) : (
                          <div className="divide-y divide-white/[0.04]">
                            {categories.map(cat => {
                              // badge style
                              const badgeStyle = 
                                cat.color === "blue" ? "bg-blue-500/10 text-blue-400 border-blue-500/20" :
                                cat.color === "amber" ? "bg-amber-500/10 text-amber-400 border-amber-500/20" :
                                cat.color === "emerald" ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" :
                                cat.color === "rose" ? "bg-rose-500/10 text-rose-400 border-rose-500/20" :
                                cat.color === "purple" ? "bg-purple-500/10 text-purple-400 border-purple-500/20" :
                                "bg-cyan-500/10 text-cyan-400 border-cyan-500/20";
                              
                              const countBlogs = blogs.filter(b => b.categoryId === cat.id).length;

                              return (
                                <div key={cat.id} className="py-4 flex justify-between items-start gap-4">
                                  <div className="space-y-1.5 flex-grow">
                                    <div className="flex items-center gap-2">
                                      <span className={`px-2.5 py-0.5 rounded-full border text-[10px] font-mono uppercase tracking-wider font-semibold ${badgeStyle}`}>
                                        {cat.name}
                                      </span>
                                      <span className="text-[10px] text-slate-500 font-mono">({countBlogs} blogs)</span>
                                    </div>
                                    <p className="text-xs text-slate-300 leading-relaxed max-w-md">{cat.description || "No description provided."}</p>
                                    <p className="text-[10px] text-slate-500 font-mono">Route slug: /{cat.slug}</p>
                                  </div>

                                  <div className="space-x-1.5 shrink-0 pt-1 font-mono">
                                    <button
                                      onClick={() => handleEditCategory(cat)}
                                      className="p-1.5 rounded-lg bg-slate-900 border border-white/5 text-slate-400 hover:text-cyan-400 cursor-pointer"
                                      title="Edit Category"
                                    >
                                      <Edit2 className="w-3.5 h-3.5" />
                                    </button>
                                    <button
                                      onClick={() => handleDeleteCategory(cat.id)}
                                      className="p-1.5 rounded-lg bg-slate-900 border border-white/5 text-slate-400 hover:text-rose-400 cursor-pointer"
                                      title="Delete Category"
                                    >
                                      <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        )}

                      </div>
                    </div>

                  </div>

                </motion.div>
              )}

              {/* TAB 5: MEDIA LIBRARY */}
              {activeTab === "media" && (
                <motion.div
                  key="media"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="space-y-6"
                >
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/5 pb-5">
                    <div>
                      <h1 className="text-2xl font-black text-white uppercase tracking-tight">Media Storage Repository</h1>
                      <p className="text-xs text-slate-400 font-light">Directly connected to Firebase Cloud Storage. Upload assets, copy URLs, or manage directories.</p>
                    </div>

                    {/* Direct asset uploader */}
                    <label className="inline-flex items-center gap-2 px-5 py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-extrabold text-xs uppercase tracking-widest rounded-xl cursor-pointer">
                      <Upload className="w-4 h-4 stroke-[2.5]" />
                      <span>Upload Asset</span>
                      <input type="file" onChange={handleMediaUpload} accept="image/*" className="hidden" />
                    </label>
                  </div>

                  {/* Search & Folder filters */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-slate-900/40 p-4 rounded-2xl border border-white/5 text-xs font-mono">
                    <div className="relative sm:col-span-2">
                      <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        placeholder="Search media by asset name..."
                        value={mediaSearch}
                        onChange={(e) => setMediaSearch(e.target.value)}
                        className="w-full bg-slate-950/60 border border-white/10 rounded-xl pl-9 pr-3 py-2.5 outline-none focus:border-cyan-500/40 text-slate-200"
                      />
                    </div>

                    <select
                      value={mediaFolderFilter}
                      onChange={(e) => setMediaFolderFilter(e.target.value)}
                      className="bg-slate-950/60 border border-white/10 rounded-xl px-3 py-2.5 outline-none focus:border-cyan-500/40 text-slate-300 cursor-pointer"
                    >
                      <option value="all">All Storage Folders</option>
                      <option value="blog-images">/blog-images/</option>
                      <option value="featured-images">/featured-images/</option>
                      <option value="editor-images">/editor-images/</option>
                    </select>
                  </div>

                  {/* Images Grid */}
                  {loadingMedia ? (
                    <div className="py-20 text-center space-y-4">
                      <RefreshCw className="w-8 h-8 text-cyan-400 animate-spin mx-auto" />
                      <p className="text-xs text-slate-500 font-mono uppercase">Querying file nodes...</p>
                    </div>
                  ) : filteredMedia.length === 0 ? (
                    <div className="text-center py-16 text-slate-500 font-mono text-xs">No image files located in Firebase Storage.</div>
                  ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                      {filteredMedia.map(img => (
                        <div key={img.id} className="p-2.5 rounded-2xl bg-[#0E1220] border border-white/5 hover:border-white/10 transition-all flex flex-col justify-between group overflow-hidden">
                          <div className="space-y-2">
                            {/* Image container box */}
                            <div className="aspect-square w-full rounded-xl bg-slate-950 overflow-hidden relative border border-white/5">
                              <img src={img.url} alt={img.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" referrerPolicy="no-referrer" />
                              <div className="absolute inset-0 bg-slate-950/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5 p-2">
                                <button
                                  onClick={() => setPreviewMediaUrl(img.url)}
                                  className="p-1.5 rounded-lg bg-slate-900 border border-white/5 text-slate-300 hover:text-white"
                                  title="Zoom Preview"
                                >
                                  <Eye className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => handleCopyUrl(img.url)}
                                  className="p-1.5 rounded-lg bg-slate-900 border border-white/5 text-slate-300 hover:text-white"
                                  title="Copy CDN Link"
                                >
                                  {copiedUrl === img.url ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                                </button>
                                <button
                                  onClick={() => handleDeleteMedia(img.url)}
                                  className="p-1.5 rounded-lg bg-slate-900 border border-white/5 text-rose-400 hover:text-rose-300"
                                  title="Delete Asset"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                            <p className="text-[10px] font-mono text-slate-400 truncate max-w-full" title={img.name}>{img.name}</p>
                          </div>
                          <span className="text-[8px] font-mono text-slate-500 uppercase tracking-widest mt-2">/{img.folder}/</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Full image preview Dialog box */}
                  <AnimatePresence>
                    {previewMediaUrl && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setPreviewMediaUrl(null)}
                        className="fixed inset-0 bg-slate-950/90 z-50 flex items-center justify-center p-6 cursor-zoom-out"
                      >
                        <div className="relative max-w-4xl max-h-[85vh] overflow-hidden rounded-2xl border border-white/10" onClick={e => e.stopPropagation()}>
                          <img src={previewMediaUrl} alt="Preview Zoom" className="max-w-full max-h-[80vh] object-contain" referrerPolicy="no-referrer" />
                          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-slate-950/80 border border-white/10 p-2.5 rounded-xl text-xs font-mono">
                            <span className="text-slate-300 truncate max-w-xs">{previewMediaUrl}</span>
                            <button
                              onClick={() => handleCopyUrl(previewMediaUrl)}
                              className="px-2.5 py-1 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-lg transition-colors cursor-pointer"
                            >
                              {copiedUrl === previewMediaUrl ? "Copied!" : "Copy URL"}
                            </button>
                            <button
                              onClick={() => setPreviewMediaUrl(null)}
                              className="p-1 rounded bg-slate-900 border border-white/5 hover:text-rose-400"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                </motion.div>
              )}

              {/* TAB 6: ADMIN SETTINGS */}
              {activeTab === "settings" && (
                <motion.div
                  key="settings"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="space-y-6"
                >
                  <div className="border-b border-white/5 pb-5">
                    <h1 className="text-2xl font-black text-white uppercase tracking-tight">Admin System Settings</h1>
                    <p className="text-xs text-slate-400 font-light">Inspect core credentials, verify Firestore linkage, and adjust CMS dashboard configuration.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-8 font-mono">
                    
                    {/* Admin Profile Data */}
                    <div className="md:col-span-7 p-6 rounded-2xl bg-[#0E1220] border border-white/5 space-y-4 shadow-xl">
                      <h3 className="text-sm font-bold uppercase tracking-wider text-cyan-400">Authenticated Profile Details</h3>
                      
                      <div className="space-y-3.5 text-xs">
                        <div className="flex justify-between py-2 border-b border-white/[0.03]">
                          <span className="text-slate-500">Administrator UID:</span>
                          <span className="text-white text-right select-all">{adminProfile?.uid || "Not loaded"}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-white/[0.03]">
                          <span className="text-slate-500">Assigned Name:</span>
                          <span className="text-white text-right font-bold">{adminProfile?.name}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-white/[0.03]">
                          <span className="text-slate-500">Verified Email:</span>
                          <span className="text-white text-right">{adminProfile?.email}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-white/[0.03]">
                          <span className="text-slate-500">Security Access Level:</span>
                          <span className="text-cyan-400 font-bold text-right">{adminProfile?.role}</span>
                        </div>
                        <div className="flex justify-between py-2">
                          <span className="text-slate-500">Active Node Status:</span>
                          <span className="text-emerald-400 font-extrabold text-right">● Session Active</span>
                        </div>
                      </div>

                      <div className="pt-4 flex justify-between items-center text-[10px] text-slate-500 font-light">
                        <span>Database Token: firebase-blueprints-auth-v1.0</span>
                        <span className="text-rose-400 font-bold cursor-pointer hover:underline" onClick={onLogout}>Terminate Active Session</span>
                      </div>
                    </div>

                    {/* Preferences / Mock Options */}
                    <div className="md:col-span-5 p-6 rounded-2xl bg-[#0E1220] border border-white/5 space-y-4 shadow-xl text-xs">
                      <h3 className="text-sm font-bold uppercase tracking-wider text-cyan-400">CMS Configuration</h3>
                      
                      <div className="space-y-3.5 text-slate-400">
                        <div className="flex items-center justify-between">
                          <span>Auto-save Draft Logs:</span>
                          <span className="text-emerald-400 font-bold">ACTIVE (6s)</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Thumbnail Max Size:</span>
                          <span className="text-white">5MB</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>HTML Tags Sanitization:</span>
                          <span className="text-amber-400">STANDARD</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Reading Speed:</span>
                          <span className="text-white">200 words/min</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Firestore Security:</span>
                          <span className="text-emerald-400 font-extrabold">ENFORCED</span>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-white/5 text-[10px] text-slate-500 leading-relaxed font-sans font-light">
                        Note: Storage operations run on isolated directories (Featured cover photos save to <code>/featured-images/</code>, editor embedded visuals save to <code>/blog-images/</code>).
                      </div>
                    </div>

                  </div>

                </motion.div>
              )}

            </AnimatePresence>
          )}

        </main>

      </div>

    </div>
  );
}
