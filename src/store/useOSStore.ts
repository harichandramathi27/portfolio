import { create } from 'zustand';

export interface WindowState {
    id: string;
    title: string;
    component: string; // The key to render the specific app
    isOpen: boolean;
    isMinimized: boolean;
    isMaximized: boolean;
    zIndex: number;
    position: { x: number; y: number };
    size: { width: number; height: number };
}

interface OSState {
    isBooting: boolean;
    isLocked: boolean;
    isSearchOpen: boolean;
    password: string;
    windows: WindowState[];
    activeWindowId: string | null;

    // Actions
    setBooting: (isBooting: boolean) => void;
    setLocked: (isLocked: boolean) => void;
    setSearchOpen: (isOpen: boolean) => void;
    setPassword: (password: string) => void;
    openWindow: (appId: string) => void;
    closeWindow: (id: string) => void;
    minimizeWindow: (id: string) => void;
    maximizeWindow: (id: string) => void;
    focusWindow: (id: string) => void;
    updateWindowPosition: (id: string, position: { x: number; y: number }) => void;
    updateWindowSize: (id: string, size: { width: number; height: number }) => void;

    // Personalization
    wallpaper: string;
    setWallpaper: (wallpaper: string) => void;
    accentColor: string;
    setAccentColor: (color: string) => void;
    taskbarAlignment: 'center' | 'left';
    setTaskbarAlignment: (alignment: 'center' | 'left') => void;
}

export const useOSStore = create<OSState>((set, get) => ({
    isBooting: true,
    isLocked: true,
    isSearchOpen: false,
    password: 'hari276', // Default password
    windows: [],
    activeWindowId: null,

    // Personalization Defaults
    wallpaper: "url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop')", // Abstract Tech/Space
    setWallpaper: (wallpaper) => set({ wallpaper }),
    accentColor: 'blue',
    setAccentColor: (accentColor) => set({ accentColor }),
    taskbarAlignment: 'center',
    setTaskbarAlignment: (taskbarAlignment) => set({ taskbarAlignment }),

    setBooting: (isBooting) => set({ isBooting }),
    setLocked: (isLocked) => set({ isLocked }),
    setSearchOpen: (isSearchOpen) => set({ isSearchOpen }),
    setPassword: (password) => set({ password }),

    openWindow: (appId) => {
        const { windows } = get();
        // Check if window already exists
        const existingWindow = windows.find((w) => w.id === appId);

        if (existingWindow) {
            // If it exists but is minimized or behind, bring to front/restore
            set((state) => ({
                windows: state.windows.map((w) =>
                    w.id === appId ? { ...w, isMinimized: false } : w
                ),
                activeWindowId: appId,
            }));
            return;
        }

        const newWindow: WindowState = {
            id: appId,
            title: appId.charAt(0).toUpperCase() + appId.slice(1), // Default title
            component: appId,
            isOpen: true,
            isMinimized: false,
            isMaximized: false,
            zIndex: windows.length + 1,
            // Randomize slightly to avoid stacking perfectly
            position: { x: 100 + windows.length * 20, y: 100 + windows.length * 20 },
            size: { width: 600, height: 400 },
        };

        set((state) => ({
            windows: [...state.windows, newWindow],
            activeWindowId: appId,
        }));
    },

    closeWindow: (id) => set((state) => ({
        windows: state.windows.filter((w) => w.id !== id),
        activeWindowId: state.activeWindowId === id ? null : state.activeWindowId,
    })),

    minimizeWindow: (id) => set((state) => ({
        windows: state.windows.map((w) =>
            w.id === id ? { ...w, isMinimized: true } : w
        ),
        activeWindowId: state.activeWindowId === id ? null : state.activeWindowId,
    })),

    maximizeWindow: (id) => set((state) => ({
        windows: state.windows.map((w) =>
            w.id === id ? { ...w, isMaximized: !w.isMaximized } : w
        ),
        activeWindowId: id,
    })),

    focusWindow: (id) => set((state) => {
        // Bring to front logic could be moving to end of array or updating zIndex
        // For now, simpler zIndex management: active is highest
        const maxZ = Math.max(...state.windows.map((w) => w.zIndex), 0);
        return {
            activeWindowId: id,
            windows: state.windows.map((w) =>
                w.id === id ? { ...w, zIndex: maxZ + 1, isMinimized: false } : w
            ),
        };
    }),

    updateWindowPosition: (id, position) => set((state) => ({
        windows: state.windows.map((w) => w.id === id ? { ...w, position } : w)
    })),

    updateWindowSize: (id, size) => set((state) => ({
        windows: state.windows.map((w) => w.id === id ? { ...w, size } : w)
    })),
}));
