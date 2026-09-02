import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { FormAspirasi } from './components/FormAspirasi';
import { RiwayatStatus } from './components/RiwayatStatus';
import { KelolaAspirasi } from './components/KelolaAspirasi';
import { AdminLogin } from './components/AdminLogin';
import { DashboardView } from './components/DashboardView';
import { DetailAspirasiModal } from './components/DetailAspirasiModal';
import { UpdateStatusModal } from './components/UpdateStatusModal';
import { SqlErdModal } from './components/SqlErdModal';
import { Toast } from './components/Toast';

const AppContent: React.FC = () => {
  const { activeTab } = useApp();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

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
          {activeTab === 'dashboard' && <DashboardView />}
          {activeTab === 'kelola-aspirasi' && <KelolaAspirasi />}
          {activeTab === 'kirim-aspirasi' && <FormAspirasi />}
          {activeTab === 'riwayat-status' && <RiwayatStatus />}
          {activeTab === 'login' && <AdminLogin />}
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
