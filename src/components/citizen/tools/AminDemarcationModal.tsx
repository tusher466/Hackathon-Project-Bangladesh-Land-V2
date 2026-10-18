/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Bangladesh Integrated Land Services Portal (BILSP)
 * Digitized Offline-to-Online Tool 4: Government Amin Demarcation Request
 * (সরকারি আমিন / সার্ভেয়ার দ্বারা জমি পরিমাপ ও সীমানা নির্ধারণ ডিজিটাল আবেদন)
 */

import React, { useState } from 'react';
import { useLanguage } from '../../../context/LanguageContext';
import {
  X,
  Compass,
  CheckCircle2,
  AlertCircle,
  Calendar,
  DollarSign,
  Send,
  Printer,
  FileCheck2,
  Users
} from 'lucide-react';

interface AminDemarcationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AminDemarcationModal: React.FC<AminDemarcationModalProps> = ({
  isOpen,
  onClose
}) => {
  const { language } = useLanguage();

  const [plotDagNo, setPlotDagNo] = useState<string>('৮৯০');
  const [mouzaName, setMouzaName] = useState<string>('কাকরাইল');
  const [upazilaName, setUpazilaName] = useState<string>('রমনা রাজস্ব সার্কেল');
  const [reason, setReason] = useState<string>('pillar');
  const [boundaryNeighbors, setBoundaryNeighbors] = useState<string>('উত্তর: রফিকুল ইসলাম, দক্ষিণ: হাজী আবুল কাশেম, পূর্ব: সরকারি রাস্তা, পশ্চিম: সোহেল রানা');
  const [preferredDate, setPreferredDate] = useState<string>('2026-11-15');

  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [challanToken, setChallanToken] = useState<string>('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setChallanToken(`SURV-2026-${Math.floor(2000 + Math.random() * 8000)}`);
    setIsSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/70 backdrop-blur-sm font-['Hind_Siliguri','Inter',sans-serif]">
      <div className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl border border-slate-200 flex flex-col max-h-[92vh] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-[#006a4e] text-white p-5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-white/10 flex items-center justify-center">
              <Compass className="w-6 h-6 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold">
                  {language === 'bn' ? 'সরকারি আমিন দ্বারা সীমানা নির্ধারণ ও পরিমাপ আবেদন' : 'Government Surveyor Demarcation Request'}
                </h3>
                <span className="text-[10px] bg-amber-400 text-slate-900 font-bold px-2 py-0.5 rounded-full">
                  ডিজিটাইজড সরকারি সেবা
                </span>
              </div>
              <p className="text-xs text-emerald-100">
                {language === 'bn'
                  ? 'অনুমোদিত সরকারি আমিন দ্বারা মৌজা নকশা অনুযায়ী সীমানা পিলার স্থাপন ও বিরোধ নিষ্পত্তি।'
                  : 'Book official AC (Land) surveyor for on-ground boundary demarcation and neighbor notices.'}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-emerald-200 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 p-6 overflow-y-auto space-y-5 bg-slate-50">
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  {language === 'bn' ? 'জমির পরিচিতি ও সীমানা বিরোধের বিবরণ:' : 'Land Particulars & Demarcation Details:'}
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">{language === 'bn' ? 'দাগ নম্বর:' : 'Plot Dag No:'}</label>
                    <input
                      type="text"
                      value={plotDagNo}
                      onChange={(e) => setPlotDagNo(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 font-bold"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">{language === 'bn' ? 'মৌজা:' : 'Mouza:'}</label>
                    <input
                      type="text"
                      value={mouzaName}
                      onChange={(e) => setMouzaName(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 font-semibold"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">{language === 'bn' ? 'উপজেলা / সার্কেল:' : 'Upazila:'}</label>
                    <input
                      type="text"
                      value={upazilaName}
                      onChange={(e) => setUpazilaName(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 font-semibold"
                    />
                  </div>
                </div>

                <div className="text-xs">
                  <label className="block font-bold text-slate-700 mb-1">{language === 'bn' ? 'পরিমাপের কারণ:' : 'Reason for Demarcation:'}</label>
                  <select
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 font-semibold bg-white"
                  >
                    <option value="pillar">{language === 'bn' ? 'স্থায়ী সীমানা পিলার স্থাপন ও দখল চিহ্নিতকরণ' : 'Boundary Pillar Installation'}</option>
                    <option value="dispute">{language === 'bn' ? 'চৌহদ্দির প্রতিবেশীর সাথে সীমানা বিরোধ নিষ্পত্তি' : 'Neighbor Dispute Mediation'}</option>
                    <option value="partition">{language === 'bn' ? 'ওয়ারিশগণের মধ্যকার জমি বণ্টন ও সীমানা বিভাজন' : 'Partition Demarcation'}</option>
                  </select>
                </div>

                <div className="text-xs">
                  <label className="block font-bold text-slate-700 mb-1">
                    {language === 'bn' ? 'চৌহদ্দির প্রতিবেশীদের নাম ও ঠিকানা (নোটিশ জারির জন্য):' : 'Adjacent Boundary Neighbors (For Official Notice):'}
                  </label>
                  <textarea
                    rows={2}
                    value={boundaryNeighbors}
                    onChange={(e) => setBoundaryNeighbors(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 font-medium text-slate-900"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">{language === 'bn' ? 'কাঙ্ক্ষিত পরিমাপের তারিখ:' : 'Preferred Demarcation Date:'}</label>
                    <input
                      type="date"
                      value={preferredDate}
                      onChange={(e) => setPreferredDate(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 font-semibold"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">{language === 'bn' ? 'সরকারি চালানের নির্ধারিত ফি:' : 'Official Demarcation Challan Fee:'}</label>
                    <div className="px-3 py-2 rounded-xl bg-emerald-50 border border-emerald-300 font-bold text-emerald-950 flex items-center justify-between">
                      <span>{language === 'bn' ? 'সর্বমোট সরকারি ফি:' : 'Total Gov Fee:'}</span>
                      <span>৫০০ টাকা (1-4631 কোড)</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#006a4e] hover:bg-emerald-800 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-md"
                >
                  <Send className="w-4 h-4" />
                  <span>{language === 'bn' ? 'আমিন পরিমাপের আবেদন জমা দিন' : 'Submit Demarcation Request'}</span>
                </button>
              </div>
            </form>
          ) : (
            <div className="bg-white p-6 rounded-2xl border border-emerald-300 shadow-xs space-y-4 text-center">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-[#006a4e] flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <h4 className="text-xl font-bold text-slate-900">
                {language === 'bn' ? 'আমিন পরিমাপ আবেদন সফলভাবে গৃহীত হয়েছে!' : 'Demarcation Request Registered!'}
              </h4>

              <div className="bg-slate-900 text-white p-4 rounded-2xl max-w-sm mx-auto space-y-1">
                <span className="text-[10px] text-emerald-400 uppercase tracking-widest font-mono">
                  {language === 'bn' ? 'চালান ট্র্যাকিং নম্বর' : 'Tracking Token'}
                </span>
                <div className="text-2xl font-mono font-bold text-amber-300">{challanToken}</div>
              </div>

              <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
                {language === 'bn'
                  ? `সহকারী কমিশনার (ভূমি) কার্যালয় থেকে সরকারি আমিন বরাদ্দ করা হয়েছে। নির্ধারিত তারিখের (${preferredDate}) পূর্বে সংশ্লিষ্ট সকল চৌহদ্দি প্রতিবেশীদের সরকারি নোটিশ জারি করা হবে।`
                  : `An official government surveyor has been scheduled for ${preferredDate}. Formal notices will be served to all adjacent neighbors.`}
              </p>

              <div className="pt-2 flex justify-center">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="px-4 py-2 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>{language === 'bn' ? 'আবেদন স্লিপ প্রিন্ট' : 'Print Acknowledgment'}</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-white border-t border-slate-200 flex justify-end shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold cursor-pointer"
          >
            {language === 'bn' ? 'বন্ধ করুন' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};
