import React from 'react';
import { InterventionPlan, InterventionPriority, ActionItem } from '../../types';
import { FlagIcon, MapIcon, ChartBarIcon } from '../icons/Icons';

interface InterventionCardProps {
    plan: InterventionPlan;
}

const InterventionCard: React.FC<InterventionCardProps> = ({ plan }) => {
    
    const getPriorityStyles = (priority: InterventionPriority) => {
        switch (priority) {
            case InterventionPriority.High: return 'bg-red-100 text-red-800';
            case InterventionPriority.Medium: return 'bg-yellow-100 text-yellow-800';
            case InterventionPriority.Low: return 'bg-emerald-100 text-emerald-800';
        }
    };

    const progress = plan.actionItems.length > 0
        ? (plan.actionItems.filter(item => item.completed).length / plan.actionItems.length) * 100
        : 0;

    return (
        <div className="bg-white rounded-lg shadow-sm p-4 border border-slate-200 hover:shadow-md hover:border-indigo-300 transition-all cursor-pointer">
            <div className="flex justify-between items-start">
                <h4 className="font-bold text-sm text-slate-800 pr-2">{plan.title}</h4>
                <span className={`px-2 py-0.5 text-xs font-bold rounded-full whitespace-nowrap ${getPriorityStyles(plan.priority)}`}>
                    {plan.priority}
                </span>
            </div>
            
            <div className="text-xs text-slate-500 mt-2 space-y-1.5">
                 <div className="flex items-center">
                    <MapIcon className="w-4 h-4 mr-2 text-slate-400" />
                    <span>{plan.region} - {plan.domain}</span>
                </div>
                 <div className="flex items-center">
                    <FlagIcon color="text-slate-400" className="w-4 h-4 mr-2" />
                    <span>Target: {plan.kpi}</span>
                </div>
                 <div className="flex items-center">
                    <ChartBarIcon className="w-4 h-4 mr-2 text-slate-400" />
                    <span>Anggaran: Rp {plan.budget.toLocaleString('id-ID')}</span>
                </div>
            </div>

            <div className="mt-4">
                 <div className="flex justify-between items-center text-xs text-slate-600 mb-1">
                    <span className="font-semibold">Progress</span>
                    <span className="font-bold">{Math.round(progress)}%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                    <div 
                        className="bg-indigo-500 h-2 rounded-full"
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>
            </div>
        </div>
    );
};

export default InterventionCard;
