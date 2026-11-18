import React, {useState} from 'react';
import {ButterflyMark} from './ButterflyMark';

interface ClinicImageProps {
  src: string;
  alt: string;
  className?: string;
  caption?: string;
}

export const ClinicImage: React.FC<ClinicImageProps> = ({
  src,
  alt,
  className = '',
  caption,
}) => {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={`relative flex flex-col items-center justify-center bg-gradient-to-br from-[#FBE9EF] via-white to-[#D8EEF3] p-6 text-center ${className}`}
        role="img"
        aria-label={alt}
      >
        <ButterflyMark size={44} className="mb-3 opacity-85" />
        <p className="text-sm font-medium text-[#16323B] max-w-xs">{alt}</p>
      </div>
    );
  }

  return (
    <figure className="relative h-full w-full overflow-hidden">
      <img
        src={src}
        alt={alt}
        referrerPolicy="no-referrer"
        loading="lazy"
        onError={() => setFailed(true)}
        className={`h-full w-full object-cover ${className}`}
      />
      {caption && (
        <figcaption className="absolute bottom-3 left-3 right-3 rounded-lg bg-white/90 px-3 py-1.5 text-xs text-[#4A6570] backdrop-blur-sm border border-[#D8EEF3]">
          {caption}
        </figcaption>
      )}
    </figure>
  );
};
