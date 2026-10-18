/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Bangladesh Integrated Land Services Portal (BILSP)
 * Institution Browser Component
 */

import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { GovernmentInstitution, LandService } from '../types/bilsp';
import {
  Building2,
  ExternalLink,
  MapPin,
  Mail,
  Phone,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Globe
} from 'lucide-react';

interface InstitutionBrowserProps {
  institutions: GovernmentInstitution[];
  services: LandService[];
  onSelectService: (service: LandService) => void;
  onLaunchExternal: (service: LandService) => void;
}

export const InstitutionBrowser: React.FC<InstitutionBrowserProps> = ({
  institutions,
  services,
  onSelectService,
  onLaunchExternal,
}) => {
  const { language, t } = useLanguage();
  const [selectedInstId, setSelectedInstId] = useState<string>(institutions[0]?.id || '');

  const currentInst = institutions.find((i) => i.id === selectedInstId) || institutions[0];
  const instServices = services.filter((s) => s.institutionId === currentInst?.id);

  return (
    <section className="py-12 px-4 sm:px-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center gap-2 text-xs font-bold text-[#006a4e] uppercase tracking-wider mb-1">
          <span className="w-2 h-2 rounded-full bg-[#006a4e]" />
          <span>{language === 'bn' ? 'সরকারি দপ্তর কাঠামো' : 'Institutional Directory'}</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          {language === 'bn' ? 'দপ্তর ও সংস্থাসমূহ' : 'Browse by Government Institution'}
        </h2>
        <p className="text-sm sm:text-base text-slate-600 mt-1 max-w-2xl">
          {language === 'bn'
            ? 'ভূমি মন্ত্রণালয় এবং এর অধীনস্থ অধিদপ্তর, বোর্ড ও সংশ্লিষ্ট প্রতিষ্ঠানের সেবা আলাদাভাবে দেখুন'
            : 'Explore services managed by the Ministry of Land and its subordinate directorates and boards'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Institution Selector */}
        <div className="lg:col-span-4 space-y-2">
          {institutions.map((inst) => {
            const isSelected = inst.id === currentInst.id;
            const count = services.filter((s) => s.institutionId === inst.id).length;

            return (
              <button
                key={inst.id}
                type="button"
                onClick={() => setSelectedInstId(inst.id)}
                className={`w-full text-left p-4 rounded-xl border transition-all flex items-center justify-between cursor-pointer ${
                  isSelected
                    ? 'bg-[#006a4e] text-white border-[#006a4e] shadow-md'
                    : 'bg-white text-slate-800 border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Building2
                    className={`w-5 h-5 shrink-0 ${isSelected ? 'text-amber-300' : 'text-slate-400'}`}
                  />
                  <div>
                    <h4 className="text-sm sm:text-base font-bold leading-snug">
                      {language === 'bn' ? inst.nameBn : inst.nameEn}
                    </h4>
                    <span
                      className={`text-xs block mt-0.5 ${
                        isSelected ? 'text-emerald-100' : 'text-slate-500'
                      }`}
                    >
                      {language === 'bn' ? inst.shortNameBn : inst.shortNameEn}
                    </span>
                  </div>
                </div>

                <span
                  className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                    isSelected ? 'bg-emerald-950/40 text-emerald-200' : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {count} {language === 'bn' ? 'সেবা' : 'services'}
                </span>
              </button>
            );
          })}
        </div>

        {/* Right: Institution Details & Services List */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
          {currentInst && (
            <div>
              {/* Institution Title & Meta */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between pb-6 border-b border-slate-200 gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                      <span>{language === 'bn' ? 'যাচাইকৃত প্রতিষ্ঠান' : 'Verified Institution'}</span>
                    </span>
                    <span className="text-xs text-slate-400 font-mono">
                      {currentInst.code}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                    {language === 'bn' ? currentInst.nameBn : currentInst.nameEn}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-500 mt-0.5 font-medium">
                    {language === 'bn' ? currentInst.parentMinistryBn : currentInst.parentMinistryEn}
                  </p>
                </div>

                <a
                  href={currentInst.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold self-start transition-colors"
                >
                  <Globe className="w-3.5 h-3.5 text-emerald-700" />
                  <span>{language === 'bn' ? 'অফিসিয়াল ওয়েবসাইট' : 'Official Portal'}</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </div>

              {/* Description */}
              <p className="text-sm text-slate-700 my-4 leading-relaxed">
                {language === 'bn' ? currentInst.descriptionBn : currentInst.descriptionEn}
              </p>

              {/* Contacts Row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 bg-slate-50 rounded-xl border border-slate-100 text-xs mb-6 text-slate-600">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-[#006a4e] shrink-0 mt-0.5" />
                  <span>{language === 'bn' ? currentInst.addressBn : currentInst.addressEn}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#006a4e] shrink-0" />
                  <span className="font-mono">{currentInst.contactEmail}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#006a4e] shrink-0" />
                  <span>
                    {language === 'bn' ? 'হেল্পলাইন:' : 'Helpline:'}{' '}
                    <strong className="text-slate-900">{currentInst.helplinePhone}</strong>
                  </span>
                </div>
              </div>

              {/* Institution's Digital Services List */}
              <h4 className="text-sm font-bold uppercase tracking-wider text-slate-800 mb-3 flex items-center justify-between">
                <span>{language === 'bn' ? 'প্রদত্ত ডিজিটাল সেবাসমূহ' : 'Available Digital Services'}</span>
                <span className="text-xs font-normal text-slate-500">
                  {instServices.length} {language === 'bn' ? 'টি সেবা' : 'services'}
                </span>
              </h4>

              {instServices.length === 0 ? (
                <div className="p-6 text-center text-sm text-slate-500 bg-slate-50 rounded-xl">
                  {language === 'bn'
                    ? 'এই প্রতিষ্ঠানের অধীন কোনো নাগরিক অনলাইন সেবা নিবন্ধিত নেই।'
                    : 'No public digital services registered under this institution.'}
                </div>
              ) : (
                <div className="space-y-3">
                  {instServices.map((service) => (
                    <div
                      key={service.id}
                      className="p-4 rounded-xl border border-slate-200 hover:border-emerald-500 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <h5 className="text-sm sm:text-base font-bold text-slate-900">
                            {language === 'bn' ? service.nameBn : service.nameEn}
                          </h5>
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                            {language === 'bn' ? 'সচল' : 'Active'}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 line-clamp-1 mt-1">
                          {language === 'bn'
                            ? service.shortDescriptionBn
                            : service.shortDescriptionEn}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          type="button"
                          onClick={() => onSelectService(service)}
                          className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold cursor-pointer"
                        >
                          {language === 'bn' ? 'বিস্তারিত' : 'Details'}
                        </button>
                        <button
                          type="button"
                          onClick={() => onLaunchExternal(service)}
                          className="px-3 py-1.5 rounded-lg bg-[#006a4e] hover:bg-emerald-800 text-white text-xs font-semibold flex items-center gap-1 cursor-pointer"
                        >
                          <span>{language === 'bn' ? 'সেবা খুলুন' : 'Open Portal'}</span>
                          <ExternalLink className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
