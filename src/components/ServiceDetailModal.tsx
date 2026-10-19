/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Bangladesh Integrated Land Services Portal (BILSP)
 * Unified Service Launch Page & Pre-Departure Modal
 */

import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { LandService, ServiceAvailabilityCheck } from '../types/bilsp';
import { apiClient } from '../services/apiClient';
import {
  X,
  ExternalLink,
  ShieldCheck,
  Building2,
  FileCheck2,
  Receipt,
  Clock,
  PhoneCall,
  Calendar,
  AlertCircle,
  Activity,
  CheckCircle2,
  Bookmark,
  Share2,
  Layers,
  HelpCircle,
  Radio
} from 'lucide-react';

interface ServiceDetailModalProps {
  service: LandService | null;
  onClose: () => void;
  onLaunchExternal: (service: LandService) => void;
  isSaved: boolean;
  onToggleSave: (serviceId: string) => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({
  service,
  onClose,
  onLaunchExternal,
  isSaved,
  onToggleSave,
}) => {
  const { language, t, toBnNum } = useLanguage();
  const [activeTab, setActiveTab] = useState<'overview' | 'documents' | 'steps' | 'links'>('overview');
  const [checkingUrl, setCheckingUrl] = useState(false);
  const [availabilityResult, setAvailabilityResult] = useState<ServiceAvailabilityCheck | null>(null);

  if (!service) return null;

  const handleLiveCheck = async () => {
    setCheckingUrl(true);
    try {
      const res = await apiClient.checkUrlAvailability(service.directServiceUrl || service.officialWebsiteUrl);
      setAvailabilityResult(res);
    } catch {
      //
    } finally {
      setCheckingUrl(false);
    }
  };

  const getIntegrationBadge = () => {
    switch (service.integrationType) {
      case 'TYPE_1_EXTERNAL_LINK':
        return {
          labelBn: 'টাইপ ১: যাচাইকৃত অফিশিয়াল বহিঃসংযোগ',
          labelEn: 'Type 1: Verified Official External Link',
          bg: 'bg-emerald-50 text-emerald-800 border-emerald-200'
        };
      case 'TYPE_2_INFO_INTEGRATION':
        return {
          labelBn: 'টাইপ ২: অফিশিয়াল উন্মুক্ত তথ্য সংযুক্তি',
          labelEn: 'Type 2: Official Public Information Integration',
          bg: 'bg-blue-50 text-blue-800 border-blue-200'
        };
      case 'TYPE_3_TRANSACTIONAL_API':
        return {
          labelBn: 'টাইপ ৩: অনুমোদিত লেনদেন এপিআই',
          labelEn: 'Type 3: Authorized Transactional API',
          bg: 'bg-purple-50 text-purple-800 border-purple-200'
        };
      default:
        return {
          labelBn: 'টাইপ ৪: নির্দেশনামূলক / পরিকল্পিত সেবা',
          labelEn: 'Type 4: Demonstration / Planned Integration',
          bg: 'bg-amber-50 text-amber-800 border-amber-200'
        };
    }
  };

  const badge = getIntegrationBadge();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-4xl w-full my-auto overflow-hidden flex flex-col max-h-[92vh]">
        {/* Top Header */}
        <div className="bg-[#006a4e] text-white p-5 sm:p-6 flex items-start justify-between gap-4 shrink-0">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${badge.bg}`}>
                {language === 'bn' ? badge.labelBn : badge.labelEn}
              </span>

              <span className="inline-flex items-center gap-1 text-[11px] font-medium bg-emerald-950/50 text-emerald-200 px-2.5 py-0.5 rounded-full border border-emerald-700/60">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>
                  {language === 'bn' ? 'যাচাইয়ের তারিখ:' : 'Verified:'}{' '}
                  {service.lastVerifiedDate}
                </span>
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white leading-snug">
              {language === 'bn' ? service.nameBn : service.nameEn}
            </h2>

            <p className="text-xs sm:text-sm text-emerald-100 flex items-center gap-1.5">
              <Building2 className="w-4 h-4 text-amber-300 shrink-0" />
              <span>
                {language === 'bn' ? 'দায়িত্বপ্রাপ্ত কর্তৃপক্ষ:' : 'Authority:'}{' '}
                {service.verificationSource}
              </span>
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => onToggleSave(service.id)}
              className="p-2 rounded-lg bg-emerald-900/60 hover:bg-emerald-900 text-white transition-colors cursor-pointer"
              title={isSaved ? 'সংরক্ষিত তালিকা থেকে মুছুন' : 'আমার ডেস্কে সংরক্ষণ করুন'}
            >
              <Bookmark className={`w-5 h-5 ${isSaved ? 'text-amber-400 fill-amber-400' : ''}`} />
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-lg bg-emerald-900/60 hover:bg-emerald-900 text-white transition-colors cursor-pointer"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="border-b border-slate-200 bg-slate-50 px-6 flex items-center gap-2 sm:gap-6 text-xs sm:text-sm font-semibold shrink-0 overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveTab('overview')}
            className={`py-3 border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'overview'
                ? 'border-[#006a4e] text-[#006a4e]'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            {language === 'bn' ? 'সেবার বিবরণ ও সারসংক্ষেপ' : 'Overview & Purpose'}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('documents')}
            className={`py-3 border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'documents'
                ? 'border-[#006a4e] text-[#006a4e]'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            {language === 'bn' ? 'প্রয়োজনীয় কাগজপত্র ও যোগ্যতা' : 'Required Documents & Eligibility'}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('steps')}
            className={`py-3 border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'steps'
                ? 'border-[#006a4e] text-[#006a4e]'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            {language === 'bn' ? 'ধাপসমূহ ও সরকারি ফি' : 'Steps & Official Fees'}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('links')}
            className={`py-3 border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'links'
                ? 'border-[#006a4e] text-[#006a4e]'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            {language === 'bn' ? 'সকল অফিশিয়াল লিংক' : 'Official Portal Links'}
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-slate-800 text-sm">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  {language === 'bn' ? 'সেবার মূল উদ্দেশ্য ও পরিচিতি' : 'Service Purpose'}
                </h4>
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
                  {language === 'bn' ? service.detailedDescriptionBn : service.detailedDescriptionEn}
                </p>
              </div>

              {/* Quick Info Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <div className="flex items-center gap-2 text-xs text-slate-500 font-medium mb-1">
                    <Receipt className="w-4 h-4 text-[#006a4e]" />
                    <span>{language === 'bn' ? 'সর্বমোট সরকারি ফি' : 'Total Official Fee'}</span>
                  </div>
                  <p className="text-lg font-bold text-slate-900">
                    {service.officialFeesTotalBdt !== undefined
                      ? service.officialFeesTotalBdt === 0
                        ? language === 'bn'
                          ? 'বিনামূল্যে'
                          : 'Free'
                        : `${toBnNum(service.officialFeesTotalBdt)} ${language === 'bn' ? 'টাকা' : 'BDT'}`
                      : language === 'bn'
                        ? 'বিধি মোতাবেক'
                        : 'As per gazette'}
                  </p>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <div className="flex items-center gap-2 text-xs text-slate-500 font-medium mb-1">
                    <Clock className="w-4 h-4 text-[#006a4e]" />
                    <span>{language === 'bn' ? 'সেবা প্রদানের সময়সীমা' : 'Statutory Timeline'}</span>
                  </div>
                  <p className="text-base font-bold text-slate-900">
                    {language === 'bn' ? service.estimatedDeliveryDaysBn : service.estimatedDeliveryDaysEn}
                  </p>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <div className="flex items-center gap-2 text-xs text-slate-500 font-medium mb-1">
                    <PhoneCall className="w-4 h-4 text-[#006a4e]" />
                    <span>{language === 'bn' ? 'সরাসরি হেল্পলাইন' : 'Helpline'}</span>
                  </div>
                  <p className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <span>{service.helplinePhone || '16122'}</span>
                    <a
                      href={`tel:${service.helplinePhone || '16122'}`}
                      className="text-xs text-[#006a4e] hover:underline font-semibold"
                    >
                      ({language === 'bn' ? 'কল করুন' : 'Call'})
                    </a>
                  </p>
                </div>
              </div>

              {/* Service Live Reachability Monitor */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <Radio className="w-4 h-4 text-emerald-600 animate-pulse" />
                    <span className="font-bold text-xs uppercase tracking-wider text-slate-700">
                      {language === 'bn' ? 'সার্ভার লাইভ স্থিতি যাচাই' : 'Live Server Reachability Status'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 font-mono">
                    {service.directServiceUrl || service.officialWebsiteUrl}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                  <button
                    type="button"
                    onClick={handleLiveCheck}
                    disabled={checkingUrl}
                    className="px-3.5 py-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-100 text-slate-800 text-xs font-semibold cursor-pointer disabled:opacity-50 flex items-center gap-1.5 shadow-2xs"
                  >
                    {checkingUrl ? (
                      <>
                        <span className="w-3 h-3 rounded-full border-2 border-emerald-600 border-t-transparent animate-spin" />
                        <span>{language === 'bn' ? 'যাচাই করা হচ্ছে...' : 'Checking...'}</span>
                      </>
                    ) : (
                      <>
                        <Radio className="w-3.5 h-3.5 text-emerald-600" />
                        <span>{language === 'bn' ? 'লাইভ সার্ভার পিং টেস্ট' : 'Live Ping Test'}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Detailed Live Ping Result Banner */}
              {availabilityResult && (
                <div
                  className={`p-3.5 rounded-xl border flex items-start gap-3 text-xs ${
                    availabilityResult.isReachable
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                      : 'bg-rose-50 border-rose-200 text-rose-900'
                  }`}
                >
                  <div className="shrink-0 mt-0.5">
                    {availabilityResult.isReachable ? (
                      <span className="flex h-3 w-3 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-600"></span>
                      </span>
                    ) : (
                      <AlertCircle className="w-4 h-4 text-rose-600" />
                    )}
                  </div>
                  <div className="space-y-0.5 flex-1">
                    <div className="flex items-center justify-between">
                      <strong className="font-bold">
                        {availabilityResult.isReachable
                          ? (language === 'bn' ? 'সার্ভার সচল ও দ্রুত সাড়া দিচ্ছে (Online)' : 'Server Online & Accessible')
                          : (language === 'bn' ? 'সার্ভার ডাউন বা নেটওয়ার্ক সংযোগ ব্যর্থ (Offline / Down)' : 'Server Down / Network Failed')}
                      </strong>
                      <span className="font-mono text-[11px] opacity-80">
                        {availabilityResult.responseTimeMs}ms
                        {availabilityResult.httpStatusCode ? ` • HTTP ${availabilityResult.httpStatusCode}` : ''}
                      </span>
                    </div>
                    {availabilityResult.errorMessage && (
                      <p className="text-[11px] text-rose-700 font-medium">
                        {availabilityResult.errorMessage}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Access limitation notes */}
              {service.accessLimitationsBn && (
                <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 flex items-start gap-3 text-xs text-amber-900">
                  <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="font-semibold block mb-0.5">
                      {language === 'bn' ? 'সীমাবদ্ধতা ও বিশেষ দ্রষ্টব্য:' : 'Special Consideration:'}
                    </strong>
                    <p>
                      {language === 'bn' ? service.accessLimitationsBn : service.accessLimitationsEn}
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'documents' && (
            <div className="space-y-6">
              {/* Eligibility */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>{language === 'bn' ? 'কারা আবেদন করতে পারবেন (যোগ্যতা)' : 'Eligibility Criteria'}</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {(language === 'bn' ? service.eligibilityBn : service.eligibilityEn).map(
                    (item, idx) => (
                      <div
                        key={idx}
                        className="p-3 bg-emerald-50/60 rounded-lg border border-emerald-100 flex items-start gap-2.5 text-xs text-slate-800"
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    )
                  )}
                </div>
              </div>

              {/* Required Documents Checklist */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
                  <FileCheck2 className="w-4 h-4 text-[#006a4e]" />
                  <span>
                    {language === 'bn'
                      ? 'প্রয়োজনীয় কাগজপত্রের চেকলিস্ট'
                      : 'Required Documents Checklist'}
                  </span>
                </h4>
                <div className="space-y-2">
                  {(language === 'bn' ? service.requiredDocumentsBn : service.requiredDocumentsEn).map(
                    (doc, idx) => (
                      <div
                        key={idx}
                        className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-start gap-3 text-xs sm:text-sm text-slate-800"
                      >
                        <span className="w-5 h-5 rounded-md bg-[#006a4e] text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <span className="leading-snug">{doc}</span>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'steps' && (
            <div className="space-y-6">
              {/* Official Procedures */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-[#006a4e]" />
                  <span>
                    {language === 'bn'
                      ? 'ধাপভিত্তিক অফিসিয়াল আবেদন পদ্ধতি'
                      : 'Step-by-Step Official Procedure'}
                  </span>
                </h4>

                <div className="space-y-3">
                  {service.instructions.map((ins) => (
                    <div
                      key={ins.id}
                      className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-start gap-3.5"
                    >
                      <div className="w-7 h-7 rounded-full bg-[#006a4e] text-white font-bold flex items-center justify-center shrink-0 text-xs">
                        {toBnNum(ins.stepNumber)}
                      </div>
                      <div>
                        <h5 className="font-bold text-slate-900 text-sm mb-1">
                          {language === 'bn' ? ins.titleBn : ins.titleEn}
                        </h5>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          {language === 'bn' ? ins.instructionBn : ins.instructionEn}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Official Statutory Fees Breakdown */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
                  <Receipt className="w-4 h-4 text-[#006a4e]" />
                  <span>
                    {language === 'bn'
                      ? 'গেজেট অনুযায়ী সরকারি ফি বিবরণী'
                      : 'Statutory Fee Schedule'}
                  </span>
                </h4>

                <div className="rounded-xl border border-slate-200 overflow-hidden">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-100 text-slate-700 font-semibold uppercase text-[11px]">
                      <tr>
                        <th className="p-3">{language === 'bn' ? 'ফি-এর খাত' : 'Fee Head'}</th>
                        <th className="p-3 text-right">{language === 'bn' ? 'পরিমাণ' : 'Amount'}</th>
                        <th className="p-3">{language === 'bn' ? 'মন্তব্য' : 'Remarks'}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {service.officialFees.map((fee) => (
                        <tr key={fee.id} className="hover:bg-slate-50/50">
                          <td className="p-3 font-semibold text-slate-900">
                            {language === 'bn' ? fee.titleBn : fee.titleEn}
                          </td>
                          <td className="p-3 text-right font-mono font-bold text-slate-900">
                            {fee.amountBdt === 0
                              ? language === 'bn'
                                ? '০ টাকা'
                                : '0 BDT'
                              : `${toBnNum(fee.amountBdt)} ${language === 'bn' ? 'টাকা' : 'BDT'}`}
                          </td>
                          <td className="p-3 text-slate-500">
                            {language === 'bn' ? fee.notesBn : fee.notesEn}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot className="bg-emerald-50 font-bold border-t border-emerald-200 text-emerald-950">
                      <tr>
                        <td className="p-3">{language === 'bn' ? 'সর্বমোট সরকারি ফি' : 'Total Statutory Fee'}</td>
                        <td className="p-3 text-right font-mono">
                          {service.officialFeesTotalBdt !== undefined
                            ? `${toBnNum(service.officialFeesTotalBdt)} ${language === 'bn' ? 'টাকা' : 'BDT'}`
                            : '—'}
                        </td>
                        <td className="p-3 text-xs font-normal text-emerald-800">
                          {language === 'bn'
                            ? 'এর বাইরে কোনো অতিরিক্ত অর্থ বা মধ্যস্বত্বভোগী প্রযোজ্য নয়'
                            : 'No additional unofficial intermediary charges apply'}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'links' && (
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                {language === 'bn'
                  ? 'এই সেবার আওতাভুক্ত সকল যাচাইকৃত সরকারি লিংক'
                  : 'All Verified Official Endpoints for this Service'}
              </h4>

              <div className="space-y-3">
                {service.links.map((lnk) => (
                  <div
                    key={lnk.id}
                    className="p-4 rounded-xl border border-slate-200 hover:border-emerald-500 bg-slate-50/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-colors"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 text-sm">
                          {language === 'bn' ? lnk.titleBn : lnk.titleEn}
                        </span>
                        {lnk.isPrimary && (
                          <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                            {language === 'bn' ? 'প্রধান পাতা' : 'Primary'}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500 font-mono mt-0.5 truncate max-w-md">
                        {lnk.url}
                      </p>
                      {lnk.notesBn && (
                        <p className="text-xs text-slate-600 mt-1">
                          {language === 'bn' ? lnk.notesBn : lnk.notesEn}
                        </p>
                      )}
                    </div>

                    <a
                      href={lnk.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-2 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 text-slate-800 text-xs font-semibold flex items-center justify-center gap-1.5 shrink-0 transition-colors"
                    >
                      <span>{language === 'bn' ? 'লিংক খুলুন' : 'Open Link'}</span>
                      <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer with External Navigation Action */}
        <div className="bg-slate-100 border-t border-slate-200 p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="text-xs text-slate-500 text-center sm:text-left">
            <span className="font-semibold text-slate-700">
              {language === 'bn' ? 'বহিরাগত নেভিগেশন নোটিশ:' : 'External Portal Notice:'}
            </span>{' '}
            {language === 'bn'
              ? 'নিচের বাটনে ক্লিক করলে আপনি অফিসিয়াল সরকারি পোর্টালে পুনঃনির্দেশিত হবেন।'
              : 'Clicking the button will securely redirect you to the official government portal.'}
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 text-xs font-semibold cursor-pointer"
            >
              {language === 'bn' ? 'ফিরে যান' : 'Close'}
            </button>

            <button
              type="button"
              onClick={() => onLaunchExternal(service)}
              className="flex-1 sm:flex-initial px-6 py-2.5 rounded-xl bg-[#006a4e] hover:bg-emerald-800 text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-md cursor-pointer transition-all"
            >
              <span>{t('openOfficialService')}</span>
              <ExternalLink className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
