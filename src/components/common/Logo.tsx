/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";

interface LogoProps {
  className?: string;
  showText?: boolean;
  light?: boolean;
}

export default function Logo({ className = "h-12 w-12", showText = true, light = false }: LogoProps) {
  // Reusable star path at (0, 0)
  const starPath = "M 0 -10 L 2.8 -3.1 L 10 -3.1 L 4.2 1.5 L 6.8 8.1 L 0 4 L -6.8 8.1 L -4.2 1.5 L -10 -3.1 L -2.8 -3.1 Z";

  // Angles for single laurel leaves from bottom-center to top-sides
  const leafAngles = [72, 58, 44, 30, 16, 2, -12, -26, -40, -54, -68];

  // Colors based on theme/light prop
  const primaryBlue = "#0b3394"; // Corporate deep academic blue
  const goldColor = "#c59b27";   // Rich emblem gold
  const textColor = light ? "#ffffff" : "#0b3394";

  return (
    <div className="flex items-center gap-3 select-none">
      <svg
        viewBox="0 0 500 500"
        className={className}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* White circular backing to ensure flawless contrast on any background */}
        <circle cx="250" cy="250" r="238" fill="#ffffff" />

        {/* 270-degree curved path for the arched text starting at 135deg and ending at 45deg (clockwise) */}
        <path
          id="textArcPath"
          d="M 101 399 A 210 210 0 1 1 399 399"
          fill="none"
        />

        {/* Central Double Circle around BIL */}
        <circle cx="250" cy="250" r="114" stroke={primaryBlue} strokeWidth="5" />
        <circle cx="250" cy="250" r="102" stroke={primaryBlue} strokeWidth="2.2" />

        {/* Center "BIL" text */}
        <text
          x="250"
          y="278"
          textAnchor="middle"
          fill={primaryBlue}
          fontSize="90"
          fontFamily="Georgia, 'Times New Roman', Times, serif"
          fontWeight="900"
          letterSpacing="1"
        >
          BIL
        </text>

        {/* Top 3 deep blue stars arched over the inner circle */}
        <path d={starPath} fill={primaryBlue} transform="translate(250, 114) scale(1.5)" />
        <path d={starPath} fill={primaryBlue} transform="translate(202, 128) scale(1.1)" />
        <path d={starPath} fill={primaryBlue} transform="translate(298, 128) scale(1.1)" />

        {/* Golden Laurel Wreath (Single Leaves flanking the circle) */}
        <g id="laurel-wreath">
          {/* Crossed stems at the bottom */}
          {/* Left Stem */}
          <path
            d="M 265 382 Q 240 375 116 250 A 134 134 0 0 1 185 130"
            stroke={goldColor}
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />
          {/* Right Stem */}
          <path
            d="M 235 382 Q 260 375 384 250 A 134 134 0 0 0 315 130"
            stroke={goldColor}
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />

          {leafAngles.map((angle) => {
            // Right side wreath: rot angle, translate outward, draw single leaf pointing up-out
            const rightTransform = `translate(250, 250) rotate(${angle}) translate(134, 0)`;
            // Left side wreath: rotate opposite, translate outward, draw single leaf pointing up-out
            const leftTransform = `translate(250, 250) rotate(${180 - angle}) translate(134, 0)`;

            return (
              <g key={angle}>
                {/* Right Leaf */}
                <g transform={rightTransform}>
                  <path
                    d="M 0 0 C 8 -12, 22 -10, 28 2 C 20 10, 8 8, 0 0 Z"
                    fill={goldColor}
                    transform="rotate(-40)"
                  />
                </g>

                {/* Left Leaf */}
                <g transform={leftTransform}>
                  <path
                    d="M 0 0 C 8 12, 22 10, 28 -2 C 20 -10, 8 -8, 0 0 Z"
                    fill={goldColor}
                    transform="rotate(40)"
                  />
                </g>
              </g>
            );
          })}
        </g>

        {/* Arched Text: BUSINESS INTELLIGENCE LAB */}
        <text fill={primaryBlue}>
          <textPath
            href="#textArcPath"
            startOffset="50%"
            textAnchor="middle"
            fontSize="36"
            fontFamily="Georgia, 'Times New Roman', Times, serif"
            fontWeight="bold"
            letterSpacing="11"
          >
            BUSINESS INTELLIGENCE LAB
          </textPath>
        </text>

        {/* Curved Banner/Ribbon at the Bottom */}
        <g id="bottom-banner">
          {/* Main banner shadow/body */}
          <path
            d="M 90 395 Q 250 472 410 395 L 375 352 Q 250 422 125 352 Z"
            fill={primaryBlue}
          />
          {/* Ribbon left swallowtail fold */}
          <path
            d="M 90 395 L 125 352 L 75 340 Z"
            fill="#08236b"
          />
          {/* Ribbon right swallowtail fold */}
          <path
            d="M 410 395 L 375 352 L 425 340 Z"
            fill="#08236b"
          />

          {/* Ribbon left end flag */}
          <path
            d="M 75 340 L 110 380 L 55 385 Z"
            fill={primaryBlue}
          />
          {/* Ribbon right end flag */}
          <path
            d="M 425 340 L 390 380 L 445 385 Z"
            fill={primaryBlue}
          />

          {/* 3 white stars on the banner */}
          <path d={starPath} fill="#ffffff" transform="translate(250, 426) scale(1.3)" />
          <path d={starPath} fill="#ffffff" transform="translate(196, 413) scale(1.0)" />
          <path d={starPath} fill="#ffffff" transform="translate(304, 413) scale(1.0)" />
        </g>
      </svg>

      {showText && (
        <div className="flex flex-col">
          <span className={`font-heading font-extrabold text-base sm:text-lg tracking-tight leading-tight transition-colors duration-300 ${textColor}`}>
            Business Intelligence
          </span>
          <span className="text-[10px] font-mono font-bold tracking-[0.24em] text-cyan-500 uppercase leading-none mt-0.5">
            Lab
          </span>
        </div>
      )}
    </div>
  );
}
