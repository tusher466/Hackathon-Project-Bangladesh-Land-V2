/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Bangladesh Integrated Land Services Portal (BILSP)
 * Frequently Asked Questions, Official Circulars & Transparency Counters
 */

import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { OfficialSource } from '../types/bilsp';
import {
  HelpCircle,
  ChevronDown,
  FileText,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Layers,
  Globe,
  PhoneCall,
  Activity
} from 'lucide-react';

interface HomeNoticesFaqProps {
  sources: OfficialSource[];
}

export const HomeNoticesFaq: React.FC<HomeNoticesFaqProps> = ({ sources }) => {
  const { language, t, toBnNum } = useLanguage();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const faqs = [
    {
      qBn: 'ই-নামজারির আইনসম্মত মোট সরকারি ফি কত এবং কীভাবে প্রদান করতে হয়?',
      qEn: 'What is the statutory fee for E-Mutation and how is it paid?',
      aBn: 'ভূমি মন্ত্রণালয়ের প্রজ্ঞাপন অনুযায়ী ই-নামজারির মোট সরকারি ফি সর্বমোট ১,১৭০ টাকা (কোর্ট ফি ২০ টাকা + নোটিশ জারি ফি ৫০ টাকা + রেকর্ড সংশোধন ফি ১,০০০ টাকা + খতিয়ান ফি ১০০ টাকা)। এর বাইরে কোনো বাড়তি অর্থ প্রদেয় নয়। এটি সরাসরি বিকাশ, নগদ বা ব্যাংকিং গেটওয়ের মাধ্যমে অনলাইনে পরিশোধ করতে হয়।',
      aEn: 'According to Ministry of Land statutory circulars, total official fee for E-Mutation is strictly 1,170 BDT (Court fee 20 + Notice fee 50 + Record correction 1,000 + Khatian fee 100). No unofficial third-party fees apply. Payment is made digitally via bKash, Nagad, or cards.'
    },
    {
      qBn: 'কৃষি জমির ভূমি উন্নয়ন কর কি সত্যিই ২৫ বিঘা পর্যন্ত মওকুফ?',
      qEn: 'Is Land Development Tax truly exempt for agricultural land up to 25 bighas?',
      aBn: 'হ্যাঁ, ভূমি উন্নয়ন কর আইন ২০২৩-এর ধারা অনুযায়ী ব্যক্তির মালিকানাধীন কৃষি জমির পরিমাণ ২৫ বিঘা (৮.২৫ একর) পর্যন্ত হলে সাধারণ ভূমি উন্নয়ন কর সম্পূর্ণ মওকুফ। তবে মালিকানা হালনাগাদ রাখতে ও দাখিলা সনদ সংগ্রহ করতে অনলাইনে হোল্ডিং এন্ট্রি রাখা প্রয়োজন।',
      aEn: 'Yes, under the Land Development Tax Act 2023, individual agricultural holdings up to 25 bighas (8.25 acres) are entirely exempt from land development tax. However, holding registration online is needed to maintain title and obtain annual dakhila.'
    },
    {
      qBn: 'অনলাইনে মৌজা ম্যাপ অর্ডার করলে তা কীভাবে এবং কত দিনে পাওয়া যায়?',
      qEn: 'How and within what timeframe is a printed Mouza Map delivered?',
      aBn: 'ই-পর্চা পোর্টালে নির্দিষ্ট মৌজা ও সিট নম্বর বাছাই করে সরকারি ফি ৫২০ টাকা পরিশোধ করলে ভূমি রেকর্ড ও জরিপ অধিদপ্তর (ডিএলআরএস) হতে বাংলাদেশ ডাক বিভাগের মাধ্যমে বিশেষ সুরক্ষিত ওয়াটারপ্রুফ প্লাস্টিক টিউবে মোড়ানো মুদ্রিত ক্যাডাস্ট্রাল ম্যাপ ৭ থেকে ১০ কর্মদিবসের মধ্যে আপনার ঠিকানায় পৌঁছে দেওয়া হয়।',
      aEn: 'Upon ordering on e-Porcha with a 520 BDT fee, the Directorate of Land Records and Surveys (DLRS) prints the high-resolution sheet and dispatches it in protective waterproof tubes via Bangladesh Post to your home within 7 to 10 working days.'
    },
    {
      qBn: 'বিআইএলএসপি-এর সাথে বিদ্যমান সরকারি পোর্টালগুলোর সম্পর্ক কী?',
      qEn: 'What is the relationship between BILSP and existing government portals?',
      aBn: 'বিআইএলএসপি কোনো বিদ্যমান সরকারি ওয়েবসাইটকে প্রতিস্থাপন করে না। এটি একটি সমন্বিত নাগরিক পথনির্দেশক গেটওয়ে, যা নাগরিকদের বিভিন্ন পোর্টালের সঠিক ইউআরএল, প্রয়োজনীয় কাগজপত্র, সরকারি ফি এবং আইনি নির্দেশিকা সহজ বাংলায় এক ঠিকানায় তুলে ধরে। মূল লেনদেন ও নিষ্পত্তি সংশ্লিষ্ট ক্ষমতাপ্রাপ্ত সরকারি পোর্টালেই সম্পন্ন হয়।',
      aEn: 'BILSP does not replace existing government systems. It serves as an intelligent navigation directory providing verified endpoints, document checklists, official gazette fee schedules, and instructions in one place. All official applications remain with the authorized government systems.'
    },
    {
      qBn: 'জমি জবরদখল বা জাল দলিলের বিরুদ্ধে প্রতিকার পেতে কী করতে হবে?',
      qEn: 'What steps should be taken against illegal land grabbing or forged deeds?',
      aBn: 'ভূমি অপরাধ প্রতিরোধ ও প্রতিকার আইন ২০২৩ অনুযায়ী জমি জবরদখল ও ভুয়া দলিল তৈরিকে জামিনঅযোগ্য ফৌজদারি অপরাধ গণ্য করা হয়েছে। ভুক্তভোগী নাগরিকরা সহকারী কমিশনার (ভূমি) বা নির্বাহী ম্যাজিস্ট্রেটের আদালতে প্রমাণাদিসহ আবেদন করতে পারেন অথবা ১৬১২২ হেল্পলাইনে অভিযোগ জানাতে পারেন।',
      aEn: 'Under the Land Crime Prevention and Redress Act 2023, land encroachment and forged deed creation are non-bailable criminal offenses. Citizens can submit petitions with evidence before the Executive Magistrate or AC Land, or dial 16122.'
    }
  ];

  return (
    <section className="py-14 px-4 sm:px-6 max-w-7xl mx-auto space-y-12">
      {/* Transparency & Ecosystem Overview Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        <div className="space-y-1">
          <div className="w-10 h-10 rounded-full bg-emerald-50 text-[#006a4e] flex items-center justify-center mx-auto mb-2">
            <ShieldCheck className="w-5 h-5 text-emerald-700" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono">
            {toBnNum(18)}+
          </div>
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            {language === 'bn' ? 'যাচাইকৃত ভূমি সেবা' : 'Verified Services'}
          </div>
        </div>

        <div className="space-y-1">
          <div className="w-10 h-10 rounded-full bg-emerald-50 text-[#006a4e] flex items-center justify-center mx-auto mb-2">
            <Globe className="w-5 h-5 text-emerald-700" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono">
            {toBnNum(13)}
          </div>
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            {language === 'bn' ? 'সরকারি ওয়েব ডোমেইন' : 'Gov.bd Web Portals'}
          </div>
        </div>

        <div className="space-y-1">
          <div className="w-10 h-10 rounded-full bg-emerald-50 text-[#006a4e] flex items-center justify-center mx-auto mb-2">
            <PhoneCall className="w-5 h-5 text-emerald-700" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono">
            {toBnNum(16122)}
          </div>
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            {language === 'bn' ? '২৪/৭ নাগরিক হেল্পলাইন' : 'Dedicated Helpline'}
          </div>
        </div>

        <div className="space-y-1">
          <div className="w-10 h-10 rounded-full bg-emerald-50 text-[#006a4e] flex items-center justify-center mx-auto mb-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-700" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono">
            ১০০%
          </div>
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            {language === 'bn' ? 'গেজেট ও বিধি সংগতি' : 'Statutory Compliance'}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Frequently Asked Questions (FAQ) */}
        <div className="lg:col-span-7 space-y-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#006a4e] uppercase tracking-wider mb-1">
              <HelpCircle className="w-4 h-4 text-emerald-700" />
              <span>{language === 'bn' ? 'নাগরিক জিজ্ঞাসা' : 'Citizen Help & FAQ'}</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              {language === 'bn'
                ? 'সচরাচর জিজ্ঞাসিত প্রশ্ন ও সঠিক সমাধান'
                : 'Frequently Asked Questions'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              {language === 'bn'
                ? 'ভূমি সেবা গ্রহণের ক্ষেত্রে নাগরিকদের বহুল আলোচিত প্রশ্নাবলীর সরাসরি সরকারি উত্তর।'
                : 'Direct authoritative guidance on commonly asked citizen questions.'}
            </p>
          </div>

          <div className="space-y-3 pt-2">
            {faqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;

              return (
                <div
                  key={index}
                  className="bg-white rounded-xl border border-slate-200 overflow-hidden transition-all shadow-2xs"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50 transition-colors"
                  >
                    <span className="font-bold text-slate-900 text-sm sm:text-base leading-snug">
                      {language === 'bn' ? faq.qBn : faq.qEn}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-slate-400 shrink-0 transition-transform ${
                        isOpen ? 'rotate-180 text-[#006a4e]' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-slate-700 text-xs sm:text-sm leading-relaxed border-t border-slate-100 bg-slate-50/50">
                      <p>{language === 'bn' ? faq.aBn : faq.aEn}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Verified Government Notices & Acts */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                {language === 'bn' ? 'গেজেট ও পরিপত্র' : 'Gazettes & Acts'}
              </span>
              <h4 className="text-base sm:text-lg font-bold text-slate-900 mt-1">
                {language === 'bn' ? 'যাচাইকৃত আইনি উৎসসমূহ' : 'Official Legal Sources'}
              </h4>
            </div>
            <FileText className="w-5 h-5 text-[#006a4e]" />
          </div>

          <p className="text-xs text-slate-500 leading-relaxed">
            {language === 'bn'
              ? 'বিআইএলএসপি-এর সকল তথ্য নিচের রাষ্ট্রীয় গেজেট, আইন ও মন্ত্রণালয়ের নির্দেশিকা মোতাবেক যাচাইকৃত:'
              : 'All information on BILSP is grounded in the following official gazettes and enactments:'}
          </p>

          <div className="space-y-3">
            {sources.map((src) => (
              <div
                key={src.id}
                className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/60 hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-start justify-between gap-2 mb-1">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700 font-mono">
                    {src.sourceType}
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono">{src.publishedDate}</span>
                </div>

                <h5 className="font-bold text-slate-900 text-xs sm:text-sm leading-snug">
                  {language === 'bn' ? src.titleBn : src.titleEn}
                </h5>

                <p className="text-[11px] text-slate-500 font-mono mt-0.5">{src.referenceNo}</p>

                <p className="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed">
                  {language === 'bn' ? src.summaryBn : src.summaryEn}
                </p>

                <div className="mt-2 pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px]">
                  <span className="text-slate-500">
                    {language === 'bn' ? src.institutionBn : src.institutionEn}
                  </span>
                  <a
                    href={src.officialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#006a4e] hover:underline font-semibold flex items-center gap-1"
                  >
                    <span>{language === 'bn' ? 'গেজেট লিঙ্ক' : 'Source'}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
