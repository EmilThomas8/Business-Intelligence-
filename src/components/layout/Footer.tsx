import React from "react";
import { MapPin, Phone, Mail, Clock, ShieldCheck, Linkedin, Twitter, Youtube, Instagram } from "lucide-react";
import Logo from "../common/Logo";

const WhatsAppIcon = ({ className = "h-5 w-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.517 2.266 2.27 3.51 5.276 3.508 8.48-.005 6.66-5.342 11.997-11.953 11.997-2.005-.001-3.973-.503-5.714-1.458L0 24zm6.59-4.846c1.6.95 3.16 1.449 4.795 1.451 5.429.002 9.841-4.408 9.845-9.842.002-2.632-1.02-5.105-2.881-6.967-1.861-1.862-4.333-2.883-6.969-2.884-5.432 0-9.843 4.408-9.847 9.843-.001 1.73.457 3.417 1.325 4.904l-.994 3.63 3.727-.977zm11.452-4.664c-.31-.156-1.838-.907-2.122-1.01-.284-.103-.49-.156-.696.156-.206.31-.8.1-.986 1.185-.186.206-.372.232-.682.077-.31-.156-1.31-.483-2.495-1.54-1.222-1.09-2.046-2.436-2.285-2.848-.239-.412-.025-.634.18-.84.184-.184.412-.482.62-.722.206-.24.275-.412.412-.687.137-.275.069-.515-.034-.721-.103-.206-.8-1.928-1.097-2.65-.289-.696-.582-.601-.8-.612-.206-.01-.44-.011-.673-.011-.232 0-.61.087-.93.435-.32.348-1.22 1.192-1.22 2.91 0 1.718 1.248 3.377 1.42 3.606.173.23 2.457 3.75 5.952 5.263.832.36 1.482.576 1.99.737.836.265 1.597.227 2.197.138.67-.1 1.838-.75 2.095-1.44.258-.69.258-1.28.18-1.4-.078-.12-.284-.206-.593-.362z" />
  </svg>
);


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
              className="flex items-center focus:outline-none cursor-pointer text-left"
            >
              <Logo className="h-14 w-14 transition-transform duration-300 hover:scale-105" showText={true} light={true} />
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
                <a
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=businessintelligencelab7@gmail.com&su=Inquiry%20-%20Business%20Intelligence%20Lab"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-300 hover:text-white transition-colors font-light"
                >
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
                className="inline-flex items-center gap-2.5 py-3 px-5 bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-semibold text-xs sm:text-sm rounded-xl transition-all duration-300 shadow-md shadow-emerald-500/10 hover:-translate-y-0.5 cursor-pointer w-full justify-center sm:w-auto font-button"
              >
                <WhatsAppIcon className="h-4.5 w-4.5 shrink-0" />
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
