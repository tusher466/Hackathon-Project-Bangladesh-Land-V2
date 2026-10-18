/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Bangladesh Integrated Land Services Portal (BILSP)
 * Workspace 3: Deed Registration Admin (Department of Registration, Ministry of Law)
 */

import React, { useState } from 'react';
import { useLanguage } from '../../../context/LanguageContext';
import { useAuth } from '../../../context/AuthContext';
import { AdminLayout } from '../AdminLayout';
import { DEMO_DEED_RECORDS } from '../../../data/adminDemoData';
import { DISTRICTS } from '../../../data/geoData';
import {
  FileCheck2,
  Search,
  Building,
  ShieldCheck,
  Lock,
  Link,
  Receipt,
  Clock,
  Filter,
  CheckCircle2,
  FileText
} from 'lucide-react';

interface DeedRegistrationWorkspaceProps {
  onExitToPortal: () => void;
}

export const DeedRegistrationWorkspace: React.FC<DeedRegistrationWorkspaceProps> = ({ onExitToPortal }) => {
  const { language, toBnNum } = useLanguage();
  const { currentUser, hasPermission } = useAuth();

  const [currentModule, setCurrentModule] = useState<'deeds_registry' | 'sub_registries' | 'parcel_linkage'>('deeds_registry');
  const [searchDeedNo, setSearchDeedNo] = useState('');
  const [selectedDeedType, setSelectedDeedType] = useState('all');

  const navItems = [
    { id: 'deeds_registry', labelBn: 'রেজিস্ট্রিকৃত দলিল বহর', labelEn: 'Registered Deeds Archive', icon: FileCheck2 },
    {
      id: 'sub_registries',
      labelBn: 'সাব-রেজিস্ট্রি অধিক্ষেত্র',
      labelEn: 'Sub-Registry Jurisdictions',
      icon: Building,
      requiredPermission: 'sub_registry_records'
    },
    {
      id: 'parcel_linkage',
      labelBn: 'দলিল-জমি লিংকেজ ভেরিফিকেশন',
      labelEn: 'Deed-Parcel Linkage Audit',
      icon: Link,
      requiredPermission: 'verify_deed_links',
      badge: 'অডিট'
    }
  ];

  const filteredDeeds = DEMO_DEED_RECORDS.filter((d) => {
    if (selectedDeedType !== 'all' && !d.deedTypeBn.includes(selectedDeedType)) return false;
    if (searchDeedNo.trim()) {
      const q = searchDeedNo.toLowerCase();
      const match =
        d.deedNo.toLowerCase().includes(q) ||
        d.claimantNameBn.toLowerCase().includes(q) ||
        d.executantNameBn.toLowerCase().includes(q) ||
        d.dagNo.includes(q);
      if (!match) return false;
    }
    return true;
  });

  return (
    <AdminLayout
      currentModule={currentModule}
      setCurrentModule={(m) => setCurrentModule(m as any)}
      navItems={navItems}
      workspaceTitleBn="দলিল নিবন্ধন ও সাব-রেজিস্ট্রি প্রশাসন"
      workspaceTitleEn="Deed Registration & Sub-Registry Workspace"
      authorityBn="নিবন্ধন অধিদপ্তর, আইন, বিচার ও সংসদ বিষয়ক মন্ত্রণালয়"
      authorityEn="Department of Registration, Ministry of Law, Justice & Parliamentary Affairs"
      authorityCode="DOLR"
      onExitToPortal={onExitToPortal}
    >
      <div className="space-y-6">
        {/* Workspace Banner */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-800 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-200">
              {language === 'bn' ? 'প্রশাসনিক ক্যাটাগরি ৩ (আইন মন্ত্রণালয়)' : 'Administrative Category 3 (Ministry of Law)'}
            </span>
            <h2 className="text-xl font-bold text-slate-900 mt-1">
              {currentModule === 'deeds_registry' && (language === 'bn' ? 'নিবন্ধিত দলিলের কেন্দ্রীয় রেজিস্টার' : 'Central Registered Deeds Registry')}
              {currentModule === 'sub_registries' && (language === 'bn' ? 'সাব-রেজিস্ট্রি কার্যালয় ও অধিক্ষেত্র তালিকা' : 'Sub-Registry Offices & Jurisdictions')}
              {currentModule === 'parcel_linkage' && (language === 'bn' ? 'দলিলের সাথে ভূমি রেকর্ড (দাগ/খতিয়ান) লিংকেজ' : 'Deed-to-Parcel Linkage Verification')}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              {language === 'bn'
                ? 'সাফ-কবলা, হেবা, দান ও বণ্টন দলিলের সংবিধিবদ্ধ রেকর্ড ও স্ট্যাম্প শুল্ক নিরীক্ষা।'
                : 'Statutory registry of deeds, stamp duties, registration fees, and cadastral parcel associations.'}
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200 self-start sm:self-auto">
            <Lock className="w-4 h-4 text-indigo-600" />
            <span>{language === 'bn' ? 'গোপনীয়তা নিয়ন্ত্রিত ডেমো ডেটা' : 'Restricted Fictional Demo Data'}</span>
          </div>
        </div>

        {/* ========================================================= */}
        {/* MODULE 1: DEEDS ARCHIVE & SEARCH                          */}
        {/* ========================================================= */}
        {currentModule === 'deeds_registry' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
            {/* Filter toolbar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  value={searchDeedNo}
                  onChange={(e) => setSearchDeedNo(e.target.value)}
                  placeholder={language === 'bn' ? 'দলিল নম্বর, ক্রেতা বা বিক্রেতার নাম...' : 'Search deed no, buyer or seller...'}
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-300 font-medium"
                />
              </div>

              <div className="flex items-center gap-2 text-xs">
                <Filter className="w-3.5 h-3.5 text-slate-400" />
                <select
                  value={selectedDeedType}
                  onChange={(e) => setSelectedDeedType(e.target.value)}
                  className="p-2 rounded-xl border border-slate-300 text-slate-800 font-medium"
                >
                  <option value="all">{language === 'bn' ? 'সকল দলিলের ধরন' : 'All Deed Types'}</option>
                  <option value="সাফ-কবলা">সাফ-কবলা (বিক্রয়)</option>
                  <option value="হেবা">হেবা (দানপত্র)</option>
                  <option value="বণ্টননামা">বণ্টননামা</option>
                </select>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-700 uppercase font-bold text-[11px] border-b border-slate-200">
                  <tr>
                    <th className="p-3.5">{language === 'bn' ? 'দলিল নম্বর ও সন' : 'Deed No & Year'}</th>
                    <th className="p-3.5">{language === 'bn' ? 'দলিলের শ্রেণি' : 'Deed Type'}</th>
                    <th className="p-3.5">{language === 'bn' ? 'সাব-রেজিস্ট্রি অফিস' : 'Sub-Registry'}</th>
                    <th className="p-3.5">{language === 'bn' ? 'দাতা ও গ্রহীতা' : 'Parties'}</th>
                    <th className="p-3.5">{language === 'bn' ? 'দলিল মূল্য (টাকা)' : 'Deed Value'}</th>
                    <th className="p-3.5">{language === 'bn' ? 'স্ট্যাম্প ও ফি' : 'Stamp Duty'}</th>
                    <th className="p-3.5 text-right">{language === 'bn' ? 'ভূমি লিংকেজ' : 'Parcel Link'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredDeeds.map((d) => (
                    <tr key={d.id} className="hover:bg-slate-50/70">
                      <td className="p-3.5 font-mono font-bold text-slate-900">{d.deedNo}</td>
                      <td className="p-3.5 font-bold text-indigo-900">{d.deedTypeBn}</td>
                      <td className="p-3.5 text-slate-600">{d.subRegistryOfficeBn}</td>
                      <td className="p-3.5">
                        <div className="font-semibold text-slate-800">গ্রহীতা: {d.claimantNameBn}</div>
                        <div className="text-[11px] text-slate-500">দাতা: {d.executantNameBn}</div>
                      </td>
                      <td className="p-3.5 font-mono font-bold text-slate-800">
                        ৳ {toBnNum(d.deedValueBdt.toLocaleString())}
                      </td>
                      <td className="p-3.5 font-mono text-emerald-800">
                        ৳ {toBnNum(d.stampDutyBdt.toLocaleString())}
                      </td>
                      <td className="p-3.5 text-right">
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full inline-flex items-center gap-1 ${
                            d.isLinkedToACLand
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          <span>{d.isLinkedToACLand ? 'এসিল্যান্ড সংযুক্ত' : 'অপেক্ষমাণ'}</span>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* MODULE 2: SUB-REGISTRY OFFICES DIRECTORY                  */}
        {/* ========================================================= */}
        {currentModule === 'sub_registries' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="font-bold text-slate-900 text-base">
                {language === 'bn' ? 'সাব-রেজিস্ট্রি কার্যালয় অধিক্ষেত্র বিবরণ' : 'Sub-Registry Jurisdiction Directory'}
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                {language === 'bn'
                  ? 'নিবন্ধন অধিদপ্তরের আওতাধীন দেশের সকল সাব-রেজিস্ট্রার কার্যালয়ের তালিকা ও দলিল ভলিউম পরিসংখ্যান।'
                  : 'Directory of Sub-Registry offices under Department of Registration.'}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="font-bold text-slate-900 text-sm">রমনা সাব-রেজিস্ট্রি অফিস</div>
                <div className="text-slate-500">জেলা: ঢাকা | ভলিউম রেকর্ড: ১,৪২০টি</div>
                <div className="text-emerald-700 font-semibold">কার্যরত সাব-রেজিস্ট্রার: তাহমিনা চৌধুরী</div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="font-bold text-slate-900 text-sm">মিরপুর সাব-রেজিস্ট্রি অফিস</div>
                <div className="text-slate-500">জেলা: ঢাকা | ভলিউম রেকর্ড: ২,১০০টি</div>
                <div className="text-emerald-700 font-semibold">কার্যরত সাব-রেজিস্ট্রার: কাজী জহিরুল হক</div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="font-bold text-slate-900 text-sm">পাঁচলাইশ সাব-রেজিস্ট্রি অফিস</div>
                <div className="text-slate-500">জেলা: চট্টগ্রাম | ভলিউম রেকর্ড: ১,৮৫০টি</div>
                <div className="text-emerald-700 font-semibold">কার্যরত সাব-রেজিস্ট্রার: কামরুল হাসান</div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* MODULE 3: DEED-TO-PARCEL LINKAGE AUDIT                    */}
        {/* ========================================================= */}
        {currentModule === 'parcel_linkage' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="font-bold text-slate-900 text-base">
                {language === 'bn' ? 'দলিলের সাথে ভূমির দাগ নম্বর সংযোগ নিরীক্ষা' : 'Deed-to-Parcel Linkage Audit Trail'}
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                {language === 'bn'
                  ? 'আইন মন্ত্রণালয়ের সাব-রেজিস্ট্রি রেকর্ড এবং ভূমি মন্ত্রণালয়ের নামজারি খতিয়ানের আন্তঃসংযোগ সমন্বয়।'
                  : 'Harmonization between registered deeds and Ministry of Land e-mutation records.'}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-950 space-y-2">
              <div className="flex items-center gap-2 font-bold">
                <ShieldCheck className="w-4 h-4 text-emerald-700" />
                <span>আন্তঃমন্ত্রণালয় সমন্বিত লিংকেজ সফল</span>
              </div>
              <p className="leading-relaxed">
                নিবন্ধন অধিদপ্তরের দলিলসমূহ রেজিস্ট্রি হওয়ার সাথে সাথে সংশ্লিষ্ট উপজেলা এসিল্যান্ড অফিসে
                নামজারি নোটিশ হিসেবে স্বয়ংক্রিয়ভাবে রেফারেন্স প্রেরিত হয়। এতে জাল দলিল তৈরির মাধ্যমে জমি দখল বন্ধ হয়েছে।
              </p>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};
