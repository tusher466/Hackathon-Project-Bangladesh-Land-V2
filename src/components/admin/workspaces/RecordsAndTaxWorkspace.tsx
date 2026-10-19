/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Bangladesh Integrated Land Services Portal (BILSP)
 * Workspace 1: Land Records, Mutation & Tax Admin (Ministry of Land)
 * Fully interactive, workable mutation approval, tax ledger & ROR cross-search
 */

import React, { useState } from 'react';
import { useLanguage } from '../../../context/LanguageContext';
import { useAuth } from '../../../context/AuthContext';
import { AdminLayout } from '../AdminLayout';
import {
  DEMO_MUTATION_APPLICATIONS,
  DEMO_TAX_RECORDS
} from '../../../data/adminDemoData';
import { DIVISIONS, DISTRICTS, UPAZILAS, DEMO_PARCELS } from '../../../data/geoData';
import { MutationApplication, LandTaxRecord, DemoParcel } from '../../../types/authAndGeo';
import {
  FileText,
  GitPullRequest,
  Receipt,
  Search,
  MapPin,
  Calendar,
  CheckCircle2,
  Clock,
  AlertCircle,
  Filter,
  Layers,
  ArrowRight,
  TrendingUp,
  Download,
  ShieldCheck,
  Building2,
  Plus,
  X,
  Printer,
  Check,
  FileCheck2,
  Eye,
  AlertTriangle
} from 'lucide-react';

interface RecordsAndTaxWorkspaceProps {
  onExitToPortal: () => void;
}

export const RecordsAndTaxWorkspace: React.FC<RecordsAndTaxWorkspaceProps> = ({ onExitToPortal }) => {
  const { language, toBnNum } = useLanguage();
  const { currentUser, hasPermission } = useAuth();

  const [currentModule, setCurrentModule] = useState<'overview' | 'mutations' | 'taxes' | 'records'>('overview');

  // Interactive Live State
  const [mutationsList, setMutationsList] = useState<MutationApplication[]>(DEMO_MUTATION_APPLICATIONS);
  const [taxList, setTaxList] = useState<LandTaxRecord[]>(DEMO_TAX_RECORDS);

  // Geographic filter state
  const [selectedDivision, setSelectedDivision] = useState<string>('all');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('all');
  const [selectedUpazila, setSelectedUpazila] = useState<string>('all');

  // Mutation filter & Search
  const [mutationStatusFilter, setMutationStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Tax filter & Search
  const [taxStatusFilter, setTaxStatusFilter] = useState<string>('all');
  const [taxSearchQuery, setTaxSearchQuery] = useState('');

  // Record Search Query
  const [recordSearchQuery, setRecordSearchQuery] = useState('');

  // Modals State
  const [auditModalMutation, setAuditModalMutation] = useState<MutationApplication | null>(null);
  const [newMutationModalOpen, setNewMutationModalOpen] = useState(false);
  const [selectedTaxRecordForPay, setSelectedTaxRecordForPay] = useState<LandTaxRecord | null>(null);
  const [dakhilaIssued, setDakhilaIssued] = useState<LandTaxRecord | null>(null);
  const [selectedParcelForAudit, setSelectedParcelForAudit] = useState<DemoParcel | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // New Mutation Form State
  const [newAppForm, setNewAppForm] = useState({
    applicantNameBn: '',
    applicantMobile: '017',
    mouzaNameBn: 'সেগুনবাগিচা',
    dagNo: '১২০৪',
    khatianNo: '৩১৮',
    areaDecimals: '5.5',
    divisionId: 'div-dhaka',
    districtId: 'dist-dhaka',
    upazilaId: 'upz-ramna'
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const navItems = [
    { id: 'overview', labelBn: 'ড্যাশবোর্ড ওভারভিউ', labelEn: 'Dashboard Overview', icon: Layers },
    {
      id: 'mutations',
      labelBn: 'ই-নামজারি ব্যবস্থাপনা',
      labelEn: 'Mutation Applications',
      icon: GitPullRequest,
      requiredPermission: 'manage_mutation',
      badge: `${mutationsList.filter((m) => m.status !== 'APPROVED' && m.status !== 'DCR_ISSUED').length}`
    },
    {
      id: 'taxes',
      labelBn: 'ভূমি উন্নয়ন কর রেজিস্টার',
      labelEn: 'Land Tax Ledger',
      icon: Receipt,
      requiredPermission: 'manage_tax'
    },
    {
      id: 'records',
      labelBn: 'খতিয়ান ও রেকর্ড তল্লাশ',
      labelEn: 'Record Cross-Search',
      icon: Search,
      requiredPermission: 'manage_records'
    }
  ];

  // Filtered mutations
  const filteredMutations = mutationsList.filter((m) => {
    if (selectedDivision !== 'all' && m.divisionId !== selectedDivision) return false;
    if (selectedDistrict !== 'all' && m.districtId !== selectedDistrict) return false;
    if (selectedUpazila !== 'all' && m.upazilaId !== selectedUpazila) return false;
    if (mutationStatusFilter !== 'all' && m.status !== mutationStatusFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const match =
        m.caseNo.toLowerCase().includes(q) ||
        m.applicantNameBn.toLowerCase().includes(q) ||
        m.applicantNameEn.toLowerCase().includes(q) ||
        m.dagNo.includes(q) ||
        m.khatianNo.includes(q);
      if (!match) return false;
    }
    return true;
  });

  // Filtered taxes
  const filteredTaxes = taxList.filter((t) => {
    if (taxStatusFilter !== 'all' && t.paymentStatus !== taxStatusFilter) return false;
    if (selectedUpazila !== 'all' && t.upazilaId !== selectedUpazila) return false;
    if (taxSearchQuery.trim()) {
      const q = taxSearchQuery.toLowerCase();
      const match =
        t.holdingNo.toLowerCase().includes(q) ||
        t.ownerNameBn.toLowerCase().includes(q) ||
        t.mouzaNameBn.toLowerCase().includes(q);
      if (!match) return false;
    }
    return true;
  });

  // Filtered ROR parcels
  const filteredParcels = DEMO_PARCELS.filter((p) => {
    if (selectedUpazila !== 'all' && p.upazilaId !== selectedUpazila) return false;
    if (recordSearchQuery.trim()) {
      const q = recordSearchQuery.toLowerCase();
      const match =
        p.plotDagNo.includes(q) ||
        p.mouzaNameBn.toLowerCase().includes(q) ||
        p.mouzaJlNo.includes(q) ||
        (p.surveys.cs && p.surveys.cs.recordedOwnerBn.toLowerCase().includes(q)) ||
        (p.surveys.sa && p.surveys.sa.recordedOwnerBn.toLowerCase().includes(q)) ||
        (p.surveys.rs && p.surveys.rs.recordedOwnerBn.toLowerCase().includes(q));
      if (!match) return false;
    }
    return true;
  });

  // Action: Update Mutation Status
  const handleUpdateMutationStatus = (
    caseId: string,
    newStatus: MutationApplication['status'],
    hearingDate?: string
  ) => {
    setMutationsList((prev) =>
      prev.map((m) => {
        if (m.id === caseId) {
          return {
            ...m,
            status: newStatus,
            hearingDate: hearingDate !== undefined ? hearingDate : m.hearingDate
          };
        }
        return m;
      })
    );
    setAuditModalMutation(null);
    showToast(
      language === 'bn'
        ? `ই-নামজারি কেস সফলভাবে হালনাগাদ করা হয়েছে (স্থিতি: ${newStatus})`
        : `Mutation application successfully updated (Status: ${newStatus})`
    );
  };

  // Action: Create New Mutation Application
  const handleCreateNewMutation = (e: React.FormEvent) => {
    e.preventDefault();
    const newCase: MutationApplication = {
      id: `mut-${Date.now()}`,
      caseNo: `MUT-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      divisionId: newAppForm.divisionId,
      districtId: newAppForm.districtId,
      upazilaId: newAppForm.upazilaId,
      mouzaNameBn: newAppForm.mouzaNameBn,
      mouzaNameEn: 'Demo Mouza',
      dagNo: newAppForm.dagNo,
      khatianNo: newAppForm.khatianNo,
      applicantNameBn: newAppForm.applicantNameBn || 'মোঃ রফিকুল ইসলাম',
      applicantNameEn: 'Md. Rafiqul Islam',
      applicantMobile: newAppForm.applicantMobile || '01711223344',
      applicantNid: '1987269201928374',
      areaDecimals: parseFloat(newAppForm.areaDecimals) || 5.0,
      status: 'PENDING_INSPECTION',
      applicationDate: new Date().toISOString().split('T')[0],
      submissionDate: new Date().toISOString().split('T')[0],
      hearingDate: undefined,
      statutoryFeePaidBdt: 1150
    };

    setMutationsList((prev) => [newCase, ...prev]);
    setNewMutationModalOpen(false);
    showToast(
      language === 'bn'
        ? `নতুন ই-নামজারি আবেদন নিবন্ধিত: ${newCase.caseNo}`
        : `New mutation case registered: ${newCase.caseNo}`
    );
  };

  // Action: Collect Tax & Issue e-Dakhila
  const handlePayTax = (holdingId: string) => {
    const target = taxList.find((t) => t.id === holdingId);
    if (!target) return;

    setTaxList((prev) =>
      prev.map((t) => {
        if (t.id === holdingId) {
          return {
            ...t,
            paymentStatus: 'PAID',
            arrearsBdt: 0,
            lastPaymentDate: new Date().toISOString().split('T')[0]
          };
        }
        return t;
      })
    );

    setSelectedTaxRecordForPay(null);
    setDakhilaIssued({
      ...target,
      paymentStatus: 'PAID',
      arrearsBdt: 0,
      lastPaymentDate: new Date().toISOString().split('T')[0]
    });
    showToast(
      language === 'bn'
        ? `হোল্ডিং #${target.holdingNo} এর ভূমি উন্নয়ন কর সফলভাবে আদায় হয়েছে এবং ই-দাখিলা ইস্যু করা হয়েছে!`
        : `Tax collected for Holding #${target.holdingNo}. Digital e-Dakhila issued!`
    );
  };

  return (
    <AdminLayout
      currentModule={currentModule}
      setCurrentModule={(m) => setCurrentModule(m as any)}
      navItems={navItems}
      workspaceTitleBn="ভূমি রেকর্ড, নামজারি ও কর প্রশাসন"
      workspaceTitleEn="Land Records, Mutation & Tax Workspace"
      authorityBn="ভূমি মন্ত্রণালয়, গণপ্রজাতন্ত্রী বাংলাদেশ সরকার"
      authorityEn="Ministry of Land, Government of Bangladesh"
      authorityCode="MINLAND"
      onExitToPortal={onExitToPortal}
    >
      <div className="space-y-6">
        {/* Toast Alert */}
        {toastMessage && (
          <div className="p-4 rounded-2xl bg-emerald-700 text-white shadow-lg flex items-center justify-between text-xs font-bold animate-in fade-in">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-200 shrink-0" />
              <span>{toastMessage}</span>
            </div>
            <button
              type="button"
              onClick={() => setToastMessage(null)}
              className="text-emerald-200 hover:text-white"
            >
              ✕
            </button>
          </div>
        )}

        {/* Workspace Title & Geo Filters Bar */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                {language === 'bn' ? 'প্রশাসনিক ক্যাটাগরি ১ (ভূমি মন্ত্রণালয়)' : 'Administrative Category 1 (MINLAND)'}
              </span>
              <h2 className="text-xl font-bold text-slate-900 mt-1">
                {currentModule === 'overview' && (language === 'bn' ? 'সার্বিক পরিসংখ্যান ও মাঠ পর্যালোচনা' : 'Field Operations Overview')}
                {currentModule === 'mutations' && (language === 'bn' ? 'ই-নামজারি আবেদন ও শুনানি রেজিস্টার' : 'Mutation Cases Register')}
                {currentModule === 'taxes' && (language === 'bn' ? 'ভূমি উন্নয়ন কর ও বকেয়া রেজিস্টার' : 'Land Revenue Tax Ledger')}
                {currentModule === 'records' && (language === 'bn' ? 'সিএস, এসএ ও আরএস রেকর্ড ক্রস-রেফারেন্স' : 'CS, SA & RS Record Cross-Search')}
              </h2>
            </div>

            <div className="flex items-center gap-2">
              {currentModule === 'mutations' && (
                <button
                  type="button"
                  onClick={() => setNewMutationModalOpen(true)}
                  className="px-3.5 py-1.5 rounded-xl bg-[#006a4e] hover:bg-emerald-800 text-white font-bold text-xs shadow-xs transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>{language === 'bn' ? 'নতুন নামজারি এন্ট্রি' : 'New Mutation'}</span>
                </button>
              )}
            </div>
          </div>

          {/* Geographic Navigation Dropdowns */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div>
              <label className="font-bold text-slate-700 block mb-1">
                {language === 'bn' ? 'বিভাগ নির্বাচন:' : 'Division Jurisdiction:'}
              </label>
              <select
                value={selectedDivision}
                onChange={(e) => {
                  setSelectedDivision(e.target.value);
                  setSelectedDistrict('all');
                  setSelectedUpazila('all');
                }}
                className="w-full p-2.5 rounded-xl border border-slate-300 text-slate-900 font-medium focus:ring-2 focus:ring-emerald-500"
              >
                <option value="all">{language === 'bn' ? 'সকল বিভাগ' : 'All Divisions'}</option>
                {DIVISIONS.map((d) => (
                  <option key={d.id} value={d.id}>
                    {language === 'bn' ? d.nameBn : d.nameEn}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">
                {language === 'bn' ? 'জেলা:' : 'District:'}
              </label>
              <select
                value={selectedDistrict}
                onChange={(e) => {
                  setSelectedDistrict(e.target.value);
                  setSelectedUpazila('all');
                }}
                className="w-full p-2.5 rounded-xl border border-slate-300 text-slate-900 font-medium focus:ring-2 focus:ring-emerald-500"
              >
                <option value="all">{language === 'bn' ? 'সকল জেলা' : 'All Districts'}</option>
                {DISTRICTS.filter((dist) => selectedDivision === 'all' || dist.divisionId === selectedDivision).map((dist) => (
                  <option key={dist.id} value={dist.id}>
                    {language === 'bn' ? dist.nameBn : dist.nameEn}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">
                {language === 'bn' ? 'উপজেলা / সার্কেল:' : 'Upazila / Circle:'}
              </label>
              <select
                value={selectedUpazila}
                onChange={(e) => setSelectedUpazila(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-300 text-slate-900 font-medium focus:ring-2 focus:ring-emerald-500"
              >
                <option value="all">{language === 'bn' ? 'সকল উপজেলা' : 'All Upazilas'}</option>
                {UPAZILAS.filter((u) => selectedDistrict === 'all' || u.districtId === selectedDistrict).map((u) => (
                  <option key={u.id} value={u.id}>
                    {language === 'bn' ? u.nameBn : u.nameEn}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* MODULE 1: DASHBOARD OVERVIEW                              */}
        {/* ========================================================= */}
        {currentModule === 'overview' && (
          <div className="space-y-6">
            {/* KPI Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
                <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
                  <span>{language === 'bn' ? 'মোট নামজারি আবেদন' : 'Total Mutations'}</span>
                  <GitPullRequest className="w-4 h-4 text-[#006a4e]" />
                </div>
                <div className="text-2xl font-extrabold text-slate-900 font-mono">
                  {toBnNum(mutationsList.length * 480)}
                </div>
                <div className="text-[11px] text-emerald-700 font-medium flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  <span>{language === 'bn' ? '৯২% বিধিসম্মত ২৮ দিনে নিষ্পত্তি' : '92% disposed within 28 days'}</span>
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
                <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
                  <span>{language === 'bn' ? 'শুনানি অপেক্ষমাণ' : 'Pending Hearings'}</span>
                  <Clock className="w-4 h-4 text-amber-600" />
                </div>
                <div className="text-2xl font-extrabold text-slate-900 font-mono">
                  {toBnNum(mutationsList.filter((m) => m.status === 'HEARING_SCHEDULED').length || 2)}
                </div>
                <div className="text-[11px] text-amber-700 font-medium">
                  {language === 'bn' ? 'আসন্ন ৫ কার্যদিবসের মধ্যে নির্ধারিত' : 'Scheduled in next 5 days'}
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
                <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
                  <span>{language === 'bn' ? 'ভূমি কর আদায় (চলতি অর্থবছর)' : 'Tax Revenue Collected'}</span>
                  <Receipt className="w-4 h-4 text-[#006a4e]" />
                </div>
                <div className="text-2xl font-extrabold text-slate-900 font-mono">
                  ৳ {toBnNum('২,৪৫০,০০০')}
                </div>
                <div className="text-[11px] text-slate-500 font-medium">
                  {language === 'bn' ? 'অনলাইন গেটওয়ের মাধ্যমে ১০০%' : '100% digital e-Dakhila'}
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
                <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
                  <span>{language === 'bn' ? '২৫ বিঘা কৃষি কর মওকুফ' : '25-Bigha Agri Exemption'}</span>
                  <CheckCircle2 className="w-4 h-4 text-sky-600" />
                </div>
                <div className="text-2xl font-extrabold text-slate-900 font-mono">
                  {toBnNum(taxList.filter((t) => t.paymentStatus === 'EXEMPTED').length * 2100)}
                </div>
                <div className="text-[11px] text-sky-700 font-medium">
                  {language === 'bn' ? '২০২৩ সনের ৩২ নং আইন কার্যকর' : 'Enacted under Act 32/2023'}
                </div>
              </div>
            </div>

            {/* Quick action bar */}
            <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-white p-4 rounded-2xl border border-emerald-200 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#006a4e] text-white flex items-center justify-center font-bold">
                  ⚡
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">
                    {language === 'bn' ? 'দ্রুত প্রশাসনিক অ্যাকশন প্যানেল' : 'Quick Operational Actions'}
                  </h4>
                  <p className="text-xs text-slate-600">
                    {language === 'bn' ? 'নামজারি অনুমোদন, শুনানি নির্ধারণ বা কর আদায় সরাসরি পরিচালনা করুন।' : 'Approve mutations, schedule hearings, or collect tax.'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setCurrentModule('mutations')}
                  className="px-3 py-1.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 font-bold text-xs cursor-pointer shadow-2xs"
                >
                  {language === 'bn' ? 'নামজারি কেস দেখুন' : 'View Mutations'}
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentModule('taxes')}
                  className="px-3 py-1.5 rounded-xl bg-[#006a4e] hover:bg-emerald-800 text-white font-bold text-xs cursor-pointer shadow-xs"
                >
                  {language === 'bn' ? 'কর রেজিস্টার পরিচালনা' : 'Manage Taxes'}
                </button>
              </div>
            </div>

            {/* Recent Mutation & Hearing Schedule Summary */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                  <GitPullRequest className="w-4 h-4 text-[#006a4e]" />
                  <span>{language === 'bn' ? 'সম্প্রতি দাখিলকৃত ই-নামজারি কেস' : 'Recent Mutation Cases'}</span>
                </h3>
                <button
                  type="button"
                  onClick={() => setCurrentModule('mutations')}
                  className="text-xs font-bold text-[#006a4e] hover:underline cursor-pointer"
                >
                  {language === 'bn' ? 'সকল আবেদন দেখুন' : 'View all'}
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-600 uppercase font-semibold text-[11px]">
                    <tr>
                      <th className="p-3">{language === 'bn' ? 'কেস নম্বর' : 'Case No'}</th>
                      <th className="p-3">{language === 'bn' ? 'আবেদনকারী' : 'Applicant'}</th>
                      <th className="p-3">{language === 'bn' ? 'মৌজা ও দাগ' : 'Mouza & Dag'}</th>
                      <th className="p-3">{language === 'bn' ? 'জমির পরিমাণ' : 'Area (Dec)'}</th>
                      <th className="p-3">{language === 'bn' ? 'স্থিতি' : 'Status'}</th>
                      <th className="p-3">{language === 'bn' ? 'শুনানির তারিখ' : 'Hearing Date'}</th>
                      <th className="p-3 text-right">{language === 'bn' ? 'অ্যাকশন' : 'Action'}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {mutationsList.slice(0, 4).map((m) => (
                      <tr key={m.id} className="hover:bg-slate-50/60">
                        <td className="p-3 font-mono font-bold text-slate-900">{m.caseNo}</td>
                        <td className="p-3 font-medium text-slate-800">{m.applicantNameBn}</td>
                        <td className="p-3 text-slate-600">{m.mouzaNameBn}, দাগ: {m.dagNo}</td>
                        <td className="p-3 font-mono font-semibold">{toBnNum(m.areaDecimals)} শতক</td>
                        <td className="p-3">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            m.status === 'APPROVED' || m.status === 'DCR_ISSUED'
                              ? 'bg-emerald-100 text-emerald-800'
                              : m.status === 'HEARING_SCHEDULED'
                              ? 'bg-sky-100 text-sky-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}>
                            {m.status}
                          </span>
                        </td>
                        <td className="p-3 font-mono text-slate-600">{m.hearingDate || 'নির্ধারিত হয়নি'}</td>
                        <td className="p-3 text-right">
                          <button
                            type="button"
                            onClick={() => setAuditModalMutation(m)}
                            className="px-2.5 py-1 rounded-lg border border-slate-300 hover:bg-slate-100 text-slate-800 font-semibold cursor-pointer text-xs"
                          >
                            {language === 'bn' ? 'অডিট ও অনুমোদন' : 'Audit'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* MODULE 2: MUTATION APPLICATIONS REGISTER                  */}
        {/* ========================================================= */}
        {currentModule === 'mutations' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={language === 'bn' ? 'কেস নম্বর, নাম বা দাগ দিয়ে খুঁজুন...' : 'Search case no, name or plot...'}
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-300 font-medium"
                />
              </div>

              <div className="flex flex-wrap items-center gap-2 text-xs">
                <Filter className="w-3.5 h-3.5 text-slate-400" />
                <select
                  value={mutationStatusFilter}
                  onChange={(e) => setMutationStatusFilter(e.target.value)}
                  className="p-2 rounded-xl border border-slate-300 text-slate-800 font-medium"
                >
                  <option value="all">{language === 'bn' ? 'সকল স্থিতি' : 'All Statuses'}</option>
                  <option value="PENDING_INSPECTION">PENDING_INSPECTION</option>
                  <option value="HEARING_SCHEDULED">HEARING_SCHEDULED</option>
                  <option value="APPROVED">APPROVED</option>
                  <option value="DCR_ISSUED">DCR_ISSUED</option>
                </select>

                <button
                  type="button"
                  onClick={() => setNewMutationModalOpen(true)}
                  className="px-3 py-2 rounded-xl bg-[#006a4e] text-white font-bold hover:bg-emerald-800 transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>{language === 'bn' ? 'নতুন আবেদন দাখিল' : 'Add Case'}</span>
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-700 uppercase font-bold text-[11px] border-b border-slate-200">
                  <tr>
                    <th className="p-3.5">{language === 'bn' ? 'কেস নম্বর' : 'Case No'}</th>
                    <th className="p-3.5">{language === 'bn' ? 'আবেদনকারী' : 'Applicant'}</th>
                    <th className="p-3.5">{language === 'bn' ? 'মৌজা ও খতিয়ান' : 'Mouza & Khatian'}</th>
                    <th className="p-3.5">{language === 'bn' ? 'জমির পরিমাণ' : 'Area (Dec)'}</th>
                    <th className="p-3.5">{language === 'bn' ? 'সরকারি ফি' : 'Fee Status'}</th>
                    <th className="p-3.5">{language === 'bn' ? 'স্থিতি' : 'Status'}</th>
                    <th className="p-3.5 text-right">{language === 'bn' ? 'কার্যক্রম' : 'Action'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredMutations.map((m) => (
                    <tr key={m.id} className="hover:bg-slate-50/70">
                      <td className="p-3.5 font-mono font-bold text-slate-900">{m.caseNo}</td>
                      <td className="p-3.5">
                        <div className="font-bold text-slate-800">{m.applicantNameBn}</div>
                        <div className="text-[11px] text-slate-500 font-mono">{m.applicantMobile}</div>
                      </td>
                      <td className="p-3.5">
                        <div>{m.mouzaNameBn}</div>
                        <div className="text-[11px] text-slate-500 font-mono">খতিয়ান: {m.khatianNo}, দাগ: {m.dagNo}</div>
                      </td>
                      <td className="p-3.5 font-mono font-bold text-slate-800">{toBnNum(m.areaDecimals)} শতক</td>
                      <td className="p-3.5">
                        <span className="font-mono text-emerald-700 font-bold">
                          ৳ {toBnNum(m.statutoryFeePaidBdt)}
                        </span>
                      </td>
                      <td className="p-3.5">
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            m.status === 'APPROVED' || m.status === 'DCR_ISSUED'
                              ? 'bg-emerald-100 text-emerald-800'
                              : m.status === 'HEARING_SCHEDULED'
                              ? 'bg-sky-100 text-sky-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {m.status}
                        </span>
                      </td>
                      <td className="p-3.5 text-right">
                        <button
                          type="button"
                          onClick={() => setAuditModalMutation(m)}
                          className="px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-[#006a4e] border border-emerald-300 font-bold cursor-pointer text-xs flex items-center gap-1 ml-auto"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>{language === 'bn' ? 'নথি অডিট ও অনুমোদন' : 'Audit & Approve'}</span>
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
        {/* MODULE 3: LAND TAX LEDGER                                 */}
        {/* ========================================================= */}
        {currentModule === 'taxes' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  value={taxSearchQuery}
                  onChange={(e) => setTaxSearchQuery(e.target.value)}
                  placeholder={language === 'bn' ? 'হোল্ডিং নম্বর বা মালিকের নাম দিয়ে খুঁজুন...' : 'Search holding no or owner name...'}
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-300 font-medium"
                />
              </div>

              <div className="flex items-center gap-2 text-xs">
                <select
                  value={taxStatusFilter}
                  onChange={(e) => setTaxStatusFilter(e.target.value)}
                  className="p-2 rounded-xl border border-slate-300 text-slate-800 font-medium"
                >
                  <option value="all">{language === 'bn' ? 'সকল হোল্ডিং' : 'All Holdings'}</option>
                  <option value="PAID">PAID</option>
                  <option value="DUE">DUE</option>
                  <option value="EXEMPTED">EXEMPTED (২৫ বিঘা কৃষি মওকুফ)</option>
                </select>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-700 uppercase font-bold text-[11px] border-b border-slate-200">
                  <tr>
                    <th className="p-3.5">{language === 'bn' ? 'হোল্ডিং নম্বর' : 'Holding No'}</th>
                    <th className="p-3.5">{language === 'bn' ? 'মালিকের নাম' : 'Owner Name'}</th>
                    <th className="p-3.5">{language === 'bn' ? 'মৌজা' : 'Mouza'}</th>
                    <th className="p-3.5">{language === 'bn' ? 'জমির পরিমাণ' : 'Area (Dec)'}</th>
                    <th className="p-3.5">{language === 'bn' ? 'বার্ষিক কর' : 'Annual Tax'}</th>
                    <th className="p-3.5">{language === 'bn' ? 'বকেয়া' : 'Arrears'}</th>
                    <th className="p-3.5">{language === 'bn' ? 'পরিশোধের স্থিতি' : 'Status'}</th>
                    <th className="p-3.5 text-right">{language === 'bn' ? 'কার্যক্রম' : 'Action'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredTaxes.map((t) => (
                    <tr key={t.id} className="hover:bg-slate-50/70">
                      <td className="p-3.5 font-mono font-bold text-slate-900">{t.holdingNo}</td>
                      <td className="p-3.5 font-bold text-slate-800">{t.ownerNameBn}</td>
                      <td className="p-3.5 text-slate-600">{t.mouzaNameBn}</td>
                      <td className="p-3.5 font-mono">{toBnNum(t.landAreaDecimals)} শতক</td>
                      <td className="p-3.5 font-mono">৳ {toBnNum(t.annualTaxBdt)}</td>
                      <td className="p-3.5 font-mono text-rose-600">৳ {toBnNum(t.arrearsBdt)}</td>
                      <td className="p-3.5">
                        <span
                          className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                            t.paymentStatus === 'PAID'
                              ? 'bg-emerald-100 text-emerald-800'
                              : t.paymentStatus === 'EXEMPTED'
                              ? 'bg-sky-100 text-sky-800'
                              : 'bg-rose-100 text-rose-800'
                          }`}
                        >
                          {t.paymentStatus === 'EXEMPTED'
                            ? (language === 'bn' ? '২৫ বিঘা মওকুফ' : 'EXEMPTED')
                            : t.paymentStatus}
                        </span>
                      </td>
                      <td className="p-3.5 text-right">
                        {t.paymentStatus === 'DUE' ? (
                          <button
                            type="button"
                            onClick={() => setSelectedTaxRecordForPay(t)}
                            className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold cursor-pointer text-xs"
                          >
                            {language === 'bn' ? 'কর আদায় ও দাখিলা' : 'Collect Tax'}
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => setDakhilaIssued(t)}
                            className="px-2.5 py-1.5 rounded-lg border border-slate-300 hover:bg-slate-100 text-slate-700 font-semibold cursor-pointer text-xs flex items-center gap-1 ml-auto"
                          >
                            <Receipt className="w-3 h-3 text-emerald-700" />
                            <span>{language === 'bn' ? 'দাখিলা ভিউ' : 'View Dakhila'}</span>
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* MODULE 4: RECORD SEARCH & CS/SA/RS CROSS-REFERENCE        */}
        {/* ========================================================= */}
        {currentModule === 'records' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-bold text-slate-900 text-base">
                  {language === 'bn' ? 'রেকর্ড অব রাইটস (ROR) ও সার্ভে ক্রস-রেফারেন্স' : 'Record of Rights Cross-Reference'}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  {language === 'bn'
                    ? 'এসিল্যান্ড ও কানুনগো কার্যালয় কর্তৃক অনুমোদিত সিএস, এসএ ও আরএস ঐতিহাসিক রেকর্ডের আন্তঃসংযোগ।'
                    : 'Historical cross-references between CS, SA, and RS survey registers for land parcels.'}
                </p>
              </div>

              <div className="relative min-w-[240px]">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  value={recordSearchQuery}
                  onChange={(e) => setRecordSearchQuery(e.target.value)}
                  placeholder={language === 'bn' ? 'দাগ নম্বর, খতিয়ান বা মালিকের নাম...' : 'Search plot, khatian or owner...'}
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-300 font-medium"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredParcels.map((p) => (
                <div
                  key={p.id}
                  onClick={() => setSelectedParcelForAudit(p)}
                  className="p-4 rounded-xl border border-slate-200 hover:border-emerald-400 hover:shadow-xs transition-all cursor-pointer bg-slate-50/60 space-y-3"
                >
                  <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                    <span className="font-bold text-slate-900 text-sm">
                      {p.mouzaNameBn} (জেএল নং {p.mouzaJlNo}, দাগ: {p.plotDagNo})
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                      {p.landClassBn}
                    </span>
                  </div>

                  {/* Surveys table */}
                  <div className="space-y-1.5 text-xs">
                    {p.surveys.cs && (
                      <div className="p-2 rounded-lg bg-amber-50/70 border border-amber-200 text-amber-950 flex items-center justify-between">
                        <span><strong>CS খতিয়ান:</strong> {p.surveys.cs.khatianNo} (দাগ: {p.surveys.cs.dagNo})</span>
                        <span className="text-[11px] truncate max-w-[150px]">{p.surveys.cs.recordedOwnerBn}</span>
                      </div>
                    )}
                    {p.surveys.sa && (
                      <div className="p-2 rounded-lg bg-sky-50/70 border border-sky-200 text-sky-950 flex items-center justify-between">
                        <span><strong>SA খতিয়ান:</strong> {p.surveys.sa.khatianNo} (দাগ: {p.surveys.sa.dagNo})</span>
                        <span className="text-[11px] truncate max-w-[150px]">{p.surveys.sa.recordedOwnerBn}</span>
                      </div>
                    )}
                    {p.surveys.rs && (
                      <div className="p-2 rounded-lg bg-emerald-50/70 border border-emerald-200 text-emerald-950 flex items-center justify-between">
                        <span><strong>RS খতিয়ান:</strong> {p.surveys.rs.khatianNo} (দাগ: {p.surveys.rs.dagNo})</span>
                        <span className="text-[11px] truncate max-w-[150px]">{p.surveys.rs.recordedOwnerBn}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-end text-[11px] font-bold text-[#006a4e] gap-1">
                    <span>পূর্ণাঙ্গ আরএস ও ইতিহাস দেখুন</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* MODAL 1: AUDIT & APPROVE MUTATION APPLICATION             */}
        {/* ========================================================= */}
        {auditModalMutation && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
            <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-lg w-full p-6 text-xs space-y-4 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <FileCheck2 className="w-5 h-5 text-[#006a4e]" />
                  <h3 className="font-black text-slate-900 text-base">
                    ই-নামজারি নথি অডিট: {auditModalMutation.caseNo}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setAuditModalMutation(null)}
                  className="text-slate-400 hover:text-slate-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 grid grid-cols-2 gap-2">
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase font-bold">আবেদনকারী:</span>
                    <div className="font-bold text-slate-900">{auditModalMutation.applicantNameBn}</div>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase font-bold">মোবাইল নম্বর:</span>
                    <div className="font-mono font-bold text-slate-900">{auditModalMutation.applicantMobile}</div>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase font-bold">মৌজা ও দাগ:</span>
                    <div className="font-medium text-slate-800">{auditModalMutation.mouzaNameBn}, দাগ #{auditModalMutation.dagNo}</div>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase font-bold">খতিয়ান ও পরিমাণ:</span>
                    <div className="font-medium text-slate-800">খতিয়ান #{auditModalMutation.khatianNo} ({toBnNum(auditModalMutation.areaDecimals)} শতক)</div>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 space-y-1">
                  <div className="flex items-center justify-between font-bold text-emerald-900">
                    <span>বর্তমান আবেদনের স্থিতি:</span>
                    <span className="font-mono text-xs px-2 py-0.5 rounded-full bg-emerald-200">
                      {auditModalMutation.status}
                    </span>
                  </div>
                  <div className="text-[11px] text-emerald-800">
                    দাখিল তারিখ: {auditModalMutation.submissionDate} • সরকারি ফি: ৳ {toBnNum(auditModalMutation.statutoryFeePaidBdt)} (পরিশোধিত)
                  </div>
                </div>

                {/* Statutory Workflow Decision Buttons */}
                <div className="space-y-2 pt-2">
                  <span className="text-[11px] font-bold text-slate-700 block">
                    সরকারি সিদ্ধান্ত ও কার্যক্রম গ্রহণ করুন:
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => handleUpdateMutationStatus(auditModalMutation.id, 'APPROVED')}
                      className="p-2.5 rounded-xl bg-[#006a4e] hover:bg-emerald-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
                    >
                      <Check className="w-4 h-4" />
                      <span>নামজারি অনুমোদন করুন</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleUpdateMutationStatus(auditModalMutation.id, 'DCR_ISSUED')}
                      className="p-2.5 rounded-xl bg-indigo-700 hover:bg-indigo-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
                    >
                      <Receipt className="w-4 h-4" />
                      <span>ডিসিআর (DCR) ইস্যু করুন</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleUpdateMutationStatus(auditModalMutation.id, 'HEARING_SCHEDULED', '2026-04-28')}
                      className="p-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
                    >
                      <Calendar className="w-4 h-4" />
                      <span>শুনানির তারিখ নির্ধারণ (২৮ এপ্রিল)</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleUpdateMutationStatus(auditModalMutation.id, 'PENDING_INSPECTION')}
                      className="p-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
                    >
                      <Clock className="w-4 h-4" />
                      <span>মাঠ তদন্তের নির্দেশ দিন</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* MODAL 2: ADD NEW MUTATION APPLICATION                      */}
        {/* ========================================================= */}
        {newMutationModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
            <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-md w-full p-6 text-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="font-bold text-slate-900 text-base">
                  নতুন ই-নামজারি নথি এন্ট্রি
                </h3>
                <button
                  type="button"
                  onClick={() => setNewMutationModalOpen(false)}
                  className="text-slate-400 hover:text-slate-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreateNewMutation} className="space-y-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">আবেদনকারীর নাম:</label>
                  <input
                    type="text"
                    required
                    value={newAppForm.applicantNameBn}
                    onChange={(e) => setNewAppForm({ ...newAppForm, applicantNameBn: e.target.value })}
                    placeholder="যেমন: মোঃ জামিল হোসেন"
                    className="w-full p-2.5 rounded-xl border border-slate-300 font-medium"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">মোবাইল নম্বর:</label>
                    <input
                      type="text"
                      required
                      value={newAppForm.applicantMobile}
                      onChange={(e) => setNewAppForm({ ...newAppForm, applicantMobile: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-slate-300 font-mono"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">জমির পরিমাণ (শতক):</label>
                    <input
                      type="text"
                      required
                      value={newAppForm.areaDecimals}
                      onChange={(e) => setNewAppForm({ ...newAppForm, areaDecimals: e.target.value })}
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
                      value={newAppForm.mouzaNameBn}
                      onChange={(e) => setNewAppForm({ ...newAppForm, mouzaNameBn: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-slate-300 font-medium"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">দাগ নম্বর:</label>
                    <input
                      type="text"
                      required
                      value={newAppForm.dagNo}
                      onChange={(e) => setNewAppForm({ ...newAppForm, dagNo: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-slate-300 font-mono"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">খতিয়ান নম্বর:</label>
                    <input
                      type="text"
                      required
                      value={newAppForm.khatianNo}
                      onChange={(e) => setNewAppForm({ ...newAppForm, khatianNo: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-slate-300 font-mono"
                    />
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setNewMutationModalOpen(false)}
                    className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 font-semibold"
                  >
                    বাতিল
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-[#006a4e] hover:bg-emerald-800 text-white font-bold shadow-xs cursor-pointer"
                  >
                    দাখিল ও রেজিস্ট্রি করুন
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* MODAL 3: COLLECT TAX & ISSUE DIGITAL E-DAKHILA             */}
        {/* ========================================================= */}
        {selectedTaxRecordForPay && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
            <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-md w-full p-6 text-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Receipt className="w-5 h-5 text-emerald-700" />
                  <h3 className="font-bold text-slate-900 text-base">
                    ভূমি উন্নয়ন কর আদায় ও দাখিলা ইস্যু
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedTaxRecordForPay(null)}
                  className="text-slate-400 hover:text-slate-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-500">হোল্ডিং নম্বর:</span>
                  <span className="font-mono font-bold text-slate-900">{selectedTaxRecordForPay.holdingNo}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">মালিকের নাম:</span>
                  <span className="font-bold text-slate-900">{selectedTaxRecordForPay.ownerNameBn}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">মৌজা ও পরিমাণ:</span>
                  <span>{selectedTaxRecordForPay.mouzaNameBn} ({toBnNum(selectedTaxRecordForPay.landAreaDecimals)} শতক)</span>
                </div>
                <div className="flex justify-between border-t border-slate-200 pt-2 font-bold text-sm">
                  <span>মোট আদায়যোগ্য বকেয়া:</span>
                  <span className="font-mono text-emerald-800">৳ {toBnNum(selectedTaxRecordForPay.arrearsBdt)}</span>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedTaxRecordForPay(null)}
                  className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 font-semibold"
                >
                  বাতিল
                </button>
                <button
                  type="button"
                  onClick={() => handlePayTax(selectedTaxRecordForPay.id)}
                  className="px-5 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold shadow-xs cursor-pointer flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4" />
                  <span>কর আদায় নিশ্চিত করুন</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* MODAL 4: DIGITAL E-DAKHILA OFFICIAL CERTIFICATE            */}
        {/* ========================================================= */}
        {dakhilaIssued && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
            <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-lg w-full p-6 text-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-700" />
                  <h3 className="font-bold text-slate-900 text-base">
                    অনলাইন ভূমি উন্নয়ন কর পরিশোধিত দাখিলা (e-Dakhila)
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setDakhilaIssued(null)}
                  className="text-slate-400 hover:text-slate-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Official e-Dakhila Layout */}
              <div className="border-2 border-emerald-700 rounded-2xl p-5 bg-gradient-to-b from-emerald-50/40 to-white space-y-4">
                <div className="text-center space-y-1">
                  <div className="font-bold text-emerald-950 text-sm">গণপ্রজাতন্ত্রী বাংলাদেশ সরকার</div>
                  <div className="text-[11px] text-slate-600">ভূমি সংস্কার বোর্ড • ভূমি মন্ত্রণালয়</div>
                  <div className="font-bold text-slate-900 text-xs uppercase tracking-wider">ভূমি উন্নয়ন কর দাখিলা (অনুচ্ছেদ ৩)</div>
                  <div className="text-[10px] font-mono text-slate-500">দাখিলা ক্রমিক নং: DAK-2026-{Math.floor(100000 + Math.random() * 900000)}</div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px] border-t border-b border-emerald-200 py-3">
                  <div><strong>হোল্ডিং নং:</strong> {dakhilaIssued.holdingNo}</div>
                  <div><strong>অর্থবছর:</strong> ২০২৫-২০২৬</div>
                  <div><strong>মালিক:</strong> {dakhilaIssued.ownerNameBn}</div>
                  <div><strong>মৌজা:</strong> {dakhilaIssued.mouzaNameBn}</div>
                  <div><strong>জমির পরিমাণ:</strong> {toBnNum(dakhilaIssued.landAreaDecimals)} শতক</div>
                  <div><strong>পরিশোধের তারিখ:</strong> {dakhilaIssued.lastPaymentDate || 'আজ'}</div>
                  <div className="col-span-2 text-emerald-800 font-bold">
                    পরিশোধিত কর: ৳ {toBnNum(dakhilaIssued.annualTaxBdt)} (সম্পূর্ণ পরিশোধিত)
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1 text-[10px] text-slate-500 font-mono">
                  <span>যাচাইকরণ কিউআর: ডিজিটাল স্বাক্ষরিত</span>
                  <span className="text-emerald-700 font-bold">✓ সরকারি গেটওয়ে দ্বারা অনুমোদিত</span>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    showToast('ডিজিটাল দাখিলা পিডিএফ ডাউনলোড শুরু হয়েছে!');
                    setDakhilaIssued(null);
                  }}
                  className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-black text-white font-bold flex items-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>দাখিলা ডাউনলোড ও প্রিন্ট</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* MODAL 5: ROR PARCEL FULL SURVEY AUDIT MODAL                */}
        {/* ========================================================= */}
        {selectedParcelForAudit && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
            <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-lg w-full p-6 text-xs space-y-4 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div>
                  <h3 className="font-bold text-slate-900 text-base">
                    মৌজা {selectedParcelForAudit.mouzaNameBn} • দাগ #{selectedParcelForAudit.plotDagNo}
                  </h3>
                  <span className="text-slate-500 text-[11px]">ঐতিহাসিক সিএস, এসএ ও আরএস খতিয়ান রূপান্তর</span>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedParcelForAudit(null)}
                  className="text-slate-400 hover:text-slate-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3">
                {selectedParcelForAudit.surveys.cs && (
                  <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-950 space-y-1">
                    <span className="font-bold block text-amber-900">১. সিএস জরিপ (Cadastral Survey ১৮৮৮-১৯৪০)</span>
                    <div>খতিয়ান: <strong>#{selectedParcelForAudit.surveys.cs.khatianNo}</strong>, দাগ: <strong>#{selectedParcelForAudit.surveys.cs.dagNo}</strong></div>
                    <div>রেকর্ডভুক্ত জমিদার/জোতদার: {selectedParcelForAudit.surveys.cs.recordedOwnerBn}</div>
                  </div>
                )}

                {selectedParcelForAudit.surveys.sa && (
                  <div className="p-3.5 rounded-xl bg-sky-50 border border-sky-200 text-sky-950 space-y-1">
                    <span className="font-bold block text-sky-900">২. এসএ জরিপ (State Acquisition ১৯৫৬-১৯৬২)</span>
                    <div>খতিয়ান: <strong>#{selectedParcelForAudit.surveys.sa.khatianNo}</strong>, দাগ: <strong>#{selectedParcelForAudit.surveys.sa.dagNo}</strong></div>
                    <div>রেকর্ডভুক্ত প্রজাস্বত্ব মালিক: {selectedParcelForAudit.surveys.sa.recordedOwnerBn}</div>
                  </div>
                )}

                {selectedParcelForAudit.surveys.rs && (
                  <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950 space-y-1">
                    <span className="font-bold block text-emerald-900">৩. আরএস / বর্তমান সিটি জরিপ</span>
                    <div>খতিয়ান: <strong>#{selectedParcelForAudit.surveys.rs.khatianNo}</strong>, দাগ: <strong>#{selectedParcelForAudit.surveys.rs.dagNo}</strong></div>
                    <div>হাল রেকর্ডভুক্ত মালিক: {selectedParcelForAudit.surveys.rs.recordedOwnerBn}</div>
                    <div className="text-emerald-700 font-semibold text-[11px]">স্থিতি: চূড়ান্তভাবে প্রকাশিত ও গেজেটভুক্ত</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};
