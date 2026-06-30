import React, { useState } from 'react';
import { HelpCircle, ChevronDown, Phone, MessageCircle, ShieldCheck, Cloud, Award } from 'lucide-react';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export default function FAQSection() {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggleFAQ = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  const faqItems: FAQItem[] = [
    {
      id: "faq-experience",
      question: "Do I need prior experience for SAP courses?",
      answer: "No prior technical or coding experience is required. While a basic understanding of business processes or accounting is helpful, our curriculum starts from the absolute fundamentals and builds up to advanced S/4 HANA configuration."
    },
    {
      id: "faq-mode",
      question: "Are the courses online or offline?",
      answer: "We offer flexible learning modes: both interactive live online classrooms and immersive, hands-on offline sessions at our state-of-the-art laboratory facility. Both options include full access to our active SAP cloud sandboxes."
    },
    {
      id: "faq-certificate",
      question: "Will I get a certificate after completing the course?",
      answer: "Yes, you will receive an official Course Completion Certificate from our institute, recognized by our elite corporate partners. Additionally, we provide complete, guided preparation and support for global SAP and Microsoft associate-level certification exams."
    },
    {
      id: "faq-placement",
      question: "Do you provide placement assistance?",
      answer: "Absolutely. We provide comprehensive placement acceleration benefits, including resume workshops, targeted portfolio reviews, mock technical interviews, and direct referral opportunities with leading consulting firms and multinational corporations in our network."
    },
    {
      id: "faq-fee",
      question: "What is the course fee?",
      answer: "Our training programs feature transparent, module-specific pricing depending on the curriculum (SAP, Analytics, or Taxation) and track depth. Please connect with our admissions desk via WhatsApp or Call for detailed fee structures, seasonal offers, and EMI options."
    },
    {
      id: "faq-enroll",
      question: "How do I enroll?",
      answer: "Enrolling is simple. You can submit your application via our online contact form, call our registrar office directly, or reach out to our team on WhatsApp. We will schedule a free, 1-on-1 career mapping consultation to help align your profile with the correct track."
    }
  ];

  return (
    <section id="faq" className="py-24 bg-[#0F172A] relative overflow-hidden border-t border-white/5">
      {/* Background decoration */}
      <div className="absolute top-[30%] right-[-15%] w-[60%] h-[60%] bg-blue-600/5 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-[10%] left-[-10%] w-[45%] h-[45%] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header section */}
        <div className="text-center mb-16 animate-fade-in">
          <span className="text-xs font-mono tracking-[0.25em] text-cyan-400 uppercase font-bold bg-cyan-500/10 px-3.5 py-1.5 rounded-md border border-cyan-500/20">
            Frequently Asked Questions
          </span>
          <h2 className="text-3xl md:text-5xl font-heading font-extrabold text-white mt-4">
            Admissions & Course FAQ
          </h2>
          <p className="text-slate-400 text-base max-w-2xl mx-auto mt-4 font-light leading-relaxed">
            Get clear, comprehensive answers regarding our corporate training workflows, certifications, and support systems.
          </p>
        </div>

        {/* Centered column for FAQ accordions */}
        <div className="max-w-4xl mx-auto space-y-4">
          {faqItems.map((faq) => {
            const isOpen = openId === faq.id;

            return (
              <div
                key={faq.id}
                id={`faq-card-${faq.id}`}
                className={`group p-5 sm:p-6 rounded-2xl bg-slate-900/40 border transition-all duration-300 cursor-pointer ${
                  isOpen 
                    ? "border-cyan-500/40 bg-slate-900/80 shadow-[0_10px_30px_-10px_rgba(6,182,212,0.15)]" 
                    : "border-white/5 hover:border-cyan-500/20 hover:bg-slate-900/60"
                }`}
                onClick={() => toggleFAQ(faq.id)}
              >
                {/* Accordion Trigger */}
                <div className="flex items-center justify-between text-left select-none">
                  <div className="flex items-center space-x-4 pr-4">
                    <div className={`p-2 rounded-xl transition-all duration-300 ${
                      isOpen ? "bg-cyan-500/15 text-cyan-400" : "bg-white/5 text-slate-400 group-hover:bg-white/10 group-hover:text-cyan-400"
                    }`}>
                      <HelpCircle className="w-5 h-5 shrink-0" />
                    </div>
                    <span className={`text-base font-bold transition-colors leading-snug ${
                      isOpen ? "text-cyan-400" : "text-white group-hover:text-cyan-300"
                    }`}>
                      {faq.question}
                    </span>
                  </div>
                  <div className={`p-1.5 rounded-lg border transition-all shrink-0 ${
                    isOpen 
                      ? "bg-cyan-500/10 border-cyan-500/30 text-cyan-400 rotate-180" 
                      : "bg-white/5 border-white/5 text-slate-400 group-hover:text-white group-hover:border-white/10"
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </div>

                {/* Accordion Content with smooth height and opacity transitions */}
                <div
                  className={`grid transition-all duration-300 ease-in-out text-left overflow-hidden ${
                    isOpen ? 'grid-rows-[1fr] opacity-100 mt-4' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="text-sm text-slate-300 font-light leading-relaxed border-t border-white/5 pt-4">
                      {faq.answer}
                    </p>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Beautiful Still Have Questions Banner at the bottom */}
        <div id="faq-still-banner" className="max-w-4xl mx-auto mt-16 p-8 rounded-3xl bg-slate-900/40 border border-white/5 relative overflow-hidden shadow-xl shadow-slate-950/25 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          {/* Subtle decoration */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="relative z-10 space-y-2 max-w-md">
            <h3 id="faq-still-title" className="text-2xl font-heading font-extrabold text-white">
              Still have questions?
            </h3>
            <p className="text-sm text-slate-400 font-light leading-relaxed">
              Our admissions team is available Monday–Saturday, 9 AM–6 PM IST to assist you.
            </p>
          </div>

          <div className="relative z-10 flex flex-col sm:flex-row gap-4 w-full md:w-auto shrink-0">
            {/* WhatsApp Action Button */}
            <a
              id="faq-whatsapp-btn"
              href="https://wa.me/919480020875"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2.5 py-3.5 px-6 bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-semibold text-sm rounded-2xl transition-all duration-300 shadow-lg shadow-emerald-500/10 hover:shadow-emerald-500/25 hover:-translate-y-0.5 cursor-pointer"
            >
              <MessageCircle className="w-5 h-5 shrink-0" />
              <span>Ask on WhatsApp</span>
            </a>

            {/* Direct Phone Call Button */}
            <a
              id="faq-call-btn"
              href="tel:+919480020875"
              className="flex items-center justify-center gap-2.5 py-3.5 px-6 bg-white/5 hover:bg-white/10 text-slate-200 hover:text-white font-semibold text-sm rounded-2xl border border-white/5 hover:border-white/10 transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
            >
              <Phone className="w-4 h-4 shrink-0" />
              <span>Call +91 94800 20875</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
