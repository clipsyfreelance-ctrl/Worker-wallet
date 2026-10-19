import React from 'react';

export const IndonesiaFlag: React.FC<{ className?: string }> = ({ className = 'w-6 h-4' }) => (
  <span
    title="Indonesia"
    className={`inline-block overflow-hidden rounded-xs border border-slate-300 shadow-xs relative shrink-0 ${className}`}
  >
    <span className="block w-full h-1/2 bg-[#dc2626]" />
    <span className="block w-full h-1/2 bg-[#ffffff]" />
  </span>
);

export const BulgariaFlag: React.FC<{ className?: string }> = ({ className = 'w-6 h-4' }) => (
  <span
    title="Bulgaria"
    className={`inline-block overflow-hidden rounded-xs border border-slate-300 shadow-xs relative shrink-0 ${className}`}
  >
    <span className="block w-full h-1/3 bg-[#ffffff]" />
    <span className="block w-full h-1/3 bg-[#00966e]" />
    <span className="block w-full h-1/3 bg-[#d62612]" />
  </span>
);

interface DualFlagsProps {
  size?: 'sm' | 'md' | 'lg';
  showLabels?: boolean;
}

export const DualFlags: React.FC<DualFlagsProps> = ({ size = 'md', showLabels = true }) => {
  const flagDimensions = size === 'sm' ? 'w-5 h-3.5' : size === 'lg' ? 'w-8 h-5' : 'w-6 h-4';
  const textSize = size === 'sm' ? 'text-[10px]' : size === 'lg' ? 'text-xs' : 'text-[11px]';

  return (
    <div className="inline-flex items-center gap-2 bg-white/90 border border-slate-200/90 rounded-full px-3 py-1 shadow-xs">
      {/* Indonesia */}
      <div className="flex items-center gap-1.5">
        <IndonesiaFlag className={flagDimensions} />
        {showLabels && <span className={`font-bold text-slate-800 ${textSize}`}>ID</span>}
      </div>

      <span className="text-slate-400 font-semibold text-xs">⇄</span>

      {/* Bulgaria */}
      <div className="flex items-center gap-1.5">
        <BulgariaFlag className={flagDimensions} />
        {showLabels && <span className={`font-bold text-slate-800 ${textSize}`}>BG</span>}
      </div>
    </div>
  );
};
