import React from 'react';
import InsightContainer from '../shared/InsightContainer';
import { LightBulbIcon } from '../icons/Icons';

interface ForecastingInsightProps {
    isLoading: boolean;
    insight: string | null;
    error: string | null;
    onRegenerate: () => void;
}

const ForecastingInsight: React.FC<ForecastingInsightProps> = (props) => {
    return (
        <InsightContainer
            title="Analisis & Insight Otomatis"
            icon={<LightBulbIcon className="w-6 h-6 mr-2 text-yellow-500" />}
            isLoading={props.isLoading}
            error={props.error}
            content={props.insight}
            onRegenerate={props.onRegenerate}
            loadingText="Menganalisis tren dan menghasilkan insight..."
        />
    );
};

export default ForecastingInsight;
