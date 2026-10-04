import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { Aspirasi } from '../types';

export const RiwayatStatus: React.FC = () => {
  const {
    aspirasiList,
    searchNisInput,
    setSearchNisInput,
    setSelectedAspirasiDetail,
    setActiveTab,
    students,
  } = useApp();

  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  // Filtered aspirasi
  const filteredList = useMemo(() => {
    return aspirasiList.filter((item) => {
      const matchNis =
        !searchNisInput.trim() ||
        item.nis.toLowerCase().includes(searchNisInput.toLowerCase().trim()) ||
        item.nama_siswa.toLowerCase().includes(searchNisInput.toLowerCase().trim());

      const matchCat = filterCategory === 'all' || item.kategori === filterCategory;
      const matchStatus = filterStatus === 'all' || item.status === filterStatus;

      return matchNis && matchCat && matchStatus;
    });
  }, [aspirasiList, searchNisInput, filterCategory, filterStatus]);

  // Statistics counters
  const countMenunggu = filteredList.filter((a) => a.status === 'Menunggu').length;
  const countProses = filteredList.filter((a) => a.status === 'Proses').length;
  const countSelesai = filteredList.filter((a) => a.status === 'Selesai').length;

  const getCategoryIcon = (cat: string) => {
    const lower = cat.toLowerCase();
    if (lower.includes('kelas') || lower.includes('fasilitas')) return 'build';
    if (lower.includes('infra') || lower.includes('it') || lower.includes('wi-fi')) return 'wifi';
    if (lower.includes('bersih')) return 'cleaning_services';
    if (lower.includes('lab')) return 'biotech';
    if (lower.includes('kamar') || lower.includes('toilet') || lower.includes('mandi')) return 'water_drop';
    if (lower.includes('olahraga')) return 'sports_basketball';
    return 'category';
  };

  return (
    <div className="flex flex-col w-full gap-lg py-2">
      {/* Top Header & Search Bar */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-md gap-lg">
        <div className="flex-1 min-w-0">
          <h1 className="text-3xl lg:text-4xl font-extrabold text-slate-800 tracking-tight">
            Riwayat &amp; Status Aspirasi
          </h1>
        </div>

        {/* NIS Search Input */}
        <div className="flex-shrink-0 w-full lg:w-auto relative">
          <div className="absolute inset-y-0 left-0 pl-md flex items-center pointer-events-none">
            <span className="material-symbols-outlined text-outline text-[20px]">search</span>
          </div>
          <input
            className="w-full lg:w-80 pl-2xl pr-md py-md bg-surface-container-lowest text-on-surface font-body-md text-body-md rounded-xl shadow-xs border border-outline-variant/30 focus:outline-none focus:ring-2 focus:ring-primary transition-all placeholder:text-outline-variant text-sm"
            id="nisSearch"
            placeholder="Masukkan ID/NIS Anda..."
            type="text"
            value={searchNisInput}
            onChange={(e) => setSearchNisInput(e.target.value)}
          />
          {searchNisInput && (
            <button
              type="button"
              onClick={() => setSearchNisInput('')}
              className="absolute inset-y-0 right-0 pr-md flex items-center text-on-surface-variant hover:text-on-surface"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          )}
        </div>
      </div>

      {/* Quick Filter Bar & NIS Chips */}
      <div className="flex flex-wrap items-center justify-between gap-2 p-3 bg-surface-container-low rounded-2xl border border-outline-variant/30">
        <div className="flex flex-wrap items-center gap-1.5 text-xs text-on-surface-variant">
          <span className="font-semibold text-on-surface">Pilih ID/NIS Pelapor:</span>
          {students.map((s) => (
            <button
              key={s.nis}
              type="button"
              onClick={() => setSearchNisInput(s.nis)}
              className={`px-2.5 py-1 rounded-lg transition-all font-medium ${
                searchNisInput === s.nis
                  ? 'bg-primary text-on-primary font-bold shadow-xs'
                  : 'bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
              }`}
            >
              {s.nis} ({s.nama.split(' ')[0]})
            </button>
          ))}
          {searchNisInput && (
            <button
              type="button"
              onClick={() => setSearchNisInput('')}
              className="px-2 py-1 rounded-lg text-primary hover:underline font-bold"
            >
              Tampilkan Semua
            </button>
          )}
        </div>

        <div className="flex items-center gap-2">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="text-xs bg-surface-container-lowest text-on-surface px-3 py-1.5 rounded-lg border border-outline-variant/30 focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer"
          >
            <option value="all">Semua Status</option>
            <option value="Menunggu">Menunggu</option>
            <option value="Proses">Proses</option>
            <option value="Selesai">Selesai</option>
          </select>
        </div>
      </div>

      {/* 3 Status Summary Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-lg mb-md">
        {/* Menunggu */}
        <div className="bg-surface-container-lowest rounded-2xl p-lg shadow-xs border border-outline-variant/20 flex items-center gap-md relative overflow-hidden group hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center shrink-0 text-on-surface-variant group-hover:bg-primary group-hover:text-on-primary transition-colors">
            <span className="material-symbols-outlined text-[24px]">pending_actions</span>
          </div>
          <div className="flex flex-col">
            <span className="font-headline-lg text-headline-lg text-on-surface font-bold">
              {searchNisInput ? countMenunggu : 12}
            </span>
            <span className="font-label-md text-label-md text-on-surface-variant text-xs">Menunggu</span>
          </div>
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-surface-variant/20 to-transparent pointer-events-none" />
        </div>

        {/* Proses */}
        <div className="bg-surface-container-lowest rounded-2xl p-lg shadow-xs border border-outline-variant/20 flex items-center gap-md relative overflow-hidden group hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-full bg-secondary-container flex items-center justify-center shrink-0 text-on-secondary-container group-hover:bg-secondary group-hover:text-on-secondary transition-colors">
            <span className="material-symbols-outlined text-[24px]">autorenew</span>
          </div>
          <div className="flex flex-col">
            <span className="font-headline-lg text-headline-lg text-on-surface font-bold">
              {searchNisInput ? countProses : 5}
            </span>
            <span className="font-label-md text-label-md text-on-surface-variant text-xs">Proses</span>
          </div>
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-secondary-container/20 to-transparent pointer-events-none" />
        </div>

        {/* Selesai */}
        <div className="bg-surface-container-lowest rounded-2xl p-lg shadow-xs border border-outline-variant/20 flex items-center gap-md relative overflow-hidden group hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-full bg-[#dcfce7] flex items-center justify-center shrink-0 text-[#166534] group-hover:bg-[#166534] group-hover:text-white transition-colors">
            <span className="material-symbols-outlined text-[24px]">check_circle</span>
          </div>
          <div className="flex flex-col">
            <span className="font-headline-lg text-headline-lg text-on-surface font-bold">
              {searchNisInput ? countSelesai : 28}
            </span>
            <span className="font-label-md text-label-md text-on-surface-variant text-xs">Selesai</span>
          </div>
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#dcfce7]/50 to-transparent pointer-events-none" />
        </div>
      </div>

      {/* Main Aspirasi Table */}
      <div className="bg-surface-container-lowest rounded-2xl shadow-xs border border-outline-variant/20 overflow-hidden mb-lg">
        {filteredList.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse" id="aspirasiTable">
              <thead>
                <tr className="bg-surface-container-low text-on-surface-variant font-label-md text-label-md uppercase tracking-wider text-xs border-b border-outline-variant/30">
                  <th className="p-lg font-semibold w-36">Tanggal</th>
                  <th className="p-lg font-semibold w-48">Kategori</th>
                  <th className="p-lg font-semibold w-56">Lokasi</th>
                  <th className="p-lg font-semibold w-36">Status</th>
                  <th className="p-lg font-semibold">Tanggapan Admin</th>
                </tr>
              </thead>
              <tbody className="text-on-surface font-body-md text-body-md divide-y divide-outline-variant/20" id="tableBody">
                {filteredList.map((item: Aspirasi) => (
                  <tr
                    key={item.id}
                    onClick={() => setSelectedAspirasiDetail(item)}
                    className="hover:bg-surface-container-low/60 transition-colors group cursor-pointer"
                  >
                    {/* Tanggal */}
                    <td className="p-lg whitespace-nowrap text-sm font-medium text-on-surface-variant">
                      <div className="flex flex-col">
                        <span>{item.tanggal}</span>
                        <span className="text-[11px] text-primary font-bold">{item.id}</span>
                      </div>
                    </td>

                    {/* Kategori */}
                    <td className="p-lg">
                      <div className="flex items-center gap-sm text-sm font-medium text-on-surface">
                        <span className="material-symbols-outlined text-outline text-[18px]">
                          {getCategoryIcon(item.kategori)}
                        </span>
                        <span>{item.kategori}</span>
                      </div>
                    </td>

                    {/* Lokasi */}
                    <td className="p-lg text-sm text-on-surface font-medium">
                      <div className="flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[16px] text-on-surface-variant">location_on</span>
                        <span>{item.lokasi}</span>
                      </div>
                    </td>

                    {/* Status Badge */}
                    <td className="p-lg whitespace-nowrap">
                      {item.status === 'Menunggu' && (
                        <span className="inline-flex items-center px-sm py-xs rounded-full bg-surface-container text-on-surface-variant font-label-sm text-label-sm font-bold gap-xs text-xs">
                          <span className="w-2 h-2 rounded-full bg-outline" />
                          Menunggu
                        </span>
                      )}
                      {item.status === 'Proses' && (
                        <span className="inline-flex items-center px-sm py-xs rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-bold gap-xs text-xs">
                          <span className="w-2 h-2 rounded-full bg-white" />
                          Proses
                        </span>
                      )}
                      {item.status === 'Selesai' && (
                        <span className="inline-flex items-center px-sm py-xs rounded-full bg-[#dcfce7] text-[#166534] font-label-sm text-label-sm font-bold gap-xs text-xs">
                          <span className="w-2 h-2 rounded-full bg-[#166534]" />
                          Selesai
                        </span>
                      )}
                    </td>

                    {/* Tanggapan Admin */}
                    <td className="p-lg">
                      <p
                        className={`text-sm line-clamp-1 max-w-[280px] xl:max-w-md ${
                          item.feedback.startsWith('-')
                            ? 'text-on-surface-variant italic'
                            : 'text-on-surface font-medium'
                        }`}
                      >
                        {item.feedback}
                      </p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-2xl px-xl text-center bg-surface-container-lowest" id="emptyState">
            <div className="w-24 h-24 mb-lg rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant/60">
              <span className="material-symbols-outlined text-[48px]">search_off</span>
            </div>
            <h3 className="font-headline-md text-headline-md text-on-surface mb-sm font-bold">
              Belum Ada Riwayat
            </h3>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-md text-sm mb-lg">
              {searchNisInput
                ? `Tidak ditemukan laporan aspirasi untuk kata kunci "${searchNisInput}". Pastikan ID/NIS sudah sesuai.`
                : 'Sepertinya belum ada laporan aspirasi yang terkait dengan ID/NIS tersebut, atau Anda belum pernah mengajukan laporan.'}
            </p>
            <button
              type="button"
              onClick={() => setActiveTab('kirim-aspirasi')}
              className="bg-primary text-on-primary px-lg py-sm rounded-xl font-label-md text-sm hover:bg-primary-container transition-colors inline-flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-[18px]">add_circle</span>
              <span>Buat Aspirasi Baru</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
