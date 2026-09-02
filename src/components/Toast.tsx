import React from 'react';
import { useApp } from '../context/AppContext';

export const Toast: React.FC = () => {
  const { toast } = useApp();

  if (!toast) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-5 duration-300 pointer-events-none">
      <div
        className={`px-lg py-3 rounded-2xl shadow-xl flex items-center gap-3 text-sm font-semibold pointer-events-auto border ${
          toast.type === 'success'
            ? 'bg-primary text-on-primary border-primary-container shadow-primary/20'
            : toast.type === 'error'
            ? 'bg-error text-on-error border-error-container shadow-error/20'
            : 'bg-surface-container-high text-on-surface border-outline-variant shadow-md'
        }`}
      >
        <span className="material-symbols-outlined text-[20px]">
          {toast.type === 'success' ? 'check_circle' : toast.type === 'error' ? 'error' : 'info'}
        </span>
        <span>{toast.message}</span>
      </div>
    </div>
  );
};
