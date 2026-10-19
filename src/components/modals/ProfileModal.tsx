import React, { useState } from 'react';
import { ModalWrapper } from './ModalWrapper';
import { UserProfile } from '../../types';
import { ShieldCheck, RotateCcw, Copy, MapPin } from 'lucide-react';
import { DualFlags, IndonesiaFlag, BulgariaFlag } from '../Flags';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: UserProfile;
  onResetWallet: () => void;
  onShowToast: (msg: string, type?: 'success' | 'error' | 'info') => void;
  onOpenDocuments?: () => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  profile,
  onResetWallet,
  onShowToast,
  onOpenDocuments,
}) => {
  const [imgError, setImgError] = useState(false);

  const rows = [
    {
      k: 'Nationality & Posting',
      customVal: (
        <div className="flex items-center gap-1.5 justify-end">
          <IndonesiaFlag className="w-5 h-3.5" />
          <span className="font-semibold text-slate-800">Biak, ID</span>
          <span className="text-slate-400">→</span>
          <BulgariaFlag className="w-5 h-3.5" />
          <span className="font-semibold text-slate-800">Plovdiv, BG</span>
        </div>
      ),
    },
    { k: 'Employee ID', v: profile.idNumber, copyable: true },
    { k: 'Position', v: profile.position },
    { k: 'Hotel', v: profile.hotel },
    { k: 'Contract', v: profile.contractDuration },
    { k: 'Address', v: profile.address },
    { k: 'Email', v: profile.email },
    { k: 'Phone', v: profile.phone },
  ];

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard?.writeText(text);
    onShowToast(`Copied ${label}: ${text}`, 'info');
  };

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose}>
      <div className="text-center mb-4">
        {/* Avatar with dual flags overlay */}
        <div className="relative inline-block mx-auto mb-2.5">
          <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-emerald-500 shadow-xl bg-slate-100 flex items-center justify-center ring-4 ring-emerald-100">
            {profile.avatarUrl && !imgError ? (
              <img
                src={profile.avatarUrl}
                alt={profile.name}
                referrerPolicy="no-referrer"
                onError={() => setImgError(true)}
                className="w-full h-full object-cover object-top"
              />
            ) : (
              <div className="w-full h-full bg-[#22c55e] flex items-center justify-center font-extrabold text-[#0d3b2e] text-2xl">
                TA
              </div>
            )}
          </div>

          {/* Active Status Badge */}
          <span
            title="Verified & Active"
            className="absolute bottom-1 right-1 w-5 h-5 bg-emerald-500 border-2 border-white rounded-full flex items-center justify-center shadow-xs"
          >
            <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
          </span>
        </div>

        {/* Dual Flags Side-by-Side */}
        <div className="flex items-center justify-center mb-2">
          <div className="inline-flex items-center gap-2 bg-slate-100/80 border border-slate-200 rounded-full px-3 py-1 shadow-xs">
            <div className="flex items-center gap-1.5">
              <IndonesiaFlag className="w-5 h-3.5" />
              <span className="text-[11px] font-bold text-slate-800">Indonesia</span>
            </div>
            <span className="text-slate-400 font-bold text-xs">·</span>
            <div className="flex items-center gap-1.5">
              <BulgariaFlag className="w-5 h-3.5" />
              <span className="text-[11px] font-bold text-slate-800">Bulgaria</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center gap-1.5">
          <h3 className="text-lg font-bold text-slate-900 tracking-tight">{profile.name}</h3>
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
        </div>
        <p className="text-xs text-slate-500 mt-0.5">
          {profile.position} · {profile.hotel}
        </p>
      </div>

      <div className="bg-[#f8faf9] border border-slate-200 rounded-2xl px-4 py-1 divide-y divide-slate-200 text-xs">
        {rows.map((r) => (
          <div key={r.k} className="flex items-center justify-between py-2.5">
            <span className="text-slate-500 font-medium">{r.k}</span>
            {r.customVal ? (
              r.customVal
            ) : r.copyable && r.v ? (
              <button
                onClick={() => handleCopy(r.v!, r.k)}
                className="font-bold text-slate-900 hover:text-emerald-700 flex items-center gap-1 cursor-pointer"
              >
                <span>{r.v}</span>
                <Copy className="w-3 h-3 text-slate-400" />
              </button>
            ) : (
              <span className="font-semibold text-slate-900 text-right max-w-[65%]">
                {r.v}
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Document Dossier Quick Link */}
      {onOpenDocuments && (
        <button
          onClick={() => {
            onClose();
            onOpenDocuments();
          }}
          className="w-full mt-3 py-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold rounded-xl text-xs transition-colors flex items-center justify-between px-3"
        >
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            <span>14 Verified Embassy Documents</span>
          </div>
          <span className="bg-emerald-600 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full">
            14/14 COMPLETE
          </span>
        </button>
      )}

      {/* Reset & Close */}
      <div className="flex flex-col gap-2 mt-3 pt-1">
        <button
          onClick={onResetWallet}
          className="w-full py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200/60 font-semibold rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Wallet Data to Default</span>
        </button>

        <button
          onClick={onClose}
          className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-xs transition-colors"
        >
          Close Profile
        </button>
      </div>
    </ModalWrapper>
  );
};
