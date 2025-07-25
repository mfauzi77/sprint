

import React from 'react';

export enum View {
    Dashboard = "Dashboard",
    Forecasting = "Forecasting & Prediction",
    DataPerWilayah = "Data per Wilayah",
    EWSPerBidang = "EWS per Bidang",
    SmartRecommendations = "Smart Recommendations",
    DataProcessing = "Data Processing",
    Intervensi = "Manajemen Intervensi", // Updated Label
    ResourceAllocation = "Resource Allocation",
    Reports = "Reports & Analytics",
    ParentPortal = "Portal Orang Tua"
}

export interface NavItem {
    id: View;
    label: string;
    icon: React.ReactNode;
}

export enum RiskCategory {
    Complete = "Imunisasi Lengkap (>90%)",
    Medium = "Cakupan Sedang (70-90%)",
    Low = "Cakupan Rendah (50-70%)",
    Critical = "Critical (<50%)"
}

export interface RiskAssessmentData {
    category: RiskCategory;
    count: number;
    color: string;
}

export interface KeyIndicatorData {
    value: string;
    label: string;
    change: number;
    changeType: 'increase' | 'decrease' | 'stable';
    domain: Domain | 'Semua';
}

export enum AlertLevel {
    High = "HIGH",
    Medium = "MEDIUM",
    Low = "LOW",
    Critical = "CRITICAL"
}

export type Domain = 'Kesehatan' | 'Gizi' | 'Pengasuhan' | 'Perlindungan' | 'Kesejahteraan';
export type DomainFilter = Domain | 'Semua';


export interface ActiveAlertData {
    id: string;
    level: AlertLevel;
    title: string;
    region: string;
    domain: Domain;
    riskScore: number;
    target?: number;
    trend?: number;
}

export interface ForecastDataPoint {
  month: string;
  actual: number | null;
  predicted: number;
  predicted_upper: number;
  predicted_lower: number;
}

export interface RegionalForecastData {
  id: number;
  region: string;
  domain: string;
  currentRisk: number;
  predictedRisk: number;
  change: number;
  currentRiskLevel: 'Kritis' | 'Tinggi' | 'Sedang' | 'Rendah';
  predictedRiskLevel: 'Kritis' | 'Tinggi' | 'Sedang' | 'Rendah';
}

export type SortKey = keyof RegionalForecastData;

export type SortDirection = 'ascending' | 'descending';

// --- Types for Data Per Wilayah ---
export interface DomainMetric {
    label: string;
    value: string | number;
    unit: string;
    nationalAverage: number;
    higherIsBetter: boolean;
}

export interface DomainMetrics {
    riskScore: number;
    metrics: DomainMetric[];
}

export interface RegionDetailData {
    id: string;
    name: string;
    overallRisk: number;
    population: number;
    activeAlertsCount: number;
    domains: {
        Kesehatan: DomainMetrics;
        Gizi: DomainMetrics;
        Pengasuhan: DomainMetrics;
        Perlindungan: DomainMetrics;
        Kesejahteraan: DomainMetrics;
    };
    historicalRisk: { month: string; score: number }[];
}

export interface RegionalRiskScore {
    name: string;
    score: number;
}

// --- Types for EWS Per Bidang ---
export interface RegionPerformance {
    id: string;
    name: string;
    riskScore: number;
    trend: number; // positive is bad, negative is good
}

export interface DomainIndicatorData {
    indicatorName: string;
    nationalAverage: string;
    bestPerformer: {
        name: string;
        value: string;
    };
    worstPerformer: {
        name:string;
        value: string;
    }
}

export interface DomainData {
    id: 'Kesehatan' | 'Gizi' | 'Pengasuhan' | 'Perlindungan' | 'Kesejahteraan';
    name: string;
    averageRisk: number;
    criticalRegionsCount: number;
    regions: RegionPerformance[];
    topAlerts: ActiveAlertData[];
    indicators: DomainIndicatorData[];
}

// --- Types for Smart Recommendations ---
export type RiskLevelSelection = 'all' | 'high-critical' | 'medium' | 'low';

export interface RecommendationParams {
    domain: string;
    region: string;
    riskLevel: RiskLevelSelection;
    customPrompt: string;
}

// --- Types for Data Processing ---
export type DataSourceStatus = 'connected' | 'delayed' | 'error';
export interface DataSource {
    id: string;
    name: string;
    status: DataSourceStatus;
    lastSync: string;
}

export type LogLevel = 'INFO' | 'WARN' | 'ERROR';
export interface LogEntry {
    timestamp: string;
    level: LogLevel;
    message: string;
}

// --- Types for Intervention Management ---
export enum InterventionStatus {
    Planning = "Perencanaan",
    Active = "Aktif",
    Completed = "Selesai",
    OnHold = "Ditunda"
}

export enum InterventionPriority {
    High = "Tinggi",
    Medium = "Sedang",
    Low = "Rendah"
}

export interface ActionItem {
    id: string;
    text: string;
    completed: boolean;
}

export interface InterventionPlan {
    id: string;
    title: string;
    description: string;
    region: string;
    domain: Domain;
    status: InterventionStatus;
    priority: InterventionPriority;
    startDate: string;
    endDate: string;
    budget: number;
    kpi: string; // Key Performance Indicator
    actionItems: ActionItem[];
    relatedAlertId?: string;
}

// --- Types for Parent Dashboard ---
export interface ChildProfile {
    name: string;
    avatarUrl: string;
    age: string; // e.g., "2 tahun 3 bulan"
    lastWeight: number | null;
    lastHeight: number | null;
}

export interface UpcomingEvent {
    id: string;
    title: string;
    dueDate: string; // YYYY-MM-DD
    type: 'immunization' | 'posyandu';
}

export interface GrowthRecord {
    ageInMonths: number;
    weight: number;
    height: number;
}

export type StimulationCategory = 'Motorik Kasar' | 'Motorik Halus' | 'Bahasa' | 'Sosial & Emosional';

export interface StimulationChecklistItem {
    id: string;
    text: string;
    completed: boolean;
    ageGroup: string; // e.g., "24-36 Bulan"
    category: StimulationCategory;
}

export interface ParentDashboardData {
    childProfile: ChildProfile;
    upcomingEvents: UpcomingEvent[];
    growthHistory: GrowthRecord[];
    stimulationChecklist: StimulationChecklistItem[];
}

// --- Types for Resource Allocation ---
export type ResourceType = 'SDM' | 'Anggaran' | 'Material';

export interface ResourceItem {
    name: string;
    unit: string;
    current: number;
    forecast: number;
    needed: number;
    color: string;
}

export interface ResourceData {
    sdm: ResourceItem[];
    anggaran: ResourceItem[];
    material: ResourceItem[];
}

export interface ScenarioParams {
    budgetChange: number; // percentage
    sdmFocus: 'Kesehatan' | 'Gizi' | 'Semua';
    regionFocus: 'High Risk' | 'All';
}