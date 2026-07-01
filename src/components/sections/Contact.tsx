/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MapPin, Phone, Mail, Clock, Send, ShieldCheck, CheckCircle2 } from "lucide-react";

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

  // Sync prefilled course when user clicks Inquiry from program lists
  useEffect(() => {
    if (prefilledCourse) {
      const courseLower = prefilledCourse.toLowerCase();
      let matchedVal = "";
      if (courseLower.includes("sap") || courseLower.includes("fico")) {
        matchedVal = "SAP S/4HANA Finance";
      } else if (courseLower.includes("power") || courseLower.includes("intelligence") || courseLower.includes("bi")) {
        matchedVal = "Executive Business Intelligence";
      } else if (courseLower.includes("gst") || courseLower.includes("tax")) {
        matchedVal = "Certified Corporate GST Practitioner";
      } else if (courseLower.includes("accounting") || courseLower.includes("erp")) {
        matchedVal = "Financial Accounting";
      } else if (courseLower.includes("analytics") || courseLower.includes("sql")) {
        matchedVal = "Enterprise Analytics";
      }

      if (matchedVal) {
        setFormData((prev) => ({ ...prev, course: matchedVal }));
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

    // Open WhatsApp
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");

    // Open Gmail web client in another tab
    setTimeout(() => {
      window.open(gmailUrl, "_blank", "noopener,noreferrer");
    }, 350);

    setIsSubmitting(false);
    setSubmitSuccess(true);

    // Reset after success window
    setTimeout(() => {
      setSubmitSuccess(false);
      setFormData({ name: "", email: "", phone: "", course: "", comments: "" });
    }, 5000);
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

              {submitSuccess ? (
                <div className="py-12 flex flex-col items-center text-center space-y-4">
                  <div className="p-4 bg-emerald-500/10 text-emerald-400 rounded-full border border-emerald-500/20">
                    <CheckCircle2 className="h-10 w-10" />
                  </div>
                  <h4 className="font-heading font-extrabold text-xl text-white">Inquiry Transmitted Successfully</h4>
                  <p className="text-slate-300 text-sm max-w-sm font-light">
                    Thank you. Your request is queued. An admissions advisor will connect with you via WhatsApp/Email within 2 business hours.
                  </p>
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
                        placeholder="e.g. Rahul Verma"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-slate-950/40 hover:bg-slate-950/60 focus:bg-slate-950/80 border border-white/10 focus:border-cyan-500/50 text-white px-4 py-3 rounded-xl text-sm transition-all focus:outline-none focus:ring-1 focus:ring-cyan-500/20"
                      />
                    </div>

                    {/* Email address */}
                    <div className="space-y-1.5">
                      <label htmlFor="email" className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider block">
                        Corporate Email *
                      </label>
                      <input
                        id="email"
                        type="email"
                        required
                        placeholder="rahul@enterprise.com"
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
                        Upskilling Target Program *
                      </label>
                      <select
                        id="track"
                        required
                        value={formData.course}
                        onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                        className="w-full bg-slate-950/40 hover:bg-slate-950/60 focus:bg-slate-950/80 border border-white/10 focus:border-cyan-500/50 text-white px-4 py-3 rounded-xl text-sm transition-all focus:outline-none focus:ring-1 focus:ring-cyan-500/20 cursor-pointer"
                      >
                        <option value="" className="bg-slate-900">Select a Program</option>
                        <option value="SAP S/4HANA Finance" className="bg-slate-900">SAP S/4HANA Finance (FICO)</option>
                        <option value="Executive Business Intelligence" className="bg-slate-900">Power BI Business Intelligence</option>
                        <option value="Certified Corporate GST Practitioner" className="bg-slate-900">Certified GST Practitioner</option>
                        <option value="Financial Accounting" className="bg-slate-900">Financial Accounting Masterclass</option>
                        <option value="Enterprise Analytics" className="bg-slate-900">Enterprise Analytics & SQL</option>
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
