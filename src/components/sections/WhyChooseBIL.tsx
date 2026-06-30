/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Check, Target, Sliders, Briefcase, Award, Clock, Users, BookOpen } from "lucide-react";

export default function WhyChooseBIL() {
  const pillars = [
    {
      title: "Practical Hands-On Training",
      description: "Learn by doing — real tools, real workflows, real enterprise scenarios from day one.",
      icon: Sliders,
      color: "text-blue-400",
      bgColor: "bg-blue-500/10",
      borderColor: "hover:border-blue-500/30",
      glowColor: "group-hover:shadow-blue-500/10"
    },
    {
      title: "Industry-Experienced Faculty",
      description: "All instructors have worked in corporate environments before teaching.",
      icon: Briefcase,
      color: "text-emerald-400",
      bgColor: "bg-emerald-500/10",
      borderColor: "hover:border-emerald-500/30",
      glowColor: "group-hover:shadow-emerald-500/10"
    },
    {
      title: "Certification on Completion",
      description: "BIL issues a course completion certificate for every program you finish.",
      icon: Award,
      color: "text-purple-400",
      bgColor: "bg-purple-500/10",
      borderColor: "hover:border-purple-500/30",
      glowColor: "group-hover:shadow-purple-500/10"
    },
    {
      title: "Job-Oriented Curriculum",
      description: "Every topic maps directly to skills employers demand in job descriptions.",
      icon: BookOpen,
      color: "text-cyan-400",
      bgColor: "bg-cyan-500/10",
      borderColor: "hover:border-cyan-500/30",
      glowColor: "group-hover:shadow-cyan-500/10"
    },
    {
      title: "Flexible Batch Timings",
      description: "Morning, afternoon, and weekend batches to fit around your schedule.",
      icon: Clock,
      color: "text-amber-400",
      bgColor: "bg-amber-500/10",
      borderColor: "hover:border-amber-500/30",
      glowColor: "group-hover:shadow-amber-500/10"
    },
    {
      title: "Small Batch Sizes",
      description: "Limited seats per batch means personal attention and faster learning.",
      icon: Users,
      color: "text-pink-400",
      bgColor: "bg-pink-500/10",
      borderColor: "hover:border-pink-500/30",
      glowColor: "group-hover:shadow-pink-500/10"
    }
  ];

  return (
    <section id="why-bil" className="py-24 bg-[#090D16] relative overflow-hidden">
      {/* Background radial soft ambient glows */}
      <div className="absolute top-[30%] left-[-15%] w-[55%] h-[55%] bg-blue-600/5 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="absolute bottom-[20%] right-[-15%] w-[55%] h-[55%] bg-cyan-500/5 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-left mb-16 max-w-3xl">
          <span className="text-xs font-mono tracking-[0.25em] text-cyan-400 uppercase font-extrabold bg-cyan-500/10 px-3.5 py-1.5 rounded-md border border-cyan-500/20 inline-block mb-4">
            Why BIL
          </span>
          <h2 className="text-3xl md:text-5xl font-heading font-extrabold text-white leading-tight">
            Training built around what employers need
          </h2>
          <p className="text-slate-400 text-base md:text-lg mt-4 font-light leading-relaxed">
            Most training institutes teach theory. We teach practice. Every course at BIL is structured around real corporate workflows, tools used by Fortune 500 companies, and skills that appear on actual job descriptions.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          {/* Left Column: Unique Feature Focus Card */}
          <div className="lg:col-span-4 flex flex-col justify-stretch">
            <div className="relative p-8 sm:p-10 rounded-3xl bg-gradient-to-b from-slate-900/80 to-slate-950/90 border border-white/5 hover:border-cyan-500/30 transition-all duration-500 flex flex-col justify-between overflow-hidden group shadow-2xl h-full">
              
              {/* Corner ambient glow effect */}
              <div className="absolute top-0 right-0 w-44 h-44 bg-cyan-500/10 rounded-full blur-3xl group-hover:bg-cyan-500/15 transition-all duration-500"></div>
              
              <div className="relative z-10">
                {/* Target Emoji Header */}
                <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mb-8 shadow-inner shadow-cyan-400/5">
                  <span className="text-3xl" role="img" aria-label="target">🎯</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-heading font-extrabold text-white leading-snug tracking-tight">
                  Mangalore's only dedicated ERP training institute
                </h3>

                <p className="text-sm text-slate-400 mt-4 leading-relaxed font-light">
                  A modern, professional learning laboratory specializing in high-demand enterprise enterprise applications, financial reporting systems, and corporate compliance databases.
                </p>
              </div>

              {/* Dynamic tag badges footer */}
              <div className="mt-12 pt-8 border-t border-white/5 relative z-10">
                <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-widest block mb-4">
                  Core Competency Pillars
                </span>
                <div className="flex flex-wrap gap-2.5">
                  {["SAP", "Power BI", "GST Filing", "UAE VAT"].map((tech) => (
                    <span
                      key={tech}
                      className="px-3.5 py-1.5 rounded-lg bg-white/5 border border-white/5 font-mono text-xs text-slate-300 font-semibold"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Key Pillars Grid */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {pillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={idx}
                  className={`group relative p-6 rounded-2xl bg-slate-900/30 backdrop-blur-md border border-white/5 ${pillar.borderColor} hover:bg-slate-900/50 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 hover:shadow-xl ${pillar.glowColor}`}
                >
                  <div>
                    {/* Icon Header */}
                    <div className={`w-11 h-11 rounded-xl ${pillar.bgColor} ${pillar.color} flex items-center justify-center mb-4 border border-white/5`}>
                      <Icon className="w-5 h-5" />
                    </div>

                    <h4 className="text-lg font-bold text-white tracking-tight group-hover:text-cyan-300 transition-colors">
                      {pillar.title}
                    </h4>

                    <p className="text-xs sm:text-sm text-slate-400 mt-2 font-light leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
