'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useOSStore } from '@/store/useOSStore';
import { Terminal } from 'lucide-react';

export function BootScreen() {
    const setBooting = useOSStore((state) => state.setBooting);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // Simulate boot progress
        const timer = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(timer);
                    setTimeout(() => setBooting(false), 500); // Small delay after 100%
                    return 100;
                }
                return prev + 2; // Speed of boot
            });
        }, 30);

        return () => clearInterval(timer);
    }, [setBooting]);

    return (
        <motion.div
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black text-white"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="mb-8 flex flex-col items-center gap-4"
            >
                <Terminal size={64} className="text-white" />
                <h1 className="text-2xl font-bold tracking-widest">OS SYSTEM</h1>
            </motion.div>

            {/* Progress Bar */}
            <div className="h-2 w-64 overflow-hidden rounded-full bg-gray-800">
                <motion.div
                    className="h-full bg-white"
                    style={{ width: `${progress}%` }}
                />
            </div>

            <p className="mt-4 text-xs font-mono text-gray-500">
                Booting kernel... {progress}%
            </p>
        </motion.div>
    );
}
