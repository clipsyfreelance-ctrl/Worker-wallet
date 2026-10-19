import React from 'react';
import { Home, Wifi, Utensils, Bus, Shield } from 'lucide-react';

export const AccommodationSection: React.FC = () => {
  const rows = [
    { k: 'Room', v: 'Private · Floor 20, Room 87', highlight: true },
    { k: 'Transportation', v: 'Company covered' },
    { k: 'Meals', v: 'Company covered (Full Board)' },
    { k: 'All needs', v: 'Fully covered by company' },
  ];

  const perks = [
    { icon: Wifi, label: 'High-speed Wi-Fi' },
    { icon: Utensils, label: '3x Chef Meals' },
    { icon: Bus, label: 'Airport & Daily Transit' },
    { icon: Shield, label: 'Full Health Coverage' },
  ];

  return (
    <section className="mx-4 mt-6">
      <div className="flex items-center justify-between mb-2.5">
        <h2 className="text-sm font-bold text-slate-900 tracking-tight flex items-center gap-1.5">
          <Home className="w-4 h-4 text-emerald-700" />
          Accommodation & Benefits
        </h2>
        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
          100% Covered
        </span>
      </div>

      <div className="bg-white border border-[#e5e9e7] rounded-2xl px-4 py-1 divide-y divide-[#e5e9e7] shadow-xs">
        {rows.map((r) => (
          <div key={r.k} className="flex items-center justify-between py-3 text-xs sm:text-[13px]">
            <span className="text-slate-500 font-medium">{r.k}</span>
            <span className={`font-semibold text-right max-w-[62%] ${r.highlight ? 'text-emerald-700 font-bold' : 'text-slate-800'}`}>
              {r.v}
            </span>
          </div>
        ))}
      </div>

      {/* Perks badges */}
      <div className="grid grid-cols-2 gap-2 mt-2.5">
        {perks.map((p) => {
          const Icon = p.icon;
          return (
            <div
              key={p.label}
              className="bg-emerald-50/60 border border-emerald-200/60 rounded-xl px-3 py-2 flex items-center gap-2 text-emerald-900 text-[11px] font-semibold"
            >
              <Icon className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
              <span>{p.label}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
};
