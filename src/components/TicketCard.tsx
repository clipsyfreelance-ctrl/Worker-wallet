import React from 'react';
import { Plane, FileText, ChevronRight } from 'lucide-react';

interface CardProps {
  onOpenTicket: () => void;
  onOpenContract: () => void;
}

export const ActionCards: React.FC<CardProps> = ({ onOpenTicket, onOpenContract }) => {
  return (
    <>
      {/* DEPARTURE TICKET */}
      <section className="mx-4 mt-6">
        <div className="flex items-center justify-between mb-2.5">
          <h2 className="text-sm font-bold text-slate-900 tracking-tight flex items-center gap-1.5">
            <Plane className="w-4 h-4 text-emerald-700" />
            Departure Ticket
          </h2>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
            Paid by Hotel
          </span>
        </div>

        <div
          onClick={onOpenTicket}
          className="bg-white border border-[#e5e9e7] hover:border-emerald-300 rounded-2xl p-4 flex items-center justify-between gap-3 cursor-pointer shadow-xs active:bg-[#f8faf9] transition-all group"
        >
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-800 shrink-0 group-hover:scale-105 transition-transform">
              <Plane className="w-5 h-5 text-emerald-800" />
            </div>
            <div className="truncate">
              <div className="text-sm font-bold text-slate-900">27 October 2026</div>
              <div className="text-[11px] text-slate-500 font-medium mt-0.5 flex items-center gap-1">
                <span className="font-semibold text-emerald-700">PKU</span> → CGK → IST → <span className="font-semibold text-emerald-700">SOF</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1 text-emerald-700 font-bold text-xs shrink-0 bg-emerald-50 px-2.5 py-1 rounded-lg">
            <span>Open Ticket</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </div>
        </div>
      </section>

      {/* CONTRACT MENU */}
      <section className="mx-4 mt-5">
        <div className="flex items-center justify-between mb-2.5">
          <h2 className="text-sm font-bold text-slate-900 tracking-tight flex items-center gap-1.5">
            <FileText className="w-4 h-4 text-emerald-700" />
            Contract
          </h2>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-900">
            Legally Binding
          </span>
        </div>

        <div
          onClick={onOpenContract}
          className="bg-white border border-[#e5e9e7] hover:border-emerald-300 rounded-2xl p-4 flex items-center justify-between gap-3 cursor-pointer shadow-xs active:bg-[#f8faf9] transition-all group"
        >
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-800 shrink-0 group-hover:scale-105 transition-transform">
              <FileText className="w-5 h-5 text-emerald-800" />
            </div>
            <div className="truncate">
              <div className="text-sm font-bold text-slate-900">Employment Agreement</div>
              <div className="text-[11px] text-slate-500 font-medium mt-0.5">
                Signed · 4 Years · Verified
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1 text-emerald-700 font-bold text-xs shrink-0 bg-emerald-50 px-2.5 py-1 rounded-lg">
            <span>View Agreement</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </div>
        </div>
      </section>
    </>
  );
};
