/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Bangladesh Integrated Land Services Portal (BILSP)
 * 64 Districts Vector Geometry & Centroids for Official Bangladesh District Map
 * Styled after the official Bangladesh National Vector Administrative Map.
 */

import officialBoundaries from './officialBangladeshBoundaries.json';

export interface DistrictVector {
  id: string;
  divisionId: string;
  nameBn: string;
  nameEn: string;
  code: string;
  centerX: number;
  centerY: number;
  path: string; // SVG path data or polygon
  upazilasCount: number;
  areaKm2: number;
}

export interface DivisionConfig {
  id: string;
  code: string;
  nameBn: string;
  nameEn: string;
  color: string;
  borderColor: string;
  centerX: number;
  centerY: number;
  districtsCount: number;
  upazilasCount: number;
  areaKm2: number;
  populationEstimate: string;
  districtIds: string[];
  viewBox: string;
  path: string; // Seamless continuous boundary path forming authentic Bangladesh silhouette
}

export const BANGLADESH_DIVISIONS_CONFIG: DivisionConfig[] = [
  {
    id: 'div-rangpur',
    code: 'RP',
    nameBn: 'রংপুর বিভাগ',
    nameEn: 'Rangpur Division',
    color: '#38bdf8',
    borderColor: '#0284c7',
    centerX: (officialBoundaries.divisionCentroids as any)['div-rangpur']?.[0] || 190,
    centerY: (officialBoundaries.divisionCentroids as any)['div-rangpur']?.[1] || 140,
    districtsCount: 8,
    upazilasCount: 58,
    areaKm2: 16185,
    populationEstimate: '১ কোটি ৭৬ লাখ',
    districtIds: ['dist-panchagarh', 'dist-thakurgaon', 'dist-dinajpur', 'dist-nilphamari', 'dist-lalmonirhat', 'dist-rangpur', 'dist-kurigram', 'dist-gaibandha'],
    viewBox: '30 10 320 240',
    path: (officialBoundaries.divisions as Record<string, string>)['div-rangpur'] || ''
  },
  {
    id: 'div-rajshahi',
    code: 'RAJ',
    nameBn: 'রাজশাহী বিভাগ',
    nameEn: 'Rajshahi Division',
    color: '#fbbf24',
    borderColor: '#d97706',
    centerX: (officialBoundaries.divisionCentroids as any)['div-rajshahi']?.[0] || 179,
    centerY: (officialBoundaries.divisionCentroids as any)['div-rajshahi']?.[1] || 327,
    districtsCount: 8,
    upazilasCount: 67,
    areaKm2: 18153,
    populationEstimate: '২ কোটি ৩ লাখ',
    districtIds: ['dist-rajshahi', 'dist-bogura', 'dist-pabna', 'dist-sirajganj', 'dist-naogaon', 'dist-natore', 'dist-chapainawabganj', 'dist-joypurhat'],
    viewBox: '30 200 290 280',
    path: (officialBoundaries.divisions as Record<string, string>)['div-rajshahi'] || ''
  },
  {
    id: 'div-mymensingh',
    code: 'MYM',
    nameBn: 'ময়মনসিংহ বিভাগ',
    nameEn: 'Mymensingh Division',
    color: '#2dd4bf',
    borderColor: '#0f766e',
    centerX: (officialBoundaries.divisionCentroids as any)['div-mymensingh']?.[0] || 385,
    centerY: (officialBoundaries.divisionCentroids as any)['div-mymensingh']?.[1] || 307,
    districtsCount: 4,
    upazilasCount: 35,
    areaKm2: 10584,
    populationEstimate: '১ কোটি ২৩ লাখ',
    districtIds: ['dist-mymensingh', 'dist-jamalpur', 'dist-netrokona', 'dist-sherpur'],
    viewBox: '260 200 230 180',
    path: (officialBoundaries.divisions as Record<string, string>)['div-mymensingh'] || ''
  },
  {
    id: 'div-sylhet',
    code: 'SYL',
    nameBn: 'সিলেট বিভাগ',
    nameEn: 'Sylhet Division',
    color: '#34d399',
    borderColor: '#059669',
    centerX: (officialBoundaries.divisionCentroids as any)['div-sylhet']?.[0] || 557,
    centerY: (officialBoundaries.divisionCentroids as any)['div-sylhet']?.[1] || 329,
    districtsCount: 4,
    upazilasCount: 41,
    areaKm2: 12596,
    populationEstimate: '১ কোটি ২১ লাখ',
    districtIds: ['dist-sylhet', 'dist-moulvibazar', 'dist-habiganj', 'dist-sunamganj'],
    viewBox: '410 170 280 230',
    path: (officialBoundaries.divisions as Record<string, string>)['div-sylhet'] || ''
  },
  {
    id: 'div-dhaka',
    code: 'DHK',
    nameBn: 'ঢাকা বিভাগ',
    nameEn: 'Dhaka Division',
    color: '#10b981',
    borderColor: '#047857',
    centerX: (officialBoundaries.divisionCentroids as any)['div-dhaka']?.[0] || 358,
    centerY: (officialBoundaries.divisionCentroids as any)['div-dhaka']?.[1] || 431,
    districtsCount: 13,
    upazilasCount: 93,
    areaKm2: 20594,
    populationEstimate: '৪ কোটি ৪২ লাখ',
    districtIds: ['dist-dhaka', 'dist-gazipur', 'dist-narayanganj', 'dist-tangail', 'dist-narsingdi', 'dist-manikganj', 'dist-munshiganj', 'dist-faridpur', 'dist-gopalganj', 'dist-kishoreganj', 'dist-madaripur', 'dist-rajbari', 'dist-shariatpur'],
    viewBox: '240 310 260 300',
    path: (officialBoundaries.divisions as Record<string, string>)['div-dhaka'] || ''
  },
  {
    id: 'div-khulna',
    code: 'KHL',
    nameBn: 'খুলনা বিভাগ',
    nameEn: 'Khulna Division',
    color: '#818cf8',
    borderColor: '#4f46e5',
    centerX: (officialBoundaries.divisionCentroids as any)['div-khulna']?.[0] || 231,
    centerY: (officialBoundaries.divisionCentroids as any)['div-khulna']?.[1] || 579,
    districtsCount: 10,
    upazilasCount: 59,
    areaKm2: 22284,
    populationEstimate: '১ কোটি ৭৪ লাখ',
    districtIds: ['dist-khulna', 'dist-jashore', 'dist-satkhira', 'dist-kushtia', 'dist-jhenaidah', 'dist-chuadanga', 'dist-meherpur', 'dist-bagerhat', 'dist-magura', 'dist-narail'],
    viewBox: '80 370 290 400',
    path: (officialBoundaries.divisions as Record<string, string>)['div-khulna'] || ''
  },
  {
    id: 'div-barishal',
    code: 'BAR',
    nameBn: 'বরিশাল বিভাগ',
    nameEn: 'Barishal Division',
    color: '#a78bfa',
    borderColor: '#7c3aed',
    centerX: (officialBoundaries.divisionCentroids as any)['div-barishal']?.[0] || 354,
    centerY: (officialBoundaries.divisionCentroids as any)['div-barishal']?.[1] || 644,
    districtsCount: 6,
    upazilasCount: 42,
    areaKm2: 13225,
    populationEstimate: '৯১ লাখ',
    districtIds: ['dist-barishal', 'dist-patuakhali', 'dist-bhola', 'dist-pirojpur', 'dist-barguna', 'dist-jhalakathi'],
    viewBox: '240 480 230 300',
    path: (officialBoundaries.divisions as Record<string, string>)['div-barishal'] || ''
  },
  {
    id: 'div-chattogram',
    code: 'CTG',
    nameBn: 'চট্টগ্রাম বিভাগ',
    nameEn: 'Chattogram Division',
    color: '#fb7185',
    borderColor: '#e11d48',
    centerX: (officialBoundaries.divisionCentroids as any)['div-chattogram']?.[0] || 572,
    centerY: (officialBoundaries.divisionCentroids as any)['div-chattogram']?.[1] || 587,
    districtsCount: 11,
    upazilasCount: 103,
    areaKm2: 33909,
    populationEstimate: '৩ কোটি ৩২ লাখ',
    districtIds: ['dist-chattogram', 'dist-coxsbazar', 'dist-cumilla', 'dist-feni', 'dist-brahmanbaria', 'dist-noakhali', 'dist-chandpur', 'dist-lakshmipur', 'dist-rangamati', 'dist-khagrachhari', 'dist-bandarban'],
    viewBox: '340 340 360 590',
    path: (officialBoundaries.divisions as Record<string, string>)['div-chattogram'] || ''
  }
];

// Convert GPS (lat, lng) to SVG canvas coordinates (0 0 750 950)
export function projectLatLng(lat: number, lng: number): [number, number] {
  const minLng = 88.0;
  const maxLng = 92.7;
  const minLat = 20.5;
  const maxLat = 26.65;

  const x = ((lng - minLng) / (maxLng - minLng)) * 670 + 40;
  const y = ((maxLat - lat) / (maxLat - minLat)) * 880 + 35;
  return [Math.round(x), Math.round(y)];
}

// Helper to generate polygon path from array of [lat, lng]
export function latLngArrayToSvgPath(coords: [number, number][]): string {
  if (coords.length === 0) return '';
  return coords
    .map((c, i) => {
      const [x, y] = projectLatLng(c[0], c[1]);
      return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
    })
    .join(' ') + ' Z';
}

// Helper to create an organic irregular district polygon around a center [lat, lng]
function createDistrictPath(centerLat: number, centerLng: number, radiusLat: number, radiusLng: number, angleOffset = 0): string {
  const points: [number, number][] = [];
  const segments = 8;
  for (let i = 0; i < segments; i++) {
    const angle = (i / segments) * 2 * Math.PI + angleOffset;
    // Vary radius slightly for natural organic boundary
    const variance = 0.8 + 0.4 * Math.sin(angle * 3);
    const lat = centerLat + radiusLat * variance * Math.cos(angle);
    const lng = centerLng + radiusLng * variance * Math.sin(angle);
    points.push([lat, lng]);
  }
  return latLngArrayToSvgPath(points);
}

// ========================================================
// AUTHENTIC BANGLADESH SILHOUETTE & ISLANDS (FROM OFFICIAL BBS GEOBOUNDARIES)
// Exact national silhouette containing all 8 continuous divisions
// ========================================================
export const BANGLADESH_AUTHENTIC_SILHOUETTE_PATH = Object.values(officialBoundaries.divisions).join(' ');

export const BANGLADESH_COASTAL_ISLANDS_PATHS = [
  // 1. Bhola Island (Teardrop shape in central delta)
  {
    id: 'island-bhola',
    nameBn: 'ভোলা দ্বীপ',
    path: `
      M 382 630
      C 388 620, 400 626, 404 642
      C 408 668, 406 702, 398 732
      C 392 748, 384 750, 378 735
      C 372 708, 374 665, 382 630
      Z
    `
  },
  // 2. Hatia Island (Southeast of Bhola)
  {
    id: 'island-hatia',
    nameBn: 'হাতিয়া দ্বীপ',
    path: `
      M 436 678
      C 445 670, 455 678, 458 694
      C 462 718, 458 746, 448 764
      C 440 770, 434 762, 432 746
      C 430 722, 428 696, 436 678
      Z
    `
  },
  // 3. Sandwip Island (East of Hatia, off Chittagong coast)
  {
    id: 'island-sandwip',
    nameBn: 'সন্দ্বীপ',
    path: `
      M 482 675
      C 490 670, 498 680, 498 695
      C 496 712, 492 730, 484 736
      C 478 734, 474 722, 475 706
      C 476 692, 476 680, 482 675
      Z
    `
  },
  // 4. Manpura Island (South of Meghna estuary)
  {
    id: 'island-manpura',
    nameBn: 'মনপুরা',
    path: `
      M 414 712
      C 420 708, 425 715, 425 726
      C 423 742, 418 758, 412 760
      C 408 756, 408 744, 410 732
      C 411 720, 412 714, 414 712
      Z
    `
  },
  // 5. Kutubdia / Maheshkhali coastal chain (Cox's Bazar coast)
  {
    id: 'island-kutubdia',
    nameBn: 'কুতুবদিয়া ও মহেশখালী',
    path: `
      M 536 760
      C 542 754, 548 764, 546 780
      C 542 805, 538 832, 532 836
      C 528 832, 528 814, 530 794
      C 532 774, 534 762, 536 760
      Z
    `
  },
  // 6. St. Martin's Island (Southernmost Coral Island)
  {
    id: 'island-stmartin',
    nameBn: "সেন্ট মার্টিন'স দ্বীপ",
    path: `
      M 564 934
      C 567 928, 574 932, 575 940
      C 576 948, 572 954, 567 952
      C 563 950, 562 940, 564 934
      Z
    `
  }
];

export interface RiverVector {
  id: string;
  nameBn: string;
  nameEn: string;
  path: string;
  labelX: number;
  labelY: number;
  width: number;
}

export const BANGLADESH_MAJOR_RIVERS: RiverVector[] = [
  {
    id: 'river-jamuna',
    nameBn: 'যমুনা নদী (ব্রহ্মপুত্র)',
    nameEn: 'Jamuna River',
    path: 'M 298 165 C 306 200, 312 238, 314 275 C 316 310, 318 360, 315 425',
    labelX: 328,
    labelY: 235,
    width: 3.5
  },
  {
    id: 'river-padma',
    nameBn: 'পদ্মা নদী (গঙ্গা)',
    nameEn: 'Padma River',
    path: 'M 162 445 C 205 435, 250 425, 315 425 C 335 455, 350 495, 375 545',
    labelX: 230,
    labelY: 418,
    width: 4.0
  },
  {
    id: 'river-meghna',
    nameBn: 'মেঘনা নদী ও মোহনা',
    nameEn: 'Meghna River & Estuary',
    path: 'M 445 425 C 420 460, 395 500, 375 545 C 385 600, 410 655, 435 730',
    labelX: 410,
    labelY: 535,
    width: 5.0
  },
  {
    id: 'river-karnaphuli',
    nameBn: 'কর্ণফুলী নদী',
    nameEn: 'Karnaphuli River',
    path: 'M 585 680 C 560 705, 535 725, 510 742',
    labelX: 545,
    labelY: 712,
    width: 2.5
  }
];

// Complete 64 Districts with Accurate Projections and Bengali Labels matching uploaded image
const RAW_BANGLADESH_64_DISTRICTS: DistrictVector[] = [
  // ==========================================
  // 1. DHAKA DIVISION (13 Districts)
  // ==========================================
  {
    id: 'dist-dhaka',
    divisionId: 'div-dhaka',
    nameBn: 'ঢাকা',
    nameEn: 'Dhaka',
    code: 'DHK',
    centerX: 384,
    centerY: 441,
    path: createDistrictPath(23.8103, 90.4125, 0.22, 0.22, 0.2),
    upazilasCount: 6,
    areaKm2: 1463
  },
  {
    id: 'dist-gazipur',
    divisionId: 'div-dhaka',
    nameBn: 'গাজীপুর',
    nameEn: 'Gazipur',
    code: 'GAZ',
    centerX: 386,
    centerY: 413,
    path: createDistrictPath(24.0023, 90.4264, 0.22, 0.22, 0.5),
    upazilasCount: 5,
    areaKm2: 1806
  },
  {
    id: 'dist-narayanganj',
    divisionId: 'div-dhaka',
    nameBn: 'নারায়ণগঞ্জ',
    nameEn: 'Narayanganj',
    code: 'NAR',
    centerX: 396,
    centerY: 468,
    path: createDistrictPath(23.6238, 90.5000, 0.16, 0.18, 0.1),
    upazilasCount: 5,
    areaKm2: 759
  },
  {
    id: 'dist-tangail',
    divisionId: 'div-dhaka',
    nameBn: 'টাঙ্গাইল',
    nameEn: 'Tangail',
    code: 'TAN',
    centerX: 313,
    centerY: 378,
    path: createDistrictPath(24.2513, 89.9167, 0.32, 0.28, 0.7),
    upazilasCount: 12,
    areaKm2: 3414
  },
  {
    id: 'dist-narsingdi',
    divisionId: 'div-dhaka',
    nameBn: 'নরসিংদী',
    nameEn: 'Narsingdi',
    code: 'NSD',
    centerX: 427,
    centerY: 424,
    path: createDistrictPath(23.9322, 90.7154, 0.19, 0.20, 0.3),
    upazilasCount: 6,
    areaKm2: 1141
  },
  {
    id: 'dist-manikganj',
    divisionId: 'div-dhaka',
    nameBn: 'মানিকগঞ্জ',
    nameEn: 'Manikganj',
    code: 'MAN',
    centerX: 326,
    centerY: 433,
    path: createDistrictPath(23.8644, 90.0047, 0.22, 0.22, 0.4),
    upazilasCount: 7,
    areaKm2: 1379
  },
  {
    id: 'dist-munshiganj',
    divisionId: 'div-dhaka',
    nameBn: 'মুন্সীগঞ্জ',
    nameEn: 'Munshiganj',
    code: 'MUN',
    centerX: 400,
    centerY: 480,
    path: createDistrictPath(23.5422, 90.5305, 0.18, 0.18, 0.9),
    upazilasCount: 6,
    areaKm2: 954
  },
  {
    id: 'dist-faridpur',
    divisionId: 'div-dhaka',
    nameBn: 'ফরিদপুর',
    nameEn: 'Faridpur',
    code: 'FAR',
    centerX: 303,
    centerY: 470,
    path: createDistrictPath(23.6070, 89.8429, 0.28, 0.26, 0.2),
    upazilasCount: 9,
    areaKm2: 2072
  },
  {
    id: 'dist-gopalganj',
    divisionId: 'div-dhaka',
    nameBn: 'গোপালগঞ্জ',
    nameEn: 'Gopalganj',
    code: 'GOP',
    centerX: 300,
    centerY: 556,
    path: createDistrictPath(23.0050, 89.8266, 0.24, 0.24, 0.6),
    upazilasCount: 5,
    areaKm2: 1490
  },
  {
    id: 'dist-kishoreganj',
    divisionId: 'div-dhaka',
    nameBn: 'কিশোরগঞ্জ',
    nameEn: 'Kishoreganj',
    code: 'KIS',
    centerX: 436,
    centerY: 350,
    path: createDistrictPath(24.4449, 90.7766, 0.30, 0.28, 0.8),
    upazilasCount: 13,
    areaKm2: 2688
  },
  {
    id: 'dist-madaripur',
    divisionId: 'div-dhaka',
    nameBn: 'মাদারীপুর',
    nameEn: 'Madaripur',
    code: 'MAD',
    centerX: 352,
    centerY: 533,
    path: createDistrictPath(23.1641, 90.1897, 0.20, 0.20, 0.3),
    upazilasCount: 5,
    areaKm2: 1144
  },
  {
    id: 'dist-rajbari',
    divisionId: 'div-dhaka',
    nameBn: 'রাজবাড়ী',
    nameEn: 'Rajbari',
    code: 'RAJ-D',
    centerX: 275,
    centerY: 449,
    path: createDistrictPath(23.7574, 89.6445, 0.20, 0.20, 0.5),
    upazilasCount: 5,
    areaKm2: 1118
  },
  {
    id: 'dist-shariatpur',
    divisionId: 'div-dhaka',
    nameBn: 'শরীয়তপুর',
    nameEn: 'Shariatpur',
    code: 'SHA',
    centerX: 387,
    centerY: 522,
    path: createDistrictPath(23.2423, 90.4348, 0.20, 0.20, 0.7),
    upazilasCount: 6,
    areaKm2: 1181
  },

  // ==========================================
  // 2. CHATTOGRAM DIVISION (11 Districts)
  // ==========================================
  {
    id: 'dist-chattogram',
    divisionId: 'div-chattogram',
    nameBn: 'চট্টগ্রাম',
    nameEn: 'Chattogram',
    code: 'CTG',
    centerX: 579,
    centerY: 649,
    path: createDistrictPath(22.3569, 91.7832, 0.45, 0.35, 0.1),
    upazilasCount: 15,
    areaKm2: 5282
  },
  {
    id: 'dist-coxsbazar',
    divisionId: 'div-chattogram',
    nameBn: 'কক্সবাজার',
    nameEn: "Cox's Bazar",
    code: 'COX',
    centerX: 611,
    centerY: 781,
    path: createDistrictPath(21.4272, 92.0058, 0.50, 0.22, 0.4),
    upazilasCount: 8,
    areaKm2: 2491
  },
  {
    id: 'dist-cumilla',
    divisionId: 'div-chattogram',
    nameBn: 'কুমিল্লা',
    nameEn: 'Cumilla',
    code: 'CUM',
    centerX: 493,
    centerY: 490,
    path: createDistrictPath(23.4682, 91.1788, 0.30, 0.28, 0.3),
    upazilasCount: 17,
    areaKm2: 3087
  },
  {
    id: 'dist-feni',
    divisionId: 'div-chattogram',
    nameBn: 'ফেনী',
    nameEn: 'Feni',
    code: 'FEN',
    centerX: 524,
    centerY: 554,
    path: createDistrictPath(23.0186, 91.3966, 0.18, 0.18, 0.8),
    upazilasCount: 6,
    areaKm2: 928
  },
  {
    id: 'dist-brahmanbaria',
    divisionId: 'div-chattogram',
    nameBn: 'ব্রাহ্মণবাড়িয়া',
    nameEn: 'Brahmanbaria',
    code: 'BRA',
    centerX: 483,
    centerY: 420,
    path: createDistrictPath(23.9571, 91.1119, 0.26, 0.24, 0.5),
    upazilasCount: 9,
    areaKm2: 1927
  },
  {
    id: 'dist-noakhali',
    divisionId: 'div-chattogram',
    nameBn: 'নোয়াখালী',
    nameEn: 'Noakhali',
    code: 'NOA',
    centerX: 482,
    centerY: 576,
    path: createDistrictPath(22.8696, 91.0993, 0.32, 0.28, 0.2),
    upazilasCount: 9,
    areaKm2: 3601
  },
  {
    id: 'dist-chandpur',
    divisionId: 'div-chattogram',
    nameBn: 'চাঁদপুর',
    nameEn: 'Chandpur',
    code: 'CHA',
    centerX: 420,
    centerY: 524,
    path: createDistrictPath(23.2333, 90.6667, 0.22, 0.22, 0.6),
    upazilasCount: 8,
    areaKm2: 1704
  },
  {
    id: 'dist-lakshmipur',
    divisionId: 'div-chattogram',
    nameBn: 'লক্ষ্মীপুর',
    nameEn: 'Lakshmipur',
    code: 'LAK',
    centerX: 445,
    centerY: 565,
    path: createDistrictPath(22.9425, 90.8412, 0.20, 0.20, 0.4),
    upazilasCount: 5,
    areaKm2: 1456
  },
  {
    id: 'dist-rangamati',
    divisionId: 'div-chattogram',
    nameBn: 'রাঙ্গামাটি',
    nameEn: 'Rangamati',
    code: 'RAN',
    centerX: 652,
    centerY: 595,
    path: createDistrictPath(22.7324, 92.2985, 0.48, 0.35, 0.7),
    upazilasCount: 10,
    areaKm2: 6116
  },
  {
    id: 'dist-khagrachhari',
    divisionId: 'div-chattogram',
    nameBn: 'খাগড়াছড়ি',
    nameEn: 'Khagrachhari',
    code: 'KHA',
    centerX: 608,
    centerY: 540,
    path: createDistrictPath(23.1193, 91.9847, 0.32, 0.26, 0.5),
    upazilasCount: 9,
    areaKm2: 2699
  },
  {
    id: 'dist-bandarban',
    divisionId: 'div-chattogram',
    nameBn: 'বান্দরবান',
    nameEn: 'Bandarban',
    code: 'BAN',
    centerX: 641,
    centerY: 672,
    path: createDistrictPath(22.1953, 92.2184, 0.46, 0.32, 0.3),
    upazilasCount: 7,
    areaKm2: 4479
  },

  // ==========================================
  // 3. RAJSHAHI DIVISION (8 Districts)
  // ==========================================
  {
    id: 'dist-rajshahi',
    divisionId: 'div-rajshahi',
    nameBn: 'রাজশাহী',
    nameEn: 'Rajshahi',
    code: 'RAJ',
    centerX: 129,
    centerY: 362,
    path: createDistrictPath(24.3636, 88.6241, 0.28, 0.28, 0.4),
    upazilasCount: 9,
    areaKm2: 2407
  },
  {
    id: 'dist-bogura',
    divisionId: 'div-rajshahi',
    nameBn: 'বগুড়া',
    nameEn: 'Bogura',
    code: 'BOG',
    centerX: 236,
    centerY: 293,
    path: createDistrictPath(24.8465, 89.3777, 0.30, 0.30, 0.2),
    upazilasCount: 12,
    areaKm2: 2898
  },
  {
    id: 'dist-pabna',
    divisionId: 'div-rajshahi',
    nameBn: 'পাবনা',
    nameEn: 'Pabna',
    code: 'PAB',
    centerX: 217,
    centerY: 412,
    path: createDistrictPath(24.0118, 89.2450, 0.28, 0.26, 0.7),
    upazilasCount: 9,
    areaKm2: 2371
  },
  {
    id: 'dist-sirajganj',
    divisionId: 'div-rajshahi',
    nameBn: 'সিরাজগঞ্জ',
    nameEn: 'Sirajganj',
    code: 'SIR',
    centerX: 282,
    centerY: 349,
    path: createDistrictPath(24.4534, 89.7008, 0.30, 0.28, 0.3),
    upazilasCount: 9,
    areaKm2: 2498
  },
  {
    id: 'dist-naogaon',
    divisionId: 'div-rajshahi',
    nameBn: 'নওগাঁ',
    nameEn: 'Naogaon',
    code: 'NAO',
    centerX: 173,
    centerY: 301,
    path: createDistrictPath(24.7936, 88.9318, 0.32, 0.30, 0.6),
    upazilasCount: 11,
    areaKm2: 3435
  },
  {
    id: 'dist-natore',
    divisionId: 'div-rajshahi',
    nameBn: 'নাটোর',
    nameEn: 'Natore',
    code: 'NAT',
    centerX: 173,
    centerY: 354,
    path: createDistrictPath(24.4206, 88.9322, 0.25, 0.25, 0.5),
    upazilasCount: 7,
    areaKm2: 1896
  },
  {
    id: 'dist-chapainawabganj',
    divisionId: 'div-rajshahi',
    nameBn: 'চাঁপাইনবাবগঞ্জ',
    nameEn: 'Chapainawabganj',
    code: 'CPN',
    centerX: 79,
    centerY: 329,
    path: createDistrictPath(24.5965, 88.2775, 0.26, 0.26, 0.8),
    upazilasCount: 5,
    areaKm2: 1702
  },
  {
    id: 'dist-joypurhat',
    divisionId: 'div-rajshahi',
    nameBn: 'জয়পুরহাট',
    nameEn: 'Joypurhat',
    code: 'JOY',
    centerX: 186,
    centerY: 258,
    path: createDistrictPath(25.0968, 89.0227, 0.18, 0.18, 0.2),
    upazilasCount: 5,
    areaKm2: 965
  },

  // ==========================================
  // 4. KHULNA DIVISION (10 Districts)
  // ==========================================
  {
    id: 'dist-khulna',
    divisionId: 'div-khulna',
    nameBn: 'খুলনা',
    nameEn: 'Khulna',
    code: 'KHL',
    centerX: 259,
    centerY: 580,
    path: createDistrictPath(22.8456, 89.5403, 0.40, 0.35, 0.3),
    upazilasCount: 9,
    areaKm2: 4394
  },
  {
    id: 'dist-jashore',
    divisionId: 'div-khulna',
    nameBn: 'যশোর',
    nameEn: 'Jashore',
    code: 'JAS',
    centerX: 213,
    centerY: 534,
    path: createDistrictPath(23.1664, 89.2182, 0.28, 0.28, 0.5),
    upazilasCount: 8,
    areaKm2: 2606
  },
  {
    id: 'dist-satkhira',
    divisionId: 'div-khulna',
    nameBn: 'সাতক্ষীরা',
    nameEn: 'Satkhira',
    code: 'SAT',
    centerX: 192,
    centerY: 598,
    path: createDistrictPath(22.7185, 89.0705, 0.42, 0.32, 0.7),
    upazilasCount: 7,
    areaKm2: 3858
  },
  {
    id: 'dist-kushtia',
    divisionId: 'div-khulna',
    nameBn: 'কুষ্টিয়া',
    nameEn: 'Kushtia',
    code: 'KUS',
    centerX: 200,
    centerY: 428,
    path: createDistrictPath(23.9013, 89.1205, 0.24, 0.24, 0.1),
    upazilasCount: 6,
    areaKm2: 1601
  },
  {
    id: 'dist-jhenaidah',
    divisionId: 'div-khulna',
    nameBn: 'ঝিনাইদহ',
    nameEn: 'Jhenaidah',
    code: 'JHE',
    centerX: 204,
    centerY: 480,
    path: createDistrictPath(23.5448, 89.1539, 0.24, 0.24, 0.4),
    upazilasCount: 6,
    areaKm2: 1961
  },
  {
    id: 'dist-chuadanga',
    divisionId: 'div-khulna',
    nameBn: 'চুয়াডাঙ্গা',
    nameEn: 'Chuadanga',
    code: 'CHU',
    centerX: 160,
    centerY: 466,
    path: createDistrictPath(23.6402, 88.8418, 0.20, 0.20, 0.6),
    upazilasCount: 4,
    areaKm2: 1172
  },
  {
    id: 'dist-meherpur',
    divisionId: 'div-khulna',
    nameBn: 'মেহেরপুর',
    nameEn: 'Meherpur',
    code: 'MEH',
    centerX: 130,
    centerY: 449,
    path: createDistrictPath(23.7622, 88.6318, 0.16, 0.16, 0.8),
    upazilasCount: 3,
    areaKm2: 716
  },
  {
    id: 'dist-bagerhat',
    divisionId: 'div-khulna',
    nameBn: 'বাগেরহাট',
    nameEn: 'Bagerhat',
    code: 'BAG',
    centerX: 295,
    centerY: 607,
    path: createDistrictPath(22.6516, 89.7859, 0.38, 0.30, 0.2),
    upazilasCount: 9,
    areaKm2: 3959
  },
  {
    id: 'dist-magura',
    divisionId: 'div-khulna',
    nameBn: 'মাগুরা',
    nameEn: 'Magura',
    code: 'MAG',
    centerX: 242,
    centerY: 488,
    path: createDistrictPath(23.4873, 89.4199, 0.20, 0.20, 0.5),
    upazilasCount: 4,
    areaKm2: 1049
  },
  {
    id: 'dist-narail',
    divisionId: 'div-khulna',
    nameBn: 'নড়াইল',
    nameEn: 'Narail',
    code: 'NRL',
    centerX: 255,
    centerY: 533,
    path: createDistrictPath(23.1725, 89.5127, 0.18, 0.18, 0.9),
    upazilasCount: 3,
    areaKm2: 990
  },

  // ==========================================
  // 5. BARISHAL DIVISION (6 Districts)
  // ==========================================
  {
    id: 'dist-barishal',
    divisionId: 'div-barishal',
    nameBn: 'বরিশাল',
    nameEn: 'Barishal',
    code: 'BAR',
    centerX: 375,
    centerY: 600,
    path: createDistrictPath(22.7010, 90.3535, 0.30, 0.26, 0.4),
    upazilasCount: 10,
    areaKm2: 2784
  },
  {
    id: 'dist-patuakhali',
    divisionId: 'div-barishal',
    nameBn: 'পটুয়াখালী',
    nameEn: 'Patuakhali',
    code: 'PAT',
    centerX: 372,
    centerY: 649,
    path: createDistrictPath(22.3596, 90.3299, 0.32, 0.28, 0.2),
    upazilasCount: 8,
    areaKm2: 3221
  },
  {
    id: 'dist-bhola',
    divisionId: 'div-barishal',
    nameBn: 'ভোলা',
    nameEn: 'Bhola',
    code: 'BHO',
    centerX: 417,
    centerY: 602,
    path: createDistrictPath(22.6859, 90.6481, 0.38, 0.20, 0.8), // Long island shape
    upazilasCount: 7,
    areaKm2: 3403
  },
  {
    id: 'dist-pirojpur',
    divisionId: 'div-barishal',
    nameBn: 'পিরোজপুর',
    nameEn: 'Pirojpur',
    code: 'PIR',
    centerX: 321,
    centerY: 617,
    path: createDistrictPath(22.5841, 89.9720, 0.22, 0.20, 0.3),
    upazilasCount: 7,
    areaKm2: 1308
  },
  {
    id: 'dist-barguna',
    divisionId: 'div-barishal',
    nameBn: 'বরগুনা',
    nameEn: 'Barguna',
    code: 'BRG',
    centerX: 336,
    centerY: 686,
    path: createDistrictPath(22.0953, 90.0772, 0.26, 0.24, 0.5),
    upazilasCount: 6,
    areaKm2: 1831
  },
  {
    id: 'dist-jhalakathi',
    divisionId: 'div-barishal',
    nameBn: 'ঝালকাঠি',
    nameEn: 'Jhalakathi',
    code: 'JHA',
    centerX: 353,
    centerY: 609,
    path: createDistrictPath(22.6406, 90.1987, 0.16, 0.16, 0.1),
    upazilasCount: 4,
    areaKm2: 758
  },

  // ==========================================
  // 6. SYLHET DIVISION (4 Districts)
  // ==========================================
  {
    id: 'dist-sylhet',
    divisionId: 'div-sylhet',
    nameBn: 'সিলেট',
    nameEn: 'Sylhet',
    code: 'SYL',
    centerX: 591,
    centerY: 287,
    path: createDistrictPath(24.8949, 91.8687, 0.35, 0.32, 0.5),
    upazilasCount: 13,
    areaKm2: 3490
  },
  {
    id: 'dist-moulvibazar',
    divisionId: 'div-sylhet',
    nameBn: 'মৌলভীবাজার',
    nameEn: 'Moulvibazar',
    code: 'MOU',
    centerX: 578,
    centerY: 345,
    path: createDistrictPath(24.4829, 91.7774, 0.30, 0.28, 0.2),
    upazilasCount: 7,
    areaKm2: 2799
  },
  {
    id: 'dist-habiganj',
    divisionId: 'div-sylhet',
    nameBn: 'হবিগঞ্জ',
    nameEn: 'Habiganj',
    code: 'HAB',
    centerX: 527,
    centerY: 361,
    path: createDistrictPath(24.3749, 91.4155, 0.30, 0.26, 0.7),
    upazilasCount: 9,
    areaKm2: 2637
  },
  {
    id: 'dist-sunamganj',
    divisionId: 'div-sylhet',
    nameBn: 'সুনামগঞ্জ',
    nameEn: 'Sunamganj',
    code: 'SUN',
    centerX: 524,
    centerY: 262,
    path: createDistrictPath(25.0658, 91.3950, 0.35, 0.32, 0.4),
    upazilasCount: 12,
    areaKm2: 3670
  },

  // ==========================================
  // 7. RANGPUR DIVISION (8 Districts)
  // ==========================================
  {
    id: 'dist-rangpur',
    divisionId: 'div-rangpur',
    nameBn: 'রংপুর',
    nameEn: 'Rangpur',
    code: 'RP',
    centerX: 222,
    centerY: 165,
    path: createDistrictPath(25.7439, 89.2752, 0.26, 0.26, 0.3),
    upazilasCount: 8,
    areaKm2: 2307
  },
  {
    id: 'dist-dinajpur',
    divisionId: 'div-rangpur',
    nameBn: 'দিনাজপুর',
    nameEn: 'Dinajpur',
    code: 'DIN',
    centerX: 131,
    centerY: 182,
    path: createDistrictPath(25.6217, 88.6355, 0.35, 0.30, 0.6),
    upazilasCount: 13,
    areaKm2: 3437
  },
  {
    id: 'dist-kurigram',
    divisionId: 'div-rangpur',
    nameBn: 'কুড়িগ্রাম',
    nameEn: 'Kurigram',
    code: 'KUR',
    centerX: 273,
    centerY: 156,
    path: createDistrictPath(25.8054, 89.6362, 0.28, 0.26, 0.8),
    upazilasCount: 9,
    areaKm2: 2296
  },
  {
    id: 'dist-gaibandha',
    divisionId: 'div-rangpur',
    nameBn: 'গাইবান্ধা',
    nameEn: 'Gaibandha',
    code: 'GAI',
    centerX: 260,
    centerY: 224,
    path: createDistrictPath(25.3288, 89.5408, 0.26, 0.24, 0.1),
    upazilasCount: 7,
    areaKm2: 2179
  },
  {
    id: 'dist-nilphamari',
    divisionId: 'div-rangpur',
    nameBn: 'নীলফামারী',
    nameEn: 'Nilphamari',
    code: 'NIL',
    centerX: 162,
    centerY: 138,
    path: createDistrictPath(25.9318, 88.8560, 0.22, 0.22, 0.4),
    upazilasCount: 6,
    areaKm2: 1581
  },
  {
    id: 'dist-panchagarh',
    divisionId: 'div-rangpur',
    nameBn: 'পঞ্চগড়',
    nameEn: 'Panchagarh',
    code: 'PAN',
    centerX: 119,
    centerY: 80,
    path: createDistrictPath(26.3411, 88.5541, 0.24, 0.22, 0.2),
    upazilasCount: 5,
    areaKm2: 1405
  },
  {
    id: 'dist-thakurgaon',
    divisionId: 'div-rangpur',
    nameBn: 'ঠাকুরগাঁও',
    nameEn: 'Thakurgaon',
    code: 'THA',
    centerX: 106,
    centerY: 124,
    path: createDistrictPath(26.0337, 88.4617, 0.24, 0.22, 0.5),
    upazilasCount: 5,
    areaKm2: 1810
  },
  {
    id: 'dist-lalmonirhat',
    divisionId: 'div-rangpur',
    nameBn: 'লালমনিরহাট',
    nameEn: 'Lalmonirhat',
    code: 'LAL',
    centerX: 223,
    centerY: 129,
    path: createDistrictPath(25.9923, 89.2847, 0.22, 0.18, 0.7),
    upazilasCount: 5,
    areaKm2: 1241
  },

  // ==========================================
  // 8. MYMENSINGH DIVISION (4 Districts)
  // ==========================================
  {
    id: 'dist-mymensingh',
    divisionId: 'div-mymensingh',
    nameBn: 'ময়মনসিংহ',
    nameEn: 'Mymensingh',
    code: 'MYM',
    centerX: 385,
    centerY: 307,
    path: createDistrictPath(24.7471, 90.4203, 0.35, 0.32, 0.3),
    upazilasCount: 13,
    areaKm2: 4363
  },
  {
    id: 'dist-jamalpur',
    divisionId: 'div-mymensingh',
    nameBn: 'জামালপুর',
    nameEn: 'Jamalpur',
    code: 'JAM',
    centerX: 316,
    centerY: 280,
    path: createDistrictPath(24.9375, 89.9377, 0.28, 0.26, 0.6),
    upazilasCount: 7,
    areaKm2: 2031
  },
  {
    id: 'dist-netrokona',
    divisionId: 'div-mymensingh',
    nameBn: 'নেত্রকোণা',
    nameEn: 'Netrokona',
    code: 'NET',
    centerX: 429,
    centerY: 289,
    path: createDistrictPath(24.8709, 90.7279, 0.30, 0.28, 0.4),
    upazilasCount: 10,
    areaKm2: 2810
  },
  {
    id: 'dist-sherpur',
    divisionId: 'div-mymensingh',
    nameBn: 'শেরপুর',
    nameEn: 'Sherpur',
    code: 'SHE',
    centerX: 327,
    centerY: 268,
    path: createDistrictPath(25.0205, 90.0153, 0.20, 0.20, 0.2),
    upazilasCount: 5,
    areaKm2: 1363
  }
];

// Map all 64 districts with their authentic BBS boundaries and centroids
export const BANGLADESH_64_DISTRICTS_VECTORS: DistrictVector[] = RAW_BANGLADESH_64_DISTRICTS.map((d) => {
  const realPath = (officialBoundaries.districts as Record<string, string>)[d.id];
  const realCentroid = (officialBoundaries.districtCentroids as Record<string, number[]>)[d.id];
  return {
    ...d,
    path: realPath || d.path,
    centerX: realCentroid ? realCentroid[0] : d.centerX,
    centerY: realCentroid ? realCentroid[1] : d.centerY
  };
});
