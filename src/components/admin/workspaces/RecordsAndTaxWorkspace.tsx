/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Bangladesh Integrated Land Services Portal (BILSP)
 * Workspace 1: Land Records, Mutation & Tax Admin (Ministry of Land)
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
  Building2
} from 'lucide-react';

interface RecordsAndTaxWorkspaceProps {
  onExitToPortal: () => void;
}

export const RecordsAndTaxWorkspace: React.FC<RecordsAndTaxWorkspaceProps> = ({ onExitToPortal }) => {
  const { language, toBnNum } = useLanguage();
  const { currentUser, hasPermission } = useAuth();

  const [currentModule, setCurrentModule] = useState<'overview' | 'mutations' | 'taxes' | 'records'>('overview');

  // Geographic filter state
  const [selectedDivision, setSelectedDivision] = useState<string>('all');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('all');
  const [selectedUpazila, setSelectedUpazila] = useState<string>('all');

  // Mutation filter
  const [mutationStatusFilter, setMutationStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Tax filter
  const [taxStatusFilter, setTaxStatusFilter] = useState<string>('all');

  const navItems = [
    { id: 'overview', labelBn: 'ড্যাশবোর্ড ওভারভিউ', labelEn: 'Dashboard Overview', icon: Layers },
    {
      id: 'mutations',
      labelBn: 'ই-নামজারি ব্যবস্থাপনা',
      labelEn: 'Mutation Applications',
      icon: GitPullRequest,
      requiredPermission: 'manage_mutation',
      badge: '৪'
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
  const filteredMutations = DEMO_MUTATION_APPLICATIONS.filter((m) => {
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
  const filteredTaxes = DEMO_TAX_RECORDS.filter((t) => {
    if (taxStatusFilter !== 'all' && t.paymentStatus !== taxStatusFilter) return false;
    if (selectedUpazila !== 'all' && t.upazilaId !== selectedUpazila) return false;
    return true;
  });

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
        {/* Workspace Title & Geo Filters Bar */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                {language === 'bn' ? 'প্রশাসনিক ক্যাটাগরি ১' : 'Administrative Category 1'}
              </span>
              <h2 className="text-xl font-bold text-slate-900 mt-1">
                {currentModule === 'overview' && (language === 'bn' ? 'সার্বিক পরিসংখ্যান ও মাঠ পর্যালোচনা' : 'Field Operations Overview')}
                {currentModule === 'mutations' && (language === 'bn' ? 'ই-নামজারি আবেদন ও শুনানি রেজিস্টার' : 'Mutation Cases Register')}
                {currentModule === 'taxes' && (language === 'bn' ? 'ভূমি উন্নয়ন কর ও বকেয়া রেজিস্টার' : 'Land Revenue Tax Ledger')}
                {currentModule === 'records' && (language === 'bn' ? 'সিএস, এসএ ও আরএস রেকর্ড ক্রস-রেফারেন্স' : 'CS, SA & RS Record Cross-Search')}
              </h2>
            </div>

            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>{language === 'bn' ? 'লাইভ রাজস্ব ডেটাসেট' : 'Authoritative Revenue System'}</span>
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
                  {toBnNum(DEMO_MUTATION_APPLICATIONS.length * 1420)}
                </div>
                <div className="text-[11px] text-emerald-700 font-medium flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  <span>{language === 'bn' ? '৮৮% বিধিসম্মত ২৮ দিনে নিষ্পত্তি' : '88% disposed within 28 days'}</span>
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
                <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
                  <span>{language === 'bn' ? 'শুনানি অপেক্ষমাণ' : 'Pending Hearings'}</span>
                  <Clock className="w-4 h-4 text-amber-600" />
                </div>
                <div className="text-2xl font-extrabold text-slate-900 font-mono">
                  {toBnNum(38)}
                </div>
                <div className="text-[11px] text-amber-700 font-medium">
                  {language === 'bn' ? 'আসন্ন ৫ কার্যদিবসের মধ্যে' : 'Scheduled in next 5 days'}
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
                  {toBnNum(8420)}
                </div>
                <div className="text-[11px] text-sky-700 font-medium">
                  {language === 'bn' ? '২০২৩ সনের ৩২ নং আইন কার্যকর' : 'Enacted under Act 32/2023'}
                </div>
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
                  className="text-xs font-bold text-[#006a4e] hover:underline"
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
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {DEMO_MUTATION_APPLICATIONS.slice(0, 3).map((m) => (
                      <tr key={m.id} className="hover:bg-slate-50/60">
                        <td className="p-3 font-mono font-bold text-slate-900">{m.caseNo}</td>
                        <td className="p-3 font-medium text-slate-800">{m.applicantNameBn}</td>
                        <td className="p-3 text-slate-600">{m.mouzaNameBn}, দাগ: {m.dagNo}</td>
                        <td className="p-3 font-mono font-semibold">{toBnNum(m.areaDecimals)} শতক</td>
                        <td className="p-3">
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                            {m.status}
                          </span>
                        </td>
                        <td className="p-3 font-mono text-slate-600">{m.hearingDate || 'নির্ধারিত হয়নি'}</td>
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

              <div className="flex items-center gap-2 text-xs">
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
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {m.status}
                        </span>
                      </td>
                      <td className="p-3.5 text-right">
                        <button
                          type="button"
                          onClick={() => alert(`ই-নামজারি নথি পর্যালোচিত: ${m.caseNo} (নোট: এটি ডেমো রেকর্ড)`)}
                          className="px-2.5 py-1 rounded-lg border border-slate-300 hover:bg-slate-100 font-semibold cursor-pointer"
                        >
                          {language === 'bn' ? 'নথি দেখুন' : 'Audit'}
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
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-base">
                {language === 'bn' ? 'ভূমি উন্নয়ন কর হোল্ডিং খতিয়ান' : 'Land Development Tax Holdings'}
              </h3>
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
            <div className="border-b border-slate-100 pb-3">
              <h3 className="font-bold text-slate-900 text-base">
                {language === 'bn' ? 'রেকর্ড অব রাইটস (ROR) ও সার্ভে ক্রস-রেফারেন্স' : 'Record of Rights Cross-Reference'}
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                {language === 'bn'
                  ? 'এসিল্যান্ড ও কানুনগো কার্যালয় কর্তৃক অনুমোদিত সিএস, এসএ ও আরএস ঐতিহাসিক রেকর্ডের আন্তঃসংযোগ।'
                  : 'Historical cross-references between CS, SA, and RS survey registers for land parcels.'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {DEMO_PARCELS.map((p) => (
                <div key={p.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 space-y-3">
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
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};
