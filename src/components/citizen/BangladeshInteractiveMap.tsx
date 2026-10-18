/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Bangladesh Integrated Land Services Portal (BILSP)
 * Recreated Interactive Bangladesh Map:
 * Level 1: Original Bangladesh Map shape divided into 8 Divisions with prominent division borders.
 * Level 2: Division View showing all districts separated from one another by district borders.
 * Level 3: District View showing all Upazilas that the district has.
 * + Huge Cadastral Survey Data (CS, SA, RS, BS) covering full Bangladesh map.
 */

import React, { useEffect, useRef, useState, useMemo } from 'react';
import L from 'leaflet';
import { useLanguage } from '../../context/LanguageContext';
import {
  BANGLADESH_BORDER_COORDINATES,
  WORLD_MASK_POLYGON,
  DIVISIONS,
  DISTRICTS,
  UPAZILAS,
  DEMO_PARCELS,
  ALL_BANGLADESH_LAND_OFFICES
} from '../../data/geoData';
import {
  BANGLADESH_64_DISTRICTS_VECTORS,
  DistrictVector,
  BANGLADESH_DIVISIONS_CONFIG,
  DivisionConfig
} from '../../data/districtVectorsData';
import {
  COMPREHENSIVE_CADASTRAL_DAGS,
  getNationwideCadastralDags
} from '../../data/cadastralDagsData';
import {
  Division,
  District,
  Upazila,
  DemoParcel,
  CadastralDagRecord
} from '../../types/authAndGeo';
import {
  Compass,
  Layers,
  ChevronRight,
  RotateCcw,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  FileText,
  Search,
  ExternalLink,
  Building2,
  MapPin,
  Phone,
  Filter,
  Eye,
  Crosshair,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Info,
  Map as MapIcon,
  Check,
  Tag,
  ZoomIn,
  ZoomOut,
  Landmark,
  FileCheck,
  AlertCircle
} from 'lucide-react';

interface BangladeshInteractiveMapProps {
  onSelectParcel?: (parcel: DemoParcel) => void;
  onNavigateToService?: (slug: string) => void;
}

type MapMode = 'interactive-drilldown' | 'osm-cutout' | 'dag-hub';
type DrillLevel = 'divisions' | 'districts' | 'upazilas';
type TileProvider = 'osm' | 'satellite' | 'topo';

const BD_BOUNDS: [[number, number], [number, number]] = [
  [20.3, 87.8],
  [26.85, 92.95]
];

const BD_INITIAL_VIEW_BOUNDS: [[number, number], [number, number]] = [
  [20.6, 88.0],
  [26.65, 92.7]
];

export const BangladeshInteractiveMap: React.FC<BangladeshInteractiveMapProps> = ({
  onSelectParcel,
  onNavigateToService
}) => {
  const { language, toBnNum } = useLanguage();

  // Mode Selection: Drill-Down Vector Map (Default) vs OSM Cutout vs Dag Hub
  const [mapMode, setMapMode] = useState<MapMode>('interactive-drilldown');

  // Multi-Level Drilldown State
  const [drillLevel, setDrillLevel] = useState<DrillLevel>('divisions');
  const [selectedDivisionId, setSelectedDivisionId] = useState<string>('div-dhaka');
  const [selectedDistrictId, setSelectedDistrictId] = useState<string>('dist-dhaka');
  const [selectedUpazilaId, setSelectedUpazilaId] = useState<string>('upz-ramna');

  // Hover states
  const [hoveredDivisionId, setHoveredDivisionId] = useState<string | null>(null);
  const [hoveredDistrictId, setHoveredDistrictId] = useState<string | null>(null);

  // View Options
  const [showDivisionColors, setShowDivisionColors] = useState<boolean>(true);
  const [showDistrictLabels, setShowDistrictLabels] = useState<boolean>(true);
  const [divisionZoomMode, setDivisionZoomMode] = useState<'focused' | 'national'>('national');

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [dagSearchQuery, setDagSearchQuery] = useState<string>('');
  const [surveyTypeFilter, setSurveyTypeFilter] = useState<'ALL' | 'CS' | 'SA' | 'RS' | 'BS'>('ALL');

  // Selected Dag record for inspector
  const [selectedDag, setSelectedDag] = useState<CadastralDagRecord | null>(COMPREHENSIVE_CADASTRAL_DAGS[0]);

  // Leaflet Refs for OSM Cutout Mode
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const [tileProvider, setTileProvider] = useState<TileProvider>('osm');

  // Current active entities
  const currentDivisionConfig = useMemo(() => {
    return BANGLADESH_DIVISIONS_CONFIG.find((d) => d.id === selectedDivisionId) || BANGLADESH_DIVISIONS_CONFIG[4];
  }, [selectedDivisionId]);

  const currentDistrict = useMemo(() => {
    return DISTRICTS.find((d) => d.id === selectedDistrictId) || DISTRICTS[0];
  }, [selectedDistrictId]);

  const currentDistrictVector = useMemo(() => {
    return BANGLADESH_64_DISTRICTS_VECTORS.find((d) => d.id === selectedDistrictId) || BANGLADESH_64_DISTRICTS_VECTORS[0];
  }, [selectedDistrictId]);

  // Districts for current selected division
  const currentDivisionDistricts = useMemo(() => {
    return BANGLADESH_64_DISTRICTS_VECTORS.filter((d) => d.divisionId === selectedDivisionId);
  }, [selectedDivisionId]);

  // Upazilas for current selected district
  const currentDistrictUpazilas = useMemo(() => {
    return UPAZILAS.filter((u) => u.districtId === selectedDistrictId);
  }, [selectedDistrictId]);

  const currentUpazila = useMemo(() => {
    return currentDistrictUpazilas.find((u) => u.id === selectedUpazilaId) || currentDistrictUpazilas[0] || null;
  }, [currentDistrictUpazilas, selectedUpazilaId]);

  // Cadastral Dags dataset covering the selected district & upazila
  const currentCadastralDags = useMemo(() => {
    return getNationwideCadastralDags(
      selectedDistrictId,
      selectedUpazilaId,
      currentDistrict?.nameBn,
      currentUpazila?.nameBn,
      selectedDivisionId
    );
  }, [selectedDistrictId, selectedUpazilaId, currentDistrict, currentUpazila, selectedDivisionId]);

  // Filtered Dags by search and survey type
  const filteredDags = useMemo(() => {
    return currentCadastralDags.filter((dag) => {
      if (surveyTypeFilter === 'CS' && !dag.csKhatianNo) return false;
      if (surveyTypeFilter === 'SA' && !dag.saKhatianNo) return false;
      if (surveyTypeFilter === 'RS' && !dag.rsKhatianNo) return false;

      if (!dagSearchQuery.trim()) return true;
      const q = dagSearchQuery.trim().toLowerCase();
      return (
        dag.dagNo.includes(q) ||
        dag.mouzaNameBn.includes(q) ||
        dag.mouzaJlNo.includes(q) ||
        (dag.csRecordedOwnerBn && dag.csRecordedOwnerBn.toLowerCase().includes(q)) ||
        (dag.saRecordedOwnerBn && dag.saRecordedOwnerBn.toLowerCase().includes(q)) ||
        (dag.rsRecordedOwnerBn && dag.rsRecordedOwnerBn.toLowerCase().includes(q)) ||
        (dag.csKhatianNo && dag.csKhatianNo.includes(q)) ||
        (dag.saKhatianNo && dag.saKhatianNo.includes(q)) ||
        (dag.rsKhatianNo && dag.rsKhatianNo.includes(q))
      );
    });
  }, [currentCadastralDags, dagSearchQuery, surveyTypeFilter]);

  // 1. Initialize Leaflet Map when switching to osm-cutout mode
  useEffect(() => {
    if (mapMode !== 'osm-cutout') return;
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) return;

    const map = L.map(mapContainerRef.current, {
      center: [23.75, 90.35],
      zoom: 7,
      minZoom: 6.8,
      maxZoom: 19,
      maxBounds: BD_BOUNDS,
      maxBoundsViscosity: 1.0,
      zoomControl: false
    });

    L.control.zoom({ position: 'topright' }).addTo(map);

    const tileUrls: Record<TileProvider, { url: string; attribution: string }> = {
      osm: {
        url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
        attribution: '&copy; OpenStreetMap | BILSP Geoportal'
      },
      satellite: {
        url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        attribution: 'Tiles &copy; Esri, Maxar | BILSP Geoportal'
      },
      topo: {
        url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
        attribution: '&copy; OpenStreetMap | OpenTopoMap'
      }
    };

    L.tileLayer(tileUrls[tileProvider].url, {
      attribution: tileUrls[tileProvider].attribution,
      maxZoom: 19,
      bounds: BD_BOUNDS
    }).addTo(map);

    const maskGroup = L.layerGroup().addTo(map);
    const officeGroup = L.layerGroup().addTo(map);

    mapInstanceRef.current = map;
    map.fitBounds(BD_INITIAL_VIEW_BOUNDS);

    // Apply World Cutout Mask
    L.polygon(WORLD_MASK_POLYGON as L.LatLngExpression[][], {
      color: '#006a4e',
      weight: 1.5,
      fillColor: '#090d16',
      fillOpacity: 0.96,
      interactive: false
    }).addTo(maskGroup);

    L.polygon(BANGLADESH_BORDER_COORDINATES as L.LatLngExpression[], {
      color: '#10b981',
      weight: 3.5,
      fillColor: 'transparent',
      fillOpacity: 0,
      opacity: 0.95,
      interactive: false
    }).addTo(maskGroup);

    // Render Land Offices
    ALL_BANGLADESH_LAND_OFFICES.forEach((office) => {
      const isAC = office.officeType === 'AC_LAND';
      const bg = isAC ? 'bg-[#006a4e]' : 'bg-indigo-700';
      const pin = L.divIcon({
        className: 'office-pin',
        html: `
          <div class="cursor-pointer transform -translate-x-1/2 -translate-y-1/2">
            <div class="flex items-center gap-1 px-2 py-0.5 rounded-lg ${bg} text-white shadow-lg border border-white text-[9px] font-bold">
              <span>${office.officeType === 'AC_LAND' ? 'এসি ল্যান্ড' : 'সাব-রেজিস্ট্রি'}</span>
            </div>
          </div>
        `,
        iconSize: [0, 0]
      });
      L.marker([office.lat, office.lng], { icon: pin })
        .bindTooltip(`<strong>${office.nameBn}</strong><br/>${office.addressBn}`)
        .addTo(officeGroup);
    });

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, [mapMode, tileProvider]);

  // Handler for clicking a Division (Level 1 ➔ Level 2)
  const handleDivisionClick = (divId: string) => {
    setSelectedDivisionId(divId);
    setDrillLevel('districts');

    // Default select first district of this division
    const divDistricts = BANGLADESH_64_DISTRICTS_VECTORS.filter((d) => d.divisionId === divId);
    if (divDistricts.length > 0) {
      setSelectedDistrictId(divDistricts[0].id);
      const distUpz = UPAZILAS.filter((u) => u.districtId === divDistricts[0].id);
      if (distUpz.length > 0) setSelectedUpazilaId(distUpz[0].id);
    }
  };

  // Handler for clicking a District (Level 2 ➔ Level 3)
  const handleDistrictClick = (distId: string) => {
    setSelectedDistrictId(distId);
    const foundDist = DISTRICTS.find((d) => d.id === distId);
    if (foundDist) {
      setSelectedDivisionId(foundDist.divisionId);
    }

    const distUpz = UPAZILAS.filter((u) => u.districtId === distId);
    if (distUpz.length > 0) {
      setSelectedUpazilaId(distUpz[0].id);
    }

    setDrillLevel('upazilas');

    // Update selected dag
    const dags = getNationwideCadastralDags(distId, distUpz[0]?.id, foundDist?.nameBn, distUpz[0]?.nameBn, foundDist?.divisionId);
    if (dags.length > 0) setSelectedDag(dags[0]);
  };

  // Handler for clicking an Upazila in Level 3
  const handleUpazilaClick = (upzId: string) => {
    setSelectedUpazilaId(upzId);
    const upz = UPAZILAS.find((u) => u.id === upzId);
    const dags = getNationwideCadastralDags(selectedDistrictId, upzId, currentDistrict?.nameBn, upz?.nameBn, selectedDivisionId);
    if (dags.length > 0) setSelectedDag(dags[0]);
  };

  // Reset to Level 1 (All 8 Divisions)
  const handleResetToDivisions = () => {
    setDrillLevel('divisions');
  };

  // Return to Level 2 (Districts)
  const handleBackToDistricts = () => {
    setDrillLevel('districts');
  };

  // Search input handler (Omni-search for Divisions, Districts, Upazilas, Dags)
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    const q = searchQuery.toLowerCase().trim();

    // 1. Check Division
    const foundDiv = BANGLADESH_DIVISIONS_CONFIG.find(
      (d) => d.nameBn.includes(q) || d.nameEn.toLowerCase().includes(q) || d.code.toLowerCase() === q
    );
    if (foundDiv) {
      handleDivisionClick(foundDiv.id);
      setSearchQuery('');
      return;
    }

    // 2. Check District
    const foundDist = DISTRICTS.find(
      (d) => d.nameBn.includes(q) || d.nameEn.toLowerCase().includes(q) || d.code.toLowerCase() === q
    );
    if (foundDist) {
      handleDistrictClick(foundDist.id);
      setSearchQuery('');
      return;
    }

    // 3. Check Upazila
    const foundUpz = UPAZILAS.find(
      (u) => u.nameBn.includes(q) || u.nameEn.toLowerCase().includes(q)
    );
    if (foundUpz) {
      const parentDist = DISTRICTS.find((d) => d.id === foundUpz.districtId);
      if (parentDist) {
        setSelectedDivisionId(parentDist.divisionId);
        setSelectedDistrictId(parentDist.id);
        setSelectedUpazilaId(foundUpz.id);
        setDrillLevel('upazilas');
      }
      setSearchQuery('');
      return;
    }

    // 4. Check Dag
    setDagSearchQuery(q);
    setMapMode('dag-hub');
    setSearchQuery('');
  };

  // Determine active SVG viewBox based on drill level and zoom toggle
  const activeSvgViewBox = useMemo(() => {
    if (drillLevel === 'districts' && divisionZoomMode === 'focused') {
      return currentDivisionConfig.viewBox;
    }
    return '0 0 750 950';
  }, [drillLevel, divisionZoomMode, currentDivisionConfig]);

  return (
    <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm flex flex-col xl:flex-row">
      {/* Main Map Presentation Area */}
      <div className="flex-1 flex flex-col min-h-[640px] lg:min-h-[740px] relative bg-white">
        {/* Top Control Bar: Modes, Breadcrumbs, Divisions & Search */}
        <div className="p-3 sm:p-4 bg-white/95 backdrop-blur-md border-b border-slate-200 z-10 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            {/* Primary Mode Tabs */}
            <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-100 border border-slate-200 text-xs font-bold">
              <button
                type="button"
                onClick={() => setMapMode('interactive-drilldown')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                  mapMode === 'interactive-drilldown'
                    ? 'bg-white text-slate-900 shadow-2xs font-extrabold ring-1 ring-slate-200'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="আসল বাংলাদেশ মানচিত্র: ৮ বিভাগ ➔ ৬৪ জেলা ➔ উপজেলা ড্রিল-ডাউন"
              >
                <MapIcon className="w-3.5 h-3.5 text-[#006a4e]" />
                <span>{language === 'bn' ? 'ইন্টারেক্টিভ ড্রিল-ডাউন মানচিত্র' : 'Interactive Drill-Down Map'}</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              </button>

              <button
                type="button"
                onClick={() => setMapMode('osm-cutout')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                  mapMode === 'osm-cutout'
                    ? 'bg-white text-slate-900 shadow-2xs font-extrabold ring-1 ring-slate-200'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="ওপেনস্ট্রিটম্যাপ ও স্যাটেলাইট কাট-আউট ভিউ"
              >
                <Compass className="w-3.5 h-3.5 text-blue-600" />
                <span>{language === 'bn' ? 'ওএসএম কাট-আউট' : 'OSM Cutout'}</span>
              </button>

              <button
                type="button"
                onClick={() => setMapMode('dag-hub')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                  mapMode === 'dag-hub'
                    ? 'bg-white text-slate-900 shadow-2xs font-extrabold ring-1 ring-slate-200'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="ক্যাডাস্ট্রাল দাগ ও সিএস/এসএ/আরএস খতিয়ান অনুসন্ধান"
              >
                <FileText className="w-3.5 h-3.5 text-amber-600" />
                <span>{language === 'bn' ? 'দাগ ও খতিয়ান মহাফেজখানা' : 'CS/SA/RS Dag Hub'}</span>
                <span className="text-[10px] bg-amber-100 text-amber-900 px-1.5 rounded-full font-mono">
                  {toBnNum(COMPREHENSIVE_CADASTRAL_DAGS.length)}+
                </span>
              </button>
            </div>

            {/* Reset View Button */}
            <button
              type="button"
              onClick={handleResetToDivisions}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
              title="সমগ্র বাংলাদেশ ৮ বিভাগীয় ভিউ রিসেট করুন"
            >
              <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
              <span>{language === 'bn' ? 'জাতীয় ভিউ রিসেট' : 'National Reset'}</span>
            </button>
          </div>

          {/* Quick Breadcrumbs Navigation Bar (Showing exact Level) */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-slate-100">
            <div className="flex items-center gap-1 text-xs font-bold overflow-x-auto py-1">
              {/* Level 1 Breadcrumb */}
              <button
                type="button"
                onClick={handleResetToDivisions}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                  drillLevel === 'divisions'
                    ? 'bg-[#006a4e] text-white shadow-2xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <span>🇧🇩 {language === 'bn' ? 'সমগ্র বাংলাদেশ (৮ বিভাগ)' : 'Bangladesh (8 Divisions)'}</span>
              </button>

              {/* Level 2 Breadcrumb */}
              {(drillLevel === 'districts' || drillLevel === 'upazilas') && (
                <>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <button
                    type="button"
                    onClick={handleBackToDistricts}
                    className={`flex items-center gap-1 px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                      drillLevel === 'districts'
                        ? 'bg-indigo-700 text-white shadow-2xs'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    <Building2 className="w-3 h-3" />
                    <span>{currentDivisionConfig.nameBn} ({toBnNum(currentDivisionConfig.districtsCount)} {language === 'bn' ? 'জেলা' : 'Districts'})</span>
                  </button>
                </>
              )}

              {/* Level 3 Breadcrumb */}
              {drillLevel === 'upazilas' && (
                <>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-red-600 text-white font-extrabold shadow-2xs">
                    <MapPin className="w-3 h-3" />
                    <span>{currentDistrict.nameBn} জেলা ({toBnNum(currentDistrictUpazilas.length)} {language === 'bn' ? 'উপজেলা' : 'Upazilas'})</span>
                  </div>
                </>
              )}
            </div>

            {/* Back Button for Navigation */}
            {drillLevel === 'upazilas' ? (
              <button
                type="button"
                onClick={handleBackToDistricts}
                className="flex items-center gap-1 text-xs text-indigo-700 font-bold hover:underline cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>{language === 'bn' ? `← ${currentDivisionConfig.nameBn}র জেলাসমূহে ফিরে যান` : '← Back to Districts'}</span>
              </button>
            ) : drillLevel === 'districts' ? (
              <button
                type="button"
                onClick={handleResetToDivisions}
                className="flex items-center gap-1 text-xs text-[#006a4e] font-bold hover:underline cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>{language === 'bn' ? '← ৮ বিভাগীয় মানচিত্রে ফিরে যান' : '← Back to 8 Divisions'}</span>
              </button>
            ) : null}
          </div>

          {/* Quick Search & Division Buttons */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
            <form onSubmit={handleSearchSubmit} className="relative flex-1 min-w-[240px] max-w-md">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={
                  language === 'bn'
                    ? 'বিভাগ, ৬৪ জেলা, উপজেলা বা দাগ খুঁজুন (যেমন: ঢাকা, বগুড়া, রমনা, দাগ ১২০৪)...'
                    : 'Search Division, 64 Districts, Upazila or Dag...'
                }
                className="w-full pl-9 pr-20 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#006a4e] focus:bg-white transition-all"
              />
              <button
                type="submit"
                className="absolute right-1.5 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-lg bg-[#006a4e] text-white text-[10px] font-bold hover:bg-emerald-800 transition-colors cursor-pointer"
              >
                {language === 'bn' ? 'খুঁজুন' : 'Search'}
              </button>
            </form>

            {/* Drilldown Display Controls */}
            {mapMode === 'interactive-drilldown' && (
              <div className="flex items-center gap-2 text-xs">
                {drillLevel === 'districts' && (
                  <button
                    type="button"
                    onClick={() => setDivisionZoomMode(divisionZoomMode === 'focused' ? 'national' : 'focused')}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-lg font-bold border border-indigo-200 bg-indigo-50 text-indigo-700 cursor-pointer transition-colors"
                  >
                    <ZoomIn className="w-3 h-3" />
                    <span>
                      {divisionZoomMode === 'focused'
                        ? language === 'bn' ? 'জাতীয় প্রেক্ষাপট' : 'National View'
                        : language === 'bn' ? 'বিভাগীয় ফোকাস ভিউ' : 'Division Zoom'}
                    </span>
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setShowDistrictLabels(!showDistrictLabels)}
                  className={`px-2.5 py-1 rounded-lg font-bold border transition-colors cursor-pointer ${
                    showDistrictLabels
                      ? 'bg-emerald-50 text-[#006a4e] border-emerald-300'
                      : 'bg-white text-slate-500 border-slate-200'
                  }`}
                >
                  {language === 'bn' ? 'লেবেল প্রদর্শন' : 'Labels'}
                </button>
              </div>
            )}
          </div>

          {/* 8 Divisions Horizontal Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider shrink-0 flex items-center gap-1">
              <Layers className="w-3 h-3 text-[#006a4e]" />
              {language === 'bn' ? '৮ বিভাগীয় ক্লাস্টার:' : 'Divisions:'}
            </span>
            {BANGLADESH_DIVISIONS_CONFIG.map((div) => {
              const isSelected = selectedDivisionId === div.id;
              return (
                <button
                  key={div.id}
                  type="button"
                  onClick={() => handleDivisionClick(div.id)}
                  className={`text-[11px] px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer shrink-0 border flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-[#006a4e] text-white border-[#006a4e] shadow-xs'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-emerald-50 hover:text-[#006a4e]'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: div.color }}></span>
                  <span>{language === 'bn' ? div.nameBn : div.nameEn}</span>
                  <span className="text-[9px] opacity-75 font-mono">
                    ({toBnNum(div.districtsCount)})
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 1. INTERACTIVE DRILL-DOWN VECTOR MAP (AUTHENTIC BANGLADESH SHAPE) */}
        {mapMode === 'interactive-drilldown' && (
          <div className="flex-1 w-full flex flex-col items-center justify-center p-2 sm:p-4 bg-white overflow-hidden relative">
            {/* Top Prompt Banner describing the current level action */}
            <div className="w-full flex items-center justify-between px-4 py-2 mb-2 rounded-xl bg-slate-50 border border-slate-200 text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="font-bold text-slate-800">
                  {drillLevel === 'divisions' && (
                    language === 'bn'
                      ? 'ধাপ ১: সমগ্র বাংলাদেশ মানচিত্র — ৮টি প্রধান বিভাগে বিভক্ত। যেকোনো বিভাগে ক্লিক করে তার জেলাসমূহ দেখুন।'
                      : 'Level 1: National Bangladesh Map — Divided into 8 Divisions. Click any division to view districts.'
                  )}
                  {drillLevel === 'districts' && (
                    language === 'bn'
                      ? `ধাপ ২: ${currentDivisionConfig.nameBn}র জেলা মানচিত্র (${toBnNum(currentDivisionDistricts.length)}টি জেলা)। প্রতিটি জেলা সীমানা দ্বারা আলাদা। যেকোনো জেলায় ক্লিক করুন।`
                      : `Level 2: ${currentDivisionConfig.nameEn} District Map. Click any district to see its Upazilas.`
                  )}
                  {drillLevel === 'upazilas' && (
                    language === 'bn'
                      ? `ধাপ ৩: ${currentDistrict.nameBn} জেলা — আওতাধীন সকল উপজেলা ও ক্যাডাস্ট্রাল দাগ খতিয়ান নিচে দেখুন।`
                      : `Level 3: ${currentDistrict.nameEn} District — View all constituent Upazilas and CS/SA/RS Dags below.`
                  )}
                </span>
              </div>
              <span className="text-[11px] font-mono text-slate-500">
                {drillLevel === 'divisions' ? '৮ বিভাগ' : drillLevel === 'districts' ? `${toBnNum(currentDivisionDistricts.length)} জেলা` : `${toBnNum(currentDistrictUpazilas.length)} উপজেলা`}
              </span>
            </div>

            {/* SVG Vector Canvas styled with authentic Bangladesh silhouette */}
            <svg
              viewBox={activeSvgViewBox}
              className="w-full max-w-[700px] h-auto max-h-[640px] drop-shadow-sm select-none transition-all duration-300"
              style={{ filter: 'drop-shadow(0px 3px 10px rgba(0,0,0,0.07))' }}
            >
              {/* Defs for gradients & filters */}
              <defs>
                <filter id="activeGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#ef4444" floodOpacity="0.4" />
                </filter>
                <filter id="divisionGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="2" stdDeviation="5" floodColor="#006a4e" floodOpacity="0.45" />
                </filter>
              </defs>

              {/* ========================================================
                  LEVEL 1: RENDER 8 DIVISIONS ON FULL BANGLADESH MAP
                  ======================================================== */}
              {drillLevel === 'divisions' && (
                <g className="divisions-layer">
                  {/* Render Districts grouped by Division with distinct Division styling */}
                  {BANGLADESH_DIVISIONS_CONFIG.map((div) => {
                    const isHovered = hoveredDivisionId === div.id;
                    const isSelected = selectedDivisionId === div.id;
                    const divDistricts = BANGLADESH_64_DISTRICTS_VECTORS.filter((d) => d.divisionId === div.id);

                    return (
                      <g
                        key={div.id}
                        className="cursor-pointer transition-all"
                        onMouseEnter={() => setHoveredDivisionId(div.id)}
                        onMouseLeave={() => setHoveredDivisionId(null)}
                        onClick={() => handleDivisionClick(div.id)}
                      >
                        {/* District Paths belonging to this division */}
                        {divDistricts.map((dist) => (
                          <path
                            key={dist.id}
                            d={dist.path}
                            fill={isHovered ? div.color : div.color + 'dd'}
                            stroke={isHovered ? '#0f172a' : div.borderColor}
                            strokeWidth={isHovered ? 2.2 : 1.2}
                            strokeLinejoin="round"
                            strokeLinecap="round"
                            className="transition-colors duration-150"
                          />
                        ))}

                        {/* Division Prominent Center Label & District Count */}
                        <g transform={`translate(${div.centerX}, ${div.centerY})`} className="pointer-events-none select-none">
                          <rect
                            x="-68"
                            y="-24"
                            width="136"
                            height="48"
                            rx="12"
                            fill="#ffffff"
                            fillOpacity="0.95"
                            stroke={div.borderColor}
                            strokeWidth="2"
                            filter="url(#divisionGlow)"
                          />
                          <text
                            x="0"
                            y="-6"
                            textAnchor="middle"
                            dominantBaseline="central"
                            fill="#0f172a"
                            fontSize="14"
                            fontWeight="800"
                            fontFamily="'Hind Siliguri', 'Inter', sans-serif"
                          >
                            {div.nameBn}
                          </text>
                          <text
                            x="0"
                            y="11"
                            textAnchor="middle"
                            dominantBaseline="central"
                            fill="#475569"
                            fontSize="10"
                            fontWeight="700"
                            fontFamily="'Hind Siliguri', 'Inter', sans-serif"
                          >
                            {toBnNum(div.districtsCount)} {language === 'bn' ? 'টি জেলা' : 'Districts'} • {toBnNum(div.upazilasCount)} {language === 'bn' ? 'উপজেলা' : 'Upz'}
                          </text>
                        </g>
                      </g>
                    );
                  })}
                </g>
              )}

              {/* ========================================================
                  LEVEL 2: DIVISION VIEW — SHOW ALL DISTRICTS SEPARATED BY DISTRICT BORDERS
                  ======================================================== */}
              {(drillLevel === 'districts' || drillLevel === 'upazilas') && (
                <g className="division-districts-layer">
                  {/* Surrounding background districts (dimmed for focus) */}
                  {BANGLADESH_64_DISTRICTS_VECTORS.filter((d) => d.divisionId !== selectedDivisionId).map((dist) => (
                    <path
                      key={dist.id}
                      d={dist.path}
                      fill="#f1f5f9"
                      stroke="#cbd5e1"
                      strokeWidth="0.8"
                      strokeDasharray="2 2"
                      opacity="0.6"
                      onClick={() => handleDistrictClick(dist.id)}
                      className="cursor-pointer hover:opacity-90 transition-opacity"
                    />
                  ))}

                  {/* Active Division's Districts — Clearly separated by bold district borders! */}
                  {currentDivisionDistricts.map((dist) => {
                    const isSelected = selectedDistrictId === dist.id;
                    const isHovered = hoveredDistrictId === dist.id;

                    // District coloring: Reference image style has crisp fills with coral/red highlight on selection!
                    let fillColor = '#e2e8f0'; // Default clean administrative fill
                    if (isHovered) fillColor = '#cbd5e1';
                    if (isSelected) fillColor = '#ef4444'; // Red/coral highlight matching uploaded image!

                    const strokeColor = isSelected ? '#b91c1c' : '#334155'; // Bold distinct border
                    const strokeWidth = isSelected ? 3.0 : 1.8;

                    return (
                      <g
                        key={dist.id}
                        className="cursor-pointer transition-all"
                        onMouseEnter={() => setHoveredDistrictId(dist.id)}
                        onMouseLeave={() => setHoveredDistrictId(null)}
                        onClick={() => handleDistrictClick(dist.id)}
                      >
                        <path
                          d={dist.path}
                          fill={fillColor}
                          stroke={strokeColor}
                          strokeWidth={strokeWidth}
                          strokeLinejoin="round"
                          strokeLinecap="round"
                          filter={isSelected ? 'url(#activeGlow)' : undefined}
                          className="transition-colors duration-150"
                        />

                        {/* District Centroid Bengali Label & Upazila Count */}
                        {showDistrictLabels && (
                          <g transform={`translate(${dist.centerX}, ${dist.centerY})`} className="pointer-events-none select-none">
                            <text
                              x="0"
                              y={isSelected ? -6 : 0}
                              textAnchor="middle"
                              dominantBaseline="central"
                              fill={isSelected ? '#ffffff' : '#0f172a'}
                              fontSize={isSelected ? 13 : 11}
                              fontWeight={isSelected ? 800 : 700}
                              fontFamily="'Hind Siliguri', 'Inter', sans-serif"
                              style={{
                                textShadow: isSelected
                                  ? '0 1px 2px rgba(0,0,0,0.7)'
                                  : '0 0 3px rgba(255,255,255,0.95), 0 0 5px rgba(255,255,255,0.95)'
                              }}
                            >
                              {dist.nameBn}
                            </text>
                            {isSelected && (
                              <text
                                x="0"
                                y="8"
                                textAnchor="middle"
                                dominantBaseline="central"
                                fill="#ffffff"
                                fontSize="9"
                                fontWeight="700"
                                fontFamily="'Hind Siliguri', 'Inter', sans-serif"
                                style={{ textShadow: '0 1px 2px rgba(0,0,0,0.7)' }}
                              >
                                {toBnNum(dist.upazilasCount)} {language === 'bn' ? 'উপজেলা' : 'Upazilas'}
                              </text>
                            )}
                          </g>
                        )}
                      </g>
                    );
                  })}
                </g>
              )}
            </svg>

            {/* Bottom Floating Legend & Quick Jump Bar */}
            <div className="w-full flex flex-wrap items-center justify-between gap-3 p-3 mt-2 bg-slate-50/90 backdrop-blur-md rounded-2xl border border-slate-200 text-xs">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 font-bold text-slate-800">
                  <span className="w-3.5 h-3.5 rounded-sm bg-[#ef4444] border border-red-700"></span>
                  <span>{language === 'bn' ? 'নির্বাচিত জেলা' : 'Selected District'}</span>
                </div>
                <div className="flex items-center gap-1.5 font-medium text-slate-600">
                  <span className="w-3.5 h-3.5 rounded-sm bg-[#e2e8f0] border border-slate-600"></span>
                  <span>{language === 'bn' ? 'জেলা সীমানা বর্ডার' : 'District Border'}</span>
                </div>
              </div>

              {/* Action helper prompt */}
              <div className="text-[11px] font-semibold text-emerald-800 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                <span>
                  {drillLevel === 'divisions'
                    ? language === 'bn' ? 'বিভাগে ক্লিক করে জেলা সীমানা দেখুন ➔' : 'Click division to see district borders ➔'
                    : drillLevel === 'districts'
                    ? language === 'bn' ? 'জেলায় ক্লিক করে আওতাধীন উপজেলাসমূহ দেখুন ➔' : 'Click district to see all upazilas ➔'
                    : language === 'bn' ? 'নিচে উপজেলার সকল দাগ ও খতিয়ান প্রদর্শিত হচ্ছে' : 'All Upazila Dags shown below'}
                </span>
              </div>
            </div>

            {/* LEVEL 2 & 3: UPZILA & DISTRICT CARDS EXPANDER */}
            {drillLevel === 'upazilas' && currentDistrict && (
              <div className="w-full mt-4 p-4 rounded-2xl bg-gradient-to-br from-emerald-50/60 to-slate-50 border border-emerald-200 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-emerald-100 pb-2">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-[#006a4e]" />
                    <h4 className="font-extrabold text-slate-900 text-sm">
                      {currentDistrict.nameBn} জেলার আওতাধীন সকল উপজেলা ({toBnNum(currentDistrictUpazilas.length)}টি):
                    </h4>
                  </div>
                  <span className="text-[11px] text-slate-500 font-medium">
                    {language === 'bn' ? 'উপজেলায় ক্লিক করে দাগসমূহ ফিল্টার করুন' : 'Click upazila to filter dags'}
                  </span>
                </div>

                {/* Upazilas Interactive Badges Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
                  {currentDistrictUpazilas.map((upz) => {
                    const isSelected = selectedUpazilaId === upz.id;
                    return (
                      <button
                        key={upz.id}
                        type="button"
                        onClick={() => handleUpazilaClick(upz.id)}
                        className={`p-2.5 rounded-xl text-left border transition-all cursor-pointer space-y-1 ${
                          isSelected
                            ? 'bg-[#006a4e] text-white border-[#006a4e] shadow-xs ring-2 ring-emerald-300'
                            : 'bg-white hover:bg-slate-100 text-slate-800 border-slate-200'
                        }`}
                      >
                        <div className="font-bold text-xs truncate">{upz.nameBn}</div>
                        <div className={`text-[10px] flex items-center justify-between ${isSelected ? 'text-emerald-100' : 'text-slate-500'}`}>
                          <span>{toBnNum(upz.parcelsCount)} প্লট</span>
                          <span className="font-mono text-[9px]">{upz.code}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {/* 2. REAL OPENSTREETMAP & SATELLITE CUTOUT MAP */}
        {mapMode === 'osm-cutout' && (
          <div className="flex-1 w-full h-[540px] sm:h-[640px] relative bg-[#090d16]">
            <div ref={mapContainerRef} className="w-full h-full z-0" />
            <div className="absolute top-4 left-4 z-10 bg-slate-900/90 backdrop-blur-md text-white p-2.5 rounded-xl border border-slate-700 text-xs">
              <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" />
                <span>{language === 'bn' ? 'বাংলাদেশ ভূখণ্ড কাট-আউট (ওএসএম)' : 'BD Territory Cutout'}</span>
              </span>
            </div>
          </div>
        )}

        {/* 3. DEDICATED CS, SA, RS DAG & SURVEY HUB */}
        {(mapMode === 'dag-hub' || drillLevel === 'upazilas') && (
          <div className="w-full p-4 sm:p-5 border-t border-slate-200 bg-slate-50/50 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 bg-white border border-slate-200 p-4 rounded-2xl shadow-2xs">
              <div>
                <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                  <FileText className="w-5 h-5 text-amber-600" />
                  <span>
                    {currentDistrict.nameBn} জেলা {currentUpazila ? `➔ ${currentUpazila.nameBn}` : ''} ক্যাডাস্ট্রাল দাগ ও খতিয়ান
                  </span>
                </h3>
                <p className="text-xs text-slate-600 mt-1">
                  {language === 'bn'
                    ? 'সিএস (১৮৮৮-১৯৪০) ➔ এসএ (১৯৫৬-১৯৬২) ➔ আরএস/বিএস মাঠ জরিপ ও মালিকানার ঐতিহাসিক তথ্যভাণ্ডার'
                    : 'Historical survey lineage covering all dag holdings in this jurisdiction'}
                </p>
              </div>

              {/* Survey Type Filter Tabs */}
              <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 border border-slate-200 text-xs font-bold">
                {(['ALL', 'CS', 'SA', 'RS', 'BS'] as const).map((st) => (
                  <button
                    key={st}
                    type="button"
                    onClick={() => setSurveyTypeFilter(st)}
                    className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                      surveyTypeFilter === st
                        ? 'bg-[#006a4e] text-white shadow-2xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {st === 'ALL' ? (language === 'bn' ? 'সকল জরিপ' : 'All') : st}
                  </button>
                ))}
              </div>
            </div>

            {/* Dags Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[380px] overflow-y-auto pr-1">
              {filteredDags.map((dag) => {
                const isSelected = selectedDag?.id === dag.id;
                return (
                  <div
                    key={dag.id}
                    onClick={() => setSelectedDag(dag)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-2.5 ${
                      isSelected
                        ? 'bg-emerald-50/90 border-[#006a4e] ring-2 ring-emerald-300 shadow-sm'
                        : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-2xs'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-lg bg-[#006a4e] text-white font-mono font-bold text-xs">
                          দাগ #{dag.dagNo}
                        </span>
                        <span className="text-xs font-semibold text-slate-700">{dag.districtNameBn} • {dag.upazilaNameBn}</span>
                      </div>
                      <span className="text-xs font-bold text-emerald-800">
                        {toBnNum(dag.areaDecimals)} শতাংশ
                      </span>
                    </div>

                    <div className="text-xs text-slate-600">
                      <strong>মৌজা:</strong> {dag.mouzaNameBn} (জেএল #{dag.mouzaJlNo}) • <strong>শ্রেণি:</strong> {dag.landClassBn}
                    </div>

                    {/* CS SA RS comparison bar */}
                    <div className="grid grid-cols-3 gap-1.5 text-[10px] pt-1">
                      <div className="p-1.5 rounded-lg bg-amber-50 border border-amber-200 text-amber-900">
                        <div className="font-bold">CS (১৮৮৮-১৯৪০)</div>
                        <div className="truncate">খতিয়ান #{dag.csKhatianNo || 'N/A'}</div>
                        <div className="truncate text-slate-500">{dag.csRecordedOwnerBn}</div>
                      </div>
                      <div className="p-1.5 rounded-lg bg-sky-50 border border-sky-200 text-sky-900">
                        <div className="font-bold">SA (১৯৫৬-১৯৬২)</div>
                        <div className="truncate">খতিয়ান #{dag.saKhatianNo || 'N/A'}</div>
                        <div className="truncate text-slate-500">{dag.saRecordedOwnerBn}</div>
                      </div>
                      <div className="p-1.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-900">
                        <div className="font-bold">RS / বিএস জরিপ</div>
                        <div className="truncate">খতিয়ান #{dag.rsKhatianNo || 'N/A'}</div>
                        <div className="truncate text-slate-500">{dag.rsRecordedOwnerBn}</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Bottom Status bar */}
        <div className="p-2.5 bg-slate-900 text-white text-[11px] flex flex-wrap items-center justify-between gap-3 px-4 border-t border-slate-800">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-slate-300">
              {language === 'bn'
                ? 'বাংলাদেশের আসল মানচিত্র • ৮ বিভাগ ➔ ৬৪ জেলা ➔ উপজেলা ড্রিল-ডাউন (BILSP)'
                : 'Bangladesh Original Cadastral Network: 8 Divisions ➔ 64 Districts ➔ Upazilas'}
            </span>
          </div>
          <div className="flex items-center gap-3 text-slate-400 font-mono text-[10px]">
            <span>{currentDivisionConfig.nameBn}</span>
            <span>•</span>
            <span>{currentDistrict.nameBn} জেলা</span>
            <span>•</span>
            <span>{toBnNum(currentDistrictUpazilas.length)} উপজেলা</span>
          </div>
        </div>
      </div>

      {/* Right-Side Interactive Inspector Panel */}
      <div className="w-full xl:w-96 bg-white border-t xl:border-t-0 xl:border-l border-slate-200 flex flex-col p-5 space-y-5 overflow-y-auto max-h-[740px]">
        {/* Panel Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-[#006a4e]" />
            <h3 className="font-bold text-slate-900 text-sm">
              {drillLevel === 'divisions'
                ? `${currentDivisionConfig.nameBn} তথ্য`
                : `${currentDistrict.nameBn} জেলা বিবরণী`}
            </h3>
          </div>
          <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
            {drillLevel === 'divisions' ? 'বিভাগীয় স্তর' : drillLevel === 'districts' ? 'জেলা স্তর' : 'উপজেলা ও দাগ স্তর'}
          </span>
        </div>

        {/* 1. Selected Division / District Information Card */}
        <div className="p-4 rounded-2xl bg-gradient-to-br from-red-50 to-amber-50/50 border border-red-200 space-y-2">
          <div className="flex items-center justify-between">
            <span className="px-2.5 py-0.5 rounded-md bg-[#ef4444] text-white text-[10px] font-bold">
              {currentDistrict.code}
            </span>
            <span className="text-xs font-bold text-red-900">
              {toBnNum(currentDistrictUpazilas.length)} {language === 'bn' ? 'টি উপজেলা' : 'Upazilas'}
            </span>
          </div>
          <h4 className="font-bold text-slate-900 text-xl">
            {currentDistrict.nameBn} জেলা ({currentDistrict.nameEn})
          </h4>
          <p className="text-xs text-slate-600">
            {language === 'bn'
              ? `বিভাগ: ${currentDivisionConfig.nameBn} • আয়তন: ${toBnNum(currentDistrict.areaKm2)} বর্গকিমি`
              : `Division: ${currentDivisionConfig.nameEn} • Area: ${currentDistrict.areaKm2} sq km`}
          </p>
        </div>

        {/* 2. All Upazilas List for this District */}
        <div className="space-y-2">
          <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
            <Building2 className="w-3.5 h-3.5 text-[#006a4e]" />
            <span>{language === 'bn' ? 'আওতাধীন সকল উপজেলা ও রাজস্ব সার্কেল:' : 'All Upazilas in this District:'}</span>
          </span>
          <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
            {currentDistrictUpazilas.map((upz) => {
              const isSelected = selectedUpazilaId === upz.id;
              return (
                <button
                  key={upz.id}
                  type="button"
                  onClick={() => handleUpazilaClick(upz.id)}
                  className={`w-full flex items-center justify-between p-2 rounded-xl text-xs font-medium border transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-emerald-50 border-[#006a4e] text-emerald-950 font-bold'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <span>{upz.nameBn}</span>
                  <span className="text-[10px] text-slate-500 font-mono">
                    {toBnNum(upz.parcelsCount)} প্লট
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. Cadastral Dag Inspector (CS, SA, RS side-by-side) */}
        {selectedDag && (
          <div className="space-y-3 pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900 flex items-center gap-1">
                <FileText className="w-3.5 h-3.5 text-amber-600" />
                <span>{language === 'bn' ? 'দাগ ও খতিয়ানের ধারাবাহিক ধারা:' : 'Cadastral Dag Lineage:'}</span>
              </span>
              <span className="text-[10px] font-mono font-bold bg-[#006a4e] text-white px-2 py-0.5 rounded-md">
                দাগ #{selectedDag.dagNo}
              </span>
            </div>

            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-1.5">
              <div className="flex justify-between">
                <span className="text-slate-500">মৌজা ও জেএল:</span>
                <span className="font-bold text-slate-900">{selectedDag.mouzaNameBn} (জেএল #{selectedDag.mouzaJlNo})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">জমির শ্রেণি ও পরিমাণ:</span>
                <span className="font-bold text-emerald-800">{selectedDag.landClassBn} ({toBnNum(selectedDag.areaDecimals)} শতাংশ)</span>
              </div>
            </div>

            {/* Historical Surveys Box */}
            <div className="space-y-2">
              {/* CS */}
              <div className="p-2.5 rounded-xl bg-amber-50/80 border border-amber-200 text-xs space-y-1">
                <div className="flex items-center justify-between font-bold text-amber-900">
                  <span>সিএস রেকর্ড (১৮৮৮-১৯৪০)</span>
                  <span>খতিয়ান #{selectedDag.csKhatianNo}</span>
                </div>
                <div className="text-[11px] text-slate-600">
                  <strong>মালিক/জমিদার:</strong> {selectedDag.csRecordedOwnerBn} ({selectedDag.csTokNo})
                </div>
              </div>

              {/* SA */}
              <div className="p-2.5 rounded-xl bg-sky-50/80 border border-sky-200 text-xs space-y-1">
                <div className="flex items-center justify-between font-bold text-sky-900">
                  <span>এসএ রেকর্ড (১৯৫৬-১৯৬২)</span>
                  <span>খতিয়ান #{selectedDag.saKhatianNo}</span>
                </div>
                <div className="text-[11px] text-slate-600">
                  <strong>মালিক:</strong> {selectedDag.saRecordedOwnerBn} ({selectedDag.saVolumeNo})
                </div>
              </div>

              {/* RS */}
              <div className="p-2.5 rounded-xl bg-emerald-50/80 border border-emerald-200 text-xs space-y-1">
                <div className="flex items-center justify-between font-bold text-emerald-900">
                  <span>আরএস / বিএস জরিপ (হাল)</span>
                  <span>খতিয়ান #{selectedDag.rsKhatianNo}</span>
                </div>
                <div className="text-[11px] text-slate-600">
                  <strong>মালিক:</strong> {selectedDag.rsRecordedOwnerBn} ({selectedDag.rsVolumeNo})
                </div>
              </div>
            </div>

            {/* Actions for this Dag */}
            <div className="space-y-2 pt-2">
              <button
                type="button"
                onClick={() => onNavigateToService && onNavigateToService('khatian-porcha')}
                className="w-full flex items-center justify-center gap-2 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition-colors cursor-pointer shadow-2xs"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>{language === 'bn' ? 'সার্টিফাইড খতিয়ান কপি আবেদন (১০০ টাকা)' : 'Order Certified Copy'}</span>
              </button>
              <button
                type="button"
                onClick={() => onNavigateToService && onNavigateToService('ldtax')}
                className="w-full flex items-center justify-center gap-2 py-2 rounded-xl bg-[#006a4e] hover:bg-emerald-800 text-white text-xs font-bold transition-colors cursor-pointer shadow-2xs"
              >
                <span>{language === 'bn' ? 'এই দাগের ভূমি উন্নয়ন কর পরিশোধ' : 'Pay Land Tax'}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
