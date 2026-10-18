/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Bangladesh Integrated Land Services Portal (BILSP)
 * Authoritative Government Public Service Footer
 */

import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { OfficialSource } from '../types/bilsp';
import {
  ShieldCheck,
  PhoneCall,
  ExternalLink,
  Building,
  FileText,
  Lock,
  Globe,
  Mail,
  MapPin
} from 'lucide-react';

interface FooterProps {
  sources: OfficialSource[];
  onNavigate: (view: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ sources, onNavigate }) => {
  const { language, toBnNum } = useLanguage();

  return (
    <footer className="bg-slate-900 text-slate-300 text-xs pt-12 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10">
        {/* Helpline Banner Inside Footer */}
        <div className="bg-linear-to-r from-emerald-950 via-[#006a4e] to-emerald-950 rounded-2xl p-6 border border-emerald-700/50 flex flex-col md:flex-row items-center justify-between gap-4 text-white">
          <div className="flex items-center gap-4 text-center md:text-left">
            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center shrink-0">
              <PhoneCall className="w-6 h-6 text-amber-300" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold">
                {language === 'bn'
                  ? '১৬১২২ ভূমি সেবা হেল্পলাইন ও নাগরিক সহায়তা সেল'
                  : '16122 Dedicated Citizen Land Services Helpline'}
              </h3>
              <p className="text-xs text-emerald-100 max-w-xl">
                {language === 'bn'
                  ? 'ই-নামজারি, খাজনা বা খতিয়ান সংক্রান্ত যেকোনো সমস্যা বা পরামর্শের জন্য দেশের যেকোনো মোবাইল থেকে ১৬১২২ নম্বরে কল করুন। প্রবাস থেকে: +৮৮০ ৯৬১২৩ ১৬১২২'
                  : 'Call 16122 from any phone in Bangladesh for application assistance and guidance. From abroad: +880 96123 16122'}
              </p>
            </div>
          </div>

          <a
            href="tel:16122"
            className="px-6 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-sm shrink-0 shadow-md transition-colors"
          >
            {language === 'bn' ? 'সরাসরি কল করুন (১৬১২২)' : 'Call Now (16122)'}
          </a>
        </div>

        {/* 4-column Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Col 1: Government Identity */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-white font-bold text-base">
              <div className="w-8 h-8 rounded-lg bg-[#006a4e] flex items-center justify-center text-white">
                <ShieldCheck className="w-5 h-5 text-amber-300" />
              </div>
              <span>{language === 'bn' ? 'বিআইএলএসপি' : 'BILSP'}</span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              {language === 'bn'
                ? 'বাংলাদেশ সমন্বিত ভূমি সেবা পোর্টাল (BILSP) হলো সরকারের বিদ্যমান ভূমি বিষয়ক সকল অনলাইন সেবা ও পোর্টালের কেন্দ্রীয় পথনির্দেশক গেটওয়ে।'
                : 'Bangladesh Integrated Land Services Portal (BILSP) is the unified public navigation gateway consolidating verified digital land services.'}
            </p>
            <div className="pt-2 text-slate-400 space-y-1">
              <p className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>{language === 'bn' ? 'বাংলাদেশ সচিবালয়, ঢাকা ১০০০' : 'Bangladesh Secretariat, Dhaka 1000'}</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span className="font-mono">support@land.gov.bd</span>
              </p>
            </div>
          </div>

          {/* Col 2: Verified Portals */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider">
              {language === 'bn' ? 'প্রধান সরকারি পোর্টালসমূহ' : 'Key Official Portals'}
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://minland.gov.bd/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <Globe className="w-3.5 h-3.5 text-emerald-500" />
                  <span>{language === 'bn' ? 'ভূমি মন্ত্রণালয়' : 'Ministry of Land'} (minland.gov.bd)</span>
                </a>
              </li>
              <li>
                <a
                  href="https://mutation.land.gov.bd/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <Globe className="w-3.5 h-3.5 text-emerald-500" />
                  <span>{language === 'bn' ? 'ই-নামজারি পোর্টাল' : 'E-Mutation'} (mutation.land.gov.bd)</span>
                </a>
              </li>
              <li>
                <a
                  href="https://ldtax.gov.bd/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <Globe className="w-3.5 h-3.5 text-emerald-500" />
                  <span>{language === 'bn' ? 'ভূমি উন্নয়ন কর' : 'Land Tax'} (ldtax.gov.bd)</span>
                </a>
              </li>
              <li>
                <a
                  href="https://eporcha.gov.bd/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <Globe className="w-3.5 h-3.5 text-emerald-500" />
                  <span>{language === 'bn' ? 'ই-পর্চা ও মৌজা ম্যাপ' : 'e-Porcha Records'} (eporcha.gov.bd)</span>
                </a>
              </li>
              <li>
                <a
                  href="https://dlrs.gov.bd/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <Globe className="w-3.5 h-3.5 text-emerald-500" />
                  <span>{language === 'bn' ? 'ডিএলআরএস জরিপ অধিদপ্তর' : 'DLRS Directorate'} (dlrs.gov.bd)</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Official Gazettes & Acts */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider">
              {language === 'bn' ? 'সরকারি গেজেট ও আইন' : 'Verified Legal Sources'}
            </h4>
            <div className="space-y-2">
              {sources.slice(0, 3).map((src) => (
                <div key={src.id} className="text-slate-400">
                  <span className="font-semibold text-slate-200 block leading-snug">
                    {language === 'bn' ? src.titleBn : src.titleEn}
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono block mt-0.5">
                    {src.referenceNo}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Col 4: Quick Navigation & Portal Admin */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider">
              {language === 'bn' ? 'পোর্টাল নেভিগেশন' : 'Quick Navigation'}
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('home')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {language === 'bn' ? 'হোম পেজ' : 'Home'}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('services')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {language === 'bn' ? 'সকল সেবা ডিরেক্টরি' : 'All Services'}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('offices')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {language === 'bn' ? 'ভূমি অফিস খুঁজুন' : 'Land Offices Locator'}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('mydesk')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {language === 'bn' ? 'আমার সংরক্ষিত ডেস্ক' : 'Citizen My Desk'}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('admin')}
                  className="hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer text-amber-400 font-semibold"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>{language === 'bn' ? 'প্রশাসনিক কনসোল' : 'Admin Portal'}</span>
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Statutory Disclaimer & Copyright */}
        <div className="pt-8 border-t border-slate-800 text-slate-500 text-[11px] leading-relaxed space-y-3">
          <p>
            {language === 'bn'
              ? 'আইনি ঘোষণা: বিআইএলএসপি বাংলাদেশ সরকারের বিদ্যমান ডিজিটাল সেবাগুলোর সমন্বিত প্রদর্শক ও পথনির্দেশক হিসেবে কাজ করে। এই পোর্টাল কোনো মূল সরকারি সিদ্ধান্ত, রেকর্ড সংশোধন বা আদেশনামা প্রদানের দাবি করে না। সকল সেবা ও মামলা সংশ্লিষ্ট ক্ষমতাপ্রাপ্ত সরকারি অধিদপ্তর ও কর্মকর্তাদের এখতিয়ারাধীন।'
              : 'Statutory Disclaimer: BILSP functions solely as a central intelligent navigation and guidance layer for verified government portals in Bangladesh. BILSP does not claim administrative authority over land titles, records, or judicial decisions.'}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-2 text-slate-400">
            <p>
              © {new Date().getFullYear()}{' '}
              {language === 'bn'
                ? 'গণপ্রজাতন্ত্রী বাংলাদেশ সরকার | ভূমি মন্ত্রণালয়'
                : "Government of the People's Republic of Bangladesh | Ministry of Land"}
            </p>
            <div className="flex items-center gap-4">
              <span className="text-emerald-500 font-semibold">
                {language === 'bn' ? 'নিরাপদ সরকারি প্রবেশদ্বার' : 'Secure Official Gateway'}
              </span>
              <span>v2.0.0</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
