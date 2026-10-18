/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Bangladesh Integrated Land Services Portal (BILSP)
 * Citizen My Desk: Bookmarked Services & User-Entered Application Reference Notepad
 */

import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { LandService, CitizenApplicationNote } from '../types/bilsp';
import { apiClient } from '../services/apiClient';
import {
  Bookmark,
  Plus,
  Trash2,
  ExternalLink,
  ShieldAlert,
  Info,
  Calendar,
  FileText,
  AlertCircle,
  Clock,
  ArrowRight
} from 'lucide-react';

interface CitizenMyDeskProps {
  services: LandService[];
  savedServiceIds: string[];
  onToggleSave: (serviceId: string) => void;
  onSelectService: (service: LandService) => void;
  onLaunchExternal: (service: LandService) => void;
}

export const CitizenMyDesk: React.FC<CitizenMyDeskProps> = ({
  services,
  savedServiceIds,
  onToggleSave,
  onSelectService,
  onLaunchExternal,
}) => {
  const { language, t, toBnNum } = useLanguage();
  const [notes, setNotes] = useState<CitizenApplicationNote[]>(() => apiClient.getCitizenNotes());
  const [showAddModal, setShowAddModal] = useState(false);

  // Form State
  const [formServiceId, setFormServiceId] = useState<string>(services[0]?.id || '');
  const [formTrackingNumber, setFormTrackingNumber] = useState('');
  const [formSubmissionDate, setFormSubmissionDate] = useState(new Date().toISOString().split('T')[0]);
  const [formNotes, setFormNotes] = useState('');

  const savedServices = services.filter((s) => savedServiceIds.includes(s.id));

  const handleCreateNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTrackingNumber.trim()) return;

    apiClient.saveCitizenNote({
      serviceId: formServiceId,
      trackingNumber: formTrackingNumber,
      submissionDate: formSubmissionDate,
      personalNotes: formNotes,
    });

    setNotes(apiClient.getCitizenNotes());
    setFormTrackingNumber('');
    setFormNotes('');
    setShowAddModal(false);
  };

  const handleDeleteNote = (id: string) => {
    apiClient.deleteCitizenNote(id);
    setNotes(apiClient.getCitizenNotes());
  };

  return (
    <div className="py-10 px-4 sm:px-6 max-w-7xl mx-auto space-y-10">
      {/* Title & Banner */}
      <div className="border-b border-slate-200 pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#006a4e] uppercase tracking-wider mb-1">
            <Bookmark className="w-4 h-4 text-amber-500 fill-amber-500" />
            <span>{language === 'bn' ? 'ব্যক্তিগত নাগরিক ডেস্ক' : 'Citizen Personal Workspace'}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            {language === 'bn' ? 'আমার সংরক্ষিত সেবা ও আবেদন নোট' : 'My Saved Services & Reference Notes'}
          </h1>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            {language === 'bn'
              ? 'আপনার প্রয়োজনীয় সেবা সংরক্ষণ করুন এবং সরকারি পোর্টালে দাখিলকৃত আবেদনের ট্র্যাকিং নম্বর নিজের সুবিধার্থে টুকে রাখুন।'
              : 'Bookmark key services and manually keep track of your external government application reference numbers.'}
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowAddModal(true)}
          className="self-start md:self-auto px-4 py-2.5 rounded-xl bg-[#006a4e] hover:bg-emerald-800 text-white text-xs sm:text-sm font-semibold flex items-center gap-2 shadow-xs cursor-pointer transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>{language === 'bn' ? 'নতুন ট্র্যাকিং রেফারেন্স নোট যোগ করুন' : 'Add Application Reference'}</span>
        </button>
      </div>

      {/* Mandatory Statutory Notice */}
      <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 flex items-start gap-3 text-xs text-amber-900">
        <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <strong className="font-bold text-sm block">
            {language === 'bn'
              ? 'আইনি ও স্বচ্ছতা ডিসক্লেইমার (Important Notice)'
              : 'Statutory Transparency Disclaimer'}
          </strong>
          <p className="leading-relaxed">
            {language === 'bn'
              ? 'এই নোটপ্যাডে প্রদর্শিত যেকোনো ট্র্যাকিং নম্বর শুধুমাত্র নাগরিকের নিজ হাতে লিখিত ব্যক্তিগত স্মারক (User-provided reference)। বিআইএলএসপি কখনোই এই আবেদনসমূহ সরাসরি যাচাই করার বা সরকারি ডেটাবেজের সাথে গোপনীয় তথ্য সিঙ্ক করার অননুমোদিত দাবি করে না। আবেদনের প্রকৃত নিষ্পত্তি জানতে অনুগ্রহ করে সংশ্লিষ্ট সরকারি পোর্টালের ট্র্যাকিং লিংকে প্রবেশ করুন।'
              : 'Application reference numbers listed here are recorded solely by you for your personal convenience. BILSP does not claim to verify, synchronize, or modify official government case records without an authorized transactional API integration. Always verify actual case status on the official portal.'}
          </p>
        </div>
      </div>

      {/* Section 1: Bookmarked Services */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <span>{language === 'bn' ? 'সংরক্ষিত সেবাসমূহ' : 'Bookmarked Services'}</span>
            <span className="text-xs bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-full font-bold">
              {toBnNum(savedServices.length)}
            </span>
          </h2>
        </div>

        {savedServices.length === 0 ? (
          <div className="p-8 rounded-2xl border-2 border-dashed border-slate-200 text-center bg-slate-50">
            <Bookmark className="w-8 h-8 text-slate-300 mx-auto mb-2" />
            <p className="text-sm text-slate-600 font-medium">
              {language === 'bn'
                ? 'আপনি এখনও কোনো সেবা সংরক্ষণ করেননি।'
                : 'You have not saved any services yet.'}
            </p>
            <p className="text-xs text-slate-400 mt-1">
              {language === 'bn'
                ? 'যেকোনো সেবা কার্ডের বুকমার্ক আইকনে ক্লিক করে এখানে দ্রুত প্রবেশের জন্য রেখে দিতে পারেন।'
                : 'Click the bookmark icon on any service card to quickly access it here.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {savedServices.map((service) => (
              <div
                key={service.id}
                className="bg-white rounded-xl border border-slate-200 p-5 flex flex-col justify-between hover:border-emerald-500 transition-colors shadow-xs"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      {language === 'bn' ? 'যাচাইকৃত' : 'Verified'}
                    </span>
                    <button
                      type="button"
                      onClick={() => onToggleSave(service.id)}
                      className="text-amber-500 hover:text-slate-400 p-1"
                      title="মুছুন"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <h3 className="font-bold text-slate-900 text-base mb-1">
                    {language === 'bn' ? service.nameBn : service.nameEn}
                  </h3>

                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">
                    {language === 'bn' ? service.shortDescriptionBn : service.shortDescriptionEn}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => onSelectService(service)}
                    className="flex-1 py-1.5 px-3 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold cursor-pointer"
                  >
                    {language === 'bn' ? 'নির্দেশিকা' : 'Guide'}
                  </button>

                  <button
                    type="button"
                    onClick={() => onLaunchExternal(service)}
                    className="flex-1 py-1.5 px-3 rounded-lg bg-[#006a4e] hover:bg-emerald-800 text-white text-xs font-semibold flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <span>{language === 'bn' ? 'সেবায় যান' : 'Launch'}</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Section 2: User's Manual Reference Notebook */}
      <div className="pt-6 border-t border-slate-200">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <span>{language === 'bn' ? 'আমার আবেদন ট্র্যাকিং নোটবুক' : 'My Application Reference Notebook'}</span>
              <span className="text-xs bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-full font-bold">
                {toBnNum(notes.length)}
              </span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              {language === 'bn'
                ? 'ব্যবহারকারী কর্তৃক নিজের সুবিধার জন্য সংরক্ষিত তথ্য (User-provided references)'
                : 'User-entered manual records for personal reminder purposes'}
            </p>
          </div>
        </div>

        {notes.length === 0 ? (
          <div className="p-8 rounded-2xl border-2 border-dashed border-slate-200 text-center bg-slate-50">
            <FileText className="w-8 h-8 text-slate-300 mx-auto mb-2" />
            <p className="text-sm text-slate-600 font-medium">
              {language === 'bn'
                ? 'এখনও কোনো ট্র্যাকিং নম্বর যোগ করা হয়নি।'
                : 'No application reference notes added yet.'}
            </p>
            <button
              type="button"
              onClick={() => setShowAddModal(true)}
              className="mt-3 px-4 py-2 rounded-lg bg-emerald-50 text-emerald-800 hover:bg-emerald-100 text-xs font-semibold inline-flex items-center gap-1.5 border border-emerald-200"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{language === 'bn' ? 'রেফারেন্স নোট লিখুন' : 'Add Note Now'}</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {notes.map((note) => {
              const matchedService = services.find((s) => s.id === note.serviceId);
              const trackingLink =
                matchedService?.links.find((l) => l.purpose === 'TRACKING')?.url ||
                matchedService?.directServiceUrl ||
                '';

              return (
                <div
                  key={note.id}
                  className="bg-white rounded-xl border border-slate-200 p-5 flex flex-col justify-between hover:shadow-xs transition-shadow"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                      <span className="font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                        {language === 'bn'
                          ? matchedService?.nameBn || 'অন্যান্য সেবা'
                          : matchedService?.nameEn || 'Other Service'}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleDeleteNote(note.id)}
                        className="text-slate-400 hover:text-rose-600 p-1"
                        title="মুছুন"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="mb-3">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                        {language === 'bn' ? 'আবেদন / ট্র্যাকিং নম্বর:' : 'Tracking Number:'}
                      </span>
                      <p className="font-mono text-base font-bold text-slate-900 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200 mt-1">
                        {note.trackingNumber}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-slate-500 mb-3">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span>
                        {language === 'bn' ? 'আবেদনের তারিখ:' : 'Applied on:'}{' '}
                        {note.submissionDate}
                      </span>
                    </div>

                    {note.personalNotes && (
                      <p className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-100 italic mb-4">
                        "{note.personalNotes}"
                      </p>
                    )}
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-[11px] text-amber-700 font-medium">
                      {language === 'bn' ? 'নাগরিক প্রদত্ত তথ্য' : 'User-entered note'}
                    </span>

                    {trackingLink && (
                      <a
                        href={trackingLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 font-semibold text-[#006a4e] hover:underline"
                      >
                        <span>{language === 'bn' ? 'সরকারি পোর্টালে ট্র্যাক' : 'Track on Gov Site'}</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Add Reference Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 max-w-md w-full p-6">
            <h3 className="text-lg font-bold text-slate-900 mb-1">
              {language === 'bn' ? 'আবেদন রেফারেন্স নোট সংরক্ষণ' : 'Record Application Reference'}
            </h3>
            <p className="text-xs text-slate-500 mb-4 leading-relaxed">
              {language === 'bn'
                ? 'ই-নামজারি, খাজনা বা পর্চার জন্য দাখিলকৃত আবেদনের ট্র্যাকিং আইডি এখানে ব্যক্তিগত স্মারক হিসেবে লিখে রাখুন।'
                : 'Note down your tracking ID for personal reminder. This will be stored locally on your device.'}
            </p>

            <form onSubmit={handleCreateNote} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  {language === 'bn' ? 'সংশ্লিষ্ট সেবা নির্বাচন করুন:' : 'Select Service:'}
                </label>
                <select
                  value={formServiceId}
                  onChange={(e) => setFormServiceId(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-slate-300 text-slate-900 text-xs font-medium focus:ring-2 focus:ring-emerald-500"
                >
                  {services.map((s) => (
                    <option key={s.id} value={s.id}>
                      {language === 'bn' ? s.nameBn : s.nameEn}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  {language === 'bn' ? 'আবেদন বা ট্র্যাকিং নম্বর *' : 'Application Tracking Number *'}
                </label>
                <input
                  type="text"
                  required
                  value={formTrackingNumber}
                  onChange={(e) => setFormTrackingNumber(e.target.value)}
                  placeholder="e.g. MUT-2026-98124 or 1284901"
                  className="w-full p-2.5 rounded-lg border border-slate-300 text-slate-900 font-mono text-xs focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  {language === 'bn' ? 'আবেদনের তারিখ:' : 'Submission Date:'}
                </label>
                <input
                  type="date"
                  value={formSubmissionDate}
                  onChange={(e) => setFormSubmissionDate(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-slate-300 text-slate-900 text-xs focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  {language === 'bn' ? 'ব্যক্তিগত নোট (যেমন: শুনানির দিন বা মৌজা):' : 'Personal Notes / Reminders:'}
                </label>
                <textarea
                  rows={2}
                  value={formNotes}
                  onChange={(e) => setFormNotes(e.target.value)}
                  placeholder={language === 'bn' ? 'যেমন: আগামী ১০ তারিখ এসিল্যান্ড অফিসে শুনানি...' : 'e.g. Hearing scheduled on 10th...'}
                  className="w-full p-2.5 rounded-lg border border-slate-300 text-slate-900 text-xs focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 font-semibold cursor-pointer"
                >
                  {language === 'bn' ? 'বাতিল' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-[#006a4e] hover:bg-emerald-800 text-white font-semibold cursor-pointer"
                >
                  {language === 'bn' ? 'সংরক্ষণ করুন' : 'Save Note'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
