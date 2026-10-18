/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Bangladesh Integrated Land Services Portal (BILSP)
 * Unified Authentication & Role-Based Access Control (RBAC) Context
 */

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  AuthUser,
  CitizenUser,
  AdminUser,
  AdminCategory,
  UserRole
} from '../types/authAndGeo';
import { SEEDED_ADMIN_USERS, SEEDED_CITIZEN_USERS } from '../data/adminDemoData';

interface MockOtpState {
  recipient: string;
  code: string;
  expiresAt: number;
  type: 'MOBILE' | 'EMAIL';
}

interface AuthContextType {
  currentUser: AuthUser | null;
  userType: 'CITIZEN' | 'ADMIN' | null;
  isAuthenticated: boolean;
  activeOtpState: MockOtpState | null;

  // Citizen Auth Methods
  normalizeBdPhone: (phone: string) => { valid: boolean; normalized: string; error?: string };
  validateNidFormat: (nid: string) => { valid: boolean; type?: string; error?: string };
  requestCitizenOtp: (recipient: string, type: 'MOBILE' | 'EMAIL') => Promise<{ success: boolean; message: string; cooldownSecs: number }>;
  verifyCitizenOtpAndLogin: (recipient: string, otp: string) => Promise<{ success: boolean; error?: string; user?: CitizenUser }>;
  registerCitizen: (data: { name: string; mobile: string; email?: string; nid?: string; otp: string }) => Promise<{ success: boolean; error?: string; user?: CitizenUser }>;

  // Admin Auth Methods
  loginAdmin: (employeeId: string, password: string, otp2fa?: string) => Promise<{ success: boolean; error?: string; user?: AdminUser }>;

  // Session & Access control
  logout: () => void;
  hasPermission: (permission: string) => boolean;
  clearMockOtp: () => void;
}

const STORAGE_KEY_AUTH = 'bilsp_auth_user';
const STORAGE_KEY_CITIZENS = 'bilsp_registered_citizens';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_AUTH);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const [registeredCitizens, setRegisteredCitizens] = useState<CitizenUser[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_CITIZENS);
      return stored ? JSON.parse(stored) : SEEDED_CITIZEN_USERS;
    } catch {
      return SEEDED_CITIZEN_USERS;
    }
  });

  const [activeOtpState, setActiveOtpState] = useState<MockOtpState | null>(null);

  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem(STORAGE_KEY_AUTH, JSON.stringify(currentUser));
      } else {
        localStorage.removeItem(STORAGE_KEY_AUTH);
      }
    } catch {
      //
    }
  }, [currentUser]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_CITIZENS, JSON.stringify(registeredCitizens));
    } catch {
      //
    }
  }, [registeredCitizens]);

  // Bangladesh Mobile Number Normalizer: 013, 014, 015, 016, 017, 018, 019
  const normalizeBdPhone = (phone: string) => {
    let cleaned = phone.replace(/[\s\-\(\)]/g, '');
    if (cleaned.startsWith('+880')) {
      cleaned = '0' + cleaned.substring(4);
    } else if (cleaned.startsWith('880')) {
      cleaned = '0' + cleaned.substring(3);
    }

    if (!/^01[3-9]\d{8}$/.test(cleaned)) {
      return {
        valid: false,
        normalized: cleaned,
        error: 'অনুগ্রহ করে সঠিক ১১ ডিজিটের বাংলাদেশী মোবাইল নম্বর প্রদান করুন (যেমন: 017XXXXXXXX)'
      };
    }

    return { valid: true, normalized: cleaned };
  };

  // NID Format Validator: 10-digit Smart NID, or 13/17-digit legacy format
  const validateNidFormat = (nid: string) => {
    const cleaned = nid.trim();
    if (!cleaned) {
      return { valid: false, error: 'এনআইডি নম্বর প্রয়োজন' };
    }

    if (/^\d{10}$/.test(cleaned)) {
      return { valid: true, type: 'স্মার্ট জাতীয় পরিচয়পত্র (১০ ডিজিট)' };
    }
    if (/^\d{13}$/.test(cleaned)) {
      return { valid: true, type: 'পুরাতন জাতীয় পরিচয়পত্র (১৩ ডিজিট)' };
    }
    if (/^\d{17}$/.test(cleaned)) {
      return { valid: true, type: 'ডিজিটাইজড জাতীয় পরিচয়পত্র (১৭ ডিজিট)' };
    }

    return {
      valid: false,
      error: 'জাতীয় পরিচয়পত্র নম্বরটি অবশ্যই ১০, ১৩ অথবা ১৭ সংখ্যার হতে হবে।'
    };
  };

  // Generate & Dispatch Mock OTP (with 60-second cooldown)
  const requestCitizenOtp = async (recipient: string, type: 'MOBILE' | 'EMAIL') => {
    // Generate secure 6-digit mock OTP
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = Date.now() + 3 * 60 * 1000; // 3 minutes validity

    const newOtpState: MockOtpState = {
      recipient,
      code,
      expiresAt,
      type
    };

    setActiveOtpState(newOtpState);

    return {
      success: true,
      message: `${type === 'MOBILE' ? 'মোবাইল নম্বরে' : 'ইমেইল ঠিকানায়'} ৬ ডিজিটের ওটিপি কোড পাঠানো হয়েছে।`,
      cooldownSecs: 60
    };
  };

  // Verify OTP and Login Citizen
  const verifyCitizenOtpAndLogin = async (recipient: string, otp: string) => {
    if (!activeOtpState || activeOtpState.recipient !== recipient) {
      return { success: false, error: 'কোনো সক্রিয় ওটিপি অনুরোধ পাওয়া যায়নি। পুনরায় ওটিপি পাঠান।' };
    }

    if (Date.now() > activeOtpState.expiresAt) {
      return { success: false, error: 'ওটিপির মেয়াদ শেষ হয়ে গেছে। পুনরায় কোড অনুরোধ করুন।' };
    }

    if (activeOtpState.code !== otp.trim()) {
      return { success: false, error: 'প্রদত্ত ওটিপি কোডটি সঠিক নয়। অনুগ্রহ করে আবার চেষ্টা করুন।' };
    }

    // Find registered citizen by normalized mobile or email
    const norm = normalizeBdPhone(recipient);
    const citizen = registeredCitizens.find(
      (c) => c.mobile === (norm.valid ? norm.normalized : recipient) || c.email?.toLowerCase() === recipient.toLowerCase()
    );

    if (!citizen) {
      return {
        success: false,
        error: 'এই মোবাইল নম্বরে কোনো অ্যাকাউন্ট পাওয়া যায়নি। অনুগ্রহ করে প্রথমে নিবন্ধন সম্পন্ন করুন।'
      };
    }

    setCurrentUser(citizen);
    setActiveOtpState(null);
    return { success: true, user: citizen };
  };

  // Register Citizen
  const registerCitizen = async (data: {
    name: string;
    mobile: string;
    email?: string;
    nid?: string;
    otp: string;
  }) => {
    const norm = normalizeBdPhone(data.mobile);
    if (!norm.valid) {
      return { success: false, error: norm.error };
    }

    if (!activeOtpState || activeOtpState.recipient !== norm.normalized) {
      return { success: false, error: 'ওটিপি যাচাই করা সম্ভব হয়নি। পুনরায় কোড চান।' };
    }

    if (activeOtpState.code !== data.otp.trim()) {
      return { success: false, error: 'ভুল ওটিপি কোড। পুনরায় চেষ্টা করুন।' };
    }

    // Check duplicate
    const exists = registeredCitizens.some((c) => c.mobile === norm.normalized);
    if (exists) {
      return { success: false, error: 'এই মোবাইল নম্বরটি ইতোমধ্যে একটি অ্যাকাউন্টে নিবন্ধিত।' };
    }

    // Validate NID if provided
    let nidStatus: 'UNVERIFIED' | 'PENDING_VERIFICATION' | 'VERIFIED' = 'UNVERIFIED';
    if (data.nid?.trim()) {
      const nidCheck = validateNidFormat(data.nid);
      if (!nidCheck.valid) {
        return { success: false, error: nidCheck.error };
      }
      // Note: As specified, an entered NID alone is NEVER marked as verified automatically.
      nidStatus = 'PENDING_VERIFICATION';
    }

    const newCitizen: CitizenUser = {
      id: `ctz-${Date.now()}`,
      name: data.name.trim(),
      nameBn: data.name.trim(),
      mobile: norm.normalized,
      mobileVerified: true,
      email: data.email?.trim() || undefined,
      emailVerified: false,
      nid: data.nid?.trim() || undefined,
      nidStatus,
      accountStatus: nidStatus === 'PENDING_VERIFICATION' ? 'PENDING_VERIFICATION' : 'ACTIVE',
      createdAt: new Date().toISOString().split('T')[0],
      role: 'CITIZEN',
      savedParcels: []
    };

    setRegisteredCitizens((prev) => [newCitizen, ...prev]);
    setCurrentUser(newCitizen);
    setActiveOtpState(null);

    return { success: true, user: newCitizen };
  };

  // Admin Login (Controlled government credentials check)
  const loginAdmin = async (employeeId: string, password: string, otp2fa?: string) => {
    const cleanId = employeeId.trim().toUpperCase();
    const admin = SEEDED_ADMIN_USERS.find((a) => a.employeeId.toUpperCase() === cleanId);

    if (!admin) {
      return {
        success: false,
        error: 'প্রদত্ত এমপ্লয়ী আইডি বা সরকারি পরিচয়পত্র নম্বরটি সঠিক নয়। অনুমোদিত প্রশাসক তালিকা যাচাই করুন।'
      };
    }

    // For demo/prototype, test passwords accept "admin123" or "password" or matching employeeId lowercase
    const isValidPassword = password === 'admin123' || password === 'password' || password === cleanId.toLowerCase();
    if (!isValidPassword) {
      return {
        success: false,
        error: 'প্রদত্ত পাসওয়ার্ডটি সঠিক নয়। সঠিক পাসওয়ার্ড দিয়ে পুনরায় চেষ্টা করুন।'
      };
    }

    // Optional 2FA simulation
    if (admin.twoFactorEnabled && otp2fa !== undefined && otp2fa !== '' && otp2fa !== '123456') {
      return {
        success: false,
        error: 'দ্বি-স্তরীয় প্রমাণীকরণ (2FA) কোডটি ভুল।'
      };
    }

    const loggedInAdmin: AdminUser = {
      ...admin,
      lastLogin: new Date().toLocaleString('en-GB')
    };

    setCurrentUser(loggedInAdmin);
    return { success: true, user: loggedInAdmin };
  };

  const logout = () => {
    setCurrentUser(null);
    setActiveOtpState(null);
    try {
      localStorage.removeItem(STORAGE_KEY_AUTH);
    } catch {
      //
    }
  };

  const clearMockOtp = () => {
    setActiveOtpState(null);
  };

  const hasPermission = (permission: string): boolean => {
    if (!currentUser || currentUser.role === 'CITIZEN') return false;
    const admin = currentUser as AdminUser;
    return admin.permissions?.includes(permission) ?? false;
  };

  const userType = currentUser ? (currentUser.role === 'CITIZEN' ? 'CITIZEN' : 'ADMIN') : null;

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        userType,
        isAuthenticated: !!currentUser,
        activeOtpState,
        normalizeBdPhone,
        validateNidFormat,
        requestCitizenOtp,
        verifyCitizenOtpAndLogin,
        registerCitizen,
        loginAdmin,
        logout,
        hasPermission,
        clearMockOtp
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
