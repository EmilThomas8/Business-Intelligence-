/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { Users, GraduationCap, Award, Briefcase, TrendingUp } from "lucide-react";

export default function Stats() {
  const statsList = [
    {
      label: "Certified Alumni",
      value: "5,200+",
      subtext: "Upskilled professionals globally",
      icon: Users,
      gradient: "from-blue-500 to-indigo-600",
      glowColor: "rgba(37,99,235,0.15)"
    },
    {
      label: "Enterprise Courses",
      value: "15+",
      subtext: "SAP, BI, GST & SQL Tracks",
      icon: GraduationCap,
      gradient: "from-cyan-500 to-blue-600",
      glowColor: "rgba(6,182,212,0.15)"
    },
    {
      label: "Lead Instructors",
      value: "18+ Yrs",
      subtext: "Avg corporate consulting exp",
      icon: Award,
      gradient: "from-indigo-500 to-purple-600",
      glowColor: "rgba(99,102,241,0.15)"
    },
    {
      label: "Placement Rate",
      value: "94.2%",
      subtext: "Career transition in 120 days",
      icon: Briefcase,
      gradient: "from-emerald-500 to-teal-600",
      glowColor: "rgba(16,185,129,0.15)"
    }
  ];

  return (
    <section
      id="stats"
      className="py-16 bg-slate-50 relative overflow-hidden"
    >
      {/* Decorative backdrop mesh */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-100/30 rounded-full blur-[120px] pointer-events-none z-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {statsList.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                whileHover={{ y: -8, scale: 1.01 }}
                style={{ boxShadow: `0 15px 30px -10px ${stat.glowColor}` }}
                className="bg-white border border-slate-200/60 rounded-2xl p-6 flex flex-col items-start gap-4 transition-all duration-300 relative overflow-hidden group"
              >
                {/* Visual Icon with dynamic gradient */}
                <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.gradient} text-white shadow-md group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="h-6 w-6" />
                </div>

                {/* Stat label and dynamic numbers */}
                <div className="space-y-1">
                  <span className="text-slate-500 font-sans font-medium text-xs sm:text-sm uppercase tracking-wider">
                    {stat.label}
                  </span>
                  <h4 className="font-heading font-extrabold text-3xl sm:text-4xl text-slate-900 tracking-tight">
                    {stat.value}
                  </h4>
                  <p className="text-xs text-slate-400 font-sans font-normal">
                    {stat.subtext}
                  </p>
                </div>

                {/* Subtle right-side trending indicator */}
                <div className="absolute top-4 right-4 text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded text-[10px] font-mono font-bold flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  +12.4%
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
