/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Bangladesh Integrated Land Services Portal (BILSP)
 * Workspace 3: Deed Registration Admin (Department of Registration, Ministry of Law)
 * Fully interactive registered deeds archive, new deed entry, certified copy inspector & AC Land linkage
 */

import React, { useState } from 'react';
import { useLanguage } from '../../../context/LanguageContext';
import { useAuth } from '../../../context/AuthContext';
import { AdminLayout } from '../AdminLayout';
import { DEMO_DEED_RECORDS } from '../../../data/adminDemoData';
import { DeedRecord } from '../../../types/authAndGeo';
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
  FileText,
  Plus,
  X,
  Download,
  Eye,
  Send,
  Building2,
  Printer
} from 'lucide-react';

interface DeedRegistrationWorkspaceProps {
  onExitToPortal: () => void;
}

export const DeedRegistrationWorkspace: React.FC<DeedRegistrationWorkspaceProps> = ({ onExitToPortal }) => {
  const { language, toBnNum } = useLanguage();
  const { currentUser, hasPermission } = useAuth();

  const [currentModule, setCurrentModule] = useState<'deeds_registry' | 'sub_registries' | 'parcel_linkage'>('deeds_registry');
  const [deedsList, setDeedsList] = useState<DeedRecord[]>(DEMO_DEED_RECORDS);
  const [searchDeedNo, setSearchDeedNo] = useState('');
  const [selectedDeedType, setSelectedDeedType] = useState('all');

  // Modals & Inspection State
  const [selectedDeedForInspection, setSelectedDeedForInspection] = useState<DeedRecord | null>(null);
  const [newDeedModalOpen, setNewDeedModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // New Deed Form State
  const [newDeedForm, setNewDeedForm] = useState({
    deedNo: `${Math.floor(1000 + Math.random() * 9000)}/2026`,
    deedTypeBn: 'সাফ-কবলা',
    subRegistryOfficeBn: 'রমনা সাব-রেজিস্ট্রি অফিস',
    executantNameBn: 'মোঃ রফিকুল ইসলাম',
    claimantNameBn: 'আবুল কালাম আজাদ',
    deedValueBdt: 1200000,
    stampDutyBdt: 96000,
    mouzaNameBn: 'সেগুনবাগিচা',
    dagNo: '১২০৪',
    khatianNo: '৩১৮'
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

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
      badge: `${deedsList.filter((d) => d.isLinkedToACLand).length} সংযুক্ত`
    }
  ];

  const filteredDeeds = deedsList.filter((d) => {
    if (selectedDeedType !== 'all' && !d.deedTypeBn.includes(selectedDeedType)) return false;
    if (searchDeedNo.trim()) {
      const q = searchDeedNo.toLowerCase();
      const match =
        d.deedNo.toLowerCase().includes(q) ||
        d.claimantNameBn.toLowerCase().includes(q) ||
        d.executantNameBn.toLowerCase().includes(q) ||
        d.dagNo.includes(q) ||
        d.subRegistryOfficeBn.toLowerCase().includes(q);
      if (!match) return false;
    }
    return true;
  });

  // Action: Link Deed to AC Land
  const handleToggleACLandLinkage = (deedId: string) => {
    setDeedsList((prev) =>
      prev.map((d) => {
        if (d.id === deedId) {
          const newStatus = !d.isLinkedToACLand;
          return { ...d, isLinkedToACLand: newStatus };
        }
        return d;
      })
    );
    showToast(
      language === 'bn'
        ? 'দলিলের রেফারেন্স সংশ্লিষ্ট উপজেলা এসিল্যান্ড অফিসে স্বয়ংক্রিয়ভাবে প্রেরিত হয়েছে!'
        : 'Automated notice dispatched to AC Land office!'
    );
    if (selectedDeedForInspection) {
      setSelectedDeedForInspection((prev) => (prev ? { ...prev, isLinkedToACLand: !prev.isLinkedToACLand } : null));
    }
  };

  // Action: Register New Deed
  const handleCreateNewDeed = (e: React.FormEvent) => {
    e.preventDefault();
    const newRecord: DeedRecord = {
      id: `deed-${Date.now()}`,
      deedNo: newDeedForm.deedNo,
      deedTypeBn: newDeedForm.deedTypeBn,
      subRegistryOfficeBn: newDeedForm.subRegistryOfficeBn,
      registrationDate: new Date().toISOString().split('T')[0],
      executantNameBn: newDeedForm.executantNameBn,
      claimantNameBn: newDeedForm.claimantNameBn,
      deedValueBdt: Number(newDeedForm.deedValueBdt) || 1000000,
      stampDutyBdt: Number(newDeedForm.stampDutyBdt) || 80000,
      districtId: 'dist-dhaka',
      upazilaId: 'upz-ramna',
      mouzaNameBn: newDeedForm.mouzaNameBn,
      dagNo: newDeedForm.dagNo,
      khatianNo: newDeedForm.khatianNo,
      isLinkedToACLand: true
    };

    setDeedsList((prev) => [newRecord, ...prev]);
    setNewDeedModalOpen(false);
    showToast(language === 'bn' ? `নতুন দলিল নং ${newRecord.deedNo} সফলভাবে রেজিস্ট্রি ও সংরক্ষিত হয়েছে!` : 'New deed successfully registered!');
  };

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
        {/* Toast Alert */}
        {toastMessage && (
          <div className="p-4 rounded-2xl bg-indigo-800 text-white shadow-lg flex items-center justify-between text-xs font-bold animate-in fade-in">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-indigo-200 shrink-0" />
              <span>{toastMessage}</span>
            </div>
            <button
              type="button"
              onClick={() => setToastMessage(null)}
              className="text-indigo-200 hover:text-white"
            >
              ✕
            </button>
          </div>
        )}

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
                ? 'সাফ-কবলা, হেবা, দান ও বণ্টন দলিলের সংবিধিবদ্ধ রেকর্ড, স্ট্যাম্প শুল্ক নিরীক্ষা এবং এসিল্যান্ড অফিসের সাথে সমন্বয়।'
                : 'Statutory registry of deeds, stamp duties, registration fees, and cadastral parcel associations.'}
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            {currentModule === 'deeds_registry' && (
              <button
                type="button"
                onClick={() => setNewDeedModalOpen(true)}
                className="px-3.5 py-1.5 rounded-xl bg-indigo-700 hover:bg-indigo-800 text-white font-bold text-xs shadow-xs transition-all cursor-pointer flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>{language === 'bn' ? 'নতুন দলিল রেজিস্ট্রি' : 'Register New Deed'}</span>
              </button>
            )}
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

              <div className="flex flex-wrap items-center gap-2 text-xs">
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

                <button
                  type="button"
                  onClick={() => setNewDeedModalOpen(true)}
                  className="px-3 py-2 rounded-xl bg-indigo-700 hover:bg-indigo-800 text-white font-bold cursor-pointer flex items-center gap-1.5 shadow-xs"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>নতুন দলিল অন্তর্ভুক্তি</span>
                </button>
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
                    <th className="p-3.5">{language === 'bn' ? 'ভূমি লিংকেজ' : 'Parcel Link'}</th>
                    <th className="p-3.5 text-right">{language === 'bn' ? 'কার্যক্রম' : 'Action'}</th>
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
                      <td className="p-3.5">
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
                      <td className="p-3.5 text-right">
                        <button
                          type="button"
                          onClick={() => setSelectedDeedForInspection(d)}
                          className="px-2.5 py-1.5 rounded-lg border border-slate-300 hover:bg-slate-100 text-slate-800 font-bold cursor-pointer text-xs flex items-center gap-1 ml-auto"
                        >
                          <Eye className="w-3.5 h-3.5 text-indigo-700" />
                          <span>{language === 'bn' ? 'নথি নিরীক্ষা' : 'Audit'}</span>
                        </button>
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
                <div className="text-[11px] font-mono text-slate-400">হেল্পডেস্ক: 02-9556781</div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="font-bold text-slate-900 text-sm">মিরপুর সাব-রেজিস্ট্রি অফিস</div>
                <div className="text-slate-500">জেলা: ঢাকা | ভলিউম রেকর্ড: ২,১০০টি</div>
                <div className="text-emerald-700 font-semibold">কার্যরত সাব-রেজিস্ট্রার: কাজী জহিরুল হক</div>
                <div className="text-[11px] font-mono text-slate-400">হেল্পডেস্ক: 02-9014523</div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="font-bold text-slate-900 text-sm">পাঁচলাইশ সাব-রেজিস্ট্রি অফিস</div>
                <div className="text-slate-500">জেলা: চট্টগ্রাম | ভলিউম রেকর্ড: ১,৮৫০টি</div>
                <div className="text-emerald-700 font-semibold">কার্যরত সাব-রেজিস্ট্রার: কামরুল হাসান</div>
                <div className="text-[11px] font-mono text-slate-400">হেল্পডেস্ক: 031-654890</div>
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

            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                দলিল ও এসিল্যান্ড মিউটেশন লিংকেজ স্ট্যাটাস:
              </h4>

              <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden text-xs">
                {deedsList.map((d) => (
                  <div key={d.id} className="p-3.5 flex flex-wrap items-center justify-between gap-3 bg-white hover:bg-slate-50">
                    <div>
                      <div className="font-bold text-slate-900">
                        দলিল #{d.deedNo} ({d.deedTypeBn}) • মৌজা: {d.mouzaNameBn}, দাগ #{d.dagNo}
                      </div>
                      <div className="text-[11px] text-slate-500">
                        গ্রহীতা: {d.claimantNameBn} | সাব-রেজিস্ট্রি: {d.subRegistryOfficeBn}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={`px-2.5 py-1 rounded-full font-bold text-[10px] ${
                        d.isLinkedToACLand ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {d.isLinkedToACLand ? '✓ এসিল্যান্ডে তথ্য প্রেরিত' : 'অপেক্ষমাণ'}
                      </span>

                      <button
                        type="button"
                        onClick={() => handleToggleACLandLinkage(d.id)}
                        className="px-3 py-1 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 font-bold cursor-pointer text-xs"
                      >
                        {d.isLinkedToACLand ? 'পুনরায় নোটিশ পাঠান' : 'লিংকেজ সম্পন্ন করুন'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* MODAL 1: INSPECT DEED DOSSIER                            */}
        {/* ========================================================= */}
        {selectedDeedForInspection && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
            <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-lg w-full p-6 text-xs space-y-4 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div>
                  <h3 className="font-bold text-slate-900 text-base">
                    দলিল বিবরণী: #{selectedDeedForInspection.deedNo}
                  </h3>
                  <span className="text-slate-500 text-[11px]">
                    {selectedDeedForInspection.deedTypeBn} • {selectedDeedForInspection.subRegistryOfficeBn}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedDeedForInspection(null)}
                  className="text-slate-400 hover:text-slate-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase font-bold">দাতা (হস্তান্তরকারী):</span>
                    <strong className="text-slate-900">{selectedDeedForInspection.executantNameBn}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase font-bold">গ্রহীতা (ক্রেতা):</span>
                    <strong className="text-slate-900">{selectedDeedForInspection.claimantNameBn}</strong>
                  </div>
                </div>

                <div className="border-t border-slate-200 pt-2 grid grid-cols-2 gap-2">
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase font-bold">দলিল মূল্য:</span>
                    <strong className="text-slate-900 font-mono">৳ {toBnNum(selectedDeedForInspection.deedValueBdt.toLocaleString())}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase font-bold">স্ট্যাম্প শুল্ক ও রাজস্ব ফি:</span>
                    <strong className="text-emerald-700 font-mono">৳ {toBnNum(selectedDeedForInspection.stampDutyBdt.toLocaleString())}</strong>
                  </div>
                </div>

                <div className="border-t border-slate-200 pt-2">
                  <span className="text-slate-500 block text-[10px] uppercase font-bold">তফসিল ও চৌহদ্দি:</span>
                  <div className="font-medium text-slate-800">
                    মৌজা {selectedDeedForInspection.mouzaNameBn}, খতিয়ান #{selectedDeedForInspection.khatianNo}, দাগ #{selectedDeedForInspection.dagNo}।
                    উত্তর: রাস্তা, দক্ষিণ: সরকারি খাল, পূর্ব: রহিম মিয়া, পশ্চিম: নিজ।
                  </div>
                </div>
              </div>

              {/* Inter-ministry AC Land Linkage Status */}
              <div className="p-3.5 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-950 flex items-center justify-between">
                <div>
                  <div className="font-bold flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-indigo-700" />
                    <span>ভূমি মন্ত্রণালয় (এসিল্যান্ড) স্বয়ংক্রিয় নোটিশ</span>
                  </div>
                  <p className="text-[11px] text-indigo-800 mt-0.5">
                    {selectedDeedForInspection.isLinkedToACLand
                      ? 'রেজিস্ট্রেশনের সাথে সাথে এসিল্যান্ড অফিসে নামজারি রেফারেন্স প্রেরিত হয়েছে।'
                      : 'এসিল্যান্ড অফিসে স্বয়ংক্রিয় রেফারেন্স এখনও পাঠানো হয়নি।'}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => handleToggleACLandLinkage(selectedDeedForInspection.id)}
                  className="px-3 py-1.5 rounded-lg bg-indigo-700 hover:bg-indigo-800 text-white font-bold cursor-pointer text-xs shrink-0"
                >
                  {selectedDeedForInspection.isLinkedToACLand ? 'নোটিশ পুনর্প্রেরণ' : 'নোটিশ পাঠান'}
                </button>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    showToast('দলিলের সার্টিফাইড ডিজিটাল নকল ডাউনলোড শুরু হয়েছে!');
                    setSelectedDeedForInspection(null);
                  }}
                  className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-black text-white font-bold flex items-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>সার্টিফাইড কপি ডাউনলোড</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* MODAL 2: REGISTER NEW DEED                               */}
        {/* ========================================================= */}
        {newDeedModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
            <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-md w-full p-6 text-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="font-bold text-slate-900 text-base">
                  নতুন রেজিস্ট্রিকৃত দলিল অন্তর্ভুক্তি
                </h3>
                <button
                  type="button"
                  onClick={() => setNewDeedModalOpen(false)}
                  className="text-slate-400 hover:text-slate-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreateNewDeed} className="space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">দলিল নম্বর:</label>
                    <input
                      type="text"
                      required
                      value={newDeedForm.deedNo}
                      onChange={(e) => setNewDeedForm({ ...newDeedForm, deedNo: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-slate-300 font-mono"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">দলিলের শ্রেণি:</label>
                    <select
                      value={newDeedForm.deedTypeBn}
                      onChange={(e) => setNewDeedForm({ ...newDeedForm, deedTypeBn: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-slate-300 font-medium"
                    >
                      <option value="সাফ-কবলা">সাফ-কবলা</option>
                      <option value="হেবা">হেবা (দানপত্র)</option>
                      <option value="বণ্টননামা">বণ্টননামা</option>
                      <option value="ওয়াকফনামা">ওয়াকফনামা</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">দাতা (বিক্রেতা):</label>
                    <input
                      type="text"
                      required
                      value={newDeedForm.executantNameBn}
                      onChange={(e) => setNewDeedForm({ ...newDeedForm, executantNameBn: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-slate-300 font-medium"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">গ্রহীতা (ক্রেতা):</label>
                    <input
                      type="text"
                      required
                      value={newDeedForm.claimantNameBn}
                      onChange={(e) => setNewDeedForm({ ...newDeedForm, claimantNameBn: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-slate-300 font-medium"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">দলিল মূল্য (টাকা):</label>
                    <input
                      type="number"
                      required
                      value={newDeedForm.deedValueBdt}
                      onChange={(e) => setNewDeedForm({ ...newDeedForm, deedValueBdt: Number(e.target.value) })}
                      className="w-full p-2.5 rounded-xl border border-slate-300 font-mono"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">স্ট্যাম্প শুল্ক (টাকা):</label>
                    <input
                      type="number"
                      required
                      value={newDeedForm.stampDutyBdt}
                      onChange={(e) => setNewDeedForm({ ...newDeedForm, stampDutyBdt: Number(e.target.value) })}
                      className="w-full p-2.5 rounded-xl border border-slate-300 font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">মৌজা:</label>
                    <input
                      type="text"
                      required
                      value={newDeedForm.mouzaNameBn}
                      onChange={(e) => setNewDeedForm({ ...newDeedForm, mouzaNameBn: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-slate-300 font-medium"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">দাগ নং:</label>
                    <input
                      type="text"
                      required
                      value={newDeedForm.dagNo}
                      onChange={(e) => setNewDeedForm({ ...newDeedForm, dagNo: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-slate-300 font-mono"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">খতিয়ান নং:</label>
                    <input
                      type="text"
                      required
                      value={newDeedForm.khatianNo}
                      onChange={(e) => setNewDeedForm({ ...newDeedForm, khatianNo: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-slate-300 font-mono"
                    />
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setNewDeedModalOpen(false)}
                    className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 font-semibold"
                  >
                    বাতিল
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-indigo-700 hover:bg-indigo-800 text-white font-bold shadow-xs cursor-pointer"
                  >
                    দলিল রেজিস্ট্রি ও সংরক্ষণ
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};
