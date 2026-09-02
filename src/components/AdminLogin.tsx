import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export const AdminLogin: React.FC = () => {
  const { loginAdmin, setActiveTab } = useApp();
  const [adminId, setAdminId] = useState('ADM-001');
  const [password, setPassword] = useState('admin123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberDevice, setRememberDevice] = useState(true);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminId || !password) {
      setErrorMessage('Harap masukkan Admin ID dan Password.');
      return;
    }

    setErrorMessage('');
    setIsAuthenticating(true);

    setTimeout(() => {
      setIsAuthenticating(false);
      const success = loginAdmin(adminId, password);
      if (!success) {
        setErrorMessage('Kredensial tidak valid. Silakan coba lagi.');
      }
    }, 1000);
  };

  const handleQuickDemoLogin = () => {
    setAdminId('ADM-001');
    setPassword('admin123');
    loginAdmin('ADM-001', 'admin123');
  };

  return (
    <div className="flex flex-col w-full h-full min-h-[calc(100vh-140px)] items-center justify-center p-4 sm:p-6 relative overflow-hidden">
      {/* Ambient background blur blobs */}
      <div className="absolute -top-32 -left-32 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-[600px] h-[600px] bg-secondary-container/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Faint watermark graphic */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[800px] h-full max-h-[800px] opacity-[0.02] pointer-events-none flex items-center justify-center"
      >
        <svg className="w-full h-full text-primary" fill="currentColor" viewBox="0 0 100 100">
          <path d="M50 0L100 50L50 100L0 50L50 0Z" fill="none" stroke="currentColor" strokeWidth="2" />
          <circle cx="50" cy="50" fill="none" r="25" stroke="currentColor" strokeWidth="2" />
          <path d="M25 25L75 75M75 25L25 75" stroke="currentColor" strokeWidth="2" />
        </svg>
      </div>

      {/* Login Card */}
      <div className="w-full max-w-md bg-surface-container-lowest rounded-2xl shadow-xl shadow-primary-container/10 p-8 sm:p-10 relative z-10 overflow-hidden border border-outline-variant/30">
        {/* Top gradient stripe */}
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-primary to-secondary-container" />

        {/* Card Header */}
        <div className="flex flex-col items-center mb-8 relative">
          <div className="w-16 h-16 bg-surface-container rounded-2xl flex items-center justify-center text-primary mb-4 shadow-sm relative overflow-hidden transition-transform duration-500 hover:scale-105">
            <div className="absolute inset-0 bg-primary/10 w-full h-full rounded-full blur-xl animate-pulse" />
            <span className="material-symbols-outlined text-[32px] material-symbols-fill">
              domain
            </span>
          </div>
          <h1 className="font-headline-lg text-headline-lg text-on-surface mb-2 text-center tracking-tight font-bold">
            Facility Admin
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant text-center max-w-[280px] text-sm">
            Secure portal for school facility management operations.
          </p>
        </div>

        {/* Error message if any */}
        {errorMessage && (
          <div className="mb-4 p-3 rounded-xl bg-error-container text-on-error-container text-xs font-semibold flex items-center gap-2 animate-in fade-in duration-200">
            <span className="material-symbols-outlined text-[16px]">error</span>
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Form */}
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          {/* Admin ID */}
          <div className="flex flex-col gap-1.5 group/input">
            <label
              className="font-label-md text-xs font-bold text-on-surface-variant group-focus-within/input:text-primary transition-colors"
              htmlFor="username"
            >
              Admin ID
            </label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant/50 group-focus-within/input:text-primary transition-colors text-[20px]">
                badge
              </span>
              <input
                className="w-full bg-surface-container-low text-on-surface font-body-md text-sm rounded-xl py-3 pl-10 pr-4 outline-none border border-outline-variant/30 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-on-surface-variant/50 shadow-xs"
                id="username"
                name="username"
                placeholder="Enter your ID"
                required
                type="text"
                value={adminId}
                onChange={(e) => setAdminId(e.target.value)}
              />
            </div>
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1.5 group/input">
            <div className="flex justify-between items-baseline">
              <label
                className="font-label-md text-xs font-bold text-on-surface-variant group-focus-within/input:text-primary transition-colors"
                htmlFor="password"
              >
                Password
              </label>
            </div>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant/50 group-focus-within/input:text-primary transition-colors text-[20px]">
                lock
              </span>
              <input
                className="w-full bg-surface-container-low text-on-surface font-body-md text-sm rounded-xl py-3 pl-10 pr-10 outline-none border border-outline-variant/30 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-on-surface-variant/50 shadow-xs"
                id="password"
                name="password"
                placeholder="Enter your password"
                required
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant/50 hover:text-on-surface transition-colors"
                aria-label="Tampilkan kata sandi"
              >
                <span className="material-symbols-outlined text-[20px]">
                  {showPassword ? 'visibility_off' : 'visibility'}
                </span>
              </button>
            </div>
          </div>

          {/* Remember device & helper */}
          <div className="flex items-center justify-between mt-[-4px]">
            <div className="flex items-center gap-2">
              <input
                className="w-4 h-4 rounded border-outline-variant text-primary focus:ring-primary/50 accent-primary cursor-pointer"
                id="remember"
                type="checkbox"
                checked={rememberDevice}
                onChange={(e) => setRememberDevice(e.target.checked)}
              />
              <label
                className="font-body-md text-xs text-on-surface-variant cursor-pointer select-none"
                htmlFor="remember"
              >
                Remember this device
              </label>
            </div>
            <button
              type="button"
              onClick={() => setActiveTab('kirim-aspirasi')}
              className="text-xs text-primary hover:underline font-medium"
            >
              Mode Siswa &rarr;
            </button>
          </div>

          {/* Login Button */}
          <button
            className="w-full bg-primary text-on-primary font-label-md text-sm font-semibold py-3.5 px-6 rounded-xl shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5 active:translate-y-0 active:shadow-sm transition-all duration-300 flex items-center justify-center gap-2 mt-2 group relative overflow-hidden cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            id="login-btn"
            type="submit"
            disabled={isAuthenticating}
          >
            <div className="absolute inset-0 bg-white/10 w-0 group-hover:w-full transition-all duration-500 ease-out z-0" />
            <span className="relative z-10 flex items-center gap-2">
              {isAuthenticating ? (
                <>
                  <span className="material-symbols-outlined animate-spin text-[18px]">sync</span>
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <span>Login Admin</span>
                  <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">
                    arrow_forward
                  </span>
                </>
              )}
            </span>
          </button>

          {/* Quick Demo Preset Button */}
          <button
            type="button"
            onClick={handleQuickDemoLogin}
            className="w-full py-2 px-4 rounded-xl border border-dashed border-primary/40 text-primary text-xs font-semibold hover:bg-primary-fixed/30 transition-colors flex items-center justify-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[16px]">bolt</span>
            <span>1-Click Demo Login (Budi Darmawan)</span>
          </button>
        </form>

        {/* Card Footer */}
        <div className="mt-6 pt-5 border-t border-surface-container flex justify-between items-center px-1">
          <div className="flex items-center gap-1.5 text-on-surface-variant/60 font-label-sm text-xs">
            <span className="material-symbols-outlined text-[14px] text-green-600">check_circle</span>
            <span>System Online</span>
          </div>
          <span className="font-label-sm text-xs text-primary cursor-pointer hover:underline">
            Forgot Credentials?
          </span>
        </div>
      </div>

      {/* Bottom Metadata */}
      <div className="mt-6 text-center text-on-surface-variant/60 font-label-sm text-xs flex flex-col gap-1 items-center">
        <p>Authorized Personnel Only</p>
        <div className="flex items-center gap-2">
          <span>v2.4.1</span>
          <span className="w-1 h-1 rounded-full bg-outline-variant/50" />
          <span>Dept. of Facilities</span>
        </div>
      </div>
    </div>
  );
};
