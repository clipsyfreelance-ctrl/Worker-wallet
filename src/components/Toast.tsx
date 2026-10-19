import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const Toast: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[200] w-[90%] max-w-[420px] flex flex-col gap-2 pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`pointer-events-auto flex items-center justify-between p-3.5 rounded-xl shadow-lg border text-sm backdrop-blur-md transition-all duration-300 animate-in fade-in slide-in-from-top-2 ${
            toast.type === 'success'
              ? 'bg-[#0d3b2e] text-white border-emerald-500/30'
              : toast.type === 'error'
              ? 'bg-rose-900 text-white border-rose-500/30'
              : 'bg-slate-900 text-white border-slate-700/50'
          }`}
        >
          <div className="flex items-center gap-2.5">
            {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />}
            {toast.type === 'error' && <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />}
            {toast.type === 'info' && <Info className="w-5 h-5 text-sky-400 shrink-0" />}
            <span className="font-medium text-xs sm:text-sm">{toast.message}</span>
          </div>
          <button
            onClick={() => onDismiss(toast.id)}
            className="p-1 hover:bg-white/10 rounded-lg transition-colors ml-2"
          >
            <X className="w-4 h-4 text-white/70" />
          </button>
        </div>
      ))}
    </div>
  );
};
