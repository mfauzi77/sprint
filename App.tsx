import React, { useState, useEffect } from 'react';
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
import InterventionFormModal from './components/interventions/InterventionFormModal';
import { mockInterventionPlans } from './services/mockData';
import LandingPage from './components/LandingPage';
import WelcomeScreen from './components/WelcomeScreen';
import Reports from './components/Reports';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showWelcome, setShowWelcome] = useState(false);

  const [activeView, setActiveView] = useState<View>(View.Dashboard);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [interventionPlans, setInterventionPlans] = useState<InterventionPlan[]>(mockInterventionPlans);
  const [isInterventionModalOpen, setIsInterventionModalOpen] = useState(false);
  const [interventionInitialData, setInterventionInitialData] = useState<Partial<InterventionPlan> | null>(null);

  useEffect(() => {
    // This check runs only once on component mount
    if (sessionStorage.getItem('sprintAppHasVisited')) {
      setShowWelcome(false);
    } else {
      setShowWelcome(true);
    }
    setIsLoading(false);
  }, []);

  const handleWelcomeComplete = () => {
    sessionStorage.setItem('sprintAppHasVisited', 'true');
    setActiveView(View.LandingPage);
    setShowWelcome(false);
  };
  
  const handleLogout = () => {
      sessionStorage.removeItem('sprintAppHasVisited');
      setActiveView(View.Dashboard); // Reset view to default for next login
      setShowWelcome(true);
  };

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
  
  const handleNavigateToDashboard = () => {
    setActiveView(View.Dashboard);
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
      case View.LandingPage:
        return <LandingPage onNavigate={handleNavigateToDashboard} />;
      case View.Dashboard:
        return <Dashboard handleOpenInterventionModal={handleOpenInterventionModal} />;
      case View.Forecasting:
        return <Forecasting />;
      case View.DataPerWilayah:
        return <DataPerWilayah handleOpenInterventionModal={handleOpenInterventionModal} />;
      case View.EWSPerBidang:
        return <EWSPerBidang />;
      case View.SmartRecommendations:
        return <SmartRecommendations />;
       case View.Intervensi:
        return <InterventionManagement plans={interventionPlans} onOpenModal={handleOpenInterventionModal} />;
      case View.DataProcessing:
        return <DataProcessing />;
      case View.ResourceAllocation:
        return <ResourceAllocation />;
      case View.Reports:
        return <Reports />;
      default:
        return <Placeholder title={activeView} />;
    }
  };
  
  if (isLoading) {
    return <div className="fixed inset-0 bg-white" />; // Prevent flash of unstyled content
  }

  if (showWelcome) {
    return <WelcomeScreen onComplete={handleWelcomeComplete} />;
  }


  return (
    <div className={`relative flex h-screen bg-slate-100 font-sans transition-opacity duration-500 ease-in-out opacity-100`}>
      <Sidebar 
        activeView={activeView} 
        setActiveView={setActiveView} 
        isOpen={isSidebarOpen} 
        setIsOpen={setIsSidebarOpen} 
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header setIsSidebarOpen={setIsSidebarOpen} onLogout={handleLogout} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-slate-50 p-6 print:bg-white print:p-0">
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