import { Aspirasi, KategoriSarana, Siswa } from '../types';

export interface UserAccount {
  email: string;
  password: string;
  role: 'admin' | 'siswa';
  name: string;
  title: string;
  nis?: string;
  adminId?: string;
}

export const USER_ACCOUNTS: UserAccount[] = [
  // Admin accounts
  { email: 'admin@sapa.sch.id', password: 'admin123', role: 'admin', name: 'Budi Darmawan', title: 'Administrator', adminId: 'ADM-001' },
  { email: 'kepala@sapa.sch.id', password: 'kepala123', role: 'admin', name: 'Suharto, S.Pd', title: 'Kepala Sarpras', adminId: 'ADM-002' },
  // Siswa accounts
  { email: 'ahmad@siswa.sch.id', password: 'siswa123', role: 'siswa', name: 'Ahmad Hidayat', title: 'Siswa Kelas XII IPA 2', nis: '10293' },
  { email: 'siti@siswa.sch.id', password: 'siswa123', role: 'siswa', name: 'Siti Rahmawati', title: 'Siswa Kelas XI IPS 1', nis: '10455' },
  { email: 'budi@siswa.sch.id', password: 'siswa123', role: 'siswa', name: 'Budi Kusuma', title: 'Siswa Kelas X MIPA 3', nis: '09882' },
  // Non-Siswa accounts (Guru, Staf, Satpam) -> using 'siswa' role internally so they access the reporting form
  { email: 'joko@sapa.sch.id', password: 'guru123', role: 'siswa', name: 'Pak Joko', title: 'Guru Olahraga', nis: 'GURU-001' },
  { email: 'herman@sapa.sch.id', password: 'aman123', role: 'siswa', name: 'Herman', title: 'Satpam Sekolah', nis: 'STP-001' },
];

export const KATEGORI_LIST: KategoriSarana[] = [
  { id: 'fasilitas-kelas', nama: 'Fasilitas Kelas', icon: 'meeting_room', deskripsi: 'Meja, kursi, papan tulis, proyektor, AC kelas' },
  { id: 'kamar-mandi', nama: 'Kamar Mandi', icon: 'water_drop', deskripsi: 'Kran air, sanitasi, pintu toilet, kebersihan toilet' },
  { id: 'olahraga', nama: 'Olahraga', icon: 'sports_basketball', deskripsi: 'Lapangan basket, net voli, matras, peralatan olahraga' },
  { id: 'infrastruktur', nama: 'Infrastruktur IT', icon: 'wifi', deskripsi: 'Jaringan Wi-Fi, kabel LAN, router, server' },
  { id: 'kebersihan', nama: 'Kebersihan', icon: 'cleaning_services', deskripsi: 'Tempat sampah, saluran air, area taman, koridor' },
  { id: 'fasilitas-umum', nama: 'Fasilitas Umum', icon: 'build', deskripsi: 'Kantin, perpustakaan, musholla, parkiran' },
  { id: 'lainnya', nama: 'Lainnya', icon: 'more_horiz', deskripsi: 'Pengaduan sarana dan prasarana umum lainnya' },
];

export const SISWA_LIST: Siswa[] = [
  { nis: '10293', nama: 'Ahmad Hidayat', kelas: 'XII IPA 2' },
  { nis: '10455', nama: 'Siti Rahmawati', kelas: 'XI IPS 1' },
  { nis: '09882', nama: 'Budi Kusuma', kelas: 'X MIPA 3' },
  { nis: '10341', nama: 'Rian Pratama', kelas: 'XII RPL 1' },
  { nis: '10512', nama: 'Dewi Lestari', kelas: 'XI AKL 2' },
  { nis: '09954', nama: 'Muhammad Fadhil', kelas: 'X TKJ 1' },
  { nis: '10118', nama: 'Nadia Putri', kelas: 'XII MIPA 1' },
  { nis: '10620', nama: 'Dimas Anggara', kelas: 'XI RPL 2' }
];

export const INITIAL_ASPIRASI: Aspirasi[] = [
  {
    id: '#RPT-101',
    nis: '10118',
    nama_siswa: 'Nadia Putri',
    kelas: 'XII MIPA 1',
    kategori: 'Fasilitas Kelas',
    lokasi: 'Ruang Kelas XII MIPA 1',
    deskripsi: 'Papan tulis whiteboard sudah banyak noda permanen yang tidak bisa dihapus, tulisan jadi susah terbaca dari bangku belakang.',
    status: 'Menunggu',
    feedback: '- Belum ada tanggapan -',
    tanggal: '28 Sep 2026',
    timestamp: 1695830400000 + 86400000 * 30,
    urgensi: 'Sedang',
  },
  {
    id: '#RPT-099',
    nis: '10620',
    nama_siswa: 'Dimas Anggara',
    kelas: 'XI RPL 2',
    kategori: 'Infrastruktur IT',
    lokasi: 'Lab Komputer 1',
    deskripsi: 'Mouse dan keyboard di 5 unit komputer sudah tidak berfungsi, menghambat praktikum pemrograman.',
    status: 'Proses',
    feedback: 'Pengadaan mouse dan keyboard baru sedang dalam proses pembelian oleh bagian sarpras.',
    tanggal: '26 Sep 2026',
    timestamp: 1695830400000 + 86400000 * 28,
    urgensi: 'Tinggi',
  },
  {
    id: '#RPT-096',
    nis: '10512',
    nama_siswa: 'Dewi Lestari',
    kelas: 'XI AKL 2',
    kategori: 'Fasilitas Umum',
    lokasi: 'Kantin Sekolah',
    deskripsi: 'Bangku kantin banyak yang patah kakinya, beberapa siswa terpaksa makan sambil berdiri.',
    status: 'Menunggu',
    feedback: '- Belum ada tanggapan -',
    tanggal: '24 Sep 2026',
    timestamp: 1695830400000 + 86400000 * 26,
    urgensi: 'Sedang',
  },
  {
    id: '#RPT-093',
    nis: '09954',
    nama_siswa: 'Muhammad Fadhil',
    kelas: 'X TKJ 1',
    kategori: 'Kebersihan',
    lokasi: 'Koridor Gedung B Lt. 3',
    deskripsi: 'Lampu koridor lantai 3 gedung B mati semua sehingga gelap saat sore hari, rawan kecelakaan siswa.',
    status: 'Selesai',
    feedback: 'Lampu neon sudah diganti dengan LED baru, 6 titik lampu sudah menyala normal. Terima kasih atas laporannya.',
    tanggal: '22 Sep 2026',
    timestamp: 1695830400000 + 86400000 * 24,
    urgensi: 'Tinggi',
  },
  {
    id: '#RPT-089',
    nis: '10293',
    nama_siswa: 'Ahmad Hidayat',
    kelas: 'XII IPA 2',
    kategori: 'Fasilitas Kelas',
    lokasi: 'Ruang Kelas XII IPA 2',
    deskripsi: 'AC Rusak & Bocor. Hawa ruangan menjadi sangat panas dan air rembesan menetes ke meja siswa baris depan.',
    status: 'Menunggu',
    feedback: '- Belum ada tanggapan -',
    tanggal: '12 Okt 2023',
    timestamp: 1697072400000,
    urgensi: 'Tinggi',
  },
  {
    id: '#RPT-088',
    nis: '10455',
    nama_siswa: 'Siti Rahmawati',
    kelas: 'XI IPS 1',
    kategori: 'Infrastruktur IT',
    lokasi: 'Laboratorium Bahasa',
    deskripsi: 'Proyektor Bergaris dan lampu redup saat presentasi tugas kelompok. Mohon diganti kabel VGA/HDMI atau lampunya.',
    status: 'Proses',
    feedback: 'Laporan diterima, teknisi sedang melakukan pengecekan kabel & proyektor di area laboratorium bahasa.',
    tanggal: '11 Okt 2023',
    timestamp: 1696986000000,
    urgensi: 'Sedang',
  },
  {
    id: '#RPT-085',
    nis: '09882',
    nama_siswa: 'Budi Kusuma',
    kelas: 'X MIPA 3',
    kategori: 'Kamar Mandi',
    lokasi: 'Toilet Siswa Lt. 2',
    deskripsi: 'Kran Air Patah sehingga air mengalir terus dan membanjiri lantai toilet sayap barat.',
    status: 'Selesai',
    feedback: 'Sudah diperbaiki dan kran air diganti baru oleh bagian teknisi sarpras pada 10 Okt 2023.',
    tanggal: '10 Okt 2023',
    timestamp: 1696899600000,
    urgensi: 'Tinggi',
  },
  {
    id: '#RPT-082',
    nis: '10341',
    nama_siswa: 'Rian Pratama',
    kelas: 'XII RPL 1',
    kategori: 'Infrastruktur IT',
    lokasi: 'Lab Komputer 3',
    deskripsi: 'Akses Wi-Fi gedung sayap timur sering putus nyambung saat jam praktikum pemrograman web.',
    status: 'Proses',
    feedback: 'Access point sedang direstart dan kabel switch sedang diganti ke port gigabit.',
    tanggal: '08 Okt 2023',
    timestamp: 1696726800000,
    urgensi: 'Sedang',
  },
  {
    id: '#RPT-079',
    nis: '10512',
    nama_siswa: 'Dewi Lestari',
    kelas: 'XI AKL 2',
    kategori: 'Kebersihan',
    lokasi: 'Laboratorium Biologi',
    deskripsi: 'Tempat sampah di dalam lab biologi sudah penuh dan berbau, perlu tempat sampah pilah baru.',
    status: 'Selesai',
    feedback: 'Sudah dibersihkan dan tempat sampah telah diganti dengan yang baru. Terima kasih atas laporannya.',
    tanggal: '05 Okt 2023',
    timestamp: 1696467600000,
    urgensi: 'Rendah',
  },
  {
    id: '#RPT-074',
    nis: '09954',
    nama_siswa: 'Muhammad Fadhil',
    kelas: 'X TKJ 1',
    kategori: 'Olahraga',
    lokasi: 'Lapangan Basket Outdoor',
    deskripsi: 'Ring basket sisi selatan kendor baut penyangganya dan jaringnya sudah robek.',
    status: 'Menunggu',
    feedback: '- Belum ada tanggapan -',
    tanggal: '03 Okt 2023',
    timestamp: 1696294800000,
    urgensi: 'Sedang',
  },
  {
    id: '#RPT-071',
    nis: '10293',
    nama_siswa: 'Ahmad Hidayat',
    kelas: 'XII IPA 2',
    kategori: 'Fasilitas Umum',
    lokasi: 'Perpustakaan Lt. 1',
    deskripsi: 'Stopkontak di meja baca sudut timur tidak mengalirkan listrik, menyulitkan siswa yang sedang mengerjakan tugas laptop.',
    status: 'Selesai',
    feedback: 'Sekring colokan sudah diganti dan soket listrik telah berfungsi normal kembali.',
    tanggal: '01 Okt 2023',
    timestamp: 1696122000000,
    urgensi: 'Sedang',
  },
  {
    id: '#RPT-068',
    nis: '10455',
    nama_siswa: 'Siti Rahmawati',
    kelas: 'XI IPS 1',
    kategori: 'Kamar Mandi',
    lokasi: 'Toilet Guru Lt. 1',
    deskripsi: 'Pintu toilet tidak bisa dikunci dari dalam, engsel sudah longgar dan perlu diganti.',
    status: 'Selesai',
    feedback: 'Engsel dan kunci pintu sudah diganti baru oleh tukang. Pintu sudah berfungsi normal.',
    tanggal: '28 Sep 2023',
    timestamp: 1695862800000,
    urgensi: 'Sedang',
  },
  {
    id: '#RPT-065',
    nis: '10620',
    nama_siswa: 'Dimas Anggara',
    kelas: 'XI RPL 2',
    kategori: 'Olahraga',
    lokasi: 'Ruang Ganti Olahraga',
    deskripsi: 'Loker penyimpanan di ruang ganti banyak yang rusak, barang siswa sering hilang saat jam olahraga.',
    status: 'Proses',
    feedback: 'Sedang dilakukan pendataan loker yang rusak untuk pengadaan loker pengganti.',
    tanggal: '25 Sep 2023',
    timestamp: 1695603600000,
    urgensi: 'Rendah',
  },
  {
    id: '#RPT-061',
    nis: '10118',
    nama_siswa: 'Nadia Putri',
    kelas: 'XII MIPA 1',
    kategori: 'Fasilitas Kelas',
    lokasi: 'Ruang Kelas XII MIPA 1',
    deskripsi: 'Kursi di baris ketiga ada 3 unit yang sudah goyang dan berbahaya untuk diduduki.',
    status: 'Selesai',
    feedback: 'Kursi yang rusak sudah diperbaiki oleh tukang kayu dan sudah layak digunakan kembali.',
    tanggal: '20 Sep 2023',
    timestamp: 1695171600000,
    urgensi: 'Tinggi',
  },
];

export const SQL_SCHEMA_EXPORT = `-- =========================================================
-- DATABASE SKEMA: PENGEMBANGAN APLIKASI PENGADUAN SARANA SEKOLAH (SAPA)
-- UJI KOMPETENSI KEAHLIAN (UKK) REKAYASA PERANGKAT LUNAK 2025/2026
-- =========================================================

CREATE DATABASE IF NOT EXISTS db_pengaduan_sarana;
USE db_pengaduan_sarana;

-- 1. Tabel Admin
CREATE TABLE IF NOT EXISTS admin (
    id_admin INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    nama_lengkap VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- 2. Tabel Siswa
CREATE TABLE IF NOT EXISTS siswa (
    nis VARCHAR(10) PRIMARY KEY,
    nama VARCHAR(100) NOT NULL,
    kelas VARCHAR(10) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- 3. Tabel Kategori
CREATE TABLE IF NOT EXISTS kategori (
    id_kategori INT AUTO_INCREMENT PRIMARY KEY,
    ket_kategori VARCHAR(50) NOT NULL
) ENGINE=InnoDB;

-- 4. Tabel Input Aspirasi & Detail Pengaduan
CREATE TABLE IF NOT EXISTS aspirasi (
    id_aspirasi INT AUTO_INCREMENT PRIMARY KEY,
    id_pelaporan VARCHAR(20) NOT NULL UNIQUE,
    nis VARCHAR(10) NOT NULL,
    id_kategori INT NOT NULL,
    lokasi VARCHAR(100) NOT NULL,
    ket TEXT NOT NULL,
    status ENUM('Menunggu', 'Proses', 'Selesai') DEFAULT 'Menunggu',
    feedback TEXT NULL,
    tanggal DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (nis) REFERENCES siswa(nis) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (id_kategori) REFERENCES kategori(id_kategori) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB;

-- =========================================================
-- DATA AWAL (SEED DATA)
-- =========================================================

INSERT INTO admin (username, password, nama_lengkap) VALUES 
('admin', '$2y$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPt.PqGmy', 'Budi Darmawan');

INSERT INTO siswa (nis, nama, kelas) VALUES
('10293', 'Ahmad Hidayat', 'XII IPA 2'),
('10455', 'Siti Rahmawati', 'XI IPS 1'),
('09882', 'Budi Kusuma', 'X MIPA 3'),
('10341', 'Rian Pratama', 'XII RPL 1');

INSERT INTO kategori (id_kategori, ket_kategori) VALUES
(1, 'Fasilitas Kelas'),
(2, 'Laboratorium'),
(3, 'Kamar Mandi'),
(4, 'Olahraga'),
(5, 'Infrastruktur IT'),
(6, 'Kebersihan'),
(7, 'Fasilitas Umum'),
(8, 'Lainnya');

INSERT INTO aspirasi (id_pelaporan, nis, id_kategori, lokasi, ket, status, feedback, tanggal) VALUES
('#RPT-089', '10293', 1, 'Ruang Kelas XII IPA 2', 'AC Rusak & Bocor', 'Menunggu', '- Belum ada tanggapan -', '2023-10-12'),
('#RPT-088', '10455', 5, 'Laboratorium Bahasa', 'Proyektor Bergaris', 'Proses', 'Laporan diterima, teknisi sedang melakukan pengecekan jaringan dan kabel.', '2023-10-11'),
('#RPT-085', '09882', 3, 'Toilet Siswa Lt. 2', 'Kran Air Patah', 'Selesai', 'Sudah dibersihkan dan kran air telah diganti baru.', '2023-10-10');
`;
