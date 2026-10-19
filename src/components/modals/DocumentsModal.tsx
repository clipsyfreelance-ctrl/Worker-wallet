import React, { useState } from 'react';
import { ModalWrapper } from './ModalWrapper';
import { DocumentItem } from '../../types';
import { EMBASSY_DOCUMENTS } from '../../data/initialData';
import { IndonesiaFlag, BulgariaFlag } from '../Flags';
import {
  ShieldCheck,
  CheckCircle2,
  FileText,
  Search,
  Copy,
  FileCheck2,
  Building,
  Award,
} from 'lucide-react';

interface DocumentsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShowToast: (msg: string, type?: 'success' | 'error' | 'info') => void;
}

export const DocumentsModal: React.FC<DocumentsModalProps> = ({
  isOpen,
  onClose,
  onShowToast,
}) => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = [
    'All',
    'Identity & Travel',
    'Legal & Background',
    'Work Authorization',
    'Employment Agreement',
    'Accommodation',
    'Medical & Insurance',
    'Qualifications & Profession',
    'Work Experience',
    'Biodata & Portfolio',
    'Embassy Visa',
    'Biometrics',
    'Financial Means',
    'Consular Fees',
    'Flight & Transit',
  ];

  const filteredDocs = EMBASSY_DOCUMENTS.filter((doc) => {
    if (selectedCategory !== 'All' && doc.category !== selectedCategory) {
      return false;
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        doc.name.toLowerCase().includes(q) ||
        doc.authority.toLowerCase().includes(q) ||
        doc.docNumber.toLowerCase().includes(q) ||
        doc.notes.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleCopyAll = () => {
    const list = EMBASSY_DOCUMENTS.map(
      (d, i) => `${i + 1}. [✓ COMPLETE] ${d.name} (${d.authority} - Ref: ${d.docNumber})`
    ).join('\n');

    const summary = `BULGARIAN VISA D EMPLOYMENT DOCUMENT DOSSIER\nApplicant: Mr. Thoriq Ahmad Ziad (Biak, Papua - Indonesia)\nEmployer: The Emporium Hotel Plovdiv (Bulgaria)\nStatus: 14/14 DOCUMENTS COMPLETE & EMBASSY APPROVED\n\nVerified Documents:\n${list}\n\nApproved in accordance with the consular protocols of the Embassy of Bulgaria in Jakarta & the Indonesian Embassy in Sofia.`;

    navigator.clipboard?.writeText(summary);
    onShowToast('14 complete documents summary copied to clipboard!', 'success');
  };

  return (
    <ModalWrapper
      isOpen={isOpen}
      onClose={onClose}
      title="Document Completeness"
      subtitle="14 Official Documents Approved by Indonesian & Bulgarian Embassies"
    >
      <div className="space-y-3.5">
        {/* Official Embassy Approval Banner */}
        <div className="bg-gradient-to-br from-emerald-900 to-emerald-950 text-white rounded-2xl p-4 shadow-sm border border-emerald-700/60 relative overflow-hidden">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-300">
                Official Embassy Dossier
              </span>
            </div>
            <div className="flex items-center gap-1.5 bg-black/30 px-2 py-0.5 rounded-full border border-white/15">
              <IndonesiaFlag className="w-4 h-2.5" />
              <span className="text-[10px] text-emerald-200 font-bold">⇄</span>
              <BulgariaFlag className="w-4 h-2.5" />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <h3 className="text-base font-extrabold tracking-tight text-white">
              14/14 Documents Complete & Verified
            </h3>
          </div>

          <p className="text-[11px] text-emerald-200/90 mt-1 leading-relaxed">
            In accordance with consular procedures approved by the <b>Embassy of the Republic of Bulgaria in Jakarta</b> and the <b>Embassy of the Republic of Indonesia in Sofia</b> for the issuance of Visa D (Long-Stay Employment).
          </p>

          <div className="mt-3 pt-2.5 border-t border-emerald-700/50 flex items-center justify-between text-xs">
            <span className="text-emerald-300 font-semibold text-[11px] flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              Status: APPROVED (COMPLETE)
            </span>
            <span className="bg-emerald-500 text-emerald-950 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full">
              READY FOR TRAVEL
            </span>
          </div>
        </div>

        {/* Search input */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search document name, authority, or number..."
            className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-[#e5e9e7] focus:border-emerald-500 focus:bg-white rounded-xl text-xs outline-hidden"
          />
        </div>

        {/* Category filters */}
        <div className="flex gap-1.5 overflow-x-auto pb-1 text-xs">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-2.5 py-1 rounded-lg font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-emerald-700 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Document list */}
        <div className="max-h-[50vh] overflow-y-auto space-y-2.5 pr-1">
          {filteredDocs.map((doc) => {
            const originalIndex = EMBASSY_DOCUMENTS.findIndex((d) => d.id === doc.id) + 1;
            return (
              <div
                key={doc.id}
                className="bg-[#f8faf9] border border-emerald-200/80 rounded-2xl p-3.5 text-xs text-slate-800 space-y-2 hover:border-emerald-500 transition-colors shadow-xs"
              >
                {/* Header row */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-start gap-2.5 min-w-0">
                    <span className="w-6 h-6 rounded-lg bg-emerald-700 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      {originalIndex}
                    </span>
                    <div className="min-w-0">
                      <div className="font-bold text-slate-900 text-xs sm:text-[13px] leading-snug">
                        {doc.name}
                      </div>
                      <span className="inline-block text-[10px] font-semibold text-emerald-800 bg-emerald-100/80 px-2 py-0.2 rounded-md mt-1">
                        {doc.category}
                      </span>
                    </div>
                  </div>

                  <span className="shrink-0 font-extrabold text-[10px] bg-emerald-600 text-white px-2 py-0.5 rounded-full flex items-center gap-1 shadow-xs">
                    <CheckCircle2 className="w-3 h-3" />
                    COMPLETE
                  </span>
                </div>

                {/* Details box */}
                <div className="bg-white rounded-xl p-2.5 border border-slate-200/80 space-y-1 text-[11px]">
                  <div className="flex justify-between items-center text-slate-600">
                    <span className="text-slate-400">Issuing Authority:</span>
                    <span className="font-semibold text-slate-800 text-right max-w-[65%]">
                      {doc.authority}
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-slate-600">
                    <span className="text-slate-400">Registration Number:</span>
                    <span className="font-mono font-bold text-emerald-800 text-right">
                      {doc.docNumber}
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-slate-600">
                    <span className="text-slate-400">Verification Date:</span>
                    <span className="font-medium text-slate-700">{doc.dateVerified}</span>
                  </div>

                  <div className="pt-1 border-t border-slate-100 text-[10.5px] text-slate-600 italic">
                    <span className="text-emerald-700 font-medium not-italic">Notes: </span>
                    {doc.notes}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Embassy Seal Note */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3 text-center space-y-1">
          <div className="flex items-center justify-center gap-1.5 font-bold text-xs text-slate-800">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>EMBASSY OF INDONESIA & BULGARIA</span>
          </div>
          <p className="text-[10px] text-slate-500">
            All 14 documents are registered and endorsed in the Consular Information & Immigration Management System of the Republic of Bulgaria.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-2 pt-1">
          <button
            onClick={handleCopyAll}
            className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5 shadow-md shadow-emerald-800/20 active:scale-[0.98]"
          >
            <Copy className="w-3.5 h-3.5" />
            <span>Copy 14 Documents Dossier Summary</span>
          </button>
          <button
            onClick={onClose}
            className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-xs transition-colors"
          >
            Close Document Dossier
          </button>
        </div>
      </div>
    </ModalWrapper>
  );
};
