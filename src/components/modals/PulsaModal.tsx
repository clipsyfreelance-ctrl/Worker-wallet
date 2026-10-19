import React, { useState } from 'react';
import { ModalWrapper } from './ModalWrapper';
import { Smartphone, Zap } from 'lucide-react';
import { PULSA_PACKAGES } from '../../data/initialData';

interface PulsaModalProps {
  isOpen: boolean;
  onClose: () => void;
  balanceEUR: number;
  onPurchase: (data: {
    phoneNumber: string;
    provider: string;
    amount: number;
    packageLabel?: string;
  }) => void;
  onShowToast: (msg: string, type?: 'success' | 'error' | 'info') => void;
}

export const PulsaModal: React.FC<PulsaModalProps> = ({
  isOpen,
  onClose,
  balanceEUR,
  onPurchase,
  onShowToast,
}) => {
  const [phone, setPhone] = useState('+62 812-4890-2134');
  const [provider, setProvider] = useState('Telkomsel');
  const [customAmount, setCustomAmount] = useState('5.00');
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);

  const providers = [
    'Telkomsel',
    'XL',
    'Indosat',
    'Tri',
    'Smartfren',
    'A1 Bulgaria',
    'Yettel Bulgaria',
    'Vivacom',
  ];

  const handleSelectPackage = (pkg: typeof PULSA_PACKAGES[0]) => {
    setSelectedPackage(pkg.label);
    setCustomAmount(pkg.priceEUR.toFixed(2));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(customAmount);
    if (!phone.trim()) {
      onShowToast('Please enter a destination phone number.', 'error');
      return;
    }
    if (!val || val <= 0) {
      onShowToast('Please enter a valid amount.', 'error');
      return;
    }
    if (val > balanceEUR) {
      onShowToast(`Insufficient balance! Your current balance is €${balanceEUR.toFixed(2)}.`, 'error');
      return;
    }

    onPurchase({
      phoneNumber: phone.trim(),
      provider,
      amount: val,
      packageLabel: selectedPackage || `${provider} Top-Up`,
    });
  };

  return (
    <ModalWrapper
      isOpen={isOpen}
      onClose={onClose}
      title="Mobile Top-Up & Data"
      subtitle="Purchase Indonesian or European mobile credit and data roaming."
    >
      <form onSubmit={handleSubmit} className="space-y-3.5">
        <div className="bg-emerald-50 border border-emerald-200/60 rounded-xl p-3 flex items-center justify-between text-xs">
          <span className="text-emerald-800 font-medium">Available Balance</span>
          <span className="text-emerald-900 font-bold text-sm">
            €{balanceEUR.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
        </div>

        {/* Phone number */}
        <div>
          <label className="text-xs font-semibold text-slate-600 block mb-1">
            Phone Number
          </label>
          <input
            type="tel"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+62 8xx xxxx xxxx / +359..."
            className="w-full px-3.5 py-2.5 bg-slate-50 border border-[#e5e9e7] focus:border-emerald-500 focus:bg-white rounded-xl text-sm font-mono outline-hidden transition-all"
          />
        </div>

        {/* Provider */}
        <div>
          <label className="text-xs font-semibold text-slate-600 block mb-1">
            Provider
          </label>
          <select
            value={provider}
            onChange={(e) => setProvider(e.target.value)}
            className="w-full px-3.5 py-2.5 bg-slate-50 border border-[#e5e9e7] focus:border-emerald-500 focus:bg-white rounded-xl text-sm font-medium outline-hidden transition-all"
          >
            {providers.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>

        {/* Packages Grid */}
        <div>
          <label className="text-xs font-semibold text-slate-600 block mb-1.5 flex items-center gap-1">
            <Zap className="w-3.5 h-3.5 text-amber-500" />
            Quick Packages
          </label>
          <div className="grid grid-cols-2 gap-2">
            {PULSA_PACKAGES.map((pkg) => {
              const isSelected = selectedPackage === pkg.label;
              return (
                <button
                  type="button"
                  key={pkg.label}
                  onClick={() => handleSelectPackage(pkg)}
                  className={`text-left p-2.5 rounded-xl border transition-all ${
                    isSelected
                      ? 'border-emerald-500 bg-emerald-50 ring-1 ring-emerald-500'
                      : 'border-[#e5e9e7] bg-white hover:bg-slate-50'
                  }`}
                >
                  <div className="font-bold text-xs text-slate-900">{pkg.label}</div>
                  <div className="text-[10px] text-slate-500 truncate">{pkg.provider}</div>
                  <div className="text-xs font-extrabold text-emerald-700 mt-1">€{pkg.priceEUR.toFixed(2)}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Custom Amount */}
        <div>
          <label className="text-xs font-semibold text-slate-600 block mb-1">
            Amount (EUR)
          </label>
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-bold text-slate-500 text-sm">
              €
            </span>
            <input
              type="number"
              step="any"
              min="0.5"
              required
              value={customAmount}
              onChange={(e) => {
                setCustomAmount(e.target.value);
                setSelectedPackage(null);
              }}
              placeholder="0.00"
              className="w-full pl-8 pr-4 py-2.5 bg-slate-50 border border-[#e5e9e7] focus:border-emerald-500 focus:bg-white rounded-xl text-sm font-semibold outline-hidden transition-all"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="pt-2 flex flex-col gap-2">
          <button
            type="submit"
            className="w-full py-3.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl shadow-md shadow-emerald-800/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2 text-sm"
          >
            <Smartphone className="w-4 h-4" />
            <span>Confirm Purchase</span>
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
