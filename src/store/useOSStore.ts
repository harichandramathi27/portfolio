import { create } from 'zustand';

export interface WindowState {
    id: string;
    title: string;
    description?: string;
    component: string;
    isOpen: boolean;
    isMinimized: boolean;
    isMaximized: boolean;
    zIndex: number;
    position: { x: number; y: number };
    size: { width: string | number; height: string | number };
    lastState?: {
        position: { x: number; y: number };
        size: { width: string | number; height: string | number };
    };
}

interface OSState {
    isBooting: boolean;
    isLocked: boolean;
    isSearchOpen: boolean;
    windows: WindowState[];
    activeWindowId: string | null;

    // Actions
    setBooting: (isBooting: boolean) => void;
    setLocked: (isLocked: boolean) => void;
    setSearchOpen: (isOpen: boolean) => void;
    openWindow: (appId: string) => void;
    closeWindow: (id: string) => void;
    minimizeWindow: (id: string) => void;
    maximizeWindow: (id: string) => void;
    focusWindow: (id: string) => void;
    updateWindow: (id: string, updates: Partial<WindowState>) => void;

    // Personalization
    accentColor: string;
    setAccentColor: (color: string) => void;
    taskbarAlignment: 'center' | 'left';
    setTaskbarAlignment: (alignment: 'center' | 'left') => void;
}

export const useOSStore = create<OSState>((set, get) => ({
    isBooting: true,
    isLocked: false,
    isSearchOpen: false,
    windows: [],
    activeWindowId: null,

    // Personalization Defaults
    accentColor: 'blue',
    setAccentColor: (accentColor) => set({ accentColor }),
    taskbarAlignment: 'center',
    setTaskbarAlignment: (taskbarAlignment) => set({ taskbarAlignment }),

    setBooting: (isBooting) => set({ isBooting }),
    setLocked: (isLocked) => set({ isLocked }),
    setSearchOpen: (isSearchOpen) => set({ isSearchOpen }),

    openWindow: (appId) => {
        const { windows } = get();
        const existingWindow = windows.find((w) => w.id === appId);

        if (existingWindow) {
            set((state) => ({
                windows: state.windows.map((w) =>
                    w.id === appId ? { ...w, isMinimized: false, isOpen: true } : w
                ),
                activeWindowId: appId,
            }));
            get().focusWindow(appId);
            return;
        }

        const defaultWidth = 800;
        const defaultHeight = 600;

        // Calculate center position with stagger offset
        const staggerX = (windows.length % 10) * 32;
        const staggerY = (windows.length % 10) * 32;

        let centerX = 100;
        let centerY = 100;

        if (typeof window !== 'undefined') {
            centerX = (window.innerWidth - defaultWidth) / 2;
            centerY = (window.innerHeight - defaultHeight) / 2;
        }

        const newWindow: WindowState = {
            id: appId,
            title: appId.charAt(0).toUpperCase() + appId.slice(1),
            component: appId,
            isOpen: true,
            isMinimized: false,
            isMaximized: false,
            zIndex: windows.length + 10,
            position: {
                x: centerX + staggerX,
                y: centerY + staggerY
            },
            size: { width: defaultWidth, height: defaultHeight },
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
        const maxZ = Math.max(...state.windows.map((w) => w.zIndex), 0);
        return {
            activeWindowId: id,
            windows: state.windows.map((w) =>
                w.id === id ? { ...w, zIndex: maxZ + 1, isMinimized: false } : w
            ),
        };
    }),

    updateWindow: (id, updates) => set((state) => ({
        windows: state.windows.map((w) => w.id === id ? { ...w, ...updates } : w)
    })),
}));
