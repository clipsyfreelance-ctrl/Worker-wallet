import React, { useState, useEffect } from 'react';
import { Transaction, ModalType, UserProfile } from './types';
import {
  INITIAL_EUR,
  INITIAL_TRANSACTIONS,
  DEFAULT_PROFILE,
} from './data/initialData';
import { Navbar } from './components/Navbar';
import { BalanceCard } from './components/BalanceCard';
import { QuickActions } from './components/QuickActions';
import { EarningsSection } from './components/EarningsSection';
import { AccommodationSection } from './components/AccommodationSection';
import { WorkplaceSection } from './components/WorkplaceSection';
import { ActionCards } from './components/TicketCard';
import { DocumentsSection } from './components/DocumentsSection';
import { BottomNav } from './components/BottomNav';
import { Toast, ToastMessage } from './components/Toast';

// Modals
import { DepositModal } from './components/modals/DepositModal';
import { TransferModal } from './components/modals/TransferModal';
import { PulsaModal } from './components/modals/PulsaModal';
import { HistoryModal } from './components/modals/HistoryModal';
import { DetailModal } from './components/modals/DetailModal';
import { TicketModal } from './components/modals/TicketModal';
import { ContractModal } from './components/modals/ContractModal';
import { ProfileModal } from './components/modals/ProfileModal';
import { CalculatorModal } from './components/modals/CalculatorModal';
import { DocumentsModal } from './components/modals/DocumentsModal';

const STORAGE_KEY = 'worken_wallet_state_v1';

export default function App() {
  const [balance, setBalance] = useState<number>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (typeof parsed.balance === 'number') return parsed.balance;
      }
    } catch (e) {
      console.error('Failed to load wallet state from localStorage', e);
    }
    return INITIAL_EUR;
  });

  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed.transactions)) return parsed.transactions;
      }
    } catch (e) {
      console.error('Failed to load transactions from localStorage', e);
    }
    return INITIAL_TRANSACTIONS;
  });

  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [selectedTx, setSelectedTx] = useState<Transaction | null>(null);
  const [currency, setCurrency] = useState<'EUR' | 'USD' | 'IDR'>('EUR');
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Persist state
  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ balance, transactions })
      );
    } catch (e) {
      console.error('Failed to save to localStorage', e);
    }
  }, [balance, transactions]);

  // Toast helper
  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 6);
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3800);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const toggleCurrency = () => {
    setCurrency((prev) => (prev === 'EUR' ? 'USD' : prev === 'USD' ? 'IDR' : 'EUR'));
  };

  // Deposit Action
  const handleDeposit = ({
    amount,
    method,
    date,
    note,
  }: {
    amount: number;
    method: string;
    date: string;
    note?: string;
  }) => {
    const d = new Date(date);
    const dateFormatted = d.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });

    const newTx: Transaction = {
      id: 'tx-' + Date.now(),
      type: 'deposit',
      title: 'Deposit',
      date: dateFormatted,
      timestamp: Date.now(),
      amountEUR: amount,
      method,
      note: note || 'Balance can be used anytime.',
      status: 'SUCCESS',
      referenceNo: `WRK-DEP-${Math.floor(100000 + Math.random() * 900000)}`,
    };

    setBalance((prev) => +(prev + amount).toFixed(2));
    setTransactions((prev) => [newTx, ...prev]);
    setActiveModal(null);
    setSelectedTx(newTx);
    setActiveModal('detail');
    showToast(`Successfully deposited €${amount.toFixed(2)}!`, 'success');
  };

  // Transfer Action
  const handleTransfer = ({
    recipientName,
    accountNumber,
    bank,
    amount,
    note,
  }: {
    recipientName: string;
    accountNumber: string;
    bank: string;
    amount: number;
    note?: string;
  }) => {
    const today = new Date().toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });

    const newTx: Transaction = {
      id: 'tx-' + Date.now(),
      type: 'transfer',
      title: `Transfer to ${recipientName}`,
      date: today,
      timestamp: Date.now(),
      amountEUR: amount,
      recipientName,
      accountNumber,
      bank,
      note: note || `Bank transfer to ${bank} - ${accountNumber}`,
      status: 'SUCCESS',
      referenceNo: `WRK-TRF-${Math.floor(100000 + Math.random() * 900000)}`,
    };

    setBalance((prev) => +(prev - amount).toFixed(2));
    setTransactions((prev) => [newTx, ...prev]);
    setActiveModal(null);
    setSelectedTx(newTx);
    setActiveModal('detail');
    showToast(`Successfully sent €${amount.toFixed(2)} to ${recipientName}!`, 'success');
  };

  // Pulsa Action
  const handlePulsa = ({
    phoneNumber,
    provider,
    amount,
    packageLabel,
  }: {
    phoneNumber: string;
    provider: string;
    amount: number;
    packageLabel?: string;
  }) => {
    const today = new Date().toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });

    const newTx: Transaction = {
      id: 'tx-' + Date.now(),
      type: 'pulsa',
      title: packageLabel || `${provider} Top-Up`,
      date: today,
      timestamp: Date.now(),
      amountEUR: amount,
      phoneNumber,
      provider,
      note: `Top-up for ${phoneNumber} (${provider})`,
      status: 'SUCCESS',
      referenceNo: `WRK-PLS-${Math.floor(100000 + Math.random() * 900000)}`,
    };

    setBalance((prev) => +(prev - amount).toFixed(2));
    setTransactions((prev) => [newTx, ...prev]);
    setActiveModal(null);
    setSelectedTx(newTx);
    setActiveModal('detail');
    showToast(`Purchased ${packageLabel || 'Top-Up'} for €${amount.toFixed(2)}!`, 'success');
  };

  // Reset Wallet
  const handleResetWallet = () => {
    setBalance(INITIAL_EUR);
    setTransactions(INITIAL_TRANSACTIONS);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.error(e);
    }
    setActiveModal(null);
    showToast('Wallet reset to initial balance of €921.84!', 'info');
  };

  // Deposit Simulated Salary
  const handleDepositSimulatedSalary = (amount: number) => {
    const today = new Date().toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });

    const newTx: Transaction = {
      id: 'tx-' + Date.now(),
      type: 'deposit',
      title: 'Monthly Salary Disbursement',
      date: today,
      timestamp: Date.now(),
      amountEUR: amount,
      method: 'The Emporium Hotel Payroll SEPA',
      note: 'Simulated contract salary & benefits payout.',
      status: 'SUCCESS',
      referenceNo: `WRK-SAL-${Math.floor(100000 + Math.random() * 900000)}`,
    };

    setBalance((prev) => +(prev + amount).toFixed(2));
    setTransactions((prev) => [newTx, ...prev]);
    setActiveModal(null);
    setSelectedTx(newTx);
    setActiveModal('detail');
    showToast(`Salary disbursement of €${amount.toFixed(2)} deposited!`, 'success');
  };

  return (
    <div className="min-h-screen bg-[#ecefe0]/30 flex justify-center">
      <div className="w-full max-w-[480px] bg-[#f5f7f6] text-[#0f172a] min-h-screen pb-24 relative shadow-2xl border-x border-[#e5e9e7]">
        {/* Toast notifications */}
        <Toast toasts={toasts} onDismiss={dismissToast} />

        {/* Topbar */}
        <Navbar
          onOpenProfile={() => setActiveModal('profile')}
          currency={currency}
          onToggleCurrency={toggleCurrency}
          avatarUrl={DEFAULT_PROFILE.avatarUrl}
        />

        {/* Main Content */}
        <main>
          {/* Balance Card */}
          <BalanceCard
            balanceEUR={balance}
            currency={currency}
            onOpenCalculator={() => setActiveModal('calculator')}
          />

          {/* Quick Actions */}
          <QuickActions onOpenModal={(m) => setActiveModal(m)} />

          {/* Income Structure */}
          <EarningsSection onOpenCalculator={() => setActiveModal('calculator')} />

          {/* Accommodation & Benefits */}
          <AccommodationSection />

          {/* Workplace / Hotel */}
          <WorkplaceSection onNotify={(msg) => showToast(msg, 'info')} />

          {/* Kelengkapan Dokumen Kedutaan (14 Dokumen) */}
          <DocumentsSection onOpenDocuments={() => setActiveModal('documents')} />

          {/* Departure Ticket & Contract */}
          <ActionCards
            onOpenTicket={() => setActiveModal('ticket')}
            onOpenContract={() => setActiveModal('contract')}
          />

          {/* Subtle footer info */}
          <footer className="mx-4 mt-8 mb-4 text-center text-slate-400 text-[11px] space-y-1">
            <p>Worken Portfolio Wallet · Verified Employment Portal</p>
            <p>© 2026 The Emporium Hotel Plovdiv — MGallery Collection</p>
          </footer>
        </main>

        {/* Bottom Navigation */}
        <BottomNav
          activeModal={activeModal}
          onOpenModal={(m) => setActiveModal(m)}
          onGoHome={() => setActiveModal(null)}
        />

        {/* Modals */}
        <DepositModal
          isOpen={activeModal === 'deposit'}
          onClose={() => setActiveModal(null)}
          onDeposit={handleDeposit}
          onShowToast={showToast}
        />

        <TransferModal
          isOpen={activeModal === 'transfer'}
          onClose={() => setActiveModal(null)}
          balanceEUR={balance}
          onTransfer={handleTransfer}
          onShowToast={showToast}
        />

        <PulsaModal
          isOpen={activeModal === 'pulsa'}
          onClose={() => setActiveModal(null)}
          balanceEUR={balance}
          onPurchase={handlePulsa}
          onShowToast={showToast}
        />

        <HistoryModal
          isOpen={activeModal === 'history'}
          onClose={() => setActiveModal(null)}
          transactions={transactions}
          onSelectTransaction={(tx) => {
            setSelectedTx(tx);
            setActiveModal('detail');
          }}
        />

        <DetailModal
          isOpen={activeModal === 'detail'}
          onClose={() => setActiveModal(null)}
          transaction={selectedTx}
          onShowToast={showToast}
        />

        <TicketModal
          isOpen={activeModal === 'ticket'}
          onClose={() => setActiveModal(null)}
          onShowToast={showToast}
        />

        <ContractModal
          isOpen={activeModal === 'contract'}
          onClose={() => setActiveModal(null)}
          onShowToast={showToast}
        />

        <ProfileModal
          isOpen={activeModal === 'profile'}
          onClose={() => setActiveModal(null)}
          profile={DEFAULT_PROFILE}
          onResetWallet={handleResetWallet}
          onShowToast={showToast}
          onOpenDocuments={() => setActiveModal('documents')}
        />

        <CalculatorModal
          isOpen={activeModal === 'calculator'}
          onClose={() => setActiveModal(null)}
          onDepositSimulatedSalary={handleDepositSimulatedSalary}
        />

        <DocumentsModal
          isOpen={activeModal === 'documents'}
          onClose={() => setActiveModal(null)}
          onShowToast={showToast}
        />
      </div>
    </div>
  );
}
