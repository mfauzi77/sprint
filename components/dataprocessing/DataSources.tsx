
import React from 'react';
import { dataSources } from '../../services/mockData';
import { DataSource, DataSourceStatus } from '../../types';
import { CircleStackIcon } from '../icons/Icons';

const DataSources: React.FC = () => {

    const getStatusStyles = (status: DataSourceStatus): { badge: string, dot: string } => {
        switch (status) {
            case 'connected': return { badge: 'bg-emerald-100 text-emerald-800', dot: 'bg-emerald-500' };
            case 'delayed': return { badge: 'bg-yellow-100 text-yellow-800', dot: 'bg-yellow-500' };
            case 'error': return { badge: 'bg-red-100 text-red-800', dot: 'bg-red-500' };
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center">
                <CircleStackIcon className="w-6 h-6 mr-2 text-indigo-500" />
                Status Sumber Data
            </h3>
            <ul className="space-y-3">
                {dataSources.map(source => {
                    const styles = getStatusStyles(source.status);
                    return (
                         <li key={source.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-md">
                            <div>
                                <p className="font-semibold text-slate-800 text-sm">{source.name}</p>
                                <p className="text-xs text-slate-500">Sinkr. terakhir: {source.lastSync}</p>
                            </div>
                            <div className="flex items-center">
                                 <span className={`px-2 py-0.5 text-xs font-bold rounded-full ${styles.badge}`}>{source.status}</span>
                                 <span className={`w-2.5 h-2.5 rounded-full ml-3 ${styles.dot}`}></span>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default DataSources;
