'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useOSStore } from '@/store/useOSStore';
import { User, ArrowRight, ShieldAlert } from 'lucide-react';
import { cn } from '@/lib/utils';

export function LoginScreen() {
    const { password: correctPassword, setLocked, accentColor } = useOSStore();
    const [input, setInput] = useState('');
    const [error, setError] = useState(false);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (input === correctPassword) {
            setLocked(false);
        } else {
            setError(true);
            setTimeout(() => setError(false), 500);
            setInput('');
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-black/40 backdrop-blur-3xl">
            {/* Background Atmosphere */}
            <div className="absolute inset-0 z-[-1]">
                <div
                    className="absolute top-1/2 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20 blur-[120px]"
                    style={{ backgroundColor: accentColor }}
                />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="flex flex-col items-center gap-8"
            >
                {/* User Avatar */}
                <div className="group relative">
                    <div
                        className="h-24 w-24 rounded-full p-0.5 shadow-2xl transition-transform group-hover:scale-105"
                        style={{ background: `linear-gradient(to bottom right, ${accentColor}, #4A00E0)` }}
                    >
                        <div className="flex h-full w-full items-center justify-center rounded-full bg-zinc-900">
                            <User size={40} className="text-gray-400" />
                        </div>
                    </div>
                </div>

                <div className="text-center">
                    <h1 className="text-3xl font-bold text-white uppercase tracking-[0.2em]">Harichandramathi</h1>
                    <p className="mt-2 text-sm text-gray-400 font-medium">Session Locked</p>
                </div>

                <form
                    onSubmit={handleLogin}
                    className={cn(
                        "relative flex w-64 items-center gap-2 transition-all",
                        error && "animate-shake"
                    )}
                >
                    <input
                        type="password"
                        autoFocus
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Enter Password"
                        className="w-full rounded-xl border border-white/10 bg-white/5 p-4 pr-12 text-sm text-white placeholder:text-gray-600 focus:border-white/20 focus:outline-none focus:ring-1 focus:ring-white/10"
                    />
                    <button
                        type="submit"
                        className="absolute right-2 rounded-lg p-2 text-gray-400 transition-colors hover:bg-white/10 hover:text-white"
                    >
                        <ArrowRight size={20} />
                    </button>
                </form>

                <AnimatePresence>
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="flex items-center gap-2 text-red-500"
                        >
                            <ShieldAlert size={16} />
                            <span className="text-xs font-semibold uppercase tracking-wider">Invalid Access Key</span>
                        </motion.div>
                    )}
                </AnimatePresence>

            </motion.div>
        </div>
    );
}
