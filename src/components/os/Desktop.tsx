'use client';

import { Taskbar } from '@/components/os/Taskbar';
import { WindowManager } from '@/components/os/WindowManager';
import { Search } from '@/components/os/Search';
import { useOSStore } from '@/store/useOSStore';
import { useEffect } from 'react';

export function Desktop() {
    const { isSearchOpen, setSearchOpen } = useOSStore();

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                setSearchOpen(!isSearchOpen);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isSearchOpen, setSearchOpen]);

    return (
        <main
            className="fixed inset-0 h-full w-full overflow-hidden flex items-center justify-center group"
            onContextMenu={(e) => {
                e.preventDefault();
                // TODO: Implement Custom Context Menu
                console.log("Desktop context menu");
            }}
        >
            {/* Spotlight Search Overlay */}
            <Search />
            {/* Desktop Icons Area */}
            <div className="absolute top-0 left-0 p-4 grid grid-cols-1 gap-4">
                {/* TODO: Add Desktop Icons */}
            </div>

            {/* Windows Layer */}
            <WindowManager />

            {/* Taskbar */}
            <Taskbar />
        </main>
    );
}
