import React from 'react';
import { ReportData } from '../../types';
import { DocumentChartBarIcon, DocumentArrowDownIcon, CalendarIcon } from '../icons/Icons';
import RegionSummary from '../dataperwilayah/RegionSummary';
import DomainBreakdown from '../dataperwilayah/DomainBreakdown';
import RegionalAnalysisInsight from '../dataperwilayah/RegionalAnalysisInsight';
import RegionalProfileRadarChart from '../dataperwilayah/RegionalProfileRadarChart';
import { domainsData } from '../../services/mockData';

interface ReportDisplayProps {
    reportData: ReportData | null;
    isLoading: boolean;
    error: string | null;
}

const ReportDisplay: React.FC<ReportDisplayProps> = ({ reportData, isLoading, error }) => {

    const handlePrint = () => {
        window.print();
    };

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center h-full text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mb-4"></div>
                <h3 className="text-lg font-semibold text-slate-800">Menyusun Laporan...</h3>
                <p className="text-sm text-slate-500">Mengumpulkan data dan analisis untuk Anda.</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center h-full text-center p-4 bg-red-50 rounded-lg">
                <h3 className="text-lg font-semibold text-red-700">Gagal Membuat Laporan</h3>
                <p className="text-sm text-red-600 mt-1">{error}</p>
            </div>
        );
    }
    
    if (!reportData) {
        return (
            <div className="flex flex-col items-center justify-center h-full text-center text-slate-400">
                <DocumentChartBarIcon className="w-20 h-20 mb-4" />
                <h3 className="text-xl font-semibold text-slate-700">Selamat Datang di Pusat Laporan</h3>
                <p className="mt-1 max-w-md">Gunakan panel di sebelah kiri untuk membuat laporan analisis yang terperinci.</p>
            </div>
        );
    }

    const { params, title, generatedAt, regionData, aiSummary } = reportData;

    const { regionalProfile, nationalProfile } = React.useMemo(() => {
        if (!regionData) return { regionalProfile: [], nationalProfile: [] };
        const regional = Object.entries(regionData.domains).map(([key, value]) => ({ axis: key as any, value: value.riskScore }));
        const national = Object.entries(domainsData).map(([key, value]) => ({ axis: key as any, value: value.averageRisk }));
        return { regionalProfile: regional, nationalProfile: national };
    }, [regionData]);


    return (
        <div id="report-content" className="prose-sm max-w-none">
            {/* Report Header */}
            <div className="flex justify-between items-start pb-4 border-b border-slate-300">
                <div>
                    <p className="text-base font-semibold text-indigo-700">Laporan Analisis SPRINT</p>
                    <h1 className="text-2xl font-bold text-slate-900 mt-1">{title}</h1>
                    <div className="flex items-center text-sm text-slate-500 mt-2">
                        <CalendarIcon className="w-4 h-4 mr-2" />
                        <span>Dibuat pada: {generatedAt}</span>
                    </div>
                </div>
                <div className="print:hidden">
                    <button onClick={handlePrint} className="flex items-center px-4 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-lg shadow-sm hover:bg-indigo-700">
                       <DocumentArrowDownIcon className="w-5 h-5 mr-2" />
                        Export ke PDF
                    </button>
                </div>
            </div>

            {/* Report Body */}
            <div className="mt-8 space-y-10">
                {params.type === 'regional-deep-dive' && regionData && (
                    <>
                        <section>
                            <h2 className="text-lg font-bold text-slate-800 border-b pb-2 mb-4">Ringkasan Wilayah</h2>
                            <RegionSummary data={regionData} />
                        </section>

                        <section>
                            <h2 className="text-lg font-bold text-slate-800 border-b pb-2 mb-4">Profil Risiko vs. Nasional</h2>
                            <div className="p-4 bg-slate-50 rounded-lg not-prose">
                                <RegionalProfileRadarChart 
                                    regionName={regionData.name}
                                    regionalProfile={regionalProfile}
                                    nationalProfile={nationalProfile}
                                />
                            </div>
                        </section>

                        <section>
                             <h2 className="text-lg font-bold text-slate-800 border-b pb-2 mb-4">Analisis AI & Insight</h2>
                             <div className="not-prose">
                                <RegionalAnalysisInsight 
                                    insight={aiSummary || null}
                                    isLoading={false}
                                    error={null}
                                    onRegenerate={() => alert("Fungsi regenerate belum diimplementasikan di sini.")}
                                />
                             </div>
                        </section>

                        <section>
                            <h2 className="text-lg font-bold text-slate-800 border-b pb-2 mb-4">Rincian per Bidang Layanan</h2>
                             <div className="not-prose">
                                <DomainBreakdown domains={regionData.domains} />
                             </div>
                        </section>
                    </>
                )}

                {/* Footer can be added here */}
                 <div className="pt-8 mt-10 text-center text-xs text-slate-400 border-t">
                    <p>Laporan ini dibuat secara otomatis oleh SPRINT (Sistem Prediktif Responsif Terintegrasi)</p>
                    <p>Kementerian Koordinator Bidang Pembangunan Manusia dan Kebudayaan</p>
                </div>
            </div>
        </div>
    );
};

export default ReportDisplay;
