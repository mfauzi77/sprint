import React from 'react';
import { LightBulbIcon, ArrowPathIcon } from '../icons/Icons';

interface ExecutiveBriefingProps {
    isLoading: boolean;
    briefing: string | null;
    error: string | null;
    onRegenerate: () => void;
}

const ExecutiveBriefing: React.FC<ExecutiveBriefingProps> = ({ isLoading, briefing, error, onRegenerate }) => {
    
    const renderContent = () => {
        if (isLoading) {
            return (
                <div className="flex items-center justify-center h-full w-full">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500 mr-4"></div>
                    <p className="text-gray-600 text-sm">AI sedang menganalisis data untuk Anda...</p>
                </div>
            );
        }

        if (error) {
            return <p className="text-red-500 text-center">{error}</p>;
        }

        if (briefing) {
            return (
                <div 
                    className="prose prose-sm max-w-none text-gray-700"
                    dangerouslySetInnerHTML={{ __html: briefing.replace(/\n/g, '<br />') }} 
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
                    AI Executive Briefing
                </h3>
                <button 
                    onClick={onRegenerate}
                    disabled={isLoading}
                    className="flex items-center px-3 py-1.5 text-xs font-semibold text-indigo-700 bg-indigo-100 rounded-lg hover:bg-indigo-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label="Regenerate briefing"
                >
                    <ArrowPathIcon className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                    Regenerate
                </button>
            </div>
            <div className="p-4 bg-slate-50 rounded-md min-h-[10rem] flex">
                {renderContent()}
            </div>
        </div>
    );
};

export default ExecutiveBriefing;
