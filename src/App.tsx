import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { LandingPage } from './components/LandingPage';
import { LoginPage } from './components/LoginPage';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { FormAspirasi } from './components/FormAspirasi';
import { RiwayatStatus } from './components/RiwayatStatus';
import { KelolaAspirasi } from './components/KelolaAspirasi';
import { DashboardView } from './components/DashboardView';
import { DetailAspirasiModal } from './components/DetailAspirasiModal';
import { UpdateStatusModal } from './components/UpdateStatusModal';
import { SqlErdModal } from './components/SqlErdModal';
import { Toast } from './components/Toast';

const AppContent: React.FC = () => {
  const { activeTab, user } = useApp();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Landing & Login pages are full-screen, no sidebar/header
  if (activeTab === 'landing') {
    return (
      <>
        <LandingPage />
        <Toast />
      </>
    );
  }

  if (activeTab === 'login') {
    return (
      <>
        <LoginPage />
        <Toast />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-surface font-body-md text-on-surface antialiased flex flex-col selection:bg-primary-fixed selection:text-on-primary-fixed-variant">
      {/* Fixed Sidebar */}
      <Sidebar
        mobileOpen={mobileSidebarOpen}
        onCloseMobile={() => setMobileSidebarOpen(false)}
      />

      {/* Top Header */}
      <Header onToggleMobile={() => setMobileSidebarOpen(!mobileSidebarOpen)} />

      {/* Main View Area */}
      <main className="flex-1 lg:ml-72 pt-20 pb-16 px-4 sm:px-6 lg:px-8 transition-all min-h-screen flex flex-col">
        <div className="w-full max-w-7xl mx-auto flex-1 flex flex-col">
          {activeTab === 'dashboard' && user.role === 'admin' && <DashboardView />}
          {activeTab === 'kelola-aspirasi' && user.role === 'admin' && <KelolaAspirasi />}
          
          {/* Prevent non-admins from seeing empty screens if activeTab gets stuck */}
          {(activeTab === 'dashboard' || activeTab === 'kelola-aspirasi') && user.role !== 'admin' && <FormAspirasi />}

          {activeTab === 'kirim-aspirasi' && <FormAspirasi />}
          {activeTab === 'riwayat-status' && <RiwayatStatus />}
        </div>
      </main>

      {/* Modals & Overlays */}
      <DetailAspirasiModal />
      <UpdateStatusModal />
      <SqlErdModal />
      <Toast />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
