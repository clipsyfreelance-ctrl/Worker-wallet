import React from 'react';
import { BadgeCheck, Sparkles } from 'lucide-react';

interface EarningsSectionProps {
  onOpenCalculator: () => void;
}

export const EarningsSection: React.FC<EarningsSectionProps> = ({ onOpenCalculator }) => {
  const items = [
    { k: 'Hourly wage', v: '€22.00 / hour', highlight: true },
    { k: 'Overtime', v: '€15.00 / hour' },
    { k: 'Incentive bonus', v: '€600.00 / month (excl. tips)' },
    { k: 'Meal allowance', v: '€500.00 / month' },
    { k: 'Health allowance', v: 'Provided by company' },
    { k: 'Family allowance', v: 'For married employees' },
    { k: 'Working hours', v: '08:00 – 14:00 (40h / week)' },
    { k: 'Leave permit', v: 'Included (Paid Annual Leave)' },
  ];

  return (
    <section className="mx-4 mt-6">
      <div className="flex items-center justify-between mb-2.5">
        <div className="flex items-center gap-1.5">
          <h2 className="text-sm font-bold text-slate-900 tracking-tight">Income Structure</h2>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
            Active Contract
          </span>
        </div>
        <button
          onClick={onOpenCalculator}
          className="text-xs text-emerald-700 hover:text-emerald-800 font-semibold flex items-center gap-1 transition-colors"
        >
          <Sparkles className="w-3 h-3" />
          <span>Calculator</span>
        </button>
      </div>

      <div className="bg-white border border-[#e5e9e7] rounded-2xl px-4 py-1 divide-y divide-[#e5e9e7] shadow-xs">
        {items.map((item) => (
          <div key={item.k} className="flex items-center justify-between py-3 text-xs sm:text-[13px]">
            <span className="text-slate-500 font-medium">{item.k}</span>
            <span className={`font-semibold text-right max-w-[62%] ${item.highlight ? 'text-emerald-700 font-bold' : 'text-slate-800'}`}>
              {item.v}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};
