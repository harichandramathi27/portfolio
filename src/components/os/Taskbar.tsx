'use client';

import { useOSStore } from '@/store/useOSStore';
import { motion } from 'framer-motion';
import { Terminal, Folder, User, Mail, Settings, Award, Search, X, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';

const DOCK_ITEMS = [
    { id: 'terminal', label: 'Terminal', icon: Terminal },
    { id: 'projects', label: 'Projects', icon: Folder },
    { id: 'certificates', label: 'Certificates', icon: Award },
    { id: 'about', label: 'About', icon: User },
    { id: 'contact', label: 'Contact', icon: Mail },
    { id: 'settings', label: 'Settings', icon: Settings },
];

export function Taskbar() {
    const { openWindow, windows, activeWindowId, minimizeWindow, closeWindow, focusWindow, setSearchOpen, isSearchOpen } = useOSStore();
    const [hoveredApp, setHoveredApp] = useState<string | null>(null);

    const handleAppClick = (id: string) => {
        const isOpen = windows.find((w) => w.id === id);
        if (isOpen) {
            if (isOpen.isMinimized) {
                focusWindow(id);
            } else if (activeWindowId === id) {
                minimizeWindow(id);
            } else {
                focusWindow(id);
            }
        } else {
            openWindow(id);
        }
    };

    return (
        <div className="fixed bottom-6 left-0 right-0 z-[100] flex justify-center px-4 pointer-events-none">
            <motion.div
                className="flex items-end gap-2 rounded-2xl border border-white/20 bg-black/20 p-2 shadow-2xl backdrop-blur-3xl pointer-events-auto"
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, type: 'spring', stiffness: 200, damping: 20 }}
            >
                {/* Search Button */}
                <div className="relative flex flex-col items-center gap-1 group">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: hoveredApp === 'search' ? 1 : 0, scale: hoveredApp === 'search' ? 1 : 0.8, y: hoveredApp === 'search' ? -50 : 0 }}
                        className="absolute pointer-events-none rounded-lg bg-black/60 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white backdrop-blur-md shadow-xl border border-white/10 whitespace-nowrap"
                    >
                        Spotlight Search
                    </motion.div>
                    <button
                        onClick={() => setSearchOpen(!isSearchOpen)}
                        onMouseEnter={() => setHoveredApp('search')}
                        onMouseLeave={() => setHoveredApp(null)}
                        className={cn(
                            "relative flex h-14 w-14 items-center justify-center rounded-2xl transition-all duration-300 hover:scale-125 hover:-translate-y-2 active:scale-95 text-white/70 hover:text-white",
                            isSearchOpen ? "bg-white/20 shadow-inner" : "hover:bg-white/10"
                        )}
                    >
                        <Search className="h-7 w-7" />
                    </button>
                    <div className="h-1 flex justify-center w-full" />
                </div>

                <div className="h-10 w-px bg-white/10 self-center mx-2" />

                {DOCK_ITEMS.map((item) => {
                    const window = windows.find((w) => w.id === item.id);
                    const isOpen = !!window;
                    const isActive = activeWindowId === item.id;
                    const Icon = item.icon;

                    return (
                        <div key={item.id} className="relative flex flex-col items-center gap-1 group">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: hoveredApp === item.id ? 1 : 0, scale: hoveredApp === item.id ? 1 : 0.8, y: hoveredApp === item.id ? -58 : 0 }}
                                className="absolute pointer-events-none rounded-lg bg-black/60 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white backdrop-blur-md shadow-xl border border-white/10 whitespace-nowrap"
                            >
                                {item.label}
                            </motion.div>

                            <button
                                onClick={() => handleAppClick(item.id)}
                                onMouseEnter={() => setHoveredApp(item.id)}
                                onMouseLeave={() => setHoveredApp(null)}
                                className={cn(
                                    "relative flex h-14 w-14 items-center justify-center rounded-2xl transition-all duration-300 hover:scale-120 hover:-translate-y-2 active:scale-95 text-white/70 hover:text-white",
                                    isActive ? "bg-white/20 shadow-inner" : "hover:bg-white/10"
                                )}
                            >
                                <Icon className="h-7 w-7" />
                            </button>

                            <div className="h-1.5 flex justify-center w-full">
                                <motion.div
                                    className="h-1 w-1 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]"
                                    initial={{ scale: 0 }}
                                    animate={{ scale: isOpen ? 1 : 0 }}
                                />
                            </div>
                        </div>
                    );
                })}
            </motion.div>
        </div>
    );
}
