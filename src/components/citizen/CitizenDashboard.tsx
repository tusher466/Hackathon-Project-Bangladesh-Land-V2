/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Bangladesh Integrated Land Services Portal (BILSP)
 * Upgraded Citizen Dashboard: Real OpenStreetMap, Digitized Offline-to-Online Tools,
 * Land Sector AI Assistant & Complete Service Hub
 */

import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { CitizenUser, DemoParcel } from '../../types/authAndGeo';
import { BangladeshInteractiveMap } from './BangladeshInteractiveMap';
import { DEMO_PARCELS } from '../../data/geoData';
import { FarayejCalculatorModal } from './tools/FarayejCalculatorModal';
import { KhasLandApplicationModal } from './tools/KhasLandApplicationModal';
import { VestedPropertySearchModal } from './tools/VestedPropertySearchModal';
import { AminDemarcationModal } from './tools/AminDemarcationModal';
import { CertifiedDeedOrderModal } from './tools/CertifiedDeedOrderModal';
import { LandAIAssistantModal } from '../ai/LandAIAssistantModal';
import {
  User,
  ShieldCheck,
  AlertCircle,
  CheckCircle2,
  MapPin,
  Search,
  Bookmark,
  GitPullRequest,
  Receipt,
  Map as MapIcon,
  FileCheck2,
  LogOut,
  ExternalLink,
  ArrowRight,
  Info,
  Calendar,
  Layers,
  Bot,
  Calculator,
  Home,
  Compass,
  Sparkles,
  PhoneCall,
  FolderLock,
  Printer,
  ChevronRight
} from 'lucide-react';

interface CitizenDashboardProps {
  onNavigateToService: (slug: string) => void;
  onExitToPortal: () => void;
}

type CitizenTab = 'map' | 'digitized' | 'services' | 'ai' | 'locker';

export const CitizenDashboard: React.FC<CitizenDashboardProps> = ({
  onNavigateToService,
  onExitToPortal
}) => {
  const { language, toBnNum } = useLanguage();
  const { currentUser, logout } = useAuth();
  const citizen = currentUser as CitizenUser;

  const [activeTab, setActiveTab] = useState<CitizenTab>('map');
  const [inspectedParcel, setInspectedParcel] = useState<DemoParcel | null>(DEMO_PARCELS[0]);

  // Modal controls for digitized offline-to-online services
  const [showFarayejModal, setShowFarayejModal] = useState<boolean>(false);
  const [showKhasLandModal, setShowKhasLandModal] = useState<boolean>(false);
  const [showVestedModal, setShowVestedModal] = useState<boolean>(false);
  const [showAminModal, setShowAminModal] = useState<boolean>(false);
  const [showDeedOrderModal, setShowDeedOrderModal] = useState<boolean>(false);
  const [showAIModal, setShowAIModal] = useState<boolean>(false);
  const [showAddRecordModal, setShowAddRecordModal] = useState<boolean>(false);
  const [newRecordType, setNewRecordType] = useState('ই-নামজারি খতিয়ান');
  const [newRecordNumber, setNewRecordNumber] = useState('');
  const [newRecordMouza, setNewRecordMouza] = useState('');

  // Saved user records in Citizen Locker
  const [savedRecords, setSavedRecords] = useState([
    {
      id: 'rec-1',
      type: language === 'bn' ? 'ই-নামজারি খতিয়ান' : 'Mutation Khatian',
      number: 'খতিয়ান নং ৫১২',
      mouza: language === 'bn' ? 'কাকরাইল মৌজা, দাগ ৮৯০' : 'Kakrail, Plot 890',
      date: '12 Oct 2025',
      status: language === 'bn' ? 'অনুমোদিত ও রেকর্ডভুক্ত' : 'Approved'
    },
    {
      id: 'rec-2',
      type: language === 'bn' ? 'ভূমি কর দাখিলা (LD Tax)' : 'LD Tax e-Dakhila',
      number: 'দাখিলা নং DH-2026-9921',
      mouza: language === 'bn' ? 'হোল্ডিং নং ৪৫০/ক' : 'Holding 450/A',
      date: '15 Jan 2026',
      status: language === 'bn' ? 'পরিশোধিত (QR ভেরিফাইড)' : 'Paid (QR Verified)'
    }
  ]);

  return (
    <div className="py-8 px-4 sm:px-6 max-w-7xl mx-auto space-y-8 font-['Hind_Siliguri','Inter',sans-serif]">
      {/* 1. Personalized Citizen Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-2xl bg-[#006a4e] text-white flex items-center justify-center font-bold text-2xl shrink-0 shadow-md">
            {citizen?.name?.charAt(0) || 'N'}
          </div>

          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                {language === 'bn' ? `স্বাগতম, ${citizen?.nameBn || citizen?.name}!` : `Welcome, ${citizen?.name}!`}
              </h1>

              {/* NID Verified status badge */}
              <span
                className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full inline-flex items-center gap-1 border ${
                  citizen?.nidStatus === 'VERIFIED'
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                    : 'bg-amber-50 text-amber-800 border-amber-300'
                }`}
              >
                {citizen?.nidStatus === 'VERIFIED' ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{language === 'bn' ? 'এনআইডি পরিচয় যাচাইকৃত' : 'NID Verified'}</span>
                  </>
                ) : (
                  <>
                    <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                    <span>{language === 'bn' ? 'যাচাই প্রক্রিয়াধীন' : 'Pending EC Check'}</span>
                  </>
                )}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-500 font-medium flex items-center gap-2">
              <span>{citizen?.mobile}</span>
              {citizen?.email && <span>• {citizen.email}</span>}
              {citizen?.nid && (
                <span className="font-mono text-slate-400">
                  • NID: {citizen.nid.slice(0, 4)}••••{citizen.nid.slice(-4)}
                </span>
              )}
            </p>
          </div>
        </div>

        {/* Quick Top Actions */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            type="button"
            onClick={() => setShowAIModal(true)}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-700 to-[#006a4e] hover:from-emerald-800 hover:to-emerald-900 text-white text-xs sm:text-sm font-bold flex items-center gap-2 shadow-md cursor-pointer transition-all"
          >
            <Bot className="w-4 h-4 text-amber-300" />
            <span>{language === 'bn' ? 'ভূমি এআই সহায়ক' : 'Ask Land AI'}</span>
          </button>

          <button
            type="button"
            onClick={onExitToPortal}
            className="px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs sm:text-sm font-semibold cursor-pointer"
          >
            {language === 'bn' ? 'মূল পোর্টাল ডিরেক্টরি' : 'Public Directory'}
          </button>

          <button
            type="button"
            onClick={logout}
            className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-semibold flex items-center gap-1.5 cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>{language === 'bn' ? 'লগআউট' : 'Logout'}</span>
          </button>
        </div>
      </div>

      {/* 2. Quick Action Cards for High-Impact Digitized Offline-to-Online Services */}
      <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-950 text-white p-6 rounded-3xl shadow-md space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-base sm:text-lg font-bold flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-300" />
              <span>
                {language === 'bn'
                  ? 'অফলাইন থেকে ডিজিটাইজড নতুন নাগরিক সেবা'
                  : 'Newly Digitized Public Land Services'}
              </span>
            </h2>
            <p className="text-xs text-emerald-200/80 mt-0.5">
              {language === 'bn'
                ? 'পূর্বে ভূমি অফিস ও সাব-রেজিস্ট্রিতে সশরীরে গিয়ে করতে হতো এমন জটিল সেবাগুলো এখন ঘরে বসেই সরাসরি ব্যবহার করুন।'
                : 'Services previously requiring manual visits and clerks now converted to transparent digital self-service tools.'}
            </p>
          </div>

          <span className="text-[11px] font-mono text-amber-300 bg-amber-950/60 px-3 py-1 rounded-xl border border-amber-600/40 self-start sm:self-auto">
            {language === 'bn' ? '৫টি নতুন ডিজিটাল টুল যুক্ত' : '5 New Digital Tools'}
          </span>
        </div>

        {/* 5 Quick Conversion Action Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 pt-1">
          {/* 1. Farayej Calculator */}
          <button
            type="button"
            onClick={() => setShowFarayejModal(true)}
            className="p-3.5 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/15 text-left transition-all cursor-pointer group hover:scale-[1.02]"
          >
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center mb-2 group-hover:bg-emerald-400 group-hover:text-slate-950 transition-colors">
              <Calculator className="w-4 h-4" />
            </div>
            <div className="font-bold text-xs text-white group-hover:text-amber-300 transition-colors">
              {language === 'bn' ? 'ওয়ারিশান ফারায়েজ হিসাব' : 'Farayej Calculator'}
            </div>
            <div className="text-[10px] text-emerald-200/70 mt-1">
              {language === 'bn' ? 'ডিজিটাল অংশ ও শতক বণ্টন' : 'Heirs Share & Decimals'}
            </div>
          </button>

          {/* 2. Khas Land Application */}
          <button
            type="button"
            onClick={() => setShowKhasLandModal(true)}
            className="p-3.5 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/15 text-left transition-all cursor-pointer group hover:scale-[1.02]"
          >
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center mb-2 group-hover:bg-amber-400 group-hover:text-slate-950 transition-colors">
              <Home className="w-4 h-4" />
            </div>
            <div className="font-bold text-xs text-white group-hover:text-amber-300 transition-colors">
              {language === 'bn' ? 'খাস জমি বরাদ্দ আবেদন' : 'Khas Land Petition'}
            </div>
            <div className="text-[10px] text-emerald-200/70 mt-1">
              {language === 'bn' ? 'ভূমিহীন ও নদীভাঙা পরিবার' : 'Landless & Erosion Victims'}
            </div>
          </button>

          {/* 3. Vested Property Search */}
          <button
            type="button"
            onClick={() => setShowVestedModal(true)}
            className="p-3.5 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/15 text-left transition-all cursor-pointer group hover:scale-[1.02]"
          >
            <div className="w-9 h-9 rounded-xl bg-blue-500/20 text-blue-300 flex items-center justify-center mb-2 group-hover:bg-blue-400 group-hover:text-slate-950 transition-colors">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div className="font-bold text-xs text-white group-hover:text-amber-300 transition-colors">
              {language === 'bn' ? 'অর্পিত সম্পত্তি যাচাই' : 'Vested Land Check'}
            </div>
            <div className="text-[10px] text-emerald-200/70 mt-1">
              {language === 'bn' ? 'ক ও খ তফসিল অনুসন্ধান' : 'Ka/Kha Schedule Status'}
            </div>
          </button>

          {/* 4. Amin Demarcation */}
          <button
            type="button"
            onClick={() => setShowAminModal(true)}
            className="p-3.5 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/15 text-left transition-all cursor-pointer group hover:scale-[1.02]"
          >
            <div className="w-9 h-9 rounded-xl bg-purple-500/20 text-purple-300 flex items-center justify-center mb-2 group-hover:bg-purple-400 group-hover:text-slate-950 transition-colors">
              <Compass className="w-4 h-4" />
            </div>
            <div className="font-bold text-xs text-white group-hover:text-amber-300 transition-colors">
              {language === 'bn' ? 'আমিন সীমানা পরিমাপ' : 'Surveyor Demarcation'}
            </div>
            <div className="text-[10px] text-emerald-200/70 mt-1">
              {language === 'bn' ? 'সরকারি আমিন বুকিং ও নোটিশ' : 'AC Land Surveyor Booking'}
            </div>
          </button>

          {/* 5. Certified Deed Order */}
          <button
            type="button"
            onClick={() => setShowDeedOrderModal(true)}
            className="p-3.5 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/15 text-left transition-all cursor-pointer group hover:scale-[1.02]"
          >
            <div className="w-9 h-9 rounded-xl bg-rose-500/20 text-rose-300 flex items-center justify-center mb-2 group-hover:bg-rose-400 group-hover:text-slate-950 transition-colors">
              <FileCheck2 className="w-4 h-4" />
            </div>
            <div className="font-bold text-xs text-white group-hover:text-amber-300 transition-colors">
              {language === 'bn' ? 'দলিলের নকল হোম ডেলিভারি' : 'Deed Copy Delivery'}
            </div>
            <div className="text-[10px] text-emerald-200/70 mt-1">
              {language === 'bn' ? 'সাব-রেজিস্ট্রি থেকে ডাকযোগে' : 'Certified Postal Delivery'}
            </div>
          </button>
        </div>
      </div>

      {/* 3. Citizen Portal Main Tabs Navigation */}
      <div className="flex items-center gap-2 border-b border-slate-200 overflow-x-auto scrollbar-thin pb-1">
        <button
          type="button"
          onClick={() => setActiveTab('map')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-colors cursor-pointer ${
            activeTab === 'map'
              ? 'bg-[#006a4e] text-white shadow-md'
              : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
          }`}
        >
          <MapIcon className="w-4 h-4" />
          <span>{language === 'bn' ? 'ভৌগোলিক মানচিত্র ও ক্যাডাস্ট্রাল প্লট' : 'Geospatial Map & Plots'}</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('digitized')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-colors cursor-pointer ${
            activeTab === 'digitized'
              ? 'bg-[#006a4e] text-white shadow-md'
              : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
          }`}
        >
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>{language === 'bn' ? '৫টি নতুন ডিজিটাইজড সেবা' : '5 Digitized Services'}</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('services')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-colors cursor-pointer ${
            activeTab === 'services'
              ? 'bg-[#006a4e] text-white shadow-md'
              : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>{language === 'bn' ? 'অনলাইন সরকারি সেবা গেটওয়ে' : 'Government Gateways'}</span>
        </button>

        <button
          type="button"
          onClick={() => setShowAIModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-colors cursor-pointer"
        >
          <Bot className="w-4 h-4 text-[#006a4e]" />
          <span>{language === 'bn' ? 'ভূমি এআই সহায়ক প্রশ্ন-উত্তর' : 'Land AI Q&A'}</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('locker')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-colors cursor-pointer ${
            activeTab === 'locker'
              ? 'bg-[#006a4e] text-white shadow-md'
              : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
          }`}
        >
          <FolderLock className="w-4 h-4" />
          <span>{language === 'bn' ? 'আমার ভূমি রেকর্ড ও লকার' : 'Land Records Locker'}</span>
        </button>
      </div>

      {/* 4. Tab 1: Real OpenStreetMap Interactive Bangladesh Cadastral Map */}
      {activeTab === 'map' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <MapIcon className="w-5 h-5 text-[#006a4e]" />
                <span>
                  {language === 'bn'
                    ? 'বাংলাদেশের বাস্তব ওপেনস্ট্রিটম্যাপ ও ক্যাডাস্ট্রাল জরিপ মানচিত্র'
                    : 'Real OpenStreetMap Interactive Bangladesh Cadastral Map'}
                </span>
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                {language === 'bn'
                  ? 'বাস্তব স্যাটেলাইট ও ওপেনস্ট্রিটম্যাপের উপর ৮টি বিভাগ থেকে শুরু করে উপজেলা ও নির্দিষ্ট দাগের সিএস, এসএ এবং আরএস রেকর্ড ড্রিলডাউন করুন।'
                  : 'Drill down from 8 divisions to 64 districts, upazilas, and real cadastral plot boundaries on top of OpenStreetMap & satellite imagery.'}
              </p>
            </div>
          </div>

          {/* Real Leaflet OpenStreetMap Component */}
          <BangladeshInteractiveMap
            onSelectParcel={(p) => setInspectedParcel(p)}
            onNavigateToService={onNavigateToService}
          />
        </div>
      )}

      {/* 5. Tab 2: Digitized Offline-to-Online Tools Suite */}
      {activeTab === 'digitized' && (
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              {language === 'bn'
                ? 'অফলাইন থেকে রূপান্তরিত ৫টি পূর্ণাঙ্গ ডিজিটাল সেবা'
                : '5 Fully Digitized Public Land Administration Tools'}
            </h3>
            <p className="text-xs text-slate-500">
              {language === 'bn'
                ? 'অনলাইনে তাৎক্ষণিক হিসাব, আবেদন ও যাচাই কপি সংগ্রহের জন্য নিচের যে কোনো মডিউল নির্বাচন করুন।'
                : 'Select any module to start digital calculations, official petitions, or instant verified search.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* Tool 1: Farayej */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between hover:border-emerald-500 transition-all">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#006a4e] flex items-center justify-center mb-4">
                  <Calculator className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-slate-900 text-base mb-1">
                  {language === 'bn' ? '১. অনলাইন উত্তরাধিকার ও ফারায়েজ বণ্টন' : '1. Inheritance & Farayej Calculator'}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  {language === 'bn'
                    ? 'মুসলিম ও হিন্দু উত্তরাধিকার আইন অনুযায়ী ওয়ারিশগণের সুনির্দিষ্ট কোরআনিক হিস্যা এবং শতক ও কাঠায় জমি বণ্টনের খসড়া দলিল প্রস্তুত।'
                    : 'Calculate exact fractional shares, percentages, and decimals for legal heirs under succession acts.'}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowFarayejModal(true)}
                className="w-full py-2.5 px-4 rounded-xl bg-[#006a4e] hover:bg-emerald-800 text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                <span>{language === 'bn' ? 'ক্যালকুলেটর চালু করুন' : 'Launch Calculator'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Tool 2: Khas Land */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between hover:border-emerald-500 transition-all">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center mb-4">
                  <Home className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-slate-900 text-base mb-1">
                  {language === 'bn' ? '২. কৃষি খাস জমি বরাদ্দ ডিজিটাল আবেদন' : '2. Digital Khas Land Allocation'}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  {language === 'bn'
                    ? 'নদীভাঙনে ভিটেমাটি হারানো নিঃস্ব পরিবার ও অসচ্ছল মুক্তিযোদ্ধাদের জন্য সর্বোচ্চ ১.৫০ একর সরকারি খাস জমি বরাদ্দের অনলাইন আবেদন ও ট্র্যাকিং।'
                    : 'Submit digital petition for agricultural Khas land allocation under government policy with SMS tracking.'}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowKhasLandModal(true)}
                className="w-full py-2.5 px-4 rounded-xl bg-[#006a4e] hover:bg-emerald-800 text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                <span>{language === 'bn' ? 'অনলাইন আবেদন করুন' : 'Apply Online'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Tool 3: Vested Property */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between hover:border-emerald-500 transition-all">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center mb-4">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-slate-900 text-base mb-1">
                  {language === 'bn' ? '৩. অর্পিত সম্পত্তি গেজেট অনুসন্ধান' : '3. Vested Property Gazette Search'}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  {language === 'bn'
                    ? 'জমি কেনার পূর্বে দাগ নম্বর ও মৌজা দিয়ে অর্পিত সম্পত্তি "ক" বা "খ" তফসিলভুক্ত কি না তা তাৎক্ষণিক যাচাই করে অনাপত্তি সনদ সংগ্রহ।'
                    : 'Instantly check whether a plot is in Vested Property schedules and print clearance summary.'}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowVestedModal(true)}
                className="w-full py-2.5 px-4 rounded-xl bg-[#006a4e] hover:bg-emerald-800 text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                <span>{language === 'bn' ? 'দাগ অনুযায়ী অনুসন্ধান' : 'Search by Dag'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Tool 4: Amin Demarcation */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between hover:border-emerald-500 transition-all">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-700 flex items-center justify-center mb-4">
                  <Compass className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-slate-900 text-base mb-1">
                  {language === 'bn' ? '৪. সরকারি আমিন দ্বারা সীমানা পরিমাপ' : '4. Government Amin Demarcation'}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  {language === 'bn'
                    ? 'সহকারী কমিশনার (ভূমি) এর অনুমোদিত সরকারি সার্ভেয়ার বুকিং, সীমানা পিলার স্থাপন এবং প্রতিবেশীদের আনুষ্ঠানিক নোটিশ জারি।'
                    : 'Book official AC (Land) surveyor for boundary marking, pillar installation, and neighbor notices.'}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowAminModal(true)}
                className="w-full py-2.5 px-4 rounded-xl bg-[#006a4e] hover:bg-emerald-800 text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                <span>{language === 'bn' ? 'আমিন বুকিং ফরম' : 'Book Surveyor'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Tool 5: Deed Copy Postal Order */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between hover:border-emerald-500 transition-all">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-700 flex items-center justify-center mb-4">
                  <FileCheck2 className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-slate-900 text-base mb-1">
                  {language === 'bn' ? '৫. দলিলের জাবেদা নকল হোম ডেলিভারি' : '5. Certified Deed Copy Home Delivery'}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  {language === 'bn'
                    ? 'সাব-রেজিস্ট্রি অফিসের সংরক্ষিত বালাম বই থেকে দলিলের সার্টিফাইড নকলের রিকুইজিশন ও বাংলাদেশ ডাকযোগে সরাসরি ঠিকানায় সরবরাহ।'
                    : 'Order official certified true copies of registered deeds from Sub-Registry delivered via registered post.'}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowDeedOrderModal(true)}
                className="w-full py-2.5 px-4 rounded-xl bg-[#006a4e] hover:bg-emerald-800 text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                <span>{language === 'bn' ? 'নকলের অর্ডার দিন' : 'Order Copy'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 6. Tab 3: Official Government Gateways */}
      {activeTab === 'services' && (
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              {language === 'bn' ? 'যাচাইকৃত সরকারি অনলাইন সেবা গেটওয়েসমূহ' : 'Verified Government Land Portals'}
            </h3>
            <p className="text-xs text-slate-500">
              {language === 'bn'
                ? 'সরাসরি সরকারি পোর্টালে নির্দেশিকা ও ফি তালিকা সহ নিরাপদ প্রবেশ।'
                : 'Direct verified service pathways with official instructions.'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* E-Mutation */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 hover:border-emerald-500 transition-all shadow-2xs flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#006a4e] flex items-center justify-center mb-3">
                  <GitPullRequest className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-slate-900 text-base mb-1">
                  {language === 'bn' ? 'ই-নামজারি আবেদন' : 'E-Mutation Application'}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  {language === 'bn'
                    ? '২৮ কার্যদিবসে ১,১৭০ টাকা সরকারি ফি দিয়ে নামজারি খতিয়ান প্রাপ্তির অফিসিয়াল পোর্টাল।'
                    : 'Update title records and receive certified mutation khatians online (1,170 BDT).'}
                </p>
              </div>
              <button
                type="button"
                onClick={() => onNavigateToService('e-mutation-namjari')}
                className="w-full py-2 px-3 rounded-xl bg-[#006a4e] hover:bg-emerald-800 text-white text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>{language === 'bn' ? 'আবেদন নির্দেশিকা' : 'Apply Online'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Land Development Tax */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 hover:border-emerald-500 transition-all shadow-2xs flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#006a4e] flex items-center justify-center mb-3">
                  <Receipt className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-slate-900 text-base mb-1">
                  {language === 'bn' ? 'ভূমি উন্নয়ন কর (খাজনা)' : 'Land Development Tax'}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  {language === 'bn'
                    ? 'হোল্ডিং এন্ট্রি, ডিজিটাল পেমেন্ট ও কিউআর কোডযুক্ত বৈধ দাখিলা ডাউনলোড।'
                    : 'Holding registration, online tax calculation, digital payment, and e-Dakhila.'}
                </p>
              </div>
              <button
                type="button"
                onClick={() => onNavigateToService('land-development-tax-ldtax')}
                className="w-full py-2 px-3 rounded-xl bg-[#006a4e] hover:bg-emerald-800 text-white text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>{language === 'bn' ? 'কর পরিশোধ করুন' : 'Pay Tax'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Mouza Maps DLRS */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 hover:border-emerald-500 transition-all shadow-2xs flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#006a4e] flex items-center justify-center mb-3">
                  <MapIcon className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-slate-900 text-base mb-1">
                  {language === 'bn' ? 'মৌজা ম্যাপ অর্ডার (DLRS)' : 'Mouza Map Delivery'}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  {language === 'bn'
                    ? 'ডিএলআরএস সংরক্ষিত মুদ্রিত মূল ক্যাডাস্ট্রাল মৌজা নকশা ডাকযোগে গ্রহণের সেবা।'
                    : 'Order original cadastral maps printed by DLRS delivered by post.'}
                </p>
              </div>
              <button
                type="button"
                onClick={() => onNavigateToService('mouza-maps-cadastral-sheets')}
                className="w-full py-2 px-3 rounded-xl bg-[#006a4e] hover:bg-emerald-800 text-white text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>{language === 'bn' ? 'ম্যাপ অর্ডার' : 'Order Sheet'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Deed Registration */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 hover:border-emerald-500 transition-all shadow-2xs flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#006a4e] flex items-center justify-center mb-3">
                  <FileCheck2 className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-slate-900 text-base mb-1">
                  {language === 'bn' ? 'দলিল তল্লাশ ও স্ট্যাম্প শুল্ক' : 'Deed Registration & Fees'}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  {language === 'bn'
                    ? 'সাব-রেজিস্ট্রি অফিসে জমি রেজিস্ট্রেশনের সরকারি স্ট্যাম্প শুল্ক ও দলিলের আদর্শ ফরম।'
                    : 'Calculate statutory stamp duty and access standard deed drafting templates.'}
                </p>
              </div>
              <button
                type="button"
                onClick={() => onNavigateToService('deed-registration-stamp-duty')}
                className="w-full py-2 px-3 rounded-xl bg-[#006a4e] hover:bg-emerald-800 text-white text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>{language === 'bn' ? 'ফি হিসাব করুন' : 'Deed Details'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 7. Tab 4: Citizen Land Records Locker */}
      {activeTab === 'locker' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                {language === 'bn' ? 'আমার ডিজিটাল ভূমি লকার' : 'Citizen Land Records Locker'}
              </h3>
              <p className="text-xs text-slate-500">
                {language === 'bn'
                  ? 'আপনার সকল খতিয়ান, খাজনার দাখিলা এবং দলিল সংক্রান্ত রেকর্ড নিরাপদে সংরক্ষিত রয়েছে।'
                  : 'Encrypted personal repository for certified khatians, tax receipts, and registered deeds.'}
              </p>
            </div>

            <button
              type="button"
              onClick={() => setShowAddRecordModal(true)}
              className="px-4 py-2 rounded-xl bg-[#006a4e] hover:bg-emerald-800 text-white text-xs font-bold cursor-pointer transition-colors shadow-2xs"
            >
              {language === 'bn' ? '+ নতুন রেকর্ড যুক্ত করুন' : '+ Add Record'}
            </button>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-100 text-slate-700 border-b border-slate-200 uppercase font-bold text-[11px]">
                <tr>
                  <th className="p-3.5">{language === 'bn' ? 'রেকর্ডের ধরন' : 'Record Type'}</th>
                  <th className="p-3.5">{language === 'bn' ? 'খতিয়ান / দাখিলা নম্বর' : 'Reference Number'}</th>
                  <th className="p-3.5">{language === 'bn' ? 'মৌজা ও দাগ' : 'Mouza & Plot'}</th>
                  <th className="p-3.5">{language === 'bn' ? 'সংযোজন তারিখ' : 'Date Added'}</th>
                  <th className="p-3.5">{language === 'bn' ? 'স্ট্যাটাস' : 'Status'}</th>
                  <th className="p-3.5 text-right">{language === 'bn' ? 'পদক্ষেপ' : 'Action'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 font-medium text-slate-800">
                {savedRecords.map((r) => (
                  <tr key={r.id} className="hover:bg-slate-50">
                    <td className="p-3.5 font-bold text-[#006a4e] flex items-center gap-1.5">
                      <FileCheck2 className="w-4 h-4 text-[#006a4e]" />
                      <span>{r.type}</span>
                    </td>
                    <td className="p-3.5 font-mono">{r.number}</td>
                    <td className="p-3.5">{r.mouza}</td>
                    <td className="p-3.5 text-slate-500">{r.date}</td>
                    <td className="p-3.5">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                        {r.status}
                      </span>
                    </td>
                    <td className="p-3.5 text-right">
                      <button
                        type="button"
                        onClick={() => window.print()}
                        className="p-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 cursor-pointer"
                        title="Print"
                      >
                        <Printer className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modals for Digitized Offline-to-Online Tools */}
      <FarayejCalculatorModal
        isOpen={showFarayejModal}
        onClose={() => setShowFarayejModal(false)}
      />

      <KhasLandApplicationModal
        isOpen={showKhasLandModal}
        onClose={() => setShowKhasLandModal(false)}
      />

      <VestedPropertySearchModal
        isOpen={showVestedModal}
        onClose={() => setShowVestedModal(false)}
      />

      <AminDemarcationModal
        isOpen={showAminModal}
        onClose={() => setShowAminModal(false)}
      />

      <CertifiedDeedOrderModal
        isOpen={showDeedOrderModal}
        onClose={() => setShowDeedOrderModal(false)}
      />

      {/* Land Sector AI Assistant Modal */}
      <LandAIAssistantModal
        isOpen={showAIModal}
        onClose={() => setShowAIModal(false)}
      />

      {/* Add New Record Modal for Citizen Locker */}
      {showAddRecordModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-md w-full overflow-hidden">
            <div className="p-4 bg-[#006a4e] text-white flex items-center justify-between">
              <h3 className="font-bold text-sm">
                {language === 'bn' ? 'ডিজিটাল লকারে নতুন রেকর্ড সংরক্ষণ' : 'Add Record to Digital Locker'}
              </h3>
              <button
                type="button"
                onClick={() => setShowAddRecordModal(false)}
                className="text-white/80 hover:text-white cursor-pointer"
              >
                ✕
              </button>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!newRecordNumber.trim()) return;
                const newRec = {
                  id: `rec-${Date.now()}`,
                  type: newRecordType,
                  number: newRecordNumber,
                  mouza: newRecordMouza || (language === 'bn' ? 'সেগুনবাগিচা, দাগ ১২০৪' : 'Segunbagicha, Plot 1204'),
                  date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
                  status: language === 'bn' ? 'যাচাইকৃত ও সক্রিয়' : 'Verified & Active'
                };
                setSavedRecords((prev) => [newRec, ...prev]);
                setNewRecordNumber('');
                setNewRecordMouza('');
                setShowAddRecordModal(false);
              }}
              className="p-5 space-y-3 text-xs"
            >
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  {language === 'bn' ? 'রেকর্ডের ধরন' : 'Record Type'}
                </label>
                <select
                  value={newRecordType}
                  onChange={(e) => setNewRecordType(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 text-slate-900 font-medium"
                >
                  <option value="ই-নামজারি খতিয়ান">ই-নামজারি খতিয়ান (Mutation)</option>
                  <option value="ভূমি কর দাখিলা (LD Tax)">ভূমি কর দাখিলা (LD Tax e-Dakhila)</option>
                  <option value="সিএস / এসএ / আরএস খতিয়ান">সিএস / এসএ / আরএস খতিয়ান (CS/SA/RS)</option>
                  <option value="রেজিস্ট্রিকৃত সাব-কবলা দলিল">রেজিস্ট্রিকৃত সাব-কবলা দলিল (Deed)</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  {language === 'bn' ? 'খতিয়ান / দাখিলা / দলিল নম্বর' : 'Reference / Record Number'}
                </label>
                <input
                  type="text"
                  required
                  value={newRecordNumber}
                  onChange={(e) => setNewRecordNumber(e.target.value)}
                  placeholder={language === 'bn' ? 'যেমন: খতিয়ান নং ৭৪২ বা দাখিলা নং ৯৮০১' : 'e.g. Khatian #742 or Receipt #9801'}
                  className="w-full p-2.5 rounded-xl border border-slate-300 text-slate-900 font-medium"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  {language === 'bn' ? 'মৌজা ও দাগ নম্বর' : 'Mouza & Plot / Dag Number'}
                </label>
                <input
                  type="text"
                  value={newRecordMouza}
                  onChange={(e) => setNewRecordMouza(e.target.value)}
                  placeholder={language === 'bn' ? 'যেমন: ধানমন্ডি মৌজা, দাগ নং ৩১২' : 'e.g. Dhanmondi, Dag #312'}
                  className="w-full p-2.5 rounded-xl border border-slate-300 text-slate-900 font-medium"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddRecordModal(false)}
                  className="px-4 py-2 rounded-xl border border-slate-300 text-slate-600 font-bold cursor-pointer hover:bg-slate-50"
                >
                  {language === 'bn' ? 'বাতিল' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#006a4e] text-white font-bold hover:bg-emerald-800 cursor-pointer shadow-2xs"
                >
                  {language === 'bn' ? 'লকারে যোগ করুন' : 'Save to Locker'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
