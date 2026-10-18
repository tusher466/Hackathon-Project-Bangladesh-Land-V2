/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Bangladesh Integrated Land Services Portal (BILSP)
 * Digitized Offline-to-Online Tool 5: Certified Deed Copy Urgent Search & Home Delivery
 * (সাব-রেজিস্ট্রি দলিলের সার্টিফাইড জাবেদা নকল অনুসন্ধান ও ডাকযোগে সরবরাহ)
 */

import React, { useState } from 'react';
import { useLanguage } from '../../../context/LanguageContext';
import {
  X,
  FileCheck2,
  CheckCircle2,
  Truck,
  Printer,
  DollarSign,
  Send,
  Building,
  Clock
} from 'lucide-react';

interface CertifiedDeedOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CertifiedDeedOrderModal: React.FC<CertifiedDeedOrderModalProps> = ({
  isOpen,
  onClose
}) => {
  const { language } = useLanguage();

  const [district, setDistrict] = useState<string>('ঢাকা');
  const [subRegistryOffice, setSubRegistryOffice] = useState<string>('রমনা সাব-রেজিস্ট্রি অফিস');
  const [deedNo, setDeedNo] = useState<string>('৭৮০');
  const [deedYear, setDeedYear] = useState<string>('2023');
  const [deliveryType, setDeliveryType] = useState<'postal' | 'counter'>('postal');
  const [shippingAddress, setShippingAddress] = useState<string>('বাড়ি নং ১২, রোড নং ৫, ধানমন্ডি, ঢাকা');

  const [isOrdered, setIsOrdered] = useState<boolean>(false);
  const [orderTrackingNo, setOrderTrackingNo] = useState<string>('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setOrderTrackingNo(`DEED-POST-${Math.floor(10000 + Math.random() * 90000)}`);
    setIsOrdered(true);
  };

  const searchFee = 50;
  const copyFee = 150;
  const postalFee = deliveryType === 'postal' ? 60 : 0;
  const totalCost = searchFee + copyFee + postalFee;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/70 backdrop-blur-sm font-['Hind_Siliguri','Inter',sans-serif]">
      <div className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl border border-slate-200 flex flex-col max-h-[92vh] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-[#006a4e] text-white p-5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-white/10 flex items-center justify-center">
              <FileCheck2 className="w-6 h-6 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold">
                  {language === 'bn' ? 'সাব-রেজিস্ট্রি দলিলের জাবেদা নকল ও হোম ডেলিভারি' : 'Certified Deed Copy Requisition & Delivery'}
                </h3>
                <span className="text-[10px] bg-amber-400 text-slate-900 font-bold px-2 py-0.5 rounded-full">
                  ডিজিটাইজড সরকারি সেবা
                </span>
              </div>
              <p className="text-xs text-emerald-100">
                {language === 'bn'
                  ? 'পূর্বে সাব-রেজিস্ট্রি অফিসে দালালের খপ্পরে পড়তে হতো; এখন অনলাইনে নকল ফি পরিশোধ করে সরাসরি ডাকযোগে নকল পান।'
                  : 'Order certified deed copies directly from sub-registry archives delivered to your doorstep.'}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-emerald-200 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 p-6 overflow-y-auto space-y-5 bg-slate-50">
          {!isOrdered ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  {language === 'bn' ? 'দলিলের পরিচিতি ও সাব-রেজিস্ট্রি অফিসের তথ্য:' : 'Deed & Sub-Registry Details:'}
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">{language === 'bn' ? 'জেলা:' : 'District:'}</label>
                    <input
                      type="text"
                      value={district}
                      onChange={(e) => setDistrict(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 font-semibold"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">{language === 'bn' ? 'সাব-রেজিস্ট্রি অফিস:' : 'Sub-Registry Office:'}</label>
                    <input
                      type="text"
                      value={subRegistryOffice}
                      onChange={(e) => setSubRegistryOffice(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 font-semibold"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">{language === 'bn' ? 'দলিল নম্বর:' : 'Deed Number:'}</label>
                    <input
                      type="text"
                      value={deedNo}
                      onChange={(e) => setDeedNo(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 font-bold text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">{language === 'bn' ? 'রেজিস্ট্রেশনের বছর:' : 'Registration Year:'}</label>
                    <input
                      type="number"
                      min="1940"
                      max="2026"
                      value={deedYear}
                      onChange={(e) => setDeedYear(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 font-semibold"
                    />
                  </div>
                </div>

                <div className="text-xs">
                  <label className="block font-bold text-slate-700 mb-1">{language === 'bn' ? 'ডেলিভারি মাধ্যম:' : 'Delivery Preference:'}</label>
                  <div className="grid grid-cols-2 gap-3">
                    <label className={`p-3 rounded-xl border cursor-pointer flex items-center gap-2 ${deliveryType === 'postal' ? 'border-[#006a4e] bg-emerald-50' : 'border-slate-200'}`}>
                      <input
                        type="radio"
                        checked={deliveryType === 'postal'}
                        onChange={() => setDeliveryType('postal')}
                        className="accent-[#006a4e]"
                      />
                      <span className="font-bold text-slate-900">{language === 'bn' ? 'বাংলাদেশ ডাকযোগে হোম ডেলিভারি (+৬০ টাকা)' : 'Postal Delivery (+60 BDT)'}</span>
                    </label>

                    <label className={`p-3 rounded-xl border cursor-pointer flex items-center gap-2 ${deliveryType === 'counter' ? 'border-[#006a4e] bg-emerald-50' : 'border-slate-200'}`}>
                      <input
                        type="radio"
                        checked={deliveryType === 'counter'}
                        onChange={() => setDeliveryType('counter')}
                        className="accent-[#006a4e]"
                      />
                      <span className="font-bold text-slate-900">{language === 'bn' ? 'অফিস কাউন্টার থেকে সরাসরি সংগ্রহ' : 'Counter Pickup'}</span>
                    </label>
                  </div>
                </div>

                {deliveryType === 'postal' && (
                  <div className="text-xs">
                    <label className="block font-bold text-slate-700 mb-1">{language === 'bn' ? 'প্রাপকের ডাক যোগাযোগের ঠিকানা:' : 'Postal Delivery Address:'}</label>
                    <input
                      type="text"
                      value={shippingAddress}
                      onChange={(e) => setShippingAddress(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 font-medium"
                    />
                  </div>
                )}

                {/* Statutory Fee Breakdown */}
                <div className="p-4 rounded-xl bg-slate-100 border border-slate-200 text-xs space-y-1.5">
                  <div className="flex justify-between text-slate-600">
                    <span>{language === 'bn' ? 'সরকারি তল্লাশ ফি (Search Fee):' : 'Search Fee:'}</span>
                    <span className="font-mono">৫০ টাকা</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>{language === 'bn' ? 'সার্টিফাইড কপি স্ট্যাম্প ও পৃষ্ঠা ফি:' : 'Copying & Stamp Fee:'}</span>
                    <span className="font-mono">১৫০ টাকা</span>
                  </div>
                  {deliveryType === 'postal' && (
                    <div className="flex justify-between text-slate-600">
                      <span>{language === 'bn' ? 'বাংলাদেশ ডাক রেজিস্ট্রি ডাক মাসুল:' : 'Postal Registered Fee:'}</span>
                      <span className="font-mono">৬০ টাকা</span>
                    </div>
                  )}
                  <div className="pt-2 border-t border-slate-300 flex justify-between font-bold text-slate-900 text-sm">
                    <span>{language === 'bn' ? 'সর্বমোট প্রদেয় ফি:' : 'Total Payable:'}</span>
                    <span className="text-[#006a4e] font-mono">{totalCost} টাকা</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#006a4e] hover:bg-emerald-800 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-md"
                >
                  <Send className="w-4 h-4" />
                  <span>{language === 'bn' ? 'অনলাইন অর্ডার নিশ্চিত করুন' : 'Confirm Deed Order'}</span>
                </button>
              </div>
            </form>
          ) : (
            <div className="bg-white p-6 rounded-2xl border border-emerald-300 shadow-xs space-y-4 text-center">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-[#006a4e] flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <h4 className="text-xl font-bold text-slate-900">
                {language === 'bn' ? 'দলিলের সার্টিফাইড নকল রিকুইজিশন সফল!' : 'Certified Deed Order Confirmed!'}
              </h4>

              <div className="bg-slate-900 text-white p-4 rounded-2xl max-w-sm mx-auto space-y-1">
                <span className="text-[10px] text-emerald-400 uppercase tracking-widest font-mono">
                  {language === 'bn' ? 'বাংলাদেশ পোস্ট ট্র্যাকিং নম্বর' : 'Consignment Tracking ID'}
                </span>
                <div className="text-2xl font-mono font-bold text-amber-300">{orderTrackingNo}</div>
              </div>

              <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
                {language === 'bn'
                  ? `${subRegistryOffice} এর মূল বালাম বই থেকে দলিলের (${deedNo}/${deedYear}) জাবেদা নকল প্রস্তুতের কাজ প্রক্রিয়াধীন। ৩-৫ কার্যদিবসের মধ্যে আপনার ঠিকানায় ওয়াটারপ্রুফ খামে ডাকযোগে পৌঁছে দেওয়া হবে।`
                  : `Deed copy (${deedNo}/${deedYear}) is being prepared from official records. Delivered within 3-5 business days.`}
              </p>

              <div className="pt-2 flex justify-center">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="px-4 py-2 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>{language === 'bn' ? 'অর্ডার কপি প্রিন্ট' : 'Print Consignment Slip'}</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-white border-t border-slate-200 flex justify-end shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold cursor-pointer"
          >
            {language === 'bn' ? 'বন্ধ করুন' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};
