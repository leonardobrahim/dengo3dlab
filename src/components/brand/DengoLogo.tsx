import * as React from 'react';

interface DengoLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'full' | 'icon' | 'badge' | 'avatar';
  showSubtext?: boolean;
  className?: string;
}

export const DengoLogo: React.FC<DengoLogoProps> = ({
  size = 'md',
  variant = 'full',
  showSubtext = true,
  className = '',
}) => {
  const sizeMap = {
    sm: { icon: 34, text: 'text-base', subtext: 'text-[9px]' },
    md: { icon: 44, text: 'text-xl', subtext: 'text-[11px]' },
    lg: { icon: 64, text: 'text-3xl', subtext: 'text-xs' },
    xl: { icon: 96, text: 'text-4xl', subtext: 'text-sm' },
  };

  const currentSize = sizeMap[size];

  // Vector mascot rendering: Cute otter in pink bear hoodie with cherries & 3D gear
  const renderMascotSVG = (dim: number) => (
    <svg
      width={dim}
      height={dim}
      viewBox="0 0 160 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0 transition-transform duration-300 hover:scale-105 select-none"
    >
      <defs>
        {/* Soft pastel gradients */}
        <linearGradient id="bgRainbow" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FCE7F3" stopOpacity="0.8" />
          <stop offset="50%" stopColor="#E0F2FE" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#EDE9FE" stopOpacity="0.8" />
        </linearGradient>

        <linearGradient id="pinkHood" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFB5D0" />
          <stop offset="50%" stopColor="#F472B6" />
          <stop offset="100%" stopColor="#FB7185" />
        </linearGradient>

        <linearGradient id="pinkEarInner" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FDE2E4" />
          <stop offset="100%" stopColor="#FF9EAA" />
        </linearGradient>

        <linearGradient id="otterFur" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#B38A73" />
          <stop offset="100%" stopColor="#8D634E" />
        </linearGradient>

        <linearGradient id="otterMuzzle" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFF2EA" />
          <stop offset="100%" stopColor="#F0D5C3" />
        </linearGradient>

        <linearGradient id="cherryRed" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF4D6D" />
          <stop offset="100%" stopColor="#C9184A" />
        </linearGradient>

        <linearGradient id="blueGear" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#BAE6FD" />
          <stop offset="100%" stopColor="#38BDF8" />
        </linearGradient>

        <filter id="softGlow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#F472B6" floodOpacity="0.25" />
        </filter>
      </defs>

      {/* Pastel background aura & halo */}
      <circle cx="80" cy="80" r="74" fill="url(#bgRainbow)" stroke="#F9A8D4" strokeWidth="2" strokeDasharray="4 2" />
      
      {/* 3D Printed elements surrounding the mascot: cute gear & 3DBenchy boat */}
      {/* Pink Pastel 3D Gear (Left) */}
      <g opacity="0.85" transform="translate(18, 92) scale(0.65)">
        <circle cx="20" cy="20" r="14" fill="#FCE7F3" stroke="#F472B6" strokeWidth="2.5" />
        <circle cx="20" cy="20" r="6" fill="#FFF" stroke="#FB7185" strokeWidth="2" />
        <rect x="18" y="2" width="4" height="6" rx="2" fill="#F472B6" />
        <rect x="18" y="32" width="4" height="6" rx="2" fill="#F472B6" />
        <rect x="2" y="18" width="6" height="4" rx="2" fill="#F472B6" />
        <rect x="32" y="18" width="6" height="4" rx="2" fill="#F472B6" />
      </g>

      {/* Baby-Blue 3D Benchy Silhouette (Right) */}
      <g opacity="0.9" transform="translate(116, 96) scale(0.6)">
        <path d="M 0 24 C 8 28, 28 28, 38 24 L 34 32 C 24 36, 12 36, 4 32 Z" fill="url(#blueGear)" />
        <rect x="12" y="10" width="14" height="12" rx="2" fill="#BAE6FD" stroke="#38BDF8" strokeWidth="1.5" />
        <rect x="16" y="2" width="5" height="10" rx="1.5" fill="#38BDF8" />
        <circle cx="19" cy="16" r="3" fill="#FFF" />
      </g>

      {/* Otter Body (sitting cutely) */}
      <ellipse cx="80" cy="116" rx="34" ry="26" fill="url(#otterFur)" filter="url(#softGlow)" />
      
      {/* Otter Tummy */}
      <ellipse cx="80" cy="118" rx="20" ry="16" fill="#F3DFD2" />
      
      {/* Cute Little Paws */}
      <ellipse cx="58" cy="128" rx="9" ry="7" fill="#6F4E37" transform="rotate(15 58 128)" />
      <circle cx="56" cy="126" r="1.5" fill="#FFB5D0" />
      <circle cx="59" cy="125" r="1.5" fill="#FFB5D0" />
      <circle cx="62" cy="127" r="1.5" fill="#FFB5D0" />

      <ellipse cx="102" cy="128" rx="9" ry="7" fill="#6F4E37" transform="rotate(-15 102 128)" />
      <circle cx="98" cy="127" r="1.5" fill="#FFB5D0" />
      <circle cx="101" cy="125" r="1.5" fill="#FFB5D0" />
      <circle cx="104" cy="126" r="1.5" fill="#FFB5D0" />

      {/* Front Paws / Arms */}
      <ellipse cx="64" cy="114" rx="8" ry="6" fill="#7E563E" transform="rotate(-10 64 114)" />
      <ellipse cx="96" cy="114" rx="8" ry="6" fill="#7E563E" transform="rotate(10 96 114)" />

      {/* Otter Head Base */}
      <circle cx="80" cy="74" r="34" fill="url(#otterFur)" />

      {/* Pink Bear Hoodie Outer */}
      <path
        d="M 44 74 C 44 46, 116 46, 116 74 C 116 100, 44 100, 44 74 Z"
        fill="url(#pinkHood)"
        stroke="#FFFFFF"
        strokeWidth="2.5"
      />

      {/* Bear Hoodie Left Ear */}
      <circle cx="48" cy="46" r="14" fill="url(#pinkHood)" stroke="#FFF" strokeWidth="2" />
      <circle cx="48" cy="46" r="8" fill="url(#pinkEarInner)" />

      {/* Bear Hoodie Right Ear */}
      <circle cx="112" cy="46" r="14" fill="url(#pinkHood)" stroke="#FFF" strokeWidth="2" />
      <circle cx="112" cy="46" r="8" fill="url(#pinkEarInner)" />

      {/* Hoodie Face Opening */}
      <ellipse cx="80" cy="76" rx="27" ry="24" fill="url(#otterFur)" stroke="#FFD1DC" strokeWidth="2" />

      {/* Otter Muzzle / Cheeks */}
      <ellipse cx="80" cy="84" rx="19" ry="13" fill="url(#otterMuzzle)" />
      <ellipse cx="73" cy="85" rx="8" ry="7" fill="#FFF5EE" />
      <ellipse cx="87" cy="85" rx="8" ry="7" fill="#FFF5EE" />

      {/* Cute Whiskers */}
      <path d="M 60 84 L 48 83" stroke="#8D634E" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M 60 87 L 48 88" stroke="#8D634E" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M 100 84 L 112 83" stroke="#8D634E" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M 100 87 L 112 88" stroke="#8D634E" strokeWidth="1.2" strokeLinecap="round" />

      {/* Otter Little Nose */}
      <path d="M 77 78 Q 80 76 83 78 Q 80 82 77 78 Z" fill="#4A3525" />

      {/* Happy Mouth & Cheeky Pink Tongue */}
      <path d="M 76 83 Q 80 86 84 83" stroke="#4A3525" strokeWidth="1.6" fill="none" strokeLinecap="round" />
      <path d="M 78 84 Q 80 91 82 84 Z" fill="#FF6584" />

      {/* Big Sparkling Kawaii Eyes */}
      {/* Left Eye */}
      <circle cx="66" cy="71" r="6.5" fill="#2E1C11" />
      <circle cx="64" cy="69" r="2.2" fill="#FFFFFF" />
      <circle cx="68" cy="73" r="1.1" fill="#FFFFFF" />

      {/* Right Eye */}
      <circle cx="94" cy="71" r="6.5" fill="#2E1C11" />
      <circle cx="92" cy="69" r="2.2" fill="#FFFFFF" />
      <circle cx="96" cy="73" r="1.1" fill="#FFFFFF" />

      {/* Rosy Pastel Cheeks (Blush) */}
      <ellipse cx="58" cy="78" rx="5" ry="3.5" fill="#FF85A2" opacity="0.65" />
      <ellipse cx="102" cy="78" rx="5" ry="3.5" fill="#FF85A2" opacity="0.65" />

      {/* Cherries on top of hood! */}
      {/* Stems & Leaf */}
      <path d="M 80 34 Q 74 24 71 30" stroke="#4ADE80" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M 80 34 Q 86 24 89 30" stroke="#4ADE80" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M 80 26 Q 88 21 91 24 Q 85 28 80 26 Z" fill="#22C55E" />

      {/* Twin Cherries */}
      <circle cx="71" cy="32" r="6.5" fill="url(#cherryRed)" filter="url(#softGlow)" />
      <circle cx="69" cy="30" r="1.8" fill="#FFF" opacity="0.75" />

      <circle cx="89" cy="32" r="6.5" fill="url(#cherryRed)" filter="url(#softGlow)" />
      <circle cx="87" cy="30" r="1.8" fill="#FFF" opacity="0.75" />
    </svg>
  );

  if (variant === 'icon') {
    return <div className={`inline-flex items-center justify-center ${className}`}>{renderMascotSVG(currentSize.icon)}</div>;
  }

  if (variant === 'avatar') {
    return (
      <div
        className={`relative inline-flex items-center justify-center rounded-full p-1 bg-gradient-to-tr from-pink-300 via-sky-200 to-pink-200 shadow-sm border border-pink-200/60 dark:border-pink-500/30 ${className}`}
      >
        {renderMascotSVG(currentSize.icon)}
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      {/* Mascot Graphic */}
      <div className="relative group">
        <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-pink-400 to-sky-400 opacity-30 blur group-hover:opacity-60 transition duration-300" />
        <div className="relative rounded-2xl p-1 bg-white/90 dark:bg-card/90 border border-pink-200/80 dark:border-pink-500/30 shadow-sm flex items-center justify-center">
          {renderMascotSVG(currentSize.icon)}
        </div>
      </div>

      {/* Typographic Logo */}
      <div className="flex flex-col text-left">
        <div className="flex items-center gap-1">
          <span className={`font-black tracking-tight leading-none ${currentSize.text}`}>
            <span className="text-pink-500 drop-shadow-sm">Dengo</span>
            <span className="text-sky-400 drop-shadow-sm ml-1">3D</span>
          </span>
          <span className="text-xs px-1.5 py-0.5 rounded-full bg-pink-100 dark:bg-pink-950/60 text-pink-600 dark:text-pink-300 font-bold border border-pink-200 dark:border-pink-800">
            Lab
          </span>
        </div>
        {showSubtext && (
          <span
            className={`font-semibold tracking-wider text-muted-foreground mt-0.5 ${currentSize.subtext} font-sans flex items-center gap-1`}
          >
            <span>Estúdio Criativo</span>
            <span className="text-pink-400">✨</span>
          </span>
        )}
      </div>
    </div>
  );
};
