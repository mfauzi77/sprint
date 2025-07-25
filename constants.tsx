
import React from 'react';
import { NavItem, View, ResourceType } from './types';
import { DashboardIcon, UsersIcon, ChartBarIcon, MapIcon, BellAlertIcon, LightBulbIcon, CircleStackIcon, BeakerIcon, BriefcaseIcon, DocumentChartBarIcon, FlagIcon, GlobeAltIcon, HeartIcon, ScaleIcon, CubeIcon, WrenchScrewdriverIcon } from './components/icons/Icons';

export const NAVIGATION_ITEMS: NavItem[] = [
    { id: View.Dashboard, label: 'Dashboard', icon: <DashboardIcon /> },
    { id: View.Forecasting, label: 'Forecasting & Prediction', icon: <ChartBarIcon /> },
    { id: View.DataPerWilayah, label: 'Data per Wilayah', icon: <MapIcon /> },
    { id: View.EWSPerBidang, label: 'EWS per Bidang', icon: <BellAlertIcon /> },
    { id: View.SmartRecommendations, label: 'Smart Recommendations', icon: <LightBulbIcon /> },
    { id: View.Intervensi, label: 'Manajemen Intervensi', icon: <BeakerIcon /> },
    { id: View.DataProcessing, label: 'Data Processing', icon: <CircleStackIcon /> },
    { id: View.ParentPortal, label: 'Portal Orang Tua', icon: <HeartIcon /> },
];

export const SUB_NAVIGATION_ITEMS: NavItem[] = [
    { id: View.ResourceAllocation, label: 'Resource Allocation', icon: <BriefcaseIcon /> },
    { id: View.Reports, label: 'Reports & Analytics', icon: <DocumentChartBarIcon /> },
];

export const DOMAIN_FILTER_ITEMS = [
    { id: 'Semua', name: 'Semua Domain', icon: <GlobeAltIcon className="w-5 h-5" /> },
    { id: 'Kesehatan', name: 'Kesehatan', icon: <FlagIcon color="text-red-500" /> },
    { id: 'Gizi', name: 'Gizi', icon: <FlagIcon color="text-yellow-500" /> },
    { id: 'Pengasuhan', name: 'Pengasuhan', icon: <FlagIcon color="text-green-500" /> },
    { id: 'Perlindungan', name: 'Perlindungan', icon: <FlagIcon color="text-blue-500" /> },
    { id: 'Kesejahteraan', name: 'Kesejahteraan', icon: <FlagIcon color="text-indigo-500" /> }
];

export const DOMAIN_ITEMS = DOMAIN_FILTER_ITEMS.filter(item => item.id !== 'Semua');

export const RESOURCE_TYPES: { id: ResourceType; name: string; icon: React.ReactNode }[] = [
    { id: 'SDM', name: 'Sumber Daya Manusia', icon: <UsersIcon className="w-6 h-6 text-blue-500" /> },
    { id: 'Anggaran', name: 'Anggaran', icon: <ScaleIcon className="w-6 h-6 text-emerald-500" /> },
    { id: 'Material', name: 'Material & Logistik', icon: <CubeIcon className="w-6 h-6 text-amber-500" /> },
];
