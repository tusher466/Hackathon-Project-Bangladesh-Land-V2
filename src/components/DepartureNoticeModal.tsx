/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Bangladesh Integrated Land Services Portal (BILSP)
 * Pre-Departure Confirmation Modal (Explicit External Portal Transition)
 */

import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { LandService } from '../types/bilsp';
import {
  ExternalLink,
  ShieldAlert,
  ShieldCheck,
  X,
  AlertTriangle,
  Lock,
  ArrowRight
} from 'lucide-react';

interface DepartureNoticeModalProps {
  service: LandService | null;
  onClose: () => void;
  onConfirmDeparture: (targetUrl: string) => void;
}

export const DepartureNoticeModal: React.FC<DepartureNoticeModalProps> = ({
  service,
  onClose,
  onConfirmDeparture,
}) => {
  const { language, t } = useLanguage();

  if (!service) return null;

  const destinationUrl = service.directServiceUrl || service.officialWebsiteUrl;

  const handleProceed = () => {
    onConfirmDeparture(destinationUrl);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-lg w-full overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Modal Header */}
        <div className="bg-amber-500 text-slate-950 p-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-white/30 flex items-center justify-center">
              <ShieldAlert className="w-5 h-5 text-slate-950" />
            </div>
            <h3 className="text-base sm:text-lg font-bold">
              {language === 'bn'
                ? 'সরকারি অফিশিয়াল পোর্টালে যাত্রা'
                : 'Departing to Official Government Portal'}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-md hover:bg-black/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-4 text-slate-700 text-sm">
          <p className="leading-relaxed">
            {language === 'bn' ? (
              <>
                আপনি এখন <strong>বিআইএলএসপি</strong> ছেড়ে গণপ্রজাতন্ত্রী বাংলাদেশ সরকারের সরাসরি
                যাচাইকৃত পোর্টাল <strong>{service.nameBn}</strong>-এ প্রবেশ করছেন।
              </>
            ) : (
              <>
                You are now leaving <strong>BILSP</strong> to enter the direct verified official
                government portal for <strong>{service.nameEn}</strong>.
              </>
            )}
          </p>

          {/* Verified Destination Card */}
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
              {language === 'bn' ? 'গন্তব্য সরকারি ওয়েব ঠিকানা (Verified URL):' : 'Destination URL:'}
            </span>
            <div className="flex items-center gap-2 text-[#006a4e] font-mono text-xs sm:text-sm font-semibold break-all">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{destinationUrl}</span>
            </div>
          </div>

          {/* Safety & Credential Protection Reminders */}
          <div className="p-4 rounded-xl bg-slate-100 border border-slate-200 space-y-2 text-xs">
            <div className="flex items-start gap-2 text-slate-800 font-semibold">
              <Lock className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span>
                {language === 'bn'
                  ? 'নিরাপত্তা ও গোপনীয়তা নির্দেশনা:'
                  : 'Important Security & Identity Guidelines:'}
              </span>
            </div>
            <ul className="list-disc list-inside space-y-1 text-slate-600 pl-1 leading-snug">
              <li>
                {language === 'bn'
                  ? 'আপনার কোনো পাসওয়ার্ড বা ব্যক্তিগত পিন তৃতীয় পক্ষের সাথে শেয়ার করবেন না।'
                  : 'Never share your government portal password or confidential PIN with any third party.'}
              </li>
              <li>
                {language === 'bn'
                  ? 'আবেদনের সকল তথ্য ও লেনদেন সরাসরি সরকারি সার্ভার দ্বারাই পরিচালিত ও সংরক্ষিত হবে।'
                  : 'All application procedures and fee payments will be handled directly on the government server.'}
              </li>
              <li>
                {language === 'bn'
                  ? 'বিআইএলএসপি কোনো সরকারি সিদ্ধান্ত পরিবর্তন বা ফাইলের নিষ্পত্তি করে না।'
                  : 'BILSP does not hold administrative authority over government records or approvals.'}
              </li>
            </ul>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="bg-slate-50 border-t border-slate-200 p-4 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-100 text-slate-700 text-xs font-semibold cursor-pointer"
          >
            {language === 'bn' ? 'বাতিল' : 'Cancel'}
          </button>

          <button
            type="button"
            onClick={handleProceed}
            className="px-5 py-2.5 rounded-xl bg-[#006a4e] hover:bg-emerald-800 text-white text-xs sm:text-sm font-bold flex items-center gap-1.5 shadow-sm cursor-pointer transition-colors"
          >
            <span>{t('proceedToOfficial')}</span>
            <ExternalLink className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
