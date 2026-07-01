import React, { useState } from 'react';
import { HelpCircle, ChevronDown, Phone, ShieldCheck, Cloud, Award } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const WhatsAppIcon = ({ className = "h-5 w-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.517 2.266 2.27 3.51 5.276 3.508 8.48-.005 6.66-5.342 11.997-11.953 11.997-2.005-.001-3.973-.503-5.714-1.458L0 24zm6.59-4.846c1.6.95 3.16 1.449 4.795 1.451 5.429.002 9.841-4.408 9.845-9.842.002-2.632-1.02-5.105-2.881-6.967-1.861-1.862-4.333-2.883-6.969-2.884-5.432 0-9.843 4.408-9.847 9.843-.001 1.73.457 3.417 1.325 4.904l-.994 3.63 3.727-.977zm11.452-4.664c-.31-.156-1.838-.907-2.122-1.01-.284-.103-.49-.156-.696.156-.206.31-.8.1-.986 1.185-.186.206-.372.232-.682.077-.31-.156-1.31-.483-2.495-1.54-1.222-1.09-2.046-2.436-2.285-2.848-.239-.412-.025-.634.18-.84.184-.184.412-.482.62-.722.206-.24.275-.412.412-.687.137-.275.069-.515-.034-.721-.103-.206-.8-1.928-1.097-2.65-.289-.696-.582-.601-.8-.612-.206-.01-.44-.011-.673-.011-.232 0-.61.087-.93.435-.32.348-1.22 1.192-1.22 2.91 0 1.718 1.248 3.377 1.42 3.606.173.23 2.457 3.75 5.952 5.263.832.36 1.482.576 1.99.737.836.265 1.597.227 2.197.138.67-.1 1.838-.75 2.095-1.44.258-.69.258-1.28.18-1.4-.078-.12-.284-.206-.593-.362z" />
  </svg>
);


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
              <motion.div
                key={faq.id}
                id={`faq-card-${faq.id}`}
                layout="position"
                initial={false}
                animate={{
                  backgroundColor: isOpen ? "rgba(15, 23, 42, 0.8)" : "rgba(15, 23, 42, 0.4)",
                  borderColor: isOpen ? "rgba(6, 182, 212, 0.4)" : "rgba(255, 255, 255, 0.05)",
                }}
                whileHover={{
                  borderColor: isOpen ? "rgba(6, 182, 212, 0.4)" : "rgba(6, 182, 212, 0.2)",
                  backgroundColor: isOpen ? "rgba(15, 23, 42, 0.8)" : "rgba(15, 23, 42, 0.6)",
                }}
                transition={{ duration: 0.3 }}
                className={`group p-5 sm:p-6 rounded-2xl border cursor-pointer ${
                  isOpen ? "shadow-[0_10px_30px_-10px_rgba(6,182,212,0.15)]" : ""
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
                  <motion.div 
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className={`p-1.5 rounded-lg border shrink-0 ${
                      isOpen 
                        ? "bg-cyan-500/10 border-cyan-500/30 text-cyan-400" 
                        : "bg-white/5 border-white/5 text-slate-400 group-hover:text-white group-hover:border-white/10"
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </motion.div>
                </div>

                {/* Accordion Content with smooth height and opacity transitions */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden text-left"
                    >
                      <div className="pt-4 mt-4 border-t border-white/5">
                        <p className="text-sm text-slate-300 font-light leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </motion.div>
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
              className="flex items-center justify-center gap-2.5 py-3.5 px-6 bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-semibold text-sm rounded-2xl transition-all duration-300 shadow-lg shadow-emerald-500/10 hover:shadow-emerald-500/25 hover:-translate-y-0.5 cursor-pointer font-button"
            >
              <WhatsAppIcon className="w-5 h-5 shrink-0" />
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
