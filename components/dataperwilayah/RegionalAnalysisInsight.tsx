import React from 'react';
import InsightContainer from '../shared/InsightContainer';
import { LightBulbIcon } from '../icons/Icons';

interface RegionalAnalysisInsightProps {
    isLoading: boolean;
    insight: string | null;
    error: string | null;
    onRegenerate: () => void;
}

const RegionalAnalysisInsight: React.FC<RegionalAnalysisInsightProps> = (props) => {
    return (
        <InsightContainer
            title="Analisis Pola & Ketergantungan Data"
            icon={<LightBulbIcon className="w-6 h-6 mr-2 text-yellow-500" />}
            isLoading={props.isLoading}
            error={props.error}
            content={props.insight}
            onRegenerate={props.onRegenerate}
            loadingText="Menganalisis pola & ketergantungan data..."
        />
    );
};

export default RegionalAnalysisInsight;
