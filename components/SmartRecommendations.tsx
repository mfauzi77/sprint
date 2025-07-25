import React, { useState } from 'react';
import RecommendationGenerator from './recommendations/RecommendationGenerator';
import RecommendationDisplay from './recommendations/RecommendationDisplay';
import { RecommendationParams, InterventionPlan, InterventionPriority, InterventionStatus } from '../types';
import { generateGeneralRecommendations } from '../services/geminiService';

interface SmartRecommendationsProps {
    handleOpenInterventionModal: (initialData?: Partial<InterventionPlan>, navigate?: boolean) => void;
}


const SmartRecommendations: React.FC<SmartRecommendationsProps> = ({ handleOpenInterventionModal }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [recommendation, setRecommendation] = useState<string | null>(null);
    const [currentParams, setCurrentParams] = useState<RecommendationParams | null>(null);

    const handleGenerate = async (params: RecommendationParams) => {
        setIsLoading(true);
        setError(null);
        setRecommendation(null);
        setCurrentParams(params);

        try {
            const result = await generateGeneralRecommendations(params);
            setRecommendation(result);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
            setError(`Failed to generate recommendations: ${errorMessage}`);
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleCreatePlan = () => {
        if (!currentParams) return;
        
        const initialData: Partial<InterventionPlan> = {
            title: `Rencana Intervensi untuk ${currentParams.domain} di ${currentParams.region}`,
            description: `Berdasarkan rekomendasi AI untuk ${currentParams.domain} di ${currentParams.region} dengan prioritas risiko ${currentParams.riskLevel}. Kustomisasi: "${currentParams.customPrompt}"`,
            region: currentParams.region === 'All Regions' ? '' : currentParams.region,
            domain: currentParams.domain as any, // Cast because form domain is string, but plan domain is Domain
            priority: InterventionPriority.Medium,
            status: InterventionStatus.Planning
        };
        handleOpenInterventionModal(initialData, true);
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
            <div className="lg:col-span-1 bg-white rounded-lg shadow-sm p-6 h-full flex flex-col">
                <RecommendationGenerator onGenerate={handleGenerate} isLoading={isLoading} />
            </div>
            <div className="lg:col-span-2 bg-white rounded-lg shadow-sm p-6 h-full overflow-y-auto">
                <RecommendationDisplay
                    isLoading={isLoading}
                    error={error}
                    recommendation={recommendation}
                    params={currentParams}
                    onCreatePlan={handleCreatePlan}
                />
            </div>
        </div>
    );
};

export default SmartRecommendations;
