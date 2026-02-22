'use client';

import { useOSStore } from '@/store/useOSStore';
import { BootScreen } from '@/components/os/BootScreen';
import { AnimatedBackground } from '@/components/os/AnimatedBackground';
import { AnimatePresence } from 'framer-motion';

export default function OSLayout({ children }: { children: React.ReactNode }) {
    const { isBooting } = useOSStore();

    return (
        <>
            <AnimatePresence mode="wait">
                {isBooting && (
                    <BootScreen key="boot" />
                )}
            </AnimatePresence>

            {!isBooting && (
                <div className="relative h-screen w-screen overflow-hidden text-foreground">
                    <AnimatedBackground />
                    <div className="relative w-full h-full p-0 md:p-4 z-0">
                        {children}
                    </div>
                </div>
            )}
        </>
    );
}
