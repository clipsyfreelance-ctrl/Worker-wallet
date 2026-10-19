import React, { useState } from 'react';
import { Eye, EyeOff, Calculator } from 'lucide-react';
import { EUR_USD_RATE, EUR_IDR_RATE } from '../data/initialData';
import { IndonesiaFlag, BulgariaFlag } from './Flags';

interface BalanceCardProps {
  balanceEUR: number;
  currency: 'EUR' | 'USD' | 'IDR';
  onOpenCalculator: () => void;
}

export const BalanceCard: React.FC<BalanceCardProps> = ({
  balanceEUR,
  currency,
  onOpenCalculator,
}) => {
  const [hideBalance, setHideBalance] = useState(false);

  const formatBalance = () => {
    if (hideBalance) return '••••••••';
    if (currency === 'EUR') {
      return `€${balanceEUR.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`;
    }
    if (currency === 'USD') {
      const usd = balanceEUR / EUR_USD_RATE;
      return `$${usd.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`;
    }
    if (currency === 'IDR') {
      const idr = balanceEUR * EUR_IDR_RATE;
      return `Rp ${Math.round(idr).toLocaleString('id-ID')}`;
    }
    return `€${balanceEUR.toFixed(2)}`;
  };

  return (
    <div className="mx-4 mt-4 bg-gradient-to-br from-[#16a34a] via-[#15803d] to-[#11553f] text-white rounded-3xl p-5 shadow-xl shadow-emerald-900/20 relative overflow-hidden">
      {/* Decorative ambient subtle circle */}
      <div className="absolute -right-10 -bottom-10 w-36 h-36 bg-white/10 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -left-6 -top-6 w-28 h-28 bg-emerald-300/10 rounded-full blur-xl pointer-events-none" />

      <div className="relative z-10">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-emerald-100/90 tracking-wide flex items-center gap-1.5">
            Available Balance
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-300" />
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setHideBalance(!hideBalance)}
              title={hideBalance ? 'Show Balance' : 'Hide Balance'}
              className="p-1 rounded-lg bg-white/10 hover:bg-white/20 text-emerald-100 transition-colors"
            >
              {hideBalance ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            </button>
            <button
              onClick={onOpenCalculator}
              title="Salary Calculator"
              className="flex items-center gap-1 text-[11px] font-semibold bg-white/15 hover:bg-white/25 px-2.5 py-1 rounded-full text-white transition-all backdrop-blur-sm border border-white/20 active:scale-95"
            >
              <Calculator className="w-3 h-3 text-emerald-200" />
              <span>Simulate Pay</span>
            </button>
          </div>
        </div>

        <div className="text-[34px] font-extrabold tracking-tight mt-1 mb-1 font-mono sm:font-sans">
          {formatBalance()}
        </div>

        <div className="flex items-center justify-between text-xs text-emerald-100/85">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span>Mr. Thoriq Ahmad Ziad · ID 521-441-3</span>
            <span className="inline-flex items-center gap-1 bg-white/15 px-1.5 py-0.5 rounded-full text-[10px] border border-white/20">
              <IndonesiaFlag className="w-3.5 h-2.5" />
              <span className="text-[9px] opacity-75">⇄</span>
              <BulgariaFlag className="w-3.5 h-2.5" />
            </span>
          </div>
          <span className="text-[11px] font-medium bg-emerald-900/40 px-2 py-0.5 rounded-md border border-emerald-400/20">
            Active
          </span>
        </div>

        <div className="flex flex-wrap gap-2 mt-4 pt-3 border-t border-white/15">
          <span className="bg-white/15 hover:bg-white/20 border border-white/20 rounded-full px-3 py-1 text-[11px] font-semibold text-emerald-50 transition-colors">
            €22 / hour
          </span>
          <span className="bg-white/15 hover:bg-white/20 border border-white/20 rounded-full px-3 py-1 text-[11px] font-semibold text-emerald-50 transition-colors">
            Overtime €15 / hour
          </span>
          <span className="bg-white/15 hover:bg-white/20 border border-white/20 rounded-full px-3 py-1 text-[11px] font-semibold text-emerald-50 transition-colors">
            40h / week
          </span>
        </div>
      </div>
    </div>
  );
};
