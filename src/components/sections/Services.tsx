import React from 'react';
import { Database, BarChart3, Receipt, Award, Briefcase, Building2, Terminal, ArrowRight } from 'lucide-react';
import { services } from '../../data/instituteData';

interface ServicesProps {
  onLearnMoreClick: (serviceTitle: string) => void;
}

export default function Services({ onLearnMoreClick }: ServicesProps) {
  // Map string name to Lucide icons
  const iconMap: Record<string, any> = {
    Database: Database,
    BarChart3: BarChart3,
    Receipt: Receipt,
    Award: Award,
    Briefcase: Briefcase,
    Building2: Building2
  };

  const colors = [
    { text: "text-blue-400", bg: "bg-blue-500/10", border: "group-hover:border-blue-500/30", glow: "group-hover:shadow-blue-500/10" },
    { text: "text-purple-400", bg: "bg-purple-500/10", border: "group-hover:border-purple-500/30", glow: "group-hover:shadow-purple-500/10" },
    { text: "text-emerald-400", bg: "bg-emerald-500/10", border: "group-hover:border-emerald-500/30", glow: "group-hover:shadow-emerald-500/10" },
    { text: "text-cyan-400", bg: "bg-cyan-500/10", border: "group-hover:border-cyan-500/30", glow: "group-hover:shadow-cyan-500/10" },
    { text: "text-amber-400", bg: "bg-amber-500/10", border: "group-hover:border-amber-500/30", glow: "group-hover:shadow-amber-500/10" },
    { text: "text-pink-400", bg: "bg-pink-500/10", border: "group-hover:border-pink-500/30", glow: "group-hover:shadow-pink-500/10" }
  ];

  return (
    <section id="services" className="py-24 bg-[#0F172A] relative overflow-hidden">
      {/* Background radial effects */}
      <div className="absolute top-[30%] left-[-15%] w-[60%] h-[60%] bg-blue-600/5 rounded-full blur-[130px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header section */}
        <div className="text-center mb-16 animate-fade-in">
          <span className="text-xs font-mono tracking-[0.25em] text-cyan-400 uppercase font-bold bg-cyan-500/10 px-3.5 py-1.5 rounded-md border border-cyan-500/20">
            What We Offer
          </span>
          <h2 className="text-3xl md:text-5xl font-heading font-extrabold text-white mt-4">
            Comprehensive Training Solutions
          </h2>
          <p className="text-slate-400 text-base md:text-lg max-w-2xl mx-auto mt-4 font-light leading-relaxed">
            From enterprise ERP to practical tax filing — everything you need to grow professionally.
          </p>
        </div>

        {/* Services Grid (Horizontal scroll on mobile, grid on desktop) */}
        <div className="flex overflow-x-auto flex-row flex-nowrap gap-6 pb-8 snap-x snap-mandatory scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-8 md:pb-0">
          {services.map((service, index) => {
            const IconComponent = iconMap[service.iconName] || Terminal;
            const design = colors[index % colors.length];

            return (
              <div
                key={service.id}
                className={`group flex-shrink-0 w-[82vw] max-w-[320px] md:w-full snap-align-start flex flex-col justify-between p-8 rounded-3xl bg-slate-900/40 backdrop-blur-md border border-white/5 transition-all duration-500 hover:-translate-y-2.5 hover:bg-slate-900/70 hover:shadow-[0_20px_45px_rgba(0,0,0,0.4)] ${design.border} ${design.glow} relative overflow-hidden`}
              >
                {/* Visual Glow behind card */}
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                <div>
                  {/* Large Icon Box */}
                  <div className={`inline-flex p-4 rounded-2xl ${design.bg} border border-white/5 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3`}>
                    <IconComponent className={`w-8 h-8 ${design.text} transition-transform duration-500`} />
                  </div>

                  <h3 className="text-xl font-heading font-extrabold text-white mt-6 group-hover:text-cyan-300 transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-sm text-slate-400 mt-3 font-light leading-relaxed">
                    {service.description}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between">
                  <button
                    onClick={() => onLearnMoreClick(service.title)}
                    className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 hover:text-white transition-colors duration-300 flex items-center space-x-1.5 cursor-pointer"
                  >
                    <span>Learn More</span>
                    <ArrowRight className="w-4.5 h-4.5 text-cyan-400 transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
