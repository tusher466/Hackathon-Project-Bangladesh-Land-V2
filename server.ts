/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Bangladesh Integrated Land Services Portal (BILSP)
 * Express Backend Server with Vite Middleware Integration
 */

import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dns from 'dns';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

// Ensure IPv4 first on Linux container to prevent connection hangs
dns.setDefaultResultOrder('ipv4first');

import {
  LAND_SERVICES,
  CATEGORIES,
  INSTITUTIONS,
  EXTERNAL_WEBSITES,
  OFFICIAL_SOURCES,
  SAMPLE_LAND_OFFICES,
  INITIAL_AUDIT_LOGS
} from './src/data/registryData.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize GoogleGenAI SDK on server-side
const ai = process.env.GEMINI_API_KEY
  ? new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    })
  : null;

const app = express();
const PORT = parseInt(process.env.PORT || '3000', 10);
const isProd = process.env.NODE_ENV === 'production';

app.use(express.json());

// In-memory data store for server instance
let services = [...LAND_SERVICES];
let auditLogs = [...INITIAL_AUDIT_LOGS];

// API Routes

// Health Check
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'UP',
    portal: 'Bangladesh Integrated Land Services Portal (BILSP)',
    timestamp: new Date().toISOString(),
    version: '2.0.0-verified'
  });
});

// Categories
app.get('/api/categories', (_req: Request, res: Response) => {
  res.json(CATEGORIES);
});

// Institutions
app.get('/api/institutions', (_req: Request, res: Response) => {
  res.json(INSTITUTIONS);
});

// Websites
app.get('/api/websites', (_req: Request, res: Response) => {
  res.json(EXTERNAL_WEBSITES);
});

// Official Sources / Gazettes
app.get('/api/sources', (_req: Request, res: Response) => {
  res.json(OFFICIAL_SOURCES);
});

// Land Offices
app.get('/api/offices', (req: Request, res: Response) => {
  const { division, district } = req.query;
  let list = SAMPLE_LAND_OFFICES;
  if (division && typeof division === 'string') {
    list = list.filter(
      (o) => o.divisionEn.toLowerCase() === division.toLowerCase() || o.divisionBn === division
    );
  }
  if (district && typeof district === 'string') {
    list = list.filter(
      (o) => o.districtEn.toLowerCase() === district.toLowerCase() || o.districtBn === district
    );
  }
  res.json(list);
});

// Audit Logs
app.get('/api/audit-logs', (_req: Request, res: Response) => {
  res.json(auditLogs);
});

// Services query & filter
app.get('/api/services', (req: Request, res: Response) => {
  const { q, category, institution, type, status, popular } = req.query;
  let results = [...services];

  if (popular === 'true') {
    results = results.filter((s) => s.isPopular);
  }

  if (category && category !== 'all' && typeof category === 'string') {
    results = results.filter((s) => s.categoryId === category);
  }

  if (institution && institution !== 'all' && typeof institution === 'string') {
    results = results.filter((s) => s.institutionId === institution);
  }

  if (type && type !== 'all' && typeof type === 'string') {
    results = results.filter((s) => s.integrationType === type);
  }

  if (status && status !== 'all' && typeof status === 'string') {
    results = results.filter((s) => s.availabilityStatus === status);
  }

  if (q && typeof q === 'string' && q.trim()) {
    const query = q.toLowerCase().trim();
    results = results.filter((s) => {
      const matchNameBn = s.nameBn.toLowerCase().includes(query);
      const matchNameEn = s.nameEn.toLowerCase().includes(query);
      const matchDescBn = s.shortDescriptionBn.toLowerCase().includes(query);
      const matchDescEn = s.shortDescriptionEn.toLowerCase().includes(query);
      const matchKeywords = s.keywords.some((k) => k.toLowerCase().includes(query));
      const matchSynonymsBn = s.synonymsBn.some((syn) => syn.toLowerCase().includes(query));
      const matchSynonymsEn = s.synonymsEn.some((syn) => syn.toLowerCase().includes(query));
      return (
        matchNameBn ||
        matchNameEn ||
        matchDescBn ||
        matchDescEn ||
        matchKeywords ||
        matchSynonymsBn ||
        matchSynonymsEn
      );
    });
  }

  res.json({
    total: results.length,
    services: results
  });
});

// Single Service Detail
app.get('/api/services/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const service = services.find((s) => s.id === id || s.slug === id);
  if (!service) {
    res.status(404).json({ error: 'Service not found in BILSP registry' });
    return;
  }
  res.json(service);
});

// Mock Ping Diagnostics Endpoints for testing down & error conditions deterministically
app.all('/api/mock-ping/:code', (req: Request, res: Response) => {
  const code = parseInt(req.params.code, 10) || 500;
  if (code === 503) {
    res.status(503).json({ error: 'Service Unavailable', message: 'সার্ভিস সাময়িক বন্ধ / সার্ভার ডাউন' });
  } else if (code === 500) {
    res.status(500).json({ error: 'Internal Server Error', message: 'সার্ভারে অভ্যন্তরীণ ত্রুটি' });
  } else if (code === 404) {
    res.status(404).json({ error: 'Not Found', message: 'পৃষ্ঠাটি খুঁজে পাওয়া যায়নি' });
  } else if (code === 403) {
    res.status(403).json({ error: 'Forbidden', message: 'অ্যাক্সেস ব্লকড' });
  } else {
    res.status(200).json({ status: 'OK', message: 'সার্ভার সচল' });
  }
});

// Safe URL Availability Checker (Accurately detects down sites, errors & response times)
app.post('/api/check-url', async (req: Request, res: Response) => {
  const { url } = req.body;

  if (!url || typeof url !== 'string' || !url.trim()) {
    res.status(400).json({
      error: 'Valid URL is required',
      isReachable: false,
      status: 'OFFLINE',
      bengaliStatus: 'অসচল (ডাউন)',
      errorMessage: 'যথাযথ ওয়েব ঠিকানা (URL) প্রদান করুন'
    });
    return;
  }

  // Handle mock simulation URLs directly
  if (url.includes('/api/mock-ping/')) {
    const codeMatch = url.match(/\/api\/mock-ping\/(\d+)/);
    const code = codeMatch ? parseInt(codeMatch[1], 10) : 503;
    const isReachable = code >= 200 && code < 400;
    let errorMsg: string | undefined;
    if (code === 503) errorMsg = 'সার্ভিস সাময়িক বন্ধ / সার্ভার ওভারলোড বা ডাউন (HTTP 503 Service Unavailable)';
    else if (code === 500) errorMsg = 'সরকারি সার্ভারে অভ্যন্তরীণ ক্র্যাশ বা ত্রুটি (HTTP 500 Internal Server Error)';
    else if (code === 404) errorMsg = 'ওয়েব ঠিকানা বা পাতাটি খুঁজে পাওয়া যায়নি (HTTP 404 Not Found - পৃষ্ঠাটি অস্তিত্বহীন)';
    else if (code === 403) errorMsg = 'সার্ভার অ্যাক্সেস সংরক্ষিত / নিরাপত্তা ব্লকেড (HTTP 403 Forbidden / Access Denied)';

    res.json({
      id: `check-${Date.now()}`,
      urlChecked: url,
      httpStatusCode: code,
      responseTimeMs: 42,
      isReachable,
      status: isReachable ? 'ONLINE' : 'OFFLINE',
      bengaliStatus: isReachable ? 'সচল (অনলাইন)' : 'অসচল (ডাউন)',
      checkedAt: new Date().toISOString(),
      errorMessage: errorMsg
    });
    return;
  }

  // Automatically prepend https:// if protocol is omitted
  let targetUrl = url.trim();
  if (!/^https?:\/\//i.test(targetUrl)) {
    targetUrl = `https://${targetUrl}`;
  }

  try {
    const parsedUrl = new URL(targetUrl);
    const hostname = parsedUrl.hostname.toLowerCase();

    // Prevent SSRF to local and internal addresses
    if (
      hostname === 'localhost' ||
      hostname === '127.0.0.1' ||
      hostname === '0.0.0.0' ||
      hostname === '::1' ||
      hostname.startsWith('10.') ||
      hostname.startsWith('192.168.') ||
      hostname.startsWith('172.16.') ||
      hostname.startsWith('172.17.') ||
      hostname.startsWith('172.18.') ||
      hostname === '169.254.169.254'
    ) {
      res.json({
        id: `check-${Date.now()}`,
        urlChecked: targetUrl,
        httpStatusCode: 403,
        responseTimeMs: 0,
        isReachable: false,
        status: 'OFFLINE',
        bengaliStatus: 'অসচল (নিরাপত্তা ব্লকেড)',
        checkedAt: new Date().toISOString(),
        errorMessage: 'অভ্যন্তরীণ নেটওয়ার্ক ঠিকানা চেক করা নিরাপত্তা নীতিমালার লঙ্ঘন (Private IP Blocked)'
      });
      return;
    }

    const startTime = Date.now();
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 7000);

    try {
      // Standard browser headers to avoid being blocked by Cloudflare or WAF
      const pingRes = await fetch(targetUrl, {
        method: 'GET',
        signal: controller.signal,
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36 BILSP-Sentinel/2.0',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
          'Accept-Language': 'bn-BD,bn;q=0.9,en-US;q=0.8,en;q=0.7',
          'Cache-Control': 'no-cache'
        }
      });
      clearTimeout(timeout);
      const responseTimeMs = Date.now() - startTime;
      const isReachable = pingRes.status >= 200 && pingRes.status < 400;

      let errorMsg: string | undefined;
      if (!isReachable) {
        if (pingRes.status === 404) errorMsg = 'ওয়েব ঠিকানা বা পাতাটি খুঁজে পাওয়া যায়নি (HTTP 404 Not Found - পৃষ্ঠাটি অস্তিত্বহীন)';
        else if (pingRes.status === 403) errorMsg = 'সার্ভার অ্যাক্সেস সংরক্ষিত / নিরাপত্তা ব্লকেড (HTTP 403 Forbidden / Access Denied)';
        else if (pingRes.status === 401) errorMsg = 'সার্ভারে প্রমাণীকরণ প্রয়োজন (HTTP 401 Unauthorized)';
        else if (pingRes.status === 500) errorMsg = 'সরকারি সার্ভারে অভ্যন্তরীণ ক্র্যাশ বা ত্রুটি (HTTP 500 Internal Server Error)';
        else if (pingRes.status === 502) errorMsg = 'ব্যাড গেটওয়ে / আপস্ট্রিম সার্ভার ডাউন (HTTP 502 Bad Gateway - সার্ভার অফলাইন)';
        else if (pingRes.status === 503) errorMsg = 'সার্ভিস সাময়িক বন্ধ / সার্ভার ওভারলোড বা ডাউন (HTTP 503 Service Unavailable)';
        else if (pingRes.status === 504) errorMsg = 'গেটওয়ে টাইমআউট / সার্ভার সংযোগে সাড়া নেই (HTTP 504 Gateway Timeout)';
        else errorMsg = `অনাকাঙ্ক্ষিত সার্ভার রেসপন্স (HTTP ${pingRes.status})`;
      }

      res.json({
        id: `check-${Date.now()}`,
        urlChecked: targetUrl,
        httpStatusCode: pingRes.status,
        responseTimeMs,
        isReachable,
        status: isReachable ? 'ONLINE' : 'OFFLINE',
        bengaliStatus: isReachable ? 'সচল (অনলাইন)' : 'অসচল (ডাউন)',
        checkedAt: new Date().toISOString(),
        errorMessage: errorMsg
      });
    } catch (fetchErr: any) {
      clearTimeout(timeout);
      const responseTimeMs = Date.now() - startTime;
      const errCode = fetchErr.cause?.code || fetchErr.code || '';
      const errMsg = (fetchErr.cause?.message || fetchErr.message || '').toLowerCase();

      let reason = 'সার্ভার অফলাইন বা সংযোগ ব্যর্থ (Connection Failed / Host Unreachable)';
      if (fetchErr.name === 'AbortError' || fetchErr.cause?.name === 'AbortError' || errCode === 'UND_ERR_CONNECT_TIMEOUT' || errCode === 'ETIMEDOUT') {
        reason = 'টাইমআউট: নির্দিষ্ট সময়ে সার্ভার থেকে কোনো সাড়া মেলেনি (Request Timed Out - Host Unresponsive)';
      } else if (errCode === 'ENOTFOUND' || errMsg.includes('getaddrinfo') || errMsg.includes('not found')) {
        reason = 'ডোমেইন অস্তিত্বহীন বা ডিএনএস রেজোলিউশন ব্যর্থ (DNS Lookup Failed - Domain Does Not Exist)';
      } else if (errCode === 'ECONNREFUSED' || errMsg.includes('refused')) {
        reason = 'সার্ভার সংযোগ প্রত্যাখ্যান করেছে বা পোর্ট বন্ধ (Connection Refused - Server Down)';
      } else if (errCode === 'ECONNRESET' || errMsg.includes('reset') || errMsg.includes('closed')) {
        reason = 'সার্ভার হঠাৎ সংযোগ বিচ্ছিন্ন করেছে (Connection Reset by Remote Server)';
      } else if (errCode === 'CERT_HAS_EXPIRED' || errCode === 'DEPTH_ZERO_SELF_SIGNED_CERT' || errMsg.includes('certificate')) {
        reason = 'এসএসএল সার্টিফিকেট মেয়াদোত্তীর্ণ বা নিরাপত্তা সার্টিফিকেট সমস্যা (SSL Certificate Error)';
      } else if (errCode === 'UND_ERR_SOCKET') {
        reason = 'রিমোট সার্ভার সকেট বন্ধ বা সংযোগে ব্যর্থ (Remote Socket Closed / Server Down)';
      }

      res.json({
        id: `check-${Date.now()}`,
        urlChecked: targetUrl,
        httpStatusCode: null,
        responseTimeMs,
        isReachable: false,
        status: 'OFFLINE',
        bengaliStatus: 'অসচল (ডাউন)',
        checkedAt: new Date().toISOString(),
        errorMessage: reason
      });
    }
  } catch (err: any) {
    res.json({
      id: `check-${Date.now()}`,
      urlChecked: url,
      httpStatusCode: 400,
      responseTimeMs: 0,
      isReachable: false,
      status: 'OFFLINE',
      bengaliStatus: 'ভুল ঠিকানা',
      checkedAt: new Date().toISOString(),
      errorMessage: `ভুল বা অকার্যকর ওয়েব ঠিকানা ফরম্যাট (${err?.message || 'Invalid URL'})`
    });
  }
});

// ========================================================
// Bangladesh Land Sector AI Assistant ("ভূমি সহায়ক")
// ========================================================

const LAND_AI_SYSTEM_INSTRUCTION = `
আপনি "ভূমি সহায়ক" (Bhumi Shohayok), বাংলাদেশ সমন্বিত ভূমি সেবা পোর্টালের (BILSP) বুদ্ধিমান কৃত্রিম বুদ্ধিমত্তা সহকারী।
আপনার দায়িত্ব হলো বাংলাদেশের ভূমি প্রশাসন, ভূমি আইন ও বিধি, ভূমি রেকর্ড ও খতিয়ান (CS, SA, RS, BS), ই-নামজারি (Mutation), ভূমি উন্নয়ন কর (খাজনা), মৌজা নকশা, দলিল রেজিস্ট্রি, উত্তরাধিকার (ফারায়েজ) আইন, খাস জমি এবং জমি বিরোধ ও অভিযোগ প্রতিকার সম্পর্কে সাধারণ নাগরিক ও ভূমি মালিকদের নির্ভুল ও সময়োপযোগী সরকারি পরামর্শ দেওয়া।

নির্দেশনাবলী:
১. সবসময় বাংলাদেশের প্রচলিত ভূমি আইন (যেমন: The State Acquisition and Tenancy Act 1950, The Registration Act 1908, ভূমি অপরাধ প্রতিরোধ ও প্রতিকার আইন ২০২৩) এবং ভূমি মন্ত্রণালয়ের সর্বশেষ সরকারি পরিপত্র অনুযায়ী উত্তর দিন।
২. নামজারি (ই-নামজারি) সময়সীমা সাধারণ ক্ষেত্রে সর্বোচ্চ ২৮ কার্যদিবস। মোট নির্ধারিত সরকারি ফি ১,১৭০ টাকা (আবেদন কোর্ট ফি ২০ টাকা + নোটিশ জারি ৫০ টাকা + রেকর্ড সংশোধন ১,০০০ টাকা + খতিয়ান ফি ১০০ টাকা)। এর বাইরে দালাল বা কাউকে কোনো অতিরিক্ত টাকা দেওয়া সম্পূর্ণ বেআইনি।
৩. ভূমি উন্নয়ন কর (খাজনা): ldtax.gov.bd পোর্টালের মাধ্যমে অনলাইনে এনআইডি ও হোল্ডিং এন্ট্রির পর নগদ, বিকাশ, রকেট বা কার্ডে কর পরিশোধ করা যায় এবং অবিলম্বে কিউআর কোডযুক্ত বৈধ দাখিলা ডাউনলোড করা যায়।
৪. খতিয়ানের ধারাবাহিকতা: ব্রিটিশ আমলের সিএস (১৮৮৮-১৯৪০) -> জমিদারি উচ্ছেদ পরবর্তী এসএ (১৯৫৬-১৯৬২) -> সংশোধনী আরএস (১৯৬৫-১৯৯০) -> সাম্প্রতিক বিএস বা সিটি জরিপ (১৯৯৮+)। জমি কেনার পূর্বে এই ধারাবাহিক বায়া দলিল ও খতিয়ান অবশ্যই পরীক্ষা করতে হবে।
৫. দলিলের রেজিস্ট্রেশন ফি: স্ট্যাম্প শুল্ক ১.৫%, নিবন্ধন ফি ১%, স্থানীয় সরকার কর ২-৩% এবং প্রযোজ্য ক্ষেত্রে উৎসে কর (AIT)।
৬. উত্তরাধিকার (ফারায়েজ): মুসলিম উত্তরাধিকার আইন ও হিন্দু উত্তরাধিকার আইন অনুযায়ী সঠিক বণ্টন নীতিমালা বুঝিয়ে দিন।
৭. কোনো হয়রানি, দুর্নীতি বা অভিযোগের ক্ষেত্রে ভূমি মন্ত্রণালয়ের সেবা হেল্পলাইন ১৬১২২ (১৬১২২) অথবা hotline.land.gov.bd ব্যবহারের পরামর্শ দিন।
৮. উত্তরগুলো পরিষ্কার, প্রাঞ্জল ও বুলেট পয়েন্টে সাজিয়ে দিন যাতে একজন সাধারণ মানুষ সহজে বুঝতে পারেন। সংশ্লিষ্ট সরকারি পোর্টালের সঠিক লিঙ্ক (যেমন: mutation.land.gov.bd, ldtax.gov.bd, eporcha.gov.bd, dlrs.gov.bd) উল্লেখ করুন।
৯. ব্যবহারকারী যে ভাষায় প্রশ্ন করবেন (বাংলা অথবা ইংরেজি), সেই ভাষাতেই সম্মানজনক ও সহায়ক ভঙ্গিতে উত্তর দিন।
`;

// Pre-trained Fallback Knowledge Base for Common Land Inquiries
const LAND_KNOWLEDGE_BASE: Record<string, { bn: string; en: string; links?: Array<{ title: string; url: string }> }> = {
  namjari: {
    bn: `### ই-নামজারি (E-Mutation) সম্পর্কিত সরকারি নির্দেশিকা

**১. নামজারি কী?**
কোনো জমি ক্রয়, ওয়ারিশ, হেবা বা অন্য কোনো উপায়ে মালিকানা পরিবর্তন হলে পূর্বের মালিকের নামের পরিবর্তে সরকারি রেকর্ডে নতুন মালিকের নাম প্রতিস্থাপন করাই হলো নামজারি বা মিউটেশন।

**২. মোট সরকারি ফি (একদম সুনির্দিষ্ট):**
* আবেদন ফি (কোর্ট ফি): ২০ টাকা
* নোটিশ জারি ফি: ৫০ টাকা
* রেকর্ড সংশোধন ফি: ১,০০০ টাকা
* খতিয়ান সরবরাহ ফি: ১০০ টাকা
* **সর্বমোট সরকারি ফি:** **১,১৭০ টাকা** (অনলাইনে ডি-চালানের মাধ্যমে প্রদেয়)। কোনো মধ্যস্বত্বভোগী বা দালালকে বাড়তি টাকা দেবেন না।

**৩. নিষ্পত্তির সময়সীমা:**
* সাধারণ আবেদনের ক্ষেত্রে: **সর্বোচ্চ ২৮ কার্যদিবস**
* প্রবাসী বা বিশেষ ক্ষেত্রে অগ্রাধিকার বিবেচনায়: ১৫-২১ কার্যদিবস

**৪. প্রয়োজনীয় কাগজপত্র:**
১. আবেদনকারীর জাতীয় পরিচয়পত্র (NID) ও মোবাইল নম্বর
২. মূল রেজিস্ট্রিকৃত দলিল ও বায়া দলিল (মালিকানার ধারাবাহিকতা প্রমাণের জন্য)
৩. পূর্ববর্তী খতিয়ানের জাবেদা নকল (সিএস, এসএ বা আরএস)
৪. ওয়ারিশান সনদ (ওয়ারিশসূত্রে প্রাপ্ত জমির ক্ষেত্রে)
৫. হালনাগাদ ভূমি উন্নয়ন কর (খাজনা) পরিশোধের দাখিলা

**৫. আবেদনের লিংক:**
সরাসরি অফিসিয়াল পোর্টাল: [mutation.land.gov.bd](https://mutation.land.gov.bd/)`,
    en: `### E-Mutation (নামজারি) Official Guidelines

**1. What is Mutation?**
When land ownership transfers through purchase, inheritance, or gift, updating the official Record of Rights (RoR) from the previous owner's name to the new owner's name is called Mutation.

**2. Exact Statutory Government Fees:**
* Application Court Fee: 20 BDT
* Notice Issuance Fee: 50 BDT
* Record Correction Fee: 1,000 BDT
* Khatian Delivery Fee: 100 BDT
* **Total Official Fee: 1,170 BDT** (Payable exclusively online via D-Challan/e-payment).

**3. Official Timeline:**
* Standard application: **Max 28 working days**.

**4. Required Documents:**
1. Applicant NID and verified mobile number
2. Registered Title Deed and Previous Chain of Deeds (Baya Deeds)
3. Certified copy of previous Khatian (CS/SA/RS)
4. Warishan (Succession) Certificate if acquired via inheritance
5. Latest Land Development Tax clearance receipt (e-Dakhila)

**5. Apply Online:**
Official Portal: [https://mutation.land.gov.bd/](https://mutation.land.gov.bd/)`,
    links: [
      { title: 'ই-নামজারি আবেদন পোর্টাল', url: 'https://mutation.land.gov.bd/' },
      { title: 'নামজারি আবেদন ট্র্যাকিং', url: 'https://mutation.land.gov.bd/search-application' }
    ]
  },
  ldtax: {
    bn: `### ভূমি উন্নয়ন কর (অনলাইন খাজনা) সম্পর্কিত তথ্য

**১. খাজনা কীভাবে অনলাইনে পরিশোধ করবেন?**
১ম ধাপ: [ldtax.gov.bd](https://ldtax.gov.bd/) পোর্টালে গিয়ে আপনার মোবাইল নম্বর ও এনআইডি দিয়ে নাগরিক হিসেবে নিবন্ধন করুন।
২য় ধাপ: আপনার খতিয়ান ও দাগ নম্বর দিয়ে সংশ্লিষ্ট ইউনিয়ন ভূমি সহকারী কর্মকর্তার নিকট হোল্ডিং এন্ট্রি আবেদন করুন।
৩য় ধাপ: হোল্ডিং অনুমোদিত হলে বকেয়া ও চলতি করের পরিমাণ স্বয়ংক্রিয়ভাবে প্রদর্শিত হবে।
৪র্থ ধাপ: বিকাশ, নগদ, রকেট, উপায় বা ব্যাংক কার্ডের মাধ্যমে অনলাইনে তাৎক্ষণিক পরিশোধ করুন।
৫ম ধাপ: কিউআর কোডযুক্ত ডিজিটাল দাখিলা (রশিদ) প্রিন্ট বা পিডিএফ সংরক্ষণ করুন।

**২. গুরুত্বপূর্ণ তথ্য:**
* কৃষি জমির ক্ষেত্রে ২৫ বিঘা (৮.২৫ একর) পর্যন্ত পরিবারের সর্বমোট জমির জন্য কোনো মূল কর নেই, তবে বার্ষিক নামমাত্র মওকুফ দাখিলা ফি প্রযোজ্য।
* বাণিজ্যিক ও আবাসিক জমির কর এলাকাভিত্তিক সরকারি গেজেট হারে নির্ধারিত হয়।
* দাখিলায় সহকারী কর্মকর্তার কোনো সনাতন সিল বা সই প্রয়োজন নেই; ডিজিটাল কিউআর কোডই আইনিভাবে শতভাগ কার্যকর।`,
    en: `### Land Development Tax (LD Tax / অনলাইন খাজনা)

**How to pay online:**
1. Register with your Mobile Number and NID at [ldtax.gov.bd](https://ldtax.gov.bd/).
2. Submit your Khatian and Dag details to establish your digital holding number.
3. Once approved by the Union Land Officer, the calculated tax amount will appear.
4. Pay instantly via mobile financial services (bKash, Nagad, Rocket) or cards.
5. Download your QR-code-authenticated e-Dakhila (tax receipt). No manual signature needed.`,
    links: [
      { title: 'ভূমি উন্নয়ন কর পোর্টাল', url: 'https://ldtax.gov.bd/' },
      { title: 'হোল্ডিং যাচাই ও দাখিলা', url: 'https://ldtax.gov.bd/holding' }
    ]
  },
  khatian: {
    bn: `### সিএস, এসএ, আরএস ও বিএস খতিয়ানের পরিচিতি ও পার্থক্য

**১. সিএস জরিপ (Cadastral Survey / CS):**
* সময়কাল: ১৮৮৮ - ১৯৪০ (ব্রিটিশ শাসনামল)
* তাৎপর্য: এটি ভারতীয় উপমহাদেশের প্রথম বৈজ্ঞানিক কিস্তোয়ার ভূমি জরিপ। সিএস খতিয়ান হলো সকল জমির আদি ভিত্তি রেকর্ড।

**২. এসএ জরিপ (State Acquisition Survey / SA):**
* সময়কাল: ১৯৫৬ - ১৯৬২ (জমিদারি প্রথা বিলুপ্তির পর)
* তাৎপর্য: ১৯৫০ সালের রাষ্ট্রীয় অধিগ্রহণ ও প্রজাস্বত্ব আইনের অধীনে জমিদারদের অতিরিক্ত জমি অধিগ্রহণ ও প্রকৃত রায়তদের নামে প্রস্তুতকৃত রেকর্ড। জরুরি ভিত্তিতে তৈরি হওয়ায় এতে কিছু ভুলভ্রান্তি ছিল।

**৩. আরএস জরিপ (Revisional Survey / RS):**
* সময়কাল: ১৯৬৫ - ১৯৯০
* তাৎপর্য: এসএ জরিপের ভুলত্রুটি সরেজমিনে সংশোধন ও আধুনিকায়ন করে প্রস্তুতকৃত সবচেয়ে নির্ভরযোগ্য প্রামাণ্য রেকর্ড।

**৪. বিএস / সিটি জরিপ (Bangladesh Survey / BS):**
* সময়কাল: ১৯৯৮ - বর্তমান
* তাৎপর্য: স্বাধীন বাংলাদেশে আধুনিক ডিজিটাল প্রযুক্তি ও থিওডোলাইট দিয়ে পরিচালিত চলমান জরিপ। ঢাকা মহানগরে এটি 'সিটি জরিপ' নামে পরিচিত।

**অনলাইনে খতিয়ান দেখার লিংক:** [eporcha.gov.bd](https://eporcha.gov.bd/)`,
    en: `### CS, SA, RS and BS Khatians: Historical Chronology & Differences

**1. CS (Cadastral Survey):** 1888–1940 (British Bengal). The baseline scientific cadastral survey of Bangladesh.
**2. SA (State Acquisition Survey):** 1956–1962. Created following the abolition of the Zamindari system under SATA 1950.
**3. RS (Revisional Survey):** 1965–1990. Conducted on-ground to rectify errors in the fast-tracked SA survey. Highly authoritative in court.
**4. BS / City Survey (Bangladesh Survey):** 1998–Present. Modern survey conducted in sovereign Bangladesh. Known as City Survey in Dhaka metropolitan area.

**Online Record Search:** [https://eporcha.gov.bd/](https://eporcha.gov.bd/)`,
    links: [
      { title: 'ই-পর্চা খতিয়ান অনুসন্ধান', url: 'https://eporcha.gov.bd/' }
    ]
  },
  warishan: {
    bn: `### উত্তরাধিকার (ফারায়েজ) ও ওয়ারিশান জমি বণ্টনের নিয়মাবলী

**১. মুসলিম উত্তরাধিকার বণ্টন মূলনীতি:**
* পিতা মৃত হলে স্ত্রী পাবেন: সন্তান থাকলে মোট সম্পত্তির ১/৮ অংশ (১২.৫%), সন্তান না থাকলে ১/৪ অংশ (২৫%)।
* মাতা পাবেন: ১/৬ অংশ (যদি মৃত ব্যক্তির সন্তান বা একাধিক ভাই-বোন থাকে)।
* পিতা পাবেন: ১/৬ অংশ।
* অবশিষ্ট অংশ (আসাবা): পুত্র ও কন্যারা বণ্টন করবেন ২:১ অনুপাতে (অর্থাৎ একজন পুত্র পাবেন একজন কন্যার দ্বিগুণ অংশ)।

**২. আপস বণ্টননামা দলিল (Partition Deed):**
উত্তরাধিকারীদের মধ্যে মৌখিক বণ্টন কোনো স্থায়ী আইনি সমাধান নয়। রেজিস্ট্রেশন আইনের ১৯বি ধারা অনুযায়ী সকল ওয়ারিশকে একটি রেজিস্ট্রিকৃত "আপস বণ্টননামা দলিল" সম্পাদন করতে হবে এবং পরবর্তীতে নিজ নিজ নামে পৃথক নামজারি (ই-নামজারি) সম্পন্ন করতে হবে।`,
    en: `### Property Inheritance & Farayej Division Guidelines

**Muslim Succession Core Shares:**
* Surviving Wife: 1/8th share if children exist; 1/4th if no children.
* Mother: 1/6th share if children or multiple siblings exist.
* Father: 1/6th share.
* Residuary (Asaba): Sons and daughters inherit the remainder in a 2:1 ratio (sons receive double the daughter's portion).

**Legal Requirement:**
Oral or informal partition is legally insecure. Under Section 19B of The Registration Act, all co-heirs must execute and register a formal Partition Deed (আপস বণ্টননামা দলিল), followed by independent E-Mutation.`,
    links: [
      { title: 'উত্তরাধিকার ক্যালকুলেটর (নাগরিক ড্যাশবোর্ড)', url: '#' }
    ]
  },
  checklist: {
    bn: `### জমি কেনার পূর্বে ৬ দফা যাচাই চেকলিস্ট (জালিয়াতি রোধে)

১. **মালিকানার ধারাবাহিকতা (Chain of Title):** বিক্রেতা কীভাবে জমির মালিক হলেন (ক্রয়, ওয়ারিশ, নাকি দান)? সিএস, এসএ, আরএস থেকে বর্তমান বিক্রেতা পর্যন্ত বায়া দলিলের ধারাবাহিক মিল আছে কিনা যাচাই করুন।
২. **হালনাগাদ নামজারি খতিয়ান:** বিক্রেতার নিজ নামে সহকারী কমিশনার (ভূমি) কর্তৃক জারিকৃত নামজারি খতিয়ান এবং ডিসিআর রশিদ আছে কিনা দেখুন।
৩. **ভূমি উন্নয়ন কর পরিশোধ:** চলতি অর্থবছরের কিউআর কোডযুক্ত খাজনার দাখিলা অনলাইনে যাচাই করুন।
৪. **সাব-রেজিস্ট্রি অফিসে তল্লাশ (১২ বছরের এনইসি):** জমিটি পূর্বে অন্য কারো কাছে বিক্রি বা ব্যাংকে বন্ধক রাখা আছে কিনা তা যাচাইয়ের জন্য সাব-রেজিস্ট্রি অফিসে তল্লাশ দিন।
৫. **সরকারি খাস বা অর্পিত সম্পত্তি যাচাই:** জমিটি বন বিভাগ, ওয়াকফ, অর্পিত সম্পত্তি 'ক' তালিকাভুক্ত বা খাস জমি কিনা নিশ্চিত হোন।
৬. **সরেজমিন দখল ও নকশা পরিমাপ:** মৌজা ম্যাপের সাথে দাগ মিলিয়ে সরকারি আমিন বা পেশাদার সার্ভেয়ার দিয়ে সরেজমিনে চৌহদ্দি ও দখল পরীক্ষা করুন।`,
    en: `### 6-Step Verification Checklist Before Purchasing Land

1. **Chain of Title:** Confirm continuous title documentation from CS/SA/RS to the seller via original registered deeds.
2. **Seller's Own Mutation Khatian:** Ensure mutation was issued directly in the seller's name by the AC (Land) with DCR receipt.
3. **Current LD Tax Clearance:** Verify QR-code e-Dakhila for the current fiscal year.
4. **12-Year Search & Non-Encumbrance:** Verify with the Sub-Registry office that the parcel has not been mortgaged or pre-sold.
5. **Government & Vested Land Check:** Confirm the plot is not classified as Khas, Vested Property (Ka/Kha schedule), or Waqf.
6. **Physical On-Ground Demarcation:** Match physical boundaries with official Mouza map sheets through an authorized surveyor.`,
    links: [
      { title: 'ই-পর্চা যাচাই', url: 'https://eporcha.gov.bd/' },
      { title: 'ভূমি কর যাচাই', url: 'https://ldtax.gov.bd/' }
    ]
  }
};

// AI Assistant endpoint
app.post('/api/ai/land-assistant', async (req: Request, res: Response) => {
  const { prompt, language = 'bn', history = [] } = req.body;

  if (!prompt || typeof prompt !== 'string' || !prompt.trim()) {
    res.status(400).json({ error: 'Prompt is required' });
    return;
  }

  const query = prompt.trim().toLowerCase();

  // Try Gemini API first if configured
  if (ai) {
    try {
      // Build contents with conversation history
      const formattedHistory = Array.isArray(history)
        ? history.slice(-6).map((msg) => ({
            role: msg.role === 'model' ? 'model' : 'user',
            parts: [{ text: msg.text }]
          }))
        : [];

      formattedHistory.push({
        role: 'user',
        parts: [{ text: `${prompt}\n(Please respond in ${language === 'bn' ? 'Bengali (বাংলা)' : 'English'}).` }]
      });

      // Try gemini-3-flash-preview first, fallback to gemini-3.8-flash
      let answerText = '';
      let usedModel = 'gemini-3-flash-preview';

      try {
        const response = await ai.models.generateContent({
          model: 'gemini-3-flash-preview',
          contents: formattedHistory,
          config: {
            systemInstruction: LAND_AI_SYSTEM_INSTRUCTION,
            temperature: 0.4,
            topP: 0.95
          }
        });
        answerText = response.text || '';
      } catch (mErr) {
        console.warn('gemini-3-flash-preview attempt failed, trying gemini-3.8-flash:', mErr);
        usedModel = 'gemini-3.8-flash';
        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: formattedHistory,
          config: {
            systemInstruction: LAND_AI_SYSTEM_INSTRUCTION,
            temperature: 0.4,
            topP: 0.95
          }
        });
        answerText = response.text || '';
      }

      if (answerText.trim()) {
        res.json({
          success: true,
          source: usedModel,
          answer: answerText,
          suggestedLinks: [
            { title: 'ই-নামজারি পোর্টাল', url: 'https://mutation.land.gov.bd/' },
            { title: 'ভূমি উন্নয়ন কর (ldtax)', url: 'https://ldtax.gov.bd/' },
            { title: 'ই-পর্চা খতিয়ান', url: 'https://eporcha.gov.bd/' },
            { title: 'ডিএলআরএস মৌজা ম্যাপ', url: 'https://dlrs.gov.bd/' },
            { title: 'ভূমি হেল্পলাইন ১৬১২২', url: 'https://hotline.land.gov.bd/' }
          ]
        });
        return;
      }
    } catch (err: any) {
      console.warn('[Gemini AI] API call failed or quota reached, falling back to land domain engine:', err?.message || err);
      // Fall through to domain fallback engine below
    }
  }

  // Pre-trained Domain Expert Engine Fallback
  let matchedTopic = 'checklist';
  if (query.includes('নামজারি') || query.includes('মিউটেশন') || query.includes('mutation') || query.includes('খারিজ') || query.includes('ফি') || query.includes('১,১৭০') || query.includes('1170')) {
    matchedTopic = 'namjari';
  } else if (query.includes('খাজনা') || query.includes('কর') || query.includes('ldtax') || query.includes('tax') || query.includes('দাখিলা') || query.includes('হোল্ডিং')) {
    matchedTopic = 'ldtax';
  } else if (query.includes('খতিয়ান') || query.includes('পর্চা') || query.includes('cs') || query.includes('sa') || query.includes('rs') || query.includes('bs') || query.includes('khatian') || query.includes('জরিপ')) {
    matchedTopic = 'khatian';
  } else if (query.includes('ওয়ারিশ') || query.includes('ফারায়েজ') || query.includes('বণ্টন') || query.includes('উত্তরাধিকার') || query.includes('inheritance') || query.includes('স্ত্রী') || query.includes('পুত্র')) {
    matchedTopic = 'warishan';
  }

  const knowledge = LAND_KNOWLEDGE_BASE[matchedTopic] || LAND_KNOWLEDGE_BASE.checklist;
  const reply = language === 'bn' ? knowledge.bn : knowledge.en;

  res.json({
    success: true,
    source: 'bilsp-land-expert-engine',
    answer: reply,
    suggestedLinks: knowledge.links || [
      { title: 'ই-নামজারি পোর্টাল', url: 'https://mutation.land.gov.bd/' },
      { title: 'ভূমি কর পোর্টাল', url: 'https://ldtax.gov.bd/' },
      { title: 'ই-পর্চা খতিয়ান', url: 'https://eporcha.gov.bd/' }
    ]
  });
});

// Admin: Update service
app.post('/api/admin/services', (req: Request, res: Response) => {
  const updatedService = req.body;
  if (!updatedService || !updatedService.id) {
    res.status(400).json({ error: 'Invalid service payload' });
    return;
  }

  const idx = services.findIndex((s) => s.id === updatedService.id);
  if (idx !== -1) {
    services[idx] = updatedService;
  } else {
    services.unshift(updatedService);
  }

  const newLog = {
    id: `log-${Date.now()}`,
    action: idx !== -1 ? ('UPDATE' as const) : ('CREATE' as const),
    targetType: 'SERVICE' as const,
    targetId: updatedService.id,
    targetName: updatedService.nameBn || 'New Service',
    performedBy: 'Verified Admin',
    timestamp: new Date().toISOString(),
    details: `Updated registry service record (${updatedService.lastVerifiedDate})`
  };
  auditLogs.unshift(newLog);

  res.json({ success: true, service: updatedService });
});

// Start dev or production server
async function startServer() {
  if (!isProd) {
    // Dynamic import of Vite in dev
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    // Serve static files from dist in production
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[BILSP Server] Listening on http://0.0.0.0:${PORT} (mode: ${isProd ? 'production' : 'development'})`);
  });
}

startServer();
