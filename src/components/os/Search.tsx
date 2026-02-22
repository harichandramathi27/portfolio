'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useOSStore } from '@/store/useOSStore';
import { Search as SearchIcon, Terminal, Folder, User, Mail, Settings, Award } from 'lucide-react';
import { cn } from '@/lib/utils';

const APPS = [
    { id: 'terminal', label: 'Terminal', icon: Terminal, description: 'Command line interface' },
    { id: 'projects', label: 'Projects', icon: Folder, description: 'View my work and repositories' },
    { id: 'certificates', label: 'Certificates', icon: Award, description: 'Professional certifications' },
    { id: 'about', label: 'About', icon: User, description: 'Learn more about me' },
    { id: 'contact', label: 'Contact', icon: Mail, description: 'Send me a message' },
    { id: 'settings', label: 'Settings', icon: Settings, description: 'Customize your experience' },
];

export function Search() {
    const { isSearchOpen, setSearchOpen, openWindow, accentColor, windows } = useOSStore();
    const [query, setQuery] = useState('');
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [isMobile, setIsMobile] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const filteredApps = APPS.filter(app =>
        app.label.toLowerCase().includes(query.toLowerCase()) ||
        app.description.toLowerCase().includes(query.toLowerCase())
    );

    useEffect(() => {
        if (isSearchOpen) {
            setQuery('');
            setSelectedIndex(0);
            setTimeout(() => inputRef.current?.focus(), 50);
        }
    }, [isSearchOpen]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!isSearchOpen) return;

            if (e.key === 'ArrowDown') {
                e.preventDefault();
                setSelectedIndex(prev => (prev + 1) % filteredApps.length);
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                setSelectedIndex(prev => (prev - 1 + filteredApps.length) % filteredApps.length);
            } else if (e.key === 'Enter') {
                if (filteredApps[selectedIndex]) {
                    handleOpenApp(filteredApps[selectedIndex].id);
                }
            } else if (e.key === 'Escape') {
                setSearchOpen(false);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isSearchOpen, filteredApps, selectedIndex]);

    const handleOpenApp = (id: string) => {
        openWindow(id);
        setSearchOpen(false);
    };

    return (
        <AnimatePresence>
            {isSearchOpen && (
                <div className={cn(
                    "fixed inset-0 z-[200] flex items-start justify-center px-4",
                    isMobile ? "pt-[10vh]" : "pt-[15vh]"
                )}>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/40 backdrop-blur-md"
                        onClick={() => setSearchOpen(false)}
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: -20 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-white/20 bg-white/10 shadow-2xl backdrop-blur-3xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Search Input Area */}
                        <div className={cn(
                            "flex items-center gap-4 border-b border-white/10",
                            isMobile ? "p-4" : "p-6"
                        )}>
                            <SearchIcon className="h-6 w-6 text-white/50" />
                            <input
                                ref={inputRef}
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Looking for something?"
                                className="flex-1 bg-transparent text-xl font-medium text-white placeholder:text-white/20 focus:outline-none"
                            />
                            <div className="flex items-center gap-1 rounded-lg bg-white/10 px-3 py-1.5 text-[10px] font-bold text-white/40 border border-white/10 uppercase tracking-widest">
                                <span>Esc</span>
                            </div>
                        </div>

                        {/* Results Area */}
                        <div className="max-h-[450px] overflow-auto p-4 no-scrollbar">
                            {filteredApps.length > 0 ? (
                                <div className="space-y-2">
                                    <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">
                                        Suggested Apps
                                    </div>
                                    {filteredApps.map((app, index) => {
                                        const Icon = app.icon;
                                        const isSelected = index === selectedIndex;

                                        return (
                                            <div key={app.id} className="relative group/item">
                                                <button
                                                    onClick={() => handleOpenApp(app.id)}
                                                    onMouseEnter={() => setSelectedIndex(index)}
                                                    className={cn(
                                                        "flex w-full items-center gap-4 rounded-2xl px-5 py-4 transition-all duration-300",
                                                        isSelected ? "bg-white/15 shadow-lg scale-[1.02] border border-white/20" : "hover:bg-white/5"
                                                    )}
                                                >
                                                    <div className={cn(
                                                        "flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-white/50 transition-colors",
                                                        isSelected && "text-blue-400 bg-white/20"
                                                    )}>
                                                        <Icon size={24} />
                                                    </div>
                                                    <div className="flex flex-col items-start text-left">
                                                        <span className="text-lg font-bold text-white/90">{app.label}</span>
                                                        <span className="text-xs text-white/40">{app.description}</span>
                                                    </div>
                                                </button>
                                            </div>
                                        );
                                    })}
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center py-16 text-center">
                                    <div className="mb-6 rounded-full bg-white/5 p-6 border border-white/5">
                                        <SearchIcon size={40} className="text-white/20" />
                                    </div>
                                    <p className="text-lg font-bold text-white/60">No transmissions found</p>
                                    <p className="text-sm text-white/30 uppercase tracking-widest">Adjust your search parameters</p>
                                </div>
                            )}
                        </div>

                        {/* Footer Area */}
                        <div className={cn(
                            "flex items-center justify-between border-t border-white/5 bg-black/40 px-6 py-4 text-[10px] font-bold text-white/20 uppercase tracking-[0.2em]",
                            isMobile && "hidden"
                        )}>
                            <div className="flex items-center gap-6">
                                <div className="flex items-center gap-2">
                                    <span className="rounded-lg bg-white/5 px-2 py-1 border border-white/10 text-white/40 font-mono text-[11px]">↵</span>
                                    <span>Open App</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="rounded-lg bg-white/5 px-2 py-1 border border-white/10 text-white/40 font-mono text-[11px]">↑↓</span>
                                    <span>Navigate</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
