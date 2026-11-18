import React from 'react';

interface ButterflyMarkProps {
  className?: string;
  size?: number;
}

export const ButterflyMark: React.FC<ButterflyMarkProps> = ({
  className = '',
  size = 36,
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Left upper wing */}
      <path
        d="M31.5 31.5C25.5 17.5 11.5 11 8.5 21.5C6.2 29.5 14.8 36 27 34.5"
        fill="#E8A4BE"
        fillOpacity="0.9"
        stroke="#168C99"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Right upper wing */}
      <path
        d="M32.5 31.5C38.5 17.5 52.5 11 55.5 21.5C57.8 29.5 49.2 36 37 34.5"
        fill="#E8A4BE"
        fillOpacity="0.9"
        stroke="#168C99"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Left lower wing */}
      <path
        d="M28 35.5C19 37.5 14 45.5 18.5 51.2C22.6 56.4 29.5 51.8 31.2 41.5"
        fill="#D8EEF3"
        stroke="#168C99"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Right lower wing */}
      <path
        d="M36 35.5C45 37.5 50 45.5 45.5 51.2C41.4 56.4 34.5 51.8 32.8 41.5"
        fill="#D8EEF3"
        stroke="#168C99"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Delicate inner wing veins */}
      <path
        d="M29 29C23 23 16.5 21 13.5 23.5M35 29C41 23 47.5 21 50.5 23.5"
        stroke="#FFFFFF"
        strokeOpacity="0.85"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      {/* Butterfly body & antennae */}
      <path
        d="M32 22V48"
        stroke="#168C99"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
      <path
        d="M31.5 22C30 18.5 27.5 16.5 25.5 16M32.5 22C34 18.5 36.5 16.5 38.5 16"
        stroke="#7DA6B5"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
};

export const WingSilhouetteAccent: React.FC<{className?: string}> = ({
  className = '',
}) => (
  <svg
    viewBox="0 0 360 320"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <path
      d="M180 155C142 66 56 26 30 92C10 144 68 188 152 178C96 192 64 246 94 282C126 320 170 282 180 218C190 282 234 320 266 282C296 246 264 192 208 178C292 188 350 144 330 92C304 26 218 66 180 155Z"
      fill="url(#fisioWingGrad)"
      fillOpacity="0.32"
    />
    <defs>
      <linearGradient
        id="fisioWingGrad"
        x1="30"
        y1="40"
        x2="330"
        y2="290"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#E8A4BE" />
        <stop offset="0.55" stopColor="#FBE9EF" />
        <stop offset="1" stopColor="#D8EEF3" />
      </linearGradient>
    </defs>
  </svg>
);
