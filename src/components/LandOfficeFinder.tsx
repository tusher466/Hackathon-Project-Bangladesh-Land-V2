/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Bangladesh Integrated Land Services Portal (BILSP)
 * Land Office Locator & 16122 Emergency Helpline Hub
 */

import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { LandOffice } from '../types/bilsp';
import { SAMPLE_LAND_OFFICES } from '../data/registryData';
import {
  MapPin,
  Building,
  Phone,
  Mail,
  Search,
  PhoneCall,
  Clock,
  ShieldCheck,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';

export const LandOfficeFinder: React.FC = () => {
  const { language, t } = useLanguage();
  const [selectedDivision, setSelectedDivision] = useState<string>('all');
  const [searchDistrict, setSearchDistrict] = useState<string>('');
  const [selectedType, setSelectedType] = useState<string>('all');

  const divisions = [
    { bn: 'ঢাকা', en: 'Dhaka' },
    { bn: 'চট্টগ্রাম', en: 'Chattogram' },
    { bn: 'রাজশাহী', en: 'Rajshahi' },
    { bn: 'খুলনা', en: 'Khulna' },
    { bn: 'সিলেট', en: 'Sylhet' },
    { bn: 'বরিশাল', en: 'Barishal' },
    { bn: 'রংপুর', en: 'Rangpur' },
    { bn: 'ময়মনসিংহ', en: 'Mymensingh' },
  ];

  const filteredOffices = SAMPLE_LAND_OFFICES.filter((office) => {
    if (selectedDivision !== 'all') {
      const matchDiv =
        office.divisionEn.toLowerCase() === selectedDivision.toLowerCase() ||
        office.divisionBn === selectedDivision;
      if (!matchDiv) return false;
    }

    if (selectedType !== 'all') {
      if (office.officeType !== selectedType) return false;
    }

    if (searchDistrict.trim()) {
      const q = searchDistrict.toLowerCase().trim();
      const matchDist =
        office.districtBn.toLowerCase().includes(q) ||
        office.districtEn.toLowerCase().includes(q) ||
        office.upazilaBn.toLowerCase().includes(q) ||
        office.upazilaEn.toLowerCase().includes(q) ||
        office.nameBn.toLowerCase().includes(q) ||
        office.nameEn.toLowerCase().includes(q);
      if (!matchDist) return false;
    }

    return true;
  });

  const getOfficeTypeLabel = (type: string) => {
    switch (type) {
      case 'AC_LAND':
        return {
          bn: 'সহকারী কমিশনার (ভূমি) কার্যালয়',
          en: 'Assistant Commissioner (Land) Office',
          color: 'bg-emerald-100 text-emerald-800'
        };
      case 'DC_OFFICE_REVENUE':
        return {
          bn: 'জেলা প্রশাসক রাজস্ব ও এলএ শাখা',
          en: 'DC Office Revenue & LA Branch',
          color: 'bg-blue-100 text-blue-800'
        };
      case 'SUB_REGISTRY':
        return {
          bn: 'সাব-রেজিস্ট্রি কার্যালয়',
          en: 'Sub-Registry Office',
          color: 'bg-amber-100 text-amber-800'
        };
      default:
        return {
          bn: 'ইউনিয়ন ভূমি অফিস',
          en: 'Union Land Office (Tahsil)',
          color: 'bg-purple-100 text-purple-800'
        };
    }
  };

  return (
    <div className="py-10 px-4 sm:px-6 max-w-7xl mx-auto space-y-10">
      {/* Page Heading */}
      <div className="border-b border-slate-200 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#006a4e] uppercase tracking-wider mb-1">
            <MapPin className="w-4 h-4 text-emerald-700" />
            <span>{language === 'bn' ? 'মাঠ প্রশাসন ডিরেক্টরি' : 'Field Land Administration'}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            {language === 'bn' ? 'সংশ্লিষ্ট ভূমি অফিস অনুসন্ধান' : 'Find Your Responsible Land Office'}
          </h1>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            {language === 'bn'
              ? 'আপনার উপজেলা সহকারী কমিশনার (ভূমি) অফিস, জেলা রাজস্ব শাখা ও সাব-রেজিস্ট্রি অফিসের অবস্থান ও ফোন নম্বর জানুন।'
              : 'Directory of AC Land offices, DC Revenue branches, and Sub-Registries across Bangladesh.'}
          </p>
        </div>

        {/* 16122 Call Badge */}
        <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#006a4e] text-white flex items-center justify-center shrink-0">
            <PhoneCall className="w-5 h-5 text-amber-300" />
          </div>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-900 block">
              {language === 'bn' ? 'অফিসের অবস্থান জানতে পারছেন না?' : 'Unsure which office?'}
            </span>
            <a
              href="tel:16122"
              className="text-base font-bold text-[#006a4e] hover:underline"
            >
              {language === 'bn' ? '১৬১২২ নম্বরে কল করুন' : 'Dial Helpline 16122'}
            </a>
          </div>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
        <div>
          <label className="font-bold text-slate-700 block mb-1">
            {language === 'bn' ? 'বিভাগ নির্বাচন করুন:' : 'Select Division:'}
          </label>
          <select
            value={selectedDivision}
            onChange={(e) => setSelectedDivision(e.target.value)}
            className="w-full p-2.5 rounded-lg border border-slate-300 text-slate-900 font-medium focus:ring-2 focus:ring-emerald-500"
          >
            <option value="all">{language === 'bn' ? 'সকল বিভাগ' : 'All Divisions'}</option>
            {divisions.map((d, i) => (
              <option key={i} value={d.en}>
                {language === 'bn' ? d.bn : d.en}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="font-bold text-slate-700 block mb-1">
            {language === 'bn' ? 'অফিসের ধরন:' : 'Office Type:'}
          </label>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="w-full p-2.5 rounded-lg border border-slate-300 text-slate-900 font-medium focus:ring-2 focus:ring-emerald-500"
          >
            <option value="all">{language === 'bn' ? 'সকল ধরন' : 'All Office Types'}</option>
            <option value="AC_LAND">
              {language === 'bn' ? 'সহকারী কমিশনার (ভূমি) অফিস' : 'AC Land Office'}
            </option>
            <option value="DC_OFFICE_REVENUE">
              {language === 'bn' ? 'জেলা প্রশাসক কার্যালয় (রাজস্ব/এলএ)' : 'DC Office (Revenue/LA)'}
            </option>
            <option value="SUB_REGISTRY">
              {language === 'bn' ? 'সাব-রেজিস্ট্রি অফিস' : 'Sub-Registry Office'}
            </option>
          </select>
        </div>

        <div>
          <label className="font-bold text-slate-700 block mb-1">
            {language === 'bn' ? 'জেলা বা উপজেলার নাম লিখুন:' : 'Search District / Upazila:'}
          </label>
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={searchDistrict}
              onChange={(e) => setSearchDistrict(e.target.value)}
              placeholder={language === 'bn' ? 'যেমন: রমনা, মিরপুর, পাঁচলাইশ...' : 'e.g. Ramna, Boalia...'}
              className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-slate-300 text-slate-900 font-medium focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>
      </div>

      {/* Results Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            {language === 'bn'
              ? `${filteredOffices.length} টি সরকারি অফিস তালিকাভুক্ত`
              : `${filteredOffices.length} land offices listed`}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredOffices.map((office) => {
            const typeInfo = getOfficeTypeLabel(office.officeType);

            return (
              <div
                key={office.id}
                className="bg-white rounded-xl border border-slate-200 p-5 flex flex-col justify-between hover:border-emerald-500 transition-colors shadow-xs"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${typeInfo.color}`}>
                      {language === 'bn' ? typeInfo.bn : typeInfo.en}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">
                      {language === 'bn' ? office.divisionBn : office.divisionEn}
                    </span>
                  </div>

                  <h3 className="font-bold text-slate-900 text-base mb-2 leading-snug">
                    {language === 'bn' ? office.nameBn : office.nameEn}
                  </h3>

                  <div className="space-y-2 text-xs text-slate-600 mb-4">
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                      <span>{language === 'bn' ? office.addressBn : office.addressEn}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                      <span className="font-mono">{office.email}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                      <span className="font-mono">{office.phone}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <a
                    href={`tel:${office.phone}`}
                    className="text-xs font-semibold text-[#006a4e] hover:underline flex items-center gap-1"
                  >
                    <PhoneCall className="w-3.5 h-3.5" />
                    <span>{language === 'bn' ? 'সরাসরি কল' : 'Call Office'}</span>
                  </a>

                  <a
                    href="https://minland.gov.bd/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-medium text-slate-500 hover:text-slate-800 flex items-center gap-1"
                  >
                    <span>{language === 'bn' ? 'মন্ত্রণালয় ডিরেক্টরি' : 'Gov Directory'}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
