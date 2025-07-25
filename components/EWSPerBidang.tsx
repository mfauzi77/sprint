import React, { useState, useEffect } from 'react';
import { getDomainData, domainsData as allDomains } from '../services/mockData';
import { DomainData } from '../types';
import DomainTabs from './ewsperbidang/DomainTabs';
import DomainSummary from './ewsperbidang/DomainSummary';
import RiskMomentumQuadrant from './ewsperbidang/RiskMomentumQuadrant';
import RegionRankingList from './ewsperbidang/RegionRankingList';
import DomainTopAlerts from './ewsperbidang/DomainTopAlerts';
import DomainIndicatorTable from './ewsperbidang/DomainIndicatorTable';

const EWSPerBidang: React.FC = () => {
    const domainIds = Object.keys(allDomains);
    const [selectedDomainId, setSelectedDomainId] = useState<string>(domainIds[0]);
    const [domainData, setDomainData] = useState<DomainData | null>(null);

    useEffect(() => {
        const data = getDomainData(selectedDomainId);
        setDomainData(data);
    }, [selectedDomainId]);

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-xl font-bold text-slate-800">EWS per Bidang</h2>
                <p className="text-sm text-slate-500 mt-1">Analisis perbandingan risiko antar wilayah untuk setiap bidang layanan.</p>
            </div>
            
            <DomainTabs 
                domains={domainIds}
                selectedDomain={selectedDomainId}
                setSelectedDomain={setSelectedDomainId}
            />

            {domainData ? (
                <div className="space-y-6">
                    <DomainSummary data={domainData} />
                    <DomainIndicatorTable indicators={domainData.indicators} />
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-sm">
                            <RiskMomentumQuadrant regions={domainData.regions} />
                        </div>
                        <div className="lg:col-span-1 bg-white p-6 rounded-lg shadow-sm">
                            <RegionRankingList regions={domainData.regions} />
                        </div>
                    </div>
                     <DomainTopAlerts alerts={domainData.topAlerts} domainName={domainData.name} />
                </div>
            ) : (
                <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                    <p>Pilih bidang untuk menampilkan data.</p>
                </div>
            )}
        </div>
    );
};

export default EWSPerBidang;
