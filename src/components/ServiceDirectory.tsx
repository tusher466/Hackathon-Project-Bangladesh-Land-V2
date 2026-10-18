/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Bangladesh Integrated Land Services Portal (BILSP)
 * Complete Categorized Service Directory with Multi-faceted Filtering & Sorting
 */

import React, { useState, useMemo } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { LandService, ServiceCategory, GovernmentInstitution } from '../types/bilsp';
import {
  Search,
  Filter,
  CheckCircle2,
  ExternalLink,
  Info,
  Bookmark,
  Building2,
  Receipt,
  Clock,
  ArrowUpDown,
  LayoutGrid,
  List,
  SlidersHorizontal,
  X,
  FileText
} from 'lucide-react';

interface ServiceDirectoryProps {
  services: LandService[];
  categories: ServiceCategory[];
  institutions: GovernmentInstitution[];
  onSelectService: (service: LandService) => void;
  onLaunchExternal: (service: LandService) => void;
  savedServiceIds: string[];
  onToggleSave: (serviceId: string) => void;
  initialQuery?: string;
  initialCategory?: string;
}

export const ServiceDirectory: React.FC<ServiceDirectoryProps> = ({
  services,
  categories,
  institutions,
  onSelectService,
  onLaunchExternal,
  savedServiceIds,
  onToggleSave,
  initialQuery = '',
  initialCategory = 'all',
}) => {
  const { language, t, toBnNum } = useLanguage();

  const [query, setQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedInstitution, setSelectedInstitution] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [sortBy, setSortBy] = useState<'default' | 'name' | 'date' | 'fee'>('default');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  const filteredServices = useMemo(() => {
    let result = [...services];

    if (query.trim()) {
      const q = query.toLowerCase().trim();
      result = result.filter((s) => {
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
    }

    if (selectedCategory !== 'all') {
      result = result.filter((s) => s.categoryId === selectedCategory);
    }

    if (selectedInstitution !== 'all') {
      result = result.filter((s) => s.institutionId === selectedInstitution);
    }

    if (selectedType !== 'all') {
      result = result.filter((s) => s.integrationType === selectedType);
    }

    if (selectedStatus !== 'all') {
      result = result.filter((s) => s.availabilityStatus === selectedStatus);
    }

    // Sort
    if (sortBy === 'name') {
      result.sort((a, b) =>
        language === 'bn' ? a.nameBn.localeCompare(b.nameBn) : a.nameEn.localeCompare(b.nameEn)
      );
    } else if (sortBy === 'date') {
      result.sort((a, b) => b.lastVerifiedDate.localeCompare(a.lastVerifiedDate));
    } else if (sortBy === 'fee') {
      result.sort(
        (a, b) => (a.officialFeesTotalBdt || 0) - (b.officialFeesTotalBdt || 0)
      );
    }

    return result;
  }, [
    services,
    query,
    selectedCategory,
    selectedInstitution,
    selectedType,
    selectedStatus,
    sortBy,
    language,
  ]);

  const clearAllFilters = () => {
    setQuery('');
    setSelectedCategory('all');
    setSelectedInstitution('all');
    setSelectedType('all');
    setSelectedStatus('all');
    setSortBy('default');
  };

  return (
    <div className="py-10 px-4 sm:px-6 max-w-7xl mx-auto space-y-8">
      {/* Directory Page Title */}
      <div className="border-b border-slate-200 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#006a4e] uppercase tracking-wider mb-1">
            <span className="w-2 h-2 rounded-full bg-[#006a4e]" />
            <span>{language === 'bn' ? 'কেন্দ্রীয় সেবা ক্যাটালগ' : 'Central Service Catalog'}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            {language === 'bn'
              ? 'ভূমি সংক্রান্ত সকল ডিজিটাল সেবাসমূহ'
              : 'All Integrated Land Digital Services'}
          </h1>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            {language === 'bn'
              ? 'বাংলাদেশ সরকারের অনুমোদিত সকল ভূমি সেবা ফিল্টার ও অনুসন্ধানের মাধ্যমে খুঁজে নিন।'
              : 'Filter and discover all verified Bangladesh land-sector digital portals and public services.'}
          </p>
        </div>

        {/* View Switcher + Total Count */}
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold text-slate-600 bg-slate-100 px-3 py-1.5 rounded-lg">
            {toBnNum(filteredServices.length)} {language === 'bn' ? 'টি সেবা প্রদর্শিত' : 'services shown'}
          </span>

          <div className="flex items-center bg-slate-100 p-1 rounded-lg border border-slate-200">
            <button
              type="button"
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-md transition-colors cursor-pointer ${
                viewMode === 'grid' ? 'bg-white shadow-xs text-slate-900' : 'text-slate-500'
              }`}
              title="Grid view"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-md transition-colors cursor-pointer ${
                viewMode === 'table' ? 'bg-white shadow-xs text-slate-900' : 'text-slate-500'
              }`}
              title="Table view"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Filter and Search Toolbar */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4 text-xs">
        {/* Search input bar */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={
              language === 'bn'
                ? 'সেবার নাম, কীওয়ার্ড বা বিবরণ দিয়ে ফিল্টার করুন...'
                : 'Filter services by title, keywords or purpose...'
            }
            className="w-full pl-9 pr-10 py-3 rounded-xl border border-slate-300 text-slate-900 text-sm font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Filters Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {/* Category */}
          <div>
            <label className="font-bold text-slate-700 block mb-1">
              {language === 'bn' ? 'ক্যাটাগরি:' : 'Category:'}
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full p-2 rounded-lg border border-slate-300 text-slate-900 font-medium"
            >
              <option value="all">{language === 'bn' ? 'সকল ক্যাটাগরি' : 'All Categories'}</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {language === 'bn' ? c.nameBn : c.nameEn}
                </option>
              ))}
            </select>
          </div>

          {/* Institution */}
          <div>
            <label className="font-bold text-slate-700 block mb-1">
              {language === 'bn' ? 'কর্তৃপক্ষ:' : 'Institution:'}
            </label>
            <select
              value={selectedInstitution}
              onChange={(e) => setSelectedInstitution(e.target.value)}
              className="w-full p-2 rounded-lg border border-slate-300 text-slate-900 font-medium"
            >
              <option value="all">{language === 'bn' ? 'সকল কর্তৃপক্ষ' : 'All Institutions'}</option>
              {institutions.map((i) => (
                <option key={i.id} value={i.id}>
                  {language === 'bn' ? i.shortNameBn : i.shortNameEn}
                </option>
              ))}
            </select>
          </div>

          {/* Integration Type */}
          <div>
            <label className="font-bold text-slate-700 block mb-1">
              {language === 'bn' ? 'ইন্টিগ্রেশন টাইপ:' : 'Integration Mode:'}
            </label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full p-2 rounded-lg border border-slate-300 text-slate-900 font-medium"
            >
              <option value="all">{language === 'bn' ? 'সকল টাইপ' : 'All Modes'}</option>
              <option value="TYPE_1_EXTERNAL_LINK">Type 1: External Link</option>
              <option value="TYPE_2_INFO_INTEGRATION">Type 2: Info Integration</option>
              <option value="TYPE_3_TRANSACTIONAL_API">Type 3: Transactional API</option>
              <option value="TYPE_4_DEMO_OR_PLANNED">Type 4: Planned</option>
            </select>
          </div>

          {/* Availability */}
          <div>
            <label className="font-bold text-slate-700 block mb-1">
              {language === 'bn' ? 'সার্ভার স্থিতি:' : 'Availability:'}
            </label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full p-2 rounded-lg border border-slate-300 text-slate-900 font-medium"
            >
              <option value="all">{language === 'bn' ? 'সকল স্থিতি' : 'All Statuses'}</option>
              <option value="SERVICE_PAGE_VERIFIED">SERVICE_PAGE_VERIFIED</option>
              <option value="WEBSITE_REACHABLE">WEBSITE_REACHABLE</option>
              <option value="OFFICIAL_URL_VERIFIED">OFFICIAL_URL_VERIFIED</option>
              <option value="TEMPORARILY_UNAVAILABLE">TEMPORARILY_UNAVAILABLE</option>
            </select>
          </div>

          {/* Sorting */}
          <div>
            <label className="font-bold text-slate-700 block mb-1">
              {language === 'bn' ? 'সাজান (Sort):' : 'Sort by:'}
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full p-2 rounded-lg border border-slate-300 text-slate-900 font-medium"
            >
              <option value="default">{language === 'bn' ? 'ডিফল্ট প্রাসঙ্গিকতা' : 'Relevance'}</option>
              <option value="name">{language === 'bn' ? 'নাম অনুযায়ী (A-Z)' : 'Name (A-Z)'}</option>
              <option value="date">{language === 'bn' ? 'সর্বশেষ যাচাইকৃত' : 'Recently Verified'}</option>
              <option value="fee">{language === 'bn' ? 'সরকারি ফি (কম থেকে বেশি)' : 'Official Fee'}</option>
            </select>
          </div>
        </div>

        {/* Clear Filter Tag */}
        {(query || selectedCategory !== 'all' || selectedInstitution !== 'all' || selectedType !== 'all' || selectedStatus !== 'all') && (
          <div className="pt-2 flex items-center justify-between border-t border-slate-100">
            <span className="text-slate-500">
              {language === 'bn' ? 'ফিল্টার প্রয়োগ করা হয়েছে' : 'Filters applied'}
            </span>
            <button
              type="button"
              onClick={clearAllFilters}
              className="text-[#006a4e] hover:underline font-bold"
            >
              {language === 'bn' ? 'সকল ফিল্টার রিসেট করুন' : 'Reset all filters'}
            </button>
          </div>
        )}
      </div>

      {/* Services Output */}
      {filteredServices.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-2xl border border-slate-200">
          <FileText className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-slate-800 mb-1">{t('noResultsTitle')}</h3>
          <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto mb-4">
            {t('noResultsSubtitle')}
          </p>
          <button
            type="button"
            onClick={clearAllFilters}
            className="px-4 py-2 rounded-lg bg-[#006a4e] text-white text-xs font-semibold cursor-pointer"
          >
            {language === 'bn' ? 'সকল সেবা প্রদর্শন করুন' : 'Show All Services'}
          </button>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredServices.map((service) => {
            const isSaved = savedServiceIds.includes(service.id);

            return (
              <div
                key={service.id}
                className="bg-white rounded-xl border border-slate-200 hover:border-emerald-500 hover:shadow-md transition-all p-5 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-700" />
                      <span>{service.availabilityStatus}</span>
                    </span>

                    <button
                      type="button"
                      onClick={() => onToggleSave(service.id)}
                      className="p-1 text-slate-400 hover:text-amber-500"
                      title="Save"
                    >
                      <Bookmark className={`w-4 h-4 ${isSaved ? 'text-amber-500 fill-amber-500' : ''}`} />
                    </button>
                  </div>

                  <h3 className="font-bold text-slate-900 text-base leading-snug mb-1">
                    {language === 'bn' ? service.nameBn : service.nameEn}
                  </h3>

                  <p className="text-xs text-slate-500 font-medium mb-3">
                    {service.verificationSource}
                  </p>

                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed mb-4">
                    {language === 'bn' ? service.shortDescriptionBn : service.shortDescriptionEn}
                  </p>

                  <div className="pt-3 border-t border-slate-100 text-xs text-slate-500 space-y-1">
                    <div className="flex items-center justify-between">
                      <span>{language === 'bn' ? 'সরকারি ফি:' : 'Official Fee:'}</span>
                      <span className="font-bold text-slate-800">
                        {service.officialFeesTotalBdt !== undefined
                          ? service.officialFeesTotalBdt === 0
                            ? language === 'bn'
                              ? 'বিনামূল্যে'
                              : 'Free'
                            : `${toBnNum(service.officialFeesTotalBdt)} ${language === 'bn' ? 'টাকা' : 'BDT'}`
                          : language === 'bn'
                            ? 'বিধি মোতাবেক'
                            : 'As per gazette'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => onSelectService(service)}
                    className="flex-1 py-2 px-3 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <Info className="w-3.5 h-3.5" />
                    <span>{language === 'bn' ? 'বিস্তারিত' : 'Guide'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onLaunchExternal(service)}
                    className="flex-1 py-2 px-3 rounded-lg bg-[#006a4e] hover:bg-emerald-800 text-white text-xs font-semibold flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <span>{language === 'bn' ? 'সেবায় যান' : 'Launch'}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Table View */
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 text-slate-700 font-bold uppercase tracking-wider text-[11px] border-b border-slate-200">
              <tr>
                <th className="p-4">{language === 'bn' ? 'সেবা' : 'Service'}</th>
                <th className="p-4">{language === 'bn' ? 'কর্তৃপক্ষ' : 'Authority'}</th>
                <th className="p-4">{language === 'bn' ? 'সরকারি ফি' : 'Fee'}</th>
                <th className="p-4">{language === 'bn' ? 'স্থিতি' : 'Status'}</th>
                <th className="p-4 text-right">{language === 'bn' ? 'কার্যক্রম' : 'Action'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredServices.map((service) => (
                <tr key={service.id} className="hover:bg-slate-50">
                  <td className="p-4">
                    <button
                      type="button"
                      onClick={() => onSelectService(service)}
                      className="font-bold text-slate-900 text-sm hover:text-[#006a4e] text-left cursor-pointer"
                    >
                      {language === 'bn' ? service.nameBn : service.nameEn}
                    </button>
                    <div className="text-slate-500 text-xs mt-0.5 line-clamp-1">
                      {language === 'bn' ? service.shortDescriptionBn : service.shortDescriptionEn}
                    </div>
                  </td>

                  <td className="p-4 text-slate-600 font-medium">
                    {service.verificationSource}
                  </td>

                  <td className="p-4 font-bold text-slate-800">
                    {service.officialFeesTotalBdt !== undefined
                      ? service.officialFeesTotalBdt === 0
                        ? language === 'bn'
                          ? 'বিনামূল্যে'
                          : 'Free'
                        : `${toBnNum(service.officialFeesTotalBdt)} ${language === 'bn' ? 'টাকা' : 'BDT'}`
                      : '—'}
                  </td>

                  <td className="p-4">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                      {service.availabilityStatus}
                    </span>
                  </td>

                  <td className="p-4 text-right">
                    <button
                      type="button"
                      onClick={() => onLaunchExternal(service)}
                      className="px-3 py-1.5 rounded-lg bg-[#006a4e] hover:bg-emerald-800 text-white font-semibold text-xs inline-flex items-center gap-1 cursor-pointer"
                    >
                      <span>{language === 'bn' ? 'যান' : 'Go'}</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
