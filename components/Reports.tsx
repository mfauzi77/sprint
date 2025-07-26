import React, { useState } from 'react';
import ReportGenerator from './reports/ReportGenerator';
import ReportDisplay from './reports/ReportDisplay';
import { ReportParams, ReportData, RegionDetailData } from '../types';
import { getRegionDetails } from '../services/mockData';
import { getRegionalAnalysisInsight } from '../services/geminiService';

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
            let regionData: RegionDetailData | null = null;
            let aiSummary: string | undefined = undefined;

            if (params.type === 'regional-deep-dive' && params.regionId) {
                regionData = getRegionDetails(params.regionId);
                if (regionData) {
                    title = `Laporan Analisis Mendalam Wilayah: ${regionData.name}`;
                    aiSummary = await getRegionalAnalysisInsight(regionData);
                } else {
                    throw new Error(`Data untuk wilayah dengan ID ${params.regionId} tidak ditemukan.`);
                }
            } else {
                 throw new Error('Jenis laporan ini belum diimplementasikan.');
            }
            
            const generatedReport: ReportData = {
                params,
                title,
                generatedAt: new Date().toLocaleString('id-ID', { dateStyle: 'full', timeStyle: 'long' }),
                regionData: regionData || undefined,
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
