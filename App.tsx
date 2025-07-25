import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import Forecasting from './components/Forecasting';
import DataPerWilayah from './components/DataPerWilayah';
import EWSPerBidang from './components/EWSPerBidang';
import SmartRecommendations from './components/SmartRecommendations';
import DataProcessing from './components/DataProcessing';
import InterventionManagement from './components/InterventionManagement';
import Placeholder from './components/Placeholder';
import { View, InterventionPlan } from './types';
import ResourceAllocation from './components/ResourceAllocation';
import ParentDashboard from './components/ParentDashboard';
import InterventionFormModal from './components/interventions/InterventionFormModal';
import { mockInterventionPlans } from './services/mockData';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<View>(View.Dashboard);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [interventionPlans, setInterventionPlans] = useState<InterventionPlan[]>(mockInterventionPlans);
  const [isInterventionModalOpen, setIsInterventionModalOpen] = useState(false);
  const [interventionInitialData, setInterventionInitialData] = useState<Partial<InterventionPlan> | null>(null);

  const handleOpenInterventionModal = (initialData: Partial<InterventionPlan> | null = null, navigateToInterventions: boolean = false) => {
    setInterventionInitialData(initialData);
    setIsInterventionModalOpen(true);
    if (navigateToInterventions) {
      setActiveView(View.Intervensi);
    }
  };

  const handleCloseInterventionModal = () => {
    setIsInterventionModalOpen(false);
    setInterventionInitialData(null);
  };

  const handleSaveIntervention = (planData: Omit<InterventionPlan, 'id' | 'actionItems'>) => {
    // This is a simplified save function. In a real app, you'd handle create vs. update.
    const newPlan: InterventionPlan = {
      ...planData,
      id: `plan-${Date.now()}`,
      actionItems: [], // Start with empty action items for new plans
    };
    setInterventionPlans(prevPlans => [newPlan, ...prevPlans]);
    handleCloseInterventionModal();
  };

  const renderContent = () => {
    switch (activeView) {
      case View.Dashboard:
        return <Dashboard handleOpenInterventionModal={handleOpenInterventionModal} />;
      case View.Forecasting:
        return <Forecasting />;
      case View.DataPerWilayah:
        return <DataPerWilayah handleOpenInterventionModal={handleOpenInterventionModal} />;
      case View.EWSPerBidang:
        return <EWSPerBidang />;
      case View.SmartRecommendations:
        return <SmartRecommendations handleOpenInterventionModal={handleOpenInterventionModal} />;
       case View.Intervensi:
        return <InterventionManagement plans={interventionPlans} onOpenModal={handleOpenInterventionModal} />;
      case View.DataProcessing:
        return <DataProcessing />;
      case View.ResourceAllocation:
        return <ResourceAllocation />;
      case View.ParentPortal:
        return <ParentDashboard />;
      default:
        return <Placeholder title={activeView} />;
    }
  };

  return (
    <div className="relative flex h-screen bg-slate-100 font-sans">
      <Sidebar 
        activeView={activeView} 
        setActiveView={setActiveView} 
        isOpen={isSidebarOpen} 
        setIsOpen={setIsSidebarOpen} 
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header setIsSidebarOpen={setIsSidebarOpen} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-slate-100 p-4 md:p-6">
          {renderContent()}
        </main>
      </div>
       <InterventionFormModal
          isOpen={isInterventionModalOpen}
          onClose={handleCloseInterventionModal}
          onSave={handleSaveIntervention}
          initialData={interventionInitialData}
        />
    </div>
  );
};

export default App;
