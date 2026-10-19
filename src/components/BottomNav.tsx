import React from 'react';
import { Home, ReceiptText, ArrowRightLeft, ArrowDownLeft, User } from 'lucide-react';
import { ModalType } from '../types';

interface BottomNavProps {
  activeModal: ModalType;
  onOpenModal: (modal: ModalType) => void;
  onGoHome: () => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeModal,
  onOpenModal,
  onGoHome,
}) => {
  const isHome = activeModal === null;

  const items = [
    { id: 'home', label: 'Home', icon: Home, action: onGoHome, isActive: isHome },
    {
      id: 'history',
      label: 'History',
      icon: ReceiptText,
      action: () => onOpenModal('history'),
      isActive: activeModal === 'history',
    },
    {
      id: 'transfer',
      label: 'Transfer',
      icon: ArrowRightLeft,
      action: () => onOpenModal('transfer'),
      isActive: activeModal === 'transfer',
    },
    {
      id: 'deposit',
      label: 'Deposit',
      icon: ArrowDownLeft,
      action: () => onOpenModal('deposit'),
      isActive: activeModal === 'deposit',
    },
    {
      id: 'profile',
      label: 'Profile',
      icon: User,
      action: () => onOpenModal('profile'),
      isActive: activeModal === 'profile',
    },
  ];

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] bg-white/95 backdrop-blur-md border-t border-[#e5e9e7] grid grid-cols-5 py-2 px-1 z-40 shadow-[0_-4px_20px_rgba(0,0,0,0.04)]">
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <button
            key={item.id}
            onClick={item.action}
            className={`flex flex-col items-center justify-center gap-1 py-1 transition-all ${
              item.isActive
                ? 'text-emerald-700 font-bold'
                : 'text-slate-500 font-medium hover:text-slate-800'
            }`}
          >
            <div className={`p-1 rounded-xl transition-all ${item.isActive ? 'bg-emerald-100/70 text-emerald-800' : ''}`}>
              <Icon className="w-5 h-5 stroke-[2.2]" />
            </div>
            <span className="text-[10px] tracking-tight">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
};
