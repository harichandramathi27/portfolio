'use client';

import { useOSStore } from '@/store/useOSStore';
import { BootScreen } from '@/components/os/BootScreen';
import { LoginScreen } from '@/components/os/LoginScreen';
import { AnimatePresence } from 'framer-motion';

export default function OSLayout({ children }: { children: React.ReactNode }) {
    const { isBooting, isLocked } = useOSStore();

    return (
        <>
            <AnimatePresence mode="wait">
                {isBooting ? (
                    <BootScreen key="boot" />
                ) : isLocked ? (
                    <LoginScreen key="login" />
                ) : null}
            </AnimatePresence>

            {!isBooting && !isLocked && (
                <div className="relative h-screen w-screen overflow-hidden bg-desktop text-foreground">
                    {children}
                </div>
            )}
        </>
    );
}
