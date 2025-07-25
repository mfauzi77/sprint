import React from 'react';
import { LightBulbIcon, ArrowPathIcon } from '../icons/Icons';

interface RegionalAnalysisInsightProps {
    isLoading: boolean;
    insight: string | null;
    error: string | null;
    onRegenerate: () => void;
}

const RegionalAnalysisInsight: React.FC<RegionalAnalysisInsightProps> = ({ isLoading, insight, error, onRegenerate }) => {
    
    const renderContent = () => {
        if (isLoading) {
            return (
                <div className="flex flex-col items-center justify-center h-48">
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-500"></div>
                    <p className="mt-4 text-gray-600 text-sm">Menganalisis pola & ketergantungan data...</p>
                </div>
            );
        }

        if (error) {
            return <p className="text-red-500 text-center">{error}</p>;
        }

        if (insight) {
            return (
                <div 
                    className="prose prose-sm max-w-none text-gray-700"
                    dangerouslySetInnerHTML={{ __html: insight.replace(/\n/g, '<br />') }} 
                />
            );
        }

        return null;
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-slate-800 flex items-center">
                    <LightBulbIcon className="w-6 h-6 mr-2 text-yellow-500" />
                    Analisis Pola & Ketergantungan Data
                </h3>
                <button 
                    onClick={onRegenerate}
                    disabled={isLoading}
                    className="flex items-center px-3 py-1.5 text-xs font-semibold text-indigo-700 bg-indigo-100 rounded-lg hover:bg-indigo-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <ArrowPathIcon className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                    Regenerate
                </button>
            </div>
            <div className="p-4 bg-slate-50 rounded-md min-h-[12rem] flex items-center justify-center">
                {renderContent()}
            </div>
        </div>
    );
};

export default RegionalAnalysisInsight;
