/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Bangladesh Integrated Land Services Portal (BILSP)
 * Protected Administration & Registry Management Console
 */

import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import {
  LandService,
  AuditLog,
  AvailabilityStatus,
  IntegrationType,
  LinkPurpose
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
  Globe
} from 'lucide-react';

interface AdminPortalProps {
  services: LandService[];
  onRefreshServices: () => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({ services, onRefreshServices }) => {
  const { language, toBnNum } = useLanguage();
  const [activeTab, setActiveTab] = useState<'services' | 'audit' | 'guidelines'>('services');
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
  const [selectedService, setSelectedService] = useState<LandService | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  // Status Change Modal State
  const [statusModalOpen, setStatusModalOpen] = useState(false);
  const [targetServiceForStatus, setTargetServiceForStatus] = useState<LandService | null>(null);
  const [newStatusChoice, setNewStatusChoice] = useState<AvailabilityStatus>('OFFICIAL_URL_VERIFIED');
  const [statusReason, setStatusReason] = useState('');

  // Ping state
  const [pingResult, setPingResult] = useState<string | null>(null);
  const [pinging, setPinging] = useState(false);

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

  const handleTestPing = async (url: string) => {
    setPinging(true);
    setPingResult(null);
    try {
      const res = await apiClient.checkUrlAvailability(url);
      setPingResult(
        res.isReachable
          ? `✅ সচল (HTTP ${res.httpStatusCode || 200}, রেসপন্স টাইম: ${res.responseTimeMs}ms)`
          : `❌ অসচল বা নেটওয়ার্ক সংযোগ ব্যর্থ (${res.errorMessage || 'No response'})`
      );
    } catch {
      setPingResult('❌ পিং ব্যর্থ হয়েছে');
    } finally {
      setPinging(false);
    }
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
                  {services.map((service) => (
                    <tr key={service.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="p-4">
                        <div className="font-bold text-slate-900 text-sm">
                          {language === 'bn' ? service.nameBn : service.nameEn}
                        </div>
                        <div className="text-slate-500 font-mono text-[11px] mt-0.5 truncate max-w-xs">
                          {service.directServiceUrl || service.officialWebsiteUrl}
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
                            onClick={() => handleTestPing(service.directServiceUrl || service.officialWebsiteUrl)}
                            className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-600"
                            title="লাইভ ইউআরএল পিং করুন"
                          >
                            <Radio className="w-3.5 h-3.5 text-emerald-600" />
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
                  ))}
                </tbody>
              </table>
            </div>

            {pingResult && (
              <div className="p-3 bg-slate-100 border-t border-slate-200 text-xs font-medium text-slate-800 flex items-center justify-between">
                <span>{pingResult}</span>
                <button
                  type="button"
                  onClick={() => setPingResult(null)}
                  className="text-slate-500 hover:text-slate-800"
                >
                  <X className="w-4 h-4" />
                </button>
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
