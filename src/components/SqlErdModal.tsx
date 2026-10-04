import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { SQL_SCHEMA_EXPORT } from '../data/mockData';

export const SqlErdModal: React.FC = () => {
  const { isSqlModalOpen, setIsSqlModalOpen, showToast } = useApp();
  const [activeTab, setActiveTab] = useState<'erd' | 'sql'>('erd');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (isSqlModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isSqlModalOpen]);

  if (!isSqlModalOpen) return null;

  const handleCopySql = () => {
    navigator.clipboard.writeText(SQL_SCHEMA_EXPORT);
    setCopied(true);
    showToast('Skrip SQL berhasil disalin ke clipboard!', 'success');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadSql = () => {
    const element = document.createElement('a');
    const file = new Blob([SQL_SCHEMA_EXPORT], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'database_sapa_sarana_sekolah.sql';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    showToast('File database_sapa.sql berhasil diunduh!', 'success');
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-surface-container-lowest rounded-3xl max-w-4xl w-full p-lg sm:p-xl shadow-2xl border border-outline-variant/40 max-h-[90vh] flex flex-col animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between pb-md border-b border-outline-variant/30 mb-md shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary-fixed flex items-center justify-center text-on-primary-fixed">
              <span className="material-symbols-outlined text-[22px]">schema</span>
            </div>
            <div>
              <h3 className="font-headline-md text-base sm:text-lg font-bold text-on-surface">
                Dokumentasi Database &amp; ERD (UKK RPL)
              </h3>
              <p className="text-xs text-on-surface-variant font-medium">
                Struktur tabel relasional Sistem Aspirasi &amp; Pengaduan Sarana Sekolah
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsSqlModalOpen(false)}
            className="p-1.5 rounded-full hover:bg-surface-container text-on-surface-variant"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Tab switchers */}
        <div className="flex items-center gap-2 mb-md shrink-0">
          <button
            type="button"
            onClick={() => setActiveTab('erd')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'erd'
                ? 'bg-primary text-on-primary shadow-xs'
                : 'bg-surface-container text-on-surface hover:bg-surface-container-high'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">account_tree</span>
            <span>Diagram ERD Relasi</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('sql')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'sql'
                ? 'bg-primary text-on-primary shadow-xs'
                : 'bg-surface-container text-on-surface hover:bg-surface-container-high'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">code</span>
            <span>Skrip SQL DDL &amp; DML</span>
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto pr-1">
          {activeTab === 'erd' ? (
            <div className="space-y-lg py-2">
              <div className="p-3 bg-primary-fixed/20 border border-primary/20 rounded-2xl text-xs text-on-primary-fixed-variant">
                <span className="font-bold">Struktur Relasi Soal Ujian:</span> Siswa mengajukan laporan yang tersimpan dalam tabel <code>aspirasi</code> yang berelasi dengan <code>kategori</code> sarana, dan ditangani oleh <code>admin</code>.
              </div>

              {/* Visual ERD Diagram Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-md">
                {/* Table Siswa */}
                <div className="bg-surface rounded-2xl border-2 border-primary/40 shadow-xs overflow-hidden">
                  <div className="bg-primary text-on-primary p-2.5 font-bold text-xs flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[16px]">person</span>
                      siswa
                    </span>
                    <span className="text-[10px] bg-white/20 px-1.5 py-0.5 rounded">Master</span>
                  </div>
                  <div className="p-3 text-xs space-y-2">
                    <div className="flex items-center justify-between font-mono bg-surface-container-low p-1.5 rounded">
                      <span className="font-bold text-primary flex items-center gap-1">
                        <span className="material-symbols-outlined text-[12px]">key</span>
                        nis
                      </span>
                      <span className="text-[10px] text-on-surface-variant">VARCHAR(10) [PK]</span>
                    </div>
                    <div className="flex items-center justify-between font-mono p-1">
                      <span>nama</span>
                      <span className="text-[10px] text-on-surface-variant">VARCHAR(50)</span>
                    </div>
                    <div className="flex items-center justify-between font-mono p-1">
                      <span>kelas</span>
                      <span className="text-[10px] text-on-surface-variant">VARCHAR(20)</span>
                    </div>
                  </div>
                </div>

                {/* Table Kategori */}
                <div className="bg-surface rounded-2xl border-2 border-secondary/40 shadow-xs overflow-hidden">
                  <div className="bg-secondary text-on-secondary p-2.5 font-bold text-xs flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[16px]">category</span>
                      kategori
                    </span>
                    <span className="text-[10px] bg-white/20 px-1.5 py-0.5 rounded">Master</span>
                  </div>
                  <div className="p-3 text-xs space-y-2">
                    <div className="flex items-center justify-between font-mono bg-surface-container-low p-1.5 rounded">
                      <span className="font-bold text-secondary flex items-center gap-1">
                        <span className="material-symbols-outlined text-[12px]">key</span>
                        id_kategori
                      </span>
                      <span className="text-[10px] text-on-surface-variant">INT [PK, AI]</span>
                    </div>
                    <div className="flex items-center justify-between font-mono p-1">
                      <span>nama_kategori</span>
                      <span className="text-[10px] text-on-surface-variant">VARCHAR(50)</span>
                    </div>
                  </div>
                </div>

                {/* Table Aspirasi (Main Transaction Table) */}
                <div className="bg-surface rounded-2xl border-2 border-emerald-500/50 shadow-md overflow-hidden md:col-span-2">
                  <div className="bg-emerald-700 text-white p-2.5 font-bold text-xs flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[16px]">assignment</span>
                      aspirasi / input_aspirasi
                    </span>
                    <span className="text-[10px] bg-white/20 px-1.5 py-0.5 rounded">Transaksi Utama</span>
                  </div>
                  <div className="p-3 text-xs grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div className="flex items-center justify-between font-mono bg-surface-container-low p-1.5 rounded">
                      <span className="font-bold text-emerald-700 flex items-center gap-1">
                        <span className="material-symbols-outlined text-[12px]">key</span>
                        id_pelaporan
                      </span>
                      <span className="text-[10px] text-on-surface-variant">VARCHAR(20) [PK]</span>
                    </div>
                    <div className="flex items-center justify-between font-mono bg-primary-fixed/30 p-1.5 rounded">
                      <span className="font-bold text-primary flex items-center gap-1">
                        <span className="material-symbols-outlined text-[12px]">link</span>
                        nis
                      </span>
                      <span className="text-[10px] text-on-surface-variant">[FK &rarr; siswa.nis]</span>
                    </div>
                    <div className="flex items-center justify-between font-mono bg-secondary-fixed/30 p-1.5 rounded">
                      <span className="font-bold text-secondary flex items-center gap-1">
                        <span className="material-symbols-outlined text-[12px]">link</span>
                        id_kategori
                      </span>
                      <span className="text-[10px] text-on-surface-variant">[FK &rarr; kategori.id]</span>
                    </div>
                    <div className="flex items-center justify-between font-mono p-1">
                      <span>lokasi</span>
                      <span className="text-[10px] text-on-surface-variant">VARCHAR(100)</span>
                    </div>
                    <div className="flex items-center justify-between font-mono p-1">
                      <span>ket / deskripsi</span>
                      <span className="text-[10px] text-on-surface-variant">TEXT</span>
                    </div>
                    <div className="flex items-center justify-between font-mono p-1">
                      <span>status</span>
                      <span className="text-[10px] text-on-surface-variant">ENUM('Menunggu','Proses','Selesai')</span>
                    </div>
                    <div className="flex items-center justify-between font-mono p-1">
                      <span>feedback</span>
                      <span className="text-[10px] text-on-surface-variant">TEXT</span>
                    </div>
                    <div className="flex items-center justify-between font-mono p-1">
                      <span>waktu / tanggal</span>
                      <span className="text-[10px] text-on-surface-variant">DATETIME</span>
                    </div>
                  </div>
                </div>

                {/* Table Admin */}
                <div className="bg-surface rounded-2xl border-2 border-outline-variant/60 shadow-xs overflow-hidden">
                  <div className="bg-surface-container-high text-on-surface p-2.5 font-bold text-xs flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[16px]">admin_panel_settings</span>
                      admin
                    </span>
                    <span className="text-[10px] bg-surface px-1.5 py-0.5 rounded">Auth</span>
                  </div>
                  <div className="p-3 text-xs space-y-2">
                    <div className="flex items-center justify-between font-mono bg-surface-container-low p-1.5 rounded">
                      <span className="font-bold text-on-surface flex items-center gap-1">
                        <span className="material-symbols-outlined text-[12px]">key</span>
                        username
                      </span>
                      <span className="text-[10px] text-on-surface-variant">VARCHAR(30) [PK]</span>
                    </div>
                    <div className="flex items-center justify-between font-mono p-1">
                      <span>password</span>
                      <span className="text-[10px] text-on-surface-variant">VARCHAR(255)</span>
                    </div>
                    <div className="flex items-center justify-between font-mono p-1">
                      <span>nama_petugas</span>
                      <span className="text-[10px] text-on-surface-variant">VARCHAR(50)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="relative">
              <pre className="bg-surface-container-lowest p-4 rounded-2xl text-xs font-mono text-on-surface overflow-x-auto border border-outline-variant/30 leading-relaxed max-h-[450px]">
                {SQL_SCHEMA_EXPORT}
              </pre>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="mt-md pt-md border-t border-outline-variant/30 flex flex-wrap items-center justify-between gap-2 shrink-0">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopySql}
              className="bg-surface-container hover:bg-surface-container-high text-on-surface px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <span className="material-symbols-outlined text-[16px]">
                {copied ? 'check' : 'content_copy'}
              </span>
              <span>{copied ? 'Tersalin!' : 'Salin SQL'}</span>
            </button>
            <button
              type="button"
              onClick={handleDownloadSql}
              className="bg-surface-container hover:bg-surface-container-high text-on-surface px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <span className="material-symbols-outlined text-[16px]">download</span>
              <span>Unduh .SQL</span>
            </button>
          </div>

          <button
            type="button"
            onClick={() => setIsSqlModalOpen(false)}
            className="bg-primary text-on-primary px-lg py-2 rounded-xl text-xs font-semibold hover:bg-primary-container transition-colors"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
