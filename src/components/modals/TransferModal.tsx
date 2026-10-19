import React, { useState } from 'react';
import { ModalWrapper } from './ModalWrapper';
import { ArrowRightLeft } from 'lucide-react';

interface TransferModalProps {
  isOpen: boolean;
  onClose: () => void;
  balanceEUR: number;
  onTransfer: (data: {
    recipientName: string;
    accountNumber: string;
    bank: string;
    amount: number;
    note?: string;
  }) => void;
  onShowToast: (msg: string, type?: 'success' | 'error' | 'info') => void;
}

export const TransferModal: React.FC<TransferModalProps> = ({
  isOpen,
  onClose,
  balanceEUR,
  onTransfer,
  onShowToast,
}) => {
  const [recipientName, setRecipientName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [bank, setBank] = useState('BCA');
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');

  const bankPresets = ['BCA', 'BNI', 'Mandiri', 'Wise', 'Revolut', 'DSK Bank'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(amount);
    if (!recipientName.trim()) {
      onShowToast('Please enter recipient name.', 'error');
      return;
    }
    if (!accountNumber.trim()) {
      onShowToast('Please enter account number or IBAN.', 'error');
      return;
    }
    if (!val || val <= 0) {
      onShowToast('Please enter a valid transfer amount.', 'error');
      return;
    }
    if (val > balanceEUR) {
      onShowToast(`Insufficient balance! Your current balance is €${balanceEUR.toFixed(2)}.`, 'error');
      return;
    }

    onTransfer({
      recipientName: recipientName.trim(),
      accountNumber: accountNumber.trim(),
      bank: bank.trim(),
      amount: val,
      note: note.trim() || undefined,
    });

    setRecipientName('');
    setAccountNumber('');
    setAmount('');
    setNote('');
  };

  return (
    <ModalWrapper
      isOpen={isOpen}
      onClose={onClose}
      title="Transfer to Account"
      subtitle="Send funds securely to a bank account or e-wallet."
    >
      <form onSubmit={handleSubmit} className="space-y-3.5">
        <div className="bg-emerald-50 border border-emerald-200/60 rounded-xl p-3 flex items-center justify-between text-xs">
          <span className="text-emerald-800 font-medium">Available Balance</span>
          <span className="text-emerald-900 font-bold text-sm">
            €{balanceEUR.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
        </div>

        {/* Recipient Name */}
        <div>
          <label className="text-xs font-semibold text-slate-600 block mb-1">
            Recipient Name
          </label>
          <input
            type="text"
            required
            value={recipientName}
            onChange={(e) => setRecipientName(e.target.value)}
            placeholder="e.g. Ahmad / Siti Rahma"
            className="w-full px-3.5 py-2.5 bg-slate-50 border border-[#e5e9e7] focus:border-emerald-500 focus:bg-white rounded-xl text-sm font-medium outline-hidden transition-all"
          />
        </div>

        {/* Account Number */}
        <div>
          <label className="text-xs font-semibold text-slate-600 block mb-1">
            Account Number / IBAN
          </label>
          <input
            type="text"
            required
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
            placeholder="e.g. 521-002-981 or BG29 STSA 9300..."
            className="w-full px-3.5 py-2.5 bg-slate-50 border border-[#e5e9e7] focus:border-emerald-500 focus:bg-white rounded-xl text-sm font-mono outline-hidden transition-all"
          />
        </div>

        {/* Bank */}
        <div>
          <label className="text-xs font-semibold text-slate-600 block mb-1">
            Bank / Service
          </label>
          <input
            type="text"
            required
            value={bank}
            onChange={(e) => setBank(e.target.value)}
            placeholder="e.g. BCA / BNI / Wise / Revolut"
            className="w-full px-3.5 py-2.5 bg-slate-50 border border-[#e5e9e7] focus:border-emerald-500 focus:bg-white rounded-xl text-sm font-medium outline-hidden transition-all"
          />
          <div className="flex flex-wrap gap-1.5 mt-1.5">
            {bankPresets.map((b) => (
              <button
                type="button"
                key={b}
                onClick={() => setBank(b)}
                className={`text-[11px] font-semibold px-2 py-0.5 rounded-lg border transition-all ${
                  bank === b
                    ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                    : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200'
                }`}
              >
                {b}
              </button>
            ))}
          </div>
        </div>

        {/* Amount */}
        <div>
          <label className="text-xs font-semibold text-slate-600 block mb-1">
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
              max={balanceEUR}
              required
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className="w-full pl-8 pr-4 py-2.5 bg-slate-50 border border-[#e5e9e7] focus:border-emerald-500 focus:bg-white rounded-xl text-base font-semibold outline-hidden transition-all"
            />
          </div>
          <button
            type="button"
            onClick={() => setAmount(balanceEUR.toString())}
            className="text-[11px] font-semibold text-emerald-700 hover:underline mt-1 block"
          >
            Transfer all available (€{balanceEUR.toFixed(2)})
          </button>
        </div>

        {/* Note */}
        <div>
          <label className="text-xs font-semibold text-slate-600 block mb-1">
            Transfer Purpose / Note (Optional)
          </label>
          <input
            type="text"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="e.g. Family support / Biak savings"
            className="w-full px-3.5 py-2.5 bg-slate-50 border border-[#e5e9e7] focus:border-emerald-500 focus:bg-white rounded-xl text-sm outline-hidden transition-all"
          />
        </div>

        {/* Actions */}
        <div className="pt-2 flex flex-col gap-2">
          <button
            type="submit"
            className="w-full py-3.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl shadow-md shadow-emerald-800/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2 text-sm"
          >
            <ArrowRightLeft className="w-4 h-4" />
            <span>Send Transfer</span>
          </button>
          <button
            type="button"
            onClick={onClose}
            className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-sm transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </ModalWrapper>
  );
};
