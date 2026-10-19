import React, { useState } from 'react';
import { ModalWrapper } from './ModalWrapper';
import { Calculator, Euro, CheckCircle2 } from 'lucide-react';
import { EUR_IDR_RATE } from '../../data/initialData';

interface CalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDepositSimulatedSalary?: (amount: number) => void;
}

export const CalculatorModal: React.FC<CalculatorModalProps> = ({
  isOpen,
  onClose,
  onDepositSimulatedSalary,
}) => {
  const [regularHours, setRegularHours] = useState(160); // 40h * 4 weeks
  const [otHours, setOtHours] = useState(15);
  const [includeIncentive, setIncludeIncentive] = useState(true);
  const [includeMeal, setIncludeMeal] = useState(true);

  const baseRate = 22.0;
  const otRate = 15.0;
  const incentiveAmt = 600.0;
  const mealAmt = 500.0;

  const regularPay = regularHours * baseRate;
  const otPay = otHours * otRate;
  const incentiveTotal = includeIncentive ? incentiveAmt : 0;
  const mealTotal = includeMeal ? mealAmt : 0;
  const totalEUR = regularPay + otPay + incentiveTotal + mealTotal;
  const totalIDR = totalEUR * EUR_IDR_RATE;

  return (
    <ModalWrapper
      isOpen={isOpen}
      onClose={onClose}
      title="Salary & Pay Calculator"
      subtitle="Estimate your monthly earnings based on your contract terms."
    >
      <div className="space-y-3.5">
        {/* Total Projected Pay Banner */}
        <div className="bg-gradient-to-br from-emerald-800 to-emerald-950 text-white rounded-2xl p-4 shadow-sm">
          <div className="text-[11px] font-semibold text-emerald-200">
            Projected Monthly Gross Income
          </div>
          <div className="text-3xl font-extrabold text-white mt-0.5 tracking-tight font-mono">
            €{totalEUR.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <div className="text-xs text-emerald-300/90 mt-1 font-medium">
            ≈ Rp {Math.round(totalIDR).toLocaleString('id-ID')} IDR
          </div>
        </div>

        {/* Sliders / Inputs */}
        <div className="space-y-3 bg-[#f8faf9] border border-slate-200 rounded-2xl p-4 text-xs">
          <div>
            <div className="flex justify-between font-bold text-slate-800 mb-1">
              <span>Regular Work Hours (at €22/h)</span>
              <span className="text-emerald-700 font-mono">{regularHours} hrs</span>
            </div>
            <input
              type="range"
              min="0"
              max="200"
              step="4"
              value={regularHours}
              onChange={(e) => setRegularHours(Number(e.target.value))}
              className="w-full accent-emerald-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-0.5">
              <span>0h</span>
              <span>160h (Standard 40h/wk)</span>
              <span>200h</span>
            </div>
          </div>

          <div>
            <div className="flex justify-between font-bold text-slate-800 mb-1">
              <span>Overtime Hours (at €15/h)</span>
              <span className="text-emerald-700 font-mono">{otHours} hrs</span>
            </div>
            <input
              type="range"
              min="0"
              max="60"
              step="1"
              value={otHours}
              onChange={(e) => setOtHours(Number(e.target.value))}
              className="w-full accent-emerald-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-0.5">
              <span>0h</span>
              <span>15h</span>
              <span>60h</span>
            </div>
          </div>

          {/* Allowances checkboxes */}
          <div className="pt-2 border-t border-slate-200 space-y-2">
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-slate-700 font-medium">Incentive Bonus (€600/mo)</span>
              <input
                type="checkbox"
                checked={includeIncentive}
                onChange={(e) => setIncludeIncentive(e.target.checked)}
                className="w-4 h-4 accent-emerald-600 rounded"
              />
            </label>
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-slate-700 font-medium">Meal Allowance (€500/mo)</span>
              <input
                type="checkbox"
                checked={includeMeal}
                onChange={(e) => setIncludeMeal(e.target.checked)}
                className="w-4 h-4 accent-emerald-600 rounded"
              />
            </label>
          </div>
        </div>

        {/* Breakdown Breakdown */}
        <div className="bg-white border border-slate-200 rounded-xl p-3 text-xs space-y-1.5 shadow-xs">
          <div className="flex justify-between text-slate-600">
            <span>Base Wage ({regularHours}h × €22)</span>
            <span className="font-semibold text-slate-900">€{regularPay.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-slate-600">
            <span>Overtime ({otHours}h × €15)</span>
            <span className="font-semibold text-slate-900">€{otPay.toFixed(2)}</span>
          </div>
          {includeIncentive && (
            <div className="flex justify-between text-slate-600">
              <span>Incentive Allowance</span>
              <span className="font-semibold text-slate-900">€{incentiveAmt.toFixed(2)}</span>
            </div>
          )}
          {includeMeal && (
            <div className="flex justify-between text-slate-600">
              <span>Meal Allowance</span>
              <span className="font-semibold text-slate-900">€{mealAmt.toFixed(2)}</span>
            </div>
          )}
        </div>

        {/* Deposit simulated salary if user wants to test */}
        {onDepositSimulatedSalary && (
          <button
            onClick={() => onDepositSimulatedSalary(totalEUR)}
            className="w-full py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5 shadow-md shadow-emerald-800/20"
          >
            <Euro className="w-4 h-4" />
            <span>Deposit This Estimated Pay to Wallet</span>
          </button>
        )}

        <button
          onClick={onClose}
          className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-xs transition-colors"
        >
          Close Calculator
        </button>
      </div>
    </ModalWrapper>
  );
};
