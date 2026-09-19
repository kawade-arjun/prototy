import React from 'react';

interface MetaVerifiedBadgeProps {
  className?: string;
  size?: number;
}

export const MetaVerifiedBadge: React.FC<MetaVerifiedBadgeProps> = ({ 
  className = "w-5 h-5",
  size
}) => {
  const style = size ? { width: `${size}px`, height: `${size}px` } : undefined;

  return (
    <svg
      className={`shrink-0 inline-block align-middle ${className}`}
      style={style}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Verified"
    >
      {/* Meta Scalloped Rosette Starburst */}
      <path
        d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.79-4-4-4-.495 0-.965.084-1.4.238C14.55 2.475 13.18 1.6 11.6 1.6c-1.58 0-2.95.875-3.6 2.148-.435-.154-.905-.238-1.4-.238-2.21 0-4 1.79-4 4 0 .495.084.965.238 1.4C1.475 9.55.6 10.92.6 12.5c0 1.58.875 2.95 2.148 3.6-.154.435-.238.905-.238 1.4 0 2.21 1.79 4 4 4 .495 0 .965-.084 1.4-.238 1.05 1.273 2.42 2.148 4 2.148 1.58 0 2.95-.875 3.6-2.148.435.154.905.238 1.4.238 2.21 0 4-1.79 4-4 0-.495-.084-.965-.238-1.4 1.273-1.05 2.148-2.42 2.148-4z"
        fill="url(#meta-verified-gradient)"
      />
      {/* White Checkmark */}
      <path
        d="M10.09 15.59L6.5 12l1.41-1.41 2.18 2.17 6.4-6.4 1.41 1.42-7.81 7.82z"
        fill="#FFFFFF"
      />
      <defs>
        <linearGradient id="meta-verified-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#EA580C" />
          <stop offset="100%" stopColor="#F59E0B" />
        </linearGradient>
      </defs>
    </svg>
  );
};
