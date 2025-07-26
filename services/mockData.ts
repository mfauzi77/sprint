

import { RiskAssessmentData, KeyIndicatorData, ActiveAlertData, RiskCategory, AlertLevel, ForecastDataPoint, RegionalForecastData, RegionDetailData, DomainData, DataSource, LogEntry, InterventionPlan, InterventionStatus, InterventionPriority, RegionalRiskScore, DomainFilter, ResourceData, Domain, RegionPerformance, DomainIndicatorData, DomainMetric, ParentData } from '../types';

export const riskAssessmentData: RiskAssessmentData[] = [
    { category: RiskCategory.Complete, count: 367, color: 'bg-emerald-500' },
    { category: RiskCategory.Medium, count: 142, color: 'bg-yellow-500' },
    { category: RiskCategory.Low, count: 23, color: 'bg-orange-500' },
    { category: RiskCategory.Critical, count: 6, color: 'bg-red-500' },
];

export const keyIndicatorsByDomain: Record<DomainFilter, KeyIndicatorData[]> = {
    'Semua': [
        { value: '78.5%', label: 'Cakupan Imunisasi Dasar', change: 2.3, changeType: 'increase', domain: 'Semua' },
        { value: '21.6%', label: 'Prevalensi Stunting', change: -1.2, changeType: 'decrease', domain: 'Semua' },
        { value: '85.2%', label: 'Partisipasi PAUD', change: 1.8, changeType: 'increase', domain: 'Semua' },
        { value: '89.7%', label: 'Kepemilikan Akta Lahir', change: 1.1, changeType: 'increase', domain: 'Semua'},
    ],
    'Kesehatan': [
        { value: '78.5%', label: 'Cakupan Imunisasi Dasar', change: 2.3, changeType: 'increase', domain: 'Kesehatan' },
        { value: '91.0%', label: 'Persalinan di Faskes', change: 0.5, changeType: 'increase', domain: 'Kesehatan' },
        { value: '12.4%', label: 'Prevalensi Diare', change: -0.8, changeType: 'decrease', domain: 'Kesehatan' },
        { value: '21/1000', label: 'Angka Kematian Bayi (AKB)', change: -0.5, changeType: 'decrease', domain: 'Kesehatan'},
    ],
    'Gizi': [
        { value: '21.6%', label: 'Prevalensi Stunting', change: -1.2, changeType: 'decrease', domain: 'Gizi' },
        { value: '88.3%', label: 'Pemberian ASI Eksklusif', change: 3.1, changeType: 'increase', domain: 'Gizi' },
        { value: '7.1%', label: 'Gizi Buruk (Wasting)', change: -0.5, changeType: 'decrease', domain: 'Gizi' },
        { value: '28.4%', label: 'Anemia pada Ibu Hamil', change: 0.3, changeType: 'increase', domain: 'Gizi'},
    ],
    'Pengasuhan': [
       { value: '85.2%', label: 'Partisipasi PAUD', change: 1.8, changeType: 'increase', domain: 'Pengasuhan' },
       { value: '75.6%', label: 'Stimulasi Dini (SDIDTK)', change: 4.2, changeType: 'increase', domain: 'Pengasuhan' },
       { value: '68.0%', label: 'Keluarga Paham Pola Asuh', change: 2.0, changeType: 'increase', domain: 'Pengasuhan' },
       { value: '45.1%', label: 'Keluarga Terapkan Batas Screen-Time', change: 5.1, changeType: 'increase', domain: 'Pengasuhan'},
    ],
    'Perlindungan': [
        { value: '92.1%', label: 'Kepemilikan Akta Lahir', change: 1.5, changeType: 'increase', domain: 'Perlindungan' },
        { value: '3.4%', label: 'Prevalensi Perkawinan Anak', change: -0.4, changeType: 'decrease', domain: 'Perlindungan' },
        { value: '8.7%', label: 'Tingkat Kekerasan pada Anak', change: 0.2, changeType: 'increase', domain: 'Perlindungan' },
        { value: '4.2%', label: 'Prevalensi Pekerja Anak', change: -0.1, changeType: 'decrease', domain: 'Perlindungan'},
    ],
    'Kesejahteraan': [
        { value: '82.5%', label: 'Akses Air Bersih Layak', change: 2.1, changeType: 'increase', domain: 'Kesejahteraan' },
        { value: '79.8%', label: 'Akses Sanitasi Layak', change: 2.5, changeType: 'increase', domain: 'Kesejahteraan' },
        { value: '95.3%', label: 'Keluarga dengan Jaminan Sosial', change: 3.0, changeType: 'increase', domain: 'Kesejahteraan' },
        { value: '97.2%', label: 'Rasio Elektrifikasi Rumah Tangga', change: 0.8, changeType: 'increase', domain: 'Kesejahteraan'},
    ]
};


export const allActiveAlerts: ActiveAlertData[] = [
    { id: 'alert-1', level: AlertLevel.High, title: 'Cakupan Imunisasi Rendah', region: 'Papua', domain: 'Kesehatan', riskScore: 85, target: 90 },
    { id: 'alert-2', level: AlertLevel.Medium, title: 'ISPA Meningkat', region: 'Jawa Barat', domain: 'Kesehatan', riskScore: 62, trend: 15 },
    { id: 'alert-3', level: AlertLevel.Critical, title: 'Lonjakan Stunting', region: 'Nusa Tenggara Timur', domain: 'Gizi', riskScore: 91, trend: 5 },
    { id: 'alert-4', level: AlertLevel.High, title: 'Akses PAUD Terbatas', region: 'Sulawesi Barat', domain: 'Pengasuhan', riskScore: 72 },
    { id: 'alert-5', level: AlertLevel.Medium, title: 'Kekerasan Anak', region: 'Banten', domain: 'Perlindungan', riskScore: 68, trend: 8 },
    { id: 'alert-6', level: AlertLevel.High, title: 'Sanitasi Buruk', region: 'Aceh', domain: 'Kesejahteraan', riskScore: 78 },
    { id: 'alert-7', level: AlertLevel.Critical, title: 'Gizi Buruk Akut', region: 'Maluku', domain: 'Gizi', riskScore: 95, trend: 9 },
    { id: 'alert-8', level: AlertLevel.Medium, title: 'Penurunan Partisipasi PAUD', region: 'Kalimantan Timur', domain: 'Pengasuhan', riskScore: 65, trend: -3 },
    { id: 'alert-9', level: AlertLevel.High, title: 'Angka Perkawinan Anak Tinggi', region: 'Jawa Timur', domain: 'Perlindungan', riskScore: 81 },
    { id: 'alert-10', level: AlertLevel.High, title: 'Angka Anemia Ibu Hamil Tinggi', region: 'Nusa Tenggara Barat', domain: 'Gizi', riskScore: 79, trend: 4 },
    { id: 'alert-11', level: AlertLevel.Critical, title: 'Kualitas Udara Buruk (Kabut Asap)', region: 'Riau', domain: 'Kesehatan', riskScore: 88, trend: 25 },
    { id: 'alert-12', level: AlertLevel.Medium, title: 'Akses Air Bersih Kritis', region: 'Sulawesi Tengah', domain: 'Kesejahteraan', riskScore: 73 },
    { id: 'alert-13', level: AlertLevel.High, title: 'Pekerja Anak Sektor Informal', region: 'Kalimantan Barat', domain: 'Perlindungan', riskScore: 75, trend: 2 },
    { id: 'alert-14', level: AlertLevel.Medium, title: 'Kepadatan & Sanitasi Pemukiman', region: 'DKI Jakarta', domain: 'Kesejahteraan', riskScore: 69 },
];

export const forecastChartData: ForecastDataPoint[] = [
    { month: 'Jan', actual: 68, predicted: 68, predicted_upper: 68, predicted_lower: 68 },
    { month: 'Feb', actual: 70, predicted: 70, predicted_upper: 70, predicted_lower: 70 },
    { month: 'Mar', actual: 69, predicted: 69, predicted_upper: 69, predicted_lower: 69 },
    { month: 'Apr', actual: 72, predicted: 72, predicted_upper: 72, predicted_lower: 72 },
    { month: 'May', actual: 71, predicted: 71, predicted_upper: 71, predicted_lower: 71 },
    { month: 'Jun', actual: 73, predicted: 73, predicted_upper: 73, predicted_lower: 73 },
    { month: 'Jul', actual: null, predicted: 75, predicted_upper: 78, predicted_lower: 72 },
    { month: 'Aug', actual: null, predicted: 76, predicted_upper: 80, predicted_lower: 72 },
    { month: 'Sep', actual: null, predicted: 78, predicted_upper: 83, predicted_lower: 73 },
];

// --- Mock Data for Data Per Wilayah ---
export const nationalHistoricalRisk = [
    { month: 'Jan', score: 65 }, { month: 'Feb', score: 66 }, { month: 'Mar', score: 65 },
    { month: 'Apr', score: 67 }, { month: 'May', score: 66 }, { month: 'Jun', score: 68 }
];

const regionsDetails: Record<string, RegionDetailData> = {
    'aceh': {
        id: 'aceh', name: 'Aceh', overallRisk: 68, population: 5274871, activeAlertsCount: 1,
        domains: {
            Kesehatan: { riskScore: 70, metrics: [{ label: 'Cakupan Imunisasi', value: 78, unit: '%', nationalAverage: 85, higherIsBetter: true }, { label: 'Prevalensi ISPA', value: 20, unit: '%', nationalAverage: 15, higherIsBetter: false }] },
            Gizi: { riskScore: 65, metrics: [{ label: 'Prevalensi Stunting', value: 30, unit: '%', nationalAverage: 28, higherIsBetter: false }, { label: 'Gizi Buruk', value: 8, unit: '%', nationalAverage: 7, higherIsBetter: false }] },
            Pengasuhan: { riskScore: 62, metrics: [{ label: 'Akses PAUD', value: 65, unit: '%', nationalAverage: 70, higherIsBetter: true }, { label: 'Kualitas Pola Asuh', value: 60, unit: '', nationalAverage: 65, higherIsBetter: true }] },
            Perlindungan: { riskScore: 68, metrics: [{ label: 'Akta Kelahiran', value: 85, unit: '%', nationalAverage: 90, higherIsBetter: true }, { label: 'Kasus Kekerasan', value: 180, unit: 'kasus', nationalAverage: 150, higherIsBetter: false }] },
            Kesejahteraan: { riskScore: 78, metrics: [{ label: 'Akses Air Bersih', value: 70, unit: '%', nationalAverage: 80, higherIsBetter: true }, { label: 'Sanitasi Layak', value: 65, unit: '%', nationalAverage: 75, higherIsBetter: true }] }
        },
        historicalRisk: [ { month: 'Jan', score: 66 }, { month: 'Feb', score: 67 }, { month: 'Mar', score: 68 }, { month: 'Apr', score: 68 }, { month: 'May', score: 69 }, { month: 'Jun', score: 68 }]
    },
    'sumatera-utara': {
        id: 'sumatera-utara', name: 'Sumatera Utara', overallRisk: 49, population: 14799361, activeAlertsCount: 0,
        domains: {
            Kesehatan: { riskScore: 52, metrics: [{ label: 'Cakupan Imunisasi', value: 89, unit: '%', nationalAverage: 85, higherIsBetter: true }, { label: 'Prevalensi ISPA', value: 16, unit: '%', nationalAverage: 15, higherIsBetter: false }] },
            Gizi: { riskScore: 50, metrics: [{ label: 'Prevalensi Stunting', value: 25, unit: '%', nationalAverage: 28, higherIsBetter: false }, { label: 'Gizi Buruk', value: 6, unit: '%', nationalAverage: 7, higherIsBetter: false }] },
            Pengasuhan: { riskScore: 45, metrics: [{ label: 'Akses PAUD', value: 82, unit: '%', nationalAverage: 70, higherIsBetter: true }, { label: 'Kualitas Pola Asuh', value: 72, unit: '', nationalAverage: 65, higherIsBetter: true }] },
            Perlindungan: { riskScore: 48, metrics: [{ label: 'Akta Kelahiran', value: 94, unit: '%', nationalAverage: 90, higherIsBetter: true }, { label: 'Kasus Kekerasan', value: 130, unit: 'kasus', nationalAverage: 150, higherIsBetter: false }] },
            Kesejahteraan: { riskScore: 51, metrics: [{ label: 'Akses Air Bersih', value: 87, unit: '%', nationalAverage: 80, higherIsBetter: true }, { label: 'Sanitasi Layak', value: 83, unit: '%', nationalAverage: 75, higherIsBetter: true }] }
        },
        historicalRisk: [ { month: 'Jan', score: 52 }, { month: 'Feb', score: 51 }, { month: 'Mar', score: 50 }, { month: 'Apr', score: 49 }, { month: 'May', score: 49 }, { month: 'Jun', score: 49 }]
    },
    'riau': {
        id: 'riau', name: 'Riau', overallRisk: 70, population: 6394087, activeAlertsCount: 1,
        domains: {
            Kesehatan: { riskScore: 88, metrics: [{ label: 'Cakupan Imunisasi', value: 80, unit: '%', nationalAverage: 85, higherIsBetter: true }, { label: 'Prevalensi ISPA', value: 30, unit: '%', nationalAverage: 15, higherIsBetter: false }] },
            Gizi: { riskScore: 65, metrics: [{ label: 'Prevalensi Stunting', value: 25, unit: '%', nationalAverage: 28, higherIsBetter: false }, { label: 'Gizi Buruk', value: 7, unit: '%', nationalAverage: 7, higherIsBetter: false }] },
            Pengasuhan: { riskScore: 60, metrics: [{ label: 'Akses PAUD', value: 72, unit: '%', nationalAverage: 70, higherIsBetter: true }, { label: 'Kualitas Pola Asuh', value: 66, unit: '', nationalAverage: 65, higherIsBetter: true }] },
            Perlindungan: { riskScore: 62, metrics: [{ label: 'Akta Kelahiran', value: 91, unit: '%', nationalAverage: 90, higherIsBetter: true }, { label: 'Kasus Kekerasan', value: 140, unit: 'kasus', nationalAverage: 150, higherIsBetter: false }] },
            Kesejahteraan: { riskScore: 68, metrics: [{ label: 'Akses Air Bersih', value: 78, unit: '%', nationalAverage: 80, higherIsBetter: true }, { label: 'Sanitasi Layak', value: 74, unit: '%', nationalAverage: 75, higherIsBetter: true }] }
        },
        historicalRisk: [ { month: 'Jan', score: 65 }, { month: 'Feb', score: 66 }, { month: 'Mar', score: 68 }, { month: 'Apr', score: 69 }, { month: 'May', score: 70 }, { month: 'Jun', score: 70 }]
    },
    'sumatera-selatan': {
        id: 'sumatera-selatan', name: 'Sumatera Selatan', overallRisk: 62, population: 8467432, activeAlertsCount: 0,
        domains: {
            Kesehatan: { riskScore: 65, metrics: [{ label: 'Cakupan Imunisasi', value: 85, unit: '%', nationalAverage: 85, higherIsBetter: true }, { label: 'Prevalensi ISPA', value: 18, unit: '%', nationalAverage: 15, higherIsBetter: false }] },
            Gizi: { riskScore: 68, metrics: [{ label: 'Prevalensi Stunting', value: 28, unit: '%', nationalAverage: 28, higherIsBetter: false }, { label: 'Gizi Buruk', value: 7, unit: '%', nationalAverage: 7, higherIsBetter: false }] },
            Pengasuhan: { riskScore: 58, metrics: [{ label: 'Akses PAUD', value: 74, unit: '%', nationalAverage: 70, higherIsBetter: true }, { label: 'Kualitas Pola Asuh', value: 67, unit: '', nationalAverage: 65, higherIsBetter: true }] },
            Perlindungan: { riskScore: 60, metrics: [{ label: 'Akta Kelahiran', value: 90, unit: '%', nationalAverage: 90, higherIsBetter: true }, { label: 'Kasus Kekerasan', value: 145, unit: 'kasus', nationalAverage: 150, higherIsBetter: false }] },
            Kesejahteraan: { riskScore: 61, metrics: [{ label: 'Akses Air Bersih', value: 81, unit: '%', nationalAverage: 80, higherIsBetter: true }, { label: 'Sanitasi Layak', value: 78, unit: '%', nationalAverage: 75, higherIsBetter: true }] }
        },
        historicalRisk: [ { month: 'Jan', score: 64 }, { month: 'Feb', score: 63 }, { month: 'Mar', score: 63 }, { month: 'Apr', score: 62 }, { month: 'May', score: 62 }, { month: 'Jun', score: 62 }]
    },
    'dki-jakarta': {
        id: 'dki-jakarta', name: 'DKI Jakarta', overallRisk: 45, population: 10562088, activeAlertsCount: 1,
        domains: {
            Kesehatan: { riskScore: 40, metrics: [{ label: 'Cakupan Imunisasi', value: 95, unit: '%', nationalAverage: 85, higherIsBetter: true }, { label: 'Prevalensi ISPA', value: 12, unit: '%', nationalAverage: 15, higherIsBetter: false }] },
            Gizi: { riskScore: 42, metrics: [{ label: 'Prevalensi Stunting', value: 18, unit: '%', nationalAverage: 28, higherIsBetter: false }, { label: 'Gizi Buruk', value: 4, unit: '%', nationalAverage: 7, higherIsBetter: false }] },
            Pengasuhan: { riskScore: 48, metrics: [{ label: 'Akses PAUD', value: 88, unit: '%', nationalAverage: 70, higherIsBetter: true }, { label: 'Kualitas Pola Asuh', value: 75, unit: '', nationalAverage: 65, higherIsBetter: true }] },
            Perlindungan: { riskScore: 52, metrics: [{ label: 'Akta Kelahiran', value: 98, unit: '%', nationalAverage: 90, higherIsBetter: true }, { label: 'Kasus Kekerasan', value: 180, unit: 'kasus', nationalAverage: 150, higherIsBetter: false }] },
            Kesejahteraan: { riskScore: 69, metrics: [{ label: 'Akses Air Bersih', value: 92, unit: '%', nationalAverage: 80, higherIsBetter: true }, { label: 'Sanitasi Layak', value: 85, unit: '%', nationalAverage: 75, higherIsBetter: true }] }
        },
        historicalRisk: [ { month: 'Jan', score: 48 }, { month: 'Feb', score: 47 }, { month: 'Mar', score: 46 }, { month: 'Apr', score: 45 }, { month: 'May', score: 45 }, { month: 'Jun', score: 45 }]
    },
    'jawa-barat': {
        id: 'jawa-barat', name: 'Jawa Barat', overallRisk: 58, population: 48274162, activeAlertsCount: 1,
        domains: {
            Kesehatan: { riskScore: 62, metrics: [{ label: 'Cakupan Imunisasi', value: 88, unit: '%', nationalAverage: 85, higherIsBetter: true }, { label: 'Prevalensi ISPA', value: 18, unit: '%', nationalAverage: 15, higherIsBetter: false }] },
            Gizi: { riskScore: 55, metrics: [{ label: 'Prevalensi Stunting', value: 24, unit: '%', nationalAverage: 28, higherIsBetter: false }, { label: 'Gizi Buruk', value: 5, unit: '%', nationalAverage: 7, higherIsBetter: false }] },
            Pengasuhan: { riskScore: 52, metrics: [{ label: 'Akses PAUD', value: 75, unit: '%', nationalAverage: 70, higherIsBetter: true }, { label: 'Kualitas Pola Asuh', value: 68, unit: '', nationalAverage: 65, higherIsBetter: true }] },
            Perlindungan: { riskScore: 59, metrics: [{ label: 'Akta Kelahiran', value: 92, unit: '%', nationalAverage: 90, higherIsBetter: true }, { label: 'Kasus Kekerasan', value: 120, unit: 'kasus', nationalAverage: 150, higherIsBetter: false }] },
            Kesejahteraan: { riskScore: 60, metrics: [{ label: 'Akses Air Bersih', value: 85, unit: '%', nationalAverage: 80, higherIsBetter: true }, { label: 'Sanitasi Layak', value: 80, unit: '%', nationalAverage: 75, higherIsBetter: true }] }
        },
        historicalRisk: [ { month: 'Jan', score: 60 }, { month: 'Feb', score: 59 }, { month: 'Mar', score: 61 }, { month: 'Apr', score: 58 }, { month: 'May', score: 57 }, { month: 'Jun', score: 58 }]
    },
    'jawa-tengah': {
        id: 'jawa-tengah', name: 'Jawa Tengah', overallRisk: 52, population: 36516035, activeAlertsCount: 0,
        domains: {
            Kesehatan: { riskScore: 50, metrics: [{ label: 'Cakupan Imunisasi', value: 92, unit: '%', nationalAverage: 85, higherIsBetter: true }, { label: 'Prevalensi ISPA', value: 14, unit: '%', nationalAverage: 15, higherIsBetter: false }] },
            Gizi: { riskScore: 55, metrics: [{ label: 'Prevalensi Stunting', value: 22, unit: '%', nationalAverage: 28, higherIsBetter: false }, { label: 'Gizi Buruk', value: 6, unit: '%', nationalAverage: 7, higherIsBetter: false }] },
            Pengasuhan: { riskScore: 48, metrics: [{ label: 'Akses PAUD', value: 80, unit: '%', nationalAverage: 70, higherIsBetter: true }, { label: 'Kualitas Pola Asuh', value: 70, unit: '', nationalAverage: 65, higherIsBetter: true }] },
            Perlindungan: { riskScore: 51, metrics: [{ label: 'Akta Kelahiran', value: 95, unit: '%', nationalAverage: 90, higherIsBetter: true }, { label: 'Kasus Kekerasan', value: 130, unit: 'kasus', nationalAverage: 150, higherIsBetter: false }] },
            Kesejahteraan: { riskScore: 53, metrics: [{ label: 'Akses Air Bersih', value: 88, unit: '%', nationalAverage: 80, higherIsBetter: true }, { label: 'Sanitasi Layak', value: 82, unit: '%', nationalAverage: 75, higherIsBetter: true }] }
        },
        historicalRisk: [ { month: 'Jan', score: 55 }, { month: 'Feb', score: 54 }, { month: 'Mar', score: 53 }, { month: 'Apr', score: 52 }, { month: 'May', score: 52 }, { month: 'Jun', score: 52 }]
    },
    'yogyakarta': {
        id: 'yogyakarta', name: 'Yogyakarta', overallRisk: 42, population: 3668719, activeAlertsCount: 0,
        domains: {
            Kesehatan: { riskScore: 40, metrics: [{ label: 'Cakupan Imunisasi', value: 96, unit: '%', nationalAverage: 85, higherIsBetter: true }, { label: 'Prevalensi ISPA', value: 10, unit: '%', nationalAverage: 15, higherIsBetter: false }] },
            Gizi: { riskScore: 45, metrics: [{ label: 'Prevalensi Stunting', value: 17, unit: '%', nationalAverage: 28, higherIsBetter: false }, { label: 'Gizi Buruk', value: 3, unit: '%', nationalAverage: 7, higherIsBetter: false }] },
            Pengasuhan: { riskScore: 38, metrics: [{ label: 'Akses PAUD', value: 90, unit: '%', nationalAverage: 70, higherIsBetter: true }, { label: 'Kualitas Pola Asuh', value: 80, unit: '', nationalAverage: 65, higherIsBetter: true }] },
            Perlindungan: { riskScore: 43, metrics: [{ label: 'Akta Kelahiran', value: 99, unit: '%', nationalAverage: 90, higherIsBetter: true }, { label: 'Kasus Kekerasan', value: 100, unit: 'kasus', nationalAverage: 150, higherIsBetter: false }] },
            Kesejahteraan: { riskScore: 46, metrics: [{ label: 'Akses Air Bersih', value: 95, unit: '%', nationalAverage: 80, higherIsBetter: true }, { label: 'Sanitasi Layak', value: 92, unit: '%', nationalAverage: 75, higherIsBetter: true }] }
        },
        historicalRisk: [ { month: 'Jan', score: 45 }, { month: 'Feb', score: 44 }, { month: 'Mar', score: 43 }, { month: 'Apr', score: 42 }, { month: 'May', score: 42 }, { month: 'Jun', score: 42 }]
    },
    'jawa-timur': {
        id: 'jawa-timur', name: 'Jawa Timur', overallRisk: 60, population: 40665696, activeAlertsCount: 1,
        domains: {
            Kesehatan: { riskScore: 62, metrics: [{ label: 'Cakupan Imunisasi', value: 87, unit: '%', nationalAverage: 85, higherIsBetter: true }, { label: 'Prevalensi ISPA', value: 17, unit: '%', nationalAverage: 15, higherIsBetter: false }] },
            Gizi: { riskScore: 65, metrics: [{ label: 'Prevalensi Stunting', value: 26, unit: '%', nationalAverage: 28, higherIsBetter: false }, { label: 'Gizi Buruk', value: 6, unit: '%', nationalAverage: 7, higherIsBetter: false }] },
            Pengasuhan: { riskScore: 55, metrics: [{ label: 'Akses PAUD', value: 78, unit: '%', nationalAverage: 70, higherIsBetter: true }, { label: 'Kualitas Pola Asuh', value: 69, unit: '', nationalAverage: 65, higherIsBetter: true }] },
            Perlindungan: { riskScore: 81, metrics: [{ label: 'Akta Kelahiran', value: 93, unit: '%', nationalAverage: 90, higherIsBetter: true }, { label: 'Perkawinan Anak', value: 9, unit: '%', nationalAverage: 3.4, higherIsBetter: false }] },
            Kesejahteraan: { riskScore: 58, metrics: [{ label: 'Akses Air Bersih', value: 86, unit: '%', nationalAverage: 80, higherIsBetter: true }, { label: 'Sanitasi Layak', value: 81, unit: '%', nationalAverage: 75, higherIsBetter: true }] }
        },
        historicalRisk: [ { month: 'Jan', score: 62 }, { month: 'Feb', score: 61 }, { month: 'Mar', score: 61 }, { month: 'Apr', score: 60 }, { month: 'May', score: 60 }, { month: 'Jun', score: 60 }]
    },
    'banten': {
        id: 'banten', name: 'Banten', overallRisk: 65, population: 11904562, activeAlertsCount: 1,
        domains: {
            Kesehatan: { riskScore: 66, metrics: [{ label: 'Cakupan Imunisasi', value: 84, unit: '%', nationalAverage: 85, higherIsBetter: true }, { label: 'Prevalensi ISPA', value: 19, unit: '%', nationalAverage: 15, higherIsBetter: false }] },
            Gizi: { riskScore: 68, metrics: [{ label: 'Prevalensi Stunting', value: 27, unit: '%', nationalAverage: 28, higherIsBetter: false }, { label: 'Gizi Buruk', value: 8, unit: '%', nationalAverage: 7, higherIsBetter: false }] },
            Pengasuhan: { riskScore: 63, metrics: [{ label: 'Akses PAUD', value: 70, unit: '%', nationalAverage: 70, higherIsBetter: true }, { label: 'Kualitas Pola Asuh', value: 64, unit: '', nationalAverage: 65, higherIsBetter: true }] },
            Perlindungan: { riskScore: 70, metrics: [{ label: 'Akta Kelahiran', value: 88, unit: '%', nationalAverage: 90, higherIsBetter: true }, { label: 'Kasus Kekerasan', value: 170, unit: 'kasus', nationalAverage: 150, higherIsBetter: false }] },
            Kesejahteraan: { riskScore: 64, metrics: [{ label: 'Akses Air Bersih', value: 79, unit: '%', nationalAverage: 80, higherIsBetter: true }, { label: 'Sanitasi Layak', value: 76, unit: '%', nationalAverage: 75, higherIsBetter: true }] }
        },
        historicalRisk: [ { month: 'Jan', score: 67 }, { month: 'Feb', score: 66 }, { month: 'Mar', score: 66 }, { month: 'Apr', score: 65 }, { month: 'May', score: 65 }, { month: 'Jun', score: 65 }]
    },
    'bali': {
        id: 'bali', name: 'Bali', overallRisk: 48, population: 4317404, activeAlertsCount: 0,
        domains: {
            Kesehatan: { riskScore: 45, metrics: [{ label: 'Cakupan Imunisasi', value: 97, unit: '%', nationalAverage: 85, higherIsBetter: true }, { label: 'Prevalensi ISPA', value: 9, unit: '%', nationalAverage: 15, higherIsBetter: false }] },
            Gizi: { riskScore: 50, metrics: [{ label: 'Prevalensi Stunting', value: 19, unit: '%', nationalAverage: 28, higherIsBetter: false }, { label: 'Gizi Buruk', value: 4, unit: '%', nationalAverage: 7, higherIsBetter: false }] },
            Pengasuhan: { riskScore: 42, metrics: [{ label: 'Akses PAUD', value: 85, unit: '%', nationalAverage: 70, higherIsBetter: true }, { label: 'Kualitas Pola Asuh', value: 78, unit: '', nationalAverage: 65, higherIsBetter: true }] },
            Perlindungan: { riskScore: 51, metrics: [{ label: 'Akta Kelahiran', value: 97, unit: '%', nationalAverage: 90, higherIsBetter: true }, { label: 'Kasus Kekerasan', value: 110, unit: 'kasus', nationalAverage: 150, higherIsBetter: false }] },
            Kesejahteraan: { riskScore: 52, metrics: [{ label: 'Akses Air Bersih', value: 94, unit: '%', nationalAverage: 80, higherIsBetter: true }, { label: 'Sanitasi Layak', value: 90, unit: '%', nationalAverage: 75, higherIsBetter: true }] }
        },
        historicalRisk: [ { month: 'Jan', score: 51 }, { month: 'Feb', score: 50 }, { month: 'Mar', score: 49 }, { month: 'Apr', score: 48 }, { month: 'May', score: 48 }, { month: 'Jun', score: 48 }]
    },
    'nusa-tenggara-barat': {
        id: 'nusa-tenggara-barat', name: 'Nusa Tenggara Barat', overallRisk: 79, population: 5320092, activeAlertsCount: 1,
        domains: {
            Kesehatan: { riskScore: 75, metrics: [{ label: 'Cakupan Imunisasi', value: 70, unit: '%', nationalAverage: 85, higherIsBetter: true }, { label: 'Angka Kematian Bayi', value: 25, unit: '/1000', nationalAverage: 21, higherIsBetter: false }] },
            Gizi: { riskScore: 82, metrics: [{ label: 'Prevalensi Stunting', value: 33, unit: '%', nationalAverage: 28, higherIsBetter: false }, { label: 'Anemia Ibu Hamil', value: 35, unit: '%', nationalAverage: 28, higherIsBetter: false }] },
            Pengasuhan: { riskScore: 70, metrics: [{ label: 'Akses PAUD', value: 60, unit: '%', nationalAverage: 70, higherIsBetter: true }, { label: 'Kualitas Pola Asuh', value: 55, unit: '', nationalAverage: 65, higherIsBetter: true }] },
            Perlindungan: { riskScore: 80, metrics: [{ label: 'Akta Kelahiran', value: 80, unit: '%', nationalAverage: 90, higherIsBetter: true }, { label: 'Perkawinan Anak', value: 8, unit: '%', nationalAverage: 3.4, higherIsBetter: false }] },
            Kesejahteraan: { riskScore: 78, metrics: [{ label: 'Akses Air Bersih', value: 72, unit: '%', nationalAverage: 80, higherIsBetter: true }, { label: 'Sanitasi Layak', value: 68, unit: '%', nationalAverage: 75, higherIsBetter: true }] }
        },
        historicalRisk: [ { month: 'Jan', score: 75 }, { month: 'Feb', score: 76 }, { month: 'Mar', score: 77 }, { month: 'Apr', score: 78 }, { month: 'May', score: 78 }, { month: 'Jun', score: 79 }]
    },
    'nusa-tenggara-timur': {
        id: 'nusa-tenggara-timur', name: 'Nusa Tenggara Timur', overallRisk: 91, population: 5325566, activeAlertsCount: 1,
        domains: {
            Kesehatan: { riskScore: 80, metrics: [{ label: 'Cakupan Imunisasi', value: 68, unit: '%', nationalAverage: 85, higherIsBetter: true }, { label: 'Prevalensi ISPA', value: 22, unit: '%', nationalAverage: 15, higherIsBetter: false }] },
            Gizi: { riskScore: 91, metrics: [{ label: 'Prevalensi Stunting', value: 42, unit: '%', nationalAverage: 28, higherIsBetter: false }, { label: 'Gizi Buruk', value: 15, unit: '%', nationalAverage: 7, higherIsBetter: false }] },
            Pengasuhan: { riskScore: 75, metrics: [{ label: 'Akses PAUD', value: 55, unit: '%', nationalAverage: 70, higherIsBetter: true }, { label: 'Kualitas Pola Asuh', value: 60, unit: '', nationalAverage: 65, higherIsBetter: true }] },
            Perlindungan: { riskScore: 78, metrics: [{ label: 'Akta Kelahiran', value: 75, unit: '%', nationalAverage: 90, higherIsBetter: true }, { label: 'Kasus Kekerasan', value: 200, unit: 'kasus', nationalAverage: 150, higherIsBetter: false }] },
            Kesejahteraan: { riskScore: 85, metrics: [{ label: 'Akses Air Bersih', value: 60, unit: '%', nationalAverage: 80, higherIsBetter: true }, { label: 'Sanitasi Layak', value: 55, unit: '%', nationalAverage: 75, higherIsBetter: true }] }
        },
        historicalRisk: [ { month: 'Jan', score: 87 }, { month: 'Feb', score: 88 }, { month: 'Mar', score: 88 }, { month: 'Apr', score: 89 }, { month: 'May', score: 90 }, { month: 'Jun', score: 91 }]
    },
    'kalimantan-barat': {
        id: 'kalimantan-barat', name: 'Kalimantan Barat', overallRisk: 71, population: 5414390, activeAlertsCount: 1,
        domains: {
            Kesehatan: { riskScore: 72, metrics: [{ label: 'Cakupan Imunisasi', value: 75, unit: '%', nationalAverage: 85, higherIsBetter: true }, { label: 'Prevalensi ISPA', value: 21, unit: '%', nationalAverage: 15, higherIsBetter: false }] },
            Gizi: { riskScore: 70, metrics: [{ label: 'Prevalensi Stunting', value: 31, unit: '%', nationalAverage: 28, higherIsBetter: false }, { label: 'Gizi Buruk', value: 9, unit: '%', nationalAverage: 7, higherIsBetter: false }] },
            Pengasuhan: { riskScore: 68, metrics: [{ label: 'Akses PAUD', value: 64, unit: '%', nationalAverage: 70, higherIsBetter: true }, { label: 'Kualitas Pola Asuh', value: 62, unit: '', nationalAverage: 65, higherIsBetter: true }] },
            Perlindungan: { riskScore: 75, metrics: [{ label: 'Akta Kelahiran', value: 84, unit: '%', nationalAverage: 90, higherIsBetter: true }, { label: 'Pekerja Anak', value: 5, unit: '%', nationalAverage: 4.2, higherIsBetter: false }] },
            Kesejahteraan: { riskScore: 73, metrics: [{ label: 'Akses Air Bersih', value: 71, unit: '%', nationalAverage: 80, higherIsBetter: true }, { label: 'Sanitasi Layak', value: 67, unit: '%', nationalAverage: 75, higherIsBetter: true }] }
        },
        historicalRisk: [ { month: 'Jan', score: 69 }, { month: 'Feb', score: 70 }, { month: 'Mar', score: 70 }, { month: 'Apr', score: 71 }, { month: 'May', score: 71 }, { month: 'Jun', score: 71 }]
    },
    'kalimantan-timur': {
        id: 'kalimantan-timur', name: 'Kalimantan Timur', overallRisk: 55, population: 3766019, activeAlertsCount: 1,
        domains: {
            Kesehatan: { riskScore: 56, metrics: [{ label: 'Cakupan Imunisasi', value: 90, unit: '%', nationalAverage: 85, higherIsBetter: true }, { label: 'Prevalensi ISPA', value: 15, unit: '%', nationalAverage: 15, higherIsBetter: false }] },
            Gizi: { riskScore: 58, metrics: [{ label: 'Prevalensi Stunting', value: 23, unit: '%', nationalAverage: 28, higherIsBetter: false }, { label: 'Gizi Buruk', value: 5, unit: '%', nationalAverage: 7, higherIsBetter: false }] },
            Pengasuhan: { riskScore: 52, metrics: [{ label: 'Akses PAUD', value: 79, unit: '%', nationalAverage: 70, higherIsBetter: true }, { label: 'Kualitas Pola Asuh', value: 71, unit: '', nationalAverage: 65, higherIsBetter: true }] },
            Perlindungan: { riskScore: 54, metrics: [{ label: 'Akta Kelahiran', value: 96, unit: '%', nationalAverage: 90, higherIsBetter: true }, { label: 'Kasus Kekerasan', value: 125, unit: 'kasus', nationalAverage: 150, higherIsBetter: false }] },
            Kesejahteraan: { riskScore: 57, metrics: [{ label: 'Akses Air Bersih', value: 89, unit: '%', nationalAverage: 80, higherIsBetter: true }, { label: 'Sanitasi Layak', value: 84, unit: '%', nationalAverage: 75, higherIsBetter: true }] }
        },
        historicalRisk: [ { month: 'Jan', score: 58 }, { month: 'Feb', score: 57 }, { month: 'Mar', score: 56 }, { month: 'Apr', score: 55 }, { month: 'May', score: 55 }, { month: 'Jun', score: 55 }]
    },
    'kalimantan-utara': {
        id: 'kalimantan-utara', name: 'Kalimantan Utara', overallRisk: 48, population: 701814, activeAlertsCount: 0,
        domains: {
            Kesehatan: { riskScore: 50, metrics: [{ label: 'Cakupan Imunisasi', value: 91, unit: '%', nationalAverage: 85, higherIsBetter: true }, { label: 'Prevalensi ISPA', value: 13, unit: '%', nationalAverage: 15, higherIsBetter: false }] },
            Gizi: { riskScore: 52, metrics: [{ label: 'Prevalensi Stunting', value: 21, unit: '%', nationalAverage: 28, higherIsBetter: false }, { label: 'Gizi Buruk', value: 4, unit: '%', nationalAverage: 7, higherIsBetter: false }] },
            Pengasuhan: { riskScore: 46, metrics: [{ label: 'Akses PAUD', value: 81, unit: '%', nationalAverage: 70, higherIsBetter: true }, { label: 'Kualitas Pola Asuh', value: 73, unit: '', nationalAverage: 65, higherIsBetter: true }] },
            Perlindungan: { riskScore: 49, metrics: [{ label: 'Akta Kelahiran', value: 93, unit: '%', nationalAverage: 90, higherIsBetter: true }, { label: 'Kasus Kekerasan', value: 115, unit: 'kasus', nationalAverage: 150, higherIsBetter: false }] },
            Kesejahteraan: { riskScore: 51, metrics: [{ label: 'Akses Air Bersih', value: 86, unit: '%', nationalAverage: 80, higherIsBetter: true }, { label: 'Sanitasi Layak', value: 80, unit: '%', nationalAverage: 75, higherIsBetter: true }] }
        },
        historicalRisk: [ { month: 'Jan', score: 51 }, { month: 'Feb', score: 50 }, { month: 'Mar', score: 49 }, { month: 'Apr', score: 48 }, { month: 'May', score: 48 }, { month: 'Jun', score: 48 }]
    },
    'sulawesi-barat': {
        id: 'sulawesi-barat', name: 'Sulawesi Barat', overallRisk: 70, population: 1419229, activeAlertsCount: 1,
        domains: {
            Kesehatan: { riskScore: 71, metrics: [{ label: 'Cakupan Imunisasi', value: 77, unit: '%', nationalAverage: 85, higherIsBetter: true }, { label: 'Prevalensi ISPA', value: 20, unit: '%', nationalAverage: 15, higherIsBetter: false }] },
            Gizi: { riskScore: 75, metrics: [{ label: 'Prevalensi Stunting', value: 34, unit: '%', nationalAverage: 28, higherIsBetter: false }, { label: 'Gizi Buruk', value: 10, unit: '%', nationalAverage: 7, higherIsBetter: false }] },
            Pengasuhan: { riskScore: 72, metrics: [{ label: 'Akses PAUD', value: 62, unit: '%', nationalAverage: 70, higherIsBetter: true }, { label: 'Kualitas Pola Asuh', value: 61, unit: '', nationalAverage: 65, higherIsBetter: true }] },
            Perlindungan: { riskScore: 68, metrics: [{ label: 'Akta Kelahiran', value: 82, unit: '%', nationalAverage: 90, higherIsBetter: true }, { label: 'Kasus Kekerasan', value: 175, unit: 'kasus', nationalAverage: 150, higherIsBetter: false }] },
            Kesejahteraan: { riskScore: 74, metrics: [{ label: 'Akses Air Bersih', value: 68, unit: '%', nationalAverage: 80, higherIsBetter: true }, { label: 'Sanitasi Layak', value: 64, unit: '%', nationalAverage: 75, higherIsBetter: true }] }
        },
        historicalRisk: [ { month: 'Jan', score: 68 }, { month: 'Feb', score: 69 }, { month: 'Mar', score: 69 }, { month: 'Apr', score: 70 }, { month: 'May', score: 70 }, { month: 'Jun', score: 70 }]
    },
    'sulawesi-selatan': {
        id: 'sulawesi-selatan', name: 'Sulawesi Selatan', overallRisk: 66, population: 9073509, activeAlertsCount: 0,
        domains: {
            Kesehatan: { riskScore: 68, metrics: [{ label: 'Cakupan Imunisasi', value: 82, unit: '%', nationalAverage: 85, higherIsBetter: true }, { label: 'Prevalensi ISPA', value: 19, unit: '%', nationalAverage: 15, higherIsBetter: false }] },
            Gizi: { riskScore: 70, metrics: [{ label: 'Prevalensi Stunting', value: 29, unit: '%', nationalAverage: 28, higherIsBetter: false }, { label: 'Gizi Buruk', value: 9, unit: '%', nationalAverage: 7, higherIsBetter: false }] },
            Pengasuhan: { riskScore: 60, metrics: [{ label: 'Akses PAUD', value: 68, unit: '%', nationalAverage: 70, higherIsBetter: true }, { label: 'Kualitas Pola Asuh', value: 64, unit: '', nationalAverage: 65, higherIsBetter: true }] },
            Perlindungan: { riskScore: 63, metrics: [{ label: 'Akta Kelahiran', value: 88, unit: '%', nationalAverage: 90, higherIsBetter: true }, { label: 'Kasus Kekerasan', value: 160, unit: 'kasus', nationalAverage: 150, higherIsBetter: false }] },
            Kesejahteraan: { riskScore: 65, metrics: [{ label: 'Akses Air Bersih', value: 75, unit: '%', nationalAverage: 80, higherIsBetter: true }, { label: 'Sanitasi Layak', value: 70, unit: '%', nationalAverage: 75, higherIsBetter: true }] }
        },
        historicalRisk: [ { month: 'Jan', score: 68 }, { month: 'Feb', score: 67 }, { month: 'Mar', score: 67 }, { month: 'Apr', score: 66 }, { month: 'May', score: 66 }, { month: 'Jun', score: 66 }]
    },
    'sulawesi-tengah': {
        id: 'sulawesi-tengah', name: 'Sulawesi Tengah', overallRisk: 74, population: 2985734, activeAlertsCount: 1,
        domains: {
            Kesehatan: { riskScore: 75, metrics: [{ label: 'Cakupan Imunisasi', value: 74, unit: '%', nationalAverage: 85, higherIsBetter: true }, { label: 'Prevalensi ISPA', value: 22, unit: '%', nationalAverage: 15, higherIsBetter: false }] },
            Gizi: { riskScore: 76, metrics: [{ label: 'Prevalensi Stunting', value: 32, unit: '%', nationalAverage: 28, higherIsBetter: false }, { label: 'Gizi Buruk', value: 11, unit: '%', nationalAverage: 7, higherIsBetter: false }] },
            Pengasuhan: { riskScore: 70, metrics: [{ label: 'Akses PAUD', value: 63, unit: '%', nationalAverage: 70, higherIsBetter: true }, { label: 'Kualitas Pola Asuh', value: 60, unit: '', nationalAverage: 65, higherIsBetter: true }] },
            Perlindungan: { riskScore: 72, metrics: [{ label: 'Akta Kelahiran', value: 83, unit: '%', nationalAverage: 90, higherIsBetter: true }, { label: 'Kasus Kekerasan', value: 185, unit: 'kasus', nationalAverage: 150, higherIsBetter: false }] },
            Kesejahteraan: { riskScore: 79, metrics: [{ label: 'Akses Air Bersih', value: 65, unit: '%', nationalAverage: 80, higherIsBetter: true }, { label: 'Sanitasi Layak', value: 60, unit: '%', nationalAverage: 75, higherIsBetter: true }] }
        },
        historicalRisk: [ { month: 'Jan', score: 72 }, { month: 'Feb', score: 73 }, { month: 'Mar', score: 73 }, { month: 'Apr', score: 74 }, { month: 'May', score: 74 }, { month: 'Jun', score: 74 }]
    },
    'gorontalo': {
        id: 'gorontalo', name: 'Gorontalo', overallRisk: 68, population: 1171681, activeAlertsCount: 0,
        domains: {
            Kesehatan: { riskScore: 69, metrics: [{ label: 'Cakupan Imunisasi', value: 80, unit: '%', nationalAverage: 85, higherIsBetter: true }, { label: 'Prevalensi ISPA', value: 18, unit: '%', nationalAverage: 15, higherIsBetter: false }] },
            Gizi: { riskScore: 72, metrics: [{ label: 'Prevalensi Stunting', value: 33, unit: '%', nationalAverage: 28, higherIsBetter: false }, { label: 'Gizi Buruk', value: 9, unit: '%', nationalAverage: 7, higherIsBetter: false }] },
            Pengasuhan: { riskScore: 65, metrics: [{ label: 'Akses PAUD', value: 67, unit: '%', nationalAverage: 70, higherIsBetter: true }, { label: 'Kualitas Pola Asuh', value: 63, unit: '', nationalAverage: 65, higherIsBetter: true }] },
            Perlindungan: { riskScore: 66, metrics: [{ label: 'Akta Kelahiran', value: 87, unit: '%', nationalAverage: 90, higherIsBetter: true }, { label: 'Kasus Kekerasan', value: 155, unit: 'kasus', nationalAverage: 150, higherIsBetter: false }] },
            Kesejahteraan: { riskScore: 68, metrics: [{ label: 'Akses Air Bersih', value: 74, unit: '%', nationalAverage: 80, higherIsBetter: true }, { label: 'Sanitasi Layak', value: 71, unit: '%', nationalAverage: 75, higherIsBetter: true }] }
        },
        historicalRisk: [ { month: 'Jan', score: 70 }, { month: 'Feb', score: 69 }, { month: 'Mar', score: 69 }, { month: 'Apr', score: 68 }, { month: 'May', score: 68 }, { month: 'Jun', score: 68 }]
    },
    'maluku': {
        id: 'maluku', name: 'Maluku', overallRisk: 78, population: 1848923, activeAlertsCount: 1,
        domains: {
            Kesehatan: { riskScore: 79, metrics: [{ label: 'Cakupan Imunisasi', value: 72, unit: '%', nationalAverage: 85, higherIsBetter: true }, { label: 'Prevalensi ISPA', value: 23, unit: '%', nationalAverage: 15, higherIsBetter: false }] },
            Gizi: { riskScore: 85, metrics: [{ label: 'Prevalensi Stunting', value: 36, unit: '%', nationalAverage: 28, higherIsBetter: false }, { label: 'Gizi Buruk', value: 13, unit: '%', nationalAverage: 7, higherIsBetter: false }] },
            Pengasuhan: { riskScore: 74, metrics: [{ label: 'Akses PAUD', value: 60, unit: '%', nationalAverage: 70, higherIsBetter: true }, { label: 'Kualitas Pola Asuh', value: 58, unit: '', nationalAverage: 65, higherIsBetter: true }] },
            Perlindungan: { riskScore: 76, metrics: [{ label: 'Akta Kelahiran', value: 81, unit: '%', nationalAverage: 90, higherIsBetter: true }, { label: 'Kasus Kekerasan', value: 195, unit: 'kasus', nationalAverage: 150, higherIsBetter: false }] },
            Kesejahteraan: { riskScore: 80, metrics: [{ label: 'Akses Air Bersih', value: 68, unit: '%', nationalAverage: 80, higherIsBetter: true }, { label: 'Sanitasi Layak', value: 62, unit: '%', nationalAverage: 75, higherIsBetter: true }] }
        },
        historicalRisk: [ { month: 'Jan', score: 76 }, { month: 'Feb', score: 77 }, { month: 'Mar', score: 77 }, { month: 'Apr', score: 78 }, { month: 'May', score: 78 }, { month: 'Jun', score: 78 }]
    },
    'maluku-utara': {
        id: 'maluku-utara', name: 'Maluku Utara', overallRisk: 75, population: 1282937, activeAlertsCount: 0,
        domains: {
            Kesehatan: { riskScore: 78, metrics: [{ label: 'Cakupan Imunisasi', value: 73, unit: '%', nationalAverage: 85, higherIsBetter: true }, { label: 'Prevalensi ISPA', value: 21, unit: '%', nationalAverage: 15, higherIsBetter: false }] },
            Gizi: { riskScore: 80, metrics: [{ label: 'Prevalensi Stunting', value: 35, unit: '%', nationalAverage: 28, higherIsBetter: false }, { label: 'Gizi Buruk', value: 12, unit: '%', nationalAverage: 7, higherIsBetter: false }] },
            Pengasuhan: { riskScore: 72, metrics: [{ label: 'Akses PAUD', value: 61, unit: '%', nationalAverage: 70, higherIsBetter: true }, { label: 'Kualitas Pola Asuh', value: 59, unit: '', nationalAverage: 65, higherIsBetter: true }] },
            Perlindungan: { riskScore: 73, metrics: [{ label: 'Akta Kelahiran', value: 82, unit: '%', nationalAverage: 90, higherIsBetter: true }, { label: 'Kasus Kekerasan', value: 190, unit: 'kasus', nationalAverage: 150, higherIsBetter: false }] },
            Kesejahteraan: { riskScore: 77, metrics: [{ label: 'Akses Air Bersih', value: 69, unit: '%', nationalAverage: 80, higherIsBetter: true }, { label: 'Sanitasi Layak', value: 63, unit: '%', nationalAverage: 75, higherIsBetter: true }] }
        },
        historicalRisk: [ { month: 'Jan', score: 73 }, { month: 'Feb', score: 74 }, { month: 'Mar', score: 74 }, { month: 'Apr', score: 75 }, { month: 'May', score: 75 }, { month: 'Jun', score: 75 }]
    },
    'papua': {
        id: 'papua', name: 'Papua', overallRisk: 82, population: 4303707, activeAlertsCount: 1,
        domains: {
            Kesehatan: { riskScore: 85, metrics: [{ label: 'Cakupan Imunisasi', value: 65, unit: '%', nationalAverage: 85, higherIsBetter: true }, { label: 'Prevalensi ISPA', value: 25, unit: '%', nationalAverage: 15, higherIsBetter: false }] },
            Gizi: { riskScore: 80, metrics: [{ label: 'Prevalensi Stunting', value: 35, unit: '%', nationalAverage: 28, higherIsBetter: false }, { label: 'Gizi Buruk', value: 12, unit: '%', nationalAverage: 7, higherIsBetter: false }] },
            Pengasuhan: { riskScore: 78, metrics: [{ label: 'Akses PAUD', value: 40, unit: '%', nationalAverage: 70, higherIsBetter: true }, { label: 'Kualitas Pola Asuh', value: 50, unit: '', nationalAverage: 65, higherIsBetter: true }] },
            Perlindungan: { riskScore: 75, metrics: [{ label: 'Akta Kelahiran', value: 70, unit: '%', nationalAverage: 90, higherIsBetter: true }, { label: 'Kasus Kekerasan', value: 250, unit: 'kasus', nationalAverage: 150, higherIsBetter: false }] },
            Kesejahteraan: { riskScore: 88, metrics: [{ label: 'Akses Air Bersih', value: 50, unit: '%', nationalAverage: 80, higherIsBetter: true }, { label: 'Sanitasi Layak', value: 45, unit: '%', nationalAverage: 75, higherIsBetter: true }] }
        },
        historicalRisk: [ { month: 'Jan', score: 78 }, { month: 'Feb', score: 79 }, { month: 'Mar', score: 80 }, { month: 'Apr', score: 81 }, { month: 'May', score: 82 }, { month: 'Jun', score: 82 }]
    },
};


export const getRegionDetails = (regionId: string): RegionDetailData | null => {
    return regionsDetails[regionId] || null;
}

export const getAvailableRegions = () => {
    return Object.values(regionsDetails).map(r => ({ id: r.id, name: r.name }));
}

// --- Dynamic Regional Forecast Data ---
const generateRegionalForecastData = (): RegionalForecastData[] => {
    const allForecasts: RegionalForecastData[] = [];
    let idCounter = 1;

    const getRiskLevel = (score: number): 'Kritis' | 'Tinggi' | 'Sedang' | 'Rendah' => {
        if (score > 85) return 'Kritis';
        if (score > 70) return 'Tinggi';
        if (score > 55) return 'Sedang';
        return 'Rendah';
    };

    Object.values(regionsDetails).forEach(region => {
        (Object.keys(region.domains) as Domain[]).forEach(domain => {
            const currentRisk = region.domains[domain].riskScore;
            
            // Domain-specific volatility
            const domainVolatility: Record<Domain, number> = {
                'Kesehatan': 6,
                'Gizi': 8,
                'Pengasuhan': 4,
                'Perlindungan': 3,
                'Kesejahteraan': 5
            };

            // Base trend on current risk (higher risk tends to be more volatile)
            const baseTrend = (currentRisk - 50) / 10; 
            
            // Add some randomness
            const randomFactor = (Math.random() - 0.5) * domainVolatility[domain];

            let change = baseTrend + randomFactor;

            const predictedRisk = Math.max(0, Math.min(100, currentRisk + change));

            allForecasts.push({
                id: idCounter++,
                region: region.name,
                domain: domain,
                currentRisk: currentRisk,
                predictedRisk: parseFloat(predictedRisk.toFixed(1)),
                change: parseFloat(change.toFixed(1)),
                currentRiskLevel: getRiskLevel(currentRisk),
                predictedRiskLevel: getRiskLevel(predictedRisk),
            });
        });
    });
    return allForecasts;
};

export const regionalForecastData: RegionalForecastData[] = generateRegionalForecastData();


// --- Mock Data for EWS Per Bidang (Dynamically Generated) ---
const getPerformanceForDomain = (domain: Domain): RegionPerformance[] => {
    return Object.values(regionsDetails).map(regionDetail => {
        const domainMetrics = regionDetail.domains[domain];
        const history = regionDetail.historicalRisk;
        const trend = history.length > 1 ? history[history.length - 1].score - history[history.length - 2].score : 0;
        
        return {
            id: regionDetail.id,
            name: regionDetail.name,
            riskScore: domainMetrics.riskScore,
            trend: trend,
        };
    });
};

const generateDomainData = (domain: Domain): DomainData => {
    const regionsInDomain = getPerformanceForDomain(domain);
    const totalRisk = regionsInDomain.reduce((acc, r) => acc + r.riskScore, 0);
    const averageRisk = regionsInDomain.length > 0 ? totalRisk / regionsInDomain.length : 0;
    const criticalRegionsCount = regionsInDomain.filter(r => r.riskScore > 70).length;
    const topAlerts = allActiveAlerts
        .filter(a => a.domain === domain)
        .sort((a, b) => b.riskScore - a.riskScore)
        .slice(0, 3);

    const indicators: DomainIndicatorData[] = [];
    const indicatorLabels = new Set<string>();
    
    Object.values(regionsDetails).forEach(region => {
        region.domains[domain].metrics.forEach(metric => {
            indicatorLabels.add(metric.label);
        });
    });

    indicatorLabels.forEach(label => {
        const performers: { name: string; value: number }[] = [];
        let nationalAverage = 0;
        let unit = '';
        let higherIsBetter = true;

        Object.values(regionsDetails).forEach(region => {
            const metric = region.domains[domain].metrics.find(m => m.label === label);
            if (metric && typeof metric.value === 'number') {
                performers.push({ name: region.name, value: metric.value });
                nationalAverage = metric.nationalAverage;
                unit = metric.unit;
                higherIsBetter = metric.higherIsBetter;
            }
        });

        if (performers.length > 0) {
            performers.sort((a, b) => {
                return higherIsBetter ? b.value - a.value : a.value - b.value;
            });

            const best = performers[0];
            const worst = performers[performers.length - 1];

            indicators.push({
                indicatorName: label,
                nationalAverage: `${nationalAverage}${unit}`,
                bestPerformer: { name: best.name, value: `${best.value}${unit}` },
                worstPerformer: { name: worst.name, value: `${worst.value}${unit}` }
            });
        }
    });

    return {
        id: domain,
        name: domain,
        averageRisk: parseFloat(averageRisk.toFixed(1)),
        criticalRegionsCount,
        regions: regionsInDomain,
        topAlerts,
        indicators,
    };
};

export const domainsData: Record<string, DomainData> = {
    'Kesehatan': generateDomainData('Kesehatan'),
    'Gizi': generateDomainData('Gizi'),
    'Pengasuhan': generateDomainData('Pengasuhan'),
    'Perlindungan': generateDomainData('Perlindungan'),
    'Kesejahteraan': generateDomainData('Kesejahteraan'),
};


export const getDomainData = (domainId: string): DomainData | null => {
    return domainsData[domainId] || null;
}


// --- Mock Data for Data Processing ---
export const dataSources: DataSource[] = [
    { id: 'kemenkes-imunisasi', name: 'Kemenkes - Imunisasi API', status: 'connected', lastSync: '5 minutes ago' },
    { id: 'kemenkes-stunting', name: 'Kemenkes - Data Stunting', status: 'connected', lastSync: '15 minutes ago' },
    { id: 'bps-demografi', name: 'BPS - Data Demografi', status: 'connected', lastSync: '6 hours ago' },
    { id: 'kemendikbud-paud', name: 'Kemendikbud - Akses PAUD', status: 'delayed', lastSync: '2 days ago' },
    { id: 'kemensos-pkh', name: 'Kemensos - Data PKH', status: 'error', lastSync: '1 day ago' },
    { id: 'internal-survey', name: 'Internal - PAUD Survey', status: 'connected', lastSync: '1 hour ago' },
];

export const processingLogs: LogEntry[] = [
    { timestamp: '10:15:02', level: 'INFO', message: 'Data processing pipeline finished successfully.' },
    { timestamp: '10:15:01', level: 'INFO', message: 'Risk scores recalculated for 514 regions.' },
    { timestamp: '10:12:35', level: 'INFO', message: 'Successfully fetched 15,234 new records from Kemenkes - Imunisasi API.' },
    { timestamp: '10:10:11', level: 'WARN', message: 'Kemendikbud - Akses PAUD API response delayed. Using cached data.' },
    { timestamp: '10:09:45', level: 'INFO', message: 'Aggregating regional data for Papua.' },
    { timestamp: '10:08:19', level: 'ERROR', message: 'Failed to connect to Kemensos - Data PKH API. Endpoint timeout.' },
    { timestamp: '10:05:00', level: 'INFO', message: 'Starting daily data aggregation job...' },
];


// --- Mock Data for Intervention Management ---
export const mockInterventionPlans: InterventionPlan[] = [
    {
        id: 'plan-001',
        title: 'Program Kejar Imunisasi Mobile',
        description: 'Meluncurkan unit imunisasi mobile untuk menjangkau desa-desa terpencil di Papua.',
        region: 'Papua',
        domain: 'Kesehatan',
        status: InterventionStatus.Active,
        priority: InterventionPriority.High,
        startDate: '2024-07-01',
        endDate: '2024-12-31',
        budget: 500000000,
        kpi: 'Meningkatkan cakupan imunisasi dasar lengkap (IDL) dari 65% menjadi 80%',
        actionItems: [
            { id: 'ai-1-1', text: 'Pengadaan 2 unit mobil operasional', completed: true },
            { id: 'ai-1-2', text: 'Rekrutmen 4 tenaga kesehatan lapangan', completed: true },
            { id: 'ai-1-3', text: 'Sosialisasi program dengan kepala suku', completed: false },
            { id: 'ai-1-4', text: 'Pelaksanaan imunisasi gelombang pertama', completed: false },
        ],
        relatedAlertId: 'alert-1'
    },
    {
        id: 'plan-002',
        title: 'Penanganan Lonjakan Stunting NTT',
        description: 'Intervensi gizi spesifik dan sensitif untuk menekan angka stunting di NTT.',
        region: 'Nusa Tenggara Timur',
        domain: 'Gizi',
        status: InterventionStatus.Active,
        priority: InterventionPriority.High,
        startDate: '2024-06-15',
        endDate: '2025-01-15',
        budget: 1200000000,
        kpi: 'Menurunkan prevalensi stunting sebesar 5% di 3 kabupaten prioritas',
        actionItems: [
            { id: 'ai-2-1', text: 'Distribusi 10,000 paket PMT', completed: true },
            { id: 'ai-2-2', text: 'Pelatihan 500 kader Posyandu tentang PM-TBA', completed: true },
            { id: 'ai-2-3', text: 'Kampanye media tentang 1000 HPK', completed: false },
        ],
        relatedAlertId: 'alert-3'
    },
    {
        id: 'plan-005',
        title: 'Pemberian Tablet Tambah Darah (TTD) Ibu Hamil',
        description: 'Program pemberian TTD dan edukasi gizi untuk menekan anemia pada ibu hamil di NTB.',
        region: 'Nusa Tenggara Barat',
        domain: 'Gizi',
        status: InterventionStatus.Planning,
        priority: InterventionPriority.High,
        startDate: '2024-08-01',
        endDate: '2025-02-01',
        budget: 450000000,
        kpi: 'Menurunkan prevalensi anemia pada ibu hamil sebesar 10%',
        actionItems: [
            { id: 'ai-5-1', text: 'Koordinasi dengan Dinas Kesehatan Provinsi', completed: false },
            { id: 'ai-5-2', text: 'Pengadaan 50,000 strip TTD', completed: false },
            { id: 'ai-5-3', text: 'Pelatihan Bidan dan Kader', completed: false },
        ],
        relatedAlertId: 'alert-10'
    },
    {
        id: 'plan-003',
        title: 'Peningkatan Kualitas Sanitasi',
        description: 'Program pembangunan sanitasi layak dan edukasi PHBS di Aceh.',
        region: 'Aceh',
        domain: 'Kesejahteraan',
        status: InterventionStatus.Planning,
        priority: InterventionPriority.Medium,
        startDate: '2024-09-01',
        endDate: '2025-03-01',
        budget: 350000000,
        kpi: 'Meningkatkan akses sanitasi layak sebesar 10% di wilayah target',
        actionItems: [
            { id: 'ai-3-1', text: 'Pemetaan wilayah dengan sanitasi buruk', completed: false },
            { id: 'ai-3-2', text: 'Rapat koordinasi dengan dinas PUPR', completed: false },
        ],
        relatedAlertId: 'alert-6'
    },
     {
        id: 'plan-004',
        title: 'Gerakan Rumah Bebas Asap',
        description: 'Kampanye dan edukasi untuk mengurangi paparan asap rokok pada anak.',
        region: 'Jawa Barat',
        domain: 'Kesehatan',
        status: InterventionStatus.Completed,
        priority: InterventionPriority.Medium,
        startDate: '2024-01-10',
        endDate: '2024-06-10',
        budget: 150000000,
        kpi: 'Mencapai 50 RT/RW percontohan bebas asap rokok di dalam rumah',
        actionItems: [
            { id: 'ai-4-1', text: 'Workshop dengan tokoh masyarakat', completed: true },
            { id: 'ai-4-2', text: 'Distribusi materi edukasi', completed: true },
            { id: 'ai-4-3', text: 'Monitoring dan evaluasi akhir', completed: true },
        ],
        relatedAlertId: 'alert-2'
    },
];

export const regionalRiskScores: RegionalRiskScore[] = Object.values(regionsDetails).map(r => ({ name: r.name, score: r.overallRisk }));

// --- Mock Data for Resource Allocation ---
export const mockResourceData: ResourceData = {
    sdm: [
        { name: 'Tenaga Kesehatan', unit: 'orang', current: 2500, forecast: 3000, needed: 500, color: 'text-blue-500' },
        { name: 'Kader Posyandu', unit: 'orang', current: 15000, forecast: 18000, needed: 3000, color: 'text-blue-500' },
        { name: 'Guru PAUD', unit: 'orang', current: 8000, forecast: 9000, needed: 1000, color: 'text-blue-500' },
        { name: 'Ahli Gizi', unit: 'orang', current: 850, forecast: 1200, needed: 350, color: 'text-blue-500' },
    ],
    anggaran: [
        { name: 'Operasional', unit: 'Miliar IDR', current: 150, forecast: 180, needed: 30, color: 'text-emerald-500' },
        { name: 'Program Gizi', unit: 'Miliar IDR', current: 240, forecast: 300, needed: 60, color: 'text-emerald-500' },
        { name: 'Program Kesehatan', unit: 'Miliar IDR', current: 220, forecast: 260, needed: 40, color: 'text-emerald-500' },
        { name: 'Edukasi & Sosialisasi', unit: 'Miliar IDR', current: 80, forecast: 100, needed: 20, color: 'text-emerald-500' },
    ],
    material: [
        { name: 'Paket PMT', unit: 'paket', current: 500000, forecast: 600000, needed: 100000, color: 'text-amber-500' },
        { name: 'Vaksin Lengkap', unit: 'dosis', current: 2500000, forecast: 3000000, needed: 500000, color: 'text-amber-500' },
        { name: 'APE Kit', unit: 'kit', current: 30000, forecast: 36000, needed: 6000, color: 'text-amber-500' },
        { name: 'Buku KIA', unit: 'buku', current: 1000000, forecast: 1200000, needed: 200000, color: 'text-amber-500' },
    ]
};

// --- Mock Data for Parent Dashboard ---
export const mockParentData: ParentData = {
    childProfile: {
        name: 'Budi',
        age: '2 tahun 3 bulan',
        avatarUrl: 'https://i.pravatar.cc/150?u=budi',
        lastWeight: 12.5,
        lastHeight: 88,
    },
    upcomingEvents: [
        { id: 'ev1', title: 'Imunisasi DPT-HB-Hib 4', dueDate: '2024-08-15', type: 'immunization' },
        { id: 'ev2', title: 'Penimbangan Posyandu Melati', dueDate: '2024-08-25', type: 'posyandu' },
    ],
    growthHistory: [
        { ageInMonths: 18, weight: 10.9, height: 82 },
        { ageInMonths: 21, weight: 11.8, height: 85 },
        { ageInMonths: 24, weight: 12.1, height: 87 },
        { ageInMonths: 27, weight: 12.5, height: 88 },
    ],
    stimulationChecklist: [
        { id: 'stim1', text: 'Berlari tanpa sering jatuh', completed: true, ageGroup: '24-36 bulan', category: 'Motorik Kasar' },
        { id: 'stim2', text: 'Menendang bola', completed: true, ageGroup: '24-36 bulan', category: 'Motorik Kasar' },
        { id: 'stim3', text: 'Menyusun menara 4-6 balok', completed: true, ageGroup: '24-36 bulan', category: 'Motorik Halus' },
        { id: 'stim4', text: 'Mencoret-coret dengan pensil/krayon', completed: false, ageGroup: '24-36 bulan', category: 'Motorik Halus' },
        { id: 'stim5', text: 'Menggunakan 2-3 kata dalam kalimat', completed: true, ageGroup: '24-36 bulan', category: 'Bahasa' },
        { id: 'stim6', text: 'Menyebut nama sendiri', completed: false, ageGroup: '24-36 bulan', category: 'Bahasa' },
        { id: 'stim7', text: 'Meniru pekerjaan rumah tangga', completed: true, ageGroup: '24-36 bulan', category: 'Sosial & Emosional' },
    ],
};