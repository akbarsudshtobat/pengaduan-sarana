import React from 'react';
import { useApp } from '../context/AppContext';
import { KATEGORI_LIST } from '../data/mockData';

export const DashboardView: React.FC = () => {
  const { aspirasiList, setActiveTab, setSelectedAspirasiDetail, setSelectedAspirasiToEdit, setIsSqlModalOpen } = useApp();

  const countMenunggu = aspirasiList.filter((a) => a.status === 'Menunggu').length;
  const countProses = aspirasiList.filter((a) => a.status === 'Proses').length;
  const countSelesai = aspirasiList.filter((a) => a.status === 'Selesai').length;
  const total = aspirasiList.length;

  const rateSelesai = total > 0 ? Math.round((countSelesai / total) * 100) : 0;

  // Category counts
  const categoryStats = KATEGORI_LIST.map((k) => {
    const count = aspirasiList.filter((a) => a.kategori === k.nama).length;
    const percentage = total > 0 ? Math.round((count / total) * 100) : 0;
    return { ...k, count, percentage };
  });

  return (
    <div className="flex flex-col w-full gap-xl py-2">
      {/* Top Banner Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-md p-lg sm:p-xl bg-gradient-to-r from-primary to-primary-container text-white rounded-3xl shadow-lg relative overflow-hidden">
        <div className="relative z-10 max-w-xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-white text-xs font-semibold mb-3 backdrop-blur-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Sistem Pemantauan Sarpras Aktif</span>
          </div>
          <h1 className="font-headline-xl text-2xl sm:text-3xl font-bold tracking-tight text-white mb-2">
            Dashboard Pengaduan Sarana
          </h1>
          <p className="text-white/80 text-sm sm:text-base leading-relaxed">
            Pusat kendali aspirasi, pelaporan kerusakan fasilitas akademik, dan evaluasi respon pemeliharaan sekolah secara real-time.
          </p>
        </div>

        {/* Quick action buttons on banner */}
        <div className="relative z-10 flex flex-wrap gap-2.5 sm:self-center">
          <button
            type="button"
            onClick={() => setActiveTab('kelola-aspirasi')}
            className="bg-white text-primary px-lg py-2.5 rounded-xl font-semibold text-xs sm:text-sm hover:bg-surface-container transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">assignment</span>
            <span>Kelola Laporan</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('kirim-aspirasi')}
            className="bg-white/20 text-white border border-white/30 px-lg py-2.5 rounded-xl font-semibold text-xs sm:text-sm hover:bg-white/30 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">add_circle</span>
            <span>Input Form Siswa</span>
          </button>
        </div>

        {/* Decorative circle shapes */}
        <div className="absolute right-0 top-0 w-80 h-80 bg-white/5 rounded-full blur-2xl -mr-20 -mt-20 pointer-events-none" />
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-md">
        {/* Total */}
        <div className="bg-surface-container-lowest rounded-2xl p-lg shadow-xs border border-outline-variant/30 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Total Aspirasi</span>
            <div className="w-10 h-10 rounded-xl bg-primary-fixed flex items-center justify-center text-on-primary-fixed">
              <span className="material-symbols-outlined text-[20px]">assignment</span>
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-on-surface">{total}</span>
            <span className="text-xs text-primary font-semibold flex items-center gap-0.5">
              <span className="material-symbols-outlined text-[14px]">trending_up</span>
              +12 bulan ini
            </span>
          </div>
          <p className="text-[11px] text-on-surface-variant mt-2">Seluruh pengaduan masuk sejak awal semester</p>
        </div>

        {/* Menunggu */}
        <div className="bg-surface-container-lowest rounded-2xl p-lg shadow-xs border border-outline-variant/30 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Menunggu Tinjauan</span>
            <div className="w-10 h-10 rounded-xl bg-[#fef3c7] flex items-center justify-center text-[#b45309]">
              <span className="material-symbols-outlined text-[20px]">pending_actions</span>
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-on-surface">{countMenunggu}</span>
            <span className="text-xs text-error font-semibold flex items-center gap-0.5">
              <span className="material-symbols-outlined text-[14px]">priority_high</span>
              Perlu Respon
            </span>
          </div>
          <p className="text-[11px] text-on-surface-variant mt-2">Laporan baru yang belum ditindaklanjuti</p>
        </div>

        {/* Dalam Proses */}
        <div className="bg-surface-container-lowest rounded-2xl p-lg shadow-xs border border-outline-variant/30 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Sedang Dikerjakan</span>
            <div className="w-10 h-10 rounded-xl bg-secondary-fixed flex items-center justify-center text-on-secondary-fixed-variant">
              <span className="material-symbols-outlined text-[20px]">autorenew</span>
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-on-surface">{countProses}</span>
            <span className="text-xs text-secondary font-semibold flex items-center gap-0.5">
              <span className="material-symbols-outlined text-[14px]">engineering</span>
              Teknisi aktif
            </span>
          </div>
          <p className="text-[11px] text-on-surface-variant mt-2">Dalam proses perbaikan &amp; pengadaan</p>
        </div>

        {/* Tingkat Selesai */}
        <div className="bg-surface-container-lowest rounded-2xl p-lg shadow-xs border border-outline-variant/30 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Selesai Diperbaiki</span>
            <div className="w-10 h-10 rounded-xl bg-[#d1fae5] flex items-center justify-center text-[#047857]">
              <span className="material-symbols-outlined text-[20px]">task_alt</span>
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-[#047857]">{countSelesai}</span>
            <span className="text-xs text-[#047857] font-semibold bg-[#d1fae5] px-2 py-0.5 rounded-full">
              {rateSelesai}% Sukses
            </span>
          </div>
          <p className="text-[11px] text-on-surface-variant mt-2">Fasilitas normal &amp; telah dikonfirmasi</p>
        </div>
      </div>

      {/* Middle Grid: Category Breakdown & Resolution Progress */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-lg">
        {/* Category distribution */}
        <div className="lg:col-span-2 bg-surface-container-lowest rounded-2xl p-lg sm:p-xl shadow-xs border border-outline-variant/30 flex flex-col">
          <div className="flex items-center justify-between mb-md">
            <div>
              <h3 className="font-headline-md text-base sm:text-lg text-on-surface font-bold">
                Distribusi Laporan per Kategori
              </h3>
              <p className="text-xs text-on-surface-variant">
                Sebaran masalah sarana dan prasarana berdasarkan unit fasilitas
              </p>
            </div>
            <button
              type="button"
              onClick={() => setActiveTab('kelola-aspirasi')}
              className="text-xs text-primary font-semibold hover:underline"
            >
              Lihat Detail &rarr;
            </button>
          </div>

          <div className="space-y-3.5 mt-2">
            {categoryStats.map((cat) => (
              <div key={cat.id} className="space-y-1">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-on-surface flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px] text-primary">{cat.icon}</span>
                    {cat.nama}
                  </span>
                  <span className="text-on-surface-variant">
                    {cat.count} Laporan ({cat.percentage}%)
                  </span>
                </div>
                <div className="w-full h-2 rounded-full bg-surface-container overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all duration-500"
                    style={{ width: `${Math.max(4, cat.percentage * 1.5)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Resolution & UKK summary */}
        <div className="bg-surface-container-lowest rounded-2xl p-lg sm:p-xl shadow-xs border border-outline-variant/30 flex flex-col justify-between">
          <div>
            <h3 className="font-headline-md text-base sm:text-lg text-on-surface font-bold mb-1">
              Status Respon Fasilitas
            </h3>
            <p className="text-xs text-on-surface-variant mb-4">
              Indikator efisiensi penanganan pengaduan
            </p>

            <div className="p-4 bg-surface-container-low rounded-2xl mb-4 text-center">
              <div className="text-4xl font-extrabold text-primary mb-1">74.2%</div>
              <p className="text-xs font-semibold text-on-surface">Tingkat Penyelesaian Masalah</p>
              <p className="text-[11px] text-on-surface-variant mt-1">Rata-rata respon perbaikan 1-3 hari kerja</p>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-surface-container">
                <span className="text-on-surface-variant font-medium">Urgensi Tinggi</span>
                <span className="font-bold text-error">
                  {aspirasiList.filter((a) => a.urgensi === 'Tinggi').length} Kasus
                </span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-surface-container">
                <span className="text-on-surface-variant font-medium">Urgensi Sedang</span>
                <span className="font-bold text-secondary">
                  {aspirasiList.filter((a) => a.urgensi === 'Sedang').length} Kasus
                </span>
              </div>
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-outline-variant/30">
            <button
              type="button"
              onClick={() => setIsSqlModalOpen(true)}
              className="w-full bg-surface-container-high hover:bg-surface-container text-on-surface font-semibold text-xs py-2.5 px-3 rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-[18px] text-primary">schema</span>
              <span>Lihat ERD &amp; Skema Database</span>
            </button>
          </div>
        </div>
      </div>

      {/* Recent Aspirations Section */}
      <div className="bg-surface-container-lowest rounded-2xl p-lg sm:p-xl shadow-xs border border-outline-variant/30">
        <div className="flex items-center justify-between mb-md">
          <div>
            <h3 className="font-headline-md text-base sm:text-lg text-on-surface font-bold">
              Laporan Terbaru Masuk
            </h3>
            <p className="text-xs text-on-surface-variant">Aspirasi fasilitas yang baru diajukan oleh siswa</p>
          </div>
          <button
            type="button"
            onClick={() => setActiveTab('kelola-aspirasi')}
            className="text-xs text-primary font-semibold hover:underline"
          >
            Buka Semua ({aspirasiList.length}) &rarr;
          </button>
        </div>

        <div className="divide-y divide-outline-variant/20">
          {aspirasiList.slice(0, 4).map((item) => (
            <div
              key={item.id}
              className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-surface-container-low/50 px-2 rounded-xl transition-colors"
            >
              <div className="flex items-start gap-3">
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 text-xs font-bold mt-0.5 ${
                    item.status === 'Menunggu'
                      ? 'bg-[#fef3c7] text-[#b45309]'
                      : item.status === 'Proses'
                      ? 'bg-secondary-fixed text-on-secondary-fixed-variant'
                      : 'bg-[#d1fae5] text-[#047857]'
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {item.status === 'Menunggu' ? 'pending_actions' : item.status === 'Proses' ? 'autorenew' : 'task_alt'}
                  </span>
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold text-xs text-primary">{item.id}</span>
                    <span className="font-semibold text-xs text-on-surface">{item.kategori}</span>
                    <span className="text-[11px] text-on-surface-variant">• {item.lokasi}</span>
                  </div>
                  <p className="text-xs text-on-surface-variant line-clamp-1 mt-0.5">{item.deskripsi}</p>
                  <span className="text-[10px] text-on-surface-variant/80">
                    Oleh: {item.nama_siswa} ({item.kelas}) — {item.tanggal}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-center">
                <button
                  type="button"
                  onClick={() => setSelectedAspirasiToEdit(item)}
                  className="px-2.5 py-1 rounded-lg bg-surface-container text-on-surface hover:bg-surface-container-high text-xs font-semibold flex items-center gap-1 transition-colors"
                >
                  <span className="material-symbols-outlined text-[14px]">edit_document</span>
                  <span>Tanggapi</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedAspirasiDetail(item)}
                  className="px-2.5 py-1 rounded-lg bg-primary-fixed text-on-primary-fixed-variant hover:bg-primary-fixed-dim text-xs font-semibold transition-colors"
                >
                  Detail
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
