import React, { useEffect, useState } from 'react';
import { useApp } from '../context/AppContext';

export const LandingPage: React.FC = () => {
  const { setActiveTab } = useApp();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const features = [
    {
      icon: 'campaign',
      title: 'Lapor Mudah',
      desc: 'Sampaikan pengaduan sarana sekolah hanya dalam hitungan detik melalui formulir digital yang simpel.',
      color: 'from-blue-500 to-indigo-600',
    },
    {
      icon: 'track_changes',
      title: 'Pantau Progres',
      desc: 'Lacak status pengaduan secara real-time. Tahu kapan laporan diterima, diproses, hingga selesai.',
      color: 'from-emerald-500 to-teal-600',
    },
    {
      icon: 'shield',
      title: 'Transparan & Akuntabel',
      desc: 'Setiap laporan tercatat dan terdokumentasi. Admin wajib memberikan tanggapan resmi.',
      color: 'from-amber-500 to-orange-600',
    },
    {
      icon: 'speed',
      title: 'Respon Cepat',
      desc: 'Sistem notifikasi memastikan admin segera menindaklanjuti setiap pengaduan yang masuk.',
      color: 'from-rose-500 to-pink-600',
    },
  ];

  const stats = [
    { value: '500+', label: 'Laporan Ditangani', icon: 'description' },
    { value: '95%', label: 'Tingkat Penyelesaian', icon: 'check_circle' },
    { value: '24 Jam', label: 'Rata-rata Respon', icon: 'schedule' },
    { value: '8', label: 'Kategori Sarana', icon: 'category' },
  ];

  const steps = [
    { num: '01', title: 'Masuk Akun', desc: 'Login dengan email dan password akun siswa atau admin.', icon: 'login' },
    { num: '02', title: 'Buat Laporan', desc: 'Isi formulir pengaduan lengkap dengan lokasi dan deskripsi.', icon: 'edit_note' },
    { num: '03', title: 'Admin Meninjau', desc: 'Tim sarpras menerima dan menindaklanjuti laporan Anda.', icon: 'fact_check' },
    { num: '04', title: 'Masalah Selesai', desc: 'Terima umpan balik dan konfirmasi penyelesaian.', icon: 'verified' },
  ];

  return (
    <div className="min-h-screen bg-surface overflow-x-hidden">
      {/* ==================== NAVBAR ==================== */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-surface-container-lowest/80 border-b border-outline-variant/20 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <div className="flex items-center gap-2 cursor-pointer">
            <span className="material-symbols-outlined text-primary text-[28px]">domain</span>
            <div className="flex flex-col leading-tight">
              <span className="font-bold text-primary text-lg tracking-tight">SAPA</span>
              <span className="text-[10px] text-on-surface-variant font-medium uppercase tracking-wider hidden sm:block">
                Sarana & Prasarana
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => setActiveTab('login')}
              className="px-4 py-2 text-xs font-semibold text-primary hover:bg-primary-fixed/40 rounded-xl transition-all"
            >
              Masuk
            </button>
            <button
              onClick={() => setActiveTab('login')}
              className="px-5 py-2.5 text-xs font-bold bg-primary text-on-primary rounded-xl shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5 active:translate-y-0 transition-all"
            >
              Mulai Sekarang
            </button>
          </div>
        </div>
      </nav>

      {/* ==================== HERO ==================== */}
      <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 px-4 overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-40 -right-40 w-[700px] h-[700px] bg-gradient-to-br from-primary/8 to-secondary-container/8 rounded-full blur-[120px]" />
          <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] bg-gradient-to-tr from-secondary-fixed/10 to-primary/5 rounded-full blur-[100px]" />
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-primary-fixed/5 rounded-full blur-[80px]" />
          {/* Floating geometric shapes */}
          <div className="absolute top-28 left-[15%] w-16 h-16 border-2 border-primary/10 rounded-2xl rotate-12 animate-[spin_20s_linear_infinite]" />
          <div className="absolute top-48 right-[20%] w-10 h-10 bg-secondary-container/15 rounded-full animate-bounce" style={{ animationDuration: '3s' }} />
          <div className="absolute bottom-32 left-[25%] w-8 h-8 border-2 border-secondary/10 rounded-lg rotate-45 animate-pulse" />
        </div>

        <div
          className={`max-w-4xl mx-auto text-center relative z-10 transition-all duration-1000 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-primary-fixed/50 text-on-primary-fixed-variant px-4 py-1.5 rounded-full text-xs font-bold mb-6 border border-primary/10 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Sistem Pengaduan Digital Sekolah</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-on-surface leading-tight tracking-tight mb-6">
            Suarakan{' '}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Aspirasi
            </span>
            <br />
            Wujudkan{' '}
            <span className="bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
              Perubahan
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-on-surface-variant max-w-2xl mx-auto mb-10 leading-relaxed">
            Platform digital untuk menyampaikan pengaduan sarana & prasarana sekolah.
            Dari siswa, untuk sekolah yang lebih baik.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <button
              onClick={() => setActiveTab('login')}
              className="group w-full sm:w-auto px-8 py-4 bg-primary text-on-primary font-bold text-sm rounded-2xl shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/35 hover:-translate-y-1 active:translate-y-0 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-[20px]">login</span>
              <span>Masuk Sekarang</span>
              <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </button>
          </div>

          {/* Trust badges */}
          <div className="mt-10 flex items-center justify-center gap-6 text-xs text-on-surface-variant/60">
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px] text-emerald-500">verified</span>
              Aman & Terpercaya
            </span>
            <span className="w-1 h-1 rounded-full bg-outline-variant/40" />
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px] text-blue-500">bolt</span>
              Respon Cepat
            </span>
            <span className="w-1 h-1 rounded-full bg-outline-variant/40 hidden sm:block" />
            <span className="hidden sm:flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px] text-amber-500">star</span>
              Gratis Selamanya
            </span>
          </div>
        </div>
      </section>

      {/* ==================== STATS ==================== */}
      <section className="py-12 border-y border-outline-variant/20 bg-surface-container-low/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {stats.map((stat, i) => (
              <div
                key={i}
                className={`text-center transition-all duration-700 delay-${i * 100} ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                }`}
                style={{ transitionDelay: `${300 + i * 150}ms` }}
              >
                <div className="inline-flex items-center justify-center w-10 h-10 bg-primary-fixed/60 rounded-xl mb-2">
                  <span className="material-symbols-outlined text-primary text-[20px]">{stat.icon}</span>
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-on-surface tracking-tight">{stat.value}</div>
                <div className="text-xs text-on-surface-variant font-medium mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== FEATURES ==================== */}
      <section className="py-20 sm:py-28 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block text-xs font-bold text-primary uppercase tracking-widest mb-3 bg-primary-fixed/40 px-3 py-1 rounded-full">
              Fitur Unggulan
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-on-surface tracking-tight mb-4">
              Semua yang Kamu Butuhkan
            </h2>
            <p className="text-on-surface-variant text-sm max-w-xl mx-auto">
              Dirancang khusus untuk mempermudah proses pengaduan sarana dan prasarana di lingkungan sekolah.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            {features.map((feat, i) => (
              <div
                key={i}
                className="group relative bg-surface-container-lowest rounded-2xl p-6 sm:p-8 border border-outline-variant/20 hover:border-primary/30 shadow-xs hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden"
              >
                {/* Hover gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feat.color} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500`} />

                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${feat.color} flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                  <span className="material-symbols-outlined text-white text-[24px]">{feat.icon}</span>
                </div>
                <h3 className="text-lg font-bold text-on-surface mb-2 relative">{feat.title}</h3>
                <p className="text-sm text-on-surface-variant leading-relaxed relative">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== HOW IT WORKS ==================== */}
      <section className="py-20 sm:py-28 px-4 bg-gradient-to-b from-surface-container-low/50 to-surface">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block text-xs font-bold text-secondary uppercase tracking-widest mb-3 bg-secondary-fixed/40 px-3 py-1 rounded-full">
              Cara Kerja
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-on-surface tracking-tight mb-4">
              4 Langkah Mudah
            </h2>
            <p className="text-on-surface-variant text-sm max-w-lg mx-auto">
              Proses pengaduan yang simpel dan terstruktur dari awal hingga tuntas.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <div key={i} className="relative group">
                {/* Connector line */}
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-[calc(50%+32px)] w-[calc(100%-32px)] h-0.5 bg-gradient-to-r from-primary/20 to-outline-variant/10" />
                )}
                <div className="bg-surface-container-lowest rounded-2xl p-6 border border-outline-variant/20 hover:border-primary/20 transition-all duration-300 hover:shadow-md hover:-translate-y-1 text-center">
                  <div className="relative inline-flex items-center justify-center w-16 h-16 bg-primary-fixed/50 rounded-2xl mb-4 group-hover:bg-primary group-hover:text-on-primary transition-all duration-300">
                    <span className="material-symbols-outlined text-primary text-[28px] group-hover:text-on-primary transition-colors">{step.icon}</span>
                    <span className="absolute -top-2 -right-2 w-6 h-6 bg-primary text-on-primary text-[10px] font-bold rounded-full flex items-center justify-center shadow-sm">
                      {step.num}
                    </span>
                  </div>
                  <h3 className="font-bold text-on-surface mb-1.5">{step.title}</h3>
                  <p className="text-xs text-on-surface-variant leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== CTA ==================== */}
      <section className="py-20 sm:py-28 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="relative bg-gradient-to-br from-primary to-primary-container rounded-3xl p-10 sm:p-16 text-center overflow-hidden shadow-2xl shadow-primary/20">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/3 -translate-x-1/4" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/[0.02] rounded-full" />

            <div className="relative z-10">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/15 rounded-2xl mb-6 backdrop-blur-sm">
                <span className="material-symbols-outlined text-white text-[32px]">rocket_launch</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-4 tracking-tight">
                Siap Menyuarakan Aspirasi?
              </h2>
              <p className="text-white/70 text-sm sm:text-base max-w-lg mx-auto mb-8 leading-relaxed">
                Bergabunglah sekarang dan jadilah bagian dari perubahan positif untuk lingkungan sekolah kita.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={() => setActiveTab('login')}
                  className="group w-full sm:w-auto px-8 py-4 bg-white text-primary font-bold text-sm rounded-2xl hover:shadow-lg hover:-translate-y-1 active:translate-y-0 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <span>Mulai Sekarang</span>
                  <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">
                    arrow_forward
                  </span>
                </button>
                <button
                  onClick={() => setActiveTab('login')}
                  className="w-full sm:w-auto px-8 py-4 bg-white/10 text-white font-bold text-sm rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300 flex items-center justify-center gap-2 backdrop-blur-sm"
                >
                  <span className="material-symbols-outlined text-[18px]">admin_panel_settings</span>
                  <span>Login Admin</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== FOOTER ==================== */}
      <footer className="py-10 px-4 border-t border-outline-variant/20 bg-surface-container-low/30">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[22px]">domain</span>
            <span className="font-bold text-primary text-sm">SAPA</span>
            <span className="text-xs text-on-surface-variant">© 2026 • Sistem Aspirasi & Pengaduan Sarana</span>
          </div>
          <div className="flex items-center gap-4 text-xs text-on-surface-variant">
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px] text-emerald-500">check_circle</span>
              System Online
            </span>
            <span className="text-outline-variant/40">|</span>
            <span>UKK RPL 2025/2026</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
