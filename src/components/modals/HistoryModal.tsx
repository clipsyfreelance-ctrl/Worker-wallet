import React, { useState } from 'react';
import { ModalWrapper } from './ModalWrapper';
import { Transaction } from '../../types';
import { ArrowDownLeft, ArrowRightLeft, Smartphone, Search, Filter } from 'lucide-react';

interface HistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  transactions: Transaction[];
  onSelectTransaction: (tx: Transaction) => void;
}

export const HistoryModal: React.FC<HistoryModalProps> = ({
  isOpen,
  onClose,
  transactions,
  onSelectTransaction,
}) => {
  const [filter, setFilter] = useState<'all' | 'in' | 'out'>('all');
  const [search, setSearch] = useState('');

  const filtered = transactions.filter((tx) => {
    const isIn = tx.type === 'deposit' || tx.type === 'receive';
    if (filter === 'in' && !isIn) return false;
    if (filter === 'out' && isIn) return false;

    if (search.trim()) {
      const q = search.toLowerCase();
      const matchTitle = tx.title.toLowerCase().includes(q);
      const matchNote = tx.note?.toLowerCase().includes(q);
      const matchBank = tx.bank?.toLowerCase().includes(q);
      const matchRecipient = tx.recipientName?.toLowerCase().includes(q);
      const matchRef = tx.referenceNo.toLowerCase().includes(q);
      return matchTitle || matchNote || matchBank || matchRecipient || matchRef;
    }
    return true;
  });

  return (
    <ModalWrapper
      isOpen={isOpen}
      onClose={onClose}
      title="Transaction History"
      subtitle="All deposits, transfers, and mobile top-ups."
    >
      <div className="space-y-3">
        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search transactions, banks, ref..."
            className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-[#e5e9e7] focus:border-emerald-500 focus:bg-white rounded-xl text-xs outline-hidden"
          />
        </div>

        {/* Filter chips */}
        <div className="flex gap-1.5">
          {(['all', 'in', 'out'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`text-xs font-semibold px-3 py-1 rounded-lg capitalize transition-all ${
                filter === f
                  ? 'bg-emerald-700 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {f === 'all' ? 'All Transactions' : f === 'in' ? 'Deposits (In)' : 'Expenses (Out)'}
            </button>
          ))}
        </div>

        {/* List */}
        <div className="max-h-[50vh] overflow-y-auto space-y-2 pt-1 pr-1">
          {filtered.length === 0 ? (
            <div className="py-8 text-center text-slate-400 text-xs">
              No transactions found.
            </div>
          ) : (
            filtered.map((tx) => {
              const isIn = tx.type === 'deposit' || tx.type === 'receive';
              const Icon =
                tx.type === 'deposit'
                  ? ArrowDownLeft
                  : tx.type === 'pulsa'
                  ? Smartphone
                  : ArrowRightLeft;

              return (
                <div
                  key={tx.id}
                  onClick={() => onSelectTransaction(tx)}
                  className="bg-white border border-[#e5e9e7] hover:border-emerald-300 rounded-xl p-3 flex items-center justify-between gap-2.5 cursor-pointer active:bg-slate-50 transition-all group"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                        isIn
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="truncate">
                      <div className="text-xs font-bold text-slate-900 group-hover:text-emerald-700 transition-colors truncate">
                        {tx.title}
                      </div>
                      <div className="text-[10px] text-slate-500 mt-0.5 truncate">
                        {tx.date} · {tx.method || tx.bank || tx.provider || 'Instant'}
                      </div>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <div
                      className={`text-xs font-bold ${
                        isIn ? 'text-emerald-700' : 'text-rose-600'
                      }`}
                    >
                      {isIn ? '+' : '-'}€
                      {tx.amountEUR.toLocaleString('en-US', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </div>
                    <span className="text-[9px] font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.2 rounded">
                      {tx.status}
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>

        <button
          onClick={onClose}
          className="w-full mt-3 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-xs transition-colors"
        >
          Close History
        </button>
      </div>
    </ModalWrapper>
  );
};
