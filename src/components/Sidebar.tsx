import React from 'react';
import { useApp } from '../context/AppContext';
import { ActiveTab } from '../types';

interface SidebarProps {
  mobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ mobileOpen = false, onCloseMobile }) => {
  const { activeTab, setActiveTab, user, logout, setIsSqlModalOpen } = useApp();

  const handleNav = (tab: ActiveTab) => {
    setActiveTab(tab);
    if (onCloseMobile) onCloseMobile();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden backdrop-blur-xs transition-opacity"
          onClick={onCloseMobile}
        />
      )}

      <aside
        className={`fixed left-0 top-0 h-full w-72 bg-surface-container-low shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-50 flex flex-col pt-lg pb-lg transition-transform duration-300 ease-in-out ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Brand Header */}
        <div className="px-xl mb-2xl flex items-center justify-between">
          <div className="flex items-center gap-sm cursor-pointer" onClick={() => handleNav(user.role === 'admin' ? 'dashboard' : 'kirim-aspirasi')}>
            <span className="material-symbols-outlined text-primary text-[32px]">domain</span>
            <div className="flex flex-col">
              <span className="font-headline-md text-headline-md text-primary leading-tight font-bold tracking-tight">SAPA</span>
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider text-[11px] font-semibold">Sarana Sekolah</span>
            </div>
          </div>
          {onCloseMobile && (
            <button
              onClick={onCloseMobile}
              className="lg:hidden p-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container-high transition-colors"
              aria-label="Tutup menu"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          )}
        </div>

        {/* Navigation items */}
        <nav className="flex-1 px-md space-y-xs overflow-y-auto">
          {user.role === 'admin' && (
            <>
              {/* MENU UTAMA (ADMIN) */}
              <div className="px-md py-sm font-label-md text-label-md text-outline uppercase text-[12px] tracking-wider font-semibold">
                Administrator
              </div>

          <button
            type="button"
            onClick={() => handleNav('dashboard')}
            className={`w-full flex items-center px-lg py-md rounded-lg transition-all gap-md text-left ${
              activeTab === 'dashboard'
                ? 'bg-secondary-container text-on-secondary-container font-headline-md font-semibold shadow-xs'
                : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
            }`}
          >
            <span className={`material-symbols-outlined ${activeTab === 'dashboard' ? 'material-symbols-fill' : ''}`}>
              dashboard
            </span>
            <span className="font-label-md text-label-md">Dashboard</span>
          </button>

          <button
            type="button"
            onClick={() => handleNav('kelola-aspirasi')}
            className={`w-full flex items-center px-lg py-md rounded-lg transition-all gap-md text-left ${
              activeTab === 'kelola-aspirasi'
                ? 'bg-secondary-container text-on-secondary-container font-headline-md font-semibold shadow-xs'
                : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
            }`}
          >
            <span className={`material-symbols-outlined ${activeTab === 'kelola-aspirasi' ? 'material-symbols-fill' : ''}`}>
              assignment
            </span>
            <span className="font-label-md text-label-md">Kelola Aspirasi</span>
          </button>
            </>
          )}

          {/* MENU PELAPOR */}
          <div className="px-md py-sm mt-lg font-label-md text-label-md text-outline uppercase text-[12px] tracking-wider font-semibold">
            Menu Pelapor
          </div>

          <button
            type="button"
            onClick={() => handleNav('kirim-aspirasi')}
            className={`w-full flex items-center px-lg py-md rounded-lg transition-all gap-md text-left ${
              activeTab === 'kirim-aspirasi'
                ? 'bg-secondary-container text-on-secondary-container font-headline-md font-semibold shadow-xs'
                : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
            }`}
          >
            <span className={`material-symbols-outlined ${activeTab === 'kirim-aspirasi' ? 'material-symbols-fill' : ''}`}>
              campaign
            </span>
            <span className="font-label-md text-label-md">Kirim Aspirasi</span>
          </button>

          <button
            type="button"
            onClick={() => handleNav('riwayat-status')}
            className={`w-full flex items-center px-lg py-md rounded-lg transition-all gap-md text-left ${
              activeTab === 'riwayat-status'
                ? 'bg-secondary-container text-on-secondary-container font-headline-md font-semibold shadow-xs'
                : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
            }`}
          >
            <span className={`material-symbols-outlined ${activeTab === 'riwayat-status' ? 'material-symbols-fill' : ''}`}>
              history
            </span>
            <span className="font-label-md text-label-md">Riwayat &amp; Status</span>
          </button>

          {/* UKK Helper Tool: ERD & SQL */}
          <div className="px-md py-sm mt-lg font-label-md text-label-md text-outline uppercase text-[12px] tracking-wider font-semibold">
            Dokumentasi UKK
          </div>

          <button
            type="button"
            onClick={() => {
              setIsSqlModalOpen(true);
              if (onCloseMobile) onCloseMobile();
            }}
            className="w-full flex items-center px-lg py-md rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all gap-md text-left"
          >
            <span className="material-symbols-outlined text-[20px] text-primary">data_object</span>
            <span className="font-label-md text-label-md flex-1">Skema SQL &amp; ERD</span>
            <span className="text-[10px] bg-primary-fixed text-on-primary-fixed-variant px-1.5 py-0.5 rounded font-bold uppercase">UKK</span>
          </button>
        </nav>

        {/* Footer Role & Auth */}
        <div className="px-md pt-lg border-t border-outline-variant/60 space-y-sm">
          {user.isLoggedIn ? (
            <>
              {/* Role Status */}
              <div className="px-lg py-2 rounded-xl bg-surface-container flex items-center justify-between text-[11px] text-on-surface-variant">
                <span className="flex items-center gap-1.5">
                  <span className={`w-2 h-2 rounded-full ${user.role === 'admin' ? 'bg-emerald-500' : 'bg-blue-500'} animate-pulse`} />
                  <span>Mode: <strong>{user.role === 'admin' ? 'Admin' : 'Siswa'}</strong></span>
                </span>
                <span className="text-on-surface font-semibold truncate max-w-[100px]">{user.name}</span>
              </div>
              {/* Logout */}
              <button
                type="button"
                onClick={logout}
                className="w-full flex items-center px-lg py-md rounded-lg text-error hover:bg-error-container hover:text-on-error-container transition-all gap-md text-left cursor-pointer"
              >
                <span className="material-symbols-outlined">logout</span>
                <span className="font-label-md text-label-md font-medium">Keluar Sesi</span>
              </button>
            </>
          ) : (
            <>
              {/* Login */}
              <button
                type="button"
                onClick={() => handleNav('login')}
                className="w-full flex items-center px-lg py-md rounded-lg text-primary hover:bg-surface-container-high transition-all gap-md text-left cursor-pointer font-semibold"
              >
                <span className="material-symbols-outlined">login</span>
                <span className="font-label-md text-label-md">Masuk / Login</span>
              </button>
            </>
          )}
        </div>
      </aside>
    </>
  );
};
