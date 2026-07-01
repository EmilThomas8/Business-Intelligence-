import React, { useState, useEffect, useRef } from 'react';
import { Users, GraduationCap, Award, Building, TrendingUp } from 'lucide-react';
import { motion, useInView } from 'motion/react';

function AnimatedNumber({ value }: { value: string }) {
  const [current, setCurrent] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  // Extract number and suffix/prefix from string
  const numMatch = value.match(/(\d+)/);
  const isNumeric = numMatch !== null;
  const targetNumber = isNumeric ? parseInt(numMatch[0], 10) : 0;
  
  let prefix = "";
  let suffix = "";
  if (isNumeric) {
    const parts = value.split(numMatch[0]);
    prefix = parts[0] || "";
    suffix = parts[1] || "";
  }

  useEffect(() => {
    if (!isNumeric || !isInView) return;

    let startTime: number | null = null;
    const duration = 1600; // 1.6 seconds for premium fluid transition

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      // Easing function: cubic ease-out
      const easeOutCubic = 1 - Math.pow(1 - progress, 3);
      const val = Math.floor(easeOutCubic * targetNumber);
      
      setCurrent(val);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, isNumeric, targetNumber]);

  if (!isNumeric) {
    return <span ref={ref}>{value}</span>;
  }

  return (
    <span ref={ref}>
      {prefix}
      {current}
      {suffix}
    </span>
  );
}

export default function Statistics() {
  const stats = [
    {
      id: "stat-1",
      value: "500+",
      label: "Students Trained",
      description: "Equipped with market-ready ERP skills",
      icon: Users,
      color: "from-blue-500 to-cyan-400",
      glowColor: "shadow-blue-500/10"
    },
    {
      id: "stat-2",
      value: "14+",
      label: "Courses Offered",
      description: "Comprehensive industry curricula",
      icon: GraduationCap,
      color: "from-emerald-500 to-cyan-400",
      glowColor: "shadow-emerald-500/10"
    },
    {
      id: "stat-3",
      value: "3",
      label: "Specializations",
      description: "Focused professional pathways",
      icon: Award,
      color: "from-cyan-500 to-blue-500",
      glowColor: "shadow-cyan-500/10"
    },
    {
      id: "stat-4",
      value: "Mangalore's",
      label: "ERP Institute",
      description: "Premier corporate-level training lab",
      icon: Building,
      color: "from-purple-500 to-blue-500",
      glowColor: "shadow-purple-500/10"
    }
  ];

  return (
    <section id="statistics" className="py-20 bg-[#0F172A] relative overflow-hidden">
      {/* Background blurs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[50%] bg-blue-900/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => {
            const IconComponent = stat.icon;
            return (
              <div
                key={stat.id}
                className={`group p-8 rounded-3xl bg-slate-900/60 backdrop-blur-md border border-white/5 transition-all duration-300 hover:bg-slate-900/80 hover:border-white/10 hover:-translate-y-1.5 shadow-xl ${stat.glowColor} hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)]`}
              >
                <div className="flex items-start justify-between">
                  <div className={`p-3 bg-white/5 rounded-2xl border border-white/10 group-hover:border-cyan-500/30 transition-all duration-300`}>
                    <IconComponent className="w-6 h-6 text-cyan-400 group-hover:scale-110 transition-transform" />
                  </div>
                  <TrendingUp className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 transition-colors" />
                </div>

                <div className="mt-6">
                  {/* Huge numeric value */}
                  <div className={`text-3xl md:text-4xl font-heading font-extrabold text-transparent bg-clip-text bg-gradient-to-r ${stat.color} tracking-tight`}>
                    <AnimatedNumber value={stat.value} />
                  </div>
                  <div className="text-white font-semibold text-sm mt-2">
                    {stat.label}
                  </div>
                  <div className="text-slate-400 text-xs mt-1 leading-relaxed">
                    {stat.description}
                  </div>
                </div>

                {/* Progress bar micro-animation on hover */}
                <div className="mt-4 h-0.5 w-full bg-white/5 rounded-full overflow-hidden">
                  <div className={`h-full w-0 group-hover:w-full transition-all duration-500 bg-gradient-to-r ${stat.color}`} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
