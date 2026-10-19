import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface ModalWrapperProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
}

export const ModalWrapper: React.FC<ModalWrapperProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
}) => {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-end justify-center z-50 p-0 sm:p-4 animate-in fade-in duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white w-full max-w-[480px] rounded-t-[28px] sm:rounded-[28px] p-5 sm:p-6 max-h-[90vh] overflow-y-auto animate-in slide-in-from-bottom-8 duration-250 shadow-2xl relative border border-slate-100"
      >
        {/* Handle for drag / visual cue */}
        <div className="w-10 h-1.5 bg-slate-200 rounded-full mx-auto mb-4" />

        {/* Header */}
        {(title || subtitle) && (
          <div className="flex items-start justify-between mb-4">
            <div>
              {title && <h3 className="text-lg font-bold text-slate-900 tracking-tight">{title}</h3>}
              {subtitle && <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>}
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors ml-2"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        )}

        {children}
      </div>
    </div>
  );
};
