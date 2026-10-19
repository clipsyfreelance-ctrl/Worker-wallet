import React from 'react';
import { ArrowDownLeft, ArrowRightLeft, Smartphone, ReceiptText } from 'lucide-react';
import { ModalType } from '../types';

interface QuickActionsProps {
  onOpenModal: (modal: ModalType) => void;
}

export const QuickActions: React.FC<QuickActionsProps> = ({ onOpenModal }) => {
  const actions = [
    {
      id: 'deposit' as ModalType,
      label: 'Deposit',
      icon: ArrowDownLeft,
      color: 'bg-emerald-100 text-emerald-800',
    },
    {
      id: 'transfer' as ModalType,
      label: 'Transfer',
      icon: ArrowRightLeft,
      color: 'bg-emerald-100 text-emerald-800',
    },
    {
      id: 'pulsa' as ModalType,
      label: 'Top-Up',
      icon: Smartphone,
      color: 'bg-emerald-100 text-emerald-800',
    },
    {
      id: 'history' as ModalType,
      label: 'History',
      icon: ReceiptText,
      color: 'bg-emerald-100 text-emerald-800',
    },
  ];

  return (
    <div className="grid grid-cols-4 gap-2.5 mx-4 mt-4">
      {actions.map((act) => {
        const Icon = act.icon;
        return (
          <button
            key={act.label}
            onClick={() => onOpenModal(act.id)}
            className="bg-white border border-[#e5e9e7] hover:border-emerald-300 rounded-2xl py-3 px-1.5 flex flex-col items-center gap-1.5 shadow-sm active:scale-95 transition-all text-[#0f172a] hover:bg-emerald-50/30 group"
          >
            <div className={`w-9 h-9 rounded-xl ${act.color} flex items-center justify-center transition-transform group-hover:scale-110 shadow-xs`}>
              <Icon className="w-4 h-4 stroke-[2.2]" />
            </div>
            <span className="text-[11px] font-bold tracking-tight">{act.label}</span>
          </button>
        );
      })}
    </div>
  );
};
