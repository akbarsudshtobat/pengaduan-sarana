import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { StatusAspirasi } from '../types';

export const UpdateStatusModal: React.FC = () => {
  const {
    selectedAspirasiToEdit,
    setSelectedAspirasiToEdit,
    updateAspirasi,
    user,
  } = useApp();

  const [status, setStatus] = useState<StatusAspirasi>('Menunggu');
  const [feedback, setFeedback] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (selectedAspirasiToEdit) {
      setStatus(selectedAspirasiToEdit.status);
      setFeedback(
        selectedAspirasiToEdit.feedback.startsWith('-')
          ? ''
          : selectedAspirasiToEdit.feedback
      );
      // Lock body scroll
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedAspirasiToEdit]);

  if (!selectedAspirasiToEdit || user.role !== 'admin') return null;

  const item = selectedAspirasiToEdit;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    setTimeout(() => {
      updateAspirasi(
        item.id,
        status,
        feedback.trim() || 'Laporan telah ditinjau dan diperbarui oleh admin fasilitas.'
      );
      setIsSaving(false);
      setSelectedAspirasiToEdit(null);
    }, 600);
  };

  const quickResponses = [
    'Laporan diterima, teknisi sarpras sedang menuju lokasi untuk perbaikan.',
    'Pengecekan selesai, sedang menunggu pengadaan suku cadang pengganti.',
    'Perbaikan fasilitas telah selesai dikerjakan dan berfungsi normal.',
    'Sarana telah dibersihkan dan siap digunakan kembali.',
  ];

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-surface-container-lowest rounded-3xl w-[90vw] md:w-[560px] lg:w-[600px] p-lg sm:p-xl shadow-2xl border border-outline-variant/40 max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between pb-md border-b border-outline-variant/30 mb-lg">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary-fixed flex items-center justify-center text-on-primary-fixed">
              <span className="material-symbols-outlined text-[22px]">edit_document</span>
            </div>
            <div>
              <h3 className="font-headline-md text-base sm:text-lg font-bold text-on-surface">
                Tindak Lanjut Laporan
              </h3>
              <p className="text-xs text-on-surface-variant font-medium">
                {item.id} • {item.nama_siswa} ({item.kategori})
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setSelectedAspirasiToEdit(null)}
            className="p-1.5 rounded-full hover:bg-surface-container text-on-surface-variant"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <form onSubmit={handleSave} className="space-y-md">
          {/* Brief info */}
          <div className="p-3 bg-surface-container-low rounded-xl text-xs space-y-1">
            <p className="text-on-surface font-semibold">
              Lokasi: <span className="font-normal text-on-surface-variant">{item.lokasi}</span>
            </p>
            <p className="text-on-surface font-semibold line-clamp-2">
              Keluhan: <span className="font-normal text-on-surface-variant">{item.deskripsi}</span>
            </p>
          </div>

          {/* Status Selection */}
          <div>
            <label className="text-xs font-bold text-on-surface uppercase tracking-wider block mb-2">
              Status Penanganan:
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['Menunggu', 'Proses', 'Selesai'] as StatusAspirasi[]).map((st) => (
                <button
                  key={st}
                  type="button"
                  onClick={() => setStatus(st)}
                  className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all flex flex-col items-center gap-1 ${
                    status === st
                      ? st === 'Menunggu'
                        ? 'bg-[#fef3c7] text-[#b45309] border-[#f59e0b] shadow-xs'
                        : st === 'Proses'
                        ? 'bg-secondary-fixed text-on-secondary-fixed-variant border-secondary shadow-xs'
                        : 'bg-[#d1fae5] text-[#047857] border-[#10b981] shadow-xs'
                      : 'bg-surface-container-lowest text-on-surface-variant border-outline-variant/40 hover:bg-surface-container'
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {st === 'Menunggu' ? 'pending_actions' : st === 'Proses' ? 'autorenew' : 'check_circle'}
                  </span>
                  <span>{st}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Feedback / Response input */}
          <div>
            <label className="text-xs font-bold text-on-surface uppercase tracking-wider block mb-1.5" htmlFor="admin-feedback">
              Tanggapan &amp; Umpan Balik Admin:
            </label>
            <textarea
              id="admin-feedback"
              className="w-full p-3 bg-surface-container-lowest text-on-surface text-sm rounded-xl border border-outline-variant/40 focus:outline-none focus:ring-2 focus:ring-primary placeholder:text-outline/50 resize-none"
              rows={3}
              placeholder="Tuliskan catatan penanganan atau informasi untuk siswa..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              required
            />
          </div>

          {/* Quick template responses */}
          <div>
            <span className="text-[11px] text-on-surface-variant font-semibold block mb-1.5">
              Template Respon Cepat:
            </span>
            <div className="space-y-1 max-h-32 overflow-y-auto pr-1">
              {quickResponses.map((qr, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setFeedback(qr)}
                  className="w-full text-left text-[11px] p-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface transition-colors truncate"
                >
                  &bull; {qr}
                </button>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="pt-md border-t border-outline-variant/30 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setSelectedAspirasiToEdit(null)}
              className="px-lg py-2 rounded-xl text-xs font-semibold text-on-surface-variant hover:bg-surface-container transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="bg-primary text-on-primary px-lg py-2 rounded-xl text-xs font-semibold hover:bg-primary-container transition-all flex items-center gap-1.5 shadow-xs disabled:opacity-60"
            >
              {isSaving ? (
                <>
                  <span className="material-symbols-outlined animate-spin text-[16px]">sync</span>
                  <span>Menyimpan...</span>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-[16px]">save</span>
                  <span>Simpan Perubahan</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
