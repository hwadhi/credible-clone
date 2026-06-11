import React from 'react';

/**
 * SmartEaseIcon - High-fidelity hand-crafted SVG representing the
 * brain on the left side with circuit connectors and a seamless,
 * 3D ribbon infinity loop wrapping around it.
 */
export const SmartEaseIcon: React.FC<{ size?: number; className?: string }> = ({ size = 34, className = "" }) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 160 160" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} overflow-visible`}
    >
      <defs>
        {/* Sky-to-Blue gradient for the brain lobes */}
        <linearGradient id="brainLobeGrad" x1="15" y1="20" x2="65" y2="130" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="60%" stopColor="#1e40af" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>

        {/* 3D Infinity Ribbon Gradient matching the user's uploaded images */}
        <linearGradient id="infinityRibbonGrad" x1="15" y1="80" x2="145" y2="80" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#0ea5e9" />     {/* Cyan/Blue */}
          <stop offset="35%" stopColor="#2563eb" />    {/* Royal Blue */}
          <stop offset="70%" stopColor="#10b981" />    {/* Emerald Green */}
          <stop offset="100%" stopColor="#84cc16" />   {/* Lime Green */}
        </linearGradient>

        {/* Highlight Gradient for glossy reflection */}
        <linearGradient id="glossGrad" x1="60" y1="40" x2="140" y2="100" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* --- BRAIN HEMISPHERE LOBES (LEFT SIDE) --- */}
      {/* Lobe 1: Top Lobe */}
      <path 
        d="M 68,48 C 55,24 22,28 22,48 C 22,58 35,62 55,62 L 68,62 Z" 
        fill="url(#brainLobeGrad)" 
      />
      {/* Lobe 2: Upper Mid Lobe */}
      <path 
        d="M 62,68 C 30,55 10,65 10,84 C 10,102 24,106 50,104" 
        stroke="url(#brainLobeGrad)" 
        strokeWidth="11" 
        strokeLinecap="round" 
        fill="none"
      />
      {/* Lobe 3: Lower Mid Lobe */}
      <path 
        d="M 58,88 C 22,80 8,92 8,108 C 8,124 25,128 48,122" 
        stroke="url(#brainLobeGrad)" 
        strokeWidth="11" 
        strokeLinecap="round" 
        fill="none"
      />
      {/* Lobe 4: Bottom Lobe */}
      <path 
        d="M 62,108 C 38,110 16,115 16,128 C 16,138 32,142 50,136" 
        stroke="url(#brainLobeGrad)" 
        strokeWidth="9" 
        strokeLinecap="round" 
        fill="none"
      />

      {/* --- NEURAL CIRCUITRY / SYNAPSE CONNECTORS --- */}
      {/* Connections background lines */}
      <path d="M 46,44 L 32,64 L 34,92 L 48,112" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" opacity="0.4" />
      <path d="M 32,64 L 54,74" stroke="#ffffff" strokeWidth="2" strokeDasharray="2 3" opacity="0.5" />
      
      {/* Shiny Circular Nodes */}
      <circle cx="46" cy="44" r="4.5" fill="#ffffff" stroke="#93c5fd" strokeWidth="1.5" />
      <circle cx="32" cy="64" r="5" fill="#ffffff" stroke="#3b82f6" strokeWidth="2" />
      <circle cx="34" cy="92" r="4" fill="#ffffff" stroke="#3b82f6" strokeWidth="1.5" />
      <circle cx="48" cy="112" r="3.5" fill="#ffffff" stroke="#3b82f6" strokeWidth="1.5" />

      {/* --- INFINITY RIBBON LOOP --- */}
      {/* Complete lemniscate wrapping gracefully from the brain to the right */}
      <path 
        d="M 72,94 Q 92,68 116,48 C 134,32 154,42 154,68 C 154,94 135,116 112,112 C 90,108 70,82 54,68 C 40,54 28,54 28,68 C 28,82 42,98 64,96 L 72,94 Z" 
        stroke="url(#infinityRibbonGrad)" 
        strokeWidth="15" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        fill="none"
      />

      {/* Sleek Glossy 3D Highlight Overlay */}
      <path 
        d="M 116,48 C 134,32 154,42 154,68 C 154,80 148,93 138,100" 
        stroke="url(#glossGrad)" 
        strokeWidth="4" 
        strokeLinecap="round" 
        fill="none"
      />
    </svg>
  );
};

/**
 * PhronesisIcon - High-fidelity hand-crafted SVG representing the
 * unique open circle spiral logo of Phronesis as shown in user's close up image.
 */
export const PhronesisIcon: React.FC<{ size?: number; className?: string }> = ({ size = 26, className = "" }) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 120 120" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} shrink-0`}
    >
      {/* 
        The design is a high-contrast teal open spiral shape:
        - Outer circle on left
        - Straight vertical slice to center
        - Beautiful sweeping spiral tail that arcs outward to the right
      */}
      <path 
        d="M 60,15 
           C 32,15 15,32 15,60 
           C 15,88 32,105 60,105 
           L 60,75 
           C 49,75 41,67 41,56 
           C 41,45 49,37 60,37 
           C 71,37 79,45 79,56 
           C 79,68 70,75 60,75 
           L 60,105 
           C 88,105 105,88 105,60 
           C 105,42 98,28 92,20" 
        stroke="#008f91" 
        strokeWidth="15" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
};

/**
 * Phronesis complete styled typographic logo
 */
export const PhronesisLogo: React.FC<{ size?: number; className?: string }> = ({ size = 24, className = "" }) => {
  return (
    <div className={`flex items-center gap-1.5 select-none shrink-0 ${className}`}>
      <PhronesisIcon size={size} />
      <span 
        className="font-sans font-bold tracking-tight text-[#008f91]" 
        style={{ fontSize: `${size * 0.78}px`, letterSpacing: '-0.025em' }}
      >
        Phronesis
      </span>
    </div>
  );
};

/**
 * SmartEase complete typographic logo with split blue/green gradients
 */
export const SmartEaseLogo: React.FC<{ size?: number; isDarkBg?: boolean }> = ({ size = 28, isDarkBg = false }) => {
  return (
    <div className="flex items-center gap-2 select-none shrink-0 m-0 p-0">
      <SmartEaseIcon size={size} />
      <span 
        className="font-sans font-black tracking-tight uppercase leading-none" 
        style={{ fontSize: `${size * 0.7}px` }}
      >
        {/* Exact color segments matching SMARTEASE style:
            SMART in deep royal blue to bright cyan sky blue,
            EASE in emerald to bright lime green. */}
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 font-black">SMART</span>
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-500 via-emerald-450 to-lime-500 font-extrabold">EASE</span>
      </span>
    </div>
  );
};

/**
 * Consolidated Brand Row: Exact translation of image `input_file_0.png`.
 * Shows "[SmartEase Icon] SMARTEASE" and to the right "[ by [Phronesis Icon] Phronesis ]".
 */
export const ConsolidatedBrandHeader: React.FC<{ 
  size?: number; 
  isDarkBg?: boolean; 
  padding?: string;
}> = ({ 
  size = 28, 
  isDarkBg = false,
  padding = "py-1 px-1.5"
}) => {
  return (
    <div className="flex items-center gap-4 select-none shrink-0 overflow-visible">
      {/* Left major logo: SmartEase */}
      <SmartEaseLogo size={size} isDarkBg={isDarkBg} />
      
      {/* Right companion logo component precisely in the pill border as requested */}
      <div 
        className={`flex items-center gap-1.5 border rounded-full ${padding} transition-all duration-205 ${
          isDarkBg 
            ? 'border-slate-800 bg-slate-900/40 backdrop-blur-[1px]' 
            : 'border-slate-200 bg-slate-50/70 hover:bg-slate-50'
        }`}
      >
        <span className={`text-[10px] font-medium tracking-tight px-1 uppercase ${isDarkBg ? 'text-slate-400' : 'text-slate-500'}`}>
          by
        </span>
        <PhronesisLogo size={size * 0.72} />
      </div>
    </div>
  );
};
