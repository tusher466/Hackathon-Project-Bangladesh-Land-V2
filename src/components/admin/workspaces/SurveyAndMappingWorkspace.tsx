/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Bangladesh Integrated Land Services Portal (BILSP)
 * Workspace 2: Land Survey & Mapping Admin (DLRS - Directorate of Land Records and Surveys)
 */

import React, { useState } from 'react';
import { useLanguage } from '../../../context/LanguageContext';
import { useAuth } from '../../../context/AuthContext';
import { AdminLayout } from '../AdminLayout';
import { DEMO_CADASTRAL_SHEETS } from '../../../data/adminDemoData';
import { DIVISIONS, DISTRICTS, UPAZILAS, DEMO_PARCELS } from '../../../data/geoData';
import { DemoParcel, SurveyType } from '../../../types/authAndGeo';
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
  Maximize2
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

  // Filters
  const [selectedSurveyType, setSelectedSurveyType] = useState<string>('all');

  const navItems = [
    { id: 'map_browser', labelBn: 'ক্যাডাস্ট্রাল ম্যাপ ভিউয়ার', labelEn: 'Cadastral Map Browser', icon: Map },
    {
      id: 'cadastral_sheets',
      labelBn: 'মৌজা সিট রেজিস্টার',
      labelEn: 'Mouza Sheet Catalog',
      icon: Layers,
      requiredPermission: 'manage_cadastral_maps',
      badge: '৪'
    },
    {
      id: 'survey_audit',
      labelBn: 'জরিপ ডেটা অডিট ও গুণমান',
      labelEn: 'Data Quality & Validation',
      icon: FileCheck,
      requiredPermission: 'digitization_audit'
    }
  ];

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
                ? 'সিএস (১৯১০-১৯২০), এসএ (১৯৫৬-১৯৬২) ও আরএস জরিপের ঐতিহাসিক পার্থক্য পর্যবেক্ষণ।'
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

                {/* Layer Toggle Controls */}
                <div className="flex items-center gap-2 text-xs">
                  <span className="font-semibold text-slate-500 text-[11px]">
                    {language === 'bn' ? 'লেয়ার নিয়ন্ত্রণ:' : 'Layer Controls:'}
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
                </div>
              </div>

              {/* Interactive Vector Canvas for Demo Parcels */}
              <div className="relative bg-slate-900/95 rounded-xl border border-slate-800 p-4 overflow-hidden min-h-[360px] flex items-center justify-center">
                {/* Cadastral Grid Lines */}
                <svg className="w-full h-80" viewBox="0 0 320 260">
                  {/* Subtle Grid */}
                  <defs>
                    <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                      <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />

                  {/* Demo Parcels Rendered as Clickable Polygon Plots */}
                  {DEMO_PARCELS.map((p) => {
                    const isSelected = selectedParcel?.id === p.id;
                    const pts = p.coordinates.map((pt) => pt.join(',')).join(' ');

                    return (
                      <g key={p.id} className="cursor-pointer group" onClick={() => setSelectedParcel(p)}>
                        <polygon
                          points={pts}
                          className={`transition-all ${
                            isSelected
                              ? 'fill-emerald-500/40 stroke-emerald-400 stroke-2 filter drop-shadow'
                              : 'fill-sky-500/20 stroke-sky-400/80 stroke-1 group-hover:fill-sky-500/35 group-hover:stroke-sky-300'
                          }`}
                        />
                        <text
                          x={p.coordinates[0][0] + 15}
                          y={p.coordinates[0][1] + 30}
                          fill="#ffffff"
                          fontSize="9"
                          fontFamily="monospace"
                          fontWeight="bold"
                          className="pointer-events-none select-none"
                        >
                          দাগ: {p.plotDagNo}
                        </text>
                        <text
                          x={p.coordinates[0][0] + 15}
                          y={p.coordinates[0][1] + 45}
                          fill="#cbd5e1"
                          fontSize="7"
                          className="pointer-events-none select-none"
                        >
                          {toBnNum(p.areaDecimals)} শতক
                        </text>
                      </g>
                    );
                  })}
                </svg>

                {/* Map Scale & Legend Overlay */}
                <div className="absolute bottom-3 left-3 bg-slate-950/80 backdrop-blur-xs text-[10px] text-slate-300 px-3 py-1.5 rounded-lg border border-slate-700/60 font-mono space-y-0.5">
                  <div>স্কেল: ১৬ ইঞ্চি = ১ মাইল (1:3960)</div>
                  <div className="flex items-center gap-3 text-slate-400">
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-400" /> বর্তমান আরএস
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-sky-400" /> প্লট সীমানা
                    </span>
                  </div>
                </div>

                <div className="absolute top-3 right-3 bg-amber-500/90 text-slate-950 font-bold text-[10px] px-2 py-0.5 rounded-md uppercase font-mono">
                  DEMO VECTOR GEOMETRY
                </div>
              </div>

              {/* Distinction Notice */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-start gap-2 leading-relaxed">
                <Info className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                <p>
                  <strong>ডিএলআরএস কারিগরি মূলনীতি:</strong> সিএস, এসএ এবং আরএস জরিপ বিভিন্ন ঐতিহাসিক সময়ে
                  সম্পাদিত হওয়ায় প্লটের দাগ নম্বর ও সীমানা এক নয়। প্লটের ইতিহাস জানতে ঐতিহাসিক স্তরসমূহ স্বতন্ত্রভাবে
                  পর্যালোচনা করতে হবে।
                </p>
              </div>
            </div>

            {/* Right: Selected Parcel Inspector Card */}
            <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#006a4e]" />
                  <span>{language === 'bn' ? 'নির্বাচিত দাগের তথ্য' : 'Parcel Inspector'}</span>
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                  {selectedParcel?.landClassBn}
                </span>
              </div>

              {selectedParcel ? (
                <div className="space-y-4 text-xs">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      {language === 'bn' ? 'মৌজা ও বর্তমান আরএস দাগ:' : 'Mouza & Current RS Dag:'}
                    </span>
                    <div className="text-base font-bold text-slate-900">
                      {selectedParcel.mouzaNameBn} (দাগ নং {selectedParcel.plotDagNo})
                    </div>
                    <div className="text-slate-500 text-[11px]">
                      জমির পরিমাণ: <strong className="text-slate-800">{toBnNum(selectedParcel.areaDecimals)} শতক</strong>
                    </div>
                  </div>

                  {/* CS Survey Record */}
                  {showCS && (
                    <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200 space-y-1 text-amber-950">
                      <div className="flex items-center justify-between font-bold text-xs">
                        <span>CS জরিপ (ক্যাডাস্ট্রাল সার্ভে)</span>
                        <span className="text-[10px] bg-amber-200 px-1.5 py-0.2 rounded font-mono">১৯১০-১৯২০</span>
                      </div>
                      {selectedParcel.surveys.cs ? (
                        <>
                          <div>খতিয়ান নং: <strong>{selectedParcel.surveys.cs.khatianNo}</strong>, দাগ নং: <strong>{selectedParcel.surveys.cs.dagNo}</strong></div>
                          <div className="text-[11px] text-amber-900">নথিভুক্ত মালিক: {selectedParcel.surveys.cs.recordedOwnerBn}</div>
                        </>
                      ) : (
                        <div className="text-[11px] text-amber-800 italic">এই দাগে সিএস উপ-বিভাজন রেকর্ড অনুপস্থিত</div>
                      )}
                    </div>
                  )}

                  {/* SA Survey Record */}
                  {showSA && (
                    <div className="p-3 rounded-xl bg-sky-50/70 border border-sky-200 space-y-1 text-sky-950">
                      <div className="flex items-center justify-between font-bold text-xs">
                        <span>SA জরিপ (স্টেট একুইজিশন)</span>
                        <span className="text-[10px] bg-sky-200 px-1.5 py-0.2 rounded font-mono">১৯৫৬-১৯৬২</span>
                      </div>
                      {selectedParcel.surveys.sa ? (
                        <>
                          <div>খতিয়ান নং: <strong>{selectedParcel.surveys.sa.khatianNo}</strong>, দাগ নং: <strong>{selectedParcel.surveys.sa.dagNo}</strong></div>
                          <div className="text-[11px] text-sky-900">নথিভুক্ত মালিক: {selectedParcel.surveys.sa.recordedOwnerBn}</div>
                        </>
                      ) : (
                        <div className="text-[11px] text-sky-800 italic">এই দাগে এসএ রেকর্ড সমন্বিত অবস্থায় রয়েছে</div>
                      )}
                    </div>
                  )}

                  {/* RS Survey Record */}
                  {showRS && selectedParcel.surveys.rs && (
                    <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200 space-y-1 text-emerald-950">
                      <div className="flex items-center justify-between font-bold text-xs">
                        <span>RS জরিপ (রিভিশনাল সার্ভে)</span>
                        <span className="text-[10px] bg-emerald-200 px-1.5 py-0.2 rounded font-mono">সক্রিয় রেকর্ড</span>
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
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-base">
                {language === 'bn' ? 'ডিজিটাইজকৃত মৌজা নকশা সিট ক্যাটালগ' : 'Digitized Mouza Sheet Catalog'}
              </h3>
              <span className="text-xs font-semibold text-slate-500">
                {DEMO_CADASTRAL_SHEETS.length} {language === 'bn' ? 'টি সিট নিবন্ধিত' : 'sheets cataloged'}
              </span>
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
                    <th className="p-3.5 text-right">{language === 'bn' ? 'স্থিতি' : 'Integrity'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {DEMO_CADASTRAL_SHEETS.map((s) => (
                    <tr key={s.id} className="hover:bg-slate-50/70">
                      <td className="p-3.5 font-bold text-slate-900">{s.sheetNo}</td>
                      <td className="p-3.5 font-medium">{s.mouzaNameBn} (জেএল {s.jlNo})</td>
                      <td className="p-3.5 font-mono font-bold text-sky-700">{s.surveyType} ({s.surveyYear})</td>
                      <td className="p-3.5 text-slate-600">{s.scale}</td>
                      <td className="p-3.5 font-mono text-slate-500">{s.digitizedDate}</td>
                      <td className="p-3.5 font-mono font-bold text-emerald-700">{s.qualityScorePercent}%</td>
                      <td className="p-3.5 text-right">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                          {s.topologicalIntegrity}
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
        {/* MODULE 3: DATA QUALITY & VALIDATION                       */}
        {/* ========================================================= */}
        {currentModule === 'survey_audit' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="font-bold text-slate-900 text-base">
                {language === 'bn' ? 'টপোলজি ও জ্যামিতিক গুণমান নির্দেশক' : 'Topological Validation & Geodetic Compliance'}
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                {language === 'bn'
                  ? 'ক্যাডাস্ট্রাল জরিপের মৌজা সিটে কোনো ফাঁক (Gaps), ওভারল্যাপ (Overlaps) বা সীমারেখার ভুল রয়েছে কিনা তার স্বয়ংক্রিয় নিরীক্ষা।'
                  : 'Automated geometric validation identifying parcel boundary gaps, slivers, and georeference offsets.'}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 space-y-1">
                <span className="text-xs font-bold text-emerald-800">টপোলজিক্যাল ক্লোজার রেট</span>
                <div className="text-2xl font-mono font-bold text-emerald-950">৯৯.৪%</div>
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
          </div>
        )}
      </div>
    </AdminLayout>
  );
};
