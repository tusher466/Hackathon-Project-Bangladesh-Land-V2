/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Bangladesh Integrated Land Services Portal (BILSP)
 * Main Search Component with Bilingual Synonym Matching & Autocomplete Suggestions
 */

import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { LandService } from '../types/bilsp';
import { Search, X, ShieldAlert, ArrowRight, CheckCircle2, ChevronRight, FileText } from 'lucide-react';

interface HeroSearchProps {
  onSearchSubmit: (query: string) => void;
  onSelectService: (service: LandService) => void;
  services: LandService[];
}

export const HeroSearch: React.FC<HeroSearchProps> = ({
  onSearchSubmit,
  onSelectService,
  services,
}) => {
  const { language, t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState<LandService[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const popularChips = [
    { labelBn: 'ই-নামজারি', labelEn: 'E-Mutation', query: 'mutation' },
    { labelBn: 'ভূমি উন্নয়ন কর (খাজনা)', labelEn: 'Land Tax', query: 'tax' },
    { labelBn: 'খতিয়ান ও পর্চা', labelEn: 'Khatian Porcha', query: 'khatian' },
    { labelBn: 'মৌজা ম্যাপ', labelEn: 'Mouza Map', query: 'mouza map' },
    { labelBn: 'দলিল নিবন্ধন', labelEn: 'Deed Registration', query: 'deed' },
    { labelBn: 'ভূমি অধিগ্রহণ (LARMS)', labelEn: 'Land Acquisition', query: 'larms' },
    { labelBn: '১৬১২২ হেল্পলাইন', labelEn: '16122 Helpline', query: '16122' },
  ];

  // Compute suggestions as user types
  useEffect(() => {
    const q = searchTerm.trim().toLowerCase();
    if (q.length < 2) {
      setSuggestions([]);
      setIsOpen(false);
      return;
    }

    const matches = services.filter((s) => {
      const matchNameBn = s.nameBn.toLowerCase().includes(q);
      const matchNameEn = s.nameEn.toLowerCase().includes(q);
      const matchDescBn = s.shortDescriptionBn.toLowerCase().includes(q);
      const matchDescEn = s.shortDescriptionEn.toLowerCase().includes(q);
      const matchKeywords = s.keywords.some((k) => k.toLowerCase().includes(q));
      const matchSynonymsBn = s.synonymsBn.some((syn) => syn.toLowerCase().includes(q));
      const matchSynonymsEn = s.synonymsEn.some((syn) => syn.toLowerCase().includes(q));
      return (
        matchNameBn ||
        matchNameEn ||
        matchDescBn ||
        matchDescEn ||
        matchKeywords ||
        matchSynonymsBn ||
        matchSynonymsEn
      );
    });

    setSuggestions(matches.slice(0, 6));
    setIsOpen(matches.length > 0);
  }, [searchTerm, services]);

  // Handle outside click to close suggestions
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsOpen(false);
    onSearchSubmit(searchTerm);
  };

  const handleChipClick = (query: string) => {
    setSearchTerm(query);
    onSearchSubmit(query);
    setIsOpen(false);
  };

  const handleSelect = (service: LandService) => {
    setIsOpen(false);
    onSelectService(service);
  };

  return (
    <section className="bg-linear-to-b from-emerald-900 via-[#006a4e] to-emerald-950 text-white py-12 px-4 sm:px-6 relative overflow-hidden">
      {/* Background Subtle Geometry */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Verified National Gateway Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-xs border border-white/20 text-xs sm:text-sm font-medium mb-4 text-emerald-100">
          <CheckCircle2 className="w-4 h-4 text-emerald-300" />
          <span>
            {language === 'bn'
              ? 'গণপ্রজাতন্ত্রী বাংলাদেশ সরকারের সকল অনুমোদিত ভূমি সেবা'
              : 'All Verified Land Services of the Government of Bangladesh'}
          </span>
        </div>

        {/* Hero Headings */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-3">
          {t('heroHeading')}
        </h1>

        <p className="text-base sm:text-lg text-emerald-100 max-w-2xl mx-auto mb-8 font-normal leading-relaxed">
          {t('heroSubtitle')}
        </p>

        {/* Search Box Container */}
        <div ref={containerRef} className="relative max-w-2xl mx-auto text-left">
          <form onSubmit={handleSearch} className="relative flex items-center shadow-xl rounded-xl">
            <div className="absolute left-4 pointer-events-none text-slate-400">
              <Search className="w-6 h-6 text-emerald-700" />
            </div>

            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={t('searchPlaceholder')}
              aria-label="Search land services"
              className="w-full pl-12 pr-28 sm:pr-32 py-4 rounded-xl text-slate-900 bg-white placeholder-slate-400 text-base sm:text-lg font-medium focus:outline-hidden focus:ring-4 focus:ring-emerald-400/50 transition-all border border-transparent"
            />

            {searchTerm && (
              <button
                type="button"
                onClick={() => {
                  setSearchTerm('');
                  setSuggestions([]);
                  setIsOpen(false);
                }}
                className="absolute right-24 sm:right-28 text-slate-400 hover:text-slate-600 p-1"
                aria-label="Clear search"
              >
                <X className="w-5 h-5" />
              </button>
            )}

            <button
              type="submit"
              className="absolute right-2 top-2 bottom-2 px-4 sm:px-6 bg-[#006a4e] hover:bg-emerald-800 text-white font-semibold rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer text-sm sm:text-base"
            >
              <span>{t('searchButton')}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Autocomplete Suggestions Dropdown */}
          {isOpen && suggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden z-50 divide-y divide-slate-100">
              <div className="px-4 py-2 bg-slate-50 text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center justify-between">
                <span>{language === 'bn' ? 'সংশ্লিষ্ট প্রস্তাবিত সেবা' : 'Suggested Services'}</span>
                <span className="text-[11px] font-normal text-slate-400">
                  {suggestions.length} {language === 'bn' ? 'টি ফলাফল' : 'results'}
                </span>
              </div>

              {suggestions.map((service) => (
                <button
                  key={service.id}
                  type="button"
                  onClick={() => handleSelect(service)}
                  className="w-full text-left px-4 py-3 hover:bg-emerald-50/70 transition-colors flex items-center justify-between group cursor-pointer"
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-md bg-emerald-100 text-[#006a4e] mt-0.5 group-hover:bg-emerald-200">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-slate-900 group-hover:text-[#006a4e]">
                        {language === 'bn' ? service.nameBn : service.nameEn}
                      </h4>
                      <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                        {language === 'bn' ? service.shortDescriptionBn : service.shortDescriptionEn}
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#006a4e] shrink-0" />
                </button>
              ))}

              <button
                type="button"
                onClick={handleSearch}
                className="w-full text-center py-2.5 bg-slate-50 hover:bg-slate-100 text-xs font-medium text-emerald-800 transition-colors flex items-center justify-center gap-1 cursor-pointer"
              >
                <span>
                  {language === 'bn'
                    ? `"${searchTerm}" সম্পর্কিত সকল ফলাফল দেখুন`
                    : `View all results for "${searchTerm}"`}
                </span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Privacy & Anti-Credential Safety Notice */}
          <div className="mt-3 flex items-start gap-2 text-xs text-emerald-200/90 bg-emerald-950/40 backdrop-blur-xs p-2.5 rounded-lg border border-emerald-700/50">
            <ShieldAlert className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
            <p className="leading-tight">
              {language === 'bn'
                ? 'সতর্কতা: অনুসন্ধান বক্সে কখনোই আপনার এনআইডি পিন, পাসওয়ার্ড বা ব্যক্তিগত গোপন তথ্য লিখবেন না। বিআইএলএসপি কখনোই নাগরিকদের পাসওয়ার্ড সংগ্রহ করে না।'
                : 'Security Notice: Never enter your National ID PIN, passwords, or personal credentials into this search bar. BILSP does not collect passwords.'}
            </p>
          </div>
        </div>

        {/* Quick Search Chips */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-xs">
          <span className="text-emerald-200 font-medium">{t('quickSearches')}</span>
          {popularChips.map((chip, idx) => (
            <button
              key={idx}
              onClick={() => handleChipClick(chip.query)}
              className="px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors border border-white/20 hover:border-emerald-300 cursor-pointer"
            >
              {language === 'bn' ? chip.labelBn : chip.labelEn}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
