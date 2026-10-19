import React from 'react';
import { Building2, MapPin, Phone, Mail, Clock, Award } from 'lucide-react';

interface WorkplaceSectionProps {
  onNotify: (msg: string) => void;
}

export const WorkplaceSection: React.FC<WorkplaceSectionProps> = ({ onNotify }) => {
  const rows = [
    {
      k: 'Hotel',
      v: 'The Emporium Hotel Plovdiv — MGallery Collection',
      icon: Building2,
      highlight: true,
    },
    {
      k: 'Position',
      v: 'Hospitality',
      icon: Award,
    },
    {
      k: 'Address',
      v: 'Kapitan Raycho Str 66, 4000 Plovdiv, Bulgaria',
      icon: MapPin,
      copyable: true,
    },
    {
      k: 'Phone',
      v: '+359 12 886 634',
      icon: Phone,
      link: 'tel:+35912886634',
    },
    {
      k: 'Email',
      v: 'sales@emporiumplovdiv',
      icon: Mail,
      link: 'mailto:sales@emporiumplovdiv',
    },
    {
      k: 'Contract',
      v: '4 Years (Full Term)',
      icon: Clock,
      highlight: true,
    },
  ];

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard?.writeText(text);
    onNotify(`Copied ${label} to clipboard!`);
  };

  return (
    <section className="mx-4 mt-6">
      <div className="flex items-center justify-between mb-2.5">
        <h2 className="text-sm font-bold text-slate-900 tracking-tight flex items-center gap-1.5">
          <Building2 className="w-4 h-4 text-emerald-700" />
          Workplace
        </h2>
        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
          5-Star MGallery
        </span>
      </div>

      <div className="bg-white border border-[#e5e9e7] rounded-2xl px-4 py-1 divide-y divide-[#e5e9e7] shadow-xs">
        {rows.map((r) => {
          const Icon = r.icon;
          return (
            <div key={r.k} className="flex items-center justify-between py-3 text-xs sm:text-[13px] gap-2">
              <span className="text-slate-500 font-medium flex items-center gap-1.5 shrink-0">
                <Icon className="w-3.5 h-3.5 text-slate-400" />
                {r.k}
              </span>
              <div className="text-right max-w-[65%]">
                {r.link ? (
                  <a
                    href={r.link}
                    className="font-semibold text-emerald-700 hover:underline"
                  >
                    {r.v}
                  </a>
                ) : r.copyable ? (
                  <button
                    onClick={() => handleCopy(r.v, r.k)}
                    className="font-semibold text-slate-800 hover:text-emerald-700 text-right cursor-pointer"
                    title="Click to copy"
                  >
                    {r.v}
                  </button>
                ) : (
                  <span className={`font-semibold ${r.highlight ? 'text-emerald-700' : 'text-slate-800'}`}>
                    {r.v}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
