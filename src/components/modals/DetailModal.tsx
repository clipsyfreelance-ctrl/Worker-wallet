import React from 'react';
import { ModalWrapper } from './ModalWrapper';
import { Transaction } from '../../types';
import { CheckCircle2, Copy, Share2 } from 'lucide-react';

interface DetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  transaction: Transaction | null;
  onShowToast: (msg: string, type?: 'success' | 'error' | 'info') => void;
}

export const DetailModal: React.FC<DetailModalProps> = ({
  isOpen,
  onClose,
  transaction,
  onShowToast,
}) => {
  if (!transaction) return null;

  const isIn = transaction.type === 'deposit' || transaction.type === 'receive';

  const copyRef = () => {
    navigator.clipboard?.writeText(transaction.referenceNo);
    onShowToast(`Reference ${transaction.referenceNo} copied!`, 'info');
  };

  const copyFullReceipt = () => {
    const text = `WORKEN WALLET RECEIPT\nType: ${transaction.title}\nDate: ${transaction.date}\nAmount: ${isIn ? '+' : '-'}€${transaction.amountEUR.toFixed(2)}\nRef: ${transaction.referenceNo}\nStatus: ${transaction.status}`;
    navigator.clipboard?.writeText(text);
    onShowToast('Full receipt copied to clipboard!', 'success');
  };

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose}>
      <div className="text-center pt-1 pb-3">
        <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center mb-2.5 shadow-xs">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h3 className="text-base font-bold text-slate-900 tracking-tight">
          {isIn ? 'Transaction Completed' : 'Transfer Processed'}
        </h3>
        <p className="text-xs text-slate-500 mt-0.5">
          {transaction.note || 'Your funds are securely processed.'}
        </p>
      </div>

      {/* Digital Receipt */}
      <div className="bg-[#f8faf9] border border-dashed border-emerald-400 rounded-2xl p-4 text-xs space-y-2.5 my-3 relative overflow-hidden">
        <div className="flex justify-between items-center text-slate-500 pb-2 border-b border-slate-200">
          <span>Transaction Type</span>
          <span className="font-bold text-slate-900">{transaction.title}</span>
        </div>

        <div className="flex justify-between items-center text-slate-500">
          <span>Date</span>
          <span className="font-semibold text-slate-800">{transaction.date}</span>
        </div>

        {transaction.method && (
          <div className="flex justify-between items-center text-slate-500">
            <span>Method</span>
            <span className="font-semibold text-slate-800">{transaction.method}</span>
          </div>
        )}

        {transaction.recipientName && (
          <div className="flex justify-between items-center text-slate-500">
            <span>Recipient</span>
            <span className="font-semibold text-slate-800">{transaction.recipientName}</span>
          </div>
        )}

        {transaction.bank && (
          <div className="flex justify-between items-center text-slate-500">
            <span>Bank / Service</span>
            <span className="font-semibold text-slate-800">{transaction.bank}</span>
          </div>
        )}

        {transaction.accountNumber && (
          <div className="flex justify-between items-center text-slate-500">
            <span>Account No</span>
            <span className="font-mono font-semibold text-slate-800">{transaction.accountNumber}</span>
          </div>
        )}

        {transaction.phoneNumber && (
          <div className="flex justify-between items-center text-slate-500">
            <span>Phone / Provider</span>
            <span className="font-semibold text-slate-800">{transaction.phoneNumber} ({transaction.provider})</span>
          </div>
        )}

        {transaction.amountUSD && (
          <div className="flex justify-between items-center text-slate-500">
            <span>Original (USD)</span>
            <span className="font-semibold text-slate-800">${transaction.amountUSD.toFixed(2)}</span>
          </div>
        )}

        <div className="flex justify-between items-center pt-2 border-t border-slate-200">
          <span className="font-semibold text-slate-700">Total Amount</span>
          <span
            className={`text-base font-extrabold ${
              isIn ? 'text-emerald-700' : 'text-rose-600'
            }`}
          >
            {isIn ? '+' : '-'}€{transaction.amountEUR.toFixed(2)}
          </span>
        </div>

        <div className="flex justify-between items-center pt-1 text-[11px] text-slate-500">
          <span>Reference No.</span>
          <button
            onClick={copyRef}
            className="flex items-center gap-1 font-mono font-medium text-emerald-800 hover:text-emerald-600 cursor-pointer"
          >
            <span>{transaction.referenceNo}</span>
            <Copy className="w-3 h-3 text-slate-400" />
          </button>
        </div>

        <div className="flex justify-between items-center text-[11px]">
          <span className="text-slate-500">Status</span>
          <span className="font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full text-[10px]">
            {transaction.status}
          </span>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-col gap-2 pt-1">
        <button
          onClick={copyFullReceipt}
          className="w-full py-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 font-semibold rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5"
        >
          <Share2 className="w-3.5 h-3.5" />
          <span>Copy Digital Receipt</span>
        </button>
        <button
          onClick={onClose}
          className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-xs transition-colors"
        >
          Close
        </button>
      </div>
    </ModalWrapper>
  );
};
