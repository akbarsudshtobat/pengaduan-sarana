export type StatusAspirasi = 'Menunggu' | 'Proses' | 'Selesai';

export interface Siswa {
  nis: string;
  nama: string;
  kelas: string;
  email?: string;
  telepon?: string;
}

export interface KategoriSarana {
  id: string;
  nama: string;
  icon: string;
  deskripsi?: string;
}

export interface Aspirasi {
  id: string; // e.g. "#RPT-089"
  nis: string;
  nama_siswa: string;
  kelas: string;
  kategori: string;
  lokasi: string;
  deskripsi: string;
  status: StatusAspirasi;
  feedback: string;
  tanggal: string; // e.g. "12 Okt 2023"
  timestamp: number;
  foto_url?: string;
  urgensi?: 'Rendah' | 'Sedang' | 'Tinggi';
}

export interface AdminUser {
  id: string;
  username: string;
  nama: string;
  role: string;
  avatar?: string;
}

export type ActiveTab = 'landing' | 'dashboard' | 'kelola-aspirasi' | 'kirim-aspirasi' | 'riwayat-status' | 'login';
