'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useOSStore } from '@/store/useOSStore';
import { Search as SearchIcon, Terminal, Folder, User, Mail, Settings, Award, Command } from 'lucide-react';
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
    const { isSearchOpen, setSearchOpen, openWindow, accentColor } = useOSStore();
    const [query, setQuery] = useState('');
    const [selectedIndex, setSelectedIndex] = useState(0);
    const inputRef = useRef<HTMLInputElement>(null);

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
                <div className="fixed inset-0 z-[200] flex items-start justify-center pt-[15vh]">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/20 backdrop-blur-sm"
                        onClick={() => setSearchOpen(false)}
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -20 }}
                        className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/80 shadow-2xl backdrop-blur-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Search Input Area */}
                        <div className="flex items-center gap-4 border-b border-white/10 p-4">
                            <SearchIcon className="h-5 w-5 text-zinc-400" />
                            <input
                                ref={inputRef}
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Search apps, settings, and more..."
                                className="flex-1 bg-transparent text-lg text-white placeholder:text-zinc-500 focus:outline-none"
                            />
                            <div className="flex items-center gap-1 rounded bg-white/5 px-2 py-1 text-[10px] font-bold text-zinc-400">
                                <Command size={10} />
                                <span>K</span>
                            </div>
                        </div>

                        {/* Results Area */}
                        <div className="max-h-[400px] overflow-auto p-2">
                            {filteredApps.length > 0 ? (
                                <div className="space-y-1">
                                    <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                                        Applications
                                    </div>
                                    {filteredApps.map((app, index) => {
                                        const Icon = app.icon;
                                        const isSelected = index === selectedIndex;

                                        return (
                                            <button
                                                key={app.id}
                                                onClick={() => handleOpenApp(app.id)}
                                                onMouseEnter={() => setSelectedIndex(index)}
                                                className={cn(
                                                    "flex w-full items-center gap-4 rounded-xl px-4 py-3 transition-all",
                                                    isSelected ? "bg-white/10 " : "hover:bg-white/5"
                                                )}
                                                style={isSelected ? { borderLeft: `3px solid ${accentColor}` } : {}}
                                            >
                                                <div className={cn(
                                                    "flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-800 text-zinc-400",
                                                    isSelected && "text-white"
                                                )}>
                                                    <Icon size={20} />
                                                </div>
                                                <div className="flex flex-col items-start text-left">
                                                    <span className="font-semibold text-white">{app.label}</span>
                                                    <span className="text-xs text-zinc-400">{app.description}</span>
                                                </div>
                                            </button>
                                        );
                                    })}
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center py-10 text-center">
                                    <div className="mb-4 rounded-full bg-white/5 p-4">
                                        <SearchIcon size={32} className="text-zinc-600" />
                                    </div>
                                    <p className="text-sm font-medium text-zinc-400">No results found for "{query}"</p>
                                    <p className="text-xs text-zinc-600">Try searching for "About", "Contact", or "Settings"</p>
                                </div>
                            )}
                        </div>

                        {/* Footer Area */}
                        <div className="flex items-center justify-between border-t border-white/5 bg-black/20 px-4 py-3 text-[10px] font-bold text-zinc-500 uppercase tracking-[0.15em]">
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-1">
                                    <span className="rounded bg-white/5 px-1.5 py-0.5 border border-white/10 text-zinc-400">ENTER</span>
                                    <span>to open</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <span className="rounded bg-white/5 px-1.5 py-0.5 border border-white/10 text-zinc-400">↑↓</span>
                                    <span>to navigate</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-1">
                                <span className="rounded bg-white/5 px-1.5 py-0.5 border border-white/10 text-zinc-400">ESC</span>
                                <span>to close</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
