import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { KATEGORI_LIST } from '../data/mockData';

export const FormAspirasi: React.FC = () => {
  const { addAspirasi, setActiveTab, setSearchNisInput, user } = useApp();

  const [namaPelapor, setNamaPelapor] = useState(user.name !== 'Tamu' ? user.name : '');
  const [peranPelapor, setPeranPelapor] = useState(user.roleTitle !== 'Pengunjung' ? user.roleTitle : '');
  const [kategori, setKategori] = useState('');
  const [lokasi, setLokasi] = useState('');
  const [deskripsi, setDeskripsi] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedAspirasiId, setSubmittedAspirasiId] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!namaPelapor || !peranPelapor || !kategori || !lokasi || !deskripsi) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const created = addAspirasi({
        id_pelapor: user.nis || user.adminId || `GUEST-${Date.now()}`,
        nama: namaPelapor.trim(),
        peran: peranPelapor.trim(),
        kategori,
        lokasi: lokasi.trim(),
        deskripsi: deskripsi.trim(),
      });

      setIsSubmitting(false);
      setSubmittedAspirasiId(created.id);
      
      // Reset form
      setKategori('');
      setLokasi('');
      setDeskripsi('');
    }, 1200);
  };

  return (
    <div className="w-full py-4 lg:py-6">
      {/* Split-Screen 2-Column Grid: stacks on mobile, side-by-side on desktop */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-8 lg:gap-10 items-center">

        {/* ═══════════ LEFT COLUMN — Title & Description ═══════════ */}
        <div className="flex flex-col gap-3 text-left">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-primary text-white rounded-2xl flex items-center justify-center shadow-lg shrink-0">
              <span className="material-symbols-outlined text-[24px] material-symbols-fill">campaign</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800 leading-tight">
              Form Pelaporan Sarana
            </h1>
          </div>

          <p className="text-sm sm:text-base text-slate-500 leading-relaxed">
            Sampaikan aspirasi, laporan kerusakan, atau saran terkait fasilitas sekolah. Laporan Anda membantu menciptakan lingkungan belajar yang lebih baik.
          </p>

          {/* Info chips — desktop only */}
          <div className="hidden lg:flex flex-col gap-2.5 mt-1">
            <div className="flex items-center gap-2.5 text-slate-600">
              <span className="material-symbols-outlined text-primary text-[20px] shrink-0">shield</span>
              <span className="text-sm font-semibold">Bisa Dilaporkan Siapa Saja</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-600">
              <span className="material-symbols-outlined text-primary text-[20px] shrink-0">schedule</span>
              <span className="text-sm font-semibold">Respon 1–3 Hari Kerja</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-600">
              <span className="material-symbols-outlined text-primary text-[20px] shrink-0">confirmation_number</span>
              <span className="text-sm font-semibold">Lacak Status Real-Time</span>
            </div>
          </div>
        </div>

        {/* ═══════════ RIGHT COLUMN — Form Cards ═══════════ */}
        <div className="flex flex-col gap-6">
          {/* Success Banner if just submitted */}
          {submittedAspirasiId && (
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[20px]">check</span>
                </div>
                <div>
                  <p className="text-sm font-bold text-emerald-800">
                    Laporan Berhasil Terkirim — ID: {submittedAspirasiId}
                  </p>
                  <p className="text-xs text-emerald-700">
                    Data Anda telah masuk ke sistem dan akan segera diverifikasi oleh tim sarpras sekolah.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setSearchNisInput(user.nis || '');
                  setActiveTab('riwayat-status');
                }}
                className="bg-emerald-600 text-white px-4 py-2 rounded-xl text-xs font-semibold hover:bg-emerald-700 transition-colors shrink-0"
              >
                Lihat Riwayat &rarr;
              </button>
            </div>
          )}

          {/* Form Card */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-100">
            <form className="flex flex-col gap-6" id="aspirasi-form" onSubmit={handleSubmit}>
              {/* Section 1: Data Diri */}
              <div className="flex flex-col gap-4 p-5 bg-slate-50 rounded-xl border border-slate-100">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-[20px]">badge</span>
                    <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                      Identitas Pelapor
                    </span>
                  </div>
                  <span className="text-xs bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-1 rounded-lg font-semibold flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">verified</span>
                    Terkonfirmasi
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-semibold text-slate-700" htmlFor="namaPelapor">
                      Nama Lengkap
                    </label>
                    <input
                      className="w-full bg-white text-slate-800 text-sm px-4 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all placeholder:text-slate-400 border border-slate-200"
                      id="namaPelapor"
                      name="namaPelapor"
                      placeholder="Masukkan nama Anda"
                      required
                      type="text"
                      value={namaPelapor}
                      onChange={(e) => setNamaPelapor(e.target.value)}
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-semibold text-slate-700" htmlFor="peranPelapor">
                      Peran / Jabatan
                    </label>
                    <input
                      className="w-full bg-white text-slate-800 text-sm px-4 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all placeholder:text-slate-400 border border-slate-200"
                      id="peranPelapor"
                      name="peranPelapor"
                      placeholder="Contoh: Siswa XII IPA, Guru, Satpam"
                      required
                      type="text"
                      value={peranPelapor}
                      onChange={(e) => setPeranPelapor(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Section 2: Detail Laporan */}
              <div className="flex flex-col gap-4 p-5 bg-slate-50 rounded-xl border border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-[20px]">assignment_late</span>
                  <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                    Detail Laporan
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-semibold text-slate-700" htmlFor="kategori">
                      Kategori Fasilitas
                    </label>
                    <div className="relative">
                      <select
                        className="w-full appearance-none bg-white text-slate-800 text-sm px-4 py-2.5 pr-10 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all cursor-pointer border border-slate-200"
                        id="kategori"
                        name="kategori"
                        required
                        value={kategori}
                        onChange={(e) => setKategori(e.target.value)}
                      >
                        <option disabled value="">Pilih Kategori...</option>
                        {KATEGORI_LIST.map((k) => (
                          <option key={k.id} value={k.nama}>
                            {k.nama}
                          </option>
                        ))}
                      </select>
                      <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none text-[20px]">
                        expand_more
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-semibold text-slate-700" htmlFor="lokasi">
                      Lokasi Kejadian
                    </label>
                    <input
                      className="w-full bg-white text-slate-800 text-sm px-4 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all placeholder:text-slate-400 border border-slate-200"
                      id="lokasi"
                      name="lokasi"
                      placeholder="Contoh: Gedung A Lantai 2"
                      required
                      type="text"
                      value={lokasi}
                      onChange={(e) => setLokasi(e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-slate-700" htmlFor="deskripsi">
                    Deskripsi Masalah
                  </label>
                  <textarea
                    className="w-full bg-white text-slate-800 text-sm px-4 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all placeholder:text-slate-400 resize-none border border-slate-200"
                    id="deskripsi"
                    name="deskripsi"
                    placeholder="Jelaskan detail kerusakan atau saran Anda secara rinci"
                    required
                    rows={4}
                    value={deskripsi}
                    onChange={(e) => setDeskripsi(e.target.value)}
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end">
                <button
                  className="bg-primary text-white px-6 py-3 rounded-xl shadow-lg shadow-primary/20 hover:bg-primary-container hover:-translate-y-0.5 hover:shadow-xl transition-all flex items-center gap-2 group cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed font-semibold text-sm"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="material-symbols-outlined animate-spin text-[20px]">sync</span>
                      <span>Mengirim Aspirasi...</span>
                    </>
                  ) : (
                    <>
                      <span>Kirim Aspirasi</span>
                      <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">
                        send
                      </span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
