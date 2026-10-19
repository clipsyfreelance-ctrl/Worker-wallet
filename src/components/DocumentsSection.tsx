import React from 'react';
import { FileCheck2, CheckCircle2, ChevronRight, ShieldCheck, Building2 } from 'lucide-react';
import { IndonesiaFlag, BulgariaFlag } from './Flags';
import { EMBASSY_DOCUMENTS } from '../data/initialData';

interface DocumentsSectionProps {
  onOpenDocuments: () => void;
}

export const DocumentsSection: React.FC<DocumentsSectionProps> = ({ onOpenDocuments }) => {
  const totalDocs = EMBASSY_DOCUMENTS.length; // 14
  const verifiedCount = EMBASSY_DOCUMENTS.filter(
    (d) => d.status === 'COMPLETE' || d.status === 'VERIFIED'
  ).length;

  return (
    <section className="mx-4 mt-6">
      <div className="flex items-center justify-between mb-2.5">
        <div className="flex items-center gap-1.5">
          <FileCheck2 className="w-4 h-4 text-emerald-700" />
          <h2 className="text-sm font-bold text-slate-900 tracking-tight">
            Document Completeness
          </h2>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
            {verifiedCount}/{totalDocs} COMPLETE
          </span>
        </div>
      </div>

      <div
        onClick={onOpenDocuments}
        className="bg-white border border-[#e5e9e7] hover:border-emerald-400 rounded-2xl p-4 cursor-pointer shadow-xs active:bg-[#f8faf9] transition-all group relative overflow-hidden"
      >
        {/* Embassy Verification Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-11 h-11 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-800 shrink-0 group-hover:scale-105 transition-transform shadow-xs">
              <ShieldCheck className="w-6 h-6 text-emerald-700" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-sm font-bold text-slate-900 tracking-tight">
                  Embassy Visa D Dossier
                </span>
                <span className="inline-flex items-center gap-1 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded text-[9px] font-bold text-emerald-800">
                  <IndonesiaFlag className="w-3 h-2" />
                  <span>ID</span>
                  <span>⇄</span>
                  <BulgariaFlag className="w-3 h-2" />
                  <span>BG</span>
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                Official Procedure Approved by Indonesian & Bulgarian Embassies
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1 text-emerald-700 font-bold text-xs shrink-0 bg-emerald-50 px-2.5 py-1 rounded-lg">
            <span>View Dossier</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Progress Bar 100% */}
        <div className="mt-3.5 pt-3 border-t border-slate-100">
          <div className="flex justify-between items-center text-xs mb-1.5">
            <span className="text-slate-600 font-semibold text-[11px] flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              14 Required Documents Verified
            </span>
            <span className="font-extrabold text-emerald-700 text-xs">100% Complete</span>
          </div>
          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-600 rounded-full w-full shadow-inner" />
          </div>
        </div>

        {/* Quick Preview Chips */}
        <div className="flex flex-wrap gap-1.5 mt-3">
          <span className="bg-emerald-50 text-emerald-800 border border-emerald-200/80 rounded-md px-2 py-0.5 text-[10px] font-semibold flex items-center gap-1">
            ✓ Passport
          </span>
          <span className="bg-emerald-50 text-emerald-800 border border-emerald-200/80 rounded-md px-2 py-0.5 text-[10px] font-semibold flex items-center gap-1">
            ✓ BG Work Permit
          </span>
          <span className="bg-emerald-50 text-emerald-800 border border-emerald-200/80 rounded-md px-2 py-0.5 text-[10px] font-semibold flex items-center gap-1">
            ✓ Legalized Police Record
          </span>
          <span className="bg-emerald-50 text-emerald-800 border border-emerald-200/80 rounded-md px-2 py-0.5 text-[10px] font-semibold flex items-center gap-1">
            ✓ €30k+ Insurance
          </span>
          <span className="bg-slate-100 text-slate-600 rounded-md px-2 py-0.5 text-[10px] font-semibold">
            +10 more
          </span>
        </div>
      </div>
    </section>
  );
};
