import React, { useEffect } from 'react';
import { useApp } from '../context/AppContext';

export const DetailAspirasiModal: React.FC = () => {
  const {
    selectedAspirasiDetail,
    setSelectedAspirasiDetail,
    setSelectedAspirasiToEdit,
    deleteAspirasi,
    user,
  } = useApp();

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedAspirasiDetail) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedAspirasiDetail]);

  if (!selectedAspirasiDetail) return null;

  const item = selectedAspirasiDetail;

  const getStepIndex = (status: string) => {
    if (status === 'Menunggu') return 1;
    if (status === 'Proses') return 2;
    if (status === 'Selesai') return 3;
    return 1;
  };

  const stepIndex = getStepIndex(item.status);

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-surface-container-lowest rounded-3xl w-[90vw] md:w-[600px] lg:w-[750px] p-lg sm:p-xl shadow-2xl border border-outline-variant/40 max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-start justify-between pb-md border-b border-outline-variant/30 mb-lg">
          <div className="flex items-center gap-3">
            <div
              className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-base ${
                item.status === 'Menunggu'
                  ? 'bg-[#fef3c7] text-[#b45309]'
                  : item.status === 'Proses'
                  ? 'bg-secondary-fixed text-on-secondary-fixed-variant'
                  : 'bg-[#d1fae5] text-[#047857]'
              }`}
            >
              <span className="material-symbols-outlined text-[24px]">
                {item.status === 'Menunggu' ? 'pending_actions' : item.status === 'Proses' ? 'autorenew' : 'task_alt'}
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-headline-md text-lg font-bold text-primary">{item.id}</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-surface-container text-on-surface-variant font-semibold">
                  {item.kategori}
                </span>
              </div>
              <p className="text-xs text-on-surface-variant">Diajukan pada tanggal: {item.tanggal}</p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setSelectedAspirasiDetail(null)}
            className="p-1.5 rounded-full hover:bg-surface-container text-on-surface-variant transition-colors"
          >
            <span className="material-symbols-outlined text-[22px]">close</span>
          </button>
        </div>

        {/* Status Tracker Stepper */}
        <div className="mb-lg p-md bg-surface-container-low rounded-2xl border border-outline-variant/20">
          <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider block mb-3">
            Progres Penanganan Sarana:
          </span>
          <div className="grid grid-cols-3 gap-2 text-center relative">
            {/* Step 1 */}
            <div className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold mb-1 ${
                  stepIndex >= 1
                    ? 'bg-primary text-on-primary'
                    : 'bg-surface-container text-on-surface-variant'
                }`}
              >
                1
              </div>
              <span className="text-[11px] font-bold text-on-surface">Menunggu</span>
              <span className="text-[10px] text-on-surface-variant">Laporan Masuk</span>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold mb-1 ${
                  stepIndex >= 2
                    ? 'bg-secondary-container text-on-secondary-container'
                    : 'bg-surface-container text-on-surface-variant'
                }`}
              >
                2
              </div>
              <span className="text-[11px] font-bold text-on-surface">Dalam Proses</span>
              <span className="text-[10px] text-on-surface-variant">Perbaikan Teknisi</span>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold mb-1 ${
                  stepIndex >= 3
                    ? 'bg-[#166534] text-white'
                    : 'bg-surface-container text-on-surface-variant'
                }`}
              >
                3
              </div>
              <span className="text-[11px] font-bold text-on-surface">Selesai</span>
              <span className="text-[10px] text-on-surface-variant">Fasilitas Normal</span>
            </div>
          </div>
        </div>

        {/* Content Body Grid */}
        <div className="space-y-md">
          {/* Identitas Siswa & Lokasi */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-md">
            <div className="p-3 bg-surface rounded-xl border border-outline-variant/30">
              <span className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider flex items-center gap-1 mb-1">
                <span className="material-symbols-outlined text-[16px] text-primary">badge</span>
                Identitas Pelapor
              </span>
              <p className="text-sm font-bold text-on-surface">{item.nama_siswa}</p>
              <p className="text-xs text-on-surface-variant">
                ID/NIS: <strong>{item.nis}</strong> • Peran: <strong>{item.kelas}</strong>
              </p>
            </div>

            <div className="p-3 bg-surface rounded-xl border border-outline-variant/30">
              <span className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider flex items-center gap-1 mb-1">
                <span className="material-symbols-outlined text-[16px] text-primary">location_on</span>
                Lokasi Kejadian
              </span>
              <p className="text-sm font-bold text-on-surface">{item.lokasi}</p>
              <p className="text-xs text-on-surface-variant">Kategori: {item.kategori}</p>
            </div>
          </div>

          {/* Deskripsi Masalah */}
          <div className="p-4 bg-surface rounded-xl border border-outline-variant/30">
            <span className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider block mb-1">
              Deskripsi Kerusakan / Aspirasi:
            </span>
            <p className="text-sm text-on-surface leading-relaxed whitespace-pre-wrap">{item.deskripsi}</p>
          </div>

          {/* Tanggapan Admin / Feedback */}
          <div
            className={`p-4 rounded-xl border ${
              item.status === 'Selesai'
                ? 'bg-[#dcfce7]/60 border-[#86efac]'
                : item.status === 'Proses'
                ? 'bg-secondary-fixed/30 border-secondary-fixed'
                : 'bg-surface-container-low border-outline-variant/30'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-[11px] font-bold text-on-surface uppercase tracking-wider flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px] text-primary">forum</span>
                Umpan Balik / Tanggapan Administrator
              </span>
              <span className="text-[10px] text-on-surface-variant">Bagian Sarpras</span>
            </div>
            <p
              className={`text-sm ${
                item.feedback.startsWith('-') ? 'text-on-surface-variant italic' : 'text-on-surface font-medium'
              }`}
            >
              {item.feedback}
            </p>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="mt-xl pt-md border-t border-outline-variant/30 flex flex-wrap items-center justify-between gap-2">
          {user.role === 'admin' ? (
            <button
              type="button"
              onClick={() => {
                const id = item.id;
                setSelectedAspirasiDetail(null);
                deleteAspirasi(id);
              }}
              className="text-xs text-error hover:bg-error-container hover:text-on-error-container px-3 py-2 rounded-xl transition-colors flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-[16px]">delete</span>
              <span>Hapus Laporan</span>
            </button>
          ) : (
            <div />
          )}

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setSelectedAspirasiDetail(null)}
              className="px-lg py-2 rounded-xl text-xs font-semibold text-on-surface-variant hover:bg-surface-container transition-colors"
            >
              Tutup
            </button>

            {user.role === 'admin' && (
              <button
                type="button"
                onClick={() => {
                  const toEdit = item;
                  setSelectedAspirasiDetail(null);
                  setSelectedAspirasiToEdit(toEdit);
                }}
                className="bg-primary text-on-primary px-lg py-2 rounded-xl text-xs font-semibold hover:bg-primary-container transition-colors flex items-center gap-1.5 shadow-xs"
              >
                <span className="material-symbols-outlined text-[16px]">edit_document</span>
                <span>Tanggapi / Ubah Status</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
