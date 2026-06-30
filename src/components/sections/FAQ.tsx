/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { FAQS } from "../../data";
import { FAQ } from "../../types";
import { ChevronDown, MessageSquareCode, HelpCircle } from "lucide-react";

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
                href="https://wa.me/919999999999?text=Hello%20BIL,%20I'm%20looking%20for%20admissions%20support."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-button text-xs font-bold text-primary hover:text-primary-dark transition-colors cursor-pointer"
              >
                Chat with Admissions <ChevronDown className="h-3 w-3 -rotate-90" />
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
