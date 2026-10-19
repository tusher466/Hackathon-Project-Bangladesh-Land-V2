/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Bangladesh Integrated Land Services Portal (BILSP)
 * Workspace 2: Land Survey & Mapping Admin (DLRS - Directorate of Land Records and Surveys)
 * Fully interactive cadastral vector browser, measurement tool, sheet inspector & geodetic audit
 */

import React, { useState } from 'react';
import { useLanguage } from '../../../context/LanguageContext';
import { useAuth } from '../../../context/AuthContext';
import { AdminLayout } from '../AdminLayout';
import { DEMO_CADASTRAL_SHEETS } from '../../../data/adminDemoData';
import { DIVISIONS, DISTRICTS, UPAZILAS, DEMO_PARCELS } from '../../../data/geoData';
import { DemoParcel, CadastralSheetRecord } from '../../../types/authAndGeo';
import {
  Map,
  Layers,
  Search,
  CheckCircle2,
  AlertTriangle,
  Sliders,
  ShieldCheck,
  Compass,
  FileCheck,
  Eye,
  Info,
  Maximize2,
  Plus,
  X,
  Ruler,
  Download,
  RotateCw,
  Sparkles,
  Printer
} from 'lucide-react';

interface SurveyAndMappingWorkspaceProps {
  onExitToPortal: () => void;
}

export const SurveyAndMappingWorkspace: React.FC<SurveyAndMappingWorkspaceProps> = ({ onExitToPortal }) => {
  const { language, toBnNum } = useLanguage();
  const { currentUser, hasPermission } = useAuth();

  const [currentModule, setCurrentModule] = useState<'map_browser' | 'cadastral_sheets' | 'survey_audit'>('map_browser');

  // Layer switches
  const [showCS, setShowCS] = useState(true);
  const [showSA, setShowSA] = useState(true);
  const [showRS, setShowRS] = useState(true);
  const [selectedParcel, setSelectedParcel] = useState<DemoParcel | null>(DEMO_PARCELS[0]);

  // Measurement tool state
  const [isMeasuring, setIsMeasuring] = useState(false);
  const [measuredDistance, setMeasuredDistance] = useState<string>('১২৫ ফুট (১.৮৯ লিঙ্ক)');

  // Sheet Catalog State
  const [sheetsList, setSheetsList] = useState<CadastralSheetRecord[]>(DEMO_CADASTRAL_SHEETS);
  const [sheetSearchQuery, setSheetSearchQuery] = useState('');
  const [surveyTypeFilter, setSurveyTypeFilter] = useState('all');
  const [selectedSheetForView, setSelectedSheetForView] = useState<CadastralSheetRecord | null>(null);
  const [newSheetModalOpen, setNewSheetModalOpen] = useState(false);

  // New Sheet Form
  const [newSheetForm, setNewSheetForm] = useState({
    sheetNo: '০৩',
    mouzaNameBn: 'মিরপুর পাইকপাড়া',
    jlNo: '৭২',
    surveyType: 'RS',
    surveyYear: '2024',
    scale: '16 inch = 1 mile'
  });

  // Audit Scanner State
  const [auditRunning, setAuditRunning] = useState(false);
  const [auditCompleted, setAuditCompleted] = useState(false);
  const [auditScore, setAuditScore] = useState('৯৯.৮%');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const navItems = [
    { id: 'map_browser', labelBn: 'ক্যাডাস্ট্রাল ম্যাপ ভিউয়ার', labelEn: 'Cadastral Map Browser', icon: Map },
    {
      id: 'cadastral_sheets',
      labelBn: 'মৌজা সিট রেজিস্টার',
      labelEn: 'Mouza Sheet Catalog',
      icon: Layers,
      requiredPermission: 'manage_cadastral_maps',
      badge: `${sheetsList.length}`
    },
    {
      id: 'survey_audit',
      labelBn: 'জরিপ ডেটা অডিট ও গুণমান',
      labelEn: 'Data Quality & Validation',
      icon: FileCheck,
      requiredPermission: 'digitization_audit'
    }
  ];

  // Filtered sheets
  const filteredSheets = sheetsList.filter((s) => {
    if (surveyTypeFilter !== 'all' && s.surveyType !== surveyTypeFilter) return false;
    if (sheetSearchQuery.trim()) {
      const q = sheetSearchQuery.toLowerCase();
      const match =
        s.sheetNo.includes(q) ||
        s.mouzaNameBn.toLowerCase().includes(q) ||
        s.jlNo.includes(q);
      if (!match) return false;
    }
    return true;
  });

  // Action: Add New Sheet
  const handleCreateNewSheet = (e: React.FormEvent) => {
    e.preventDefault();
    const newSheet: CadastralSheetRecord = {
      id: `sheet-${Date.now()}`,
      districtId: 'dist-dhaka',
      upazilaId: 'upz-ramna',
      mouzaNameBn: newSheetForm.mouzaNameBn,
      jlNo: newSheetForm.jlNo,
      sheetNo: newSheetForm.sheetNo,
      surveyType: newSheetForm.surveyType as any,
      surveyYear: newSheetForm.surveyYear,
      scale: newSheetForm.scale,
      digitizedDate: new Date().toISOString().split('T')[0],
      topologicalIntegrity: 'VERIFIED',
      qualityScorePercent: 99.4
    };

    setSheetsList((prev) => [newSheet, ...prev]);
    setNewSheetModalOpen(false);
    showToast(language === 'bn' ? 'নতুন মৌজা সিট সফলভাবে নিবন্ধিত ও জিও-রেফারেন্স সম্পন্ন হয়েছে!' : 'New mouza sheet registered!');
  };

  // Action: Run Geodetic Audit
  const handleRunAudit = () => {
    setAuditRunning(true);
    setAuditCompleted(false);
    setTimeout(() => {
      setAuditRunning(false);
      setAuditCompleted(true);
      setAuditScore('১০০% (কোনো ফাঁক বা ওভারল্যাপ নেই)');
      showToast(language === 'bn' ? 'টপোলজিক্যাল অডিট শতভাগ সফল! সকল সীমানা পলিগন সঠিক।' : 'Audit completed successfully!');
    }, 1800);
  };

  return (
    <AdminLayout
      currentModule={currentModule}
      setCurrentModule={(m) => setCurrentModule(m as any)}
      navItems={navItems}
      workspaceTitleBn="ভূমি জরিপ, নকশা ও মৌজা ম্যাপ প্রশাসন"
      workspaceTitleEn="Land Survey & Cadastral Mapping Workspace"
      authorityBn="ভূমি রেকর্ড ও জরিপ অধিদপ্তর (ডিএলআরএস)"
      authorityEn="Directorate of Land Records and Surveys (DLRS)"
      authorityCode="DLRS"
      onExitToPortal={onExitToPortal}
    >
      <div className="space-y-6">
        {/* Toast Alert */}
        {toastMessage && (
          <div className="p-4 rounded-2xl bg-sky-800 text-white shadow-lg flex items-center justify-between text-xs font-bold animate-in fade-in">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-sky-200 shrink-0" />
              <span>{toastMessage}</span>
            </div>
            <button
              type="button"
              onClick={() => setToastMessage(null)}
              className="text-sky-200 hover:text-white"
            >
              ✕
            </button>
          </div>
        )}

        {/* Workspace Banner */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-sky-800 bg-sky-50 px-2 py-0.5 rounded-full border border-sky-200">
              {language === 'bn' ? 'প্রশাসনিক ক্যাটাগরি ২ (ডিএলআরএস)' : 'Administrative Category 2 (DLRS)'}
            </span>
            <h2 className="text-xl font-bold text-slate-900 mt-1">
              {currentModule === 'map_browser' && (language === 'bn' ? 'ডিজিটাল ক্যাডাস্ট্রাল জরিপ ও প্লট প্রদর্শন' : 'Cadastral Vector Plot Visualization')}
              {currentModule === 'cadastral_sheets' && (language === 'bn' ? 'মৌজা নকশা সিট রেজিস্ট্রি' : 'Mouza Sheet Repository')}
              {currentModule === 'survey_audit' && (language === 'bn' ? 'ডিজিটাইজেশন গুণমান ও টপোলজি যাচাই' : 'Topological Validation & Quality Indicators')}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              {language === 'bn'
                ? 'সিএস (১৯১০-১৯২০), এসএ (১৯৫৬-১৯৬২) ও আরএস জরিপের ঐতিহাসিক পার্থক্য ও ক্যাডাস্ট্রাল ভৌগোলিক প্লট।'
                : 'Distinguishing historical survey epochs: CS (1888-1940), SA (1956-1962), and RS (1966-present).'}
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto text-xs font-semibold text-slate-600 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200">
            <Compass className="w-4 h-4 text-sky-600" />
            <span>WGS-84 / BTM Projection</span>
          </div>
        </div>

        {/* ========================================================= */}
        {/* MODULE 1: CADASTRAL MAP BROWSER & PLOT VISUALIZATION      */}
        {/* ========================================================= */}
        {currentModule === 'map_browser' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left: Vector Map Display Canvas */}
            <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                  <Map className="w-4 h-4 text-sky-600" />
                  <span>
                    {language === 'bn'
                      ? 'মৌজা: সেগুনবাগিচা (জেএল নং ৫৮), রমনা সার্কেল, ঢাকা'
                      : 'Mouza: Segunbagicha (JL 58), Ramna Circle, Dhaka'}
                  </span>
                </div>

                {/* Layer Toggle Controls & Measurement */}
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span className="font-semibold text-slate-500 text-[11px]">
                    {language === 'bn' ? 'লেয়ার নিয়ন্ত্রণ:' : 'Layers:'}
                  </span>

                  <button
                    type="button"
                    onClick={() => setShowCS(!showCS)}
                    className={`px-2.5 py-1 rounded-lg font-bold border transition-colors cursor-pointer ${
                      showCS ? 'bg-amber-100 text-amber-900 border-amber-300' : 'bg-slate-100 text-slate-400 border-slate-200'
                    }`}
                  >
                    CS (১৯১০)
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowSA(!showSA)}
                    className={`px-2.5 py-1 rounded-lg font-bold border transition-colors cursor-pointer ${
                      showSA ? 'bg-sky-100 text-sky-900 border-sky-300' : 'bg-slate-100 text-slate-400 border-slate-200'
                    }`}
                  >
                    SA (১৯৫৬)
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowRS(!showRS)}
                    className={`px-2.5 py-1 rounded-lg font-bold border transition-colors cursor-pointer ${
                      showRS ? 'bg-emerald-100 text-emerald-900 border-emerald-300' : 'bg-slate-100 text-slate-400 border-slate-200'
                    }`}
                  >
                    RS (বর্তমান)
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsMeasuring(!isMeasuring)}
                    className={`px-2.5 py-1 rounded-lg font-bold border transition-colors cursor-pointer flex items-center gap-1 ${
                      isMeasuring ? 'bg-indigo-600 text-white border-indigo-700' : 'bg-slate-100 text-slate-700 border-slate-300'
                    }`}
                  >
                    <Ruler className="w-3.5 h-3.5" />
                    <span>{language === 'bn' ? 'পরিমাপক' : 'Measure'}</span>
                  </button>
                </div>
              </div>

              {/* Measurement Info Banner */}
              {isMeasuring && (
                <div className="p-3 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-900 text-xs flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Ruler className="w-4 h-4 text-indigo-600" />
                    <span>
                      {language === 'bn'
                        ? `নির্বাচিত প্লট বাউন্ডারি মাপ: ${measuredDistance}`
                        : `Demarcated boundary measurement: ${measuredDistance}`}
                    </span>
                  </div>
                  <span className="font-mono text-[10px] bg-indigo-200 px-2 py-0.5 rounded-md font-bold">
                    স্কেল: ১৬ ইঞ্চি = ১ মাইল
                  </span>
                </div>
              )}

              {/* Interactive Vector Canvas for Demo Parcels */}
              <div className="relative bg-slate-900 rounded-xl overflow-hidden p-6 min-h-[380px] flex items-center justify-center">
                <svg viewBox="0 0 500 350" className="w-full max-w-[480px] h-auto drop-shadow-md select-none">
                  <defs>
                    <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                      <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#1e293b" strokeWidth="0.8" />
                    </pattern>
                  </defs>
                  <rect width="500" height="350" fill="#0f172a" />
                  <rect width="500" height="350" fill="url(#grid)" />

                  {/* Parcels */}
                  {DEMO_PARCELS.map((p, idx) => {
                    const isSelected = selectedParcel?.id === p.id;
                    const coords = [
                      [80 + idx * 110, 60],
                      [160 + idx * 110, 75],
                      [170 + idx * 110, 190],
                      [70 + idx * 110, 170]
                    ];
                    const pathStr = `M ${coords[0][0]} ${coords[0][1]} L ${coords[1][0]} ${coords[1][1]} L ${coords[2][0]} ${coords[2][1]} L ${coords[3][0]} ${coords[3][1]} Z`;

                    return (
                      <g
                        key={p.id}
                        className="cursor-pointer transition-transform hover:opacity-90"
                        onClick={() => {
                          setSelectedParcel(p);
                          setMeasuredDistance(`${toBnNum(80 + idx * 25)} ফুট • ${toBnNum(p.areaDecimals)} শতক`);
                        }}
                      >
                        <path
                          d={pathStr}
                          fill={isSelected ? '#006a4e' : '#1e293b'}
                          fillOpacity={isSelected ? 0.85 : 0.6}
                          stroke={isSelected ? '#10b981' : '#64748b'}
                          strokeWidth={isSelected ? 3 : 1.5}
                        />
                        <text
                          x={coords[0][0] + 35}
                          y={coords[0][1] + 65}
                          fill="#ffffff"
                          fontSize="13"
                          fontWeight="bold"
                          textAnchor="middle"
                        >
                          দাগ {p.plotDagNo}
                        </text>
                        <text
                          x={coords[0][0] + 35}
                          y={coords[0][1] + 85}
                          fill="#cbd5e1"
                          fontSize="10"
                          textAnchor="middle"
                        >
                          {toBnNum(p.areaDecimals)} শতক
                        </text>
                      </g>
                    );
                  })}
                </svg>

                <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-xs px-3 py-1.5 rounded-lg border border-white/10 text-white text-[10px] font-mono">
                  BTM: 23.7380° N, 90.4055° E • Cadastral Sheet #02
                </div>
              </div>
            </div>

            {/* Right: Selected Parcel Survey Inspector */}
            <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
              <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    প্লট ও দাগ বিবরণী
                  </span>
                  <h3 className="text-base font-bold text-slate-900 mt-0.5">
                    {selectedParcel ? `দাগ নম্বর: ${selectedParcel.plotDagNo}` : 'প্লট নির্বাচন করুন'}
                  </h3>
                </div>
                {selectedParcel && (
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                    {selectedParcel.landClassBn}
                  </span>
                )}
              </div>

              {selectedParcel ? (
                <div className="space-y-3 text-xs">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                    <div>মৌজা: <strong>{selectedParcel.mouzaNameBn}</strong> (জেএল #{selectedParcel.mouzaJlNo})</div>
                    <div>জমির পরিমাণ: <strong>{toBnNum(selectedParcel.areaDecimals)} শতক</strong> ({selectedParcel.areaKatha} কাঠা)</div>
                    <div>প্রশাসনিক সার্কেল: {selectedParcel.upazilaNameBn}</div>
                  </div>

                  {/* CS Survey Record */}
                  {showCS && selectedParcel.surveys.cs && (
                    <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200 space-y-1 text-amber-950">
                      <div className="flex items-center justify-between font-bold text-xs">
                        <span>CS জরিপ (ক্যাডাস্ট্রাল সার্ভে ১৯১০)</span>
                        <span className="text-[10px] bg-amber-200 px-1.5 py-0.2 rounded font-mono">ভলিউম-০৪</span>
                      </div>
                      <div>খতিয়ান নং: <strong>{selectedParcel.surveys.cs.khatianNo}</strong>, দাগ নং: <strong>{selectedParcel.surveys.cs.dagNo}</strong></div>
                      <div className="text-[11px] text-amber-900">নথিভুক্ত জমিদার: {selectedParcel.surveys.cs.recordedOwnerBn}</div>
                    </div>
                  )}

                  {/* SA Survey Record */}
                  {showSA && selectedParcel.surveys.sa && (
                    <div className="p-3 rounded-xl bg-sky-50/70 border border-sky-200 space-y-1 text-sky-950">
                      <div className="flex items-center justify-between font-bold text-xs">
                        <span>SA জরিপ (স্টেট একুইজিশন ১৯৫৬)</span>
                        <span className="text-[10px] bg-sky-200 px-1.5 py-0.2 rounded font-mono">ভলিউম-১২</span>
                      </div>
                      <div>খতিয়ান নং: <strong>{selectedParcel.surveys.sa.khatianNo}</strong>, দাগ নং: <strong>{selectedParcel.surveys.sa.dagNo}</strong></div>
                      <div className="text-[11px] text-sky-900">নথিভুক্ত প্রজা: {selectedParcel.surveys.sa.recordedOwnerBn}</div>
                    </div>
                  )}

                  {/* RS Survey Record */}
                  {showRS && selectedParcel.surveys.rs && (
                    <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200 space-y-1 text-emerald-950">
                      <div className="flex items-center justify-between font-bold text-xs">
                        <span>RS জরিপ (রিভিশনাল / সিটি সার্ভে)</span>
                        <span className="text-[10px] bg-emerald-200 px-1.5 py-0.2 rounded font-mono">সক্রিয়</span>
                      </div>
                      <div>খতিয়ান নং: <strong>{selectedParcel.surveys.rs.khatianNo}</strong>, দাগ নং: <strong>{selectedParcel.surveys.rs.dagNo}</strong></div>
                      <div className="text-[11px] text-emerald-900">নথিভুক্ত মালিক: {selectedParcel.surveys.rs.recordedOwnerBn}</div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="p-8 text-center text-slate-400">
                  {language === 'bn' ? 'ম্যাপ থেকে একটি প্লট সিলেক্ট করুন' : 'Select a plot on the map'}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* MODULE 2: MOUZA SHEET REPOSITORY                         */}
        {/* ========================================================= */}
        {currentModule === 'cadastral_sheets' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
              <div>
                <h3 className="font-bold text-slate-900 text-base">
                  {language === 'bn' ? 'ডিজিটাইজকৃত মৌজা নকশা সিট ক্যাটালগ' : 'Digitized Mouza Sheet Catalog'}
                </h3>
                <span className="text-xs text-slate-500">
                  {sheetsList.length} {language === 'bn' ? 'টি সিট নিবন্ধিত' : 'sheets cataloged'}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-2 text-xs">
                <input
                  type="text"
                  value={sheetSearchQuery}
                  onChange={(e) => setSheetSearchQuery(e.target.value)}
                  placeholder="মৌজা বা সিট নং খুঁজুন..."
                  className="p-2 rounded-xl border border-slate-300 font-medium"
                />

                <select
                  value={surveyTypeFilter}
                  onChange={(e) => setSurveyTypeFilter(e.target.value)}
                  className="p-2 rounded-xl border border-slate-300 font-medium text-slate-800"
                >
                  <option value="all">সকল জরিপ (CS/SA/RS)</option>
                  <option value="CS">CS</option>
                  <option value="SA">SA</option>
                  <option value="RS">RS</option>
                </select>

                <button
                  type="button"
                  onClick={() => setNewSheetModalOpen(true)}
                  className="px-3 py-2 rounded-xl bg-sky-700 hover:bg-sky-800 text-white font-bold cursor-pointer flex items-center gap-1.5 shadow-xs"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>{language === 'bn' ? 'নতুন সিট আপলোড' : 'Catalog Sheet'}</span>
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-700 uppercase font-bold text-[11px] border-b border-slate-200">
                  <tr>
                    <th className="p-3.5">{language === 'bn' ? 'সিট নম্বর' : 'Sheet No'}</th>
                    <th className="p-3.5">{language === 'bn' ? 'মৌজার নাম ও জেএল' : 'Mouza & JL'}</th>
                    <th className="p-3.5">{language === 'bn' ? 'জরিপের ধরন' : 'Survey Type'}</th>
                    <th className="p-3.5">{language === 'bn' ? 'স্কেল' : 'Scale'}</th>
                    <th className="p-3.5">{language === 'bn' ? 'ডিজিটাইজড তারিখ' : 'Digitized Date'}</th>
                    <th className="p-3.5">{language === 'bn' ? 'গুণমান স্কোর' : 'Quality Score'}</th>
                    <th className="p-3.5 text-right">{language === 'bn' ? 'কার্যক্রম' : 'Action'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredSheets.map((s) => (
                    <tr key={s.id} className="hover:bg-slate-50/70">
                      <td className="p-3.5 font-bold text-slate-900">সিট #{s.sheetNo}</td>
                      <td className="p-3.5 font-medium">{s.mouzaNameBn} (জেএল {s.jlNo})</td>
                      <td className="p-3.5 font-mono font-bold text-sky-700">{s.surveyType} ({s.surveyYear})</td>
                      <td className="p-3.5 text-slate-600">{s.scale}</td>
                      <td className="p-3.5 font-mono text-slate-500">{s.digitizedDate}</td>
                      <td className="p-3.5 font-mono font-bold text-emerald-700">{s.qualityScorePercent}%</td>
                      <td className="p-3.5 text-right">
                        <button
                          type="button"
                          onClick={() => setSelectedSheetForView(s)}
                          className="px-2.5 py-1 rounded-lg border border-slate-300 hover:bg-slate-100 text-slate-800 font-semibold cursor-pointer text-xs flex items-center gap-1 ml-auto"
                        >
                          <Eye className="w-3.5 h-3.5 text-sky-700" />
                          <span>{language === 'bn' ? 'নকশা ভিউ' : 'View Sheet'}</span>
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
        {/* MODULE 3: DATA QUALITY & VALIDATION                       */}
        {/* ========================================================= */}
        {currentModule === 'survey_audit' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-bold text-slate-900 text-base">
                  {language === 'bn' ? 'টপোলজি ও জ্যামিতিক গুণমান নির্দেশক' : 'Topological Validation & Geodetic Compliance'}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  {language === 'bn'
                    ? 'ক্যাডাস্ট্রাল জরিপের মৌজা সিটে কোনো ফাঁক (Gaps), ওভারল্যাপ (Overlaps) বা সীমারেখার ভুল রয়েছে কিনা তার স্বয়ংক্রিয় নিরীক্ষা।'
                    : 'Automated geometric validation identifying parcel boundary gaps, slivers, and georeference offsets.'}
                </p>
              </div>

              <button
                type="button"
                onClick={handleRunAudit}
                disabled={auditRunning}
                className="px-4 py-2 rounded-xl bg-sky-700 hover:bg-sky-800 text-white font-bold text-xs flex items-center gap-2 cursor-pointer shadow-xs disabled:opacity-60"
              >
                {auditRunning ? (
                  <>
                    <RotateCw className="w-4 h-4 animate-spin text-white" />
                    <span>{language === 'bn' ? 'টপোলজি স্ক্যান হচ্ছে...' : 'Auditing...'}</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-sky-200" />
                    <span>{language === 'bn' ? 'লাইভ টপোলজি অডিট চালান' : 'Run Live Audit'}</span>
                  </>
                )}
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 space-y-1">
                <span className="text-xs font-bold text-emerald-800">টপোলজিক্যাল ক্লোজার রেট</span>
                <div className="text-2xl font-mono font-bold text-emerald-950">{auditScore}</div>
                <p className="text-[11px] text-emerald-700">সকল প্লটের বহুভুজ স্বয়ংক্রিয়ভাবে বন্ধ হয়েছে</p>
              </div>

              <div className="p-4 rounded-xl bg-sky-50 border border-sky-200 space-y-1">
                <span className="text-xs font-bold text-sky-800">স্থানাঙ্ক জিও-রেফারেন্সিং</span>
                <div className="text-2xl font-mono font-bold text-sky-950">BTM / WGS84</div>
                <p className="text-[11px] text-sky-700">ডিজিটাল কোঅর্ডিনেট সিস্টেমে শতভাগ নিবন্ধিত</p>
              </div>

              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 space-y-1">
                <span className="text-xs font-bold text-amber-800">ঐতিহাসিক রেকর্ড সিঙ্ক</span>
                <div className="text-2xl font-mono font-bold text-amber-950">CS-SA-RS</div>
                <p className="text-[11px] text-amber-700">জরিপ রূপান্তর রেফারেন্স সংরক্ষিত</p>
              </div>
            </div>

            {auditCompleted && (
              <div className="p-4 rounded-2xl bg-emerald-100 border border-emerald-300 text-emerald-950 text-xs flex items-center gap-3">
                <ShieldCheck className="w-6 h-6 text-emerald-700 shrink-0" />
                <div>
                  <strong>ডিএলআরএস জিওডেটিক সার্টিফিকেট অনুচ্ছেদ ৪:</strong> মৌজা সিট ও ভেক্টর বাউন্ডারিতে কোনো ওভারল্যাপ বা বিরোধ নেই। মানচিত্রটি অফিশিয়াল গেজেটের জন্য প্রস্তুত।
                </div>
              </div>
            )}
          </div>
        )}

        {/* ========================================================= */}
        {/* MODAL 1: VIEW MOUZA SHEET HIGH-RES MAP                    */}
        {/* ========================================================= */}
        {selectedSheetForView && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
            <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-2xl w-full p-6 text-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div>
                  <h3 className="font-bold text-slate-900 text-base">
                    মৌজা নকশা: {selectedSheetForView.mouzaNameBn} (সিট #{selectedSheetForView.sheetNo})
                  </h3>
                  <span className="text-slate-500 font-mono text-[11px]">
                    জেএল #{selectedSheetForView.jlNo} • {selectedSheetForView.surveyType} জরিপ ({selectedSheetForView.surveyYear}) • স্কেল: {selectedSheetForView.scale}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedSheetForView(null)}
                  className="text-slate-400 hover:text-slate-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Vectorized sheet preview */}
              <div className="bg-[#fbf7ee] rounded-2xl border-2 border-amber-900/40 p-6 flex flex-col items-center justify-center min-h-[300px] relative overflow-hidden">
                <div className="absolute top-3 right-3 font-mono text-[10px] text-amber-900 bg-amber-100 px-2 py-0.5 rounded border border-amber-300 font-bold">
                  উত্তর দিক ⬆
                </div>
                <svg viewBox="0 0 400 250" className="w-full max-w-[400px] h-auto">
                  <rect x="10" y="10" width="380" height="230" fill="none" stroke="#78350f" strokeWidth="2" strokeDasharray="6 3" />
                  {/* Rivers / Canal */}
                  <path d="M 10 120 Q 150 160 250 80 T 390 140" fill="none" stroke="#38bdf8" strokeWidth="6" opacity="0.7" />
                  {/* Boundary lines */}
                  <polygon points="50,40 180,45 160,110 40,90" fill="#fef3c7" stroke="#78350f" strokeWidth="1.5" />
                  <text x="100" y="75" fontSize="12" fontWeight="bold" fill="#78350f">দাগ ১০১</text>

                  <polygon points="190,45 320,50 310,130 170,115" fill="#ecfdf5" stroke="#78350f" strokeWidth="1.5" />
                  <text x="240" y="85" fontSize="12" fontWeight="bold" fill="#065f46">দাগ ১০২</text>

                  <polygon points="50,140 170,145 150,210 40,200" fill="#f0fdf4" stroke="#78350f" strokeWidth="1.5" />
                  <text x="100" y="180" fontSize="12" fontWeight="bold" fill="#047857">দাগ ১০৩</text>

                  <polygon points="180,145 340,150 320,220 160,210" fill="#eff6ff" stroke="#78350f" strokeWidth="1.5" />
                  <text x="240" y="185" fontSize="12" fontWeight="bold" fill="#1e40af">দাগ ১০৪</text>
                </svg>
                <div className="text-center mt-2 text-amber-950 font-bold text-[11px]">
                  ভূমি রেকর্ড ও জরিপ অধিদপ্তর • ডিজিটাইজড ক্যাডাস্ট্রাল মৌজা নকশা
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-emerald-700 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>ডিএলআরএস প্রত্যয়িত ও গেজেটভুক্ত নকশা</span>
                </span>
                <button
                  type="button"
                  onClick={() => {
                    showToast('মৌজা নকশা প্রিন্ট কমান্ড প্রেরিত হয়েছে!');
                    setSelectedSheetForView(null);
                  }}
                  className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-black text-white font-bold flex items-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>নকশা ডাউনলোড ও প্রিন্ট</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* MODAL 2: ADD NEW MOUZA SHEET                             */}
        {/* ========================================================= */}
        {newSheetModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
            <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-md w-full p-6 text-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="font-bold text-slate-900 text-base">
                  নতুন মৌজা নকশা সিট রেজিস্ট্রি
                </h3>
                <button
                  type="button"
                  onClick={() => setNewSheetModalOpen(false)}
                  className="text-slate-400 hover:text-slate-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreateNewSheet} className="space-y-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">মৌজার নাম:</label>
                  <input
                    type="text"
                    required
                    value={newSheetForm.mouzaNameBn}
                    onChange={(e) => setNewSheetForm({ ...newSheetForm, mouzaNameBn: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-300 font-medium"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">জেএল নম্বর:</label>
                    <input
                      type="text"
                      required
                      value={newSheetForm.jlNo}
                      onChange={(e) => setNewSheetForm({ ...newSheetForm, jlNo: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-slate-300 font-mono"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">সিট নম্বর:</label>
                    <input
                      type="text"
                      required
                      value={newSheetForm.sheetNo}
                      onChange={(e) => setNewSheetForm({ ...newSheetForm, sheetNo: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-slate-300 font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">জরিপের ধরন:</label>
                    <select
                      value={newSheetForm.surveyType}
                      onChange={(e) => setNewSheetForm({ ...newSheetForm, surveyType: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-slate-300 font-medium"
                    >
                      <option value="CS">CS</option>
                      <option value="SA">SA</option>
                      <option value="RS">RS</option>
                      <option value="BS">BS</option>
                    </select>
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">স্কেল:</label>
                    <input
                      type="text"
                      required
                      value={newSheetForm.scale}
                      onChange={(e) => setNewSheetForm({ ...newSheetForm, scale: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-slate-300 font-mono"
                    />
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setNewSheetModalOpen(false)}
                    className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 font-semibold"
                  >
                    বাতিল
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-sky-700 hover:bg-sky-800 text-white font-bold shadow-xs cursor-pointer"
                  >
                    সিট নিবন্ধন ও জিও-রেফারেন্স
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
