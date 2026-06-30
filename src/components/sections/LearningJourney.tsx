import React, { useState } from 'react';
import { journeySteps } from '../../data/instituteData';
import { ChevronRight, Sparkles, Sliders, Database, ShieldCheck, GraduationCap, Briefcase } from 'lucide-react';

export default function LearningJourney() {
  const [activeStep, setActiveStep] = useState<number>(0);

  const icons = [Sliders, Database, ShieldCheck, GraduationCap, Briefcase];

  return (
    <section id="journey" className="py-24 bg-[#0F172A] relative overflow-hidden">
      {/* Background blurs */}
      <div className="absolute top-[40%] right-[-15%] w-[60%] h-[60%] bg-blue-600/5 rounded-full blur-[130px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header section */}
        <div className="text-center mb-16">
          <span className="text-xs font-mono tracking-[0.25em] text-cyan-400 uppercase font-bold">The Blueprint</span>
          <h2 className="text-3xl md:text-5xl font-heading font-extrabold text-white mt-3">
            Your Learning Journey
          </h2>
          <p className="text-slate-400 text-base md:text-lg max-w-2xl mx-auto mt-3 font-light leading-relaxed">
            From initial onboarding to top tier corporate alignment, here is how we systematically upskill and launch our candidates into Fortune 500 careers.
          </p>
        </div>

        {/* Timeline Grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Side: Step Interactive Selector with progress indicator */}
          <div className="lg:col-span-5 flex flex-col space-y-4">
            {journeySteps.map((step, idx) => {
              const StepIcon = icons[idx % icons.length];
              const isSelected = activeStep === idx;

              return (
                <div
                  key={step.id}
                  onClick={() => setActiveStep(idx)}
                  className={`group p-5 rounded-2xl border transition-all duration-300 cursor-pointer flex items-center space-x-4 ${
                    isSelected
                      ? 'bg-gradient-to-r from-blue-600/25 to-cyan-500/10 border-cyan-500/30 shadow-[0_10px_30px_rgba(6,182,212,0.1)]'
                      : 'bg-white/5 border-white/5 hover:border-white/15'
                  }`}
                >
                  <div className={`p-3 rounded-xl border transition-all ${
                    isSelected
                      ? 'bg-cyan-500/20 border-cyan-400/30 text-cyan-400'
                      : 'bg-white/5 border-white/10 text-slate-400 group-hover:text-white'
                  }`}>
                    <StepIcon className="w-5 h-5" />
                  </div>

                  <div className="text-left">
                    <h3 className={`text-sm font-bold uppercase tracking-wider ${
                      isSelected ? 'text-cyan-300' : 'text-slate-400 group-hover:text-slate-200'
                    }`}>
                      {step.title}
                    </h3>
                    <p className={`text-xs mt-1 ${
                      isSelected ? 'text-slate-300 font-medium' : 'text-slate-500'
                    }`}>
                      Click to inspect milestones
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Side: High Fidelity Feature Card with details */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-12 rounded-[2.5rem] bg-slate-900/60 backdrop-blur-md border border-white/10 shadow-2xl relative overflow-hidden">
              
              {/* Background circular highlight */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none"></div>

              {/* Top Meta tag */}
              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-mono font-bold tracking-widest text-cyan-400 uppercase">
                  Active Milestone {activeStep + 1} of {journeySteps.length}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              </div>

              {/* Title & Description of highlighted step */}
              <h3 className="text-2xl sm:text-3xl font-heading font-extrabold text-white mt-4 leading-tight">
                {journeySteps[activeStep].title}
              </h3>
              
              <p className="text-slate-300 text-base sm:text-lg font-light leading-relaxed mt-4">
                {journeySteps[activeStep].description}
              </p>

              {/* Deep Details box */}
              <div className="mt-8 p-6 bg-white/5 rounded-2xl border border-white/5 flex items-start space-x-4">
                <div className="p-2.5 bg-blue-500/20 text-blue-400 rounded-lg shrink-0 mt-0.5">
                  <Sparkles className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider">Milestone Deliverable</h4>
                  <p className="text-xs sm:text-sm text-slate-400 mt-1 leading-relaxed">
                    {journeySteps[activeStep].details}
                  </p>
                </div>
              </div>

              {/* Interactive Slide indicator */}
              <div className="mt-10 flex items-center justify-between">
                <div className="flex space-x-1.5">
                  {journeySteps.map((_, idx) => (
                    <div
                      key={idx}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        activeStep === idx ? 'w-8 bg-gradient-to-r from-blue-500 to-cyan-400' : 'w-2 bg-white/10'
                      }`}
                    />
                  ))}
                </div>

                <button
                  onClick={() => setActiveStep((prev) => (prev + 1) % journeySteps.length)}
                  className="px-5 py-2.5 bg-white/5 hover:bg-white/10 text-white font-button text-xs font-bold rounded-xl transition-all duration-300 border border-white/5 flex items-center space-x-1.5"
                >
                  <span>Next Milestone</span>
                  <ChevronRight className="w-4 h-4 text-cyan-400" />
                </button>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
