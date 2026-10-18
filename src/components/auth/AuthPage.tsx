/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Bangladesh Integrated Land Services Portal (BILSP)
 * Dual-Panel Citizen & Government Administrative Authentication Page
 */

import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { SEEDED_ADMIN_USERS, SEEDED_CITIZEN_USERS } from '../../data/adminDemoData';
import {
  ShieldCheck,
  Phone,
  Mail,
  CreditCard,
  Lock,
  User,
  ArrowRight,
  RefreshCw,
  AlertCircle,
  CheckCircle2,
  Building2,
  KeyRound,
  Eye,
  EyeOff,
  Sparkles,
  Info,
  Layers,
  ArrowLeft
} from 'lucide-react';

interface AuthPageProps {
  onSuccess: (target: 'citizen' | 'admin-cat1' | 'admin-cat2' | 'admin-cat3') => void;
  onBackToPortal: () => void;
}

export const AuthPage: React.FC<AuthPageProps> = ({ onSuccess, onBackToPortal }) => {
  const { language, toggleLanguage, toBnNum } = useLanguage();
  const {
    normalizeBdPhone,
    validateNidFormat,
    requestCitizenOtp,
    verifyCitizenOtpAndLogin,
    registerCitizen,
    loginAdmin,
    activeOtpState
  } = useAuth();

  // Active section tab: 'citizen' | 'admin'
  const [activeSection, setActiveSection] = useState<'citizen' | 'admin'>('citizen');

  // Citizen sub-mode: 'login' | 'register'
  const [citizenMode, setCitizenMode] = useState<'login' | 'register'>('login');
  const [citizenAuthType, setCitizenAuthType] = useState<'mobile' | 'email'>('mobile');

  // Citizen form state
  const [phoneInput, setPhoneInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [nameInput, setNameInput] = useState('');
  const [nidInput, setNidInput] = useState('');
  const [otpInput, setOtpInput] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  // Admin form state
  const [employeeId, setEmployeeId] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [otp2fa, setOtp2fa] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Status feedback
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Cooldown timer
  useEffect(() => {
    let timer: any;
    if (cooldown > 0) {
      timer = setInterval(() => setCooldown((prev) => prev - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [cooldown]);

  const handleSendOtp = async () => {
    setErrorMsg(null);
    setSuccessMsg(null);

    const recipient = citizenAuthType === 'mobile' ? phoneInput : emailInput;
    if (!recipient.trim()) {
      setErrorMsg(
        citizenAuthType === 'mobile'
          ? (language === 'bn' ? 'মোবাইল নম্বর প্রদান করুন' : 'Please enter a mobile number')
          : (language === 'bn' ? 'ইমেইল ঠিকানা প্রদান করুন' : 'Please enter an email address')
      );
      return;
    }

    if (citizenAuthType === 'mobile') {
      const check = normalizeBdPhone(phoneInput);
      if (!check.valid) {
        setErrorMsg(check.error || 'সঠিক ফোন নম্বর দিন');
        return;
      }
    }

    setLoading(true);
    try {
      const res = await requestCitizenOtp(
        citizenAuthType === 'mobile' ? normalizeBdPhone(phoneInput).normalized : emailInput.trim(),
        citizenAuthType === 'mobile' ? 'MOBILE' : 'EMAIL'
      );
      if (res.success) {
        setOtpSent(true);
        setCooldown(res.cooldownSecs);
        setSuccessMsg(
          language === 'bn'
            ? 'যাচাইকরণ ওটিপি কোড পাঠানো হয়েছে।'
            : 'Verification OTP has been dispatched.'
        );
      }
    } catch {
      setErrorMsg(language === 'bn' ? 'ওটিপি পাঠাতে সমস্যা হয়েছে' : 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleCitizenSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!otpSent) {
      handleSendOtp();
      return;
    }

    if (!otpInput.trim()) {
      setErrorMsg(language === 'bn' ? 'ওটিপি কোডটি লিখুন' : 'Please enter the 6-digit OTP code');
      return;
    }

    setLoading(true);
    try {
      if (citizenMode === 'login') {
        const target = citizenAuthType === 'mobile' ? normalizeBdPhone(phoneInput).normalized : emailInput.trim();
        const res = await verifyCitizenOtpAndLogin(target, otpInput);
        if (res.success) {
          onSuccess('citizen');
        } else {
          setErrorMsg(res.error || 'প্রমাণীকরণ ব্যর্থ হয়েছে');
        }
      } else {
        // Register Mode
        const res = await registerCitizen({
          name: nameInput,
          mobile: phoneInput,
          email: emailInput,
          nid: nidInput,
          otp: otpInput
        });
        if (res.success) {
          onSuccess('citizen');
        } else {
          setErrorMsg(res.error || 'নিবন্ধন ব্যর্থ হয়েছে');
        }
      }
    } finally {
      setLoading(false);
    }
  };

  const handleAdminSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!employeeId.trim() || !adminPassword.trim()) {
      setErrorMsg(
        language === 'bn'
          ? 'কর্মকর্তার পরিচয়পত্র নম্বর এবং পাসওয়ার্ড উভয়ই আবশ্যক'
          : 'Employee ID and password are both required'
      );
      return;
    }

    setLoading(true);
    try {
      const res = await loginAdmin(employeeId, adminPassword, otp2fa);
      if (res.success && res.user) {
        // Route to the corresponding administrative workspace
        if (res.user.category === 'CATEGORY_1_RECORDS_TAX') {
          onSuccess('admin-cat1');
        } else if (res.user.category === 'CATEGORY_2_SURVEY_MAPPING') {
          onSuccess('admin-cat2');
        } else if (res.user.category === 'CATEGORY_3_DEED_REGISTRATION') {
          onSuccess('admin-cat3');
        }
      } else {
        setErrorMsg(res.error || 'লগইন ব্যর্থ হয়েছে');
      }
    } finally {
      setLoading(false);
    }
  };

  // 1-Click Fill Helper for Admin Testing
  const handleSelectAdminAccount = (empId: string) => {
    setEmployeeId(empId);
    setAdminPassword('admin123');
    setOtp2fa('123456');
    setErrorMsg(null);
  };

  // 1-Click Fill for Citizen Testing
  const handleSelectCitizenAccount = (mobile: string) => {
    setPhoneInput(mobile);
    setCitizenAuthType('mobile');
    setCitizenMode('login');
    setErrorMsg(null);
  };

  return (
    <div className="min-h-screen bg-slate-100/80 py-8 px-4 sm:px-6 flex flex-col justify-between font-['Hind_Siliguri','Inter',sans-serif]">
      {/* Top Navbar */}
      <div className="max-w-5xl mx-auto w-full flex items-center justify-between pb-6">
        <button
          type="button"
          onClick={onBackToPortal}
          className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-700 hover:text-[#006a4e] transition-colors cursor-pointer bg-white px-3.5 py-2 rounded-xl border border-slate-200 shadow-2xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{language === 'bn' ? 'মূল পোর্টালে ফিরে যান' : 'Back to Public Portal'}</span>
        </button>

        <button
          type="button"
          onClick={toggleLanguage}
          className="text-xs sm:text-sm font-semibold text-slate-700 hover:text-slate-900 bg-white px-3 py-1.5 rounded-xl border border-slate-200 cursor-pointer"
        >
          {language === 'bn' ? 'English' : 'বাংলায় দেখুন'}
        </button>
      </div>

      {/* Main Authentication Card */}
      <div className="max-w-3xl mx-auto w-full bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden mb-8">
        {/* Government Identity Header */}
        <div className="bg-[#006a4e] text-white p-6 sm:p-8 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-10 -mt-10 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#f42a41]/10 rounded-full -ml-8 -mb-8 pointer-events-none" />

          {/* Temporary Project Emblem */}
          <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/20 flex items-center justify-center mx-auto mb-3 shadow-inner">
            <ShieldCheck className="w-8 h-8 text-amber-300" />
          </div>

          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white mb-1">
            {language === 'bn'
              ? 'বাংলাদেশ সমন্বিত ভূমি ব্যবস্থাপনা ব্যবস্থা (BILSP)'
              : 'Bangladesh Integrated Land Management System (BILSP)'}
          </h1>

          <p className="text-xs sm:text-sm text-emerald-100 font-medium">
            {language === 'bn'
              ? 'নাগরিক ও সরকারি কর্মকর্তা প্রবেশদ্বার'
              : 'Citizen & Government Official Authentication Gateway'}
          </p>

          <p className="text-[11px] text-emerald-200/80 mt-2 max-w-lg mx-auto">
            {language === 'bn'
              ? 'আইনি দ্রষ্টব্য: এটি একটি প্রোটোটাইপ সমন্বিত প্রবেশদ্বার। অফিসিয়াল সিল বা অনুমোদনবিহীন কোনো বিভ্রান্তিকর দাবি করা হয় না।'
              : 'Public Prototype: Functional authorization gateway adhering to government digital service standards.'}
          </p>
        </div>

        {/* Section Navigation Switcher (Citizen vs Government Admin) */}
        <div className="grid grid-cols-2 p-2 bg-slate-100 border-b border-slate-200 text-xs sm:text-sm font-bold">
          <button
            type="button"
            onClick={() => {
              setActiveSection('citizen');
              setErrorMsg(null);
            }}
            className={`py-3 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 ${
              activeSection === 'citizen'
                ? 'bg-white text-[#006a4e] shadow-sm ring-1 ring-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <User className="w-4 h-4 text-emerald-700" />
            <span>{language === 'bn' ? 'নাগরিক কর্নার (Citizen Access)' : 'Citizen Access'}</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveSection('admin');
              setErrorMsg(null);
            }}
            className={`py-3 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 ${
              activeSection === 'admin'
                ? 'bg-white text-slate-900 shadow-sm ring-1 ring-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Building2 className="w-4 h-4 text-slate-800" />
            <span>{language === 'bn' ? 'সরকারি প্রশাসন (Official Admin)' : 'Government Administration'}</span>
          </button>
        </div>

        {/* Body Section */}
        <div className="p-6 sm:p-8">
          {errorMsg && (
            <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs sm:text-sm flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* ======================================================== */}
          {/* SECTION 1: CITIZEN ACCESS PANEL                         */}
          {/* ======================================================== */}
          {activeSection === 'citizen' && (
            <div className="space-y-6">
              {/* Login vs Register Toggle */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setCitizenMode('login');
                      setOtpSent(false);
                      setOtpInput('');
                    }}
                    className={`text-xs sm:text-sm font-bold pb-1 transition-colors cursor-pointer border-b-2 ${
                      citizenMode === 'login'
                        ? 'border-[#006a4e] text-[#006a4e]'
                        : 'border-transparent text-slate-400 hover:text-slate-700'
                    }`}
                  >
                    {language === 'bn' ? 'বিদ্যমান একাউন্ট লগইন' : 'Existing Account Login'}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setCitizenMode('register');
                      setOtpSent(false);
                      setOtpInput('');
                    }}
                    className={`text-xs sm:text-sm font-bold pb-1 transition-colors cursor-pointer border-b-2 ${
                      citizenMode === 'register'
                        ? 'border-[#006a4e] text-[#006a4e]'
                        : 'border-transparent text-slate-400 hover:text-slate-700'
                    }`}
                  >
                    {language === 'bn' ? 'নতুন নাগরিক নিবন্ধন' : 'New Citizen Registration'}
                  </button>
                </div>

                {/* Mobile or Email Switcher */}
                <div className="flex items-center bg-slate-100 p-1 rounded-lg text-xs font-semibold text-slate-600">
                  <button
                    type="button"
                    onClick={() => {
                      setCitizenAuthType('mobile');
                      setOtpSent(false);
                    }}
                    className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                      citizenAuthType === 'mobile' ? 'bg-white text-slate-900 shadow-2xs' : ''
                    }`}
                  >
                    {language === 'bn' ? 'মোবাইল' : 'Mobile'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setCitizenAuthType('email');
                      setOtpSent(false);
                    }}
                    className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                      citizenAuthType === 'email' ? 'bg-white text-slate-900 shadow-2xs' : ''
                    }`}
                  >
                    {language === 'bn' ? 'ইমেইল' : 'Email'}
                  </button>
                </div>
              </div>

              {/* Citizen Form */}
              <form onSubmit={handleCitizenSubmit} className="space-y-4 text-xs sm:text-sm">
                {/* Registration Extra Fields */}
                {citizenMode === 'register' && (
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">
                      {language === 'bn' ? 'নাগরিকের পূর্ণ নাম *' : 'Full Name *'}
                    </label>
                    <input
                      type="text"
                      required
                      value={nameInput}
                      onChange={(e) => setNameInput(e.target.value)}
                      placeholder={language === 'bn' ? 'যেমন: কাজী আরিফুল ইসলাম' : 'e.g. Kazi Ariful Islam'}
                      className="w-full p-3 rounded-xl border border-slate-300 text-slate-900 focus:ring-2 focus:ring-emerald-500 font-medium"
                    />
                  </div>
                )}

                {/* Mobile Input */}
                {citizenAuthType === 'mobile' ? (
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">
                      {language === 'bn' ? 'মোবাইল নম্বর (১১ ডিজিট) *' : 'Bangladeshi Mobile Number (11 Digits) *'}
                    </label>
                    <div className="relative">
                      <div className="absolute left-3.5 top-3.5 text-slate-400 font-mono text-xs">
                        +88
                      </div>
                      <input
                        type="tel"
                        required
                        value={phoneInput}
                        onChange={(e) => setPhoneInput(e.target.value)}
                        placeholder="01XXXXXXXXX"
                        className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-300 text-slate-900 focus:ring-2 focus:ring-emerald-500 font-mono text-sm"
                      />
                    </div>
                  </div>
                ) : (
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">
                      {language === 'bn' ? 'ইমেইল ঠিকানা *' : 'Email Address *'}
                    </label>
                    <input
                      type="email"
                      required
                      value={emailInput}
                      onChange={(e) => setEmailInput(e.target.value)}
                      placeholder="citizen@example.com"
                      className="w-full p-3 rounded-xl border border-slate-300 text-slate-900 focus:ring-2 focus:ring-emerald-500 font-medium"
                    />
                  </div>
                )}

                {/* National ID Field (Registration only or identity enhancement) */}
                {citizenMode === 'register' && (
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="font-bold text-slate-700">
                        {language === 'bn'
                          ? 'জাতীয় পরিচয়পত্র নম্বর (ঐচ্ছিক / পরিচয় যাচাইয়ের জন্য)'
                          : 'National ID Number (Optional / For verification)'}
                      </label>
                      <span className="text-[11px] text-slate-400 font-mono">১০ / ১৩ / ১৭ ডিজিট</span>
                    </div>
                    <input
                      type="text"
                      value={nidInput}
                      onChange={(e) => setNidInput(e.target.value)}
                      placeholder={language === 'bn' ? 'স্মার্ট এনআইডি বা পুরাতন ১৭ সংখ্যা' : '10 or 17 digit NID'}
                      className="w-full p-3 rounded-xl border border-slate-300 text-slate-900 focus:ring-2 focus:ring-emerald-500 font-mono text-sm"
                    />
                    <div className="mt-1.5 p-2.5 rounded-lg bg-amber-50 border border-amber-200 text-[11px] text-amber-900 leading-snug flex items-start gap-1.5">
                      <Info className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                      <span>
                        {language === 'bn'
                          ? 'সরকারি নীতি দ্রষ্টব্য: কেবলমাত্র এনআইডি নম্বর প্রবেশ করলেই অ্যাকাউন্ট সরাসরি ‘যাচাইকৃত’ গণ্য হয় না। এটি নির্বাচন কমিশন এপিআই সংযুক্তি সাপেক্ষে পরবর্তী ধাপে যাচাই করা হবে।'
                          : 'Statutory Notice: Entering an NID alone does not mark an account as identity-verified. The status will remain "Pending Verification" until certified via official EC identity adapter.'}
                      </span>
                    </div>
                  </div>
                )}

                {/* OTP Input Field */}
                {otpSent && (
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="font-bold text-slate-800">
                        {language === 'bn' ? '৬ সংখ্যার ওটিপি কোড *' : '6-Digit OTP Code *'}
                      </label>
                      <button
                        type="button"
                        disabled={cooldown > 0}
                        onClick={handleSendOtp}
                        className="text-xs font-semibold text-[#006a4e] hover:underline disabled:opacity-50 disabled:no-underline cursor-pointer flex items-center gap-1"
                      >
                        <RefreshCw className={`w-3 h-3 ${cooldown > 0 ? 'animate-spin' : ''}`} />
                        <span>
                          {cooldown > 0
                            ? `${language === 'bn' ? 'পুনরায় পাঠান' : 'Resend in'} (${toBnNum(cooldown)}s)`
                            : language === 'bn'
                              ? 'পুনরায় কোড পাঠান'
                              : 'Resend Code'}
                        </span>
                      </button>
                    </div>

                    <input
                      type="text"
                      maxLength={6}
                      value={otpInput}
                      onChange={(e) => setOtpInput(e.target.value.replace(/\D/g, ''))}
                      placeholder="• • • • • •"
                      className="w-full p-3 text-center rounded-xl border border-slate-300 text-slate-900 text-xl font-mono tracking-widest focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                )}

                {/* Submit Action Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 px-4 rounded-xl bg-[#006a4e] hover:bg-emerald-800 text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-md cursor-pointer transition-all disabled:opacity-50"
                >
                  <span>
                    {!otpSent
                      ? language === 'bn'
                        ? 'ওটিপি কোড পাঠান'
                        : 'Send OTP Verification Code'
                      : citizenMode === 'login'
                        ? language === 'bn'
                          ? 'নাগরিক ড্যাশবোর্ডে প্রবেশ করুন'
                          : 'Verify & Enter Citizen Dashboard'
                        : language === 'bn'
                          ? 'নিবন্ধন সম্পন্ন করুন'
                          : 'Complete Registration'}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              {/* Dev Mode Mock OTP Inspector Drawer */}
              {activeOtpState && (
                <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-300 text-xs text-amber-950 flex flex-col sm:flex-row items-center justify-between gap-2 shadow-xs">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>
                      <strong>{language === 'bn' ? 'ডেভেলপমেন্ট মক ওটিপি:' : 'Local Dev Mock OTP:'}</strong>{' '}
                      <code className="bg-white px-2 py-0.5 rounded-md font-mono text-sm font-bold text-[#006a4e] border border-amber-200">
                        {activeOtpState.code}
                      </code>
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setOtpInput(activeOtpState.code)}
                    className="px-3 py-1 rounded-md bg-amber-600 hover:bg-amber-700 text-white font-semibold cursor-pointer text-xs"
                  >
                    {language === 'bn' ? 'অটো-পূরণ করুন' : 'Auto-fill OTP'}
                  </button>
                </div>
              )}

              {/* Seeded Citizen Quick Test Accounts */}
              <div className="pt-4 border-t border-slate-100">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                  {language === 'bn' ? 'দ্রুত পরীক্ষামূলক নাগরিক একাউন্ট:' : 'Quick Test Citizen Accounts:'}
                </span>
                <div className="flex flex-wrap gap-2">
                  {SEEDED_CITIZEN_USERS.map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => handleSelectCitizenAccount(c.mobile)}
                      className="px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-emerald-50 text-slate-700 text-xs font-medium cursor-pointer"
                    >
                      {c.nameBn || c.name} ({c.mobile})
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* SECTION 2: GOVERNMENT ADMINISTRATION ACCESS PANEL       */}
          {/* ======================================================== */}
          {activeSection === 'admin' && (
            <div className="space-y-6">
              <div className="p-4 rounded-2xl bg-slate-900 text-white space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400">
                  <ShieldCheck className="w-4 h-4 text-amber-400" />
                  <span>
                    {language === 'bn'
                      ? 'শুধুমাত্র অনুমোদিত সরকারি কর্মকর্তাদের জন্য'
                      : 'Authorized Government Officials Only'}
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {language === 'bn'
                    ? 'দায়িত্বপ্রাপ্ত প্রশাসনিক ক্যাটাগরি অনুসারে লগইন করুন। সিস্টেম স্বয়ংক্রিয়ভাবে আপনার অনুমোদিত বিভাগীয় ওয়ার্কস্পেসে পুনঃনির্দেশ করবে।'
                    : 'Log in with assigned government credentials. The portal will automatically route you to your authorized departmental workspace.'}
                </p>
              </div>

              {/* Admin Login Form */}
              <form onSubmit={handleAdminSubmit} className="space-y-4 text-xs sm:text-sm">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    {language === 'bn'
                      ? 'অফিসিয়াল এমপ্লয়ী আইডি / একাউন্ট আইডেন্টিফায়ার *'
                      : 'Official Employee ID / Account Identifier *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={employeeId}
                    onChange={(e) => setEmployeeId(e.target.value)}
                    placeholder="e.g. MINLAND-REC-101, DLRS-SRV-204, DOLR-REG-305"
                    className="w-full p-3 rounded-xl border border-slate-300 text-slate-900 font-mono text-sm uppercase focus:ring-2 focus:ring-slate-800"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    {language === 'bn' ? 'পাসওয়ার্ড *' : 'Password *'}
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={adminPassword}
                      onChange={(e) => setAdminPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full p-3 pr-10 rounded-xl border border-slate-300 text-slate-900 focus:ring-2 focus:ring-slate-800 font-medium"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3.5 text-slate-400 hover:text-slate-600"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Optional Second-Factor Authentication (2FA) */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="font-bold text-slate-700">
                      {language === 'bn'
                        ? 'দ্বি-স্তরীয় প্রমাণীকরণ কোড (2FA - যদি প্রযোজ্য হয়)'
                        : 'Two-Factor Authentication Code (2FA - if active)'}
                    </label>
                    <span className="text-[11px] text-slate-400 font-mono">ঐচ্ছিক / 123456</span>
                  </div>
                  <input
                    type="text"
                    value={otp2fa}
                    onChange={(e) => setOtp2fa(e.target.value)}
                    placeholder="123456"
                    className="w-full p-3 rounded-xl border border-slate-300 text-slate-900 font-mono text-sm focus:ring-2 focus:ring-slate-800"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-md cursor-pointer transition-all disabled:opacity-50"
                >
                  <Lock className="w-4 h-4" />
                  <span>
                    {language === 'bn'
                      ? 'প্রশাসনিক ড্যাশবোর্ডে প্রবেশ করুন'
                      : 'Authenticate & Enter Departmental Workspace'}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              {/* 1-Click Fill Helper for the 3 Admin Functional Categories */}
              <div className="pt-4 border-t border-slate-100 space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                  {language === 'bn'
                    ? 'পরীক্ষার জন্য ৩টি প্রশাসনিক ক্যাটাগরি একাউন্ট নির্বাচন করুন:'
                    : 'Select One of the 3 Functional Admin Workspaces for Testing:'}
                </span>

                <div className="grid grid-cols-1 gap-2.5">
                  {SEEDED_ADMIN_USERS.map((admin, idx) => (
                    <button
                      key={admin.id}
                      type="button"
                      onClick={() => handleSelectAdminAccount(admin.employeeId)}
                      className={`p-3 rounded-xl border text-left flex items-center justify-between group cursor-pointer transition-all ${
                        employeeId === admin.employeeId
                          ? 'border-[#006a4e] bg-emerald-50/70 shadow-xs'
                          : 'border-slate-200 bg-slate-50/70 hover:bg-white hover:border-slate-300'
                      }`}
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700 font-mono">
                            {admin.employeeId}
                          </span>
                          <span className="font-bold text-slate-900 text-xs">
                            {language === 'bn' ? admin.nameBn : admin.name}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-600 mt-0.5 font-medium">
                          {language === 'bn' ? admin.authorityBn : admin.authorityEn}
                        </p>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="text-[10px] font-bold px-2 py-1 rounded-full bg-slate-200/80 text-slate-800">
                          {admin.category === 'CATEGORY_1_RECORDS_TAX'
                            ? (language === 'bn' ? 'ক্যাটাগরি ১: রেকর্ড ও কর' : 'Category 1: Records & Tax')
                            : admin.category === 'CATEGORY_2_SURVEY_MAPPING'
                              ? (language === 'bn' ? 'ক্যাটাগরি ২: জরিপ ও ম্যাপ' : 'Category 2: DLRS Survey')
                              : (language === 'bn' ? 'ক্যাটাগরি ৩: দলিল রেজিস্ট্রি' : 'Category 3: Deeds')}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
