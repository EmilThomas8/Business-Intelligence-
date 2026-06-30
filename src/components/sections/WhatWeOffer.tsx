/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { ComponentType } from "react";
import { motion } from "motion/react";
import { SERVICES } from "../../data";
import { Service } from "../../types";
import { Briefcase, Award, Terminal, Handshake, ChevronRight } from "lucide-react";

const ICON_MAP: Record<string, ComponentType<any>> = {
  Briefcase,
  Award,
  Terminal,
  Handshake,
};

interface WhatWeOfferProps {
  onServiceClick: (serviceTitle: string) => void;
}

export default function WhatWeOffer({ onServiceClick }: WhatWeOfferProps) {
  return (
    <section
      id="services"
      className="py-24 bg-slate-50 relative overflow-hidden"
    >
      {/* Dynamic graphic particles */}
      <div className="absolute top-1/3 left-1/10 w-96 h-96 bg-blue-100/40 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/10 w-80 h-80 bg-cyan-100/30 rounded-full blur-[90px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <span className="text-xs uppercase tracking-widest text-primary font-bold bg-blue-50 border border-blue-100 px-3.5 py-1.5 rounded-full">
            Institutional Facilities
          </span>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-slate-900 tracking-tight leading-tight">
            How We Empower Your Corporate Transition
          </h2>
          <p className="font-sans text-slate-500 text-base sm:text-lg leading-relaxed">
            From direct sandbox laboratory servers to personal resume engineering, discover our comprehensive framework for corporate learning excellence.
          </p>
        </div>

        {/* Services Grid with Interactive cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {SERVICES.map((service: Service, idx: number) => {
            const Icon = ICON_MAP[service.iconName] || Briefcase;
            
            // Generate visual styles based on color key
            const isBlue = service.color === "blue";
            const isCyan = service.color === "cyan";
            const isEmerald = service.color === "emerald";
            
            const accentBg = isBlue 
              ? "bg-blue-50 group-hover:bg-blue-600" 
              : isCyan 
                ? "bg-cyan-50 group-hover:bg-cyan-600" 
                : service.color === "indigo"
                  ? "bg-indigo-50 group-hover:bg-indigo-600"
                  : "bg-emerald-50 group-hover:bg-emerald-600";

            const accentText = isBlue 
              ? "text-blue-600 group-hover:text-white" 
              : isCyan 
                ? "text-cyan-600 group-hover:text-white" 
                : service.color === "indigo"
                  ? "text-indigo-600 group-hover:text-white"
                  : "text-emerald-600 group-hover:text-white";

            const accentGlow = isBlue 
              ? "hover:border-blue-400/40 hover:shadow-blue-500/10" 
              : isCyan 
                ? "hover:border-cyan-400/40 hover:shadow-cyan-500/10" 
                : service.color === "indigo"
                  ? "hover:border-indigo-400/40 hover:shadow-indigo-500/10"
                  : "hover:border-emerald-400/40 hover:shadow-emerald-500/10";

            return (
              <motion.div
                key={service.id}
                id={`service-card-${service.id}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -8 }}
                className={`bg-white border border-slate-200/70 rounded-2xl p-6.5 text-left flex flex-col items-start justify-between shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer ${accentGlow}`}
              >
                {/* Top Section */}
                <div className="space-y-5">
                  {/* Dynamic rotating icon container */}
                  <div className={`p-4 rounded-xl ${accentBg} ${accentText} shadow-inner transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 flex items-center justify-center w-14 h-14`}>
                    <Icon className="h-7 w-7 transition-all" />
                  </div>

                  {/* Service Title */}
                  <h3 className="font-heading font-bold text-lg text-slate-900 group-hover:text-primary transition-colors duration-300">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="font-sans text-slate-500 text-sm leading-relaxed">
                    {service.description}
                  </p>
                </div>

                {/* Bottom link trigger */}
                <button
                  id={`learn-more-${service.id}`}
                  onClick={() => onServiceClick(service.title)}
                  className="font-button text-xs font-bold text-primary group-hover:text-primary-dark mt-6 flex items-center gap-1 group/link cursor-pointer"
                >
                  Learn More
                  <ChevronRight className="h-4 w-4 group-hover/link:translate-x-1.5 transition-transform duration-300" />
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
