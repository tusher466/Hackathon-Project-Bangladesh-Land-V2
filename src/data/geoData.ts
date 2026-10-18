/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Bangladesh Integrated Land Services Portal (BILSP)
 * Geospatial Hierarchy Data (8 Divisions, 64 Districts, Upazilas, Cadastral Parcels,
 * Land Offices, and Complete CS / SA / RS Historical Survey Dataset)
 */

import {
  Division,
  District,
  Upazila,
  DemoParcel,
  LandOfficeMarker,
  SurveyRecordMarker
} from '../types/authAndGeo';

// ========================================================
// 1. BANGLADESH INTERNATIONAL BORDER OUTLINE (GPS POLYGON)
// Precise coordinate loop separating Bangladesh from the world map
// ========================================================
export const BANGLADESH_BORDER_COORDINATES: [number, number][] = [
  // North-West (Panchagarh / Tetulia border)
  [26.634, 88.363],
  [26.541, 88.520],
  [26.312, 88.423],
  [26.152, 88.614],
  [26.248, 88.892],
  [26.185, 89.053],

  // North (Nilphamari & Lalmonirhat - Teesta / Dharla entry)
  [26.311, 89.284],
  [26.142, 89.582],
  [26.012, 89.815],
  [25.824, 89.982],

  // North-Central (Kurigram / Brahmaputra entry, Jamalpur, Sherpur Garo Hills)
  [25.431, 89.921],
  [25.263, 90.124],
  [25.184, 90.412],
  [25.152, 90.814],

  // North-East (Sunamganj, Jaflong / Tamabil, Sylhet, Zakiganj Surma-Kushiyara confluence)
  [25.195, 91.242],
  [25.183, 92.015],
  [25.021, 92.231],
  [24.882, 92.514],
  [24.623, 92.421],

  // East (Moulvibazar, Habiganj, Brahmanbaria, Cumilla, Feni)
  [24.312, 92.124],
  [24.115, 91.521],
  [23.952, 91.314],
  [23.512, 91.385],
  [23.184, 91.452],
  [23.012, 91.684],

  // South-East (Khagrachhari, Rangamati, Chittagong Hill Tracts, Bandarban, Teknaf)
  [23.214, 92.012],
  [22.842, 92.412],
  [22.384, 92.553],
  [21.842, 92.584],
  [21.412, 92.361],
  [20.915, 92.284], // Teknaf southern tip
  [20.612, 92.342], // St. Martin's Island
  [20.884, 92.152],

  // Southern Coast (Cox's Bazar, Kutubdia, Chittagong Port, Sandwip Channel)
  [21.452, 91.954],
  [21.815, 91.882],
  [22.284, 91.751],
  [22.612, 91.521],

  // Meghna Estuary & Southern Delta Islands (Bhola, Patuakhali, Kuakata)
  [22.421, 90.952],
  [21.912, 90.714],
  [21.814, 90.152], // Kuakata coast

  // South-West Coast & Sundarbans Mangrove Boundary (Barguna, Sundarbans, Hiron Point, Raimangal River)
  [21.752, 89.652], // Hiron Point
  [21.824, 89.215],
  [22.184, 89.052], // Raimangal estuary / India border

  // West (Satkhira, Jashore, Chuadanga, Meherpur, Kushtia - Padma river entry)
  [22.652, 88.914],
  [23.152, 88.824],
  [23.484, 88.652],
  [23.815, 88.584],
  [24.112, 88.352],

  // North-West (Rajshahi Padma bank, Chapainawabganj, Naogaon, Dinajpur, Thakurgaon)
  [24.452, 88.182],
  [24.815, 88.152],
  [25.184, 88.452],
  [25.612, 88.482],
  [26.152, 88.252],
  [26.634, 88.363] // Closes at Tetulia
];

// Inverse World Mask Polygon for Leaflet (Covers entire planet except Bangladesh)
export const WORLD_MASK_POLYGON: [number, number][][] = [
  // Outer Ring (Entire Earth)
  [
    [-85, -180],
    [-85, 180],
    [85, 180],
    [85, -180],
    [-85, -180]
  ],
  // Inner Ring (Cutout Hole of Bangladesh)
  BANGLADESH_BORDER_COORDINATES
];

// ========================================================
// 2. EIGHT ADMINISTRATIVE DIVISIONS (WITH ACCURATE POLYGONS)
// ========================================================
export const DIVISIONS: Division[] = [
  {
    id: 'div-rangpur',
    code: 'RP',
    nameBn: 'রংপুর',
    nameEn: 'Rangpur',
    centerLat: 25.7439,
    centerLng: 89.2752,
    svgPath: 'M 140 40 L 220 50 L 250 110 L 220 180 L 150 170 L 110 130 Z',
    districtsCount: 8,
    upazilasCount: 58,
    areaKm2: 16185,
    populationEstimate: '১ কোটি ৭৬ লাখ',
    color: '#0284c7',
    polygonCoordinates: [
      [26.634, 88.363],
      [26.541, 88.520],
      [26.185, 89.053],
      [26.311, 89.284],
      [26.012, 89.815],
      [25.431, 89.921],
      [25.182, 89.512],
      [25.184, 88.452],
      [25.612, 88.482],
      [26.152, 88.252],
      [26.634, 88.363]
    ]
  },
  {
    id: 'div-mymensingh',
    code: 'MYM',
    nameBn: 'ময়মনসিংহ',
    nameEn: 'Mymensingh',
    centerLat: 24.7471,
    centerLng: 90.4203,
    svgPath: 'M 250 110 L 340 120 L 350 190 L 270 210 L 220 180 Z',
    districtsCount: 4,
    upazilasCount: 35,
    areaKm2: 10584,
    populationEstimate: '১ কোটি ২৩ লাখ',
    color: '#0d9488',
    polygonCoordinates: [
      [25.431, 89.921],
      [25.263, 90.124],
      [25.184, 90.412],
      [25.152, 90.814],
      [25.012, 91.152],
      [24.512, 90.952],
      [24.312, 90.252],
      [24.612, 89.782],
      [25.182, 89.512],
      [25.431, 89.921]
    ]
  },
  {
    id: 'div-sylhet',
    code: 'SYL',
    nameBn: 'সিলেট',
    nameEn: 'Sylhet',
    centerLat: 24.8949,
    centerLng: 91.8687,
    svgPath: 'M 340 120 L 460 130 L 480 230 L 370 240 L 350 190 Z',
    districtsCount: 4,
    upazilasCount: 41,
    areaKm2: 12596,
    populationEstimate: '১ কোটি ২১ লাখ',
    color: '#10b981',
    polygonCoordinates: [
      [25.195, 91.242],
      [25.183, 92.015],
      [25.021, 92.231],
      [24.882, 92.514],
      [24.623, 92.421],
      [24.312, 92.124],
      [24.115, 91.521],
      [24.412, 91.252],
      [25.012, 91.152],
      [25.195, 91.242]
    ]
  },
  {
    id: 'div-rajshahi',
    code: 'RAJ',
    nameBn: 'রাজশাহী',
    nameEn: 'Rajshahi',
    centerLat: 24.3636,
    centerLng: 88.6241,
    svgPath: 'M 110 130 L 220 180 L 230 290 L 130 280 L 80 210 Z',
    districtsCount: 8,
    upazilasCount: 67,
    areaKm2: 18153,
    populationEstimate: '২ কোটি ৩ লাখ',
    color: '#f59e0b',
    polygonCoordinates: [
      [25.182, 89.512],
      [24.612, 89.782],
      [24.182, 89.712],
      [23.952, 89.312],
      [24.112, 88.352],
      [24.452, 88.182],
      [24.815, 88.152],
      [25.184, 88.452],
      [25.182, 89.512]
    ]
  },
  {
    id: 'div-dhaka',
    code: 'DHK',
    nameBn: 'ঢাকা',
    nameEn: 'Dhaka',
    centerLat: 23.8103,
    centerLng: 90.4125,
    svgPath: 'M 230 210 L 350 190 L 370 240 L 340 370 L 240 360 L 230 290 Z',
    districtsCount: 13,
    upazilasCount: 93,
    areaKm2: 20594,
    populationEstimate: '৪ কোটি ৪২ লাখ',
    color: '#006a4e',
    polygonCoordinates: [
      [24.512, 90.952],
      [24.115, 91.521],
      [23.952, 91.314],
      [23.512, 90.812],
      [23.112, 90.452],
      [23.152, 89.852],
      [23.612, 89.652],
      [23.952, 89.312],
      [24.182, 89.712],
      [24.312, 90.252],
      [24.512, 90.952]
    ]
  },
  {
    id: 'div-khulna',
    code: 'KHL',
    nameBn: 'খুলনা',
    nameEn: 'Khulna',
    centerLat: 22.8456,
    centerLng: 89.5403,
    svgPath: 'M 130 280 L 240 290 L 250 420 L 220 540 L 120 520 L 100 370 Z',
    districtsCount: 10,
    upazilasCount: 59,
    areaKm2: 22284,
    populationEstimate: '১ কোটি ৭৪ লাখ',
    color: '#6366f1',
    polygonCoordinates: [
      [23.952, 89.312],
      [23.612, 89.652],
      [23.152, 89.852],
      [22.612, 89.852],
      [22.184, 89.752],
      [21.752, 89.652],
      [21.824, 89.215],
      [22.184, 89.052],
      [22.652, 88.914],
      [23.152, 88.824],
      [23.484, 88.652],
      [23.815, 88.584],
      [24.112, 88.352],
      [23.952, 89.312]
    ]
  },
  {
    id: 'div-barishal',
    code: 'BAR',
    nameBn: 'বরিশাল',
    nameEn: 'Barishal',
    centerLat: 22.7010,
    centerLng: 90.3535,
    svgPath: 'M 240 360 L 320 370 L 340 480 L 280 540 L 220 540 L 250 420 Z',
    districtsCount: 6,
    upazilasCount: 42,
    areaKm2: 13225,
    populationEstimate: '৯১ লাখ',
    color: '#8b5cf6',
    polygonCoordinates: [
      [23.112, 90.452],
      [22.952, 90.852],
      [22.421, 90.952],
      [21.912, 90.714],
      [21.814, 90.152],
      [22.184, 89.752],
      [22.612, 89.852],
      [23.152, 89.852],
      [23.112, 90.452]
    ]
  },
  {
    id: 'div-chattogram',
    code: 'CTG',
    nameBn: 'চট্টগ্রাম',
    nameEn: 'Chattogram',
    centerLat: 22.3569,
    centerLng: 91.7832,
    svgPath: 'M 370 240 L 480 230 L 510 400 L 480 620 L 410 650 L 380 470 L 320 370 Z',
    districtsCount: 11,
    upazilasCount: 103,
    areaKm2: 33909,
    populationEstimate: '৩ কোটি ৩২ লাখ',
    color: '#e11d48',
    polygonCoordinates: [
      [23.952, 91.314],
      [23.512, 91.385],
      [23.184, 91.452],
      [23.012, 91.684],
      [23.214, 92.012],
      [22.842, 92.412],
      [22.384, 92.553],
      [21.842, 92.584],
      [21.412, 92.361],
      [20.915, 92.284],
      [20.612, 92.342],
      [21.452, 91.954],
      [21.815, 91.882],
      [22.284, 91.751],
      [22.612, 91.521],
      [22.952, 90.852],
      [23.512, 90.812],
      [23.952, 91.314]
    ]
  }
];

// ========================================================
// 3. ALL 64 DISTRICTS OF BANGLADESH
// Fully enumerated across all 8 divisions with verified coordinates
// ========================================================
export const DISTRICTS: District[] = [
  // --- DHAKA DIVISION (13 Districts) ---
  { id: 'dist-dhaka', divisionId: 'div-dhaka', code: 'DHK', nameBn: 'ঢাকা', nameEn: 'Dhaka', centerLat: 23.8103, centerLng: 90.4125, upazilasCount: 6, areaKm2: 1463 },
  { id: 'dist-gazipur', divisionId: 'div-dhaka', code: 'GAZ', nameBn: 'গাজীপুর', nameEn: 'Gazipur', centerLat: 24.0023, centerLng: 90.4264, upazilasCount: 5, areaKm2: 1806 },
  { id: 'dist-narayanganj', divisionId: 'div-dhaka', code: 'NAR', nameBn: 'নারায়ণগঞ্জ', nameEn: 'Narayanganj', centerLat: 23.6238, centerLng: 90.5000, upazilasCount: 5, areaKm2: 759 },
  { id: 'dist-tangail', divisionId: 'div-dhaka', code: 'TAN', nameBn: 'টাঙ্গাইল', nameEn: 'Tangail', centerLat: 24.2513, centerLng: 89.9167, upazilasCount: 12, areaKm2: 3414 },
  { id: 'dist-narsingdi', divisionId: 'div-dhaka', code: 'NSD', nameBn: 'নরসিংদী', nameEn: 'Narsingdi', centerLat: 23.9322, centerLng: 90.7154, upazilasCount: 6, areaKm2: 1141 },
  { id: 'dist-manikganj', divisionId: 'div-dhaka', code: 'MAN', nameBn: 'মানিকগঞ্জ', nameEn: 'Manikganj', centerLat: 23.8644, centerLng: 90.0047, upazilasCount: 7, areaKm2: 1379 },
  { id: 'dist-munshiganj', divisionId: 'div-dhaka', code: 'MUN', nameBn: 'মুন্সীগঞ্জ', nameEn: 'Munshiganj', centerLat: 23.5422, centerLng: 90.5305, upazilasCount: 6, areaKm2: 954 },
  { id: 'dist-faridpur', divisionId: 'div-dhaka', code: 'FAR', nameBn: 'ফরিদপুর', nameEn: 'Faridpur', centerLat: 23.6070, centerLng: 89.8429, upazilasCount: 9, areaKm2: 2072 },
  { id: 'dist-gopalganj', divisionId: 'div-dhaka', code: 'GOP', nameBn: 'গোপালগঞ্জ', nameEn: 'Gopalganj', centerLat: 23.0050, centerLng: 89.8266, upazilasCount: 5, areaKm2: 1490 },
  { id: 'dist-kishoreganj', divisionId: 'div-dhaka', code: 'KIS', nameBn: 'কিশোরগঞ্জ', nameEn: 'Kishoreganj', centerLat: 24.4449, centerLng: 90.7766, upazilasCount: 13, areaKm2: 2688 },
  { id: 'dist-madaripur', divisionId: 'div-dhaka', code: 'MAD', nameBn: 'মাদারীপুর', nameEn: 'Madaripur', centerLat: 23.1641, centerLng: 90.1897, upazilasCount: 5, areaKm2: 1144 },
  { id: 'dist-rajbari', divisionId: 'div-dhaka', code: 'RAJ-D', nameBn: 'রাজবাড়ী', nameEn: 'Rajbari', centerLat: 23.7574, centerLng: 89.6445, upazilasCount: 5, areaKm2: 1118 },
  { id: 'dist-shariatpur', divisionId: 'div-dhaka', code: 'SHA', nameBn: 'শরীয়তপুর', nameEn: 'Shariatpur', centerLat: 23.2423, centerLng: 90.4348, upazilasCount: 6, areaKm2: 1181 },

  // --- CHATTOGRAM DIVISION (11 Districts) ---
  { id: 'dist-chattogram', divisionId: 'div-chattogram', code: 'CTG', nameBn: 'চট্টগ্রাম', nameEn: 'Chattogram', centerLat: 22.3569, centerLng: 91.7832, upazilasCount: 15, areaKm2: 5282 },
  { id: 'dist-coxsbazar', divisionId: 'div-chattogram', code: 'COX', nameBn: 'কক্সবাজার', nameEn: "Cox's Bazar", centerLat: 21.4272, centerLng: 92.0058, upazilasCount: 8, areaKm2: 2491 },
  { id: 'dist-cumilla', divisionId: 'div-chattogram', code: 'CUM', nameBn: 'কুমিল্লা', nameEn: 'Cumilla', centerLat: 23.4682, centerLng: 91.1788, upazilasCount: 17, areaKm2: 3087 },
  { id: 'dist-feni', divisionId: 'div-chattogram', code: 'FEN', nameBn: 'ফেনী', nameEn: 'Feni', centerLat: 23.0186, centerLng: 91.3966, upazilasCount: 6, areaKm2: 928 },
  { id: 'dist-brahmanbaria', divisionId: 'div-chattogram', code: 'BRA', nameBn: 'ব্রাহ্মণবাড়িয়া', nameEn: 'Brahmanbaria', centerLat: 23.9571, centerLng: 91.1119, upazilasCount: 9, areaKm2: 1927 },
  { id: 'dist-noakhali', divisionId: 'div-chattogram', code: 'NOA', nameBn: 'নোয়াখালী', nameEn: 'Noakhali', centerLat: 22.8696, centerLng: 91.0993, upazilasCount: 9, areaKm2: 3601 },
  { id: 'dist-chandpur', divisionId: 'div-chattogram', code: 'CHA', nameBn: 'চাঁদপুর', nameEn: 'Chandpur', centerLat: 23.2333, centerLng: 90.6667, upazilasCount: 8, areaKm2: 1704 },
  { id: 'dist-lakshmipur', divisionId: 'div-chattogram', code: 'LAK', nameBn: 'লক্ষ্মীপুর', nameEn: 'Lakshmipur', centerLat: 22.9425, centerLng: 90.8412, upazilasCount: 5, areaKm2: 1456 },
  { id: 'dist-rangamati', divisionId: 'div-chattogram', code: 'RAN', nameBn: 'রাঙ্গামাটি', nameEn: 'Rangamati', centerLat: 22.7324, centerLng: 92.2985, upazilasCount: 10, areaKm2: 6116 },
  { id: 'dist-khagrachhari', divisionId: 'div-chattogram', code: 'KHA', nameBn: 'খাগড়াছড়ি', nameEn: 'Khagrachhari', centerLat: 23.1193, centerLng: 91.9847, upazilasCount: 9, areaKm2: 2699 },
  { id: 'dist-bandarban', divisionId: 'div-chattogram', code: 'BAN', nameBn: 'বান্দরবান', nameEn: 'Bandarban', centerLat: 22.1953, centerLng: 92.2184, upazilasCount: 7, areaKm2: 4479 },

  // --- RAJSHAHI DIVISION (8 Districts) ---
  { id: 'dist-rajshahi', divisionId: 'div-rajshahi', code: 'RAJ', nameBn: 'রাজশাহী', nameEn: 'Rajshahi', centerLat: 24.3636, centerLng: 88.6241, upazilasCount: 9, areaKm2: 2407 },
  { id: 'dist-bogura', divisionId: 'div-rajshahi', code: 'BOG', nameBn: 'বগুড়া', nameEn: 'Bogura', centerLat: 24.8465, centerLng: 89.3777, upazilasCount: 12, areaKm2: 2898 },
  { id: 'dist-pabna', divisionId: 'div-rajshahi', code: 'PAB', nameBn: 'পাবনা', nameEn: 'Pabna', centerLat: 24.0118, centerLng: 89.2450, upazilasCount: 9, areaKm2: 2371 },
  { id: 'dist-sirajganj', divisionId: 'div-rajshahi', code: 'SIR', nameBn: 'সিরাজগঞ্জ', nameEn: 'Sirajganj', centerLat: 24.4534, centerLng: 89.7008, upazilasCount: 9, areaKm2: 2498 },
  { id: 'dist-naogaon', divisionId: 'div-rajshahi', code: 'NAO', nameBn: 'নওগাঁ', nameEn: 'Naogaon', centerLat: 24.7936, centerLng: 88.9318, upazilasCount: 11, areaKm2: 3435 },
  { id: 'dist-natore', divisionId: 'div-rajshahi', code: 'NAT', nameBn: 'নাটোর', nameEn: 'Natore', centerLat: 24.4206, centerLng: 88.9322, upazilasCount: 7, areaKm2: 1896 },
  { id: 'dist-chapainawabganj', divisionId: 'div-rajshahi', code: 'CPN', nameBn: 'চাঁপাইনবাবগঞ্জ', nameEn: 'Chapainawabganj', centerLat: 24.5965, centerLng: 88.2775, upazilasCount: 5, areaKm2: 1702 },
  { id: 'dist-joypurhat', divisionId: 'div-rajshahi', code: 'JOY', nameBn: 'জয়পুরহাট', nameEn: 'Joypurhat', centerLat: 25.0968, centerLng: 89.0227, upazilasCount: 5, areaKm2: 965 },

  // --- KHULNA DIVISION (10 Districts) ---
  { id: 'dist-khulna', divisionId: 'div-khulna', code: 'KHL', nameBn: 'খুলনা', nameEn: 'Khulna', centerLat: 22.8456, centerLng: 89.5403, upazilasCount: 9, areaKm2: 4394 },
  { id: 'dist-jashore', divisionId: 'div-khulna', code: 'JAS', nameBn: 'যশোর', nameEn: 'Jashore', centerLat: 23.1664, centerLng: 89.2182, upazilasCount: 8, areaKm2: 2606 },
  { id: 'dist-satkhira', divisionId: 'div-khulna', code: 'SAT', nameBn: 'সাতক্ষীরা', nameEn: 'Satkhira', centerLat: 22.7185, centerLng: 89.0705, upazilasCount: 7, areaKm2: 3858 },
  { id: 'dist-kushtia', divisionId: 'div-khulna', code: 'KUS', nameBn: 'কুষ্টিয়া', nameEn: 'Kushtia', centerLat: 23.9013, centerLng: 89.1205, upazilasCount: 6, areaKm2: 1601 },
  { id: 'dist-jhenaidah', divisionId: 'div-khulna', code: 'JHE', nameBn: 'ঝিনাইদহ', nameEn: 'Jhenaidah', centerLat: 23.5448, centerLng: 89.1539, upazilasCount: 6, areaKm2: 1961 },
  { id: 'dist-chuadanga', divisionId: 'div-khulna', code: 'CHU', nameBn: 'চুয়াডাঙ্গা', nameEn: 'Chuadanga', centerLat: 23.6402, centerLng: 88.8418, upazilasCount: 4, areaKm2: 1172 },
  { id: 'dist-meherpur', divisionId: 'div-khulna', code: 'MEH', nameBn: 'মেহেরপুর', nameEn: 'Meherpur', centerLat: 23.7622, centerLng: 88.6318, upazilasCount: 3, areaKm2: 716 },
  { id: 'dist-bagerhat', divisionId: 'div-khulna', code: 'BAG', nameBn: 'বাগেরহাট', nameEn: 'Bagerhat', centerLat: 22.6516, centerLng: 89.7859, upazilasCount: 9, areaKm2: 3959 },
  { id: 'dist-magura', divisionId: 'div-khulna', code: 'MAG', nameBn: 'মাগুরা', nameEn: 'Magura', centerLat: 23.4873, centerLng: 89.4199, upazilasCount: 4, areaKm2: 1049 },
  { id: 'dist-narail', divisionId: 'div-khulna', code: 'NRL', nameBn: 'নড়াইল', nameEn: 'Narail', centerLat: 23.1725, centerLng: 89.5127, upazilasCount: 3, areaKm2: 990 },

  // --- BARISHAL DIVISION (6 Districts) ---
  { id: 'dist-barishal', divisionId: 'div-barishal', code: 'BAR', nameBn: 'বরিশাল', nameEn: 'Barishal', centerLat: 22.7010, centerLng: 90.3535, upazilasCount: 10, areaKm2: 2784 },
  { id: 'dist-patuakhali', divisionId: 'div-barishal', code: 'PAT', nameBn: 'পটুয়াখালী', nameEn: 'Patuakhali', centerLat: 22.3596, centerLng: 90.3299, upazilasCount: 8, areaKm2: 3221 },
  { id: 'dist-bhola', divisionId: 'div-barishal', code: 'BHO', nameBn: 'ভোলা', nameEn: 'Bhola', centerLat: 22.6859, centerLng: 90.6481, upazilasCount: 7, areaKm2: 3403 },
  { id: 'dist-pirojpur', divisionId: 'div-barishal', code: 'PIR', nameBn: 'পিরোজপুর', nameEn: 'Pirojpur', centerLat: 22.5841, centerLng: 89.9720, upazilasCount: 7, areaKm2: 1308 },
  { id: 'dist-barguna', divisionId: 'div-barishal', code: 'BRG', nameBn: 'বরগুনা', nameEn: 'Barguna', centerLat: 22.0953, centerLng: 90.0772, upazilasCount: 6, areaKm2: 1831 },
  { id: 'dist-jhalakathi', divisionId: 'div-barishal', code: 'JHA', nameBn: 'ঝালকাঠি', nameEn: 'Jhalakathi', centerLat: 22.6406, centerLng: 90.1987, upazilasCount: 4, areaKm2: 758 },

  // --- SYLHET DIVISION (4 Districts) ---
  { id: 'dist-sylhet', divisionId: 'div-sylhet', code: 'SYL', nameBn: 'সিলেট', nameEn: 'Sylhet', centerLat: 24.8949, centerLng: 91.8687, upazilasCount: 13, areaKm2: 3490 },
  { id: 'dist-moulvibazar', divisionId: 'div-sylhet', code: 'MOU', nameBn: 'মৌলভীবাজার', nameEn: 'Moulvibazar', centerLat: 24.4829, centerLng: 91.7774, upazilasCount: 7, areaKm2: 2799 },
  { id: 'dist-habiganj', divisionId: 'div-sylhet', code: 'HAB', nameBn: 'হবিগঞ্জ', nameEn: 'Habiganj', centerLat: 24.3749, centerLng: 91.4155, upazilasCount: 9, areaKm2: 2637 },
  { id: 'dist-sunamganj', divisionId: 'div-sylhet', code: 'SUN', nameBn: 'সুনামগঞ্জ', nameEn: 'Sunamganj', centerLat: 25.0658, centerLng: 91.3950, upazilasCount: 12, areaKm2: 3670 },

  // --- RANGPUR DIVISION (8 Districts) ---
  { id: 'dist-rangpur', divisionId: 'div-rangpur', code: 'RP', nameBn: 'রংপুর', nameEn: 'Rangpur', centerLat: 25.7439, centerLng: 89.2752, upazilasCount: 8, areaKm2: 2307 },
  { id: 'dist-dinajpur', divisionId: 'div-rangpur', code: 'DIN', nameBn: 'দিনাজপুর', nameEn: 'Dinajpur', centerLat: 25.6217, centerLng: 88.6355, upazilasCount: 13, areaKm2: 3437 },
  { id: 'dist-kurigram', divisionId: 'div-rangpur', code: 'KUR', nameBn: 'কুড়িগ্রাম', nameEn: 'Kurigram', centerLat: 25.8054, centerLng: 89.6362, upazilasCount: 9, areaKm2: 2296 },
  { id: 'dist-gaibandha', divisionId: 'div-rangpur', code: 'GAI', nameBn: 'গাইবান্ধা', nameEn: 'Gaibandha', centerLat: 25.3288, centerLng: 89.5408, upazilasCount: 7, areaKm2: 2179 },
  { id: 'dist-nilphamari', divisionId: 'div-rangpur', code: 'NIL', nameBn: 'নীলফামারী', nameEn: 'Nilphamari', centerLat: 25.9318, centerLng: 88.8560, upazilasCount: 6, areaKm2: 1581 },
  { id: 'dist-panchagarh', divisionId: 'div-rangpur', code: 'PAN', nameBn: 'পঞ্চগড়', nameEn: 'Panchagarh', centerLat: 26.3411, centerLng: 88.5541, upazilasCount: 5, areaKm2: 1405 },
  { id: 'dist-thakurgaon', divisionId: 'div-rangpur', code: 'THA', nameBn: 'ঠাকুরগাঁও', nameEn: 'Thakurgaon', centerLat: 26.0337, centerLng: 88.4617, upazilasCount: 5, areaKm2: 1810 },
  { id: 'dist-lalmonirhat', divisionId: 'div-rangpur', code: 'LAL', nameBn: 'লালমনিরহাট', nameEn: 'Lalmonirhat', centerLat: 25.9923, centerLng: 89.2847, upazilasCount: 5, areaKm2: 1241 },

  // --- MYMENSINGH DIVISION (4 Districts) ---
  { id: 'dist-mymensingh', divisionId: 'div-mymensingh', code: 'MYM', nameBn: 'ময়মনসিংহ', nameEn: 'Mymensingh', centerLat: 24.7471, centerLng: 90.4203, upazilasCount: 13, areaKm2: 4363 },
  { id: 'dist-jamalpur', divisionId: 'div-mymensingh', code: 'JAM', nameBn: 'জামালপুর', nameEn: 'Jamalpur', centerLat: 24.9375, centerLng: 89.9377, upazilasCount: 7, areaKm2: 2031 },
  { id: 'dist-netrokona', divisionId: 'div-mymensingh', code: 'NET', nameBn: 'নেত্রকোণা', nameEn: 'Netrokona', centerLat: 24.8709, centerLng: 90.7279, upazilasCount: 10, areaKm2: 2810 },
  { id: 'dist-sherpur', divisionId: 'div-mymensingh', code: 'SHE', nameBn: 'শেরপুর', nameEn: 'Sherpur', centerLat: 25.0205, centerLng: 90.0153, upazilasCount: 5, areaKm2: 1363 }
];

// ========================================================
// 4. REPRESENTATIVE UPAZILAS COVERING ALL DISTRICTS
// ========================================================
export const UPAZILAS: Upazila[] = [
  // --- DHAKA DIVISION UPAZILAS ---
  { id: 'upz-ramna', districtId: 'dist-dhaka', code: 'RAM', nameBn: 'রমনা সার্কেল', nameEn: 'Ramna Circle', parcelsCount: 340, centerLat: 23.7380, centerLng: 90.4050 },
  { id: 'upz-mirpur', districtId: 'dist-dhaka', code: 'MIR', nameBn: 'মিরপুর রাজস্ব সার্কেল', nameEn: 'Mirpur Circle', parcelsCount: 420, centerLat: 23.8070, centerLng: 90.3680 },
  { id: 'upz-dhanmondi', districtId: 'dist-dhaka', code: 'DHA', nameBn: 'ধানমন্ডি সার্কেল', nameEn: 'Dhanmondi Circle', parcelsCount: 290, centerLat: 23.7461, centerLng: 90.3742 },
  { id: 'upz-savar', districtId: 'dist-dhaka', code: 'SAV', nameBn: 'সাভার উপজেলা', nameEn: 'Savar Upazila', parcelsCount: 890, centerLat: 23.8580, centerLng: 90.2600 },
  { id: 'upz-keraniganj', districtId: 'dist-dhaka', code: 'KER', nameBn: 'কেরানীগঞ্জ উপজেলা', nameEn: 'Keraniganj Upazila', parcelsCount: 780, centerLat: 23.6820, centerLng: 90.3120 },
  { id: 'upz-dhamrai', districtId: 'dist-dhaka', code: 'DHM', nameBn: 'ধামরাই উপজেলা', nameEn: 'Dhamrai Upazila', parcelsCount: 510, centerLat: 23.9167, centerLng: 90.2167 },

  // Gazipur
  { id: 'upz-gazipur-sadar', districtId: 'dist-gazipur', code: 'GZS', nameBn: 'গাজীপুর সদর', nameEn: 'Gazipur Sadar', parcelsCount: 650, centerLat: 24.0023, centerLng: 90.4264 },
  { id: 'upz-sreepur', districtId: 'dist-gazipur', code: 'SRE', nameBn: 'শ্রীপুর উপজেলা', nameEn: 'Sreepur Upazila', parcelsCount: 710, centerLat: 24.2000, centerLng: 90.4667 },
  { id: 'upz-kaliakair', districtId: 'dist-gazipur', code: 'KLK', nameBn: 'কালিয়াকৈর উপজেলা', nameEn: 'Kaliakair Upazila', parcelsCount: 590, centerLat: 24.0667, centerLng: 90.2167 },

  // Narayanganj
  { id: 'upz-narayanganj-sadar', districtId: 'dist-narayanganj', code: 'NAS', nameBn: 'নারায়ণগঞ্জ সদর', nameEn: 'Narayanganj Sadar', parcelsCount: 520, centerLat: 23.6238, centerLng: 90.5000 },
  { id: 'upz-sonargaon', districtId: 'dist-narayanganj', code: 'SON', nameBn: 'সোনারগাঁও উপজেলা', nameEn: 'Sonargaon Upazila', parcelsCount: 480, centerLat: 23.6500, centerLng: 90.6000 },
  { id: 'upz-rupganj', districtId: 'dist-narayanganj', code: 'RUP', nameBn: 'রূপগঞ্জ উপজেলা', nameEn: 'Rupganj Upazila', parcelsCount: 460, centerLat: 23.8000, centerLng: 90.5167 },

  // Tangail
  { id: 'upz-tangail-sadar', districtId: 'dist-tangail', code: 'TAS', nameBn: 'টাঙ্গাইল সদর', nameEn: 'Tangail Sadar', parcelsCount: 580, centerLat: 24.2513, centerLng: 89.9167 },
  { id: 'upz-mirzapur', districtId: 'dist-tangail', code: 'MIR-T', nameBn: 'মির্জাপুর উপজেলা', nameEn: 'Mirzapur Upazila', parcelsCount: 510, centerLat: 24.1000, centerLng: 90.1000 },
  { id: 'upz-ghatail', districtId: 'dist-tangail', code: 'GHT', nameBn: 'ঘাটাইল উপজেলা', nameEn: 'Ghatail Upazila', parcelsCount: 490, centerLat: 24.5000, centerLng: 90.0000 },
  { id: 'upz-madhupur', districtId: 'dist-tangail', code: 'MDP', nameBn: 'মধুপুর উপজেলা', nameEn: 'Madhupur Upazila', parcelsCount: 530, centerLat: 24.6167, centerLng: 90.0333 },

  // Narsingdi
  { id: 'upz-narsingdi-sadar', districtId: 'dist-narsingdi', code: 'NRS', nameBn: 'নরসিংদী সদর', nameEn: 'Narsingdi Sadar', parcelsCount: 520, centerLat: 23.9322, centerLng: 90.7154 },
  { id: 'upz-shibpur', districtId: 'dist-narsingdi', code: 'SHI', nameBn: 'শিবপুর উপজেলা', nameEn: 'Shibpur Upazila', parcelsCount: 410, centerLat: 24.0333, centerLng: 90.7333 },
  { id: 'upz-raipura', districtId: 'dist-narsingdi', code: 'RAI', nameBn: 'রায়পুরা উপজেলা', nameEn: 'Raipura Upazila', parcelsCount: 480, centerLat: 23.9667, centerLng: 90.8667 },

  // Manikganj
  { id: 'upz-manikganj-sadar', districtId: 'dist-manikganj', code: 'MKS', nameBn: 'মানিকগঞ্জ সদর', nameEn: 'Manikganj Sadar', parcelsCount: 490, centerLat: 23.8644, centerLng: 90.0047 },
  { id: 'upz-singair', districtId: 'dist-manikganj', code: 'SIN', nameBn: 'সিংগাইর উপজেলা', nameEn: 'Singair Upazila', parcelsCount: 430, centerLat: 23.8167, centerLng: 90.1500 },
  { id: 'upz-shivalaya', districtId: 'dist-manikganj', code: 'SHV', nameBn: 'শিবালয় (আরিচা)', nameEn: 'Shivalaya Upazila', parcelsCount: 390, centerLat: 23.8333, centerLng: 89.8000 },

  // Munshiganj
  { id: 'upz-munshiganj-sadar', districtId: 'dist-munshiganj', code: 'MUNS', nameBn: 'মুন্সীগঞ্জ সদর', nameEn: 'Munshiganj Sadar', parcelsCount: 460, centerLat: 23.5422, centerLng: 90.5305 },
  { id: 'upz-srinagar', districtId: 'dist-munshiganj', code: 'SRI', nameBn: 'শ্রীনগর উপজেলা', nameEn: 'Srinagar Upazila', parcelsCount: 420, centerLat: 23.5333, centerLng: 90.2833 },
  { id: 'upz-louhajang', districtId: 'dist-munshiganj', code: 'LOU', nameBn: 'লৌহজং (পদ্মা সেতু)', nameEn: 'Louhajang Upazila', parcelsCount: 380, centerLat: 23.4667, centerLng: 90.3167 },

  // Faridpur
  { id: 'upz-faridpur-sadar', districtId: 'dist-faridpur', code: 'FARS', nameBn: 'ফরিদপুর সদর', nameEn: 'Faridpur Sadar', parcelsCount: 510, centerLat: 23.6070, centerLng: 89.8429 },
  { id: 'upz-bhanga', districtId: 'dist-faridpur', code: 'BHA', nameBn: 'ভাঙ্গা জংশন উপজেলা', nameEn: 'Bhanga Upazila', parcelsCount: 470, centerLat: 23.3833, centerLng: 89.9833 },
  { id: 'upz-boalmari', districtId: 'dist-faridpur', code: 'BOA-F', nameBn: 'বোয়ালমারী উপজেলা', nameEn: 'Boalmari Upazila', parcelsCount: 430, centerLat: 23.3833, centerLng: 89.6833 },

  // Gopalganj
  { id: 'upz-gopalganj-sadar', districtId: 'dist-gopalganj', code: 'GOPS', nameBn: 'গোপালগঞ্জ সদর', nameEn: 'Gopalganj Sadar', parcelsCount: 490, centerLat: 23.0050, centerLng: 89.8266 },
  { id: 'upz-tungipara', districtId: 'dist-gopalganj', code: 'TUN', nameBn: 'টুঙ্গিপাড়া উপজেলা', nameEn: 'Tungipara Upazila', parcelsCount: 390, centerLat: 22.9000, centerLng: 89.9000 },
  { id: 'upz-kashiani', districtId: 'dist-gopalganj', code: 'KAS', nameBn: 'কাশিয়ানী উপজেলা', nameEn: 'Kashiani Upazila', parcelsCount: 420, centerLat: 23.2167, centerLng: 89.7000 },

  // Kishoreganj
  { id: 'upz-kishoreganj-sadar', districtId: 'dist-kishoreganj', code: 'KISS', nameBn: 'কিশোরগঞ্জ সদর', nameEn: 'Kishoreganj Sadar', parcelsCount: 530, centerLat: 24.4449, centerLng: 90.7766 },
  { id: 'upz-bhairab', districtId: 'dist-kishoreganj', code: 'BHA-K', nameBn: 'ভৈরব নদী বন্দর উপজেলা', nameEn: 'Bhairab Upazila', parcelsCount: 480, centerLat: 24.0500, centerLng: 90.9833 },
  { id: 'upz-mithamoin', districtId: 'dist-kishoreganj', code: 'MIT', nameBn: 'মিঠামইন হাওর উপজেলা', nameEn: 'Mithamoin Upazila', parcelsCount: 360, centerLat: 24.4333, centerLng: 91.0500 },

  // Madaripur, Rajbari & Shariatpur
  { id: 'upz-madaripur-sadar', districtId: 'dist-madaripur', code: 'MADS', nameBn: 'মাদারীপুর সদর', nameEn: 'Madaripur Sadar', parcelsCount: 470, centerLat: 23.1641, centerLng: 90.1897 },
  { id: 'upz-shibchar', districtId: 'dist-madaripur', code: 'SBC', nameBn: 'শিবচর উপজেলা', nameEn: 'Shibchar Upazila', parcelsCount: 450, centerLat: 23.3500, centerLng: 90.1667 },
  { id: 'upz-rajbari-sadar', districtId: 'dist-rajbari', code: 'RAJS', nameBn: 'রাজবাড়ী সদর', nameEn: 'Rajbari Sadar', parcelsCount: 430, centerLat: 23.7574, centerLng: 89.6445 },
  { id: 'upz-goalanda', districtId: 'dist-rajbari', code: 'GOA', nameBn: 'গোয়ালন্দ (দৌলতদিয়া ঘাট)', nameEn: 'Goalanda Upazila', parcelsCount: 380, centerLat: 23.7333, centerLng: 89.7667 },
  { id: 'upz-shariatpur-sadar', districtId: 'dist-shariatpur', code: 'SHAS', nameBn: 'শরীয়তপুর সদর', nameEn: 'Shariatpur Sadar', parcelsCount: 420, centerLat: 23.2423, centerLng: 90.4348 },
  { id: 'upz-zanjira', districtId: 'dist-shariatpur', code: 'ZAN', nameBn: 'জাজিরা পদ্মা লিংক', nameEn: 'Zanjira Upazila', parcelsCount: 410, centerLat: 23.3667, centerLng: 90.3167 },

  // --- CHATTOGRAM DIVISION UPAZILAS ---
  { id: 'upz-panchlaish', districtId: 'dist-chattogram', code: 'PAN', nameBn: 'পাঁচলাইশ সার্কেল', nameEn: 'Panchlaish Circle', parcelsCount: 380, centerLat: 22.3680, centerLng: 91.8260 },
  { id: 'upz-kotwali-ctg', districtId: 'dist-chattogram', code: 'KTC', nameBn: 'কোতোয়ালী সার্কেল', nameEn: 'Kotwali Circle', parcelsCount: 310, centerLat: 22.3350, centerLng: 91.8320 },
  { id: 'upz-hathazari', districtId: 'dist-chattogram', code: 'HAT', nameBn: 'হাটহাজারী উপজেলা', nameEn: 'Hathazari Upazila', parcelsCount: 640, centerLat: 22.5083, centerLng: 91.8083 },
  { id: 'upz-sitakunda', districtId: 'dist-chattogram', code: 'SIT', nameBn: 'সীতাকুণ্ড শিল্পাঞ্চল', nameEn: 'Sitakunda Upazila', parcelsCount: 590, centerLat: 22.6167, centerLng: 91.6667 },
  { id: 'upz-patia', districtId: 'dist-chattogram', code: 'PAT-C', nameBn: 'পটিয়া উপজেলা', nameEn: 'Patiya Upazila', parcelsCount: 540, centerLat: 22.3000, centerLng: 91.9833 },
  { id: 'upz-sandwip', districtId: 'dist-chattogram', code: 'SAN', nameBn: 'সন্দ্বীপ দ্বীপ উপজেলা', nameEn: 'Sandwip Upazila', parcelsCount: 480, centerLat: 22.4833, centerLng: 91.4333 },

  // Cox's Bazar
  { id: 'upz-coxsbazar-sadar', districtId: 'dist-coxsbazar', code: 'COXS', nameBn: 'কক্সবাজার সদর', nameEn: "Cox's Bazar Sadar", parcelsCount: 430, centerLat: 21.4272, centerLng: 92.0058 },
  { id: 'upz-teknaf', districtId: 'dist-coxsbazar', code: 'TEK', nameBn: 'টেকনাফ সীমান্ত উপজেলা', nameEn: 'Teknaf Upazila', parcelsCount: 390, centerLat: 20.8667, centerLng: 92.3000 },
  { id: 'upz-ramu', districtId: 'dist-coxsbazar', code: 'RAM-C', nameBn: 'রামু উপজেলা', nameEn: 'Ramu Upazila', parcelsCount: 410, centerLat: 21.4500, centerLng: 92.1000 },
  { id: 'upz-kutubdia', districtId: 'dist-coxsbazar', code: 'KUT', nameBn: 'কুতুবদিয়া দ্বীপ উপজেলা', nameEn: 'Kutubdia Upazila', parcelsCount: 320, centerLat: 21.8167, centerLng: 91.8500 },

  // Cumilla, Feni, Brahmanbaria
  { id: 'upz-cumilla-sadar', districtId: 'dist-cumilla', code: 'CUMS', nameBn: 'কুমিল্লা আদর্শ সদর', nameEn: 'Cumilla Sadar', parcelsCount: 610, centerLat: 23.4682, centerLng: 91.1788 },
  { id: 'upz-daudkandi', districtId: 'dist-cumilla', code: 'DAU-C', nameBn: 'দাউদকান্দি উপজেলা', nameEn: 'Daudkandi Upazila', parcelsCount: 490, centerLat: 23.5333, centerLng: 90.7167 },
  { id: 'upz-feni-sadar', districtId: 'dist-feni', code: 'FENS', nameBn: 'ফেনী সদর', nameEn: 'Feni Sadar', parcelsCount: 490, centerLat: 23.0186, centerLng: 91.3966 },
  { id: 'upz-brahmanbaria-sadar', districtId: 'dist-brahmanbaria', code: 'BRAS', nameBn: 'ব্রাহ্মণবাড়িয়া সদর', nameEn: 'Brahmanbaria Sadar', parcelsCount: 490, centerLat: 23.9571, centerLng: 91.1119 },
  { id: 'upz-ashuganj', districtId: 'dist-brahmanbaria', code: 'ASH', nameBn: 'আশুগঞ্জ সার কারখানা জোন', nameEn: 'Ashuganj Upazila', parcelsCount: 390, centerLat: 24.0333, centerLng: 91.0167 },

  // Noakhali, Chandpur, Lakshmipur
  { id: 'upz-noakhali-sadar', districtId: 'dist-noakhali', code: 'NOAS', nameBn: 'নোয়াখালী সদর (সুধারাম)', nameEn: 'Noakhali Sadar', parcelsCount: 550, centerLat: 22.8696, centerLng: 91.0993 },
  { id: 'upz-hatia', districtId: 'dist-noakhali', code: 'HAT-I', nameBn: 'হাতিয়া দ্বীপ উপজেলা', nameEn: 'Hatiya Island Upazila', parcelsCount: 460, centerLat: 22.3667, centerLng: 91.1167 },
  { id: 'upz-chandpur-sadar', districtId: 'dist-chandpur', code: 'CHAS', nameBn: 'চাঁদপুর সদর (ইলিশ জোন)', nameEn: 'Chandpur Sadar', parcelsCount: 510, centerLat: 23.2333, centerLng: 90.6667 },
  { id: 'upz-lakshmipur-sadar', districtId: 'dist-lakshmipur', code: 'LAKS', nameBn: 'লক্ষ্মীপুর সদর', nameEn: 'Lakshmipur Sadar', parcelsCount: 480, centerLat: 22.9425, centerLng: 90.8412 },

  // Hill Tracts: Rangamati, Khagrachhari, Bandarban
  { id: 'upz-rangamati-sadar', districtId: 'dist-rangamati', code: 'RANS', nameBn: 'রাঙ্গামাটি সদর', nameEn: 'Rangamati Sadar', parcelsCount: 430, centerLat: 22.7324, centerLng: 92.2985 },
  { id: 'upz-kaptai', districtId: 'dist-rangamati', code: 'KAP', nameBn: 'কাপ্তাই জলবিদ্যুৎ উপজেলা', nameEn: 'Kaptai Upazila', parcelsCount: 360, centerLat: 22.5000, centerLng: 92.2167 },
  { id: 'upz-khagrachhari-sadar', districtId: 'dist-khagrachhari', code: 'KHAS', nameBn: 'খাগড়াছড়ি সদর', nameEn: 'Khagrachhari Sadar', parcelsCount: 410, centerLat: 23.1193, centerLng: 91.9847 },
  { id: 'upz-bandarban-sadar', districtId: 'dist-bandarban', code: 'BANS', nameBn: 'বান্দরবান সদর', nameEn: 'Bandarban Sadar', parcelsCount: 380, centerLat: 22.1953, centerLng: 92.2184 },

  // --- RAJSHAHI DIVISION UPAZILAS ---
  { id: 'upz-boalia', districtId: 'dist-rajshahi', code: 'BOA', nameBn: 'বোয়ালিয়া সার্কেল', nameEn: 'Boalia Circle', parcelsCount: 310, centerLat: 24.3636, centerLng: 88.6241 },
  { id: 'upz-paba', districtId: 'dist-rajshahi', code: 'PAB', nameBn: 'পবা উপজেলা', nameEn: 'Paba Upazila', parcelsCount: 520, centerLat: 24.4333, centerLng: 88.6333 },
  { id: 'upz-bagha', districtId: 'dist-rajshahi', code: 'BAG-R', nameBn: 'বাঘা উপজেলা', nameEn: 'Bagha Upazila', parcelsCount: 410, centerLat: 24.1833, centerLng: 88.7667 },
  { id: 'upz-bogura-sadar', districtId: 'dist-bogura', code: 'BOGS', nameBn: 'বগুড়া সদর', nameEn: 'Bogura Sadar', parcelsCount: 680, centerLat: 24.8465, centerLng: 89.3777 },
  { id: 'upz-shibganj-bog', districtId: 'dist-bogura', code: 'SHB', nameBn: 'শিবগঞ্জ (মহাস্থানগড়)', nameEn: 'Shibganj Upazila', parcelsCount: 520, centerLat: 24.9833, centerLng: 89.3333 },
  { id: 'upz-pabna-sadar', districtId: 'dist-pabna', code: 'PABS', nameBn: 'পাবনা সদর', nameEn: 'Pabna Sadar', parcelsCount: 540, centerLat: 24.0118, centerLng: 89.2450 },
  { id: 'upz-iswardi', districtId: 'dist-pabna', code: 'ISW', nameBn: 'ঈশ্বরদী (রূপপুর পারমাণবিক)', nameEn: 'Iswardi Upazila', parcelsCount: 560, centerLat: 24.1500, centerLng: 89.0667 },
  { id: 'upz-sirajganj-sadar', districtId: 'dist-sirajganj', code: 'SIRS', nameBn: 'সিরাজগঞ্জ সদর', nameEn: 'Sirajganj Sadar', parcelsCount: 530, centerLat: 24.4534, centerLng: 89.7008 },
  { id: 'upz-naogaon-sadar', districtId: 'dist-naogaon', code: 'NAOS', nameBn: 'নওগাঁ সদর', nameEn: 'Naogaon Sadar', parcelsCount: 550, centerLat: 24.7936, centerLng: 88.9318 },
  { id: 'upz-natore-sadar', districtId: 'dist-natore', code: 'NATS', nameBn: 'নাটোর সদর', nameEn: 'Natore Sadar', parcelsCount: 510, centerLat: 24.4206, centerLng: 88.9322 },
  { id: 'upz-chapainawabganj-sadar', districtId: 'dist-chapainawabganj', code: 'CPNS', nameBn: 'চাঁপাইনবাবগঞ্জ সদর', nameEn: 'Chapainawabganj Sadar', parcelsCount: 490, centerLat: 24.5965, centerLng: 88.2775 },
  { id: 'upz-joypurhat-sadar', districtId: 'dist-joypurhat', code: 'JOYS', nameBn: 'জয়পুরহাট সদর', nameEn: 'Joypurhat Sadar', parcelsCount: 420, centerLat: 25.0968, centerLng: 89.0227 },

  // --- KHULNA DIVISION UPAZILAS ---
  { id: 'upz-khulna-sadar', districtId: 'dist-khulna', code: 'KLS', nameBn: 'খুলনা সদর সার্কেল', nameEn: 'Khulna Sadar', parcelsCount: 330, centerLat: 22.8456, centerLng: 89.5403 },
  { id: 'upz-daulatpur', districtId: 'dist-khulna', code: 'DAU', nameBn: 'দৌলতপুর সার্কেল', nameEn: 'Daulatpur Circle', parcelsCount: 290, centerLat: 22.8833, centerLng: 89.5167 },
  { id: 'upz-koyra', districtId: 'dist-khulna', code: 'KOY', nameBn: 'কয়রা সুন্দরবন উপকূল', nameEn: 'Koyra Upazila', parcelsCount: 450, centerLat: 22.3333, centerLng: 89.3000 },
  { id: 'upz-jashore-sadar', districtId: 'dist-jashore', code: 'JASS', nameBn: 'যশোর সদর', nameEn: 'Jashore Sadar', parcelsCount: 560, centerLat: 23.1664, centerLng: 89.2182 },
  { id: 'upz-benapole', districtId: 'dist-jashore', code: 'BEN', nameBn: 'শার্শা (বেনাপোল বন্দর)', nameEn: 'Sharsha Upazila', parcelsCount: 520, centerLat: 23.0833, centerLng: 88.9333 },
  { id: 'upz-satkhira-sadar', districtId: 'dist-satkhira', code: 'SATS', nameBn: 'সাতক্ষীরা সদর', nameEn: 'Satkhira Sadar', parcelsCount: 480, centerLat: 22.7185, centerLng: 89.0705 },
  { id: 'upz-shyamnagar', districtId: 'dist-satkhira', code: 'SHY', nameBn: 'শ্যামনগর সুন্দরবন রেন্জ', nameEn: 'Shyamnagar Upazila', parcelsCount: 510, centerLat: 22.3333, centerLng: 89.1000 },
  { id: 'upz-kushtia-sadar', districtId: 'dist-kushtia', code: 'KUSS', nameBn: 'কুষ্টিয়া সদর', nameEn: 'Kushtia Sadar', parcelsCount: 490, centerLat: 23.9013, centerLng: 89.1205 },
  { id: 'upz-kumarkhali', districtId: 'dist-kushtia', code: 'KUM', nameBn: 'কুমারখালী (লালন ধাম)', nameEn: 'Kumarkhali Upazila', parcelsCount: 440, centerLat: 23.8667, centerLng: 89.2500 },
  { id: 'upz-jhenaidah-sadar', districtId: 'dist-jhenaidah', code: 'JHES', nameBn: 'ঝিনাইদহ সদর', nameEn: 'Jhenaidah Sadar', parcelsCount: 480, centerLat: 23.5448, centerLng: 89.1539 },
  { id: 'upz-chuadanga-sadar', districtId: 'dist-chuadanga', code: 'CHUS', nameBn: 'চুয়াডাঙ্গা সদর', nameEn: 'Chuadanga Sadar', parcelsCount: 430, centerLat: 23.6402, centerLng: 88.8418 },
  { id: 'upz-meherpur-sadar', districtId: 'dist-meherpur', code: 'MEHS', nameBn: 'মেহেরপুর সদর', nameEn: 'Meherpur Sadar', parcelsCount: 380, centerLat: 23.7622, centerLng: 88.6318 },
  { id: 'upz-bagerhat-sadar', districtId: 'dist-bagerhat', code: 'BAGS', nameBn: 'বাগেরহাট সদর (ষাটগম্বুজ)', nameEn: 'Bagerhat Sadar', parcelsCount: 470, centerLat: 22.6516, centerLng: 89.7859 },
  { id: 'upz-mongla', districtId: 'dist-bagerhat', code: 'MNG', nameBn: 'মোংলা সমুদ্র বন্দর', nameEn: 'Mongla Port Upazila', parcelsCount: 420, centerLat: 22.4833, centerLng: 89.6000 },
  { id: 'upz-magura-sadar', districtId: 'dist-magura', code: 'MAGS', nameBn: 'মাগুরা সদর', nameEn: 'Magura Sadar', parcelsCount: 410, centerLat: 23.4873, centerLng: 89.4199 },
  { id: 'upz-narail-sadar', districtId: 'dist-narail', code: 'NRLS', nameBn: 'নড়াইল সদর', nameEn: 'Narail Sadar', parcelsCount: 390, centerLat: 23.1725, centerLng: 89.5127 },

  // --- BARISHAL DIVISION UPAZILAS ---
  { id: 'upz-barishal-sadar', districtId: 'dist-barishal', code: 'BAS', nameBn: 'বরিশাল সদর (কোতোয়ালী)', nameEn: 'Barishal Sadar', parcelsCount: 470, centerLat: 22.7010, centerLng: 90.3535 },
  { id: 'upz-gournadi', districtId: 'dist-barishal', code: 'GOU', nameBn: 'গৌরনদী উপজেলা', nameEn: 'Gournadi Upazila', parcelsCount: 420, centerLat: 22.9667, centerLng: 90.2167 },
  { id: 'upz-patuakhali-sadar', districtId: 'dist-patuakhali', code: 'PATS', nameBn: 'পটুয়াখালী সদর', nameEn: 'Patuakhali Sadar', parcelsCount: 410, centerLat: 22.3596, centerLng: 90.3299 },
  { id: 'upz-kuakata', districtId: 'dist-patuakhali', code: 'KUA', nameBn: 'কলাপাড়া (কুয়াকাটা সৈকত)', nameEn: 'Kalapara (Kuakata)', parcelsCount: 460, centerLat: 21.9833, centerLng: 90.2333 },
  { id: 'upz-bhola-sadar', districtId: 'dist-bhola', code: 'BHOS', nameBn: 'ভোলা সদর', nameEn: 'Bhola Sadar', parcelsCount: 380, centerLat: 22.6859, centerLng: 90.6481 },
  { id: 'upz-charfasson', districtId: 'dist-bhola', code: 'CHF', nameBn: 'চরফ্যাশন উপকূলীয় উপজেলা', nameEn: 'Char Fasson Upazila', parcelsCount: 490, centerLat: 22.1833, centerLng: 90.7167 },
  { id: 'upz-pirojpur-sadar', districtId: 'dist-pirojpur', code: 'PIRS', nameBn: 'পিরোজপুর সদর', nameEn: 'Pirojpur Sadar', parcelsCount: 410, centerLat: 22.5841, centerLng: 89.9720 },
  { id: 'upz-barguna-sadar', districtId: 'dist-barguna', code: 'BRGS', nameBn: 'বরগুনা সদর', nameEn: 'Barguna Sadar', parcelsCount: 390, centerLat: 22.0953, centerLng: 90.0772 },
  { id: 'upz-jhalakathi-sadar', districtId: 'dist-jhalakathi', code: 'JHAS', nameBn: 'ঝালকাঠি সদর', nameEn: 'Jhalakathi Sadar', parcelsCount: 360, centerLat: 22.6406, centerLng: 90.1987 },

  // --- SYLHET DIVISION UPAZILAS ---
  { id: 'upz-sylhet-sadar', districtId: 'dist-sylhet', code: 'SYS', nameBn: 'সিলেট সদর', nameEn: 'Sylhet Sadar', parcelsCount: 510, centerLat: 24.8949, centerLng: 91.8687 },
  { id: 'upz-jaflong', districtId: 'dist-sylhet', code: 'JAF', nameBn: 'গোয়াইনঘাট (জাফলং পাথর জোন)', nameEn: 'Gowainghat (Jaflong)', parcelsCount: 430, centerLat: 25.1500, centerLng: 92.0167 },
  { id: 'upz-zakiganj', districtId: 'dist-sylhet', code: 'ZAK', nameBn: 'জকিগঞ্জ সুরমা সীমান্ত', nameEn: 'Zakiganj Upazila', parcelsCount: 380, centerLat: 24.8833, centerLng: 92.3667 },
  { id: 'upz-moulvibazar-sadar', districtId: 'dist-moulvibazar', code: 'MOUS', nameBn: 'মৌলভীবাজার সদর', nameEn: 'Moulvibazar Sadar', parcelsCount: 420, centerLat: 24.4829, centerLng: 91.7774 },
  { id: 'upz-sreemangal', districtId: 'dist-moulvibazar', code: 'SRE-M', nameBn: 'শ্রীমঙ্গল (চা রাজধানী)', nameEn: 'Sreemangal Upazila', parcelsCount: 460, centerLat: 24.3000, centerLng: 91.7333 },
  { id: 'upz-habiganj-sadar', districtId: 'dist-habiganj', code: 'HABS', nameBn: 'হবিগঞ্জ সদর', nameEn: 'Habiganj Sadar', parcelsCount: 440, centerLat: 24.3749, centerLng: 91.4155 },
  { id: 'upz-sunamganj-sadar', districtId: 'dist-sunamganj', code: 'SUNS', nameBn: 'সুনামগঞ্জ সদর', nameEn: 'Sunamganj Sadar', parcelsCount: 390, centerLat: 25.0658, centerLng: 91.3950 },
  { id: 'upz-tahirpur', districtId: 'dist-sunamganj', code: 'TAH', nameBn: 'তাহিরপুর (টাঙ্গুয়ার হাওর)', nameEn: 'Tahirpur Upazila', parcelsCount: 370, centerLat: 25.1000, centerLng: 91.1833 },

  // --- RANGPUR DIVISION UPAZILAS ---
  { id: 'upz-rangpur-sadar', districtId: 'dist-rangpur', code: 'RPS', nameBn: 'রংপুর সদর', nameEn: 'Rangpur Sadar', parcelsCount: 530, centerLat: 25.7439, centerLng: 89.2752 },
  { id: 'upz-pirganj-rp', districtId: 'dist-rangpur', code: 'PIR-R', nameBn: 'পীরগঞ্জ উপজেলা', nameEn: 'Pirganj Upazila', parcelsCount: 460, centerLat: 25.4167, centerLng: 89.3167 },
  { id: 'upz-dinajpur-sadar', districtId: 'dist-dinajpur', code: 'DINS', nameBn: 'দিনাজপুর সদর', nameEn: 'Dinajpur Sadar', parcelsCount: 590, centerLat: 25.6217, centerLng: 88.6355 },
  { id: 'upz-parbatipur', districtId: 'dist-dinajpur', code: 'PAR-D', nameBn: 'পার্বতীপুর (বড়পুকুরিয়া কয়লা)', nameEn: 'Parbatipur Upazila', parcelsCount: 490, centerLat: 25.6667, centerLng: 88.9167 },
  { id: 'upz-kurigram-sadar', districtId: 'dist-kurigram', code: 'KURS', nameBn: 'কুড়িগ্রাম সদর', nameEn: 'Kurigram Sadar', parcelsCount: 440, centerLat: 25.8054, centerLng: 89.6362 },
  { id: 'upz-gaibandha-sadar', districtId: 'dist-gaibandha', code: 'GAIS', nameBn: 'গাইবান্ধা সদর', nameEn: 'Gaibandha Sadar', parcelsCount: 450, centerLat: 25.3288, centerLng: 89.5408 },
  { id: 'upz-nilphamari-sadar', districtId: 'dist-nilphamari', code: 'NILS', nameBn: 'নীলফামারী সদর', nameEn: 'Nilphamari Sadar', parcelsCount: 430, centerLat: 25.9318, centerLng: 88.8560 },
  { id: 'upz-saidpur', districtId: 'dist-nilphamari', code: 'SAI', nameBn: 'সৈয়দপুর রেলওয়ে জংশন', nameEn: 'Saidpur Upazila', parcelsCount: 480, centerLat: 25.7833, centerLng: 88.9000 },
  { id: 'upz-panchagarh-sadar', districtId: 'dist-panchagarh', code: 'PANS', nameBn: 'পঞ্চগড় সদর', nameEn: 'Panchagarh Sadar', parcelsCount: 390, centerLat: 26.3411, centerLng: 88.5541 },
  { id: 'upz-tetulia', districtId: 'dist-panchagarh', code: 'TET', nameBn: 'তেঁতুলিয়া (উত্তর সীমান্ত)', nameEn: 'Tetulia (North Border)', parcelsCount: 310, centerLat: 26.4950, centerLng: 88.3550 },
  { id: 'upz-thakurgaon-sadar', districtId: 'dist-thakurgaon', code: 'THAS', nameBn: 'ঠাকুরগাঁও সদর', nameEn: 'Thakurgaon Sadar', parcelsCount: 460, centerLat: 26.0337, centerLng: 88.4617 },
  { id: 'upz-lalmonirhat-sadar', districtId: 'dist-lalmonirhat', code: 'LALS', nameBn: 'লালমনিরহাট সদর', nameEn: 'Lalmonirhat Sadar', parcelsCount: 410, centerLat: 25.9923, centerLng: 89.2847 },

  // --- MYMENSINGH DIVISION UPAZILAS ---
  { id: 'upz-mymensingh-sadar', districtId: 'dist-mymensingh', code: 'MYS', nameBn: 'ময়মনসিংহ সদর', nameEn: 'Mymensingh Sadar', parcelsCount: 540, centerLat: 24.7471, centerLng: 90.4203 },
  { id: 'upz-muktagachha', districtId: 'dist-mymensingh', code: 'MUK', nameBn: 'মুক্তাগাছা (ঐতিহাসিক জমিদার)', nameEn: 'Muktagachha Upazila', parcelsCount: 450, centerLat: 24.7667, centerLng: 90.2667 },
  { id: 'upz-bhaluka', districtId: 'dist-mymensingh', code: 'BHA-M', nameBn: 'ভালুকা শিল্পাঞ্চল', nameEn: 'Bhaluka Upazila', parcelsCount: 490, centerLat: 24.3833, centerLng: 90.3833 },
  { id: 'upz-jamalpur-sadar', districtId: 'dist-jamalpur', code: 'JAMS', nameBn: 'জামালপুর সদর', nameEn: 'Jamalpur Sadar', parcelsCount: 460, centerLat: 24.9375, centerLng: 89.9377 },
  { id: 'upz-netrokona-sadar', districtId: 'dist-netrokona', code: 'NETS', nameBn: 'নেত্রকোণা সদর', nameEn: 'Netrokona Sadar', parcelsCount: 430, centerLat: 24.8709, centerLng: 90.7279 },
  { id: 'upz-durgapur-net', districtId: 'dist-netrokona', code: 'DUR', nameBn: 'দুর্গাপুর (সাদা মাটির পাহাড়)', nameEn: 'Durgapur Upazila', parcelsCount: 380, centerLat: 25.1167, centerLng: 90.6833 },
  { id: 'upz-sherpur-sadar', districtId: 'dist-sherpur', code: 'SHES', nameBn: 'শেরপুর সদর', nameEn: 'Sherpur Sadar', parcelsCount: 420, centerLat: 25.0205, centerLng: 90.0153 }
];

// ========================================================
// 5. RICH DEMO CADASTRAL PARCELS DATASET
// ========================================================
export const DEMO_PARCELS: DemoParcel[] = [
  {
    id: 'pcl-ramna-101',
    upazilaId: 'upz-ramna',
    mouzaNameBn: 'সেগুনবাগিচা',
    mouzaNameEn: 'Segunbagicha',
    mouzaJlNo: '৫৮',
    plotDagNo: '১২০৪',
    areaDecimals: 8.5,
    landClassBn: 'বাস্তু (আবাসিক ভিটা)',
    landClassEn: 'Residential Homestead',
    coordinates: [[50, 60], [130, 50], [140, 130], [60, 140]],
    surveys: {
      cs: {
        surveyType: 'CS',
        surveyPeriod: '1910-1920 (ক্যাডাস্ট্রাল সার্ভে)',
        khatianNo: '৮৯',
        dagNo: '৬৫০',
        volumeNo: 'টোক-০৪',
        recordedOwnerBn: 'বাবু হরেন্দ্র নারায়ণ রায়চৌধুরী (জমিদার)',
        recordedOwnerEn: 'Babu Harendra Narayan Raychaudhuri',
        recordedAreaAcre: 0.12,
        verified: true
      },
      sa: {
        surveyType: 'SA',
        surveyPeriod: '1956-1962 (স্টেট একুইজিশন)',
        khatianNo: '১৪২',
        dagNo: '৮৯০',
        volumeNo: 'ভলিউম-১২',
        recordedOwnerBn: 'মোঃ রমিজ উদ্দিন সরকার',
        recordedOwnerEn: 'Md. Romiz Uddin Sarkar',
        recordedAreaAcre: 0.10,
        verified: true
      },
      rs: {
        surveyType: 'RS',
        surveyPeriod: '1985-বর্তমান (সিটি জরিপ)',
        khatianNo: '৩১৮',
        dagNo: '১২০৪',
        volumeNo: 'আরএস-০৯',
        recordedOwnerBn: 'আবুল কালাম আজাদ ও অন্যান্য',
        recordedOwnerEn: 'Abul Kalam Azad & Others',
        recordedAreaAcre: 0.085,
        verified: true
      }
    },
    deedReference: {
      deedNo: '৪১২০/২০১৮',
      deedYear: '2018',
      deedTypeBn: 'সাফ-কবলা',
      subRegistryOfficeBn: 'তেজগাঁও সাব-রেজিস্ট্রি অফিস, ঢাকা'
    },
    taxStatus: 'CLEARED',
    mutationStatus: 'MUTATED',
    isDemoData: true
  },
  {
    id: 'pcl-mirpur-201',
    upazilaId: 'upz-mirpur',
    mouzaNameBn: 'পাইকপাড়া',
    mouzaNameEn: 'Paikpara',
    mouzaJlNo: '৭২',
    plotDagNo: '৩৪০২',
    areaDecimals: 6.0,
    landClassBn: 'আবাসিক প্লট',
    landClassEn: 'Residential Plot',
    coordinates: [[40, 40], [120, 30], [130, 110], [50, 120]],
    surveys: {
      cs: {
        surveyType: 'CS',
        surveyPeriod: '1910-1920',
        khatianNo: '১১২',
        dagNo: '২১০৫',
        volumeNo: 'টোক-০৭',
        recordedOwnerBn: 'শ্রী উপেন্দ্রনাথ মণ্ডল',
        recordedOwnerEn: 'Upendranath Mondal',
        recordedAreaAcre: 0.08,
        verified: true
      },
      sa: {
        surveyType: 'SA',
        surveyPeriod: '1956-1962',
        khatianNo: '২২৫',
        dagNo: '২৫৪০',
        volumeNo: 'ভলিউম-১৮',
        recordedOwnerBn: 'আকমল হোসেন সিকদার',
        recordedOwnerEn: 'Akmal Hossain Sikdar',
        recordedAreaAcre: 0.07,
        verified: true
      },
      rs: {
        surveyType: 'RS',
        surveyPeriod: 'সিটি জরিপ',
        khatianNo: '৭৮৯',
        dagNo: '৩৪০২',
        volumeNo: 'সিটি-০১',
        recordedOwnerBn: 'নাজমা বেগম',
        recordedOwnerEn: 'Nazma Begum',
        recordedAreaAcre: 0.06,
        verified: true
      }
    },
    deedReference: {
      deedNo: '১২০৫/২০২১',
      deedYear: '2021',
      deedTypeBn: 'হেবা বিল এওয়াজ',
      subRegistryOfficeBn: 'মিরপুর সাব-রেজিস্ট্রি অফিস'
    },
    taxStatus: 'CLEARED',
    mutationStatus: 'MUTATED',
    isDemoData: true
  },
  {
    id: 'pcl-savar-301',
    upazilaId: 'upz-savar',
    mouzaNameBn: 'বিরুলিয়া',
    mouzaNameEn: 'Birulia',
    mouzaJlNo: '২৯',
    plotDagNo: '৮৯০',
    areaDecimals: 15.0,
    landClassBn: 'কৃষি নাল জমি',
    landClassEn: 'Agricultural Land',
    coordinates: [[30, 50], [110, 40], [120, 130], [40, 140]],
    surveys: {
      cs: {
        surveyType: 'CS',
        surveyPeriod: '1915-1925',
        khatianNo: '৪৫',
        dagNo: '৪৫০',
        volumeNo: 'টোক-০২',
        recordedOwnerBn: 'মৌলভী খায়ের আলী মুন্সী',
        recordedOwnerEn: 'Moulvi Khayer Ali Munshi',
        recordedAreaAcre: 0.20,
        verified: true
      },
      sa: {
        surveyType: 'SA',
        surveyPeriod: '1956-1962',
        khatianNo: '৯৮',
        dagNo: '৬৭০',
        volumeNo: 'ভলিউম-০৬',
        recordedOwnerBn: 'কাজী গোলাম মোস্তফা',
        recordedOwnerEn: 'Kazi Golam Mostofa',
        recordedAreaAcre: 0.16,
        verified: true
      },
      rs: {
        surveyType: 'RS',
        surveyPeriod: '১৯৮৫-বর্তমান',
        khatianNo: '৫১২',
        dagNo: '৮৯০',
        volumeNo: 'আরএস-১৪',
        recordedOwnerBn: 'মেসার্স ডেল্টা অ্যাগ্রো ফার্মস',
        recordedOwnerEn: 'M/S Delta Agro Farms',
        recordedAreaAcre: 0.15,
        verified: true
      }
    },
    deedReference: {
      deedNo: '৭৮০/২০২৩',
      deedYear: '2023',
      deedTypeBn: 'সাফ-কবলা',
      subRegistryOfficeBn: 'সাভার সাব-রেজিস্ট্রি অফিস'
    },
    taxStatus: 'CLEARED',
    mutationStatus: 'MUTATED',
    isDemoData: true
  },
  {
    id: 'pcl-ctg-401',
    upazilaId: 'upz-panchlaish',
    mouzaNameBn: 'মুরাদপুর',
    mouzaNameEn: 'Muradpur',
    mouzaJlNo: '১১',
    plotDagNo: '৫১০২',
    areaDecimals: 10.5,
    landClassBn: 'বাণিজ্যিক রূপান্তর ভিটি',
    landClassEn: 'Commercial Converted Plot',
    coordinates: [[60, 40], [140, 50], [130, 120], [50, 110]],
    surveys: {
      cs: {
        surveyType: 'CS',
        surveyPeriod: '1920-1930',
        khatianNo: '৭৭',
        dagNo: '১১০৫',
        volumeNo: 'টোক-০৫',
        recordedOwnerBn: 'রায় বাহাদুর চন্দ্রমোহন সেন',
        recordedOwnerEn: 'Rai Bahadur Chandramohan Sen',
        recordedAreaAcre: 0.14,
        verified: true
      },
      sa: {
        surveyType: 'SA',
        surveyPeriod: '1956-1962',
        khatianNo: '১৫৪',
        dagNo: '১৯২০',
        volumeNo: 'ভলিউম-০৯',
        recordedOwnerBn: 'আনোয়ারুল আজিম চৌধুরী',
        recordedOwnerEn: 'Anwarul Azim Chowdhury',
        recordedAreaAcre: 0.12,
        verified: true
      },
      rs: {
        surveyType: 'RS',
        surveyPeriod: 'বিএস (বাংলাদেশ সার্ভে)',
        khatianNo: '৮৯০',
        dagNo: '৫১০২',
        volumeNo: 'বিএস-০৩',
        recordedOwnerBn: 'কর্ণফুলী স্টিল ট্রেডিং',
        recordedOwnerEn: 'Karnaphuli Steel Trading',
        recordedAreaAcre: 0.105,
        verified: true
      }
    },
    deedReference: {
      deedNo: '৯১০/২০২২',
      deedYear: '2022',
      deedTypeBn: 'সাফ-কবলা',
      subRegistryOfficeBn: 'পাঁচলাইশ সাব-রেজিস্ট্রি অফিস'
    },
    taxStatus: 'CLEARED',
    mutationStatus: 'MUTATED',
    isDemoData: true
  }
];

// ========================================================
// 6. ALL BANGLADESH LAND OFFICES (AC Land, Sub-Registry, Records)
// Distributed across all 8 Divisions
// ========================================================
export const ALL_BANGLADESH_LAND_OFFICES: LandOfficeMarker[] = [
  // Dhaka Division
  {
    id: 'off-dhk-ramna',
    divisionId: 'div-dhaka',
    districtId: 'dist-dhaka',
    nameBn: 'রমনা সার্কেল সহকারী কমিশনার (ভূমি) অফিস',
    nameEn: 'Ramna Circle AC Land Office, Dhaka',
    officeType: 'AC_LAND',
    lat: 23.7380,
    lng: 90.4050,
    upazilaNameBn: 'রমনা সার্কেল',
    districtNameBn: 'ঢাকা',
    phone: '০২-৯৩৩৬৬৫১ (১৬১২২)',
    addressBn: 'কাকরাইল, সেগুনবাগিচা মোড়, ঢাকা-১০০০',
    hoursBn: 'রবি-বৃহস্পতি: সকাল ৯:০০ - বিকেল ৪:০০',
    inChargeBn: 'সহকারী কমিশনার (ভূমি), রমনা',
    jurisdictionBn: 'রমনা, শাহবাগ, পল্টন, মতিঝিল ও সেগুনবাগিচা মৌজা'
  },
  {
    id: 'off-dhk-tejgaon-subreg',
    divisionId: 'div-dhaka',
    districtId: 'dist-dhaka',
    nameBn: 'তেজগাঁও সাব-রেজিস্ট্রি অফিস, ঢাকা',
    nameEn: 'Tejgaon Sub-Registry Office, Dhaka',
    officeType: 'SUB_REGISTRY',
    lat: 23.7590,
    lng: 90.3900,
    upazilaNameBn: 'তেজগাঁও সার্কেল',
    districtNameBn: 'ঢাকা',
    phone: '০২-৯১১২২৩৩',
    addressBn: 'তেজগাঁও শিল্প এলাকা, রেজিস্ট্রেশন কমপ্লেক্স, ঢাকা',
    hoursBn: 'রবি-বৃহস্পতি: সকাল ৯:০০ - বিকেল ৪:০০',
    inChargeBn: 'সাব-রেজিস্ট্রার, তেজগাঁও',
    jurisdictionBn: 'তেজগাঁও, গুলশান, বনানী ও মহাখালী এলাকার দলিল রেজিস্ট্রি'
  },
  {
    id: 'off-dhk-mirpur',
    divisionId: 'div-dhaka',
    districtId: 'dist-dhaka',
    nameBn: 'মিরপুর রাজস্ব সার্কেল এসি ল্যান্ড অফিস',
    nameEn: 'Mirpur Circle AC Land Office',
    officeType: 'AC_LAND',
    lat: 23.8070,
    lng: 90.3680,
    upazilaNameBn: 'মিরপুর রাজস্ব সার্কেল',
    districtNameBn: 'ঢাকা',
    phone: '০২-৯০১২৩৪৫',
    addressBn: 'সেকশন-২, মিরপুর, ঢাকা-১২১৬',
    hoursBn: 'রবি-বৃহস্পতি: সকাল ৯:০০ - বিকেল ৪:০০',
    inChargeBn: 'সহকারী কমিশনার (ভূমি), মিরপুর',
    jurisdictionBn: 'পাইকপাড়া, সেনপাড়া, শেওড়াপাড়া ও মিরপুর মৌজা'
  },
  {
    id: 'off-dhk-savar',
    divisionId: 'div-dhaka',
    districtId: 'dist-dhaka',
    nameBn: 'সাভার উপজেলা সহকারী কমিশনার (ভূমি) অফিস',
    nameEn: 'Savar Upazila AC Land Office',
    officeType: 'AC_LAND',
    lat: 23.8580,
    lng: 90.2600,
    upazilaNameBn: 'সাভার উপজেলা',
    districtNameBn: 'ঢাকা',
    phone: '০২-৭৭৪২১০৯',
    addressBn: 'উপজেলা পরিষদ চত্বর, সাভার, ঢাকা',
    hoursBn: 'রবি-বৃহস্পতি: সকাল ৯:০০ - বিকেল ৪:০০',
    inChargeBn: 'সহকারী কমিশনার (ভূমি), সাভার',
    jurisdictionBn: 'বিরুলিয়া, আশুলিয়া, সাভার পৌরসভা ও আমিনবাজার'
  },
  {
    id: 'off-gaz-sadar',
    divisionId: 'div-dhaka',
    districtId: 'dist-gazipur',
    nameBn: 'গাজীপুর সদর উপজেলা ভূমি অফিস',
    nameEn: 'Gazipur Sadar Upazila Land Office',
    officeType: 'AC_LAND',
    lat: 24.0020,
    lng: 90.4260,
    upazilaNameBn: 'গাজীপুর সদর',
    districtNameBn: 'গাজীপুর',
    phone: '০২-৪৯২৭৩১০',
    addressBn: 'রাজবাড়ি রোড, গাজীপুর সদর',
    hoursBn: 'রবি-বৃহস্পতি: সকাল ৯:০০ - বিকেল ৪:০০',
    inChargeBn: 'সহকারী কমিশনার (ভূমি), গাজীপুর সদর',
    jurisdictionBn: 'জয়দেবপুর, চান্দনা ও সালনা মৌজা'
  },
  {
    id: 'off-nar-sadar',
    divisionId: 'div-dhaka',
    districtId: 'dist-narayanganj',
    nameBn: 'নারায়ণগঞ্জ সদর এসি ল্যান্ড ও সাব-রেজিস্ট্রি কমপ্লেক্স',
    nameEn: 'Narayanganj Sadar Land & Sub-Registry Complex',
    officeType: 'AC_LAND',
    lat: 23.6230,
    lng: 90.5010,
    upazilaNameBn: 'নারায়ণগঞ্জ সদর',
    districtNameBn: 'নারায়ণগঞ্জ',
    phone: '০২-৭৬৩৪০৫০',
    addressBn: 'বঙ্গবন্ধু সড়ক, নারায়ণগঞ্জ',
    hoursBn: 'রবি-বৃহস্পতি: সকাল ৯:০০ - বিকেল ৪:০০',
    inChargeBn: 'সহকারী কমিশনার (ভূমি), নারায়ণগঞ্জ',
    jurisdictionBn: 'নারায়ণগঞ্জ সদর, ফতুল্লা ও সিদ্ধিরগঞ্জ'
  },
  {
    id: 'off-tan-sadar',
    divisionId: 'div-dhaka',
    districtId: 'dist-tangail',
    nameBn: 'টাঙ্গাইল সদর উপজেলা ভূমি অফিস',
    nameEn: 'Tangail Sadar Upazila Land Office',
    officeType: 'AC_LAND',
    lat: 24.2500,
    lng: 89.9200,
    upazilaNameBn: 'টাঙ্গাইল সদর',
    districtNameBn: 'টাঙ্গাইল',
    phone: '০৯২১-৬৩১২৩',
    addressBn: 'ডিসি কোর্ট সংলগ্ন, টাঙ্গাইল সদর',
    hoursBn: 'রবি-বৃহস্পতি: সকাল ৯:০০ - বিকেল ৪:০০',
    inChargeBn: 'সহকারী কমিশনার (ভূমি), টাঙ্গাইল',
    jurisdictionBn: 'টাঙ্গাইল পৌরসভা ও কাকুয়া ইউনিয়ন'
  },

  // Chattogram Division
  {
    id: 'off-ctg-panchlaish',
    divisionId: 'div-chattogram',
    districtId: 'dist-chattogram',
    nameBn: 'পাঁচলাইশ রাজস্ব সার্কেল এসি ল্যান্ড অফিস, চট্টগ্রাম',
    nameEn: 'Panchlaish Circle AC Land Office, Chattogram',
    officeType: 'AC_LAND',
    lat: 22.3680,
    lng: 91.8260,
    upazilaNameBn: 'পাঁচলাইশ সার্কেল',
    districtNameBn: 'চট্টগ্রাম',
    phone: '০৩১-২৫৫১২৩০',
    addressBn: 'প্রবর্তক মোড়, পাঁচলাইশ, চট্টগ্রাম',
    hoursBn: 'রবি-বৃহস্পতি: সকাল ৯:০০ - বিকেল ৪:০০',
    inChargeBn: 'সহকারী কমিশনার (ভূমি), পাঁচলাইশ',
    jurisdictionBn: 'মুরাদপুর, নাসিরাবাদ ও ষোলশহর মৌজা'
  },
  {
    id: 'off-ctg-subregistry',
    divisionId: 'div-chattogram',
    districtId: 'dist-chattogram',
    nameBn: 'চট্টগ্রাম সদর সাব-রেজিস্ট্রি অফিস',
    nameEn: 'Chattogram Sadar Sub-Registry Office',
    officeType: 'SUB_REGISTRY',
    lat: 22.3360,
    lng: 91.8340,
    upazilaNameBn: 'কোতোয়ালী সার্কেল',
    districtNameBn: 'চট্টগ্রাম',
    phone: '০৩১-৬১৫৯২০',
    addressBn: 'কোর্ট হিল, চট্টগ্রাম সদর',
    hoursBn: 'রবি-বৃহস্পতি: সকাল ৯:০০ - বিকেল ৪:০০',
    inChargeBn: 'সদর সাব-রেজিস্ট্রার, চট্টগ্রাম',
    jurisdictionBn: 'চট্টগ্রাম মেট্রোপলিটন এলাকা'
  },
  {
    id: 'off-cox-sadar',
    divisionId: 'div-chattogram',
    districtId: 'dist-coxsbazar',
    nameBn: 'কক্সবাজার সদর উপজেলা ভূমি অফিস',
    nameEn: 'Coxs Bazar Sadar Land Office',
    officeType: 'AC_LAND',
    lat: 21.4310,
    lng: 92.0010,
    upazilaNameBn: 'কক্সবাজার সদর',
    districtNameBn: 'কক্সবাজার',
    phone: '০৩৪১-৬৩২১০',
    addressBn: 'ঝাউতলা, কক্সবাজার পৌরসভা',
    hoursBn: 'রবি-বৃহস্পতি: সকাল ৯:০০ - বিকেল ৪:০০',
    inChargeBn: 'সহকারী কমিশনার (ভূমি), কক্সবাজার সদর',
    jurisdictionBn: 'কক্সবাজার পৌরসভা ও সমুদ্র উপকূলীয় মৌজাসমূহ'
  },
  {
    id: 'off-cum-sadar',
    divisionId: 'div-chattogram',
    districtId: 'dist-cumilla',
    nameBn: 'কুমিল্লা আদর্শ সদর উপজেলা ভূমি অফিস',
    nameEn: 'Cumilla Adarsha Sadar Land Office',
    officeType: 'AC_LAND',
    lat: 23.4610,
    lng: 91.1820,
    upazilaNameBn: 'কুমিল্লা আদর্শ সদর',
    districtNameBn: 'কুমিল্লা',
    phone: '০৮১-৬৪৫১২',
    addressBn: 'কান্দিরপাড়, কুমিল্লা সদর',
    hoursBn: 'রবি-বৃহস্পতি: সকাল ৯:০০ - বিকেল ৪:০০',
    inChargeBn: 'সহকারী কমিশনার (ভূমি), কুমিল্লা সদর',
    jurisdictionBn: 'কুমিল্লা সিটি কর্পোরেশন ও গোবিন্দপুর মৌজা'
  },

  // Rajshahi Division
  {
    id: 'off-raj-boalia',
    divisionId: 'div-rajshahi',
    districtId: 'dist-rajshahi',
    nameBn: 'বোয়ালিয়া রাজস্ব সার্কেল এসি ল্যান্ড অফিস, রাজশাহী',
    nameEn: 'Boalia Circle AC Land Office, Rajshahi',
    officeType: 'AC_LAND',
    lat: 24.3640,
    lng: 88.6010,
    upazilaNameBn: 'বোয়ালিয়া সার্কেল',
    districtNameBn: 'রাজশাহী',
    phone: '০৭২১-৭৭৪১৫০',
    addressBn: 'কোর্ট চত্বর, বোয়ালিয়া, রাজশাহী',
    hoursBn: 'রবি-বৃহস্পতি: সকাল ৯:০০ - বিকেল ৪:০০',
    inChargeBn: 'সহকারী কমিশনার (ভূমি), বোয়ালিয়া',
    jurisdictionBn: 'বোয়ালিয়া, মতিহার ও রাজপাড়া মৌজাসমূহ'
  },
  {
    id: 'off-bog-sadar',
    divisionId: 'div-rajshahi',
    districtId: 'dist-bogura',
    nameBn: 'বগুড়া সদর এসি ল্যান্ড ও সাব-রেজিস্ট্রি কমপ্লেক্স',
    nameEn: 'Bogura Sadar Land & Sub-Registry Complex',
    officeType: 'AC_LAND',
    lat: 24.8480,
    lng: 89.3720,
    upazilaNameBn: 'বগুড়া সদর',
    districtNameBn: 'বগুড়া',
    phone: '০৫১-৬৪০১২',
    addressBn: 'সাতমাথা সংলগ্ন, বগুড়া',
    hoursBn: 'রবি-বৃহস্পতি: সকাল ৯:০০ - বিকেল ৪:০০',
    inChargeBn: 'সহকারী কমিশনার (ভূমি), বগুড়া সদর',
    jurisdictionBn: 'বগুড়া পৌরসভা ও সাবগ্রাম মৌজা'
  },
  {
    id: 'off-pab-sadar',
    divisionId: 'div-rajshahi',
    districtId: 'dist-pabna',
    nameBn: 'পাবনা সদর উপজেলা ভূমি অফিস',
    nameEn: 'Pabna Sadar Upazila Land Office',
    officeType: 'AC_LAND',
    lat: 24.0060,
    lng: 89.2500,
    upazilaNameBn: 'পাবনা সদর',
    districtNameBn: 'পাবনা',
    phone: '০৭৩১-৬৫৮৯০',
    addressBn: 'কাচারী রোড, পাবনা সদর',
    hoursBn: 'রবি-বৃহস্পতি: সকাল ৯:০০ - বিকেল ৪:০০',
    inChargeBn: 'সহকারী কমিশনার (ভূমি), পাবনা',
    jurisdictionBn: 'পাবনা পৌরসভা ও হেমায়েতপুর'
  },

  // Khulna Division
  {
    id: 'off-khl-sadar',
    divisionId: 'div-khulna',
    districtId: 'dist-khulna',
    nameBn: 'খুলনা সদর রাজস্ব সার্কেল এসি ল্যান্ড অফিস',
    nameEn: 'Khulna Sadar Circle AC Land Office',
    officeType: 'AC_LAND',
    lat: 22.8150,
    lng: 89.5640,
    upazilaNameBn: 'খুলনা সদর',
    districtNameBn: 'খুলনা',
    phone: '০৪১-৭২০৫৫০',
    addressBn: 'লোয়ার যশোর রোড, খুলনা',
    hoursBn: 'রবি-বৃহস্পতি: সকাল ৯:০০ - বিকেল ৪:০০',
    inChargeBn: 'সহকারী কমিশনার (ভূমি), খুলনা সদর',
    jurisdictionBn: 'খুলনা সদর ও খালিশপুর সার্কেল'
  },
  {
    id: 'off-jas-sadar',
    divisionId: 'div-khulna',
    districtId: 'dist-jashore',
    nameBn: 'যশোর সদর উপজেলা ভূমি ও সাব-রেজিস্ট্রি অফিস',
    nameEn: 'Jashore Sadar Upazila Land Office',
    officeType: 'AC_LAND',
    lat: 23.1680,
    lng: 89.2130,
    upazilaNameBn: 'যশোর সদর',
    districtNameBn: 'যশোর',
    phone: '০৪২১-৬৮৯১২',
    addressBn: 'দড়াটানা মোড়, যশোর সদর',
    hoursBn: 'রবি-বৃহস্পতি: সকাল ৯:০০ - বিকেল ৪:০০',
    inChargeBn: 'সহকারী কমিশনার (ভূমি), যশোর সদর',
    jurisdictionBn: 'যশোর পৌরসভা ও আরবপুর মৌজা'
  },
  {
    id: 'off-sat-sadar',
    divisionId: 'div-khulna',
    districtId: 'dist-satkhira',
    nameBn: 'সাতক্ষীরা সদর উপজেলা ভূমি অফিস',
    nameEn: 'Satkhira Sadar Upazila Land Office',
    officeType: 'AC_LAND',
    lat: 22.7180,
    lng: 89.0710,
    upazilaNameBn: 'সাতক্ষীরা সদর',
    districtNameBn: 'সাতক্ষীরা',
    phone: '০৪৭২-৬৩২১০',
    addressBn: 'শহীদ নাজমুল সরণি, সাতক্ষীরা',
    hoursBn: 'রবি-বৃহস্পতি: সকাল ৯:০০ - বিকেল ৪:০০',
    inChargeBn: 'সহকারী কমিশনার (ভূমি), সাতক্ষীরা',
    jurisdictionBn: 'সাতক্ষীরা পৌরসভা ও ভোমরা বন্দর জোন'
  },

  // Barishal Division
  {
    id: 'off-bar-sadar',
    divisionId: 'div-barishal',
    districtId: 'dist-barishal',
    nameBn: 'বরিশাল সদর রাজস্ব সার্কেল এসি ল্যান্ড অফিস',
    nameEn: 'Barishal Sadar Circle AC Land Office',
    officeType: 'AC_LAND',
    lat: 22.7050,
    lng: 90.3600,
    upazilaNameBn: 'বরিশাল সদর',
    districtNameBn: 'বরিশাল',
    phone: '০৪৩১-৬৪০৫০',
    addressBn: 'বান্দ রোড, বরিশাল সদর',
    hoursBn: 'রবি-বৃহস্পতি: সকাল ৯:০০ - বিকেল ৪:০০',
    inChargeBn: 'সহকারী কমিশনার (ভূমি), বরিশাল সদর',
    jurisdictionBn: 'বরিশাল সিটি ও চরমোনাই মৌজা'
  },
  {
    id: 'off-pat-sadar',
    divisionId: 'div-barishal',
    districtId: 'dist-patuakhali',
    nameBn: 'পটুয়াখালী সদর উপজেলা ভূমি অফিস',
    nameEn: 'Patuakhali Sadar Upazila Land Office',
    officeType: 'AC_LAND',
    lat: 22.3590,
    lng: 90.3300,
    upazilaNameBn: 'পটুয়াখালী সদর',
    districtNameBn: 'পটুয়াখালী',
    phone: '০৪৪১-৬২১২০',
    addressBn: 'নতুন বাজার, পটুয়াখালী সদর',
    hoursBn: 'রবি-বৃহস্পতি: সকাল ৯:০০ - বিকেল ৪:০০',
    inChargeBn: 'সহকারী কমিশনার (ভূমি), পটুয়াখালী',
    jurisdictionBn: 'পটুয়াখালী পৌরসভা ও লোহালিয়া'
  },

  // Sylhet Division
  {
    id: 'off-syl-sadar',
    divisionId: 'div-sylhet',
    districtId: 'dist-sylhet',
    nameBn: 'সিলেট সদর রাজস্ব সার্কেল এসি ল্যান্ড অফিস',
    nameEn: 'Sylhet Sadar Circle AC Land Office',
    officeType: 'AC_LAND',
    lat: 24.8950,
    lng: 91.8700,
    upazilaNameBn: 'সিলেট সদর',
    districtNameBn: 'সিলেট',
    phone: '০৮২১-৭১২৩৪০',
    addressBn: 'বন্দরবাজার, সিলেট সদর',
    hoursBn: 'রবি-বৃহস্পতি: সকাল ৯:০০ - বিকেল ৪:০০',
    inChargeBn: 'সহকারী কমিশনার (ভূমি), সিলেট সদর',
    jurisdictionBn: 'সিলেট সিটি কর্পোরেশন ও খাদিমপাড়া'
  },
  {
    id: 'off-mou-sadar',
    divisionId: 'div-sylhet',
    districtId: 'dist-moulvibazar',
    nameBn: 'মৌলভীবাজার সদর উপজেলা ভূমি অফিস',
    nameEn: 'Moulvibazar Sadar Upazila Land Office',
    officeType: 'AC_LAND',
    lat: 24.4820,
    lng: 91.7720,
    upazilaNameBn: 'মৌলভীবাজার সদর',
    districtNameBn: 'মৌলভীবাজার',
    phone: '০৮৬১-৫২২৩০',
    addressBn: 'কোর্ট রোড, মৌলভীবাজার সদর',
    hoursBn: 'রবি-বৃহস্পতি: সকাল ৯:০০ - বিকেল ৪:০০',
    inChargeBn: 'সহকারী কমিশনার (ভূমি), মৌলভীবাজার',
    jurisdictionBn: 'মৌলভীবাজার পৌরসভা ও চাঁদনীঘাট'
  },

  // Rangpur Division
  {
    id: 'off-rp-sadar',
    divisionId: 'div-rangpur',
    districtId: 'dist-rangpur',
    nameBn: 'রংপুর সদর রাজস্ব সার্কেল এসি ল্যান্ড অফিস',
    nameEn: 'Rangpur Sadar Circle AC Land Office',
    officeType: 'AC_LAND',
    lat: 25.7480,
    lng: 89.2600,
    upazilaNameBn: 'রংপুর সদর',
    districtNameBn: 'রংপুর',
    phone: '০৫২১-৬৫৪১২',
    addressBn: 'কাচারী বাজার, রংপুর সদর',
    hoursBn: 'রবি-বৃহস্পতি: সকাল ৯:০০ - বিকেল ৪:০০',
    inChargeBn: 'সহকারী কমিশনার (ভূমি), রংপুর সদর',
    jurisdictionBn: 'রংপুর সিটি কর্পোরেশন এলাকা'
  },
  {
    id: 'off-din-sadar',
    divisionId: 'div-rangpur',
    districtId: 'dist-dinajpur',
    nameBn: 'দিনাজপুর সদর এসি ল্যান্ড ও সার্ভে রেকর্ড রুম',
    nameEn: 'Dinajpur Sadar Land & Survey Record Room',
    officeType: 'RECORD_SURVEY',
    lat: 25.6250,
    lng: 88.6380,
    upazilaNameBn: 'দিনাজপুর সদর',
    districtNameBn: 'দিনাজপুর',
    phone: '০৫৩১-৬৩২১০',
    addressBn: 'বাহাদুর বাজার, দিনাজপুর সদর',
    hoursBn: 'রবি-বৃহস্পতি: সকাল ৯:০০ - বিকেল ৪:০০',
    inChargeBn: 'সহকারী কমিশনার (ভূমি) ও রেকর্ড কিপার',
    jurisdictionBn: 'দিনাজপুর সদর ও ঐতিহাসিক সার্ভে রেকর্ড রুম'
  },
  {
    id: 'off-pan-tetulia',
    divisionId: 'div-rangpur',
    districtId: 'dist-panchagarh',
    nameBn: 'তেঁতুলিয়া উপজেলা ভূমি অফিস, পঞ্চগড় (উত্তর সীমান্ত)',
    nameEn: 'Tetulia Upazila Land Office, Panchagarh (North Border)',
    officeType: 'AC_LAND',
    lat: 26.4950,
    lng: 88.3550,
    upazilaNameBn: 'তেঁতুলিয়া',
    districtNameBn: 'পঞ্চগড়',
    phone: '০৫৬৮-৫১২২০',
    addressBn: 'বাংলাবান্ধা রোড, তেঁতুলিয়া, পঞ্চগড়',
    hoursBn: 'রবি-বৃহস্পতি: সকাল ৯:০০ - বিকেল ৪:০০',
    inChargeBn: 'সহকারী কমিশনার (ভূমি), তেঁতুলিয়া',
    jurisdictionBn: 'তেঁতুলিয়া ও বাংলাবান্ধা সীমান্ত মৌজা'
  },

  // Mymensingh Division
  {
    id: 'off-mym-sadar',
    divisionId: 'div-mymensingh',
    districtId: 'dist-mymensingh',
    nameBn: 'ময়মনসিংহ সদর রাজস্ব সার্কেল এসি ল্যান্ড অফিস',
    nameEn: 'Mymensingh Sadar Circle AC Land Office',
    officeType: 'AC_LAND',
    lat: 24.7570,
    lng: 90.4120,
    upazilaNameBn: 'ময়মনসিংহ সদর',
    districtNameBn: 'ময়মনসিংহ',
    phone: '০৯১-৬৭৪১০',
    addressBn: 'কাচারীঘাট, ময়মনসিংহ সদর',
    hoursBn: 'রবি-বৃহস্পতি: সকাল ৯:০০ - বিকেল ৪:০০',
    inChargeBn: 'সহকারী কমিশনার (ভূমি), ময়মনসিংহ সদর',
    jurisdictionBn: 'ময়মনসিংহ সিটি কর্পোরেশন ও চরপাড়া'
  },
  {
    id: 'off-jam-sadar',
    divisionId: 'div-mymensingh',
    districtId: 'dist-jamalpur',
    nameBn: 'জামালপুর সদর উপজেলা ভূমি অফিস',
    nameEn: 'Jamalpur Sadar Upazila Land Office',
    officeType: 'AC_LAND',
    lat: 24.9370,
    lng: 89.9380,
    upazilaNameBn: 'জামালপুর সদর',
    districtNameBn: 'জামালপুর',
    phone: '০৯৮১-৬২২১০',
    addressBn: 'স্টেশন রোড, জামালপুর সদর',
    hoursBn: 'রবি-বৃহস্পতি: সকাল ৯:০০ - বিকেল ৪:০০',
    inChargeBn: 'সহকারী কমিশনার (ভূমি), জামালপুর',
    jurisdictionBn: 'জামালপুর পৌরসভা ও নান্দিনা'
  }
];

// ========================================================
// 7. COMPREHENSIVE CS SURVEY RECORDS (১৮৮৮-১৯৪০)
// Cadastral Survey Records Covering All 8 Divisions
// ========================================================
export const ALL_BANGLADESH_CS_RECORDS: SurveyRecordMarker[] = [
  // Dhaka Division
  {
    id: 'cs-dhk-01',
    surveyType: 'CS',
    divisionId: 'div-dhaka',
    districtId: 'dist-dhaka',
    lat: 23.7385,
    lng: 90.4060,
    khatianNo: '৮৯',
    dagNo: '৬৫০',
    mouzaNameBn: 'সেগুনবাগিচা',
    mouzaNameEn: 'Segunbagicha',
    mouzaJlNo: '৫৮',
    recordedOwnerBn: 'বাবু হরেন্দ্র নারায়ণ রায়চৌধুরী (জমিদার)',
    recordedOwnerEn: 'Babu Harendra Narayan Raychaudhuri',
    surveyPeriod: '1910-1920 (ক্যাডাস্ট্রাল সার্ভে)',
    areaDecimals: 12.0,
    recordedAreaAcre: 0.12,
    landClassBn: 'বাস্তু ভিটা',
    volumeNo: 'টোক-০৪',
    statusBn: 'আদি ব্রিটিশ রেকর্ড সংরক্ষিত',
    verified: true
  },
  {
    id: 'cs-dhk-02',
    surveyType: 'CS',
    divisionId: 'div-dhaka',
    districtId: 'dist-dhaka',
    lat: 23.8590,
    lng: 90.2610,
    khatianNo: '৪৫',
    dagNo: '৪৫০',
    mouzaNameBn: 'বিরুলিয়া',
    mouzaNameEn: 'Birulia',
    mouzaJlNo: '২৯',
    recordedOwnerBn: 'মৌলভী খায়ের আলী মুন্সী',
    recordedOwnerEn: 'Moulvi Khayer Ali Munshi',
    surveyPeriod: '1915-1925 (সিএস ঢাকা)',
    areaDecimals: 20.0,
    recordedAreaAcre: 0.20,
    landClassBn: 'নাল জমি (কৃষি)',
    volumeNo: 'টোক-০২',
    statusBn: 'সিএস বালামভুক্ত',
    verified: true
  },
  {
    id: 'cs-gaz-01',
    surveyType: 'CS',
    divisionId: 'div-dhaka',
    districtId: 'dist-gazipur',
    lat: 24.0030,
    lng: 90.4270,
    khatianNo: '১৩৪',
    dagNo: '৭৮২',
    mouzaNameBn: 'জয়দেবপুর',
    mouzaNameEn: 'Joydebpur',
    mouzaJlNo: '০৬',
    recordedOwnerBn: 'ভাওয়াল রাজ এস্টেট (মহারাজ কুমার রামেন্দ্র নারায়ণ)',
    recordedOwnerEn: 'Bhowal Raj Estate',
    surveyPeriod: '1914-1924 (সিএস ভাওয়াল)',
    areaDecimals: 35.0,
    recordedAreaAcre: 0.35,
    landClassBn: 'শালবন ও ভিটা',
    volumeNo: 'টোক-১১',
    statusBn: 'ভাওয়াল এস্টেট রেকর্ডভুক্ত',
    verified: true
  },

  // Chattogram Division
  {
    id: 'cs-ctg-01',
    surveyType: 'CS',
    divisionId: 'div-chattogram',
    districtId: 'dist-chattogram',
    lat: 22.3685,
    lng: 91.8260,
    khatianNo: '৫৬',
    dagNo: '৩৪৫',
    mouzaNameBn: 'মুরাদপুর',
    mouzaNameEn: 'Muradpur',
    mouzaJlNo: '১১',
    recordedOwnerBn: 'মৌলভী হাফিজুর রহমান তালুকদার',
    recordedOwnerEn: 'Moulvi Hafizur Rahman Talukder',
    surveyPeriod: '1920-1930 (সিএস চট্টগ্রাম)',
    areaDecimals: 12.0,
    recordedAreaAcre: 0.12,
    landClassBn: 'নল জমি (কৃষি)',
    volumeNo: 'টোক-০৩',
    statusBn: 'সিএস বালামে অন্তর্ভুক্ত',
    verified: true
  },
  {
    id: 'cs-cox-01',
    surveyType: 'CS',
    divisionId: 'div-chattogram',
    districtId: 'dist-coxsbazar',
    lat: 21.4320,
    lng: 92.0020,
    khatianNo: '২৪',
    dagNo: '১২৩',
    mouzaNameBn: 'ঝিলংজা',
    mouzaNameEn: 'Jhilongja',
    mouzaJlNo: '০৭',
    recordedOwnerBn: 'বাবু প্রসন্ন কুমার দে',
    recordedOwnerEn: 'Babu Prasanna Kumar Dey',
    surveyPeriod: '1925-1932 (সিএস কক্সবাজার)',
    areaDecimals: 18.5,
    recordedAreaAcre: 0.185,
    landClassBn: 'লবণ চাষ ও ঝাউবন ভিটা',
    volumeNo: 'টোক-০১',
    statusBn: 'সিএস রেকর্ড সুরক্ষিত',
    verified: true
  },
  {
    id: 'cs-cum-01',
    surveyType: 'CS',
    divisionId: 'div-chattogram',
    districtId: 'dist-cumilla',
    lat: 23.4620,
    lng: 91.1830,
    khatianNo: '৯২',
    dagNo: '৫৪০',
    mouzaNameBn: 'গোবিন্দপুর',
    mouzaNameEn: 'Gobindapur',
    mouzaJlNo: '১৮',
    recordedOwnerBn: 'ত্রিপুরা রাজ এস্টেট (বীর বিক্রম কিশোর মাণিক্য)',
    recordedOwnerEn: 'Tripura Raj Estate',
    surveyPeriod: '1892-1898 (ত্রিপুরা চাকলা রওশনাবাদ সিএস)',
    areaDecimals: 28.0,
    recordedAreaAcre: 0.28,
    landClassBn: 'আবাদী নাল জমি',
    volumeNo: 'টোক-০৮',
    statusBn: 'প্রাচীনতম সিএস সার্ভে অন্তর্ভুক্ত',
    verified: true
  },

  // Rajshahi Division
  {
    id: 'cs-raj-01',
    surveyType: 'CS',
    divisionId: 'div-rajshahi',
    districtId: 'dist-rajshahi',
    lat: 24.3645,
    lng: 88.6020,
    khatianNo: '৩৪',
    dagNo: '২১০',
    mouzaNameBn: 'বোয়ালিয়া',
    mouzaNameEn: 'Boalia',
    mouzaJlNo: '০৮',
    recordedOwnerBn: 'রাজা প্রমথনাথ রায় বাহাদুর (দিঘাপতিয়া স্টেট)',
    recordedOwnerEn: 'Raja Promothonath Roy Bahadur',
    surveyPeriod: '1912-1922 (সিএস রাজশাহী)',
    areaDecimals: 25.0,
    recordedAreaAcre: 0.25,
    landClassBn: 'বাগান ও আবাদী জমি',
    volumeNo: 'টোক-০৭',
    statusBn: 'সিএস মহাফেজখানায় রক্ষিত',
    verified: true
  },
  {
    id: 'cs-bog-01',
    surveyType: 'CS',
    divisionId: 'div-rajshahi',
    districtId: 'dist-bogura',
    lat: 24.8490,
    lng: 89.3730,
    khatianNo: '৬৮',
    dagNo: '৪৭৫',
    mouzaNameBn: 'সাবগ্রাম',
    mouzaNameEn: 'Sabgram',
    mouzaJlNo: '২২',
    recordedOwnerBn: 'নবাব আবদুস সোবহান চৌধুরী',
    recordedOwnerEn: 'Nawab Abdus Sobhan Chowdhury',
    surveyPeriod: '1920-1928 (সিএস বগুড়া)',
    areaDecimals: 30.0,
    recordedAreaAcre: 0.30,
    landClassBn: 'ফসলী দো-ফসলা জমি',
    volumeNo: 'টোক-০৬',
    statusBn: 'সিএস বালামে নথিভুক্ত',
    verified: true
  },

  // Khulna Division
  {
    id: 'cs-khl-01',
    surveyType: 'CS',
    divisionId: 'div-khulna',
    districtId: 'dist-khulna',
    lat: 22.8160,
    lng: 89.5650,
    khatianNo: '৭২',
    dagNo: '৪১৫',
    mouzaNameBn: 'টুটপাড়া',
    mouzaNameEn: 'Tutpara',
    mouzaJlNo: '২৩',
    recordedOwnerBn: 'শ্রী উপেন্দ্রনাথ মুখোপাধ্যায়',
    recordedOwnerEn: 'Upendranath Mukherjee',
    surveyPeriod: '1922-1932 (সিএস খুলনা)',
    areaDecimals: 15.5,
    recordedAreaAcre: 0.155,
    landClassBn: 'নাল জমি',
    volumeNo: 'টোক-০১',
    statusBn: 'সিএস জেলা রেকর্ড রুমে বিদ্যমান',
    verified: true
  },
  {
    id: 'cs-jas-01',
    surveyType: 'CS',
    divisionId: 'div-khulna',
    districtId: 'dist-jashore',
    lat: 23.1690,
    lng: 89.2140,
    khatianNo: '৫১',
    dagNo: '৩১২',
    mouzaNameBn: 'আরবপুর',
    mouzaNameEn: 'Arabpur',
    mouzaJlNo: '১৫',
    recordedOwnerBn: 'নড়াইল রায় জমিদার পরিবার',
    recordedOwnerEn: 'Narail Roy Zamindar Family',
    surveyPeriod: '1918-1926 (সিএস যশোর)',
    areaDecimals: 22.0,
    recordedAreaAcre: 0.22,
    landClassBn: 'ভিটা ও খামার জমি',
    volumeNo: 'টোক-০৫',
    statusBn: 'সিএস বালামভুক্ত',
    verified: true
  },

  // Barishal Division
  {
    id: 'cs-bar-01',
    surveyType: 'CS',
    divisionId: 'div-barishal',
    districtId: 'dist-barishal',
    lat: 22.7060,
    lng: 90.3610,
    khatianNo: '১৯',
    dagNo: '১৮২',
    mouzaNameBn: 'আমতলী',
    mouzaNameEn: 'Amtoli',
    mouzaJlNo: '০৪',
    recordedOwnerBn: 'কাজী তোফাজ্জল হোসেন হাওলাদার',
    recordedOwnerEn: 'Kazi Tofazzal Hossain Hawlader',
    surveyPeriod: '1905-1915 (বাকেরগঞ্জ সিএস)',
    areaDecimals: 18.0,
    recordedAreaAcre: 0.18,
    landClassBn: 'আবাদী নাল জমি',
    volumeNo: 'টোক-০৯',
    statusBn: 'সিএস বালামে সংরক্ষিত',
    verified: true
  },
  {
    id: 'cs-pat-01',
    surveyType: 'CS',
    divisionId: 'div-barishal',
    districtId: 'dist-patuakhali',
    lat: 22.3600,
    lng: 90.3310,
    khatianNo: '৮৩',
    dagNo: '৫১০',
    mouzaNameBn: 'লোহালিয়া',
    mouzaNameEn: 'Lohalia',
    mouzaJlNo: '০৯',
    recordedOwnerBn: 'মোঃ আফসার উদ্দিন সিকদার',
    recordedOwnerEn: 'Md. Afsar Uddin Sikder',
    surveyPeriod: '1912-1920 (সিএস পটুয়াখালী)',
    areaDecimals: 24.0,
    recordedAreaAcre: 0.24,
    landClassBn: 'কৃষি জমি ও ডোবা',
    volumeNo: 'টোক-০৩',
    statusBn: 'সিএস রেকর্ড নথিভুক্ত',
    verified: true
  },

  // Sylhet Division
  {
    id: 'cs-syl-01',
    surveyType: 'CS',
    divisionId: 'div-sylhet',
    districtId: 'dist-sylhet',
    lat: 24.8960,
    lng: 91.8710,
    khatianNo: '১০৩',
    dagNo: '৫২০',
    mouzaNameBn: 'খাদিমপাড়া',
    mouzaNameEn: 'Khadimpara',
    mouzaJlNo: '১৪',
    recordedOwnerBn: 'দেওয়ান আব্দুল মতিন চৌধুরী',
    recordedOwnerEn: 'Dewan Abdul Matin Chowdhury',
    surveyPeriod: '1935-1940 (আসাম-সিলেট জরিপ)',
    areaDecimals: 22.0,
    recordedAreaAcre: 0.22,
    landClassBn: 'চা বাগান সংলগ্ন ভিটি',
    volumeNo: 'টোক-০৫',
    statusBn: 'সিএস রেকর্ডভুক্ত',
    verified: true
  },
  {
    id: 'cs-mou-01',
    surveyType: 'CS',
    divisionId: 'div-sylhet',
    districtId: 'dist-moulvibazar',
    lat: 24.4830,
    lng: 91.7730,
    khatianNo: '৭৪',
    dagNo: '৩৪০',
    mouzaNameBn: 'চাঁদনীঘাট',
    mouzaNameEn: 'Chandnighat',
    mouzaJlNo: '১১',
    recordedOwnerBn: 'সৈয়দ মোশাররফ আলী',
    recordedOwnerEn: 'Syed Mosharraf Ali',
    surveyPeriod: '1936-1940 (সিএস শ্রীমঙ্গল/মৌলভীবাজার)',
    areaDecimals: 19.0,
    recordedAreaAcre: 0.19,
    landClassBn: 'ভিটি ও বাগান',
    volumeNo: 'টোক-০৭',
    statusBn: 'সিএস বালামে সংরক্ষিত',
    verified: true
  },

  // Rangpur Division
  {
    id: 'cs-rp-01',
    surveyType: 'CS',
    divisionId: 'div-rangpur',
    districtId: 'dist-dinajpur',
    lat: 25.6260,
    lng: 88.6390,
    khatianNo: '৪৭',
    dagNo: '৮৪০',
    mouzaNameBn: 'বাহাদুরপুর',
    mouzaNameEn: 'Bahadurpur',
    mouzaJlNo: '২৯',
    recordedOwnerBn: 'মহারাজা জগদীশ নাথ রায় (দিনাজপুর রাজ স্টেট)',
    recordedOwnerEn: 'Maharaja Jagadish Nath Roy',
    surveyPeriod: '1934-1940 (সিএস দিনাজপুর)',
    areaDecimals: 30.0,
    recordedAreaAcre: 0.30,
    landClassBn: 'কৃষি নাল জমি',
    volumeNo: 'টোক-০২',
    statusBn: 'দিনাজপুর মহাফেজখানায় রক্ষিত',
    verified: true
  },
  {
    id: 'cs-pan-01',
    surveyType: 'CS',
    divisionId: 'div-rangpur',
    districtId: 'dist-panchagarh',
    lat: 26.4960,
    lng: 88.3560,
    khatianNo: '১২',
    dagNo: '১০৫',
    mouzaNameBn: 'বাংলাবান্ধা',
    mouzaNameEn: 'Banglabandha',
    mouzaJlNo: '০১',
    recordedOwnerBn: 'শ্রী যোগেশ চন্দ্র সরকার',
    recordedOwnerEn: 'Jogesh Chandra Sarkar',
    surveyPeriod: '1938-1942 (জলপাইগুড়ি/তেঁতুলিয়া সিএস)',
    areaDecimals: 38.0,
    recordedAreaAcre: 0.38,
    landClassBn: 'চাষযোগ্য সমতল ভূমি',
    volumeNo: 'টোক-০১',
    statusBn: 'উত্তর সীমান্ত ঐতিহাসিক সিএস',
    verified: true
  },

  // Mymensingh Division
  {
    id: 'cs-mym-01',
    surveyType: 'CS',
    divisionId: 'div-mymensingh',
    districtId: 'dist-mymensingh',
    lat: 24.7560,
    lng: 90.4110,
    khatianNo: '৬১',
    dagNo: '৩৭৫',
    mouzaNameBn: 'চরপাড়া',
    mouzaNameEn: 'Charpara',
    mouzaJlNo: '১৬',
    recordedOwnerBn: 'শ্রী শশীকান্ত আচার্য্য চৌধুরী (মুক্তাগাছা জমিদার)',
    recordedOwnerEn: 'Shashi Kanta Acharya Chowdhury',
    surveyPeriod: '1911-1920 (সিএস ময়মনসিংহ)',
    areaDecimals: 16.4,
    recordedAreaAcre: 0.164,
    landClassBn: 'চরভূমি ও ভিটি',
    volumeNo: 'টোক-০৮',
    statusBn: 'সিএস বালামে বিদ্যমান',
    verified: true
  },
  {
    id: 'cs-jam-01',
    surveyType: 'CS',
    divisionId: 'div-mymensingh',
    districtId: 'dist-jamalpur',
    lat: 24.9380,
    lng: 89.9390,
    khatianNo: '৮৫',
    dagNo: '৪৯০',
    mouzaNameBn: 'নান্দিনা',
    mouzaNameEn: 'Nandina',
    mouzaJlNo: '০৮',
    recordedOwnerBn: 'খান বাহাদুর আবদুল ওয়াহেদ খাঁ',
    recordedOwnerEn: 'Khan Bahadur Abdul Wahed Khan',
    surveyPeriod: '1916-1924 (সিএস জামালপুর)',
    areaDecimals: 26.0,
    recordedAreaAcre: 0.26,
    landClassBn: 'নাল ও ভিটা জমি',
    volumeNo: 'টোক-০৪',
    statusBn: 'সিএস মহাফেজখানায় সংগৃহীত',
    verified: true
  }
];

// ========================================================
// 8. COMPREHENSIVE SA SURVEY RECORDS (১৯৫৬-১৯৬২)
// State Acquisition Records Post Zamindari Abolition
// ========================================================
export const ALL_BANGLADESH_SA_RECORDS: SurveyRecordMarker[] = [
  // Dhaka Division
  {
    id: 'sa-dhk-01',
    surveyType: 'SA',
    divisionId: 'div-dhaka',
    districtId: 'dist-dhaka',
    lat: 23.7375,
    lng: 90.4045,
    khatianNo: '১৪২',
    dagNo: '৮৯০',
    mouzaNameBn: 'সেগুনবাগিচা',
    mouzaNameEn: 'Segunbagicha',
    mouzaJlNo: '৫৮',
    recordedOwnerBn: 'মোঃ রমিজ উদ্দিন সরকার',
    recordedOwnerEn: 'Md. Romiz Uddin Sarkar',
    surveyPeriod: '1956-1962 (স্টেট একুইজিশন)',
    areaDecimals: 10.0,
    recordedAreaAcre: 0.10,
    landClassBn: 'আবাসিক ভিটি',
    volumeNo: 'ভলিউম-১২',
    statusBn: 'এসএ ৯ নং কলামে রেকর্ডভুক্ত',
    verified: true
  },
  {
    id: 'sa-dhk-02',
    surveyType: 'SA',
    divisionId: 'div-dhaka',
    districtId: 'dist-dhaka',
    lat: 23.8575,
    lng: 90.2595,
    khatianNo: '৯৮',
    dagNo: '৬৭০',
    mouzaNameBn: 'বিরুলিয়া',
    mouzaNameEn: 'Birulia',
    mouzaJlNo: '২৯',
    recordedOwnerBn: 'কাজী গোলাম মোস্তফা',
    recordedOwnerEn: 'Kazi Golam Mostofa',
    surveyPeriod: '1956-1962 (এসএ সাভার)',
    areaDecimals: 16.0,
    recordedAreaAcre: 0.16,
    landClassBn: 'কৃষি নাল জমি',
    volumeNo: 'ভলিউম-০৬',
    statusBn: 'এসএ বালামে বৈধ মালিকানা',
    verified: true
  },

  // Chattogram Division
  {
    id: 'sa-ctg-01',
    surveyType: 'SA',
    divisionId: 'div-chattogram',
    districtId: 'dist-chattogram',
    lat: 22.3675,
    lng: 91.8245,
    khatianNo: '১৮৫',
    dagNo: '৫১২',
    mouzaNameBn: 'মুরাদপুর',
    mouzaNameEn: 'Muradpur',
    mouzaJlNo: '১১',
    recordedOwnerBn: 'বসির উল্লাহ সওদাগর',
    recordedOwnerEn: 'Basir Ullah Sawdagar',
    surveyPeriod: '1956-1962 (এসএ চট্টগ্রাম)',
    areaDecimals: 11.2,
    recordedAreaAcre: 0.112,
    landClassBn: 'নল জমি',
    volumeNo: 'ভলিউম-০৬',
    statusBn: 'এসএ বালামে বৈধ মালিকানা',
    verified: true
  },
  {
    id: 'sa-cum-01',
    surveyType: 'SA',
    divisionId: 'div-chattogram',
    districtId: 'dist-cumilla',
    lat: 23.4615,
    lng: 91.1815,
    khatianNo: '২৩১',
    dagNo: '৮৯০',
    mouzaNameBn: 'গোবিন্দপুর',
    mouzaNameEn: 'Gobindapur',
    mouzaJlNo: '১৮',
    recordedOwnerBn: 'আবদুল বারিক মজুমদার',
    recordedOwnerEn: 'Abdul Barik Majumder',
    surveyPeriod: '1956-1962 (এসএ কুমিল্লা)',
    areaDecimals: 22.5,
    recordedAreaAcre: 0.225,
    landClassBn: 'কৃষি নাল জমি',
    volumeNo: 'ভলিউম-০৯',
    statusBn: 'এসএ বালামভুক্ত',
    verified: true
  },

  // Rajshahi Division
  {
    id: 'sa-raj-01',
    surveyType: 'SA',
    divisionId: 'div-rajshahi',
    districtId: 'dist-rajshahi',
    lat: 24.3635,
    lng: 88.6015,
    khatianNo: '৯৬',
    dagNo: '৩৪০',
    mouzaNameBn: 'বোয়ালিয়া',
    mouzaNameEn: 'Boalia',
    mouzaJlNo: '০৮',
    recordedOwnerBn: 'আব্দুস সোবহান প্রামাণিক',
    recordedOwnerEn: 'Abdus Sobhan Pramanik',
    surveyPeriod: '1956-1962 (এসএ রাজশাহী)',
    areaDecimals: 20.0,
    recordedAreaAcre: 0.20,
    landClassBn: 'বাগান ও ভিটা',
    volumeNo: 'ভলিউম-১৪',
    statusBn: 'এসএ রেকর্ডভুক্ত',
    verified: true
  },

  // Khulna Division
  {
    id: 'sa-khl-01',
    surveyType: 'SA',
    divisionId: 'div-khulna',
    districtId: 'dist-khulna',
    lat: 22.8155,
    lng: 89.5635,
    khatianNo: '১৩২',
    dagNo: '৫৮০',
    mouzaNameBn: 'টুটপাড়া',
    mouzaNameEn: 'Tutpara',
    mouzaJlNo: '২৩',
    recordedOwnerBn: 'শেখ ইনছান আলী',
    recordedOwnerEn: 'Sheikh Insan Ali',
    surveyPeriod: '1956-1962 (এসএ খুলনা)',
    areaDecimals: 14.0,
    recordedAreaAcre: 0.14,
    landClassBn: 'নাল জমি',
    volumeNo: 'ভলিউম-০৭',
    statusBn: 'এসএ প্রস্তুতকৃত রেকর্ড',
    verified: true
  },

  // Barishal Division
  {
    id: 'sa-bar-01',
    surveyType: 'SA',
    divisionId: 'div-barishal',
    districtId: 'dist-barishal',
    lat: 22.7045,
    lng: 90.3595,
    khatianNo: '৭৮',
    dagNo: '২৬৫',
    mouzaNameBn: 'আমতলী',
    mouzaNameEn: 'Amtoli',
    mouzaJlNo: '০৪',
    recordedOwnerBn: 'মোঃ হাবিবুর রহমান মৃধা',
    recordedOwnerEn: 'Md. Habibur Rahman Mridha',
    surveyPeriod: '1956-1962 (এসএ বাকেরগঞ্জ)',
    areaDecimals: 16.5,
    recordedAreaAcre: 0.165,
    landClassBn: 'আবাদী কৃষি জমি',
    volumeNo: 'ভলিউম-১১',
    statusBn: 'এসএ রেকর্ড সুরক্ষিত',
    verified: true
  },

  // Sylhet Division
  {
    id: 'sa-syl-01',
    surveyType: 'SA',
    divisionId: 'div-sylhet',
    districtId: 'dist-sylhet',
    lat: 24.8945,
    lng: 91.8695,
    khatianNo: '২১১',
    dagNo: '৭৪০',
    mouzaNameBn: 'খাদিমপাড়া',
    mouzaNameEn: 'Khadimpara',
    mouzaJlNo: '১৪',
    recordedOwnerBn: 'মৌলভি খলিলুর রহমান',
    recordedOwnerEn: 'Moulvi Khalilur Rahman',
    surveyPeriod: '1956-1962 (এসএ সিলেট)',
    areaDecimals: 18.0,
    recordedAreaAcre: 0.18,
    landClassBn: 'বাগান ও চা ভিটি',
    volumeNo: 'ভলিউম-০৮',
    statusBn: 'এসএ বালামে বৈধ মালিকানা',
    verified: true
  },

  // Rangpur Division
  {
    id: 'sa-rp-01',
    surveyType: 'SA',
    divisionId: 'div-rangpur',
    districtId: 'dist-dinajpur',
    lat: 25.6245,
    lng: 88.6375,
    khatianNo: '১৪০',
    dagNo: '৯৮০',
    mouzaNameBn: 'বাহাদুরপুর',
    mouzaNameEn: 'Bahadurpur',
    mouzaJlNo: '২৯',
    recordedOwnerBn: 'মোঃ মজিবর রহমান মণ্ডল',
    recordedOwnerEn: 'Md. Mojibor Rahman Mondal',
    surveyPeriod: '1956-1962 (এসএ দিনাজপুর)',
    areaDecimals: 24.0,
    recordedAreaAcre: 0.24,
    landClassBn: 'কৃষি নাল জমি',
    volumeNo: 'ভলিউম-১৮',
    statusBn: 'এসএ বালামে রক্ষিত',
    verified: true
  },

  // Mymensingh Division
  {
    id: 'sa-mym-01',
    surveyType: 'SA',
    divisionId: 'div-mymensingh',
    districtId: 'dist-mymensingh',
    lat: 24.7545,
    lng: 90.4095,
    khatianNo: '১১৯',
    dagNo: '৪৫০',
    mouzaNameBn: 'চরপাড়া',
    mouzaNameEn: 'Charpara',
    mouzaJlNo: '১৬',
    recordedOwnerBn: 'মোঃ নুরুল ইসলাম আকন্দ',
    recordedOwnerEn: 'Md. Nurul Islam Akand',
    surveyPeriod: '1956-1962 (এসএ ময়মনসিংহ)',
    areaDecimals: 14.8,
    recordedAreaAcre: 0.148,
    landClassBn: 'ভিটি ও কৃষি',
    volumeNo: 'ভলিউম-০৫',
    statusBn: 'এসএ রেকর্ডভুক্ত',
    verified: true
  }
];

// ========================================================
// 9. COMPREHENSIVE RS / BS / CITY SURVEY RECORDS (১৯৬৫-বর্তমান)
// Revisional Survey & Modern Cadastral Records Across All Divisions
// ========================================================
export const ALL_BANGLADESH_RS_RECORDS: SurveyRecordMarker[] = [
  // Dhaka Division
  {
    id: 'rs-dhk-01',
    surveyType: 'RS',
    divisionId: 'div-dhaka',
    districtId: 'dist-dhaka',
    lat: 23.7380,
    lng: 90.4055,
    khatianNo: '৩১৮',
    dagNo: '১২০৪',
    mouzaNameBn: 'সেগুনবাগিচা',
    mouzaNameEn: 'Segunbagicha',
    mouzaJlNo: '৫৮',
    recordedOwnerBn: 'আবুল কালাম আজাদ ও অন্যান্য',
    recordedOwnerEn: 'Abul Kalam Azad & Others',
    surveyPeriod: 'সিটি জরিপ / আরএস',
    areaDecimals: 8.5,
    recordedAreaAcre: 0.085,
    landClassBn: 'আবাসিক ভিটি (পাকা ভবন)',
    volumeNo: 'আরএস-০৯',
    statusBn: 'অনলাইনে নামজারি ও কর পরিশোধিত',
    verified: true
  },
  {
    id: 'rs-dhk-02',
    surveyType: 'RS',
    divisionId: 'div-dhaka',
    districtId: 'dist-dhaka',
    lat: 23.8580,
    lng: 90.2605,
    khatianNo: '৫১২',
    dagNo: '৮৯০',
    mouzaNameBn: 'বিরুলিয়া',
    mouzaNameEn: 'Birulia',
    mouzaJlNo: '২৯',
    recordedOwnerBn: 'মেসার্স ডেল্টা হোল্ডিংস লিঃ',
    recordedOwnerEn: 'M/S Delta Holdings Ltd.',
    surveyPeriod: 'আরএস (আধুনিক খতিয়ান)',
    areaDecimals: 15.0,
    recordedAreaAcre: 0.15,
    landClassBn: 'নাল জমি',
    volumeNo: 'আরএস-১৪',
    statusBn: 'অনলাইন ই-নামজারি ভেরিফায়েড',
    verified: true
  },

  // Chattogram Division
  {
    id: 'rs-ctg-01',
    surveyType: 'RS',
    divisionId: 'div-chattogram',
    districtId: 'dist-chattogram',
    lat: 22.3680,
    lng: 91.8255,
    khatianNo: '৪১২',
    dagNo: '৭৮১',
    mouzaNameBn: 'মুরাদপুর',
    mouzaNameEn: 'Muradpur',
    mouzaJlNo: '১১',
    recordedOwnerBn: 'চট্টগ্রাম ট্রেডিং করপোরেশন লিঃ',
    recordedOwnerEn: 'Chattogram Trading Corp. Ltd.',
    surveyPeriod: 'বিএস (বাংলাদেশ সার্ভে)',
    areaDecimals: 10.4,
    recordedAreaAcre: 0.104,
    landClassBn: 'বাণিজ্যিক রূপান্তর স্পেস',
    volumeNo: 'বিএস-০২',
    statusBn: 'হাল রেকর্ডীয় নামজারি প্রস্তুত',
    verified: true
  },
  {
    id: 'rs-cox-01',
    surveyType: 'RS',
    divisionId: 'div-chattogram',
    districtId: 'dist-coxsbazar',
    lat: 21.4315,
    lng: 92.0015,
    khatianNo: '৩৪০',
    dagNo: '৬৫০',
    mouzaNameBn: 'ঝিলংজা',
    mouzaNameEn: 'Jhilongja',
    mouzaJlNo: '০৭',
    recordedOwnerBn: 'হোটেল সি-ভিউ রিসোর্টস',
    recordedOwnerEn: 'Hotel Sea View Resorts',
    surveyPeriod: 'বিএস কক্সবাজার আধুনিক',
    areaDecimals: 25.0,
    recordedAreaAcre: 0.25,
    landClassBn: 'পর্যটন ও হোটেল ভিটা',
    volumeNo: 'বিএস-১১',
    statusBn: 'পর্যটন লিজ ও নামজারি সম্পন্ন',
    verified: true
  },

  // Rajshahi Division
  {
    id: 'rs-raj-01',
    surveyType: 'RS',
    divisionId: 'div-rajshahi',
    districtId: 'dist-rajshahi',
    lat: 24.3640,
    lng: 88.6010,
    khatianNo: '৫১২',
    dagNo: '৮৯০',
    mouzaNameBn: 'বোয়ালিয়া',
    mouzaNameEn: 'Boalia',
    mouzaJlNo: '০৮',
    recordedOwnerBn: 'প্রফেসর ড. মুহাম্মদ আব্দুল্লাহ',
    recordedOwnerEn: 'Prof. Dr. Muhammad Abdullah',
    surveyPeriod: 'আরএস রাজশাহী সিটি জরিপ',
    areaDecimals: 12.5,
    recordedAreaAcre: 0.125,
    landClassBn: 'পাকা আবাসিক ভবন',
    volumeNo: 'আরএস-০৪',
    statusBn: 'কর দাখিলা হালনাগাদ',
    verified: true
  },

  // Khulna Division
  {
    id: 'rs-khl-01',
    surveyType: 'RS',
    divisionId: 'div-khulna',
    districtId: 'dist-khulna',
    lat: 22.8150,
    lng: 89.5640,
    khatianNo: '৪২৭',
    dagNo: '৯১৫',
    mouzaNameBn: 'টুটপাড়া',
    mouzaNameEn: 'Tutpara',
    mouzaJlNo: '২৩',
    recordedOwnerBn: 'মোঃ তানভীর হাসান',
    recordedOwnerEn: 'Md. Tanvir Hasan',
    surveyPeriod: 'আরএস খুলনা সিটি',
    areaDecimals: 9.8,
    recordedAreaAcre: 0.098,
    landClassBn: 'আবাসিক ভিটি',
    volumeNo: 'আরএস-০৮',
    statusBn: 'ডিজিটাল ভূমি রেকর্ডভুক্ত',
    verified: true
  },

  // Barishal Division
  {
    id: 'rs-bar-01',
    surveyType: 'RS',
    divisionId: 'div-barishal',
    districtId: 'dist-barishal',
    lat: 22.7050,
    lng: 90.3600,
    khatianNo: '৩৩৯',
    dagNo: '৬৭২',
    mouzaNameBn: 'আমতলী',
    mouzaNameEn: 'Amtoli',
    mouzaJlNo: '০৪',
    recordedOwnerBn: 'বেগম সুফিয়া খাতুন',
    recordedOwnerEn: 'Begum Sufia Khatun',
    surveyPeriod: 'আরএস বরিশাল সদর',
    areaDecimals: 11.0,
    recordedAreaAcre: 0.11,
    landClassBn: 'কৃষি নাল জমি',
    volumeNo: 'আরএস-০৩',
    statusBn: 'ই-নামজারি অনুমোদিত',
    verified: true
  },

  // Sylhet Division
  {
    id: 'rs-syl-01',
    surveyType: 'RS',
    divisionId: 'div-sylhet',
    districtId: 'dist-sylhet',
    lat: 24.8950,
    lng: 91.8700,
    khatianNo: '৩৫৬',
    dagNo: '৯৮০',
    mouzaNameBn: 'খাদিমপাড়া',
    mouzaNameEn: 'Khadimpara',
    mouzaJlNo: '১৪',
    recordedOwnerBn: 'ফারহানা ইসলাম চৌধুরী (যুক্তরাজ্য প্রবাসী)',
    recordedOwnerEn: 'Farhana Islam Chowdhury',
    surveyPeriod: 'বিএস (বাংলাদেশ সার্ভে)',
    areaDecimals: 16.0,
    recordedAreaAcre: 0.16,
    landClassBn: 'আবাসিক ভিটি',
    volumeNo: 'বিএস-০৭',
    statusBn: 'প্রবাসী অগ্রাধিকার নামজারি সম্পন্ন',
    verified: true
  },

  // Rangpur Division
  {
    id: 'rs-rp-01',
    surveyType: 'RS',
    divisionId: 'div-rangpur',
    districtId: 'dist-dinajpur',
    lat: 25.6250,
    lng: 88.6380,
    khatianNo: '৩৮১',
    dagNo: '১০৪৫',
    mouzaNameBn: 'বাহাদুরপুর',
    mouzaNameEn: 'Bahadurpur',
    mouzaJlNo: '২৯',
    recordedOwnerBn: 'মেসার্স উত্তরবঙ্গ অ্যাগ্রো ফুডস লিঃ',
    recordedOwnerEn: 'M/S Uttarbanga Agro Foods Ltd.',
    surveyPeriod: 'আরএস দিনাজপুর আধুনিক',
    areaDecimals: 22.5,
    recordedAreaAcre: 0.225,
    landClassBn: 'কৃষি প্রসেসিং জোন',
    volumeNo: 'আরএস-১২',
    statusBn: 'অনলাইন ই-পর্চা যাচাইকৃত',
    verified: true
  },

  // Mymensingh Division
  {
    id: 'rs-mym-01',
    surveyType: 'RS',
    divisionId: 'div-mymensingh',
    districtId: 'dist-mymensingh',
    lat: 24.7550,
    lng: 90.4100,
    khatianNo: '২৩৪',
    dagNo: '৫৬০',
    mouzaNameBn: 'চরপাড়া',
    mouzaNameEn: 'Charpara',
    mouzaJlNo: '১৬',
    recordedOwnerBn: 'ডা: রফিকুল ইসলাম',
    recordedOwnerEn: 'Dr. Rafiqul Islam',
    surveyPeriod: 'আরএস ময়মনসিংহ',
    areaDecimals: 12.0,
    recordedAreaAcre: 0.12,
    landClassBn: 'বাস্তু ভিটি ও ক্লিনিক',
    volumeNo: 'আরএস-০৬',
    statusBn: 'হালনাগাদ দাখিলা নিবন্ধিত',
    verified: true
  }
];
