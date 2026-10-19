import React, { useState } from 'react';
import { ModalWrapper } from './ModalWrapper';
import { ArrowDownLeft } from 'lucide-react';

interface DepositModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDeposit: (data: { amount: number; method: string; date: string; note?: string }) => void;
  onShowToast: (msg: string, type?: 'success' | 'error' | 'info') => void;
}

export const DepositModal: React.FC<DepositModalProps> = ({
  isOpen,
  onClose,
  onDeposit,
  onShowToast,
}) => {
  const [amount, setAmount] = useState('');
  const [method, setMethod] = useState('Bank Transfer');
  const [date, setDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [note, setNote] = useState('');

  const quickAmounts = [50, 100, 250, 500, 1000];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(amount);
    if (!val || val <= 0) {
      onShowToast('Please enter a valid deposit amount.', 'error');
      return;
    }

    onDeposit({
      amount: val,
      method,
      date: date || new Date().toISOString().split('T')[0],
      note: note.trim() || undefined,
    });

    setAmount('');
    setNote('');
  };

  return (
    <ModalWrapper
      isOpen={isOpen}
      onClose={onClose}
      title="Deposit"
      subtitle="Add funds to your personal Worken wallet."
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Amount */}
        <div>
          <label className="text-xs font-semibold text-slate-600 block mb-1.5">
            Amount (EUR)
          </label>
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-bold text-slate-500 text-base">
              €
            </span>
            <input
              type="number"
              step="any"
              min="0.01"
              required
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className="w-full pl-8 pr-4 py-3 bg-slate-50 border border-[#e5e9e7] focus:border-emerald-500 focus:bg-white rounded-xl text-base font-semibold outline-hidden transition-all"
            />
          </div>

          {/* Quick presets */}
          <div className="flex flex-wrap gap-1.5 mt-2">
            {quickAmounts.map((q) => (
              <button
                type="button"
                key={q}
                onClick={() => setAmount(q.toString())}
                className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-emerald-100 hover:text-emerald-800 text-slate-700 transition-colors"
              >
                +€{q}
              </button>
            ))}
          </div>
        </div>

        {/* Method */}
        <div>
          <label className="text-xs font-semibold text-slate-600 block mb-1.5">
            Deposit Method
          </label>
          <select
            value={method}
            onChange={(e) => setMethod(e.target.value)}
            className="w-full px-3.5 py-3 bg-slate-50 border border-[#e5e9e7] focus:border-emerald-500 focus:bg-white rounded-xl text-sm font-medium outline-hidden transition-all"
          >
            <option>Bank Transfer</option>
            <option>Company Payroll</option>
            <option>Card (Visa / Mastercard)</option>
            <option>Cash Deposit</option>
            <option>Wise / SEPA Transfer</option>
          </select>
        </div>

        {/* Date */}
        <div>
          <label className="text-xs font-semibold text-slate-600 block mb-1.5">
            Deposit Date
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-3.5 py-3 bg-slate-50 border border-[#e5e9e7] focus:border-emerald-500 focus:bg-white rounded-xl text-sm font-medium outline-hidden transition-all"
          />
        </div>

        {/* Note */}
        <div>
          <label className="text-xs font-semibold text-slate-600 block mb-1.5">
            Note (Optional)
          </label>
          <input
            type="text"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="e.g. October payroll / tip share"
            className="w-full px-3.5 py-3 bg-slate-50 border border-[#e5e9e7] focus:border-emerald-500 focus:bg-white rounded-xl text-sm outline-hidden transition-all"
          />
        </div>

        {/* Buttons */}
        <div className="pt-2 flex flex-col gap-2">
          <button
            type="submit"
            className="w-full py-3.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl shadow-md shadow-emerald-800/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2 text-sm"
          >
            <ArrowDownLeft className="w-4 h-4" />
            <span>Confirm Deposit</span>
          </button>
          <button
            type="button"
            onClick={onClose}
            className="w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-sm transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </ModalWrapper>
  );
};
