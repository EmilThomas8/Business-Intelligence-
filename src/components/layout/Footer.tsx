import React from "react";
import { GraduationCap, MapPin, Phone, Mail, Clock, MessageSquare, ShieldCheck, Linkedin, Twitter, Youtube, Instagram } from "lucide-react";

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer
      id="footer-main"
      className="bg-[#0B0F19] text-slate-400 font-sans border-t border-white/5 pt-20 pb-10 text-left relative overflow-hidden"
    >
      {/* Background glow lines */}
      <div className="absolute bottom-0 left-0 w-[30%] h-[50%] bg-blue-600/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Main 3-column Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-white/5">
          
          {/* Column 1: Brand Info & Contact Details (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <button
              id="footer-logo-btn"
              onClick={() => onNavigate("hero")}
              className="flex items-center gap-2.5 group focus:outline-none cursor-pointer text-left"
            >
              <div className="bg-gradient-to-br from-blue-600 to-cyan-500 text-white p-2 rounded-xl flex items-center justify-center">
                <GraduationCap className="h-6 w-6" />
              </div>
              <div>
                <div className="flex items-center gap-1.5 leading-none">
                  <span className="font-heading font-extrabold text-xl text-white tracking-tight">
                    Business Intelligence Lab
                  </span>
                  <span className="bg-cyan-500/10 text-cyan-400 text-[9px] font-mono font-bold px-1 rounded border border-cyan-500/20">
                    PRO
                  </span>
                </div>
                <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-widest leading-none mt-1 block">
                  Where Expertise Meets Excellence.
                </span>
              </div>
            </button>

            <p className="text-sm text-slate-400 leading-relaxed font-light">
              Business Intelligence Lab (BIL) is a professional training institute based in Mangalore, Karnataka, specializing in SAP ERP, Business Analytics, Excel, Power BI, and Taxation courses.
            </p>

            {/* Direct Contact details */}
            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3 text-xs sm:text-sm">
                <MapPin className="h-4 w-4 text-cyan-400 shrink-0 mt-1" />
                <span className="text-slate-300 font-light">
                  3rd Floor, Lotus Paradise Centre, Karangalpady, Mangalore – 575002, Karnataka, India
                </span>
              </div>

              <div className="flex items-center gap-3 text-xs sm:text-sm">
                <Phone className="h-4 w-4 text-cyan-400 shrink-0" />
                <a href="tel:+919480020875" className="text-slate-300 hover:text-white transition-colors font-light">
                  +91 94800 20875
                </a>
              </div>

              <div className="flex items-center gap-3 text-xs sm:text-sm">
                <Mail className="h-4 w-4 text-cyan-400 shrink-0" />
                <a href="mailto:businessintelligencelab7@gmail.com" className="text-slate-300 hover:text-white transition-colors font-light">
                  businessintelligencelab7@gmail.com
                </a>
              </div>

              <div className="flex items-center gap-3 text-xs sm:text-sm">
                <Clock className="h-4 w-4 text-cyan-400 shrink-0" />
                <span className="text-slate-300 font-light">
                  Monday to Saturday, 9:00 AM – 6:00 PM IST
                </span>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links (3 cols) */}
          <div className="lg:col-span-3 lg:pl-8 space-y-4">
            <h4 className="font-heading font-bold text-white text-sm uppercase tracking-widest">
              Quick Links
            </h4>
            <ul className="space-y-3 text-xs sm:text-sm">
              <li>
                <button
                  onClick={() => onNavigate("hero")}
                  className="text-slate-400 hover:text-cyan-400 transition-colors cursor-pointer block text-left"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("courses")}
                  className="text-slate-400 hover:text-cyan-400 transition-colors cursor-pointer block text-left"
                >
                  Courses
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("contact")}
                  className="text-slate-400 hover:text-cyan-400 transition-colors cursor-pointer block text-left"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Get in Touch & Actions (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="font-heading font-bold text-white text-sm uppercase tracking-widest">
              Get in Touch
            </h4>
            
            {/* WhatsApp Chat Button */}
            <div className="space-y-2">
              <a
                id="footer-whatsapp-btn"
                href="https://wa.me/919480020875"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 py-3 px-5 bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-semibold text-xs sm:text-sm rounded-xl transition-all duration-300 shadow-md shadow-emerald-500/10 hover:-translate-y-0.5 cursor-pointer w-full justify-center sm:w-auto"
              >
                <MessageSquare className="h-4 w-4 shrink-0" />
                <span>Chat on WhatsApp</span>
              </a>
              <p className="text-xs text-slate-500 font-light italic pl-1">
                We typically reply within a few hours.
              </p>
            </div>

            {/* Verification and Trust badges */}
            <div className="pt-4 flex flex-col gap-2.5">
              <div className="flex items-center gap-1.5 text-[10px] text-slate-500 font-semibold uppercase tracking-wider">
                <ShieldCheck className="h-4 w-4 text-cyan-400" />
                <span>Authorized SAP Sandbox Partner</span>
              </div>
              
              {/* Social Media accounts fallback */}
              <div className="flex items-center gap-3 pt-2">
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-slate-900/80 hover:bg-blue-600 hover:text-white rounded-lg border border-white/5 transition-all cursor-pointer text-slate-400"
                  title="LinkedIn"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
                <a
                  href="https://www.instagram.com/businessintelligencelab?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-slate-900/80 hover:bg-pink-600 hover:text-white rounded-lg border border-white/5 transition-all cursor-pointer text-slate-400"
                  title="Instagram"
                >
                  <Instagram className="h-4 w-4" />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-slate-900/80 hover:bg-cyan-500 hover:text-white rounded-lg border border-white/5 transition-all cursor-pointer text-slate-400"
                  title="Twitter"
                >
                  <Twitter className="h-4 w-4" />
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-slate-900/80 hover:bg-red-600 hover:text-white rounded-lg border border-white/5 transition-all cursor-pointer text-slate-400"
                  title="YouTube"
                >
                  <Youtube className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Footer legal copyright bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p className="text-slate-500">
            © {new Date().getFullYear()} Business Intelligence Lab. All corporate rights reserved.
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-slate-500">
            <button onClick={() => onNavigate("faq")} className="hover:text-slate-300 cursor-pointer">
              Privacy Policy
            </button>
            <button onClick={() => onNavigate("faq")} className="hover:text-slate-300 cursor-pointer">
              Terms of Service
            </button>
            <button onClick={() => onNavigate("contact")} className="hover:text-slate-300 cursor-pointer">
              Support Center
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
