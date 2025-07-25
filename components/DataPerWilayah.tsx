import React, { useState, useEffect } from 'react';
import { getAvailableRegions, getRegionDetails, nationalHistoricalRisk, allActiveAlerts } from '../services/mockData';
import { getRegionalAnalysisInsight } from '../services/geminiService';
import { RegionDetailData, ActiveAlertData, InterventionPlan, InterventionPriority, InterventionStatus } from '../types';
import RegionSummary from './dataperwilayah/RegionSummary';
import DomainBreakdown from './dataperwilayah/DomainBreakdown';
import RegionalTrendChart from './dataperwilayah/RegionalTrendChart';
import ActiveAlerts from './dashboard/ActiveAlerts';
import RecommendationModal from './dashboard/RecommendationModal';
import RegionalAnalysisInsight from './dataperwilayah/RegionalAnalysisInsight';

interface DataPerWilayahProps {
    handleOpenInterventionModal: (initialData?: Partial<InterventionPlan>, navigate?: boolean) => void;
}

const DataPerWilayah: React.FC<DataPerWilayahProps> = ({ handleOpenInterventionModal }) => {
    const [regions, setRegions] = useState<{id: string, name: string}[]>([]);
    const [selectedRegionId, setSelectedRegionId] = useState<string>('');
    const [regionData, setRegionData] = useState<RegionDetailData | null>(null);
    const [regionalAlerts, setRegionalAlerts] = useState<ActiveAlertData[]>([]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedAlert, setSelectedAlert] = useState<ActiveAlertData | null>(null);

    // New state for regional analysis insight
    const [regionalInsight, setRegionalInsight] = useState<string | null>(null);
    const [isInsightLoading, setIsInsightLoading] = useState(true);
    const [insightError, setInsightError] = useState<string | null>(null);

    useEffect(() => {
        const availableRegions = getAvailableRegions();
        setRegions(availableRegions);
        if (availableRegions.length > 0) {
            setSelectedRegionId(availableRegions[0].id);
        }
    }, []);

    const fetchRegionalInsight = async (data: RegionDetailData) => {
        setIsInsightLoading(true);
        setInsightError(null);
        try {
            const result = await getRegionalAnalysisInsight(data);
            setRegionalInsight(result);
        } catch (err) {
            setInsightError("Gagal memuat analisis AI untuk wilayah ini.");
        } finally {
            setIsInsightLoading(false);
        }
    };

    useEffect(() => {
        if (selectedRegionId) {
            const data = getRegionDetails(selectedRegionId);
            setRegionData(data);
            const alerts = allActiveAlerts.filter(alert => alert.region === data?.name);
            setRegionalAlerts(alerts);
            if (data) {
                fetchRegionalInsight(data);
            }
        }
    }, [selectedRegionId]);

    const handleAnalyzeClick = (alert: ActiveAlertData) => {
        setSelectedAlert(alert);
        setIsModalOpen(true);
    };
    
    const handleCreatePlanFromAlert = (alert: ActiveAlertData) => {
        const initialData: Partial<InterventionPlan> = {
            title: `Rencana Intervensi untuk ${alert.title} di ${alert.region}`,
            description: `Menindaklanjuti alert "${alert.title}" dengan skor risiko ${alert.riskScore}.`,
            region: alert.region,
            domain: alert.domain,
            priority: alert.level === 'CRITICAL' || alert.level === 'HIGH' ? InterventionPriority.High : InterventionPriority.Medium,
            relatedAlertId: alert.id,
            status: InterventionStatus.Planning
        };
        handleOpenInterventionModal(initialData, true);
        setIsModalOpen(false);
    };

    const handleRegenerateInsight = () => {
        if (regionData) {
            fetchRegionalInsight(regionData);
        }
    };

    return (
        <div className="space-y-6">
            <div className="bg-white p-4 rounded-lg shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center">
                <div>
                    <h2 className="text-xl font-bold text-slate-800">Analisis Detail per Wilayah</h2>
                    <p className="text-sm text-slate-500">Pilih wilayah untuk melihat rincian data dan tren risiko.</p>
                </div>
                <div className="mt-4 sm:mt-0 w-full sm:w-auto">
                    <select
                        value={selectedRegionId}
                        onChange={(e) => setSelectedRegionId(e.target.value)}
                        className="bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                        aria-label="Pilih Wilayah"
                    >
                        {regions.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
                    </select>
                </div>
            </div>

            {regionData ? (
                <div className="space-y-6">
                    <RegionSummary data={regionData} />
                    <DomainBreakdown domains={regionData.domains} />

                    <RegionalAnalysisInsight 
                        isLoading={isInsightLoading}
                        insight={regionalInsight}
                        error={insightError}
                        onRegenerate={handleRegenerateInsight}
                    />
                    
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-sm">
                           <RegionalTrendChart 
                                regionName={regionData.name} 
                                regionHistory={regionData.historicalRisk}
                                nationalHistory={nationalHistoricalRisk}
                            />
                        </div>
                        <div className="lg:col-span-1">
                            <ActiveAlerts data={regionalAlerts} onAnalyze={handleAnalyzeClick} onCreatePlan={() => handleOpenInterventionModal({}, true)} />
                        </div>
                    </div>
                </div>
            ) : (
                <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                    <p>Pilih wilayah untuk menampilkan data.</p>
                </div>
            )}
            
            {selectedAlert && (
                 <RecommendationModal 
                    isOpen={isModalOpen} 
                    onClose={() => setIsModalOpen(false)}
                    alert={selectedAlert}
                    onCreatePlan={handleCreatePlanFromAlert}
                 />
            )}
        </div>
    );
};

export default DataPerWilayah;
