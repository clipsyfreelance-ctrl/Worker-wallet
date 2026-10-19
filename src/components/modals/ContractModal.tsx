import React from 'react';
import { ModalWrapper } from './ModalWrapper';
import { ShieldCheck, Award, FileCheck, CheckCircle } from 'lucide-react';
import { IndonesiaFlag, BulgariaFlag } from '../Flags';

interface ContractModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShowToast: (msg: string, type?: 'success' | 'error' | 'info') => void;
}

export const ContractModal: React.FC<ContractModalProps> = ({ isOpen, onClose, onShowToast }) => {
  const agreementItems = [
    { label: 'Employee', value: 'Thoriq Ahmad Ziad' },
    {
      label: 'Origin Country',
      value: (
        <span className="inline-flex items-center gap-1.5 justify-end">
          <IndonesiaFlag className="w-4 h-3" />
          <span>Indonesia (Biak, Papua)</span>
        </span>
      ),
    },
    {
      label: 'Employer',
      value: (
        <span className="inline-flex items-center gap-1.5 justify-end">
          <BulgariaFlag className="w-4 h-3" />
          <span>The Emporium Hotel (Bulgaria)</span>
        </span>
      ),
    },
    { label: 'Position', value: 'Hospitality Specialist' },
    { label: 'Contract Duration', value: '4 Years (Full Term)' },
    { label: 'Working Hours', value: '40h / week (08:00 – 14:00)' },
    { label: 'Base Hourly Wage', value: '€22.00 / hour', highlight: true },
    { label: 'Overtime Rate', value: '€15.00 / hour' },
    { label: 'Incentive Bonus', value: '€600.00 / month (excl. tips)' },
    { label: 'Meal Allowance', value: '€500.00 / month' },
    { label: 'Health Insurance', value: 'Covered by Employer' },
    { label: 'Family Allowance', value: 'Covered (for married employees)' },
  ];

  const compliance = [
    { label: 'Work Visa & Permits', value: 'Complete & Registered' },
    { label: 'Official Documents', value: 'Verified & Notarized' },
    { label: 'Hospitality SOP', value: 'Standard Compliance' },
    { label: 'Contract Status', value: 'APPROVED', statusHighlight: true },
  ];

  const handleCopySummary = () => {
    const text = `WORKEN CONTRACT SUMMARY\nEmployee: Thoriq Ahmad Ziad\nEmployer: The Emporium Hotel Plovdiv (MGallery)\nPosition: Hospitality\nDuration: 4 Years\nBase Wage: €22/h | Overtime: €15/h\nMonthly Allowances: €600 (Incentive) + €500 (Meal)\nStatus: APPROVED`;
    navigator.clipboard?.writeText(text);
    onShowToast('Contract details copied to clipboard!', 'success');
  };

  return (
    <ModalWrapper
      isOpen={isOpen}
      onClose={onClose}
      title="Employment Agreement"
      subtitle="Signed & verified · 4 years binding contract"
    >
      <div className="space-y-3">
        {/* Verification banner */}
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0" />
            <div>
              <div className="text-xs font-bold text-emerald-950">Official Employment Contract</div>
              <div className="text-[10px] text-emerald-800">Bulgarian Labor Code & EU Mobility Certified</div>
            </div>
          </div>
          <span className="bg-emerald-600 text-white font-bold text-[10px] px-2.5 py-0.5 rounded-full">
            VERIFIED
          </span>
        </div>

        {/* Contract Core Clauses */}
        <div className="bg-[#f8faf9] border border-slate-200 rounded-2xl p-4 text-xs space-y-2">
          {agreementItems.map((item) => (
            <div key={item.label} className="flex justify-between items-center py-0.5">
              <span className="text-slate-500 font-medium">{item.label}</span>
              <span className={`font-bold text-right max-w-[62%] ${item.highlight ? 'text-emerald-700' : 'text-slate-900'}`}>
                {item.value}
              </span>
            </div>
          ))}
        </div>

        {/* Compliance details */}
        <div className="bg-white border border-slate-200 rounded-2xl p-3.5 text-xs space-y-1.5 shadow-xs">
          {compliance.map((c) => (
            <div key={c.label} className="flex justify-between items-center">
              <span className="text-slate-500">{c.label}</span>
              {c.statusHighlight ? (
                <span className="text-emerald-700 font-extrabold flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5" />
                  {c.value}
                </span>
              ) : (
                <span className="font-semibold text-slate-800">{c.value}</span>
              )}
            </div>
          ))}
        </div>

        {/* Quote */}
        <p className="text-xs text-slate-500 italic text-center py-1">
          "Let's grow together."
        </p>

        {/* Signatures */}
        <div className="mt-2 pt-3 border-t border-dashed border-slate-300 flex justify-between items-end px-2">
          <div>
            <div className="font-signature text-2xl text-emerald-800 leading-tight">
              Thoriq Ahmad Ziad
            </div>
            <div className="text-[11px] text-slate-400 font-medium mt-0.5">
              Employee Signature
            </div>
          </div>

          <div className="text-right">
            <div className="font-signature text-2xl text-emerald-800 leading-tight">
              Elena Dimitrova
            </div>
            <div className="text-[11px] text-slate-400 font-medium mt-0.5">
              HR Director · Emporium Hotel
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-2 pt-2">
          <button
            onClick={handleCopySummary}
            className="w-full py-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 font-semibold rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5"
          >
            <FileCheck className="w-3.5 h-3.5" />
            <span>Copy Contract Summary</span>
          </button>
          <button
            onClick={onClose}
            className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-xs transition-colors"
          >
            Close Agreement
          </button>
        </div>
      </div>
    </ModalWrapper>
  );
};
