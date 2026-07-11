import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import Navbar from "./components/layout/Navbar";
import Hero from "./components/sections/Hero";
import Statistics from "./components/sections/Statistics";
import FeaturedPrograms from "./components/sections/FeaturedPrograms";
import Services from "./components/sections/Services";
import WhyChooseBIL from "./components/sections/WhyChooseBIL";
import LearningJourney from "./components/sections/LearningJourney";
import Contact from "./components/sections/Contact";
import FAQSection from "./components/sections/FAQSection";
import CourseHero from "./components/sections/CourseHero";
import Footer from "./components/layout/Footer";
import FloatingNav from "./components/layout/FloatingNav";
import { seoCourses } from "./data/seoCoursesData";
import CourseSEOPage from "./components/sections/CourseSEOPage";
import Team from "./components/sections/Team";
import Gallery from "./components/sections/Gallery";
import StudentReviews from "./components/sections/StudentReviews";

// Import Blog / Admin modules
import BlogListing from "./components/sections/BlogListing";
import BlogDetails from "./components/sections/BlogDetails";
import AdminLogin from "./components/sections/AdminLogin";
import AdminDashboard from "./components/sections/AdminDashboard";
import { authService } from "./services/auth.service";

export default function App() {
  const [view, setView] = useState<'home' | 'courses' | 'seo-course' | 'team' | 'blog' | 'blog-details' | 'admin-login' | 'admin-dashboard'>("home");
  const [activeCourseSlug, setActiveCourseSlug] = useState<string>("");
  const [activeBlogSlug, setActiveBlogSlug] = useState<string>("");
  const [adminUserUid, setAdminUserUid] = useState<string | null>(null);
  const [prefilledCourse, setPrefilledCourse] = useState("");
  const [prefilledComments, setPrefilledComments] = useState("");

  // Firebase Auth State listener
  useEffect(() => {
    const unsubscribe = authService.subscribeToAuth(async (user) => {
      if (user) {
        const isAdmin = await authService.isAdmin(user.uid);
        if (isAdmin) {
          setAdminUserUid(user.uid);
          if (window.location.pathname === "/admin" || window.location.pathname === "/admin/") {
            setView("admin-dashboard");
          }
        } else {
          setAdminUserUid(null);
        }
      } else {
        setAdminUserUid(null);
        if (view === "admin-dashboard") {
          setView("admin-login");
        }
      }
    });
    return () => unsubscribe();
  }, [view]);

  // URL Path Router sync
  useEffect(() => {
    const handleLocationChange = () => {
      const path = window.location.pathname;
      if (path.startsWith("/courses/")) {
        const slug = path.replace("/courses/", "");
        const isValid = seoCourses.some((c) => c.slug === slug);
        if (isValid) {
          setView("seo-course");
          setActiveCourseSlug(slug);
          window.scrollTo({ top: 0, behavior: "instant" as any });
          return;
        }
      } else if (path.startsWith("/blog/")) {
        const slug = path.replace("/blog/", "");
        if (slug) {
          setView("blog-details");
          setActiveBlogSlug(slug);
          window.scrollTo({ top: 0, behavior: "instant" as any });
          return;
        }
      } else if (path === "/blog" || path === "/blog/") {
        setView("blog");
        window.scrollTo({ top: 0, behavior: "instant" as any });
        return;
      } else if (path === "/admin" || path === "/admin/") {
        setView(adminUserUid ? "admin-dashboard" : "admin-login");
        window.scrollTo({ top: 0, behavior: "instant" as any });
        return;
      } else if (path === "/courses" || path === "/courses/") {
        setView("courses");
        window.scrollTo({ top: 0, behavior: "instant" as any });
        return;
      } else if (path === "/team" || path === "/team/") {
        setView("team");
        window.scrollTo({ top: 0, behavior: "instant" as any });
        return;
      }
      setView("home");
    };

    handleLocationChange();
    window.addEventListener("popstate", handleLocationChange);
    return () => {
      window.removeEventListener("popstate", handleLocationChange);
    };
  }, [adminUserUid]);

  const navigateTo = (sectionId: string) => {
    if (sectionId === "courses") {
      window.history.pushState(null, "", "/courses");
      setView("courses");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (sectionId === "team") {
      window.history.pushState(null, "", "/team");
      setView("team");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (sectionId === "blog") {
      window.history.pushState(null, "", "/blog");
      setView("blog");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (sectionId === "admin") {
      window.history.pushState(null, "", "/admin");
      setView(adminUserUid ? "admin-dashboard" : "admin-login");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const isSwitchingView = view !== "home";
      window.history.pushState(null, "", "/");
      setView("home");
      const delay = isSwitchingView ? 350 : 60;
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      }, delay);
    }
  };

  const navigateToCourseSlug = (slug: string) => {
    window.history.pushState(null, "", `/courses/${slug}`);
    setView("seo-course");
    setActiveCourseSlug(slug);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navigateToBlogSlug = (slug: string) => {
    window.history.pushState(null, "", `/blog/${slug}`);
    setView("blog-details");
    setActiveBlogSlug(slug);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navigateToAdmin = () => {
    navigateTo("admin");
  };

  const handleBackToAllCourses = () => {
    window.history.pushState(null, "", "/courses");
    setView("courses");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleEnrollClick = (courseTitle?: string) => {
    const phoneNumber = "919480020875";
    const text = courseTitle
      ? `Hello Business Intelligence Lab, I would like to enroll in the course: ${courseTitle}`
      : "Hello Business Intelligence Lab, I am interested in enrolling in a course.";
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleLearnMoreClick = (serviceTitle: string) => {
    const isSwitchingView = view !== "home";
    window.history.pushState(null, "", "/");
    setView("home");
    const delay = isSwitchingView ? 350 : 60;
    setTimeout(() => {
      const el = document.getElementById('contact');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      setPrefilledComments(`I would like to receive more details regarding your: ${serviceTitle}.`);
    }, delay);
  };

  const currentSeoCourse = seoCourses.find((c) => c.slug === activeCourseSlug);

  const isNoLayout = view === "admin-login" || view === "admin-dashboard";

  return (
    <div id="app-root-wrapper" className="w-full min-h-screen bg-[#0F172A] text-slate-100 flex flex-col relative antialiased selection:bg-cyan-500 selection:text-slate-900">
      
      {/* Background Atmosphere Elements */}
      <div className="absolute top-0 inset-x-0 h-[1000px] bg-gradient-to-b from-blue-600/10 via-transparent to-transparent pointer-events-none z-0"></div>

      {/* Header Sticky Navbar */}
      {!isNoLayout && (
        <Navbar
          onEnrollClick={() => handleEnrollClick()}
          onNavigate={navigateTo}
          activeSection={
            view === "courses" || view === "seo-course"
              ? "courses"
              : view === "team"
              ? "team"
              : view === "blog" || view === "blog-details"
              ? "blog"
              : "hero"
          }
        />
      )}

      {/* Main Sections Wrapper */}
      <main className="flex-grow z-10 relative">
        <AnimatePresence mode="wait">
          {view === "home" ? (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              {/* Hero Section */}
              <Hero onNavigate={navigateTo} />

              {/* Dynamic Statistics Cards */}
              <Statistics />

              {/* Program Cards Grid (Popular only in home mode) */}
              <FeaturedPrograms
                onEnrollClick={handleEnrollClick}
                popularOnly={true}
                onExploreAllClick={() => navigateTo("courses")}
                onNavigateToCourseSlug={navigateToCourseSlug}
              />

              {/* What We Offer / Services grid */}
              <Services onLearnMoreClick={handleLearnMoreClick} />

              {/* Why BIL Timeline Advantage */}
              <WhyChooseBIL />

              {/* Interactive Step-by-Step Pathway Journey */}
              <LearningJourney />

              {/* Verified Student Testimonials Carousel & CTA */}
              <StudentReviews />

              {/* Categorized Accordion FAQ */}
              <FAQSection />

              {/* Split Coordinates and Reservations Form */}
              <Contact prefilledCourse={prefilledCourse} prefilledComments={prefilledComments} />

              {/* Sticky Floating Section Navigation */}
              <FloatingNav onNavigate={navigateTo} />
            </motion.div>
          ) : view === "courses" ? (
            <motion.div
              key="courses"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="pt-20"
            >
              {/* Course Hero Section */}
              <CourseHero
                onBackToHome={() => navigateTo("hero")}
                onBookConsultation={() => handleEnrollClick()}
              />

              {/* Full Course offers catalog */}
              <FeaturedPrograms
                onEnrollClick={handleEnrollClick}
                popularOnly={false}
                onNavigateToCourseSlug={navigateToCourseSlug}
              />
            </motion.div>
          ) : view === "team" ? (
            <motion.div
              key="team"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="pt-20"
            >
              <Team
                onBackToHome={() => navigateTo("hero")}
                onNavigate={navigateTo}
              />
              <Gallery />
            </motion.div>
          ) : view === "seo-course" ? (
            <motion.div
              key="seo-course"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="pt-20"
            >
              {currentSeoCourse ? (
                <CourseSEOPage
                  courseData={currentSeoCourse}
                  onBackToHome={handleBackToAllCourses}
                  onOpenContactWithPreFill={(courseTitle, prefilledComment) => {
                    setView("home");
                    window.history.pushState(null, "", "/");
                    setPrefilledCourse(courseTitle);
                    setPrefilledComments(prefilledComment);
                    setTimeout(() => {
                      const el = document.getElementById("contact");
                      if (el) {
                        el.scrollIntoView({ behavior: "smooth", block: "start" });
                      }
                    }, 100);
                  }}
                />
              ) : (
                <div className="text-center py-24 text-slate-400">
                  <h3 className="text-2xl font-bold mb-2 text-white">Course Details Loading...</h3>
                  <button onClick={handleBackToAllCourses} className="mt-4 px-5 py-2.5 bg-cyan-500 rounded-xl text-slate-950 font-semibold cursor-pointer">
                    Return to Courses Catalog
                  </button>
                </div>
              )}
            </motion.div>
          ) : view === "blog" ? (
            <motion.div
              key="blog"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="pt-20"
            >
              <BlogListing
                onNavigateToBlogSlug={navigateToBlogSlug}
                onNavigateToAdmin={navigateToAdmin}
              />
            </motion.div>
          ) : view === "blog-details" ? (
            <motion.div
              key="blog-details"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="pt-20"
            >
              <BlogDetails
                slug={activeBlogSlug}
                onBackToList={() => navigateTo("blog")}
                onNavigateToBlogSlug={navigateToBlogSlug}
              />
            </motion.div>
          ) : view === "admin-login" ? (
            <motion.div
              key="admin-login"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <AdminLogin
                onLoginSuccess={(uid) => {
                  setAdminUserUid(uid);
                  setView("admin-dashboard");
                }}
                onBackToWebsite={() => navigateTo("blog")}
              />
            </motion.div>
          ) : (
            <motion.div
              key="admin-dashboard"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <AdminDashboard
                onLogout={async () => {
                  await authService.logout();
                  setAdminUserUid(null);
                  setView("admin-login");
                }}
                onBackToWebsite={() => navigateTo("blog")}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Corporate Footprint Footer */}
      {!isNoLayout && <Footer onNavigate={navigateTo} />}
    </div>
  );
}
