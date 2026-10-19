/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Bangladesh Integrated Land Services Portal (BILSP)
 * Protected Administration & Registry Management Console
 */

import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import {
  LandService,
  AuditLog,
  AvailabilityStatus,
  IntegrationType,
  LinkPurpose,
  ServiceAvailabilityCheck
} from '../types/bilsp';
import { apiClient } from '../services/apiClient';
import {
  ShieldCheck,
  Lock,
  Plus,
  Edit,
  History,
  BookOpen,
  CheckCircle2,
  AlertTriangle,
  Radio,
  ExternalLink,
  Save,
  X,
  FileText,
  Building2,
  Layers,
  Globe,
  Activity,
  Wifi,
  AlertCircle,
  ArrowRight,
  RefreshCw,
  Search
} from 'lucide-react';

interface AdminPortalProps {
  services: LandService[];
  onRefreshServices: () => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({ services, onRefreshServices }) => {
  const { language, toBnNum } = useLanguage();
  const { switchAdminWorkspace } = useAuth();
  const [activeTab, setActiveTab] = useState<'services' | 'audit' | 'guidelines' | 'diagnostics'>('services');
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
  const [selectedService, setSelectedService] = useState<LandService | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  // Status Change Modal State
  const [statusModalOpen, setStatusModalOpen] = useState(false);
  const [targetServiceForStatus, setTargetServiceForStatus] = useState<LandService | null>(null);
  const [newStatusChoice, setNewStatusChoice] = useState<AvailabilityStatus>('OFFICIAL_URL_VERIFIED');
  const [statusReason, setStatusReason] = useState('');

  // Ping & Network Diagnostics State
  const [pingResult, setPingResult] = useState<string | null>(null);
  const [detailedPingResult, setDetailedPingResult] = useState<ServiceAvailabilityCheck | null>(null);
  const [pingingUrl, setPingingUrl] = useState<string | null>(null);
  const [customPingUrl, setCustomPingUrl] = useState('https://mutation.land.gov.bd/');
  const [selectedServiceForPing, setSelectedServiceForPing] = useState<LandService | null>(null);

  useEffect(() => {
    loadAuditLogs();
  }, []);

  const loadAuditLogs = async () => {
    const logs = await apiClient.getAuditLogs();
    setAuditLogs(logs);
  };

  const handleOpenStatusModal = (service: LandService) => {
    setTargetServiceForStatus(service);
    setNewStatusChoice(service.availabilityStatus);
    setStatusReason('');
    setStatusModalOpen(true);
  };

  const handleSaveStatusChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetServiceForStatus) return;

    await apiClient.updateServiceStatus(
      targetServiceForStatus.id,
      newStatusChoice,
      statusReason || 'Scheduled official administrative check',
      'System Admin (ICT Wing)'
    );

    setStatusModalOpen(false);
    await loadAuditLogs();
    onRefreshServices();
  };

  const handleTestPing = async (url: string, service?: LandService) => {
    setPingingUrl(url);
    setPingResult(null);
    setSelectedServiceForPing(service || null);
    try {
      const res = await apiClient.checkUrlAvailability(url);
      setDetailedPingResult(res);
      setPingResult(
        res.isReachable
          ? `✅ সচল (HTTP ${res.httpStatusCode || 200}, রেসপন্স টাইম: ${res.responseTimeMs}ms)`
          : `❌ অসচল / ডাউন (${res.errorMessage || 'নেটওয়ার্ক সংযোগ ব্যর্থ'})`
      );
    } catch {
      const fallbackFail: ServiceAvailabilityCheck = {
        id: `check-${Date.now()}`,
        serviceId: service?.id || '',
        urlChecked: url,
        httpStatusCode: null,
        responseTimeMs: 0,
        isReachable: false,
        checkedAt: new Date().toISOString(),
        errorMessage: 'নেটওয়ার্ক সংযোগ স্থাপন করা যায়নি (Connection Failed / Host Down)'
      };
      setDetailedPingResult(fallbackFail);
      setPingResult('❌ সার্ভার অফলাইন বা নেটওয়ার্ক সংযোগ ব্যর্থ');
    } finally {
      setPingingUrl(null);
    }
  };

  const handleQuickStatusApply = async (serviceId: string, status: AvailabilityStatus, reason: string) => {
    await apiClient.updateServiceStatus(serviceId, status, reason, 'Live Sentinel Ping Monitor');
    await loadAuditLogs();
    onRefreshServices();
  };

  return (
    <div className="py-10 px-4 sm:px-6 max-w-7xl mx-auto space-y-8">
      {/* Top Banner */}
      <div className="border-b border-slate-200 pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-slate-900 uppercase tracking-wider mb-1">
            <Lock className="w-4 h-4 text-emerald-700" />
            <span>
              {language === 'bn'
                ? 'রেজিস্ট্রি ও মেটাডাটা প্রশাসন'
                : 'Central Registry Administration Console'}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            {language === 'bn' ? 'বিআইএলএসপি সেন্ট্রাল রেজিস্ট্রি কনসোল' : 'BILSP Registry Management'}
          </h1>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            {language === 'bn'
              ? 'ভূমি সেবাসমূহ, যাচাইকৃত ইউআরএল, অফিসিয়াল গেজেট রেফারেন্স ও অডিট লগ পরিচালনা প্যানেল।'
              : 'Authorized administration panel for managing services, official URLs, gazettes, and audit logs.'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-900 border border-emerald-300">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
            <span>{language === 'bn' ? 'অ্যাডমিন মোড সক্রিয়' : 'Admin Mode Active'}</span>
          </span>
        </div>
      </div>

      {/* 3 Department Admin Workspaces Launcher */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-[#004d36] text-white p-5 rounded-2xl shadow-sm border border-slate-700 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-amber-300 uppercase tracking-wider">
              <Building2 className="w-4 h-4" />
              <span>{language === 'bn' ? 'সরকারি ৩টি প্রশাসনিক ওয়ার্কস্পেস (সরাসরি প্রবেশ করুন)' : '3 Departmental Admin Workspaces'}</span>
            </div>
            <p className="text-xs text-slate-300 mt-0.5">
              {language === 'bn' ? 'মন্ত্রণালয় ও অধিদপ্তরভিত্তিক ডেডিকেটেড অ্যাডমিন কনসোলে ক্লিক করে সরাসরি প্রবেশ করুন:' : 'Directly enter any departmental workspace:'}
            </p>
          </div>
          <span className="text-[10px] font-mono bg-white/10 px-2.5 py-1 rounded-lg border border-white/20 text-emerald-200">
            RBAC 2.0 Ready
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
          <button
            type="button"
            onClick={() => switchAdminWorkspace('CATEGORY_1_RECORDS_TAX')}
            className="p-3.5 rounded-xl bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-500/40 text-left transition-all cursor-pointer group"
          >
            <div className="font-bold text-xs text-emerald-300 flex items-center justify-between">
              <span>১. রেকর্ড, নামজারি ও কর</span>
              <span className="text-[10px] font-mono bg-emerald-800 px-1.5 py-0.2 rounded text-white">MINLAND</span>
            </div>
            <div className="text-[11px] text-slate-300 mt-1">ই-নামজারি অনুমোদন, শুনানির তারিখ নির্ধারণ ও ভূমি উন্নয়ন কর রেজিস্টার</div>
            <div className="text-[10px] text-emerald-400 font-bold mt-2 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              <span>ওয়ার্কস্পেস খুলুন ➔</span>
            </div>
          </button>

          <button
            type="button"
            onClick={() => switchAdminWorkspace('CATEGORY_2_SURVEY_MAPPING')}
            className="p-3.5 rounded-xl bg-sky-950/80 hover:bg-sky-900 border border-sky-500/40 text-left transition-all cursor-pointer group"
          >
            <div className="font-bold text-xs text-sky-300 flex items-center justify-between">
              <span>২. ভূমি জরিপ ও ম্যাপিং</span>
              <span className="text-[10px] font-mono bg-sky-800 px-1.5 py-0.2 rounded text-white">DLRS</span>
            </div>
            <div className="text-[11px] text-slate-300 mt-1">ক্যাডাস্ট্রাল ম্যাপ ভিউয়ার, মৌজা নকশা সিট ক্যাটালগ ও টপোলজি অডিট</div>
            <div className="text-[10px] text-sky-400 font-bold mt-2 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              <span>ওয়ার্কস্পেস খুলুন ➔</span>
            </div>
          </button>

          <button
            type="button"
            onClick={() => switchAdminWorkspace('CATEGORY_3_DEED_REGISTRATION')}
            className="p-3.5 rounded-xl bg-indigo-950/80 hover:bg-indigo-900 border border-indigo-500/40 text-left transition-all cursor-pointer group"
          >
            <div className="font-bold text-xs text-indigo-300 flex items-center justify-between">
              <span>৩. দলিল রেজিস্ট্রি প্রশাসন</span>
              <span className="text-[10px] font-mono bg-indigo-800 px-1.5 py-0.2 rounded text-white">DOLR</span>
            </div>
            <div className="text-[11px] text-slate-300 mt-1">রেজিস্ট্রিকৃত দলিল বহর, সাব-রেজিস্ট্রি এবং এসিল্যান্ড লিংকেজ</div>
            <div className="text-[10px] text-indigo-400 font-bold mt-2 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              <span>ওয়ার্কস্পেস খুলুন ➔</span>
            </div>
          </button>
        </div>
      </div>

      {/* Admin Tabs */}
      <div className="flex items-center gap-3 border-b border-slate-200 text-xs sm:text-sm font-semibold">
        <button
          type="button"
          onClick={() => setActiveTab('services')}
          className={`pb-3 px-2 border-b-2 transition-colors cursor-pointer flex items-center gap-2 ${
            activeTab === 'services'
              ? 'border-[#006a4e] text-[#006a4e]'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>{language === 'bn' ? 'ভূমি সেবা ও ইউআরএল রেজিস্ট্রি' : 'Services & URL Registry'}</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('audit')}
          className={`pb-3 px-2 border-b-2 transition-colors cursor-pointer flex items-center gap-2 ${
            activeTab === 'audit'
              ? 'border-[#006a4e] text-[#006a4e]'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <History className="w-4 h-4" />
          <span>{language === 'bn' ? 'পরিবর্তন ও অডিট লগ' : 'Change History & Audit Logs'}</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('guidelines')}
          className={`pb-3 px-2 border-b-2 transition-colors cursor-pointer flex items-center gap-2 ${
            activeTab === 'guidelines'
              ? 'border-[#006a4e] text-[#006a4e]'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>{language === 'bn' ? 'ইন্টিগ্রেশন টাইপ ও নতুন পোর্টাল নির্দেশিকা' : 'Integration Standards'}</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('diagnostics')}
          className={`pb-3 px-2 border-b-2 transition-colors cursor-pointer flex items-center gap-2 ${
            activeTab === 'diagnostics'
              ? 'border-[#006a4e] text-[#006a4e]'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Activity className="w-4 h-4 text-emerald-600" />
          <span>{language === 'bn' ? 'লাইভ সাইট পিং ও নেটওয়ার্ক টেস্ট সেন্টার' : 'Live Ping & Network Diagnostics'}</span>
          <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-emerald-100 text-emerald-800 font-bold">
            LIVE
          </span>
        </button>
      </div>

      {/* Tab 1: Services & Links Manager */}
      {activeTab === 'services' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900">
              {language === 'bn'
                ? `তালিকাভুক্ত ডিজিটাল সেবাসমূহ (${toBnNum(services.length)} টি)`
                : `Registered Digital Services (${services.length})`}
            </h2>
            <button
              type="button"
              onClick={() => setActiveTab('diagnostics')}
              className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-lg border border-emerald-200 transition-colors cursor-pointer"
            >
              <Activity className="w-3.5 h-3.5 text-emerald-600" />
              <span>{language === 'bn' ? 'কাস্টম ইউআরএল টেস্ট করুন' : 'Test Custom URL'}</span>
            </button>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100 text-slate-700 font-bold uppercase tracking-wider text-[11px] border-b border-slate-200">
                  <tr>
                    <th className="p-4">{language === 'bn' ? 'সেবার নাম' : 'Service Name'}</th>
                    <th className="p-4">{language === 'bn' ? 'দায়িত্বপ্রাপ্ত কর্তৃপক্ষ' : 'Institution'}</th>
                    <th className="p-4">{language === 'bn' ? 'ইন্টিগ্রেশন টাইপ' : 'Integration Type'}</th>
                    <th className="p-4">{language === 'bn' ? 'বর্তমান স্থিতি' : 'Availability Status'}</th>
                    <th className="p-4">{language === 'bn' ? 'সর্বশেষ যাচাই' : 'Last Verified'}</th>
                    <th className="p-4 text-right">{language === 'bn' ? 'কার্যক্রম' : 'Actions'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {services.map((service) => {
                    const targetUrl = service.directServiceUrl || service.officialWebsiteUrl;
                    const isCurrentlyPinging = pingingUrl === targetUrl;
                    return (
                      <tr key={service.id} className="hover:bg-slate-50/70 transition-colors">
                        <td className="p-4">
                          <div className="font-bold text-slate-900 text-sm">
                            {language === 'bn' ? service.nameBn : service.nameEn}
                          </div>
                          <div className="text-slate-500 font-mono text-[11px] mt-0.5 truncate max-w-xs">
                            {targetUrl}
                          </div>
                        </td>

                        <td className="p-4 font-medium text-slate-700">
                          {service.verificationSource}
                        </td>

                        <td className="p-4">
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-800 border border-slate-200">
                            {service.integrationType}
                          </span>
                        </td>

                        <td className="p-4">
                          <span
                            className={`text-[11px] font-bold px-2.5 py-1 rounded-full inline-flex items-center gap-1 ${
                              service.availabilityStatus === 'SERVICE_PAGE_VERIFIED' ||
                              service.availabilityStatus === 'WEBSITE_REACHABLE' ||
                              service.availabilityStatus === 'OFFICIAL_URL_VERIFIED'
                                ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                                : service.availabilityStatus === 'TEMPORARILY_UNAVAILABLE'
                                  ? 'bg-rose-100 text-rose-800 border border-rose-200'
                                  : 'bg-amber-100 text-amber-800 border border-amber-200'
                            }`}
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${
                                service.availabilityStatus === 'TEMPORARILY_UNAVAILABLE'
                                  ? 'bg-rose-600'
                                  : 'bg-emerald-600'
                              }`}
                            />
                            <span>{service.availabilityStatus}</span>
                          </span>
                        </td>

                        <td className="p-4 text-slate-500 font-mono">
                          {service.lastVerifiedDate}
                        </td>

                        <td className="p-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              type="button"
                              onClick={() => handleTestPing(targetUrl, service)}
                              disabled={Boolean(pingingUrl)}
                              className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                                isCurrentlyPinging
                                  ? 'bg-amber-50 border-amber-300 text-amber-700'
                                  : 'border-slate-200 hover:bg-slate-100 text-slate-600'
                              }`}
                              title="লাইভ ইউআরএল পিং ও স্বাস্থ্য পরীক্ষা"
                            >
                              {isCurrentlyPinging ? (
                                <RefreshCw className="w-3.5 h-3.5 animate-spin text-amber-600" />
                              ) : (
                                <Radio className="w-3.5 h-3.5 text-emerald-600" />
                              )}
                            </button>

                            <button
                              type="button"
                              onClick={() => handleOpenStatusModal(service)}
                              className="px-2.5 py-1 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-semibold cursor-pointer"
                            >
                              {language === 'bn' ? 'স্থিতি পরিবর্তন' : 'Status'}
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Rich Detailed Ping Result Banner */}
            {detailedPingResult && (
              <div className={`p-4 border-t text-xs ${
                detailedPingResult.isReachable
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                  : 'bg-rose-50 border-rose-200 text-rose-950'
              }`}>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className={`w-2.5 h-2.5 rounded-full ${detailedPingResult.isReachable ? 'bg-emerald-600' : 'bg-rose-600'}`} />
                      <strong className="font-bold text-sm">
                        {detailedPingResult.isReachable
                          ? (language === 'bn' ? '✅ সাইটটি সচল ও দ্রুত সাড়া দিচ্ছে (Online)' : '✅ Host Reachable & Online')
                          : (language === 'bn' ? '❌ সাইটটি বর্তমানে ডাউন বা অফলাইন (Down / Offline)' : '❌ Host Down or Offline')}
                      </strong>
                      <span className="font-mono text-[11px] px-2 py-0.5 rounded-sm bg-white/80 border border-slate-300 text-slate-800">
                        {detailedPingResult.httpStatusCode ? `HTTP ${detailedPingResult.httpStatusCode}` : 'NO_HTTP_RESPONSE'} • {detailedPingResult.responseTimeMs}ms
                      </span>
                    </div>

                    <p className="font-mono text-[11px] text-slate-600">
                      <strong>Target:</strong> {detailedPingResult.urlChecked}
                    </p>

                    {detailedPingResult.errorMessage && (
                      <p className="text-rose-700 font-semibold bg-rose-100/60 p-2 rounded-lg border border-rose-200">
                        <strong>শনাক্তকৃত কারণ:</strong> {detailedPingResult.errorMessage}
                      </p>
                    )}
                  </div>

                  {/* 1-Click Status Sync for Selected Service */}
                  <div className="flex items-center gap-2 shrink-0">
                    {selectedServiceForPing && (
                      <>
                        {!detailedPingResult.isReachable ? (
                          <button
                            type="button"
                            onClick={() => handleQuickStatusApply(
                              selectedServiceForPing.id,
                              'TEMPORARILY_UNAVAILABLE',
                              `Live Sentinel ping detected host down: ${detailedPingResult.errorMessage || 'HTTP error'}`
                            )}
                            className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-xs cursor-pointer"
                          >
                            {language === 'bn' ? 'এই সেবা "সাময়িক বন্ধ" মার্ক করুন' : 'Mark as Unavailable'}
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => handleQuickStatusApply(
                              selectedServiceForPing.id,
                              'SERVICE_PAGE_VERIFIED',
                              `Live Sentinel ping verified host active (${detailedPingResult.responseTimeMs}ms, HTTP ${detailedPingResult.httpStatusCode || 200})`
                            )}
                            className="px-3 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-xs cursor-pointer"
                          >
                            {language === 'bn' ? 'এই সেবা "সচল" নিশ্চিত করুন' : 'Confirm Active'}
                          </button>
                        )}
                      </>
                    )}

                    <button
                      type="button"
                      onClick={() => {
                        setDetailedPingResult(null);
                        setPingResult(null);
                        setSelectedServiceForPing(null);
                      }}
                      className="p-1 rounded-md text-slate-500 hover:text-slate-800 hover:bg-white/60 cursor-pointer"
                      title="Close"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab 2: Change History & Audit Logs */}
      {activeTab === 'audit' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900">
              {language === 'bn' ? 'রেজিস্ট্রি পরিবর্তন ও যাচাইকরণ লগ' : 'Registry Audit Trail'}
            </h2>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 divide-y divide-slate-100 shadow-xs">
            {auditLogs.map((log) => (
              <div key={log.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        log.action === 'VERIFY'
                          ? 'bg-emerald-100 text-emerald-800'
                          : log.action === 'STATUS_CHANGE'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-blue-100 text-blue-800'
                      }`}
                    >
                      {log.action}
                    </span>
                    <strong className="text-sm font-bold text-slate-900">{log.targetName}</strong>
                  </div>
                  <p className="text-xs text-slate-600">{log.details}</p>
                </div>

                <div className="text-right text-xs text-slate-400 shrink-0">
                  <div className="font-semibold text-slate-600">{log.performedBy}</div>
                  <div className="font-mono mt-0.5">{new Date(log.timestamp).toLocaleString()}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Integration Standards & Guidelines */}
      {activeTab === 'guidelines' && (
        <div className="space-y-6 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 text-slate-700 text-xs sm:text-sm">
          <div className="border-b border-slate-200 pb-4">
            <h2 className="text-xl font-bold text-slate-900 mb-1">
              {language === 'bn'
                ? 'ইন্টিগ্রেশন টাইপ মানদণ্ড ও নতুন পোর্টাল সংযোজন পদ্ধতি'
                : 'Integration Standards & Onboarding Verified Portals'}
            </h2>
            <p className="text-xs text-slate-500">
              {language === 'bn'
                ? 'সরকারি সেবা সংযোজনের কারিগরি ও আইনি নির্দেশিকা'
                : 'Technical and governance guidelines for integrating Bangladesh public land portals.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                Type 1 — Verified External Link
              </span>
              <p className="text-xs text-slate-600">
                The service is available through an existing official website. BILSP displays
                authoritative instructions, checklist, official fees, and opens the official service.
                No direct backend database connection is claimed.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="text-xs font-bold text-blue-800 bg-blue-100 px-2 py-0.5 rounded-full">
                Type 2 — Official Information Integration
              </span>
              <p className="text-xs text-slate-600">
                BILSP displays public information obtained through a permitted official API, authorized
                feed, or published gazette (e.g. Land Development Tax Act 2023 fees, Land Crime Act).
                Shows source and last-updated time.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="text-xs font-bold text-purple-800 bg-purple-100 px-2 py-0.5 rounded-full">
                Type 3 — Authorized Transactional Integration
              </span>
              <p className="text-xs text-slate-600">
                BILSP submits requests or retrieves application status through an officially authorized
                API under formal Memorandum of Understanding (MoU). Requires mTLS/OAuth2 token auth.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="text-xs font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full">
                Type 4 — Demonstration or Planned Integration
              </span>
              <p className="text-xs text-slate-600">
                The service is awaiting ministerial technical clearance or uses development sandbox.
                Clearly labeled so citizens are never misled.
              </p>
            </div>
          </div>

          {/* Verification Protocol Rules */}
          <div className="p-5 rounded-xl bg-emerald-50 border border-emerald-200 space-y-3">
            <h3 className="font-bold text-emerald-950 text-sm flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-700" />
              <span>
                {language === 'bn'
                  ? 'নতুন সরকারি ডোমেইন যাচাইয়ের কঠোর নীতিমালার ধাপসমূহ'
                  : 'Mandatory Standards for Registering Government Portals'}
              </span>
            </h3>
            <ol className="list-decimal list-inside space-y-1.5 text-xs text-emerald-900 leading-relaxed">
              <li>
                <strong>ডোমেইন বৈধতা:</strong> ডোমেইনটি অবশ্যই <code>.gov.bd</code> বা{' '}
                <code>bangladesh.gov.bd</code> অধিভুক্ত হতে হবে।
              </li>
              <li>
                <strong>এসএসআরএফ (SSRF) সুরক্ষা:</strong> সার্ভার থেকে কখনোই অনির্দিষ্ট বা বহিরাগত
                আইপি/ডোমেইনে রিকোয়েস্ট পাঠানো যাবে না।
              </li>
              <li>
                <strong>সরাসরি ফি যাচাই:</strong> ভূমি মন্ত্রণালয় বা আইন মন্ত্রণালয়ের গেজেট ব্যতিরেকে কোনো
                কাল্পনিক বা আনুমানিক সরকারি ফি উল্লেখ করা সম্পূর্ণ নিষিদ্ধ।
              </li>
              <li>
                <strong>স্বচ্ছ স্ট্যাটাস প্রকাশ:</strong> কোনো সার্ভিস সাময়িক ডাউন থাকলে সততার সাথে{' '}
                <em>"সাময়িকভাবে অনুপলব্ধ"</em> প্রদর্শন করতে হবে; কোনো কৃত্রিম বা মিথ্যা সবুজ নির্দেশক
                দেখানো যাবে না।
              </li>
            </ol>
          </div>
        </div>
      )}

      {/* Tab 4: Live Ping & Network Diagnostics Center */}
      {activeTab === 'diagnostics' && (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-slate-900 to-[#004d36] text-white p-6 rounded-2xl shadow-md border border-slate-700">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Activity className="w-5 h-5 text-emerald-400 animate-pulse" />
                  <span className="text-xs uppercase font-extrabold tracking-widest text-emerald-300">
                    SENTINEL MONITORING ENGINE
                  </span>
                </div>
                <h2 className="text-xl font-black">
                  {language === 'bn'
                    ? 'লাইভ সাইট পিং ও নেটওয়ার্ক টেস্ট সেন্টার'
                    : 'Live URL Ping & Host Diagnostics Center'}
                </h2>
                <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
                  {language === 'bn'
                    ? 'যেকোনো সরকারি বা বহিরাগত সার্ভারের রিয়েল-টাইম সংযোগ স্থিতি, ডাউন সাইট ডিটেকশন (HTTP 503, 502, 500, 404, DNS ফেইলিয়র বা টাইমআউট) ও রেসপন্স ল্যাটেন্সি পরীক্ষা করুন।'
                    : 'Test real-time connectivity, down site detection (HTTP 503, 502, 500, 404, DNS failure or timeout) and response latency for any public URL.'}
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-xs p-3 rounded-xl border border-white/20 text-right shrink-0">
                <div className="text-[11px] text-emerald-200 uppercase font-semibold">সেন্টিনেল সংস্করণ</div>
                <div className="text-lg font-mono font-bold text-white">v2.5 Sentinel</div>
                <div className="text-[10px] text-emerald-300">IPv4-First • Deep Cause Tracing</div>
              </div>
            </div>
          </div>

          {/* Test Console Input Form */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Wifi className="w-4 h-4 text-emerald-600" />
                <span>{language === 'bn' ? 'ইউআরএল পিং পরীক্ষা ও ডাউন সাইট ডিটেকশন' : 'Run Live URL Ping & Down Detection'}</span>
              </h3>
              <span className="text-[11px] text-slate-500 font-semibold">
                {language === 'bn' ? 'ডাউন সাইট, এইচটিটিপি ত্রুটি (503/500/404) ও ডিএনএস ফেইলিয়র শতভাগ নির্ভুলভাবে শনাক্ত করে' : 'Accurately detects HTTP 503/500/404, DNS errors & server timeouts'}
              </span>
            </div>

            {/* Service dropdown picker */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 block">
                {language === 'bn' ? 'তালিকাভুক্ত সরকারি সেবা নির্বাচন করুন (ওয়ান-ক্লিক যাচাই):' : 'Select Registered Service to Audit:'}
              </label>
              <select
                value={selectedServiceForPing?.id || ''}
                onChange={(e) => {
                  const s = services.find((x) => x.id === e.target.value);
                  if (s) {
                    const url = s.directServiceUrl || s.officialWebsiteUrl;
                    setCustomPingUrl(url);
                    setSelectedServiceForPing(s);
                  }
                }}
                className="w-full p-2.5 rounded-xl border border-slate-300 text-xs font-semibold text-slate-900 bg-slate-50"
              >
                <option value="">-- পোর্টালভুক্ত ১৩টি ডিজিটাল সেবার মধ্য থেকে নির্বাচন করুন --</option>
                {services.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.nameBn} • [{s.availabilityStatus}] • {s.directServiceUrl || s.officialWebsiteUrl}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-2">
              <div className="relative flex-1 w-full">
                <Globe className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                <input
                  type="text"
                  value={customPingUrl}
                  onChange={(e) => {
                    setCustomPingUrl(e.target.value);
                    const matched = services.find(
                      (s) => s.directServiceUrl === e.target.value || s.officialWebsiteUrl === e.target.value
                    );
                    setSelectedServiceForPing(matched || null);
                  }}
                  placeholder="https://mutation.land.gov.bd অথবা যে কোনো সাইটের ঠিকানা..."
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm font-mono focus:outline-hidden focus:ring-2 focus:ring-[#006a4e] focus:border-transparent text-slate-900"
                />
              </div>

              <button
                type="button"
                onClick={() => handleTestPing(customPingUrl, selectedServiceForPing || undefined)}
                disabled={Boolean(pingingUrl)}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#006a4e] hover:bg-emerald-800 text-white font-bold text-sm shadow-xs transition-all cursor-pointer disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {pingingUrl ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-white" />
                    <span>{language === 'bn' ? 'যাচাই হচ্ছে...' : 'Pinging...'}</span>
                  </>
                ) : (
                  <>
                    <Activity className="w-4 h-4 text-amber-300" />
                    <span>{language === 'bn' ? 'পিং টেস্ট চালান' : 'Ping Test'}</span>
                  </>
                )}
              </button>
            </div>

            {/* Quick Simulation Presets */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <span className="text-xs font-bold text-slate-600 uppercase tracking-wider block">
                {language === 'bn' ? 'এক ক্লিকে লাইভ ও ডাউন সাইট টেস্ট প্রিসেট:' : 'Quick Diagnostic Presets:'}
              </span>
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setCustomPingUrl('https://mutation.land.gov.bd/');
                    const s = services.find((x) => x.id === 'srv-e-mutation');
                    handleTestPing('https://mutation.land.gov.bd/', s);
                  }}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100 transition-colors cursor-pointer"
                >
                  🟢 ই-নামজারি (mutation.land.gov.bd)
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setCustomPingUrl('https://minland.gov.bd/');
                    handleTestPing('https://minland.gov.bd/');
                  }}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100 transition-colors cursor-pointer"
                >
                  🟢 ভূমি মন্ত্রণালয় (minland.gov.bd)
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setCustomPingUrl('/api/mock-ping/503');
                    handleTestPing('/api/mock-ping/503');
                  }}
                  className="px-3 py-1.5 rounded-lg text-xs font-bold bg-rose-50 text-rose-800 border border-rose-300 hover:bg-rose-100 transition-colors cursor-pointer"
                >
                  🔴 ডাউন সাইট সিমুলেশন (HTTP 503 Service Unavailable)
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setCustomPingUrl('/api/mock-ping/500');
                    handleTestPing('/api/mock-ping/500');
                  }}
                  className="px-3 py-1.5 rounded-lg text-xs font-bold bg-rose-50 text-rose-800 border border-rose-300 hover:bg-rose-100 transition-colors cursor-pointer"
                >
                  🔴 সার্ভার ক্র্যাশ সিমুলেশন (HTTP 500 Internal Error)
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setCustomPingUrl('/api/mock-ping/404');
                    handleTestPing('/api/mock-ping/404');
                  }}
                  className="px-3 py-1.5 rounded-lg text-xs font-bold bg-rose-50 text-rose-800 border border-rose-300 hover:bg-rose-100 transition-colors cursor-pointer"
                >
                  🔴 অস্তিত্বহীন পাতা সিমুলেশন (HTTP 404 Not Found)
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setCustomPingUrl('https://nonexistent-down-test-123456.gov.bd');
                    handleTestPing('https://nonexistent-down-test-123456.gov.bd');
                  }}
                  className="px-3 py-1.5 rounded-lg text-xs font-bold bg-rose-50 text-rose-800 border border-rose-300 hover:bg-rose-100 transition-colors cursor-pointer"
                >
                  🔴 ডিএনএস ফেইলিয়র সিমুলেশন (DNS Lookup Failed)
                </button>
              </div>
            </div>
          </div>

          {/* Diagnostic Result Card */}
          {detailedPingResult && (
            <div
              className={`p-6 rounded-2xl border shadow-sm space-y-4 ${
                detailedPingResult.isReachable
                  ? 'bg-emerald-50/70 border-emerald-300'
                  : 'bg-rose-50/90 border-rose-400 ring-2 ring-rose-200'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b pb-4 border-slate-200/60">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${
                      detailedPingResult.isReachable
                        ? 'bg-emerald-600 text-white shadow-md'
                        : 'bg-rose-600 text-white shadow-md animate-pulse'
                    }`}
                  >
                    {detailedPingResult.isReachable ? (
                      <CheckCircle2 className="w-6 h-6" />
                    ) : (
                      <AlertTriangle className="w-6 h-6" />
                    )}
                  </div>

                  <div>
                    <h4 className="text-base font-black text-slate-900">
                      {detailedPingResult.isReachable
                        ? (language === 'bn' ? 'সার্ভার সচল ও দ্রুত সাড়া দিচ্ছে (Online & Healthy)' : 'Host Accessible & Online')
                        : (language === 'bn' ? 'সার্ভার অফলাইন / ডাউন বা ক্র্যাশ করেছে (Down / Offline)' : 'Host Down or Unreachable')}
                    </h4>
                    <p className="font-mono text-xs text-slate-600">
                      Target: {detailedPingResult.urlChecked}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`px-3 py-1.5 rounded-lg font-mono font-extrabold text-xs ${
                      detailedPingResult.isReachable
                        ? 'bg-emerald-200 text-emerald-950'
                        : 'bg-rose-600 text-white'
                    }`}
                  >
                    {detailedPingResult.httpStatusCode
                      ? `HTTP ${detailedPingResult.httpStatusCode}`
                      : 'NO_RESPONSE'}
                  </span>
                  <span className="px-3 py-1.5 rounded-lg font-mono font-bold text-xs bg-slate-200 text-slate-800">
                    {detailedPingResult.responseTimeMs} ms
                  </span>
                </div>
              </div>

              {/* Diagnosis Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                    {language === 'bn' ? 'বিশ্লেষণ ও ডায়াগনস্টিক রিপোর্ট' : 'Analysis Report'}
                  </span>
                  <p className={`font-bold ${detailedPingResult.isReachable ? 'text-emerald-900' : 'text-rose-900'}`}>
                    {detailedPingResult.isReachable
                      ? (language === 'bn'
                          ? `সাইটটি সফলভাবে HTTP ${detailedPingResult.httpStatusCode || 200} রেসপন্স পাঠিয়েছে। কোনো নেটওয়ার্ক বিলম্ব বা ব্লকেড নেই।`
                          : `Successfully connected with HTTP ${detailedPingResult.httpStatusCode || 200}. Normal response latency.`)
                      : (detailedPingResult.errorMessage || 'সংযোগ স্থাপন ব্যর্থ হয়েছে।')}
                  </p>
                </div>

                <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                    {language === 'bn' ? 'যাচাইয়ের সময়কাল ও সেন্টিনেল আইডি' : 'Timestamp & Check ID'}
                  </span>
                  <p className="font-mono text-slate-700">
                    {detailedPingResult.checkedAt}
                  </p>
                  <p className="font-mono text-[10px] text-slate-400">
                    ID: {detailedPingResult.id}
                  </p>
                </div>
              </div>

              {/* Quick Action Bar to Mark Status */}
              <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-slate-200">
                <div className="text-xs font-semibold text-slate-700">
                  {selectedServiceForPing ? (
                    <span>
                      চিহ্নিত সেবা: <strong>{selectedServiceForPing.nameBn}</strong> (বর্তমান স্থিতি: {selectedServiceForPing.availabilityStatus})
                    </span>
                  ) : (
                    <span>এই টেস্ট ফলাফলের ভিত্তিতে সেবার স্ট্যাটাস হালনাগাদ করতে সেবা বেছে নিন</span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  {selectedServiceForPing && (
                    <>
                      {!detailedPingResult.isReachable ? (
                        <button
                          type="button"
                          onClick={() => handleQuickStatusApply(
                            selectedServiceForPing.id,
                            'TEMPORARILY_UNAVAILABLE',
                            `Live Sentinel ping detected host down: ${detailedPingResult.errorMessage || 'HTTP down error'}`
                          )}
                          className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-xs cursor-pointer flex items-center gap-1.5"
                        >
                          <AlertTriangle className="w-3.5 h-3.5" />
                          <span>{language === 'bn' ? 'এই সেবা "সাময়িক বন্ধ" হিসেবে মার্ক করুন' : 'Mark as Temporarily Unavailable'}</span>
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleQuickStatusApply(
                            selectedServiceForPing.id,
                            'SERVICE_PAGE_VERIFIED',
                            `Live Sentinel ping verified host active (${detailedPingResult.responseTimeMs}ms, HTTP ${detailedPingResult.httpStatusCode || 200})`
                          )}
                          className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-xs cursor-pointer flex items-center gap-1.5"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>{language === 'bn' ? 'এই সেবা "সচল" নিশ্চিত করুন' : 'Confirm Active & Verified'}</span>
                        </button>
                      )}
                    </>
                  )}

                  <button
                    type="button"
                    onClick={() => {
                      setDetailedPingResult(null);
                      setPingResult(null);
                      setSelectedServiceForPing(null);
                    }}
                    className="px-3 py-2 rounded-xl border border-slate-300 hover:bg-white text-slate-700 font-semibold text-xs cursor-pointer"
                  >
                    {language === 'bn' ? 'বন্ধ করুন' : 'Dismiss'}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Quick Registry Services Test Grid */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900 flex items-center justify-between">
              <span>{language === 'bn' ? 'সকল তালিকাভুক্ত সরকারি সেবার ওয়ান-ক্লিক পিং পরীক্ষা' : 'One-Click Test All Registered Services'}</span>
              <span className="text-xs font-mono text-slate-500">{services.length} services</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {services.map((s) => {
                const target = s.directServiceUrl || s.officialWebsiteUrl;
                const isThisPinging = pingingUrl === target;
                return (
                  <div
                    key={s.id}
                    className="p-3.5 rounded-xl border border-slate-200 hover:border-slate-300 bg-slate-50/50 flex flex-col justify-between gap-3 text-xs"
                  >
                    <div>
                      <div className="font-bold text-slate-900 line-clamp-1">
                        {language === 'bn' ? s.nameBn : s.nameEn}
                      </div>
                      <div className="font-mono text-[11px] text-slate-500 truncate mt-0.5">
                        {target}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-200/60">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        s.availabilityStatus === 'TEMPORARILY_UNAVAILABLE'
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}>
                        {s.availabilityStatus}
                      </span>

                      <button
                        type="button"
                        onClick={() => {
                          setCustomPingUrl(target);
                          handleTestPing(target, s);
                        }}
                        disabled={Boolean(pingingUrl)}
                        className="px-2.5 py-1 rounded-lg bg-white border border-slate-300 hover:bg-slate-100 text-slate-800 font-bold text-[11px] cursor-pointer flex items-center gap-1 shadow-2xs"
                      >
                        {isThisPinging ? (
                          <RefreshCw className="w-3 h-3 animate-spin text-emerald-700" />
                        ) : (
                          <Radio className="w-3 h-3 text-emerald-600" />
                        )}
                        <span>{language === 'bn' ? 'পিং করুন' : 'Ping'}</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Status Change Modal */}
      {statusModalOpen && targetServiceForStatus && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 max-w-md w-full p-6 text-xs">
            <h3 className="text-base font-bold text-slate-900 mb-1">
              {language === 'bn' ? 'সেবার স্থিতি ও ভেরিফিকেশন হালনাগাদ' : 'Update Service Availability Status'}
            </h3>
            <p className="text-slate-500 mb-4 font-semibold">
              {language === 'bn' ? targetServiceForStatus.nameBn : targetServiceForStatus.nameEn}
            </p>

            <form onSubmit={handleSaveStatusChange} className="space-y-4">
              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  {language === 'bn' ? 'নতুন স্থিতি নির্বাচন করুন:' : 'Select New Status:'}
                </label>
                <select
                  value={newStatusChoice}
                  onChange={(e) => setNewStatusChoice(e.target.value as AvailabilityStatus)}
                  className="w-full p-2.5 rounded-lg border border-slate-300 text-slate-900 font-medium"
                >
                  <option value="OFFICIAL_URL_VERIFIED">OFFICIAL_URL_VERIFIED</option>
                  <option value="WEBSITE_REACHABLE">WEBSITE_REACHABLE</option>
                  <option value="SERVICE_PAGE_VERIFIED">SERVICE_PAGE_VERIFIED</option>
                  <option value="API_CONNECTED">API_CONNECTED</option>
                  <option value="TEMPORARILY_UNAVAILABLE">TEMPORARILY_UNAVAILABLE</option>
                  <option value="VERIFICATION_REQUIRED">VERIFICATION_REQUIRED</option>
                  <option value="DEPRECATED_OR_REPLACED">DEPRECATED_OR_REPLACED</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  {language === 'bn' ? 'স্থিতি পরিবর্তনের কারণ ও অডিট নোট:' : 'Reason / Audit Note:'}
                </label>
                <textarea
                  rows={3}
                  required
                  value={statusReason}
                  onChange={(e) => setStatusReason(e.target.value)}
                  placeholder="e.g. Scheduled ministerial maintenance or portal endpoint migration."
                  className="w-full p-2.5 rounded-lg border border-slate-300 text-slate-900"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setStatusModalOpen(false)}
                  className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 font-semibold"
                >
                  {language === 'bn' ? 'বাতিল' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-[#006a4e] hover:bg-emerald-800 text-white font-semibold cursor-pointer"
                >
                  {language === 'bn' ? 'আপডেট করুন' : 'Save Status'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
