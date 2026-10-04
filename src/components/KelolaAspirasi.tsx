import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { Aspirasi, StatusAspirasi } from '../types';
import { KATEGORI_LIST } from '../data/mockData';

export const KelolaAspirasi: React.FC = () => {
  const {
    aspirasiList,
    setSelectedAspirasiDetail,
    setSelectedAspirasiToEdit,
    showToast,
  } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [filterKategori, setFilterKategori] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterDate, setFilterDate] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showAdvancedFilter, setShowAdvancedFilter] = useState(false);
  const [urgensiFilter, setUrgensiFilter] = useState<string>('all');
  const itemsPerPage = 6;

  // Filtered List
  const filteredData = useMemo(() => {
    return aspirasiList.filter((item) => {
      const q = searchTerm.toLowerCase().trim();
      const matchesSearch =
        !q ||
        item.id.toLowerCase().includes(q) ||
        item.nis.toLowerCase().includes(q) ||
        item.nama_siswa.toLowerCase().includes(q) ||
        item.lokasi.toLowerCase().includes(q) ||
        item.deskripsi.toLowerCase().includes(q);

      const matchesCat = !filterKategori || item.kategori === filterKategori;
      const matchesStatus = !filterStatus || item.status === filterStatus;
      const matchesUrgensi = urgensiFilter === 'all' || item.urgensi === urgensiFilter;

      // Simple date match check if specified
      let matchesDate = true;
      if (filterDate) {
        // filterDate is YYYY-MM-DD
        const [year, month] = filterDate.split('-');
        const itemMonthMap: { [key: string]: string } = {
          'Jan': '01', 'Feb': '02', 'Mar': '03', 'Apr': '04', 'Mei': '05', 'Jun': '06',
          'Jul': '07', 'Agu': '08', 'Sep': '09', 'Okt': '10', 'Nov': '11', 'Des': '12'
        };
        const itemParts = item.tanggal.split(' ');
        if (itemParts.length >= 3) {
          const mCode = itemMonthMap[itemParts[1]] || '10';
          const yCode = itemParts[2];
          matchesDate = (!year || yCode === year) && (!month || mCode === month);
        }
      }

      return matchesSearch && matchesCat && matchesStatus && matchesUrgensi && matchesDate;
    });
  }, [aspirasiList, searchTerm, filterKategori, filterStatus, filterDate, urgensiFilter]);

  // Statistics
  const totalCount = 342; // as in design mockup, or dynamic
  const actualTotal = aspirasiList.length;
  const countMenunggu = aspirasiList.filter((a) => a.status === 'Menunggu').length;
  const countProses = aspirasiList.filter((a) => a.status === 'Proses').length;
  const countSelesai = aspirasiList.filter((a) => a.status === 'Selesai').length;

  // Pagination
  const totalPages = Math.max(1, Math.ceil(filteredData.length / itemsPerPage));
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredData.slice(start, start + itemsPerPage);
  }, [filteredData, currentPage, itemsPerPage]);

  // CSV Export handler
  const handleExportCSV = () => {
    const headers = ['ID', 'Tanggal', 'ID/NIS', 'Nama Pelapor', 'Peran', 'Kategori', 'Lokasi', 'Status', 'Tanggapan Admin', 'Deskripsi'];
    const rows = filteredData.map((a) => [
      `"${a.id}"`,
      `"${a.tanggal}"`,
      `"${a.nis}"`,
      `"${a.nama_siswa}"`,
      `"${a.kelas}"`,
      `"${a.kategori}"`,
      `"${a.lokasi}"`,
      `"${a.status}"`,
      `"${a.feedback.replace(/"/g, '""')}"`,
      `"${a.deskripsi.replace(/"/g, '""')}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Rekap_Aspirasi_Sarana_Sekolah_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast('Data pengaduan sarana berhasil diekspor ke CSV!', 'success');
  };

  // Helper avatar colors
  const getAvatarColors = (name: string) => {
    const initials = name
      .split(' ')
      .map((n) => n[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();

    if (initials.includes('A')) return { initials, bg: 'bg-primary-fixed-dim', text: 'text-on-primary-fixed-variant' };
    if (initials.includes('S')) return { initials, bg: 'bg-tertiary-fixed-dim', text: 'text-on-tertiary-fixed-variant' };
    return { initials, bg: 'bg-[#d1fae5]', text: 'text-[#047857]' };
  };

  return (
    <div className="flex flex-col w-full gap-xl py-2">
      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-md w-full">
        {/* TOTAL LAPORAN */}
        <div className="bg-surface-container-low rounded-xl p-lg shadow-sm border border-outline-variant/20 flex items-center justify-between transition-transform hover:-translate-y-1 hover:shadow-md cursor-pointer relative overflow-hidden group">
          <div className="absolute inset-0 bg-primary/5 translate-y-full transition-transform group-hover:translate-y-0" />
          <div className="flex flex-col gap-xs relative z-10">
            <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider text-[11px] font-bold">
              Total Laporan
            </span>
            <span className="font-headline-xl text-headline-xl text-on-surface font-bold">
              {totalCount}
            </span>
            <span className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-xs text-[11px]">
              <span className="material-symbols-outlined text-[16px] text-primary">trending_up</span>
              +12 bulan ini
            </span>
          </div>
          <div className="w-12 h-12 rounded-full bg-primary-fixed flex items-center justify-center relative z-10 text-on-primary-fixed">
            <span className="material-symbols-outlined text-[24px]">assignment</span>
          </div>
        </div>

        {/* MENUNGGU */}
        <div
          onClick={() => setFilterStatus(filterStatus === 'Menunggu' ? '' : 'Menunggu')}
          className="bg-surface-container-low rounded-xl p-lg shadow-sm border border-outline-variant/20 flex items-center justify-between transition-transform hover:-translate-y-1 hover:shadow-md cursor-pointer relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-[#f59e0b]/5 translate-y-full transition-transform group-hover:translate-y-0" />
          <div className="flex flex-col gap-xs relative z-10">
            <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider text-[11px] font-bold">
              Menunggu
            </span>
            <span className="font-headline-xl text-headline-xl text-on-surface font-bold">
              45
            </span>
            <span className="font-label-sm text-label-sm text-error flex items-center gap-xs text-[11px] font-semibold">
              <span className="material-symbols-outlined text-[16px]">priority_high</span>
              Perlu Tinjauan
            </span>
          </div>
          <div className="w-12 h-12 rounded-full bg-[#fef3c7] flex items-center justify-center relative z-10">
            <span className="material-symbols-outlined text-[24px] text-[#b45309]">pending_actions</span>
          </div>
        </div>

        {/* PROSES */}
        <div
          onClick={() => setFilterStatus(filterStatus === 'Proses' ? '' : 'Proses')}
          className="bg-surface-container-low rounded-xl p-lg shadow-sm border border-outline-variant/20 flex items-center justify-between transition-transform hover:-translate-y-1 hover:shadow-md cursor-pointer relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-secondary/5 translate-y-full transition-transform group-hover:translate-y-0" />
          <div className="flex flex-col gap-xs relative z-10">
            <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider text-[11px] font-bold">
              Proses
            </span>
            <span className="font-headline-xl text-headline-xl text-on-surface font-bold">
              89
            </span>
            <span className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-xs text-[11px]">
              <span className="material-symbols-outlined text-[16px] text-secondary">engineering</span>
              Sedang Dikerjakan
            </span>
          </div>
          <div className="w-12 h-12 rounded-full bg-secondary-fixed flex items-center justify-center relative z-10">
            <span className="material-symbols-outlined text-[24px] text-on-secondary-fixed-variant">autorenew</span>
          </div>
        </div>

        {/* SELESAI */}
        <div
          onClick={() => setFilterStatus(filterStatus === 'Selesai' ? '' : 'Selesai')}
          className="bg-surface-container-low rounded-xl p-lg shadow-sm border border-outline-variant/20 flex items-center justify-between transition-transform hover:-translate-y-1 hover:shadow-md cursor-pointer relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-[#10b981]/5 translate-y-full transition-transform group-hover:translate-y-0" />
          <div className="flex flex-col gap-xs relative z-10">
            <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider text-[11px] font-bold">
              Selesai
            </span>
            <span className="font-headline-xl text-headline-xl text-on-surface font-bold">
              208
            </span>
            <span className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-xs text-[11px] text-[#047857]">
              <span className="material-symbols-outlined text-[16px] text-[#10b981]">check_circle</span>
              Terselesaikan
            </span>
          </div>
          <div className="w-12 h-12 rounded-full bg-[#d1fae5] flex items-center justify-center relative z-10">
            <span className="material-symbols-outlined text-[24px] text-[#047857]">task_alt</span>
          </div>
        </div>
      </div>

      {/* Main Table Container */}
      <div className="bg-surface-container-lowest rounded-2xl shadow-sm border border-outline-variant/30 flex flex-col w-full relative z-20 overflow-hidden">
        {/* Table Top Header */}
        <div className="p-lg flex flex-col md:flex-row md:items-center justify-between gap-md border-b border-outline-variant/40">
          <div className="flex flex-col">
            <h2 className="font-headline-md text-headline-md text-on-surface font-bold">
              Daftar Pengaduan Sarana
            </h2>
            <p className="font-label-md text-label-md text-on-surface-variant text-xs sm:text-sm">
              Manajemen data pengaduan masuk dan pemantauan perbaikan fasilitas.
            </p>
          </div>
          <div className="flex items-center gap-sm sm:gap-md flex-wrap">
            <button
              type="button"
              onClick={() => setShowAdvancedFilter(!showAdvancedFilter)}
              className={`flex items-center gap-xs px-md py-sm rounded-xl transition-colors font-label-md text-xs sm:text-sm font-semibold border ${
                showAdvancedFilter
                  ? 'bg-primary text-on-primary border-primary'
                  : 'bg-surface-container hover:bg-surface-container-high text-on-surface border-transparent'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">filter_list</span>
              <span>Filter Lanjutan</span>
            </button>
            <button
              type="button"
              onClick={handleExportCSV}
              className="flex items-center gap-xs px-md py-sm bg-primary hover:bg-primary-container text-on-primary rounded-xl transition-colors font-label-md text-xs sm:text-sm font-semibold shadow-xs"
            >
              <span className="material-symbols-outlined text-[18px]">download</span>
              <span>Ekspor CSV</span>
            </button>
          </div>
        </div>

        {/* Filter Toolbar */}
        <div className="p-md flex flex-wrap items-center gap-md bg-surface-container-lowest border-b border-outline-variant/30">
          {/* Search bar */}
          <div className="flex-1 min-w-[220px] relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[20px]">
              search
            </span>
            <input
              className="w-full pl-10 pr-4 py-2 bg-surface rounded-xl border border-outline-variant/40 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary font-body-md text-sm text-on-surface placeholder:text-outline transition-all"
              placeholder="Cari ID/NIS, Nama Pelapor, atau ID..."
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface"
              >
                <span className="material-symbols-outlined text-[16px]">close</span>
              </button>
            )}
          </div>

          {/* Kategori Dropdown */}
          <div className="relative min-w-[160px]">
            <select
              className="w-full appearance-none pl-4 pr-10 py-2 bg-surface rounded-xl border border-outline-variant/40 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary font-body-md text-xs sm:text-sm text-on-surface cursor-pointer font-medium"
              value={filterKategori}
              onChange={(e) => {
                setFilterKategori(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="">Semua Kategori</option>
              {KATEGORI_LIST.map((k) => (
                <option key={k.id} value={k.nama}>
                  {k.nama}
                </option>
              ))}
            </select>
            <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-outline pointer-events-none text-[20px]">
              expand_more
            </span>
          </div>

          {/* Status Dropdown */}
          <div className="relative min-w-[150px]">
            <select
              className="w-full appearance-none pl-4 pr-10 py-2 bg-surface rounded-xl border border-outline-variant/40 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary font-body-md text-xs sm:text-sm text-on-surface cursor-pointer font-medium"
              value={filterStatus}
              onChange={(e) => {
                setFilterStatus(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="">Semua Status</option>
              <option value="Menunggu">Menunggu</option>
              <option value="Proses">Proses</option>
              <option value="Selesai">Selesai</option>
            </select>
            <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-outline pointer-events-none text-[20px]">
              expand_more
            </span>
          </div>

          {/* Date Picker */}
          <div className="relative min-w-[160px]">
            <input
              className="w-full pl-4 pr-4 py-2 bg-surface rounded-xl border border-outline-variant/40 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary font-body-md text-xs sm:text-sm text-on-surface cursor-pointer font-medium"
              type="date"
              value={filterDate}
              onChange={(e) => {
                setFilterDate(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
        </div>

        {/* Optional Advanced Filter Drawer */}
        {showAdvancedFilter && (
          <div className="p-md bg-surface-container-low border-b border-outline-variant/30 flex flex-wrap items-center justify-between gap-md animate-in slide-in-from-top-2 duration-200">
            <div className="flex items-center gap-md flex-wrap">
              <span className="text-xs font-bold text-on-surface">Filter Tambahan:</span>
              <div className="flex items-center gap-1.5">
                <span className="text-xs text-on-surface-variant">Tingkat Urgensi:</span>
                {['all', 'Tinggi', 'Sedang', 'Rendah'].map((u) => (
                  <button
                    key={u}
                    type="button"
                    onClick={() => setUrgensiFilter(u)}
                    className={`text-xs px-2.5 py-1 rounded-lg border font-medium ${
                      urgensiFilter === u
                        ? 'bg-primary text-on-primary border-primary'
                        : 'bg-surface-container-lowest text-on-surface-variant border-outline-variant/40 hover:bg-surface-container'
                    }`}
                  >
                    {u === 'all' ? 'Semua' : u}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                setSearchTerm('');
                setFilterKategori('');
                setFilterStatus('');
                setFilterDate('');
                setUrgensiFilter('all');
              }}
              className="text-xs text-error font-semibold hover:underline flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-[16px]">restart_alt</span>
              Reset Filter
            </button>
          </div>
        )}

        {/* Data Table */}
        <div className="w-full overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[850px]">
            <thead>
              <tr className="bg-surface-container text-on-surface-variant border-b border-outline-variant/40">
                <th className="py-3 px-4 font-label-md text-label-md uppercase tracking-wider w-[100px] text-xs font-semibold">
                  ID
                </th>
                <th className="py-3 px-4 font-label-md text-label-md uppercase tracking-wider w-[120px] text-xs font-semibold">
                  Tanggal
                </th>
                <th className="py-3 px-4 font-label-md text-label-md uppercase tracking-wider text-xs font-semibold">
                  Pelapor (Siswa)
                </th>
                <th className="py-3 px-4 font-label-md text-label-md uppercase tracking-wider text-xs font-semibold">
                  Kategori &amp; Lokasi
                </th>
                <th className="py-3 px-4 font-label-md text-label-md uppercase tracking-wider w-[140px] text-xs font-semibold">
                  Status
                </th>
                <th className="py-3 px-4 font-label-md text-label-md uppercase tracking-wider w-[120px] text-center text-xs font-semibold">
                  Aksi
                </th>
              </tr>
            </thead>

            <tbody className="bg-surface-container-lowest font-body-md text-body-md text-on-surface divide-y divide-outline-variant/20">
              {paginatedData.length > 0 ? (
                paginatedData.map((item) => {
                  const avatar = getAvatarColors(item.nama_siswa);
                  return (
                    <tr
                      key={item.id}
                      className="border-b border-outline-variant/30 hover:bg-surface-container-low/60 transition-colors group"
                    >
                      {/* ID */}
                      <td className="py-3 px-4">
                        <span
                          onClick={() => setSelectedAspirasiDetail(item)}
                          className="font-label-md text-label-md text-primary font-bold cursor-pointer hover:underline"
                        >
                          {item.id}
                        </span>
                      </td>

                      {/* Tanggal */}
                      <td className="py-3 px-4 text-on-surface-variant text-[14px]">
                        {item.tanggal}
                      </td>

                      {/* Pelapor (Siswa) */}
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-8 h-8 rounded-full ${avatar.bg} ${avatar.text} flex items-center justify-center font-label-md text-xs font-bold shrink-0`}
                          >
                            {avatar.initials}
                          </div>
                          <div className="flex flex-col">
                            <span className="font-label-md text-sm font-semibold text-on-surface">
                              {item.nama_siswa}
                            </span>
                            <span className="text-[12px] text-on-surface-variant">
                              ID/NIS: {item.nis} • Peran: {item.kelas}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Kategori & Lokasi */}
                      <td className="py-3 px-4">
                        <div className="flex flex-col">
                          <span className="font-label-md text-sm text-on-surface font-semibold">
                            {item.kategori}
                          </span>
                          <span className="text-[12px] text-on-surface-variant flex items-center gap-1">
                            <span className="material-symbols-outlined text-[14px]">location_on</span>
                            {item.lokasi}
                          </span>
                        </div>
                      </td>

                      {/* Status */}
                      <td className="py-3 px-4">
                        {item.status === 'Menunggu' && (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#fef3c7] text-[#b45309] font-label-sm text-label-sm font-bold text-xs">
                            <span className="w-2 h-2 rounded-full bg-[#b45309]" />
                            Menunggu
                          </span>
                        )}
                        {item.status === 'Proses' && (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed-variant font-label-sm text-label-sm font-bold text-xs">
                            <span className="w-2 h-2 rounded-full bg-secondary" />
                            Proses
                          </span>
                        )}
                        {item.status === 'Selesai' && (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#d1fae5] text-[#047857] font-label-sm text-label-sm font-bold text-xs">
                            <span className="w-2 h-2 rounded-full bg-[#047857]" />
                            Selesai
                          </span>
                        )}
                      </td>

                      {/* Aksi */}
                      <td className="py-3 px-4 text-center">
                        <div className="flex items-center justify-center gap-1">
                          {/* Edit status & feedback modal */}
                          <button
                            type="button"
                            onClick={() => setSelectedAspirasiToEdit(item)}
                            title="Tindak Lanjut &amp; Berikan Umpan Balik"
                            className="w-8 h-8 rounded-full hover:bg-surface-container-high text-on-surface-variant flex items-center justify-center transition-colors hover:text-primary"
                          >
                            <span className="material-symbols-outlined text-[20px]">edit_document</span>
                          </button>

                          {/* View Detail Modal */}
                          <button
                            type="button"
                            onClick={() => setSelectedAspirasiDetail(item)}
                            title="Lihat Detail Lengkap"
                            className="w-8 h-8 rounded-full hover:bg-surface-container-high text-on-surface-variant flex items-center justify-center transition-colors hover:text-primary"
                          >
                            <span className="material-symbols-outlined text-[20px]">visibility</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-on-surface-variant">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <span className="material-symbols-outlined text-[36px] text-outline">inbox</span>
                      <p className="font-semibold text-sm">Tidak ada data pengaduan yang sesuai filter.</p>
                      <p className="text-xs text-outline">Coba ubah kata kunci pencarian atau status filter.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="p-md border-t border-outline-variant/40 flex flex-col sm:flex-row items-center justify-between gap-md text-on-surface-variant">
          <span className="font-label-sm text-[12px]">
            Menampilkan {paginatedData.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0}-
            {Math.min(currentPage * itemsPerPage, filteredData.length)} dari {totalCount} Laporan
          </span>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="w-8 h-8 rounded-lg hover:bg-surface-container flex items-center justify-center transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <span className="material-symbols-outlined text-[20px]">chevron_left</span>
            </button>

            {[1, 2, 3].map((num) => (
              <button
                key={num}
                type="button"
                onClick={() => setCurrentPage(num)}
                className={`w-8 h-8 rounded-lg font-label-md text-xs font-semibold flex items-center justify-center transition-colors ${
                  currentPage === num
                    ? 'bg-primary text-on-primary shadow-xs'
                    : 'hover:bg-surface-container text-on-surface'
                }`}
              >
                {num}
              </button>
            ))}

            <span className="px-1 text-[14px]">...</span>

            <button
              type="button"
              onClick={() => setCurrentPage(35)}
              className={`w-8 h-8 rounded-lg font-label-md text-xs font-semibold flex items-center justify-center transition-colors ${
                currentPage === 35
                  ? 'bg-primary text-on-primary shadow-xs'
                  : 'hover:bg-surface-container text-on-surface'
              }`}
            >
              35
            </button>

            <button
              type="button"
              onClick={() => setCurrentPage((p) => Math.min(35, p + 1))}
              className="w-8 h-8 rounded-lg hover:bg-surface-container flex items-center justify-center transition-colors"
            >
              <span className="material-symbols-outlined text-[20px]">chevron_right</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
