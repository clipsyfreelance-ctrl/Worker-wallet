import React from 'react';
import { ModalWrapper } from './ModalWrapper';
import { Plane, Bus, Luggage, CheckCircle2, Calendar, MapPin } from 'lucide-react';

interface TicketModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShowToast: (msg: string, type?: 'success' | 'error' | 'info') => void;
}

export const TicketModal: React.FC<TicketModalProps> = ({ isOpen, onClose, onShowToast }) => {
  const segments = [
    {
      title: 'Flight 1 · Domestic Feeder',
      route: 'PKU → CGK',
      from: 'Pekanbaru (Sultan Syarif Kasim II)',
      to: 'Jakarta (Soekarno-Hatta Int’l)',
      airline: 'Garuda Indonesia / Batik Air',
      duration: '~1h 45m',
      notes: 'Transfer Domestic → Intl Terminal 3',
      baggage: '2x 23kg Checked Baggage',
    },
    {
      title: 'Flight 2 · Intercontinental',
      route: 'CGK → IST',
      from: 'Jakarta (Terminal 3)',
      to: 'Istanbul Airport (IST)',
      airline: 'Turkish Airlines (TK 57)',
      duration: '~12h direct',
      notes: 'In-flight meals & entertainment included',
      baggage: 'Checked-through to Sofia',
    },
    {
      title: 'Flight 3 · European Regional',
      route: 'IST → SOF',
      from: 'Istanbul Airport (IST)',
      to: 'Sofia Airport (SOF Bulgaria)',
      airline: 'Turkish Airlines (TK 1029)',
      duration: '~1h 15m',
      notes: 'Final flight into Bulgaria',
      baggage: 'Collect baggage at SOF carousel',
    },
    {
      title: 'Land Transfer · VIP Chauffeur',
      route: 'SOF → Plovdiv',
      from: 'Sofia International Airport',
      to: 'The Emporium Hotel Plovdiv',
      airline: 'Private Hotel Shuttle Service',
      duration: '~1.5 hours (~145 km via A1 Trakia Hwy)',
      notes: 'Driver will meet at Arrival Hall holding "Worken - Emporium Hotel" sign',
      isLand: true,
    },
  ];

  const copyPNR = () => {
    navigator.clipboard?.writeText('WK-778921-EU');
    onShowToast('Booking PNR: WK-778921-EU copied!', 'info');
  };

  return (
    <ModalWrapper
      isOpen={isOpen}
      onClose={onClose}
      title="Departure Ticket"
      subtitle="27 October 2026 · PKU → CGK → IST → SOF"
    >
      <div className="space-y-3">
        {/* Boarding Header Card */}
        <div className="bg-gradient-to-r from-emerald-800 to-emerald-950 text-white rounded-2xl p-4 shadow-sm relative overflow-hidden">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-300">
                Official E-Ticket & Boarding Plan
              </span>
              <div className="text-xl font-extrabold tracking-tight mt-0.5">Mr. Thoriq Ahmad Ziad</div>
              <div className="text-xs text-emerald-200 mt-0.5 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                <span>Date: 27 October 2026</span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-semibold text-emerald-300 block">PNR Reference</span>
              <button
                onClick={copyPNR}
                className="text-xs font-mono font-bold bg-white/15 px-2 py-0.5 rounded border border-white/20 mt-0.5 hover:bg-white/25 cursor-pointer"
              >
                WK-778921-EU
              </button>
            </div>
          </div>

          <div className="mt-3 pt-3 border-t border-emerald-700/60 flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5 text-emerald-200">
              <Luggage className="w-3.5 h-3.5 text-emerald-300" />
              <span>2x 23kg + 8kg Cabin</span>
            </div>
            <span className="bg-emerald-400 text-emerald-950 font-extrabold text-[10px] px-2.5 py-0.5 rounded-full">
              PAID BY HOTEL
            </span>
          </div>
        </div>

        {/* Segments */}
        <div className="space-y-2.5">
          {segments.map((seg, idx) => (
            <div
              key={seg.title}
              className="bg-[#f8faf9] border border-emerald-200/70 rounded-2xl p-3.5 text-xs text-slate-700 space-y-1.5 hover:border-emerald-400 transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-emerald-800 flex items-center gap-1.5">
                  {seg.isLand ? <Bus className="w-3.5 h-3.5" /> : <Plane className="w-3.5 h-3.5" />}
                  {seg.title}
                </span>
                <span className="font-extrabold text-slate-900 bg-white px-2 py-0.5 rounded border border-slate-200 text-[11px]">
                  {seg.route}
                </span>
              </div>

              <div className="flex justify-between items-center text-slate-600 pt-1">
                <span className="text-slate-500">Carrier / Service</span>
                <span className="font-semibold text-slate-900">{seg.airline}</span>
              </div>

              <div className="flex justify-between items-center text-slate-600">
                <span className="text-slate-500">Duration</span>
                <span className="font-semibold text-slate-800">{seg.duration}</span>
              </div>

              <div className="bg-white rounded-xl p-2 border border-slate-100 text-[11px] text-slate-600 space-y-0.5 mt-1">
                <div>
                  <span className="text-slate-400">Route: </span>
                  <span className="font-medium text-slate-800">{seg.from} → {seg.to}</span>
                </div>
                <div className="text-emerald-700 font-medium">
                  {seg.notes}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Hotel coverage guarantee */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-3 text-xs space-y-1">
          <div className="flex items-center justify-between">
            <span className="font-bold text-amber-900">Payment Status</span>
            <span className="font-bold text-emerald-700 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              PAID BY HOTEL
            </span>
          </div>
          <div className="text-[11px] text-amber-800">
            From Indonesia departure point all the way to hotel room arrival in Plovdiv, Bulgaria.
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full mt-2 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-xs transition-colors"
        >
          Close Itinerary
        </button>
      </div>
    </ModalWrapper>
  );
};
