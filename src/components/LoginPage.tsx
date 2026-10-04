import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { USER_ACCOUNTS } from '../data/mockData';

export const LoginPage: React.FC = () => {
  const { login, setActiveTab } = useApp();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [showAccounts, setShowAccounts] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 50);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setErrorMessage('Harap isi email dan password.');
      return;
    }
    setErrorMessage('');
    setIsLoading(true);

    setTimeout(() => {
      const result = login(email, password);
      setIsLoading(false);
      if (!result.success) {
        setErrorMessage(result.error || 'Login gagal.');
      }
    }, 800);
  };

  const handleQuickLogin = (acc: typeof USER_ACCOUNTS[0]) => {
    setEmail(acc.email);
    setPassword(acc.password);
    setErrorMessage('');
    setIsLoading(true);
    setTimeout(() => {
      const result = login(acc.email, acc.password);
      setIsLoading(false);
      if (!result.success) {
        setErrorMessage(result.error || 'Login gagal.');
      }
    }, 500);
  };

  const adminAccounts = USER_ACCOUNTS.filter((a) => a.role === 'admin');
  const siswaAccounts = USER_ACCOUNTS.filter((a) => a.role === 'siswa');

  return (
    <div className="min-h-screen bg-surface flex flex-col relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-48 -right-48 w-[700px] h-[700px] bg-gradient-to-br from-primary/6 to-secondary-container/6 rounded-full blur-[120px]" />
        <div className="absolute -bottom-48 -left-48 w-[600px] h-[600px] bg-gradient-to-tr from-secondary-fixed/8 to-primary/4 rounded-full blur-[100px]" />
      </div>

      {/* Top Nav */}
      <nav className="relative z-20 flex items-center justify-between px-4 sm:px-8 py-4">
        <button onClick={() => setActiveTab('landing')} className="flex items-center gap-2 group">
          <span className="material-symbols-outlined text-primary text-[28px] group-hover:scale-110 transition-transform">domain</span>
          <div className="flex flex-col leading-tight">
            <span className="font-bold text-primary text-lg tracking-tight">SAPA</span>
            <span className="text-[10px] text-on-surface-variant font-medium uppercase tracking-wider hidden sm:block">
              Sarana & Prasarana
            </span>
          </div>
        </button>
        <button
          onClick={() => setActiveTab('landing')}
          className="flex items-center gap-1.5 text-xs text-on-surface-variant hover:text-primary transition-colors font-medium"
        >
          <span className="material-symbols-outlined text-[16px]">arrow_back</span>
          <span className="hidden sm:inline">Kembali ke Beranda</span>
        </button>
      </nav>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4 py-6 relative z-10">
        <div
          className={`w-full max-w-[420px] transition-all duration-500 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          {/* Card */}
          <div className="bg-surface-container-lowest rounded-3xl shadow-xl border border-outline-variant/25 overflow-hidden">
            {/* Gradient stripe */}
            <div className="h-1.5 bg-gradient-to-r from-primary via-secondary to-primary-container" />

            {/* Header */}
            <div className="pt-8 pb-2 px-8 text-center">
              <div className="w-14 h-14 mx-auto bg-primary-fixed/50 rounded-2xl flex items-center justify-center mb-4 relative">
                <span className="material-symbols-outlined text-primary text-[28px] relative z-10">lock_open</span>
              </div>
              <h1 className="text-2xl font-extrabold text-on-surface tracking-tight mb-1">
                Masuk ke SAPA
              </h1>
              <p className="text-sm text-on-surface-variant">
                Gunakan email dan password akunmu
              </p>
            </div>

            {/* Form */}
            <div className="px-8 pt-6 pb-8">
              {/* Error */}
              {errorMessage && (
                <div className="mb-4 p-3 rounded-xl bg-error-container text-on-error-container text-xs font-semibold flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px]">error</span>
                  <span>{errorMessage}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4" autoComplete="off">
                {/* Email */}
                <div className="flex flex-col gap-1.5 group/input">
                  <label className="text-xs font-bold text-on-surface-variant group-focus-within/input:text-primary transition-colors" htmlFor="login-email">
                    Email
                  </label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant/40 group-focus-within/input:text-primary transition-colors text-[20px]">
                      mail
                    </span>
                    <input
                      id="login-email"
                      name="email_address"
                      type="email"
                      placeholder="contoh@sapa.sch.id"
                      className="w-full bg-surface-container-low text-on-surface text-sm rounded-xl py-3 pl-10 pr-4 outline-none border border-outline-variant/30 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-on-surface-variant/40"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      autoComplete="off"
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="flex flex-col gap-1.5 group/input">
                  <label className="text-xs font-bold text-on-surface-variant group-focus-within/input:text-primary transition-colors" htmlFor="login-password">
                    Password
                  </label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant/40 group-focus-within/input:text-primary transition-colors text-[20px]">
                      lock
                    </span>
                    <input
                      id="login-password"
                      name="user_password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Masukkan password"
                      className="w-full bg-surface-container-low text-on-surface text-sm rounded-xl py-3 pl-10 pr-10 outline-none border border-outline-variant/30 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-on-surface-variant/40"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      autoComplete="new-password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant/40 hover:text-on-surface transition-colors"
                    >
                      <span className="material-symbols-outlined text-[20px]">
                        {showPassword ? 'visibility_off' : 'visibility'}
                      </span>
                    </button>
                  </div>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-primary text-on-primary font-bold text-sm py-3.5 px-6 rounded-xl shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 flex items-center justify-center gap-2 group relative overflow-hidden disabled:opacity-60 disabled:cursor-not-allowed mt-2"
                >
                  <div className="absolute inset-0 bg-white/10 w-0 group-hover:w-full transition-all duration-500 ease-out" />
                  <span className="relative z-10 flex items-center gap-2">
                    {isLoading ? (
                      <>
                        <span className="material-symbols-outlined animate-spin text-[18px]">sync</span>
                        <span>Memverifikasi...</span>
                      </>
                    ) : (
                      <>
                        <span>Masuk</span>
                        <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
                      </>
                    )}
                  </span>
                </button>
              </form>

              {/* Demo Accounts Toggle */}
              <div className="mt-5 pt-5 border-t border-outline-variant/20">
                <button
                  type="button"
                  onClick={() => setShowAccounts(!showAccounts)}
                  className="w-full flex items-center justify-between text-xs text-on-surface-variant hover:text-primary transition-colors font-semibold py-1"
                >
                  <span className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px]">info</span>
                    <span>Akun Demo (klik untuk lihat)</span>
                  </span>
                  <span className={`material-symbols-outlined text-[16px] transition-transform ${showAccounts ? 'rotate-180' : ''}`}>
                    expand_more
                  </span>
                </button>

                {showAccounts && (
                  <div className="mt-3 space-y-3">
                    {/* Admin accounts */}
                    <div>
                      <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider mb-1.5 flex items-center gap-1">
                        <span className="material-symbols-outlined text-[12px] text-emerald-600">shield_person</span>
                        Akun Admin
                      </p>
                      <div className="space-y-1">
                        {adminAccounts.map((acc) => (
                          <button
                            key={acc.email}
                            type="button"
                            onClick={() => handleQuickLogin(acc)}
                            className="w-full text-left px-3 py-2 rounded-xl bg-surface-container-low hover:bg-surface-container border border-outline-variant/15 transition-all text-xs flex items-center justify-between group/acc"
                          >
                            <div>
                              <span className="font-bold text-on-surface">{acc.name}</span>
                              <span className="text-on-surface-variant ml-1">• {acc.title}</span>
                              <br />
                              <span className="text-on-surface-variant/70">{acc.email}</span>
                              <span className="text-on-surface-variant/50 ml-1">/ {acc.password}</span>
                            </div>
                            <span className="material-symbols-outlined text-[14px] text-primary opacity-0 group-hover/acc:opacity-100 transition-opacity">arrow_forward</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Siswa accounts */}
                    <div>
                      <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider mb-1.5 flex items-center gap-1">
                        <span className="material-symbols-outlined text-[12px] text-blue-600">school</span>
                        Akun Siswa
                      </p>
                      <div className="space-y-1">
                        {siswaAccounts.map((acc) => (
                          <button
                            key={acc.email}
                            type="button"
                            onClick={() => handleQuickLogin(acc)}
                            className="w-full text-left px-3 py-2 rounded-xl bg-surface-container-low hover:bg-surface-container border border-outline-variant/15 transition-all text-xs flex items-center justify-between group/acc"
                          >
                            <div>
                              <span className="font-bold text-on-surface">{acc.name}</span>
                              <span className="text-on-surface-variant ml-1">• {acc.title}</span>
                              <br />
                              <span className="text-on-surface-variant/70">{acc.email}</span>
                              <span className="text-on-surface-variant/50 ml-1">/ {acc.password}</span>
                            </div>
                            <span className="material-symbols-outlined text-[14px] text-primary opacity-0 group-hover/acc:opacity-100 transition-opacity">arrow_forward</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="px-8 pb-6">
              <div className="pt-4 border-t border-outline-variant/20 flex items-center justify-between text-xs text-on-surface-variant/50">
                <span className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[14px] text-emerald-500">check_circle</span>
                  System Online
                </span>
                <span>v2.4.1 • SAPA</span>
              </div>
            </div>
          </div>

          {/* Back link */}
          <div className="mt-5 text-center">
            <button
              onClick={() => setActiveTab('landing')}
              className="text-xs text-on-surface-variant hover:text-primary transition-colors inline-flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-[14px]">arrow_back</span>
              Kembali ke halaman utama
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
