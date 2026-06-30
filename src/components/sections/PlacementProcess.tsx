/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { FileSpreadsheet, UserCheck, Code2, Handshake, Landmark, ArrowRight, CheckCircle2 } from "lucide-react";

export default function PlacementProcess() {
  const steps = [
    {
      title: "1. Profile Engineering",
      subtitle: "Resume & LinkedIn",
      description: "Chartered Accountants and senior recruiters restructure your resume and optimize your LinkedIn, highlighting core SAP/BI competencies.",
      icon: FileSpreadsheet,
      color: "text-blue-600 bg-blue-50 border-blue-100"
    },
    {
      title: "2. Technical Drill",
      subtitle: "Technical Mocking",
      description: "Undergo simulated mock board interviews with industry directors, receiving precise feedback on DAX queries and ledger config solutions.",
      icon: UserCheck,
      color: "text-cyan-600 bg-cyan-50 border-cyan-100"
    },
    {
      title: "3. Project Showcase",
      subtitle: "Live Lab Capstone",
      description: "Compile your ledger configs and dashboards into a public GitHub or BI portfolio, ready to present to recruiting directors.",
      icon: Code2,
      color: "text-indigo-600 bg-indigo-50 border-indigo-100"
    },
    {
      title: "4. Direct Matching",
      subtitle: "Interview Schedules",
      description: "Receive pre-scheduled technical and HR interviews with recruiters from our 120+ active corporate and Big 4 allies.",
      icon: Handshake,
      color: "text-purple-600 bg-purple-50 border-purple-100"
    },
    {
      title: "5. Onboarding Support",
      subtitle: "On-Job Mentorship",
      description: "Transition smoothly into your corporate seat with initial workspace support from our expert community during your first 90 days.",
      icon: Landmark,
      color: "text-emerald-600 bg-emerald-50 border-emerald-100"
    }
  ];

  return (
    <section
      id="placement-process"
      className="py-24 bg-slate-900 text-white relative overflow-hidden"
    >
      {/* Background radial accent glows */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-600/10 rounded-full blur-[110px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <span className="text-xs uppercase tracking-widest text-primary font-bold bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-full">
            Placement Process
          </span>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight">
            Our Elite Placement Pipeline
          </h2>
          <p className="font-sans text-slate-400 text-base leading-relaxed">
            We don't just teach modules; we execute a comprehensive, pre-scheduled placement pathway engineered to land you high-value career positions.
          </p>
        </div>

        {/* Horizontal/Vertical Steps Timeline */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.title}
                id={`placement-step-${idx}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -6 }}
                className="bg-slate-950/60 border border-slate-800/80 p-6 rounded-2xl flex flex-col items-start text-left hover:border-blue-500/30 hover:bg-slate-950 transition-all duration-300 relative group cursor-pointer"
              >
                {/* Icon bubble */}
                <div className={`p-3.5 rounded-xl border ${step.color} shadow-inner mb-4 flex items-center justify-center group-hover:scale-105 transition-transform`}>
                  <Icon className="h-6 w-6" />
                </div>

                {/* Subheading */}
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block mb-1">
                  {step.subtitle}
                </span>

                {/* Step Title */}
                <h3 className="font-heading font-bold text-base text-white group-hover:text-primary transition-colors duration-200 mb-2">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="font-sans text-slate-400 text-xs sm:text-sm leading-relaxed mb-4">
                  {step.description}
                </p>

                {/* Highlight Checkmark */}
                <div className="flex items-center gap-1 text-[11px] font-mono text-emerald-400/90 font-bold uppercase mt-auto">
                  <CheckCircle2 className="h-4 w-4" /> Verified Phase
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
