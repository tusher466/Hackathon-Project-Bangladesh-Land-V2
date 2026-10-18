/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Bangladesh Integrated Land Services Portal (BILSP)
 * BhumiSutra (ভূমিসূত্র) Feature Showcase & Launchpad
 * Direct Link: https://hackathon-project-bangladesh-land-n.vercel.app/
 */

import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import {
  Sparkles,
  ExternalLink,
  ShieldCheck,
  BrainCircuit,
  MapPin,
  FileText,
  Scale,
  Maximize2,
  RefreshCw,
  ArrowLeft,
  ChevronRight,
  Compass,
  CheckCircle2,
  Laptop
} from 'lucide-react';

interface BhumiSutraViewProps {
  onBackToPortal: () => void;
}

export const BhumiSutraView: React.FC<BhumiSutraViewProps> = ({ onBackToPortal }) => {
  const { language } = useLanguage();
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [viewMode, setViewMode] = useState<'embed' | 'overview'>('overview');

  const TARGET_URL = 'https://hackathon-project-bangladesh-land-n.vercel.app/';

  const handleLaunchExternal = () => {
    window.open(TARGET_URL, '_blank', 'noopener,noreferrer');
  };

  const featureCards = [
    {
      titleBn: 'কৃত্রিম বুদ্ধিমত্তানির্ভর ভূমি সহকারী',
      titleEn: 'AI Land Intelligence Engine',
      descBn: 'জমি ক্রয়-বিক্রয়, নামজারি প্রক্রিয়া, খতিয়ান যাচাই এবং বিরোধ সংক্রান্ত প্রশ্নের তাৎক্ষণিক উত্তর ও আইনি বিশ্লেষণ।',
      descEn: 'Instant legal guidance, mutation eligibility checking, and cadastral analysis powered by modern LLMs.',
      icon: BrainCircuit,
      color: 'from-emerald-500 to-teal-700'
    },
    {
      titleBn: 'স্মার্ট দাগ ও জিও-ম্যাপিং ট্র্যাকার',
      titleEn: 'Smart Dag & Plot Locator',
      descBn: 'মৌজা জেএল নম্বর এবং দাগ নম্বরের সাহায্যে যেকোনো প্লটের ভৌগোলিক অবস্থান ও সীমানা পরিমাপ।',
      descEn: 'Pinpoint exact cadastral plot coordinates using Mouza JL and Dag numbers with boundary visualization.',
      icon: MapPin,
      color: 'from-blue-500 to-indigo-700'
    },
    {
      titleBn: 'উত্তরাধিকার ও বণ্টন ক্যালকুলেটর',
      titleEn: 'Faraiz & Succession Analytics',
      descBn: 'মুসলিম ও অন্যান্য ব্যক্তিগত আইন অনুযায়ী ফারায়েজ হিসাব এবং যৌথ মালিকানার সঠিক হিস্যা নিরূপণ।',
      descEn: 'Accurate shares and portion distribution calculations according to legal succession laws.',
      icon: Scale,
      color: 'from-amber-500 to-orange-700'
    },
    {
      titleBn: 'জাল দলিল ও বিরোধ ঝুঁকি শনাক্তকরণ',
      titleEn: 'Deed Risk & Anomaly Detector',
      descBn: 'খতিয়ানের সাথে দলিলের মালিকানা চেইন এবং সাবেক দাগের ধারাবাহিকতা নিরীক্ষা করে জালিয়াতির ঝুঁকি হ্রাস।',
      descEn: 'Cross-verifies khatian chains with deed ownership to detect title defects and potential land disputes.',
      icon: ShieldCheck,
      color: 'from-rose-500 to-pink-700'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6 font-['Hind_Siliguri','Inter',sans-serif]">
      {/* Top Breadcrumb & Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-200">
        <button
          type="button"
          onClick={onBackToPortal}
          className="flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-700 hover:text-[#006a4e] transition-colors cursor-pointer bg-white px-3.5 py-2 rounded-xl border border-slate-200 shadow-2xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{language === 'bn' ? 'মূল পোর্টালে ফিরে যান' : 'Back to Main Portal'}</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setViewMode(viewMode === 'overview' ? 'embed' : 'overview')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
              viewMode === 'embed'
                ? 'bg-emerald-50 text-[#006a4e] border-emerald-300'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
          >
            <Laptop className="w-4 h-4" />
            <span>{viewMode === 'embed' ? (language === 'bn' ? 'সংক্ষিপ্ত তথ্য দেখুন' : 'View Overview') : (language === 'bn' ? 'পোর্টালের ভেতরে দেখুন (Live Embed)' : 'Live Embed')}</span>
          </button>

          <button
            type="button"
            onClick={handleLaunchExternal}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-extrabold bg-[#006a4e] hover:bg-emerald-800 text-white shadow-sm transition-all cursor-pointer"
          >
            <span>{language === 'bn' ? 'সরাসরি নতুন ট্যাবে খুলুন' : 'Open in New Tab'}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Hero Banner for BhumiSutra */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-emerald-900 via-[#006a4e] to-teal-950 text-white p-6 sm:p-10 shadow-lg border border-emerald-700/40">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full -mr-20 -mt-20 pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-60 h-60 bg-amber-400/10 rounded-full blur-2xl pointer-events-none" />

        <div className="max-w-3xl space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold text-amber-300">
            <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin" />
            <span>{language === 'bn' ? 'জাতীয় হ্যাকাথন উদ্ভাবনী প্ল্যাটফর্ম' : 'National Hackathon Innovation Platform'}</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
            {language === 'bn' ? 'ভূমিসূত্র (BhumiSutra)' : 'BhumiSutra'}
          </h1>
          <p className="text-sm sm:text-base text-emerald-100 font-medium leading-relaxed">
            {language === 'bn'
              ? 'বাংলাদেশ সরকারের স্মার্ট ভূমি ব্যবস্থাপনায় কৃত্রিম বুদ্ধিমত্তা, ভৌগোলিক অবস্থান ও আধুনিক সমাধানের সমন্বিত উদ্ভাবনী প্ল্যাটফর্ম। নাগরিকরা সহজে জমির খতিয়ান, দাগ, নামজারি এবং মালিকানার জটিলতা নিরসনে ভূমিসূত্র ব্যবহার করতে পারবেন।'
              : 'An integrated smart land innovation platform combining AI, cadastral mapping, and automated dispute resolution to empower citizens and streamline land governance in Bangladesh.'}
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <a
              href={TARGET_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-sm shadow-md transition-transform hover:scale-[1.02] cursor-pointer"
            >
              <span>{language === 'bn' ? 'ভূমিসূত্রে প্রবেশ করুন (Launch BhumiSutra)' : 'Launch BhumiSutra App'}</span>
              <ExternalLink className="w-4 h-4" />
            </a>

            <button
              type="button"
              onClick={() => setViewMode('embed')}
              className="inline-flex items-center gap-2 px-4 py-3 rounded-2xl bg-white/10 hover:bg-white/20 backdrop-blur-md text-white font-bold text-sm border border-white/20 transition-colors cursor-pointer"
            >
              <Laptop className="w-4 h-4 text-emerald-300" />
              <span>{language === 'bn' ? 'এখানেই লাইভ অ্যাপ দেখুন' : 'Preview App In-Page'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Feature Showcase Grid (Overview Mode) */}
      {viewMode === 'overview' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#006a4e]" />
              <span>{language === 'bn' ? 'ভূমিসূত্রের প্রধান উদ্ভাবনী সুবিধাসমূহ' : 'Core Features of BhumiSutra'}</span>
            </h2>
            <span className="text-xs font-mono text-slate-500">
              {TARGET_URL}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {featureCards.map((feat, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:border-emerald-300 transition-all space-y-3 group"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${feat.color} flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform`}>
                    <feat.icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-extrabold text-slate-900 text-base">
                    {language === 'bn' ? feat.titleBn : feat.titleEn}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                  {language === 'bn' ? feat.descBn : feat.descEn}
                </p>
              </div>
            ))}
          </div>

          {/* Quick External Launch Card */}
          <div className="p-6 rounded-2xl bg-emerald-50/70 border border-emerald-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <h4 className="font-bold text-slate-900 text-sm">
                {language === 'bn' ? 'সরাসরি প্ল্যাটফর্মে যুক্ত হতে চান?' : 'Ready to explore BhumiSutra?'}
              </h4>
              <p className="text-xs text-slate-600">
                {language === 'bn'
                  ? 'নিচের বাটনে ক্লিক করে সরাসরি অফিসিয়াল লাইভ অ্যাপ্লিকেশনে চলে যান।'
                  : 'Click the button below to open the deployed hackathon project on Vercel.'}
              </p>
            </div>
            <a
              href={TARGET_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl bg-[#006a4e] hover:bg-emerald-800 text-white font-extrabold text-xs sm:text-sm flex items-center gap-2 shadow-xs cursor-pointer shrink-0"
            >
              <span>{language === 'bn' ? 'ভূমিসূত্র প্ল্যাটফর্মে যান' : 'Go to BhumiSutra'}</span>
              <ExternalLink className="w-4 h-4 text-amber-300" />
            </a>
          </div>
        </div>
      )}

      {/* Live Embedded View Mode */}
      {viewMode === 'embed' && (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm space-y-2 p-2">
          <div className="flex items-center justify-between p-2 bg-slate-100 rounded-xl text-xs font-mono text-slate-600">
            <div className="flex items-center gap-2 truncate">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="truncate">{TARGET_URL}</span>
            </div>
            <a
              href={TARGET_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 font-bold text-emerald-800 hover:underline shrink-0"
            >
              <span>{language === 'bn' ? 'ফুলস্ক্রিন দেখুন' : 'Full Screen'}</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <div className="w-full h-[680px] rounded-xl overflow-hidden border border-slate-200 relative bg-slate-50">
            <iframe
              src={TARGET_URL}
              title="BhumiSutra Smart Land Platform"
              className="w-full h-full border-0"
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
              loading="lazy"
            />
          </div>
        </div>
      )}
    </div>
  );
};
