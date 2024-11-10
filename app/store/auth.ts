import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface AuthState {
    isAuthenticated: boolean;
    setIsAuthenticated: (value: boolean) => void;
    getIsAuthenticated: () => boolean;
}

const useAuthStore = create<AuthState>()(
    persist(
        (set, get) => ({
            isAuthenticated: false,
            setIsAuthenticated: (value) => set({ isAuthenticated: value }),
            getIsAuthenticated: () => get().isAuthenticated,
        }),
        {
            name: 'auth-storage',
            storage: createJSONStorage(() => sessionStorage),
        }
    )
);

export { useAuthStore }