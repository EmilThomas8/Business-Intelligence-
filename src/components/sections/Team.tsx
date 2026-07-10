/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { motion } from "motion/react";
import { ArrowLeft, Linkedin, Mail, Twitter, Globe, ArrowUpRight, Sparkles } from "lucide-react";

interface TeamProps {
  onBackToHome: () => void;
  onNavigate: (sectionId: string) => void;
}

interface TeamMember {
  name: string;
  role: string;
  description: string;
  imageUrl: string;
  socials: {
    linkedin?: string;
    twitter?: string;
    email?: string;
    portfolio?: string;
  };
}

export default function Team({ onBackToHome, onNavigate }: TeamProps) {
  const teamMembers: TeamMember[] = [
    {
      name: "Max Rehdt",
      role: "Lead ERP Consultant & Trainer",
      description: "Max leads our ERP training division as the Principal Consultant at Business Intelligence Lab. He enjoys designing interactive case studies and has mentored over 1,500 professionals on advanced SAP systems.",
      imageUrl: "https://images.unsplash.com/photo-1519085360753-af0f389a47c1?q=80&w=600&auto=format&fit=crop",
      socials: {
        linkedin: "https://linkedin.com",
        twitter: "https://twitter.com",
        email: "max@bil.com"
      }
    },
    {
      name: "Isabella Rehdt",
      role: "Academic Director & BI Specialist",
      description: "Isabella oversees our multi-dimensional data modeling curriculum and curriculum quality assurance. At Business Intelligence Lab, she runs hands-on workshops combining Power BI, advanced DAX queries, and SQL.",
      imageUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=600&auto=format&fit=crop",
      socials: {
        linkedin: "https://linkedin.com",
        twitter: "https://twitter.com",
        email: "isabella@bil.com"
      }
    },
    {
      name: "Emma Burdo",
      role: "Operations Coordinator & Advisor",
      description: "Emma coordinates student journeys, certification workflows, and global career placements. She serves as the main advisor for batch schedules, government registrations, and direct corporate partnerships.",
      imageUrl: "https://images.unsplash.com/photo-1596229986348-18e00d76dd73?q=80&w=600&auto=format&fit=crop",
      socials: {
        linkedin: "https://linkedin.com",
        email: "emma@bil.com",
        portfolio: "https://dribbble.com"
      }
    }
  ];

  return (
    <div className="relative py-20 sm:py-28 bg-[#0B0F19] overflow-hidden min-h-screen">
      {/* Visual background glow lights matching homepage/courses page */}
      <div className="absolute top-0 left-1/4 w-[50%] h-[100%] bg-blue-600/10 rounded-full blur-[160px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-[40%] h-[80%] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Back to Home navigation button */}
        <div className="flex justify-start mb-8">
          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900/50 hover:bg-slate-900/80 border border-white/5 hover:border-white/10 text-slate-400 hover:text-white rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer group text-cyan-400"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform text-cyan-400" />
            <span className="text-cyan-400">Back to Home</span>
          </button>
        </div>

        {/* Animated Headline section */}
        <div className="max-w-4xl mb-16 sm:mb-24 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono uppercase tracking-[0.2em]">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            <span>Our Educators</span>
          </div>

          <div className="space-y-4">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1] font-sans bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent"
            >
              Meet the team that's <br className="hidden sm:inline" />
              investing into the <br className="hidden sm:inline" />
              new generation.
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="text-base sm:text-lg text-slate-300 font-light leading-relaxed max-w-2xl"
          >
            We bridge the gap between complex enterprise software workflows and academic learning to build high-performance tech careers.
          </motion.p>
        </div>

        {/* Team Members Grid (Glassmorphism cards with glowing border animations) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 sm:gap-8 lg:gap-12">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 + index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{
                y: -10,
                boxShadow: "0 20px 40px rgba(6, 182, 212, 0.08), 0 4px 12px rgba(6, 182, 212, 0.03)",
                borderColor: "rgba(34, 211, 238, 0.2)"
              }}
              className="flex flex-col items-center p-6 sm:p-8 text-center bg-slate-900/40 border border-white/5 rounded-3xl transition-all duration-300 relative group"
            >
              
              {/* Image Container with Inner Hover Zoom */}
              <div className="mb-6 h-40 w-40 sm:h-44 sm:w-44 overflow-hidden rounded-full border-4 border-white/5 bg-slate-950 shadow-md relative">
                <motion.div
                  className="h-full w-full"
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  <img
                    src={member.imageUrl}
                    alt={member.name}
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover"
                  />
                </motion.div>
              </div>

              {/* Role Badge Tag */}
              <div className="mb-4 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-cyan-400">
                {member.role}
              </div>

              {/* Member Name */}
              <h3 className="mb-3 text-2xl sm:text-3xl font-extrabold text-white tracking-tight group-hover:text-cyan-400 transition-colors">
                {member.name}
              </h3>

              {/* Description Bio */}
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-light mb-6 flex-grow">
                {member.description}
              </p>

              {/* Social Links area */}
              <div className="flex items-center justify-center gap-3.5 pt-4 border-t border-white/5 w-full text-slate-500 group-hover:text-slate-300 transition-colors">
                {member.socials.linkedin && (
                  <a
                    href={member.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full hover:bg-white/5 hover:text-cyan-400 transition-all duration-200"
                    aria-label={`${member.name}'s LinkedIn`}
                  >
                    <Linkedin className="h-4.5 w-4.5" />
                  </a>
                )}
                {member.socials.twitter && (
                  <a
                    href={member.socials.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full hover:bg-white/5 hover:text-cyan-400 transition-all duration-200"
                    aria-label={`${member.name}'s Twitter`}
                  >
                    <Twitter className="h-4.5 w-4.5" />
                  </a>
                )}
                {member.socials.email && (
                  <a
                    href={`mailto:${member.socials.email}`}
                    className="p-2 rounded-full hover:bg-white/5 hover:text-cyan-400 transition-all duration-200"
                    aria-label={`${member.name}'s Email`}
                  >
                    <Mail className="h-4.5 w-4.5" />
                  </a>
                )}
                {member.socials.portfolio && (
                  <a
                    href={member.socials.portfolio}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full hover:bg-white/5 hover:text-cyan-400 transition-all duration-200"
                    aria-label={`${member.name}'s Portfolio`}
                  >
                    <Globe className="h-4.5 w-4.5" />
                  </a>
                )}
              </div>

              {/* Overlay link arrow icon in corner */}
              <div className="absolute top-4 right-4 text-slate-600 opacity-0 group-hover:opacity-100 group-hover:text-cyan-400 transition-all duration-300">
                <ArrowUpRight className="h-5 w-5" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quick Stats / Action Banner */}
        <div className="mt-20 border-t border-white/5 pt-16 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-left max-w-xl">
            <h4 className="text-xl sm:text-2xl font-bold text-white mb-2">Want to learn with our certified mentors?</h4>
            <p className="text-sm sm:text-base text-slate-300 font-light">Book a physical lab tour or free trial session with our advisors in Karangalpady, Mangalore.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <button
              onClick={() => onNavigate("contact")}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-sm rounded-2xl transition-all duration-300 shadow-xl shadow-cyan-500/15 hover:shadow-cyan-500/30 hover:-translate-y-0.5 cursor-pointer flex items-center justify-center gap-2.5"
            >
              Book Consultation
            </button>
            <button
              onClick={onBackToHome}
              className="px-6 py-3 bg-white/5 hover:bg-white/10 text-slate-200 hover:text-white rounded-xl border border-white/5 hover:border-white/10 transition-all duration-200 cursor-pointer text-center text-sm font-semibold"
            >
              Back to Home
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

