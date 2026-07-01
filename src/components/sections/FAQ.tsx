/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { FAQS } from "../../data";
import { FAQ } from "../../types";
import { ChevronDown, HelpCircle } from "lucide-react";

const WhatsAppIcon = ({ className = "h-4 w-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.517 2.266 2.27 3.51 5.276 3.508 8.48-.005 6.66-5.342 11.997-11.953 11.997-2.005-.001-3.973-.503-5.714-1.458L0 24zm6.59-4.846c1.6.95 3.16 1.449 4.795 1.451 5.429.002 9.841-4.408 9.845-9.842.002-2.632-1.02-5.105-2.881-6.967-1.861-1.862-4.333-2.883-6.969-2.884-5.432 0-9.843 4.408-9.847 9.843-.001 1.73.457 3.417 1.325 4.904l-.994 3.63 3.727-.977zm11.452-4.664c-.31-.156-1.838-.907-2.122-1.01-.284-.103-.49-.156-.696.156-.206.31-.8.1-.986 1.185-.186.206-.372.232-.682.077-.31-.156-1.31-.483-2.495-1.54-1.222-1.09-2.046-2.436-2.285-2.848-.239-.412-.025-.634.18-.84.184-.184.412-.482.62-.722.206-.24.275-.412.412-.687.137-.275.069-.515-.034-.721-.103-.206-.8-1.928-1.097-2.65-.289-.696-.582-.601-.8-.612-.206-.01-.44-.011-.673-.011-.232 0-.61.087-.93.435-.32.348-1.22 1.192-1.22 2.91 0 1.718 1.248 3.377 1.42 3.606.173.23 2.457 3.75 5.952 5.263.832.36 1.482.576 1.99.737.836.265 1.597.227 2.197.138.67-.1 1.838-.75 2.095-1.44.258-.69.258-1.28.18-1.4-.078-.12-.284-.206-.593-.362z" />
  </svg>
);

export default function FAQSection() {
  const [openId, setOpenId] = useState<string | null>("faq1"); // default first open

  const toggleFAQ = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section
      id="faq"
      className="py-24 bg-white relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Side Info Grid */}
          <div className="lg:col-span-5 text-left space-y-5">
            <span className="text-xs uppercase tracking-widest text-primary font-bold bg-blue-50 border border-blue-100 px-3.5 py-1.5 rounded-full">
              Help Center
            </span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-slate-900 tracking-tight leading-tight">
              Frequently Asked Questions
            </h2>
            <p className="font-sans text-slate-500 text-base leading-relaxed">
              Have specific questions about server sandboxes, timing, credentials, or corporate partnerships? Read our verified guidelines here.
            </p>
            <div className="p-5.5 rounded-2xl bg-slate-50 border border-slate-200/50 space-y-3.5">
              <div className="flex items-center gap-2.5 text-slate-800 font-bold text-sm">
                <HelpCircle className="h-5 w-5 text-primary" />
                <span>Need Direct Consulting?</span>
              </div>
              <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                Connect with our admissions office to schedule a personal upskilling consultation or a live guided demo of our SAP environments.
              </p>
              <a
                id="faq-chat-admissions"
                href="https://wa.me/919480020875"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-button text-xs font-bold text-emerald-600 hover:text-emerald-700 transition-colors cursor-pointer"
              >
                <WhatsAppIcon className="h-4 w-4 shrink-0 text-emerald-500 fill-emerald-500/10" />
                <span>Chat with Admissions</span>
                <ChevronDown className="h-3 w-3 -rotate-90 text-slate-400" />
              </a>
            </div>
          </div>

          {/* Right Side Accordions */}
          <div className="lg:col-span-7 space-y-4">
            {FAQS.map((faq: FAQ, index: number) => {
              const isOpen = openId === faq.id;
              return (
                <motion.div
                  key={faq.id}
                  id={`faq-item-${faq.id}`}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="bg-slate-50 border border-slate-200/60 hover:border-blue-300/40 rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer"
                >
                  <button
                    id={`faq-toggle-${faq.id}`}
                    onClick={() => toggleFAQ(faq.id)}
                    className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 focus:outline-none focus:ring-1 focus:ring-primary/20 rounded-t-2xl"
                  >
                    <span className="font-heading font-bold text-slate-800 text-sm sm:text-base hover:text-slate-900 transition-colors">
                      {faq.question}
                    </span>
                    <span className={`p-1 bg-white rounded-lg border border-slate-200 text-slate-500 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}>
                      <ChevronDown className="h-4 w-4" />
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`faq-content-${faq.id}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                      >
                        <div className="px-6 pb-6 pt-1 text-slate-600 font-sans text-xs sm:text-sm leading-relaxed text-left border-t border-slate-100/50 bg-white/40">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
