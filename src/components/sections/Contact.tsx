/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MapPin, Phone, Mail, Clock, Send, ShieldCheck, CheckCircle2, MessageSquare, ExternalLink } from "lucide-react";
import { courses } from "../../data/instituteData";

interface ContactProps {
  prefilledCourse: string;
  prefilledComments?: string;
}

export default function Contact({ prefilledCourse, prefilledComments }: ContactProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    course: "",
    comments: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submittedUrls, setSubmittedUrls] = useState<{ whatsapp: string; gmail: string; mailto: string } | null>(null);

  // Sync prefilled course when user clicks Inquiry from program lists
  useEffect(() => {
    if (prefilledCourse) {
      const matched = courses.find(
        (c) =>
          c.title.toLowerCase().includes(prefilledCourse.toLowerCase()) ||
          c.id.toLowerCase().includes(prefilledCourse.toLowerCase()) ||
          (c.subtitle && c.subtitle.toLowerCase().includes(prefilledCourse.toLowerCase()))
      );
      if (matched) {
        setFormData((prev) => ({ ...prev, course: matched.title }));
      }
    }
  }, [prefilledCourse]);

  // Sync prefilled comments when user wants to learn more about a service
  useEffect(() => {
    if (prefilledComments) {
      setFormData((prev) => ({ ...prev, comments: prefilledComments }));
    }
  }, [prefilledComments]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) return;

    setIsSubmitting(true);

    const subject = `Inquiry: ${formData.course || "General Up-skilling"} - ${formData.name}`;
    const body = `Hello Business Intelligence Lab,

I would like to inquire about the ${formData.course || "General Up-skilling"} program.

My Details:
- Name: ${formData.name}
- Email: ${formData.email}
- Phone: ${formData.phone}
- Target Program: ${formData.course || "Not specified"}
- Specific Inquiries / Goals: ${formData.comments || "None specified"}

Sincerely,
${formData.name}`;

    const whatsappText = `Hello Business Intelligence Lab, I would like to submit an upskilling inquiry:
- Name: ${formData.name}
- Email: ${formData.email}
- Phone: ${formData.phone}
- Program: ${formData.course || "Not specified"}
- Specific Inquiries: ${formData.comments || "None specified"}`;

    const whatsappUrl = `https://wa.me/919480020875?text=${encodeURIComponent(whatsappText)}`;
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=businessintelligencelab7@gmail.com&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    const mailtoUrl = `mailto:businessintelligencelab7@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    setSubmittedUrls({
      whatsapp: whatsappUrl,
      gmail: gmailUrl,
      mailto: mailtoUrl
    });

    // 1. Immediately trigger the WhatsApp launcher and email composer to prevent popup blocker!
    // Since these are initiated synchronously inside the submit event handler, they bypass standard browser popup blocks.
    
    // Open WhatsApp in a new tab
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    
    // Open Gmail web composer in a new tab
    const gmailOpened = window.open(gmailUrl, "_blank", "noopener,noreferrer");
    
    // Fallback: If Gmail window was blocked, trigger standard mailto on the current page context
    if (!gmailOpened) {
      setTimeout(() => {
        window.location.href = mailtoUrl;
      }, 100);
    }

    // 2. Dispatch server-side email request in the background (non-blocking for UI)
    fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        course: formData.course || "General Up-skilling",
        comments: formData.comments,
      }),
    })
      .then((res) => res.json())
      .catch((err) => console.error("[Contact API Dispatch Error]:", err))
      .finally(() => {
        setIsSubmitting(false);
        setSubmitSuccess(true);
      });
  };

  return (
    <section
      id="contact"
      className="py-24 bg-[#0B0F19] relative overflow-hidden border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Left Column: Office Address, Map Canvas & Details */}
          <div className="lg:col-span-5 text-left flex flex-col justify-between space-y-8">
            <div className="space-y-4">
              <span className="text-xs uppercase tracking-widest text-cyan-400 font-bold bg-cyan-500/10 border border-cyan-500/20 px-3.5 py-1.5 rounded-full">
                Contact Office
              </span>
              <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight">
                Connect with Admissions
              </h2>
              <p className="font-sans text-slate-400 text-sm sm:text-base leading-relaxed font-light">
                Reach out to reserve your server credentials, coordinate custom group schedules, or audit a trial SAP/Power BI cohort session.
              </p>
            </div>

            {/* Address Blocks */}
            <div className="space-y-5">
              <div className="flex items-start gap-3.5">
                <div className="p-3 bg-slate-900/60 border border-white/5 rounded-xl text-cyan-400 shadow-sm flex-shrink-0">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono font-bold text-slate-400 block uppercase tracking-wider">Office Location</span>
                  <p className="text-white font-semibold text-sm">
                    3rd Floor, Lotus Paradise Centre
                  </p>
                  <p className="text-slate-400 text-xs">Karangalpady, Mangalore – 575002, Karnataka, India</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="p-3 bg-slate-900/60 border border-white/5 rounded-xl text-cyan-400 shadow-sm flex-shrink-0">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono font-bold text-slate-400 block uppercase tracking-wider">Admissions Hotline</span>
                  <p className="text-white font-semibold text-sm">
                    +91 94800 20875
                  </p>
                  <p className="text-slate-400 text-xs">Monday to Saturday, 9:00 AM – 6:00 PM IST</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="p-3 bg-slate-900/60 border border-white/5 rounded-xl text-cyan-400 shadow-sm flex-shrink-0">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono font-bold text-slate-400 block uppercase tracking-wider">Official Email</span>
                  <p className="text-white font-semibold text-sm">
                    businessintelligencelab7@gmail.com
                  </p>
                  <p className="text-slate-400 text-xs">General and corporate training inquiries</p>
                </div>
              </div>
            </div>

            {/* Interactive Google Map iframe embedded elegantly inside clean border card */}
            <div className="w-full h-56 rounded-2xl overflow-hidden border border-white/5 shadow-md">
              <iframe
                title="Business Intelligence Lab Location Map"
                src="https://maps.google.com/maps?q=Lotus%20Paradise%20Centre,%20Karangalpady,%20Mangalore%20-%20575002&t=&z=15&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full border-0 filter grayscale invert contrast-[0.9]"
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Right Column: Premium Inquiry Glass Form */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-slate-900/40 border border-white/5 shadow-xl rounded-2xl p-6 sm:p-10 relative text-left"
            >
              <div className="flex items-center justify-between pb-4 border-b border-white/5 mb-6">
                <div>
                  <h3 className="font-heading font-extrabold text-lg sm:text-xl text-white">
                    Upskilling Inquiry Console
                  </h3>
                  <p className="text-xs text-slate-400 font-sans mt-0.5">Secure, authenticated data transmission channel</p>
                </div>
                <span className="bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-[10px] font-mono px-2 py-0.5 rounded flex items-center gap-1.5 font-bold">
                  <ShieldCheck className="h-4 w-4 text-cyan-400" /> SECURED
                </span>
              </div>

              {submitSuccess && submittedUrls ? (
                <div className="py-6 flex flex-col items-center text-center space-y-5">
                  <div className="p-4 bg-emerald-500/10 text-emerald-400 rounded-full border border-emerald-500/20">
                    <CheckCircle2 className="h-10 w-10 animate-pulse text-emerald-400" />
                  </div>
                  <div className="space-y-1.5">
                    <h4 className="font-heading font-extrabold text-xl text-white">Inquiry Transmitted!</h4>
                    <p className="text-slate-300 text-sm max-w-sm font-light leading-relaxed">
                      We have processed your upskilling inquiry on the portal backend and initiated the WhatsApp and email launchers. If they didn't trigger automatically, please click below:
                    </p>
                  </div>

                  <div className="w-full space-y-3 pt-1">
                    {/* Send via WhatsApp Button */}
                    <a
                      href={submittedUrls.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full font-button bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 shadow-lg hover:shadow-[#25D366]/20 transition-all duration-300 text-sm cursor-pointer"
                    >
                      <MessageSquare className="h-4.5 w-4.5" />
                      <span>1. Submit via WhatsApp</span>
                      <ExternalLink className="h-3.5 w-3.5 ml-1 opacity-70" />
                    </a>

                    {/* Send via Gmail Web Button */}
                    <a
                      href={submittedUrls.gmail}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full font-button bg-[#EA4335] hover:bg-[#d93025] text-white font-bold py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 shadow-lg hover:shadow-[#EA4335]/20 transition-all duration-300 text-sm cursor-pointer"
                    >
                      <Mail className="h-4.5 w-4.5" />
                      <span>2. Submit via Gmail Web</span>
                      <ExternalLink className="h-3.5 w-3.5 ml-1 opacity-70" />
                    </a>

                    {/* Send via local Mail client */}
                    <a
                      href={submittedUrls.mailto}
                      className="w-full font-button bg-slate-800/80 hover:bg-slate-800 border border-white/10 text-slate-300 hover:text-white font-semibold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 text-xs cursor-pointer"
                    >
                      <Mail className="h-4 w-4" />
                      <span>Alternative: Send via Default Mail App</span>
                    </a>
                  </div>

                  <button
                    onClick={() => {
                      setSubmitSuccess(false);
                      setSubmittedUrls(null);
                      setFormData({ name: "", email: "", phone: "", course: "", comments: "" });
                    }}
                    className="text-xs text-cyan-400 hover:text-cyan-300 underline transition-colors cursor-pointer pt-3 font-semibold"
                  >
                    Send Another Inquiry / Reset Form
                  </button>
                </div>
              ) : (
                <form id="enroll-inquiry-form" onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Full Name */}
                    <div className="space-y-1.5">
                      <label htmlFor="fullname" className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider block">
                        Full Name *
                      </label>
                      <input
                        id="fullname"
                        type="text"
                        required
                        placeholder="e.g. John"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-slate-950/40 hover:bg-slate-950/60 focus:bg-slate-950/80 border border-white/10 focus:border-cyan-500/50 text-white px-4 py-3 rounded-xl text-sm transition-all focus:outline-none focus:ring-1 focus:ring-cyan-500/20"
                      />
                    </div>

                    {/* Email address */}
                    <div className="space-y-1.5">
                      <label htmlFor="email" className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider block">
                        Email *
                      </label>
                      <input
                        id="email"
                        type="email"
                        required
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-slate-950/40 hover:bg-slate-950/60 focus:bg-slate-950/80 border border-white/10 focus:border-cyan-500/50 text-white px-4 py-3 rounded-xl text-sm transition-all focus:outline-none focus:ring-1 focus:ring-cyan-500/20"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Phone Number */}
                    <div className="space-y-1.5">
                      <label htmlFor="phone" className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider block">
                        Mobile Number (WhatsApp preferred) *
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        required
                        placeholder="+91 99999 00000"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-slate-950/40 hover:bg-slate-950/60 focus:bg-slate-950/80 border border-white/10 focus:border-cyan-500/50 text-white px-4 py-3 rounded-xl text-sm transition-all focus:outline-none focus:ring-1 focus:ring-cyan-500/20"
                      />
                    </div>

                    {/* Track selection */}
                    <div className="space-y-1.5">
                      <label htmlFor="track" className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider block">
                        Select Program *
                      </label>
                      <select
                        id="track"
                        required
                        value={formData.course}
                        onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                        className="w-full bg-slate-950/40 hover:bg-slate-950/60 focus:bg-slate-950/80 border border-white/10 focus:border-cyan-500/50 text-white px-4 py-3 rounded-xl text-sm transition-all focus:outline-none focus:ring-1 focus:ring-cyan-500/20 cursor-pointer"
                      >
                        <option value="" className="bg-slate-900">Select a Program</option>
                        {courses.map((c) => (
                          <option key={c.id} value={c.title} className="bg-slate-900">
                            {c.title} {c.subtitle ? `(${c.subtitle})` : ""}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Comments */}
                  <div className="space-y-1.5">
                    <label htmlFor="comments" className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider block">
                      Specific Inquiries / Goals
                    </label>
                    <textarea
                      id="comments"
                      rows={3}
                      placeholder="e.g. Interested in weekday schedules / live sandbox server details."
                      value={formData.comments}
                      onChange={(e) => setFormData({ ...formData, comments: e.target.value })}
                      className="w-full bg-slate-950/40 hover:bg-slate-950/60 focus:bg-slate-950/80 border border-white/10 focus:border-cyan-500/50 text-white px-4 py-3 rounded-xl text-sm transition-all focus:outline-none focus:ring-1 focus:ring-cyan-500/20"
                    />
                  </div>

                  {/* Submission triggers */}
                  <button
                    id="submit-inquiry-btn"
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full font-button bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-blue-500/10 hover:shadow-cyan-500/30 transition-all duration-300 disabled:opacity-50 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="h-5 w-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                        Transmitting Inquiry...
                      </>
                    ) : (
                      <>
                        Submit Inquiry
                        <Send className="h-4.5 w-4.5" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
