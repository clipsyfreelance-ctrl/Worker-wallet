import React, { useState } from 'react';
import { ShieldCheck } from 'lucide-react';
import { IndonesiaFlag, BulgariaFlag } from './Flags';

interface NavbarProps {
  onOpenProfile: () => void;
  currency: 'EUR' | 'USD' | 'IDR';
  onToggleCurrency: () => void;
  avatarUrl?: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenProfile,
  currency,
  onToggleCurrency,
  avatarUrl,
}) => {
  const [imgError, setImgError] = useState(false);

  return (
    <header className="bg-gradient-to-br from-[#0d3b2e] to-[#11553f] text-white px-5 pt-5 pb-6 rounded-b-[28px] shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#22c55e] flex items-center justify-center font-extrabold text-[#0d3b2e] text-xl shadow-inner tracking-tight">
            W
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="text-base font-bold tracking-tight">Worken Wallet</h1>
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="flex items-center gap-2 mt-0.5">
              <div className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <p className="text-[11px] text-emerald-200/90 font-medium">Personal · Verified</p>
              </div>

              {/* Dual Flags in Header */}
              <div
                onClick={onOpenProfile}
                title="Indonesia ⇄ Bulgaria Assignment"
                className="inline-flex items-center gap-1 bg-black/20 hover:bg-black/30 border border-white/15 rounded-full px-2 py-0.5 cursor-pointer transition-colors"
              >
                <IndonesiaFlag className="w-3.5 h-2.5" />
                <span className="text-[9px] text-emerald-200 font-bold">⇄</span>
                <BulgariaFlag className="w-3.5 h-2.5" />
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Quick Currency Selector */}
          <button
            onClick={onToggleCurrency}
            title="Switch display currency"
            className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-semibold tracking-wider text-emerald-200 border border-white/15 transition-all flex items-center gap-1"
          >
            <span>{currency}</span>
          </button>

          {/* Profile Photo Avatar */}
          <button
            onClick={onOpenProfile}
            title="Open Profile"
            className="w-11 h-11 rounded-full overflow-hidden border-2 border-emerald-400/80 shadow-md hover:scale-105 active:scale-95 transition-transform bg-[#22c55e] flex items-center justify-center shrink-0 relative"
          >
            {avatarUrl && !imgError ? (
              <img
                src={avatarUrl}
                alt="Profile"
                referrerPolicy="no-referrer"
                onError={() => setImgError(true)}
                className="w-full h-full object-cover object-top"
              />
            ) : (
              <span className="font-bold text-[#0d3b2e] text-sm">TA</span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
