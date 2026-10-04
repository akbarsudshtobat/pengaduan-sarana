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
      <div className="flex flex-col gap-6 p-6 sm:p-8 bg-slate-900 text-white rounded-2xl shadow-2xl relative overflow-hidden ring-1 ring-white/10">
        {/* Glow effects */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-primary/30 rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-48 h-48 bg-emerald-500/15 rounded-full blur-[60px] pointer-events-none" />
        
        {/* Badge */}
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/10 text-white text-[11px] font-semibold backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="tracking-wide uppercase">Sistem Pemantauan Aktif</span>
          </div>
        </div>

        {/* Title & Description */}
        <div className="relative z-10">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-2">
            Dashboard Pengaduan Sarana
          </h1>
          <p className="text-slate-300 text-sm leading-relaxed max-w-2xl">
            Pusat kendali aspirasi, pelaporan kerusakan fasilitas akademik, dan evaluasi respon pemeliharaan secara real-time.
          </p>
        </div>

        {/* Quick action buttons */}
        <div className="relative z-10 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => setActiveTab('kelola-aspirasi')}
            className="group px-5 py-2.5 rounded-xl font-semibold text-sm bg-white text-slate-900 hover:bg-slate-50 transition-all duration-300 shadow-lg hover:-translate-y-0.5 flex items-center gap-2 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">assignment</span>
            <span>Kelola Laporan</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('kirim-aspirasi')}
            className="group px-5 py-2.5 rounded-xl font-semibold text-sm bg-white/10 text-white border border-white/20 hover:bg-white/20 backdrop-blur-md transition-all duration-300 flex items-center gap-2 cursor-pointer hover:-translate-y-0.5"
          >
            <span className="material-symbols-outlined text-[18px]">add_circle</span>
            <span>Input Form Siswa</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-md">
        {/* Total */}
        <div className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-md border border-slate-100 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 group">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Aspirasi</span>
            <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform duration-300">
              <span className="material-symbols-outlined text-[24px]">assignment</span>
            </div>
          </div>
          <div className="flex items-end gap-3 mb-1">
            <span className="text-4xl font-extrabold text-slate-800">{total}</span>
            <span className="text-xs text-emerald-600 font-semibold flex items-center gap-0.5 bg-emerald-50 px-2 py-1 rounded-lg mb-1">
              <span className="material-symbols-outlined text-[14px]">trending_up</span>
              +12
            </span>
          </div>
          <p className="text-[12px] text-slate-500 font-medium">Bulan ini</p>
        </div>

        {/* Menunggu */}
        <div className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-md border border-slate-100 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 group">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Menunggu Tinjauan</span>
            <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-500 group-hover:scale-110 transition-transform duration-300">
              <span className="material-symbols-outlined text-[24px]">pending_actions</span>
            </div>
          </div>
          <div className="flex items-end gap-3 mb-1">
            <span className="text-4xl font-extrabold text-slate-800">{countMenunggu}</span>
            {countMenunggu > 0 && (
              <span className="text-xs text-amber-600 font-semibold flex items-center gap-0.5 bg-amber-50 px-2 py-1 rounded-lg mb-1 animate-pulse">
                Perlu Respon
              </span>
            )}
          </div>
          <p className="text-[12px] text-slate-500 font-medium">Laporan baru</p>
        </div>

        {/* Dalam Proses */}
        <div className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-md border border-slate-100 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 group">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Sedang Dikerjakan</span>
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-500 group-hover:scale-110 transition-transform duration-300">
              <span className="material-symbols-outlined text-[24px]">autorenew</span>
            </div>
          </div>
          <div className="flex items-end gap-3 mb-1">
            <span className="text-4xl font-extrabold text-slate-800">{countProses}</span>
            {countProses > 0 && (
              <span className="text-xs text-indigo-600 font-semibold flex items-center gap-0.5 bg-indigo-50 px-2 py-1 rounded-lg mb-1">
                Teknisi aktif
              </span>
            )}
          </div>
          <p className="text-[12px] text-slate-500 font-medium">Proses perbaikan</p>
        </div>

        {/* Tingkat Selesai */}
        <div className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-md border border-slate-100 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 group relative overflow-hidden">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-emerald-50 rounded-full blur-xl pointer-events-none" />
          <div className="flex items-center justify-between mb-4 relative z-10">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Selesai Diperbaiki</span>
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-500 group-hover:scale-110 transition-transform duration-300">
              <span className="material-symbols-outlined text-[24px]">task_alt</span>
            </div>
          </div>
          <div className="flex items-end gap-3 mb-1 relative z-10">
            <span className="text-4xl font-extrabold text-emerald-600">{countSelesai}</span>
            <span className="text-xs text-emerald-700 font-semibold bg-emerald-100 px-2 py-1 rounded-lg mb-1 shadow-sm">
              {rateSelesai}% Sukses
            </span>
          </div>
          <p className="text-[12px] text-slate-500 font-medium relative z-10">Fasilitas normal</p>
        </div>
      </div>

      {/* Middle Grid: Category Breakdown & Resolution Progress */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-lg">
        {/* Category distribution */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow border border-slate-100 flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-headline-md text-lg sm:text-xl text-slate-800 font-bold">
                Distribusi Laporan Kategori
              </h3>
              <p className="text-sm text-slate-500 mt-1">
                Sebaran masalah sarana dan prasarana berdasarkan unit fasilitas
              </p>
            </div>
            <button
              type="button"
              onClick={() => setActiveTab('kelola-aspirasi')}
              className="text-sm text-primary font-semibold hover:text-primary-container transition-colors flex items-center gap-1 group"
            >
              Lihat Detail <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
            </button>
          </div>

          <div className="space-y-5 mt-2">
            {categoryStats.map((cat, idx) => (
              <div key={cat.id} className="space-y-2 group">
                <div className="flex items-center justify-between text-sm font-semibold">
                  <span className="text-slate-700 flex items-center gap-2">
                    <span className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-primary border border-slate-100 group-hover:border-primary/20 transition-colors">
                      <span className="material-symbols-outlined text-[18px]">{cat.icon}</span>
                    </span>
                    {cat.nama}
                  </span>
                  <span className="text-slate-500 font-medium bg-slate-50 px-2 py-1 rounded-md">
                    <span className="text-slate-800 font-bold">{cat.count}</span> Laporan ({cat.percentage}%)
                  </span>
                </div>
                <div className="w-full h-3 rounded-full bg-slate-100 overflow-hidden shadow-inner">
                  <div
                    className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-1000 ease-out relative overflow-hidden"
                    style={{ width: `${Math.max(4, cat.percentage * 1.5)}%` }}
                  >
                    <div className="absolute inset-0 bg-white/20 animate-[shimmer_2s_infinite] -translate-x-full" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Resolution & UKK summary */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow border border-slate-100 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-[100px] pointer-events-none" />
          
          <div className="relative z-10">
            <h3 className="font-headline-md text-lg sm:text-xl text-slate-800 font-bold mb-1">
              Status Respon Fasilitas
            </h3>
            <p className="text-sm text-slate-500 mb-6">
              Indikator efisiensi penanganan pengaduan
            </p>

            <div className="p-6 bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl mb-6 text-center border border-slate-200/50 shadow-inner">
              <div className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary mb-2">
                74.2%
              </div>
              <p className="text-sm font-bold text-slate-700">Tingkat Penyelesaian</p>
              <p className="text-xs text-slate-500 mt-1 font-medium">Rata-rata respon perbaikan 1-3 hari</p>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-red-50 border border-red-100/50">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  <span className="text-red-900 font-semibold">Urgensi Tinggi</span>
                </div>
                <span className="font-bold text-red-600 bg-white px-2.5 py-0.5 rounded-lg shadow-sm">
                  {aspirasiList.filter((a) => a.urgensi === 'Tinggi').length} Kasus
                </span>
              </div>
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-amber-50 border border-amber-100/50">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                  <span className="text-amber-900 font-semibold">Urgensi Sedang</span>
                </div>
                <span className="font-bold text-amber-600 bg-white px-2.5 py-0.5 rounded-lg shadow-sm">
                  {aspirasiList.filter((a) => a.urgensi === 'Sedang').length} Kasus
                </span>
              </div>
            </div>
          </div>

          <div className="pt-6 mt-6 border-t border-slate-100 relative z-10">
            <button
              type="button"
              onClick={() => setIsSqlModalOpen(true)}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm py-3 px-4 rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 group"
            >
              <span className="material-symbols-outlined text-[18px] text-primary-fixed-dim transition-transform group-hover:rotate-12">schema</span>
              <span>Lihat ERD &amp; Skema Database</span>
            </button>
          </div>
        </div>
      </div>

      {/* Recent Aspirations Section */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow border border-slate-100">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="font-headline-md text-lg sm:text-xl text-slate-800 font-bold">
              Laporan Terbaru Masuk
            </h3>
            <p className="text-sm text-slate-500 mt-1">Aspirasi fasilitas yang baru diajukan oleh siswa</p>
          </div>
          <button
            type="button"
            onClick={() => setActiveTab('kelola-aspirasi')}
            className="text-sm text-primary font-semibold hover:text-primary-container transition-colors flex items-center gap-1 group bg-slate-50 px-4 py-2 rounded-xl"
          >
            Buka Semua ({aspirasiList.length}) <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
          </button>
        </div>

        <div className="space-y-3">
          {aspirasiList.slice(0, 4).map((item) => (
            <div
              key={item.id}
              className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50 rounded-2xl transition-all border border-transparent hover:border-slate-100 group"
            >
              <div className="flex items-start gap-4">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-sm ${
                    item.status === 'Menunggu'
                      ? 'bg-amber-100 text-amber-600'
                      : item.status === 'Proses'
                      ? 'bg-indigo-100 text-indigo-600'
                      : 'bg-emerald-100 text-emerald-600'
                  }`}
                >
                  <span className="material-symbols-outlined text-[24px]">
                    {item.status === 'Menunggu' ? 'pending_actions' : item.status === 'Proses' ? 'autorenew' : 'task_alt'}
                  </span>
                </div>
                <div>
                  <div className="flex items-center gap-2.5 flex-wrap mb-1">
                    <span className="font-bold text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md border border-slate-200">{item.id}</span>
                    <span className="font-bold text-sm text-slate-800">{item.kategori}</span>
                    <span className="text-xs text-slate-500 font-medium flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">location_on</span>
                      {item.lokasi}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 line-clamp-1 mb-1.5">{item.deskripsi}</p>
                  <div className="flex items-center gap-2 text-[11px] font-medium text-slate-400">
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">person</span>
                      {item.nama_siswa} ({item.kelas})
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">calendar_today</span>
                      {item.tanggal}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-center opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                <button
                  type="button"
                  onClick={() => setSelectedAspirasiToEdit(item)}
                  className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-primary text-sm font-semibold flex items-center gap-1.5 transition-all shadow-sm"
                >
                  <span className="material-symbols-outlined text-[18px]">edit_document</span>
                  <span>Tanggapi</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedAspirasiDetail(item)}
                  className="px-4 py-2 rounded-xl bg-primary text-white hover:bg-primary-container text-sm font-semibold transition-all shadow-sm"
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
