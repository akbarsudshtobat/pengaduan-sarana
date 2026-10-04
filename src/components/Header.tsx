import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

interface HeaderProps {
  onToggleMobile: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onToggleMobile }) => {
  const { user, aspirasiList, setActiveTab, setSelectedAspirasiDetail, logout } = useApp();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);

  const pendingCount = aspirasiList.filter((a) => a.status === 'Menunggu').length;
  const recentActivities = aspirasiList.slice(0, 4);

  return (
    <>
      <header className="fixed top-0 left-0 lg:left-72 right-0 h-20 bg-surface/85 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-40 flex items-center justify-between px-md lg:px-xl border-b border-outline-variant/30">
        {/* Left branding / title */}
        <div className="flex items-center gap-md">
          {/* Mobile menu trigger */}
          <button
            type="button"
            onClick={onToggleMobile}
            className="lg:hidden p-2 rounded-lg text-on-surface-variant hover:bg-surface-container-high transition-colors"
            aria-label="Buka menu"
          >
            <span className="material-symbols-outlined text-[24px]">menu</span>
          </button>

          <div className="flex flex-col">
            <span className="font-headline-md text-headline-md text-on-surface text-[18px] lg:text-[20px] font-bold tracking-tight">
              Aplikasi Pengaduan Sarana
            </span>
            <span className="font-label-sm text-label-sm text-on-surface-variant text-[11px] lg:text-[12px]">
              Sistem Aspirasi &amp; Pengaduan Fasilitas Akademik
            </span>
          </div>
        </div>

        {/* Right tools & profile */}
        <div className="flex items-center gap-sm lg:gap-lg">
          {/* Icon actions */}
          <div className="flex items-center gap-xs lg:gap-md border-r border-outline-variant pr-sm lg:pr-lg relative">
            {/* Notification bell */}
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setShowNotifications(!showNotifications);
                  setShowUserMenu(false);
                }}
                className="p-sm rounded-full hover:bg-surface-container-high text-on-surface-variant transition-colors relative"
                aria-label="Lihat notifikasi"
              >
                <span className="material-symbols-outlined text-[22px]">notifications</span>
                {pendingCount > 0 && (
                  <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-amber-500 rounded-full ring-2 ring-surface animate-pulse" />
                )}
              </button>

              {/* Notifications Dropdown */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-surface-container-lowest rounded-2xl shadow-xl border border-outline-variant/40 p-md z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="flex items-center justify-between pb-sm border-b border-outline-variant/40 mb-sm">
                    <span className="font-headline-md text-[14px] text-on-surface font-semibold">Notifikasi Laporan</span>
                    <span className="text-[11px] bg-primary-fixed text-on-primary-fixed-variant px-2 py-0.5 rounded-full font-bold">
                      {pendingCount} Menunggu
                    </span>
                  </div>

                  <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                    {recentActivities.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => {
                          setSelectedAspirasiDetail(item);
                          setShowNotifications(false);
                        }}
                        className="p-2.5 rounded-xl hover:bg-surface-container transition-colors cursor-pointer border border-transparent hover:border-outline-variant/30 flex items-start gap-3"
                      >
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-bold ${
                            item.status === 'Menunggu'
                              ? 'bg-[#fef3c7] text-[#b45309]'
                              : item.status === 'Proses'
                              ? 'bg-secondary-fixed text-on-secondary-fixed-variant'
                              : 'bg-[#d1fae5] text-[#047857]'
                          }`}
                        >
                          <span className="material-symbols-outlined text-[16px]">
                            {item.status === 'Menunggu' ? 'pending_actions' : item.status === 'Proses' ? 'autorenew' : 'check_circle'}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className="font-label-md text-xs font-bold text-on-surface truncate">{item.id} • {item.kategori}</span>
                            <span className="text-[10px] text-on-surface-variant shrink-0">{item.tanggal}</span>
                          </div>
                          <p className="text-xs text-on-surface-variant truncate mt-0.5">{item.deskripsi}</p>
                          <span className="text-[10px] text-primary font-medium mt-1 inline-block">Oleh {item.nama_siswa} ({item.kelas})</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="pt-sm mt-sm border-t border-outline-variant/40 flex justify-between items-center text-xs">
                    <button
                      onClick={() => {
                        setActiveTab('kelola-aspirasi');
                        setShowNotifications(false);
                      }}
                      className="text-primary font-semibold hover:underline"
                    >
                      Buka Kelola Aspirasi &rarr;
                    </button>
                    <button
                      onClick={() => setShowNotifications(false)}
                      className="text-on-surface-variant hover:text-on-surface"
                    >
                      Tutup
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Help icon */}
            <button
              type="button"
              onClick={() => setShowHelpModal(true)}
              className="p-sm rounded-full hover:bg-surface-container-high text-on-surface-variant transition-colors"
              aria-label="Petunjuk bantuan"
            >
              <span className="material-symbols-outlined text-[22px]">help_outline</span>
            </button>
          </div>

          {/* User Profile Chip */}
          <div className="relative">
            <div
              onClick={() => {
                setShowUserMenu(!showUserMenu);
                setShowNotifications(false);
              }}
              className="flex items-center gap-sm lg:gap-md cursor-pointer group p-1 rounded-xl hover:bg-surface-container-high/60 transition-colors"
            >
              <div className="hidden sm:flex flex-col items-end">
                <span className="font-label-md text-label-md text-on-surface group-hover:text-primary transition-colors">
                  {user.name}
                </span>
                <span className="font-label-sm text-label-sm text-on-surface-variant text-[11px]">
                  {user.roleTitle}
                </span>
              </div>
              <div className="w-9 h-9 lg:w-10 lg:h-10 rounded-full bg-primary flex items-center justify-center shadow-xs">
                <span className="material-symbols-outlined text-on-primary text-[20px]">person</span>
              </div>
            </div>

            {/* User Menu Dropdown */}
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-surface-container-lowest rounded-2xl shadow-xl border border-outline-variant/40 p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="px-3 py-2 border-b border-outline-variant/40 mb-1">
                  <p className="font-label-md text-xs font-bold text-on-surface">{user.name}</p>
                  <p className="text-[11px] text-on-surface-variant">{user.roleTitle}</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    logout();
                    setShowUserMenu(false);
                  }}
                  className="w-full text-left px-3 py-2 text-xs text-error hover:bg-error-container hover:text-on-error-container rounded-lg flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-[16px]">logout</span>
                  <span>Keluar Sesi</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Help Modal */}
      {showHelpModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-surface-container-lowest rounded-3xl max-w-lg w-full p-xl shadow-2xl border border-outline-variant/40 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-md border-b border-outline-variant/30 mb-lg">
              <div className="flex items-center gap-sm">
                <div className="w-10 h-10 rounded-xl bg-primary-fixed flex items-center justify-center text-on-primary-fixed-variant">
                  <span className="material-symbols-outlined">school</span>
                </div>
                <div>
                  <h3 className="font-headline-md text-headline-md text-on-surface">Panduan Aplikasi SAPA</h3>
                  <p className="text-xs text-on-surface-variant">Uji Kompetensi Keahlian SMK RPL 2025/2026</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowHelpModal(false)}
                className="p-1 rounded-full hover:bg-surface-container text-on-surface-variant"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="space-y-md text-body-md text-sm text-on-surface">
              <div className="p-3 bg-surface-container-low rounded-xl">
                <p className="font-bold text-primary flex items-center gap-1 mb-1">
                  <span className="material-symbols-outlined text-[18px]">campaign</span>
                  1. Alur Siswa (Kirim Aspirasi &amp; Riwayat)
                </p>
                <p className="text-xs text-on-surface-variant">
                  Siswa memasukkan NIS, memilih kategori sarana (Kelas, Lab, Toilet, Wi-Fi, dll), lokasi kerusakan, dan penjelasan. Laporan tersimpan di sistem dan dapat dipantau di menu <strong>Riwayat &amp; Status</strong>.
                </p>
              </div>

              <div className="p-3 bg-surface-container-low rounded-xl">
                <p className="font-bold text-primary flex items-center gap-1 mb-1">
                  <span className="material-symbols-outlined text-[18px]">admin_panel_settings</span>
                  2. Alur Administrator (Kelola &amp; Umpan Balik)
                </p>
                <p className="text-xs text-on-surface-variant">
                  Admin dapat melihat seluruh daftar aspirasi, menyaring berdasarkan kategori/status/tanggal, mengubah status (<strong>Menunggu &rarr; Proses &rarr; Selesai</strong>), dan memberikan umpan balik perbaikan.
                </p>
              </div>

              <div className="p-3 bg-surface-container-low rounded-xl">
                <p className="font-bold text-primary flex items-center gap-1 mb-1">
                  <span className="material-symbols-outlined text-[18px]">data_object</span>
                  3. Skema Database Sesuai Soal Ujian (ERD)
                </p>
                <p className="text-xs text-on-surface-variant">
                  Struktur data mencakup tabel <code>admin</code>, <code>siswa</code>, <code>kategori</code>, dan <code>aspirasi</code> (id_pelaporan, nis, id_kategori, lokasi, ket, status, feedback, tanggal).
                </p>
              </div>
            </div>

            <div className="mt-xl flex justify-end">
              <button
                type="button"
                onClick={() => setShowHelpModal(false)}
                className="bg-primary text-on-primary px-lg py-sm rounded-xl font-label-md text-sm hover:bg-primary-container transition-colors"
              >
                Mengerti
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
