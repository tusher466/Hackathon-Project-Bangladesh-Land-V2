/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Bangladesh Integrated Land Services Portal (BILSP)
 * Interactive Land Sector AI Advisor Modal ("ভূমি সহায়ক এআই")
 */

import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { apiClient } from '../../services/apiClient';
import {
  Bot,
  User,
  Send,
  X,
  Sparkles,
  HelpCircle,
  ExternalLink,
  PhoneCall,
  RotateCcw,
  ShieldCheck,
  CheckCircle2,
  Copy,
  Check,
  Printer
} from 'lucide-react';

interface LandAIAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialQuery?: string;
}

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  links?: Array<{ title: string; url: string }>;
  source?: string;
}

const PRESET_QUESTIONS = [
  {
    bn: 'নামজারি করতে সরকারি ফি কত এবং কী কী কাগজপত্র লাগে?',
    en: 'What are the official mutation fees and required documents?'
  },
  {
    bn: 'CS, SA, RS এবং BS খতিয়ানের মধ্যে পার্থক্য কী?',
    en: 'What are the differences between CS, SA, RS and BS Khatians?'
  },
  {
    bn: 'বাবার মৃত্যুর পর ওয়ারিশান জমি বণ্টনের সঠিক নিয়ম কী?',
    en: 'How to distribute ancestral land among heirs under succession law?'
  },
  {
    bn: 'ভূমি উন্নয়ন কর (খাজনা) অনলাইনে কীভাবে দেব?',
    en: 'How to register and pay Land Development Tax online?'
  },
  {
    bn: 'জমি কেনার আগে কী কী কাগজপত্র যাচাই করতে হয়?',
    en: 'What is the 6-step verification checklist before buying land?'
  },
  {
    bn: 'খাস জমি বন্দোবস্ত পাওয়ার শর্ত ও নিয়মাবলী কী?',
    en: 'Who is eligible for government Khas land settlement?'
  },
  {
    bn: 'দলিল রেজিস্ট্রেশনের সরকারি খরচ ও স্ট্যাম্প শুল্ক কত?',
    en: 'What are the government deed registration fees and stamp duties?'
  }
];

export const LandAIAssistantModal: React.FC<LandAIAssistantModalProps> = ({
  isOpen,
  onClose,
  initialQuery = ''
}) => {
  const { language } = useLanguage();

  const [inputMessage, setInputMessage] = useState<string>(initialQuery);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome-msg',
      sender: 'assistant',
      text:
        language === 'bn'
          ? `আসসালামু আলাইকুম! আমি **"ভূমি সহায়ক" (Bhumi Shohayok)**, বাংলাদেশ ভূমি সেবা পোর্টালের এআই সহকারী।\n\nনামজারি (Mutation), ভূমি উন্নয়ন কর (খাজনা), খতিয়ান যাচাই (CS, SA, RS, BS), উত্তরাধিকার বণ্টন (ফারায়েজ), বা জমি ক্রয়ের পূর্বে দলিল যাচাই সম্পর্কিত যে কোনো প্রশ্ন আমাকে করতে পারেন। নিচের যে কোনো প্রশ্নে ক্লিক করুন বা লিখে পাঠান।`
          : `Greetings! I am **Bhumi Shohayok**, the AI assistant for the Bangladesh Integrated Land Services Portal.\n\nYou can ask me about e-mutation, land development tax, survey khatians (CS, SA, RS, BS), inheritance distribution, or deed registration rules. Feel free to type or pick any preset question below.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      links: [
        { title: 'ই-নামজারি', url: 'https://mutation.land.gov.bd/' },
        { title: 'ভূমি কর (ldtax)', url: 'https://ldtax.gov.bd/' },
        { title: 'ই-পর্চা', url: 'https://eporcha.gov.bd/' }
      ]
    }
  ]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && initialQuery) {
      handleSendMessage(initialQuery);
    }
  }, [isOpen, initialQuery]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  if (!isOpen) return null;

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputMessage).trim();
    if (!query || isLoading) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const history = messages.slice(-5).map((m) => ({
        role: m.sender === 'user' ? ('user' as const) : ('model' as const),
        text: m.text
      }));

      const res = await apiClient.askLandAI(query, language, history);

      const assistantMsg: Message = {
        id: `assistant-${Date.now()}`,
        sender: 'assistant',
        text: res.answer,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        links: res.suggestedLinks,
        source: res.source
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch {
      const errorMsg: Message = {
        id: `err-${Date.now()}`,
        sender: 'assistant',
        text:
          language === 'bn'
            ? 'দুঃখিত, তথ্য প্রক্রিয়াকরণে কিছুটা বিলম্ব হচ্ছে। অনুগ্রহ করে ভূমি হেল্পলাইন ১৬১২২ এ কল করুন অথবা কিছুক্ষণ পর পুনরায় চেষ্টা করুন।'
            : 'Sorry, processing took longer than expected. Please dial 16122 for direct assistance.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/70 backdrop-blur-sm font-['Hind_Siliguri','Inter',sans-serif]">
      <div className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl border border-slate-200 flex flex-col h-[90vh] max-h-[720px] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#006a4e] to-emerald-900 text-white p-4 sm:p-5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-inner">
              <Bot className="w-6 h-6 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold">
                  {language === 'bn' ? 'ভূমি সহায়ক এআই (Bhumi Shohayok)' : 'Land AI Assistant'}
                </h3>
                <span className="text-[10px] font-mono bg-emerald-500/30 text-emerald-200 px-2 py-0.5 rounded-full border border-emerald-400/40">
                  GEMINI 3.8 FLASH
                </span>
              </div>
              <p className="text-xs text-emerald-200/90 font-medium">
                {language === 'bn'
                  ? 'বাংলাদেশের ভূমি আইন, খতিয়ান, নামজারি ও কর বিষয়ক স্মার্ট ডিজিটাল উপদেষ্টা'
                  : 'AI Advisor for Bangladesh Land Laws, Mutation, Taxes & Khatians'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                setMessages([
                  {
                    id: 'reset-welcome',
                    sender: 'assistant',
                    text:
                      language === 'bn'
                        ? 'নতুন কথোপকথন শুরু হয়েছে। আপনার প্রশ্ন লিখুন।'
                        : 'New conversation started. How may I assist you with Bangladesh land records?',
                    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                  }
                ]);
              }}
              title={language === 'bn' ? 'নতুন বার্তা' : 'Restart Chat'}
              className="p-2 rounded-xl text-emerald-200 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl text-emerald-200 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Quick Suggestion Chips */}
        <div className="p-3 bg-slate-50 border-b border-slate-200 flex items-center gap-2 overflow-x-auto scrollbar-thin shrink-0">
          <span className="text-[11px] font-bold text-slate-500 shrink-0 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-[#006a4e]" />
            <span>{language === 'bn' ? 'জনপ্রিয় প্রশ্ন:' : 'Presets:'}</span>
          </span>

          {PRESET_QUESTIONS.map((q, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSendMessage(language === 'bn' ? q.bn : q.en)}
              className="px-3 py-1.5 rounded-xl bg-white hover:bg-emerald-50 border border-slate-200 hover:border-emerald-400 text-slate-700 text-xs font-semibold whitespace-nowrap shrink-0 transition-colors cursor-pointer shadow-2xs"
            >
              {language === 'bn' ? q.bn : q.en}
            </button>
          ))}
        </div>

        {/* Messages Body */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 bg-slate-50/50">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 max-w-2xl ${
                msg.sender === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'
              }`}
            >
              {/* Avatar */}
              <div
                className={`w-8 h-8 rounded-xl shrink-0 flex items-center justify-center shadow-xs ${
                  msg.sender === 'user'
                    ? 'bg-slate-800 text-white'
                    : 'bg-[#006a4e] text-white'
                }`}
              >
                {msg.sender === 'user' ? (
                  <User className="w-4 h-4" />
                ) : (
                  <Bot className="w-4 h-4 text-amber-300" />
                )}
              </div>

              {/* Message Content */}
              <div
                className={`p-4 rounded-3xl text-xs sm:text-sm leading-relaxed shadow-xs relative group ${
                  msg.sender === 'user'
                    ? 'bg-slate-900 text-white rounded-tr-none'
                    : 'bg-white text-slate-900 border border-slate-200 rounded-tl-none'
                }`}
              >
                <div className="whitespace-pre-line prose prose-slate max-w-none prose-sm font-medium">
                  {msg.text}
                </div>

                {/* Suggested Links if any */}
                {msg.links && msg.links.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-slate-100 flex flex-wrap gap-2">
                    {msg.links.map((link, lIdx) => (
                      <a
                        key={lIdx}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-50 text-[#006a4e] hover:bg-emerald-100 font-semibold text-[11px] border border-emerald-200 transition-colors"
                      >
                        <span>{link.title}</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    ))}
                  </div>
                )}

                {/* Footer Time & Copy Action */}
                <div className="mt-2 flex items-center justify-between text-[10px] text-slate-400">
                  <span>{msg.timestamp}</span>

                  <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      type="button"
                      onClick={() => handleCopy(msg.id, msg.text)}
                      className="p-1 hover:text-slate-700 cursor-pointer"
                      title="Copy"
                    >
                      {copiedId === msg.id ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Loading Indicator */}
          {isLoading && (
            <div className="flex gap-3 mr-auto max-w-md">
              <div className="w-8 h-8 rounded-xl bg-[#006a4e] text-white flex items-center justify-center shrink-0 shadow-xs">
                <Bot className="w-4 h-4 text-amber-300" />
              </div>
              <div className="p-4 rounded-3xl bg-white border border-slate-200 text-xs text-slate-600 rounded-tl-none flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce" />
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce [animation-delay:0.2s]" />
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce [animation-delay:0.4s]" />
                </div>
                <span>{language === 'bn' ? 'ভূমি আইন ও ডাটাবেজ যাচাই করা হচ্ছে...' : 'Consulting land laws and records...'}</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Hotline Alert Callout */}
        <div className="px-4 py-2 bg-amber-50/80 border-t border-amber-200 flex items-center justify-between text-xs text-amber-900 shrink-0">
          <div className="flex items-center gap-1.5 font-medium">
            <PhoneCall className="w-3.5 h-3.5 text-amber-700" />
            <span>{language === 'bn' ? 'ভূমি মন্ত্রণালয়ের হটলাইন:' : 'Land Ministry Helpline:'} <strong>১৬১২২</strong> (২৪/৭)</span>
          </div>
          <span className="text-[11px] text-amber-800">
            {language === 'bn' ? 'দালাল মুক্ত সেবা নিশ্চিত করুন' : 'Avoid Unauthorized Middlemen'}
          </span>
        </div>

        {/* Input Bar */}
        <div className="p-3 sm:p-4 bg-white border-t border-slate-200 shrink-0">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder={
                language === 'bn'
                  ? 'আপনার জমি সম্পর্কিত প্রশ্ন লিখুন (যেমন: নামজারির খরচ কত?)...'
                  : 'Ask about mutation, khatians, inheritance, or tax...'
              }
              className="flex-1 px-4 py-3 rounded-2xl bg-slate-50 border border-slate-300 text-slate-900 text-xs sm:text-sm font-medium focus:ring-2 focus:ring-[#006a4e] focus:bg-white focus:outline-hidden transition-all"
            />
            <button
              type="submit"
              disabled={!inputMessage.trim() || isLoading}
              className="px-5 py-3 rounded-2xl bg-[#006a4e] hover:bg-emerald-800 text-white font-bold text-xs sm:text-sm flex items-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shadow-md transition-all"
            >
              <span>{language === 'bn' ? 'জিজ্ঞাসা' : 'Ask'}</span>
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
