/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Bangladesh Integrated Land Services Portal (BILSP)
 * Digitized Offline-to-Online Tool 1: Inheritance Share Calculator & Farayej Distribution
 * (অনলাইন ওয়ারিশান ও ডিজিটাল ফারায়েজ বণ্টন হিসাব)
 */

import React, { useState } from 'react';
import { useLanguage } from '../../../context/LanguageContext';
import {
  X,
  Calculator,
  UserCheck,
  FileText,
  Printer,
  CheckCircle2,
  AlertCircle,
  Users,
  ShieldCheck,
  Download
} from 'lucide-react';

interface FarayejCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FarayejCalculatorModal: React.FC<FarayejCalculatorModalProps> = ({ isOpen, onClose }) => {
  const { language, toBnNum } = useLanguage();

  const [religion, setReligion] = useState<'muslim' | 'hindu'>('muslim');
  const [deceasedGender, setDeceasedGender] = useState<'male' | 'female'>('male');
  const [totalLandDecimals, setTotalLandDecimals] = useState<number>(30);

  // Heirs counts
  const [hasWife, setHasWife] = useState<boolean>(true);
  const [hasHusband, setHasHusband] = useState<boolean>(false);
  const [hasMother, setHasMother] = useState<boolean>(true);
  const [hasFather, setHasFather] = useState<boolean>(false);
  const [sonsCount, setSonsCount] = useState<number>(2);
  const [daughtersCount, setDaughtersCount] = useState<number>(1);

  if (!isOpen) return null;

  // Calculation Logic according to Muslim Succession
  let wifeSharePercent = 0;
  let husbandSharePercent = 0;
  let motherSharePercent = 0;
  let fatherSharePercent = 0;

  const totalChildren = sonsCount + daughtersCount;

  if (deceasedGender === 'male') {
    // Surviving Wife: 1/8 if children, 1/4 if no children
    wifeSharePercent = hasWife ? (totalChildren > 0 ? 12.5 : 25) : 0;
  } else {
    // Surviving Husband: 1/4 if children, 1/2 if no children
    husbandSharePercent = hasHusband ? (totalChildren > 0 ? 25 : 50) : 0;
  }

  // Mother: 1/6 (16.666%) if children or siblings
  motherSharePercent = hasMother ? (totalChildren > 0 ? 16.666 : 33.333) : 0;
  // Father: 1/6 (16.666%) if children
  fatherSharePercent = hasFather ? 16.666 : 0;

  const fixedSharesPercent = wifeSharePercent + husbandSharePercent + motherSharePercent + fatherSharePercent;
  const remainderForChildrenPercent = Math.max(0, 100 - fixedSharesPercent);

  // Sons receive double the daughter (2:1 ratio)
  const childParts = sonsCount * 2 + daughtersCount;
  const perPartPercent = childParts > 0 ? remainderForChildrenPercent / childParts : 0;

  const sonSharePercent = perPartPercent * 2;
  const daughterSharePercent = perPartPercent;

  const wifeDecimals = ((totalLandDecimals * wifeSharePercent) / 100).toFixed(2);
  const husbandDecimals = ((totalLandDecimals * husbandSharePercent) / 100).toFixed(2);
  const motherDecimals = ((totalLandDecimals * motherSharePercent) / 100).toFixed(2);
  const fatherDecimals = ((totalLandDecimals * fatherSharePercent) / 100).toFixed(2);
  const sonDecimals = ((totalLandDecimals * sonSharePercent) / 100).toFixed(2);
  const daughterDecimals = ((totalLandDecimals * daughterSharePercent) / 100).toFixed(2);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/70 backdrop-blur-sm font-['Hind_Siliguri','Inter',sans-serif]">
      <div className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl border border-slate-200 flex flex-col max-h-[92vh] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-[#006a4e] text-white p-5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-white/10 flex items-center justify-center">
              <Calculator className="w-6 h-6 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold">
                  {language === 'bn' ? 'অনলাইন ওয়ারিশান ও ফারায়েজ বণ্টন হিসাব' : 'Inheritance & Farayej Calculator'}
                </h3>
                <span className="text-[10px] bg-amber-400 text-slate-900 font-bold px-2 py-0.5 rounded-full">
                  ডিজিটাইজড সরকারি সেবা
                </span>
              </div>
              <p className="text-xs text-emerald-100">
                {language === 'bn'
                  ? 'পূর্বে অফলাইনে আমিনের কাছে যেতে হতো; এখন নিমেষেই নির্ভুল আইনানুগ হিস্যা ও শতাংশ হিসাব করুন।'
                  : 'Calculate legally binding inheritance shares and exact decimal land allocations.'}
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

        {/* Content Body */}
        <div className="flex-1 p-5 sm:p-6 overflow-y-auto space-y-6 bg-slate-50">
          {/* Top Form Controls */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
            {/* Total Land in Decimals */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {language === 'bn' ? 'মোট জমির পরিমাণ (শতাংশ / ডেসিমেল):' : 'Total Land (Decimals):'}
              </label>
              <input
                type="number"
                min="0.1"
                step="0.1"
                value={totalLandDecimals}
                onChange={(e) => setTotalLandDecimals(parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm font-bold text-slate-900 focus:ring-2 focus:ring-[#006a4e] focus:outline-hidden"
              />
              <span className="text-[11px] text-slate-400 mt-1 block">
                ≈ {(totalLandDecimals / 1.65).toFixed(2)} {language === 'bn' ? 'কাঠা' : 'Katha'} (১ কাঠা = ১.৬৫ শতাংশ)
              </span>
            </div>

            {/* Deceased Gender */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {language === 'bn' ? 'মৃত ব্যক্তির পরিচয়:' : 'Deceased Person:'}
              </label>
              <select
                value={deceasedGender}
                onChange={(e) => {
                  const val = e.target.value as 'male' | 'female';
                  setDeceasedGender(val);
                  if (val === 'male') {
                    setHasWife(true);
                    setHasHusband(false);
                  } else {
                    setHasHusband(true);
                    setHasWife(false);
                  }
                }}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm font-semibold text-slate-900 bg-white"
              >
                <option value="male">{language === 'bn' ? 'পিতা / স্বামী / পুরুষ' : 'Father / Husband (Male)'}</option>
                <option value="female">{language === 'bn' ? 'মাতা / স্ত্রী / নারী' : 'Mother / Wife (Female)'}</option>
              </select>
            </div>

            {/* Legal Succession Law */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {language === 'bn' ? 'প্রযোজ্য উত্তরাধিকার আইন:' : 'Applicable Succession Law:'}
              </label>
              <select
                value={religion}
                onChange={(e) => setReligion(e.target.value as 'muslim' | 'hindu')}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm font-semibold text-slate-900 bg-white"
              >
                <option value="muslim">{language === 'bn' ? 'মুসলিম পারিবারিক আইন (ফারায়েজ)' : 'Muslim Succession Act (Farayej)'}</option>
                <option value="hindu">{language === 'bn' ? 'হিন্দু দায়ভাগ উত্তরাধিকার আইন' : 'Hindu Dayabhaga Succession'}</option>
              </select>
            </div>
          </div>

          {/* Living Heirs Selection */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <Users className="w-4 h-4 text-[#006a4e]" />
              <span>{language === 'bn' ? 'জীবিত ওয়ারিশগণের তালিকা নির্বাচন করুন' : 'Select Living Legal Heirs'}</span>
            </h4>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {deceasedGender === 'male' ? (
                <label className="flex items-center gap-2 p-3 rounded-xl border border-slate-200 bg-slate-50 cursor-pointer text-xs font-bold text-slate-800">
                  <input
                    type="checkbox"
                    checked={hasWife}
                    onChange={(e) => setHasWife(e.target.checked)}
                    className="accent-[#006a4e] w-4 h-4"
                  />
                  <span>{language === 'bn' ? 'স্ত্রী জীবিত আছেন' : 'Surviving Wife'}</span>
                </label>
              ) : (
                <label className="flex items-center gap-2 p-3 rounded-xl border border-slate-200 bg-slate-50 cursor-pointer text-xs font-bold text-slate-800">
                  <input
                    type="checkbox"
                    checked={hasHusband}
                    onChange={(e) => setHasHusband(e.target.checked)}
                    className="accent-[#006a4e] w-4 h-4"
                  />
                  <span>{language === 'bn' ? 'স্বামী জীবিত আছেন' : 'Surviving Husband'}</span>
                </label>
              )}

              <label className="flex items-center gap-2 p-3 rounded-xl border border-slate-200 bg-slate-50 cursor-pointer text-xs font-bold text-slate-800">
                <input
                  type="checkbox"
                  checked={hasMother}
                  onChange={(e) => setHasMother(e.target.checked)}
                  className="accent-[#006a4e] w-4 h-4"
                />
                <span>{language === 'bn' ? 'মাতা জীবিত আছেন' : 'Surviving Mother'}</span>
              </label>

              <label className="flex items-center gap-2 p-3 rounded-xl border border-slate-200 bg-slate-50 cursor-pointer text-xs font-bold text-slate-800">
                <input
                  type="checkbox"
                  checked={hasFather}
                  onChange={(e) => setHasFather(e.target.checked)}
                  className="accent-[#006a4e] w-4 h-4"
                />
                <span>{language === 'bn' ? 'পিতা জীবিত আছেন' : 'Surviving Father'}</span>
              </label>

              {/* Sons count */}
              <div className="p-3 rounded-xl border border-slate-200 bg-slate-50 text-xs">
                <span className="font-bold text-slate-800 block mb-1">
                  {language === 'bn' ? 'পুত্রের সংখ্যা:' : 'Number of Sons:'}
                </span>
                <input
                  type="number"
                  min="0"
                  max="20"
                  value={sonsCount}
                  onChange={(e) => setSonsCount(parseInt(e.target.value) || 0)}
                  className="w-full px-2 py-1 rounded-lg border border-slate-300 text-xs font-bold bg-white"
                />
              </div>

              {/* Daughters count */}
              <div className="p-3 rounded-xl border border-slate-200 bg-slate-50 text-xs">
                <span className="font-bold text-slate-800 block mb-1">
                  {language === 'bn' ? 'কন্যার সংখ্যা:' : 'Number of Daughters:'}
                </span>
                <input
                  type="number"
                  min="0"
                  max="20"
                  value={daughtersCount}
                  onChange={(e) => setDaughtersCount(parseInt(e.target.value) || 0)}
                  className="w-full px-2 py-1 rounded-lg border border-slate-300 text-xs font-bold bg-white"
                />
              </div>
            </div>
          </div>

          {/* Results Distribution Table */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
            <div className="p-4 bg-emerald-950 text-white flex items-center justify-between">
              <h4 className="text-sm font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>{language === 'bn' ? 'ফারায়েজ বণ্টন ফলাফল ও জমির হিস্যা তালিকা' : 'Inheritance Land Distribution Results'}</span>
              </h4>
              <span className="text-xs font-mono text-emerald-300">
                {language === 'bn' ? 'মোট জমি:' : 'Total:'} {totalLandDecimals} {language === 'bn' ? 'শতাংশ' : 'Decimals'}
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-100 text-slate-700 border-b border-slate-200 uppercase font-bold text-[11px]">
                  <tr>
                    <th className="p-3">{language === 'bn' ? 'ওয়ারিশের পদবী' : 'Relation / Heir'}</th>
                    <th className="p-3">{language === 'bn' ? 'আইনানুগ হিস্যা (কোরআনিক ভাগ)' : 'Legal Share'}</th>
                    <th className="p-3">{language === 'bn' ? 'শতাংশ হার (%)' : 'Percentage (%)'}</th>
                    <th className="p-3">{language === 'bn' ? 'মোট প্রাপ্ত জমি' : 'Total Land Area'}</th>
                    <th className="p-3">{language === 'bn' ? 'মাথাপিছু প্রাপ্ত জমি' : 'Per Person Land'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 font-medium text-slate-800">
                  {deceasedGender === 'male' && hasWife && (
                    <tr className="hover:bg-slate-50">
                      <td className="p-3 font-bold">{language === 'bn' ? 'স্ত্রী' : 'Wife'}</td>
                      <td className="p-3 text-emerald-800">{totalChildren > 0 ? '১/৮ অংশ' : '১/৪ অংশ'}</td>
                      <td className="p-3 font-mono">{wifeSharePercent.toFixed(2)}%</td>
                      <td className="p-3 font-bold text-[#006a4e]">{wifeDecimals} {language === 'bn' ? 'শতাংশ' : 'Dec'}</td>
                      <td className="p-3 font-mono">{wifeDecimals} {language === 'bn' ? 'শতাংশ' : 'Dec'}</td>
                    </tr>
                  )}

                  {deceasedGender === 'female' && hasHusband && (
                    <tr className="hover:bg-slate-50">
                      <td className="p-3 font-bold">{language === 'bn' ? 'স্বামী' : 'Husband'}</td>
                      <td className="p-3 text-emerald-800">{totalChildren > 0 ? '১/৪ অংশ' : '১/২ অংশ'}</td>
                      <td className="p-3 font-mono">{husbandSharePercent.toFixed(2)}%</td>
                      <td className="p-3 font-bold text-[#006a4e]">{husbandDecimals} {language === 'bn' ? 'শতাংশ' : 'Dec'}</td>
                      <td className="p-3 font-mono">{husbandDecimals} {language === 'bn' ? 'শতাংশ' : 'Dec'}</td>
                    </tr>
                  )}

                  {hasMother && (
                    <tr className="hover:bg-slate-50">
                      <td className="p-3 font-bold">{language === 'bn' ? 'মাতা' : 'Mother'}</td>
                      <td className="p-3 text-emerald-800">১/৬ অংশ</td>
                      <td className="p-3 font-mono">{motherSharePercent.toFixed(2)}%</td>
                      <td className="p-3 font-bold text-[#006a4e]">{motherDecimals} {language === 'bn' ? 'শতাংশ' : 'Dec'}</td>
                      <td className="p-3 font-mono">{motherDecimals} {language === 'bn' ? 'শতাংশ' : 'Dec'}</td>
                    </tr>
                  )}

                  {hasFather && (
                    <tr className="hover:bg-slate-50">
                      <td className="p-3 font-bold">{language === 'bn' ? 'পিতা' : 'Father'}</td>
                      <td className="p-3 text-emerald-800">১/৬ অংশ</td>
                      <td className="p-3 font-mono">{fatherSharePercent.toFixed(2)}%</td>
                      <td className="p-3 font-bold text-[#006a4e]">{fatherDecimals} {language === 'bn' ? 'শতাংশ' : 'Dec'}</td>
                      <td className="p-3 font-mono">{fatherDecimals} {language === 'bn' ? 'শতাংশ' : 'Dec'}</td>
                    </tr>
                  )}

                  {sonsCount > 0 && (
                    <tr className="hover:bg-slate-50 bg-emerald-50/40">
                      <td className="p-3 font-bold text-emerald-950">
                        {language === 'bn' ? `পুত্র (${sonsCount} জন)` : `Sons (${sonsCount})`}
                      </td>
                      <td className="p-3 text-emerald-800">আসাবা (কন্যার দ্বিগুণ)</td>
                      <td className="p-3 font-mono">{(sonSharePercent * sonsCount).toFixed(2)}%</td>
                      <td className="p-3 font-bold text-[#006a4e]">
                        {(parseFloat(sonDecimals) * sonsCount).toFixed(2)} {language === 'bn' ? 'শতাংশ' : 'Dec'}
                      </td>
                      <td className="p-3 font-bold text-emerald-900">{sonDecimals} {language === 'bn' ? 'শতাংশ' : 'Dec'}</td>
                    </tr>
                  )}

                  {daughtersCount > 0 && (
                    <tr className="hover:bg-slate-50 bg-emerald-50/20">
                      <td className="p-3 font-bold text-emerald-950">
                        {language === 'bn' ? `কন্যা (${daughtersCount} জন)` : `Daughters (${daughtersCount})`}
                      </td>
                      <td className="p-3 text-emerald-800">আসাবা (১ ভাগ)</td>
                      <td className="p-3 font-mono">{(daughterSharePercent * daughtersCount).toFixed(2)}%</td>
                      <td className="p-3 font-bold text-[#006a4e]">
                        {(parseFloat(daughterDecimals) * daughtersCount).toFixed(2)} {language === 'bn' ? 'শতাংশ' : 'Dec'}
                      </td>
                      <td className="p-3 font-bold text-emerald-900">{daughterDecimals} {language === 'bn' ? 'শতাংশ' : 'Dec'}</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Legal Notice */}
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
            <AlertCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="font-bold">
                {language === 'bn'
                  ? 'রেজিস্ট্রেশন আইনের ১৯বি ধারা অনুযায়ী সতর্কতা:'
                  : 'Notice under Section 19B of Registration Act:'}
              </p>
              <p className="text-[11px] leading-relaxed">
                {language === 'bn'
                  ? 'ওয়ারিশগণের মধ্যকার পারিবারিক মৌখিক বণ্টন কোনো স্থায়ী আইনি মালিকানা প্রতিষ্ঠা করে না। এই হিসাব অনুযায়ী সংশ্লিষ্ট সাব-রেজিস্ট্রি অফিসে একটি রেজিস্ট্রিকৃত "আপস বণ্টননামা দলিল" সম্পাদন করুন এবং সহকারী কমিশনার (ভূমি) অফিসে ই-নামজারি আবেদন করুন।'
                  : 'Informal partition is not legally binding. Heirs must register an amicable partition deed at the Sub-Registry office and apply for e-mutation.'}
              </p>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-white border-t border-slate-200 flex items-center justify-between shrink-0">
          <span className="text-xs text-slate-500 font-medium">
            {language === 'bn' ? 'সর্বমোট বরাদ্দকৃত জমি: ' : 'Total Allocated: '}
            <strong className="text-slate-900">{totalLandDecimals} {language === 'bn' ? 'শতাংশ' : 'Decimals'}</strong>
          </span>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => window.print()}
              className="px-4 py-2 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>{language === 'bn' ? 'প্রিন্ট সনদ' : 'Print Draft'}</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-xl bg-[#006a4e] hover:bg-emerald-800 text-white text-xs font-bold cursor-pointer shadow-md"
            >
              {language === 'bn' ? 'সম্পন্ন' : 'Done'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
