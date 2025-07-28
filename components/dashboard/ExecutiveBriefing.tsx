import React from 'react';
import InsightContainer from '../shared/InsightContainer';
import { LightBulbIcon } from '../icons/Icons';

interface ExecutiveBriefingProps {
    isLoading: boolean;
    briefing: string | null;
    error: string | null;
    onRegenerate: () => void;
}

const ExecutiveBriefing: React.FC<ExecutiveBriefingProps> = (props) => {
    return (
        <InsightContainer
            title="AI Executive Briefing"
            icon={<LightBulbIcon className="w-6 h-6 mr-2 text-yellow-500" />}
            isLoading={props.isLoading}
            error={props.error}
            content={props.briefing}
            onRegenerate={props.onRegenerate}
            loadingText="AI sedang menganalisis data untuk Anda..."
        />
    );
};

export default ExecutiveBriefing;
