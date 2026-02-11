'use client';

import { useOSStore } from '@/store/useOSStore';
import { motion } from 'framer-motion';
import { Terminal, Folder, User, Mail, Settings, Award, Search } from 'lucide-react';
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
    const { openWindow, windows, activeWindowId, minimizeWindow, focusWindow, taskbarAlignment, setSearchOpen, isSearchOpen } = useOSStore();
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
        <div className={cn(
            "fixed bottom-4 flex items-end gap-2 p-2 transition-all duration-300",
            taskbarAlignment === 'center' ? "left-1/2 -translate-x-1/2" : "left-4"
        )}>
            <motion.div
                className="flex items-end gap-4 rounded-2xl border border-white/20 bg-white/10 px-4 py-3 shadow-2xl backdrop-blur-xl"
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                transition={{ delay: 1, type: 'spring', stiffness: 200, damping: 20 }}
            >
                {/* Search Button */}
                <div className="relative flex flex-col items-center gap-1 group">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: hoveredApp === 'search' ? 1 : 0, y: hoveredApp === 'search' ? -45 : 10 }}
                        className="absolute pointer-events-none rounded-md bg-black/80 px-2 py-1 text-xs text-white backdrop-blur-md whitespace-nowrap"
                    >
                        Search (⌘K)
                    </motion.div>
                    <button
                        onClick={() => setSearchOpen(!isSearchOpen)}
                        onMouseEnter={() => setHoveredApp('search')}
                        onMouseLeave={() => setHoveredApp(null)}
                        className={cn(
                            "relative flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-300 hover:scale-110 hover:bg-white/20",
                            isSearchOpen ? "bg-white/20 shadow-inner" : ""
                        )}
                    >
                        <Search className="h-6 w-6 text-white" />
                    </button>
                    <div className="h-1 w-full flex justify-center">
                        <div className="h-1 w-1" /> {/* Spacer */}
                    </div>
                </div>

                <div className="h-8 w-px bg-white/10 self-center mx-1" />

                {DOCK_ITEMS.map((item) => {
                    const isOpen = windows.some((w) => w.id === item.id);
                    const isActive = activeWindowId === item.id;
                    const Icon = item.icon;

                    return (
                        <div key={item.id} className="relative flex flex-col items-center gap-1 group">
                            {/* Tooltip */}
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: hoveredApp === item.id ? 1 : 0, y: hoveredApp === item.id ? -45 : 10 }} // Adjusted Y to show above icon
                                className="absolute pointer-events-none rounded-md bg-black/80 px-2 py-1 text-xs text-white backdrop-blur-md"
                            >
                                {item.label}
                            </motion.div>

                            <button
                                onClick={() => handleAppClick(item.id)}
                                onMouseEnter={() => setHoveredApp(item.id)}
                                onMouseLeave={() => setHoveredApp(null)}
                                className={cn(
                                    "relative flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-300 hover:scale-110 hover:bg-white/20",
                                    isActive ? "bg-white/20 shadow-inner" : ""
                                )}
                            >
                                <Icon className="h-6 w-6 text-white" />
                            </button>

                            {/* Active Dot */}
                            <div className="h-1 w-full flex justify-center">
                                <motion.div
                                    className="h-1 w-1 rounded-full bg-white"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: isOpen ? 1 : 0 }}
                                />
                            </div>
                        </div>
                    );
                })}
            </motion.div>
        </div>
    );
}
