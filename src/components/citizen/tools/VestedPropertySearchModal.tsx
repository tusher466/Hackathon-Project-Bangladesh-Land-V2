/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Bangladesh Integrated Land Services Portal (BILSP)
 * Digitized Offline-to-Online Tool 3: Vested Property Status Verification & Online Query
 * (অর্পিত সম্পত্তি 'ক' ও 'খ' তফসিল গেজেট অনুসন্ধান ও অনাপত্তি যাচাই)
 */

import React, { useState } from 'react';
import { useLanguage } from '../../../context/LanguageContext';
import {
  X,
  Search,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  FileText,
  Printer,
  Info,
  Building2,
  Download
} from 'lucide-react';

interface VestedPropertySearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VestedPropertySearchModal: React.FC<VestedPropertySearchModalProps> = ({
  isOpen,
  onClose
}) => {
  const { language } = useLanguage();

  const [district, setDistrict] = useState<string>('ঢাকা');
  const [upazila, setUpazila] = useState<string>('রমনা');
  const [mouza, setMouza] = useState<string>('কাকরাইল');
  const [jlNo, setJlNo] = useState<string>('৫৯');
  const [dagNo, setDagNo] = useState<string>('৮৯০');

  const [hasSearched, setHasSearched] = useState<boolean>(false);
  const [isVested, setIsVested] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setHasSearched(true);
    // If user enters specific mock dag, toggle status
    if (dagNo.includes('৯৯') || dagNo.includes('77')) {
      setIsVested(true);
    } else {
      setIsVested(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/70 backdrop-blur-sm font-['Hind_Siliguri','Inter',sans-serif]">
      <div className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl border border-slate-200 flex flex-col max-h-[92vh] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-slate-900 text-white p-5 flex items-center justify-between shrink-0 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-[#006a4e] flex items-center justify-center">
              <ShieldCheck className="w-6 h-6 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold">
                  {language === 'bn' ? 'অর্পিত সম্পত্তি গেজেট অনুসন্ধান ও অনাপত্তি যাচাই' : 'Vested Property Gazette Verification'}
                </h3>
                <span className="text-[10px] bg-emerald-500 text-white font-bold px-2 py-0.5 rounded-full">
                  অনলাইন অনুসন্ধান
                </span>
              </div>
              <p className="text-xs text-slate-300">
                {language === 'bn'
                  ? 'পূর্বে ডিসি অফিসে ম্যানুয়াল গেজেট ঘেঁটে দেখতে হতো; এখন সরাসরি অনলাইন ডাটাবেজে দাগ অনুযায়ী যাচাই করুন।'
                  : 'Check whether a land parcel is enlisted in Vested Property Ka/Kha gazettes.'}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 p-6 overflow-y-auto space-y-6 bg-slate-50">
          {/* Query Form */}
          <form onSubmit={handleSearch} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              {language === 'bn' ? 'জমির অবস্থান ও দাগের বিবরণ দিন:' : 'Enter Land Location & Dag No:'}
            </h4>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">{language === 'bn' ? 'জেলা:' : 'District:'}</label>
                <input
                  type="text"
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 font-semibold"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">{language === 'bn' ? 'উপজেলা / সার্কেল:' : 'Upazila:'}</label>
                <input
                  type="text"
                  value={upazila}
                  onChange={(e) => setUpazila(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 font-semibold"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">{language === 'bn' ? 'মৌজার নাম:' : 'Mouza:'}</label>
                <input
                  type="text"
                  value={mouza}
                  onChange={(e) => setMouza(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 font-semibold"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">{language === 'bn' ? 'জেএল নং:' : 'JL No:'}</label>
                <input
                  type="text"
                  value={jlNo}
                  onChange={(e) => setJlNo(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 font-semibold"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">{language === 'bn' ? 'দাগ নম্বর:' : 'Dag No:'}</label>
                <input
                  type="text"
                  value={dagNo}
                  onChange={(e) => setDagNo(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 font-bold text-slate-900 bg-emerald-50/50"
                />
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-[#006a4e] hover:bg-emerald-800 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-md"
              >
                <Search className="w-4 h-4" />
                <span>{language === 'bn' ? 'গেজেট ডাটাবেজে অনুসন্ধান' : 'Search Gazette'}</span>
              </button>
            </div>
          </form>

          {/* Results Display */}
          {hasSearched && (
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4 animate-in fade-in">
              {!isVested ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-950">
                    <CheckCircle2 className="w-8 h-8 text-emerald-600 shrink-0" />
                    <div>
                      <h5 className="font-bold text-base">
                        {language === 'bn'
                          ? 'উক্ত দাগ অর্পিত সম্পত্তি "ক" বা "খ" তফসিলে অন্তর্ভুক্ত নয়'
                          : 'Plot is NOT listed under Vested Property Schedules'}
                      </h5>
                      <p className="text-xs text-emerald-800 mt-0.5">
                        {language === 'bn'
                          ? `জেলা: ${district}, উপজেলা: ${upazila}, মৌজা: ${mouza}, জেএল নং: ${jlNo}, দাগ নং: ${dagNo} এর সরকারি অর্পিত গেজেট সংক্রান্ত কোনো দাবি পাওয়া যায়নি। জমিটি সাধারণ ব্যক্তিমালিকানাধীন রেকর্ডে বিদ্যমান।`
                          : `No government vested property claim found for Dag ${dagNo}. Registered under normal citizen title.`}
                      </p>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2">
                    <span className="font-bold text-slate-800 block">
                      {language === 'bn' ? 'অনলাইন অনুসন্ধানের ফলাফল সারাংশ:' : 'Search Verification Summary:'}
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] text-slate-600">
                      <div><strong>{language === 'bn' ? 'অনুসন্ধান সময়:' : 'Searched at:'}</strong> {new Date().toLocaleDateString()}</div>
                      <div><strong>{language === 'bn' ? 'গেজেট ভলিউম:' : 'Gazette Vol:'}</strong> ২০২-ক/০৯</div>
                      <div><strong>{language === 'bn' ? 'স্ট্যাটাস:' : 'Status:'}</strong> ক্লিয়ার / অনাপত্তিযোগ্য</div>
                      <div><strong>{language === 'bn' ? 'সার্টিফিকেট টোকেন:' : 'Verification Token:'}</strong> VEST-CLR-2026-890</div>
                    </div>
                  </div>

                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => window.print()}
                      className="px-4 py-2 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>{language === 'bn' ? 'অনাপত্তি যাচাই কপি প্রিন্ট' : 'Print Clearance Memo'}</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="p-4 rounded-2xl bg-red-50 border border-red-300 text-red-950 flex items-start gap-3">
                  <AlertTriangle className="w-7 h-7 text-red-600 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <h5 className="font-bold text-base">
                      {language === 'bn' ? 'সতর্কতা: উক্ত দাগ অর্পিত সম্পত্তি তফসিলে তালিকাভুক্ত' : 'Warning: Plot listed in Vested Schedule'}
                    </h5>
                    <p className="text-xs text-red-800 leading-relaxed">
                      {language === 'bn'
                        ? 'উক্ত দাগটি সরকারি গেজেট অনুযায়ী অর্পিত সম্পত্তি প্রত্যর্পণ ট্রাইব্যুনালের অধীনে প্রক্রিয়াধীন থাকতে পারে। জমি ক্রয় বা হস্তান্তরের পূর্বে অতিরিক্ত জেলা প্রশাসক (রাজস্ব) কার্যালয় থেকে আনুষ্ঠানিক প্রত্যয়ন নিশ্চিত করুন।'
                        : 'This parcel appears in the government gazette. Consult Additional Deputy Commissioner (Revenue) before any transaction.'}
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Legal Explanatory Guide */}
          <div className="bg-slate-100 p-4 rounded-2xl border border-slate-200 text-xs text-slate-700 space-y-2">
            <span className="font-bold text-slate-900 block flex items-center gap-1.5">
              <Info className="w-4 h-4 text-[#006a4e]" />
              <span>{language === 'bn' ? 'অর্পিত সম্পত্তি "ক" ও "খ" তফসিল কী?' : 'What is Schedule Ka & Kha?'}</span>
            </span>
            <p className="text-[11px] leading-relaxed">
              <strong>"ক" তফসিল:</strong> যে সম্পত্তি সরকারের প্রত্যক্ষ দখল ও নিয়ন্ত্রণে রয়েছে এবং সরকারের অনুকূলে ইজারা দেওয়া হয়।
              <br />
              <strong>"খ" তফসিল:</strong> যে সম্পত্তি সরকারের প্রত্যক্ষ দখলে নেই এবং ২০১৩ সালের অর্পিত সম্পত্তি প্রত্যর্পণ (সংশোধন) আইন অনুসারে গেজেট হতে অবমুক্ত বা সংশ্লিষ্ট মালিকের নিকট প্রত্যর্পণের আওতাভুক্ত।
            </p>
          </div>
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
