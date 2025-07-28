import React, { useState } from 'react';
import ReportGenerator from './reports/ReportGenerator';
import ReportDisplay from './reports/ReportDisplay';
import { ReportParams, ReportData, RegionDetailData, MonthlySummaryData, DomainComparisonData, Domain, DomainData } from '../types';
import { getRegionDetails, keyIndicatorsByDomain, domainsData, regionalForecastData } from '../services/mockData';
import { getRegionalAnalysisInsight, getMonthlyPerformanceInsight, getDomainComparisonInsight } from '../services/geminiService';

const Reports: React.FC = () => {
    const [reportData, setReportData] = useState<ReportData | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleGenerateReport = async (params: ReportParams) => {
        setIsLoading(true);
        setError(null);
        setReportData(null);

        try {
            let title = '';
            let regionData: RegionDetailData | undefined;
            let monthlySummary: MonthlySummaryData | undefined;
            let domainComparisonData: DomainComparisonData | undefined;
            let aiSummary: string | undefined;

            switch (params.type) {
                case 'regional-deep-dive':
                    if (!params.regionId) throw new Error('Wilayah harus dipilih untuk laporan ini.');
                    regionData = getRegionDetails(params.regionId) ?? undefined;
                    if (regionData) {
                        title = `Laporan Analisis Mendalam Wilayah: ${regionData.name}`;
                        aiSummary = await getRegionalAnalysisInsight(regionData);
                    } else {
                        throw new Error(`Data untuk wilayah dengan ID ${params.regionId} tidak ditemukan.`);
                    }
                    break;

                case 'monthly-performance':
                    if (!params.month) throw new Error('Bulan dan tahun harus dipilih untuk laporan ini.');
                    const monthName = new Date(params.month + '-02').toLocaleString('id-ID', { month: 'long', year: 'numeric' });
                    title = `Laporan Kinerja Nasional: ${monthName}`;

                    // Mock data generation for the selected month
                    monthlySummary = {
                        keyIndicators: keyIndicatorsByDomain['Semua'].map(ind => ({ ...ind, value: (parseFloat(ind.value) * (0.98 + Math.random() * 0.04)).toFixed(1) + (ind.value.includes('%') ? '%' : '') })),
                        topImprovingRegions: [...regionalForecastData].sort((a,b) => a.change - b.change).slice(0,5).map(r => ({id: r.id.toString(), name: r.region, riskScore: r.currentRisk, trend: r.change})),
                        topWorseningRegions: [...regionalForecastData].sort((a,b) => b.change - a.change).slice(0,5).map(r => ({id: r.id.toString(), name: r.region, riskScore: r.currentRisk, trend: r.change})),
                        nationalRisk: {
                            score: 65 + (Math.random() - 0.5) * 5,
                            change: (Math.random() - 0.5) * 2,
                        }
                    };
                    aiSummary = await getMonthlyPerformanceInsight(monthName, monthlySummary);
                    break;
                
                case 'domain-comparison':
                    title = `Laporan Perbandingan Antar Domain Tahun ${params.year}`;
                    domainComparisonData = {
                        stats: (Object.values(domainsData) as DomainData[]).map(d => {
                            const sortedRegions = [...d.regions].sort((a, b) => a.riskScore - b.riskScore);
                            return {
                                domain: d.id,
                                averageRisk: d.averageRisk,
                                criticalRegionsCount: d.criticalRegionsCount,
                                bestPerformer: sortedRegions[0],
                                worstPerformer: sortedRegions[sortedRegions.length - 1],
                            };
                        })
                    };
                    aiSummary = await getDomainComparisonInsight(params.year || new Date().getFullYear(), domainComparisonData);
                    break;

                default:
                    throw new Error('Jenis laporan ini belum diimplementasikan.');
            }
            
            const generatedReport: ReportData = {
                params,
                title,
                generatedAt: new Date().toLocaleString('id-ID', { dateStyle: 'full', timeStyle: 'long' }),
                regionData,
                monthlySummary,
                domainComparisonData,
                aiSummary,
            };

            setReportData(generatedReport);

        } catch (e: any) {
            console.error("Failed to generate report:", e);
            setError(e.message || "Terjadi kesalahan saat membuat laporan.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col lg:flex-row gap-6 h-full print:block">
            {/* Report Generator Panel (hidden on print) */}
            <div className="w-full lg:w-1/3 xl:w-1/4 flex-shrink-0 print:hidden">
                <div className="bg-white p-6 rounded-lg shadow-sm sticky top-6">
                    <ReportGenerator onGenerate={handleGenerateReport} isLoading={isLoading} />
                </div>
            </div>

            {/* Report Display Panel */}
            <div className="flex-grow bg-white p-6 md:p-8 rounded-lg shadow-sm">
                <ReportDisplay
                    reportData={reportData}
                    isLoading={isLoading}
                    error={error}
                />
            </div>
        </div>
    );
};

export default Reports;
