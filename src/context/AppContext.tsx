import React, { createContext, useContext, useState, useEffect } from 'react';
import { ActiveTab, Aspirasi, StatusAspirasi, Siswa } from '../types';
import { INITIAL_ASPIRASI, SISWA_LIST, USER_ACCOUNTS } from '../data/mockData';

interface UserSession {
  isLoggedIn: boolean;
  role: 'admin' | 'siswa';
  name: string;
  roleTitle: string;
  adminId?: string;
  nis?: string;
  email?: string;
}

interface AppContextType {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  user: UserSession;
  login: (email: string, password: string) => { success: boolean; error?: string };
  logout: () => void;
  aspirasiList: Aspirasi[];
  addAspirasi: (data: { id_pelapor: string; nama: string; peran: string; kategori: string; lokasi: string; deskripsi: string; foto_url?: string }) => Aspirasi;
  updateAspirasi: (id: string, status: StatusAspirasi, feedback: string) => void;
  deleteAspirasi: (id: string) => void;
  searchNisInput: string;
  setSearchNisInput: (nis: string) => void;
  selectedAspirasiDetail: Aspirasi | null;
  setSelectedAspirasiDetail: (item: Aspirasi | null) => void;
  selectedAspirasiToEdit: Aspirasi | null;
  setSelectedAspirasiToEdit: (item: Aspirasi | null) => void;
  isSqlModalOpen: boolean;
  setIsSqlModalOpen: (open: boolean) => void;
  toast: { message: string; type: 'success' | 'info' | 'error' } | null;
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  students: Siswa[];
  registerOrGetStudent: (nis: string) => Siswa;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEY = 'sapa_sarana_aspirasi_list_v1';
const USER_KEY = 'sapa_sarana_user_session_v1';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<ActiveTab>(() => {
    try {
      const savedUser = localStorage.getItem(USER_KEY);
      if (savedUser) {
        const parsed = JSON.parse(savedUser);
        if (parsed.isLoggedIn && parsed.role === 'admin') return 'dashboard';
        if (parsed.isLoggedIn && parsed.role === 'siswa') return 'kirim-aspirasi';
      }
    } catch { /* fallback */ }
    return 'landing';
  });
  const [students] = useState<Siswa[]>(SISWA_LIST);

  const [user, setUser] = useState<UserSession>(() => {
    try {
      const saved = localStorage.getItem(USER_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return {
      isLoggedIn: false,
      role: 'siswa' as const,
      name: 'Tamu',
      roleTitle: 'Pengunjung',
    };
  });

  const [aspirasiList, setAspirasiList] = useState<Aspirasi[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // fallback
    }
    return INITIAL_ASPIRASI;
  });

  const [searchNisInput, setSearchNisInput] = useState<string>('');
  const [selectedAspirasiDetail, setSelectedAspirasiDetail] = useState<Aspirasi | null>(null);
  const [selectedAspirasiToEdit, setSelectedAspirasiToEdit] = useState<Aspirasi | null>(null);
  const [isSqlModalOpen, setIsSqlModalOpen] = useState<boolean>(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' | 'error' } | null>(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(aspirasiList));
  }, [aspirasiList]);

  useEffect(() => {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }, [user]);

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  const registerOrGetStudent = (nis: string): Siswa => {
    const existing = students.find((s) => s.nis === nis.trim());
    if (existing) return existing;
    return {
      nis: nis.trim(),
      nama: `Siswa (NIS: ${nis})`,
      kelas: 'Siswa Aktif',
    };
  };

  const addAspirasi = (data: {
    id_pelapor: string;
    nama: string;
    peran: string;
    kategori: string;
    lokasi: string;
    deskripsi: string;
    foto_url?: string;
  }): Aspirasi => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
    const now = new Date();
    const dateStr = `${now.getDate().toString().padStart(2, '0')} ${months[now.getMonth()]} ${now.getFullYear()}`;
    
    const randomNum = Math.floor(100 + Math.random() * 900);
    const newId = `#RPT-${randomNum}`;

    const newEntry: Aspirasi = {
      id: newId,
      nis: data.id_pelapor, // Backend field name 'nis' kept for exam ERD, but stores generic ID
      nama_siswa: data.nama, // Backend field name 'nama_siswa' stores generic name
      kelas: data.peran, // Backend field name 'kelas' stores generic role/title
      kategori: data.kategori || 'Fasilitas Umum',
      lokasi: data.lokasi,
      deskripsi: data.deskripsi,
      status: 'Menunggu',
      feedback: '- Belum ada tanggapan -',
      tanggal: dateStr,
      timestamp: Date.now(),
      foto_url: data.foto_url,
      urgensi: 'Sedang',
    };

    setAspirasiList((prev) => [newEntry, ...prev]);
    showToast('Aspirasi berhasil dikirim! Pengaduan Anda telah masuk antrean sistem.', 'success');
    return newEntry;
  };

  const updateAspirasi = (id: string, status: StatusAspirasi, feedback: string) => {
    setAspirasiList((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              status,
              feedback: feedback.trim() || item.feedback,
            }
          : item
      )
    );
    showToast(`Status laporan ${id} berhasil diperbarui menjadi ${status}.`, 'info');
  };

  const deleteAspirasi = (id: string) => {
    setAspirasiList((prev) => prev.filter((item) => item.id !== id));
    showToast(`Laporan ${id} telah dihapus dari sistem.`, 'info');
  };

  // Unified login: checks email+password against USER_ACCOUNTS
  const login = (email: string, password: string): { success: boolean; error?: string } => {
    const trimmedEmail = email.trim().toLowerCase();
    const account = USER_ACCOUNTS.find(
      (acc) => acc.email.toLowerCase() === trimmedEmail && acc.password === password
    );

    if (!account) {
      return { success: false, error: 'Email atau password salah. Silakan coba lagi.' };
    }

    setUser({
      isLoggedIn: true,
      role: account.role,
      name: account.name,
      roleTitle: account.title,
      adminId: account.adminId,
      nis: account.nis,
      email: account.email,
    });

    if (account.role === 'admin') {
      setActiveTab('dashboard');
      showToast(`Selamat datang, ${account.name}! Anda masuk sebagai Administrator.`, 'success');
    } else {
      setActiveTab('kirim-aspirasi');
      showToast(`Selamat datang, ${account.name}!`, 'success');
    }

    return { success: true };
  };

  const logout = () => {
    setUser({
      isLoggedIn: false,
      role: 'siswa',
      name: 'Tamu',
      roleTitle: 'Pengunjung',
    });
    setActiveTab('landing');
    showToast('Anda telah keluar dari sesi.', 'info');
  };

  return (
    <AppContext.Provider
      value={{
        activeTab,
        setActiveTab,
        user,
        login,
        logout,
        aspirasiList,
        addAspirasi,
        updateAspirasi,
        deleteAspirasi,
        searchNisInput,
        setSearchNisInput,
        selectedAspirasiDetail,
        setSelectedAspirasiDetail,
        selectedAspirasiToEdit,
        setSelectedAspirasiToEdit,
        isSqlModalOpen,
        setIsSqlModalOpen,
        toast,
        showToast,
        students,
        registerOrGetStudent,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
