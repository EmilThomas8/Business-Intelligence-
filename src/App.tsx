import { useState, useEffect } from "react";
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

export default function App() {
  const [view, setView] = useState<'home' | 'courses'>("home");
  const [prefilledCourse, setPrefilledCourse] = useState("");
  const [prefilledComments, setPrefilledComments] = useState("");

  const navigateTo = (sectionId: string) => {
    if (sectionId === "courses") {
      setView("courses");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      setView("home");
      // Wait for components to mount before scrolling
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      }, 60);
    }
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
    setView("home");
    setTimeout(() => {
      const el = document.getElementById('contact');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      setPrefilledComments(`I would like to receive more details regarding your: ${serviceTitle}.`);
    }, 60);
  };

  return (
    <div id="app-root-wrapper" className="w-full min-h-screen bg-[#0F172A] text-slate-100 flex flex-col relative antialiased selection:bg-cyan-500 selection:text-slate-900">
      
      {/* Background Atmosphere Elements */}
      <div className="absolute top-0 inset-x-0 h-[1000px] bg-gradient-to-b from-blue-600/10 via-transparent to-transparent pointer-events-none z-0"></div>

      {/* Header Sticky Navbar */}
      <Navbar
        onEnrollClick={() => handleEnrollClick()}
        onNavigate={navigateTo}
        activeSection={view === "courses" ? "courses" : "hero"}
      />

      {/* Main Sections Wrapper */}
      <main className="flex-grow z-10 relative">
        {view === "home" ? (
          <>
            {/* Hero Section */}
            <Hero onNavigate={navigateTo} />

            {/* Dynamic Statistics Cards */}
            <Statistics />

            {/* Program Cards Grid (Popular only in home mode) */}
            <FeaturedPrograms
              onEnrollClick={handleEnrollClick}
              popularOnly={true}
              onExploreAllClick={() => navigateTo("courses")}
            />

            {/* What We Offer / Services grid */}
            <Services onLearnMoreClick={handleLearnMoreClick} />

            {/* Why BIL Timeline Advantage */}
            <WhyChooseBIL />

            {/* Interactive Step-by-Step Pathway Journey */}
            <LearningJourney />

            {/* Split Coordinates and Reservations Form */}
            <Contact prefilledCourse={prefilledCourse} prefilledComments={prefilledComments} />

            {/* Categorized Accordion FAQ */}
            <FAQSection />
          </>
        ) : (
          <div className="pt-20">
            {/* Course Hero Section */}
            <CourseHero
              onBackToHome={() => navigateTo("hero")}
              onBookConsultation={() => handleEnrollClick()}
            />

            {/* Full Course offers catalog */}
            <FeaturedPrograms
              onEnrollClick={handleEnrollClick}
              popularOnly={false}
            />
          </div>
        )}
      </main>

      {/* Corporate Footprint Footer */}
      <Footer onNavigate={navigateTo} />
    </div>
  );
}

