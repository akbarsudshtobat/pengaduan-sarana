import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { KATEGORI_LIST } from '../data/mockData';

export const FormAspirasi: React.FC = () => {
  const { addAspirasi, setActiveTab, setSearchNisInput, students } = useApp();

  const [nis, setNis] = useState('');
  const [kategori, setKategori] = useState('');
  const [lokasi, setLokasi] = useState('');
  const [deskripsi, setDeskripsi] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedAspirasiId, setSubmittedAspirasiId] = useState<string | null>(null);

  // Check matching enrolled student
  const matchedStudent = students.find((s) => s.nis === nis.trim());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nis || !kategori || !lokasi || !deskripsi) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const created = addAspirasi({
        nis: nis.trim(),
        kategori,
        lokasi: lokasi.trim(),
        deskripsi: deskripsi.trim(),
      });

      setIsSubmitting(false);
      setSubmittedAspirasiId(created.id);
      
      // Reset form
      setNis('');
      setKategori('');
      setLokasi('');
      setDeskripsi('');
    }, 1200);
  };

  const handleQuickStudentSelect = (selectedNis: string) => {
    setNis(selectedNis);
  };

  return (
    <div className="flex flex-col w-full h-full justify-center items-center relative py-6">
      {/* Decorative background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl mix-blend-multiply opacity-20">
        <svg className="absolute top-0 right-1/4 w-[800px] h-[800px] -mt-[400px] -mr-[400px]" viewBox="0 0 800 800">
          <circle className="text-primary-container blur-[120px]" cx="400" cy="400" fill="currentColor" r="400" />
        </svg>
        <svg className="absolute bottom-0 left-0 w-[600px] h-[600px] -mb-[300px] -ml-[300px]" viewBox="0 0 600 600">
          <circle className="text-secondary blur-[100px]" cx="300" cy="300" fill="currentColor" r="300" />
        </svg>
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-[800px] my-4 lg:my-8">
        {/* Header Section */}
        <div className="flex flex-col items-center text-center mb-xl">
          <div className="w-16 h-16 bg-primary-container text-on-primary-container rounded-2xl flex items-center justify-center mb-lg shadow-xl shadow-primary-container/20 rotate-3 transition-transform hover:rotate-0 duration-300">
            <span className="material-symbols-outlined text-[32px] material-symbols-fill">campaign</span>
          </div>
          <h1 className="font-headline-xl text-headline-xl text-on-surface mb-sm tracking-tight font-bold">
            Form Aspirasi Siswa
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-lg">
            Sampaikan aspirasi, laporan kerusakan, atau saran terkait fasilitas sekolah. Laporan Anda membantu menciptakan lingkungan belajar yang lebih baik.
          </p>
        </div>

        {/* Success Banner if just submitted */}
        {submittedAspirasiId && (
          <div className="mb-lg p-lg bg-[#dcfce7] border border-[#86efac] rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-md animate-in fade-in slide-in-from-top-4 duration-300 shadow-sm">
            <div className="flex items-center gap-md">
              <div className="w-10 h-10 rounded-full bg-[#166534] text-white flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[20px]">check</span>
              </div>
              <div>
                <p className="font-label-md text-sm font-bold text-[#166534]">
                  Laporan Berhasil Terkirim dengan Kode ID: {submittedAspirasiId}
                </p>
                <p className="text-xs text-[#166534]/90">
                  Data Anda telah masuk ke sistem dan akan segera diverifikasi oleh tim sarpras sekolah.
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                setSearchNisInput(nis || '10293');
                setActiveTab('riwayat-status');
              }}
              className="bg-[#166534] text-white px-md py-sm rounded-xl text-xs font-semibold hover:bg-[#14532d] transition-colors shrink-0"
            >
              Lihat Riwayat &rarr;
            </button>
          </div>
        )}

        {/* Form Card */}
        <div className="bg-surface-container-lowest rounded-3xl p-lg sm:p-xl shadow-2xl shadow-primary/5 transition-shadow hover:shadow-primary/10 border border-outline-variant/20">
          <form className="flex flex-col gap-lg" id="aspirasi-form" onSubmit={handleSubmit}>
            {/* Section 1: Data Diri */}
            <div className="flex flex-col gap-md p-lg bg-surface-container-low rounded-2xl border border-outline-variant/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-sm">
                  <span className="material-symbols-outlined text-primary text-[20px]">badge</span>
                  <span className="font-label-md text-label-md text-on-surface uppercase tracking-wider font-semibold text-xs">
                    Identitas Pelapor
                  </span>
                </div>
                {matchedStudent && (
                  <span className="text-xs bg-primary-fixed text-on-primary-fixed-variant px-2.5 py-1 rounded-full font-semibold flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">verified</span>
                    {matchedStudent.nama} ({matchedStudent.kelas})
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-xs">
                <label className="font-label-md text-label-md text-on-surface text-sm font-semibold" htmlFor="nis">
                  Nomor Induk Siswa (NIS)
                </label>
                <input
                  className="w-full bg-surface-container-lowest text-on-surface font-body-md text-body-md px-md py-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all placeholder:text-outline/50 shadow-sm border border-outline-variant/30"
                  id="nis"
                  name="nis"
                  placeholder="Masukkan NIS Anda (contoh: 10293)"
                  required
                  type="text"
                  value={nis}
                  onChange={(e) => setNis(e.target.value)}
                />
              </div>

              {/* Quick Sample NIS Selector */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                <span className="text-[11px] text-on-surface-variant font-medium">Contoh NIS Siswa:</span>
                {students.slice(0, 4).map((s) => (
                  <button
                    key={s.nis}
                    type="button"
                    onClick={() => handleQuickStudentSelect(s.nis)}
                    className={`text-[11px] px-2 py-0.5 rounded-lg border transition-all ${
                      nis === s.nis
                        ? 'bg-primary text-on-primary border-primary font-bold'
                        : 'bg-surface-container-lowest text-on-surface-variant border-outline-variant/50 hover:border-primary hover:text-primary'
                    }`}
                  >
                    {s.nis} ({s.nama.split(' ')[0]})
                  </button>
                ))}
              </div>
            </div>

            {/* Section 2: Detail Laporan */}
            <div className="flex flex-col gap-md p-lg bg-surface-container-low rounded-2xl border border-outline-variant/20">
              <div className="flex items-center gap-sm mb-xs">
                <span className="material-symbols-outlined text-primary text-[20px]">assignment_late</span>
                <span className="font-label-md text-label-md text-on-surface uppercase tracking-wider font-semibold text-xs">
                  Detail Laporan
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
                <div className="flex flex-col gap-xs">
                  <label className="font-label-md text-label-md text-on-surface text-sm font-semibold" htmlFor="kategori">
                    Kategori Fasilitas
                  </label>
                  <div className="relative">
                    <select
                      className="w-full appearance-none bg-surface-container-lowest text-on-surface font-body-md text-body-md px-md py-sm pr-10 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all shadow-sm cursor-pointer border border-outline-variant/30"
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
                    <span className="material-symbols-outlined absolute right-md top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none text-[20px]">
                      expand_more
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-xs">
                  <label className="font-label-md text-label-md text-on-surface text-sm font-semibold" htmlFor="lokasi">
                    Lokasi Kejadian
                  </label>
                  <input
                    className="w-full bg-surface-container-lowest text-on-surface font-body-md text-body-md px-md py-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all placeholder:text-outline/50 shadow-sm border border-outline-variant/30"
                    id="lokasi"
                    name="lokasi"
                    placeholder="Contoh: Gedung A Lantai 2 / Kelas XII IPA 2"
                    required
                    type="text"
                    value={lokasi}
                    onChange={(e) => setLokasi(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-xs mt-sm">
                <label className="font-label-md text-label-md text-on-surface text-sm font-semibold" htmlFor="deskripsi">
                  Deskripsi Masalah
                </label>
                <textarea
                  className="w-full bg-surface-container-lowest text-on-surface font-body-md text-body-md px-md py-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all placeholder:text-outline/50 shadow-sm resize-none border border-outline-variant/30"
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
            <div className="flex justify-end mt-sm">
              <button
                className="bg-primary text-on-primary font-label-md text-label-md px-xl py-md rounded-xl shadow-lg shadow-primary/20 hover:bg-primary-container hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/30 transition-all flex items-center gap-sm group cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed font-semibold text-sm"
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
  );
};
