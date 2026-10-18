/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Bangladesh Integrated Land Services Portal (BILSP)
 * Digitized Offline-to-Online Tool 2: Digital Khas Land Settlement Application
 * (ভূমিহীন ও নদীভাঙা পরিবারের জন্য কৃষি খাস জমি বরাদ্দ ডিজিটাল আবেদন)
 */

import React, { useState } from 'react';
import { useLanguage } from '../../../context/LanguageContext';
import {
  X,
  FileText,
  CheckCircle2,
  AlertCircle,
  Home,
  ShieldCheck,
  Send,
  Printer,
  ChevronRight,
  ChevronLeft,
  Building,
  MapPin
} from 'lucide-react';

interface KhasLandApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const KhasLandApplicationModal: React.FC<KhasLandApplicationModalProps> = ({ isOpen, onClose }) => {
  const { language, toBnNum } = useLanguage();

  const [step, setStep] = useState<number>(1);
  const [applicantName, setApplicantName] = useState<string>('মো: রফিকুল ইসলাম');
  const [nidNumber, setNidNumber] = useState<string>('19852691234567890');
  const [mobileNumber, setMobileNumber] = useState<string>('01712345678');
  const [familyMembers, setFamilyMembers] = useState<number>(5);

  const [category, setCategory] = useState<string>('river_erosion');
  const [district, setDistrict] = useState<string>('ঢাকা');
  const [upazila, setUpazila] = useState<string>('সাভার');
  const [preferredMouza, setPreferredMouza] = useState<string>('বিরুলিয়া');

  const [submittedToken, setSubmittedToken] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const token = `KHAS-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    setSubmittedToken(token);
    setStep(4);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/70 backdrop-blur-sm font-['Hind_Siliguri','Inter',sans-serif]">
      <div className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl border border-slate-200 flex flex-col max-h-[92vh] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#006a4e] to-emerald-900 text-white p-5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-white/10 flex items-center justify-center">
              <Home className="w-6 h-6 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold">
                  {language === 'bn' ? 'ভূমিহীনদের জন্য কৃষি খাস জমি বরাদ্দ আবেদন' : 'Digital Khas Land Settlement Application'}
                </h3>
                <span className="text-[10px] bg-amber-400 text-slate-900 font-bold px-2 py-0.5 rounded-full">
                  ডিজিটাইজড সরকারি সেবা
                </span>
              </div>
              <p className="text-xs text-emerald-100">
                {language === 'bn'
                  ? 'উপজেলা নির্বাহী অফিসার (ইউএনও) ও সহকারী কমিশনার (ভূমি) কমিটির নিকট সরাসরি অনলাইন আবেদন।'
                  : 'Direct online application for agricultural Khas land allocation under government policy.'}
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

        {/* Step Indicator */}
        <div className="px-6 py-3 bg-slate-100 border-b border-slate-200 flex items-center justify-between text-xs font-semibold text-slate-600 shrink-0">
          <div className={`flex items-center gap-1.5 ${step >= 1 ? 'text-[#006a4e] font-bold' : ''}`}>
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] text-white ${step >= 1 ? 'bg-[#006a4e]' : 'bg-slate-400'}`}>1</span>
            <span>{language === 'bn' ? 'আবেদনকারীর তথ্য' : 'Applicant Info'}</span>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400" />
          <div className={`flex items-center gap-1.5 ${step >= 2 ? 'text-[#006a4e] font-bold' : ''}`}>
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] text-white ${step >= 2 ? 'bg-[#006a4e]' : 'bg-slate-400'}`}>2</span>
            <span>{language === 'bn' ? 'ভূমিহীন শ্রেণি' : 'Eligibility'}</span>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400" />
          <div className={`flex items-center gap-1.5 ${step >= 3 ? 'text-[#006a4e] font-bold' : ''}`}>
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] text-white ${step >= 3 ? 'bg-[#006a4e]' : 'bg-slate-400'}`}>3</span>
            <span>{language === 'bn' ? 'এলাকা পছন্দ' : 'Preference'}</span>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400" />
          <div className={`flex items-center gap-1.5 ${step >= 4 ? 'text-[#006a4e] font-bold' : ''}`}>
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] text-white ${step >= 4 ? 'bg-[#006a4e]' : 'bg-slate-400'}`}>4</span>
            <span>{language === 'bn' ? 'ট্র্যাকিং টোকেন' : 'Token'}</span>
          </div>
        </div>

        {/* Step Content */}
        <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-slate-50">
          {/* STEP 1: Applicant Information */}
          {step === 1 && (
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
              <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#006a4e]" />
                <span>{language === 'bn' ? 'আবেদনকারীর প্রাথমিক পরিচিতি ও জাতীয় পরিচয়পত্র' : 'Applicant Details'}</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    {language === 'bn' ? 'আবেদনকারীর নাম (বাংলায়):' : 'Full Name:'}
                  </label>
                  <input
                    type="text"
                    value={applicantName}
                    onChange={(e) => setApplicantName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-medium text-slate-900 focus:ring-2 focus:ring-[#006a4e] focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    {language === 'bn' ? 'জাতীয় পরিচয়পত্র নম্বর (NID):' : 'NID Number:'}
                  </label>
                  <input
                    type="text"
                    value={nidNumber}
                    onChange={(e) => setNidNumber(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-mono text-slate-900 focus:ring-2 focus:ring-[#006a4e] focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    {language === 'bn' ? 'মোবাইল নম্বর (এসএমএস প্রাপ্তির জন্য):' : 'Mobile Number:'}
                  </label>
                  <input
                    type="text"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-mono text-slate-900 focus:ring-2 focus:ring-[#006a4e] focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    {language === 'bn' ? 'পরিবারের মোট সদস্য সংখ্যা:' : 'Family Members Count:'}
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="15"
                    value={familyMembers}
                    onChange={(e) => setFamilyMembers(parseInt(e.target.value) || 1)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-bold text-slate-900 focus:ring-2 focus:ring-[#006a4e] focus:outline-hidden"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Landless Eligibility Category */}
          {step === 2 && (
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
              <h4 className="text-sm font-bold text-slate-900">
                {language === 'bn' ? 'ভূমিহীনতার শ্রেণি ও অগ্রাধিকার নীতিমালা নির্বাচন' : 'Landless Category'}
              </h4>

              <div className="space-y-3 text-xs">
                <label className={`p-4 rounded-xl border cursor-pointer flex items-start gap-3 transition-colors ${category === 'river_erosion' ? 'border-[#006a4e] bg-emerald-50/50' : 'border-slate-200 hover:bg-slate-50'}`}>
                  <input
                    type="radio"
                    name="category"
                    value="river_erosion"
                    checked={category === 'river_erosion'}
                    onChange={(e) => setCategory(e.target.value)}
                    className="accent-[#006a4e] mt-1"
                  />
                  <div>
                    <span className="font-bold text-slate-900 text-sm block">
                      {language === 'bn' ? '১ম অগ্রাধিকার: নদীভাঙনে ভিটেমাটি হারানো সম্পূর্ণ নিঃস্ব পরিবার' : 'Priority 1: River Erosion Displaced Family'}
                    </span>
                    <span className="text-slate-500 text-[11px] mt-0.5 block">
                      {language === 'bn' ? 'ইউনিয়ন পরিষদ চেয়ারম্যান বা ইউএনও কর্তৃক নদীভাঙনের প্রত্যয়নযুক্ত।' : 'Certified by UP Chairman or UNO.'}
                    </span>
                  </div>
                </label>

                <label className={`p-4 rounded-xl border cursor-pointer flex items-start gap-3 transition-colors ${category === 'freedom_fighter' ? 'border-[#006a4e] bg-emerald-50/50' : 'border-slate-200 hover:bg-slate-50'}`}>
                  <input
                    type="radio"
                    name="category"
                    value="freedom_fighter"
                    checked={category === 'freedom_fighter'}
                    onChange={(e) => setCategory(e.target.value)}
                    className="accent-[#006a4e] mt-1"
                  />
                  <div>
                    <span className="font-bold text-slate-900 text-sm block">
                      {language === 'bn' ? '২য় অগ্রাধিকার: অসচ্ছল বীর মুক্তিযোদ্ধা বা শহীদ মুক্তিযোদ্ধা পরিবার' : 'Priority 2: Destitute Freedom Fighter Family'}
                    </span>
                    <span className="text-slate-500 text-[11px] mt-0.5 block">
                      {language === 'bn' ? 'মুক্তিযুদ্ধ বিষয়ক মন্ত্রণালয়ের গেজেট ও সনদযুক্ত।' : 'Valid gazette certified.'}
                    </span>
                  </div>
                </label>

                <label className={`p-4 rounded-xl border cursor-pointer flex items-start gap-3 transition-colors ${category === 'widow' ? 'border-[#006a4e] bg-emerald-50/50' : 'border-slate-200 hover:bg-slate-50'}`}>
                  <input
                    type="radio"
                    name="category"
                    value="widow"
                    checked={category === 'widow'}
                    onChange={(e) => setCategory(e.target.value)}
                    className="accent-[#006a4e] mt-1"
                  />
                  <div>
                    <span className="font-bold text-slate-900 text-sm block">
                      {language === 'bn' ? '৩য় অগ্রাধিকার: বিধবা বা স্বামী পরিত্যক্তা কর্মক্ষম পুত্রহীন পরিবার' : 'Priority 3: Destitute Widow or Abandoned Mother'}
                    </span>
                    <span className="text-slate-500 text-[11px] mt-0.5 block">
                      {language === 'bn' ? 'স্থানীয় প্রশাসন কর্তৃক যাচাইকৃত নির্ভরশীল পরিবার।' : 'Verified by local administration.'}
                    </span>
                  </div>
                </label>
              </div>
            </div>
          )}

          {/* STEP 3: Location Preference */}
          {step === 3 && (
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
              <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#006a4e]" />
                <span>{language === 'bn' ? 'খাস জমি বরাদ্দের কাঙ্ক্ষিত এলাকা' : 'Preferred Allocation Area'}</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    {language === 'bn' ? 'জেলা:' : 'District:'}
                  </label>
                  <input
                    type="text"
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 font-semibold"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    {language === 'bn' ? 'উপজেলা:' : 'Upazila:'}
                  </label>
                  <input
                    type="text"
                    value={upazila}
                    onChange={(e) => setUpazila(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 font-semibold"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    {language === 'bn' ? 'পছন্দের মৌজা:' : 'Preferred Mouza:'}
                  </label>
                  <input
                    type="text"
                    value={preferredMouza}
                    onChange={(e) => setPreferredMouza(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 font-semibold"
                  />
                </div>
              </div>

              <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-xs text-blue-900">
                <span className="font-bold block mb-1">
                  {language === 'bn' ? 'সরকারি বন্দোবস্ত নীতিমালা সংক্রান্ত তথ্য:' : 'Statutory Policy Notice:'}
                </span>
                <p className="text-[11px] leading-relaxed">
                  {language === 'bn'
                    ? 'কৃষি খাস জমি ব্যবস্থাপনা ও বন্দোবস্ত নীতিমালা ১৯৯৭ অনুযায়ী একজন ভূমিহীন পরিবার সর্বোচ্চ ১.৫০ একর (দেড় একর) পর্যন্ত কৃষি খাস জমি বন্দোবস্ত পেতে পারেন। আবেদন সম্পূর্ণ বিনামূল্যে এবং কোনো ফি প্রযোজ্য নয়।'
                    : 'Under the 1997 Agricultural Khas Land Settlement Policy, an eligible family can receive up to 1.50 acres free of government cost.'}
                </p>
              </div>
            </div>
          )}

          {/* STEP 4: Success & Tracking Token */}
          {step === 4 && submittedToken && (
            <div className="bg-white p-6 rounded-2xl border border-emerald-300 shadow-xs space-y-4 text-center">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-[#006a4e] flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <h4 className="text-xl font-bold text-slate-900">
                {language === 'bn' ? 'খাস জমি আবেদন সফলভাবে গৃহীত হয়েছে!' : 'Khas Land Application Submitted!'}
              </h4>

              <div className="bg-slate-900 text-white p-4 rounded-2xl max-w-sm mx-auto space-y-1">
                <span className="text-[10px] text-emerald-400 uppercase tracking-widest font-mono">
                  {language === 'bn' ? 'ডিজিটাল ট্র্যাকিং টোকেন' : 'Tracking Token'}
                </span>
                <div className="text-2xl font-mono font-bold text-amber-300">{submittedToken}</div>
              </div>

              <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
                {language === 'bn'
                  ? `আপনার আবেদনটি ${district} জেলার ${upazila} উপজেলা কৃষি খাস জমি ব্যবস্থাপনা ও বন্দোবস্ত কমিটির পরবর্তী সভায় যাচাইয়ের জন্য সংরক্ষিত হয়েছে। মোবাইলে এসএমএস পাঠানো হয়েছে।`
                  : `Your petition has been queued for review by the Upazila Agricultural Khas Land Committee. An SMS confirmation was sent.`}
              </p>

              <div className="pt-2 flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="px-4 py-2 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>{language === 'bn' ? 'রশিদ প্রিন্ট করুন' : 'Print Slip'}</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer Navigation */}
        <div className="p-4 bg-white border-t border-slate-200 flex items-center justify-between shrink-0">
          {step > 1 && step < 4 ? (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="px-4 py-2 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center gap-1 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>{language === 'bn' ? 'পূর্ববর্তী ধাপ' : 'Back'}</span>
            </button>
          ) : (
            <span />
          )}

          {step < 3 && (
            <button
              type="button"
              onClick={() => setStep(step + 1)}
              className="px-5 py-2.5 rounded-xl bg-[#006a4e] hover:bg-emerald-800 text-white font-bold text-xs flex items-center gap-1 cursor-pointer shadow-md"
            >
              <span>{language === 'bn' ? 'পরবর্তী ধাপ' : 'Next'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          )}

          {step === 3 && (
            <button
              type="button"
              onClick={handleSubmit}
              className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-md"
            >
              <Send className="w-4 h-4" />
              <span>{language === 'bn' ? 'অনলাইন আবেদন জমা দিন' : 'Submit Application'}</span>
            </button>
          )}

          {step === 4 && (
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 rounded-xl bg-[#006a4e] hover:bg-emerald-800 text-white text-xs font-bold cursor-pointer"
            >
              {language === 'bn' ? 'বন্ধ করুন' : 'Close'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
