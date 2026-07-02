/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import logoImg from "../../assets/images/logo1.webp";

interface LogoProps {
  className?: string;
  showText?: boolean;
  light?: boolean;
}

export default function Logo({ className = "h-12 w-12", showText = true, light = false }: LogoProps) {
  const textColor = light ? "text-white" : "text-slate-100";

  return (
    <div className="flex items-center gap-3 select-none">
      <div className={`relative overflow-hidden rounded-full bg-white flex items-center justify-center p-0.5 shadow-sm ${className}`}>
        <img
          src={logoImg}
          alt="Business Intelligence Lab Logo"
          className="w-full h-full object-cover rounded-full"
          referrerPolicy="no-referrer"
        />
      </div>

      {showText && (
        <div className="flex flex-col">
          <span className={`font-heading font-extrabold text-base sm:text-lg tracking-tight leading-tight transition-colors duration-300 ${textColor}`}>
            Business Intelligence
          </span>
          <span className="text-[10px] font-mono font-bold tracking-[0.24em] text-cyan-400 uppercase leading-none mt-0.5">
            Lab
          </span>
        </div>
      )}
    </div>
  );
}

